"use client";

import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import FloatingContact from "@/components/shared/FloatingContact";
import ScrollToTop from "@/components/shared/ScrollToTop";

const contactItems = [
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (800) 555-0147",
    href: "tel:+18005550147",
  },
  {
    icon: Mail,
    title: "Email",
    value: "care@doctorphysio.com",
    href: "mailto:care@doctorphysio.com",
  },
  {
    icon: MapPin,
    title: "Clinic",
    value: "120 Wellness Avenue, Suite 400, Minneapolis, MN",
    href: "https://maps.google.com/?q=120+Wellness+Avenue+Suite+400+Minneapolis+MN",
  },
  {
    icon: Clock3,
    title: "Opening Hours",
    value: "Mon - Fri: 8:00 AM - 7:00 PM, Sat: 9:00 AM - 4:00 PM",
  },
];

export default function ContactPage() {
  return (
    <main id="top" className="min-h-screen bg-[#F8FAFC] text-slate-900 dark:bg-[#020617] dark:text-[#F8FAFC]">
      <Navbar />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="max-w-[1500px] px-6 lg:px-10">
          <div className="max-w-[760px]">
            <p className="text-[13px] font-medium uppercase tracking-[0.28em] text-[#2563EB] dark:text-[#60A5FA]">
              Contact
            </p>
            <h1 className="mt-6 text-[2.8rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#0F172A] dark:text-[#F8FAFC] sm:text-[3.5rem] lg:text-[4.2rem]">
              Reach DoctorPhysio for appointments, care planning, and recovery guidance.
            </h1>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {contactItems.map(({ icon: Icon, title, value, href }) => {
              const card = (
                <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-8 shadow-[0_20px_50px_-34px_rgba(15,23,42,0.12)] dark:border-[#1E293B] dark:bg-[#111827] dark:shadow-[0_20px_50px_-34px_rgba(2,6,23,0.8)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF4FF] text-[#2563EB] dark:bg-[rgba(96,165,250,0.14)] dark:text-[#60A5FA]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-[22px] font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                    {title}
                  </h2>
                  <p className="mt-3 text-[17px] leading-[1.8] text-[#64748B] dark:text-[#94A3B8]">
                    {value}
                  </p>
                </div>
              );

              if (!href) return <div key={title}>{card}</div>;

              return (
                <a key={title} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
                  {card}
                </a>
              );
            })}
          </div>
        </Container>
      </section>

      <Footer />
      <FloatingContact />
      <ScrollToTop />
    </main>
  );
}
