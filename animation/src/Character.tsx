import React from "react";
import { ease, type Arm, type Pose } from "./pose";

// Personaje toon de Carlos, a partir de su foto: pelo corto oscuro con degradado a los lados, barba de
// candado y bigote fino, polo crema con cuello y tapeta marron, reloj dorado y pulsera de cuentas.
const C = {
  out: "#2a1a14",
  skin: "#c98f69",
  skinD: "#a8704d",
  skinL: "#dba582",
  hair: "#211410",
  fade: "#4a3529",
  polo: "#f2e9d9",
  poloD: "#dccdb5",
  brown: "#4b2c1e",
  lip: "#9a5547",
  mouth: "#5a1f22",
  phone: "#29252b",
  phoneL: "#3d383f",
  rose: "#c98a8e",
  gold: "#d4a24c",
  lid: "#d8d3d6",
  lidD: "#b9b2b7",
};
const W = 5; // grosor del contorno

type P = { x: number; y: number };
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rad = (d: number) => (d * Math.PI) / 180;
function rotate(p: P, deg: number, c: P): P {
  const a = rad(deg);
  const dx = p.x - c.x;
  const dy = p.y - c.y;
  return { x: c.x + dx * Math.cos(a) - dy * Math.sin(a), y: c.y + dx * Math.sin(a) + dy * Math.cos(a) };
}

const SHOULDER = { L: { x: 352, y: 572 }, R: { x: 648, y: 572 } };
const UPPER = 125;
const FORE = 118;

function headFrame(p: Pose) {
  const c = { x: 500 + p.turn * 6, y: 330 + p.headY + p.bodyY };
  const pivot = { x: 500, y: 450 + p.bodyY };
  return { c, pivot };
}

// Posicion de cada audifono: en la cabeza sigue la inclinacion; al bajar se abre hacia afuera.
function cups(p: Pose) {
  const { c, pivot } = headFrame(p);
  const e = ease(Math.min(1, Math.max(0, p.phones)));
  const spread = Math.sin(Math.PI * e) * 46;
  return ([-1, 1] as const).map((s) => {
    const onHead = rotate({ x: c.x + s * 104 + p.turn * 6, y: c.y + 6 }, p.tilt, pivot);
    const onNeck = { x: 500 + s * 80, y: 522 + p.bodyY };
    return {
      x: lerp(onHead.x, onNeck.x, e) + s * spread,
      y: lerp(onHead.y, onNeck.y, e) - p.lift,
      rot: lerp(p.tilt, s * 16, e),
      s,
    };
  });
}

function ik(S: P, T: P, outward: number) {
  const dx = T.x - S.x;
  const dy = T.y - S.y;
  const d = Math.min(UPPER + FORE - 1, Math.max(Math.abs(UPPER - FORE) + 4, Math.hypot(dx, dy)));
  const a = Math.atan2(dy, dx);
  const b = Math.acos((UPPER * UPPER + d * d - FORE * FORE) / (2 * UPPER * d));
  const e1 = { x: S.x + UPPER * Math.cos(a + b), y: S.y + UPPER * Math.sin(a + b) };
  const e2 = { x: S.x + UPPER * Math.cos(a - b), y: S.y + UPPER * Math.sin(a - b) };
  const E = (e1.x - e2.x) * outward > 0 ? e1 : e2;
  return { E, H: { x: S.x + d * Math.cos(a), y: S.y + d * Math.sin(a) } };
}

const Seg: React.FC<{ a: P; b: P; w: number; fill: string }> = ({ a, b, w, fill }) => (
  <>
    <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={C.out} strokeWidth={w + W * 2} strokeLinecap="round" />
    <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={fill} strokeWidth={w} strokeLinecap="round" />
  </>
);

// Mano en dos pasadas (contornos y luego rellenos) para que palma y dedos formen una sola silueta.
const Hand: React.FC<{ at: P; fingers: [number, number, number][] }> = ({ at, fingers }) => {
  const segs = fingers.filter(([len]) => len > 2).map(([len, ang, w]) => ({ x: Math.cos(rad(ang)) * len, y: Math.sin(rad(ang)) * len, w }));
  return (
    <g transform={`translate(${at.x} ${at.y})`} strokeLinecap="round">
      {segs.map((f, i) => <line key={i} x2={f.x} y2={f.y} stroke={C.out} strokeWidth={f.w + W * 2} />)}
      <circle r={25 + W} fill={C.out} />
      {segs.map((f, i) => <line key={i} x2={f.x} y2={f.y} stroke={C.skin} strokeWidth={f.w} />)}
      <circle r={25} fill={C.skin} />
    </g>
  );
};

