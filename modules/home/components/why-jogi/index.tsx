"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: "/why-jogi/slide1.png",
    label: "Personalised Root-Cause",
    title: "Why JOGI Ayurved?",
    description:
      "JOGI Ayurved focuses on treating the root cause of illness through authentic Ayurvedic principles and personalized care. With a holistic approach, natural medicines, and guided lifestyle recommendations, the hospital aims to restore balance, improve overall health, and support long-term wellness in a safe and natural way.",
  },
  {
    id: 2,
    image: "/why-jogi/slide2.png",
    label: "Natural Healing",
    title: "Why JOGI Ayurved?",
    description:
      "JOGI Ayurved focuses on treating the root cause of illness through authentic Ayurvedic principles and personalized care. With a holistic approach, natural medicines, and guided lifestyle recommendations, the hospital aims to restore balance, improve overall health, and support long-term wellness in a safe and natural way.",
  },
  {
    id: 3,
    image: "/why-jogi/slide3.png",
    label: "Traditional Therapies",
    title: "Why JOGI Ayurved?",
    description:
      "JOGI Ayurved focuses on treating the root cause of illness through authentic Ayurvedic principles and personalized care. With a holistic approach, natural medicines, and guided lifestyle recommendations, the hospital aims to restore balance, improve overall health, and support long-term wellness in a safe and natural way.",
  },
  {
    id: 4,
    image: "/why-jogi/slide4.png",
    label: "Holistic Wellness",
    title: "Why JOGI Ayurved?",
    description:
      "JOGI Ayurved focuses on treating the root cause of illness through authentic Ayurvedic principles and personalized care. With a holistic approach, natural medicines, and guided lifestyle recommendations, the hospital aims to restore balance, improve overall health, and support long-term wellness in a safe and natural way.",
  },
  // {
  //   id: 5,
  //   image: "/why-jogi/slide5.png",
  //   label: "Expert Care",
  //   title: "Why JOGI Ayurved?",
  //   description:
  //     "JOGI Ayurved focuses on treating the root cause of illness through authentic Ayurvedic principles and personalized care. With a holistic approach, natural medicines, and guided lifestyle recommendations, the hospital aims to restore balance, improve overall health, and support long-term wellness in a safe and natural way.",
  // },
  // {
  //   id: 6,
  //   image: "/why-jogi/slide6.png",
  //   label: "Lasting Results",
  //   title: "Why JOGI Ayurved?",
  //   description:
  //     "JOGI Ayurved focuses on treating the root cause of illness through authentic Ayurvedic principles and personalized care. With a holistic approach, natural medicines, and guided lifestyle recommendations, the hospital aims to restore balance, improve overall health, and support long-term wellness in a safe and natural way.",
  // },
];

const WhyJogi = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-neutral-bg py-12 relative overflow-hidden">
      {/* Waves Design Pattern - Right Side (half off-screen) */}
      <div className="absolute bottom-[-150px] right-[-250px] w-[500px] h-[500px] opacity-10 pointer-events-none z-[1]">
        <Image src="/waves-design.png" alt="" fill className="object-contain" />
      </div>

      <div className="w-full max-w-[1320px] mx-auto px-4 relative z-10">
        {/* Banner Container */}
        <div className="relative w-full h-[500px] min-[1025px]:h-[440px] rounded-[30px] overflow-hidden">
          {/* Background Image */}
          <Image
            src="/why-jogi-banner.png"
            alt="Why JOGI Ayurved Background"
            fill
            className="object-cover"
          />

          {/* Tint Overlay - sits between bg image and content */}
          <div className="absolute inset-0 bg-[#D9D9D9]/15 z-[1]" />

          {/* Content Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col min-[1025px]:flex-row h-full">
            {/* Left Side - Image and Navigation */}
            <div className="flex flex-col justify-center items-center min-[1025px]:pl-16 pt-8 min-[1025px]:pt-12 pb-4 min-[1025px]:pb-8 h-1/2 min-[1025px]:h-full">
              {/* Image Container with White Border and Semi-transparent BG */}
              <div className="relative w-[280px] h-[180px] min-[1025px]:w-[420px] min-[1025px]:h-[260px] border-2 border-white rounded-lg overflow-hidden">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      currentSlide === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.label}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Slide Label - Centered */}
              <p className="text-white text-[18px] min-[1025px]:text-[24px] font-bold font-sans leading-[1.3] mt-3 min-[1025px]:mt-5 text-center">
                Experienced Doctors
              </p>

              {/* Dots Navigation - Centered */}
              <div className="flex gap-2 items-center justify-center mt-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "bg-white w-3 h-3"
                        : "bg-white/50 w-2.5 h-2.5 hover:bg-white/70"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="flex-1 flex flex-col justify-start min-[1025px]:justify-center items-center min-[1025px]:items-end px-4 min-[1025px]:pr-12 min-[1025px]:pl-0 pb-8 min-[1025px]:py-8 text-center min-[1025px]:text-right">
              <div className="max-w-full min-[1025px]:max-w-[520px]">
                <h2 className="text-[24px] min-[1025px]:text-[32px] font-bold text-white font-sans mb-2 min-[1025px]:mb-4">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-white/90 text-[14px] min-[1025px]:text-[22px] font-normal leading-[1.3] font-sans mb-4 min-[1025px]:mb-8 line-clamp-4 min-[1025px]:line-clamp-none">
                  At JOGI Ayurved, our team of highly qualified and experienced
                  vaidyas (Ayurvedic doctors) brings years of expertise in
                  diagnosing and treating complex health conditions. We believe
                  in Nadi Parikshan (Pulse Diagnosis) to understand the root
                  cause of ailments and provide personalized treatment plans.
                </p>
                <button className="w-[160px] min-[1025px]:w-[208px] h-[40px] min-[1025px]:h-[45px] bg-neutral-bg text-primary rounded-[50px] font-semibold text-[12px] min-[1025px]:text-[14px] hover:bg-white transition-colors duration-300">
                  VISIT US
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyJogi;
