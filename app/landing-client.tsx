"use client";

import Link from "next/link";

type IconName =
  | "activity"
  | "arrow"
  | "brain"
  | "calendar"
  | "chart"
  | "check"
  | "food"
  | "lock"
  | "photo"
  | "spark"
  | "target"
  | "wallet"
  | "water";

type FeatureCard = {
  title: string;
  copy: string;
  icon: IconName;
};

const navLinks = [
  ["Home", "#home"],
  ["Features", "#features"],
  ["How It Works", "#how-it-works"],
  ["Transformations", "#transformations"],
  ["Pricing", "#pricing"],
  ["Testimonials", "#testimonials"],
  ["FAQ", "#faq"],
] as const;

const trustBadges = [
  "No credit card required",
  "Private health profile",
  "AI decisions explained",
] as const;

const dashboardStats = [
  ["Current Weight", "93kg"],
  ["Target Weight", "75kg"],
  ["Days Remaining", "63"],
  ["Today's Calories", "1700 kcal"],
  ["Protein Goal", "130g"],
  ["Delivery Time", "12 mins"],
] as const;

const consultationItems = [
  ["Fitness goal", "Weight loss, weight gain, muscle, maintenance, or better fitness."],
  ["Body profile", "Current weight, target weight, age, height, gender, and routine."],
  ["Food preference", "Cuisine, veg or non-veg, allergies, meal timing, and dislikes."],
  ["Health context", "Health conditions, activity level, sleep, stress, and constraints."],
  ["Budget", "Daily food budget and realistic ordering or home-food preferences."],
  ["Workout preference", "Home, gym, equipment, available time, and recovery pattern."],
] as const;

const blueprintItems = [
  "Current health profile",
  "Target body goal",
  "90-day roadmap",
  "Monthly milestones",
  "Daily calorie and macro targets",
  "Workout schedule",
  "Food budget estimate",
  "Progress tracking plan",
] as const;

const executionCards: FeatureCard[] = [
  { title: "AI decides today's food", copy: "Chooses meals based on calories, protein, budget, and food preference.", icon: "food" },
  { title: "Checks availability", copy: "Prepares order-ready options from nearby food platforms when available.", icon: "spark" },
  { title: "Selects best meal", copy: "Balances taste, macros, price, delivery time, and goal fit.", icon: "target" },
  { title: "Prepares order flow", copy: "Shows the user a clear meal choice before final approval.", icon: "wallet" },
  { title: "Tracks progress", copy: "Connects food, workout, water, weight, and adherence into one loop.", icon: "chart" },
  { title: "Optimizes tomorrow", copy: "Adjusts calories, workout load, and reminders when the day changes.", icon: "calendar" },
];

const featureCards: FeatureCard[] = [
  { title: "AI body assessment", copy: "Understands your body details, goal, routine, and constraints before planning.", icon: "brain" },
  { title: "Personalized diet plan", copy: "Creates meals around calories, protein, preference, allergies, and budget.", icon: "food" },
  { title: "Smart workout plan", copy: "Builds home, gym, or hybrid training with recovery-aware progression.", icon: "activity" },
  { title: "Meal ordering assist", copy: "Suggests order-ready meals that fit the plan and keeps approval with the user.", icon: "wallet" },
  { title: "Budget-based planning", copy: "Keeps daily food choices realistic by tracking expected meal cost.", icon: "lock" },
  { title: "Progress tracking", copy: "Tracks workouts, meals, water, weight movement, and adherence signals.", icon: "chart" },
  { title: "Weight tracking", copy: "Turns weekly weight trends into smarter next-step decisions.", icon: "target" },
  { title: "Before-after preview", copy: "Keeps photos, measurements, and milestones in a private transformation view.", icon: "photo" },
  { title: "Daily reminders", copy: "Keeps meals, workouts, water, check-ins, and plan actions on schedule.", icon: "calendar" },
  { title: "AI plan optimization", copy: "Updates tomorrow's plan when life interrupts today's plan.", icon: "spark" },
];

