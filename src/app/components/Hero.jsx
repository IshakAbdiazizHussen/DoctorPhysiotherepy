"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  CircleCheckBig,
  Dumbbell,
  HeartPulse,
  Menu,
  Phone,
  PhoneCall,
  ShieldPlus,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
  X,
} from "lucide-react";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Healthcare", href: "#top", icon: HeartPulse },
  { label: "Doctors", href: "#doctor-row", icon: UserRound },
  { label: "Consulting", href: "#appointment", icon: Stethoscope },
  { label: "Rehabilitation", href: "#rehabilitation", icon: ShieldPlus },
  { label: "Contact", href: "#trust", icon: PhoneCall },
];

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#top");

  useEffect(() => {
    const allowedTabs = new Set(navItems.map((item) => item.href));

    const syncFromHash = () => {
      const nextHash = window.location.hash || "#top";
      setActiveSection(allowedTabs.has(nextHash) ? nextHash : "#top");
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/70 bg-white/90 backdrop-blur-xl dark:border-[#1E293B] dark:bg-[rgba(2,6,23,0.88)]">
        <Container className="py-4">
          <nav className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8F4FF] text-[#2563EB] dark:bg-[rgba(96,165,250,0.14)] dark:text-[#60A5FA]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-[0.2em] text-[#0F172A] dark:text-[#F8FAFC]">
                    DOCTORPHYSIO
                  </p>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                    Modern rehabilitation clinic
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen((current) => !current)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-700 transition hover:border-[#2563EB] hover:text-[#2563EB] dark:border-[#1E293B] dark:bg-[#111827] dark:text-[#F8FAFC] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA] lg:hidden"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            <div
              className={`${
                isMenuOpen ? "flex" : "hidden"
              } flex-col gap-3 rounded-[1.75rem] border border-slate-200 bg-white/95 p-3 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.16)] dark:border-[#1E293B] dark:bg-[#111827] lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-5 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none dark:lg:bg-transparent`}
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setActiveSection(item.href);
                      setIsMenuOpen(false);
                    }}
                    className="group hidden rounded-[1.4rem] px-2 py-1.5 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] dark:focus-visible:outline-[#60A5FA] lg:block"
                  >
                    <span className="flex min-w-[86px] flex-col items-center gap-2 text-center">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
                          isActive
                            ? "bg-[#2563EB] text-white shadow-[0_16px_28px_-18px_rgba(37,99,235,0.55)] dark:bg-[#60A5FA] dark:text-[#020617]"
                            : "bg-transparent text-[#475569] group-hover:bg-[#EFF6FF] group-hover:text-[#2563EB] dark:bg-transparent dark:text-[#F8FAFC] dark:group-hover:bg-[#172554] dark:group-hover:text-[#60A5FA]"
                        }`}
                      >
                        <Icon className="h-5 w-5 stroke-[2.25]" />
                      </span>
                      <span
                        className={`text-[12px] font-medium leading-none transition ${
                          isActive
                            ? "text-[#2563EB] dark:text-[#60A5FA]"
                            : "text-[#475569] group-hover:text-[#0F172A] dark:text-[#E2E8F0] dark:group-hover:text-[#F8FAFC]"
                        }`}
                      >
                        {item.label}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>

            <div className={`${isMenuOpen ? "flex" : "hidden"} flex-col gap-3 sm:flex-row lg:flex lg:items-center`}>
              <ThemeToggle />
              <a
                href="#appointment"
                className="inline-flex items-center justify-center rounded-full bg-[#0F172A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-[#F8FAFC] dark:text-[#0F172A] dark:hover:bg-[#E2E8F0]"
                onClick={() => setIsMenuOpen(false)}
              >
                Appointment
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#2563EB] hover:text-[#2563EB] dark:border-[#1E293B] dark:bg-[#111827] dark:text-[#F8FAFC] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </div>
          </nav>
        </Container>
      </header>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-18px_36px_-28px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-[#1E293B] dark:bg-[rgba(2,6,23,0.96)] lg:hidden">
        <div className="mx-auto flex max-w-md items-end justify-between px-1 py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.href;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => {
                  setActiveSection(item.href);
                  setIsMenuOpen(false);
                }}
                className="group flex min-w-0 flex-1 justify-center px-1"
              >
                <span className="flex flex-col items-center gap-1.5 text-center">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full transition ${
                      isActive
                        ? "bg-[#2563EB] text-white shadow-[0_16px_28px_-18px_rgba(37,99,235,0.55)] dark:bg-[#60A5FA] dark:text-[#020617]"
                        : "text-[#475569] group-hover:bg-[#EFF6FF] group-hover:text-[#2563EB] dark:text-[#F8FAFC] dark:group-hover:bg-[#172554] dark:group-hover:text-[#60A5FA]"
                    }`}
                  >
                    <Icon className="h-5 w-5 stroke-[2.25]" />
                  </span>
                  <span
                    className={`text-[11px] font-medium leading-none transition ${
                      isActive
                        ? "text-[#2563EB] dark:text-[#60A5FA]"
                        : "text-[#475569] group-hover:text-[#0F172A] dark:text-[#E2E8F0] dark:group-hover:text-[#F8FAFC]"
                    }`}
                  >
                    {item.label}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>

      <section className="bg-[linear-gradient(135deg,#f8fbfc_0%,#f4faf9_50%,#f7fbff_100%)] py-16 sm:py-20 lg:py-24 dark:bg-[linear-gradient(180deg,#020617_0%,#0F172A_100%)]">
        <Container className="!max-w-[1480px] !px-6 lg:!px-10">
          <div className="grid min-h-[760px] items-center gap-16 lg:grid-cols-[52%_48%] xl:gap-20">
            <div className="w-full max-w-[720px]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#7DD3C4] bg-[linear-gradient(135deg,#14B8A6_0%,#10B981_100%)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_18px_34px_-22px_rgba(16,185,129,0.42)] dark:border-[rgba(52,211,153,0.28)] dark:text-white">
                <ShieldCheck className="h-4 w-4 stroke-[2.4]" />
                Trusted Health Clinic
              </span>

              <h1 className="mb-10 max-w-[650px] text-[3.8rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0F172A] dark:text-[#F8FAFC] sm:text-[4.4rem] lg:text-[72px]">
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
                  className="inline-flex h-[58px] min-w-[210px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#14B8A6_0%,#10B981_100%)] px-8 text-sm font-semibold text-white shadow-[0_24px_44px_-20px_rgba(16,185,129,0.38)]"
                >
                  <CalendarDays className="h-4 w-4" />
                  Book Appointment
                </a>
                <a
                  href="#services"
                  className="inline-flex h-[58px] min-w-[190px] items-center justify-center gap-2 rounded-full border border-[#DDE6F2] bg-white px-8 text-sm font-semibold text-[#0F172A] shadow-[0_18px_36px_-28px_rgba(15,23,42,0.12)] dark:border-[#1E293B] dark:bg-[#111827] dark:text-[#F8FAFC]"
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
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#CCFBF1] text-sm font-semibold text-[#0F766E] dark:bg-[rgba(52,211,153,0.16)] dark:text-[#34D399]">
                      2K+
                    </div>
                  </div>
                  <div>
                    <p className="text-[2rem] font-bold leading-none text-[#0F172A] dark:text-[#F8FAFC]">
                      3,500+
                    </p>
                    <p className="mt-1 text-[15px] text-[#64748B] dark:text-[#94A3B8]">
                      Happy Patients
                    </p>
                  </div>
                </div>

                <div className="hidden h-14 w-px bg-[#E8EEF5] dark:bg-[#1E293B] sm:block" />

                <div>
                  <p className="text-[2rem] font-bold leading-none text-[#0F172A] dark:text-[#F8FAFC]">
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
                    <p className="text-[2rem] font-bold leading-none text-[#0F172A] dark:text-[#F8FAFC]">
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
              <div className="relative mx-auto h-[520px] w-[580px] overflow-visible">
                <div className="h-[520px] w-[580px] overflow-hidden rounded-[40px] border border-white/70 bg-white p-5 shadow-[0_34px_70px_-36px_rgba(15,23,42,0.18)] dark:border-[#1E293B] dark:bg-[#111827] dark:shadow-[0_34px_70px_-36px_rgba(2,6,23,0.86)]">
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

                <div className="absolute right-[-7%] top-10 flex h-36 w-36 flex-col items-center justify-center rounded-full bg-white p-5 text-center shadow-[0_24px_50px_-28px_rgba(15,23,42,0.16)] dark:bg-[#111827] dark:shadow-[0_24px_50px_-28px_rgba(2,6,23,0.85)]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ECFDF5] text-[#10B981] dark:bg-[rgba(52,211,153,0.16)] dark:text-[#34D399]">
                    <Dumbbell className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-[15px] font-semibold leading-6 text-[#0F766E] dark:text-[#34D399]">
                    Move Better
                    <br />
                    Live Better
                  </p>
                </div>
              </div>

              <div className="mt-[-28px] grid gap-5 sm:grid-cols-[300px_300px] sm:items-start sm:justify-center">
                <div className="rounded-[30px] border border-[#E8EEF5] bg-white p-8 shadow-[0_28px_50px_-34px_rgba(15,23,42,0.14)] dark:border-[#1E293B] dark:bg-[#111827] dark:shadow-[0_28px_50px_-34px_rgba(2,6,23,0.85)]">
                  <p className="text-[18px] font-semibold uppercase tracking-[0.18em] text-[#14B8A6]">
                    Care
                  </p>
                  <p className="mt-4 text-[2.15rem] font-bold leading-[1.18] tracking-[-0.03em] text-[#0F172A] dark:text-[#F8FAFC]">
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
                  <p className="text-[1.05rem] font-semibold text-[#0F766E] dark:text-[#34D399]">
                    Today, 10:30 AM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
