import Image from "next/image";
import Logos from "./components/Logos";
import Container from "./components/Container";
import Services from "./components/Services";
import Individual from "./components/Individual";

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-b from-transparent to-sky-300 min-h-screen text-black flex flex-col lg:flex-row 
      items-center gap-12 lg:justify-around p-5 lg:p-20">
        
        {/* Text Section */}
        <div className="text-center lg:text-left p-5 lg:p-0">
          <h6 className="font-light text-lg lg:text-xl mb-3">Welcome To HealthyBase therpy</h6>
          <h2 className="font-bold text-4xl md:text-5xl lg:text-7xl mb-5 leading-tight">
            Destination <br />
            For Relief <br />
            & Wellness
          </h2>
          <p className="text-base md:text-lg lg:text-2xl font-light mb-5">
            Now we are welcoming you to our healthy place and cheap drugs
          </p>
          <button className="bg-green-300 rounded-full px-6 py-3 text-base md:text-lg hover:bg-green-400 transition">
            Click this
          </button>
        </div>

        {/* Image Section */}
        <div className="flex items-center justify-center my-10 lg:my-0">
          <Image
            className="rounded-full"
            src="/images/female.jpg"
            width={450} // smaller on mobile
            height={450}
            alt="Female"
          />
        </div>

        {/* Stats Section */}
        <div className="flex flex-col sm:flex-row gap-5 mt-10 lg:mt-0">
          <div className="border border-green-600 rounded-2xl w-40 sm:w-48 px-4 py-4 font-light text-center">
            <h1 className="text-2xl font-semibold">48+</h1>
            <p className="text-sm">Professional Staff</p>
          </div>
          <div className="border border-green-600 rounded-2xl w-40 sm:w-48 px-4 py-4 font-light text-center">
            <h1 className="text-2xl font-semibold">27+</h1>
            <p className="text-sm">Years Of Experience</p>
          </div>
          <div className="border border-green-600 rounded-2xl w-40 sm:w-48 px-4 py-4 font-light text-center">
            <h1 className="text-2xl font-semibold">3,578</h1>
            <p className="text-sm">Support Clients</p>
          </div>
        </div>
      </div>

      {/* Other Sections */}

      <Logos />
      <Container />
      <Services />
      <Individual />
    </>
  );
}
