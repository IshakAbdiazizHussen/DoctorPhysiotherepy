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
      <Container className="max-w-[1680px] px-8 sm:px-8 xl:px-10">
        <div className="grid gap-8 lg:grid-cols-[49%_51%]">
          <article className="group relative overflow-hidden rounded-[32px] border border-[#EEF2F7] bg-[linear-gradient(180deg,#FBFEFE_0%,#F2FAF8_100%)] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 dark:border-[#1E293B] dark:bg-[linear-gradient(180deg,#0F172A_0%,#111827_100%)] dark:shadow-[0_24px_60px_-24px_rgba(2,6,23,0.82)] sm:p-10 xl:p-14">
            <div className="pointer-events-none absolute right-14 top-20 h-24 w-24 rounded-full bg-[rgba(20,184,166,0.07)] blur-2xl dark:bg-[rgba(52,211,153,0.08)]" />
            <div className="pointer-events-none absolute bottom-14 left-[44%] h-52 w-52 rounded-full bg-[rgba(20,184,166,0.07)] blur-3xl dark:bg-[rgba(52,211,153,0.08)]" />
            <div className="pointer-events-none absolute right-6 top-16 hidden grid-cols-4 gap-3 lg:grid">
              {Array.from({ length: 12 }).map((_, index) => (
                <span
                  key={index}
                  className="h-1.5 w-1.5 rounded-full bg-[#8ED9CF] dark:bg-[#34D399]/45"
                />
              ))}
            </div>

            <div className="grid items-center gap-10 xl:grid-cols-[50%_50%]">
              <div className="relative z-10 flex h-full flex-col">
                <span className="inline-flex w-fit items-center gap-4 rounded-full bg-white px-6 py-4 text-[14px] font-bold uppercase tracking-[0.16em] text-[#14B8A6] shadow-[0_18px_38px_-28px_rgba(15,118,110,0.18)] dark:bg-[#111827] dark:text-[#34D399]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(20,184,166,0.1)] text-[#14B8A6] dark:bg-[rgba(52,211,153,0.12)] dark:text-[#34D399]">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  Better Recovery
                </span>

                <h2 className="mt-10 max-w-[520px] text-[46px] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0F172A] dark:text-[#F8FAFC] sm:text-[58px] xl:text-[70px]">
                  We help you
                  move <span className="bg-[linear-gradient(135deg,#14B8A6_0%,#0EA5E9_100%)] bg-clip-text text-transparent">better</span>
                  and live{" "}
                  <span className="bg-[linear-gradient(135deg,#14B8A6_0%,#0EA5E9_100%)] bg-clip-text text-transparent">
                    better
                  </span>.
                </h2>

                <div className="mt-8 h-[4px] w-20 rounded-full bg-[#14B8A6]" />

                <p className="mt-8 max-w-[620px] text-[20px] font-normal leading-[1.8] text-[#64748B] dark:text-[#94A3B8]">
                  Our rehabilitation programs are designed to reduce pain, improve
                  mobility, and support strength recovery with calm, personalized
                  care at every stage.
                </p>

                <a
                  href="#appointment"
                  className="mt-10 inline-flex h-[82px] w-full max-w-[560px] items-center justify-between rounded-[20px] bg-white px-7 text-left shadow-[0_20px_45px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(15,23,42,0.1)] dark:bg-[#111827] dark:shadow-[0_20px_45px_-20px_rgba(2,6,23,0.82)]"
                >
                  <span className="flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(20,184,166,0.1)] text-[#14B8A6] dark:bg-[rgba(52,211,153,0.12)] dark:text-[#34D399]">
                      <ShieldCheck className="h-6 w-6" />
                    </span>
                    <span className="max-w-[340px] text-[18px] font-semibold leading-[1.35] text-[#0F172A] dark:text-[#F8FAFC]">
                      Personalized care at every stage
                    </span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#9DB4CA] dark:text-[#64748B]" />
                </a>
              </div>

              <div className="relative z-10 flex justify-center xl:justify-end">
                <div className="absolute -left-10 top-1/2 hidden h-[290px] w-[260px] -translate-y-1/2 rounded-full bg-[rgba(20,184,166,0.08)] blur-2xl xl:block dark:bg-[rgba(52,211,153,0.08)]" />
                <div className="relative w-full max-w-[480px] overflow-hidden rounded-[28px] shadow-[0_22px_48px_rgba(15,23,42,0.12)] dark:shadow-[0_22px_48px_-20px_rgba(2,6,23,0.82)] xl:ml-auto">
                  <Image
                    src="/images/female.jpg"
                    alt="Doctor smiling during a patient consultation"
                    width={720}
                    height={980}
                    className="h-[420px] w-full object-cover object-top sm:h-[500px] xl:h-[560px] 2xl:h-[580px]"
                  />
                </div>
              </div>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-[32px] border border-[#EEF2F7] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 dark:border-[#1E293B] dark:bg-[#111827] dark:shadow-[0_24px_60px_-24px_rgba(2,6,23,0.82)] sm:p-10 xl:p-10">
            <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 rounded-full bg-[rgba(96,165,250,0.05)] blur-3xl dark:bg-[rgba(96,165,250,0.08)]" />

            <span className="inline-flex items-center gap-3 rounded-full bg-[#F8FBFF] px-5 py-3 text-[14px] font-bold uppercase tracking-[0.16em] text-[#2563EB] shadow-[0_18px_38px_-28px_rgba(37,99,235,0.14)] dark:bg-[#0F172A] dark:text-[#60A5FA]">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(37,99,235,0.08)] text-[#2563EB] dark:bg-[rgba(96,165,250,0.14)] dark:text-[#60A5FA]">
                <Crosshair className="h-5 w-5" />
              </span>
              Recovery Focus
            </span>

            <h2 className="mt-8 max-w-[760px] text-[40px] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0F172A] dark:text-[#F8FAFC] sm:text-[52px] xl:text-[64px]">
              Evidence-based treatment for <span className="text-[#2563EB] dark:text-[#60A5FA]">pain relief</span> and mobility restoration.
            </h2>

            <p className="mt-5 max-w-[720px] text-[18px] font-normal leading-[1.8] text-[#64748B] dark:text-[#94A3B8]">
              Every session is tailored to your body, goals, and lifestyle so
              progress feels steady, supported, and sustainable.
            </p>

            <div className="mt-8 overflow-hidden rounded-[26px] shadow-[0_26px_52px_-38px_rgba(15,23,42,0.16)]">
              <Image
                src="/images/physio1.jpg"
                alt="Healthcare professional in a modern clinic interior"
                width={1400}
                height={800}
                className="h-[260px] w-full object-cover sm:h-[290px] xl:h-[320px]"
              />
            </div>

            <div className="mt-6 grid gap-4 rounded-[24px] bg-[#FAFCFF] p-4 dark:bg-[#0F172A] sm:grid-cols-3 sm:gap-0 sm:p-0">
              {features.map(({ icon: Icon, label }, index) => (
                <div
                  key={label}
                  className={`flex items-center gap-4 px-4 py-4 sm:flex-col sm:items-center sm:text-center sm:px-6 sm:py-5 ${
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