function ArmView({ arm, side, p }: { arm: Arm; side: "L" | "R"; p: Pose }) {
  const s = side === "L" ? -1 : 1;
  const S = { x: SHOULDER[side].x, y: SHOULDER[side].y + p.bodyY };
  const cup = cups(p)[side === "L" ? 0 : 1];
  const target = {
    x: lerp(arm.x, cup.x + s * 22, arm.grab),
    y: lerp(arm.y + p.bodyY, cup.y + 4, arm.grab),
  };
  const { E, H } = ik(S, target, s);
  const sleeveEnd = { x: lerp(S.x, E.x, 0.62), y: lerp(S.y, E.y, 0.62) };
  const dir = Math.atan2(H.y - E.y, H.x - E.x) * (180 / Math.PI) + arm.rot;
  const wrist = { x: lerp(E.x, H.x, 0.7), y: lerp(E.y, H.y, 0.7) };
  const fingers = 54 * arm.open;
  const index = Math.max(fingers, 54 * arm.point);
  // El pulgar se abre hacia el lado de afuera de la mano.
  const thumb = dir - s * 62;

  return (
    <g>
      <Seg a={S} b={E} w={44} fill={C.skin} />
      <Seg a={E} b={H} w={40} fill={C.skin} />
      <line x1={E.x} y1={E.y} x2={lerp(E.x, H.x, 0.4)} y2={lerp(E.y, H.y, 0.4)} stroke={C.skinL} strokeWidth={8} strokeLinecap="round" opacity={0.5} />
      {/* Manga del polo */}
      <Seg a={S} b={sleeveEnd} w={58} fill={C.polo} />
      <line x1={S.x} y1={S.y} x2={sleeveEnd.x} y2={sleeveEnd.y} stroke={C.poloD} strokeWidth={14} strokeLinecap="round" opacity={0.6} transform={`translate(${s * 10} 6)`} />
      {/* Reloj dorado (brazo derecho del visitante) o pulsera de cuentas */}
      {side === "R" ? (
        <g transform={`translate(${wrist.x} ${wrist.y}) rotate(${dir})`}>
          <rect x={-7} y={-22} width={14} height={44} rx={5} fill={C.phone} stroke={C.out} strokeWidth={3} />
          <circle r={12} fill={C.gold} stroke={C.out} strokeWidth={3.5} />
          <circle r={6} fill="#f3d58f" />
        </g>
      ) : (
        <g transform={`translate(${wrist.x} ${wrist.y}) rotate(${dir})`}>
          {[-15, -9, -3, 3, 9, 15].map((y) => (
            <circle key={y} cx={0} cy={y} r={3.6} fill={C.gold} stroke={C.out} strokeWidth={1.5} />
          ))}
        </g>
      )}
      <Hand at={H} fingers={[
        [fingers, dir - 34, 15],
        [fingers * 1.08, dir - 12, 15],
        [fingers, dir + 12, 15],
        [fingers * 0.82, dir + 34, 13],
        [index, lerp(dir - 30, dir, Math.min(1, arm.point * 2)), 15],
        [28 + 10 * arm.open, thumb, 15],
      ]} />
    </g>
  );
}

