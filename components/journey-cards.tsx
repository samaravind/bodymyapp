import type { MealOrder } from "@/types/transformation";

export function BlueprintCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8fa6ba]">{label}</p>
      <p className="mt-3 text-2xl font-black text-white">{value}</p>
      {detail ? <p className="mt-2 text-sm font-bold leading-6 text-[#9fb4c8]">{detail}</p> : null}
    </article>
  );
}

export function ProgressCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-3xl border border-[#b9ff4f]/15 bg-[#b9ff4f]/8 p-5">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#b9ff4f]">{label}</p>
      <p className="mt-3 text-3xl font-black text-white">{value}</p>
      <p className="mt-2 text-sm font-bold text-[#9fb4c8]">{helper}</p>
    </div>
  );
}

export function MealCard({ order }: { order: MealOrder }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-[#0b141f]/95 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b9ff4f]">AI Food Ordering</p>
          <h3 className="mt-3 text-2xl font-black text-white">{order.meal}</h3>
          <p className="mt-1 text-sm font-bold text-[#8fa6ba]">{order.restaurant}</p>
        </div>
        <span className="rounded-full bg-[#b9ff4f]/15 px-3 py-2 text-xs font-black text-[#b9ff4f]">
          {order.status}
        </span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Metric label="Calories" value={`${order.calories}`} />
        <Metric label="Protein" value={`${order.protein}g`} />
        <Metric label="Price" value={`INR ${order.price}`} />
        <Metric label="ETA" value={order.etaMinutes ? `${order.etaMinutes} mins` : "Planned"} />
        <Metric label="Partner" value={order.partner} />
        <Metric label="Auto Order" value={order.autoOrderingEnabled ? "ON" : "Approval"} />
      </div>
    </article>
  );
}

export function FeedbackCard({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
      <h3 className="text-xl font-black text-white">{title}</h3>
      <div className="mt-4">{children}</div>
    </article>
  );
}

export function QuestionCard({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-[#07101c] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
      <h2 className="text-2xl font-black text-white">{title}</h2>
      {children}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111c28] p-3">
      <p className="text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#71859d]">{label}</p>
      <p className="mt-1 text-base font-black text-white">{value}</p>
    </div>
  );
}
