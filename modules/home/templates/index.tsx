"use client";
import React from "react";
import Hero from "../components/hero";
import HeroMarquee from "../components/hero-marquee";
import HealingJourneys from "../components/healing-journeys";
import HealingExperts from "../components/healing-experts";
import FeaturedBy from "../components/featured-by";
import WhyJogi from "../components/why-jogi";
import DiseasesWeTreat from "../components/diseases-we-treat";
import StoriesOfHappyPatients from "../components/stories-of-happy-patients";
import OurMission from "../components/our-mission";
import WhatHappyPatientsSays from "../components/what-happy-patients-says";
import JogiBrandEstore from "../components/jogi-brand-estore";
import OurFounder from "../components/our-founder";
import SpreadingAyurveda from "../components/spreading-ayurveda";
import FAQ from "../components/faq";
import ScheduleConsultation from "../components/schedule-consultation";
import ConsultationModal from "../components/consultation-modal";
import StickyBottomActions from "../components/sticky-bottom-actions";

const HomeTemplate = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-0 w-full relative">
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <StickyBottomActions onOpenConsultation={() => setIsModalOpen(true)} />
      <Hero />
      <HeroMarquee />
      <HealingJourneys />
      <HealingExperts />
      <FeaturedBy />
      <WhyJogi />
      <DiseasesWeTreat />
      <StoriesOfHappyPatients />
      <OurMission />
      <WhatHappyPatientsSays />
      <JogiBrandEstore />
      <OurFounder />
      <SpreadingAyurveda />
      <FAQ />
      <ScheduleConsultation />
      {/* Additional sections can be added here */}
    </div>
  );
};

export default HomeTemplate;