function Headphones({ p, part }: { p: Pose; part: "band" | "cups" }) {
  const [l, r] = cups(p);
  const { c, pivot } = headFrame(p);
  const e = ease(p.phones);
  if (part === "band") {
    const top = rotate({ x: c.x, y: c.y - 175 }, p.tilt, pivot);
    const cy = lerp(top.y, 470 + p.bodyY, e) - p.lift;
    const d = `M ${l.x} ${l.y - 26} C ${l.x - 6} ${cy}, ${r.x + 6} ${cy}, ${r.x} ${r.y - 26}`;
    return (
      <g fill="none" strokeLinecap="round">
        <path d={d} stroke={C.out} strokeWidth={18 + W * 2} />
        <path d={d} stroke={C.phone} strokeWidth={18} />
        <path d={d} stroke={C.phoneL} strokeWidth={5} opacity={0.8} transform="translate(0 -3)" />
      </g>
    );
  }
  return (
    <>
      {[l, r].map((cp) => (
        <g key={cp.s} transform={`translate(${cp.x} ${cp.y}) rotate(${cp.rot})`}>
          <rect x={-cp.s * 8 - 15} y={-36} width={30} height={72} rx={14} fill="#1c191d" stroke={C.out} strokeWidth={W} />
          <rect x={cp.s * 6 - 20} y={-42} width={40} height={84} rx={19} fill={C.phone} stroke={C.out} strokeWidth={W} />
          <rect x={cp.s * 6 - 11} y={-30} width={22} height={60} rx={11} fill="none" stroke={C.rose} strokeWidth={4} />
          <rect x={cp.s * 6 - 13} y={-34} width={6} height={22} rx={3} fill={C.phoneL} />
        </g>
      ))}
    </>
  );
}

