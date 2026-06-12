"use client";

import {
  Activity,
  BrainCircuit,
  Check,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";
import Container from "./Container";

const categories = ["All", "Pain Relief", "Sports Injury", "Rehabilitation", "Mobility"];

const cards = [
  {
    icon: Activity,
    title: "Advanced mobility therapy",
    text: "Programs that rebuild balance, posture, and movement quality.",
    category: "Mobility",
  },
  {
    icon: ShieldCheck,
    title: "Injury recovery support",
    text: "Safe rehabilitation pathways after surgery and sports injuries.",
    category: "Sports Injury",
  },
  {
    icon: HeartPulse,
    title: "Pain relief treatment",
    text: "Manual therapy and guided care to reduce pain and inflammation.",
    category: "Pain Relief",
  },
  {
    icon: BrainCircuit,
    title: "Neuromuscular re-education",
    text: "Restoring movement, stability, and muscle control effectively.",
    category: "Rehabilitation",
  },
];

export default function Stats({
  selectedCategory,
  onCategoryChange,
  selectedService,
  onServiceSelect,
}) {
  const filteredCards =
    selectedCategory === "All"
      ? cards
      : cards.filter((card) => card.category === selectedCategory);

  const visibleCards = filteredCards.length === 4 ? filteredCards : cards;

  return (
    <section id="services" className="bg-white py-16 sm:py-20 lg:py-24">
      <Container className="max-w-[1440px] px-8 xl:px-10">
        <div className="grid gap-12 xl:grid-cols-[0.45fr_0.55fr] xl:items-start xl:gap-16">
          <div className="max-w-[650px]">
            <p className="text-[13px] font-bold uppercase tracking-[0.34em] text-[#2563EB]">
              DOCTOR <span className="text-[#10B981]">+</span>
            </p>

            <h2 className="mt-7 max-w-[9ch] text-[3.8rem] font-extrabold leading-[1.03] tracking-[-0.06em] text-[#0F172A] sm:text-[4.35rem] lg:text-[4.75rem] xl:text-[4.5rem] 2xl:text-[4.75rem]">
              Personalized physiotherapy and rehabilitation care built around{" "}
              <span className="relative inline-block text-[#0F766E]">
                your recovery.
                <svg
                  className="absolute -bottom-3 left-1/2 h-[18px] w-[94%] -translate-x-1/2 text-[#22C59E]"
                  viewBox="0 0 240 26"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M10 18C55 11 108 8 170 13C196 15 214 18 230 16"
                    stroke="currentColor"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            <p className="mt-10 max-w-[40rem] text-[17px] leading-[2] text-[#64748B]">
              Our clinic combines evidence-based treatment, mobility restoration,
              and one-to-one recovery planning so every patient receives focused
              support for pain relief and long-term wellness.
            </p>

            <div className="mt-10 flex items-center gap-4 text-[17px] text-[#64748B]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F766E] text-white">
                <Check className="h-4 w-4" />
              </span>
              <span>
                More than <span className="font-semibold text-[#2563EB]">3,500</span>{" "}
                patients supported
              </span>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => onCategoryChange(category)}
                  className={`inline-flex h-12 items-center rounded-full border px-8 text-[15px] font-medium transition ${
                    selectedCategory === category
                      ? "border-[#2563EB] bg-[#2563EB] text-white shadow-[0_16px_28px_-18px_rgba(37,99,235,0.55)]"
                      : "border-[#E5E7EB] bg-white text-[#64748B]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {visibleCards.map(({ icon: Icon, title, text }) => {
              const isActive = selectedService === title;

              return (
                <button
                  key={title}
                  type="button"
                  onClick={() => onServiceSelect(title)}
                  className={`relative min-h-[272px] rounded-[28px] border bg-white px-10 py-9 text-left ${
                    isActive ? "border-[#2563EB]" : "border-[#E5E7EB]"
                  }`}
                >
                  {isActive ? (
                    <span className="absolute right-7 top-7 flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-white">
                      <Check className="h-4 w-4" />
                    </span>
                  ) : null}

                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF4FF] text-[#2563EB]">
                    <Icon className="h-6 w-6" />
                  </span>

                  <h3 className="mt-11 max-w-[12ch] text-[1.15rem] font-bold leading-[1.25] text-[#0F172A] sm:text-[1.28rem]">
                    {title}
                  </h3>

                  <p className="mt-5 max-w-[18rem] text-[15px] leading-[1.95] text-[#64748B]">
                    {text}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
