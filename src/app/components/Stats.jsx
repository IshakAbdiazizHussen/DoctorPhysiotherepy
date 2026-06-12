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
      <Container className="max-w-[1400px] px-6 sm:px-8 xl:px-10">
        <div className="grid gap-12 xl:grid-cols-[48%_52%] xl:items-start xl:gap-8">
          <div className="w-full max-w-[650px]">
            <p className="text-[13px] font-bold uppercase tracking-[0.34em] text-[#2563EB]">
              DOCTOR <span className="text-[#10B981]">+</span>
            </p>

            <h2 className="mt-7 w-full max-w-[650px] text-[3.65rem] font-[800] leading-[0.95] tracking-[-0.04em] text-[#0F172A] sm:text-[4.4rem] lg:text-[72px]">
              Personalized
              <br />
              physiotherapy and
              <br />
              rehabilitation care built
              <br />
              around{" "}
              <span className="relative inline-block whitespace-nowrap text-[#0F766E]">
                your recovery.
                <svg
                  className="absolute -bottom-3 left-1/2 h-[18px] w-[96%] -translate-x-1/2 text-[#22C59E]"
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

            <p className="mt-10 max-w-[580px] text-[18px] leading-[1.9] text-[#64748B]">
              Our clinic combines evidence-based treatment, mobility restoration,
              and one-to-one recovery planning so every patient receives focused
              support for pain relief and long-term wellness.
            </p>

            <div className="mt-8 flex items-center gap-4 text-[17px] text-[#64748B]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F766E] text-white">
                <Check className="h-4 w-4" />
              </span>
              <span>
                More than <span className="font-semibold text-[#2563EB]">3,500</span>{" "}
                patients supported
              </span>
            </div>

            <div className="mt-10 flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => onCategoryChange(category)}
                  className={`inline-flex h-12 shrink-0 items-center rounded-full border px-6 text-[15px] font-medium transition ${
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

          <div className="grid w-full justify-center gap-6 sm:grid-cols-2 xl:max-w-[664px] xl:justify-self-end">
            {visibleCards.map(({ icon: Icon, title, text }) => {
              const isActive = selectedService === title;

              return (
                <button
                  key={title}
                  type="button"
                  onClick={() => onServiceSelect(title)}
                  className={`relative h-[260px] w-full max-w-[320px] rounded-[28px] bg-white px-8 py-8 text-left ${
                    isActive
                      ? "border-2 border-[#2563EB]"
                      : "border border-[#E5E7EB]"
                  }`}
                >
                  {isActive ? (
                    <span className="absolute right-7 top-7 flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-white">
                      <Check className="h-4 w-4" />
                    </span>
                  ) : null}

                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF4FF] text-[#2563EB]">
                    <Icon className="h-6 w-6" />
                  </span>

                  <h3 className="mt-10 max-w-[12ch] text-[24px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0F172A]">
                    {title}
                  </h3>

                  <p className="mt-5 max-w-[240px] text-[16px] leading-[1.85] text-[#64748B]">
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