function Head({ p }: { p: Pose }) {
  const { c, pivot } = headFrame(p);
  const fx = p.turn * 20;
  const gx = p.gazeX * 6.5 + p.turn * 2;
  const gy = p.gazeY * 4.5;
  // Mirar la pantalla baja un poco los parpados; parpadeo encima.
  const lid = Math.max(p.blink, 0.32 * Math.max(0, p.gazeY));
  const browY = -40 - p.brow * 9;
  const m = p.mouth;
  const jaw = 10 * m;
  const earL = 1 + 0.45 * p.turn;
  const earR = 1 - 0.45 * p.turn;

  const eye = (ex: number, id: string) => {
    const ry = 12 * (1 - lid);
    return (
      <g transform={`translate(${ex + fx} 2)`}>
        <clipPath id={id}>
          <ellipse rx={17} ry={Math.max(0.5, ry)} />
        </clipPath>
        <ellipse rx={17} ry={Math.max(0.5, ry)} fill="#fbf6ef" />
        <g clipPath={`url(#${id})`}>
          <circle cx={gx} cy={gy} r={10} fill="#4a2a17" />
          <circle cx={gx} cy={gy} r={5} fill="#120a07" />
          <circle cx={gx - 3} cy={gy - 4} r={2.6} fill="#fff" />
        </g>
        <path d={`M -20 ${-ry * 0.2} Q 0 ${-ry - 6} 20 ${-ry * 0.2}`} fill="none" stroke={C.out} strokeWidth={4.5} strokeLinecap="round" />
      </g>
    );
  };

  return (
    <g transform={`rotate(${p.tilt} ${pivot.x} ${pivot.y}) translate(${c.x} ${c.y})`}>
      {/* Orejas */}
      <g transform={`translate(${-93 + p.turn * 8} 8) scale(${earL} 1)`}>
        <ellipse rx={20} ry={30} fill={C.skin} stroke={C.out} strokeWidth={W} />
        <path d="M 6 -14 Q -8 -4 4 14" fill="none" stroke={C.skinD} strokeWidth={4} strokeLinecap="round" />
      </g>
      <g transform={`translate(${93 + p.turn * 8} 8) scale(${earR} 1)`}>
        <ellipse rx={20} ry={30} fill={C.skin} stroke={C.out} strokeWidth={W} />
        <path d="M -6 -14 Q 8 -4 -4 14" fill="none" stroke={C.skinD} strokeWidth={4} strokeLinecap="round" />
      </g>
      {/* Cara */}
      <path
        d={`M -92 -30 C -96 -112 96 -112 92 -30 C 92 40 76 ${92 + jaw} 36 ${114 + jaw} Q 0 ${128 + jaw} -36 ${114 + jaw} C -76 ${92 + jaw} -92 40 -92 -30 Z`}
        fill={C.skin}
        stroke={C.out}
        strokeWidth={W}
      />
      <path d={`M ${-70 + fx} 70 Q ${-50 + fx} ${108 + jaw} ${-10 + fx} ${118 + jaw}`} fill="none" stroke={C.skinD} strokeWidth={6} opacity={0.35} strokeLinecap="round" />
      {/* Pelo: degradado corto a los lados y volumen arriba */}
      <path d={`M -92 -18 C -96 -60 -88 -80 -76 -92 L -70 -40 C -78 -36 -86 -28 -92 -18 Z`} fill={C.fade} opacity={0.75} />
      <path d={`M 92 -18 C 96 -60 88 -80 76 -92 L 70 -40 C 78 -36 86 -28 92 -18 Z`} fill={C.fade} opacity={0.75} />
      <path
        d={`M ${-84 + fx * 0.3} -58 C -100 -120 -52 -150 ${4 + fx * 0.4} -146 C 40 -152 70 -140 86 -112 C 98 -92 94 -70 ${86 + fx * 0.3} -56 C 66 -72 34 -80 ${8 + fx * 0.5} -78 C -30 -80 -62 -72 ${-84 + fx * 0.3} -58 Z`}
        fill={C.hair}
        stroke={C.out}
        strokeWidth={W}
        strokeLinejoin="round"
      />
      <path d={`M ${-30 + fx * 0.5} -132 C 0 -142 34 -138 58 -122`} fill="none" stroke="#4a3329" strokeWidth={6} strokeLinecap="round" opacity={0.8} />
      {/* Cejas */}
      <path d={`M ${-62 + fx} ${browY + 4} Q ${-40 + fx} ${browY - 8} ${-18 + fx} ${browY + 2}`} fill="none" stroke={C.hair} strokeWidth={9} strokeLinecap="round" />
      <path d={`M ${18 + fx} ${browY + 2} Q ${40 + fx} ${browY - 8} ${62 + fx} ${browY + 4}`} fill="none" stroke={C.hair} strokeWidth={9} strokeLinecap="round" />
      {eye(-40, `eyeL`)}
      {eye(40, `eyeR`)}
      {/* Nariz */}
      <path d={`M ${-2 + fx * 1.15} 10 Q ${-12 + fx * 1.15} 34 ${-8 + fx * 1.15} 40 Q ${2 + fx * 1.15} 46 ${12 + fx * 1.15} 39`} fill="none" stroke={C.skinD} strokeWidth={4.5} strokeLinecap="round" />
      {/* Mejillas */}
      <ellipse cx={-56 + fx} cy={46} rx={15} ry={9} fill={C.rose} opacity={0.22 + 0.2 * m} />
      <ellipse cx={56 + fx} cy={46} rx={15} ry={9} fill={C.rose} opacity={0.22 + 0.2 * m} />
      {/* Boca */}
      <clipPath id="mouth">
        <path d={`M -27 63 Q 0 72 27 63 Q 21 ${64 + 34 * m} 0 ${67 + 34 * m} Q -21 ${64 + 34 * m} -27 63 Z`} transform={`translate(${fx} 0)`} />
      </clipPath>
      <g transform={`translate(${fx} 0)`}>
        <path d={`M -27 63 Q 0 72 27 63 Q 21 ${64 + 34 * m} 0 ${67 + 34 * m} Q -21 ${64 + 34 * m} -27 63 Z`} fill={C.mouth} stroke={C.out} strokeWidth={4} strokeLinejoin="round" />
      </g>
      <g clipPath="url(#mouth)">
        <rect x={-30 + fx} y={60} width={60} height={10 + 4 * m} fill="#fbf6ef" />
        <ellipse cx={fx} cy={70 + 34 * m} rx={14} ry={9} fill="#c45a5f" />
      </g>
      {/* Bigote fino y barba de candado */}
      <path d={`M ${-24 + fx} 55 Q ${fx} 48 ${24 + fx} 55`} fill="none" stroke={C.hair} strokeWidth={4.5} strokeLinecap="round" opacity={0.9} />
      <path d={`M ${-27 + fx} 58 Q ${-31 + fx} ${72 + jaw} ${-20 + fx} ${88 + jaw}`} fill="none" stroke={C.hair} strokeWidth={3.5} strokeLinecap="round" opacity={0.7} />
      <path d={`M ${27 + fx} 58 Q ${31 + fx} ${72 + jaw} ${20 + fx} ${88 + jaw}`} fill="none" stroke={C.hair} strokeWidth={3.5} strokeLinecap="round" opacity={0.7} />
      <path
        d={`M ${-17 + fx} ${85 + 30 * m} Q ${fx} ${80 + 30 * m} ${17 + fx} ${85 + 30 * m} C ${19 + fx} ${100 + 22 * m} ${12 + fx} ${120 + jaw} ${fx} ${124 + jaw} C ${-12 + fx} ${120 + jaw} ${-19 + fx} ${100 + 22 * m} ${-17 + fx} ${85 + 30 * m} Z`}
        fill={C.hair}
      />
    </g>
  );
}

