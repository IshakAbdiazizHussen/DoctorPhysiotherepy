import Image from "next/image";
import Container from "./Container";

export default function Individual() {
  return (
    <section
      id="individual-treatment"
      aria-labelledby="individual-treatment-heading"
      className="py-16"
    >
      <Container>
        <div className="grid gap-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)] sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:p-10">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-100">
            <Image
              src="/images/portM.jpg"
              alt="Patient receiving personalized physiotherapy guidance"
              width={900}
              height={1000}
              className="h-[340px] w-full object-cover sm:h-[420px] lg:h-[520px]"
            />
          </div>

          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
              Individual Treatment
            </p>
            <h2
              id="individual-treatment-heading"
              className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl"
            >
              Personalized rehabilitation that fits your body, goals, and recovery journey.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              We begin with a careful assessment of movement limitations, pain
              patterns, and strength deficits. From there, we build a focused
              plan that combines manual therapy, guided exercise, and progress
              tracking to support safe and lasting improvement.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-950">
                  1:1 Assessment
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Detailed evaluations to identify the cause of pain and movement restriction.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-950">
                  Tailored Exercise Plan
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Progressive routines built to improve mobility, strength, and day-to-day function.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
