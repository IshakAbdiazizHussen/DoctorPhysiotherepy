"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import DoctorsCarousel from "@/components/home/DoctorsCarousel";
import FloatingContact from "@/components/shared/FloatingContact";
import ScrollToTop from "@/components/shared/ScrollToTop";

export default function DoctorsPage() {
  const [selectedDoctor, setSelectedDoctor] = useState("Dr. Sarah Wilson");

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 dark:bg-[#030B23] dark:text-[#F8FAFC]">
      <Navbar />

      <section className="py-18 sm:py-20 lg:py-24">
        <Container className="max-w-[1500px] px-6 lg:px-10">
          <div className="max-w-[760px]">
            <p className="text-[13px] font-medium uppercase tracking-[0.28em] text-[#2563EB] dark:text-[#60A5FA]">
              Specialists
            </p>
            <h1 className="mt-6 text-[2.8rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#0F172A] dark:text-[#F8FAFC] sm:text-[3.5rem] lg:text-[4.2rem]">
              Meet the rehabilitation specialists guiding every recovery plan.
            </h1>
          </div>
        </Container>
      </section>

      <DoctorsCarousel
        selectedDoctor={selectedDoctor}
        onDoctorSelect={setSelectedDoctor}
      />
      <Footer />
      <FloatingContact />
      <ScrollToTop />
    </main>
  );
}
