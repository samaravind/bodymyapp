"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import {
  BlueprintCard,
  FeedbackCard,
  MealCard,
  ProgressCard,
} from "@/components/journey-cards";
import { buildAiAdjustment, createInitialProgress, generateBlueprint } from "@/lib/transformation";
import {
  STORAGE_KEYS,
  type Blueprint,
  type ConsultationAnswers,
  type Feedback,
  type Progress,
} from "@/types/transformation";
import ProfileMenu from "./profile-menu";

type CompletionState = {
  meals: boolean;
  workout: boolean;
  water: boolean;
};

const today = () => new Date().toISOString().slice(0, 10);

function readJson<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    window.localStorage.removeItem(key);
    return null;
  }
}

function progressPercent(blueprint: Blueprint, progress: Progress) {
  const total = Math.max(Math.abs(blueprint.currentWeight - blueprint.targetWeight), 1);
  const done = Math.abs(blueprint.currentWeight - progress.currentWeight);
  return Math.min(100, Math.max(0, Math.round((done / total) * 100)));
}

export default function PersonalizedDashboardClient() {
  const router = useRouter();
  const [consultation, setConsultation] = useState<ConsultationAnswers | null>(null);
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [completion, setCompletion] = useState<CompletionState>({
    meals: false,
    workout: false,
    water: false,
  });
  const [feedbackForm, setFeedbackForm] = useState({
    energy: "Good",
    hunger: "Normal",
    fullness: "Comfortable",
    likedMeal: "Yes",
    note: "",
  });
  const [orderStatus, setOrderStatus] = useState<Blueprint["dailyPlan"]["mealOrder"]["status"]>("Preparing");
  const [checkedStorage, setCheckedStorage] = useState(false);

  useEffect(() => {
    const savedConsultation = readJson<ConsultationAnswers>(STORAGE_KEYS.consultationAnswers);
    if (!savedConsultation) {
      router.replace("/consultation");
      return;
    }

    const savedBlueprint =
      readJson<Blueprint>(STORAGE_KEYS.transformationBlueprint) ||
      generateBlueprint(savedConsultation);
    const savedProgress =
      readJson<Progress>(STORAGE_KEYS.userProgress) ||
      createInitialProgress(savedBlueprint);
    const savedFeedback = readJson<Feedback[]>(STORAGE_KEYS.dailyFeedback) || [];
    const todayCompletion = savedProgress.dailyCompletion.find((item) => item.date === today());

    window.localStorage.setItem(
      STORAGE_KEYS.transformationBlueprint,
      JSON.stringify(savedBlueprint)
    );
    window.localStorage.setItem(STORAGE_KEYS.userProgress, JSON.stringify(savedProgress));

    queueMicrotask(() => {
      setConsultation(savedConsultation);
      setBlueprint(savedBlueprint);
      setProgress(savedProgress);
      setFeedbackList(savedFeedback);
      setOrderStatus(savedBlueprint.dailyPlan.mealOrder.status);
      setCompletion({
        meals: todayCompletion?.meals || false,
        workout: todayCompletion?.workout || false,
        water: todayCompletion?.water || false,
      });
      setCheckedStorage(true);
    });
  }, [router]);

  const completionScore = useMemo(() => {
    const done = [completion.meals, completion.workout, completion.water].filter(Boolean).length;
    return Math.round((done / 3) * 100);
  }, [completion]);

  const percent = blueprint && progress ? progressPercent(blueprint, progress) : 0;
  const latestFeedback = feedbackList[feedbackList.length - 1];

  const updateCompletion = (key: keyof CompletionState) => {
    if (!blueprint || !progress) return;
    const nextCompletion = { ...completion, [key]: !completion[key] };
    const filtered = progress.dailyCompletion.filter((item) => item.date !== today());
    const nextCompletedDays =
      Object.values(nextCompletion).every(Boolean) &&
      !progress.dailyCompletion.some((item) => item.date === today() && item.meals && item.workout && item.water)
        ? progress.completedDays + 1
        : progress.completedDays;
    const movement = blueprint.direction === "loss" ? -0.2 : blueprint.direction === "gain" ? 0.15 : 0;
    const nextProgress: Progress = {
      ...progress,
      lastUpdatedAt: new Date().toISOString(),
      completedDays: nextCompletedDays,
      currentWeight: Object.values(nextCompletion).every(Boolean)
        ? Math.round((progress.currentWeight + movement) * 10) / 10
        : progress.currentWeight,
      transformationScore: Math.max(progress.transformationScore, completionScore),
      dailyCompletion: [
        ...filtered,
        {
          date: today(),
          meals: nextCompletion.meals,
          workout: nextCompletion.workout,
          water: nextCompletion.water,
        },
      ],
    };

    setCompletion(nextCompletion);
    setProgress(nextProgress);
    window.localStorage.setItem(STORAGE_KEYS.userProgress, JSON.stringify(nextProgress));
  };

  const submitFeedback = () => {
    if (!blueprint) return;
    const nextFeedback: Feedback = {
      date: today(),
      energy: feedbackForm.energy,
      hunger: feedbackForm.hunger,
      fullness: feedbackForm.fullness,
      likedMeal: feedbackForm.likedMeal === "Yes",
      completedMeals: completion.meals,
      completedWorkout: completion.workout,
      completedWater: completion.water,
      note: feedbackForm.note.trim(),
      aiAdjustment: "",
    };
    nextFeedback.aiAdjustment = buildAiAdjustment(nextFeedback, blueprint);
    const nextFeedbackList = [...feedbackList.filter((item) => item.date !== today()), nextFeedback];
    setFeedbackList(nextFeedbackList);
    setFeedbackForm((current) => ({ ...current, note: "" }));
    window.localStorage.setItem(STORAGE_KEYS.dailyFeedback, JSON.stringify(nextFeedbackList));
  };

  const advanceOrder = () => {
    const next: Blueprint["dailyPlan"]["mealOrder"]["status"] =
      orderStatus === "Planned"
        ? "Ordering"
        : orderStatus === "Ordering"
          ? "Preparing"
          : orderStatus === "Preparing"
            ? "Arriving"
            : orderStatus === "Arriving"
              ? "Delivered"
              : "Delivered";
    setOrderStatus(next);
    if (blueprint) {
      const nextBlueprint = {
        ...blueprint,
        dailyPlan: {
          ...blueprint.dailyPlan,
          mealOrder: { ...blueprint.dailyPlan.mealOrder, status: next },
        },
      };
      setBlueprint(nextBlueprint);
      window.localStorage.setItem(
        STORAGE_KEYS.transformationBlueprint,
        JSON.stringify(nextBlueprint)
      );
    }
  };

  if (!checkedStorage || !consultation || !blueprint || !progress) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#03070f] px-5 text-white">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.32)]">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#b9ff4f]">
            Creating Dashboard...
          </p>
          <h1 className="mt-3 text-3xl font-black">Checking your blueprint</h1>
          <p className="mt-3 text-sm font-bold text-[#8fa6ba]">
            If your assessment is missing, MyTrine will send you back to consultation.
          </p>
        </div>
      </main>
    );
  }

  const mealOrder = { ...blueprint.dailyPlan.mealOrder, status: orderStatus };

  return (
    <main className="min-h-screen bg-[#03070f] px-5 py-6 text-white lg:px-8">
      <div className="mx-auto max-w-[1520px]">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[linear-gradient(135deg,#b9ff4f,#00d474)] text-xl font-black text-[#04100b]">
              M
            </span>
            <span className="text-2xl font-black">MyTrine AI</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/consultation"
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-black text-[#dce8f5]"
            >
              Retake Assessment
            </Link>
            <ProfileMenu />
          </div>
        </header>

        <section className="grid gap-6 py-8 lg:grid-cols-[1fr_0.42fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(13,24,33,0.94),rgba(4,9,16,0.98))] p-6 shadow-[0_32px_100px_rgba(0,0,0,0.34)] lg:p-8">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#b9ff4f]">
              Personalized Dashboard
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              Hello, {blueprint.userName} 👋
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#abc1d6]">
              MyTrine AI is managing your {blueprint.durationDays}-day journey from {blueprint.currentWeight}kg to {blueprint.targetWeight}kg with nutrition, ordering, workouts, tracking, and feedback adjustments.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <BlueprintCard label="Current Weight" value={`${progress.currentWeight}kg`} />
              <BlueprintCard label="Target Weight" value={`${blueprint.targetWeight}kg`} />
              <BlueprintCard label="Days Remaining" value={`${Math.max(blueprint.durationDays - progress.completedDays, 0)}`} />
              <BlueprintCard label="Goal Progress" value={`${percent}%`} detail={`${blueprint.goalProbability}% goal probability`} />
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[#b9ff4f]/16 bg-[#b9ff4f]/8 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#b9ff4f]">Today&apos;s AI Plan</p>
            <div className="mt-5 space-y-4">
              <ProgressCard label="Calories" value={`${blueprint.dailyCalorieTarget}`} helper="AI nutrition target" />
              <ProgressCard label="Protein" value={`${blueprint.proteinTarget}g`} helper="Daily protein target" />
              <ProgressCard label="Water" value={`${blueprint.waterTargetLiters}L`} helper="AI hydration target" />
            </div>
          </aside>
        </section>

        <section className="grid gap-5 pb-8 lg:grid-cols-3">
          <DashboardPanel title="AI Executed Today" cta="AI executes">
            <div className="space-y-3">
              {[
                "Breakfast scheduled",
                "Lunch selected",
                "Workout assigned",
                "Water goal updated",
                "Tomorrow's calories optimized",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0d1720]/88 px-4 py-3 text-sm font-black text-[#dce8f5]">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#b9ff4f]/15 text-[#b9ff4f]">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </DashboardPanel>

          <DashboardPanel title="Daily Tracking" cta="Submit Feedback">
            <p className="text-sm font-bold leading-6 text-[#9fb4c8]">
              AI tracks execution and protects the goal date when a step is missed.
            </p>
            <div className="mt-5 space-y-3">
              <TrackingButton label="Meals completed" checked={completion.meals} onClick={() => updateCompletion("meals")} />
              <TrackingButton label="Workout completed" checked={completion.workout} onClick={() => updateCompletion("workout")} />
              <TrackingButton label={`${blueprint.dailyPlan.waterLiters}L water completed`} checked={completion.water} onClick={() => updateCompletion("water")} />
            </div>
            <div className="mt-5 rounded-2xl bg-[#0d1720] p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#71859d]">Today&apos;s Completion</p>
              <p className="mt-2 text-3xl font-black">{completionScore}%</p>
            </div>
          </DashboardPanel>

          <DashboardPanel title="AI Food Ordering" cta={mealOrder.autoOrderingEnabled ? "Auto Ordering ON" : "User Approval"}>
            <MealCard order={mealOrder} />
            <button
              onClick={advanceOrder}
              className="mt-4 w-full rounded-2xl bg-[linear-gradient(135deg,#b9ff4f,#00d474)] px-5 py-3 text-sm font-black text-[#04100b]"
            >
              Update Order Status
            </button>
          </DashboardPanel>

          <DashboardPanel title="Feedback Loop" cta="Analyze Responses">
            <FeedbackForm
              energy={feedbackForm.energy}
              hunger={feedbackForm.hunger}
              fullness={feedbackForm.fullness}
              likedMeal={feedbackForm.likedMeal}
              note={feedbackForm.note}
              onChange={setFeedbackForm}
              onSubmit={submitFeedback}
            />
            {latestFeedback ? (
              <div className="mt-4 rounded-2xl border border-[#b9ff4f]/15 bg-[#b9ff4f]/8 p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#b9ff4f]">AI Adjustment</p>
                <p className="mt-2 text-sm font-bold leading-6 text-[#dce8f5]">{latestFeedback.aiAdjustment}</p>
              </div>
            ) : (
              <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm font-bold text-[#9fb4c8]">
                No feedback yet. Submit today&apos;s feedback to let AI adjust tomorrow&apos;s plan.
              </p>
            )}
          </DashboardPanel>
        </section>

        <section className="grid gap-5 pb-10 lg:grid-cols-[0.9fr_1.1fr]">
          <DashboardPanel title="Weekly Milestones" cta="View Blueprint">
            <div className="grid gap-3 sm:grid-cols-2">
              {blueprint.weeklyMilestones.map((milestone) => (
                <div key={milestone.week} className="rounded-2xl bg-[#0d1720]/90 px-4 py-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-bold text-[#8fa6ba]">Week {milestone.week}</span>
                    <span className="text-lg font-black">{milestone.targetWeight}kg</span>
                  </div>
                  <p className="mt-1 text-xs font-bold text-[#71859d]">{milestone.focus}</p>
                </div>
              ))}
            </div>
          </DashboardPanel>

          <DashboardPanel title="Before vs After Report" cta="View Report">
            {progress.completedDays === 0 ? (
              <p className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm font-bold text-[#9fb4c8]">
                No progress data yet. Complete today&apos;s plan to begin tracking.
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-3">
                <ProgressCard label="Before" value={`${blueprint.currentWeight}kg`} helper="Assessment start" />
                <ProgressCard label="Now" value={`${progress.currentWeight}kg`} helper={`${progress.completedDays} days tracked`} />
                <ProgressCard label="Score" value={`${Math.max(percent, completionScore)}%`} helper="Transformation score" />
              </div>
            )}
            <div className="mt-5 flex h-28 items-end gap-3 rounded-3xl border border-white/10 bg-[#0d1720]/70 p-4">
              {blueprint.weeklyMilestones.slice(0, 7).map((milestone, index) => (
                <div key={milestone.week} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-2xl bg-[linear-gradient(180deg,#b9ff4f,#00d474)]"
                    style={{ height: `${34 + index * 8}%`, opacity: progress.completedDays >= index * 7 ? 1 : 0.38 }}
                  />
                  <span className="text-[0.65rem] font-black text-[#71859d]">W{milestone.week}</span>
                </div>
              ))}
            </div>
          </DashboardPanel>
        </section>

        <section className="grid gap-5 pb-10 lg:grid-cols-[1fr_1fr]">
          <DashboardPanel title="AI Optimization Engine" cta="Automatic adjustments">
            <div className="grid gap-3 sm:grid-cols-2">
              <BlueprintCard label="Workout Missed" value="AI reschedules" detail="Calories and load are adjusted to protect the goal date." />
              <BlueprintCard label="Meal Skipped" value="AI reallocates" detail="Protein and calories move into the next best meal." />
              <BlueprintCard label="Recovery" value={blueprint.recoveryPlan} />
              <BlueprintCard label="Goal Date" value={blueprint.expectedCompletionDate} detail={`${blueprint.goalProbability}% probability`} />
            </div>
          </DashboardPanel>

          <DashboardPanel title="Auto Ordering Roadmap" cta="Execution roadmap">
            <div className="space-y-3">
              {[
                ["Phase 1", "AI meal recommendation"],
                ["Phase 2", "Open Swiggy/Zomato order page"],
                ["Phase 3", "User approval"],
                ["Phase 4", "MCP integration"],
                ["Phase 5", "Automatic ordering with permission"],
              ].map(([phase, text]) => (
                <div key={phase} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0d1720]/88 px-4 py-3">
                  <span className="text-xs font-black uppercase tracking-[0.14em] text-[#b9ff4f]">{phase}</span>
                  <span className="text-sm font-bold text-[#dce8f5]">{text}</span>
                </div>
              ))}
            </div>
          </DashboardPanel>
        </section>
      </div>
    </main>
  );
}

function DashboardPanel({
  children,
  cta,
  title,
}: {
  children: ReactNode;
  cta: string;
  title: string;
}) {
  return (
    <FeedbackCard title={title}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="rounded-full bg-[#b9ff4f]/12 px-3 py-2 text-xs font-black text-[#b9ff4f]">
          {cta}
        </span>
      </div>
      {children}
    </FeedbackCard>
  );
}

function TrackingButton({
  checked,
  label,
  onClick,
}: {
  checked: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
        checked
          ? "border-[#b9ff4f]/30 bg-[#b9ff4f]/12 text-white"
          : "border-white/10 bg-[#0d1720]/88 text-[#9fb4c8]"
      }`}
    >
      {label}
      <span className="grid h-6 w-6 place-items-center rounded-full border border-white/15 text-xs">
        {checked ? "✓" : ""}
      </span>
    </button>
  );
}

function FeedbackForm({
  energy,
  fullness,
  hunger,
  likedMeal,
  note,
  onChange,
  onSubmit,
}: {
  energy: string;
  fullness: string;
  hunger: string;
  likedMeal: string;
  note: string;
  onChange: Dispatch<
    SetStateAction<{
      energy: string;
      hunger: string;
      fullness: string;
      likedMeal: string;
      note: string;
    }>
  >;
  onSubmit: () => void;
}) {
  return (
    <div className="space-y-3">
      <label className="block">
        <span className="text-xs font-black uppercase tracking-[0.14em] text-[#71859d]">Energy</span>
        <select
          value={energy}
          onChange={(event) => onChange((current) => ({ ...current, energy: event.target.value }))}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d1720] px-4 py-3 text-sm font-black text-white"
        >
          <option>Good</option>
          <option>Low</option>
          <option>High</option>
        </select>
      </label>
      <label className="block">
        <span className="text-xs font-black uppercase tracking-[0.14em] text-[#71859d]">Hunger</span>
        <select
          value={hunger}
          onChange={(event) => onChange((current) => ({ ...current, hunger: event.target.value }))}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d1720] px-4 py-3 text-sm font-black text-white"
        >
          <option>Normal</option>
          <option>High</option>
          <option>Low</option>
        </select>
      </label>
      <label className="block">
        <span className="text-xs font-black uppercase tracking-[0.14em] text-[#71859d]">Fullness</span>
        <select
          value={fullness}
          onChange={(event) => onChange((current) => ({ ...current, fullness: event.target.value }))}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d1720] px-4 py-3 text-sm font-black text-white"
        >
          <option>Comfortable</option>
          <option>Still Hungry</option>
          <option>Too Full</option>
        </select>
      </label>
      <label className="block">
        <span className="text-xs font-black uppercase tracking-[0.14em] text-[#71859d]">Liked Meal?</span>
        <select
          value={likedMeal}
          onChange={(event) => onChange((current) => ({ ...current, likedMeal: event.target.value }))}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0d1720] px-4 py-3 text-sm font-black text-white"
        >
          <option>Yes</option>
          <option>No</option>
        </select>
      </label>
      <label className="block">
        <span className="text-xs font-black uppercase tracking-[0.14em] text-[#71859d]">Note</span>
        <textarea
          value={note}
          onChange={(event) => onChange((current) => ({ ...current, note: event.target.value }))}
          placeholder="Anything AI should adjust?"
          className="mt-2 min-h-24 w-full resize-none rounded-2xl border border-white/10 bg-[#0d1720] px-4 py-3 text-sm font-bold text-white outline-none placeholder:text-[#71859d]"
        />
      </label>
      <button
        onClick={onSubmit}
        className="w-full rounded-2xl bg-[linear-gradient(135deg,#b9ff4f,#00d474)] px-5 py-3 text-sm font-black text-[#04100b]"
      >
        Submit Feedback
      </button>
    </div>
  );
}
