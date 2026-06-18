"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Sparkles, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { useAuth } from "@/components/providers/AuthProvider";
import { NAV_ITEMS } from "@/lib/constants";
import useScrollSpy from "@/hooks/useScrollSpy";
import { resolveSectionHref } from "@/lib/utils";
import Container from "./Container";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useScrollSpy(NAV_ITEMS, "#top");
  const pathname = usePathname();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const firstName = currentUser?.full_name?.split(" ")[0] || "Account";

  return (
    <>
      <header className="sticky top-0 z-[60] border-b border-white/70 bg-white/90 backdrop-blur-xl dark:border-[#1E293B] dark:bg-[rgba(2,6,23,0.88)]">
        <Container className="max-w-[1720px] px-5 py-4 sm:px-8 lg:px-8 xl:px-10 2xl:px-12">
          <nav className="flex flex-col gap-4 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-x-16 xl:gap-x-20">
            <div className="flex items-center justify-between gap-4 lg:justify-self-start">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8F4FF] text-[#2563EB] dark:bg-[rgba(96,165,250,0.14)] dark:text-[#60A5FA]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium tracking-[0.2em] text-[#0F172A] dark:text-[#F8FAFC]">
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
              } flex-col gap-2 rounded-[1.75rem] border border-slate-200 bg-white/95 p-3 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.16)] dark:border-[#1E293B] dark:bg-[#111827] lg:col-start-2 lg:flex lg:flex-row lg:items-center lg:justify-self-center lg:gap-9 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-8 lg:py-0 lg:shadow-none xl:gap-10 xl:px-12 dark:lg:bg-transparent`}
            >
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href;

                return (
                  <Link
                    key={item.label}
                    href={resolveSectionHref(pathname, item.href)}
                    onClick={() => {
                      setActiveSection(item.href);
                      setIsMenuOpen(false);
                    }}
                    className="group rounded-[1.4rem] px-3 py-2 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] dark:focus-visible:outline-[#60A5FA] lg:px-1.5 lg:py-1.5"
                  >
                    <span className="flex items-center gap-3 text-left lg:min-w-[96px] lg:flex-col lg:items-center lg:gap-2 lg:text-center">
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
                        className={`text-[13px] font-medium leading-none transition lg:text-[12px] ${
                          isActive
                            ? "text-[#2563EB] dark:text-[#60A5FA]"
                            : "text-[#475569] group-hover:text-[#0F172A] dark:text-[#E2E8F0] dark:group-hover:text-[#F8FAFC]"
                        }`}
                      >
                        {item.label}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>

            <div
              className={`${
                isMenuOpen ? "flex" : "hidden"
              } flex-col gap-3 sm:flex-row sm:gap-4 lg:col-start-3 lg:flex lg:items-center lg:justify-self-end lg:ml-10 lg:gap-6 xl:ml-14 xl:gap-7`}
            >
              {isAuthenticated ? (
                <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 dark:border-[#1E293B] dark:bg-[#111827] dark:text-[#E2E8F0]">
                  <span className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                    {firstName}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-sm text-[#2563EB] transition hover:text-[#1D4ED8] dark:text-[#60A5FA] dark:hover:text-[#93C5FD]"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <Link
                  href="/appointment"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-[#2563EB] hover:text-[#2563EB] dark:border-[#1E293B] dark:bg-[#111827] dark:text-[#F8FAFC] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
              <ThemeToggle />
              <Link
                href={resolveSectionHref(pathname, "#appointment")}
                className="inline-flex items-center justify-center rounded-full bg-[#0F172A] px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-[#F8FAFC] dark:text-[#0F172A] dark:hover:bg-[#E2E8F0]"
                onClick={() => setIsMenuOpen(false)}
              >
                Appointment
              </Link>
              <a
                href={resolveSectionHref(pathname, "#services")}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-[#2563EB] hover:text-[#2563EB] dark:border-[#1E293B] dark:bg-[#111827] dark:text-[#F8FAFC] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </div>
          </nav>
        </Container>
      </header>

      <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-slate-200 bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-18px_36px_-28px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-[#1E293B] dark:bg-[rgba(2,6,23,0.96)] lg:hidden">
        <div className="mx-auto flex max-w-md items-end justify-between px-1 py-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.href;

            return (
              <Link
                key={item.label}
                href={resolveSectionHref(pathname, item.href)}
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
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
