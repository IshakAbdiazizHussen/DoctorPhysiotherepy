"use client";

import { useMemo, useState } from "react";
import {
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  ShieldPlus,
  Stethoscope,
} from "lucide-react";
import Container from "./Container";

const items = [
  {
    icon: BadgeCheck,
    title: "Trusted & Certified",
    text: "Qualified care from trained rehabilitation professionals.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Care",
    text: "Treatment plans designed around your health goals.",
  },
  {
    icon: Stethoscope,
    title: "Modern Recovery",
    text: "Evidence-based methods for mobility and pain relief.",
  },
  {
    icon: ShieldPlus,
    title: "Compassionate Support",
    text: "A calm clinic experience built on guidance and trust.",
  },
];

const testimonials = [
  {
    name: "Amina R.",
    text: "The team helped me recover from chronic back pain with a plan that was practical, kind, and effective.",
  },
  {
    name: "Daniel K.",
    text: "I returned to training after injury with much more confidence thanks to their clear rehabilitation support.",
  },
];

const faqs = [
  "Do I need a referral before booking physiotherapy?",
  "What should I bring to my first appointment?",
  "Do you support sports injury recovery plans?",
];

export default function Logos() {
  const [activeFaq, setActiveFaq] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const visibleTestimonial = useMemo(
    () => testimonials[testimonialIndex],
    [testimonialIndex]
  );

  return (
    <section id="trust" className="bg-[var(--bg-muted)] py-16 pb-10 sm:py-20 sm:pb-12 dark:bg-[#020617]">
      <Container>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-[1.5rem] border border-slate-200 bg-white px-5 py-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-[#1E293B] dark:bg-[#111827] dark:shadow-[0_24px_44px_-34px_rgba(2,6,23,0.85)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A] dark:bg-[rgba(52,211,153,0.16)] dark:text-[#34D399]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#64748B] dark:text-[#94A3B8]">{text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-[#1E293B] dark:bg-[#111827] dark:shadow-[0_24px_44px_-34px_rgba(2,6,23,0.85)] sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB] dark:text-[#60A5FA]">
                Patient Testimonials
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setTestimonialIndex((current) =>
                      current === 0 ? testimonials.length - 1 : current - 1
                    )
                  }
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-[#2563EB] hover:text-[#2563EB] dark:border-[#1E293B] dark:bg-[#0F172A] dark:text-[#94A3B8] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTestimonialIndex((current) =>
                      current === testimonials.length - 1 ? 0 : current + 1
                    )
                  }
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-[#2563EB] hover:text-[#2563EB] dark:border-[#1E293B] dark:bg-[#0F172A] dark:text-[#94A3B8] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-5 rounded-[1.5rem] bg-[#F8FAFC] p-5 dark:bg-[#0F172A]">
              <p className="text-sm leading-7 text-[#64748B] dark:text-[#94A3B8]">
                “{visibleTestimonial.text}”
              </p>
              <p className="mt-3 text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                {visibleTestimonial.name}
              </p>
              <div className="mt-4 flex gap-2">
                {testimonials.map((item, index) => (
                  <span
                    key={item.name}
                    className={`h-2.5 rounded-full transition ${
                      index === testimonialIndex
                        ? "w-6 bg-[#2563EB] dark:bg-[#60A5FA]"
                        : "w-2.5 bg-slate-300 dark:bg-[#334155]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-[#1E293B] dark:bg-[#111827] dark:shadow-[0_24px_44px_-34px_rgba(2,6,23,0.85)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB] dark:text-[#60A5FA]">
              Frequently Asked Questions
            </p>
            <div className="mt-5 space-y-3">
              {faqs.map((question, index) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => setActiveFaq((current) => (current === index ? -1 : index))}
                  className="w-full rounded-[1.5rem] border border-slate-200 bg-[#F8FAFC] px-5 py-4 text-left dark:border-[#1E293B] dark:bg-[#0F172A]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                      {question}
                    </p>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[#64748B] transition dark:text-[#94A3B8] ${
                        activeFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ${
                      activeFaq === index ? "grid-rows-[1fr] pt-3" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="min-h-0">
                      <p className="text-sm leading-7 text-[#64748B] dark:text-[#94A3B8]">
                      Referrals can be helpful, but many patients can book
                      directly for assessment and treatment depending on their
                      insurance and local requirements.
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
