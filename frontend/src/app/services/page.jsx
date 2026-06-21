"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Services from "@/components/home/Services";
import FloatingContact from "@/components/shared/FloatingContact";
import ScrollToTop from "@/components/shared/ScrollToTop";
import useClinicCatalog from "@/hooks/useClinicCatalog";

export default function ServicesPage() {
  const { doctors, services, errorMessage } = useClinicCatalog();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const activeServiceId = selectedServiceId || services[0]?.id || "";
  const activeDoctorId = selectedDoctorId || doctors[0]?.id || "";

  return (
    <main id="top" className="min-h-screen bg-[#F8FAFC] text-slate-900 dark:bg-[#020617] dark:text-[#F8FAFC]">
      <Navbar />
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
      <Footer />
      <FloatingContact />
      <ScrollToTop />
    </main>
  );
}
