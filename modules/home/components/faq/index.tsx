"use client";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// FAQ Categories with their FAQs
const faqSections = [
  {
    id: "all",
    label: "ALL",
    faqs: [
      {
        id: 1,
        question: "What is Ayurveda?",
        answer:
          "Ayurveda is an ancient Indian system of medicine that focuses on achieving optimal health through a balance of mind, body, and spirit. It uses natural remedies, dietary guidelines, and lifestyle practices to prevent and treat illness.",
      },
      {
        id: 2,
        question: "Is Ayurvedic treatment safe?",
        answer:
          "Yes, Ayurvedic treatments are generally safe when administered by qualified practitioners. All treatments use natural herbs and therapies that have been used for thousands of years with proven efficacy.",
      },
      {
        id: 3,
        question: "How does Ayurveda treat diseases?",
        answer:
          "Ayurveda treats diseases by identifying the root cause and restoring balance to the body's doshas (Vata, Pitta, Kapha). Treatment includes herbal medicines, Panchakarma therapies, dietary changes, and lifestyle modifications.",
      },
      {
        id: 4,
        question: "What are the three doshas in Ayurveda?",
        answer:
          "The three doshas are Vata (air and space), Pitta (fire and water), and Kapha (water and earth). Each person has a unique combination of these doshas that determines their physical and mental characteristics.",
      },
      {
        id: 5,
        question: "Can Ayurveda cure chronic diseases?",
        answer:
          "Ayurveda can help manage and often significantly improve chronic conditions by addressing the root cause rather than just symptoms. Many patients experience substantial relief from conditions like arthritis, diabetes, and digestive disorders.",
      },
    ],
  },
  {
    id: "online",
    label: "ONLINE CONSULTATION",
    faqs: [
      {
        id: 6,
        question: "Do Ayurvedic medicines have side effects?",
        answer:
          "When taken under proper guidance, Ayurvedic medicines have minimal to no side effects. They are made from natural ingredients and are designed to work in harmony with your body.",
      },
      {
        id: 7,
        question: "How long does Ayurvedic treatment take to show results?",
        answer:
          "The time for results varies depending on the condition and individual constitution. Some patients experience improvement within weeks, while chronic conditions may require several months of consistent treatment.",
      },
      {
        id: 8,
        question: "How can I book an online consultation?",
        answer:
          "You can book an online consultation through our website by selecting the 'Online Consultation' option, choosing your preferred doctor and time slot. Video consultations are available via Zoom or Google Meet.",
      },
      {
        id: 9,
        question: "What documents should I prepare for online consultation?",
        answer:
          "Please have your previous medical reports, current medication list, and any relevant test results ready. Also prepare a list of your symptoms and health concerns to discuss with the doctor.",
      },
      {
        id: 10,
        question: "Can I get medicines delivered after online consultation?",
        answer:
          "Yes, we offer doorstep delivery of Ayurvedic medicines across India after your online consultation. Medicines are typically delivered within 3-5 business days.",
      },
    ],
  },
  {
    id: "panchakarma",
    label: "PANCHAKARMA",
    faqs: [
      {
        id: 11,
        question: "What is Panchakarma therapy?",
        answer:
          "Panchakarma is a comprehensive Ayurvedic detoxification and rejuvenation program consisting of five therapeutic treatments. It helps remove toxins from the body and restore balance to the doshas.",
      },
      {
        id: 12,
        question: "How long does a Panchakarma treatment take?",
        answer:
          "A complete Panchakarma program typically takes 7 to 21 days depending on the individual's health condition and treatment goals. Some specialized programs may extend up to 28 days.",
      },
      {
        id: 13,
        question: "Is Panchakarma suitable for everyone?",
        answer:
          "While Panchakarma benefits most people, it's not recommended during pregnancy, for very young children, or for people with certain acute conditions. A consultation with our doctors will determine if it's right for you.",
      },
      {
        id: 14,
        question: "What should I expect during Panchakarma treatment?",
        answer:
          "During Panchakarma, you'll receive daily therapies including oil massages, steam treatments, and specialized procedures. You'll follow a specific diet and lifestyle routine to maximize the benefits.",
      },
      {
        id: 15,
        question: "How can I book an appointment?",
        answer:
          "You can book a Panchakarma appointment by calling our clinic directly, using the online booking form on our website, or visiting our hospital. We recommend booking at least 2 weeks in advance.",
      },
    ],
  },
];

