import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardSwap, { Card } from "./CardSwap";
import { Calendar, CheckCircle, Search } from "lucide-react";
import { color } from "motion";

export const BusinessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
  const cardAll = [
    {
      title: "Хайж олох",
      image:
        "https://res-console.cloudinary.com/dpbmpprw5/thumbnails/v1/image/upload/v1749805311/dGVzdF93dWpieGo=/drilldown",
      description: "Хүссэн үйлчилгээ, байршлаа сонгоод хайлт хийнэ",
    },
    {
      title: "Цаг сонгох",
      image:
        "https://res-console.cloudinary.com/dpbmpprw5/thumbnails/v1/image/upload/v1749805311/dGVzdF93dWpieGo=/drilldown",
      description: "Тохиромжтой мэргэжилтэн, цагаа сонгоод захиална",
    },
    {
      title: "Хүлээн авах",
      image:
        "https://res-console.cloudinary.com/dpbmpprw5/thumbnails/v1/image/upload/v1749805311/dGVzdF93dWpieGo=/drilldown",
      description: "Цагтаа ирээд өөрийн сонгосон үйлчилгээг аваарай",
    },
  ];
  return (
    <div>
      <section
        ref={sectionRef}
        className="relative  min-h-[200vh] flex flex-col items-center justify-center"
      >
        <div className="absolute inset-0 -z-10" />

        <div className="space-y-8">
          <h1
            ref={titleRef}
            className="text-6xl font-bold"
            style={{
              background:
                "linear-gradient(to right, #FFFFFF 0%, #BBDEFB 52%, #2196F3 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Bookme business
          </h1>

          <div className="w-32 h-1 bg-white mr-auto" />

          <div className="relative py-20 px-6 ">
            <div className="flex gap-8">
              {cardAll.map((card, i) => (
                <div
                  className="w-[280px] h-[300px] rounded-xl mb-5 flex flex-col backdrop-blur-lg border border-white/10 p-1"
                  style={{
                    background:
                      "radial-gradient(50% 50% at 100% 0%, #ffffff1a, #ffffff0d 36%, transparent), radial-gradient(125% 125% at 50% 10%, #000A17 65%, #007FFF 100%)",
                  }}
                  key={i}
                >
                  <img className="h-[200px] rounded-[9px]" src={card.image} />
                  <div className="p-2">
                    <h3
                      className="text-xl font-semibold mb-1"
                      style={{
                        background:
                          "linear-gradient(to right, #FFFFFF 0%, #BBDEFB 52%, #2196F3 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-white/70 text-sm">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
