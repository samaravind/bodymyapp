"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ProfileMenu from "./profile-menu";

type AnswerRecord = {
  answer: string;
  question: string;
  section: string;
};

type ConsultationData = {
  consultationName?: string;
  completedAt: string;
  name?: string;
  responses: AnswerRecord[];
};

function pick(records: AnswerRecord[], matcher: string) {
  return (
    records.find((record) =>
      record.question.toLowerCase().includes(matcher.toLowerCase())
    )?.answer || ""
  );
}

function currentWeightFromRange(range: string) {
  const numeric = Number(range.replace(/[^\d.]/g, ""));
  if (numeric > 0) return numeric;
  if (range.includes("Below 50")) return 48;
  if (range.includes("50-70")) return 62;
  if (range.includes("71-90")) return 82;
  if (range.includes("Above 90")) return 95;
  return 75;
}

function targetWeightFromAnswer(currentWeight: number, target: string, goal: string) {
  const numeric = Number(target.replace(/[^\d.]/g, ""));
  if (numeric > 0) return numeric;
  if (target.includes("Lose 10")) return currentWeight - 10;
  if (target.includes("Lose 5")) return currentWeight - 5;
  if (target.includes("Gain 5")) return currentWeight + 5;
  if (goal.includes("Muscle Gain") || goal.includes("Weight Gain")) return currentWeight + 5;
  return currentWeight;
}

function caloriesFor(goal: string, activity: string) {
  const activityBoost = activity.includes("High") || activity.includes("Very") ? 180 : activity.includes("Medium") ? 90 : 0;
  if (goal.includes("Weight Loss")) return 1650 + activityBoost;
  if (goal.includes("Muscle") || goal.includes("Weight Gain")) return 2450 + activityBoost;
  return 2050 + activityBoost;
}

function buildDashboard(data: ConsultationData | null, fallbackName: string) {
  const records = data?.responses || [];
  const consultationName = pick(records, "name");
  const age = pick(records, "age") || "Not provided";
  const height = pick(records, "height") || "Not provided";
  const goal = pick(records, "main fitness goal") || "Weight Loss";
  const currentWeightRange = pick(records, "current weight") || "95";
  const targetAnswer = pick(records, "target weight") || "75";
  const foodPreference = pick(records, "food preference") || "Non-Vegetarian";
  const foodStyle = pick(records, "food style") || "South Indian";
  const foodType = pick(records, "type of food") || "Both";
  const activity = pick(records, "activity level") || "Medium";
  const workout = pick(records, "exercise currently") || "Walking Only";
  const schedule = pick(records, "daily schedule") || "Flexible";
  const health = pick(records, "health condition") || "No Issues";
  const sleep = pick(records, "sleep") || "7-8 Hours";
  const water = pick(records, "water") || "2-3L";
  const dailyBudget = pick(records, "daily food budget") || "Rs.150-Rs.300";
  const ordering = pick(records, "food ordering option") || "Zomato";
  const planType = pick(records, "AI create") || "Full 3-Month Plan";

  const currentWeight = currentWeightFromRange(currentWeightRange);
  const targetWeight = targetWeightFromAnswer(currentWeight, targetAnswer, goal);
  const totalChange = Math.abs(currentWeight - targetWeight);
  const direction = targetWeight > currentWeight ? "gain" : targetWeight < currentWeight ? "loss" : "maintenance";
  const calories = caloriesFor(goal, activity);
  const protein = direction === "gain" ? 125 : direction === "loss" ? 110 : 100;
  const name = data?.consultationName || consultationName || data?.name || fallbackName || "there";
  const heightLabel = height === "Not provided" ? height : `${height}cm`;
  const meal =
    foodPreference.includes("Vegetarian") || foodPreference.includes("Vegan")
      ? `${foodStyle} Paneer Protein Bowl`
      : `${foodStyle} Grilled Chicken Bowl`;
  const workoutPlan = workout.includes("Gym")
    ? "4-day strength split"
    : workout.includes("Yoga")
      ? "Yoga + mobility routine"
      : "Home strength + walking";

  return {
    name,
    age,
    height,
    heightLabel,
    goal,
    planType,
    currentWeight,
    targetWeight,
    totalChange,
    direction,
    calories,
    protein,
    meal,
    foodType,
    dailyBudget,
    ordering,
    activity,
    schedule,
    health,
    workoutPlan,
    sleep,
    water,
  };
}

