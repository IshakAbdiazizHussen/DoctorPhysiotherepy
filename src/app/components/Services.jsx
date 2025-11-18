import React from 'react';

export default function Services() {
  return (
    <div className="text-center bg-gradient-to-b from-transparent to-sky-300 px-6 py-16">
      <div className="text-lg md:text-xl font-bold mb-2">OUR SERVICES</div>
      <p className="font-bold text-3xl md:text-4xl mb-10">We Provide The Best Service</p>

      <div className="flex flex-wrap gap-6 justify-center">
        {[
          { icon: "🦶", title: "Foot Injury" },
          { icon: "💀", title: "Head Injury" },
          { icon: "🩻", title: "Bone Injury" },
        ].map((service, idx) => (
          <div key={idx} className="bg-white rounded-3xl w-52 sm:w-60 shadow-md p-6 flex flex-col items-center text-center">
            <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center mb-4 text-xl">
              {service.icon}
            </div>
            <p className="font-bold text-lg mb-2">{service.title}</p>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Foot injuries are among the most common physical problems people experience.
            </p>
            <button className="bg-green-600 text-black rounded-full px-4 py-2 hover:bg-green-500 transition">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
