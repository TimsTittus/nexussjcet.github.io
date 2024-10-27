"use client";
import EventsPage from "@/components/EventsPage";
import Hero from "@/components/Hero";
import History from "@/components/History";
import Navbar from "@/components/Navbar";
import TeamsPage from "@/components/TeamsPage";
import GridPattern from "@/components/magicui/grid-pattern";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  
  // Create refs for each section
  const heroRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const teamsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (section: "home" | "history" | "events" | "teams" | "footer") => {
    switch (section) {
      case "home":
        heroRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "history":
        historyRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "events":
        eventsRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "teams":
        teamsRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "footer":
        footerRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
    }
  };

  if (loading) {
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center">
        <div className="w-96">
          {/* biome-ignore lint/a11y/useAltText: <explanation> */}
          <img
            src="./logo.svg"
            className="repeat-infinite animate-pulse transition-all ease-out"
          />
        </div>
      </main>
    );
  }

  return (
    <div className="relative h-auto w-screen">
      <GridPattern
        width={50}
        height={50}
        strokeDasharray="5,5"
        className="absolute inset-0"
      />
      {/* Navbar visible only on md screens and above */}
      <div className="hidden md:block">
        <Navbar
          scrollToSection={scrollToSection} // Pass the function as a prop
        />
      </div>
      <div ref={heroRef}>
        <Hero />
      </div>
      <div className="flex h-auto w-full items-center justify-center">
        <div className="flex h-auto w-full flex-col items-end justify-center gap-10">
          <section ref={historyRef}>
            <History />
          </section>
          <section ref={eventsRef}>
            <EventsPage />
          </section>
          <section className="hidden" ref={teamsRef}>
            <TeamsPage />
          </section>        
        </div>
      </div>
    </div>
  );
}