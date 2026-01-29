"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const mainBannerSlides = [
  { id: 1, src: "/hero-banner-main1.png", alt: "JOGI Ayurved Main Banner 1" },
  { id: 2, src: "/hero-banner-main1.png", alt: "JOGI Ayurved Main Banner 2" },
  { id: 3, src: "/hero-banner-main1.png", alt: "JOGI Ayurved Main Banner 3" },
  { id: 4, src: "/hero-banner-main1.png", alt: "JOGI Ayurved Main Banner 4" },
];

const miniBanners = [
  {
    id: 1,
    src: "/hero-banner-mini1.png",
    title: "In-Person Consultation",
    link: "/consultation",
  },
  {
    id: 2,
    src: "/hero-banner-mini2.png",
    title: "Online Consultation",
    link: "/online-consultation",
  },
  {
    id: 3,
    src: "/hero-banner-mini3.png",
    title: "Panchakarma Treatment",
    link: "/panchakarma",
  },
  {
    id: 4,
    src: "/hero-banner-mini4.png",
    title: "Garbh Sanskar",
    link: "/garbh-sanskar",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mainBannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-[1320px] mx-auto mt-0 flex flex-col lg:flex-row gap-4 h-auto lg:h-[560px] px-4 lg:px-0 mb-8 lg:mb-0">
      {/* Main Banner Slider */}
      <div className="relative w-full lg:w-[68%] h-[300px] sm:h-[400px] lg:h-full rounded-[30px] overflow-hidden group">
        <div className="relative w-full h-full">
          {mainBannerSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 items-center">
          {mainBannerSlides.map((_, index) => (
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
        {miniBanners.map((banner) => (
          <div
            key={banner.id}
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
              src={banner.src}
              alt={banner.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
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
                {banner.title.split(" ").map((word, i) => (
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
