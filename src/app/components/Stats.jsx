import {
  Award,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import Container from "./Container";

const stats = [
  {
    icon: Stethoscope,
    value: "48+",
    label: "Certified Specialists",
  },
  {
    icon: Award,
    value: "27+",
    label: "Years Experience",
  },
  {
    icon: HeartPulse,
    value: "3,500+",
    label: "Patients Treated",
  },
  {
    icon: ShieldCheck,
    value: "98%",
    label: "Recovery Satisfaction",
  },
];

export default function Stats() {
  return (
    <section aria-labelledby="stats-heading" className="py-16">
      <Container>
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
            Recovery Outcomes
          </p>
          <h2
            id="stats-heading"
            className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl"
          >
            Trusted care backed by measurable results and long-standing clinical experience.
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <article
              key={label}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-[#0F766E] transition group-hover:bg-teal-100">
                <Icon className="h-6 w-6" />
              </div>
              <p className="mt-5 text-3xl font-semibold text-slate-950">
                {value}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{label}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
