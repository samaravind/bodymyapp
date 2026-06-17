import Link from "next/link";
import { notFound } from "next/navigation";
import { features, getFeatureBySlug } from "../feature-data";

type FeatureDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return features.map((feature) => ({
    slug: feature.slug,
  }));
}

function FeatureIcon({ type }: { type: string }) {
  const common = "h-6 w-6 text-lime-300";

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

export default async function FeatureDetailPage({ params }: FeatureDetailPageProps) {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);

  if (!feature) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#02050a] text-white">
      <section className="relative isolate overflow-hidden px-6 py-10 sm:px-8 lg:px-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_52%_18%,rgba(132,204,22,0.16),transparent_28%),linear-gradient(180deg,#02050a_0%,#05080d_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(rgba(132,204,22,0.45)_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="mx-auto max-w-7xl">
          <Link href="/features" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-black text-lime-300 transition hover:border-lime-300/35">
            <span aria-hidden="true">&lt;-</span>
            Back to features
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.055] p-7 shadow-2xl shadow-black/25">
              <div className="grid h-16 w-16 place-items-center rounded-2xl border border-lime-300/25 bg-lime-300/10">
                <FeatureIcon type={feature.icon} />
              </div>
              <p className="mt-8 text-sm font-black uppercase tracking-[0.34em] text-lime-300">Feature Details</p>
              <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">{feature.title}</h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">{feature.summary}</p>

              <div className="mt-8 rounded-2xl border border-lime-300/20 bg-lime-300/10 p-5">
                <p className="text-sm font-black uppercase tracking-widest text-lime-300">Final benefit</p>
                <p className="mt-3 text-base leading-7 text-white">{feature.outcome}</p>
              </div>
            </div>

            <div className="grid gap-4">
              {feature.deepDive.map((item, index) => (
                <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 shadow-xl shadow-black/20">
                  <div className="flex items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lime-300 text-sm font-black text-slate-950">
                      {index + 1}
                    </span>
                    <div>
                      <h2 className="text-xl font-black text-white">{item.title}</h2>
                      <p className="mt-3 text-base leading-7 text-slate-300">{item.body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
            <section className="rounded-[28px] border border-white/10 bg-white/[0.045] p-7 shadow-2xl shadow-black/20">
              <h2 className="text-2xl font-black text-white">Step-by-step flow</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {feature.workflow.map((step, index) => (
                  <div key={step} className="rounded-2xl border border-white/10 bg-black/25 p-5">
                    <span className="text-sm font-black text-lime-300">Step {index + 1}</span>
                    <p className="mt-2 text-base font-black text-white">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-white/[0.045] p-7 shadow-2xl shadow-black/20">
              <h2 className="text-2xl font-black text-white">Main points explained</h2>
              <div className="mt-6 space-y-3">
                {feature.details.map(([detail, explanation]) => (
                  <div key={detail} className="rounded-2xl border border-white/10 bg-black/25 p-5">
                    <div className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-lime-300 shadow-[0_0_10px_rgba(190,242,100,0.8)]" />
                      <div>
                        <h3 className="font-black text-white">{detail}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{explanation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
