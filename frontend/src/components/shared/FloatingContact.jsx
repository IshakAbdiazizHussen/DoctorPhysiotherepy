"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, MessageCircleMore } from "lucide-react";
import { resolveSectionHref } from "@/lib/utils";

export default function FloatingContact() {
  const pathname = usePathname();

  return (
    <>
      <div className="fixed inset-x-4 bottom-4 z-40 sm:hidden">
        <Link
          href={resolveSectionHref(pathname, "#appointment")}
          className="flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 py-4 text-sm font-medium text-white shadow-[0_18px_35px_-18px_rgba(37,99,235,0.7)] dark:bg-[#60A5FA] dark:text-[#020617] dark:shadow-[0_18px_35px_-18px_rgba(96,165,250,0.5)]"
        >
          <CalendarDays className="h-4 w-4" />
          Book Appointment
        </Link>
      </div>

      <a
        href="https://wa.me/18005550147"
        target="_blank"
        rel="noreferrer"
        aria-label="Contact DoctorPhysio on WhatsApp"
        className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#16A34A] text-white shadow-[0_18px_35px_-18px_rgba(22,163,74,0.75)] transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16A34A] dark:bg-[#34D399] dark:text-[#052e2b] dark:shadow-[0_18px_35px_-18px_rgba(52,211,153,0.55)] dark:focus-visible:outline-[#34D399] sm:bottom-6"
      >
        <MessageCircleMore className="h-6 w-6" />
      </a>
    </>
  );
}
