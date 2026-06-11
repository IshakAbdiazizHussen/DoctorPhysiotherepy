import {
  CalendarClock,
  ChevronDown,
  Clock3,
  Phone,
  Stethoscope,
  User,
} from "lucide-react";
import Container from "./Container";

const schedule = ["10", "12", "2", "4", "6", "9"];

export default function Individual() {
  return (
    <section id="appointment" className="bg-white py-16 sm:py-20">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
              Consultation Care
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#0F172A] sm:text-4xl">
              One-to-one sessions focused on mobility, relief, and confidence.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#64748B]">
              Our clinic helps patients recover from injury, improve functional
              movement, and return to daily life with a practical, supportive
              treatment plan.
            </p>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
              Appointment
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#0F172A] sm:text-4xl">
              Book Your Appointment
            </h2>

            <div className="mt-7 flex flex-wrap gap-3">
              {schedule.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold transition ${
                    item === "2"
                      ? "border-[#2563EB] bg-[#EEF4FF] text-[#2563EB]"
                      : "border-slate-200 bg-white text-slate-500 hover:border-[#2563EB] hover:text-[#2563EB]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <form className="mt-7 space-y-4">
              <label className="flex items-center gap-3 rounded-full border border-slate-200 px-4 py-3 text-sm text-slate-500">
                <CalendarClock className="h-4 w-4 text-[#2563EB]" />
                <input
                  type="text"
                  placeholder="Appointment date"
                  className="w-full bg-transparent outline-none placeholder:text-slate-400"
                />
              </label>

              <label className="flex items-center gap-3 rounded-full border border-slate-200 px-4 py-3 text-sm text-slate-500">
                <User className="h-4 w-4 text-[#2563EB]" />
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full bg-transparent outline-none placeholder:text-slate-400"
                />
              </label>

              <label className="flex items-center gap-3 rounded-full border border-slate-200 px-4 py-3 text-sm text-slate-500">
                <Phone className="h-4 w-4 text-[#2563EB]" />
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full bg-transparent outline-none placeholder:text-slate-400"
                />
              </label>

              <label className="flex items-center gap-3 rounded-full border border-slate-200 px-4 py-3 text-sm text-slate-500">
                <Stethoscope className="h-4 w-4 text-[#2563EB]" />
                <span className="flex-1">Select service</span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </label>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#2563EB] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#2563EB]/20 transition hover:bg-[#1d4ed8]"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </article>
        </div>
      </Container>
    </section>
  );
}
