"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  Check,
  ChevronRight,
  Star,
} from "lucide-react";
import Container from "./Container";

const doctors = [
  {
    name: "Dr. Sarah Wilson",
    specialty: "Physiotherapist",
    image: "/images/female.jpg",
    experience: "9 Years",
    rating: "4.9",
  },
  {
    name: "Dr. James Carter",
    specialty: "Rehabilitation Expert",
    image: "/images/physio1.jpg",
    experience: "11 Years",
    rating: "4.9",
  },
  {
    name: "Dr. Emily Brown",
    specialty: "Sports Therapist",
    image: "/images/physio2.jpg",
    experience: "8 Years",
    rating: "4.9",
  },
  {
    name: "Dr. Michael Lee",
    specialty: "Movement Specialist",
    image: "/images/portM.jpg",
    experience: "10 Years",
    rating: "4.9",
  },
  {
    name: "Dr. Olivia Harris",
    specialty: "Pain Management",
    image: "/images/physio.jpg",
    experience: "12 Years",
    rating: "4.9",
  },
];

export default function Services({ selectedDoctor, onDoctorSelect }) {
  const [page, setPage] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [cardsPerPage, setCardsPerPage] = useState(5);

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(5);
      }
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);

    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  const totalPages = Math.max(1, Math.ceil(doctors.length / cardsPerPage));

  useEffect(() => {
    if (page > totalPages - 1) {
      setPage(totalPages - 1);
    }
  }, [page, totalPages]);

  const visibleDoctors = useMemo(() => {
    const start = page * cardsPerPage;
    return doctors.slice(start, start + cardsPerPage);
  }, [page, cardsPerPage]);

  const handleNext = () => {
    setPage((current) => (current + 1) % totalPages);
  };

  const handlePrev = () => {
    setPage((current) => (current - 1 + totalPages) % totalPages);
  };

  const handleTouchStart = (event) => {
    setTouchStartX(event.changedTouches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX === null) return;

    const delta = event.changedTouches[0].clientX - touchStartX;

    if (delta < -50) {
      handleNext();
    } else if (delta > 50) {
      handlePrev();
    }

    setTouchStartX(null);
  };

  return (
    <section id="doctor-row" className="bg-white py-10 sm:py-14">
      <Container>
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${page}-${cardsPerPage}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid gap-5 md:grid-cols-2 xl:grid-cols-5"
            >
              {visibleDoctors.map(
                ({ name, specialty, image, experience, rating }, index) => (
                  <motion.button
                    key={name}
                    type="button"
                    onClick={() => onDoctorSelect(name)}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    whileHover={{ y: -7 }}
                    whileTap={{ scale: 0.99 }}
                    className={`group overflow-hidden rounded-[2rem] border bg-white text-left transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                      selectedDoctor === name
                        ? "border-[#16A34A] shadow-[0_28px_70px_-34px_rgba(22,163,74,0.28)]"
                        : "border-slate-200 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.18)] hover:border-[#BFDBFE] hover:shadow-[0_26px_55px_-32px_rgba(37,99,235,0.18)]"
                    }`}
                  >
                    <div className="relative h-52 overflow-hidden bg-[#F8FAFC]">
                      <Image
                        src={image}
                        alt={`${name} profile portrait`}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/88 px-3 py-1.5 text-xs font-semibold text-[#0F172A] shadow-sm backdrop-blur">
                        <Star className="h-3.5 w-3.5 fill-[#FBBF24] text-[#FBBF24]" />
                        {rating}
                      </div>
                      <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#DCFCE7]/95 px-3 py-1.5 text-xs font-semibold text-[#166534] shadow-sm">
                        <Check className="h-3.5 w-3.5" />
                        Available
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-[#0F172A]">{name}</h3>
                      <p className="mt-1 text-sm text-[#64748B]">{specialty}</p>

                      <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#F8FAFC] px-4 py-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-[#94A3B8]">
                            Experience
                          </p>
                          <p className="mt-1 text-sm font-semibold text-[#0F172A]">
                            {experience}
                          </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-sm">
                          <CalendarClock className="h-4 w-4" />
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                            selectedDoctor === name
                              ? "bg-[#DCFCE7] text-[#166534]"
                              : "bg-[#EEF4FF] text-[#2563EB]"
                          }`}
                        >
                          {selectedDoctor === name ? "Selected Specialist" : "Open Today"}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#2563EB]">
                          View Profile
                          <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </motion.button>
                )
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-8">
          <button
            type="button"
            onClick={handlePrev}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-[#2563EB] hover:text-[#2563EB]"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setPage(index)}
                aria-label={`Go to specialist page ${index + 1}`}
                className={`h-2.5 rounded-full transition ${
                  page === index ? "w-6 bg-[#2563EB]" : "w-2.5 bg-slate-300"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-[#2563EB] hover:text-[#2563EB]"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </Container>
    </section>
  );
}
