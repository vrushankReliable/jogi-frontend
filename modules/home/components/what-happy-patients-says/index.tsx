"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

// Patient video data - these would link to actual video testimonials
const patients = [
  {
    id: 1,
    image: "/happy-patients/happy-patient1.png",
    name: "Patient 1",
  },
  {
    id: 2,
    image: "/happy-patients/happy-patient2.png",
    name: "Patient 2",
  },
  {
    id: 3,
    image: "/happy-patients/happy-patient3.png",
    name: "Patient 3",
  },
  {
    id: 4,
    image: "/happy-patients/happy-patient4.png",
    name: "Patient 4",
  },
  {
    id: 5,
    image: "/happy-patients/happy-patient1.png", // Reusing for 5th
    name: "Patient 5",
  },
  // Duplicating items for infinite loop buffer
  {
    id: 1, // Duplicate ID, will use index for key
    image: "/happy-patients/happy-patient1.png",
    name: "Patient 1",
  },
  {
    id: 2,
    image: "/happy-patients/happy-patient2.png",
    name: "Patient 2",
  },
  {
    id: 3,
    image: "/happy-patients/happy-patient3.png",
    name: "Patient 3",
  },
  {
    id: 4,
    image: "/happy-patients/happy-patient4.png",
    name: "Patient 4",
  },
  {
    id: 5,
    image: "/happy-patients/happy-patient1.png",
    name: "Patient 5",
  },
];

const WhatHappyPatientsSays = () => {
  const [activeIndex, setActiveIndex] = useState(2); // Start with center item
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % patients.length);
    }, 2000); // 2 seconds interval
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="what-happy-patients-says"
      className="w-full bg-white py-16 relative"
    >
      <div className="w-full max-w-[1246px] mx-auto px-4">
        {/* Title */}
        <h2 className="text-[30px] lg:text-[38px] font-bold text-[#1a1a2e] font-sans text-center mb-4">
          What Happy Patients Says
        </h2>

        {/* Subtitle */}
        <p className="text-[#666] text-[16px] lg:text-[20px] text-center mb-4">
          Real stories of healing and wellness from our satisfied patients
        </p>

        {/* Patient Gallery - 5 items with varying heights */}
        <div className="flex justify-center items-center gap-4 mb-10 h-[300px] lg:h-[470px] relative w-full overflow-hidden">
          {patients.map((patient, index) => {
            // Calculate circular distance
            const total = patients.length;
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

            // Horizontal Positions (Fixed gaps)
            // Center: 0
            // Gap ~30px -> 275px
            // Gap ~30px -> 550px

            const xBase = d > 0 ? 1 : -1;
            const step1 = isMobile ? 80 : 275;
            const step2 = isMobile ? 150 : 510;
            const step3 = isMobile ? 200 : 750;
            const extraStep = isMobile ? 50 : 200;

            let xVal = 0;
            if (dist === 1) xVal = step1;
            else if (dist === 2) xVal = step2;
            else if (dist >= 3) xVal = step3 + (dist - 3) * extraStep; // Push far items away

            const x = xBase * xVal;

            // Opacity & Z-Index
            const opacity = dist > 2 ? 0 : 1;
            const zIndex = 30 - dist * 5;

            // Don't render far-off items to save perf (match spreading Ayurveda)
            if (dist > 3) return null;

            return (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 flex items-center justify-center"
                style={{
                  transform: `translate(-50%, -50%) translateX(${x}px) scale(${scale})`,
                  zIndex: zIndex,
                  opacity: opacity,
                  width: isMobile ? "180px" : "265px",
                  height: isMobile ? "320px" : "470px",
                  // Critical Flyover Fix:
                  // Disable transition if we are moving to a position > 3 (or < -3).
                  // This captures the wrap-around moment where the item is off-screen.
                  transition: dist > 3 ? "none" : "all 0.5s ease-in-out",
                }}
              >
                <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-white shadow-lg">
                  <Image
                    src={patient.image}
                    alt={patient.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`w-12 h-12 bg-white/80 rounded-full flex items-center justify-center ${dist === 0 ? "scale-110" : ""}`}
                    >
                      <div
                        className={`w-0 h-0 border-t-transparent border-t-[8px] border-b-[8px] border-l-[14px] border-l-[#3A6F78] border-b-transparent ml-1`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* See More Videos Button */}
        <div className="flex justify-center">
          <button className="bg-[#3A6F78] text-white px-8 py-3 rounded-full text-[14px] font-medium uppercase tracking-wider hover:bg-[#2d5a61] transition-colors">
            See More Videos
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhatHappyPatientsSays;
