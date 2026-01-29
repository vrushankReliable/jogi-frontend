"use client";
import React from "react";
import Image from "next/image";

const stats = [
  {
    value: "20+",
    label: "Years Of",
    sublabel: "care",
  },
  {
    value: "25K+",
    label: "Consultation",
  },
  {
    value: "11+",
    label: "Countries",
    sublabel: "Served",
  },
];

const OurMission = () => {
  return (
    <section id="our-mission" className="w-full bg-white py-16 relative">
      {/* Decorative Wave Design - Bottom Right */}
      <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 opacity-[0.05] pointer-events-none z-0">
        <img src="/waves-design.png" alt="" className="w-[500px] h-auto" />
      </div>

      <div className="w-full max-w-[1043px] mx-auto px-4 relative z-10">
        {/* Title */}
        <h2 className="text-[32px] font-bold text-[#1a1a2e] font-serif text-center mb-4 uppercase tracking-wider">
          Our Mission
        </h2>

        {/* Description */}
        <p className="text-[#555] text-[16px] leading-[26px] text-center max-w-[600px] mx-auto mb-12">
          To deliver result oriented Ayurvedic treatments and services to
          establish trust and significance of Ayurved among people, doctors and
          stakeholders.
        </p>

        {/* Stats Container */}
        <div className="flex justify-center items-center gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative w-[249px] h-[270px] flex items-center justify-center"
            >
              {/* Background Mandala SVG */}
              <Image
                src="/mission.svg"
                alt="Decorative mandala"
                fill
                className="object-contain"
              />

              {/* Stat Content */}
              <div className="relative z-10 text-center">
                <div className="text-[#3A6F78] text-[36px] font-bold leading-tight">
                  {stat.value}
                </div>
                <div className="text-[#3A6F78] text-[14px] font-medium">
                  {stat.label}
                </div>
                {stat.sublabel && (
                  <div className="text-[#3A6F78] text-[14px] font-medium">
                    {stat.sublabel}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurMission;
