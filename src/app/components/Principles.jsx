import React from "react";
import { Battery, CheckCircle2, Heart, Shield, User } from "lucide-react";

const principles = [
  { icons: Battery, title: "Short & Powerful", text: "Keep it short, focused, and impactful." },
  { icons: CheckCircle2, title: "Clear Benefit", text: "Make the benefit obvious at a glance." },
  { icons: Heart, title: "Emotional Connection", text: "Use a strong emotional hook that resonates." },
  { icons: Shield, title: "Safe & Trusted", text: "Reassure patients with safety and trust." },
  { icons: User, title: "Patient-Centered", text: "Decisions made with you, not for you." },
];

export default function Principles() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {principles.map(({ icons: Icon, title, text }) => (
        <div key={title} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white/70 p-4 shadow-sm">
          <div className="mt-1 rounded-full bg-green-300 p-2">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-600">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
