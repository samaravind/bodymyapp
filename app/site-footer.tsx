"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const hiddenFooterRoutes = ["/", "/sign-in", "/sign-up"];

export default function SiteFooter() {
  const pathname = usePathname();
  const shouldHide = hiddenFooterRoutes.some((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route),
  );

  if (shouldHide) {
    return null;
  }

  return (
    <footer className="border-t border-sky-300/10 bg-[#020916] px-6 py-8 text-white sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-gradient-to-br from-sky-500 to-violet-600 text-lg font-black text-white shadow-lg shadow-blue-700/25">
              M
            </span>
            <span className="text-xl font-black tracking-normal">
              MyTrine{" "}
              <span className="bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text text-transparent">
                AI
              </span>
            </span>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            AI-guided body consultation, 90-day transformation planning, meal
            support, budget forecasting, and daily tracking.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-slate-300">
          <Link className="transition hover:text-sky-300" href="/#home">
            Home
          </Link>
          <Link className="transition hover:text-sky-300" href="/#features">
            Features
          </Link>
          <Link className="transition hover:text-sky-300" href="/#how">
            How It Works
          </Link>
          <Link className="transition hover:text-sky-300" href="/pricing">
            Pricing
          </Link>
        </nav>
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>(c) 2026 MyTrine AI. All rights reserved.</p>
        <p>Built for complete body transformation planning.</p>
      </div>
    </footer>
  );
}
