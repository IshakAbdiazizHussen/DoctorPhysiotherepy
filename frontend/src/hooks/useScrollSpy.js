"use client";

import { useEffect, useState } from "react";

export default function useScrollSpy(items, fallback = "#top") {
  const [activeSection, setActiveSection] = useState(fallback);

  useEffect(() => {
    const allowedTabs = new Set(items.map((item) => item.href));

    const syncFromHash = () => {
      const nextHash = window.location.hash || fallback;
      setActiveSection(allowedTabs.has(nextHash) ? nextHash : fallback);
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [items, fallback]);

  return [activeSection, setActiveSection];
}

