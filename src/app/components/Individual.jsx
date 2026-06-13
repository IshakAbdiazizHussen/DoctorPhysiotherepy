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
    <section id="appointment" className="bg-white py-16 sm:py-20 dark:bg-[#020617]">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm dark:border-[#1E293B] dark:bg-[#0F172A] dark:shadow-[0_24px_44px_-34px_rgba(2,6,23,0.85)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB] dark:text-[#60A5FA]">
              Consultation Care
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl">
              One-to-one sessions focused on mobility, relief, and confidence.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#64748B] dark:text-[#94A3B8]">
              Our clinic helps patients recover from injury, improve functional
              movement, and return to daily life with a practical, supportive
              treatment plan.
            </p>

            <div className="mt-8 rounded-[1.5rem] bg-white p-5 shadow-sm dark:bg-[#111827]">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                <Clock3 className="h-4 w-4 text-[#2563EB] dark:text-[#60A5FA]" />
                Opening Hours
              </div>
              <div className="mt-4 space-y-3 text-sm text-[#64748B] dark:text-[#94A3B8]">
                <div className="flex items-center justify-between">
                  <span>Mon - Fri</span>
                  <span className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">8:00 AM - 7:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Saturday</span>
                  <span className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">Emergency only</span>
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-[#1E293B] dark:bg-[#111827] dark:shadow-[0_24px_44px_-34px_rgba(2,6,23,0.85)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563EB] dark:text-[#60A5FA]">
              Appointment
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl">
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
                      ? "border-[#2563EB] bg-[#EEF4FF] text-[#2563EB] dark:border-[#60A5FA] dark:bg-[rgba(96,165,250,0.14)] dark:text-[#60A5FA]"
                      : "border-slate-200 bg-white text-slate-500 hover:border-[#2563EB] hover:text-[#2563EB] dark:border-[#1E293B] dark:bg-[#0F172A] dark:text-[#94A3B8] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
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
              <label className="flex items-center gap-3 rounded-full border border-slate-200 px-4 py-3 text-sm text-slate-500 dark:border-[#1E293B] dark:bg-[#0F172A] dark:text-[#94A3B8]">
                <CalendarClock className="h-4 w-4 text-[#2563EB] dark:text-[#60A5FA]" />
                <span className="w-full text-[#0F172A] dark:text-[#F8FAFC]">
                  Preferred time: {selectedDate}:00
                </span>
              </label>

              <label
                className={`flex items-center gap-3 rounded-full border px-4 py-3 text-sm text-slate-500 ${
                  formErrors.name ? "border-red-400" : "border-slate-200 dark:border-[#1E293B] dark:bg-[#0F172A]"
                }`}
              >
                <User className="h-4 w-4 text-[#2563EB] dark:text-[#60A5FA]" />
                <input
                  type="text"
                  placeholder="Your full name"
                  value={formValues.name}
                  onChange={(event) => onInputChange("name", event.target.value)}
                  className="w-full bg-transparent text-[#0F172A] outline-none placeholder:text-slate-400 dark:text-[#F8FAFC] dark:placeholder:text-[#64748B]"
                  aria-invalid={Boolean(formErrors.name)}
                />
              </label>
              {formErrors.name ? (
                <p className="text-sm text-red-600">{formErrors.name}</p>
              ) : null}

              <label
                className={`flex items-center gap-3 rounded-full border px-4 py-3 text-sm text-slate-500 ${
                  formErrors.phone ? "border-red-400" : "border-slate-200 dark:border-[#1E293B] dark:bg-[#0F172A]"
                }`}
              >
                <Phone className="h-4 w-4 text-[#2563EB] dark:text-[#60A5FA]" />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={formValues.phone}
                  onChange={(event) => onInputChange("phone", event.target.value)}
                  className="w-full bg-transparent text-[#0F172A] outline-none placeholder:text-slate-400 dark:text-[#F8FAFC] dark:placeholder:text-[#64748B]"
                  aria-invalid={Boolean(formErrors.phone)}
                />
              </label>
              {formErrors.phone ? (
                <p className="text-sm text-red-600">{formErrors.phone}</p>
              ) : null}

              <label className="flex items-center gap-3 rounded-full border border-slate-200 px-4 py-3 text-sm text-slate-500 dark:border-[#1E293B] dark:bg-[#0F172A] dark:text-[#94A3B8]">
                <Stethoscope className="h-4 w-4 text-[#2563EB] dark:text-[#60A5FA]" />
                <select
                  value={selectedService}
                  onChange={(event) => onServiceSelect(event.target.value)}
                  className="w-full bg-transparent text-[#0F172A] outline-none dark:text-[#F8FAFC]"
                >
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="h-4 w-4 text-slate-400 dark:text-[#64748B]" />
              </label>
              {formErrors.service ? (
                <p className="text-sm text-red-600">{formErrors.service}</p>
              ) : null}

              <label className="flex items-center gap-3 rounded-full border border-slate-200 px-4 py-3 text-sm text-slate-500 dark:border-[#1E293B] dark:bg-[#0F172A] dark:text-[#94A3B8]">
                <User className="h-4 w-4 text-[#2563EB] dark:text-[#60A5FA]" />
                <span className="w-full text-[#0F172A] dark:text-[#F8FAFC]">
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
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#2563EB] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#2563EB]/20 transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-[#60A5FA] dark:text-[#020617] dark:shadow-[#60A5FA]/20 dark:hover:bg-[#3b82f6]"
                >
                  {isSubmitting ? "Submitting..." : "Book Appointment"}
                </button>
              </div>
            </form>
            {successMessage ? (
              <p className="mt-4 rounded-[1rem] bg-[#DCFCE7] px-4 py-3 text-sm font-medium text-[#166534] dark:bg-[rgba(52,211,153,0.16)] dark:text-[#34D399]">
                {successMessage}
              </p>
            ) : null}

            <div className="mt-6 rounded-[1.5rem] bg-[#F8FAFC] p-5 dark:bg-[#0F172A]">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                <CreditCard className="h-4 w-4 text-[#16A34A] dark:text-[#34D399]" />
                Insurance Accepted
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Aetna", "Cigna", "BlueCross", "Medicare"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-[#64748B] dark:border-[#1E293B] dark:bg-[#111827] dark:text-[#94A3B8]"
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
