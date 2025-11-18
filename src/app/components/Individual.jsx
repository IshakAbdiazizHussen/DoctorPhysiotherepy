import React from 'react';
import Image from "next/image";
import Principles from './Principles';

export default function Individual() {
  return (
    <div className="bg-gradient-to-b from-transparent to-sky-300 flex flex-col md:flex-row gap-10 p-6 md:p-20 items-center">
      
      {/* Image */}
      <div className="flex justify-center md:flex-1">
        <Image
          className="rounded-full"
          src="/images/portM.jpg"
          width={300} // smaller on mobile
          height={300}
          alt="Female"
        />
      </div>

      {/* Text + Principles */}
      <div className="md:flex-1 p-4 md:p-0">
        <h5 className="text-center md:text-left font-bold underline mb-4">Always Around Us</h5>
        <h1 className="font-bold text-3xl md:text-5xl mb-6">
          Individual Tailored Treatment:<br />
          Your Path To Wellness
        </h1>
        <p className="mb-6 text-base md:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Dolore deserunt officia tenetur voluptates quas asperiores.
        </p>
        <Principles />
      </div>

    </div>
  );
}
