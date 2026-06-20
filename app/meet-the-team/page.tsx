import Link from "next/link";

const coaches = [
  { name: "Allen", role: "Head Coach", color: "#EEA7DE", accent: "#EF8BD8", initials: "AL", dark: false },
  { name: "Dane", role: "Coach", color: "#E4F678", accent: "#D1EA3A", initials: "DA", dark: true },
  { name: "Katie", role: "Coach", color: "#B4F75B", accent: "#91E63C", initials: "KA", dark: false },
  { name: "Coleman", role: "Coach", color: "#F4B34B", accent: "#E79D2A", initials: "CO", dark: true },
  { name: "Simone", role: "Coach", color: "#55AEEF", accent: "#2897E5", initials: "SI", dark: false },
  { name: "Tyler", role: "Coach", color: "#EF8585", accent: "#E96F6F", initials: "TY", dark: true },
  { name: "Kasey", role: "Coach", color: "#51DA64", accent: "#15D131", initials: "KS", dark: false },
];

const heroBubbles = [
  ["AL", "left-[8%] top-[42%] h-24 w-24 bg-[#EEA7DE]"],
  ["DA", "left-[18%] top-[13%] h-20 w-20 bg-[#EDB55E] rotate-6"],
  ["KA", "left-[5%] bottom-[18%] h-16 w-16 bg-[#62DB74] -rotate-12"],
  ["CO", "right-[14%] top-[30%] h-20 w-20 bg-[#E99191] -rotate-12"],
  ["SI", "right-[6%] bottom-[18%] h-16 w-16 bg-[#5CAAEA] rotate-12"],
  ["TY", "right-[19%] top-[12%] h-24 w-24 bg-[#E4F678] -rotate-12"],
  ["KS", "left-[11%] top-[23%] h-14 w-14 bg-[#70E5B2] rotate-12"],
  ["MP", "right-[9%] top-[23%] h-14 w-14 bg-[#BAF45C] rotate-12"],
];

function Arrow() {
  return (
    <svg className="h-5 w-7" viewBox="0 0 28 14" fill="none" aria-hidden="true">
      <path d="M1 7h24m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MphLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 text-white">
      <svg className="h-10 w-16" viewBox="0 0 112 52" fill="none" aria-hidden="true">
        <path d="M2 26h23l5-16 7 32 8-25 5 9h60" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      </svg>
      <span className="max-w-[120px] text-sm font-black uppercase leading-[0.95] tracking-wide">
        Maximum Performance Health
      </span>
    </Link>
  );
}

function CoachBubble({ text, className }: { text: string; className: string }) {
  return (
    <div className={`absolute hidden items-center justify-center rounded-full border-[3px] border-white text-lg font-black text-[#174DAD] shadow-xl md:flex ${className}`}>
      {text}
    </div>
  );
}

