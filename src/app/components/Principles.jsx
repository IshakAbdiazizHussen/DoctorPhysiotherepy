import {
  BrainCircuit,
  HandHeart,
  ShieldCheck,
  Target,
  UserRound,
} from "lucide-react";
import Container from "./Container";

const principles = [
  {
    icon: UserRound,
    title: "Personalized Care",
    text: "Every treatment plan is tailored to your condition, movement goals, and recovery pace.",
  },
  {
    icon: BrainCircuit,
    title: "Clinical Expertise",
    text: "Our approach combines assessment, hands-on therapy, and progressive rehabilitation.",
  },
  {
    icon: ShieldCheck,
    title: "Safe Recovery",
    text: "We prioritize controlled movement, proper technique, and long-term physical resilience.",
  },
  {
    icon: HandHeart,
    title: "Compassionate Support",
    text: "We guide each patient with clarity, encouragement, and consistent follow-up care.",
  },
  {
    icon: Target,
    title: "Outcome Focused",
    text: "Pain reduction, improved mobility, and functional independence remain our core goals.",
  },
];

export default function Principles() {
  return (
    <section
      aria-labelledby="principles-heading"
      className="bg-[linear-gradient(180deg,_rgba(240,253,250,0.75)_0%,_rgba(248,250,252,1)_100%)] py-16"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
              Care Principles
            </p>
            <h2
              id="principles-heading"
              className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl"
            >
              A patient-first philosophy built around recovery, movement, and confidence.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Our physiotherapy model is designed to treat the source of pain,
              improve mobility, and help every patient return to everyday life
              with better strength and control.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {principles.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-3xl border border-white/80 bg-white p-6 shadow-sm shadow-slate-900/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-[#0F766E]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-950">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
