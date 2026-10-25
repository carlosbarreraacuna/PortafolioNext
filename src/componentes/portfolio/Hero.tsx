"use client";

import { useEffect, useRef } from "react";
import { Cursor, HandTap } from "@phosphor-icons/react";
import { CON_MOVIMIENTO, gsap, useGSAP } from "@/lib/gsap";
import { useI18n } from "./I18nProvider";

// Frames sacados de los videos del personaje (animation/video, `node extract.mjs`). Las cantidades y
// los momentos clave cuentan desde el primer frame que conserva extract.mjs.
const FPS = 12;
const CLIPS = { idle: 62, lookLeft: 48, lookRight: 48, greet: 100 } as const;
const FRAME = { w: 480, h: 640 };
type ClipName = keyof typeof CLIPS;
type Zone = "left" | "center" | "right";
type MsgKey = "left" | "right" | "hey" | "hi" | "check";

// Frame de los giros en que la mirada llega al lado: ahi se sostiene la reaccion.
const LOOK_PEAK = 14;
// Saludo: frame en que aparece cada frase (te mira, mano arriba, senala hacia abajo).
const GREET_CUES: [number, MsgKey][] = [
  [6, "hey"],
  [51, "hi"],
  [83, "check"],
];
// Para volver al trabajo se salta (con fundido) a cuando tiene las manos en los audifonos y se
// reproduce el saludo al reves: se los pone y baja la mirada, sin repetir el saludo de mano.
const GREET_BACK = 47;
const RETURN_SPEED = 1.5;

// Logos del stack flotando alrededor del personaje. depth > 1 va delante (mas grande y desenfocado,
// como un objeto cerca de la camara); depth < 1 va detras, lejos. `mobile` los deja en pantallas chicas;
// `invert` aclara los logos negros (Next.js) para que se vean sobre el fondo oscuro.
const LOGOS = [
  { src: "javascript", pos: "left-[6%] top-[18%]", size: "size-12 md:size-14", rot: -14, depth: 0.8, mobile: true },
  { src: "php", pos: "left-[27%] top-[9%]", size: "size-9 md:size-11", rot: 12, depth: 0.6 },
  { src: "laravel", pos: "right-[7%] top-[14%]", size: "size-12 md:size-16", rot: 10, depth: 0.9, mobile: true },
  { src: "postgresql", pos: "right-[27%] top-[6%]", size: "size-9 md:size-12", rot: -8, depth: 0.6 },
  { src: "react", pos: "left-[15%] top-[58%]", size: "size-11 md:size-14", rot: 18, depth: 0.85, mobile: true },
  { src: "typescript", pos: "right-[18%] top-[55%]", size: "size-10 md:size-12", rot: -12, depth: 0.75, mobile: true },
  { src: "html-5", pos: "left-[4%] top-[80%]", size: "size-10 md:size-12", rot: -6, depth: 0.7 },
  { src: "css-3", pos: "right-[4%] top-[74%]", size: "size-10 md:size-12", rot: 14, depth: 0.7 },
  { src: "react", pos: "left-[27%] bottom-[9%]", size: "size-16 md:size-24", rot: -20, depth: 1.6, blur: true },
  { src: "codeigneiter3", pos: "right-[12%] -bottom-[3%]", size: "size-16 md:size-28", rot: 24, depth: 1.8, blur: true, mobile: true },
  { src: "next-js", pos: "right-[3%] top-[40%]", size: "size-10", rot: -12, depth: 0.55, invert: true },
  { src: "javascript", pos: "left-[42%] top-[13%]", size: "size-7", rot: 20, depth: 0.45, faint: true },
] as const;

// Codigo decorativo del fondo: textura de ingenieria, casi transparente y solo en escritorio.
const CODE_LEFT = `const developer = {
  name: "Carlos Barrera",
  role: "Full Stack",
  stack: ["Laravel", "Next.js", "PostgreSQL"],
  location: "Cartagena, CO",
};

export default developer;`;
const CODE_RIGHT = `SELECT project, status
FROM portfolio
WHERE quality = 'high'
ORDER BY impact DESC;

-- 200 OK`;