function Body({ p }: { p: Pose }) {
  const y = p.bodyY;
  return (
    <g transform={`translate(0 ${y})`}>
      {/* Cuello */}
      <path d="M 464 420 L 464 516 Q 500 536 536 516 L 536 420 Z" fill={C.skin} stroke={C.out} strokeWidth={W} />
      <path d="M 464 440 Q 500 470 536 440 L 536 420 L 464 420 Z" fill={C.skinD} opacity={0.55} />
      {/* Torso con polo */}
      <path
        d="M 286 640 C 290 590 318 552 372 536 C 410 526 440 514 460 504 Q 500 528 540 504 C 560 514 590 526 628 536 C 682 552 710 590 714 640 C 700 700 680 800 676 904 L 324 904 C 320 800 300 700 286 640 Z"
        fill={C.polo}
        stroke={C.out}
        strokeWidth={W}
        strokeLinejoin="round"
      />
      <path d="M 330 600 C 360 580 380 590 400 640 L 330 640 Z" fill={C.poloD} opacity={0.7} />
      {/* Tapeta marron con botones */}
      <rect x={487} y={522} width={26} height={140} rx={4} fill={C.brown} stroke={C.out} strokeWidth={4} />
      <circle cx={500} cy={552} r={4.5} fill={C.polo} />
      <circle cx={500} cy={590} r={4.5} fill={C.polo} />
      {/* Cuello del polo con ribete crema */}
      <path d="M 458 498 L 420 548 L 474 566 L 500 526 Z" fill={C.brown} stroke={C.out} strokeWidth={W} strokeLinejoin="round" />
      <path d="M 542 498 L 580 548 L 526 566 L 500 526 Z" fill={C.brown} stroke={C.out} strokeWidth={W} strokeLinejoin="round" />
      <path d="M 427 546 L 472 561" stroke={C.polo} strokeWidth={3} strokeLinecap="round" />
      <path d="M 573 546 L 528 561" stroke={C.polo} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

function Laptop() {
  return (
    <g>
      <defs>
        <linearGradient id="lid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6e1e4" />
          <stop offset="1" stopColor={C.lidD} />
        </linearGradient>
        <radialGradient id="logo">
          <stop offset="0" stopColor="#fff" stopOpacity={0.9} />
          <stop offset="1" stopColor="#fff" stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect x={288} y={640} width={424} height={268} rx={20} fill="url(#lid)" stroke={C.out} strokeWidth={W} />
      <path d="M 304 652 L 696 652" stroke="#fff" strokeWidth={4} strokeLinecap="round" opacity={0.7} />
      <circle cx={500} cy={772} r={46} fill="url(#logo)" opacity={0.6} />
      <g fill="none" stroke={C.rose} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M 478 756 L 462 772 L 478 788" />
        <path d="M 522 756 L 538 772 L 522 788" />
        <path d="M 506 750 L 494 794" />
      </g>
      <rect x={246} y={904} width={508} height={22} rx={11} fill="#cfc8cc" stroke={C.out} strokeWidth={W} />
      <rect x={455} y={904} width={90} height={8} rx={4} fill={C.lidD} />
    </g>
  );
}

export const VIEW = { x: 150, y: 110, w: 700, h: 850 };

export const Character: React.FC<{ pose: Pose }> = ({ pose: p }) => {
  const bandBehind = p.phones > 0.15;
  return (
    <svg viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} width="100%" height="100%">
      <ellipse cx={500} cy={936} rx={300} ry={16} fill={C.out} opacity={0.12} />
      {bandBehind && <Headphones p={p} part="band" />}
      <Body p={p} />
      <Head p={p} />
      {!bandBehind && <Headphones p={p} part="band" />}
      <Headphones p={p} part="cups" />
      {p.L.front < 0.5 && <ArmView arm={p.L} side="L" p={p} />}
      {p.R.front < 0.5 && <ArmView arm={p.R} side="R" p={p} />}
      <Laptop />
      {p.L.front >= 0.5 && <ArmView arm={p.L} side="L" p={p} />}
      {p.R.front >= 0.5 && <ArmView arm={p.R} side="R" p={p} />}
    </svg>
  );
};
