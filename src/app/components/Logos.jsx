import Container from "./Container";

export default function Logos() {
  const partners = [
    "Mobility Lab",
    "OrthoCare Network",
    "Active Recovery",
    "Wellness Alliance",
  ];

  return (
    <section className="py-16">
      <Container>
        <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
              Trusted Partners
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
              Supporting modern physiotherapy with trusted healthcare collaboration.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((partner) => (
              <div
                key={partner}
                className="flex min-h-24 items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 px-6 py-5 text-center text-base font-semibold text-slate-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-[#0F766E]"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
