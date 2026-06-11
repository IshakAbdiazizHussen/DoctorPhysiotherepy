"use client";

import {
  CalendarClock,
  ChevronDown,
  Clock3,
  CreditCard,
  Phone,
  Stethoscope,
  User,
} from "lucide-react";
import Container from "./Container";

const schedule = ["10", "12", "2", "4", "6", "9"];

const serviceOptions = [
  "Advanced mobility therapy",
  "Injury recovery support",
  "Pain relief treatment",
  "Neuromuscular re-education",
];

export default function Individual({
  selectedDate,
  onDateSelect,
  selectedService,
  onServiceSelect,
  selectedDoctor,
  formValues,
  formErrors,
  onInputChange,
  onSubmit,
  isSubmitting,
  successMessage,
}) {
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

            <div className="mt-8 rounded-[1.5rem] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
                <Clock3 className="h-4 w-4 text-[#2563EB]" />
                Opening Hours
              </div>
              <div className="mt-4 space-y-3 text-sm text-[#64748B]">
                <div className="flex items-center justify-between">
                  <span>Mon - Fri</span>
                  <span className="font-medium text-[#0F172A]">8:00 AM - 7:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Saturday</span>
                  <span className="font-medium text-[#0F172A]">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-[#0F172A]">Emergency only</span>
                </div>
              </div>
            </div>
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
                  onClick={() => onDateSelect(item)}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold transition ${
                    item === selectedDate
                      ? "border-[#2563EB] bg-[#EEF4FF] text-[#2563EB]"
                      : "border-slate-200 bg-white text-slate-500 hover:border-[#2563EB] hover:text-[#2563EB]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            {formErrors.date ? (
              <p className="mt-3 text-sm text-red-600">{formErrors.date}</p>
            ) : null}

            <form className="mt-7 space-y-4" onSubmit={onSubmit} noValidate>
              <label className="flex items-center gap-3 rounded-full border border-slate-200 px-4 py-3 text-sm text-slate-500">
                <CalendarClock className="h-4 w-4 text-[#2563EB]" />
                <span className="w-full text-[#0F172A]">
                  Preferred time: {selectedDate}:00
                </span>
              </label>

              <label
                className={`flex items-center gap-3 rounded-full border px-4 py-3 text-sm text-slate-500 ${
                  formErrors.name ? "border-red-400" : "border-slate-200"
                }`}
              >
                <User className="h-4 w-4 text-[#2563EB]" />
                <input
                  type="text"
                  placeholder="Your full name"
                  value={formValues.name}
                  onChange={(event) => onInputChange("name", event.target.value)}
                  className="w-full bg-transparent outline-none placeholder:text-slate-400"
                  aria-invalid={Boolean(formErrors.name)}
                />
              </label>
              {formErrors.name ? (
                <p className="text-sm text-red-600">{formErrors.name}</p>
              ) : null}

              <label
                className={`flex items-center gap-3 rounded-full border px-4 py-3 text-sm text-slate-500 ${
                  formErrors.phone ? "border-red-400" : "border-slate-200"
                }`}
              >
                <Phone className="h-4 w-4 text-[#2563EB]" />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={formValues.phone}
                  onChange={(event) => onInputChange("phone", event.target.value)}
                  className="w-full bg-transparent outline-none placeholder:text-slate-400"
                  aria-invalid={Boolean(formErrors.phone)}
                />
              </label>
              {formErrors.phone ? (
                <p className="text-sm text-red-600">{formErrors.phone}</p>
              ) : null}

              <label className="flex items-center gap-3 rounded-full border border-slate-200 px-4 py-3 text-sm text-slate-500">
                <Stethoscope className="h-4 w-4 text-[#2563EB]" />
                <select
                  value={selectedService}
                  onChange={(event) => onServiceSelect(event.target.value)}
                  className="w-full bg-transparent text-[#0F172A] outline-none"
                >
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </label>
              {formErrors.service ? (
                <p className="text-sm text-red-600">{formErrors.service}</p>
              ) : null}

              <label className="flex items-center gap-3 rounded-full border border-slate-200 px-4 py-3 text-sm text-slate-500">
                <User className="h-4 w-4 text-[#2563EB]" />
                <span className="w-full text-[#0F172A]">
                  Selected doctor: {selectedDoctor}
                </span>
              </label>
              {formErrors.doctor ? (
                <p className="text-sm text-red-600">{formErrors.doctor}</p>
              ) : null}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#2563EB] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#2563EB]/20 transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Book Appointment"}
                </button>
              </div>
            </form>
            {successMessage ? (
              <p className="mt-4 rounded-[1rem] bg-[#DCFCE7] px-4 py-3 text-sm font-medium text-[#166534]">
                {successMessage}
              </p>
            ) : null}

            <div className="mt-6 rounded-[1.5rem] bg-[#F8FAFC] p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
                <CreditCard className="h-4 w-4 text-[#16A34A]" />
                Insurance Accepted
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Aetna", "Cigna", "BlueCross", "Medicare"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-[#64748B]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
