"use client";

import {
  createElement,
  forwardRef,
  useEffect,
  useState,
  type CSSProperties,
  type HTMLAttributes,
} from "react";

type MotionValue = string | number | Array<string | number>;
type MotionStyle = Partial<Record<"opacity" | "x" | "y" | "scale", MotionValue>>;
type MotionTransition = {
  duration?: number;
  delay?: number;
  ease?: string | number[];
  repeat?: number;
};

type MotionElementProps = Omit<HTMLAttributes<HTMLElement>, "style"> & {
  initial?: MotionStyle;
  animate?: MotionStyle;
  transition?: MotionTransition;
  style?: CSSProperties;
};

function lastValue(value: MotionValue | undefined) {
  return Array.isArray(value) ? value[value.length - 1] : value;
}

function toPixels(value: MotionValue | undefined) {
  const resolved = lastValue(value);
  return typeof resolved === "number" ? `${resolved}px` : resolved;
}

function resolveMotionStyle(motionStyle?: MotionStyle): CSSProperties {
  if (!motionStyle) return {};

  const transforms = [
    motionStyle.x !== undefined ? `translateX(${toPixels(motionStyle.x)})` : "",
    motionStyle.y !== undefined ? `translateY(${toPixels(motionStyle.y)})` : "",
    motionStyle.scale !== undefined ? `scale(${lastValue(motionStyle.scale)})` : "",
  ].filter(Boolean);

  return {
    opacity: lastValue(motionStyle.opacity) as CSSProperties["opacity"],
    transform: transforms.length ? transforms.join(" ") : undefined,
  };
}

function resolveTransition(transition?: MotionTransition): CSSProperties {
  if (!transition) return {};

  return {
    transitionProperty: "opacity, transform",
    transitionDuration: `${transition.duration ?? 0.3}s`,
    transitionDelay: `${transition.delay ?? 0}s`,
    transitionTimingFunction: Array.isArray(transition.ease) ? "cubic-bezier(0.22, 1, 0.36, 1)" : transition.ease,
  };
}

function createMotionElement(tag: "div" | "h1" | "p") {
  return forwardRef<HTMLElement, MotionElementProps>(function MotionElement(
    { initial, animate, transition, style, ...props },
    ref,
  ) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const activeMotion = mounted && animate && Object.keys(animate).length > 0 ? animate : initial;

    return createElement(tag, {
      ...props,
      ref,
      style: {
        ...style,
        ...resolveMotionStyle(activeMotion),
        ...resolveTransition(transition),
      },
    });
  });
}

export const motion = {
  div: createMotionElement("div"),
  h1: createMotionElement("h1"),
  p: createMotionElement("p"),
};
