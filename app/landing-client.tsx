"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import ConsultationClient from "./consultation-client";
import ProfileMenu from "./profile-menu";

type IconName =
  | "activity"
  | "arrow"
  | "brain"
  | "calendar"
  | "chart"
  | "check"
  | "food"
  | "spark"
  | "target"
  | "user"
  | "wallet"
  | "water";

const navLinks = [
  ["Home", "#home"],
  ["Features", "#features"],
  ["How It Works", "#how-it-works"],
  ["Transformations", "#results"],
  ["Pricing", "#plans"],
  ["Testimonials", "#testimonials"],
  ["FAQ", "/faq"],
];

const trustBullets = [
  "No credit card required",
  "Private health profile",
  "AI decisions explained",
];

const heroProofMetrics = [
  "90-Day Roadmap",
  "AI Meal Ordering",
  "Progress Optimization",
];

const commandMetrics = [
  ["Current Weight", "95 kg"],
  ["Target Weight", "75 kg"],
  ["Days Remaining", "63 Days"],
  ["Transformation Progress", "78%"],
  ["Expected Goal Date", "August 21"],
];

const aiActions = [
  "Breakfast Scheduled",
  "Lunch Ordered",
  "Workout Assigned",
  "Water Goal Updated",
  "Tomorrow's Calories Optimized",
];

const blueprintMilestones = [
  ["Week 1", "93 kg"],
  ["Week 4", "89 kg"],
  ["Week 8", "82 kg"],
  ["Week 12", "75 kg"],
];

const stats = [
  ["90 Days", "managed journey"],
  ["22", "assessment signals"],
  ["Rs.150-500", "meal budget range"],
  ["AI", "execution engine"],
  ["Live", "journey optimization"],
];

const featureCards = [
  ["AI Assessment", "You do not know where to start.", "AI reads your body, routine, food habits, and budget.", "Your first plan is built around your real life.", "brain"],
  ["Transformation Blueprint", "Most plans fail after week two.", "AI breaks 90 days into weekly targets and decisions.", "You always know the next best action.", "calendar"],
  ["AI Food Ordering", "Healthy eating breaks during busy days.", "AI selects order-ready meals that fit your plan.", "Lunch arrives without decision fatigue.", "food"],
  ["Daily Journey Tracking", "Manual tracking gets ignored.", "AI watches progress signals and missed actions.", "Your plan adapts before you fall off.", "chart"],
  ["Budget Management", "Transformation costs feel unclear.", "AI estimates food and support costs early.", "You can commit with financial clarity.", "wallet"],
  ["Continuous Optimization", "Bodies do not change in straight lines.", "AI recalibrates calories, training, and timing.", "Your journey stays realistic and on schedule.", "target"],
];

const howSteps = [
  ["01", "AI Consultation", "Share your target body, routine, food preferences, budget, and constraints."],
  ["02", "AI Transformation Blueprint", "MyTrine maps the full route from current body to target body."],
  ["03", "AI Food Ordering", "Nutrition is executed through meal suggestions, restaurant matching, and delivery status."],
  ["04", "Daily Tracking & Optimization", "Progress, adherence, photos, and behavior signals continuously update the journey."],
  ["05", "Goal Achieved", "The plan keeps adjusting until the user reaches the transformation target."],
];

const resultMetrics = [
  ["Before Weight", "95 kg"],
  ["After Weight", "77 kg"],
  ["Duration", "90 days"],
  ["Adherence Score", "92%"],
  ["Calories Managed", "1,650/day"],
  ["Body Fat Reduction", "8%"],
];

const resultCases = [
  ["Male Weight Loss", "95 kg", "77 kg", "90 days", "92%", "1,650/day", "-8%", "Fat-loss journey"],
  ["Female Weight Loss", "82 kg", "69 kg", "90 days", "89%", "1,520/day", "-6%", "Lifestyle reset"],
  ["Muscle Gain", "58 kg", "66 kg", "90 days", "86%", "2,450/day", "+4 kg lean mass", "Lean gain route"],
  ["Maintenance", "72 kg", "71 kg", "90 days", "94%", "2,050/day", "Stable", "Consistency plan"],
];

const testimonials = [
  ["Arjun M.", "Founder, Chennai", "MyTrine handled the plan, meals, and check-ins. I just followed the execution."],
  ["Nisha R.", "Product Manager, Bengaluru", "It felt like an operator managing my transformation, not another tracker."],
  ["Vikram S.", "Consultant, Hyderabad", "Lunch was already selected and ordered. That removed my biggest failure point."],
];

const pricingPlans = [
  ["Starter", "Rs.999", "For users validating their first AI-managed journey", ["AI consultation", "Transformation target setup", "7-day blueprint preview", "Basic progress dashboard"]],
  ["Transformation", "Rs.1499", "The full 90-day AI Transformation Manager", ["Complete 90-day blueprint", "AI food ordering workflows", "Daily AI actions", "Progress vault and optimization"]],
  ["Elite", "Rs.2999", "Advanced AI coaching for high-accountability users", ["Everything in Transformation", "Priority AI feedback", "Advanced budget controls", "Weekly transformation review"]],
] as const;

const aiThinkingSteps = [
  "User Data",
  "AI Analysis",
  "Transformation Blueprint",
  "Workout Generation",
  "Diet Planning",
  "Food Ordering",
  "Daily Tracking",
  "Continuous Optimization",
  "Goal Achieved",
];

