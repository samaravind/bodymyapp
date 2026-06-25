"use client";

import type Lenis from "lenis";
import type { gsap as gsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

type GsapModule = typeof import("gsap");
type ScrollTriggerModule = typeof import("gsap/ScrollTrigger");

export type GsapRuntime = {
  gsap: typeof gsapType;
  ScrollTrigger: typeof ScrollTriggerType;
};

export type GsapLenisCleanup = () => void;

let runtimePromise: Promise<GsapRuntime> | null = null;

export function getGsapRuntime() {
  if (!runtimePromise) {
    runtimePromise = Promise.all([
      import("gsap") as Promise<GsapModule>,
      import("gsap/ScrollTrigger") as Promise<ScrollTriggerModule>,
    ]).then(([gsapModule, scrollTriggerModule]) => {
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);
      gsap.ticker.lagSmoothing(0);

      return { gsap, ScrollTrigger };
    });
  }

  return runtimePromise;
}

export async function connectGsapWithLenis(lenis: Lenis): Promise<GsapLenisCleanup> {
  const { gsap, ScrollTrigger } = await getGsapRuntime();
  const updateScrollTrigger = () => ScrollTrigger.update();
  const updateLenis = (time: number) => lenis.raf(time * 1000);

  lenis.on("scroll", updateScrollTrigger);
  gsap.ticker.add(updateLenis);
  ScrollTrigger.refresh();

  return () => {
    lenis.off("scroll", updateScrollTrigger);
    gsap.ticker.remove(updateLenis);
    ScrollTrigger.refresh();
  };
}

export function refreshScrollTrigger() {
  void getGsapRuntime().then(({ ScrollTrigger }) => {
    ScrollTrigger.refresh();
  });
}
