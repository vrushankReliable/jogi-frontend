"use client";
import React from "react";
import Image from "next/image";

// Book data with dimensions
const books = [
  {
    id: 1,
    image: "/spreading-ayurveda/spreading-ayurveda1.png",
    alt: "Healthy Dincharya",
  },
  {
    id: 2,
    image: "/spreading-ayurveda/spreading-ayurveda2.png",
    alt: "Gharno Ved",
  },
  {
    id: 3,
    image: "/spreading-ayurveda/spreading-ayurveda3.png",
    alt: "Bhojanpratha",
  },
  {
    id: 4,
    image: "/spreading-ayurveda/spreading-ayurveda4.png",
    alt: "Prakruti Olakho",
  },
  {
    id: 5,
    image: "/spreading-ayurveda/spreading-ayurveda5.png",
    alt: "Garbhsanskar",
  },
  // Duplicating for infinite loop
  {
    id: 1, // Duplicate ID, will use index for key
    image: "/spreading-ayurveda/spreading-ayurveda1.png",
    alt: "Healthy Dincharya",
  },
  {
    id: 2,
    image: "/spreading-ayurveda/spreading-ayurveda2.png",
    alt: "Gharno Ved",
  },
  {
    id: 3,
    image: "/spreading-ayurveda/spreading-ayurveda3.png",
    alt: "Bhojanpratha",
  },
  {
    id: 4,
    image: "/spreading-ayurveda/spreading-ayurveda4.png",
    alt: "Prakruti Olakho",
  },
  {
    id: 5,
    image: "/spreading-ayurveda/spreading-ayurveda5.png",
    alt: "Garbhsanskar",
  },
];

const SpreadingAyurveda = () => {
  const [activeIndex, setActiveIndex] = React.useState(2);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % books.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="spreading-ayurveda" className="w-full bg-white py-16 relative">
      {/* Waves Design - Left Side */}
      <div className="absolute left-[-100px] top-1/2 -translate-y-1/2 w-[300px] h-[500px] opacity-[0.1] pointer-events-none">
        <Image
          src="/waves-design.png"
          alt=""
          fill
          className="object-contain object-left"
        />
      </div>

      <div className="w-full max-w-[1246px] mx-auto px-4 relative z-10">
        {/* Title */}
        <h2 className="text-[28px] lg:text-[38px] font-bold text-black text-center mb-4 leading-[36px] lg:leading-[40px]">
          Spreading Ayurved to Millions
        </h2>

        {/* Subtitle Paragraph 1 */}
        <p className="text-[#7C7C7C] text-[16px] lg:text-[22px] font-medium text-center mb-4 max-w-[949px] mx-auto leading-[24px] lg:leading-[26px]">
          Our extensive work in public health education includes conducting
          seminars, workshops, and YouTube sessions, helping millions understand
          Ayurvedic wellness in Surat and beyond.
        </p>

        {/* Subtitle Paragraph 2 */}
        <p className="text-[#7C7C7C] text-[16px] lg:text-[22px] font-medium text-center mb-10 max-w-[949px] mx-auto leading-[24px] lg:leading-[26px]">
          Dr. Devangi Jogal and Mr. Nilesh Jogal have written multiple
          bestselling books together on Ayurveda, offering readers profound
          knowledge and hands-on guidance for achieving better health and
          greater life balance.
        </p>

        {/* Books Container - Unified Responsive Animation */}
        <div className="flex justify-center items-center gap-4 mb-10 h-[350px] lg:h-[470px] relative w-full overflow-hidden">
          {books.map((book, index) => {
            // Calculate circular distance
            const total = books.length;
            const getDist = (i: number, active: number, len: number) => {
              let d = (i - active) % len;
              if (d > len / 2) d -= len;
              if (d < -len / 2) d += len;
              return d;
            };

            const d = getDist(index, activeIndex, total);
            // Visual styles with fixed pixel spacing
            const dist = Math.abs(d);
            // Scales
            const scale = dist === 0 ? 1 : dist === 1 ? 0.85 : 0.7;

            // Horizontal Positions
            const xBase = d > 0 ? 1 : -1;

            // Responsive spacing steps
            const step1 = isMobile ? 80 : 275;
            const step2 = isMobile ? 150 : 510;
            const step3 = isMobile ? 200 : 750; // Push far items away

            let xVal = 0;
            if (dist === 1) xVal = step1;
            else if (dist === 2) xVal = step2;
            else if (dist >= 3) xVal = step3 + (dist - 3) * 100;

            const x = xBase * xVal;
            // Opacity & Z-Index
            const opacity = dist > 2 ? 0 : 1;
            const zIndex = 30 - dist * 5;

            // Don't render far-off items to save perf
            if (dist > 3) return null;

            return (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 flex items-center justify-center"
                style={{
                  transform: `translate(-50%, -50%) translateX(${x}px) scale(${scale})`, // Using px
                  zIndex: zIndex,
                  opacity: opacity,
                  width: isMobile ? "180px" : "265px",
                  height: isMobile ? "320px" : "470px",
                  // Critical Flyover Fix:
                  transition: dist > 3 ? "none" : "all 0.5s ease-in-out",
                }}
              >
                {/* Shadow & Rounding Wrapper */}
                <div
                  className={`relative w-full h-full rounded-[24px] bg-white transition-shadow duration-300 ${dist === 0 ? "shadow-lg" : "shadow-lg"}`}
                >
                  {/* Inner Clipped Image Container */}
                  <div className="absolute inset-0 rounded-[24px] overflow-hidden">
                    <div className="relative w-full h-full bg-white">
                      <Image
                        src={book.image}
                        alt={book.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Description */}
        <p className="text-[#7C7C7C] text-[16px] lg:text-[22px] font-medium text-center max-w-[949px] mx-auto leading-[24px] lg:leading-[26px]">
          These books serve as practical guides to Ayurvedic wellness and
          Panchakarma, emphasizing the role of diet, lifestyle, and detox
          therapies in disease prevention and overall health.
        </p>
      </div>
    </section>
  );
};

export default SpreadingAyurveda;
