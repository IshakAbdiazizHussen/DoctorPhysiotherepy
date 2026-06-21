"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import RecoveryCards from "@/components/home/RecoveryCards";
import Testimonials from "@/components/home/Testimonials";
import FloatingContact from "@/components/shared/FloatingContact";
import ScrollToTop from "@/components/shared/ScrollToTop";

export default function AboutPage() {
  return (
    <main id="top" className="min-h-screen bg-white text-slate-900 dark:bg-[#020617] dark:text-[#F8FAFC]">
      <Navbar />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="max-w-[1500px] px-6 lg:px-10">
          <div className="max-w-[860px]">
            <p className="text-[13px] font-medium uppercase tracking-[0.28em] text-[#2563EB] dark:text-[#60A5FA]">
              About DoctorPhysio
            </p>
            <h1 className="mt-6 text-[2.8rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#0F172A] dark:text-[#F8FAFC] sm:text-[3.5rem] lg:text-[4.4rem]">
              Modern rehabilitation care built around recovery, confidence, and long-term movement.
            </h1>
            <p className="mt-6 max-w-[720px] text-[18px] leading-[1.9] text-[#64748B] dark:text-[#94A3B8]">
              DoctorPhysio combines physiotherapy, mobility restoration, and personalized treatment planning in a calmer, more premium healthcare experience. Our approach is designed to reduce pain, improve function, and help every patient feel supported through recovery.
            </p>
          </div>
        </Container>
      </section>

      <RecoveryCards />
      <Testimonials />
      <Footer />
      <FloatingContact />
      <ScrollToTop />
    </main>
  );
}
