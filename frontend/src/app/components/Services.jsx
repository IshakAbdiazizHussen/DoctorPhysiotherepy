"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import Container from "./Container";

const doctorImages = [
  "/images/female.jpg",
  "/images/physio1.jpg",
  "/images/physio2.jpg",
  "/images/portM.jpg",
  "/images/physio.jpg",
];

function mod(value, total) {
  return ((value % total) + total) % total;
}

function relativeOffset(index, activeIndex, total) {
  const forward = mod(index - activeIndex, total);
  const backward = forward - total;
  return Math.abs(forward) < Math.abs(backward) ? forward : backward;
}

export default function Services({
  doctors,
  selectedDoctorId,
  onDoctorSelect,
  embedded = false,
}) {
  const preparedDoctors = useMemo(
    () =>
      doctors.map((doctor, index) => ({
        ...doctor,
        image: doctorImages[index % doctorImages.length],
      })),
    [doctors]
  );
  const [isMobile, setIsMobile] = useState(false);
  const currentDoctorId = selectedDoctorId || preparedDoctors[0]?.id || "";
  const activeIndex = Math.max(
    0,
    preparedDoctors.findIndex((doctor) => doctor.id === currentDoctorId)
  );

  useEffect(() => {
    const syncViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    syncViewport();
    window.addEventListener("resize", syncViewport);
    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  const positionedDoctors = useMemo(
    () =>
      preparedDoctors.map((doctor, index) => ({
        ...doctor,
        index,
        offset: relativeOffset(index, activeIndex, preparedDoctors.length),
      })),
    [activeIndex, preparedDoctors]
  );

  const goToIndex = (index) => {
    if (preparedDoctors.length === 0) {
      return;
    }

    const nextIndex = mod(index, preparedDoctors.length);
    onDoctorSelect(preparedDoctors[nextIndex].id);
  };

  const handleNext = () => {
    goToIndex(activeIndex + 1);
  };

  const handlePrev = () => {
    goToIndex(activeIndex - 1);
  };

  const getCardStyle = (offset) => {
    const configs = isMobile
      ? {
          0: {
            x: 0,
            scale: 1,
            rotate: 0,
            opacity: 1,
            zIndex: 50,
          },
          1: {
            x: 180,
            scale: 0.88,
            rotate: 8,
            opacity: 0.72,
            zIndex: 30,
          },
          "-1": {
            x: -180,
            scale: 0.88,
            rotate: -8,
            opacity: 0.72,
            zIndex: 30,
          },
          2: {
            x: 280,
            scale: 0.76,
            rotate: 12,
            opacity: 0.3,
            zIndex: 10,
          },
          "-2": {
            x: -280,
            scale: 0.76,
            rotate: -12,
            opacity: 0.3,
            zIndex: 10,
          },
        }
      : {
          0: {
            x: 0,
            scale: 1,
            rotate: 0,
            opacity: 1,
            zIndex: 50,
          },
          1: {
            x: 255,
            scale: 0.9,
            rotate: 9,
            opacity: 0.8,
            zIndex: 30,
          },
          "-1": {
            x: -255,
            scale: 0.9,
            rotate: -9,
            opacity: 0.8,
            zIndex: 30,
          },
          2: {
            x: 420,
            scale: 0.78,
            rotate: 13,
            opacity: 0.38,
            zIndex: 10,
          },
          "-2": {
            x: -420,
            scale: 0.78,
            rotate: -13,
            opacity: 0.38,
            zIndex: 10,
          },
        };

    return (
      configs[offset] ?? {
        x: offset > 0 ? 520 : -520,
        scale: 0.68,
        rotate: offset > 0 ? 16 : -16,
        opacity: 0,
        zIndex: 0,
      }
    );
  };

  const content = (
    <>
      <div className="overflow-hidden px-1 sm:px-3">
        <div className="relative z-0 mx-auto h-[470px] w-full max-w-[1160px] select-none sm:h-[540px]">
          {positionedDoctors.map(({ id, full_name, specialty, image, offset }) => {
            const cardStyle = getCardStyle(offset);
            const isCenter = offset === 0;
            const isActive = currentDoctorId === id;

            return (
              <motion.div
                key={id}
                initial={false}
                animate={{
                  x: cardStyle.x,
                  scale: cardStyle.scale,
                  rotate: cardStyle.rotate,
                  opacity: cardStyle.opacity,
                }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                style={{ zIndex: cardStyle.zIndex }}
                className={`absolute left-1/2 top-0 h-[430px] w-[255px] -translate-x-1/2 overflow-hidden rounded-[34px] border text-left shadow-[0_30px_60px_-36px_rgba(15,23,42,0.32)] transition sm:h-[500px] sm:w-[295px] ${
                  isActive
                    ? "border-[rgba(20,184,166,0.72)] dark:border-[rgba(52,211,153,0.5)]"
                    : "border-white/70 dark:border-[#1E293B]"
                } pointer-events-none`}
                aria-hidden={!isCenter}
              >
                <div className="relative h-full w-full bg-[#0F172A] dark:bg-[#111827]">
                  <Image
                    src={image}
                    alt={`${full_name} portrait`}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.2)_0%,rgba(15,23,42,0.02)_28%,rgba(15,23,42,0.58)_74%,rgba(15,23,42,0.94)_100%)] dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.16)_0%,rgba(2,6,23,0.06)_28%,rgba(2,6,23,0.68)_76%,rgba(2,6,23,0.96)_100%)]" />

                  <div className="absolute inset-x-0 top-0 p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="max-w-[170px] text-white">
                        <h3 className="text-[24px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[28px]">
                          {full_name}
                        </h3>
                        <p className="mt-2 text-[14px] leading-6 text-white/78 sm:text-[15px]">
                          {specialty}
                        </p>
                      </div>

                      <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[rgba(220,252,231,0.88)] px-3 text-[12px] font-medium text-[#16A34A] backdrop-blur-sm dark:bg-[rgba(52,211,153,0.18)] dark:text-[#6EE7B7]">
                        <CheckCircle2 className="h-3.5 w-3.5 fill-current" />
                        Available
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <div className="flex items-end justify-between gap-4">
                      <div className="max-w-[130px]">
                        <p className="text-[13px] uppercase tracking-[0.24em] text-white/58">
                          Specialist
                        </p>
                        <p className="mt-2 text-[14px] leading-6 text-white/82">
                          Personalized rehabilitation support and focused care.
                        </p>
                      </div>

                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#0F172A] shadow-[0_18px_34px_-20px_rgba(255,255,255,0.55)] dark:bg-[#F8FAFC]">
                        {isCenter ? (
                          <Play className="ml-0.5 h-5 w-5 fill-current" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-12 flex items-center justify-center gap-10 sm:gap-16">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous specialists"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0F172A] shadow-[0_16px_30px_-28px_rgba(15,23,42,0.2)] transition hover:border-[#2563EB] hover:text-[#2563EB] dark:border-[#1E293B] dark:bg-[#111827] dark:text-[#F8FAFC] dark:shadow-[0_16px_30px_-28px_rgba(2,6,23,0.8)] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          {preparedDoctors.map((doctor, index) => (
            <button
              key={doctor.id}
              type="button"
              onClick={() => goToIndex(index)}
              aria-label={`Show ${doctor.full_name}`}
              className={`h-3 w-3 rounded-full transition ${
                activeIndex === index
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
    return (
      <div id="doctor-row" className="relative isolate z-10 scroll-mt-28 sm:scroll-mt-32">
        {preparedDoctors.length > 0 ? content : null}
      </div>
    );
  }

  return (
    <section
      id="doctor-row"
      className="relative isolate z-10 scroll-mt-28 bg-transparent pb-16 pt-16 sm:scroll-mt-32 sm:pb-20 sm:pt-20"
    >
      <Container className="max-w-[1880px] px-6 sm:px-8 xl:px-12">
        {preparedDoctors.length > 0 ? content : null}
      </Container>
    </section>
  );
}
