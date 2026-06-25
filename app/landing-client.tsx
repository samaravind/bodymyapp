"use client";

import { useUser } from "@clerk/nextjs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import ConsultationClient from "./consultation-client";
import ProfileMenu from "./profile-menu";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  ["Home", "#home"],
  ["Features", "#features"],
  ["How It Works", "#roadmap"],
  ["Results", "#results"],
  ["Pricing", "#pricing"],
] as const;

const heroStats = [
  ["12,000+", "Users Onboarded"],
  ["45,000+", "Meals Planned"],
  ["28,500+", "KG Lost (Total)"],
  ["1,20,000+", "AI Suggestions"],
] as const;

const features = [
  ["AI Consultation", "Share your goals. Get a complete plan in just 15 minutes."],
  ["90-Day Roadmap", "Personalized diet, workout, budget and tracking for 90 days."],
  ["Daily Tracking", "Track calories, workouts, water, steps and progress."],
  ["Smart Food Ordering", "AI recommends meals that match your target and budget."],
  ["Budget Forecast", "Know your 90-day food route cost before you begin."],
  ["Before / After", "Measure photos, weight, body signals and transformation score."],
] as const;

const roadmap = [
  ["01", "AI Consultation", "Answer body, food, budget and lifestyle questions."],
  ["02", "Personalized Plan", "AI creates your diet, workout and recovery route."],
  ["03", "Daily Execution", "Meals, workouts and tracking appear every morning."],
  ["04", "Adaptive Updates", "The route changes when your progress or life changes."],
  ["05", "Transformation", "See before/after progress and maintenance guidance."],
] as const;

const pricing = [
  ["Starter", "499", "AI consultation and 7-day starter plan."],
  ["Pro", "1499", "Full 90-day route with diet, workout, tracking and budget."],
  ["Elite", "2999", "Advanced insights, deeper analytics and priority planning."],
] as const;

export default function LandingClient() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  if (consultationOpen) {
    return <ConsultationClient onClose={() => setConsultationOpen(false)} />;
  }

  return <LandingExperience onStart={() => setConsultationOpen(true)} />;
}

function LandingExperience({ onStart }: { onStart: () => void }) {
  const rootRef = useRef<HTMLElement | null>(null);

  usePointerVars(rootRef);
  useLenisAnimations(rootRef);

  return (
    <main ref={rootRef} className="mytrine-health-os relative min-h-screen overflow-hidden bg-[#02080d] text-white">
      <Atmosphere />
      <ScrollChrome />
      <Navigation onStart={onStart} />
      <Hero onStart={onStart} />
      <FeatureSection />
      <RoadmapSection />
      <ResultsSection />
      <PricingSection onStart={onStart} />
      <FinalCTA onStart={onStart} />
      <LandingStyles />
    </main>
  );
}

function usePointerVars(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth) * 100;
        const y = (event.clientY / window.innerHeight) * 100;
        rootRef.current?.style.setProperty("--mx", `${x}%`);
        rootRef.current?.style.setProperty("--my", `${y}%`);
        rootRef.current?.style.setProperty("--px", `${(x - 50) * 0.12}px`);
        rootRef.current?.style.setProperty("--py", `${(y - 50) * 0.12}px`);
        frame = 0;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [rootRef]);
}

