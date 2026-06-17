"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ConsultationClient from "./consultation-client";
import ProfileMenu from "./profile-menu";

const miniCards = [
  ["AI Consultation", "15-min", "AI"],
  ["Smart Plan", "Daily", "PL"],
  ["Food & Workout", "Tracking", "FD"],
];

const phonePlans = ["High Protein Breakfast", "Full Body Strength", "Hydrate More"];
const phoneNav = ["Home", "Plan", "Track", "Food", "Profile"];

const trustAvatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&h=96&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&h=96&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&h=96&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=96&h=96&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=96&h=96&q=80",
];

const planMetrics = [
  ["Plan Duration", "90 Days", "3 progressive phases"],
  ["Daily Budget", "₹150-500", "food + snacks"],
  ["AI Suggestions", "Personalized", "diet + workout"],
];

const dashboardCards = [
  ["AI Body Analysis Engine", "Your age, weight, height, gender, health conditions, and goal → AI calculates BMR, TDEE, protein target, and calorie budget instantly.", ["BMR & TDEE", "Body fat estimate", "Health risk check"]],
  ["Nutrition Engine", "AI balances calories, protein, food preferences, cuisine type, allergies, and monthly budget before creating your meal chart.", ["Macro split", "Smart grocery list", "Order-ready meals"]],
  ["Training Builder", "Gym, home, or hybrid routines are adjusted from your strength level, recovery time, and available equipment.", ["Video workouts", "Progressive overload", "Rest day logic"]],
  ["Progress Intelligence", "Your weight, water, sleep, meals, and photos turn into weekly coaching decisions that adapt your plan.", ["Trend reports", "Habit score", "Before/after vault"]],
];

const mealFlow = [
  ["01", "Choose goal", "Fat loss, muscle gain, or healthy maintenance — AI adjusts every meal."],
  ["02", "AI builds plate", "Calories, protein, cuisine, allergies, and cost are matched automatically."],
  ["03", "MCP Smart Order", "One tap → Swiggy/Zomato opens with AI-selected meal in cart. Pay & track."],
  ["04", "Track & adapt", "Every meal logged updates your score and tomorrow's suggestions."],
];

const pricingPlans = [
  ["Starter", "₹499", "For trying your first AI health plan", ["AI consultation", "7-day diet plan", "Basic workout tracker"]],
  ["Transformation", "₹1,499", "For a complete guided 90-day journey", ["90-day meal + workout plan", "Food ordering support", "Weekly progress report"]],
  ["Coach Plus", "₹2,999", "For deeper accountability and premium insights", ["Everything in Transformation", "Priority AI coach", "Advanced budget planner"]],
];

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h11m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7 5.5v9l7-4.5-7-4.5Z" fill="currentColor" />
    </svg>
  );
}