const comparisonRows = [
  ["Creates the plan", "Static templates", "Manual guidance", "Generic PDF", "Food log only", "Personal 90-day blueprint"],
  ["Executes meals", "User decides", "User still orders", "No execution", "No ordering", "AI meal selection + order workflow"],
  ["Adapts after misses", "Limited", "Session dependent", "No", "No", "Calories, workouts, and timeline adjust"],
  ["Explains decisions", "Rarely", "Sometimes", "No", "No", "Transparent AI action notes"],
];

const trustCards = [
  ["Privacy First", "Health inputs stay inside your account and are used only to build your transformation plan."],
  ["Secure Data Handling", "Your transformation profile is treated as sensitive personal data, not generic fitness content."],
  ["Transparent AI Decisions", "Every recommendation explains what changed, why it changed, and what the next action is."],
  ["Medical Safety Guidance", "MyTrine supports lifestyle transformation and does not replace medical diagnosis or treatment."],
];

const integrations = ["Google Fit", "Apple Health", "Zomato", "Swiggy", "Stripe"];

const withoutMyTrine = ["Decide meals manually", "Count calories yourself", "Adjust workouts manually", "Track everything manually", "Lose consistency"];
const withMyTrine = ["AI creates the plan", "AI selects meals", "AI tracks progress", "AI optimizes decisions", "AI manages transformation"];

