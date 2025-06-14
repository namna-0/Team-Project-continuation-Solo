"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Particles from "./_components/Particles";
import { Hero } from "./_components/Hero";
import { BusinessSection } from "./_components/BusinessSection";
import { ParallaxSection } from "./_components/ParralloxSection";
import { useGSAP } from "@gsap/react";
import Header from "./_components/Header";
import Services from "./_components/Services";
import { useEffect, useState } from "react";
import LoadingPage from "@/loading";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EnhancedHomePage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let tl = gsap.timeline({
      onComplete: () => {
        setLoading(false);
      },
    });

    tl.to(".box", {
      scale: 0,
      y: 60,
      rotate: 400,
      duration: 1,
      repeat: 1,
      yoyo: true,
      delay: 0.5,
      stagger: {
        amount: 1.5,
        from: "end",
        grid: [3, 3],
      },
    });
    tl.to(".container", {
      rotate: "-405deg",
      scale: 0,
      duration: 1,
    });
    tl.to(".wrapper", {
      opacity: 0,
      display: "none",
    });
  });

  if (loading) {
    <LoadingPage />;
  }
  return (
    <div className="relative w-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" />
        <div className="absolute top-96 left-1/2 -translate-x-1/2 w-[1000px] z-30">
          {/* glow ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-blue-400/20 via-cyan-400/10 to-transparent blur-3xl scale-150 animate-pulse"></div>

          <div
            className="absolute inset-0 rounded-full bg-gradient-radial from-blue-500/30 via-cyan-500/15 to-transparent blur-2xl scale-125 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute inset-0 rounded-full bg-gradient-radial from-white/20 via-blue-300/20 to-transparent blur-xl scale-110 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <img
            src="https://res.cloudinary.com/dpbmpprw5/image/upload/v1749803749/earth_Large_p9es47.png"
            alt="Earth"
            className="relative w-full opacity-40 pointer-events-none rotating-earth"
            style={{
              filter:
                "drop-shadow(0 0 50px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 100px rgba(34, 197, 94, 0.4)) drop-shadow(0 0 150px rgba(147, 51, 234, 0.2))",
            }}
          />
        </div>
        <Particles
          className="absolute inset-0 z-10"
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={10}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <Header />
      <Hero />
      <BusinessSection />
      <Services />
      <ParallaxSection className="section-2" title="Үйлчилгээний төрлүүд" />
      <ParallaxSection className="section-3" title="Манай баг" />
      <ParallaxSection className="section-4" title="Холбогдох" />
    </div>
  );
}