function StepIcon({ type }: { type: string }) {
  const common = "h-5 w-5 text-lime-300";

  if (type === "AI") {
    return (
      <svg className={common} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 6.5h12v7H8l-4 3v-10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M7 10h.01M10 10h.01M13 10h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "PL") {
    return (
      <svg className={common} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M5 4h10v12H5V4Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 8h4M8 11h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "TR") {
    return (
      <svg className={common} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 15V9m4 6V5m4 10v-8m4 8V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "FD") {
    return (
      <svg className={common} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M5 7h10l-1 10H6L5 7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 7a2 2 0 1 1 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className={common} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 4h10v2a5 5 0 0 1-4 4.9V14h2v2H7v-2h2v-3.1A5 5 0 0 1 5 6V4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function StarRating() {
  return (
    <p className="text-sm font-black text-yellow-400" aria-label="5 star rating">
      &#9733;&#9733;&#9733;&#9733;&#9733;
    </p>
  );
}

export default function LandingClient() {
  const [started, setStarted] = useState(false);

  const startConsultation = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setStarted(true);
  };

  if (started) {
    return <ConsultationClient onClose={() => setStarted(false)} />;
  }

  return (
    <>
      <LandingPage onStart={startConsultation} />
      <WhatsAppButton />
    </>
  );
}

function LandingPage({ onStart }: { onStart: () => void }) {
  const shareOnInstagram = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = userAgent.includes("android");
    const isMobile = /android|iphone|ipad|ipod/.test(userAgent);
    const webStoryUrl = "https://www.instagram.com/create/story/";

    if (isAndroid) {
      const fallbackTimer = window.setTimeout(() => {
        window.location.href = webStoryUrl;
      }, 1200);
      const cancelFallback = () => window.clearTimeout(fallbackTimer);

      window.addEventListener("pagehide", cancelFallback, { once: true });
      document.addEventListener("visibilitychange", cancelFallback, { once: true });
      window.location.href =
        "intent://story-camera#Intent;scheme=instagram;package=com.instagram.android;end";
    } else if (isMobile) {
      const fallbackTimer = window.setTimeout(() => {
        window.location.href = webStoryUrl;
      }, 1200);
      const cancelFallback = () => window.clearTimeout(fallbackTimer);

      window.addEventListener("pagehide", cancelFallback, { once: true });
      document.addEventListener("visibilitychange", cancelFallback, { once: true });
      window.location.href = "instagram://story-camera";
    } else {
      window.location.href = webStoryUrl;
    }
  };

  return (
    <main className="min-h-screen bg-[#02050a] text-white">
      <section className="relative isolate min-h-screen overflow-x-hidden bg-[#02050a] text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_68%_43%,rgba(132,204,22,0.28),transparent_24%),linear-gradient(115deg,#01040a_0%,#03070d_46%,#06120c_100%)]" />
        <div className="absolute inset-x-0 top-20 -z-10 h-px bg-white/10" />
        <div className="absolute right-[7%] top-24 -z-10 h-[650px] w-[650px] rounded-full border border-lime-400/10" />
        <div className="absolute right-[14%] top-40 -z-10 h-[470px] w-[470px] rounded-full border border-lime-400/15" />
        <div className="absolute inset-y-20 right-0 -z-10 w-[52%] opacity-25 [background-image:radial-gradient(rgba(132,204,22,0.58)_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="relative mx-auto w-full max-w-[1500px] px-5 pb-4 pt-4 sm:px-8 lg:px-12">
          <nav className="flex h-12 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-lime-300 to-emerald-500 text-xl font-black text-slate-950 shadow-lg shadow-lime-500/25">
                M
              </div>
              <span className="text-2xl font-black tracking-normal">MyTrine</span>
            </div>

            <div className="hidden items-center gap-9 text-sm font-semibold text-white/85 lg:flex">
              <a className="border-b-2 border-lime-400 pb-3 text-lime-400" href="/home">Home</a>
              <Link className="transition hover:text-white" href="/features">Features</Link>
              <a className="transition hover:text-white" href="/how-it-works">How It Works</a>
              <Link className="transition hover:text-white" href="/results">Results</Link>
              <Link className="transition hover:text-white" href="/pricing">Pricing</Link>
              <a className="transition hover:text-white" href="/faq">FAQ</a>
            </div>

            <AuthNavControls />
          </nav>

          <div id="home" className="grid items-center gap-8 pb-2 pt-6 lg:min-h-[500px] lg:grid-cols-[0.39fr_0.61fr] xl:min-h-[520px]">
            <div className="relative z-10">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-300/35 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-lime-500/10 backdrop-blur">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-lime-300 text-[11px] font-black text-slate-950">+</span>
                AI-Powered Transformation
              </div>

              <h1 className="max-w-[600px] text-5xl font-black leading-[0.98] tracking-normal text-white sm:text-6xl lg:text-[3.55rem] xl:text-[4rem]">
                Your Body
                <span className="block bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(163,230,53,0.35)]">
                  90-Day Transformation,
                </span>
                <span className="block">Fully Managed</span>
                <span className="block">by AI</span>
              </h1>

              <p className="mt-4 max-w-[470px] text-base leading-7 text-slate-300">
                Answer 22 questions. Get a complete diet + workout plan for 90 days.
                Track daily progress, order food from Swiggy/Zomato in one tap,
                and see your before/after transformation &mdash; all in one app.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {["🔥 Fat Loss", "💪 Muscle Gain", "⚖️ Maintenance", "🧘 Yoga & Flexibility"].map((goal) => (
                  <span key={goal} className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-bold text-white/80 backdrop-blur transition hover:border-lime-300/40 hover:bg-lime-300/10 hover:text-lime-300">
                    {goal}
                  </span>
                ))}
              </div>

              <div className="mt-4 grid max-w-[500px] gap-2 sm:grid-cols-3">
                {planMetrics.map(([label, value, note]) => (
                  <div key={label} className="rounded-xl border border-lime-300/20 bg-lime-300/[0.06] px-4 py-3 shadow-lg shadow-black/15">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-lime-200/70">{label}</p>
                    <p className="mt-1 text-lg font-black text-white">{value}</p>
                    <p className="text-xs font-semibold text-slate-400">{note}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 grid max-w-[500px] gap-0 overflow-hidden rounded-xl border border-white/15 bg-white/[0.04] shadow-xl shadow-black/20 backdrop-blur-xl sm:grid-cols-3">
                {miniCards.map(([title, value, icon]) => (
                  <div key={title} className="border-white/10 px-5 py-3 text-center transition hover:bg-white/[0.08] sm:border-r sm:last:border-r-0">
                    <span className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-xl border border-lime-300/35 bg-lime-400/10 text-lime-300">
                      <StepIcon type={icon} />
                    </span>
                    <p className="text-sm font-black text-white">{title}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-400">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onStart}
                  className="inline-flex items-center justify-center gap-4 rounded-xl bg-gradient-to-r from-lime-300 to-emerald-500 px-7 py-3.5 text-sm font-black text-slate-950 shadow-xl shadow-lime-500/25 transition hover:-translate-y-0.5 hover:shadow-lime-500/40"
                >
                  Start AI Consultation
                  <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-full bg-slate-950/15">
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                </button>

                <a href="/how-it-works" className="inline-flex items-center justify-center gap-4 rounded-xl border border-white/25 bg-white/[0.03] px-7 py-3.5 text-center text-sm font-black text-white shadow-lg shadow-black/20 backdrop-blur transition hover:-translate-y-0.5 hover:border-lime-300/40 hover:bg-white/[0.07]">
                  See How It Works
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-white/40 text-white">
                    <PlayIcon />
                  </span>
                </a>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-5">
                <div className="flex -space-x-3">
                  {trustAvatars.map((avatar, index) => (
                    <span key={avatar} className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-[#030812] bg-slate-800" style={{ zIndex: trustAvatars.length - index }}>
                      <Image src={avatar} alt="" fill sizes="36px" className="object-cover" />
                    </span>
                  ))}
                </div>
                <div className="h-8 w-px bg-white/15" />
                <div>
                  <StarRating />
                  <p className="text-sm font-semibold text-slate-300">4.9/5 from 1,200+ users</p>
                </div>
              </div>
            </div>

            <HeroPhone />
          </div>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/25 lg:grid lg:grid-cols-[1fr_1fr]">
          <div className="p-7 sm:p-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-lime-300">Step 1: AI Body Scan</p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">Just 15 minutes. 22 smart questions.</h2>
            <p className="mt-4 leading-7 text-slate-400">
              You don&apos;t need to know anything about fitness. Just answer simple questions about your body, daily routine, and what you like to eat. MyTrine&apos;s AI handles the rest.
            </p>
            <div className="mt-6 grid gap-3">
              <div className="flex gap-4 rounded-2xl border border-white/10 bg-black/25 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lime-300 text-sm font-black text-slate-950">1</span>
                <div>
                  <h3 className="font-black text-white">Personal Details</h3>
                  <p className="mt-1 text-sm text-slate-400">Age, gender, height, weight, fitness goal — fat loss, muscle gain, or maintenance</p>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl border border-white/10 bg-black/25 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lime-300 text-sm font-black text-slate-950">2</span>
                <div>
                  <h3 className="font-black text-white">Health & Food Preferences</h3>
                  <p className="mt-1 text-sm text-slate-400">Health conditions (diabetes, PCOD, thyroid), allergies, vegetarian/non-veg, cuisine preference</p>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl border border-white/10 bg-black/25 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lime-300 text-sm font-black text-slate-950">3</span>
                <div>
                  <h3 className="font-black text-white">Lifestyle & Budget</h3>
                  <p className="mt-1 text-sm text-slate-400">Sleep hours, water intake, daily activity level, monthly food budget, Swiggy/Zomato preference</p>
                </div>
              </div>
            </div>
            <button type="button" onClick={onStart} className="mt-6 inline-flex items-center justify-center gap-3 rounded-xl bg-lime-300 px-6 py-3.5 text-sm font-black text-slate-950 transition hover:bg-lime-200">
              Start Your Body Scan <ArrowIcon />
            </button>
          </div>
          <div className="relative min-h-[400px] bg-[radial-gradient(circle_at_50%_40%,rgba(132,204,22,0.25),transparent_34%),linear-gradient(145deg,#07120c,#02050a)] p-7">
            <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(163,230,53,0.4)_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="relative mx-auto mt-8 max-w-sm space-y-4">
              <div className="rounded-2xl border border-lime-300/20 bg-black/60 p-4 backdrop-blur">
                <p className="text-xs font-black uppercase tracking-wider text-lime-300">AI Calculates</p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {[["BMR", "1,682 kcal"], ["TDEE", "2,150 kcal"], ["Protein", "128g/day"], ["Target Weight", "72 kg"]].map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-white/10 bg-white/[0.06] p-3 text-center">
                      <p className="text-[10px] text-slate-400">{label}</p>
                      <p className="text-sm font-black text-lime-300">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-lime-300/20 bg-black/60 p-4 backdrop-blur">
                <p className="text-xs font-black uppercase tracking-wider text-lime-300">Your 90-Day Summary</p>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-400">Plan Type</span><b className="text-white">Fat Loss</b></div>
                  <div className="flex justify-between"><span className="text-slate-400">Duration</span><b className="text-white">12 Weeks</b></div>
                  <div className="flex justify-between"><span className="text-slate-400">Total Budget</span><b className="text-lime-300">₹13,500</b></div>
                  <div className="flex justify-between"><span className="text-slate-400">Meals/Day</span><b className="text-white">4 (B/L/D/S)</b></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(163,230,53,0.10),rgba(255,255,255,0.03))] shadow-2xl shadow-black/25 lg:grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-7 sm:p-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-lime-300">AI Coach: Riya</p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">Your personal AI health coach, always awake</h2>
            <p className="mt-4 leading-7 text-slate-400">
              Meet Riya — your AI health coach. Trained on Indian bodies, foods, and lifestyles. She guides you through every meal, every workout, and every doubt — 24/7.
            </p>
            <div className="mt-6 grid gap-3">
              <div className="flex gap-4 rounded-2xl border border-white/10 bg-black/25 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-lime-300 to-emerald-500 text-lg font-black text-slate-950">💬</span>
                <div>
                  <h3 className="font-black text-white">Ask anything, anytime</h3>
                  <p className="mt-1 text-sm text-slate-400">&quot;What should I eat today?&quot;, &quot;Fix my posture&quot;, &quot;Swap this meal&quot; — Riya responds instantly.</p>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl border border-white/10 bg-black/25 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-lime-300 to-emerald-500 text-lg font-black text-slate-950">📸</span>
                <div>
                  <h3 className="font-black text-white">Snap & track your food</h3>
                  <p className="mt-1 text-sm text-slate-400">Take a photo of your meal. AI instantly identifies food items, calories, and macros — no manual logging.</p>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl border border-white/10 bg-black/25 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-lime-300 to-emerald-500 text-lg font-black text-slate-950">📊</span>
                <div>
                  <h3 className="font-black text-white">Weekly health score & insights</h3>
                  <p className="mt-1 text-sm text-slate-400">Riya analyzes your week — diet, workout, sleep, water — and gives you a score with actionable tips.</p>
                </div>
              </div>
            </div>
            <Link href="/pricing" className="mt-6 inline-flex items-center justify-center gap-3 rounded-xl border border-lime-300/40 bg-lime-300/10 px-6 py-3.5 text-sm font-black text-lime-300 transition hover:bg-lime-300 hover:text-slate-950">
              Talk to AI Coach Riya <ArrowIcon />
            </Link>
          </div>
          <div className="relative min-h-[420px] bg-[radial-gradient(circle_at_50%_30%,rgba(132,204,22,0.20),transparent_34%),linear-gradient(145deg,#07120c,#02050a)] p-7">
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(163,230,53,0.4)_1px,transparent_1px)] [background-size:18px_18px]" />
            <div className="relative mx-auto mt-10 max-w-xs space-y-3">
              <div className="rounded-2xl border border-lime-300/20 bg-black/60 p-4 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-lime-300 to-emerald-500 text-sm font-black text-slate-950">R</span>
                  <div>
                    <p className="text-sm font-black text-white">AI Coach Riya</p>
                    <p className="text-xs text-lime-300/70">Online • Ready to help</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-none border border-white/10 bg-white/[0.08] px-4 py-3 text-xs text-slate-200 backdrop-blur max-w-[85%]">
                  Hey! I see you skipped yesterday&apos;s workout. Want a quick 10-min reset routine for today? 🔥
                </div>
              </div>
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-br-none border border-lime-300/30 bg-lime-300/10 px-4 py-3 text-xs text-lime-200 backdrop-blur max-w-[85%]">
                  Yes please! Something easy 🙌
                </div>
              </div>
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-none border border-white/10 bg-white/[0.08] px-4 py-3 text-xs text-slate-200 backdrop-blur max-w-[85%]">
                  Perfect! Let&apos;s start with 3 sets of bodyweight squats, push-ups, and plank. Follow along with the video below 👇
                </div>
              </div>
              <div className="rounded-2xl border border-lime-300/20 bg-black/60 p-3 text-center backdrop-blur">
                <p className="text-xs text-slate-400">⚡ She responds in under 2 seconds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 sm:px-8 lg:px-10">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(163,230,53,0.08),rgba(255,255,255,0.03))] p-6 shadow-2xl shadow-black/25 sm:p-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-lime-300">AI Plan Categories</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Plans built for your body type</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">Every plan has target macros calculated from your body scan. No one-size-fits-all.</p>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group rounded-2xl border border-white/10 bg-black/25 p-5 transition hover:-translate-y-1 hover:border-lime-300/30">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white">Fat Loss</h3>
                <span className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-0.5 text-xs font-black text-slate-950">Popular</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[{label:"Protein", value:"35%", color:"text-lime-300"}, {label:"Carbs", value:"40%", color:"text-amber-300"}, {label:"Fat", value:"25%", color:"text-orange-300"}].map((m) => (
                  <div key={m.label} className="rounded-xl border border-white/10 bg-white/[0.06] p-2 text-center">
                    <p className="text-lg font-black text-white">{m.value}</p>
                    <p className="text-[10px] text-slate-400">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 space-y-1 text-xs text-slate-400">
                <p>🔥 Calorie deficit • High protein • Low carb</p>
                <p>🏃 Home cardio + bodyweight circuits</p>
              </div>
            </div>

            <div className="group rounded-2xl border border-lime-300/30 bg-lime-300/10 p-5 transition hover:-translate-y-1 hover:border-lime-300/50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white">Muscle Gain</h3>
                <span className="rounded-full bg-lime-300 px-3 py-0.5 text-xs font-black text-slate-950">Best Value</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[{label:"Protein", value:"40%", color:"text-lime-300"}, {label:"Carbs", value:"40%", color:"text-amber-300"}, {label:"Fat", value:"20%", color:"text-orange-300"}].map((m) => (
                  <div key={m.label} className="rounded-xl border border-white/10 bg-white/[0.06] p-2 text-center">
                    <p className="text-lg font-black text-white">{m.value}</p>
                    <p className="text-[10px] text-slate-400">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 space-y-1 text-xs text-slate-400">
                <p>💪 Calorie surplus • High protein • Moderate fat</p>
                <p>🏋️ Progressive overload • Compound lifts</p>
              </div>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-black/25 p-5 transition hover:-translate-y-1 hover:border-lime-300/30">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white">Balanced</h3>
                <span className="rounded-full bg-white/15 px-3 py-0.5 text-xs font-black text-slate-300">Maintenance</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[{label:"Protein", value:"30%", color:"text-lime-300"}, {label:"Carbs", value:"45%", color:"text-amber-300"}, {label:"Fat", value:"25%", color:"text-orange-300"}].map((m) => (
                  <div key={m.label} className="rounded-xl border border-white/10 bg-white/[0.06] p-2 text-center">
                    <p className="text-lg font-black text-white">{m.value}</p>
                    <p className="text-[10px] text-slate-400">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 space-y-1 text-xs text-slate-400">
                <p>⚖️ Maintenance calories • Balanced macros</p>
                <p>🧘 Yoga + walking + light strength</p>
              </div>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-black/25 p-5 transition hover:-translate-y-1 hover:border-lime-300/30">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white">Vegan</h3>
                <span className="rounded-full bg-emerald-400/20 px-3 py-0.5 text-xs font-black text-emerald-300">Plant-based</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[{label:"Protein", value:"25%", color:"text-lime-300"}, {label:"Carbs", value:"50%", color:"text-amber-300"}, {label:"Fat", value:"25%", color:"text-orange-300"}].map((m) => (
                  <div key={m.label} className="rounded-xl border border-white/10 bg-white/[0.06] p-2 text-center">
                    <p className="text-lg font-black text-white">{m.value}</p>
                    <p className="text-[10px] text-slate-400">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 space-y-1 text-xs text-slate-400">
                <p>🌱 Plant protein • High fiber • Whole foods</p>
                <p>🧘 Bodyweight • Yoga • Low-impact</p>
              </div>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-black/25 p-5 transition hover:-translate-y-1 hover:border-lime-300/30">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white">Low Carb</h3>
                <span className="rounded-full bg-sky-400/20 px-3 py-0.5 text-xs font-black text-sky-300">Keto-style</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[{label:"Protein", value:"35%", color:"text-lime-300"}, {label:"Carbs", value:"15%", color:"text-amber-300"}, {label:"Fat", value:"50%", color:"text-orange-300"}].map((m) => (
                  <div key={m.label} className="rounded-xl border border-white/10 bg-white/[0.06] p-2 text-center">
                    <p className="text-lg font-black text-white">{m.value}</p>
                    <p className="text-[10px] text-slate-400">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 space-y-1 text-xs text-slate-400">
                <p>🥑 High fat • Low carb • Moderate protein</p>
                <p>🏋️ Strength training • Steady state cardio</p>
              </div>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-black/25 p-5 transition hover:-translate-y-1 hover:border-lime-300/30">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white">Custom</h3>
                <span className="rounded-full bg-purple-400/20 px-3 py-0.5 text-xs font-black text-purple-300">Flexible</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[{label:"Protein", value:"You", color:"text-lime-300"}, {label:"Carbs", value:"Pick", color:"text-amber-300"}, {label:"Fat", value:"Your %", color:"text-orange-300"}].map((m) => (
                  <div key={m.label} className="rounded-xl border border-white/10 bg-white/[0.06] p-2 text-center">
                    <p className="text-lg font-black text-white">{m.value}</p>
                    <p className="text-[10px] text-slate-400">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 space-y-1 text-xs text-slate-400">
                <p>🎯 Set your own macro split</p>
                <p>📋 Any workout type • Full flexibility</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 sm:px-8 lg:px-10">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(163,230,53,0.06),rgba(255,255,255,0.02))] p-6 shadow-2xl shadow-black/25 sm:p-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-lime-300">More Than Just Tracking</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">MyTrine in many more ways</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">From AI-powered meal snap to personalized coaching — MyTrine works across every part of your health journey.</p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-6 transition hover:-translate-y-1 hover:border-lime-300/30">
              <span className="text-3xl">📖</span>
              <p className="mt-2 text-xs font-black uppercase tracking-widest text-lime-300">Learn</p>
              <h3 className="mt-2 text-xl font-black text-white">Personalized guidance on the go</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">AI Coach Riya learns your patterns and anticipates your needs — sending smart notifications, meal tips, and workout reminders before you even ask.</p>
              <div className="mt-4 flex -space-x-2">
                {["🧘","🥗","💪","😴"].map((emoji, i) => (
                  <span key={i} className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-slate-800 text-sm">{emoji}</span>
                ))}
                <span className="grid h-8 w-8 place-items-center rounded-full border border-lime-300/40 bg-lime-300/10 text-xs font-black text-lime-300">+3</span>
              </div>
            </div>
            <div className="rounded-2xl border border-lime-300/30 bg-lime-300/10 p-6 transition hover:-translate-y-1 hover:border-lime-300/50">
              <span className="text-3xl">🎯</span>
              <p className="mt-2 text-xs font-black uppercase tracking-widest text-lime-300">Act</p>
              <h3 className="mt-2 text-xl font-black text-white">Personalized diet & workout plans</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">No crash diets. No extreme workouts. AI builds a balanced nutrition plan with foods you love, and a workout routine that fits your schedule.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Home workout","Indian diet","Beginner friendly","No equipment"].map((tag) => (
                  <span key={tag} className="rounded-full border border-lime-300/25 bg-lime-300/10 px-3 py-1 text-xs font-bold text-lime-200">{tag}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-6 transition hover:-translate-y-1 hover:border-lime-300/30">
              <span className="text-3xl">💬</span>
              <p className="mt-2 text-xs font-black uppercase tracking-widest text-lime-300">Ask</p>
              <h3 className="mt-2 text-xl font-black text-white">Anytime, anywhere AI assistance</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">Unlock a wealth of health information. Ask Riya anything — &quot;How many calories in a dosa?&quot;, &quot;Fix my squat form&quot;, &quot;Suggest a quick dinner&quot; — and get instant answers.</p>
              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.06] p-3 text-xs italic text-slate-400">
                &quot;How many calories in 2 idlis?&quot;
                <span className="mt-1 block text-lime-300 not-italic">Riya: ~156 cal. Good low-fat option! ✓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 sm:px-8 lg:px-10">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(163,230,53,0.06),rgba(255,255,255,0.02))] p-6 shadow-2xl shadow-black/25 sm:p-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-lime-300">Total Control. Full Flexibility.</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">You&apos;re in charge, always</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">Like Calo, MyTrine gives you complete control over your plan. Swap meals, pause workouts, change goals — anytime.</p>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-5 text-center transition hover:-translate-y-1">
              <span className="text-4xl">🎯</span>
              <h3 className="mt-3 font-black text-white">Calories & macros that match your goals</h3>
              <p className="mt-2 text-sm text-slate-400">AI calculates everything for you — BMR, TDEE, protein target, macro split. No manual math, no guesswork.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-5 text-center transition hover:-translate-y-1">
              <span className="text-4xl">🔄</span>
              <h3 className="mt-3 font-black text-white">Choose what you like. Swap what you don&apos;t.</h3>
              <p className="mt-2 text-sm text-slate-400">Don&apos;t like a meal? Swap it. Allergen issue? Exclude it. Bored of a workout? Change it. Full flexibility.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-5 text-center transition hover:-translate-y-1">
              <span className="text-4xl">⏸️</span>
              <h3 className="mt-3 font-black text-white">Pause. Skip. Change. Anytime.</h3>
              <p className="mt-2 text-sm text-slate-400">Life happens. MyTrine lets you pause your plan, skip days, or change your goal — no penalties, no hassle.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 pb-12 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,rgba(163,230,53,0.14),rgba(255,255,255,0.035))] p-7 shadow-2xl shadow-black/25">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-lime-300">Daily command center</p>
          <h2 className="mt-4 text-3xl font-black sm:text-4xl">Your plan updates like a live coach</h2>
          <p className="mt-4 max-w-xl leading-7 text-slate-300">
            MyTrine watches what you eat, how you train, how much you spend, and how your body responds. Then it adjusts tomorrow&apos;s plan without making you start over.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {planMetrics.map(([label, value, note]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs font-bold text-slate-400">{label}</p>
                <p className="mt-2 text-2xl font-black text-lime-300">{value}</p>
                <p className="mt-1 text-xs text-slate-400">{note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {dashboardCards.map(([title, copy, bullets]) => (
            <div key={title as string} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-xl shadow-black/20">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-lime-300 text-sm font-black text-slate-950">
                  AI
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {(bullets as string[]).map((item) => (
                  <span key={item} className="rounded-full border border-lime-300/25 bg-lime-300/10 px-3 py-1 text-xs font-bold text-lime-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 sm:px-8 lg:px-10">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(163,230,53,0.10),rgba(255,255,255,0.04))] p-6 shadow-2xl shadow-black/25 sm:p-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-lime-300">Your 90-Day Journey</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Three phases. One clear path.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">Every 90-day plan is split into 3 progressive phases — designed for lazy beginners who want real results without gym obsession.</p>
          </div>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <span className="inline-block rounded-full bg-lime-300 px-3 py-1 text-xs font-black text-slate-950">Weeks 1-4</span>
              <h3 className="mt-4 text-xl font-black text-white">Phase 1: Foundation</h3>
              <p className="mt-2 text-sm text-slate-400">Build the habit. Light home workouts, basic nutrition fixes, and daily tracking setup.</p>
              <ul className="mt-4 space-y-2 text-sm">
                {["15-min home workouts", "Basic calorie tracking", "Water intake goal", "Sleep schedule fix"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-slate-300">
                    <span className="text-lime-300">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-lime-300/40 bg-lime-300/10 p-5 shadow-xl shadow-lime-500/10">
              <span className="inline-block rounded-full bg-lime-300 px-3 py-1 text-xs font-black text-slate-950">Weeks 5-8</span>
              <h3 className="mt-4 text-xl font-black text-white">Phase 2: Progression</h3>
              <p className="mt-2 text-sm text-slate-400">Step it up. Structured workouts, meal prep skills, and consistent progress.</p>
              <ul className="mt-4 space-y-2 text-sm">
                {["30-min gym/home circuits", "Portion control mastery", "Meal prep Sundays", "Weekly progress photos"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-slate-300">
                    <span className="text-lime-300">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <span className="inline-block rounded-full bg-lime-300 px-3 py-1 text-xs font-black text-slate-950">Weeks 9-12</span>
              <h3 className="mt-4 text-xl font-black text-white">Phase 3: Peak</h3>
              <p className="mt-2 text-sm text-slate-400">Full transformation. Advanced training, food ordering mastery, and lasting habits.</p>
              <ul className="mt-4 space-y-2 text-sm">
                {["45-min advanced workouts", "Smart food ordering", "Body measurement tracking", "Transformation reveal"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-slate-300">
                    <span className="text-lime-300">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-center">
            <p className="text-sm text-slate-300">
              <span className="font-black text-lime-300">Total Estimated Budget: ₹13,500 - ₹45,000</span> 
              <span className="text-slate-500"> — depending on your food preferences and city</span>
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 sm:px-8 lg:px-10">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(163,230,53,0.06),rgba(255,255,255,0.02))] p-6 shadow-2xl shadow-black/25 sm:p-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-lime-300">Mindset Matters</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Psychology meets fitness</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">MyTrine doesn&apos;t just tell you what to do — it understands why you do it. Build habits that stick for life.</p>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-5 text-center transition hover:-translate-y-1 hover:border-lime-300/30">
              <span className="text-4xl">🧠</span>
              <h3 className="mt-3 font-black text-white">Habit Tracking</h3>
              <p className="mt-2 text-sm text-slate-400">Track 5 core habits daily. AI builds streaks and rewards consistency — not perfection.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-5 text-center transition hover:-translate-y-1 hover:border-lime-300/30">
              <span className="text-4xl">🎯</span>
              <h3 className="mt-3 font-black text-white">Smart Goal Setting</h3>
              <p className="mt-2 text-sm text-slate-400">Break your 90-day goal into weekly micro-goals. Every small win keeps you motivated.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-5 text-center transition hover:-translate-y-1 hover:border-lime-300/30">
              <span className="text-4xl">🔄</span>
              <h3 className="mt-3 font-black text-white">No-Guilt Reset</h3>
              <p className="mt-2 text-sm text-slate-400">Missed a workout? Ate a cheat meal? No problem. AI resets your plan — zero shame, just progress.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-5 text-center transition hover:-translate-y-1 hover:border-lime-300/30">
              <span className="text-4xl">📈</span>
              <h3 className="mt-3 font-black text-white">Weekly Reflections</h3>
              <p className="mt-2 text-sm text-slate-400">Every Sunday, AI sends you a reflection: what worked, what didn&apos;t, and what to adjust next week.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/25 lg:grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-7 sm:p-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-lime-300">Smart food ordering</p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">AI picks meals. You order in one tap.</h2>
            <p className="mt-4 leading-7 text-slate-400">
              MyTrine connects directly with Swiggy and Zomato via MCP (Model Context Protocol). Your AI-generated meal plan becomes a live order — no manual searching, no decision fatigue.
            </p>
            <div className="mt-6 space-y-3">
              {mealFlow.map(([number, title, copy]) => (
                <div key={title} className="flex gap-4 rounded-2xl border border-white/10 bg-black/25 p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime-300 text-sm font-black text-slate-950">{number}</span>
                  <div>
                    <h3 className="font-black text-white">{title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[430px] bg-[radial-gradient(circle_at_50%_35%,rgba(132,204,22,0.28),transparent_34%),linear-gradient(145deg,#07120c,#02050a)] p-7">
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(163,230,53,0.5)_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="relative mx-auto max-w-md rounded-[28px] border border-white/15 bg-slate-950/80 p-5 shadow-2xl shadow-black/35 backdrop-blur">
              <div className="relative h-44 overflow-hidden rounded-2xl">
                <Image src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=720&h=460&q=90" alt="Healthy meal bowl" fill sizes="480px" className="object-cover" />
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black">High Protein Power Bowl</h3>
                  <p className="mt-1 text-sm text-slate-400">Chicken, greens, quinoa, avocado, lemon dressing</p>
                </div>
                <span className="rounded-full bg-lime-300 px-3 py-1 text-sm font-black text-slate-950">₹189</span>
              </div>
              <div className="mt-5 grid grid-cols-4 gap-3 text-center text-sm">
                {["520 kcal", "42g pro", "18g fat", "44g carb"].map((item) => (
                  <span key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] px-2 py-3 font-black text-lime-200">{item}</span>
                ))}
              </div>
              <button type="button" onClick={onStart} className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-lime-300 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-lime-200">
                Build My Meal Plan <ArrowIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 sm:px-8 lg:px-10">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(163,230,53,0.06),rgba(255,255,255,0.02))] p-6 shadow-2xl shadow-black/25 sm:p-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-lime-300">Fresh Indian Meals</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">80+ meals updated weekly</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">AI picks from Indian cuisine — roti, rice, dal, sabzi, biryani, salads, smoothies & more.</p>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              ["https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=300&h=200&q=80", "High Protein", "₹189"],
              ["https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=300&h=200&q=80", "Balanced Meal", "₹149"],
              ["https://images.unsplash.com/photo-1603894584373-5ac82b2ae7b7?auto=format&fit=crop&w=300&h=200&q=80", "Veg Thali", "₹129"],
              ["https://images.unsplash.com/photo-1603073251062-880c4dc24b56?auto=format&fit=crop&w=300&h=200&q=80", "Protein Bowl", "₹219"],
              ["https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=300&h=200&q=80", "Fresh Salad", "₹99"],
              ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&h=200&q=80", "Smoothie", "₹79"],
            ].map(([src, name, price]) => (
              <div key={name} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 transition hover:-translate-y-1 hover:border-lime-300/30">
                <div className="relative h-28 overflow-hidden">
                  <Image src={src} alt={name} fill sizes="200px" className="object-cover transition duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-3 rounded-full bg-lime-300 px-2 py-0.5 text-[10px] font-black text-slate-950">{price}</span>
                </div>
                <p className="p-2 text-xs font-black text-white">{name}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-slate-500">*Meals shown are examples. Actual recommendations based on your AI body scan.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 sm:px-8 lg:px-10">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(163,230,53,0.06),rgba(255,255,255,0.02))] p-6 shadow-2xl shadow-black/25 sm:p-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-lime-300">See MyTrine In Action</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Every screen, designed for your journey</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">From AI consultation to daily tracking to transformation vault — everything in one app.</p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center transition hover:-translate-y-2 hover:border-lime-300/30">
              <div className="mx-auto h-52 w-full rounded-xl border border-white/10 bg-gradient-to-b from-slate-800 to-slate-950 p-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px] text-slate-400">
                  <span>9:41</span>
                  <span className="rounded-full bg-lime-400/20 px-2 py-0.5 text-lime-300">AI Coach</span>
                </div>
                <p className="mt-3 text-left text-xs font-black text-white">Tell us about yourself</p>
                <div className="mt-2 space-y-2">
                  {["What's your goal?", "Age? Height? Weight?", "Any health conditions?"].map((q, i) => (
                    <div key={q} className={`rounded-lg border border-white/10 ${i === 0 ? "bg-lime-400/20 border-lime-400/30" : "bg-white/[0.06]"} p-2 text-[10px] ${i === 0 ? "text-lime-200" : "text-slate-400"}`}>{q}</div>
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm font-black text-white">AI Consultation</p>
              <p className="text-xs text-slate-400">22 questions → your profile</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center transition hover:-translate-y-2 hover:border-lime-300/30">
              <div className="mx-auto h-52 w-full rounded-xl border border-white/10 bg-gradient-to-b from-slate-800 to-slate-950 p-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px] text-slate-400">
                  <span>9:41</span>
                  <span className="rounded-full bg-lime-400/20 px-2 py-0.5 text-lime-300">My Plan</span>
                </div>
                <p className="mt-3 text-left text-xs font-black text-lime-300">Today&apos;s Workout</p>
                <div className="mt-2 space-y-1.5">
                  {["Jumping Jacks 3x15", "Squats 3x12", "Push-ups 3x10", "Plank 30s x3"].map((ex) => (
                    <div key={ex} className="flex items-center gap-2 rounded-lg bg-white/[0.06] p-1.5 text-[10px] text-slate-300">
                      <span className="h-2 w-2 rounded-full bg-lime-400" />
                      {ex}
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm font-black text-white">Smart Workouts</p>
              <p className="text-xs text-slate-400">Home/gym • Video guides</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center transition hover:-translate-y-2 hover:border-lime-300/30">
              <div className="mx-auto h-52 w-full rounded-xl border border-white/10 bg-gradient-to-b from-slate-800 to-slate-950 p-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px] text-slate-400">
                  <span>9:41</span>
                  <span className="rounded-full bg-lime-400/20 px-2 py-0.5 text-lime-300">Food</span>
                </div>
                <p className="mt-3 text-left text-xs font-black text-white">AI Recommended Meal</p>
                <div className="mt-2 rounded-lg border border-lime-400/30 bg-lime-400/10 p-2 text-center text-xs">
                  <p className="font-black text-lime-300">High Protein Bowl</p>
                  <p className="text-[10px] text-slate-400">520 cal • 42g protein</p>
                  <button className="mt-2 rounded-full bg-lime-300 px-3 py-1 text-[10px] font-black text-slate-950">Order on Swiggy</button>
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-slate-400">
                  <span>Order by 11am</span>
                  <span className="text-lime-300">₹189</span>
                </div>
              </div>
              <p className="mt-3 text-sm font-black text-white">Smart Food Ordering</p>
              <p className="text-xs text-slate-400">MCP → Swiggy/Zomato</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center transition hover:-translate-y-2 hover:border-lime-300/30">
              <div className="mx-auto h-52 w-full rounded-xl border border-white/10 bg-gradient-to-b from-slate-800 to-slate-950 p-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px] text-slate-400">
                  <span>9:41</span>
                  <span className="rounded-full bg-lime-400/20 px-2 py-0.5 text-lime-300">Progress</span>
                </div>
                <p className="mt-3 text-left text-xs font-black text-white">Your Transformation</p>
                <div className="mt-2 flex gap-2">
                  <div className="flex-1 rounded-lg border border-white/10 bg-white/[0.06] p-2 text-center">
                    <p className="text-[10px] text-slate-400">Before</p>
                    <p className="text-xs font-black text-white">Day 1</p>
                    <p className="text-[10px] text-slate-400">78 kg</p>
                  </div>
                  <div className="flex-1 rounded-lg border border-lime-400/30 bg-lime-400/10 p-2 text-center">
                    <p className="text-[10px] text-slate-400">After</p>
                    <p className="text-xs font-black text-lime-300">Day 90</p>
                    <p className="text-[10px] text-lime-200">72 kg</p>
                  </div>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-slate-700">
                  <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-lime-400 to-emerald-500" />
                </div>
                <p className="mt-1 text-[10px] text-slate-400">75% to goal</p>
              </div>
              <p className="mt-3 text-sm font-black text-white">Before/After Vault</p>
              <p className="text-xs text-slate-400">Photo timeline + measurements</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 sm:px-8 lg:px-10">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(163,230,53,0.06),rgba(255,255,255,0.02))] p-6 shadow-2xl shadow-black/25 sm:p-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-lime-300">From The Community</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Real people, real transformations</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">Join 12,000+ Indians who are transforming their bodies with MyTrine. Share your journey with #MyTrineTransformation.</p>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {[
              ["https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=300&h=300&q=80", "@arjun_fitness"],
              ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=300&h=300&q=80", "@priya_health"],
              ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=300&h=300&q=80", "@rahul_gains"],
              ["https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=300&h=300&q=80", "@neha_fit"],
              ["https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=300&h=300&q=80", "@vikram_lifts"],
            ].map(([src, handle]) => (
              <div key={handle} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 transition hover:-translate-y-1 hover:border-lime-300/30">
                <div className="relative h-32 w-full sm:h-40">
                  <Image src={src} alt={handle} fill sizes="200px" className="object-cover transition duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <p className="absolute bottom-2 left-3 text-xs font-bold text-white">{handle}</p>
                  <span className="absolute right-2 top-2 text-xs">❤️</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button type="button" onClick={shareOnInstagram} className="inline-flex items-center justify-center gap-3 rounded-xl border border-lime-300/35 bg-lime-300/10 px-6 py-3 text-sm font-black text-lime-300 transition hover:bg-lime-300 hover:text-slate-950">
              Share Your Story <ArrowIcon />
            </button>
          </div>
        </div>
      </section>

      <section id="pricing" className="hidden">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(163,230,53,0.08))] p-6 shadow-2xl shadow-black/25 sm:p-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-lime-300">Pricing</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Start simple, scale into a full transformation</h2>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {pricingPlans.map(([name, price, copy, items], index) => (
              <div key={name as string} className={`rounded-2xl border p-6 ${index === 1 ? "border-lime-300/55 bg-lime-300/10 shadow-2xl shadow-lime-500/10" : "border-white/10 bg-black/20"}`}>
                <p className="text-lg font-black">{name}</p>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-4xl font-black text-lime-300">{price}</span>
                  <span className="pb-1 text-sm text-slate-400">/ month</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
                <div className="mt-5 space-y-3">
                  {(items as string[]).map((item) => (
                    <p key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-lime-300 text-[11px] font-black text-slate-950">✓</span>
                      {item}
                    </p>
                  ))}
                </div>
                <button type="button" onClick={onStart} className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl border border-lime-300/35 bg-lime-300 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-lime-200">
                  Start Now <ArrowIcon />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="blog" className="border-t border-white/10 bg-black/30 px-6 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-lime-300 to-emerald-500 text-xl font-black text-slate-950">M</div>
              <span className="text-2xl font-black">MyTrine</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">AI diet, workouts, meals, and progress in one premium app. Made for India.</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="hidden text-xs text-slate-500 sm:block">90-day transformation • AI-powered • Indian foods</p>
            <button type="button" onClick={onStart} className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-lime-200">
              Start AI Consultation <ArrowIcon />
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}

function HeroPhone() {
  return (
    <div className="relative mx-auto min-h-[485px] w-full max-w-[900px] lg:min-h-[505px] xl:min-h-[520px]">
      <div className="absolute left-1/2 top-12 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-lime-400/20 blur-[70px]" />
      <div className="absolute left-1/2 top-9 h-[560px] w-[560px] -translate-x-1/2 rounded-full border border-lime-400/15" />
      <div className="absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-lime-400/10" />
      <svg
        className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full lg:block"
        viewBox="0 0 900 540"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <marker
            id="hero-arrow"
            markerHeight="9"
            markerWidth="9"
            orient="auto"
            refX="7"
            refY="4.5"
          >
            <path d="M0 0 9 4.5 0 9 2.6 4.5 0 0Z" fill="#a3e635" />
          </marker>
        </defs>
        <path
          d="M250 155 C330 132 390 132 448 168"
          stroke="#a3e635"
          strokeWidth="2"
          strokeDasharray="7 9"
          strokeLinecap="round"
          markerEnd="url(#hero-arrow)"
          opacity="0.75"
        />
        <path
          d="M650 158 C585 128 532 130 486 170"
          stroke="#a3e635"
          strokeWidth="2"
          strokeDasharray="7 9"
          strokeLinecap="round"
          markerEnd="url(#hero-arrow)"
          opacity="0.75"
        />
        <path
          d="M220 343 C310 350 363 318 414 275"
          stroke="#a3e635"
          strokeWidth="2"
          strokeDasharray="7 9"
          strokeLinecap="round"
          markerEnd="url(#hero-arrow)"
          opacity="0.75"
        />
        <path
          d="M705 366 C625 356 558 318 512 276"
          stroke="#a3e635"
          strokeWidth="2"
          strokeDasharray="7 9"
          strokeLinecap="round"
          markerEnd="url(#hero-arrow)"
          opacity="0.75"
        />
      </svg>

      <FloatingFoodCard className="left-[2%] top-20 hidden sm:block" title="AI Diet Plan" copy="Personalized meals for your goals" image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=420&h=240&q=85" />
      <FloatingFoodCard className="right-[1%] top-20 hidden md:block" title="Smart Food Ordering" copy="Healthy meals delivered to you" image="https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=420&h=240&q=85" />

      <div className="absolute left-[1%] top-[270px] z-30 hidden w-44 rounded-[18px] border border-white/20 bg-black/45 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl transition hover:-translate-y-1 md:block">
        <p className="text-sm font-black">Workout Tracking</p>
        <div className="mt-4 flex h-14 items-end gap-2">
          {[28, 44, 32, 56, 48, 70, 62].map((height, index) => (
            <span key={index} className="w-full rounded-full bg-lime-400/80" style={{ height }} />
          ))}
        </div>
        <p className="mt-3 text-xs font-bold text-lime-300">320 kcal Calories Burned</p>
      </div>

      <div className="absolute right-[7%] top-[295px] z-30 hidden w-40 rounded-[18px] border border-white/25 bg-black/45 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl transition hover:-translate-y-1 sm:block">
        <p className="text-sm font-black">Progress <span className="text-2xl text-lime-300">78%</span></p>
        <svg className="mt-4 h-12 w-full" viewBox="0 0 150 44" aria-hidden="true">
          <path d="M2 36 C28 22 42 38 62 21 S98 7 120 18 S140 15 148 8" fill="none" stroke="#a3e635" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <p className="mt-2 text-xs text-slate-300">You&apos;re on fire</p>
      </div>

      <div className="absolute bottom-5 left-[15%] z-20 hidden h-20 w-52 rotate-[-8deg] items-center justify-center lg:flex">
        <span className="grid h-16 w-12 place-items-center rounded-xl bg-gradient-to-br from-slate-700 to-black text-xs text-slate-400 shadow-2xl">10 KG</span>
        <span className="h-4 w-32 bg-gradient-to-r from-slate-700 via-slate-950 to-slate-700 shadow-xl" />
        <span className="h-16 w-12 rounded-xl bg-gradient-to-br from-slate-700 to-black shadow-2xl" />
      </div>
      <div className="absolute bottom-5 right-[25%] z-30 hidden h-32 w-11 rounded-b-2xl rounded-t-full border border-white/10 bg-gradient-to-b from-slate-800 to-black shadow-2xl lg:block">
        <div className="absolute -top-3 left-1/2 h-5 w-7 -translate-x-1/2 rounded-t-lg bg-black" />
        <div className="absolute left-1/2 top-14 -translate-x-1/2 text-2xl font-black text-lime-400">M</div>
      </div>
      <div className="absolute bottom-4 right-[14%] z-30 hidden h-24 w-16 rounded-[22px] border border-lime-300/25 bg-slate-950 p-2 text-center shadow-2xl lg:block">
        <p className="text-[10px] text-slate-400">Steps</p>
        <p className="text-sm font-black text-white">8,245</p>
      </div>

      <div className="phone-3d absolute left-[49%] top-4 z-20 w-[285px] origin-top rounded-[38px] border-[8px] border-[#1e293b] bg-[#07101f] p-3 shadow-[0_35px_90px_rgba(0,0,0,0.65),0_0_90px_rgba(132,204,22,0.25)] sm:w-[305px] lg:w-[325px]">
        <div className="pointer-events-none absolute -right-5 top-7 -z-10 h-[92%] w-12 rounded-r-[34px] bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#020617] shadow-[18px_22px_42px_rgba(0,0,0,0.48)]" />
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-slate-800 shadow-inner" />
        <div className="phone-screen min-h-[440px] rounded-[28px] border border-white/15 bg-[#0d1728] p-4 sm:min-h-[485px] lg:min-h-[515px]">
          <div className="mb-5 flex items-center justify-between pt-2 text-xs text-white/70">
            <span>9:41</span>
            <span className="rounded-full bg-lime-400/15 px-3 py-1 font-black text-lime-300">AI Coach</span>
          </div>
          <p className="text-base font-black">Good Morning, Arjun</p>
          <p className="mt-1 text-xs text-slate-400">Ready to crush your goals today?</p>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.07] p-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black">Today&apos;s Progress</p>
                <p className="mt-1 text-xs text-slate-400">Transformation score</p>
              </div>
              <div className="grid h-16 w-16 place-items-center rounded-full bg-[conic-gradient(#a3e635_78%,rgba(255,255,255,0.12)_0)]">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-[#0d1728] text-sm font-black text-lime-300">78%</div>
              </div>
            </div>
            <div className="mt-4 space-y-3 text-xs text-slate-300">
              <div className="flex justify-between"><span>Calories</span><b>1400 / 1800</b></div>
              <div className="flex justify-between"><span>Workout</span><b>30 / 45 min</b></div>
              <div className="flex justify-between"><span>Water</span><b>2.5 / 3 L</b></div>
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3">
            <div className="mb-3 flex justify-between text-sm font-black">
              <span>Today&apos;s Plan</span>
              <span className="text-xs text-lime-300">See All</span>
            </div>
            {phonePlans.map((item) => (
              <div key={item} className="mb-2 rounded-xl bg-white/[0.08] p-2.5 text-xs">
                <b>{item}</b>
                <p className="text-slate-400">Smart recommendation</p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-5 gap-2 rounded-2xl border border-white/10 bg-black/20 p-2 text-center text-[10px] text-slate-400">
            {phoneNav.map((item) => (
              <span key={item} className={item === "Home" ? "font-black text-lime-300" : ""}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingFoodCard({ className, title, copy, image }: { className: string; title: string; copy: string; image: string }) {
  return (
    <div className={`absolute z-30 w-48 rounded-[18px] border border-white/25 bg-black/45 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl transition hover:-translate-y-1 ${className}`}>
      <div className="relative h-14 overflow-hidden rounded-xl">
        <Image src={image} alt="" fill sizes="208px" className="object-cover" />
      </div>
      <p className="mt-3 text-sm font-black">{title}</p>
      <p className="mt-1 text-xs leading-5 text-slate-300">{copy}</p>
    </div>
  );
}

function WhatsAppButton() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      <Link
        href="/pricing"
        className="group flex items-center gap-3 rounded-full bg-gradient-to-br from-lime-300 to-emerald-500 px-5 py-3 text-sm font-black text-slate-950 shadow-2xl shadow-lime-500/40 transition hover:scale-105 hover:shadow-lime-500/60"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 21l1.65-6.03a9 9 0 1 1 3.38 3.38L3 21Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
        <span className="hidden sm:inline">Chat with Coach</span>
      </Link>
      <div className="animate-bounce rounded-full bg-lime-300/20 px-3 py-1 text-[10px] text-lime-300 backdrop-blur">
        ⚡ Reply in 2 min
      </div>
    </div>
  );
}

function AuthNavControls() {
  const { isLoaded, isSignedIn } = useUser();
  const [wasSignedIn, setWasSignedIn] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    queueMicrotask(() => setWasSignedIn(Boolean(isSignedIn)));
  }, [isLoaded, isSignedIn]);

  if (isSignedIn || (!isLoaded && wasSignedIn)) {
    return <ProfileMenu />;
  }

  if (!isLoaded) {
    return <div className="h-12 w-[290px]" />;
  }

  return (
    <div className="flex items-center gap-3">
      <a href="/sign-in" className="hidden min-w-24 justify-center rounded-md border border-white/25 px-5 py-2.5 text-sm font-bold text-white transition hover:border-lime-300/50 hover:bg-white/[0.04] sm:inline-flex">
        Log In
      </a>
      <a href="/sign-up" className="inline-flex items-center justify-center gap-4 rounded-md bg-gradient-to-r from-lime-300 to-emerald-500 px-6 py-2.5 text-sm font-black text-slate-950 shadow-xl shadow-lime-500/25 transition hover:-translate-y-0.5">
        Get Started
        <ArrowIcon className="h-4 w-4" />
      </a>
    </div>
  );
}




