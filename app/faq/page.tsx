import Link from "next/link";

const myTrinePoints = [
  "AI generates complete 90-day diet + workout plan from 22 questions",
  "Order food directly from Swiggy/Zomato - AI picks, you tap",
  "Snap a photo of your meal & AI tracks calories automatically",
  "AI Coach Riya responds in 2 seconds - 24/7 support",
  "Before/After photo vault with body measurements timeline",
  "Total budget calculated before you start - no surprises",
  "Indian foods, Indian body types, Indian budgets",
];

const otherAppPoints = [
  "Generic plans - no AI, no personalization",
  "No food ordering - you cook or figure it out yourself",
  "Manual food logging - type every ingredient",
  "No real coach - just static content",
  "No progress photos or measurement tracking",
  "Hidden costs - surprise charges later",
  "Western foods and body standards",
];

const faqs = [
  ["Do I need to go to the gym?", "No. MyTrine creates home workouts too. Just tell us your available equipment or none and we will adjust."],
  ["How does food ordering work?", "AI picks meals matching your diet plan. Tap Order and Swiggy/Zomato opens with the meal in your cart. You just pay and track."],
  ["What if I have health conditions?", "Share diabetes, PCOD, thyroid, BP, or any condition during the consultation. AI adjusts diet and workout accordingly."],
  ["How much will 90 days cost me?", "Based on your food preferences and city, AI calculates a complete budget from ₹150/day to ₹500/day. You will know before you start."],
  ["Can I track my weight daily?", "Yes. Log weight, water, calories, and sleep daily. AI shows trends and adjusts your plan weekly."],
  ["What if I skip workouts?", "MyTrine tracks streaks and habits. Miss a day? The plan shifts with zero shame, just a smart reset."],
  ["Is my data private?", "Yes. Your health data, photos, and measurements are stored securely and never shared."],
];

export const metadata = {
  title: "FAQ - MyTrine",
  description: "Frequently asked questions and why MyTrine is different.",
};

function PlusIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function FaqPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#02050a] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_8%,rgba(132,204,22,0.16),transparent_22%),linear-gradient(115deg,#01040a_0%,#03070d_48%,#06120c_100%)]" />
      <div className="absolute right-0 top-0 -z-10 h-full w-[48%] opacity-20 [background-image:radial-gradient(rgba(132,204,22,0.58)_1px,transparent_1px)] [background-size:20px_20px]" />

      <header className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-lime-300 to-emerald-500 text-xl font-black text-slate-950 shadow-lg shadow-lime-500/25">
            M
          </span>
          <span className="text-2xl font-black">MyTrine</span>
        </Link>
        <Link href="/" className="rounded-xl border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-black text-white transition hover:border-lime-300/40 hover:bg-lime-300/10">
          Back Home
        </Link>
      </header>

      <section className="mx-auto max-w-[1500px] px-5 pb-12 pt-3 sm:px-8 lg:px-12">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(163,230,53,0.06),rgba(255,255,255,0.02))] p-6 shadow-2xl shadow-black/25 sm:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-lime-300">Why MyTrine?</p>
            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">What makes us different</h1>
            <p className="mt-5 text-base leading-8 text-slate-400">
              Not just another fitness app. Built specifically for the Indian generation that wants results without the struggle.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-lime-300/35 bg-lime-300/10 p-6 shadow-xl shadow-lime-500/5">
              <h2 className="flex items-center gap-3 text-2xl font-black text-white">
                <span className="text-lime-300">✓</span>
                MyTrine
              </h2>
              <ul className="mt-6 space-y-4 text-base">
                {myTrinePoints.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-100">
                    <span className="mt-0.5 shrink-0 text-lime-300">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-6 opacity-65">
              <h2 className="flex items-center gap-3 text-2xl font-black text-white">
                <span className="text-slate-500">X</span>
                Other Apps
              </h2>
              <ul className="mt-6 space-y-4 text-base">
                {otherAppPoints.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-500">
                    <span className="mt-0.5 shrink-0 text-red-400">X</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-5xl">
          <p className="text-center text-sm font-black uppercase tracking-[0.32em] text-lime-300">Still have questions?</p>
          <h2 className="mt-5 text-center text-4xl font-black sm:text-5xl">Frequently asked questions</h2>
          <div className="mt-10 space-y-4">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group rounded-2xl border border-white/10 bg-white/[0.04] transition hover:border-lime-300/25">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-xl font-black text-white transition group-open:text-lime-300">
                  {question}
                  <span className="shrink-0 text-slate-400 transition group-open:rotate-45 group-open:text-lime-300">
                    <PlusIcon />
                  </span>
                </summary>
                <p className="border-t border-white/10 px-6 pb-6 pt-4 text-base leading-7 text-slate-400">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
