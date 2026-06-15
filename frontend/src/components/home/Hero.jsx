"use client";

import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  CircleCheckBig,
  Dumbbell,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";
import Container from "@/components/layout/Container";

const features = [
  { icon: UserRound, label: "Experienced Specialists" },
  { icon: CircleCheckBig, label: "Personalized Treatment" },
  { icon: Stethoscope, label: "Advanced Therapy" },
  { icon: ShieldCheck, label: "Proven Results" },
];

const serviceMiniList = [
  "Pain Relief",
  "Injury Recovery",
  "Mobility Improvement",
  "Strength & Conditioning",
];

const patientAvatars = [
  "/images/female.jpg",
  "/images/physio1.jpg",
  "/images/portM.jpg",
];

export default function Hero() {
  return (
    <section className="bg-transparent py-14 sm:py-20 lg:py-24">
      <Container className="!max-w-[1480px] !px-6 lg:!px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[52%_48%] xl:gap-20">
          <div className="w-full max-w-[720px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#7DD3C4] bg-[linear-gradient(135deg,#14B8A6_0%,#10B981_100%)] px-5 py-2.5 text-sm font-medium text-white shadow-[0_18px_34px_-22px_rgba(16,185,129,0.42)] dark:border-[rgba(52,211,153,0.28)] dark:text-white">
              <ShieldCheck className="h-4 w-4 stroke-[2.4]" />
              Trusted Health Clinic
            </span>

            <h1 className="mb-10 max-w-[650px] text-[3.2rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0F172A] dark:text-[#F8FAFC] sm:text-[4.1rem] lg:text-[72px]">
              Your health is
              <br />
              our{" "}
              <span className="bg-[linear-gradient(135deg,#10B981_0%,#14B8A6_100%)] bg-clip-text text-transparent">
                priority
              </span>
            </h1>

            <p className="mt-8 max-w-[560px] text-[18px] leading-[1.95] text-[#64748B] dark:text-[#94A3B8]">
              Expert physiotherapy, rehabilitation, and pain relief programs
              tailored to your unique needs. Let us help you move better,
              recover faster, and live pain-free.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {features.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="min-h-[120px] rounded-[24px] border border-[#E8EEF5] bg-white px-5 py-5 shadow-[0_22px_40px_-30px_rgba(15,23,42,0.12)] dark:border-[#1E293B] dark:bg-[#111827] dark:shadow-[0_24px_40px_-30px_rgba(2,6,23,0.8)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ECFDF5] text-[#10B981] dark:bg-[rgba(52,211,153,0.16)] dark:text-[#34D399]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-[17px] font-medium leading-7 text-[#0F172A] dark:text-[#F8FAFC]">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#appointment"
                className="inline-flex h-[58px] min-w-[210px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#14B8A6_0%,#10B981_100%)] px-8 text-sm font-medium text-white shadow-[0_24px_44px_-20px_rgba(16,185,129,0.38)]"
              >
                <CalendarDays className="h-4 w-4" />
                Book Appointment
              </a>
              <a
                href="#services"
                className="inline-flex h-[58px] min-w-[190px] items-center justify-center gap-2 rounded-full border border-[#DDE6F2] bg-white px-8 text-sm font-medium text-[#0F172A] shadow-[0_18px_36px_-28px_rgba(15,23,42,0.12)] dark:border-[#1E293B] dark:bg-[#111827] dark:text-[#F8FAFC]"
              >
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-12 flex min-h-[110px] w-full max-w-[700px] flex-col gap-5 rounded-[28px] border border-[#E8EEF5] bg-white px-7 py-6 shadow-[0_28px_50px_-34px_rgba(15,23,42,0.14)] dark:border-[#1E293B] dark:bg-[#111827] dark:shadow-[0_28px_50px_-34px_rgba(2,6,23,0.85)] sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {patientAvatars.map((avatar, index) => (
                    <div
                      key={avatar}
                      className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white dark:border-[#111827]"
                      style={{ zIndex: patientAvatars.length - index }}
                    >
                      <Image src={avatar} alt="" fill className="object-cover" />
                    </div>
                  ))}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#CCFBF1] text-sm font-medium text-[#0F766E] dark:bg-[rgba(52,211,153,0.16)] dark:text-[#34D399]">
                    2K+
                  </div>
                </div>
                <div>
                  <p className="text-[2rem] font-semibold leading-none text-[#0F172A] dark:text-[#F8FAFC]">
                    3,500+
                  </p>
                  <p className="mt-1 text-[15px] text-[#64748B] dark:text-[#94A3B8]">
                    Happy Patients
                  </p>
                </div>
              </div>

              <div className="hidden h-14 w-px bg-[#E8EEF5] dark:bg-[#1E293B] sm:block" />

              <div>
                <p className="text-[2rem] font-semibold leading-none text-[#0F172A] dark:text-[#F8FAFC]">
                  4.9/5
                </p>
                <p className="mt-1 text-[15px] text-[#64748B] dark:text-[#94A3B8]">
                  Patient Rating
                </p>
              </div>

              <div className="hidden h-14 w-px bg-[#E8EEF5] dark:bg-[#1E293B] sm:block" />

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ECFDF5] text-[#10B981] dark:bg-[rgba(52,211,153,0.16)] dark:text-[#34D399]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[2rem] font-semibold leading-none text-[#0F172A] dark:text-[#F8FAFC]">
                    27+
                  </p>
                  <p className="mt-1 text-[15px] text-[#64748B] dark:text-[#94A3B8]">
                    Years Experience
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[620px] lg:justify-self-end">
            <div className="relative mx-auto aspect-[29/26] w-full max-w-[580px] overflow-visible">
              <div className="h-full w-full overflow-hidden rounded-[40px] border border-white/70 bg-white p-4 shadow-[0_34px_70px_-36px_rgba(15,23,42,0.18)] dark:border-[#1E293B] dark:bg-[#111827] dark:shadow-[0_34px_70px_-36px_rgba(2,6,23,0.86)] sm:p-5">
                <div className="relative h-full overflow-hidden rounded-[30px]">
                  <Image
                    src="/images/therepy.png"
                    alt="Physiotherapy treatment session focused on guided recovery and movement support"
                    width={1160}
                    height={1040}
                    priority
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="absolute right-3 top-3 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white p-4 text-center shadow-[0_24px_50px_-28px_rgba(15,23,42,0.16)] dark:bg-[#111827] dark:shadow-[0_24px_50px_-28px_rgba(2,6,23,0.85)] sm:right-[-7%] sm:top-10 sm:h-36 sm:w-36 sm:p-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ECFDF5] text-[#10B981] dark:bg-[rgba(52,211,153,0.16)] dark:text-[#34D399]">
                  <Dumbbell className="h-6 w-6" />
                </div>
                <p className="mt-4 text-[15px] font-medium leading-6 text-[#0F766E] dark:text-[#34D399]">
                  Move Better
                  <br />
                  Live Better
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:mt-[-28px] sm:grid-cols-[minmax(0,300px)_minmax(0,300px)] sm:items-start sm:justify-center">
              <div className="rounded-[30px] border border-[#E8EEF5] bg-white p-8 shadow-[0_28px_50px_-34px_rgba(15,23,42,0.14)] dark:border-[#1E293B] dark:bg-[#111827] dark:shadow-[0_28px_50px_-34px_rgba(2,6,23,0.85)]">
                <p className="text-[18px] font-medium uppercase tracking-[0.18em] text-[#14B8A6]">
                  Care
                </p>
                <p className="mt-4 text-[2.15rem] font-semibold leading-[1.18] tracking-[-0.03em] text-[#0F172A] dark:text-[#F8FAFC]">
                  We help you recover, rebuild and regain your{" "}
                  <span className="text-[#10B981]">best life.</span>
                </p>
              </div>

              <div className="rounded-[30px] border border-[#E8EEF5] bg-white p-6 shadow-[0_28px_50px_-34px_rgba(15,23,42,0.14)] dark:border-[#1E293B] dark:bg-[#111827] dark:shadow-[0_28px_50px_-34px_rgba(2,6,23,0.85)]">
                <div className="space-y-3">
                  {serviceMiniList.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-[18px] px-2 py-3"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ECFDF5] text-[#10B981] dark:bg-[rgba(52,211,153,0.16)] dark:text-[#34D399]">
                        <CircleCheckBig className="h-4 w-4" />
                      </div>
                      <span className="flex-1 text-[16px] font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                        {item}
                      </span>
                      <ChevronRight className="h-4 w-4 text-[#64748B] dark:text-[#94A3B8]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mx-auto mt-5 flex w-full max-w-[300px] items-center gap-3 rounded-[24px] border border-[#E8EEF5] bg-white px-5 py-4 shadow-[0_22px_44px_-30px_rgba(15,23,42,0.14)] dark:border-[#1E293B] dark:bg-[#111827] dark:shadow-[0_22px_44px_-30px_rgba(2,6,23,0.85)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ECFDF5] text-[#10B981] dark:bg-[rgba(52,211,153,0.16)] dark:text-[#34D399]">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
                  Next Available
                </p>
                <p className="text-[1.05rem] font-medium text-[#0F766E] dark:text-[#34D399]">
                  Today, 10:30 AM
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
