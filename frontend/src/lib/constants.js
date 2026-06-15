import {
  HeartPulse,
  PhoneCall,
  ShieldPlus,
  Stethoscope,
  UserRound,
} from "lucide-react";

export const NAV_ITEMS = [
  { label: "Healthcare", href: "#top", icon: HeartPulse },
  { label: "Doctors", href: "#doctor-row", icon: UserRound },
  { label: "Consulting", href: "#appointment", icon: Stethoscope },
  { label: "Rehabilitation", href: "#rehabilitation", icon: ShieldPlus },
  { label: "Contact", href: "#trust", icon: PhoneCall },
];

export const THEME_STORAGE_KEY = "doctorphysio-theme";

