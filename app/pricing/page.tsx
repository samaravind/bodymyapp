"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const PREMIUM_STORAGE_KEY = "mytrine-premium";
const PREMIUM_UPDATED_EVENT = "mytrine-premium-updated";

const pricingPlans = [
  {
    name: "Starter",
    price: "499",
    copy: "For trying your first AI health plan",
    items: ["AI consultation", "7-day diet plan", "Basic workout tracker"],
  },
  {
    name: "Transformation",
    price: "1,499",
    copy: "For a complete guided 90-day journey",
    items: ["90-day meal + workout plan", "Food ordering support", "Weekly progress report"],
    highlighted: true,
  },
  {
    name: "Coach Plus",
    price: "2,999",
    copy: "For deeper accountability and premium insights",
    items: ["Everything in Transformation", "Priority AI coach", "Advanced budget planner"],
  },
];

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10h11m0 0-4-4m4 4-4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-lime-300 text-sm font-black text-slate-950">
      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="m4 10.5 3.4 3.3L16 6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.4"
        />
      </svg>
    </span>
  );
}

export default function PricingPage() {
  const router = useRouter();

  const activatePremium = () => {
    localStorage.setItem(PREMIUM_STORAGE_KEY, "true");
    window.dispatchEvent(new Event(PREMIUM_UPDATED_EVENT));
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#03070d] px-5 py-7 text-white sm:px-8 lg:px-10">
      <div className="mx-auto mb-5 flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-sm font-black text-lime-300 transition hover:text-lime-100">
          Back to MyTrine
        </Link>
        <button
          type="button"
          onClick={activatePremium}
          className="rounded-xl bg-lime-300 px-5 py-2.5 text-sm font-black text-slate-950 transition hover:bg-lime-200"
        >
          Pay Now
        </button>
      </div>

      <section className="mx-auto max-w-7xl rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(163,230,53,0.08))] p-6 shadow-2xl shadow-black/25 sm:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.34em] text-lime-300">
            Pricing
          </p>
          <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Start simple, scale into a full transformation
          </h1>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-2xl border p-7 sm:p-8 ${
                plan.highlighted
                  ? "border-lime-300/60 bg-lime-300/10 shadow-2xl shadow-lime-500/10"
                  : "border-white/10 bg-black/20"
              }`}
            >
              <h2 className="text-2xl font-black">{plan.name}</h2>
              <div className="mt-6 flex items-end gap-3">
                <span className="text-5xl font-black text-lime-300">
                  &#8377;{plan.price}
                </span>
                <span className="pb-2 text-base text-sky-200">/ month</span>
              </div>
              <p className="mt-5 text-base leading-7 text-sky-200/80">{plan.copy}</p>

              <div className="mt-7 space-y-4">
                {plan.items.map((item) => (
                  <p key={item} className="flex items-center gap-3 text-base font-black text-white">
                    <CheckIcon />
                    {item}
                  </p>
                ))}
              </div>

              <button
                type="button"
                onClick={activatePremium}
                className="mt-8 inline-flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-lime-300 text-base font-black text-slate-950 transition hover:bg-lime-200"
              >
                Pay & Activate Premium
                <ArrowIcon />
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
