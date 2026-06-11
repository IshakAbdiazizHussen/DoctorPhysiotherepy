import {
  Activity,
  Dumbbell,
  MoveRight,
  ShieldPlus,
  Sparkles,
  Waves,
} from "lucide-react";
import Container from "./Container";

const services = [
  {
    icon: Activity,
    title: "Pain Relief Therapy",
    description:
      "Targeted treatment for neck pain, back pain, joint stiffness, and recurring muscle discomfort.",
  },
  {
    icon: Dumbbell,
    title: "Sports Injury Recovery",
    description:
      "Progressive rehabilitation plans that restore strength, control, and confidence after injury.",
  },
  {
    icon: Waves,
    title: "Mobility & Flexibility",
    description:
      "Hands-on therapy and guided movement sessions to improve daily function and reduce restriction.",
  },
  {
    icon: ShieldPlus,
    title: "Post-Surgery Rehabilitation",
    description:
      "Structured support that helps patients regain movement safely after orthopedic procedures.",
  },
  {
    icon: Sparkles,
    title: "Personalized Wellness Care",
    description:
      "Individual treatment programs built around your condition, goals, and recovery timeline.",
  },
  {
    icon: Activity,
    title: "Neuromuscular Re-education",
    description:
      "Therapeutic exercises that retrain posture, balance, coordination, and controlled movement.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-16"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
            Our Services
          </p>
          <h2
            id="services-heading"
            className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl"
          >
            Modern physiotherapy solutions designed around recovery and long-term movement.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            We combine clinical assessment, evidence-based treatment, and
            patient-specific rehabilitation to help you heal safely and
            effectively.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-teal-200 hover:shadow-2xl hover:shadow-teal-900/5"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-[#14B8A6] transition group-hover:bg-teal-100 group-hover:text-[#0F766E]">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-950">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {description}
              </p>
              <a
                href="#individual-treatment"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0F766E] transition hover:text-[#14B8A6]"
              >
                Learn more
                <MoveRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
