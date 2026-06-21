"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  MessageSquareQuote,
  ShieldPlus,
  Star,
  Stethoscope,
  Waves,
} from "lucide-react";
import Container from "./Container";

const items = [
  {
    icon: BadgeCheck,
    title: "Trusted & Certified",
    text: "Qualified care from trained rehabilitation professionals.",
    color: "text-[#34D399]",
    bg: "bg-[rgba(52,211,153,0.16)]",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Care",
    text: "Treatment plans designed around your health goals.",
    color: "text-[#60A5FA]",
    bg: "bg-[rgba(96,165,250,0.16)]",
  },
  {
    icon: Waves,
    title: "Modern Recovery",
    text: "Evidence-based methods for mobility and pain relief.",
    color: "text-[#38BDF8]",
    bg: "bg-[rgba(56,189,248,0.16)]",
  },
  {
    icon: ShieldPlus,
    title: "Compassionate Support",
    text: "A calm clinic experience built on guidance and trust.",
    color: "text-[#34D399]",
    bg: "bg-[rgba(52,211,153,0.16)]",
  },
];

const testimonials = [
  {
    name: "Amina R.",
    category: "Back Pain Recovery",
    avatar: "/images/female.jpg",
    text: "The team helped me recover from chronic back pain with a plan that was practical, kind, and effective. I’m now more active and pain-free than I’ve been in years.",
  },
  {
    name: "Daniel K.",
    category: "Sports Injury Rehabilitation",
    avatar: "/images/physio1.jpg",
    text: "I returned to training after injury with much more confidence thanks to their clear rehabilitation support and thoughtful step-by-step treatment plan.",
  },
  {
    name: "Olivia M.",
    category: "Mobility Restoration",
    avatar: "/images/physio2.jpg",
    text: "Every session felt focused and encouraging. The team gave me a recovery plan I could actually follow, and I noticed progress week by week.",
  },
];

const faqs = [
  {
    question: "Do I need a referral before booking physiotherapy?",
    answer:
      "Referrals can be helpful, but many patients can book directly for assessment and treatment depending on their insurance and local requirements.",
  },
  {
    question: "What should I bring to my first appointment?",
    answer:
      "Bring a photo ID, any recent scans or medical notes, your insurance details if applicable, and comfortable clothing that allows easy movement.",
  },
  {
    question: "Do you support sports injury recovery plans?",
    answer:
      "Yes. We create guided recovery plans for acute injuries, return-to-sport conditioning, mobility restoration, and injury-prevention follow-up care.",
  },
  {
    question: "How long does a typical physiotherapy session take?",
    answer:
      "Initial consultations usually run 45 to 60 minutes, while follow-up treatment sessions typically range from 30 to 45 minutes depending on your plan.",
  },
];