// Individual FAQ Item Component
const FAQItem = ({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { id: number; question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && answerRef.current) {
      if (isOpen) {
        gsap.to(contentRef.current, {
          height: answerRef.current.scrollHeight,
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(answerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: 0.1,
          ease: "power2.out",
        });
      } else {
        gsap.to(answerRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: "power2.in",
        });
        gsap.to(contentRef.current, {
          height: 0,
          duration: 0.3,
          delay: 0.1,
          ease: "power2.in",
        });
      }
    }
  }, [isOpen]);

  return (
    <div
      className="rounded-[10px] overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:py-2"
      style={{
        backgroundColor: isOpen
          ? "rgba(100, 183, 169, 0.1)"
          : "rgba(100, 183, 169, 0.05)",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 cursor-pointer group"
        style={{ minHeight: "60px" }}
      >
        <span className="text-[20px] font-medium text-[#333] text-left pr-4 group-hover:text-[#3A6F78] transition-colors">
          {faq.question}
        </span>
        <div
          className="flex-shrink-0 w-[17px] h-[17px] flex items-center justify-center transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          <Image
            src={isOpen ? "/icons/cross.svg" : "/icons/add.svg"}
            alt={isOpen ? "Close" : "Open"}
            width={isOpen ? 14 : 17}
            height={isOpen ? 14 : 17}
            className="transition-opacity duration-300"
          />
        </div>
      </button>

      <div ref={contentRef} className="h-0 overflow-hidden">
        <div ref={answerRef} className="px-6 pb-5 opacity-0 -translate-y-2.5">
          <p className="text-[18px] text-[#666] leading-[1.3]">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFAQId, setOpenFAQId] = useState<number | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const categoryRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({}); // New ref for tabs
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 }); // New state for mobile bar

  // Update mobile indicator position
  useEffect(() => {
    const activeTab = categoryRefs.current[activeCategory];
    if (activeTab) {
      setIndicatorStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    }
  }, [activeCategory]);

  // Setup scroll-based category detection
  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isMobile = window.innerWidth < 1024;

      let mostVisibleSection = faqSections[0].id;

      if (isMobile) {
        // Mobile: Window scroll logic
        const headerOffset = 140; // Approx sticky header height + buffer
        let minDistance = Infinity;

        faqSections.forEach((section) => {
          const sectionEl = sectionRefs.current[section.id];
          if (sectionEl) {
            const rect = sectionEl.getBoundingClientRect();
            // Distance from top of sticky header area
            const distance = Math.abs(rect.top - headerOffset);

            // Check if section is somewhat visible (top is above fold or just below)
            // and bottom is below the header
            if (rect.bottom > headerOffset && distance < minDistance) {
              minDistance = distance;
              mostVisibleSection = section.id;
            }
          }
        });
      } else {
        // Desktop: Container scroll logic
        const containerRect = container.getBoundingClientRect();
        let maxVisibility = 0;

        faqSections.forEach((section) => {
          const sectionEl = sectionRefs.current[section.id];
          if (sectionEl) {
            const sectionRect = sectionEl.getBoundingClientRect();

            // Calculate intersection height
            const intersectionTop = Math.max(
              containerRect.top,
              sectionRect.top,
            );
            const intersectionBottom = Math.min(
              containerRect.bottom,
              sectionRect.bottom,
            );
            const visibleHeight = Math.max(
              0,
              intersectionBottom - intersectionTop,
            );

            if (visibleHeight > maxVisibility) {
              maxVisibility = visibleHeight;
              mostVisibleSection = section.id;
            }
          }
        });
      }

      setActiveCategory(mostVisibleSection);
    };

    window.addEventListener("scroll", handleScroll);
    container.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggle = (id: number) => {
    setOpenFAQId(openFAQId === id ? null : id);
  };

  const scrollToSection = (sectionId: string) => {
    const container = scrollContainerRef.current;
    const sectionEl = sectionRefs.current[sectionId];

    if (sectionEl) {
      if (window.innerWidth < 1024) {
        // Mobile: Scroll window
        const y = sectionEl.getBoundingClientRect().top + window.scrollY - 130; // Offset for sticky headers
        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      } else if (container) {
        // Desktop: Scroll container
        const targetScroll = sectionEl.offsetTop;
        gsap.to(container, {
          scrollTop: targetScroll,
          duration: 1,
          ease: "power3.inOut",
        });
      }
    }
  };

  // Calculate progress bar position based on active category
  const getProgressTop = () => {
    const activeIndex = faqSections.findIndex((s) => s.id === activeCategory);
    return activeIndex * 44; // Each category ~44px
  };

  return (
    <section
      id="faq"
      className="w-full bg-white py-16 relative overflow-hidden"
    >
      {/* Decorative Waves - Right Side */}
      <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 w-[300px] h-[600px] pointer-events-none opacity-[0.05] z-0">
        <Image
          src="/waves-design.png"
          alt=""
          fill
          className="object-contain object-right"
        />
      </div>

      <div className="w-full max-w-[1135px] mx-auto px-4 relative z-10">
        {/* Title */}
        <h2 className="text-[32px] font-bold text-black text-center mb-10">
          Frequently Asked Questions
        </h2>

        {/* Content Container */}
        <div
          className="flex flex-col lg:flex-row gap-8"
          style={{ height: "auto", minHeight: "500px" }}
        >
          {/* Left Sidebar - Categories */}
          <div className="w-full lg:w-[319px] flex-shrink-0 sticky top-[80px] z-30 bg-white pt-2 lg:pt-0">
            <div className="flex flex-col lg:flex-row h-full pb-4 lg:pb-0 gap-4 border-b lg:border-b-0 border-[#E5E5E5] lg:border-none relative">
              {/* Horizontal Progress Bar (Mobile Only) */}
              <div className="block lg:hidden w-full h-[3px] bg-[#E5E5E5] relative order-1">
                <div
                  className="absolute top-0 h-full bg-[#3A6F78] transition-all duration-300"
                  style={{
                    left: `${indicatorStyle.left}px`,
                    width: `${indicatorStyle.width}px`,
                  }}
                />
              </div>

              {/* Vertical Progress Bar (Desktop Only) */}
              <div
                className="hidden lg:block w-[3px] bg-[#E5E5E5] relative mr-4 flex-shrink-0"
                style={{
                  height: `${faqSections.length * 44}px`,
                }}
              >
                <div
                  className="absolute left-0 w-full h-[44px] bg-[#3A6F78] transition-all duration-300"
                  style={{ top: `${getProgressTop()}px` }}
                />
              </div>

              {/* Categories */}
              <div className="flex flex-row lg:flex-col w-full overflow-x-auto no-scrollbar order-2 lg:order-none">
                {faqSections.map((section) => (
                  <button
                    key={section.id}
                    ref={(el) => {
                      categoryRefs.current[section.id] = el;
                    }}
                    onClick={() => scrollToSection(section.id)}
                    className={`whitespace-nowrap text-left px-4 lg:px-2 text-[12px] lg:text-[16px] font-bold uppercase tracking-wide transition-colors h-[44px] flex items-center flex-shrink-0 lg:flex-shrink ${
                      activeCategory === section.id
                        ? "text-[#3A6F78]"
                        : "text-[#999] hover:text-[#666]"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Scrollable FAQ Container */}
          <div
            ref={scrollContainerRef}
            className="relative flex-1 overflow-visible lg:overflow-y-auto pr-0 lg:pr-4 custom-scrollbar h-auto lg:h-[600px]"
          >
            <div className="flex flex-col gap-8">
              {faqSections.map((section) => (
                <div
                  key={section.id}
                  ref={(el) => {
                    sectionRefs.current[section.id] = el;
                  }}
                  className="flex flex-col gap-3"
                >
                  {/* Section Title */}
                  <h3 className="text-[20px] lg:text-[20px] font-semibold text-[#3A6F78] mb-2">
                    {section.label}
                  </h3>

                  {/* FAQ Items */}
                  {section.faqs.map((faq) => (
                    <FAQItem
                      key={faq.id}
                      faq={faq}
                      isOpen={openFAQId === faq.id}
                      onToggle={() => handleToggle(faq.id)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </section>
  );
};

export default FAQ;
