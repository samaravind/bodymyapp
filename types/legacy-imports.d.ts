declare module "*.css?url" {
  const href: string;
  export default href;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "@/assets/hero-athlete.jpg" {
  const src: string;
  export default src;
}

declare module "@tanstack/react-query";
declare module "@tanstack/react-router";
declare module "framer-motion";
declare module "gsap/ScrollTrigger";
