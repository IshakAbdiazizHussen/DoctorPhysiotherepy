import React from "react";
import Image from "next/image";

export default function Container() {
  return (
    <section className="bg-gradient-to-b from-transparent to-sky-300 px-6 md:px-20 py-16">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row gap-10 md:items-start">
        
        {/* LEFT SIDE – text */}
        <div className="flex-1">
          <h4 className="text-3xl md:text-4xl font-light mb-4">About Us</h4>
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6 leading-snug">
            We are the best <br /> physiotherapy in town
          </h1>
          <p className="text-base md:text-lg mb-8">
            You can get physiotherapy in a place that is always ready <br />
            to serve our customers and community.
          </p>

          <div className="flex flex-col md:flex-row gap-10 md:gap-14">
            <div className="font-bold md:w-1/2 text-xl md:text-2xl">
              👁️ Vision
              <p className="font-medium mt-2 text-sm md:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Iure modi dolores quod voluptate praesentium ipsum similique, minus voluptatibus.
              </p>
            </div>
            <div className="font-bold md:w-1/2 text-xl md:text-2xl">
              🕶️ Mission
              <p className="font-medium mt-2 text-sm md:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Iure modi dolores quod voluptate praesentium ipsum similique, minus voluptatibus.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – images */}
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          {["physio", "physio1", "physio2"].map((img, idx) => (
            <div key={idx} className="relative w-[120px] sm:w-[150px] md:w-[180px] h-[250px] sm:h-[300px] md:h-[380px]">
              <Image
                src={`/images/${img}.jpg`}
                alt={`Image ${idx + 1}`}
                fill
                className="object-cover rounded-[30px] md:rounded-[40px]"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
