"use client";
import React from "react";

const marqueeItems = [
  "Authentic Ayurveda",
  "Experienced Doctors",
  "Natural healing for Mind & Body",
  "Holistic Ayurvedic Care",
  "Root-Cause Treatments",
  "Personalized Treatments",
  "Natural Therapies",
  "Authentic Ayurveda",
];

const HeroMarquee = () => {
  return (
    <div className="w-full bg-white border-b border-gray-100">
      <div className="max-w-[1320px] mx-auto h-[140px] flex items-center overflow-hidden relative">
        {/* Left Fade Overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-[140px] z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />

        {/* Right Fade Overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-[140px] z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        <div className="flex animate-scroll whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {marqueeItems.map((item, index) => (
                <React.Fragment key={index}>
                  <span className="text-[34px] font-semibold text-primary leading-[40px] tracking-normal font-sans mx-8">
                    {item}
                  </span>
                  <span className="text-[68px] text-primary mx-4 leading-none relative top-[14px]">
                    *
                  </span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroMarquee;
