"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CalendarPlus2,
  Check,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TimerReset,
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
    benefits: [
      "Improve mobility",
      "Reduce pain",
      "Faster recovery",
      "Better movement control",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Injury recovery support",
    text: "Safe rehabilitation pathways after surgery and sports injuries.",
    category: "Sports Injury",
    detail:
      "Structured recovery sessions that improve confidence after strains, tears, and post-surgical restrictions.",
    image: "/images/physio1.jpg",
    benefits: [
      "Restore confidence",
      "Reduce re-injury risk",
      "Safe guided progress",
      "Rebuild strength faster",
    ],
  },
  {
    icon: HeartPulse,
    title: "Pain relief treatment",
    text: "Manual therapy and guided care to reduce pain and inflammation.",
    category: "Pain Relief",
    detail:
      "Focused hands-on therapy combined with corrective exercise for recurring discomfort, inflammation, and reduced mobility.",
    image: "/images/physio2.jpg",
    benefits: [
      "Ease recurring pain",
      "Improve daily comfort",
      "Reduce inflammation",
      "Restore flexibility",
    ],
  },
  {
    icon: BrainCircuit,
    title: "Neuromuscular re-education",
    text: "Restoring movement, stability, and muscle control effectively.",
    category: "Rehabilitation",
    detail:
      "Designed to restore balance, control, and functional movement after injury or prolonged pain.",
    image: "/images/therepy.png",
    benefits: [
      "Better balance",
      "Improve coordination",
      "Support long-term recovery",
      "Rebuild movement patterns",
    ],
  },
];

