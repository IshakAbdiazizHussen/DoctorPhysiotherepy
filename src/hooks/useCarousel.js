"use client";

import { useState } from "react";
import { mod } from "@/lib/utils";

export default function useCarousel(total, initialIndex = 0) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const goTo = (index) => setActiveIndex(mod(index, total));
  const next = () => setActiveIndex((current) => mod(current + 1, total));
  const prev = () => setActiveIndex((current) => mod(current - 1, total));

  return { activeIndex, setActiveIndex, goTo, next, prev };
}

