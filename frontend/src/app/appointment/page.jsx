"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AppointmentSection from "@/components/home/AppointmentSection";
import FloatingContact from "@/components/shared/FloatingContact";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { useAuth } from "@/components/providers/AuthProvider";
import useClinicCatalog from "@/hooks/useClinicCatalog";
import { buildAppointmentSlots } from "@/lib/appointmentSlots";
import {
  createAppointment,
  fetchCurrentPatient,
  fetchMyAppointments,
} from "@/lib/api";

const appointmentSlots = buildAppointmentSlots();

const initialBookingForm = {
  notes: "",
};

const initialAuthForm = {
  fullName: "",
  email: "",
  password: "",
};

function formatAppointmentDate(value) {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function AppointmentPage() {
  const { doctors, services, isLoading, errorMessage } = useClinicCatalog();
  const {
    currentUser,
    isAuthenticated,
    isAuthLoading,
    token,
    login,
    logout,
    register,
  } = useAuth();
  const [selectedSlotId, setSelectedSlotId] = useState(appointmentSlots[0]?.id || "");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [bookingFormValues, setBookingFormValues] = useState(initialBookingForm);
  const [bookingErrors, setBookingErrors] = useState({});
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingTone, setBookingTone] = useState("success");
  const [authMode, setAuthMode] = useState("login");
  const [authFormValues, setAuthFormValues] = useState(initialAuthForm);
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [patientStatus, setPatientStatus] = useState({
    patientId: null,
    message: "",
    tone: "success",
  });
  const activeServiceId = selectedServiceId || services[0]?.id || "";
  const activeDoctorId = selectedDoctorId || doctors[0]?.id || "";

  useEffect(() => {
    let isMounted = true;

    async function loadPatientData() {
      if (!isAuthenticated || !token) {
        if (!isMounted) {
          return;
        }
        setAppointments([]);
        setPatientStatus({
          patientId: null,
          message: "",
          tone: "success",
        });
        return;
      }

      try {
        const patient = await fetchCurrentPatient(token);
        const appointmentData = await fetchMyAppointments(token);

        if (!isMounted) {
          return;
        }

        setPatientStatus({
          patientId: patient.id,
          message: "Your patient profile is linked and ready for booking.",
          tone: "success",
        });
        setAppointments(appointmentData);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setAppointments([]);
        setPatientStatus({
          patientId: null,
          message:
            error instanceof Error
              ? error.message
              : "Unable to load patient information right now.",
          tone: "error",
        });
      }
    }

    loadPatientData();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, token]);

  const handleBookingInputChange = (field, value) => {
    setBookingFormValues((current) => ({ ...current, [field]: value }));
    setBookingErrors((current) => ({ ...current, [field]: "" }));
    if (bookingMessage) {
      setBookingMessage("");
    }
  };

  const validateBookingForm = () => {
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

    if (bookingFormValues.notes.length > 2000) {
      nextErrors.notes = "Notes must stay under 2000 characters.";
    }

    return nextErrors;
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateBookingForm();

    if (Object.keys(nextErrors).length > 0) {
      setBookingErrors(nextErrors);
      setBookingMessage("");
      return;
    }

    if (!isAuthenticated || !token) {
      setBookingTone("error");
      setBookingMessage("Sign in or register before requesting an appointment.");
      return;
    }

    if (!patientStatus.patientId) {
      setBookingTone("error");
      setBookingMessage(
        patientStatus.message ||
          "A linked patient profile is required before appointments can be booked."
      );
      return;
    }

    setIsSubmittingBooking(true);
    setBookingErrors({});

    try {
      const selectedSlot = appointmentSlots.find((slot) => slot.id === selectedSlotId);
      const appointment = await createAppointment(token, {
        patient_id: patientStatus.patientId,
        doctor_id: activeDoctorId,
        service_id: activeServiceId,
        scheduled_at: selectedSlot?.scheduledAt,
        notes: bookingFormValues.notes || null,
      });

      setAppointments((current) => [appointment, ...current]);
      setBookingTone("success");
      setBookingMessage("Your appointment request was sent successfully.");
      setBookingFormValues(initialBookingForm);
      setSelectedSlotId(appointmentSlots[0]?.id || "");
    } catch (error) {
      setBookingTone("error");
      setBookingMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit the appointment request right now."
      );
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const handleAuthInputChange = (field, value) => {
    setAuthFormValues((current) => ({ ...current, [field]: value }));
    if (authError) {
      setAuthError("");
    }
    if (authSuccess) {
      setAuthSuccess("");
    }
  };

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    setIsSubmittingAuth(true);
    setAuthError("");
    setAuthSuccess("");

    try {
      if (authMode === "register") {
        await register({
          full_name: authFormValues.fullName,
          email: authFormValues.email,
          password: authFormValues.password,
        });
        setAuthSuccess("Registration complete. You are now signed in.");
      } else {
        await login({
          email: authFormValues.email,
          password: authFormValues.password,
        });
        setAuthSuccess("Signed in successfully.");
      }

      setAuthFormValues(initialAuthForm);
    } catch (error) {
      setAuthError(
        error instanceof Error ? error.message : "Unable to complete authentication."
      );
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  return (
    <main id="top" className="flex flex-1 flex-col bg-white text-slate-900 dark:bg-[#020617] dark:text-[#F8FAFC]">
      <Navbar />

      <section className="px-6 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1560px] items-start gap-8 xl:items-stretch xl:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]">
          <article className="flex w-full flex-col self-start rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-[#1E293B] dark:bg-[#111827] sm:p-7 xl:h-full">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[13px] font-medium uppercase tracking-[0.28em] text-[#2563EB] dark:text-[#60A5FA]">
                  Patient Access
                </p>
                <h1 className="mt-4 text-[2.4rem] font-extrabold leading-[1.04] tracking-[-0.04em] text-[#0F172A] dark:text-[#F8FAFC] sm:text-[3rem]">
                  Sign in to book and track appointments.
                </h1>
              </div>
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[#2563EB] hover:text-[#2563EB] dark:border-[#1E293B] dark:text-[#E2E8F0] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
                >
                  Sign out
                </button>
              ) : null}
            </div>

            {errorMessage ? (
              <p className="mt-6 text-sm text-red-600 dark:text-[#FCA5A5]">{errorMessage}</p>
            ) : null}

            <div className="mt-8 rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-[#1E293B] dark:bg-[#0F172A]">
              {isAuthenticated ? (
                <>
                  <p className="text-sm uppercase tracking-[0.24em] text-[#2563EB] dark:text-[#60A5FA]">
                    Signed In
                  </p>
                  <p className="mt-3 text-lg font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                    {currentUser?.full_name}
                  </p>
                  <p className="mt-1 text-sm text-[#64748B] dark:text-[#94A3B8]">
                    {currentUser?.email}
                  </p>
                </>
              ) : (
                <>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setAuthMode("login")}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        authMode === "login"
                          ? "bg-[#2563EB] text-white dark:bg-[#60A5FA] dark:text-[#020617]"
                          : "border border-slate-200 text-slate-700 dark:border-[#1E293B] dark:text-[#E2E8F0]"
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMode("register")}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        authMode === "register"
                          ? "bg-[#2563EB] text-white dark:bg-[#60A5FA] dark:text-[#020617]"
                          : "border border-slate-200 text-slate-700 dark:border-[#1E293B] dark:text-[#E2E8F0]"
                      }`}
                    >
                      Register
                    </button>
                  </div>

                  <form className="mx-auto mt-6 w-full max-w-[356px] space-y-4" onSubmit={handleAuthSubmit}>
                    {authMode === "register" ? (
                      <input
                        type="text"
                        placeholder="Full name"
                        value={authFormValues.fullName}
                        onChange={(event) => handleAuthInputChange("fullName", event.target.value)}
                        className="h-14 w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[#0F172A] outline-none dark:border-[#1E293B] dark:bg-[#111827] dark:text-white"
                      />
                    ) : null}

                    <input
                      type="email"
                      placeholder="Email address"
                      value={authFormValues.email}
                      onChange={(event) => handleAuthInputChange("email", event.target.value)}
                      className="h-14 w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[#0F172A] outline-none dark:border-[#1E293B] dark:bg-[#111827] dark:text-white"
                    />

                    <input
                      type="password"
                      placeholder="Password"
                      value={authFormValues.password}
                      onChange={(event) => handleAuthInputChange("password", event.target.value)}
                      className="h-14 w-full rounded-[16px] border border-slate-200 bg-white px-4 text-[#0F172A] outline-none dark:border-[#1E293B] dark:bg-[#111827] dark:text-white"
                    />

                    <button
                      type="submit"
                      disabled={isSubmittingAuth || isAuthLoading}
                      className="inline-flex h-14 w-full items-center justify-center rounded-[16px] bg-[linear-gradient(135deg,#2563EB_0%,#1D4ED8_100%)] px-6 text-base font-medium text-white disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmittingAuth
                        ? "Submitting..."
                        : authMode === "register"
                          ? "Create Account"
                          : "Sign In"}
                    </button>
                  </form>
                </>
              )}

              {authError ? (
                <p className="mt-4 rounded-[16px] bg-[#FEE2E2] px-4 py-3 text-sm text-[#991B1B] dark:bg-[rgba(248,113,113,0.16)] dark:text-[#FCA5A5]">
                  {authError}
                </p>
              ) : null}
              {authSuccess ? (
                <p className="mt-4 rounded-[16px] bg-[#DCFCE7] px-4 py-3 text-sm text-[#166534] dark:bg-[rgba(52,211,153,0.16)] dark:text-[#34D399]">
                  {authSuccess}
                </p>
              ) : null}
              {patientStatus.message ? (
                <p
                  className={`mt-4 rounded-[16px] px-4 py-3 text-sm ${
                    patientStatus.tone === "success"
                      ? "bg-[#DCFCE7] text-[#166534] dark:bg-[rgba(52,211,153,0.16)] dark:text-[#34D399]"
                      : "bg-[#FEF3C7] text-[#92400E] dark:bg-[rgba(251,191,36,0.16)] dark:text-[#FCD34D]"
                  }`}
                >
                  {patientStatus.message}
                </p>
              ) : null}
            </div>

            <div className="mt-8 rounded-[24px] border border-slate-200 bg-white p-5 dark:border-[#1E293B] dark:bg-[#0F172A] xl:mt-auto">
              <p className="text-sm uppercase tracking-[0.24em] text-[#2563EB] dark:text-[#60A5FA]">
                My Appointments
              </p>

              {appointments.length === 0 ? (
                <p className="mt-4 text-sm text-[#64748B] dark:text-[#94A3B8]">
                  No appointments have been booked from this account yet.
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  {appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="rounded-[18px] border border-slate-200 px-4 py-4 dark:border-[#1E293B]"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                          {formatAppointmentDate(appointment.scheduled_at)}
                        </p>
                        <span className="rounded-full bg-[#EEF4FF] px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-[#2563EB] dark:bg-[rgba(96,165,250,0.14)] dark:text-[#93C5FD]">
                          {appointment.status}
                        </span>
                      </div>
                      {appointment.notes ? (
                        <p className="mt-2 text-sm text-[#64748B] dark:text-[#94A3B8]">
                          {appointment.notes}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </article>

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
            formValues={bookingFormValues}
            formErrors={bookingErrors}
            onInputChange={handleBookingInputChange}
            onSubmit={handleBookingSubmit}
            isSubmitting={isSubmittingBooking || isLoading || isAuthLoading}
            feedbackMessage={bookingMessage}
            feedbackTone={bookingTone}
            currentUser={currentUser}
            isAuthenticated={isAuthenticated}
            isEmbedded
          />
        </div>
      </section>

      <Footer />
      <FloatingContact />
      <ScrollToTop />
    </main>
  );
}
