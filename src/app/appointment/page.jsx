"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AppointmentSection from "@/components/home/AppointmentSection";
import FloatingContact from "@/components/shared/FloatingContact";
import ScrollToTop from "@/components/shared/ScrollToTop";

const initialForm = {
  name: "",
  phone: "",
};

export default function AppointmentPage() {
  const [selectedDate, setSelectedDate] = useState("2");
  const [selectedService, setSelectedService] = useState("Advanced mobility therapy");
  const [selectedDoctor] = useState("Dr. Sarah Wilson");
  const [formValues, setFormValues] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (field, value) => {
    setFormValues((current) => ({ ...current, [field]: value }));
    setFormErrors((current) => ({ ...current, [field]: "" }));
    if (successMessage) setSuccessMessage("");
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

    if (!selectedService) nextErrors.service = "Please choose a treatment service.";
    if (!selectedDate) nextErrors.date = "Please select a preferred appointment time.";
    if (!selectedDoctor) nextErrors.doctor = "Please choose a specialist.";

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
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 dark:bg-[#030B23] dark:text-[#F8FAFC]">
      <Navbar />
      <AppointmentSection
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
      <Footer />
      <FloatingContact />
      <ScrollToTop />
    </main>
  );
}
