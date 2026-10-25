// Convierte los clips de video (fondo verde chroma) en frames WebP con transparencia para el hero.
// Uso: node extract.mjs   (lee video/<clip>.mp4 y escribe ../public/hero/<clip>/NNN.webp)
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync, existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

// skip: frames iniciales (a FPS) que se descartan; los giros y el saludo arrancan con ~1,5 s de tecleo
// que haria lenta la reaccion. Los indices del hero (src/componentes/portfolio/Hero.tsx) cuentan desde aqui.
const CLIPS = [
  { name: "idle", skip: 0 },
  { name: "lookLeft", skip: 14 },
  { name: "lookRight", skip: 14 },
  { name: "greet", skip: 22 },
];
const FPS = 12; // los clips vienen a 24 fps; 12 basta porque el hero funde entre frames
const WIDTH = 480; // ancho nativo de los videos (480x640): escalar aqui solo agrega peso
const tmp = path.resolve("out/video");
const dest = path.resolve("../public/hero");

// Clave de verde con despill: el alfa sale de cuanto domina el verde sobre rojo y azul,
// y en los bordes semitransparentes se neutraliza el reflejo verde.
function key(data) {
  const alpha = Buffer.alloc(data.length / 4);
  for (let i = 0, j = 0; i < data.length; i += 4, j++) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const dom = g - Math.max(r, b);
    alpha[j] = dom > 70 ? 0 : dom > 25 ? Math.round(255 * (1 - (dom - 25) / 45)) : 255;
    if (dom > 0) data[i + 1] = Math.max(r, b);
  }
  return alpha;
}

// Suaviza el borde dentado del video: difumina el alfa y lo recorta un poco hacia adentro.
async function soften(alpha, width, height) {
  const blurred = await sharp(alpha, { raw: { width, height, channels: 1 } }).blur(0.8).extractChannel(0).raw().toBuffer();
  for (let j = 0; j < blurred.length; j++) blurred[j] = Math.max(0, Math.min(255, (blurred[j] - 50) * 1.3));
  return blurred;
}

for (const { name: clip, skip } of CLIPS) {
  const src = path.resolve("video", `${clip}.mp4`);
  if (!existsSync(src)) {
    console.log(`${clip}: falta video/${clip}.mp4`);
    continue;
  }
  const raw = path.join(tmp, clip);
  rmSync(raw, { recursive: true, force: true });
  mkdirSync(raw, { recursive: true });
  execFileSync("ffmpeg", ["-v", "error", "-i", src, "-vf", `fps=${FPS},scale=${WIDTH}:-2:flags=lanczos`, path.join(raw, "%03d.png")]);

  const out = path.join(dest, clip);
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  const files = readdirSync(raw).filter((f) => f.endsWith(".png")).sort().slice(skip);
  await Promise.all(
    files.map(async (f, i) => {
      const { data, info } = await sharp(path.join(raw, f)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      const alpha = await soften(key(data), info.width, info.height);
      for (let j = 0; j < alpha.length; j++) data[j * 4 + 3] = alpha[j];
      await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
        .webp({ quality: 70, alphaQuality: 70, effort: 6 })
        .toFile(path.join(out, `${String(i).padStart(3, "0")}.webp`));
    }),
  );
  console.log(`${clip}: ${files.length} frames`);
}
