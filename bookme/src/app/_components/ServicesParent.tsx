import React, { useEffect, useRef, useState } from "react";

const serviceData = [
  {
    id: "bookme",
    title: "Bookme Business",
    text: "Захиалгыг бүртгэлгүй хүлээн авах боломжтой. Хэрэглэгчид таны үйлчилгээг хялбар захиалах боломжтой.",
    image:
      "https://res.cloudinary.com/dpbmpprw5/image/upload/v1749889984/path-digital-tR0jvlsmCuQ-unsplash_1_jps41f.jpg",
    color: "from-blue-600 to-indigo-600",
    accentColor: "bg-blue-500",
  },
  {
    id: "payment",
    title: "Online Payment",
    text: "Stripe, QPay зэрэг төлбөрийн шийдэлтэй. Аюулгүй, хурдан төлбөрийн систем.",
    image:
      "https://res.cloudinary.com/dpbmpprw5/image/upload/v1749889984/path-digital-tR0jvlsmCuQ-unsplash_1_jps41f.jpg",
    color: "from-green-600 to-teal-600",
    accentColor: "bg-blue-500",
  },
  {
    id: "nochat",
    title: "No Chat Needed",
    text: "Нэг ч чат бичихгүйгээр хэрэглэгч захиалга өгч чадна. Автомат системээр бүх үйл явц.",
    image:
      "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=870&q=80",
    color: "from-orange-600 to-red-600",
    accentColor: "bg-blue-500",
  },
  {
    id: "analytics",
    title: "Smart Analytics",
    text: "Дэлгэрэнгүй тайлан, статистик мэдээлэл. Бизнесийн шийдвэр гаргахад туслах ухаалаг системтэй.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=870&q=80",
    color: "from-purple-600 to-pink-600",
    accentColor: "bg-blue-500",
  },
];

const ServicesParent = ({ id }: { id: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imagesContainerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const imagesRect = imagesContainerRef.current.getBoundingClientRect();

      // Calculate scroll progress through the entire component
      const containerStart = containerRect.top;
      const containerEnd = containerRect.bottom - window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, -containerStart / (containerEnd - containerStart))
      );

      setScrollProgress(progress);

      // Calculate which section should be active
      const sectionProgress = progress * serviceData.length;
      const newActiveIndex = Math.min(
        Math.floor(sectionProgress),
        serviceData.length - 1
      );
      setActiveIndex(newActiveIndex);

      // Pin the text container when the component is in view
      if (textContainerRef.current) {
        const shouldPin =
          containerRect.top <= 0 && containerRect.bottom > window.innerHeight;
        textContainerRef.current.style.position = shouldPin
          ? "fixed"
          : "absolute";
        textContainerRef.current.style.top = shouldPin ? "0px" : "0px";
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const targetScroll =
      window.scrollY + containerRect.top + index * window.innerHeight;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section
      id={id}
      ref={containerRef}
      className="relative text-white min-h-screen w-screen"
      style={{ height: `${serviceData.length * 100}vh` }}
    >
      {/* Fixed/Pinned Text Container */}
      <div
        ref={textContainerRef}
        className="absolute left-0 top-0 w-full lg:w-1/2 h-screen flex items-center justify-center z-20"
      >
        <div className="px-8 lg:px-16 max-w-lg">
          {serviceData.map((service, index) => (
            <div
              key={service.id}
              className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out p-40 ${
                index === activeIndex
                  ? "opacity-100 translate-y-0"
                  : index < activeIndex
                  ? "opacity-0 -translate-y-8"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {/* Title */}
              <h2 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
                {service.title}
              </h2>

              {/* Description */}
              <p className="text-lg lg:text-xl leading-relaxed text-white/80 mb-8">
                {service.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable Images Container */}
      <div
        ref={imagesContainerRef}
        className="lg:ml-[50%] w-full lg:w-1/2 relative"
      >
        {serviceData.map((service, index) => (
          <div
            key={service.id}
            className="h-screen flex items-center justify-center p-8 lg:p-16 relative"
          >
            {/* Background gradient overlay */}
            {/* <div
              className={`absolute inset-0 bg-gradient-to-br ${
                service.color
              } opacity-5 transition-opacity duration-700 ${
                index === activeIndex ? "opacity-10" : "opacity-5"
              }`}
            /> */}

            {/* Image container */}
            <div className="relative w-full max-w-lg">
              {/* Glow effect */}
              <div
                className={`absolute -inset-4 bg-gradient-to-r ${
                  service.color
                } rounded-3xl blur-2xl transition-all duration-700 ${
                  index === activeIndex
                    ? "opacity-30 scale-105"
                    : "opacity-10 scale-95"
                }`}
              />

              {/* Main image */}
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className={`w-full h-[500px] lg:h-[600px] object-cover rounded-3xl shadow-2xl transition-all duration-700 ${
                    index === activeIndex
                      ? "scale-100 opacity-100"
                      : "scale-95 opacity-70"
                  }`}
                  loading="lazy"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-black/20 rounded-3xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default ServicesParent;
