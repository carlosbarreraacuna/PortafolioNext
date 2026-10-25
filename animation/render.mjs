// Renderiza cada clip con Remotion y lo convierte a WebP con transparencia para el hero.
// Uso: npm run render  (salida en ../public/hero/<clip>/NNN.webp)
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const CLIPS = ["idle", "lookLeft", "lookRight", "greet", "greetOut"];
const WIDTH = 760; // ancho final del frame (alto proporcional 700x850)
const tmp = path.resolve("out");
const dest = path.resolve("../public/hero");

for (const clip of CLIPS) {
  const raw = path.join(tmp, clip);
  rmSync(raw, { recursive: true, force: true });
  execFileSync(
    "npx",
    ["remotion", "render", "src/index.ts", clip, raw, "--sequence", "--image-format=png", "--scale=1.5", "--log=error"],
    { stdio: "inherit", shell: true },
  );
  const out = path.join(dest, clip);
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  const files = readdirSync(raw).filter((f) => f.endsWith(".png")).sort();
  await Promise.all(
    files.map((f, i) =>
      sharp(path.join(raw, f))
        .resize(WIDTH)
        .webp({ quality: 75, alphaQuality: 75, effort: 6, smartSubsample: true })
        .toFile(path.join(out, `${String(i).padStart(3, "0")}.webp`)),
    ),
  );
  console.log(`${clip}: ${files.length} frames`);
}
