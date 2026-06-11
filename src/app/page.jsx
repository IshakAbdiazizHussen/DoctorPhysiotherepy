import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Services from "./components/Services";
import Principles from "./components/Principles";
import Individual from "./components/Individual";
import Logos from "./components/Logos";

export default function HomePage() {
  return (
    <main
      id="top"
      className="min-h-screen bg-white text-slate-900"
    >
      <Hero />
      <Stats />
      <Services />
      <Principles />
      <Individual />
      <Logos />
    </main>
  );
}
