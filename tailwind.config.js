/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/componentes/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["selector", "[data-theme='dark']"],
  theme: {
    extend: {
      fontFamily: {
        space:    ["var(--font-space)",    "system-ui", "sans-serif"],
        mono:     ["var(--font-mono)",     "monospace"],
        fraunces: ["var(--font-fraunces)", "Georgia",   "serif"],
        inter:    ["var(--font-inter)",    "system-ui", "sans-serif"],
      },
      keyframes: {
        "drift-1":  { "0%,100%": { transform: "translate(0,0)" }, "50%": { transform: "translate(30px,-20px)" } },
        "drift-2":  { "0%,100%": { transform: "translate(0,0)" }, "50%": { transform: "translate(-25px,25px)" } },
        "fade-up":  { from: { opacity: "0", transform: "scale(0.94)" }, to: { opacity: "1", transform: "scale(1)" } },
        "chip-in":  { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "spin-slow":{ to: { transform: "rotate(360deg)" } },
        "blink-dot":{ "0%,100%": { opacity: "1" }, "50%": { opacity: "0.15" } },
        "slide-left":  { from: { opacity: "0", transform: "translateX(-24px)" }, to: { opacity: "1", transform: "translateX(0)" } },
        "slide-right": { from: { opacity: "0", transform: "translateX(24px)" },  to: { opacity: "1", transform: "translateX(0)" } },
        "reveal-up":   { from: { opacity: "0", transform: "translateY(20px)" },  to: { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        "drift-1":    "drift-1 14s ease-in-out infinite",
        "drift-2":    "drift-2 16s ease-in-out infinite",
        "fade-up":    "fade-up 1.2s cubic-bezier(.2,.8,.2,1) .25s both",
        "chip-in-1":  "chip-in .6s ease .9s both",
        "chip-in-2":  "chip-in .6s ease 1.1s both",
        "chip-in-3":  "chip-in .6s ease 1.3s both",
        "spin-slow":  "spin-slow 60s linear infinite",
        "blink-dot":  "blink-dot 1.8s ease-in-out infinite",
        "slide-left": "slide-left .9s cubic-bezier(.2,.8,.2,1) .1s both",
        "slide-right":"slide-right .9s cubic-bezier(.2,.8,.2,1) .15s both",
        "reveal-up":  "reveal-up .7s cubic-bezier(.2,.8,.2,1) both",
      },
      gridTemplateColumns: {
        "hero": "1fr 1.1fr 1fr",
      },
    },
  },
  plugins: [],
};