const howSteps = [
  ["01", "Download App", "Create your MyTrine AI account and begin the guided assessment."],
  ["02", "Complete AI Consultation", "Answer questions about body, goal, food, health, routine, and budget."],
  ["03", "AI Creates Blueprint", "Get your 90-day roadmap, macros, workout route, and food budget."],
  ["04", "User Approves Plan", "Review the plan and confirm the direction before daily execution starts."],
  ["05", "AI Executes Daily Plan", "Meals, workouts, reminders, and adjustments are prepared every day."],
  ["06", "Track Progress & Transform", "Measure consistency, photos, weight trends, and plan adherence."],
] as const;

const orderingSignals = [
  ["Calorie goal", "1700 kcal"],
  ["Protein goal", "130g"],
  ["Food preference", "High protein"],
  ["Budget", "Rs. 250/day"],
  ["Location", "Nearby options"],
  ["Approval", "User confirms"],
] as const;

const results = [
  ["Weight Loss", "93kg", "75kg", "90 days", "18kg target loss", "78% adherence"],
  ["Muscle Gain", "58kg", "68kg", "120 days", "10kg target gain", "Protein timing"],
  ["Maintenance", "72kg", "72kg", "90 days", "Stable weight", "Higher fitness score"],
] as const;

const pricing = [
  ["Starter", "Rs. 999", "For users starting their first AI-guided route.", ["AI consultation", "7-day blueprint preview", "Daily diet suggestions", "Basic progress tracking"]],
  ["Pro", "Rs. 1499", "For a complete 90-day AI transformation journey.", ["90-day transformation blueprint", "Daily diet and workout plan", "Meal suggestion engine", "Progress optimization", "Before-after vault"]],
  ["Elite", "Rs. 2999", "For deeper accountability and automation controls.", ["Everything in Pro", "Advanced budget planning", "Priority AI feedback", "Weekly transformation review", "Advanced automation controls"]],
] as const;

const testimonials = [
  ["Arjun M.", "Founder, Chennai", "MyTrine AI removed the daily thinking. I had a clear food choice, workout, and next action every morning."],
  ["Nisha R.", "Product Manager, Bengaluru", "It felt like a transformation manager, not another tracker. I followed my diet better because decisions were easier."],
  ["Vikram S.", "Consultant, Hyderabad", "Budget-based meal suggestions saved time. I stopped guessing what to eat and stayed consistent."],
] as const;

const faqs = [
  ["Is MyTrine AI a gym app?", "No. MyTrine AI is an AI transformation manager. It connects consultation, diet, workouts, meal suggestions, tracking, budget, and optimization."],
  ["Can it help with weight loss and weight gain?", "Yes. The consultation can create routes for weight loss, weight gain, muscle gain, maintenance, and general fitness."],
  ["Does it create diet and workout plans?", "Yes. The AI creates personalized diet and workout plans from your goal, body details, activity, food preference, budget, and routine."],
  ["Can it order meals automatically?", "MyTrine AI can suggest and prepare an order-ready meal flow. Final payment and delivery approval should stay with the user unless a live integration is enabled."],
  ["Is my health data private?", "Yes. Health and transformation details should stay inside the user's private account and profile."],
  ["Can I change my goal later?", "Yes. If your goal changes, the AI can recalculate calories, milestones, workouts, and daily decisions."],
] as const;