const frameSrc = (c: ClipName, i: number) => `/hero/${c}/${String(i).padStart(3, "0")}.webp`;

// Las zonas solo existen con raton y pantalla ancha; en tactil el saludo se lanza solo o con un toque.
const CON_ZONAS = "(hover: hover) and (pointer: fine) and (min-width: 1024px)";
const HOLD_LOOK = 2400;
const HOLD_GREET = 2200;
const HOLD_MIN = 700; // aunque el cursor cambie de zona, la reaccion se sostiene al menos esto
const BLEND = 0.28; // segundos de fundido al cambiar de clip o saltar dentro de uno

export function Hero() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const bubbleText = useRef<HTMLSpanElement>(null);
  const messages = useRef(t.hero.messages);
  const currentMsg = useRef<MsgKey | null>(null);

  // El motor vive fuera de React: el idioma solo cambia el texto del globo que ya se ve.
  useEffect(() => {
    messages.current = t.hero.messages;
    if (currentMsg.current && bubbleText.current) bubbleText.current.textContent = t.hero.messages[currentMsg.current];
  }, [t]);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(CON_MOVIMIENTO, () => {
        gsap.from(".hero-name-line", { yPercent: 110, duration: 1, stagger: 0.12, ease: "power4.out" });
        gsap.from(".hero-in", { autoAlpha: 0, y: 14, duration: 0.7, stagger: 0.1, delay: 0.6, ease: "power3.out" });
        gsap.from(".hero-figure", { autoAlpha: 0, y: 60, duration: 1.1, delay: 0.15, ease: "power3.out" });
        gsap.from(".hero-logo-pop", { scale: 0, rotate: -40, duration: 0.9, stagger: 0.05, delay: 0.4, ease: "back.out(2)" });

        // Cada logo flota a su ritmo; los de delante se mueven mas, como objetos cerca de la camara.
        gsap.utils.toArray<HTMLElement>(".hero-logo-float").forEach((logo, i) => {
          const depth = Number(logo.dataset.depth ?? 1);
          gsap.to(logo, {
            y: (i % 2 ? 1 : -1) * 14 * depth,
            rotate: (i % 2 ? -1 : 1) * 10,
            duration: 2.6 + (i % 4) * 0.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1 + i * 0.12,
          });
        });

        // Parallax con el puntero: los logos cercanos se desplazan mas que los lejanos.
        const drift = gsap.utils.toArray<HTMLElement>(".hero-logo").map((logo) => ({
          depth: Number(logo.dataset.depth ?? 1),
          x: gsap.quickTo(logo, "x", { duration: 1.2, ease: "power3.out" }),
          y: gsap.quickTo(logo, "y", { duration: 1.2, ease: "power3.out" }),
        }));
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          drift.forEach((d) => {
            d.x(-nx * 40 * d.depth);
            d.y(-ny * 28 * d.depth);
          });
        };
        el.addEventListener("pointermove", onMove);
        return () => el.removeEventListener("pointermove", onMove);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  useEffect(() => {
    const section = root.current;
    const canvas = canvasRef.current;
    const bubble = bubbleRef.current;
    const ctx = canvas?.getContext("2d");
    if (!section || !canvas || !bubble || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const zonesMq = window.matchMedia(CON_ZONAS);
    const frames = {} as Record<ClipName, HTMLImageElement[]>;
    const ready = {} as Record<ClipName, boolean>;
    let disposed = false;

    const load = (c: ClipName) => {
      frames[c] = Array.from({ length: CLIPS[c] }, (_, i) => {
        const img = new Image();
        img.src = frameSrc(c, i);
        return img;
      });
      return Promise.all(frames[c].map((img) => img.decode().catch(() => {}))).then(() => {
        ready[c] = true;
      });
    };

    // ── Globo de mensajes ──
    const say = (key: MsgKey | null) => {
      if (key === currentMsg.current) return;
      currentMsg.current = key;
      gsap.killTweensOf(bubble);
      const visible = gsap.getProperty(bubble, "autoAlpha") as number;
      if (!key) {
        gsap.to(bubble, { autoAlpha: 0, y: 6, duration: 0.25, ease: "power2.in" });
        return;
      }
      gsap.to(bubble, {
        autoAlpha: 0,
        y: 6,
        duration: visible > 0.05 ? 0.16 : 0,
        ease: "power2.in",
        onComplete: () => {
          bubble.dataset.side = key === "left" || key === "right" ? key : "center";
          if (bubbleText.current) bubbleText.current.textContent = messages.current[key];
          gsap.fromTo(
            bubble,
            { autoAlpha: 0, y: 10, scale: 0.94 },
            { autoAlpha: 1, y: 0, scale: 1, duration: reduce ? 0 : 0.5, ease: "back.out(1.8)" },
          );
        },
      });
    };

    // ── Reproductor: recorre un tramo [from → to] de un clip, o el trabajo en bucle ──
    let clip: ClipName = "idle";
    let pos = 0;
    let to = 0;
    let dir: 1 | -1 = 1;
    let speed = 1;
    let looping = true;
    let playing = true;
    let onEnd: (() => void) | null = null;
    let fadeFrom: { clip: ClipName; pos: number } | null = null;
    let fade = 0;
    let cue = 0;

    const index = (c: ClipName, i: number) => (c === "idle" ? ((i % CLIPS.idle) + CLIPS.idle) % CLIPS.idle : Math.max(0, Math.min(CLIPS[c] - 1, i)));

    // Interpola entre el frame actual y el siguiente con un fundido: a 12 fps se ve continuo a 60 Hz.
    const drawClip = (c: ClipName, p: number, alpha: number) => {
      const list = frames[c];
      const i = Math.floor(p);
      const f = p - i;
      const a = list[index(c, i)];
      const b = list[index(c, i + 1)];
      ctx.globalAlpha = alpha;
      ctx.drawImage(a, 0, 0);
      if (f > 0.02 && b !== a) {
        ctx.globalAlpha = alpha * f;
        ctx.drawImage(b, 0, 0);
      }
    };

    // Cualquier corte (otro clip o un salto dentro del mismo) se cubre con un fundido desde lo que se veia.
    const cut = (c: ClipName, from: number) => {
      if (!reduce && (c !== clip || Math.abs(from - pos) > 1.5)) {
        fadeFrom = { clip, pos };
        fade = 1;
      }
      clip = c;
      pos = from;
      cue = 0;
    };

    const play = (c: ClipName, from: number, end: number, rate: number, then: () => void) => {
      cut(c, from);
      to = end;
      dir = end >= from ? 1 : -1;
      speed = rate;
      looping = false;
      playing = true;
      onEnd = then;
    };

    const loopIdle = () => {
      cut("idle", 0);
      looping = true;
      playing = !reduce;
      onEnd = null;
    };

    // ── Pausas sostenidas, que se acortan si el visitante ya cambio de zona ──
    let holdTimer = 0;
    let holdStart = 0;
    let holdThen: (() => void) | null = null;
    const runHold = () => {
      holdTimer = 0;
      const then = holdThen;
      holdThen = null;
      then?.();
    };
    const hold = (ms: number, then: () => void) => {
      playing = false;
      holdThen = then;
      holdStart = performance.now();
      holdTimer = window.setTimeout(runHold, pending ? HOLD_MIN : ms);
    };
    const cutHold = () => {
      if (!holdTimer) return;
      window.clearTimeout(holdTimer);
      holdTimer = window.setTimeout(runHold, Math.max(0, HOLD_MIN - (performance.now() - holdStart)));
    };

    // ── Reacciones por zona ──
    let busy = false;
    let zone: Zone | null = null;
    let pending: Zone | null = null;

    const done = () => {
      busy = false;
      loopIdle();
      if (pending) {
        const next = pending;
        pending = null;
        react(next);
      }
    };

    const react = (z: Zone) => {
      const c: ClipName = z === "center" ? "greet" : z === "left" ? "lookLeft" : "lookRight";
      if (!ready[c]) {
        pending = z;
        return;
      }
      busy = true;
      pending = null;
      if (c === "greet") {
        play("greet", 0, CLIPS.greet - 1, 1, () =>
          hold(HOLD_GREET, () => {
            say(null);
            play("greet", GREET_BACK, 0, RETURN_SPEED, done);
          }),
        );
        return;
      }
      say(z === "left" ? "left" : "right");
      play(c, 0, LOOK_PEAK, 1, () =>
        hold(HOLD_LOOK, () => {
          say(null);
          play(c, LOOK_PEAK, CLIPS[c] - 1, 1, done);
        }),
      );
    };

    const setZone = (z: Zone | null) => {
      if (z === zone) return;
      zone = z;
      if (!z) {
        pending = null;
        return;
      }
      if (busy) {
        pending = z;
        cutHold();
      } else react(z);
    };

    // ── Bucle de dibujo ──
    let raf = 0;
    let last = 0;
    const boost = reduce ? 1000 : 1; // con movimiento reducido cada tramo salta a su pose final

    const tick = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      if (playing) {
        if (looping) {
          pos = (pos + dt * FPS) % CLIPS[clip];
        } else {
          pos += dt * FPS * speed * dir * boost;
          if ((pos - to) * dir >= 0) {
            pos = to;
            playing = false;
            const then = onEnd;
            onEnd = null;
            then?.();
          }
        }
      }
      if (clip === "greet" && dir > 0) {
        while (cue < GREET_CUES.length && pos >= GREET_CUES[cue][0]) say(GREET_CUES[cue++][1]);
      }
      fade = Math.max(0, fade - dt / BLEND);

      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, FRAME.w, FRAME.h);
      drawClip(clip, pos, 1);
      if (fade > 0 && fadeFrom) drawClip(fadeFrom.clip, fadeFrom.pos, fade);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf || disposed || !ready.idle) return;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // Solo se anima mientras el hero esta en pantalla.
    let onScreen = true;
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(section);

    // ── Entrada del visitante ──
    const onMove = (e: PointerEvent) => {
      if (!zonesMq.matches || e.pointerType !== "mouse") return;
      const r = section.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      setZone(x < 0.36 ? "left" : x > 0.64 ? "right" : "center");
    };
    const onLeave = () => setZone(null);
    const onTap = () => {
      if (!busy) react("center");
    };
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("click", onTap);

    // Carga por prioridad: primero el trabajo en la laptop, luego las reacciones y el saludo.
    let autoGreet = 0;
    load("idle")
      .then(() => {
        if (disposed) return;
        loopIdle();
        if (posterRef.current) posterRef.current.style.visibility = "hidden";
        if (onScreen) start();
        return Promise.all([load("lookLeft"), load("lookRight"), load("greet")]);
      })
      .then(() => {
        if (disposed) return;
        if (pending && !busy) react(pending);
        // Sin raton no hay zonas: en movil saluda solo una vez al cargar.
        else if (!zonesMq.matches && !busy) autoGreet = window.setTimeout(() => !busy && react("center"), 600);
      });

    return () => {
      disposed = true;
      stop();
      io.disconnect();
      window.clearTimeout(holdTimer);
      window.clearTimeout(autoGreet);
      gsap.killTweensOf(bubble);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("click", onTap);
    };
  }, []);

  const logos = (front: boolean) =>
    LOGOS.filter((l) => ("blur" in l) === front).map((l, i) => (
      <div
        key={`${l.src}-${i}`}
        aria-hidden="true"
        data-depth={l.depth}
        className={`hero-logo pointer-events-none absolute ${l.pos} ${"mobile" in l ? "" : "hidden md:block"}`}
      >
        <div className="hero-logo-pop">
          <div className="hero-logo-float" data-depth={l.depth} style={{ rotate: `${l.rot}deg` }}>
            <img
              src={`/habilidades/${l.src}.svg`}
              alt=""
              draggable={false}
              className={`${l.size} select-none drop-shadow-[0_10px_18px_rgb(0_0_0_/_0.5)] ${front ? "blur-[3px] md:blur-[4px]" : ""} ${"faint" in l ? "opacity-70 blur-[1.5px]" : ""} ${"invert" in l ? "invert" : ""}`}
            />
          </div>
        </div>
      </div>
    ));

  return (
    <section id="top" ref={root} className="hero-stage relative isolate h-[100svh] min-h-[36rem] overflow-hidden">
      {/* Fondo: cuadricula tecnica, codigo tenue y brillo calido detras del personaje */}
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-x-0 bottom-0 h-[75%]" />
      <pre aria-hidden="true" className="hero-code pointer-events-none absolute left-8 top-[36%] hidden xl:block">{CODE_LEFT}</pre>
      <pre aria-hidden="true" className="hero-code pointer-events-none absolute right-8 top-[32%] hidden text-right xl:block">{CODE_RIGHT}</pre>

      {/* Nombre gigante detras del personaje, como titular del hero */}
      <h1 className="hero-name pointer-events-none absolute inset-x-0 top-20 z-0 select-none text-center md:top-[4.5rem]">
        <span className="sr-only">{`${t.hero.name}, ${t.hero.role}`}</span>
        <span aria-hidden="true" className="block overflow-hidden">
          <span className="hero-name-line block">{t.hero.nameTop}</span>
        </span>
        <span aria-hidden="true" className="block overflow-hidden">
          <span className="hero-name-line block">{t.hero.nameBottom}</span>
        </span>
      </h1>

      {logos(false)}

      {/* Personaje con la laptop, delante del nombre y pegado al borde inferior. En movil y tablet la altura
          tambien se limita para que la cabeza (a ~20% del frame) quede debajo del rol y la instruccion. */}
      <div className="hero-figure absolute bottom-0 left-1/2 z-10 aspect-[3/4] h-[min(76svh,calc(100vw*1.38),calc((100svh-8rem-var(--name-size)*1.84)/0.8))] -translate-x-1/2 lg:h-[min(78svh,52rem)]">
        {/* Primer frame como poster mientras carga el canvas */}
        <img
          ref={posterRef}
          src={frameSrc("idle", 0)}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 size-full select-none"
          draggable={false}
        />
        <canvas
          ref={canvasRef}
          width={FRAME.w}
          height={FRAME.h}
          role="img"
          aria-label={t.hero.photoAlt}
          className="absolute inset-0 size-full cursor-pointer"
        />
        <div ref={bubbleRef} aria-hidden="true" data-side="center" className="hero-bubble pointer-events-none absolute invisible opacity-0">
          <span ref={bubbleText} />
        </div>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">{logos(true)}</div>

      {/* Rol e instruccion, discretos abajo a la izquierda */}
      <div className="hero-meta pointer-events-none absolute z-30">
        <p className="hero-in text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[color:var(--hero-ink)] md:text-xs">{t.hero.role}</p>
        <p className="hero-in mt-2 flex items-center gap-3 text-xs text-[color:var(--hero-muted)] md:text-sm">
          <span aria-hidden="true" className="hero-hint relative hidden h-7 w-16 shrink-0 lg:block">
            <span className="absolute inset-x-1 bottom-1 flex justify-between">
              <i className="size-1 rounded-full bg-current opacity-50" />
              <i className="size-1 rounded-full bg-current opacity-50" />
              <i className="size-1 rounded-full bg-current opacity-50" />
            </span>
            <Cursor size={18} weight="fill" className="hero-hint-cursor absolute left-1/2 top-0 -ml-2 text-[color:var(--hero-ink)]" />
          </span>
          <HandTap aria-hidden="true" size={16} weight="duotone" className="hero-hint-tap lg:hidden" />
          <span className="hidden lg:inline">{t.hero.hint}</span>
          <span className="lg:hidden">{t.hero.hintTouch}</span>
        </p>
      </div>
    </section>
  );
}
