import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ParallaxSectionProps {
  className?: string;
  title: string;
  children?: ReactNode;
}

export const ParallaxSection = ({
  className,
  title,
  children,
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const titleElement = titleRef.current;
    const line = lineRef.current;

    if (!section || !titleElement || !line) return;

    // Create timeline for this section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
      },
    });

    // Animate title and line
    tl.from(titleElement, {
      scale: 0.3,
      rotation: 45,
      opacity: 0,
      ease: "power2.out",
    }).from(
      line,
      {
        scaleX: 0,
        transformOrigin: "left center",
        ease: "none",
      },
      0
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative h-screen flex flex-col items-center justify-center ${
        className || ""
      }`}
    >
      <div className="absolute inset-0 -z-10" />

      <div className="text-center space-y-8">
        <h1
          ref={titleRef}
          className="text-6xl font-bold text-white text-shadow-lg"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
        >
          {title}
        </h1>

        <div ref={lineRef} className="w-32 h-1 bg-white mx-auto" />

        {children}
      </div>
    </section>
  );
};
