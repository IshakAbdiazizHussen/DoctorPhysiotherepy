"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Services from "@/components/home/Services";
import FloatingContact from "@/components/shared/FloatingContact";
import ScrollToTop from "@/components/shared/ScrollToTop";

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedService, setSelectedService] = useState("Advanced mobility therapy");
  const [selectedDoctor, setSelectedDoctor] = useState("Dr. Sarah Wilson");

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 dark:bg-[#030B23] dark:text-[#F8FAFC]">
      <Navbar />
      <Services
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedService={selectedService}
        onServiceSelect={setSelectedService}
        selectedDoctor={selectedDoctor}
        onDoctorSelect={setSelectedDoctor}
      />
      <Footer />
      <FloatingContact />
      <ScrollToTop />
    </main>
  );
}
