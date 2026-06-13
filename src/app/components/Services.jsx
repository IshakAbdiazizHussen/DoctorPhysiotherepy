"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
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

export default function Services({ selectedDoctor, onDoctorSelect, embedded = false }) {
  const trackRef = useRef(null);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else if (window.innerWidth < 1440) {
        setCardsPerPage(3);
      } else {
        setCardsPerPage(4);
      }
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);

    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  const totalPages = Math.max(1, Math.ceil(doctors.length / cardsPerPage));

  const scrollToPage = (page) => {
    const track = trackRef.current;
    if (!track) return;

    const nextPage = ((page % totalPages) + totalPages) % totalPages;
    const firstCard = track.querySelector("[data-doctor-card]");
    if (!firstCard) return;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = 40;
    const offset = nextPage * (cardWidth + gap) * cardsPerPage;

    track.scrollTo({
      left: offset,
      behavior: "smooth",
    });

    setActivePage(nextPage);
  };

  const handleNext = () => {
    scrollToPage(activePage + 1);
  };

  const handlePrev = () => {
    scrollToPage(activePage - 1);
  };

  const handleWheel = (event) => {
    const track = trackRef.current;
    if (!track) return;

    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      track.scrollBy({
        left: event.deltaY,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector("[data-doctor-card]");
    if (!firstCard) return;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = 40;
    const pageWidth = (cardWidth + gap) * cardsPerPage;
    const page = Math.round(track.scrollLeft / pageWidth);
    setActivePage(Math.max(0, Math.min(totalPages - 1, page)));
  };

  const content = (
    <>
      <div
        className="overflow-hidden px-2 sm:px-4"
        onWheel={handleWheel}
      >
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory gap-10 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {doctors.map(({ name, specialty, image }) => {
            const isActive = selectedDoctor === name;

            return (
              <button
                key={name}
                data-doctor-card
                type="button"
                onClick={() => onDoctorSelect(name)}
                className={`flex min-h-[160px] w-[88vw] shrink-0 snap-start items-center gap-5 rounded-[24px] border bg-white px-5 py-5 text-left transition sm:w-[360px] lg:w-[340px] xl:w-[360px] ${
                  isActive
                    ? "border-[#22C55E] shadow-[0_20px_40px_-34px_rgba(34,197,94,0.35)] dark:border-[#34D399] dark:shadow-[0_20px_40px_-34px_rgba(52,211,153,0.22)]"
                    : "border-[#E5E7EB] shadow-[0_18px_36px_-34px_rgba(15,23,42,0.18)] hover:-translate-y-1 hover:shadow-[0_22px_40px_-34px_rgba(15,23,42,0.22)] dark:border-[#1E293B] dark:bg-[#111827] dark:shadow-[0_18px_36px_-34px_rgba(2,6,23,0.85)] dark:hover:shadow-[0_22px_40px_-34px_rgba(2,6,23,0.95)]"
                }`}
              >
                <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full bg-slate-100">
                  <Image
                    src={image}
                    alt={`${name} portrait`}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-[22px] font-bold leading-[1.1] text-[#0F172A] dark:text-[#F8FAFC]">
                    {name}
                  </h3>
                  <p className="mt-2 text-[16px] leading-[1.35] text-[#64748B] dark:text-[#94A3B8]">
                    {specialty}
                  </p>

                  <span className="mt-5 inline-flex h-8 items-center gap-2 rounded-full bg-[#DCFCE7] px-4 text-[16px] font-medium text-[#16A34A] dark:bg-[rgba(52,211,153,0.16)] dark:text-[#34D399]">
                    <CheckCircle2 className="h-4 w-4 fill-current" />
                    Available
                  </span>
                </div>

                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0F172A] transition hover:border-[#2563EB] hover:text-[#2563EB] dark:border-[#1E293B] dark:bg-[#0F172A] dark:text-[#F8FAFC] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]">
                  <ChevronRight className="h-5 w-5" />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 flex items-center justify-center gap-16">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous specialists"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0F172A] shadow-[0_16px_30px_-28px_rgba(15,23,42,0.2)] transition hover:border-[#2563EB] hover:text-[#2563EB] dark:border-[#1E293B] dark:bg-[#111827] dark:text-[#F8FAFC] dark:shadow-[0_16px_30px_-28px_rgba(2,6,23,0.8)] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          {Array.from({ length: totalPages }).map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              onClick={() => scrollToPage(dotIndex)}
              aria-label={`Go to specialists page ${dotIndex + 1}`}
              className={`h-3 w-3 rounded-full transition ${
                activePage === dotIndex
                  ? "bg-[#2563EB] dark:bg-[#60A5FA]"
                  : "bg-[#D1D5DB] dark:bg-[#334155]"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next specialists"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0F172A] shadow-[0_16px_30px_-28px_rgba(15,23,42,0.2)] transition hover:border-[#2563EB] hover:text-[#2563EB] dark:border-[#1E293B] dark:bg-[#111827] dark:text-[#F8FAFC] dark:shadow-[0_16px_30px_-28px_rgba(2,6,23,0.8)] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </>
  );

  if (embedded) {
    return <div id="doctor-row">{content}</div>;
  }

  return (
    <section id="doctor-row" className="bg-white pb-16 pt-10 dark:bg-[#020617] sm:pb-20 sm:pt-14">
      <Container className="max-w-[1880px] px-6 sm:px-8 xl:px-12">
        {content}
      </Container>
    </section>
  );
}
