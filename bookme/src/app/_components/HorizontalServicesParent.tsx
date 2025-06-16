import { useEffect, useRef, useState } from "react";
import { VerticalServices } from "./VerticalServices";

const serviceData = [
  {
    id: "bookme",
    title: "Bookme Business",
    text: "Захиалгыг бүртгэлгүй хүлээн авах боломжтой. Хэрэглэгчид таны үйлчилгээг хялбар захиалах боломжтой.",
    image:
      "https://res.cloudinary.com/dpbmpprw5/image/upload/v1749889984/path-digital-tR0jvlsmCuQ-unsplash_1_jps41f.jpg",
    color: "from-blue-600 to-indigo-600",
    backgroundColor: "from-blue-600/20 to-indigo-600/10",
  },
  {
    id: "payment",
    title: "Online Payment",
    text: "Stripe, QPay зэрэг төлбөрийн шийдэлтэй. Аюулгүй, хурдан төлбөрийн систем.",
    image:
      "https://images.unsplash.com/photo-1610076228127-df0282bb6c93?auto=format&fit=crop&w=870&q=80",
    color: "from-green-600 to-teal-600",
    backgroundColor: "from-green-600/20 to-teal-600/10",
  },
  {
    id: "nochat",
    title: "No Chat Needed",
    text: "Нэг ч чат бичихгүйгээр хэрэглэгч захиалга өгч чадна. Автомат системээр бүх үйл явц.",
    image:
      "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=870&q=80",
    color: "from-orange-600 to-red-600",
    backgroundColor: "from-orange-600/20 to-red-600/10",
  },
];

// Main Component
const VerticalServicesParent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const sections =
        containerRef.current.querySelectorAll(".service-section");
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (index: number) => {
    const section =
      containerRef.current?.querySelectorAll(".service-section")[index];
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 50%, rgba(120, 113, 255, 0.1) 0%, transparent 70%)",
        backgroundSize: "100% 200%",
        backgroundPosition: "50% 0%",
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl transition-transform duration-1200 ease-out"
          style={{
            transform: `translateY(${activeIndex * -100}px)`,
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl transition-transform duration-1500 ease-out"
          style={{
            transform: `translateY(${activeIndex * 80}px)`,
          }}
        />
      </div>

      {/* Services sections - Stacked vertically */}
      <div className="relative z-10">
        {serviceData.map((service, index) => (
          <div key={service.id} className="service-section">
            <VerticalServices
              service={service}
              isActive={index === activeIndex}
              index={index}
            />
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col space-y-4">
          {serviceData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(index)}
              className={`relative w-3 h-3 rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              style={{
                transform: `translateY(${
                  index === activeIndex ? "-2px" : "0px"
                }) scale(${index === activeIndex ? 1.25 : 1})`,
              }}
              aria-label={`Go to service ${index + 1}`}
            >
              {index === activeIndex && (
                <div className="absolute -inset-2 border border-white/50 rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerticalServicesParent;
