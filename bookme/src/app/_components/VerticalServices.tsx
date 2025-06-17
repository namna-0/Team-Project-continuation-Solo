import { useEffect, useRef, useState } from "react";

const serviceData = [
  {
    id: "bookme",
    title: "Байгууллагад",
    text: [
      "Ажилтны сул цаг, туршлага, хийсэн ажлуудын динамик удирдлага",
      "Захиалгын урсгалыг хянах, ачааллаа хуваарилах, хоосон цаг арилгах",
      "Админ самбар-аар бүхнийг хянах — үйлчилгээ, ажилтан, цаг, хэрэглэгч",
      "Галерей, үнэлгээ, хэрэглэгчийн туршлагыг сайжруулах цогц систем",
    ],
    image:
      "https://res.cloudinary.com/dpbmpprw5/image/upload/v1749889984/path-digital-tR0jvlsmCuQ-unsplash_1_jps41f.jpg",
    color: "from-cyan-400 to-blue-500",
  },
  // {
  //   id: "Үйлчлүүлэгчдэд",
  //   title: "Online Payment",
  //   text: [
  //     "Хувийн мэдээлэл болон захиалгаа хамгаалсан, найдвартай нэвтрэлттэй систем. Захиалгаа бүртгүүлж, хянахад хялбар.",
  //     "Та аль ч байгууллагын дуртай ажилтнаа сонгон, яг тухайн ажилтны сул цаг дээр суурилсан захиалга өгнө.",
  //     "Ажилтны бодит сул цагийг хараад, өөрийн чөлөөт цагтай уялдуулан илүү оновчтой захиалга өг.",
  //   ],
  //   image:
  //     "https://res.cloudinary.com/dpbmpprw5/image/upload/v1749889984/path-digital-tR0jvlsmCuQ-unsplash_1_jps41f.jpg",
  //   color: "from-cyan-400 to-blue-500",
  // },
  {
    id: "nochat",
    title: "No Chat Needed",
    text: "Нэг ч чат бичихгүйгээр хэрэглэгч захиалга өгч чадна. Автомат системээр бүх үйл явц.",
    image:
      "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=870&q=80",
    color: "from-cyan-400 to-blue-500",
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
        className={`absolute inset-0 transition-all duration-1000`}
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
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-white mb-6">
                  {service.title}
                </h2>
              </div>
            </div>

            {Array.isArray(service.text) ? (
              <ul className="list-disc list-inside space-y-2 text-white/90 text-lg lg:text-xl">
                {service.text.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-lg lg:text-xl leading-relaxed text-white/90">
                {service.text}
              </p>
            )}
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
          </div>
        </div>
      </div>
    </div>
  );
};
