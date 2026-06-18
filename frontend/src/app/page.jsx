"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import RecoveryCards from "@/components/home/RecoveryCards";
import AppointmentSection from "@/components/home/AppointmentSection";
import Testimonials from "@/components/home/Testimonials";
import FloatingContact from "@/components/shared/FloatingContact";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { useAuth } from "@/components/providers/AuthProvider";
import useClinicCatalog from "@/hooks/useClinicCatalog";
import { buildAppointmentSlots } from "@/lib/appointmentSlots";
import {
  createAppointment,
  fetchCurrentPatient,
} from "@/lib/api";

const appointmentSlots = buildAppointmentSlots();
const initialForm = {
  notes: "",
};

export default function HomePage() {
  const { doctors, services, isLoading, errorMessage } = useClinicCatalog();
  const { currentUser, isAuthenticated, token, isAuthLoading } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState(appointmentSlots[0]?.id || "");
  const [formValues, setFormValues] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackTone, setFeedbackTone] = useState("success");

  const activeServiceId = selectedServiceId || services[0]?.id || "";
  const activeDoctorId = selectedDoctorId || doctors[0]?.id || "";

  const handleInputChange = (field, value) => {
    setFormValues((current) => ({ ...current, [field]: value }));
    setFormErrors((current) => ({ ...current, [field]: "" }));
    if (feedbackMessage) {
      setFeedbackMessage("");
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!activeServiceId) {
      nextErrors.serviceId = "Please choose a treatment service.";
    }

    if (!activeDoctorId) {
      nextErrors.doctorId = "Please choose a specialist.";
    }

    if (!selectedSlotId) {
      nextErrors.scheduledAt = "Please select a preferred appointment time.";
    }

    if (formValues.notes.length > 2000) {
      nextErrors.notes = "Notes must stay under 2000 characters.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      setFeedbackMessage("");
      return;
    }

    if (!isAuthenticated || !token) {
      setFeedbackTone("error");
      setFeedbackMessage("Sign in on the appointment page before sending a booking request.");
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      const patient = await fetchCurrentPatient(token);
      const selectedSlot = appointmentSlots.find((slot) => slot.id === selectedSlotId);

      await createAppointment(token, {
        patient_id: patient.id,
        doctor_id: activeDoctorId,
        service_id: activeServiceId,
        scheduled_at: selectedSlot?.scheduledAt,
        notes: formValues.notes || null,
      });

      setFeedbackTone("success");
      setFeedbackMessage("Your appointment request was sent successfully.");
      setFormValues(initialForm);
      setSelectedSlotId(appointmentSlots[0]?.id || "");
    } catch (error) {
      setFeedbackTone("error");
      setFeedbackMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit the appointment request right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="top" className="min-h-screen bg-[#F8FAFC] text-slate-900 dark:bg-[#030B23] dark:text-[#F8FAFC]">
      <Navbar />
      <Hero />

      {errorMessage ? (
        <section className="px-6 py-6 text-center text-sm text-red-600 dark:text-[#FCA5A5]">
          {errorMessage}
        </section>
      ) : null}

      <Services
        services={services}
        doctors={doctors}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedServiceId={activeServiceId}
        onServiceSelect={setSelectedServiceId}
        selectedDoctorId={activeDoctorId}
        onDoctorSelect={setSelectedDoctorId}
      />
      <RecoveryCards />
      <AppointmentSection
        appointmentSlots={appointmentSlots}
        selectedSlotId={selectedSlotId}
        onSlotSelect={setSelectedSlotId}
        serviceOptions={services}
        doctorOptions={doctors}
        selectedServiceId={activeServiceId}
        onServiceSelect={setSelectedServiceId}
        selectedDoctorId={activeDoctorId}
        onDoctorSelect={setSelectedDoctorId}
        formValues={formValues}
        formErrors={formErrors}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting || isLoading || isAuthLoading}
        feedbackMessage={feedbackMessage}
        feedbackTone={feedbackTone}
        currentUser={currentUser}
        isAuthenticated={isAuthenticated}
      />
      <Testimonials />
      <Footer />
      <FloatingContact />
      <ScrollToTop />
    </main>
  );
}
