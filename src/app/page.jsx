"use client";

import { useState } from "react";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Principles from "./components/Principles";
import Individual from "./components/Individual";
import Logos from "./components/Logos";
import Footer from "./components/Footer";
import { CalendarDays, MessageCircleMore } from "lucide-react";

const initialForm = {
  name: "",
  phone: "",
};

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedService, setSelectedService] = useState("Advanced mobility therapy");
  const [selectedDoctor, setSelectedDoctor] = useState("Dr. Sarah Wilson");
  const [selectedDate, setSelectedDate] = useState("2");
  const [formValues, setFormValues] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (field, value) => {
    setFormValues((current) => ({ ...current, [field]: value }));
    setFormErrors((current) => ({ ...current, [field]: "" }));
    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formValues.name.trim()) {
      nextErrors.name = "Please enter your full name.";
    }

    if (!formValues.phone.trim()) {
      nextErrors.phone = "Please enter your phone number.";
    } else if (!/^[+]?[\d\s()-]{7,}$/.test(formValues.phone.trim())) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    if (!selectedService) {
      nextErrors.service = "Please choose a treatment service.";
    }

    if (!selectedDate) {
      nextErrors.date = "Please select a preferred appointment time.";
    }

    if (!selectedDoctor) {
      nextErrors.doctor = "Please choose a specialist.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      setSuccessMessage("");
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    await new Promise((resolve) => setTimeout(resolve, 900));

    setSuccessMessage(
      `Appointment request sent for ${selectedService} with ${selectedDoctor}.`
    );
    setFormValues(initialForm);
    setSelectedDate("2");
    setIsSubmitting(false);
  };

  return (
    <main id="top" className="min-h-screen bg-[#F8FAFC] text-slate-900 dark:bg-[#030B23] dark:text-[#F8FAFC]">
      <Hero />
      <Stats
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedService={selectedService}
        onServiceSelect={setSelectedService}
        selectedDoctor={selectedDoctor}
        onDoctorSelect={setSelectedDoctor}
      />
      <Principles />
      <Individual
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        selectedService={selectedService}
        onServiceSelect={setSelectedService}
        selectedDoctor={selectedDoctor}
        formValues={formValues}
        formErrors={formErrors}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        successMessage={successMessage}
      />
      <Logos />
      <Footer />

      <div className="fixed inset-x-4 bottom-4 z-40 sm:hidden">
        <a
          href="#appointment"
          className="flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 py-4 text-sm font-medium text-white shadow-[0_18px_35px_-18px_rgba(37,99,235,0.7)] dark:bg-[#60A5FA] dark:text-[#020617] dark:shadow-[0_18px_35px_-18px_rgba(96,165,250,0.5)]"
        >
          <CalendarDays className="h-4 w-4" />
          Book Appointment
        </a>
      </div>

      <a
        href="https://wa.me/18005550147"
        target="_blank"
        rel="noreferrer"
        aria-label="Contact DoctorPhysio on WhatsApp"
        className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#16A34A] text-white shadow-[0_18px_35px_-18px_rgba(22,163,74,0.75)] transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16A34A] dark:bg-[#34D399] dark:text-[#052e2b] dark:shadow-[0_18px_35px_-18px_rgba(52,211,153,0.55)] dark:focus-visible:outline-[#34D399] sm:bottom-6"
      >
        <MessageCircleMore className="h-6 w-6" />
      </a>
    </main>
  );
}
