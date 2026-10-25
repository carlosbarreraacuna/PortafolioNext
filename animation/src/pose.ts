// Pose del personaje y clips del hero. Cada clip es una linea de tiempo de keyframes que parte y termina
// en REST (trabajando en la laptop), asi el reproductor del hero puede encadenarlos sin saltos.

export type Arm = {
  x: number; // objetivo de la mano (coordenadas del lienzo)
  y: number;
  open: number; // 0 puno, 1 mano abierta
  point: number; // 0..1 dedo indice extendido
  rot: number; // giro extra de la mano en grados
  grab: number; // 0..1 la mano va hacia el audifono de su lado
  front: number; // >= 0.5: el brazo se dibuja delante de la laptop
};

export type Pose = {
  bodyY: number;
  turn: number; // -1 mira a la izquierda del visitante, 1 a la derecha
  tilt: number; // inclinacion de la cabeza en grados
  headY: number;
  gazeX: number;
  gazeY: number; // 1 mirando la pantalla
  blink: number;
  brow: number;
  mouth: number; // 0 sonrisa cerrada, 1 sonrisa abierta
  phones: number; // 0 en la cabeza, 1 en el cuello
  lift: number;
  L: Arm; // brazo a la izquierda del visitante
  R: Arm;
};

type Partial2<T> = { [K in keyof T]?: T[K] extends object ? Partial<T[K]> : T[K] };
type Key = [frame: number, pose: Partial2<Pose>];

const TYPE_L = { x: 425, y: 742 };
const TYPE_R = { x: 575, y: 742 };

