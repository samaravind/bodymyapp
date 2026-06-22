"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BlueprintCard, MealCard } from "@/components/journey-cards";
import { createInitialProgress, generateBlueprint } from "@/lib/transformation";
import {
  STORAGE_KEYS,
  type Blueprint,
  type ConsultationAnswers,
} from "@/types/transformation";

export default function BlueprintClient() {
  const router = useRouter();
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEYS.consultationAnswers);
    if (!raw) {
      router.replace("/consultation");
      return;
    }

    const timer = window.setTimeout(() => {
      try {
        const consultation = JSON.parse(raw) as ConsultationAnswers;
        const generated = generateBlueprint(consultation);
        window.localStorage.setItem(
          STORAGE_KEYS.transformationBlueprint,
          JSON.stringify(generated)
        );
        window.localStorage.setItem(
          STORAGE_KEYS.userProgress,
          JSON.stringify(createInitialProgress(generated))
        );
        setBlueprint(generated);
      } catch {
        window.localStorage.removeItem(STORAGE_KEYS.consultationAnswers);
        router.replace("/consultation");
      } finally {
        setLoading(false);
      }
    }, 900);

    return () => window.clearTimeout(timer);
  }, [router]);

  const milestonePreview = useMemo(
    () => blueprint?.weeklyMilestones.filter((item) => [1, 4, 8, 12].includes(item.week)) || [],
    [blueprint]
  );

  if (loading || !blueprint) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#03070f] px-5 text-white">
        <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.32)]">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#b9ff4f]">
            Generating Blueprint...
          </p>
          <h1 className="mt-4 text-4xl font-black">Analyzing responses</h1>
          <p className="mt-4 text-sm font-bold leading-6 text-[#9fb4c8]">
            MyTrine AI is calculating your 90-day plan, food budget, meal execution, workouts, and adjustment rules.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#03070f] px-5 py-6 text-white lg:px-8">
      <div className="mx-auto max-w-[1380px]">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[linear-gradient(135deg,#b9ff4f,#00d474)] text-xl font-black text-[#04100b]">
              M
            </span>
            <span className="text-2xl font-black">MyTrine AI</span>
          </Link>
          <Link
            href="/dashboard"
            className="rounded-2xl bg-[linear-gradient(135deg,#b9ff4f,#00d474)] px-5 py-3 text-sm font-black text-[#04100b] shadow-[0_16px_40px_rgba(0,212,116,0.22)]"
          >
            Start Dashboard
          </Link>
        </header>

        <section className="grid gap-6 py-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(13,24,33,0.94),rgba(4,9,16,0.98))] p-6 shadow-[0_32px_100px_rgba(0,0,0,0.34)] lg:p-8">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#b9ff4f]">
              Your AI Transformation Blueprint is ready.
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              {blueprint.userName}, your plan is now built.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#abc1d6]">
              AI has created your 90-day route from {blueprint.currentWeight}kg to {blueprint.targetWeight}kg, including meals, workouts, ordering, budget, and adjustment rules.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <BlueprintCard label="Goal" value={`${blueprint.currentWeight}kg -> ${blueprint.targetWeight}kg`} detail={`${blueprint.goalChange}kg ${blueprint.direction}`} />
              <BlueprintCard label="Daily Target" value={`${blueprint.dailyCalorieTarget} kcal`} detail={`${blueprint.proteinTarget}g protein`} />
              <BlueprintCard label="Budget" value={`INR ${blueprint.budgetEstimate.fullPlan}`} detail="Estimated for 90 days" />
              <BlueprintCard label="Goal Date" value={blueprint.expectedCompletionDate} detail={`${blueprint.goalProbability}% probability`} />
            </div>
          </div>

          <div className="grid gap-5">
            <MealCard order={blueprint.dailyPlan.mealOrder} />
            <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b9ff4f]">Weekly Milestones</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {milestonePreview.map((milestone) => (
                  <div key={milestone.week} className="rounded-2xl bg-[#0d1720]/90 px-4 py-3">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-bold text-[#8fa6ba]">Week {milestone.week}</span>
                      <span className="text-xl font-black">{milestone.targetWeight}kg</span>
                    </div>
                    <p className="mt-1 text-xs font-bold text-[#71859d]">{milestone.focus}</p>
                  </div>
                ))}
              </div>
            </article>
            <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b9ff4f]">Monthly Milestones</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {blueprint.monthlyMilestones.map((milestone, index) => (
                  <div key={milestone.week} className="rounded-2xl bg-[#0d1720]/90 px-4 py-3">
                    <span className="text-sm font-bold text-[#8fa6ba]">Month {index + 1}</span>
                    <p className="mt-2 text-xl font-black">{milestone.targetWeight}kg</p>
                    <p className="mt-1 text-xs font-bold text-[#71859d]">{milestone.focus}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#b9ff4f]/15 bg-[#b9ff4f]/8 p-6 lg:p-8">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#b9ff4f]">Next Step</p>
              <h2 className="mt-3 text-3xl font-black">Let AI start managing the journey.</h2>
              <p className="mt-3 max-w-3xl text-sm font-bold leading-7 text-[#abc1d6]">
                The dashboard will use this blueprint for daily tracking, meal ordering simulation, feedback adjustments, and the before vs after report.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#b9ff4f,#00d474)] px-6 py-4 text-sm font-black text-[#04100b]"
            >
              Start Dashboard
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
