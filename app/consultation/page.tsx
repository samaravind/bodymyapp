import Link from "next/link";
import ConsultationClient from "../consultation-client";

export default function ConsultationPage() {
  return (
    <main className="min-h-screen bg-[#020916] px-4 py-6 text-white sm:px-6">
      <div className="mx-auto mb-5 flex max-w-5xl items-center justify-between">
        <Link href="/" className="text-sm font-black text-sky-300 transition hover:text-violet-300">
          Back to MyTrine AI
        </Link>
      </div>
      <ConsultationClient />
    </main>
  );
}
