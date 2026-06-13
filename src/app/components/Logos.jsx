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
import { motion } from "framer-motion";
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
  const [activeFaq, setActiveFaq] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const visibleTestimonial = useMemo(
    () => testimonials[testimonialIndex],
    [testimonialIndex]
  );

  return (
    <section
      id="trust"
      className="relative overflow-hidden bg-[#030B23] py-20 text-white sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.16),transparent_34%),radial-gradient(circle_at_80%_75%,rgba(56,189,248,0.12),transparent_30%),linear-gradient(180deg,rgba(7,16,42,0.94)_0%,rgba(3,11,35,1)_100%)]" />

      <Container className="relative max-w-[1400px] px-6 sm:px-8 xl:px-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map(({ icon: Icon, title, text, color, bg }) => (
            <motion.article
              key={title}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="rounded-[30px] border border-[rgba(148,163,184,0.18)] bg-[linear-gradient(180deg,rgba(15,23,42,0.74)_0%,rgba(15,23,42,0.58)_100%)] px-7 py-7 shadow-[0_28px_56px_-34px_rgba(2,6,23,0.9)] backdrop-blur-xl"
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-full ${bg} ${color}`}>
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-[32px] font-bold leading-[1.12] tracking-[-0.03em] text-white">
                {title}
              </h3>
              <p className="mt-4 text-[18px] leading-[1.75] text-[#A8B3C9]">
                {text}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-stretch">
          <motion.article
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex h-full flex-col rounded-[32px] border border-[rgba(96,165,250,0.16)] bg-[linear-gradient(180deg,rgba(15,23,42,0.82)_0%,rgba(12,22,48,0.74)_100%)] p-8 shadow-[0_34px_70px_-40px_rgba(2,6,23,0.92)] backdrop-blur-xl sm:p-10"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-[15px] font-semibold uppercase tracking-[0.24em] text-[#60A5FA]">
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
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(148,163,184,0.18)] bg-[rgba(15,23,42,0.66)] text-[#D8E1F2] transition hover:border-[#60A5FA] hover:text-white"
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
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(148,163,184,0.18)] bg-[rgba(15,23,42,0.66)] text-[#D8E1F2] transition hover:border-[#60A5FA] hover:text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-8 flex h-full flex-col rounded-[30px] border border-[rgba(96,165,250,0.14)] bg-[linear-gradient(180deg,rgba(15,23,42,0.72)_0%,rgba(10,19,41,0.72)_100%)] p-7 shadow-[0_26px_54px_-34px_rgba(59,130,246,0.18)] transition duration-300 hover:shadow-[0_30px_58px_-34px_rgba(59,130,246,0.28)] sm:p-8">
              <div className="flex items-center gap-4">
                <MessageSquareQuote className="h-12 w-12 text-[#60A5FA]" />
                <div className="flex gap-1 text-[#FBBF24]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-6 w-6 fill-current" />
                  ))}
                </div>
              </div>

              <p className="mt-8 text-[24px] leading-[1.7] tracking-[-0.02em] text-[#F8FAFC]">
                “{visibleTestimonial.text}”
              </p>

              <div className="mt-8 border-t border-[rgba(148,163,184,0.14)] pt-6">
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
                    <p className="text-[28px] font-semibold tracking-[-0.03em] text-white">
                      {visibleTestimonial.name}
                    </p>
                    <p className="mt-1 text-[18px] text-[#A8B3C9]">
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
                          ? "w-8 bg-[#60A5FA]"
                          : "w-3 bg-[rgba(148,163,184,0.38)]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.article>

          <motion.article
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex h-full flex-col rounded-[32px] border border-[rgba(96,165,250,0.14)] bg-[linear-gradient(180deg,rgba(15,23,42,0.82)_0%,rgba(12,22,48,0.74)_100%)] p-8 shadow-[0_34px_70px_-40px_rgba(2,6,23,0.92)] backdrop-blur-xl sm:p-10"
          >
            <p className="text-[15px] font-semibold uppercase tracking-[0.24em] text-[#60A5FA]">
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
                        ? "border-[#3B82F6] bg-[rgba(22,36,72,0.82)] shadow-[0_20px_48px_-30px_rgba(59,130,246,0.35)]"
                        : "border-[rgba(148,163,184,0.14)] bg-[rgba(15,23,42,0.54)] hover:border-[rgba(96,165,250,0.34)]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-5">
                      <p className="text-[28px] font-semibold leading-[1.28] tracking-[-0.02em] text-white">
                        {faq.question}
                      </p>
                      <ChevronDown
                        className={`h-6 w-6 shrink-0 text-[#A8B3C9] transition-transform duration-300 ${
                          isActive ? "rotate-180 text-[#60A5FA]" : ""
                        }`}
                      />
                    </div>

                    <div
                      className={`grid overflow-hidden transition-all duration-300 ${
                        isActive ? "grid-rows-[1fr] pt-5" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="min-h-0">
                        <p className="max-w-[760px] text-[19px] leading-[1.85] text-[#A8B3C9]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.article>
        </div>
      </Container>
    </section>
  );
}