function useLenisAnimations(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const lenis = new Lenis({
      anchors: {
        offset: -78,
        duration: 1.35,
        easing: (time: number) => 1 - (1 - time) ** 4,
      },
      duration: 1.32,
      smoothWheel: true,
      wheelMultiplier: 0.68,
      touchMultiplier: 1.18,
      syncTouch: true,
      easing: (time: number) => Math.min(1, 1.001 - 2 ** (-10 * time)),
    });

    lenis.on("scroll", ({ progress, velocity }) => {
      ScrollTrigger.update();
      const normalizedVelocity = Math.max(-1, Math.min(1, velocity / 35));
      const normalizedSpeed = Math.min(1, Math.abs(velocity) / 35);
      root.style.setProperty("--scroll-progress", progress.toFixed(4));
      root.style.setProperty("--scroll-velocity", normalizedVelocity.toFixed(4));
      root.style.setProperty("--scroll-speed", normalizedSpeed.toFixed(4));
      root.classList.toggle("is-scrolling", Math.abs(velocity) > 0.08);
    });
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    let splitInstances: { revert: () => void }[] = [];
    let mounted = true;

    const ctx = gsap.context(() => {
      import("split-type").then(({ default: SplitType }) => {
        if (!mounted) return;

        splitInstances = Array.from(root.querySelectorAll<HTMLElement>(".split-heading")).map(
          (element) => new SplitType(element, { types: "lines,words" }),
        );

        root.querySelectorAll<HTMLElement>("[data-section]").forEach((section) => {
          const lines = section.querySelectorAll(".line");
          const reveal = section.querySelectorAll("[data-reveal]");
          const cards = section.querySelectorAll("[data-card]");
          const clip = section.querySelector("[data-clip]");

          gsap.set(lines, { yPercent: 110, opacity: 0, filter: "blur(8px)" });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: section.hasAttribute("data-hero") ? "top 96%" : "top 74%",
              end: "bottom 58%",
              scrub: false,
            },
          });

          if (lines.length) {
            timeline.to(lines, { yPercent: 0, opacity: 1, filter: "blur(0px)", stagger: 0.055, duration: 0.95, ease: "power4.out" }, 0);
          }

          if (reveal.length) {
            timeline.fromTo(reveal, { y: 34, opacity: 0, filter: "blur(10px)" }, { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.08, duration: 0.9, ease: "power3.out" }, 0.08);
          }

          if (cards.length) {
            timeline.fromTo(cards, { y: 44, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.9, ease: "power3.out" }, 0.14);
          }

          if (clip) {
            timeline.fromTo(clip, { clipPath: "inset(10% 8% 10% 8% round 2.5rem)", scale: 0.985 }, { clipPath: "inset(0% 0% 0% 0% round 0rem)", scale: 1, duration: 1.1, ease: "power3.out" }, 0.08);
          }
        });

        const scrollProgress = root.querySelector("[data-scroll-progress]");
        const scrollThumb = root.querySelector("[data-scroll-thumb]");
        if (scrollProgress) {
          gsap.to(scrollProgress, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.18,
            },
          });
        }

        if (scrollThumb) {
          gsap.to(scrollThumb, {
            y: "calc(100vh - 140px)",
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.18,
            },
          });
        }

        const heroImage = root.querySelector("[data-hero-image]");
        const heroCopy = root.querySelector("[data-hero-copy]");
        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: 1.15,
          },
        });

        if (heroImage) heroTimeline.to(heroImage, { y: 110, scale: 1.07, filter: "blur(2px)", ease: "none" }, 0);
        if (heroCopy) heroTimeline.to(heroCopy, { y: -46, opacity: 0.76, ease: "none" }, 0);

        root.querySelectorAll<HTMLElement>("[data-lenis-layer]").forEach((layer) => {
          const depth = Number(layer.dataset.lenisLayer || 0.2);
          gsap.to(layer, {
            yPercent: depth * -18,
            ease: "none",
            scrollTrigger: {
              trigger: layer,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.25,
            },
          });
        });

        root.querySelectorAll<HTMLElement>("[data-pin-section]").forEach((section) => {
          const progress = section.querySelector("[data-road-progress]");
          const steps = section.querySelectorAll("[data-road-step]");
          const panel = section.querySelector("[data-road-panel]");

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=135%",
              scrub: 0.85,
              pin: true,
              anticipatePin: 1,
            },
          });

          if (panel) timeline.to(panel, { y: -44, scale: 1.025, ease: "none" }, 0);
          if (progress) timeline.to(progress, { scaleY: 1, ease: "none" }, 0);
          if (steps.length) timeline.to(steps, { "--active": 1, y: -16, stagger: 0.14, ease: "none" }, 0.08);
        });

        ScrollTrigger.refresh();
      });
    }, root);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      mounted = false;
      window.removeEventListener("resize", onResize);
      splitInstances.forEach((instance) => instance.revert());
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [rootRef]);
}

function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(158,255,64,0.12),transparent_24rem),radial-gradient(circle_at_76%_26%,rgba(20,184,166,0.18),transparent_34rem),linear-gradient(180deg,#02080d_0%,#06131a_48%,#02080d_100%)]" />
      <div className="momentum-grid absolute inset-0 bg-[linear-gradient(rgba(158,255,64,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.045)_1px,transparent_1px)] bg-[length:72px_72px] opacity-60" />
      <div className="ambient-glow absolute -inset-32" />
      <div className="scroll-aura absolute left-[var(--mx)] top-[var(--my)] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full" />
    </div>
  );
}

