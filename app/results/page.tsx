import Image from "next/image";

const resultCards = [
  [
    "Karthik, 28",
    "-12 kg",
    "Built a realistic diet and 4-day gym routine without crash dieting.",
    "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=520&h=360&q=85",
  ],
  [
    "Priya, 30",
    "-9 kg",
    "Used yoga, meals, and daily habit reminders to stay consistent.",
    "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=520&h=360&q=85",
  ],
  [
    "Vikram, 26",
    "+8 kg",
    "Followed strength training and high-protein meal planning for lean gain.",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=520&h=360&q=85",
  ],
];

function StarRating() {
  return (
    <p className="text-sm font-black text-yellow-400" aria-label="5 star rating">
      &#9733;&#9733;&#9733;&#9733;&#9733;
    </p>
  );
}

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-[#02050a] text-white">
      <section className="relative isolate overflow-hidden px-6 py-14 sm:px-8 lg:px-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(132,204,22,0.13),transparent_28%),linear-gradient(180deg,#02050a_0%,#05080d_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(rgba(132,204,22,0.45)_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="mx-auto max-w-7xl">
          <section>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.34em] text-lime-300">Real Progress</p>
                <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">
                  Transformation stories with clear tracking
                </h1>
              </div>
              <p className="max-w-md text-base leading-7 text-slate-300">
                Every result card combines plan adherence, habit score, workout consistency, and body measurements.
              </p>
            </div>

            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {resultCards.map(([name, badge, copy, image]) => (
                <article key={name} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:border-lime-300/35">
                  <div className="relative h-60">
                    <Image src={image} alt={`${name} fitness transformation`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                    <span className="absolute right-5 top-5 rounded-full bg-lime-300 px-4 py-2 text-sm font-black text-slate-950">{badge}</span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-black">{name}</h2>
                    <p className="mt-3 text-base leading-7 text-slate-300">{copy}</p>
                    <div className="mt-6 flex items-center justify-between">
                      <StarRating />
                      <span className="text-sm font-black text-lime-300">90-day plan</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(163,230,53,0.08),rgba(255,255,255,0.03))] p-6 shadow-2xl shadow-black/25 sm:p-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-black uppercase tracking-[0.34em] text-lime-300">Before & After Vault</p>
              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">See your transformation, side by side</h2>
              <p className="mt-5 text-base leading-7 text-slate-300">
                Every 15 days, take a photo. MyTrine stores them in your private vault with body measurements and progress timeline.
              </p>
            </div>

            <div className="mt-9 grid gap-6 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.06]">
                    <div className="relative h-52 w-full">
                      <Image src="/transformation-before.png" alt="Before transformation" fill sizes="300px" className="bg-white object-contain object-center" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-4 rounded-full bg-white/20 px-4 py-1.5 text-sm font-black text-white backdrop-blur">Day 1</span>
                      <span className="absolute right-4 top-4 rounded-full bg-red-500/85 px-3 py-1 text-xs font-black text-white">Before</span>
                    </div>
                    <div className="p-4 text-center">
                      <p className="text-sm font-black text-white">Karthik, 28</p>
                      <p className="text-sm text-slate-300">78 kg - 25% body fat</p>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-lime-300/30 bg-lime-300/10">
                    <div className="relative h-52 w-full">
                      <Image src="/transformation-after.png" alt="After transformation" fill sizes="300px" className="bg-white object-contain object-center" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-4 rounded-full bg-lime-300 px-4 py-1.5 text-sm font-black text-slate-950">Day 90</span>
                      <span className="absolute right-4 top-4 rounded-full bg-lime-400/85 px-3 py-1 text-xs font-black text-slate-950">After</span>
                    </div>
                    <div className="p-4 text-center">
                      <p className="text-sm font-black text-white">Karthik, 28</p>
                      <p className="text-sm text-lime-300">72 kg - 18% body fat</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Weight Change</span>
                    <span className="font-black text-lime-300">-6 kg</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-700">
                    <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-lime-400 to-emerald-500" />
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-slate-500">
                    <span>Start: 78 kg</span>
                    <span>Current: 72 kg</span>
                    <span>Goal: 70 kg</span>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-2xl border border-white/10 bg-black/25 p-6">
                  <h3 className="text-xl font-black text-white">Photo Timeline</h3>
                  <p className="mt-3 text-base leading-7 text-slate-300">
                    Snap a progress photo every 15 days. The vault arranges them in a timeline so you can scroll through your transformation.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/25 p-6">
                  <h3 className="text-xl font-black text-white">Body Measurements</h3>
                  <p className="mt-3 text-base leading-7 text-slate-300">
                    Track chest, waist, arms, and thighs alongside your photos, all in one view.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/25 p-6">
                  <h3 className="text-xl font-black text-white">AI Progress Feedback</h3>
                  <p className="mt-3 text-base leading-7 text-slate-300">
                    Every check-in, AI analyzes your rate of change and adjusts the plan if needed.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
