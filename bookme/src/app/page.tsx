"use client";
import LoadingPage from "@/loading";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
  useGSAP(() => {
    let tl = gsap.timeline();

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
  return (
    <>
      <LoadingPage />
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-white">
        <section className="text-center max-w-xl">
          <h1 className="text-4xl font-bold mb-4">
            Book Your Appointment Easily
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Fast, simple, and reliable scheduling for your business or personal
            needs.
          </p>
          <button className="bg-primary text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition">
            Book Now
          </button>
        </section>
        {/* Services Section */}
        <section className="mt-16 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 border rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Medical</h2>
            <p className="text-sm text-muted-foreground">
              Schedule with doctors, clinics, or health professionals.
            </p>
          </div>
          <div className="p-6 border rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Salon & Spa</h2>
            <p className="text-sm text-muted-foreground">
              Book a beauty or grooming service with easeasd.
            </p>
          </div>
          <div className="p-6 border rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Consulting</h2>
            <p className="text-sm text-muted-foreground">
              Set up meetings with experts in any fiel.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
