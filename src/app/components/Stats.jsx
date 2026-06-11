"use client";

import {
  Activity,
  BrainCircuit,
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
    detail:
      "Ideal for posture correction, walking stability, and strength rebuilding after movement limitations.",
  },
  {
    icon: ShieldCheck,
    title: "Injury recovery support",
    text: "Safe rehabilitation pathways after surgery and sports injuries.",
    category: "Sports Injury",
    detail:
      "Structured recovery sessions that improve confidence after strains, tears, and post-surgical restrictions.",
  },
  {
    icon: HeartPulse,
    title: "Pain relief treatment",
    text: "Manual therapy and guided care for back, neck, and joint pain.",
    category: "Pain Relief",
    detail:
      "Focused hands-on therapy combined with corrective exercise for recurring discomfort and inflammation.",
  },
  {
    icon: BrainCircuit,
    title: "Neuromuscular re-education",
    text: "Smarter training for coordination, strength, and functional recovery.",
    category: "Rehabilitation",
    detail:
      "Designed to restore balance, control, and functional movement after injury or prolonged pain.",
  },
];

export default function Stats({
  selectedCategory,
  onCategoryChange,
  selectedService,
  onServiceSelect,
}) {
  const visibleCards =
    selectedCategory === "All"
      ? cards
      : cards.filter((card) => card.category === selectedCategory);

  const activeService =
    cards.find((card) => card.title === selectedService) ?? visibleCards[0] ?? cards[0];

  return (
    <section id="services" className="bg-white py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
              Doctor
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
              Personalized physiotherapy and rehabilitation care built around your recovery.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#64748B]">
              Our clinic combines evidence-based treatment, mobility restoration,
              and one-to-one recovery planning so every patient receives focused
              support for pain relief and long-term wellness.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" />
              <span className="h-px w-24 bg-[#bfdbfe]" />
              <span className="text-sm font-medium text-[#64748B]">
                More than 3,500 patients supported
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => onCategoryChange(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedCategory === category
                      ? "bg-[#2563EB] text-white shadow-sm"
                      : "border border-slate-200 bg-white text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-[1.5rem] bg-[#F8FAFC] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
                Selected treatment
              </p>
              <h3 className="mt-2 text-lg font-semibold text-[#0F172A]">
                {activeService.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#64748B]">
                {activeService.detail}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {visibleCards.map(({ icon: Icon, title, text }) => (
              <button
                key={title}
                type="button"
                onClick={() => onServiceSelect(title)}
                className={`rounded-[1.75rem] border bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                  selectedService === title
                    ? "border-[#2563EB] shadow-[0_18px_35px_-24px_rgba(37,99,235,0.45)]"
                    : "border-slate-200"
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#2563EB]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#0F172A]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#64748B]">{text}</p>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
