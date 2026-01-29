"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// scatteredImages config
// Vertical Staged Animation
// Images start scattered far below and move at different speeds to converge at the top exit.
const scatteredImages = [
  // --- Left Column ---
  {
    src: "/healing-journeys/healing-journey1.png",
    size: "w-64 h-48",
    top: "60%",
    left: "5%",
  },
  {
    src: "/healing-journeys/healing-journey2.png",
    size: "w-72 h-56",
    top: "100%",
    left: "-5%", // Bleed off-screen
  },
  {
    src: "/healing-journeys/healing-journey3.png",
    size: "w-56 h-40",
    top: "140%",
    left: "10%",
  },
  {
    src: "/healing-journeys/healing-journey4.png",
    size: "w-64 h-52",
    top: "180%",
    left: "-8%", // Bleed off-screen
  },
  {
    src: "/healing-journeys/healing-journey5.png",
    size: "w-48 h-36",
    top: "220%",
    left: "8%",
  },

  // --- Right Column ---
  {
    src: "/healing-journeys/healing-journey4.png",
    size: "w-72 h-56",
    top: "70%",
    right: "-5%", // Bleed off-screen
  },
  {
    src: "/healing-journeys/healing-journey6.png",
    size: "w-64 h-48",
    top: "110%",
    right: "8%",
  },
  {
    src: "/healing-journeys/healing-journey1.png",
    size: "w-60 h-44",
    top: "150%",
    right: "4%",
  },
  {
    src: "/healing-journeys/healing-journey2.png",
    size: "w-80 h-60",
    top: "190%",
    right: "-10%", // Bleed off-screen
  },
  {
    src: "/healing-journeys/healing-journey3.png",
    size: "w-52 h-40",
    top: "230%",
    right: "10%",
  },
];

const HealingJourneys = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Animation for ALL screens
      mm.add("(min-width: 0px)", () => {
        // Shorter scroll distance so text unpins sooner ("start going up by now")
        const scrollDist = "200%";

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${scrollDist}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
          },
        });

        const images = gsap.utils.toArray<HTMLElement>(".scattered-image");

        // Selective Stack Logic:
        // User wants "Only 1-2 should be stacked" at the end.
        // We essentially want most images to have cleared the screen (target < 0vh).
        // Only the deepest images (highest startY) should have a positive target (target > 0vh).

        // Formula: targetY = (startY - threshold) * varying_spread
        // If we set threshold to ~150%, then images starting < 150% will target negative (off screen).
        // Images starting > 150% will target positive (on screen).

        images.forEach((img, i) => {
          const config = scatteredImages[i];

          const startY = parseFloat(config.top); // e.g., 60 to 230

          // Threshold 160: Images starting above 160% (the bottom ones) stay on screen.
          // Multiplier 0.5: Keeps them moderately spread out.
          // e.g. startY=60  -> (60-160)*0.5  = -50vh (Gone)
          // e.g. startY=140 -> (140-160)*0.5 = -10vh (Gone)
          // e.g. startY=180 -> (180-160)*0.5 = +10vh (Visible Top)
          // e.g. startY=230 -> (230-160)*0.5 = +35vh (Visible Mid)
          const targetY = (startY - 160) * 0.5;

          const movement = targetY - startY;

          tl.to(
            img,
            {
              y: `${movement}vh`,
              ease: "none",
            },
            0,
          );

          // Floating effect
          gsap.to(img, {
            x: "random(-10, 10)",
            rotation: "random(-5, 5)",
            duration: "random(2, 4)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: "random(0, 2)",
          });
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="w-full h-auto min-[1025px]:h-screen overflow-hidden relative bg-neutral-bg z-10 py-16 min-[1025px]:py-0"
    >
      {/* Waves Design Pattern - Right Side (half off-screen) */}
      <div className="absolute top-[20%] right-[-250px] w-[500px] h-[500px] opacity-10 pointer-events-none z-[5]">
        <Image src="/waves-design.png" alt="" fill className="object-contain" />
      </div>

      {/* Sticky Text Container */}
      <div className="w-full min-[1025px]:h-full flex flex-col justify-center items-center relative z-20 pointer-events-none px-4 pt-10 min-[1025px]:pt-[130px]">
        <div className="max-w-[543px] flex flex-col items-center text-center pointer-events-auto bg-neutral-bg min-[1025px]:bg-transparent px-6 py-8 rounded-[20px] min-[1025px]:p-0 min-[1025px]:rounded-none">
          {/* Headline - Montserrat Bold 38px */}
          <h2 className="text-[clamp(28px,4vw,38px)] font-bold text-black font-sans leading-[36px] min-[1025px]:leading-[40px] mb-6 min-[1025px]:mb-8">
            Healing journeys
            <br />
            through Ayurveda
          </h2>

          {/* Content - Montserrat Medium 22px */}
          <div className="space-y-6 min-[1025px]:space-y-8">
            <p className="text-[#7C7C7C] text-[clamp(16px,2vw,22px)] font-medium leading-[26px] font-sans">
              At JOGI Ayurved, we draw wisdom from the timeless science of
              Ayurveda to nurture both body and mind. Our treatments are
              thoughtfully designed to restore balance, strengthen immunity, and
              awaken the body’s natural healing power. Through personalized
              consultations, classical therapies, and holistic care, we focus
              not just on relieving symptoms but on improving overall
              well-being.
            </p>
            <p className="text-[#7C7C7C] text-[clamp(16px,2vw,22px)] font-medium leading-[26px] font-sans">
              At JOGI Ayurved, health is a journey—where balance is restored,
              wellness is celebrated, and true healing begins from within.
            </p>
          </div>

          <div className="mt-10">
            <button className="bg-[#3A6F78] text-white text-[13px] font-bold py-3 px-10 rounded-full hover:bg-[#2c565d] transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 tracking-wider">
              ABOUT US
            </button>
          </div>
        </div>
      </div>

      {/* Scattered Images Layer - Visible on all screens */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-300 block">
        {scatteredImages.map((img, index) => (
          <div
            key={index}
            className={`scattered-image absolute ${img.size} rounded-[20px] overflow-hidden will-change-transform scale-75 min-[1025px]:scale-100 origin-center opacity-40 min-[1025px]:opacity-100`}
            style={{
              top: img.top,
              left: img.left,
              // @ts-ignore
              right: img.right,
              zIndex: 1, // Keep them behind or around text
            }}
          >
            <Image
              src={img.src}
              alt={`Healing Journey ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealingJourneys;