function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  if (name === "activity") {
    return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13h4l2-6 4 12 2-6h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
  if (name === "arrow") {
    return <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h11m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
  if (name === "brain") {
    return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 5a3 3 0 0 0-3 3v.4A3.5 3.5 0 0 0 5 15a3 3 0 0 0 4 2.83M15 5a3 3 0 0 1 3 3v.4A3.5 3.5 0 0 1 19 15a3 3 0 0 1-4 2.83M9 5v14m6-14v14M9 9H7m10 0h-2M9 14H6.5m11 0H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
  if (name === "calendar") {
    return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 3v4m10-4v4M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Zm4 8h.01M12 13h.01M15 13h.01M9 17h.01M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
  }
  if (name === "chart") {
    return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V5m4 12v-5m5 5V8m5 9V7M4 19h17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
  }
  if (name === "food") {
    return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3v8m4-8v8M6 7h4m0 4c0 2-1 3-2 3s-2-1-2-3m2 3v7m8-18v18m0-18c2 1 3 3 3 6s-1 5-3 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
  if (name === "spark") {
    return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm6 12 .8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>;
  }
  if (name === "target") {
    return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-3a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="2" /></svg>;
  }
  if (name === "user") {
    return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
  }
  if (name === "wallet") {
    return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16v12H4V7Zm13 5h3M7 7V5h10v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
  if (name === "water") {
    return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3s6 6.1 6 11a6 6 0 0 1-12 0c0-4.9 6-11 6-11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>;
  }
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function LandingClient() {
  const [started, setStarted] = useState(false);

  if (started) {
    return <ConsultationClient onClose={() => setStarted(false)} />;
  }

  return <LandingPage onStart={() => setStarted(true)} />;
}

function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03070f] text-white">
      <Header onStart={onStart} />
      <Hero onStart={onStart} />
      <AIExecutionSystemSection />
      <StatsStrip />
      <FeaturesSection />
      <InteractiveDemoSection onStart={onStart} />
      <HowItWorksSection onStart={onStart} />
      <AIThinkingSection />
      <ComparisonSection />
      <TransformationsSection />
      <TestimonialsSection />
      <PlansSection onStart={onStart} />
      <TrustSection />
      <FinalCTA onStart={onStart} />
      <Footer />
    </main>
  );
}

function Header({ onStart }: { onStart: () => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#03070f]/88 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-[1520px] items-center justify-between gap-5 px-5 lg:px-8" aria-label="Primary navigation">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-[linear-gradient(135deg,#b9ff4f,#00d474)] text-xl font-black text-[#04100b] shadow-[0_0_34px_rgba(63,255,128,0.32)]">
            M
          </span>
          <span className="text-2xl font-black tracking-tight">MyTrine AI</span>
        </Link>

        <div className="hidden items-center gap-7 text-sm font-bold text-white/70 lg:flex">
          {navLinks.map(([label, href], index) => (
            <Link key={label} href={href} className={`relative transition hover:text-[#b9ff4f] ${index === 0 ? "text-[#b9ff4f]" : ""}`}>
              {label}
              {index === 0 ? <span className="absolute -bottom-7 left-0 h-0.5 w-full rounded-full bg-[#b9ff4f]" /> : null}
            </Link>
          ))}
        </div>

        <AuthNavControls onStart={onStart} />
      </nav>
    </header>
  );
}

function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section id="home" className="relative px-5 pb-8 pt-4 lg:px-8 lg:pb-10 lg:pt-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_30%,rgba(73,255,137,0.13),transparent_31%),radial-gradient(circle_at_10%_18%,rgba(55,109,180,0.13),transparent_28%),linear-gradient(135deg,#02050b_0%,#07101c_48%,#02050b_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(185,255,79,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(185,255,79,0.18)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative mx-auto grid max-w-[1520px] items-start gap-5 lg:grid-cols-[0.4fr_0.6fr] xl:gap-6">
        <div className="relative z-20 flex h-full flex-col">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#b9ff4f]/30 bg-[#b9ff4f]/8 px-4 py-2 text-sm font-bold text-[#cfff7a] shadow-[0_0_30px_rgba(185,255,79,0.12)]">
            <Icon name="spark" className="h-4 w-4" />
            AI-Powered Transformation Manager
          </div>

          <h1 className="mt-5 max-w-[560px] text-[2.42rem] font-black leading-[1.14] tracking-normal sm:text-[2.68rem] xl:text-[2.72rem]">
            Your 90-Day Transformation.
            <span className="block bg-[linear-gradient(90deg,#f8fff2,#b9ff4f)] bg-clip-text text-transparent">Fully Managed By AI.</span>
          </h1>

          <p className="mt-5 max-w-[580px] text-base leading-7 text-[#a9bfd6]">
            Tell us your target body once. MyTrine AI creates your transformation blueprint, orders meals, tracks progress, and continuously optimizes your journey.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button onClick={onStart} className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-[linear-gradient(135deg,#b9ff4f,#00d474)] px-7 text-sm font-black text-[#031008] shadow-[0_20px_55px_rgba(0,212,116,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_26px_70px_rgba(0,212,116,0.36)]">
              Start Free Assessment
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#04100b]/12">
                <Icon name="arrow" className="h-4 w-4" />
              </span>
            </button>
            <Link href="#how-it-works" className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl border border-white/14 bg-white/[0.04] px-7 text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-[#b9ff4f]/40">
              Watch Demo
              <span className="grid h-8 w-8 place-items-center rounded-full border border-white/20">
                <Icon name="arrow" className="h-4 w-4" />
              </span>
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 sm:flex-nowrap">
            {trustBullets.map((item) => (
              <span key={item} className="inline-flex whitespace-nowrap items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-bold text-[#c4d4e6]">
                <Icon name="check" className="h-4 w-4 text-[#b9ff4f]" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <HeroVisual />
      </div>

    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative flex min-h-[335px] items-start justify-center py-1 lg:min-h-[350px]">
      <div className="absolute inset-0 z-0 opacity-45">
        <div className="absolute left-[12%] top-[2%] h-[520px] w-[520px] rounded-full bg-[#1cd47a]/6 blur-[86px]" />
        <div className="absolute right-[8%] top-[10%] h-[340px] w-[340px] rounded-full bg-[#315a9f]/7 blur-[80px]" />
      </div>

      <div className="relative z-20 w-full max-w-[850px] rounded-[2rem] border border-white/8 bg-[linear-gradient(145deg,rgba(13,24,33,0.9),rgba(4,9,16,0.98))] p-2 shadow-[0_28px_78px_rgba(0,0,0,0.46),0_0_34px_rgba(0,212,116,0.055)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[linear-gradient(125deg,rgba(255,255,255,0.07),transparent_24%,transparent_78%,rgba(185,255,79,0.03))]" />

        <div className="relative overflow-hidden rounded-[1.55rem] border border-white/10 bg-[#07101b]">
          <div className="p-3">
            <div className="grid items-start gap-3 xl:grid-cols-[0.7fr_0.58fr_1.72fr]">
              <div className="flex min-h-[172px] flex-col rounded-3xl border border-[#b9ff4f]/14 bg-[linear-gradient(145deg,rgba(9,26,22,0.88),rgba(8,18,28,0.94))] p-3 shadow-[0_14px_34px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.05)]">
                <p className="text-sm font-black text-[#c9d8e7]">Transformation Progress</p>
                <div className="grid flex-1 place-items-center py-1.5">
                  <div className="mytrine-progress-ring grid h-20 w-20 place-items-center rounded-full bg-[conic-gradient(#b9ff4f_0_78%,rgba(255,255,255,0.1)_78%_100%)] p-2 shadow-[0_0_22px_rgba(185,255,79,0.12)]">
                    <div className="grid h-full w-full place-items-center rounded-full bg-[#07111d]">
                      <div className="text-center">
                        <p className="text-2xl font-black">78%</p>
                        <p className="text-xs font-bold text-[#8fa6ba]">On Track</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-2 xl:grid-rows-3">
                {commandMetrics.filter(([label]) => label !== "Transformation Progress" && label !== "Expected Goal Date").map(([label, value]) => (
                  <div key={label} className="flex min-h-[52px] flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.05] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.045)]">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#71859d]">{label}</p>
                    <p className="mt-1 text-xl font-black text-white">{value.replace(" kg", "kg").replace(" Days", "")}</p>
                  </div>
                ))}
              </div>

              <HeroAutomationRail />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroAutomationRail() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-2">
      <div className="flex min-h-[172px] flex-col rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.045)] p-3 shadow-[0_14px_36px_rgba(0,0,0,0.22)]">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#b9ff4f]">Goal</p>
        </div>
        <div className="hidden">
          {blueprintMilestones.filter(([week]) => week === "Week 1" || week === "Week 12").map(([week, weight]) => (
            <div key={week} className="flex items-center justify-between rounded-2xl bg-[#0d1720]/85 px-2.5 py-1">
              <span className="text-xs font-bold text-[#8fa6ba]">{week}</span>
              <span className="text-sm font-black text-white">{weight.replace(" kg", "kg")}</span>
            </div>
          ))}
        </div>
        <div className="hidden">
          <p className="hidden">
            Goal Date: <span className="text-white">Aug 21</span>
            <span className="mx-2 text-[#71859d]">·</span>
            Confidence: <span className="text-white">92%</span>
            <span className="mx-2 text-[#71859d]">·</span>
            Status: <span className="text-[#b9ff4f]">Protected</span>
          </p>
          <p className="hidden">
            Goal Date: <span className="text-white">Aug 21</span>
            <span className="mx-2 text-[#71859d]">|</span>
            Confidence: <span className="text-white">92%</span>
            <span className="mx-2 text-[#71859d]">|</span>
            Status: <span className="text-[#b9ff4f]">Protected</span>
          </p>
          <p className="hidden">
            Aug 21 <span className="mx-1.5 text-[#71859d]">•</span> 92% <span className="mx-1.5 text-[#71859d]">•</span> <span className="text-[#b9ff4f]">Protected</span>
          </p>
          <p className="whitespace-nowrap text-xs font-black leading-5 text-[#c4d4e6]">
            Aug 21 <span className="mx-1.5 text-[#71859d]">•</span> 92%
          </p>
        </div>
        <div className="grid flex-1 place-items-center text-center">
          <div>
            <p className="text-2xl font-black text-white">93kg → 75kg</p>
            <p className="mt-1 text-sm font-black text-[#8fa6ba]">90 Days</p>
          </div>
        </div>
      </div>

      <div className="flex min-h-[172px] flex-col rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.045)] p-3 shadow-[0_14px_36px_rgba(0,0,0,0.22)]">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#b9ff4f]">Lunch Ordered</p>
        </div>
        <div className="mt-2.5 flex flex-1 items-center gap-2.5">
          <div>
            <h3 className="text-base font-black leading-tight">Grilled Chicken Bowl</h3>
          </div>
        </div>
        <div className="mt-2.5 rounded-2xl border border-[#b9ff4f]/14 bg-[#b9ff4f]/8 p-2.5">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="mt-1 text-base font-black text-[#b9ff4f]">12 mins</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function AIExecutionSystemSection() {
  const optimizationItems = ["Nutrition recalibrated", "Workout load balanced", "Goal date protected"];
  const recentActivity = ["Lunch Delivered", "Workout Completed", "Weight Updated", "Goal Progress Updated"];

  return (
    <section className="border-y border-white/8 bg-[#03070f] px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-[1520px]">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#b9ff4f]">AI Execution System</p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">Daily execution after the blueprint.</h2>
          </div>
          <p className="max-w-xl text-sm font-bold leading-7 text-[#8fa6ba]">
            MyTrine executes daily actions, optimizes the route, and responds when the user misses a step.
          </p>
        </div>

        <div className="mt-8 grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-3 sm:grid-cols-3">
            {heroProofMetrics.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.045)]">
                <p className="text-sm font-black leading-5 text-white">{item}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[#b9ff4f]/16 bg-[#b9ff4f]/7 p-4 shadow-[0_18px_48px_rgba(0,0,0,0.22)]">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#b9ff4f]/12 text-[#b9ff4f]">
                <Icon name="spark" className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-base font-black text-white">AI handles the next step</h3>
                <p className="mt-1 text-sm font-bold leading-6 text-[#abc1d6]">
                  Missed workout? AI adjusts tomorrow&apos;s calories, workout load, and goal timeline automatically.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1.1fr]">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-black">AI Executed Today</h3>
              <span className="rounded-full bg-[#b9ff4f]/10 px-3 py-1 text-xs font-black text-[#b9ff4f]">Actively executing</span>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {aiActions.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-2xl border border-white/8 bg-[#0d1720]/90 p-3">
                  <Icon name="check" className="h-4 w-4 shrink-0 text-[#b9ff4f]" />
                  <span className="text-xs font-bold text-[#dce8f5]">{item}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-black">Journey Optimization</h3>
              <span className="text-xs font-black text-[#b9ff4f]">Auto-adjusting</span>
            </div>
            <div className="mt-4 space-y-3">
              {optimizationItems.map((item) => (
                <div key={item} className="rounded-2xl bg-[#0d1720]/90 p-3 text-sm font-bold text-[#c4d4e6]">{item}</div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
            <h3 className="font-black">Recent Activity</h3>
            <div className="mt-4 space-y-3">
              {recentActivity.map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl bg-[#0d1720]/90 px-3 py-2.5">
                  <span className="flex items-center gap-2 text-sm font-bold text-[#c4d4e6]">
                    <Icon name="check" className="h-4 w-4 text-[#b9ff4f]" />
                    {item}
                  </span>
                  <span className="text-xs font-bold text-[#71859d]">now</span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#b9ff4f]">AI Chat Preview</p>
            <div className="mt-4 grid gap-3">
              <p className="max-w-[86%] rounded-2xl border border-white/10 bg-[#0d1720]/90 p-3 text-sm font-bold text-[#dce8f5]">I skipped today&apos;s workout.</p>
              <p className="ml-auto max-w-[90%] rounded-2xl border border-[#b9ff4f]/18 bg-[#b9ff4f]/8 p-3 text-sm font-bold leading-6 text-[#dce8f5]">No worries. I reduced today&apos;s calories by 200, moved the workout to tomorrow, and protected your goal date.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <section className="relative border-y border-white/8 bg-[#03070f] px-5 py-5 lg:px-8">
      <div className="mx-auto grid max-w-[1520px] gap-3 md:grid-cols-5">
        {stats.map(([value, label]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-[#07110f]/80 p-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.045)]">
            <p className="text-xl font-black text-[#b9ff4f]">{value}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8fa6ba]">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="relative px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-[1520px]">
        <SectionHeading eyebrow="Inside MyTrine AI" title="A manager for the full transformation." copy="Assessment, planning, food ordering, tracking, and optimization work together so the user never has to guess the next step." />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {featureCards.slice(0, 3).map(([title, problem, solution, result, icon]) => (
            <article key={title} className="min-h-[340px] rounded-[1.9rem] border border-white/12 bg-[linear-gradient(145deg,rgba(13,24,33,0.96),rgba(6,13,22,0.96))] p-9 shadow-[0_30px_90px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:-translate-y-1 hover:border-[#b9ff4f]/30">
              <span className="grid h-14 w-14 place-items-center rounded-2xl border border-[#b9ff4f]/25 bg-[#b9ff4f]/10 text-[#b9ff4f]">
                <Icon name={icon as IconName} className="h-7 w-7" />
              </span>
              <h2 className="mt-8 text-[1.7rem] font-black leading-tight">{title}</h2>
              <div className="mt-6 space-y-4 text-sm leading-6">
                <FeatureLine label="Problem" value={problem} />
                <FeatureLine label="AI solution" value={solution} />
                <FeatureLine label="Result" value={result} />
              </div>
            </article>
          ))}
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {featureCards.slice(3).map(([title, problem, solution, result, icon]) => (
            <article key={title} className="rounded-[1.5rem] border border-white/10 bg-[#090f18]/80 p-6 shadow-[0_20px_55px_rgba(0,0,0,0.2)]">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-[#b9ff4f]">
                <Icon name={icon as IconName} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-black">{title}</h3>
              <div className="mt-5 space-y-3 text-sm leading-6">
                <FeatureLine label="Problem" value={problem} compact />
                <FeatureLine label="AI solution" value={solution} compact />
                <FeatureLine label="Result" value={result} compact />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureLine({ compact = false, label, value }: { compact?: boolean; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-3">
      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#b9ff4f]">{label}</p>
      <p className={`${compact ? "mt-1 text-xs" : "mt-2 text-sm"} font-bold text-[#abc1d6]`}>{value}</p>
    </div>
  );
}

function HowItWorksSection({ onStart }: { onStart: () => void }) {
  return (
    <section id="how-it-works" className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-[1520px] rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(10,20,18,0.98),rgba(4,8,15,0.94))] p-7 shadow-[0_30px_110px_rgba(0,0,0,0.32)] lg:p-10">
        <SectionHeading eyebrow="How MyTrine Works" title="From goal to result in five managed steps." copy="The product journey is simple: tell MyTrine your goal once, then AI plans, executes, tracks, and optimizes the transformation." />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {howSteps.map(([number, title, copy]) => (
            <article key={number} className="relative rounded-3xl border border-white/10 bg-white/[0.045] p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#b9ff4f] text-sm font-black text-[#04100b]">{number}</span>
              <h3 className="mt-8 text-xl font-black">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#abc1d6]">{copy}</p>
            </article>
          ))}
        </div>
        <button onClick={onStart} className="mt-9 inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-[linear-gradient(135deg,#b9ff4f,#00d474)] px-7 text-sm font-black text-[#031008] transition hover:-translate-y-0.5">
          Build My Plan
          <Icon name="arrow" className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

function AIThinkingSection() {
  return (
    <section className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-[1520px]">
        <SectionHeading eyebrow="How the AI Thinks" title="From body data to daily decisions." copy="MyTrine does not just generate a plan. It turns user signals into decisions, actions, and adjustments across the full journey." />
        <div className="mt-12 grid gap-3 md:grid-cols-3 xl:grid-cols-9">
          {aiThinkingSteps.map((step, index) => (
            <div key={step} className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-center shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
              <span className="mx-auto grid h-10 w-10 place-items-center rounded-2xl bg-[#b9ff4f] text-xs font-black text-[#04100b]">{index + 1}</span>
              <p className="mt-4 text-sm font-black leading-5 text-white">{step}</p>
              {index < aiThinkingSteps.length - 1 ? <Icon name="arrow" className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-[#b9ff4f]/70 xl:block" /> : null}
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-3xl border border-[#b9ff4f]/16 bg-[#b9ff4f]/7 p-5 text-center">
          <p className="text-sm font-bold leading-7 text-[#dce8f5]">
            Example decision: if sleep drops and weight stalls, MyTrine reduces workout intensity, protects protein, and shifts the meal budget toward higher-satiety foods.
          </p>
        </div>
      </div>
    </section>
  );
}

function InteractiveDemoSection({ onStart }: { onStart: () => void }) {
  const [age, setAge] = useState("28");
  const [weight, setWeight] = useState("95");
  const [goal, setGoal] = useState("Fat loss");
  const [budget, setBudget] = useState("300");
  const [activity, setActivity] = useState("Moderate");
  const [sleep, setSleep] = useState("6-7");

  const weightNumber = Number(weight) || 95;
  const targetWeight = goal === "Muscle gain" ? weightNumber + 4 : goal === "Maintenance" ? weightNumber : weightNumber - 18;
  const calorieTarget = goal === "Muscle gain" ? 2450 : goal === "Maintenance" ? 2100 : 1650;

  return (
    <section className="px-5 py-16 lg:px-8">
      <div className="mx-auto grid max-w-[1520px] gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(13,24,33,0.94),rgba(4,9,16,0.96))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.3)] lg:p-8">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#b9ff4f]">Interactive Demo</p>
          <h2 className="mt-4 text-4xl font-black leading-tight">Generate a sample AI blueprint.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#abc1d6]">
            Preview the assessment experience. No backend, no signup, just a simulated plan so visitors know what happens after the CTA.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <DemoField label="Age" value={age} onChange={setAge} />
            <DemoField label="Weight" value={weight} onChange={setWeight} suffix="kg" />
            <DemoSelect label="Goal" value={goal} onChange={setGoal} options={["Fat loss", "Muscle gain", "Maintenance"]} />
            <DemoField label="Daily meal budget" value={budget} onChange={setBudget} prefix="Rs." />
            <DemoSelect label="Activity level" value={activity} onChange={setActivity} options={["Low", "Moderate", "High"]} />
            <DemoSelect label="Sleep" value={sleep} onChange={setSleep} options={["Less than 5", "6-7", "8+"]} />
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#b9ff4f]">AI Assessment Preview</p>
                <h3 className="mt-2 text-xl font-black">Question 14 of 72</h3>
              </div>
              <span className="rounded-full bg-[#b9ff4f]/10 px-3 py-1 text-xs font-black text-[#b9ff4f]">2 mins left</span>
            </div>
            <p className="mt-5 text-sm font-bold text-[#dce8f5]">How many hours do you sleep?</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {["Less than 5", "6-7", "8+"].map((item) => (
                <button key={item} type="button" onClick={() => setSleep(item)} className={`rounded-2xl border px-4 py-3 text-sm font-black transition ${sleep === item ? "border-[#b9ff4f]/40 bg-[#b9ff4f]/12 text-[#b9ff4f]" : "border-white/10 bg-[#0d1720]/80 text-[#c4d4e6] hover:border-white/20"}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[#09131f]/88 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.3)] lg:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#b9ff4f]">Sample Plan</p>
              <h3 className="mt-4 text-3xl font-black">AI-generated transformation route</h3>
            </div>
            <span className="rounded-full bg-[#b9ff4f]/10 px-4 py-2 text-xs font-black text-[#b9ff4f]">{activity} activity</span>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              ["Current body", `${weightNumber} kg`],
              ["Target body", `${targetWeight} kg`],
              ["Daily calories", `${calorieTarget} kcal`],
              ["Meal budget", `Rs.${budget}/day`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#71859d]">{label}</p>
                <p className="mt-2 text-2xl font-black">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-3xl border border-[#b9ff4f]/16 bg-[#b9ff4f]/8 p-5">
            <p className="text-sm font-black text-[#b9ff4f]">AI action plan</p>
            <ul className="mt-4 space-y-3">
              {[
                "Build a 90-day route with weekly body targets.",
                "Order one high-protein lunch within budget.",
                "Adjust workout intensity around sleep and recovery.",
                "Review progress daily and protect the target date.",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm font-bold leading-6 text-[#dce8f5]">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-[#b9ff4f]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={onStart} className="mt-6 inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[linear-gradient(135deg,#b9ff4f,#00d474)] px-7 text-sm font-black text-[#031008] transition hover:-translate-y-0.5">
            Generate My Free AI Blueprint
            <Icon name="arrow" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function DemoField({ label, onChange, prefix, suffix, value }: { label: string; onChange: (value: string) => void; prefix?: string; suffix?: string; value: string }) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.14em] text-[#8fa6ba]">{label}</span>
      <span className="mt-2 flex h-12 items-center rounded-2xl border border-white/10 bg-[#0d1720]/85 px-4 focus-within:border-[#b9ff4f]/40">
        {prefix ? <span className="mr-2 text-sm font-bold text-[#71859d]">{prefix}</span> : null}
        <input value={value} onChange={(event) => onChange(event.target.value)} inputMode="numeric" className="min-w-0 flex-1 bg-transparent text-sm font-black text-white outline-none" />
        {suffix ? <span className="ml-2 text-sm font-bold text-[#71859d]">{suffix}</span> : null}
      </span>
    </label>
  );
}

function DemoSelect({ label, onChange, options, value }: { label: string; onChange: (value: string) => void; options: string[]; value: string }) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.14em] text-[#8fa6ba]">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-[#0d1720] px-4 text-sm font-black text-white outline-none transition focus:border-[#b9ff4f]/40">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function ComparisonSection() {
  return (
    <section className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-[1520px]">
        <SectionHeading eyebrow="Why MyTrine AI" title="Why MyTrine Is Different" copy="See how MyTrine compares to traditional fitness apps, trainers, and nutrition plans." />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {[
            ["Without MyTrine", withoutMyTrine, "border-white/10 bg-[#090f18]/88 text-[#8fa6ba]"],
            ["With MyTrine", withMyTrine, "border-[#b9ff4f]/20 bg-[#b9ff4f]/8 text-[#dce8f5]"],
          ].map(([title, items, tone]) => (
            <article key={title as string} className={`rounded-[1.7rem] border p-6 shadow-[0_20px_70px_rgba(0,0,0,0.2)] ${tone as string}`}>
              <h3 className="text-2xl font-black text-white">{title as string}</h3>
              <ul className="mt-5 grid gap-3">
                {(items as string[]).map((item) => (
                  <li key={item} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-[#07111d]/70 p-3 text-sm font-bold">
                    <Icon name="check" className="h-5 w-5 shrink-0 text-[#b9ff4f]" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[#09131f]/88 shadow-[0_24px_75px_rgba(0,0,0,0.24)]">
          <div className="overflow-x-auto">
            <div className="grid min-w-[980px] grid-cols-[1.2fr_repeat(5,1fr)] border-b border-white/10 bg-white/[0.035] text-xs font-black uppercase tracking-[0.12em] text-[#8fa6ba]">
              {["Capability", "Fitness Apps", "Trainer", "Diet PDFs", "MyFitnessPal", "MyTrine AI"].map((item) => (
                <div key={item} className="p-4">{item}</div>
              ))}
            </div>
            {comparisonRows.map((row, rowIndex) => (
              <div key={`${rowIndex}-${row[0]}`} className="grid min-w-[980px] grid-cols-[1.2fr_repeat(5,1fr)] border-b border-white/8 last:border-b-0">
                {row.map((item, index) => (
                  <div key={`${rowIndex}-${index}-${item}`} className={`p-4 text-sm font-bold leading-6 ${index === 5 ? "bg-[#b9ff4f]/7 text-[#dce8f5]" : index === 0 ? "text-white" : "text-[#8fa6ba]"}`}>
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TransformationsSection() {
  return (
    <section id="results" className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-[1520px]">
        <SectionHeading eyebrow="Transformation Proof" title="Measurable journeys, not vanity screenshots." copy="Each example shows the category, duration, adherence, calories managed, and body-change signal behind the result." />
        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {resultCases.map(([category, before, after, duration, adherence, calories, bodyFat, timeline]) => (
            <article key={category} className="rounded-[1.7rem] border border-white/10 bg-[#090f18]/88 p-6 shadow-[0_22px_70px_rgba(0,0,0,0.24)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#b9ff4f]">{category}</p>
                  <h3 className="mt-3 text-3xl font-black">{before} -&gt; {after}</h3>
                </div>
                <span className="rounded-full bg-[#b9ff4f]/10 px-3 py-1 text-xs font-black text-[#b9ff4f]">{duration}</span>
              </div>
              <div className="mt-6 grid gap-3">
                {[
                  ["Adherence Score", adherence],
                  ["Calories Managed", calories],
                  ["Body Change", bodyFat],
                  ["Timeline", timeline],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3">
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#71859d]">{label}</span>
                    <span className="text-sm font-black text-white">{value}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6 rounded-[1.7rem] border border-white/10 bg-[linear-gradient(145deg,rgba(13,24,33,0.94),rgba(4,9,16,0.96))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#b9ff4f]">Example Trend</p>
              <h3 className="mt-2 text-3xl font-black">AI-managed route from 95 kg to 77 kg</h3>
            </div>
            <span className="rounded-full bg-[#b9ff4f]/10 px-4 py-2 text-xs font-black text-[#b9ff4f]">92% adherence</span>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {resultMetrics.map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#71859d]">{label}</p>
                <p className="mt-2 text-xl font-black">{value}</p>
              </div>
            ))}
          </div>
          <svg className="mt-6 h-44 w-full" viewBox="0 0 520 178" role="img" aria-label="AI-managed weight trend from 95 kilograms to 77 kilograms with a 75 kilogram goal marker">
            <path d="M18 122 C80 96 106 110 154 84 S240 94 296 60 S390 52 496 24" fill="none" stroke="#b9ff4f" strokeWidth="5" strokeLinecap="round" />
            <path d="M18 122 C80 96 106 110 154 84 S240 94 296 60 S390 52 496 24 L496 144 L18 144 Z" fill="url(#resultGraph)" opacity="0.16" />
            <path d="M18 18H496" stroke="rgba(185,255,79,0.28)" strokeDasharray="6 8" strokeLinecap="round" />
            {[
              [18, 122, "95 kg", "Week 0"],
              [154, 84, "89 kg", "Week 4"],
              [296, 60, "82 kg", "Week 8"],
              [496, 24, "77 kg", "Week 12"],
            ].map(([x, y, weight, week]) => (
              <g key={week}>
                <circle cx={x} cy={y} r="6" fill="#07111d" stroke="#b9ff4f" strokeWidth="3" />
                <text x={x} y={162} textAnchor="middle" fill="#8fa6ba" fontSize="12" fontWeight="700">{week}</text>
                <text x={x} y={Number(y) - 12} textAnchor="middle" fill="#dce8f5" fontSize="12" fontWeight="900">{weight}</text>
              </g>
            ))}
            <text x="496" y="14" textAnchor="end" fill="#b9ff4f" fontSize="12" fontWeight="900">75 kg goal</text>
            <defs>
              <linearGradient id="resultGraph" x1="0" x2="0" y1="0" y2="1">
                <stop stopColor="#b9ff4f" />
                <stop offset="1" stopColor="#b9ff4f" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-[1520px]">
        <SectionHeading eyebrow="Customer Stories" title="Users describe it as management, not tracking." copy="The strongest signal is simple: users feel the AI is operating the transformation journey with them." />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map(([name, role, quote]) => (
            <article key={name} className="rounded-[1.7rem] border border-white/10 bg-[#090f18]/85 p-7 shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
              <p className="text-[#ffd76b]" aria-label="5 star rating">*****</p>
              <p className="mt-6 text-xl font-black leading-8 text-white">&quot;{quote}&quot;</p>
              <div className="mt-8 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(135deg,#b9ff4f,#4f8cff)] text-sm font-black text-[#07100d]">{name[0]}</span>
                <div>
                  <p className="font-black">{name}</p>
                  <p className="text-sm font-bold text-[#8fa6ba]">{role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlansSection({ onStart }: { onStart: () => void }) {
  return (
    <section id="plans" className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-[1520px]">
        <SectionHeading eyebrow="Pricing" title="Premium AI management for a serious transformation." copy="Choose the operating layer for your transformation journey, from assessment to full AI-managed execution." />
        <div className="mx-auto mt-8 grid max-w-4xl gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-center shadow-[0_20px_60px_rgba(0,0,0,0.22)] md:grid-cols-3">
          {[
            ["Trainer", "Rs.8K-20K/mo"],
            ["Nutritionist", "Rs.3K-10K/mo"],
            ["MyTrine AI", "Starting from Rs.999"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-[#07111d]/80 p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#71859d]">{label}</p>
              <p className="mt-2 text-xl font-black text-white">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid items-center gap-6 lg:grid-cols-3">
          {pricingPlans.map(([name, price, copy, items], index) => (
            <article key={name} className={`relative rounded-[1.7rem] border p-7 ${index === 1 ? "scale-[1.05] border-[#b9ff4f]/45 bg-[linear-gradient(145deg,#122016,#07100d)] shadow-[0_36px_105px_rgba(0,0,0,0.48),0_0_54px_rgba(185,255,79,0.08)]" : "border-white/10 bg-[#090f18] shadow-[0_22px_65px_rgba(0,0,0,0.22)]"}`}>
              {index === 1 ? <span className="absolute -top-3 right-7 rounded-full bg-[#b9ff4f] px-4 py-1 text-xs font-black text-[#04100b]">Most Popular</span> : null}
              <h3 className="text-2xl font-black">{name}</h3>
              <p className="mt-5 text-5xl font-black text-[#b9ff4f]">{price}</p>
              <p className="mt-3 text-sm leading-7 text-[#abc1d6]">{copy}</p>
              <ul className="mt-8 space-y-3">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-bold text-[#dce8f5]">
                    <Icon name="check" className="h-5 w-5 text-[#b9ff4f]" />
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={onStart} className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#b9ff4f,#00d474)] text-sm font-black text-[#031008] transition hover:-translate-y-0.5">
                Start Plan
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-[1520px]">
        <SectionHeading eyebrow="Trust & Ecosystem" title="Built for sensitive transformation data." copy="A transformation manager needs user trust. MyTrine keeps recommendations understandable, privacy visible, and integrations transparent." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {trustCards.map(([title, copy]) => (
            <article key={title} className="rounded-[1.5rem] border border-white/10 bg-[#090f18]/85 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.2)]">
              <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[#b9ff4f]/20 bg-[#b9ff4f]/10 text-[#b9ff4f]">
                <Icon name="check" className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#abc1d6]">{copy}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#b9ff4f]">Trusted integrations</p>
          <p className="mt-2 text-sm font-bold text-[#8fa6ba]">Compatible with the tools users already rely on.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {integrations.map((item) => (
              <span key={item} className="rounded-2xl border border-white/10 bg-[#07111d]/80 px-5 py-3 text-sm font-black text-[#dce8f5] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ onStart }: { onStart: () => void }) {
  return (
    <section className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-[1520px] rounded-[2rem] border border-[#b9ff4f]/16 bg-[linear-gradient(145deg,rgba(13,24,33,0.96),rgba(6,20,14,0.96))] p-8 text-center shadow-[0_34px_100px_rgba(0,0,0,0.34)] lg:p-12">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-[#b9ff4f]">Start with a free blueprint</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
          Stop Guessing. Start Transforming.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#abc1d6]">
          Your AI does not just track progress. It manages your entire transformation until you reach your goal.
        </p>
        <button onClick={onStart} className="mt-8 inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-[linear-gradient(135deg,#b9ff4f,#00d474)] px-8 text-sm font-black text-[#031008] transition hover:-translate-y-0.5">
          Generate My Free AI Blueprint
          <Icon name="arrow" className="h-4 w-4" />
        </button>
        <p className="mt-4 text-xs font-bold text-[#71859d]">No credit card required. Private assessment. Takes about 2 minutes.</p>
      </div>
    </section>
  );
}

function SectionHeading({ copy, eyebrow, title }: { copy: string; eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <p className="text-sm font-black uppercase tracking-[0.35em] text-[#b9ff4f]">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-[#abc1d6]">{copy}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#02050b] px-5 py-14 lg:px-8">
      <div className="mx-auto max-w-[1520px]">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr_0.65fr_0.65fr_0.65fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[linear-gradient(135deg,#b9ff4f,#00d474)] font-black text-[#04100b]">M</span>
              <p className="text-2xl font-black">MyTrine AI</p>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#8fa6ba]">
              The AI Transformation Manager that creates the plan, manages nutrition, orders meals, tracks progress, and optimizes the journey.
            </p>
            <div className="mt-6 flex gap-3">
              {["in", "IG", "X"].map((item) => (
                <span key={item} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-xs font-black text-[#c4d4e6]">{item}</span>
              ))}
            </div>
          </div>

          <FooterColumn title="Product" links={["Features", "Pricing", "Transformations", "AI Food Ordering"]} />
          <FooterColumn title="Company" links={["About", "Careers", "Contact", "Press"]} />
          <FooterColumn title="Resources" links={["Help Center", "Transformation Guide", "API Status", "Security"]} />
          <FooterColumn title="Legal" links={["Privacy Policy", "Terms of Service", "Refund Policy", "Medical Disclaimer"]} />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-[#667898] md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 MyTrine AI. All rights reserved.</p>
          <p>Built for AI-managed transformation journeys.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-black uppercase tracking-[0.16em] text-[#dce8f5]">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="text-sm font-bold text-[#8fa6ba] transition hover:text-white">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AuthNavControls({ onStart }: { onStart: () => void }) {
  const { isLoaded, isSignedIn } = useUser();
  const [wasSignedIn, setWasSignedIn] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    queueMicrotask(() => setWasSignedIn(Boolean(isSignedIn)));
  }, [isLoaded, isSignedIn]);

  if (isSignedIn || (!isLoaded && wasSignedIn)) {
    return (
      <div className="flex items-center gap-3">
        <button onClick={onStart} className="hidden rounded-2xl bg-[linear-gradient(135deg,#b9ff4f,#00d474)] px-5 py-3 text-sm font-black text-[#031008] transition hover:-translate-y-0.5 sm:inline-flex">Start Free Assessment</button>
        <ProfileMenu />
      </div>
    );
  }

  if (!isLoaded) {
    return <div className="h-12 w-[190px]" />;
  }

  return (
    <div className="flex items-center gap-3">
      <Link href="/sign-in" className="hidden h-12 items-center justify-center rounded-2xl border border-white/14 bg-white/[0.03] px-5 text-sm font-black text-white transition hover:border-[#b9ff4f]/40 sm:inline-flex">
        Log in
      </Link>
      <button onClick={onStart} className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#b9ff4f,#00d474)] px-5 text-sm font-black text-[#031008] shadow-[0_16px_40px_rgba(0,212,116,0.22)] transition hover:-translate-y-0.5">
        Start Free Assessment
        <Icon name="arrow" className="h-4 w-4" />
      </button>
    </div>
  );
}
