"use client";

import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CalendarDays,
  Check,
  HeartPulse,
  MessageCircleMore,
  ShieldCheck,
} from "lucide-react";
import Container from "./Container";
import Services from "./Services";

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
  selectedDoctor,
  onDoctorSelect,
}) {
  const filteredCards =
    selectedCategory === "All"
      ? cards
      : cards.filter((card) => card.category === selectedCategory);

  const visibleCards = filteredCards.length === 4 ? filteredCards : cards;
  const activeService =
    cards.find((card) => card.title === selectedService) ?? cards[0];
  const ActiveIcon = activeService.icon;

  return (
    <section id="services" className="bg-white py-16 sm:py-20 lg:py-24 dark:bg-[#020617]">
      <Container className="max-w-[1500px] px-6 sm:px-8 xl:px-10">
        <div className="grid items-start gap-14 xl:grid-cols-[48%_52%] xl:gap-16">
          <div className="max-w-[690px]">
            <p className="text-[13px] font-bold uppercase tracking-[0.34em] text-[#2563EB] dark:text-[#60A5FA]">
              DOCTOR <span className="text-[#10B981]">+</span>
            </p>

            <h2 className="mt-8 w-full max-w-[760px] text-[3.5rem] font-[800] leading-[1.02] tracking-[-0.04em] text-[#0F172A] dark:text-[#F8FAFC] sm:text-[4.1rem] lg:text-[62px] xl:text-[68px]">
              Personalized physiotherapy and rehabilitation care built around
            
              <span className="relative inline-block whitespace-nowrap text-[#0F766E] dark:text-[#34D399] ml-5">
                 your recovery.
                <svg
                  className="absolute -bottom-3 left-1/2 h-[18px] w-[97%] -translate-x-1/2 text-[#22C59E]"
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

            <p className="mt-10 max-w-[640px] text-[18px] leading-[1.9] text-[#64748B] dark:text-[#94A3B8]">
              Our clinic combines evidence-based treatment, mobility restoration,
              and one-to-one recovery planning so every patient receives focused
              support for pain relief and long-term wellness.
            </p>

            <div className="mt-8 flex items-center gap-4 text-[17px] text-[#64748B] dark:text-[#94A3B8]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F766E] text-white dark:bg-[#34D399] dark:text-[#052e2b]">
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
                      ? "border-[#2563EB] bg-[#2563EB] text-white shadow-[0_16px_28px_-18px_rgba(37,99,235,0.55)] dark:border-[#60A5FA] dark:bg-[#60A5FA] dark:text-[#020617]"
                      : "border-[#E5E7EB] bg-white text-[#64748B] dark:border-[#1E293B] dark:bg-[#111827] dark:text-[#94A3B8]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid w-full gap-6 sm:grid-cols-2 xl:max-w-[664px] xl:justify-self-end">
            {visibleCards.map(({ icon: Icon, title, text }) => {
              const isActive = selectedService === title;

              return (
                <button
                  key={title}
                  type="button"
                  onClick={() => onServiceSelect(title)}
                  className={`relative h-[260px] w-full max-w-[320px] rounded-[28px] bg-white px-8 py-8 text-left shadow-none dark:bg-[#111827] ${
                    isActive
                      ? "border-2 border-[#2563EB] dark:border-[#60A5FA]"
                      : "border border-[#E5E7EB] dark:border-[#1E293B] dark:bg-[#111827]"
                  }`}
                >
                  {isActive ? (
                    <span className="absolute right-7 top-7 flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-white dark:bg-[#60A5FA] dark:text-[#020617]">
                      <Check className="h-4 w-4" />
                    </span>
                  ) : null}

                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF4FF] text-[#2563EB] dark:bg-[rgba(96,165,250,0.14)] dark:text-[#60A5FA]">
                    <Icon className="h-6 w-6" />
                  </span>

                  <h3 className="mt-10 max-w-[12ch] text-[24px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0F172A] dark:text-[#F8FAFC]">
                    {title}
                  </h3>

                  <p className="mt-5 max-w-[240px] text-[16px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]">
                    {text}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[1.1fr_1fr]">
          <div className="relative overflow-hidden rounded-[28px] border border-[#CFE0FF] bg-[linear-gradient(180deg,#EEF4FF_0%,#F6FAFF_100%)] px-8 py-8 dark:border-[#1E3A8A] dark:bg-[linear-gradient(180deg,rgba(37,99,235,0.12)_0%,rgba(15,23,42,0.92)_100%)]">
            <div className="flex max-w-[420px] items-start gap-5">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-[0_12px_24px_-18px_rgba(37,99,235,0.38)] dark:bg-[#0F172A] dark:text-[#60A5FA]">
                <ActiveIcon className="h-6 w-6" />
              </span>

              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.28em] text-[#2563EB] dark:text-[#60A5FA]">
                  Selected Treatment
                </p>
                <h3 className="mt-3 text-[20px] font-bold leading-[1.2] text-[#0F172A] dark:text-[#F8FAFC] sm:text-[22px]">
                  {activeService.title}
                </h3>
                <p className="mt-4 max-w-[460px] text-[17px] leading-[1.75] text-[#64748B] dark:text-[#94A3B8]">
                  Ideal for posture correction, restoring stability, and strength
                  rebuilding to improve movement and flexibility.
                </p>

                <button
                  type="button"
                  className="mt-8 inline-flex items-center gap-3 text-[18px] font-semibold text-[#2563EB] transition hover:gap-4 dark:text-[#60A5FA]"
                >
                  Learn more
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="pointer-events-none absolute right-7 top-1/2 hidden h-[210px] w-[210px] -translate-y-1/2 rounded-full border border-[rgba(37,99,235,0.12)] xl:block" />
            <div className="pointer-events-none absolute right-14 top-1/2 hidden h-[160px] w-[160px] -translate-y-1/2 rounded-full border border-[rgba(37,99,235,0.1)] xl:block" />
            <div className="pointer-events-none absolute right-20 top-1/2 hidden -translate-y-1/2 text-[#8FB8FF] opacity-80 xl:block dark:text-[#60A5FA]">
              <Activity className="h-24 w-24" />
            </div>
          </div>

          <div className="flex min-h-[184px] items-center justify-between gap-6 rounded-[28px] border border-[#CDEFE3] bg-[linear-gradient(180deg,#F2FFFA_0%,#FBFFFD_100%)] px-8 py-8 dark:border-[#134E4A] dark:bg-[linear-gradient(180deg,rgba(16,185,129,0.12)_0%,rgba(15,23,42,0.92)_100%)]">
            <div className="flex items-center gap-5">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[rgba(16,185,129,0.12)] text-[#10B981] dark:bg-[rgba(52,211,153,0.16)] dark:text-[#34D399]">
                <CalendarDays className="h-7 w-7" />
              </span>

              <div className="max-w-[440px]">
                <h3 className="text-[20px] font-bold leading-[1.25] text-[#0F172A] dark:text-[#F8FAFC] sm:text-[22px]">
                  Need help choosing the right treatment?
                </h3>
                <p className="mt-3 text-[17px] leading-[1.7] text-[#64748B] dark:text-[#94A3B8]">
                  Our experts will guide you to the best care plan for your
                  recovery.
                </p>
              </div>
            </div>

            <a
              href="#appointment"
              className="inline-flex h-14 shrink-0 items-center gap-3 rounded-full bg-[linear-gradient(135deg,#14B8A6_0%,#10B981_100%)] px-8 text-[18px] font-semibold text-white shadow-[0_18px_34px_-22px_rgba(16,185,129,0.55)] transition hover:translate-y-[-1px] dark:text-[#052e2b]"
            >
              <MessageCircleMore className="h-5 w-5" />
              Talk to Expert
            </a>
          </div>
        </div>

        <div className="mt-10">
          <Services
            selectedDoctor={selectedDoctor}
            onDoctorSelect={onDoctorSelect}
            embedded
          />
        </div>
      </Container>
    </section>
  );
}