export default function Logos() {
  const [activeFaq, setActiveFaq] = useState(-1);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const visibleTestimonial = useMemo(
    () => testimonials[testimonialIndex],
    [testimonialIndex]
  );

  return (
    <section
      id="trust"
      className="relative overflow-hidden bg-transparent py-20 text-[#0F172A] sm:py-24 dark:text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-transparent" />

      <Container className="relative !max-w-[1600px] !px-6 lg:!px-10 xl:!px-12">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map(({ icon: Icon, title, text, color, bg }) => (
            <article
              key={title}
              className="rounded-[30px] border border-[rgba(226,232,240,0.92)] bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(248,250,252,0.96)_100%)] px-7 py-7 shadow-[0_28px_56px_-34px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-[rgba(148,163,184,0.14)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.82)_0%,rgba(15,23,42,0.72)_100%)] dark:shadow-[0_28px_56px_-34px_rgba(2,6,23,0.82)]"
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-full ${bg} ${color}`}>
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-[21px] font-normal leading-[1.3] tracking-[-0.01em] text-[#0F172A] dark:text-[#E2E8F0]">
                {title}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]">
                {text}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-stretch">
          <article
            className="flex h-full flex-col rounded-[32px] border border-[rgba(226,232,240,0.9)] bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(248,250,252,0.96)_100%)] p-8 shadow-[0_34px_70px_-40px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-[rgba(96,165,250,0.12)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.82)_0%,rgba(15,23,42,0.72)_100%)] dark:shadow-[0_34px_70px_-40px_rgba(2,6,23,0.86)] sm:p-10"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-[14px] font-normal uppercase tracking-[0.24em] text-[#60A5FA]">
                Patient Testimonials
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setTestimonialIndex((current) =>
                      current === 0 ? testimonials.length - 1 : current - 1
                    )
                  }
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(226,232,240,0.92)] bg-white text-[#64748B] transition hover:border-[#2563EB] hover:text-[#2563EB] dark:border-[rgba(148,163,184,0.18)] dark:bg-[rgba(15,23,42,0.66)] dark:text-[#D8E1F2] dark:hover:border-[#60A5FA] dark:hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTestimonialIndex((current) =>
                      current === testimonials.length - 1 ? 0 : current + 1
                    )
                  }
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(226,232,240,0.92)] bg-white text-[#64748B] transition hover:border-[#2563EB] hover:text-[#2563EB] dark:border-[rgba(148,163,184,0.18)] dark:bg-[rgba(15,23,42,0.66)] dark:text-[#D8E1F2] dark:hover:border-[#60A5FA] dark:hover:text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-8 flex h-full flex-col rounded-[30px] border border-[rgba(226,232,240,0.82)] bg-[rgba(255,255,255,0.58)] p-7 shadow-none transition duration-300 dark:border-[rgba(96,165,250,0.12)] dark:bg-[rgba(9,18,40,0.42)] dark:shadow-none sm:p-8">
              <div className="flex items-center gap-4">
                <MessageSquareQuote className="h-12 w-12 text-[#60A5FA]" />
                <div className="flex gap-1 text-[#FBBF24]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-6 w-6 fill-current" />
                  ))}
                </div>
              </div>

              <p className="mt-8 text-[18px] font-normal leading-[1.9] tracking-[-0.01em] text-[#1E293B] dark:text-[#D8E1F2] sm:text-[19px]">
                “{visibleTestimonial.text}”
              </p>

              <div className="mt-8 border-t border-[rgba(226,232,240,0.92)] pt-6 dark:border-[rgba(148,163,184,0.14)]">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border border-[rgba(255,255,255,0.12)]">
                    <Image
                      src={visibleTestimonial.avatar}
                      alt={visibleTestimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[19px] font-normal tracking-[-0.01em] text-[#0F172A] dark:text-[#F8FAFC]">
                      {visibleTestimonial.name}
                    </p>
                    <p className="mt-1 text-[16px] text-[#64748B] dark:text-[#A8B3C9]">
                      {visibleTestimonial.category}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-8">
                <div className="flex gap-3">
                  {testimonials.map((item, index) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setTestimonialIndex(index)}
                      className={`h-3 rounded-full transition ${
                        index === testimonialIndex
                          ? "w-8 bg-[#2563EB] dark:bg-[#60A5FA]"
                          : "w-3 bg-[rgba(148,163,184,0.38)] dark:bg-[rgba(148,163,184,0.38)]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article
            className="flex h-full flex-col rounded-[32px] border border-[rgba(226,232,240,0.9)] bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(248,250,252,0.96)_100%)] p-8 shadow-[0_34px_70px_-40px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-[rgba(96,165,250,0.12)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.82)_0%,rgba(15,23,42,0.72)_100%)] dark:shadow-[0_34px_70px_-40px_rgba(2,6,23,0.86)] sm:p-10"
          >
            <p className="text-[14px] font-normal uppercase tracking-[0.24em] text-[#60A5FA]">
              Frequently Asked Questions
            </p>

            <div className="mt-8 flex h-full flex-col gap-4">
              {faqs.map((faq, index) => {
                const isActive = activeFaq === index;

                return (
                  <button
                    key={faq.question}
                    type="button"
                    onClick={() => setActiveFaq((current) => (current === index ? -1 : index))}
                    className={`w-full rounded-[28px] border px-7 py-6 text-left transition duration-300 ${
                      isActive
                        ? "border-[#2563EB] bg-[rgba(255,255,255,0.45)] shadow-none dark:border-[#3B82F6] dark:bg-[rgba(9,18,40,0.42)] dark:shadow-none"
                        : "border-[rgba(226,232,240,0.82)] bg-[rgba(255,255,255,0.28)] hover:border-[rgba(37,99,235,0.24)] dark:border-[rgba(148,163,184,0.12)] dark:bg-[rgba(9,18,40,0.24)] dark:hover:border-[rgba(96,165,250,0.26)]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-5">
                      <p className="text-[18px] font-normal leading-[1.5] tracking-[-0.01em] text-[#0F172A] dark:text-[#F8FAFC] sm:text-[19px]">
                        {faq.question}
                      </p>
                      <ChevronDown
                        className={`h-6 w-6 shrink-0 text-[#64748B] transition-transform duration-300 dark:text-[#A8B3C9] ${
                          isActive ? "rotate-180 text-[#2563EB] dark:text-[#60A5FA]" : ""
                        }`}
                      />
                    </div>

                    <div
                      className={`grid overflow-hidden transition-all duration-300 ${
                        isActive ? "grid-rows-[1fr] pt-5" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="min-h-0">
                        <p className="max-w-[760px] text-[17px] leading-[1.9] text-[#64748B] dark:text-[#A8B3C9]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
