"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const Header = () => {
  useEffect(() => {
    const links = gsap.utils.toArray<HTMLAnchorElement>("nav a");
    const sections = document.querySelectorAll<HTMLElement>("section[id]");

    // ScrollTrigger for each section
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) {
            const correspondingLink = document.querySelector(
              `nav a[href="#${section.id}"]`
            );
            if (correspondingLink) {
              links.forEach((link: any) => link.classList.remove("active"));
              correspondingLink.classList.add("active"); // ✅ fixed here
            }
          }
        },
      });
    });

    // Smooth scroll
    links.forEach((link: any) => {
      link.addEventListener("click", (e: MouseEvent) => {
        e.preventDefault();
        const target = link.getAttribute("href");
        gsap.to(window, {
          duration: 1,
          scrollTo: target,
          ease: "power2.inOut",
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      links.forEach((link: any) => {
        link.removeEventListener("click", () => {});
      });
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mx-[25%] mt-2 h-14 grid grid-cols-3 items-center px-8 rounded-full backdrop-blur-2xl bg-black/50 shadow-[inset_0_1px_0px_rgba(255,255,255,0.2),0_2px_8px_rgba(0,0,0,0.16)] max-lg:mx-[15%] max-md:mx-[5%] max-md:px-5 max-md:grid-cols-2 max-md:justify-between">
      <div className="text-white text-lg font-bold">Bookme</div>
      <ul className="flex items-center justify-center gap-4 list-none max-md:hidden">
        <li>
          <a
            href="#hero"
            className="text-white/90 text-sm font-medium px-4 py-2 rounded-full transition hover:bg-white/10 hover:text-white"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#services"
            className="text-white/90 text-sm font-medium px-4 py-2 rounded-full transition hover:bg-white/10 hover:text-white"
          >
            Байгууллага
          </a>
        </li>
        <li>
          <a
            href="#vertical-services"
            className="text-white/90 text-sm font-medium px-4 py-2 rounded-full transition hover:bg-white/10 hover:text-white"
          >
            Үйлчлүүлэгч
          </a>
        </li>
        <li>
          <a
            href="#footer"
            className="text-white/90 text-sm font-medium px-4 py-2 rounded-full transition hover:bg-white/10 hover:text-white"
          >
            <span className="whitespace-nowrap">Холбоо барих</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
