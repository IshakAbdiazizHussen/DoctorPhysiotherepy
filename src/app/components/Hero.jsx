import Image from "next/image";
import { ArrowRight, CalendarDays, CircleCheckBig } from "lucide-react";
import Container from "./Container";

const highlights = [
  "Personalized rehabilitation plans",
  "Evidence-based pain relief care",
  "Mobility and strength recovery support",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:min-h-screen lg:py-24">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_70%_25%,rgba(20,184,166,0.18),transparent_35%),linear-gradient(135deg,#F0FDFA_0%,#F8FAFC_45%,#E0F7FA_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.95),rgba(255,255,255,0)_34%)]" />
      <div className="absolute left-[8%] top-[18%] -z-10 h-72 w-72 rounded-full bg-[#22C55E]/10 blur-3xl" />
      <div className="absolute left-[18%] top-[28%] -z-10 h-40 w-40 rounded-[2.5rem] bg-white/70 blur-2xl" />
      <div className="absolute right-[10%] top-[22%] -z-10 h-96 w-96 rounded-full bg-[#14B8A6]/16 blur-3xl" />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="relative max-w-2xl">
            <div className="absolute -left-12 top-8 -z-10 h-48 w-48 rounded-full bg-[#22C55E]/10 blur-3xl" />
            <span className="inline-flex items-center rounded-full border border-teal-200 bg-white/90 px-4 py-2 text-sm font-semibold text-[#0F766E] shadow-sm">
              Trusted Physiotherapy Center
            </span>

            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Restore Movement. Rebuild Strength. Live Pain-Free.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Advanced physiotherapy and rehabilitation designed to reduce pain,
              improve mobility, accelerate injury recovery, and restore daily
              confidence through personalized treatment.
            </p>

            <div className="mt-7 grid gap-3 sm:max-w-lg sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-700 shadow-sm"
                >
                  <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-[#22C55E]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#individual-treatment"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F766E] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-900/10 transition hover:-translate-y-0.5 hover:bg-[#115e59]"
              >
                <CalendarDays className="h-4 w-4" />
                Book Appointment
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:text-[#0F766E]"
              >
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-6 top-12 h-32 w-32 rounded-[2rem] bg-white/60 blur-2xl" />
            <div className="absolute -right-10 top-16 h-72 w-72 rounded-full bg-[#14B8A6]/20 blur-3xl" />
            <div className="absolute -right-4 bottom-10 h-36 w-36 rounded-full bg-[#22C55E]/12 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 p-4 shadow-[0_30px_80px_-36px_rgba(15,118,110,0.45)] backdrop-blur sm:p-5">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100">
                <Image
                  src="/images/physio.jpg"
                  alt="Physiotherapist assisting a patient through guided rehabilitation exercises"
                  width={960}
                  height={1120}
                  priority
                  className="h-[420px] w-full object-cover sm:h-[520px]"
                />
              </div>

              <div className="absolute bottom-8 left-8 max-w-[250px] rounded-2xl border border-white/90 bg-white/95 p-4 shadow-lg shadow-slate-900/5">
                <p className="text-sm font-semibold text-slate-950">
                  Focused rehabilitation care
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Helping patients regain safe movement, strength, and long-term comfort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
