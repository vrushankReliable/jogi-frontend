"use client";
import React from "react";
import Image from "next/image";

const experts = [
  {
    name: "Dr. Devangi Jogal",
    title: "Ayurved Double Gold",
    education: "M.D. Ayurved",
    experience: "23 Yrs. Experience",
    image: "/drdevangijogal.png",
  },
  {
    name: "Dr. Leena Patil",
    title: "Ayurved Dermatologist",
    education: "B.A.M.S., C.C.H., C.G.O.",
    experience: "23 Yrs. Experience",
    image: "/drleenapatil.png",
  },
  {
    name: "Dr. Harshil Kakadiya",
    title: "Ayurved Gastro-enterologist",
    education: "B.A.M.S.",
    experience: "6 Yrs. Experience",
    image: "/drharshilkakadiya.png",
  },
  {
    name: "Dr. Jyotsana Thummar",
    title: "Senior Ayurved Physician",
    education: "B.A.M.S.",
    experience: "18 Yrs. Experience",
    image: "/drjyotsanathummar.png",
  },
];

const HealingExperts = () => {
  return (
    <div className="w-full py-20 relative flex justify-center items-center bg-white z-20 overflow-hidden">
      {/* Waves Design Pattern - Left Side (half off-screen) */}
      <div className="absolute top-[50%] left-[-250px] translate-y-[-50%] w-[500px] h-[500px] opacity-10 pointer-events-none z-[1]">
        <Image src="/waves-design.png" alt="" fill className="object-contain" />
      </div>

      <div className="max-w-[1320px] w-full px-4 flex flex-col items-center relative z-10">
        {/* Title */}
        <h2 className="text-[clamp(28px,4vw,38px)] font-bold text-black font-sans leading-[1.2] mb-12 text-center">
          Meet Our Healing Experts
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {experts.map((expert, index) => (
            <div
              key={index}
              className="group flex flex-col bg-white rounded-[15px] overflow-hidden border-2 border-[#D6D6D6]/40"
            >
              {/* Image Container with Rangoli & Teal BG */}
              <div className="relative w-full h-[324px] bg-[#3A6F78] overflow-hidden flex items-end justify-center">
                {/* Rangoli Pattern Background */}
                <div className="absolute top-[78px] -left-[25px] w-[362px] h-[362px] pointer-events-none rotate-45 opacity-100 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:rotate-[75deg] group-hover:scale-105">
                  <Image
                    src="/rangoli.svg"
                    alt="Rangoli"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Doctor Image */}
                <div className="relative z-10 w-[257px] h-[314px] mt-auto">
                  <Image
                    src={expert.image}
                    alt={expert.name}
                    fill
                    className="object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow text-left">
                <span className="text-[#7C7C7C] text-[14px] font-semibold leading-[22px]">
                  {expert.title}
                </span>
                <h3 className="text-[18px] font-bold text-black leading-[28px]">
                  {expert.name}
                </h3>
                <p className="text-[#3A6F78] text-[14px] font-medium leading-[1.3]">
                  {expert.education}
                </p>
                <p className="text-black text-[14px] font-semibold leading-[1.3] mb-4">
                  {expert.experience}
                </p>

                <button className="w-full bg-[#64B7A9] text-white text-[12px] font-bold py-3 rounded-[8px] hover:bg-primary transition-background duration-300 uppercase tracking-wider mt-auto">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealingExperts;