const recoverySteps = [
  { icon: Stethoscope, label: "Assessment" },
  { icon: Activity, label: "Treatment" },
  { icon: TimerReset, label: "Progress Tracking" },
  { icon: Sparkles, label: "Recovery" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: "easeOut" },
};

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
        <div className="grid gap-12 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
          <motion.div className="max-w-2xl" {...fadeInUp}>
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
                <motion.button
                  key={category}
                  type="button"
                  onClick={() => onCategoryChange(category)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`shrink-0 rounded-full px-6 py-3 text-base font-medium transition ${
                    selectedCategory === category
                      ? "bg-[#2563EB] text-white shadow-[0_18px_35px_-20px_rgba(37,99,235,0.55)]"
                      : "border border-slate-200 bg-white text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB]"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div className="space-y-6" {...fadeInUp}>
            <div className="grid gap-5 md:grid-cols-2">
              {visibleCards.map(({ icon: Icon, title, text }) => {
                const isActive = selectedService === title;

                return (
                  <motion.button
                    key={title}
                    type="button"
                    onClick={() => onServiceSelect(title)}
                    whileHover={{ y: -6, scale: isActive ? 1.01 : 1.015 }}
                    whileTap={{ scale: 0.99 }}
                    className={`group relative rounded-[2rem] border bg-white p-8 text-left transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                      isActive
                        ? "scale-[1.015] border-[#2563EB] shadow-[0_30px_80px_-30px_rgba(37,99,235,0.3)]"
                        : "border-slate-200 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.22)] hover:border-[#BFDBFE] hover:shadow-[0_28px_60px_-30px_rgba(37,99,235,0.18)]"
                    }`}
                  >
                    {isActive ? (
                      <span className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-[0_18px_30px_-20px_rgba(37,99,235,0.8)]">
                        <Check className="h-4 w-4" />
                      </span>
                    ) : null}

                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full transition ${
                        isActive
                          ? "bg-[#EAF1FF] text-[#2563EB]"
                          : "bg-[#EEF4FF] text-[#2563EB] group-hover:bg-[#E6F0FF]"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-7 text-[1.75rem] font-semibold leading-tight text-[#0F172A]">
                      {title}
                    </h3>
                    <p className="mt-4 text-lg leading-8 text-[#64748B]">{text}</p>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="overflow-hidden rounded-[2rem] border border-[#CFE0FF] bg-[linear-gradient(135deg,#F8FBFF_0%,#F2F8FF_55%,#EEF6FF_100%)] p-6 shadow-[0_32px_80px_-40px_rgba(37,99,235,0.25)] backdrop-blur-sm md:p-7"
              >
                <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                  <div className="absolute -left-12 top-10 h-32 w-32 rounded-full bg-[#DCEBFF]/55 blur-2xl" />
                  <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#E4FFF2]/55 blur-3xl" />
                  <div className="absolute right-[22%] top-7 hidden h-3 w-3 rounded-full bg-[#BFDBFE] lg:block" />
                  <div className="absolute right-[28%] top-16 hidden text-[#A7C5FF] lg:block">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-white/70 bg-white/75 text-[#2563EB] shadow-[0_18px_35px_-24px_rgba(37,99,235,0.35)] backdrop-blur">
                      <ActiveIcon className="h-7 w-7" />
                    </div>

                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-[#2563EB]">
                      Featured Treatment Experience
                    </p>
                    <h3 className="mt-3 text-[2rem] font-semibold leading-tight text-[#0F172A] sm:text-[2.25rem]">
                      {activeService.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-[1.05rem] leading-8 text-[#64748B]">
                      {activeService.detail}
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {activeService.benefits.map((benefit) => (
                        <div
                          key={benefit}
                          className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/55 px-4 py-3 text-sm font-medium text-[#334155] backdrop-blur"
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
                            <Check className="h-4 w-4" />
                          </span>
                          {benefit}
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => onServiceSelect(activeService.title)}
                      className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-[#2563EB] shadow-[0_18px_35px_-24px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:gap-3"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="relative z-10 mx-auto flex min-h-[320px] w-full max-w-[320px] items-center justify-center lg:max-w-none">
                    <div className="absolute inset-4 rounded-full border border-[#D4E4FF]" />
                    <div className="absolute inset-10 rounded-full border border-[#E6F0FF]" />
                    <div className="absolute inset-0 rounded-[2.25rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.85)_0%,rgba(238,246,255,0.48)_55%,transparent_100%)]" />
                    <div className="absolute right-6 top-7 flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/80 text-[#10B981] shadow-sm">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div className="absolute bottom-7 left-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/80 text-[#2563EB] shadow-sm">
                      <Activity className="h-5 w-5" />
                    </div>
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                      className="relative flex h-[250px] w-[220px] items-center justify-center rounded-[2.1rem] border border-white/60 bg-white/42 p-4 shadow-[0_25px_60px_-30px_rgba(37,99,235,0.25)] backdrop-blur md:h-[270px] md:w-[235px]"
                    >
                      <Image
                        src={activeService.image}
                        alt={`${activeService.title} treatment preview`}
                        width={210}
                        height={250}
                        className="h-full w-full rounded-[1.5rem] object-contain object-center"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-[2rem] border border-[#B7E8D5] bg-[linear-gradient(135deg,#ECFDF5_0%,#F3FFFB_52%,#F8FAFC_100%)] p-6 shadow-[0_24px_50px_-36px_rgba(15,118,110,0.28)]"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-4 ring-white/70">
                      <Image
                        src="/images/female.jpg"
                        alt="Doctor available for consultation"
                        fill
                        className="object-cover"
                      />
                      <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#10B981]" />
                    </div>
                    <div>
                      <h3 className="text-[1.45rem] font-semibold leading-tight text-[#0F172A]">
                        Not sure which treatment is right for you?
                      </h3>
                      <p className="mt-2 max-w-[34rem] text-base leading-7 text-[#64748B]">
                        Our physiotherapy specialists can recommend a
                        personalized recovery plan in under 2 minutes.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3 text-sm font-medium text-[#0F766E]">
                        {[
                          "Free consultation",
                          "Expert assessment",
                          "Personalized treatment plan",
                        ].map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-[#B7E8D5] bg-white/70 px-4 py-2"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <a
                    href="#appointment"
                    className="inline-flex min-h-[58px] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0F766E_0%,#10B981_100%)] px-8 text-base font-semibold text-white shadow-[0_20px_40px_-20px_rgba(15,118,110,0.58)] transition hover:-translate-y-0.5"
                  >
                    Talk to a Specialist
                  </a>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-[2rem] border border-[#D8E4FF] bg-white p-6 shadow-[0_24px_60px_-38px_rgba(15,23,42,0.22)]"
              >
                <h3 className="text-xl font-semibold text-[#0F172A]">
                  Typical Recovery Journey
                </h3>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                  {recoverySteps.map(({ icon: Icon, label }, index) => (
                    <div key={label} className="relative flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EEF4FF] text-[#2563EB]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-sm font-medium text-[#334155]">{label}</div>
                      {index < recoverySteps.length - 1 ? (
                        <div className="absolute left-[21px] top-11 h-8 w-px bg-gradient-to-b from-[#93C5FD] to-[#DCEBFF] sm:hidden lg:block" />
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className="mt-6 hidden items-center gap-3 lg:flex">
                  {recoverySteps.map(({ label }, index) => (
                    <div key={label} className="flex flex-1 items-center gap-3">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#2563EB]" />
                      {index < recoverySteps.length - 1 ? (
                        <span className="h-px flex-1 bg-gradient-to-r from-[#93C5FD] to-[#DCEBFF]" />
                      ) : (
                        <span className="flex-1" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
