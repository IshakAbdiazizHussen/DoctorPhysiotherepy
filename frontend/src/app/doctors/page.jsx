"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import DoctorsCarousel from "@/components/home/DoctorsCarousel";
import FloatingContact from "@/components/shared/FloatingContact";
import ScrollToTop from "@/components/shared/ScrollToTop";
import useClinicCatalog from "@/hooks/useClinicCatalog";

export default function DoctorsPage() {
  const { doctors, isLoading, errorMessage } = useClinicCatalog();
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const activeDoctorId = selectedDoctorId || doctors[0]?.id || "";

  return (
    <main id="top" className="flex flex-1 flex-col bg-white text-slate-900 dark:bg-[#020617] dark:text-[#F8FAFC]">
      <Navbar />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="max-w-[1500px] px-6 lg:px-10">
          <div className="max-w-[760px]">
            <p className="text-[13px] font-medium uppercase tracking-[0.28em] text-[#2563EB] dark:text-[#60A5FA]">
              Specialists
            </p>
            <h1 className="mt-6 text-[2.8rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#0F172A] dark:text-[#F8FAFC] sm:text-[3.5rem] lg:text-[4.2rem]">
              Meet the rehabilitation specialists guiding every recovery plan.
            </h1>
          </div>

          {errorMessage ? (
            <p className="mt-6 text-sm text-red-600 dark:text-[#FCA5A5]">
              {errorMessage}
            </p>
          ) : null}
          {isLoading ? (
            <p className="mt-6 text-sm text-[#64748B] dark:text-[#94A3B8]">
              Loading doctor profiles...
            </p>
          ) : null}
        </Container>
      </section>

      <DoctorsCarousel
        doctors={doctors}
        selectedDoctorId={activeDoctorId}
        onDoctorSelect={setSelectedDoctorId}
      />
      <Footer />
      <FloatingContact />
      <ScrollToTop />
    </main>
  );
}
