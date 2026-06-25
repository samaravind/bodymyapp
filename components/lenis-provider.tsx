"use client";

import { usePathname } from "next/navigation";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type Lenis from "lenis";
import { connectGsapWithLenis, refreshScrollTrigger } from "@/lib/animations/gsap";

const easing = (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time));

const lenisOptions = {
  lerp: 0.085,
  smoothWheel: true,
  syncTouch: true,
  syncTouchLerp: 0.075,
  touchInertiaExponent: 1.7,
  wheelMultiplier: 0.9,
  touchMultiplier: 1,
  orientation: "vertical",
  gestureOrientation: "vertical",
  autoResize: true,
  autoRaf: false,
  overscroll: true,
  stopInertiaOnNavigate: true,
  anchors: {
    offset: -72,
    duration: 1.1,
    easing,
  },
  prevent: (node: HTMLElement) =>
    Boolean(
      node.closest(
        [
          "[data-lenis-prevent]",
          "[data-scroll-lock]",
          "[role='dialog']",
          "[data-radix-popper-content-wrapper]",
          "[data-radix-scroll-area-viewport]",
          "[data-vaul-drawer]",
          ".cl-modalBackdrop",
          ".cl-modalContent",
        ].join(","),
      ),
    ),
} satisfies ConstructorParameters<typeof Lenis>[0];

declare global {
  interface Window {
    mytrineLenis?: Lenis;
  }
}

function LenisBridge({ progressRef }: { progressRef: React.RefObject<HTMLDivElement | null> }) {
  const pathname = usePathname();
  const lenis = useLenis((instance) => {
    progressRef.current?.style.setProperty("transform", `scaleX(${instance.progress})`);
    window.dispatchEvent(
      new CustomEvent("mytrine:lenis-scroll", {
        detail: {
          progress: instance.progress,
          scroll: instance.scroll,
          limit: instance.limit,
        },
      }),
    );
  }, []);

  useEffect(() => {
    if (!lenis) return;

    window.mytrineLenis = lenis;

    let active = true;
    let cleanupScroll = () => {};

    connectGsapWithLenis(lenis)
      .then((cleanup) => {
        if (!active) {
          cleanup();
          return;
        }

        cleanupScroll = cleanup;
      })
      .catch(() => {
        if (!active) return;

        let frame = 0;
        const raf = (time: number) => {
          if (!active) return;
          lenis.raf(time);
          frame = window.requestAnimationFrame(raf);
        };

        frame = window.requestAnimationFrame(raf);
        cleanupScroll = () => {
          window.cancelAnimationFrame(frame);
        };
      });

    return () => {
      active = false;
      cleanupScroll();
      if (window.mytrineLenis === lenis) delete window.mytrineLenis;
    };
  }, [lenis]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      lenis?.resize();
      refreshScrollTrigger();
      window.dispatchEvent(new Event("mytrine:lenis-route-update"));
    });

    return () => window.cancelAnimationFrame(frame);
  }, [lenis, pathname]);

  return null;
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setEnabled(!media.matches);

    syncPreference();
    media.addEventListener("change", syncPreference);

    return () => media.removeEventListener("change", syncPreference);
  }, []);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis ref={lenisRef} root options={lenisOptions}>
      <LenisBridge progressRef={progressRef} />
      <div ref={progressRef} className="mytrine-scroll-progress" aria-hidden="true" />
      {children}
    </ReactLenis>
  );
}
