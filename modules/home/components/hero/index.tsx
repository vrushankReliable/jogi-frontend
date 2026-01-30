"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import api from "@/services/api";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mainBanners, setMainBanners] = useState<any[]>([]);
  const [miniBannersList, setMiniBannersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await api.get("/banners");
        const all = data.data;
        setMainBanners(all.filter((b: any) => b.type === "main"));
        setMiniBannersList(all.filter((b: any) => b.type === "mini"));
      } catch (err) {
        console.error("Failed to fetch banners", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (mainBanners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mainBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [mainBanners]);

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

  if (loading)
    return (
      <div className="h-[560px] flex items-center justify-center opacity-50">
        Loading hero...
      </div>
    );

  return (
    <div className="w-full max-w-[1320px] mx-auto mt-0 flex flex-col lg:flex-row gap-4 h-auto lg:h-[560px] px-4 lg:px-0 mb-8 lg:mb-0">
      {/* Main Banner Slider */}
      <div className="relative w-full lg:w-[68%] h-[300px] sm:h-[400px] lg:h-full rounded-[30px] overflow-hidden group">
        <div className="relative w-full h-full">
          {mainBanners.map((slide, index) => (
            <div
              key={slide._id || index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={getImageUrl(slide.image)}
                alt={slide.alt || "Main Banner"}
                fill
                className="object-cover"
                priority={index === 0}
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 items-center">
          {mainBanners.map((_, index) => (
            <button
              key={index}
              className={`rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-white w-3.5 h-3.5"
                  : "bg-primary/70 w-2.5 h-2.5 hover:bg-[#3A6F78]/80"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Mini Banners */}
      <div className="w-full lg:w-[32%] h-auto lg:h-full grid grid-cols-2 gap-4">
        {miniBannersList.map((banner, index) => (
          <div
            key={banner._id || index}
            className="
              relative w-full
              h-[230px] lg:h-full
              rounded-[20px]
              overflow-hidden
              group
              cursor-pointer
            "
          >
            {/* Background */}
            <Image
              src={getImageUrl(banner.image)}
              alt={banner.title || "Mini Banner"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              unoptimized
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#3A6F78] via-transparent to-transparent opacity-90" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end items-center pb-4 px-4 text-center">
              {/* Title */}
              <h3
                className="
                  text-white text-[17px] font-bold font-sans leading-[18px]
                  mb-6 lg:mb-0
                  transition-all duration-300
                  lg:group-hover:-translate-y-12
                "
              >
                {(banner.title || "")
                  .split(" ")
                  .map((word: string, i: number) => (
                    <span key={i} className="block">
                      {word}
                    </span>
                  ))}
              </h3>

              {/* Button */}
              <button
                className="
                  /* MOBILE DEFAULT - Below Text */
                  relative mb-4
                  bg-white text-[#3A6F78]
                  opacity-100 translate-y-0
 
                  /* DESKTOP HOVER - Absolute bottom */
                  lg:absolute lg:bottom-6 lg:mb-0
                  lg:bg-transparent lg:text-white
                  lg:border-2 lg:border-white
                  lg:opacity-0 lg:translate-y-8
                  lg:group-hover:opacity-100
                  lg:group-hover:translate-y-0
                  lg:hover:bg-white lg:hover:text-[#3A6F78]
 
                  text-[11px] font-bold
                  py-2 px-6 rounded-full
                  transition-all duration-300
                "
              >
                LEARN MORE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
