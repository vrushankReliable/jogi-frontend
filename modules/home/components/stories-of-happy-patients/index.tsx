"use client";
import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    id: 1,
    name: "Dinesh Desai",
    condition: "Joint Pain",
    image: "/stories/dinesh-desai.png",
    text: "I had been suffering from IBS since my teenage years. Whenever I ate even a small meal, I immediately felt the urge to go to the toilet, which made everyday life very difficult. Because of this constant discomfort, I was unable to concentrate properly on my studies.",
  },
  {
    id: 2,
    name: "Anjali Mehta",
    condition: "Skin Issues",
    image: "/stories/patient-2.png",
    text: "After years of struggling with severe acne and trying countless chemical treatments, I turned to JOGI. The natural approach not only cleared my skin but improved my overall gut health. I feel more confident than ever.",
  },
  {
    id: 3,
    name: "Rahul Verma",
    condition: "Digestive Disorders",
    image: "/stories/patient-3.png",
    text: "Chronic acidity was ruining my sleep and work life. The personalized diet plan and herbal remedies prescribed here worked wonders. It wasn't a quick fix but a permanent lifestyle change that I am grateful for.",
  },
  {
    id: 4,
    name: "Sita Patil",
    condition: "Hair Problems",
    image: "/stories/patient-4.png",
    text: "I was losing hair at an alarming rate and was very stressed. The scalp treatments and internal medicines helped reduce hair fall significantly within two months. My hair volume/texture has improved drastically.",
  },
];

const StoriesOfHappyPatients = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(
        ".story-card",
        cardsContainerRef.current,
      ) as HTMLElement[];
      const totalCards = cards.length;

      if (totalCards === 0) return;

      // DESKTOP ANIMATION (Pinned Stack)
      mm.add("(min-width: 1024px)", () => {
        // Initial State for cards - FIRST CARD FULLY VISIBLE
        cards.forEach((card, i) => {
          gsap.set(card, {
            yPercent: i === 0 ? 0 : 100, // First card at position, others below
            opacity: i === 0 ? 1 : 0, // First card visible, others hidden
            zIndex: totalCards - i, // First card on top
            position: "absolute",
            top: 0,
            left: 0,
          });
        });

        // Create timeline for card animations with PINNED section
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top", // Pin when section hits top
            end: () => `+=${window.innerHeight * totalCards * 1.5}`, // Much more scroll distance for slower feel
            pin: true, // PIN THE ENTIRE SECTION
            pinSpacing: true, // Add space so next section comes after
            scrub: 5, // Higher = much slower card transitions
            snap: {
              snapTo: 1 / (totalCards - 1),
              duration: { min: 0.8, max: 1.5 },
              delay: 0.1,
              ease: "power2.inOut",
              inertia: false,
            },
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // Build the animation timeline
        for (let i = 1; i < totalCards; i++) {
          // Outgoing card fades out and slides up slightly
          tl.to(
            cards[i - 1],
            {
              yPercent: -30,
              opacity: 0,
              duration: 1,
              ease: "power2.out",
            },
            i - 1,
          );

          // Incoming card appears from bottom with fade in
          tl.fromTo(
            cards[i],
            { yPercent: 50, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1, ease: "power2.out" },
            "<",
          );
        }
      });

      // MOBILE ANIMATION (Simple Vertical Scroll with Fade Up)
      mm.add("(max-width: 1023px)", () => {
        cards.forEach((card) => {
          gsap.set(card, {
            opacity: 0,
            y: 50,
            position: "relative",
            clearProps: "all", // Ensure we clear desktop styles if resizing
          });

          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stories-of-happy-patients"
      ref={sectionRef}
      className="stories-section w-full bg-[#F0F8FF] min-h-screen lg:h-screen flex items-center justify-center relative py-16 lg:py-0"
    >
      {/* Decorative Wave Design - Bottom Right */}
      <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 opacity-[0.05] pointer-events-none z-0 hidden lg:block">
        <img src="/waves-design.png" alt="" className="w-[500px] h-auto" />
      </div>

      <div className="w-full max-w-[1320px] mx-auto px-4 flex flex-col lg:flex-row justify-between items-center relative z-10 gap-12 lg:gap-0">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 pr-0 lg:pr-12 z-10 flex flex-col justify-center text-center lg:text-left">
          <h2 className="text-[32px] lg:text-[48px] font-bold text-black font-sans mb-4 lg:mb-6 leading-tight">
            Stories of Happy Patients
          </h2>
          <p className="text-[#555] text-[16px] lg:text-[18px] leading-[26px] lg:leading-[28px] font-sans mb-6 lg:mb-8 max-w-[500px] mx-auto lg:mx-0">
            At JOGI Ayurved, we are honored to be a part of our patients&apos;
            healing journeys. From chronic pain relief to improved lifestyle
            balance, our patients share real stories of recovery through
            authentic Ayurvedic care.
          </p>
          <div className="mb-8 lg:mb-10">
            <p className="text-[#555] text-[16px] leading-[26px]">
              These heartfelt experiences reflect our commitment to holistic
              healing, restoring health naturally.
            </p>
          </div>

          <button className="bg-[#3A6F78] text-white px-8 py-3 rounded-full font-semibold uppercase tracking-wider text-[14px] hover:bg-[#2D5A61] transition-colors w-fit mx-auto lg:mx-0">
            View More Stories of Our Happy Patient
          </button>
        </div>

        {/* Right Content - Cards */}
        <div
          className="w-full lg:w-1/2 flex items-center justify-center relative"
          ref={cardsContainerRef}
        >
          {/* Card Container - Vertical Stack on Mobile, Absolute Stack on Desktop */}
          <div className="relative w-full max-w-[555px] flex flex-col gap-6 lg:block lg:h-[479px] lg:overflow-visible">
            {stories.map((story) => (
              <div
                key={story.id}
                className="story-card relative lg:absolute top-0 left-0 w-full h-auto lg:h-full bg-white rounded-[30px] lg:rounded-[50px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 lg:p-12 flex flex-col justify-center will-change-transform"
              >
                <div className="flex items-center gap-4 lg:gap-6 mb-6 lg:mb-8">
                  <div className="relative w-[70px] lg:w-[95px] h-[70px] lg:h-[95px] rounded-[15px] lg:rounded-[20px] overflow-hidden shrink-0">
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-[24px] lg:text-[32px] font-bold text-black leading-tight text-left">
                      {story.name}
                    </h3>
                    <p className="text-[#3A6F78] text-[16px] lg:text-[20px] font-medium text-left">
                      {story.condition}
                    </p>
                  </div>
                </div>

                <p className="text-[#555] text-[16px] lg:text-[18px] leading-[26px] lg:leading-[30px] font-sans text-left">
                  {story.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoriesOfHappyPatients;
