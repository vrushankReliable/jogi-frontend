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
    condition: "Joint Pain & IBS",
    image: "/stories/dinesh-desai.png",
    text: "I had been suffering from IBS since my teenage years. Whenever I ate even a small meal, I immediately felt the urge to go to the toilet. It severely affected my daily life and confidence. JOGI Ayurved’s personalized treatment and diet plan not only resolved my digestive issues but also helped alleviate my chronic joint pain. I feel like a new person now.",
  },
  {
    id: 2,
    name: "Anjali Mehta",
    condition: "Skin Issues",
    image: "/stories/patient-2.png",
    text: "After years of struggling with severe acne and trying countless chemical treatments that only damaged my skin further, I turned to JOGI. The holistic approach, focusing on internal purification and natural remedies, cleared my skin within months. My confidence is back, and my skin has never looked healthier.",
  },
  {
    id: 3,
    name: "Rahul Verma",
    condition: "Digestive Disorders",
    image: "/stories/patient-3.png",
    text: "Chronic acidity was ruining my sleep and work life. I tried various medications, but the relief was always temporary. The personalized diet plan and herbal supplements from JOGI worked wonders. I no longer suffer from heartburn, and my energy levels have improved drastically.",
  },
  {
    id: 4,
    name: "Sita Patil",
    condition: "Hair Problems",
    image: "/stories/patient-4.png",
    text: "I was losing hair at an alarming rate and was very stressed about it. The scalp treatments and internal medications helped reduce hair fall significantly. Not only has the hair fall stopped, but I can also see new growth. I am incredibly grateful for the care and guidance provided.",
  },
];

const StoriesOfHappyPatients = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(
        ".story-card",
        cardsContainerRef.current,
      ) as HTMLElement[];

      if (!cards.length) return;

      const total = cards.length;

      const cardWrapper = cardsContainerRef.current?.querySelector(
        ".cards-wrapper",
      ) as HTMLElement;

      const containerHeight = cardWrapper.offsetHeight;

      /* INITIAL STACK STATE */

      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: i === 0 ? 0 : 120,
          opacity: i === 0 ? 1 : 0,
          zIndex: total - i,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          willChange: "transform",
        });
      });

      /* TIMELINE */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${containerHeight * total}`,
          pin: true,
          pinSpacing: true,
          scrub: 1.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 1; i < total; i++) {
        tl.to(
          cards[i - 1],
          {
            yPercent: -25,
            opacity: 0,
            ease: "power2.out",
            duration: 1,
          },
          i - 1,
        );

        tl.to(
          cards[i],
          {
            yPercent: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 1,
          },
          "<",
        );
      }

      // Prevent mobile jump refresh glitch
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stories-of-happy-patients"
      ref={sectionRef}
      className="w-full bg-[#F0F8FF] relative overflow-hidden"
      style={{ touchAction: "pan-y" }}
    >
      <div className="max-w-[1320px] mx-auto px-4 py-16 flex flex-col lg:flex-row items-center gap-12">
        {/* LEFT CONTENT */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-[clamp(32px,4vw,48px)] font-bold mb-4">
            Stories of Happy Patients
          </h2>

          <p className="text-[#555] text-[16px] lg:text-[18px] mb-6 max-w-[500px] mx-auto lg:mx-0">
            At JOGI Ayurved, we are honored to be a part of our patients’
            healing journeys.
          </p>

          <button className="bg-[#3A6F78] text-white px-8 py-3 rounded-full font-semibold uppercase tracking-wider text-[14px] hover:bg-[#2D5A61] transition">
            View More Stories
          </button>
        </div>

        {/* CARD STACK */}
        <div
          ref={cardsContainerRef}
          className="relative w-full lg:w-1/2 flex justify-center"
        >
          <div className="cards-wrapper relative w-full max-w-[700px] h-[580px]">
            {stories.map((story) => (
              <div
                key={story.id}
                className="story-card bg-white rounded-[30px] lg:rounded-[50px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 lg:p-14 flex flex-col justify-center h-full"
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className="relative w-[80px] h-[80px] lg:w-[90px] lg:h-[90px] rounded-[20px] overflow-hidden flex-shrink-0">
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-[22px] lg:text-[30px] font-bold text-[#333]">
                      {story.name}
                    </h3>
                    <p className="text-[#3A6F78] text-[16px] lg:text-[18px] font-medium">
                      {story.condition}
                    </p>
                  </div>
                </div>

                <p className="text-[#555] text-[16px] lg:text-[20px] leading-[28px] lg:leading-[34px]">
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
