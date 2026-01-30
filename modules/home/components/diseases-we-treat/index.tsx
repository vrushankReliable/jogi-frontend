"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

import api from "@/services/api";

const DiseasesWeTreat = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [diseasesList, setDiseasesList] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const { data } = await api.get("/diseases");
        setDiseasesList(data.data);
      } catch (err) {
        console.error("Failed to fetch diseases", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDiseases();
  }, []);

  // Progress bar sync
  useEffect(() => {
    const container = scrollContainerRef.current;
    const progressBar = progressBarRef.current;

    if (!container || !progressBar) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;

      const progress = scrollTop / (scrollHeight - clientHeight || 1);

      const clamped = Math.min(Math.max(progress, 0), 1);

      const minHeight = 50.67;
      const maxHeight = 353;

      const height = minHeight + clamped * (maxHeight - minHeight);

      progressBar.style.height = `${height}px`;
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [loading]); // Re-attach when data loaded

  return (
    <div className="w-full bg-neutral-bg py-12">
      <div className="w-full max-w-[1320px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT INFO CARD */}
          <div className="w-full lg:w-[614px] bg-[#77C5D2]/10 rounded-[30px] p-6 lg:p-10 flex flex-col justify-between items-center lg:items-start">
            <div className="flex flex-col items-center lg:items-start">
              <h2 className="text-[30px] lg:text-[38px] font-bold leading-[36px] lg:leading-[46px] mb-4 text-center lg:text-left">
                Diseases We Treat
              </h2>

              <p className="text-[#7C7C7C] text-[16px] lg:text-[20px] leading-[1.3] mb-4 lg:mb-4 text-center lg:text-left">
                Ayurveda is an ancient healing system that restores balance in
                the body's energies. It uses herbal remedies, dietary changes,
                and lifestyle adjustments to alleviate symptoms and enhance
                overall well-being.
              </p>
            </div>

            <button className="px-8 h-[45px] bg-primary text-white rounded-[50px] font-semibold text-[14px] hover:bg-[#2D5A61] transition uppercase tracking-wider">
              Book Consultation
            </button>
          </div>

          {/* RIGHT SCROLL AREA */}
          <div className="flex flex-1 gap-3 w-full h-[318px] lg:h-[491px]">
            {/* Scroll Wrapper */}
            <div className="relative flex-1 h-full">
              {/* SCROLL CONTAINER */}
              <div
                ref={scrollContainerRef}
                className="w-full h-[318px] lg:h-full overflow-y-auto pr-2 no-scrollbar pb-6"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  overscrollBehavior: "contain",
                  WebkitOverflowScrolling: "touch",
                }}
                onWheel={(e) => {
                  const container = e.currentTarget;
                  const { scrollTop, scrollHeight, clientHeight } = container;

                  const reachedBottom =
                    scrollTop + clientHeight >= scrollHeight - 2;

                  if (e.deltaY > 0 && reachedBottom) {
                    if (!gsap.isTweening(window)) {
                      gsap.to(window, {
                        scrollTo: "#stories-of-happy-patients",
                        duration: 1.3,
                        ease: "power2.inOut",
                      });
                    }
                  }
                }}
              >
                <div className="grid grid-cols-2 gap-3 sm:gap-[14px]">
                  {loading ? (
                    <div className="col-span-2 text-center py-10 opacity-50">
                      Loading diseases...
                    </div>
                  ) : (
                    diseasesList.map((disease, index) => {
                      const apiBaseUrl = (
                        process.env.NEXT_PUBLIC_API_URL ||
                        "http://localhost:5000/api/v1/public"
                      ).replace("/api/v1/public", "");
                      const imageUrl = disease.image?.startsWith("uploads/")
                        ? `${apiBaseUrl}/${disease.image}`
                        : disease.image || "/placeholder-img.svg";

                      return (
                        <div
                          key={disease._id || index}
                          className="bg-white flex flex-col w-full overflow-hidden"
                          style={{
                            borderRadius: "13.38px",
                            border: "1.78px solid rgba(214,214,214,0.40)",
                            boxShadow:
                              "3.57px 3.57px 8.92px -4.46px rgba(0,0,0,0.10)",
                          }}
                        >
                          {/* IMAGE */}
                          <div className="relative w-full bg-[#D9D9D9] h-[120px] lg:h-[168px]">
                            <Image
                              src={imageUrl}
                              alt={disease.name}
                              fill
                              className="object-cover"
                              unoptimized // API images might not be in Next.js public
                            />
                          </div>

                          {/* CONTENT */}
                          <div className="p-4 flex flex-col flex-grow">
                            <h3 className="text-[18px] font-bold mb-3">
                              {disease.name}
                            </h3>

                            <ul className="space-y-2">
                              {(disease.conditions || []).map(
                                (condition: string, idx: number) => (
                                  <li
                                    key={idx}
                                    className="flex items-center gap-2 text-[14px] text-[#7C7C7C]"
                                  >
                                    <Image
                                      src="/icons/tick.svg"
                                      alt=""
                                      width={20}
                                      height={20}
                                    />
                                    {condition}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        </div>
                      );
                    })
                  )}

                  {/* Spacer for gradient fade */}
                  <div className="h-12 col-span-2" />
                </div>
              </div>

              {/* GRADIENT OVERLAY */}
              <div className="absolute bottom-0 left-0 w-full h-[60px] lg:h-[150px] bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none z-30" />
            </div>

            {/* DESKTOP PROGRESS BAR */}
            <div className="hidden lg:flex w-[8.59px] h-[353px] bg-[#ECECEC] rounded-[12.88px] self-center">
              <div
                ref={progressBarRef}
                className="w-full bg-primary rounded-[12.88px]"
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
