"use client";

import {
  CalendarClock,
  CalendarDays,
  ChevronDown,
  Clock3,
  CreditCard,
  HeartHandshake,
  Phone,
  ShieldCheck,
  Stethoscope,
  User,
  UserRoundCheck,
} from "lucide-react";
import Container from "./Container";

const schedule = ["10", "12", "2", "4", "6", "9"];

const serviceOptions = [
  "Advanced mobility therapy",
  "Injury recovery support",
  "Pain relief treatment",
  "Neuromuscular re-education",
];

const highlights = [
  {
    icon: ShieldCheck,
    title: "Experienced Specialists",
  },
  {
    icon: UserRoundCheck,
    title: "Personalized Treatment",
  },
  {
    icon: HeartHandshake,
    title: "Patient-Focused Care",
  },
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
    <section id="appointment" className="bg-transparent py-16 sm:py-20 lg:py-24">
      <Container className="max-w-[1600px] px-6 lg:px-10 xl:px-12">
        <div className="grid gap-8 xl:gap-10 lg:grid-cols-[48%_52%]">
          <article className="relative overflow-hidden rounded-[32px] border border-[rgba(37,99,235,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(248,250,252,0.88)_100%)] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm dark:border-[rgba(255,255,255,0.08)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.94)_0%,rgba(17,24,39,0.94)_100%)] dark:shadow-[0_24px_60px_-24px_rgba(2,6,23,0.82)] sm:p-10 xl:p-12 2xl:p-14">
            <div className="pointer-events-none absolute right-6 top-10 h-28 w-28 rounded-full bg-[rgba(37,99,235,0.06)] blur-3xl dark:bg-[rgba(96,165,250,0.08)]" />

            <span className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-[14px] font-medium uppercase tracking-[0.16em] text-[#2563EB] shadow-[0_18px_38px_-28px_rgba(37,99,235,0.18)] dark:bg-[#111827] dark:text-[#60A5FA]">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(37,99,235,0.08)] text-[#2563EB] dark:bg-[rgba(96,165,250,0.14)] dark:text-[#60A5FA]">
                <UserRoundCheck className="h-5 w-5" />
              </span>
              Consultation Care
            </span>

            <h2 className="mt-8 max-w-[520px] text-[40px] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#0F172A] dark:text-white sm:text-[46px] xl:text-[56px]">
              One-to-one sessions focused on mobility, relief, and{" "}
              <span className="text-[#2563EB] dark:text-[#60A5FA]">confidence</span>.
            </h2>

            <p className="mt-6 max-w-[520px] text-[18px] font-normal leading-[1.9] text-[#64748B] dark:text-[#94A3B8]">
              Our clinic helps patients recover from injury, improve functional
              movement, and return to daily life with a practical, supportive
              treatment plan.
            </p>

            <div className="mt-10 rounded-[28px] border border-[rgba(37,99,235,0.08)] bg-white/92 p-6 shadow-[0_20px_44px_-28px_rgba(15,23,42,0.08)] dark:border-[rgba(255,255,255,0.08)] dark:bg-[#111827]">
              <div className="flex items-center gap-3 text-[20px] font-medium text-[#0F172A] dark:text-white">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(37,99,235,0.08)] text-[#2563EB] dark:bg-[rgba(96,165,250,0.14)] dark:text-[#60A5FA]">
                  <Clock3 className="h-5 w-5" />
                </span>
                Opening Hours
              </div>

              <div className="mt-6 divide-y divide-slate-200 text-[18px] text-[#64748B] dark:divide-[#1E293B] dark:text-[#94A3B8]">
                <div className="flex items-center justify-between py-4 first:pt-0">
                  <span>Mon - Fri</span>
                  <span className="font-medium text-[#0F172A] dark:text-white">8:00 AM - 7:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-4">
                  <span>Saturday</span>
                  <span className="font-medium text-[#0F172A] dark:text-white">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-4 pb-0">
                  <span>Sunday</span>
                  <span className="font-medium text-[#2563EB] dark:text-[#60A5FA]">Emergency only</span>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-4">
              {highlights.map(({ icon: Icon, title }) => (
                <div
                  key={title}
                  className="rounded-[24px] border border-[rgba(37,99,235,0.08)] bg-white/90 px-5 py-5 shadow-[0_16px_36px_-28px_rgba(15,23,42,0.08)] dark:border-[rgba(255,255,255,0.08)] dark:bg-[#111827]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(20,184,166,0.1)] text-[#14B8A6] dark:bg-[rgba(52,211,153,0.12)] dark:text-[#34D399]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-[16px] font-normal leading-[1.45] text-[#334155] dark:text-[#E2E8F0]">
                    {title}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[32px] border border-[rgba(37,99,235,0.08)] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-[rgba(255,255,255,0.08)] dark:bg-[#0F172A] dark:shadow-[0_24px_60px_-24px_rgba(2,6,23,0.82)] sm:p-10 xl:p-12 2xl:p-14">
            <span className="inline-flex items-center gap-3 rounded-full bg-[#F8FBFF] px-5 py-3 text-[14px] font-medium uppercase tracking-[0.16em] text-[#2563EB] shadow-[0_18px_38px_-28px_rgba(37,99,235,0.16)] dark:bg-[#111827] dark:text-[#60A5FA]">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(37,99,235,0.08)] text-[#2563EB] dark:bg-[rgba(96,165,250,0.14)] dark:text-[#60A5FA]">
                <CalendarDays className="h-5 w-5" />
              </span>
              Appointment
            </span>

            <h2 className="mt-6 text-[40px] font-extrabold tracking-[-0.04em] text-[#0F172A] dark:text-white sm:text-[46px]">
              Book Your Appointment
            </h2>

            <div className="mt-8 flex flex-wrap gap-3 xl:gap-4">
              {schedule.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => onDateSelect(item)}
                  className={`flex h-16 w-16 flex-col items-center justify-center rounded-full border text-[13px] font-medium transition ${
                    item === selectedDate
                      ? "border-transparent bg-[#2563EB] text-white shadow-[0_20px_34px_-20px_rgba(37,99,235,0.5)] dark:bg-[#60A5FA] dark:text-[#020617]"
                      : "border-slate-200 bg-white text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB] dark:border-[#1E293B] dark:bg-[#111827] dark:text-[#94A3B8] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
                  }`}
                >
                  <span className="text-[18px] leading-none">{item}</span>
                  <span className="mt-1 text-[12px]">{item === "10" ? "Sat" : item === "12" ? "Sun" : item === "2" ? "Mon" : item === "4" ? "Tue" : item === "6" ? "Wed" : "Fri"}</span>
                </button>
              ))}
            </div>
            {formErrors.date ? (
              <p className="mt-3 text-sm text-red-600">{formErrors.date}</p>
            ) : null}

            <form className="mt-8 w-full space-y-4" onSubmit={onSubmit} noValidate>
              <label className="flex h-16 items-center gap-4 rounded-[16px] border border-slate-200 px-5 text-[18px] text-[#64748B] transition hover:border-[#CBD5E1] dark:border-[#1E293B] dark:bg-[#111827] dark:text-[#94A3B8] dark:hover:border-[#334155]">
                <CalendarClock className="h-5 w-5 shrink-0 text-[#2563EB] dark:text-[#60A5FA]" />
                <span className="w-full text-[#0F172A] dark:text-white">
                  Preferred time: {selectedDate}:00 PM
                </span>
                <ChevronDown className="h-5 w-5 text-slate-400 dark:text-[#64748B]" />
              </label>

              <label
                className={`flex h-16 items-center gap-4 rounded-[16px] border px-5 text-[18px] text-[#64748B] transition ${
                  formErrors.name
                    ? "border-red-400"
                    : "border-slate-200 hover:border-[#CBD5E1] dark:border-[#1E293B] dark:bg-[#111827] dark:text-[#94A3B8] dark:hover:border-[#334155]"
                }`}
              >
                <User className="h-5 w-5 shrink-0 text-[#2563EB] dark:text-[#60A5FA]" />
                <input
                  type="text"
                  placeholder="Your full name"
                  value={formValues.name}
                  onChange={(event) => onInputChange("name", event.target.value)}
                  className="w-full bg-transparent text-[#0F172A] outline-none placeholder:text-[#94A3B8] dark:text-white dark:placeholder:text-[#64748B]"
                  aria-invalid={Boolean(formErrors.name)}
                />
              </label>
              {formErrors.name ? <p className="text-sm text-red-600">{formErrors.name}</p> : null}

              <label
                className={`flex h-16 items-center gap-4 rounded-[16px] border px-5 text-[18px] text-[#64748B] transition ${
                  formErrors.phone
                    ? "border-red-400"
                    : "border-slate-200 hover:border-[#CBD5E1] dark:border-[#1E293B] dark:bg-[#111827] dark:text-[#94A3B8] dark:hover:border-[#334155]"
                }`}
              >
                <Phone className="h-5 w-5 shrink-0 text-[#2563EB] dark:text-[#60A5FA]" />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={formValues.phone}
                  onChange={(event) => onInputChange("phone", event.target.value)}
                  className="w-full bg-transparent text-[#0F172A] outline-none placeholder:text-[#94A3B8] dark:text-white dark:placeholder:text-[#64748B]"
                  aria-invalid={Boolean(formErrors.phone)}
                />
              </label>
              {formErrors.phone ? <p className="text-sm text-red-600">{formErrors.phone}</p> : null}

              <label className="flex h-16 items-center gap-4 rounded-[16px] border border-slate-200 px-5 text-[18px] text-[#64748B] transition hover:border-[#CBD5E1] dark:border-[#1E293B] dark:bg-[#111827] dark:text-[#94A3B8] dark:hover:border-[#334155]">
                <Stethoscope className="h-5 w-5 shrink-0 text-[#2563EB] dark:text-[#60A5FA]" />
                <select
                  value={selectedService}
                  onChange={(event) => onServiceSelect(event.target.value)}
                  className="w-full bg-transparent text-[#0F172A] outline-none dark:text-white"
                >
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="h-5 w-5 text-slate-400 dark:text-[#64748B]" />
              </label>
              {formErrors.service ? <p className="text-sm text-red-600">{formErrors.service}</p> : null}

              <label className="flex h-16 items-center gap-4 rounded-[16px] border border-slate-200 px-5 text-[18px] text-[#64748B] transition hover:border-[#CBD5E1] dark:border-[#1E293B] dark:bg-[#111827] dark:text-[#94A3B8] dark:hover:border-[#334155]">
                <User className="h-5 w-5 shrink-0 text-[#2563EB] dark:text-[#60A5FA]" />
                <span className="w-full text-[#0F172A] dark:text-white">
                  Selected doctor: {selectedDoctor}
                </span>
                <ChevronDown className="h-5 w-5 text-slate-400 dark:text-[#64748B]" />
              </label>
              {formErrors.doctor ? <p className="text-sm text-red-600">{formErrors.doctor}</p> : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex h-16 w-full items-center justify-center rounded-[16px] bg-[linear-gradient(135deg,#2563EB_0%,#1D4ED8_100%)] px-6 text-[18px] font-medium text-white shadow-[0_20px_40px_-20px_rgba(37,99,235,0.55)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_46px_-20px_rgba(37,99,235,0.6)] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-[linear-gradient(135deg,#3B82F6_0%,#2563EB_100%)]"
              >
                {isSubmitting ? "Submitting..." : "Book Appointment"}
              </button>
            </form>

            {successMessage ? (
              <p className="mt-4 rounded-[16px] bg-[#DCFCE7] px-4 py-3 text-sm font-normal text-[#166534] dark:bg-[rgba(52,211,153,0.16)] dark:text-[#34D399]">
                {successMessage}
              </p>
            ) : null}

            <div className="mt-8 rounded-[24px] bg-[#F8FAFC] p-5 dark:bg-[#111827]">
              <div className="flex items-center gap-3 text-[18px] font-medium text-[#0F172A] dark:text-white">
                <CreditCard className="h-5 w-5 text-[#14B8A6] dark:text-[#34D399]" />
                Insurance Accepted
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {["Aetna", "Cigna", "BlueCross", "Medicare"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#64748B] shadow-[0_12px_24px_-20px_rgba(15,23,42,0.16)] dark:bg-[#0F172A] dark:text-[#94A3B8]"
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
