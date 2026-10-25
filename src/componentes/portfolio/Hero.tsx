"use client";

import { useEffect, useRef } from "react";
import { Cursor, HandTap } from "@phosphor-icons/react";
import { CON_MOVIMIENTO, gsap, useGSAP } from "@/lib/gsap";
import { useI18n } from "./I18nProvider";

// Frames renderizados con Remotion desde /animation (npm run render). Si cambian los clips alla,
// estas cantidades deben coincidir con CLIPS de animation/src/pose.ts.
const FPS = 20;
const CLIPS = { idle: 40, lookLeft: 13, lookRight: 13, greet: 89, greetOut: 36 } as const;
const FRAME = { w: 760, h: 923 };
type ClipName = keyof typeof CLIPS;
type Zone = "left" | "center" | "right";
type MsgKey = "left" | "right" | "hey" | "hi" | "check";

const frameSrc = (c: ClipName, i: number) => `/hero/${c}/${String(i).padStart(3, "0")}.webp`;

// Las zonas solo existen con raton y pantalla ancha; en tactil el saludo se lanza solo o con un toque.
const CON_ZONAS = "(hover: hover) and (pointer: fine) and (min-width: 1024px)";
// Frame del saludo en que aparece cada frase: mirada, mano arriba, senala hacia abajo.
const GREET_CUES: [number, MsgKey][] = [
  [0, "hey"],
  [42, "hi"],
  [74, "check"],
];
const HOLD_LOOK = 2600;
const HOLD_GREET = 2400;
const HOLD_MIN = 700; // aunque el cursor cambie de zona, la reaccion se sostiene al menos esto
const BLEND = 0.16; // segundos de fundido al cambiar de clip

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
      const mm = gsap.matchMedia();
      mm.add(CON_MOVIMIENTO, () => {
        gsap.from(".hero-in", { autoAlpha: 0, y: 18, duration: 0.8, stagger: 0.12, delay: 0.15, ease: "power3.out" });
        gsap.from(".hero-figure", { autoAlpha: 0, y: 40, scale: 0.97, transformOrigin: "50% 100%", duration: 1.1, ease: "power3.out" });
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

    // ── Reproductor: clip actual, posicion en frames (decimal) y sentido ──
    let clip: ClipName = "idle";
    let pos = 0;
    let dir: 1 | -1 = 1;
    let playing = true;
    let onEnd: (() => void) | null = null;
    let fadeFrom: { clip: ClipName; pos: number } | null = null;
    let fade = 0;
    let cue = 0;

    const index = (c: ClipName, i: number) => (c === "idle" ? ((i % CLIPS.idle) + CLIPS.idle) % CLIPS.idle : Math.max(0, Math.min(CLIPS[c] - 1, i)));

    // Interpola entre el frame actual y el siguiente con un fundido: a 20 fps se ve continuo a 60 Hz.
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

    const play = (c: ClipName, d: 1 | -1, then: (() => void) | null) => {
      if (c !== clip && !reduce) {
        fadeFrom = { clip, pos };
        fade = 1;
      }
      clip = c;
      dir = d;
      pos = d > 0 ? 0 : CLIPS[c] - 1;
      playing = !(reduce && c === "idle");
      onEnd = then;
      cue = 0;
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
      play("idle", 1, null);
      if (pending) {
        const next = pending;
        pending = null;
        react(next);
      }
    };

    const react = (z: Zone) => {
      const needs: ClipName[] = z === "center" ? ["greet", "greetOut"] : [z === "left" ? "lookLeft" : "lookRight"];
      if (!needs.every((c) => ready[c])) {
        pending = z;
        return;
      }
      busy = true;
      pending = null;
      if (z === "center") {
        play("greet", 1, () =>
          hold(HOLD_GREET, () => {
            say(null);
            play("greetOut", 1, done);
          }),
        );
        return;
      }
      const look: ClipName = z === "left" ? "lookLeft" : "lookRight";
      say(z);
      play(look, 1, () =>
        hold(HOLD_LOOK, () => {
          say(null);
          play(look, -1, done);
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
    const speed = reduce ? 1000 : 1; // con movimiento reducido cada clip salta a su pose final

    const tick = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      if (playing) {
        pos += dt * FPS * dir * speed;
        const n = CLIPS[clip];
        if (clip === "idle" && !onEnd) pos = ((pos % n) + n) % n;
        else if ((dir > 0 && pos >= n - 1) || (dir < 0 && pos <= 0)) {
          pos = dir > 0 ? n - 1 : 0;
          playing = false;
          const then = onEnd;
          onEnd = null;
          then?.();
        }
      }
      if (clip === "greet") {
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
        canvas.dataset.ready = "true";
        if (posterRef.current) posterRef.current.style.visibility = "hidden";
        if (onScreen) start();
        return Promise.all([load("lookLeft"), load("lookRight"), load("greet"), load("greetOut")]);
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

  return (
    <section id="top" ref={root} className="hero-stage relative isolate flex flex-col overflow-hidden pt-16 lg:min-h-[100svh]">
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute left-1/2 top-[58%] -z-10 size-[min(115vw,64rem)] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 md:px-8">
        {/* Nota: arriba y centrada en movil y tablet, a la izquierda en escritorio */}
        <div className="relative z-10 pt-6 text-center lg:absolute lg:left-8 lg:top-1/2 lg:max-w-[17rem] lg:-translate-y-1/2 lg:pt-0 lg:text-left xl:max-w-[19rem]">
          <h1 className="hero-in text-[color:var(--hero-ink)]">
            <span className="block font-serif text-[2.4rem] leading-none tracking-tight md:text-5xl xl:text-[3.4rem]">
              {t.hero.greeting} <em className="italic">{t.hero.name}</em>
            </span>
            <span className="mt-3 block text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[color:var(--hero-muted)] md:text-xs">
              {t.hero.role}
            </span>
          </h1>
          <p className="hero-in mt-5 inline-flex items-center gap-3 text-sm text-[color:var(--hero-muted)] lg:mt-8">
            <span aria-hidden="true" className="hero-hint relative hidden h-7 w-16 lg:block">
              <span className="absolute inset-x-1 bottom-1 flex justify-between">
                <i className="size-1 rounded-full bg-current opacity-50" />
                <i className="size-1 rounded-full bg-current opacity-50" />
                <i className="size-1 rounded-full bg-current opacity-50" />
              </span>
              <Cursor size={18} weight="fill" className="hero-hint-cursor absolute left-1/2 top-0 -ml-2 text-[color:var(--hero-ink)]" />
            </span>
            <HandTap aria-hidden="true" size={18} weight="duotone" className="hero-hint-tap lg:hidden" />
            <span className="hidden lg:inline">{t.hero.hint}</span>
            <span className="lg:hidden">{t.hero.hintTouch}</span>
          </p>
        </div>

        {/* Personaje con la laptop: ancla visual del hero, pegado al borde inferior. En movil el frame
            desborda un poco el ancho (sus bordes son transparentes) para que la laptop se vea grande. */}
        <div className="hero-figure relative mt-4 aspect-[760/923] w-[min(112%,calc((100svh-15rem)*0.823))] self-center md:w-[min(92%,calc((100svh-16rem)*0.823))] lg:mx-auto lg:mt-auto lg:w-auto lg:h-[min(calc(100svh-5rem),58rem)]">
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
      </div>
      <div aria-hidden="true" className="hero-floor pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24" />
    </section>
  );
}
