export const serviceCategories = [
  "All",
  "Pain Relief",
  "Sports Injury",
  "Rehabilitation",
  "Mobility",
];

export const serviceCards = [
  {
    title: "Advanced mobility therapy",
    text: "Programs that rebuild balance, posture, and movement quality.",
    category: "Mobility",
  },
  {
    title: "Injury recovery support",
    text: "Safe rehabilitation pathways after surgery and sports injuries.",
    category: "Sports Injury",
  },
  {
    title: "Pain relief treatment",
    text: "Manual therapy and guided care to reduce pain and inflammation.",
    category: "Pain Relief",
  },
  {
    title: "Neuromuscular re-education",
    text: "Restoring movement, stability, and muscle control effectively.",
    category: "Rehabilitation",
  },
];

export const treatmentOptions = serviceCards.map((service) => service.title);

