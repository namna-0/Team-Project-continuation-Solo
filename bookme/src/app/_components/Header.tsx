import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const Header = () => {
  const navRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const nav = navRef.current;
    if (!nav) return;

    // Set initial state
    gsap.set(nav, {
      marginLeft: isMobile ? "5%" : "10%",
      marginRight: isMobile ? "5%" : "10%",
      backdropFilter: "blur(0px)",
      background: "rgba(0,0,0,0)",
    });

    // Only create scroll trigger if not mobile
    let scrollTrigger: ScrollTrigger | null = null;
    if (!isMobile) {
      scrollTrigger = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          const shouldShrink = self.progress > 0.05;

          if (animationRef.current) {
            animationRef.current.kill();
          }

          animationRef.current = gsap.to(nav, {
            duration: 0.5,
            ease: "power2.out",
            marginLeft: shouldShrink ? "25%" : "10%",
            marginRight: shouldShrink ? "25%" : "10%",
            backdropFilter: shouldShrink ? "blur(8px)" : "blur(0px)",
            background: shouldShrink ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0)",
            overwrite: "auto",
          });
        },
      });
    }

    // Section detection
    const links = gsap.utils.toArray<HTMLAnchorElement>("nav a[href^='#']");
    const sections = gsap.utils.toArray<HTMLElement>("section[id]");
    const triggers: ScrollTrigger[] = [];

    sections.forEach((section) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 30%",
        end: "bottom 30%",
        onEnter: () => updateActiveLink(section.id),
        onEnterBack: () => updateActiveLink(section.id),
      });
      triggers.push(trigger);
    });

    function updateActiveLink(sectionId: string) {
      const correspondingLink = document.querySelector(
        `nav a[href="#${sectionId}"]`
      );
      if (correspondingLink) {
        links.forEach((link) => link.classList.remove("active"));
        correspondingLink.classList.add("active");
      }
    }

    // Smooth scroll
    const handleClick = (e: MouseEvent, link: HTMLAnchorElement) => {
      e.preventDefault();
      const target = link.getAttribute("href");
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: target,
            offsetY: 80,
          },
          ease: "power2.inOut",
        });
      }
    };

    links.forEach((link) => {
      link.addEventListener("click", (e) => handleClick(e, link));
    });

    return () => {
      scrollTrigger?.kill();
      triggers.forEach((trigger) => trigger.kill());
      links.forEach((link) => {
        link.removeEventListener("click", (e) => handleClick(e, link));
      });
      if (animationRef.current) {
        animationRef.current.kill();
      }
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-4 left-0 right-0 z-50 h-14 px-8 rounded-full transition-all duration-300
        ${
          isMobile
            ? "flex justify-between items-center"
            : "grid grid-cols-12 items-center" // Changed to 12-column grid
        }`}
      style={{
        marginLeft: isMobile ? "5%" : "10%",
        marginRight: isMobile ? "5%" : "10%",
        backdropFilter: "blur(0px)",
        background: "rgba(0,0,0,0)",
        boxShadow:
          "inset 0 1px 0px rgba(255,255,255,0.2), 0 2px 8px rgba(0,0,0,0.16)",
      }}
    >
      {/* Logo - spans 3 columns */}
      <div className="text-white text-lg font-bold col-span-3">Bookme</div>

      {/* Navigation Links - spans 6 columns and centered */}
      <ul
        className={`${
          isMobile
            ? "hidden"
            : "flex items-center justify-center gap-4 list-none col-span-6"
        }`}
      >
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
            href="#vertical-services"
            className="text-white/90 text-sm font-medium px-4 py-2 rounded-full transition hover:bg-white/10 hover:text-white"
          >
            Байгууллага
          </a>
        </li>
        <li>
          <a
            href="#services"
            className="text-white/90 text-sm font-medium px-4 py-2 rounded-full transition hover:bg-white/10 hover:text-white"
          >
            Үйлчлүүлэгч
          </a>
        </li>
        <li>
          <a
            href="#team"
            className="text-white/90 text-sm font-medium px-4 py-2 rounded-full transition hover:bg-white/10 hover:text-white whitespace-nowrap"
          >
            Манай баг
          </a>
        </li>
        <li>
          <a
            href="#footer"
            className="text-white/90 text-sm font-medium px-4 py-2 rounded-full transition hover:bg-white/10 hover:text-white whitespace-nowrap"
          >
            Холбоо барих
          </a>
        </li>
      </ul>

      {/* Button - spans 3 columns and right-aligned */}
      <div
        className={`${isMobile ? "ml-auto" : "col-span-3 flex justify-end"}`}
      >
        <Link href={"/signin"}>
          <button
            className="group px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
            style={{
              background:
                "linear-gradient(to right, #FFFFFF 0%, #E6F3FF 52%, #B3D9FF 100%)",
              color: "#000A17",
              fontSize: "0.875rem",
              fontWeight: "600",
              padding: "0.5rem 1rem",
              borderRadius: "1.5rem",
            }}
          >
            <span className="flex items-center gap-2">
              Нэвтрэх
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
