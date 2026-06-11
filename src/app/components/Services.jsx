"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronRight } from "lucide-react";
import Container from "./Container";

const doctors = [
  {
    name: "Dr. Sarah Wilson",
    specialty: "Physiotherapist",
    image: "/images/female.jpg",
  },
  {
    name: "Dr. James Carter",
    specialty: "Rehabilitation Expert",
    image: "/images/physio1.jpg",
  },
  {
    name: "Dr. Emily Brown",
    specialty: "Sports Therapist",
    image: "/images/physio2.jpg",
  },
  {
    name: "Dr. Michael Lee",
    specialty: "Movement Specialist",
    image: "/images/portM.jpg",
  },
  {
    name: "Dr. Olivia Harris",
    specialty: "Pain Management",
    image: "/images/physio.jpg",
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
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {visibleDoctors.map(({ name, specialty, image }) => (
              <button
                key={name}
                type="button"
                onClick={() => onDoctorSelect(name)}
                className={`group flex items-center gap-4 rounded-[1.75rem] border bg-white px-4 py-4 text-left shadow-[0_22px_45px_-32px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-30px_rgba(37,99,235,0.16)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                  selectedDoctor === name
                    ? "border-[#16A34A] shadow-[0_24px_48px_-30px_rgba(22,163,74,0.25)]"
                    : "border-slate-200 hover:border-[#BFDBFE]"
                }`}
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-slate-100">
                  <Image
                    src={image}
                    alt={`${name} profile portrait`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-lg font-semibold text-[#0F172A]">
                    {name}
                  </h3>
                  <p className="truncate text-sm text-[#64748B]">{specialty}</p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-semibold text-[#166534]">
                      <Check className="h-3.5 w-3.5" />
                      Available
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition group-hover:border-[#2563EB] group-hover:text-[#2563EB]">
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
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
