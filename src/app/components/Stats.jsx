import {
  Activity,
  BrainCircuit,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";
import Container from "./Container";

const cards = [
  {
    icon: Activity,
    title: "Advanced mobility therapy",
    text: "Programs that rebuild balance, posture, and movement quality.",
  },
  {
    icon: ShieldCheck,
    title: "Injury recovery support",
    text: "Safe rehabilitation pathways after surgery and sports injuries.",
  },
  {
    icon: HeartPulse,
    title: "Pain relief treatment",
    text: "Manual therapy and guided care for back, neck, and joint pain.",
  },
  {
    icon: BrainCircuit,
    title: "Neuromuscular re-education",
    text: "Smarter training for coordination, strength, and functional recovery.",
  },
];

export default function Stats() {
  return (
    <section className="bg-white py-16 sm:py-20">
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
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#2563EB]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#0F172A]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#64748B]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
