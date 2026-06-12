"use client";

import Image from "next/image";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Check,
  ChevronRight,
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
      "Ideal for posture correction, restoring stability, and strength rebuilding to improve movement and flexibility.",
    image: "/images/therepy.png",
  },
  {
    icon: ShieldCheck,
    title: "Injury recovery support",
    text: "Safe rehabilitation pathways after surgery and sports injuries.",
    category: "Sports Injury",
    detail:
      "Focused support for post-injury rehabilitation with structured care that restores confidence and movement safely.",
    image: "/images/physio1.jpg",
  },
  {
    icon: HeartPulse,
    title: "Pain relief treatment",
    text: "Manual therapy and guided care to reduce pain and inflammation.",
    category: "Pain Relief",
    detail:
      "Personalized treatment sessions designed to relieve inflammation, reduce pain, and support comfortable daily movement.",
    image: "/images/physio2.jpg",
  },
  {
    icon: BrainCircuit,
    title: "Neuromuscular re-education",
    text: "Restoring movement, stability, and muscle control effectively.",
    category: "Rehabilitation",
    detail:
      "Restorative therapy that improves balance, control, and movement patterns for lasting physical recovery.",
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
  const visibleCards =
    selectedCategory === "All"
      ? cards
      : cards.filter((card) => card.category === selectedCategory);

  const activeCards = visibleCards.length > 0 ? visibleCards : cards;
  const activeService =
    cards.find((card) => card.title === selectedService) ?? activeCards[0] ?? cards[0];
  const ActiveIcon = activeService.icon;

  return (
    <section id="services" className="bg-white py-16 sm:py-24 lg:py-28">
      <Container className="max-w-[1120px]">
        <div className="grid gap-10 xl:grid-cols-[0.92fr_1fr] xl:gap-12">
          <div className="space-y-7">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#3366F5]">
                Doctor <span className="text-[#14B8A6]">+</span>
              </p>

              <h2 className="mt-5 max-w-[8ch] text-[3.2rem] font-bold leading-[0.93] tracking-[-0.05em] text-[#18233d] sm:text-[4.4rem] lg:text-[5.2rem]">
                Personalized physiotherapy and rehabilitation care built around{" "}
                <span className="text-[#147c7a]">your recovery.</span>
              </h2>

              <p className="mt-5 max-w-[34rem] text-[15px] leading-8 text-[#73839f]">
                Our clinic combines evidence-based treatment, mobility restoration,
                and one-to-one recovery planning so every patient receives focused
                support for pain relief and long-term wellness.
              </p>
            </div>

            <div className="flex items-center gap-3 text-[15px] text-[#73839f]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#dff9eb] text-[#22c55e]">
                <Check className="h-4 w-4" />
              </span>
              <span>
                More than <span className="font-semibold text-[#3366F5]">3,500</span>{" "}
                patients supported
              </span>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => onCategoryChange(category)}
                  className={`shrink-0 rounded-full border px-5 py-3 text-[13px] font-medium ${
                    selectedCategory === category
                      ? "border-[#3366F5] bg-[#3366F5] text-white shadow-[0_16px_28px_-18px_rgba(51,102,245,0.7)]"
                      : "border-[#d9e2f2] bg-white text-[#73839f]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-[30px] border border-[#d5e4ff] bg-[linear-gradient(135deg,#f5f9ff_0%,#edf4ff_58%,#e8f7f6_100%)] p-6 shadow-[0_30px_70px_-48px_rgba(51,102,245,0.45)] sm:p-8">
              <div className="pointer-events-none absolute right-10 top-10 h-32 w-32 rounded-full border border-[#dbe8ff]" />
              <div className="pointer-events-none absolute right-4 top-4 h-44 w-44 rounded-full border border-[#edf4ff]" />

              <div className="relative grid gap-7 lg:grid-cols-[1fr_220px] lg:items-center">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-[#3366F5] shadow-sm">
                    <ActiveIcon className="h-5 w-5" />
                  </div>

                  <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#3366F5]">
                    Featured Treatment Experience
                  </p>
                  <h3 className="mt-3 max-w-[11ch] text-[2rem] font-bold leading-[1.04] tracking-[-0.03em] text-[#18233d] sm:text-[2.35rem]">
                    {activeService.title}
                  </h3>
                  <p className="mt-4 max-w-[27rem] text-[15px] leading-8 text-[#73839f]">
                    {activeService.detail}
                  </p>

                  <button
                    type="button"
                    onClick={() => onServiceSelect(activeService.title)}
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-medium text-[#3366F5] shadow-[0_18px_30px_-24px_rgba(51,102,245,0.55)]"
                  >
                    Learn More
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="relative mx-auto flex h-[220px] w-[180px] items-center justify-center sm:h-[250px] sm:w-[200px]">
                  <div className="absolute inset-2 rounded-full border border-[#dbe8ff]" />
                  <div className="absolute inset-7 rounded-full border border-[#ebf3ff]" />
                  <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/75 p-3 shadow-[0_26px_48px_-32px_rgba(51,102,245,0.38)]">
                    <Image
                      src={activeService.image}
                      alt={`${activeService.title} treatment illustration`}
                      width={180}
                      height={220}
                      className="h-[190px] w-[150px] rounded-[20px] object-cover sm:h-[220px] sm:w-[170px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              {activeCards.slice(0, 4).map(({ icon: Icon, title, text }) => {
                const isActive = title === activeService.title;

                return (
                  <button
                    key={title}
                    type="button"
                    onClick={() => onServiceSelect(title)}
                    className={`relative rounded-[24px] border bg-white p-6 text-left ${
                      isActive
                        ? "border-[#7da5ff] shadow-[0_24px_48px_-38px_rgba(51,102,245,0.5)]"
                        : "border-[#e5ebf5] shadow-[0_22px_40px_-38px_rgba(15,23,42,0.28)]"
                    }`}
                  >
                    {isActive ? (
                      <span className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#3366F5] text-white">
                        <Check className="h-4 w-4" />
                      </span>
                    ) : null}

                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef4ff] text-[#3366F5]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 max-w-[10ch] text-[1.08rem] font-bold leading-[1.2] text-[#18233d] sm:text-[1.22rem]">
                      {title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-8 text-[#73839f]">{text}</p>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-5 rounded-[28px] border border-[#cbeee7] bg-[linear-gradient(135deg,#effcf6_0%,#f3fbf8_100%)] px-5 py-5 shadow-[0_24px_50px_-42px_rgba(20,184,166,0.45)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src="/images/female.jpg"
                    alt="Physiotherapy specialist"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="max-w-[15ch] text-[1.12rem] font-bold leading-[1.25] text-[#18233d]">
                    Not sure which treatment is right for you?
                  </h3>
                  <p className="mt-1 text-[14px] leading-7 text-[#73839f]">
                    Our physiotherapy specialists can recommend a recovery plan in
                    under 2 minutes.
                  </p>
                </div>
              </div>

              <a
                href="#appointment"
                className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-[#0f8a78] px-6 text-[14px] font-semibold text-white shadow-[0_18px_28px_-20px_rgba(15,138,120,0.7)]"
              >
                Talk to a Specialist
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Scroll doctors left"
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#e5ebf5] bg-white text-[#73839f] md:inline-flex"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Scroll doctors right"
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#e5ebf5] bg-white text-[#73839f] md:inline-flex"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-5 flex gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {doctors.map(({ name, specialty, image }) => {
              const isSelected = selectedDoctor === name;

              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => onDoctorSelect(name)}
                  className={`shrink-0 overflow-hidden rounded-[24px] border bg-white text-left shadow-[0_24px_44px_-40px_rgba(15,23,42,0.32)] ${
                    isSelected ? "border-[#bde8d8]" : "border-[#e5ebf5]"
                  } w-[200px]`}
                >
                  <div className="relative h-[116px] bg-[#f4f7fb]">
                    <Image
                      src={image}
                      alt={`${name} portrait`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-3 px-4 py-4">
                    <div>
                      <h3 className="text-[1.02rem] font-bold leading-tight text-[#18233d]">
                        {name}
                      </h3>
                      <p className="mt-1 text-[13px] text-[#8a97af]">{specialty}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold ${
                          isSelected
                            ? "bg-[#e5fbf1] text-[#158f63]"
                            : "bg-[#eef4ff] text-[#3366F5]"
                        }`}
                      >
                        Available
                      </span>

                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f8fc] text-[#3366F5]">
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