export default function LandingClient() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#03070f] text-white">
      <Header />
      <Hero />
      <ConsultationSection />
      <BlueprintSection />
      <ExecutionSection />
      <FeaturesSection />
      <HowItWorksSection />
      <MealOrderingSection />
      <ResultsSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0e18]/92 backdrop-blur-xl animate-fade-in">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Link href="#home" className="flex min-w-0 items-center gap-3 transition hover:opacity-90">
          <LogoMark />
          <span className="truncate text-xl font-black tracking-tight sm:text-2xl">MyTrine AI</span>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-bold text-white/62 xl:flex">
          {navLinks.map(([label, href], index) => (
            <Link key={label} href={href} className={`relative transition hover:text-[#b9ff4f] ${index === 0 ? "text-[#b9ff4f]" : ""}`}>
              {label}
              {index === 0 ? <span className="absolute -bottom-7 left-0 h-0.5 w-full rounded-full bg-[#b9ff4f]" /> : null}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/sign-in" className="hidden rounded-2xl border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-black text-white transition hover:border-[#b9ff4f]/35 md:inline-flex">
            Log in
          </Link>
          <Link href="/consultation" className="inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#b9ff4f,#00d474)] px-4 py-3 text-xs font-black text-[#031008] shadow-[0_18px_48px_rgba(0,212,116,0.2)] transition hover:-translate-y-0.5 sm:px-5 sm:text-sm">
            <span className="hidden sm:inline">Start Free Assessment</span>
            <span className="sm:hidden">Start</span>
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-5 pb-16 pt-8 lg:px-8 lg:pb-20 lg:pt-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_22%,rgba(0,212,116,0.2),transparent_35%),radial-gradient(circle_at_16%_18%,rgba(185,255,79,0.12),transparent_32%),linear-gradient(135deg,#0a0e18_0%,#0d1224_48%,#0a0e18_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(185,255,79,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(185,255,79,0.2)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="min-w-0 animate-fade-in">
          <Badge>AI-Powered Transformation Manager</Badge>
          <h1 className="mt-6 max-w-3xl text-[2.5rem] font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.7rem] xl:text-[5.15rem] animate-slide-up">
            Your 90-Day Transformation.
            <span className="block bg-[linear-gradient(90deg,#f8fff2,#b9ff4f_55%,#00d474)] bg-clip-text text-transparent">
              Managed By AI.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#afc4d8] animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Tell us your target body once. MyTrine AI creates your transformation blueprint, orders meals, tracks progress, and continuously optimizes your journey.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link href="/consultation" className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-[linear-gradient(135deg,#b9ff4f,#00d474)] px-7 text-sm font-black text-[#031008] shadow-[0_22px_60px_rgba(0,212,116,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_80px_rgba(0,212,116,0.35)]">
              Start Free Assessment
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link href="#blueprint" className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl border border-white/14 bg-white/[0.04] px-7 text-sm font-black text-white transition hover:border-[#b9ff4f]/45 hover:bg-white/[0.08]">
              Watch Demo
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {trustBadges.map((item, idx) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-bold text-[#c6d7e8] transition hover:border-[#b9ff4f]/30 hover:bg-white/[0.06]" style={{ animationDelay: `${0.3 + idx * 0.1}s` }}>
                <Icon name="check" className="h-4 w-4 text-[#b9ff4f]" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <HeroDashboard />
      </div>
    </section>
  );
}

function HeroDashboard() {
  return (
    <div className="relative min-w-0 animate-scale-in" style={{ animationDelay: '0.4s' }}>
      <div className="absolute -inset-5 rounded-[3rem] bg-[#00d474]/15 blur-3xl animate-glow-pulse" />
      <div className="relative mx-auto max-w-[760px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#07111d]/92 p-2 shadow-[0_40px_120px_rgba(0,0,0,0.48)] backdrop-blur-2xl sm:p-3 hover:border-white/20 transition">
        <div className="rounded-[1.6rem] border border-white/10 bg-[#0a1220] p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#b9ff4f]">Live Command Center</p>
              <h2 className="mt-2 text-2xl font-black leading-tight sm:text-3xl">AI Transformation Dashboard</h2>
            </div>
            <span className="rounded-full bg-[#b9ff4f]/12 px-4 py-2 text-xs font-black text-[#b9ff4f]">
              AI Status: Executing
            </span>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-[0.95fr_1.05fr_1fr]">
            <div className="rounded-3xl border border-[#b9ff4f]/16 bg-[linear-gradient(145deg,rgba(11,32,25,0.95),rgba(10,18,32,0.98))] p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-black text-[#dce8f5]">Transformation Progress</p>
                <span className="rounded-full bg-[#b9ff4f]/12 px-3 py-1 text-xs font-black text-[#b9ff4f]">On Track</span>
              </div>
              <div className="grid min-h-40 place-items-center">
                <div className="grid h-28 w-28 place-items-center rounded-full bg-[conic-gradient(#b9ff4f_0_78%,rgba(255,255,255,0.1)_78%_100%)] p-3 shadow-[0_0_38px_rgba(185,255,79,0.18)] sm:h-32 sm:w-32">
                  <div className="grid h-full w-full place-items-center rounded-full bg-[#0a1220] text-center">
                    <div>
                      <p className="text-3xl font-black sm:text-4xl">78%</p>
                      <p className="text-xs font-black text-[#8fa6ba] sm:text-sm">On Track</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {dashboardStats.map(([label, value]) => (
                <MetricCard key={label} label={label} value={value} />
              ))}
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b9ff4f]">Lunch Ordered</p>
                <h3 className="mt-4 text-2xl font-black">Grilled Chicken Bowl</h3>
                <p className="mt-1 text-xs font-bold text-[#8fa6ba]">Lean Bowl Co. - high protein fit</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <MiniStat label="Delivery" value="12 mins" />
                  <MiniStat label="Status" value="Ready" />
                </div>
              </div>
              <div className="rounded-3xl border border-[#b9ff4f]/16 bg-[#b9ff4f]/8 p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b9ff4f]">AI Actions Today</p>
                <div className="mt-4 grid gap-2">
                  {["Breakfast planned", "Lunch selected", "Workout adjusted"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm font-bold text-[#dce8f5]">
                      <Icon name="check" className="h-4 w-4 text-[#b9ff4f]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConsultationSection() {
  return (
    <section className="border-y border-white/8 bg-[linear-gradient(135deg,#050a13_0%,#0a0f1a_50%,#050a13_100%)] px-5 py-16 lg:px-8" id="consultation">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="AI Consultation" title="The AI asks the right questions first." copy="MyTrine AI starts by understanding your body, goal, food habits, budget, lifestyle, and constraints before creating any plan." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {consultationItems.map(([title, copy], index) => (
            <article key={title} className="rounded-[1.7rem] border border-white/10 bg-[#0a1220]/88 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] transition hover:border-[#b9ff4f]/25 hover:shadow-[0_28px_90px_rgba(0,0,0,0.3)] animate-fade-in" style={{ animationDelay: `${index * 0.08}s` }}>
              <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[#b9ff4f]/20 bg-[#b9ff4f]/10 text-sm font-black text-[#b9ff4f]">{index + 1}</span>
              <h3 className="mt-6 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm font-bold leading-6 text-[#9fb4c8]">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlueprintSection() {
  return (
    <section id="blueprint" className="px-5 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(10,18,32,0.96),rgba(5,10,19,0.98))] p-6 shadow-[0_34px_100px_rgba(0,0,0,0.32)] lg:p-8">
          <Badge>Transformation Blueprint</Badge>
          <h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">A complete plan generated from one consultation.</h2>
          <p className="mt-5 max-w-2xl text-base font-bold leading-7 text-[#afc4d8]">
            The blueprint connects body profile, target result, meal budget, workouts, milestones, macros, and progress tracking into one managed journey.
          </p>
          <Link href="/consultation" className="mt-8 inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-[linear-gradient(135deg,#b9ff4f,#00d474)] px-7 text-sm font-black text-[#031008]">
            Generate My Free Blueprint
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-[2rem] border border-[#b9ff4f]/14 bg-[#b9ff4f]/7 p-6 shadow-[0_34px_100px_rgba(0,0,0,0.3)] lg:p-8">
          <div className="grid gap-3 sm:grid-cols-2">
            {blueprintItems.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-[#0a1220]/82 p-4">
                <div className="flex items-center gap-3">
                  <Icon name="check" className="h-5 w-5 text-[#b9ff4f]" />
                  <p className="text-sm font-black text-white">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExecutionSection() {
  return (
    <section className="border-y border-white/8 bg-[#050a13] px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="AI Execution System" title="MyTrine AI does not just suggest. It executes daily actions." copy="The difference is the daily loop: plan, meal choice, workout, tracking, and tomorrow's optimization all stay connected." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {executionCards.map((card, index) => (
            <FeatureTile key={card.title} {...card} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Features" title="Everything needed for an AI-managed transformation." copy="Diet, workouts, food ordering support, budget, reminders, and progress signals work together in one product." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {featureCards.map((card, index) => (
            <FeatureTile key={card.title} {...card} index={index + 1} compact />
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-y border-white/8 bg-[#050a13] px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="How It Works" title="From app download to visible transformation." copy="The workflow is simple for the user, while the AI manages many decisions behind the scenes." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          {howSteps.map(([number, title, copy]) => (
            <article key={number} className="rounded-[1.7rem] border border-white/10 bg-[#0a1220]/88 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#b9ff4f] text-sm font-black text-[#031008]">{number}</span>
              <h3 className="mt-6 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm font-bold leading-6 text-[#9fb4c8]">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MealOrderingSection() {
  return (
    <section className="px-5 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 rounded-[2.4rem] border border-white/10 bg-[linear-gradient(145deg,#0a1220,#050a13)] p-6 shadow-[0_36px_120px_rgba(0,0,0,0.38)] lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
        <div>
          <Badge>Meal Ordering System</Badge>
          <h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">AI prepares the order flow. You stay in control.</h2>
          <p className="mt-5 max-w-2xl text-base font-bold leading-7 text-[#afc4d8]">
            MyTrine AI can suggest and prepare a meal-ordering flow through food delivery platforms based on calorie goal, protein goal, food preference, location, and budget.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[#b9ff4f]/14 bg-[#07111d] p-5">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#b9ff4f]">Approval-Ready Meal</p>
          <h3 className="mt-5 text-4xl font-black">Paneer Protein Bowl</h3>
          <p className="mt-2 text-sm font-bold text-[#8fa6ba]">Prepared suggestion for food delivery platforms</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {orderingSignals.map(([label, value]) => (
              <MetricCard key={label} label={label} value={value} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultsSection() {
  return (
    <section id="transformations" className="border-y border-white/8 bg-[#050a13] px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Transformation Results" title="Before-after style cards with measurable progress." copy="Use the result view to understand weight movement, adherence, route length, and the goal the AI is protecting." />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {results.map(([title, start, end, days, result, adherence]) => (
            <article key={title} className="overflow-hidden rounded-[1.9rem] border border-white/10 bg-[#0a1220]/88 shadow-[0_26px_80px_rgba(0,0,0,0.3)]">
              <div className="grid grid-cols-2 border-b border-white/10">
                <div className="bg-white/[0.045] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7d90a8]">Start</p>
                  <p className="mt-4 text-4xl font-black">{start}</p>
                </div>
                <div className="bg-[#b9ff4f]/10 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b9ff4f]">Target</p>
                  <p className="mt-4 text-4xl font-black text-[#b9ff4f]">{end}</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black">{title}</h3>
                <p className="mt-3 text-sm font-bold text-[#afc4d8]">{result} in {days}</p>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[78%] rounded-full bg-[linear-gradient(90deg,#b9ff4f,#00d474)]" />
                </div>
                <p className="mt-4 text-sm font-black text-[#b9ff4f]">{adherence}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="px-5 py-16 lg:px-8 bg-[linear-gradient(135deg,transparent_0%,rgba(185,255,79,0.03)_50%,transparent_100%)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Pricing" title="Choose your AI transformation level." copy="Start simple, then upgrade when you want more automation and deeper accountability." />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {pricing.map(([name, price, copy, items], index) => (
            <article key={name} className={`relative rounded-[1.8rem] border p-7 transition animate-fade-in ${index === 1 ? "border-[#b9ff4f]/45 bg-[linear-gradient(145deg,#122016,#07100d)] shadow-[0_36px_110px_rgba(0,0,0,0.48),0_0_54px_rgba(185,255,79,0.08)] hover:shadow-[0_40px_130px_rgba(0,0,0,0.52),0_0_70px_rgba(185,255,79,0.12)]" : "border-white/10 bg-[#0a1220]/88 shadow-[0_22px_70px_rgba(0,0,0,0.22)] hover:border-white/20 hover:shadow-[0_28px_90px_rgba(0,0,0,0.32)]"}`} style={{ animationDelay: `${index * 0.1}s` }}>
              {index === 1 ? <span className="absolute right-5 top-5 rounded-full bg-[#b9ff4f] px-3 py-1 text-xs font-black text-[#031008]">Most Popular</span> : null}
              <h3 className="text-2xl font-black">{name}</h3>
              <p className="mt-4 text-4xl font-black text-[#b9ff4f]">{price}</p>
              <p className="mt-4 text-sm font-bold leading-6 text-[#afc4d8]">{copy}</p>
              <div className="mt-7 grid gap-3">
                {items.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-bold text-[#dce8f5]">
                    <Icon name="check" className="h-4 w-4 text-[#b9ff4f]" />
                    {item}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="border-y border-white/8 bg-[linear-gradient(135deg,#050a13_0%,#0a0f1a_50%,#050a13_100%)] px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Testimonials" title="Built for people who do not want another tracker." copy="MyTrine AI helps users save decision time, follow the plan, and understand what to do next." />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {testimonials.map(([name, role, quote], index) => (
            <article key={name} className="rounded-[1.7rem] border border-white/10 bg-[#0a1220]/88 p-6 shadow-[0_22px_70px_rgba(0,0,0,0.22)] transition hover:border-[#b9ff4f]/25 hover:shadow-[0_28px_90px_rgba(0,0,0,0.3)] animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <p className="text-lg font-black text-[#b9ff4f]">*****</p>
              <p className="mt-5 text-base font-bold leading-7 text-[#dce8f5]">
                &quot;{quote}&quot;
              </p>
              <p className="mt-6 text-sm font-black">{name}</p>
              <p className="mt-1 text-xs font-bold text-[#7d90a8]">{role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="px-5 py-16 lg:px-8 bg-[linear-gradient(135deg,transparent_0%,rgba(185,255,79,0.03)_50%,transparent_100%)]">
      <div className="mx-auto max-w-4xl">
        <SectionHeader eyebrow="FAQ" title="Questions before your first assessment." copy="A clear product should answer the basics before asking for commitment." />
        <div className="mt-10 grid gap-4">
          {faqs.map(([question, answer], index) => (
            <article key={question} className="rounded-3xl border border-white/10 bg-[#0a1220]/88 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.2)] transition hover:border-[#b9ff4f]/25 hover:shadow-[0_22px_70px_rgba(0,0,0,0.3)] animate-fade-in" style={{ animationDelay: `${index * 0.06}s` }}>
              <h3 className="text-lg font-black">{question}</h3>
              <p className="mt-3 text-sm font-bold leading-7 text-[#afc4d8]">{answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#02050b] px-5 py-12 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_repeat(3,0.7fr)_0.9fr]">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark />
            <span className="text-2xl font-black">MyTrine AI</span>
          </div>
          <p className="mt-4 max-w-md text-sm font-bold leading-6 text-[#8fa6ba]">
            AI-powered zero-effort body transformation: consultation, blueprint, diet, workouts, meal suggestions, budget planning, tracking, and optimization.
          </p>
        </div>
        <FooterColumn title="Product" links={["Features", "How It Works", "Transformations", "Pricing"]} />
        <FooterColumn title="Company" links={["About", "Contact", "Privacy", "Terms"]} />
        <FooterColumn title="Resources" links={["FAQ", "Support", "AI Blueprint", "Meal Ordering"]} />
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.16em] text-white">Contact</h3>
          <p className="mt-4 text-sm font-bold leading-6 text-[#8fa6ba]">hello@mytrine.ai</p>
          <div className="mt-5 flex gap-3">
            {["IG", "X", "IN"].map((item) => (
              <span key={item} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-xs font-black text-[#dce8f5]">{item}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm font-bold text-[#667898]">
        Copyright 2026 MyTrine AI. All rights reserved.
      </div>
    </footer>
  );
}

function SectionHeader({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <p className="text-sm font-black uppercase tracking-[0.28em] text-[#b9ff4f]">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">{title}</h2>
      <p className="mt-5 text-base font-bold leading-7 text-[#afc4d8]">{copy}</p>
    </div>
  );
}

function FeatureTile({ title, copy, icon, index, compact = false }: FeatureCard & { index: number; compact?: boolean }) {
  return (
    <article className={`rounded-[1.7rem] border border-white/10 bg-[#0a1220]/88 shadow-[0_22px_70px_rgba(0,0,0,0.24)] transition hover:-translate-y-1 hover:border-[#b9ff4f]/30 hover:shadow-[0_28px_90px_rgba(0,0,0,0.32)] animate-fade-in ${compact ? "p-5" : "p-6"}`} style={{ animationDelay: `${index * 0.05}s` }}>
      <div className="flex items-center justify-between gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#b9ff4f]/20 bg-[#b9ff4f]/10 text-[#b9ff4f]">
          <Icon name={icon} className="h-6 w-6" />
        </span>
        <span className="text-xs font-black text-[#b9ff4f]/70">0{index}</span>
      </div>
      <h3 className="mt-6 text-xl font-black">{title}</h3>
      <p className="mt-3 text-sm font-bold leading-6 text-[#afc4d8]">{copy}</p>
    </article>
  );
}

function Badge({ children }: { children: string }) {
  return (
    <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#b9ff4f]/30 bg-[#b9ff4f]/8 px-3 py-2 text-xs font-black text-[#d8ff8a] shadow-[0_0_28px_rgba(185,255,79,0.08)] sm:px-4 sm:text-sm">
      <Icon name="spark" className="h-4 w-4" />
      <span className="min-w-0 truncate">{children}</span>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d1724] p-4">
      <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#7d90a8]">{label}</p>
      <p className="mt-2 text-lg font-black text-white">{value}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d1724] p-3">
      <p className="text-[0.62rem] font-black uppercase tracking-[0.14em] text-[#7d90a8]">{label}</p>
      <p className="mt-1 text-sm font-black text-white">{value}</p>
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly string[] }) {
  return (
    <div>
      <h3 className="text-sm font-black uppercase tracking-[0.16em] text-white">{title}</h3>
      <div className="mt-4 grid gap-3">
        {links.map((link) => (
          <Link key={link} href={link === "FAQ" ? "#faq" : "#home"} className="text-sm font-bold text-[#8fa6ba] transition hover:text-white">
            {link}
          </Link>
        ))}
      </div>
    </div>
  );
}

function LogoMark() {
  return (
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,#b9ff4f,#00d474)] text-xl font-black text-[#031008] shadow-[0_0_36px_rgba(0,212,116,0.25)]">
      M
    </span>
  );
}

function Icon({ name, className }: { name: IconName; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
  } as const;

  if (name === "arrow") {
    return (
      <svg {...common}>
        <path d="M5 12h13m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "check") {
    return (
      <svg {...common}>
        <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "spark") {
    return (
      <svg {...common}>
        <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm6 12 .8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "brain") {
    return (
      <svg {...common}>
        <path d="M8 8a4 4 0 0 1 8 0v1a4 4 0 0 1 0 8v1a3 3 0 0 1-6 0v-1H8a4 4 0 0 1 0-8V8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "chart") {
    return (
      <svg {...common}>
        <path d="M4 19V5m5 14v-7m5 7V8m5 11V4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "food") {
    return (
      <svg {...common}>
        <path d="M7 3v8m4-8v8M7 7h4m6-4v18M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "activity") {
    return (
      <svg {...common}>
        <path d="M4 13h4l2-6 4 12 2-6h4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "wallet") {
    return (
      <svg {...common}>
        <path d="M4 7h16v12H4V7Zm0 0 3-3h10l3 3m-4 6h4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "target") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M12 2v4m0 12v4m10-10h-4M6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "calendar") {
    return (
      <svg {...common}>
        <path d="M7 3v4m10-4v4M4 9h16M5 5h14v16H5V5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "photo") {
    return (
      <svg {...common}>
        <path d="M4 6h16v12H4V6Zm3 9 3-3 2 2 3-4 3 5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "water") {
    return (
      <svg {...common}>
        <path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M6 11V8a6 6 0 0 1 12 0v3m-14 0h16v10H4V11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
