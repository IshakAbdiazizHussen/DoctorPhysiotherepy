import Image from "next/image";
import { ArrowRight, Crosshair, ShieldCheck, Target, TrendingUp, UserRoundCheck } from "lucide-react";
import Container from "./Container";

const features = [
  {
    icon: Target,
    label: "Science Backed",
  },
  {
    icon: UserRoundCheck,
    label: "Personalized Plans",
  },
  {
    icon: TrendingUp,
    label: "Measurable Progress",
  },
];

export default function Principles() {
  return (
    <section id="rehabilitation" className="bg-white py-16 sm:py-20 lg:py-24 dark:bg-[#020617]">
      <Container className="max-w-[1400px] px-6 sm:px-8 xl:px-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="group relative overflow-hidden rounded-[32px] bg-[linear-gradient(180deg,#F7FBFA_0%,#EEF8F6_100%)] p-8 shadow-[0_30px_70px_-42px_rgba(15,23,42,0.16)] transition duration-300 hover:-translate-y-1 dark:bg-[linear-gradient(180deg,#0F172A_0%,#111E27_100%)] dark:shadow-[0_32px_72px_-42px_rgba(2,6,23,0.82)] sm:p-10 xl:p-12">
            <div className="pointer-events-none absolute right-10 top-16 h-24 w-24 rounded-full bg-[rgba(20,184,166,0.08)] blur-2xl dark:bg-[rgba(52,211,153,0.08)]" />
            <div className="pointer-events-none absolute bottom-24 left-1/2 h-40 w-40 rounded-full bg-[rgba(96,165,250,0.08)] blur-3xl dark:bg-[rgba(96,165,250,0.08)]" />
            <div className="pointer-events-none absolute right-10 top-16 hidden grid-cols-4 gap-3 lg:grid">
              {Array.from({ length: 12 }).map((_, index) => (
                <span
                  key={index}
                  className="h-1.5 w-1.5 rounded-full bg-[#7DD3C4]/80 dark:bg-[#34D399]/45"
                />
              ))}
            </div>

            <div className="grid items-center gap-10 xl:grid-cols-[1fr_0.92fr]">
              <div className="relative z-10">
                <span className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-[14px] font-bold uppercase tracking-[0.16em] text-[#0F9F97] shadow-[0_18px_38px_-28px_rgba(15,118,110,0.28)] dark:bg-[#111827] dark:text-[#34D399]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(20,184,166,0.12)] text-[#0F9F97] dark:bg-[rgba(52,211,153,0.14)] dark:text-[#34D399]">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  Better Recovery
                </span>

                <h2 className="mt-10 max-w-[430px] text-[42px] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#0F172A] dark:text-[#F8FAFC] sm:text-[48px] xl:text-[56px]">
                  We help you move <span className="text-[#10B981]">better</span> and live{" "}
                  <span className="text-[#10B981]">better</span>.
                </h2>

                <p className="mt-6 max-w-[470px] text-[16px] font-medium leading-[1.95] text-[#64748B] dark:text-[#94A3B8]">
                  Our rehabilitation programs reduce pain, improve mobility, and
                  support long-term recovery through personalized care.
                </p>

                <a
                  href="#appointment"
                  className="mt-10 inline-flex w-full max-w-[430px] items-center justify-between rounded-[24px] bg-white px-6 py-5 text-left shadow-[0_24px_48px_-32px_rgba(15,23,42,0.16)] transition duration-300 hover:shadow-[0_28px_54px_-30px_rgba(15,23,42,0.18)] dark:bg-[#111827] dark:shadow-[0_24px_48px_-32px_rgba(2,6,23,0.85)]"
                >
                  <span className="flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(20,184,166,0.12)] text-[#0F9F97] dark:bg-[rgba(52,211,153,0.16)] dark:text-[#34D399]">
                      <ShieldCheck className="h-6 w-6" />
                    </span>
                    <span className="text-[20px] font-semibold leading-[1.3] text-[#0F172A] dark:text-[#F8FAFC]">
                      Personalized care at every stage
                    </span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#94A3B8] dark:text-[#64748B]" />
                </a>
              </div>

              <div className="relative z-10">
                <div className="absolute -left-10 top-1/2 hidden h-[260px] w-[260px] -translate-y-1/2 rounded-full bg-[rgba(20,184,166,0.08)] blur-2xl xl:block dark:bg-[rgba(52,211,153,0.08)]" />
                <div className="relative ml-auto w-full max-w-[360px] overflow-hidden rounded-[28px] shadow-[0_28px_58px_-36px_rgba(15,23,42,0.22)]">
                  <Image
                    src="/images/female.jpg"
                    alt="Doctor smiling during a patient consultation"
                    width={720}
                    height={980}
                    className="h-[440px] w-full object-cover object-top sm:h-[500px]"
                  />
                </div>
              </div>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-[32px] border border-[#E8EEF5] bg-white p-8 shadow-[0_30px_70px_-42px_rgba(15,23,42,0.14)] transition duration-300 hover:-translate-y-1 dark:border-[#1E293B] dark:bg-[#111827] dark:shadow-[0_32px_72px_-42px_rgba(2,6,23,0.82)] sm:p-10 xl:p-12">
            <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 rounded-full bg-[rgba(96,165,250,0.06)] blur-3xl dark:bg-[rgba(96,165,250,0.08)]" />

            <span className="inline-flex items-center gap-3 rounded-full bg-[#F8FBFF] px-5 py-3 text-[14px] font-bold uppercase tracking-[0.16em] text-[#2563EB] shadow-[0_18px_38px_-28px_rgba(37,99,235,0.16)] dark:bg-[#0F172A] dark:text-[#60A5FA]">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(37,99,235,0.08)] text-[#2563EB] dark:bg-[rgba(96,165,250,0.14)] dark:text-[#60A5FA]">
                <Crosshair className="h-5 w-5" />
              </span>
              Recovery Focus
            </span>

            <h2 className="mt-10 max-w-[520px] text-[42px] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#0F172A] dark:text-[#F8FAFC] sm:text-[48px] xl:text-[56px]">
              Evidence-based treatment for <span className="text-[#2563EB] dark:text-[#60A5FA]">pain relief</span> and mobility restoration.
            </h2>

            <p className="mt-6 max-w-[560px] text-[16px] font-medium leading-[1.95] text-[#64748B] dark:text-[#94A3B8]">
              Every session is tailored to your body, goals, and lifestyle so
              progress feels steady, supported, and sustainable.
            </p>

            <div className="mt-10 overflow-hidden rounded-[26px] shadow-[0_26px_52px_-38px_rgba(15,23,42,0.16)]">
              <Image
                src="/images/physio1.jpg"
                alt="Healthcare professional in a modern clinic interior"
                width={1400}
                height={800}
                className="h-[300px] w-full object-cover sm:h-[320px]"
              />
            </div>

            <div className="mt-8 grid gap-4 rounded-[24px] bg-[#FAFCFF] p-4 dark:bg-[#0F172A] sm:grid-cols-3 sm:gap-0 sm:p-0">
              {features.map(({ icon: Icon, label }, index) => (
                <div
                  key={label}
                  className={`flex items-center gap-4 px-4 py-4 sm:flex-col sm:items-start sm:px-6 sm:py-6 ${
                    index !== 2 ? "sm:border-r sm:border-[#E8EEF5] dark:sm:border-[#1E293B]" : ""
                  }`}
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[rgba(37,99,235,0.08)] text-[#2563EB] dark:bg-[rgba(96,165,250,0.14)] dark:text-[#60A5FA]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-[18px] font-semibold leading-[1.35] text-[#0F172A] dark:text-[#F8FAFC]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
