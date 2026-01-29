"use client";
import React from "react";
import Image from "next/image";

const logos = [
  { src: "/featured-by/india-tv.png", alt: "India TV" },
  { src: "/featured-by/dainik-bhaskar.png", alt: "Dainik Bhaskar" }, //
  { src: "/featured-by/tv-9.png", alt: "TV9 Gujarati" }, //
  { src: "/featured-by/hindustan-times.png", alt: "Hindustan Times" },
  { src: "/featured-by/gujarat-samachar.png", alt: "Gujarat Samachar" },
  { src: "/featured-by/ndtv.png", alt: "NDTV" },
  { src: "/featured-by/aaj-tak.png", alt: "Aaj Tak" },
  { src: "/featured-by/zee-24.png", alt: "Zee 24" }, //
];

const FeaturedBy = () => {
  return (
    <div className="w-full bg-white py-12">
      {/* Title */}
      <h2 className="text-[28px] font-bold text-black text-center mb-10 font-sans">
        Trusted and Featured By
      </h2>

      {/* Marquee Container */}
      <div className="relative overflow-hidden w-full">
        {/* Marquee Animation */}
        <div className="flex animate-marquee whitespace-nowrap gap-10">
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <div
              key={`logo-1-${index}`}
              className="flex-shrink-0 flex items-center justify-center h-[100px] w-[200px]"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-[200px] h-auto max-h-[100px] object-contain"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {logos.map((logo, index) => (
            <div
              key={`logo-2-${index}`}
              className="flex-shrink-0 flex items-center justify-center h-[100px] w-[200px]"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-[200px] h-auto max-h-[100px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedBy;