export const REST: Pose = {
  bodyY: 0,
  turn: 0,
  tilt: 0,
  headY: 6,
  gazeX: 0,
  gazeY: 1,
  blink: 0,
  brow: 0,
  mouth: 0,
  phones: 0,
  lift: 0,
  L: { ...TYPE_L, open: 0, point: 0, rot: 0, grab: 0, front: 0 },
  R: { ...TYPE_R, open: 0, point: 0, rot: 0, grab: 0, front: 0 },
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function merge(a: Pose, b: Partial2<Pose>): Pose {
  return { ...a, ...b, L: { ...a.L, ...b.L }, R: { ...a.R, ...b.R } } as Pose;
}

function mixArm(a: Arm, b: Arm, t: number): Arm {
  const out = {} as Arm;
  for (const k of Object.keys(a) as (keyof Arm)[]) out[k] = lerp(a[k], b[k], t);
  // Cambiar de capa no se interpola: ocurre al llegar al keyframe.
  out.front = t >= 1 ? b.front : a.front;
  return out;
}

function mix(a: Pose, b: Pose, t: number): Pose {
  const out = {} as Pose;
  for (const k of Object.keys(a) as (keyof Pose)[]) {
    if (k === "L" || k === "R") continue;
    (out[k] as number) = lerp(a[k] as number, b[k] as number, t);
  }
  out.L = mixArm(a.L, b.L, t);
  out.R = mixArm(a.R, b.R, t);
  return out;
}

// Los keyframes se acumulan: cada uno solo declara lo que cambia respecto al anterior.
function timeline(start: Pose, keys: Key[]) {
  const states: [number, Pose][] = [[0, start]];
  let s = start;
  for (const [f, p] of keys) {
    s = merge(s, p);
    states.push([f, s]);
  }
  return (frame: number): Pose => {
    for (let i = 1; i < states.length; i++) {
      const [f1, p1] = states[i];
      const [f0, p0] = states[i - 1];
      if (frame <= f1) return mix(p0, p1, f1 === f0 ? 1 : ease((frame - f0) / (f1 - f0)));
    }
    return states[states.length - 1][1];
  };
}

const typing = (f: number, period: number): Partial2<Pose> => {
  const w = (2 * Math.PI * f) / period;
  return {
    L: { x: TYPE_L.x + 4 * Math.sin(w * 0.5), y: TYPE_L.y + 7 * Math.sin(w) },
    R: { x: TYPE_R.x + 4 * Math.cos(w * 0.5), y: TYPE_R.y + 7 * Math.sin(w + Math.PI) },
  };
};

// Mirar a un lado: deja de teclear, levanta la cabeza y gira con curiosidad.
const look = (side: -1 | 1) =>
  timeline(REST, [
    [4, { gazeX: side * 0.6, gazeY: 0.2 }],
    [12, { turn: side * 0.85, tilt: side * 5, headY: -4, bodyY: -3, gazeX: side, gazeY: -0.1, brow: 0.45, mouth: 0.12, L: { y: 735 }, R: { y: 735 } }],
  ]);

const greetBase = timeline(REST, [
  // Levanta la mirada hacia el visitante
  [8, { headY: -6, gazeY: 0, brow: 0.3, mouth: 0.15 }],
  // Emocion: rebote, cejas arriba, sonrisa abierta
  [11, { bodyY: -16, brow: 1, mouth: 0.85 }],
  [16, { bodyY: 0, brow: 0.9, mouth: 0.7 }],
  // Manos a los audifonos
  [24, { L: { grab: 1, open: 0.7 }, R: { grab: 1, open: 0.7 }, mouth: 0.5 }],
  // Se los quita y los baja al cuello
  [30, { lift: 26, phones: 0.35 }],
  [38, { lift: 0, phones: 1 }],
  // Suelta: una mano vuelve al teclado y la otra sube a saludar
  [46, { L: { ...TYPE_L, grab: 0, open: 0 }, R: { x: 762, y: 362, grab: 0, open: 1, rot: 0 }, brow: 0.8, mouth: 0.95, tilt: 4 }],
  [70, { brow: 0.8 }],
  // Senala hacia abajo, al portafolio
  [72, { R: { x: 720, y: 450, front: 1, open: 0.3 } }],
  [80, { R: { x: 602, y: 772, open: 0, point: 1 }, gazeY: 0.55, headY: 0, tilt: 2, mouth: 0.45, brow: 0.4 }],
  [88, {}],
]);

function greet(f: number): Pose {
  const p = greetBase(f);
  if (f > 46 && f < 70) {
    const env = Math.min(1, (f - 46) / 4, (70 - f) / 4);
    const w = ((f - 46) / 8) * 2 * Math.PI;
    p.R.x += 18 * Math.sin(w) * env;
    p.R.rot += 24 * Math.sin(w) * env;
  }
  if (f > 80) p.R.y += 12 * Math.sin((Math.PI * (f - 80)) / 8);
  return p;
}

const greetOut = timeline(greetBase(88), [
  [8, { R: { x: 705, y: 520, point: 0, open: 0.3 }, mouth: 0.3 }],
  [9, { R: { front: 0 } }],
  [16, { L: { grab: 1, open: 0.7 }, R: { grab: 1, open: 0.7 }, gazeY: 0, tilt: 0 }],
  [21, { lift: 24, phones: 0.6 }],
  [26, { lift: 0, phones: 0 }],
  [35, { ...REST }],
]);

export const FPS = 20;

export const CLIPS = {
  idle: {
    frames: 40,
    pose: (f: number): Pose => {
      const w = (2 * Math.PI * f) / 20;
      const p = merge(REST, typing(f, 10));
      p.bodyY = 1.5 * Math.sin(w);
      p.headY = REST.headY + 2 * Math.sin(w + 0.6);
      p.gazeX = 0.3 * Math.sin((2 * Math.PI * f) / 40);
      p.blink = f >= 28 && f <= 31 ? [0.6, 1, 1, 0.4][f - 28] : 0;
      return p;
    },
  },
  lookLeft: { frames: 13, pose: look(-1) },
  lookRight: { frames: 13, pose: look(1) },
  greet: { frames: 89, pose: greet },
  greetOut: { frames: 36, pose: greetOut },
} as const;

export type ClipName = keyof typeof CLIPS;
