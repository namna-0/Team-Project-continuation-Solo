import { useEffect, useRef, useState } from "react";

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

// VerticalServices Component
export const VerticalServices = ({
  service,
  isActive,
  index,
}: {
  service: (typeof serviceData)[0];
  isActive: boolean;
  index: number;
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Calculate progress based on section position
      const start = rect.top;
      const end = rect.bottom - windowHeight;
      const progress = Math.max(
        0,
        Math.min(
          1,
          (windowHeight / 2 - start) / (sectionHeight - windowHeight / 2)
        )
      );

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden"
    >
      {/* Background with animation */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.backgroundColor} transition-all duration-1000`}
        data-animate="background"
        style={{
          opacity: isActive ? 0.2 : 0.05,
          transform: `translateY(${(1 - scrollProgress) * 20}px) scale(${
            0.98 + scrollProgress * 0.02
          })`,
        }}
      />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <div
            className="space-y-6"
            data-animate="fadeUp"
            style={{
              transform: `translateY(${(1 - scrollProgress) * 60}px)`,
              opacity: 0.4 + scrollProgress * 0.6,
              transition: "all 0.1s ease-out",
            }}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`w-2 h-16 bg-gradient-to-b ${service.color} rounded-full flex-shrink-0 mt-2 transition-all duration-700`}
                style={{
                  transform: `scaleY(${isActive ? 1 : 0.5})`,
                  opacity: isActive ? 1 : 0.5,
                }}
              />
              <div className="min-w-0">
                <span
                  className="text-sm uppercase tracking-wider text-white/60 block mb-2"
                  data-animate="fadeDown"
                  style={{
                    transform: `translateY(${(1 - scrollProgress) * -30}px)`,
                    opacity: 0.6 + scrollProgress * 0.4,
                  }}
                >
                  Service {index + 1}
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-white mb-6">
                  {service.title}
                </h2>
              </div>
            </div>

            <p className="text-lg lg:text-xl leading-relaxed text-white/90">
              {service.text}
            </p>

            <button
              className={`px-8 py-4 bg-gradient-to-r ${service.color} text-white rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 text-lg font-semibold hover:shadow-2xl inline-flex items-center group`}
            >
              Дэлгэрэнгүй
              <svg
                className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>

          {/* Image Content */}
          <div
            className="relative group"
            data-animate="scale"
            style={{
              transform: `scale(${0.9 + scrollProgress * 0.1})`,
              opacity: 0.4 + scrollProgress * 0.6,
              transition: "all 0.1s ease-out",
            }}
          >
            {/* Glow effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${
                service.color
              } rounded-3xl blur-2xl transition-all duration-700 ${
                isActive ? "opacity-40 scale-110" : "opacity-20 scale-95"
              }`}
            />

            {/* Main image */}
            <img
              src={service.image}
              alt={service.title}
              className="relative w-full h-[400px] lg:h-[500px] rounded-3xl object-cover shadow-2xl border border-white/10"
              loading="lazy"
            />

            {/* Service indicator */}
            <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-white text-sm font-medium">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
