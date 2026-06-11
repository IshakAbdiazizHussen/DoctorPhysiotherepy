"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Menu,
  Phone,
  PhoneCall,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import Container from "./Container";

const navItems = [
  { label: "Healthcare", href: "#top" },
  { label: "Doctors", href: "#doctor-row" },
  { label: "Consulting", href: "#appointment" },
  { label: "Rehabilitation", href: "#rehabilitation" },
  { label: "Contact", href: "#trust" },
];

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
        <Container className="py-4">
          <nav className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#2563EB]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-[0.2em] text-[#0F172A]">
                    DOCTORPHYSIO
                  </p>
                  <p className="text-xs text-[#64748B]">Modern rehabilitation clinic</p>
                </div>
              </div>

              <button
                type="button"
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen((current) => !current)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-700 transition hover:border-[#2563EB] hover:text-[#2563EB] lg:hidden"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            <div
              className={`${
                isMenuOpen ? "flex" : "hidden"
              } flex-col gap-2 rounded-[1.25rem] border border-slate-100 bg-slate-50 p-3 text-sm text-[#64748B] lg:flex lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-2 lg:border-0 lg:bg-transparent lg:p-0`}
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full px-4 py-2 transition hover:bg-white hover:text-[#0F172A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className={`${isMenuOpen ? "flex" : "hidden"} flex-col gap-3 sm:flex-row lg:flex`}>
              <a
                href="#appointment"
                className="inline-flex items-center justify-center rounded-full bg-[#0F172A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Appointment
              </a>
              <a
                href="tel:+18005550147"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#2563EB] hover:text-[#2563EB]"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </div>
          </nav>
        </Container>
      </header>

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_18%_18%,rgba(22,163,74,0.12),transparent_24%),radial-gradient(circle_at_78%_22%,rgba(37,99,235,0.14),transparent_24%),linear-gradient(135deg,#F0FDF4_0%,#F8FAFC_48%,#E0F2FE_100%)] py-14 sm:py-16 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_36%,rgba(255,255,255,0.9),rgba(255,255,255,0)_34%)]" />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="relative max-w-xl">
              <div className="absolute left-40 top-8 hidden text-[#93C5FD] lg:block">
                <Plus className="h-4 w-4" />
              </div>
              <div className="absolute left-[17rem] top-32 hidden text-[#86EFAC] lg:block">
                <Plus className="h-5 w-5" />
              </div>

              <span className="inline-flex items-center rounded-full border border-[#d9eefc] bg-white/85 px-4 py-2 text-sm font-semibold text-[#2563EB] shadow-sm">
                Trusted Health Clinic
              </span>

              <h1 className="mt-6 max-w-lg text-4xl font-semibold leading-tight tracking-tight text-[#0F172A] sm:text-5xl lg:text-[4rem]">
                Your health is our priority
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-[#64748B] sm:text-lg">
                Premium physiotherapy, rehabilitation, mobility recovery, and
                pain relief programs designed to help you heal comfortably and
                return to daily life with confidence.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#appointment"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2563EB]/20 transition hover:-translate-y-0.5 hover:bg-[#1d4ed8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                >
                  <CalendarDays className="h-4 w-4" />
                  Book Appointment
                </a>
                <a
                  href="#rehabilitation"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[#2563EB] hover:text-[#2563EB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                >
                  Discover More
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[500px]">
              <div className="absolute inset-x-12 top-10 -z-10 h-[85%] rounded-full bg-[#2563EB]/12 blur-3xl" />
              <div className="absolute -right-2 top-14 -z-10 h-44 w-44 rounded-full bg-[#93C5FD]/50 blur-3xl" />
              <div className="absolute left-0 top-40 text-[#93C5FD]/60">
                <Plus className="h-5 w-5" />
              </div>
              <div className="absolute right-6 top-6 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm">
                10+ Years Experience
              </div>
              <div className="absolute bottom-5 left-5 rounded-full bg-white/92 px-4 py-2 text-xs font-semibold text-[#16A34A] shadow-sm">
                Trusted by 3,500+ patients
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-4 shadow-[0_28px_60px_-30px_rgba(37,99,235,0.28)] backdrop-blur">
                <div className="relative overflow-hidden rounded-[1.6rem] bg-[#EEF6FF]">
                  <Image
                    src="/images/physio.jpg"
                    alt="Physiotherapy specialist in a modern rehabilitation clinic"
                    width={920}
                    height={980}
                    priority
                    className="h-[420px] w-full object-cover sm:h-[520px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
