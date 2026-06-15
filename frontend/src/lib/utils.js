export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function mod(value, total) {
  return ((value % total) + total) % total;
}

const LOCAL_SECTION_MAP = {
  "/": new Set(["#top", "#doctor-row", "#appointment", "#rehabilitation", "#trust", "#services"]),
  "/about": new Set(["#top", "#rehabilitation", "#trust"]),
  "/services": new Set(["#top", "#services", "#doctor-row"]),
  "/appointment": new Set(["#top", "#appointment"]),
  "/doctors": new Set(["#top", "#doctor-row"]),
  "/contact": new Set(["#top"]),
};

export function resolveSectionHref(pathname, href) {
  if (!href.startsWith("#")) return href;

  const supportedSections = LOCAL_SECTION_MAP[pathname] ?? LOCAL_SECTION_MAP["/"];
  return supportedSections.has(href) ? href : `/${href}`;
}
