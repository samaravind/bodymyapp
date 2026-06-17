import Link from "next/link";
import { features } from "./feature-data";

function FeatureIcon({ type }: { type: string }) {
  const common = "h-5 w-5 text-lime-300";

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

  if (type === "PL") {
    return (
      <svg className={common} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M5 4h10v12H5V4Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 8h4M8 11h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className={common} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 6.5h12v7H8l-4 3v-10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M7 10h.01M10 10h.01M13 10h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#02050a] text-white">
      <section className="relative isolate overflow-hidden px-6 py-16 sm:px-8 lg:px-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_18%,rgba(132,204,22,0.13),transparent_28%),linear-gradient(180deg,#02050a_0%,#05080d_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(rgba(132,204,22,0.45)_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="mx-auto max-w-[1500px]">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.42em] text-lime-300">Inside MyTrine</p>
            <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-6xl">
              8 powerful features. One app.
            </h1>
            <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-slate-300">
              Diet, workouts, food ordering, budget control, and progress tracking work together so every day feels
              planned before it starts.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Link
                href={`/features/${feature.slug}`}
                key={feature.title}
                className="flex min-h-[560px] flex-col rounded-2xl border border-white/10 bg-white/[0.045] p-7 shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:border-lime-300/35 hover:bg-white/[0.07]"
              >
                <div className="mb-8 grid h-14 w-14 place-items-center rounded-2xl border border-lime-300/25 bg-lime-300/10 text-lime-300">
                  <FeatureIcon type={feature.icon} />
                </div>
                <h2 className="text-xl font-black text-white">{feature.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">{feature.summary}</p>
                <ul className="mt-auto space-y-2 pt-5">
                  {feature.details.map(([detail, explanation]) => (
                    <li key={detail} className="rounded-xl border border-white/10 bg-black/20 p-3">
                      <div className="flex items-start gap-2 text-sm font-black text-white">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-300 shadow-[0_0_10px_rgba(190,242,100,0.8)]" />
                      <span>{detail}</span>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-slate-400">{explanation}</p>
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-lime-300">
                  View full details
                  <span aria-hidden="true">-&gt;</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
