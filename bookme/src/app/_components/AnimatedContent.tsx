import React, { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedContentProps {
  children: ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string | ((progress: number) => number);
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  onComplete?: () => void;
  smoothScroll?: boolean;
  scrub?: boolean | number;
  anticipatePin?: number;
  refreshPriority?: number;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  distance = 60,
  direction = "vertical",
  reverse = false,
  duration = 1.2,
  ease = "power2.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 0.95,
  threshold = 0.15,
  delay = 0,
  onComplete,
  smoothScroll = true,
  scrub = false,
  anticipatePin = 1,
  refreshPriority = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (smoothScroll) {
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
        ignoreMobileResize: true,
      });
    }

    const axis = direction === "horizontal" ? "x" : "y";
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
      force3D: true,
      transformOrigin: "center center",
      visibility: "visible",
    });

    el.style.willChange = "transform, opacity";

    const animation = gsap.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration: scrub ? 1 : duration,
      ease: scrub ? "none" : ease,
      delay: scrub ? 0 : delay,
      force3D: true,
      onComplete: () => {
        el.style.willChange = "auto";
        onComplete?.();
      },
      scrollTrigger: {
        trigger: el,
        start: `top ${startPct}%`,
        end: scrub ? "bottom 20%" : undefined,
        toggleActions: scrub ? undefined : "play none none none",
        scrub,
        once: !scrub,
        anticipatePin,
        refreshPriority,
        onUpdate: (self) => {
          if (self.progress === 1) {
            el.style.willChange = "auto";
          }
        },
      },
    });

    return () => {
      el.style.willChange = "auto";
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === el) {
          trigger.kill();
        }
      });
      gsap.killTweensOf(el);
    };
  }, [
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    onComplete,
    smoothScroll,
    scrub,
    anticipatePin,
    refreshPriority,
  ]);

  return (
    <div
      className="animated-content"
      ref={ref}
      style={{
        backfaceVisibility: "hidden",
        perspective: 1000,
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedContent;
