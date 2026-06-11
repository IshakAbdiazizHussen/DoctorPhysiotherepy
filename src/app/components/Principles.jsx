import Image from "next/image";
import Container from "./Container";

export default function Principles() {
  return (
    <section id="rehabilitation" className="bg-white py-16 sm:py-20">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="overflow-hidden rounded-[2rem] bg-[#EEF6FF] shadow-sm">
            <div className="grid h-full gap-6 p-8 sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
                  Better Recovery
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#0F172A] sm:text-4xl">
                  We help you move better and live better.
                </h2>
                <p className="mt-5 text-base leading-8 text-[#64748B]">
                  Our rehabilitation programs are designed to reduce pain,
                  improve mobility, and support strength recovery with calm,
                  personalized care at every stage.
                </p>
              </div>

              <div className="relative min-h-[260px] overflow-hidden rounded-[1.6rem] bg-white/60">
                <Image
                  src="/images/female.jpg"
                  alt="Doctor smiling during a patient consultation"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="grid h-full gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
                  Recovery Focus
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-[#0F172A] sm:text-3xl">
                  Evidence-based treatment for pain relief and mobility restoration.
                </h3>
                <p className="mt-4 text-base leading-8 text-[#64748B]">
                  Every session is tailored to your body, goals, and lifestyle so
                  progress feels steady, supported, and sustainable.
                </p>
              </div>

              <div className="relative min-h-[240px] overflow-hidden rounded-[1.6rem] bg-[#F8FAFC]">
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
