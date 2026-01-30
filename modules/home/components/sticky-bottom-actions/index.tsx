"use client";
import React from "react";
import Image from "next/image";

interface StickyBottomActionsProps {
  onOpenConsultation: () => void;
}

const StickyBottomActions = ({
  onOpenConsultation,
}: StickyBottomActionsProps) => {
  return (
    <>
      {/* Bottom Bar Wrapper */}
      <div className="fixed bottom-0 left-0 right-0 z-[90] w-full pointer-events-none flex justify-start pl-4 md:pl-8">
        {/* WhatsApp Button - Floating on the right side of the screen */}
        <div className="absolute bottom-[65px] md:bottom-[10px] right-4 md:right-10 pointer-events-auto">
          <a
            href="https://wa.me/918800118053"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-[60px] h-[60px] md:w-[75px] md:h-[75px] transition-transform hover:scale-110 active:scale-95 drop-shadow-lg"
          >
            <Image
              src="/whatsapp.svg"
              alt="WhatsApp"
              width={75}
              height={75}
              className="w-full h-full object-contain"
            />
          </a>
        </div>

        {/* The Action Bar - Positioned on the Left with fixed width */}
        <div className="flex items-center bg-white rounded-t-[20px] overflow-hidden shadow-[0_-4px_25px_rgba(0,0,0,0.15)] pointer-events-auto h-[45px] md:h-[50px] w-full max-w-[520px] border-x-2 border-t-2 border-white md:bottom-0">
          {/* Book Free Consultation */}
          <button
            onClick={onOpenConsultation}
            className="h-full flex-1 flex flex-col items-center justify-center bg-[#3A6F78] text-white transition-all hover:bg-[#2D5A61] active:opacity-95 px-2 text-center"
          >
            <span className="text-[11px] md:text-[13px] font-bold tracking-wide uppercase leading-tight font-sans">
              BOOK FREE CONSULTATION
            </span>
          </button>

          {/* Vertical Separator */}
          <div className="w-[1px] h-full bg-white opacity-20" />

          {/* Know Your Prakriti */}
          <button className="h-full flex-1 flex flex-row items-center justify-center gap-2 bg-[#77C5D2] text-white transition-all hover:bg-[#66B4C1] active:opacity-95 px-2 text-center">
            <Image
              src="/prakriti.svg"
              alt="Prakriti"
              width={18}
              height={18}
              className="brightness-0 invert object-contain"
            />
            <span className="text-[11px] md:text-[13px] font-bold tracking-wide uppercase leading-tight font-sans">
              KNOW YOUR PRAKRITI
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default StickyBottomActions;
