"use client";

import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CalendarPlus2,
  Check,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Container from "./Container";

const categories = ["All", "Pain Relief", "Sports Injury", "Rehabilitation", "Mobility"];

const cards = [
  {
    icon: Activity,
    title: "Advanced mobility therapy",
    text: "Programs that rebuild balance, posture, and movement quality.",
    category: "Mobility",
    detail:
      "Ideal for posture correction, restoring stability, and strength rebuilding to improve movement and flexibility.",
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
    text: "Manual therapy and guided care to reduce pain and inflammation.",
    category: "Pain Relief",
    detail:
      "Focused hands-on therapy combined with corrective exercise for recurring discomfort, inflammation, and reduced mobility.",
  },
  {
    icon: BrainCircuit,
    title: "Neuromuscular re-education",
    text: "Restoring movement, stability, and muscle control effectively.",
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

  const ActiveIcon = activeService.icon;

  return (
    <section id="services" className="bg-white py-16 sm:py-20">
      <Container>
        <div className="grid gap-12 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2563EB]">
              Doctor <span className="text-[#10B981]">+</span>
            </p>

            <h2 className="mt-5 max-w-[14ch] text-4xl font-semibold leading-[1.02] tracking-tight text-[#0F172A] sm:text-5xl lg:text-[4.2rem]">
              Personalized physiotherapy and rehabilitation care built around{" "}
              <span className="relative inline-block text-[#0F766E]">
                your recovery
                <svg
                  className="absolute -bottom-3 left-1 h-4 w-[96%] text-[#34D399]"
                  viewBox="0 0 240 30"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M8 21C59 12 114 9 173 16C198 19 216 21 233 19"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-9 text-[#64748B]">
              Our clinic combines evidence-based treatment, mobility
              restoration, and one-to-one recovery planning so every patient
              receives focused support for pain relief and long-term wellness.
            </p>

            <div className="mt-8 flex items-center gap-3 text-[#64748B]">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
                <Check className="h-4 w-4" />
              </div>
              <p className="text-lg">
                More than <span className="font-semibold text-[#2563EB]">3,500</span>{" "}
                patients supported
              </p>
            </div>

            <div className="mt-9 flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => onCategoryChange(category)}
                  className={`shrink-0 rounded-full px-6 py-3 text-base font-medium transition ${
                    selectedCategory === category
                      ? "bg-[#2563EB] text-white shadow-[0_18px_35px_-20px_rgba(37,99,235,0.55)]"
                      : "border border-slate-200 bg-white text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#C7D9FF] bg-[linear-gradient(135deg,#EEF4FF_0%,#F8FBFF_58%,#EEF6FF_100%)] p-5 shadow-[0_28px_60px_-34px_rgba(37,99,235,0.28)] sm:p-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 gap-4 md:gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-sm">
                    <ActiveIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2563EB]">
                      Selected Treatment
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-[#0F172A]">
                      {activeService.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-base leading-8 text-[#64748B]">
                      {activeService.detail}
                    </p>
                    <button
                      type="button"
                      onClick={() => onServiceSelect(activeService.title)}
                      className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-[#2563EB] transition hover:gap-3"
                    >
                      Learn more
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="relative mx-auto flex h-[210px] w-full max-w-[220px] shrink-0 items-center justify-center md:mx-0 md:h-[228px] md:max-w-[240px]">
                  <div className="absolute inset-3 rounded-full border border-[#D8E4FF]" />
                  <div className="absolute inset-8 rounded-full border border-[#E8F0FF]" />
                  <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.92)_0%,rgba(238,244,255,0.5)_72%,transparent_100%)]" />
                  <div className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-[#D1DEFF]" />
                  <div className="absolute bottom-6 left-5 h-1.5 w-1.5 rounded-full bg-[#D1DEFF]" />
                  <div className="relative z-10 flex h-[184px] w-[152px] items-center justify-center rounded-[2rem] bg-white/28 backdrop-blur-[1px] md:h-[196px] md:w-[158px]">
                    <Image
                      src="/images/therepy.png"
                      alt="Physiotherapy treatment specialist"
                      width={150}
                      height={190}
                      className="h-[170px] w-auto object-contain object-center md:h-[182px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              {visibleCards.map(({ icon: Icon, title, text }) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => onServiceSelect(title)}
                  className={`group relative rounded-[2rem] border bg-white p-8 text-left shadow-[0_24px_50px_-34px_rgba(15,23,42,0.22)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(37,99,235,0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                    selectedService === title
                      ? "border-[#2563EB] shadow-[0_28px_60px_-30px_rgba(37,99,235,0.24)]"
                      : "border-slate-200 hover:border-[#BFDBFE]"
                  }`}
                >
                  {selectedService === title ? (
                    <span className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-sm">
                      <Check className="h-4 w-4" />
                    </span>
                  ) : null}

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF4FF] text-[#2563EB] transition group-hover:bg-[#E0ECFF]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-7 text-[1.75rem] font-semibold leading-tight text-[#0F172A]">
                    {title}
                  </h3>
                  <p className="mt-4 text-lg leading-8 text-[#64748B]">{text}</p>
                </button>
              ))}
            </div>

            <div className="rounded-[2rem] border border-[#B7E8D5] bg-[linear-gradient(135deg,#ECFDF5_0%,#F3FFFB_52%,#F8FAFC_100%)] px-6 py-7 shadow-[0_24px_50px_-36px_rgba(15,118,110,0.28)] lg:px-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4 md:gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#DDF8EA] text-[#10B981]">
                    <CalendarPlus2 className="h-7 w-7" />
                  </div>
                  <div className="max-w-[430px]">
                    <h3 className="text-[1.9rem] font-semibold leading-tight text-[#0F172A] md:text-[2rem]">
                      Need help choosing the right treatment?
                    </h3>
                    <p className="mt-2 text-base leading-8 text-[#64748B]">
                      Our experts will guide you to the best care plan for your
                      recovery.
                    </p>
                  </div>
                </div>

                <a
                  href="#appointment"
                  className="inline-flex min-h-[64px] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0F766E_0%,#10B981_100%)] px-9 text-lg font-semibold text-white shadow-[0_20px_40px_-20px_rgba(15,118,110,0.58)] transition hover:-translate-y-0.5"
                >
                  Talk to Expert
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
