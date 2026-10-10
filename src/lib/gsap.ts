"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip, SplitText, ScrollToPlugin, Draggable, InertiaPlugin);

export const SIN_MOVIMIENTO = "(prefers-reduced-motion: reduce)";
export const CON_MOVIMIENTO = "(prefers-reduced-motion: no-preference)";

export { gsap, useGSAP, ScrollTrigger, Flip, SplitText, ScrollToPlugin, Draggable, InertiaPlugin };
