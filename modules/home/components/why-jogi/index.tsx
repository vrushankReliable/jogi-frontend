"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import api from "@/services/api";

const WhyJogi = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data } = await api.get("/banners");
        const whyJogiSlides = data.data.filter(
          (b: any) => b.type === "why_jogi",
        );
        setSlides(whyJogiSlides);
      } catch (err) {
        console.error("Failed to fetch Why Jogi slides", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  const getImageUrl = (path: string) => {
    if (!path) return "/placeholder-img.svg";
    if (path.startsWith("uploads/")) {
      const apiBaseUrl = (
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1/public"
      ).replace("/api/v1/public", "");
      return `${apiBaseUrl}/${path}`;
    }
    return path;
  };

  if (loading) return null;
  if (slides.length === 0) return null;

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
                    key={slide._id || index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      currentSlide === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={getImageUrl(slide.image)}
                      alt={slide.label}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>

              {/* Slide Label - Centered */}
              <p className="text-white text-[18px] min-[1025px]:text-[24px] font-bold font-sans leading-[1.3] mt-3 min-[1025px]:mt-5 text-center">
                {slides[currentSlide].label}
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
                  {slides[currentSlide].description}
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
