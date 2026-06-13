import Image from "next/image";
import Container from "./Container";

export default function Principles() {
  return (
    <section id="rehabilitation" className="bg-white py-16 sm:py-20 dark:bg-[#020617]">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="overflow-hidden rounded-[2rem] bg-[#EEF6FF] shadow-sm dark:bg-[#0F172A] dark:shadow-[0_24px_44px_-34px_rgba(2,6,23,0.85)]">
            <div className="grid h-full gap-6 p-8 sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB] dark:text-[#60A5FA]">
                  Better Recovery
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl">
                  We help you move better and live better.
                </h2>
                <p className="mt-5 text-base leading-8 text-[#64748B] dark:text-[#94A3B8]">
                  Our rehabilitation programs are designed to reduce pain,
                  improve mobility, and support strength recovery with calm,
                  personalized care at every stage.
                </p>
              </div>

              <div className="relative min-h-[260px] overflow-hidden rounded-[1.6rem] bg-white/60 dark:bg-[rgba(17,24,39,0.72)]">
                <Image
                  src="/images/female.jpg"
                  alt="Doctor smiling during a patient consultation"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-[#1E293B] dark:bg-[#111827] dark:shadow-[0_24px_44px_-34px_rgba(2,6,23,0.85)] sm:p-8">
            <div className="grid h-full gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB] dark:text-[#60A5FA]">
                  Recovery Focus
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-[#0F172A] dark:text-[#F8FAFC] sm:text-3xl">
                  Evidence-based treatment for pain relief and mobility restoration.
                </h3>
                <p className="mt-4 text-base leading-8 text-[#64748B] dark:text-[#94A3B8]">
                  Every session is tailored to your body, goals, and lifestyle so
                  progress feels steady, supported, and sustainable.
                </p>
              </div>

              <div className="relative min-h-[240px] overflow-hidden rounded-[1.6rem] bg-[#F8FAFC] dark:bg-[#0F172A]">
                <Image
                  src="/images/physio1.jpg"
                  alt="Healthcare professional in a modern clinic interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
