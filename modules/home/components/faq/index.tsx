"use client";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import api from "@/services/api";

gsap.registerPlugin(ScrollTrigger);

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
  const [faqSections, setFaqSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFAQId, setOpenFAQId] = useState<number | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const categoryRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const { data } = await api.get("/faqs");
        const allFaqs = data.data;

        const groups = [
          {
            id: "all",
            label: "ALL",
            faqs: allFaqs.filter((f: any) => f.category === "ALL"),
          },
          {
            id: "online",
            label: "ONLINE CONSULTATION",
            faqs: allFaqs.filter(
              (f: any) => f.category === "ONLINE CONSULTATION",
            ),
          },
          {
            id: "panchakarma",
            label: "PANCHAKARMA",
            faqs: allFaqs.filter((f: any) => f.category === "PANCHAKARMA"),
          },
        ];

        setFaqSections(groups.filter((g) => g.faqs.length > 0));
      } catch (err) {
        console.error("Failed to fetch FAQs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  useEffect(() => {
    const activeTab = categoryRefs.current[activeCategory];
    if (activeTab) {
      setIndicatorStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    }
  }, [activeCategory, faqSections]);

  useLayoutEffect(() => {
    if (loading || faqSections.length === 0) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isMobile = window.innerWidth < 1024;
      let mostVisibleSection = faqSections[0]?.id;

      if (isMobile) {
        const headerOffset = 140;
        let minDistance = Infinity;

        faqSections.forEach((section) => {
          const sectionEl = sectionRefs.current[section.id];
          if (sectionEl) {
            const rect = sectionEl.getBoundingClientRect();
            const distance = Math.abs(rect.top - headerOffset);
            if (rect.bottom > headerOffset && distance < minDistance) {
              minDistance = distance;
              mostVisibleSection = section.id;
            }
          }
        });
      } else {
        const containerRect = container.getBoundingClientRect();
        let maxVisibility = 0;

        faqSections.forEach((section) => {
          const sectionEl = sectionRefs.current[section.id];
          if (sectionEl) {
            const sectionRect = sectionEl.getBoundingClientRect();
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

      if (mostVisibleSection) setActiveCategory(mostVisibleSection);
    };

    window.addEventListener("scroll", handleScroll);
    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      container.removeEventListener("scroll", handleScroll);
    };
  }, [loading, faqSections]);

  const handleToggle = (id: number) => {
    setOpenFAQId(openFAQId === id ? null : id);
  };

  const scrollToSection = (sectionId: string) => {
    const container = scrollContainerRef.current;
    const sectionEl = sectionRefs.current[sectionId];

    if (sectionEl) {
      if (window.innerWidth < 1024) {
        const y = sectionEl.getBoundingClientRect().top + window.scrollY - 130;
        window.scrollTo({ top: y, behavior: "smooth" });
      } else if (container) {
        const targetScroll = sectionEl.offsetTop;
        gsap.to(container, {
          scrollTop: targetScroll,
          duration: 1,
          ease: "power3.inOut",
        });
      }
    }
  };

  const getProgressTop = () => {
    const activeIndex = faqSections.findIndex((s) => s.id === activeCategory);
    return activeIndex * 44;
  };

  if (loading)
    return <div className="py-20 text-center opacity-50">Loading FAQs...</div>;

  return (
    <section
      id="faq"
      className="w-full bg-white py-16 relative overflow-hidden"
    >
      <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 w-[300px] h-[600px] pointer-events-none opacity-[0.05] z-0">
        <Image
          src="/waves-design.png"
          alt=""
          fill
          className="object-contain object-right"
        />
      </div>

      <div className="w-full max-w-[1135px] mx-auto px-4 relative z-10">
        <h2 className="text-[32px] font-bold text-black text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div
          className="flex flex-col lg:flex-row gap-8"
          style={{ height: "auto", minHeight: "500px" }}
        >
          <div className="w-full lg:w-[319px] flex-shrink-0 sticky top-[80px] z-30 bg-white pt-2 lg:pt-0">
            <div className="flex flex-col lg:flex-row h-full pb-4 lg:pb-0 gap-4 border-b lg:border-b-0 border-[#E5E5E5] lg:border-none relative">
              <div className="block lg:hidden w-full h-[3px] bg-[#E5E5E5] relative order-1">
                <div
                  className="absolute top-0 h-full bg-[#3A6F78] transition-all duration-300"
                  style={{
                    left: `${indicatorStyle.left}px`,
                    width: `${indicatorStyle.width}px`,
                  }}
                />
              </div>

              <div
                className="hidden lg:block w-[3px] bg-[#E5E5E5] relative mr-4 flex-shrink-0"
                style={{ height: `${faqSections.length * 44}px` }}
              >
                <div
                  className="absolute left-0 w-full h-[44px] bg-[#3A6F78] transition-all duration-300"
                  style={{ top: `${getProgressTop()}px` }}
                />
              </div>

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
                  <h3 className="text-[20px] lg:text-[20px] font-semibold text-[#3A6F78] mb-2">
                    {section.label}
                  </h3>
                  {section.faqs.map((faq: any) => (
                    <FAQItem
                      key={faq._id}
                      faq={faq}
                      isOpen={openFAQId === faq._id}
                      onToggle={() => handleToggle(faq._id)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