function ScrollChrome() {
  return (
    <>
      <div className="pointer-events-none fixed right-5 top-24 z-[80] hidden h-[calc(100vh-9rem)] w-px bg-white/12 lg:block">
        <span className="absolute left-1/2 top-0 h-12 w-1 -translate-x-1/2 rounded-full bg-[#a8ff3e] shadow-[0_0_22px_rgba(168,255,62,0.55)]" data-scroll-thumb />
      </div>
    </>
  );
}

function Navigation({ onStart }: { onStart: () => void }) {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#02080d]/72 backdrop-blur-2xl">
      <nav className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-8 xl:px-10">
        <Link href="#home" className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl border-2 border-[#a8ff3e] text-2xl font-black text-[#a8ff3e] shadow-[0_0_34px_rgba(168,255,62,0.24)]">M</span>
          <span className="text-2xl font-black tracking-[-0.045em]">
            MyTrine <span className="text-[#a8ff3e]">Health OS</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-bold text-white/74 lg:flex">
          {navItems.map(([label, href], index) => (
            <Link key={label} href={href} className={`relative transition hover:text-[#a8ff3e] ${index === 0 ? "text-[#a8ff3e]" : ""}`}>
              {label}
              {index === 0 ? <span className="absolute -bottom-6 left-0 h-0.5 w-full rounded-full bg-[#a8ff3e]" /> : null}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {isLoaded && isSignedIn ? (
            <ProfileMenu />
          ) : (
            <>
              <Link href="/sign-in" className="hidden rounded-2xl border border-white/18 px-6 py-3 text-sm font-bold text-white transition hover:border-[#a8ff3e]/50 sm:inline-flex">
                Sign In
              </Link>
              <MagneticButton onClick={onStart} tone="green">Get Started</MagneticButton>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section id="home" data-section data-hero className="relative z-10 min-h-screen overflow-hidden px-5 pb-8 pt-28 sm:px-8 xl:px-10">
      <div className="absolute inset-y-20 right-0 z-0 hidden w-[66vw] lg:block" data-hero-image>
        <Image
          src="/lovable/mytrine-hero.png"
          alt="MyTrine AI dashboard and fitness transformation preview"
          fill
          priority
          unoptimized
          sizes="66vw"
          className="object-cover object-[64%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#02080d_0%,rgba(2,8,13,0.82)_10%,rgba(2,8,13,0.28)_46%,rgba(2,8,13,0.10)_100%)]" />
        <div className="absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-[#02080d] to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-0 h-48 bg-gradient-to-t from-[#02080d] to-transparent" />

      <div className="mx-auto grid max-w-[1500px] items-center gap-10 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[0.82fr_1.18fr]">
        <div className="relative z-20 pb-8" data-hero-copy>
          <p data-reveal className="hero-badge">AI-Powered Transformation</p>
          <h1 className="split-heading mt-7 max-w-3xl text-[clamp(2.8rem,5vw,5.1rem)] font-black leading-[0.98] tracking-[-0.045em]">
            <span className="block sm:whitespace-nowrap">AI-Powered Fitness</span>
            <span className="block sm:whitespace-nowrap">Transformation</span>
            <span className="block sm:whitespace-nowrap">for Real Life</span>
          </h1>
          <p data-reveal className="mt-7 max-w-2xl text-lg leading-8 text-white/72">
            Get a personalized 90-day diet, workout, budget, and tracking plan powered by AI. No guesswork. No gym required. Just real results that fit your life.
          </p>
          <div data-reveal className="mt-9 flex flex-col gap-4 sm:flex-row">
            <MagneticButton onClick={onStart} tone="green">Start AI Consultation</MagneticButton>
            <MagneticLink href="#roadmap">See How It Works</MagneticLink>
          </div>
          <div data-reveal className="mt-10 flex flex-wrap items-center gap-5">
            <div className="flex -space-x-3">
              {["K", "P", "V", "A", "+1.2K"].map((item) => (
                <span key={item} className="grid h-12 w-12 place-items-center rounded-full border-2 border-[#06131a] bg-white text-xs font-black text-[#06131a]">{item}</span>
              ))}
            </div>
            <div className="h-10 w-px bg-white/14" />
            <div>
              <p className="text-lg font-black text-[#a8ff3e]">★★★★★</p>
              <p className="text-xl font-black">4.9/5 <span className="text-sm font-medium text-white/56">from 1,200+ users</span></p>
            </div>
          </div>
        </div>

        <div className="hero-scene relative z-10 min-h-[520px] lg:min-h-[720px]">
          <div className="absolute inset-[8%] rounded-full border border-[#19d889]/20" />
          <div className="absolute inset-[18%] rounded-full border border-[#19d889]/18" />
          <div className="relative mt-10 h-[520px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#07131a] shadow-[0_34px_120px_rgba(0,0,0,0.38)] lg:hidden">
            <Image
              src="/lovable/mytrine-hero.png"
              alt="MyTrine AI dashboard and fitness transformation preview"
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-[65%_center]"
            />
          </div>
        </div>
      </div>

      <div data-reveal data-card className="relative z-20 mx-auto mb-10 mt-6 grid max-w-[980px] gap-0 overflow-hidden rounded-[1.6rem] border border-white/12 bg-white/[0.075] shadow-[0_26px_90px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:grid-cols-2 xl:grid-cols-4">
        {heroStats.map(([value, label]) => (
          <div key={label} className="border-white/10 p-6 xl:border-r last:border-r-0">
            <p className="text-2xl font-black">{value}</p>
            <p className="mt-1 text-sm text-white/58">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureSection() {
  return (
    <section id="features" data-section className="relative z-10 bg-[#f7f8f4] px-5 py-24 text-[#07100b] sm:px-8 xl:px-10">
      <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div data-reveal>
          <h2 className="split-heading text-[clamp(3rem,5vw,5rem)] font-black leading-[0.95] tracking-[-0.06em]">
            Everything You Need. All in One App.
          </h2>
          <p data-reveal className="mt-6 max-w-md text-lg leading-8 text-[#07100b]/62">
            Your complete fitness transformation system powered by AI and built for real life.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" data-clip>
          {features.map(([title, copy], index) => (
            <article key={title} data-card className="rounded-[2rem] border border-black/8 bg-white p-7 shadow-[0_24px_70px_rgba(7,16,11,0.08)]">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#d9ffd8] text-xl font-black text-[#087c4b]">0{index + 1}</span>
              <h3 className="mt-8 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#07100b]/56">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoadmapSection() {
  return (
    <section id="roadmap" data-section data-pin-section className="relative z-10 min-h-screen bg-[#02080d] px-5 py-24 sm:px-8 xl:px-10">
      <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div data-lenis-layer="0.16">
          <p data-reveal className="hero-badge">How It Works</p>
          <h2 className="split-heading mt-6 text-[clamp(3rem,6vw,6.4rem)] font-black leading-[0.9] tracking-[-0.07em]">
            A smooth route from Day 1 to Day 90.
          </h2>
          <p data-reveal className="mt-7 max-w-xl text-lg leading-8 text-white/62">
            Lenis-style scrolling turns the transformation journey into one calm, continuous product story.
          </p>
        </div>
        <div data-road-panel data-lenis-layer="0.28" className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl sm:p-10">
          <div className="absolute left-9 top-12 h-[calc(100%-6rem)] w-px bg-white/12 sm:left-1/2" />
          <div data-road-progress className="absolute left-9 top-12 h-[calc(100%-6rem)] w-[3px] origin-top scale-y-0 rounded-full bg-gradient-to-b from-[#a8ff3e] via-[#19d889] to-cyan-300 sm:left-1/2" />
          <div className="grid gap-6">
            {roadmap.map(([step, title, copy], index) => (
              <article key={title} data-road-step className={`road-card max-w-xl rounded-[2rem] border border-white/10 bg-[#06131a]/82 p-6 backdrop-blur-xl ${index % 2 === 0 ? "sm:mr-auto" : "sm:ml-auto"}`} style={{ "--active": 0 } as CSSProperties}>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a8ff3e]">{step}</p>
                <h3 className="mt-3 text-2xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/56">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultsSection() {
  return (
    <section id="results" data-section className="relative z-10 bg-[#f7f8f4] px-5 py-24 text-[#07100b] sm:px-8 xl:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <h2 className="split-heading text-[clamp(3rem,6vw,6.4rem)] font-black leading-[0.9] tracking-[-0.07em]">
            Real People. Real Transformations.
          </h2>
          <p data-reveal className="text-lg leading-8 text-[#07100b]/60">
            Clear progress stories help visitors trust the system before they start.
          </p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3" data-lenis-layer="0.18">
          {["-12 kg", "-9 kg", "+8 kg"].map((value, index) => (
            <article key={value} data-card className="overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_24px_80px_rgba(7,16,11,0.08)]">
              <div className="relative h-56">
                <Image src={index === 1 ? "/lovable/mytrine-hero.png" : "/transformx-hero.png"} alt="Transformation result" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
              </div>
              <div className="p-7">
                <p className="text-5xl font-black text-[#087c4b]">{value}</p>
                <p className="mt-3 font-black">{index === 0 ? "Karthik" : index === 1 ? "Priya" : "Vikram"}</p>
                <p className="mt-3 text-sm leading-6 text-[#07100b]/56">The AI route made daily decisions easier and progress easier to trust.</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection({ onStart }: { onStart: () => void }) {
  return (
    <section id="pricing" data-section className="relative z-10 bg-[#02080d] px-5 py-24 sm:px-8 xl:px-10">
      <div className="mx-auto max-w-[1500px]">
        <p data-reveal className="hero-badge">Pricing</p>
        <h2 className="split-heading mt-6 max-w-5xl text-[clamp(3rem,6vw,6.4rem)] font-black leading-[0.9] tracking-[-0.07em]">
          Pick the level of intelligence you need.
        </h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-3" data-lenis-layer="0.16">
          {pricing.map(([name, price, copy], index) => (
            <article key={name} data-card className={`rounded-[2rem] border p-7 ${index === 1 ? "border-[#a8ff3e]/50 bg-[#a8ff3e]/10" : "border-white/10 bg-white/[0.055]"} backdrop-blur-2xl`}>
              <p className="text-2xl font-black">{name}</p>
              <p className="mt-8 text-6xl font-black text-[#a8ff3e]">₹{price}</p>
              <p className="mt-5 min-h-16 text-sm leading-7 text-white/58">{copy}</p>
              <MagneticButton onClick={onStart} tone={index === 1 ? "green" : "dark"} className="mt-8 w-full">
                Start Consultation
              </MagneticButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ onStart }: { onStart: () => void }) {
  return (
    <section data-section className="relative z-10 bg-[#02080d] px-5 py-24 sm:px-8 xl:px-10">
      <div className="mx-auto max-w-[1500px] rounded-[3rem] border border-[#a8ff3e]/20 bg-[#a8ff3e]/[0.075] p-10 backdrop-blur-2xl sm:p-14">
        <p data-reveal className="hero-badge">Start Today</p>
        <h2 className="split-heading mt-6 max-w-5xl text-[clamp(3rem,6vw,6.4rem)] font-black leading-[0.9] tracking-[-0.07em]">
          Your 90-day AI transformation starts with one consultation.
        </h2>
        <div data-reveal className="mt-10">
          <MagneticButton onClick={onStart} tone="green">Create My Plan</MagneticButton>
        </div>
      </div>
    </section>
  );
}

function MagneticButton({ children, onClick, tone, className = "" }: { children: ReactNode; onClick: () => void; tone: "green" | "dark"; className?: string }) {
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={(event) => moveMagnet(event, ref.current)}
      onMouseLeave={() => resetMagnet(ref.current)}
      className={`magnetic inline-flex items-center justify-center rounded-2xl px-7 py-4 text-base font-black transition ${
        tone === "green"
          ? "bg-[linear-gradient(135deg,#baff3d,#51db82)] text-[#031008] shadow-[0_22px_70px_rgba(168,255,62,0.24)]"
          : "border border-white/12 bg-white/[0.055] text-white"
      } ${className}`}
    >
      {children}
      <span className="ml-3">→</span>
    </button>
  );
}

function MagneticLink({ children, href }: { children: ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={(event) => moveMagnet(event, ref.current)}
      onMouseLeave={() => resetMagnet(ref.current)}
      className="magnetic inline-flex items-center justify-center rounded-2xl border border-white/14 bg-white/[0.035] px-7 py-4 text-base font-black text-white backdrop-blur-xl"
    >
      {children}
      <span className="ml-3">▶</span>
    </Link>
  );
}

function moveMagnet(event: MouseEvent<HTMLElement>, element: HTMLElement | null) {
  if (!element) return;
  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left - rect.width / 2;
  const y = event.clientY - rect.top - rect.height / 2;
  element.style.transform = `translate3d(${x * 0.15}px, ${y * 0.2}px, 0)`;
}

function resetMagnet(element: HTMLElement | null) {
  if (!element) return;
  element.style.transform = "translate3d(0, 0, 0)";
}

function LandingStyles() {
  return (
    <style jsx global>{`
      .mytrine-health-os {
        --mx: 50%;
        --my: 50%;
        --px: 0px;
        --py: 0px;
        --scroll-progress: 0;
        --scroll-velocity: 0;
        --scroll-speed: 0;
        color-scheme: dark;
      }

      .ambient-glow {
        background:
          radial-gradient(circle at 22% 18%, rgba(168, 255, 62, 0.12), transparent 28rem),
          radial-gradient(circle at 76% 38%, rgba(20, 184, 166, 0.14), transparent 34rem);
        filter: blur(18px);
        animation: ambient-drift 18s ease-in-out infinite alternate;
      }

      .scroll-aura {
        background:
          radial-gradient(circle, rgba(168, 255, 62, calc(0.08 + (var(--scroll-speed) * 0.10))), transparent 60%),
          radial-gradient(circle, rgba(20, 184, 166, 0.07), transparent 72%);
        filter: blur(calc(22px + (var(--scroll-speed) * 16px)));
        opacity: calc(0.55 + (var(--scroll-speed) * 0.25));
        transform:
          translate(-50%, -50%)
          translateY(calc(var(--scroll-velocity) * -36px))
          scale(calc(1 + (var(--scroll-speed) * 0.08)));
        transition: opacity 180ms linear;
      }

      .momentum-grid {
        transform:
          translate3d(0, calc(var(--scroll-progress) * -120px), 0)
          skewY(calc(var(--scroll-velocity) * -1.5deg));
        transition: transform 120ms linear;
      }

      .mytrine-health-os.is-scrolling .ambient-glow {
        filter: blur(24px) saturate(1.25);
      }

      [data-section] {
        isolation: isolate;
        transform: translate3d(0, 0, 0);
      }

      [data-clip] {
        will-change: clip-path, transform;
      }

      .hero-badge {
        display: inline-flex;
        border: 1px solid rgba(168, 255, 62, 0.32);
        border-radius: 999px;
        background: rgba(168, 255, 62, 0.075);
        padding: 0.72rem 1.15rem;
        color: #a8ff3e;
        font-size: 0.78rem;
        font-weight: 900;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }

      .hero-scene {
        transform: translate3d(var(--px), var(--py), 0);
        transition: transform 150ms linear;
      }

      [data-hero-image] {
        will-change: transform, filter;
      }

      [data-lenis-layer] {
        will-change: transform;
      }

      .road-card {
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.08),
          0 30px 90px rgba(0, 0, 0, 0.24),
          0 0 calc(var(--active, 0) * 80px) rgba(168, 255, 62, 0.16);
        transform: translateY(calc(var(--active, 0) * -8px)) scale(calc(1 + var(--active, 0) * 0.025));
        border-color: color-mix(in srgb, rgba(255, 255, 255, 0.10), #a8ff3e calc(var(--active, 0) * 72%));
      }

      .magnetic {
        will-change: transform;
      }

      @keyframes ambient-drift {
        from { transform: translate3d(-2%, -1%, 0) scale(1); opacity: 0.72; }
        to { transform: translate3d(2%, 1%, 0) scale(1.08); opacity: 1; }
      }

      @media (max-width: 1023px) {
        .hero-scene {
          min-height: 520px;
          transform: none;
        }
      }

      @media (max-width: 767px) {
        .hero-scene {
          min-height: 440px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .ambient-glow {
          animation: none !important;
        }

        .hero-scene,
        .road-card,
        .magnetic {
          transform: none !important;
          transition: none !important;
        }
      }
    `}</style>
  );
}
