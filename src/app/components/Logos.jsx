import {
  BadgeCheck,
  HeartHandshake,
  ShieldPlus,
  Stethoscope,
} from "lucide-react";
import Container from "./Container";

const items = [
  {
    icon: BadgeCheck,
    title: "Trusted & Certified",
    text: "Qualified care from trained rehabilitation professionals.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Care",
    text: "Treatment plans designed around your health goals.",
  },
  {
    icon: Stethoscope,
    title: "Modern Recovery",
    text: "Evidence-based methods for mobility and pain relief.",
  },
  {
    icon: ShieldPlus,
    title: "Compassionate Support",
    text: "A calm clinic experience built on guidance and trust.",
  },
];

export default function Logos() {
  return (
    <section id="trust" className="bg-[#F8FAFC] py-16 sm:py-20">
      <Container>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-[1.5rem] border border-slate-200 bg-white px-5 py-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#0F172A]">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#64748B]">{text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
