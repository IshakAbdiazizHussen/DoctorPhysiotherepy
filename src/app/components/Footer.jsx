"use client";

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
  return (
    <footer className="bg-[var(--bg-muted)] pb-16 pt-6 dark:bg-[#020617]">
      <Container className="max-w-[1600px] px-6 sm:px-8 xl:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.9fr_1fr]">
          <div className="max-w-[28rem]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-[0.2em] text-[var(--text)]">
                  DOCTORPHYSIO
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  Modern rehabilitation clinic
                </p>
              </div>
            </div>

            <p className="mt-6 text-[15px] leading-8 text-[var(--text-muted)]">
              Access professional physiotherapy, rehabilitation, pain relief,
              mobility recovery, injury recovery, and personalized treatment
              plans designed to support your long-term wellness.
            </p>

            <p className="mt-6 text-[15px] leading-8 text-[var(--text-muted)]">
              Here you can book appointments, explore treatment options, choose
              qualified specialists, and receive personalized rehabilitation
              support designed around your recovery.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[var(--text)]">Website Pages</h3>
            <div className="mt-5 space-y-3">
              {pageLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-[15px] text-[var(--text-muted)] transition hover:text-[var(--accent)]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[var(--text)]">Services</h3>
            <div className="mt-5 space-y-3">
              {serviceLinks.map((service) => (
                <a
                  key={service}
                  href="#services"
                  className="block text-[15px] text-[var(--text-muted)] transition hover:text-[var(--accent)]"
                >
                  {service}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[var(--text)]">Contact</h3>
            <div className="mt-5 space-y-4">
              <a
                href="tel:+18005550147"
                className="flex items-start gap-3 text-[15px] text-[var(--text-muted)] transition hover:text-[var(--accent)]"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--medical)]" />
                <span>+1 (800) 555-0147</span>
              </a>
              <a
                href="mailto:care@doctorphysio.com"
                className="flex items-start gap-3 text-[15px] text-[var(--text-muted)] transition hover:text-[var(--accent)]"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--medical)]" />
                <span>care@doctorphysio.com</span>
              </a>
              <a
                href="https://maps.google.com/?q=120+Wellness+Avenue+Suite+400+Minneapolis+MN"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 text-[15px] text-[var(--text-muted)] transition hover:text-[var(--accent)]"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--medical)]" />
                <span>120 Wellness Avenue, Suite 400, Minneapolis, MN</span>
              </a>
              <div className="flex items-start gap-3 text-[15px] text-[var(--text-muted)]">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--medical)]" />
                <span>Mon - Fri: 8:00 AM - 7:00 PM, Sat: 9:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 DoctorPhysio. All rights reserved.</p>
          <a href="#appointment" className="font-medium transition hover:text-[var(--accent)]">
            Book Appointment
          </a>
        </div>
      </Container>
    </footer>
  );
}
