"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

// Disease data
const diseases = [
  {
    title: "Hair Problems",
    image: "/diseases/hair-problems.png",
    conditions: ["Hair Loss", "Dandruff", "Scalp Psoriasis", "Alopecia"],
  },
  {
    title: "Digestive Disorders",
    image: "/diseases/digestive-disorders.png",
    conditions: ["Constipation", "GERD", "IBS", "Acidity"],
  },
  {
    title: "Joints & Muscle Pain",
    image: "/diseases/joint-and-muscle-pain.jpg",
    conditions: ["Spondylitis", "Arthritis", "Sciatica", "AVN"],
  },
  {
    title: "Neurological Disorders",
    image: "/diseases/neurological-disorder.png",
    conditions: ["Migraine", "Epilepsy", "Parkinson’s", "Sciatica"],
  },
  {
    title: "Skin Disease",
    image: "/diseases/skin-diseases.png",
    conditions: ["Psoriasis", "Urticaria", "Vitiligo", "Eczema"],
  },
  {
    title: "Gynecological Disease",
    image: "/diseases/gynecological-diseases.jpg",
    conditions: [
      "PCOD/PCOS",
      "Infertility",
      "Leucorrhoea",
      "Menopause Problems",
    ],
  },
  {
    title: "Endocrine Diseases",
    image: "/diseases/endocrine-diseases.png",
    conditions: ["Diabetes", "Obesity", "Thyroid", "PCOS"],
  },
  {
    title: "Sexual Problems",
    image: "/diseases/sexual-problems.png",
    conditions: [
      "Erectile Dysfunction",
      "Oligospermia",
      "Varicocele",
      "Premature Ejaculation",
    ],
  },
  {
    title: "Respiratory Disorders",
    image: "/diseases/respiratory-diseases.png",
    conditions: ["Asthma", "Bronchitis", "Allergic Rhinitis", "Sinusitis"], // Corrected logic based on common issues
  },
  {
    title: "Life Style Disease",
    image: "/diseases/life-style-diseases.png",
    conditions: ["Obesity", "Diabetes", "Hypertension", "PCOD"],
  },
  {
    title: "Anorectal Disease",
    image: "/diseases/anorectal-diseases.jpg",
    conditions: ["Piles", "Fissure", "Fistula", "Pilonidal sinus"],
  },
  {
    title: "Mental Health",
    image: "/diseases/mental-health.jpg",
    conditions: ["Anxiety", "Depression", "Sleep Apnea", "Insomnia"],
  },
];

const DiseasesWeTreat = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const progressBar = progressBarRef.current;
    if (!container || !progressBar) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const progress = scrollTop / (scrollHeight - clientHeight);
      const clampedProgress = Math.min(Math.max(progress, 0), 1);

      // Direct DOM manipulation for performance
      const minHeight = 50.67;
      const maxHeight = 353;
      const height = minHeight + clampedProgress * (maxHeight - minHeight);

      progressBar.style.height = `${height}px`;
    };

    container.addEventListener("scroll", handleScroll);
    // Initial call to set position
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full bg-neutral-bg py-12">
      <div className="w-full max-w-[1320px] mx-auto px-4">
        {/* Main Container */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-6">
          {/* Left Side - Info Card */}
          <div className="w-full lg:w-[614px] h-auto lg:h-[417px] bg-[#77C5D2]/10 rounded-[30px] p-6 lg:p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-[28px] lg:text-[38px] font-bold text-black font-sans leading-[36px] lg:leading-[46px] mb-4 lg:mb-6">
                Diseases We Treat
              </h2>
              <p className="text-[#7C7C7C] text-[14px] lg:text-[16px] font-normal leading-[22px] lg:leading-[24px] font-sans mb-6 lg:mb-0">
                Ayurveda is an ancient healing system that restores balance in
                the body&apos;s energies. It uses herbal remedies, dietary
                changes, and lifestyle adjustments to alleviate symptoms and
                enhance overall well-being.
              </p>
            </div>
            <button className="w-full lg:w-[208px] h-[45px] bg-primary text-white rounded-[50px] font-semibold text-[14px] hover:bg-[#2D5A61] transition-colors duration-300 uppercase tracking-wider">
              Book Consultation
            </button>
          </div>

          {/* Right Side - Scrollable Cards with Progress Bar */}
          <div className="flex-1 flex gap-3 h-[500px] lg:h-[491px]">
            {/* Wrapper for List + Gradient */}
            <div className="flex-1 relative h-full">
              {/* Scrollable Container */}
              <div
                ref={scrollContainerRef}
                className="w-full h-full overflow-y-auto pr-2 no-scrollbar pb-4"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  overscrollBehaviorY: "auto",
                }}
                onWheel={(e) => {
                  const container = e.currentTarget;
                  const { scrollTop, scrollHeight, clientHeight } = container;

                  // Check if we are at the bottom and scrolling down
                  if (
                    e.deltaY > 0 &&
                    Math.abs(scrollHeight - clientHeight - scrollTop) < 5 // Tolerance
                  ) {
                    // Prevent normal scroll sticking
                    // Trigger smooth scroll to next section
                    if (!gsap.isTweening(window)) {
                      gsap.to(window, {
                        scrollTo: "#stories-of-happy-patients",
                        duration: 1.5,
                        ease: "power2.inOut",
                      });
                    }
                  }
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                  {diseases.map((disease, index) => (
                    <div
                      key={index}
                      className="bg-white overflow-hidden flex flex-col w-full mx-auto"
                      style={{
                        height: "auto",
                        minHeight: "352.98px",
                        borderRadius: "13.38px",
                        border: "1.78px solid rgba(214, 214, 214, 0.40)",
                        boxShadow:
                          "3.57px 3.57px 8.92px -4.46px rgba(0, 0, 0, 0.10)",
                      }}
                    >
                      {/* Image */}
                      <div
                        className="relative w-full shrink-0 bg-[#D9D9D9]"
                        style={{ height: "168.35px" }}
                      >
                        <Image
                          src={disease.image}
                          alt={disease.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-[18px] font-bold text-black mb-3 leading-tight">
                          {disease.title}
                        </h3>
                        <ul className="space-y-2">
                          {disease.conditions.map((condition, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2 text-[14px] text-[#7C7C7C]"
                            >
                              <Image
                                src="/icons/tick.svg"
                                alt=""
                                width={20}
                                height={20}
                                className="shrink-0"
                              />
                              <span className="leading-tight">{condition}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                  {/* Bottom spacing for gradient */}
                  <div className="h-10 w-full col-span-2"></div>
                </div>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none z-10" />
            </div>

            {/* Progress Bar */}
            <div className="w-[8.59px] h-[353px] bg-[#ECECEC] rounded-[12.88px] relative self-center flex-shrink-0">
              {/* Active Progress */}
              <div
                ref={progressBarRef}
                className="w-full bg-primary rounded-[12.88px]"
                // Initial height set via inline style for SSR/First paint, afterwards logic handles it
                style={{ height: "50.67px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseasesWeTreat;
