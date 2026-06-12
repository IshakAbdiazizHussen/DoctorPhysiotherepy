"use client";

import Image from "next/image";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronRight,
  HeartPulse,
  MessageCircleMore,
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
      "Ideal for posture correction, restoring stability, and strength rebuilding to improve movement and flexibility.",
    image: "/images/therepy.png",
  },
  {
    icon: ShieldCheck,
    title: "Injury recovery support",
    text: "Safe rehabilitation pathways after surgery and sports injuries.",
    category: "Sports Injury",
    detail:
      "Safe rehabilitation pathways for surgery recovery, sports injuries, and guided return-to-movement care.",
    image: "/images/physio1.jpg",
  },
  {
    icon: HeartPulse,
    title: "Pain relief treatment",
    text: "Manual therapy and guided care to reduce pain and inflammation.",
    category: "Pain Relief",
    detail:
      "Manual therapy and guided treatment designed to reduce inflammation, restore comfort, and improve flexibility.",
    image: "/images/physio2.jpg",
  },
  {
    icon: BrainCircuit,
    title: "Neuromuscular re-education",
    text: "Restoring movement, stability, and muscle control effectively.",
    category: "Rehabilitation",
    detail:
      "Restoring movement, stability, and muscle control with focused rehabilitation support and structured progress.",
    image: "/images/physio.jpg",
  },
];