export default function PersonalizedDashboardClient() {
  const router = useRouter();
  const { isLoaded, user } = useUser();
  const [consultation, setConsultation] = useState<ConsultationData | null>(null);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  const fallbackName =
    user?.firstName ||
    user?.fullName?.trim().split(/\s+/)[0] ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "there";

  useEffect(() => {
    if (!isLoaded) return;

    const userKey = user?.id
      ? `mytrine-consultation:${user.id}`
      : "mytrine-consultation:guest";
    const raw = window.localStorage.getItem(userKey);

    if (!raw) {
      queueMicrotask(() => setHasCheckedStorage(true));
      router.replace("/consultation");
      return;
    }

    try {
      const parsed = JSON.parse(raw) as ConsultationData;
      queueMicrotask(() => setConsultation(parsed));
    } catch {
      window.localStorage.removeItem(userKey);
      router.replace("/consultation");
    } finally {
      queueMicrotask(() => setHasCheckedStorage(true));
    }
  }, [isLoaded, router, user]);

  const dashboard = useMemo(
    () => buildDashboard(consultation, fallbackName),
    [consultation, fallbackName]
  );

  if (!isLoaded || !hasCheckedStorage || !consultation) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#03070f] px-5 text-white">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.32)]">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#b9ff4f]">MyTrine AI</p>
          <h1 className="mt-3 text-3xl font-black">Preparing your dashboard</h1>
          <p className="mt-3 text-sm font-bold text-[#8fa6ba]">Redirecting to consultation if your blueprint is not ready.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#03070f] px-5 py-6 text-white lg:px-8">
      <div className="mx-auto max-w-[1520px]">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[linear-gradient(135deg,#b9ff4f,#00d474)] text-xl font-black text-[#04100b]">M</span>
            <span className="text-2xl font-black">MyTrine AI</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/consultation" className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-black text-[#dce8f5] transition hover:border-[#b9ff4f]/30">
              Retake Assessment
            </Link>
            <ProfileMenu />
          </div>
        </header>

        <section className="grid gap-6 py-8 lg:grid-cols-[1fr_0.42fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(13,24,33,0.94),rgba(4,9,16,0.98))] p-6 shadow-[0_32px_100px_rgba(0,0,0,0.34)] lg:p-8">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#b9ff4f]">Personalized Dashboard</p>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              Hello, {dashboard.name} 👋
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#abc1d6]">
              Your AI blueprint is built from your consultation responses: age {dashboard.age}, {dashboard.heightLabel} height, {dashboard.goal.toLowerCase()}, {dashboard.activity.toLowerCase()} activity, {dashboard.foodType.toLowerCase()} meals, and a {dashboard.dailyBudget} food budget.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {[
                ["Current", `${dashboard.currentWeight}kg`],
                ["Target", `${dashboard.targetWeight}kg`],
                ["Change", `${dashboard.totalChange}kg ${dashboard.direction}`],
                ["Days Remaining", "90"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#71859d]">{label}</p>
                  <p className="mt-2 text-2xl font-black">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[#b9ff4f]/16 bg-[#b9ff4f]/8 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#b9ff4f]">AI Summary</p>
            <div className="mt-5 space-y-4">
              <SummaryRow label="Daily Calories" value={`${dashboard.calories} kcal`} />
              <SummaryRow label="Protein Target" value={`${dashboard.protein}g`} />
              <SummaryRow label="Water Target" value={dashboard.water} />
              <SummaryRow label="Sleep Signal" value={dashboard.sleep} />
              <SummaryRow label="Health Note" value={dashboard.health} />
            </div>
          </aside>
        </section>

        <section className="grid gap-5 pb-10 lg:grid-cols-3">
          <DashboardPanel title="Transformation Blueprint">
            <div className="space-y-3">
              {[
                ["Week 1", `${dashboard.currentWeight - Math.sign(dashboard.currentWeight - dashboard.targetWeight) * 2}kg`],
                ["Week 4", `${Math.round((dashboard.currentWeight * 0.72 + dashboard.targetWeight * 0.28))}kg`],
                ["Week 8", `${Math.round((dashboard.currentWeight * 0.38 + dashboard.targetWeight * 0.62))}kg`],
                ["Week 12", `${dashboard.targetWeight}kg`],
              ].map(([week, weight]) => (
                <div key={week} className="flex items-center justify-between rounded-2xl bg-[#0d1720]/90 px-4 py-3">
                  <span className="text-sm font-bold text-[#8fa6ba]">{week}</span>
                  <span className="text-lg font-black">{weight}</span>
                </div>
              ))}
            </div>
          </DashboardPanel>

          <DashboardPanel title="Meal Plan">
            <div className="rounded-3xl border border-[#b9ff4f]/16 bg-[#b9ff4f]/8 p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#b9ff4f]">{dashboard.ordering} ready</p>
              <h2 className="mt-4 text-2xl font-black">{dashboard.meal}</h2>
              <p className="mt-3 text-sm font-bold leading-6 text-[#abc1d6]">
                AI keeps meals within {dashboard.dailyBudget}, targets {dashboard.protein}g protein, and adapts around your {dashboard.foodType.toLowerCase()} preference.
              </p>
            </div>
          </DashboardPanel>

          <DashboardPanel title="Workout Plan">
            <div className="space-y-3">
              <SummaryRow label="Plan" value={dashboard.workoutPlan} />
              <SummaryRow label="Activity" value={dashboard.activity} />
              <SummaryRow label="Schedule" value={dashboard.schedule} />
              <SummaryRow label="Recovery" value={dashboard.sleep} />
              <SummaryRow label="AI Adjustment" value="Weekly recalibration" />
            </div>
          </DashboardPanel>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] lg:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#b9ff4f]">AI Actions Today</p>
              <h2 className="mt-3 text-3xl font-black">Generated from your answers</h2>
            </div>
            <p className="max-w-xl text-sm font-bold leading-7 text-[#8fa6ba]">
              These actions are unique to {dashboard.name}&apos;s body goal, schedule, food preferences, budget, and lifestyle signals.
            </p>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {[
              `${dashboard.calories} kcal nutrition target set`,
              `${dashboard.meal} selected`,
              `${dashboard.workoutPlan} assigned`,
              `${dashboard.water} water goal set`,
              "Progress check-in scheduled",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-[#0d1720]/90 p-4 text-sm font-black leading-6 text-[#dce8f5]">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function DashboardPanel({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <article className="rounded-[1.7rem] border border-white/10 bg-[#090f18]/88 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
      <h2 className="text-2xl font-black">{title}</h2>
      <div className="mt-5">{children}</div>
    </article>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-[#0d1720]/88 px-4 py-3">
      <span className="text-sm font-bold text-[#8fa6ba]">{label}</span>
      <span className="text-sm font-black text-white">{value}</span>
    </div>
  );
}