function CoachPortrait({ coach }: { coach: (typeof coaches)[number] }) {
  return (
    <div className="relative min-h-[330px] overflow-hidden rounded-[20px]" style={{ backgroundColor: coach.color }}>
      <div className="absolute left-1/2 top-8 h-52 w-72 -translate-x-1/2 rounded-[50%] border-[34px]" style={{ borderColor: coach.accent }} />
      <div className="absolute inset-x-0 bottom-0 mx-auto h-[270px] w-[210px] rounded-t-full bg-[linear-gradient(180deg,#f8f8f8_0%,#dedede_38%,#161616_38%,#151515_100%)] shadow-2xl">
        <div className="absolute left-1/2 top-8 h-20 w-20 -translate-x-1/2 rounded-full bg-[#f2c7a4]" />
        <div className="absolute left-1/2 top-7 h-11 w-24 -translate-x-1/2 rounded-t-full bg-[#2f2f2f]" />
        <div className="absolute left-1/2 top-[118px] h-8 w-28 -translate-x-1/2 rounded-t-3xl bg-[#f2c7a4]" />
      </div>
      <p className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-[4.9rem] font-black uppercase leading-none tracking-[0.08em] ${coach.dark ? "text-[#535353]/55" : "text-white/70"}`}>
        {coach.name}
      </p>
    </div>
  );
}

function CoachRow({ coach }: { coach: (typeof coaches)[number] }) {
  return (
    <article className="grid gap-8 lg:grid-cols-[1fr_369px] lg:items-stretch">
      <div className="rounded-[20px] bg-[#EFF5FF] p-8 md:p-10">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-black md:text-[44px]">{coach.name}</h2>
          <p className="mt-1 text-xl font-black text-[#174DAD]">{coach.role}</p>
        </div>
        <p className="mt-8 max-w-2xl text-base leading-7 text-black/80 md:text-lg">
          {coach.name} is a certified Strength & Conditioning Coach with over 8 years of experience helping athletes and professionals achieve peak performance. Their expertise lies in personalized nutrition strategies and advanced training systems.
        </p>
        <button className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#E8FE61] px-6 py-4 text-sm font-black text-[#202020] transition hover:-translate-y-0.5 hover:shadow-lg">
          Book With {coach.name}
          <Arrow />
        </button>
      </div>
      <CoachPortrait coach={coach} />
    </article>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-xl font-black text-white">{title}</h3>
      <ul className="mt-6 space-y-3 text-sm text-white/80">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function MeetTheTeamPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <header className="bg-[#174DAD]">
        <nav className="mx-auto flex min-h-[105px] max-w-[1244px] items-center justify-between gap-8 px-6 py-5 lg:px-0">
          <MphLogo />
          <div className="hidden items-center gap-10 text-sm font-bold text-white lg:flex">
            {["Home", "About Us", "Online Coaching", "Resources"].map((item) => (
              <Link key={item} href={item === "Home" ? "/" : "#"}>{item}</Link>
            ))}
            <button className="inline-flex items-center gap-3 rounded-full bg-[#E8FE61] px-6 py-4 text-sm font-black text-[#202020]">
              Book A Consult
              <Arrow />
            </button>
          </div>
        </nav>
      </header>

      <section className="relative overflow-hidden px-6 py-16 md:py-24">
        {heroBubbles.map(([text, className]) => (
          <CoachBubble key={`${text}-${className}`} text={text} className={className} />
        ))}
        <div className="mx-auto max-w-[900px] text-center">
          <h1 className="text-5xl font-black leading-[1.02] tracking-tight md:text-[64px]">
            Meet the Experts Behind
            <span className="block text-[#174DAD]">Maximum Performance Health</span>
          </h1>
          <p className="mx-auto mt-8 max-w-[846px] text-base leading-8 text-black/75 md:text-xl">
            At Maximum Performance Health, our coaching team is more than just fitness professionals. We combine science-backed strategies with real-world experience to help you achieve lasting results. Each member of our team has not only studied the science of transformation but has personally lived it, making us uniquely equipped to guide you through your own journey.
          </p>
          <div className="mx-auto mt-10 flex max-w-[632px] flex-col items-center justify-center gap-3 rounded-[30px] bg-[#EFF5FF] p-4 sm:flex-row">
            <span className="rounded-full bg-[#174DAD] px-5 py-2 text-lg font-black text-white">Our philosophy is simple</span>
            <span className="text-sm font-bold text-black sm:text-base">Science + Dedication = Sustainable Success.</span>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1244px] flex-col gap-10 px-6 pb-20 lg:px-0">
        {coaches.map((coach) => (
          <CoachRow key={coach.name} coach={coach} />
        ))}
      </section>

      <footer className="bg-[#174DAD] px-6 py-16 text-white md:py-[70px]">
        <div className="mx-auto max-w-[1244px]">
          <div className="grid gap-10 lg:grid-cols-[214px_1fr] lg:gap-[100px]">
            <MphLogo />
            <div>
              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
                <h2 className="text-4xl font-black tracking-tight md:text-[64px]">1:1 Health Coaching</h2>
                <div className="flex gap-4">
                  {["ig", "fb", "yt", "x"].map((item) => (
                    <span key={item} className="grid h-10 w-10 place-items-center rounded-full bg-[#E9FE67] text-xs font-black uppercase text-[#202020]">{item}</span>
                  ))}
                </div>
              </div>
              <p className="mt-8 max-w-[600px] text-base leading-7 text-white/85">
                Science-backed coaching for lasting transformation. Optimize your health, build your best physique, and unlock your full potential.
              </p>
            </div>
          </div>

          <div className="my-14 h-px bg-black/15" />

          <div className="grid gap-10 lg:grid-cols-[1fr_520px]">
            <div>
              <div className="grid gap-8 sm:grid-cols-3">
                <FooterColumn title="Services" items={["Weight Loss Coaching", "Competition Prep", "Functional Health", "Nutrition Guidance", "Physique Transformation"]} />
                <FooterColumn title="Resources" items={["Coach Education", "Supplements", "Training Tools", "Success Stories"]} />
                <FooterColumn title="Company" items={["Meet the Team", "Our Mission", "Contact Us", "FAQ"]} />
              </div>
              <p className="mt-16 text-sm text-white/70">© 2025 Maximum Performance Fitness LLC. All rights reserved.</p>
            </div>

            <div className="rounded-[20px] bg-white p-8 text-[#202020] md:p-10">
              <h3 className="text-4xl font-black">Contact</h3>
              <div className="mt-8 space-y-3">
                <div className="rounded-2xl bg-[#E9FE66] px-5 py-4 text-sm font-black">nicole@maximumperformancehealth.com</div>
                <div className="rounded-2xl bg-[#E9FE66] px-5 py-4 text-sm font-black">(555) 123-4567</div>
              </div>
              <div className="mt-8 flex flex-wrap justify-between gap-4 text-sm font-bold underline">
                <span>Privacy Policy</span>
                <span>Terms & Services</span>
                <span>Medical Disclaimer</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
