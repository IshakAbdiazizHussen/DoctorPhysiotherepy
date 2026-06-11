import Image from "next/image";
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

export default function Services() {
  return (
    <section id="doctor-row" className="bg-white py-8 sm:py-10">
      <Container>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {doctors.map(({ name, specialty, image }) => (
            <article
              key={name}
              className="flex items-center gap-4 rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-14 w-14 overflow-hidden rounded-full bg-slate-100">
                <Image
                  src={image}
                  alt={`${name} profile portrait`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-[#0F172A]">
                  {name}
                </h3>
                <p className="truncate text-xs text-[#64748B]">{specialty}</p>
                <span className="mt-2 inline-flex rounded-full bg-[#DCFCE7] px-3 py-1 text-[11px] font-semibold text-[#166534]">
                  Available
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
