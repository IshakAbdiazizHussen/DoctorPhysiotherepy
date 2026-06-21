"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Clock3,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import { resolveSectionHref } from "@/lib/utils";
import Container from "./Container";

const pageLinks = [
  { label: "Healthcare", href: "#top" },
  { label: "Doctors", href: "#doctor-row" },
  { label: "Consulting", href: "#appointment" },
  { label: "Rehabilitation", href: "#rehabilitation" },
  { label: "Contact", href: "#trust" },
  { label: "Book Appointment", href: "#appointment" },
];

const serviceLinks = [
  "Pain Relief Treatment",
  "Sports Injury Recovery",
  "Mobility Improvement",
  "Post-Surgery Rehabilitation",
  "Strength & Conditioning",
  "Neuromuscular Re-Education",
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="mt-auto bg-[linear-gradient(180deg,#F8FAFC_0%,#EEF6FF_100%)] pb-[60px] pt-16 dark:bg-[linear-gradient(180deg,#0F172A_0%,#020617_100%)] sm:pt-20">
      <Container className="max-w-[1500px] px-6 sm:px-8 xl:px-10">
        <div className="grid gap-y-16 lg:grid-cols-[1.2fr_0.78fr_0.9fr_1fr] lg:items-start lg:gap-x-20 xl:gap-x-24">
          <div className="max-w-[31rem]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-base font-semibold tracking-[0.18em] text-[var(--text)]">
                  DOCTORPHYSIO
                </p>
                <p className="mt-1 text-[13px] text-[var(--text-muted)]">
                  Modern rehabilitation clinic
                </p>
              </div>
            </div>

            <p className="mt-8 text-[16px] leading-[1.9] text-[var(--text-muted)]">
              Access professional physiotherapy, rehabilitation, pain relief,
              mobility recovery, injury recovery, and personalized treatment
              plans designed to support your long-term wellness.
            </p>

            <p className="mt-6 text-[16px] leading-[1.9] text-[var(--text-muted)]">
              Here you can book appointments, explore treatment options, choose
              qualified specialists, and receive personalized rehabilitation
              support designed around your recovery.
            </p>

            <div className="mt-8 flex items-center gap-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[22px] font-semibold text-[var(--text)]">Website Pages</h3>
            <div className="mt-7 space-y-4">
              {pageLinks.map((item) => (
                <Link
                  key={item.label}
                  href={resolveSectionHref(pathname, item.href)}
                  className="block text-[16px] font-normal text-[var(--text-muted)] transition hover:text-[var(--accent)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[22px] font-semibold text-[var(--text)]">Services</h3>
            <div className="mt-7 space-y-4">
              {serviceLinks.map((service) => (
                <Link
                  key={service}
                  href={resolveSectionHref(pathname, "#services")}
                  className="block text-[16px] font-normal text-[var(--text-muted)] transition hover:text-[var(--accent)]"
                >
                  {service}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[22px] font-semibold text-[var(--text)]">Contact</h3>
            <div className="mt-7 space-y-5">
              <a
                href="tel:+18005550147"
                className="flex items-start gap-3 text-[16px] font-normal text-[var(--text-muted)] transition hover:text-[var(--accent)]"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--medical)]" />
                <span>+1 (800) 555-0147</span>
              </a>
              <a
                href="mailto:care@doctorphysio.com"
                className="flex items-start gap-3 text-[16px] font-normal text-[var(--text-muted)] transition hover:text-[var(--accent)]"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--medical)]" />
                <span>care@doctorphysio.com</span>
              </a>
              <a
                href="https://maps.google.com/?q=120+Wellness+Avenue+Suite+400+Minneapolis+MN"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 text-[16px] font-normal text-[var(--text-muted)] transition hover:text-[var(--accent)]"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--medical)]" />
                <span>120 Wellness Avenue, Suite 400, Minneapolis, MN</span>
              </a>
              <div className="flex items-start gap-3 text-[16px] font-normal text-[var(--text-muted)]">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--medical)]" />
                <span>Mon - Fri: 8:00 AM - 7:00 PM, Sat: 9:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[var(--border)] pt-8 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px] font-normal">© 2026 DoctorPhysio. All rights reserved.</p>
          <Link href={resolveSectionHref(pathname, "#appointment")} className="text-[16px] font-normal transition hover:text-[var(--accent)]">
            Book Appointment
          </Link>
        </div>
      </Container>
    </footer>
  );
}