const doctors = [
  {
    name: "Dr. Sarah Wilson",
    specialty: "Physiotherapist",
    image: "/images/female.jpg",
  },
  {
    name: "Dr. James Carter",
    specialty: "Rehabilitation Expert",
    image: "/images/physio1.jpg",
  },
  {
    name: "Dr. Emily Brown",
    specialty: "Sports Therapist",
    image: "/images/physio2.jpg",
  },
  {
    name: "Dr. Michael Lee",
    specialty: "Movement Specialist",
    image: "/images/portM.jpg",
  },
  {
    name: "Dr. Olivia Harris",
    specialty: "Pain Management",
    image: "/images/physio.jpg",
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

  const gridCards = filteredCards.length === 4 ? filteredCards : cards;
  const activeService =
    cards.find((card) => card.title === selectedService) ?? cards[0];
  const ActiveIcon = activeService.icon;

  return (
    <section id="services" className="bg-white py-16 sm:py-20 lg:py-24">
      <Container className="max-w-[1400px] px-5 sm:px-8 xl:px-12">
        <div className="grid items-start gap-12 xl:grid-cols-[1.03fr_1.07fr] xl:gap-16">
          <div className="pt-2">
            <p className="text-[12px] font-semibold uppercase tracking-[0.38em] text-[#2f66f3]">
              Doctor <span className="text-[#27c1b7]">+</span>
            </p>

            <h2 className="mt-6 max-w-[8.7ch] text-[3.45rem] font-semibold leading-[0.98] tracking-[-0.055em] text-[#17233f] sm:text-[4.5rem] lg:text-[5.65rem]">
              Personalized physiotherapy and rehabilitation care built around{" "}
              <span className="relative inline-block text-[#148a89]">
                your recovery.
                <span className="absolute bottom-1 left-1/2 h-[4px] w-[88%] -translate-x-1/2 rounded-full bg-[#1ab5a8]" />
              </span>
            </h2>

            <p className="mt-8 max-w-[35rem] text-[16px] leading-[2.1] text-[#67789b]">
              Our clinic combines evidence-based treatment, mobility restoration,
              and one-to-one recovery planning so every patient receives focused
              support for pain relief and long-term wellness.
            </p>

            <div className="mt-8 flex items-center gap-4 text-[16px] text-[#67789b]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0f8a78] text-white shadow-[0_12px_24px_-18px_rgba(15,138,120,0.8)]">
                <Check className="h-4 w-4" />
              </span>
              <span>
                More than <span className="font-semibold text-[#2f66f3]">3,500</span>{" "}
                patients supported
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => onCategoryChange(category)}
                  className={`rounded-full border px-6 py-3 text-[15px] font-medium shadow-[0_14px_30px_-28px_rgba(23,35,63,0.32)] ${
                    selectedCategory === category
                      ? "border-[#2f66f3] bg-[#2f66f3] text-white shadow-[0_18px_28px_-20px_rgba(47,102,243,0.65)]"
                      : "border-[#dfe6f2] bg-white text-[#5f6f8f]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative mt-8 overflow-hidden rounded-[28px] border border-[#cfe0ff] bg-[linear-gradient(180deg,#f4f8ff_0%,#eef5ff_62%,#eef8ff_100%)] px-6 py-6 shadow-[0_34px_70px_-52px_rgba(72,113,214,0.45)] sm:px-8 sm:py-7">
              <div className="pointer-events-none absolute right-8 top-4 h-36 w-36 rounded-full border border-[#dce7fb]" />
              <div className="pointer-events-none absolute right-14 top-0 h-48 w-48 rounded-full border border-[#edf3ff]" />

              <div className="relative grid items-center gap-6 md:grid-cols-[1fr_190px]">
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#2f66f3] shadow-[0_12px_28px_-22px_rgba(47,102,243,0.6)]">
                    <ActiveIcon className="h-6 w-6" />
                  </div>

                  <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.34em] text-[#2f66f3]">
                    Selected Treatment
                  </p>
                  <h3 className="mt-3 max-w-[12ch] text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.04em] text-[#17233f] sm:text-[2.25rem]">
                    {activeService.title}
                  </h3>
                  <p className="mt-3 max-w-[31rem] text-[15px] leading-[1.95] text-[#67789b]">
                    {activeService.detail}
                  </p>

                  <button
                    type="button"
                    onClick={() => onServiceSelect(activeService.title)}
                    className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-[#2f66f3]"
                  >
                    Learn more
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="relative mx-auto flex h-[172px] w-[172px] items-center justify-center">
                  <div className="absolute inset-2 rounded-full border border-[#dce7fb]" />
                  <div className="absolute inset-5 rounded-full border border-[#eaf1ff]" />
                  <Image
                    src={activeService.image}
                    alt={`${activeService.title} illustration`}
                    width={170}
                    height={170}
                    className="relative h-[156px] w-[156px] object-contain opacity-95"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              {gridCards.slice(0, 4).map(({ icon: Icon, title, text }) => {
                const isActive = title === activeService.title;

                return (
                  <button
                    key={title}
                    type="button"
                    onClick={() => onServiceSelect(title)}
                    className={`relative min-h-[224px] rounded-[28px] border bg-white px-8 py-7 text-left shadow-[0_24px_44px_-38px_rgba(22,34,62,0.26)] ${
                      isActive ? "border-[#2f66f3]" : "border-[#e6edf7]"
                    }`}
                  >
                    {isActive ? (
                      <span className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#2f66f3] text-white">
                        <Check className="h-4 w-4" />
                      </span>
                    ) : null}

                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#edf3ff] text-[#2f66f3]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-7 max-w-[11ch] text-[1.2rem] font-semibold leading-[1.22] text-[#17233f]">
                      {title}
                    </h3>
                    <p className="mt-4 max-w-[19rem] text-[15px] leading-[1.95] text-[#67789b]">
                      {text}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-5 rounded-[28px] border border-[#ccefe8] bg-[linear-gradient(180deg,#f2fdf8_0%,#f6fffb_100%)] px-6 py-7 shadow-[0_28px_54px_-44px_rgba(18,167,133,0.45)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div className="flex items-center gap-5">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#dcf7eb] text-[#13a57d]">
                  <CalendarDays className="h-6 w-6" />
                </span>

                <div>
                  <h3 className="text-[1.22rem] font-semibold leading-tight text-[#17233f]">
                    Need help choosing the right treatment?
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.8] text-[#67789b]">
                    Our experts will guide you to the best care plan for your
                    recovery.
                  </p>
                </div>
              </div>

              <a
                href="#appointment"
                className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#10b981_0%,#0e9f78_100%)] px-8 text-[15px] font-semibold text-white shadow-[0_18px_28px_-18px_rgba(16,185,129,0.68)]"
              >
                <MessageCircleMore className="h-4 w-4" />
                Talk to Expert
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {doctors.map(({ name, specialty, image }) => {
              const isSelected = selectedDoctor === name;

              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => onDoctorSelect(name)}
                  className="flex items-center gap-4 rounded-[24px] border border-[#e7edf7] bg-white px-5 py-4 text-left shadow-[0_24px_40px_-38px_rgba(22,34,62,0.28)]"
                >
                  <div className="relative h-[74px] w-[74px] shrink-0 overflow-hidden rounded-full bg-[#f3f6fb]">
                    <Image
                      src={image}
                      alt={`${name} portrait`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-[1.04rem] font-semibold text-[#17233f]">
                      {name}
                    </h3>
                    <p className="mt-1 truncate text-[14px] text-[#6f7f9d]">{specialty}</p>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[13px] font-medium ${
                          isSelected
                            ? "bg-[#dcf7eb] text-[#14996e]"
                            : "bg-[#e6faef] text-[#14996e]"
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" />
                        Available
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e7edf7] text-[#17233f]">
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-10">
            <button
              type="button"
              aria-label="Previous doctors"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e7edf7] bg-white text-[#17233f] shadow-[0_20px_34px_-30px_rgba(22,34,62,0.26)]"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#2f66f3]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#d7deea]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#d7deea]" />
            </div>

            <button
              type="button"
              aria-label="Next doctors"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e7edf7] bg-white text-[#17233f] shadow-[0_20px_34px_-30px_rgba(22,34,62,0.26)]"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
