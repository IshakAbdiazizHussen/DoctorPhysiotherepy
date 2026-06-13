"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  CircleCheckBig,
  Dumbbell,
  Menu,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
  X,
} from "lucide-react";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Healthcare", href: "#top" },
  { label: "Doctors", href: "#doctor-row" },
  { label: "Consulting", href: "#appointment" },
  { label: "Rehabilitation", href: "#rehabilitation" },
  { label: "Contact", href: "#trust" },
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
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Modern rehabilitation clinic</p>
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
              } flex-col gap-2 rounded-[1.25rem] border border-slate-100 bg-slate-50 p-3 text-sm text-[#64748B] dark:border-[#1E293B] dark:bg-[#111827] dark:text-[#94A3B8] lg:flex lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-2 lg:border-0 lg:bg-transparent lg:p-0`}
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full px-4 py-2 transition hover:bg-white hover:text-[#0F172A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] dark:hover:bg-[#0F172A] dark:hover:text-[#F8FAFC] dark:focus-visible:outline-[#60A5FA]"
                >
                  {item.label}
                </a>
              ))}
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

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_18%_18%,rgba(16,185,129,0.12),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(37,99,235,0.14),transparent_24%),linear-gradient(135deg,#F0FDFA_0%,#F6FBFF_52%,#E0F2FE_100%)] py-16 sm:py-20 lg:py-24 dark:bg-[radial-gradient(circle_at_18%_18%,rgba(52,211,153,0.12),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(96,165,250,0.12),transparent_24%),linear-gradient(135deg,#020617_0%,#0F172A_52%,#111827_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(255,255,255,0.92),rgba(255,255,255,0)_35%)] dark:bg-[radial-gradient(circle_at_50%_32%,rgba(15,23,42,0.74),rgba(2,6,23,0)_40%)]" />
        <div className="absolute left-[5%] top-[14%] h-56 w-56 rounded-full bg-[#D1FAE5]/50 blur-3xl" />
        <div className="absolute right-[9%] top-[18%] h-64 w-64 rounded-full bg-[#BFDBFE]/45 blur-3xl" />

        <Container className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
            <div className="max-w-2xl animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#b7ead7] bg-white/75 px-5 py-2.5 text-sm font-semibold text-[#0F766E] shadow-sm backdrop-blur dark:border-[rgba(52,211,153,0.22)] dark:bg-[rgba(15,23,42,0.8)] dark:text-[#34D399]">
                <ShieldCheck className="h-4 w-4" />
                Trusted Health Clinic
              </span>

              <h1 className="mt-7 max-w-xl text-5xl font-semibold leading-[0.98] tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-6xl lg:text-[5.2rem]">
                Your health is
                <br />
                our{" "}
                <span className="relative inline-block text-[#0F9B8E] dark:text-[#34D399]">
                  priority
                  <svg
                    className="absolute -bottom-4 left-2 h-4 w-[92%] text-[#34D399]"
                    viewBox="0 0 240 30"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 22C55 12 107 10 171 17C197 20 216 23 234 20"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-9 text-[#64748B] dark:text-[#94A3B8]">
                Expert physiotherapy, rehabilitation, and pain relief programs
                tailored to your unique needs. Let us help you move better,
                feel stronger, and live a pain-free life.
              </p>

              <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {features.map(({ icon: Icon, label }, index) => (
                  <div
                    key={label}
                    className="group rounded-[1.5rem] border border-white/60 bg-white/55 px-4 py-4 shadow-[0_18px_35px_-24px_rgba(15,118,110,0.32)] backdrop-blur transition hover:-translate-y-1 hover:bg-white/80 dark:border-[rgba(30,41,59,0.9)] dark:bg-[rgba(17,24,39,0.82)] dark:shadow-[0_24px_50px_-30px_rgba(2,6,23,0.8)] dark:hover:bg-[rgba(17,24,39,0.95)]"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DFF8EE] text-[#0F9B8E] transition group-hover:bg-[#C8F2E0] dark:bg-[rgba(52,211,153,0.16)] dark:text-[#34D399] dark:group-hover:bg-[rgba(52,211,153,0.22)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-3 text-base font-medium leading-7 text-[#0F172A] dark:text-[#F8FAFC]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#appointment"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#0F766E_0%,#10B981_100%)] px-7 py-4 text-sm font-semibold text-white shadow-[0_22px_40px_-18px_rgba(15,118,110,0.58)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_45px_-18px_rgba(15,118,110,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
                >
                  <CalendarDays className="h-4 w-4" />
                  Book Appointment
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-7 py-4 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-[#2563EB] hover:text-[#2563EB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] dark:border-[#1E293B] dark:bg-[rgba(17,24,39,0.88)] dark:text-[#F8FAFC] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA] dark:focus-visible:outline-[#60A5FA]"
                >
                  Explore Services
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-10 rounded-[1.8rem] border border-white/65 bg-white/55 p-3 shadow-[0_28px_55px_-26px_rgba(37,99,235,0.28)] backdrop-blur dark:border-[rgba(30,41,59,0.9)] dark:bg-[rgba(17,24,39,0.78)] dark:shadow-[0_28px_55px_-28px_rgba(2,6,23,0.85)]">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="flex items-center gap-4 rounded-[1.25rem] bg-white/65 px-4 py-4 dark:bg-[rgba(15,23,42,0.82)]">
                    <div className="flex -space-x-3">
                      {patientAvatars.map((avatar, index) => (
                        <div
                          key={avatar}
                          className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white"
                          style={{ zIndex: patientAvatars.length - index }}
                        >
                          <Image
                            src={avatar}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#0F172A] dark:text-[#F8FAFC]">3,500+</p>
                      <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">Happy Patients</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-[1.25rem] bg-white/65 px-4 py-4 dark:bg-[rgba(15,23,42,0.82)]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E0F2FE] text-[#2563EB] dark:bg-[rgba(96,165,250,0.16)] dark:text-[#60A5FA]">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#0F172A] dark:text-[#F8FAFC]">4.9/5</p>
                      <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">Patient Rating</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-[1.25rem] bg-white/65 px-4 py-4 dark:bg-[rgba(15,23,42,0.82)]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#DFF8EE] text-[#0F766E] dark:bg-[rgba(52,211,153,0.16)] dark:text-[#34D399]">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#0F172A] dark:text-[#F8FAFC]">27+</p>
                      <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">Years Experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mx-auto mt-6 w-full max-w-[720px] lg:mt-0 lg:justify-self-end">
              <div className="hero-float absolute left-[8%] top-[8%] hidden h-[78%] w-[78%] rounded-full border border-white/40 md:block" />
              <div className="hero-float absolute left-[14%] top-[13%] hidden h-[68%] w-[68%] rounded-full border border-white/30 [animation-delay:300ms] md:block" />
              <div className="absolute right-4 top-4 hidden grid-cols-4 gap-3 text-[#10B981]/60 md:grid">
                {Array.from({ length: 12 }).map((_, index) => (
                  <span key={index} className="h-1.5 w-1.5 rounded-full bg-current" />
                ))}
              </div>
              <div className="absolute bottom-10 right-3 hidden grid-cols-4 gap-3 text-[#93C5FD]/70 md:grid">
                {Array.from({ length: 12 }).map((_, index) => (
                  <span key={index} className="h-1.5 w-1.5 rounded-full bg-current" />
                ))}
              </div>
              <div className="absolute left-[4%] top-[13%] hidden text-[#34D399] md:block">
                <Plus className="h-12 w-12" />
              </div>
              <div className="absolute right-[19%] top-[16%] hidden text-[#A7F3D0] md:block">
                <Plus className="h-5 w-5" />
              </div>

              <div className="absolute left-[9%] top-[8%] -z-10 h-[76%] w-[78%] rounded-[38%_62%_58%_42%/40%_34%_66%_60%] bg-[linear-gradient(180deg,#3DC9BE_0%,#0F766E_100%)] md:left-[14%] md:top-[11%] md:h-[72%] md:w-[72%] dark:bg-[linear-gradient(180deg,#34D399_0%,#0F766E_100%)]" />
              <div className="absolute left-[4%] top-[5%] -z-20 h-[88%] w-[88%] rounded-[44%_56%_60%_40%/32%_38%_62%_68%] bg-[#DCEEFF]/70 blur-2xl md:left-[9%] md:top-[7%] md:h-[86%] md:w-[83%] dark:bg-[rgba(30,41,59,0.85)]" />

              <div className="hero-float relative overflow-hidden rounded-[36%_64%_54%_46%/16%_14%_42%_38%] border border-white/75 bg-white/55 p-5 shadow-[0_38px_80px_-36px_rgba(37,99,235,0.38)] backdrop-blur-xl dark:border-[rgba(30,41,59,0.9)] dark:bg-[rgba(17,24,39,0.78)] dark:shadow-[0_38px_80px_-40px_rgba(2,6,23,0.9)]">
                <div className="relative overflow-hidden rounded-[3rem] bg-[#F1F8FF] dark:bg-[#0F172A]">
                  <Image
                    src="/images/therepy.png"
                    alt="Physiotherapy treatment session focused on guided recovery and movement support"
                    width={1040}
                    height={1200}
                    priority
                    className="h-[480px] w-full object-cover sm:h-[620px]"
                  />
                </div>
              </div>

              <div className="hero-float absolute right-0 top-16 w-32 rounded-full bg-white/92 p-4 text-center shadow-[0_25px_40px_-24px_rgba(15,118,110,0.45)] backdrop-blur [animation-delay:200ms] sm:w-36 sm:p-5 lg:top-24 lg:w-40 dark:bg-[rgba(17,24,39,0.92)] dark:shadow-[0_25px_40px_-24px_rgba(2,6,23,0.85)]">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#DFF8EE] text-[#0F766E] dark:bg-[rgba(52,211,153,0.16)] dark:text-[#34D399]">
                  <Dumbbell className="h-7 w-7" />
                </div>
                <p className="mt-3 text-base font-semibold leading-5 text-[#0F766E] dark:text-[#34D399] sm:text-lg sm:leading-6">
                  Move Better
                </p>
                <p className="mt-1 text-base font-semibold leading-5 text-[#0F766E] dark:text-[#34D399] sm:text-lg sm:leading-6">
                  Live Better
                </p>
              </div>

              <div className="hero-float absolute bottom-24 left-[8%] w-[62%] rounded-[1.75rem] bg-[linear-gradient(180deg,#0FA4A5_0%,#0F766E_100%)] p-5 text-white shadow-[0_28px_55px_-20px_rgba(15,118,110,0.56)] [animation-delay:350ms] sm:bottom-20 sm:left-[16%] sm:w-[52%] sm:p-6 lg:bottom-3 lg:left-[26%] lg:w-[42%] lg:p-7 dark:bg-[linear-gradient(180deg,#0F172A_0%,#111827_100%)] dark:ring-1 dark:ring-[rgba(52,211,153,0.22)]">
                <p className="text-[1.4rem] font-semibold leading-tight sm:text-[1.7rem] lg:text-[2rem]">
                  We help you
                  <br />
                  recover, rebuild
                  <br />
                  and regain your
                </p>
                <p className="mt-2 text-[1.8rem] italic leading-none text-[#E8FFFA] dark:text-[#CCFBF1] sm:text-[2rem] lg:text-[2.25rem]">
                  best life.
                </p>
              </div>

              <div className="hero-float absolute bottom-3 right-0 w-[58%] rounded-[1.75rem] border border-white/70 bg-white/92 p-4 shadow-[0_28px_55px_-28px_rgba(37,99,235,0.35)] backdrop-blur [animation-delay:500ms] sm:w-[46%] sm:p-5 lg:bottom-2 lg:w-[40%] dark:border-[rgba(30,41,59,0.9)] dark:bg-[rgba(17,24,39,0.94)] dark:shadow-[0_28px_55px_-28px_rgba(2,6,23,0.88)]">
                <div className="space-y-2">
                  {serviceMiniList.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-[1rem] px-2 py-2 transition hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ECFDF5] text-[#0F766E] dark:bg-[rgba(52,211,153,0.16)] dark:text-[#34D399]">
                        <CircleCheckBig className="h-4 w-4" />
                      </div>
                      <span className="flex-1 text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                        {item}
                      </span>
                      <ChevronRight className="h-4 w-4 text-[#64748B] dark:text-[#94A3B8]" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="hero-float absolute bottom-4 left-[4%] rounded-[1.4rem] bg-white/92 px-4 py-3 shadow-[0_24px_45px_-24px_rgba(37,99,235,0.35)] backdrop-blur [animation-delay:650ms] sm:bottom-2 sm:left-[8%] sm:px-5 sm:py-4 sm:rounded-[1.6rem] dark:bg-[rgba(17,24,39,0.94)] dark:shadow-[0_24px_45px_-24px_rgba(2,6,23,0.88)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DFF8EE] text-[#10B981] dark:bg-[rgba(52,211,153,0.16)] dark:text-[#34D399]">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">Next Available</p>
                    <p className="text-base font-semibold text-[#0F766E] dark:text-[#34D399]">
                      Today, 10:30 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
