import Link from "next/link";

const processSteps = [
  ["1", "AI Consultation", "Share your goals in just 15 minutes", "chat"],
  ["2", "Personalized Plan", "AI creates the perfect plan for you", "plan"],
  ["3", "Daily Tracking", "Track diet, workout & water intake", "track"],
  ["4", "Smart Food Ordering", "Order healthy meals with one tap", "food"],
  ["5", "Results That Last", "See real progress, stay motivated", "result"],
];

const stats = [
  ["Users Onboarded", "12,000+"],
  ["Meals Planned", "45,000+"],
  ["KG Lost (Total)", "28,500+"],
  ["AI Suggestions", "1,20,000+"],
];

export const metadata = {
  title: "How MyTrine Works",
  description: "See the MyTrine AI transformation workflow.",
};

function StepIcon({ type }: { type: string }) {
  const className = "h-6 w-6 text-lime-300";

  if (type === "chat") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 6.5h14v9H9l-4 3v-12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M9 11h.01M12 11h.01M15 11h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "plan") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 4h10v16H7V4Z" stroke="currentColor" strokeWidth="2" />
        <path d="M10 9h4M10 13h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "track") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 18v-6m4 6V7m4 11V9m4 9V5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "food") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 9h10l-1 10H8L7 9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M10 9a2 2 0 1 1 4 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 4h10v3a5 5 0 0 1-4 4.9V16h3v3H8v-3h3v-4.1A5 5 0 0 1 7 7V4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#02050a] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_4%,rgba(132,204,22,0.18),transparent_20%),linear-gradient(115deg,#01040a_0%,#03070d_48%,#06120c_100%)]" />
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

      <section className="mx-auto max-w-[1700px] px-4 pb-10 pt-3 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-white/20 bg-white/[0.055] p-5 shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-7">
          <h1 className="text-center text-3xl font-black text-white">
            How <span className="text-lime-400">MyTrine</span> Works
          </h1>

          <div className="relative mt-8 grid gap-5 lg:grid-cols-5">
            <div className="absolute bottom-8 left-20 right-20 hidden h-px bg-lime-400/40 lg:block" />
            {processSteps.map(([number, title, copy, icon], index) => (
              <div key={title} className="relative">
                {index < processSteps.length - 1 ? (
                  <span className="absolute left-[58%] top-[45px] z-10 hidden w-[86%] border-t border-dashed border-lime-300/65 lg:block" />
                ) : null}
                <div className="flex items-center gap-5">
                  <div className="relative grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full border border-lime-300/80 bg-lime-300/10 shadow-[0_0_28px_rgba(163,230,53,0.16)]">
                    <StepIcon type={icon} />
                    <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-lime-400 text-sm font-black text-slate-950">
                      {number}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg font-black text-white">{title}</h2>
                    <p className="mt-1 max-w-[250px] text-sm leading-5 text-slate-400">{copy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 h-1.5 rounded-full bg-lime-400/15">
            <div className="h-full w-full rounded-full bg-lime-400 shadow-[0_0_24px_rgba(163,230,53,0.75)]" />
          </div>
        </div>

        <div className="mx-auto mt-7 grid max-w-[1420px] gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 sm:grid-cols-4">
          {stats.map(([label, value]) => (
            <div key={label} className="bg-[#02050a] px-6 py-10 text-center sm:py-12">
              <p className="text-4xl font-black text-lime-300 sm:text-5xl">{value}</p>
              <p className="mt-2 text-xs font-black uppercase tracking-wider text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
