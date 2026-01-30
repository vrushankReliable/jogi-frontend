"use client";
import React, { useRef, useState } from "react";

// Founder data
const founders = [
  {
    id: 1,
    name: "Nilesh Jogal",
    title: "Founder, JOGI Ayurved Hospital",
    video: "/Founder-videos/Founder-message-Nj-finalmp4.mp4",
  },
  {
    id: 2,
    name: "Dr. Devangi N. Jogal",
    title: "MD Ayurved & Double Gold Medalist",
    video: "/Founder-videos/Founder-message-Dj-finalmp4.mp4",
  },
];

const OurFounder = () => {
  return (
    <section
      id="our-founder"
      className="w-full py-16"
      style={{ backgroundColor: "rgba(119, 197, 210, 0.1)" }}
    >
      <div className="w-full max-w-[1320px] mx-auto px-4">
        {/* Title */}
        <h2 className="text-[32px] font-bold text-black text-center mb-3">
          Our Founder
        </h2>

        {/* Subtitle */}
        <p className="text-[#666] text-[20px] text-center mb-10">
          Meet the visionaries behind our journey of Ayurvedic excellence
        </p>

        {/* Founders Grid - 2 columns */}
        <div className="flex flex-col lg:flex-row justify-center gap-10 lg:gap-6">
          {founders.map((founder) => (
            <FounderCard key={founder.id} founder={founder} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Individual Founder Card Component with Video
const FounderCard = ({
  founder,
}: {
  founder: { id: number; name: string; title: string; video: string };
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Video Container */}
      <div className="relative rounded-[20px] overflow-hidden bg-[#D6D6D6] mb-4 w-full h-auto aspect-video lg:w-[648px] lg:h-[377px]">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={founder.video}
          poster=""
          controls
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>

      {/* Founder Info */}
      <div className="text-center">
        <h3 className="text-[20px] font-bold text-black mb-1">
          {founder.name}
        </h3>
        <p className="text-[14px] text-[#666]">{founder.title}</p>
      </div>
    </div>
  );
};

export default OurFounder;
