"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConsultationModal = ({ isOpen, onClose }: ConsultationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="bg-white rounded-[20px] w-full max-w-[910px] max-h-[90vh] overflow-y-auto md:overflow-hidden relative shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 font-sans">
        {/* Header */}
        <div className="bg-[#3A6F78] py-4 px-6 relative flex items-center justify-center">
          <h2 className="text-white text-[14px] md:text-[20px] font-bold tracking-[0.05em] uppercase text-center">
            BOOK YOUR FREE CONSULTATION NOW!
          </h2>
          <button
            onClick={onClose}
            className="absolute right-4 md:right-6 p-2 hover:bg-white/10 rounded-full transition-colors group"
          >
            <Image
              src="/icons/cross.svg"
              alt="Close"
              width={16}
              height={16}
              className="brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:py-12 md:px-16 flex flex-col md:flex-row gap-12 lg:gap-20">
          {/* Left Column: Information */}
          <div className="w-full md:w-[50%] flex flex-col justify-start">
            <div className="mb-8 block">
              <h3 className="text-[20px] lg:text-[24px] font-bold text-black mb-3 leading-tight tracking-tight">
                Expert Doctors, Personalized Care
              </h3>
              <p className="text-[#333] text-[14px] lg:text-[16px] leading-[1.3] opacity-80 font-medium">
                Our doctors will call you to understand your health concerns and
                recommend the best Ayurvedic treatment plan for you.
              </p>
            </div>

            <div className="block">
              <h3 className="text-[20px] lg:text-[24px] font-bold text-black mb-3 leading-tight tracking-tight">
                What Happens Next
              </h3>
              <div className="space-y-4 text-[#333] text-[13px] lg:text-[15px] opacity-80 font-medium leading-[1.6]">
                <p className="flex gap-3">
                  <span className="font-bold flex-shrink-0">(1)</span>
                  <span>
                    After you submit your details, our care coordinator will
                    contact you shortly.
                  </span>
                </p>
                <p className="flex gap-3">
                  <span className="font-bold flex-shrink-0">(2)</span>
                  <span>
                    The coordinator will carefully review your symptoms and
                    overall health.
                  </span>
                </p>
                <p className="flex gap-3">
                  <span className="font-bold flex-shrink-0">(3)</span>
                  <span>
                    Your doctor consultation will be arranged at the earliest
                    possible time.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="w-full md:w-[50%] flex flex-col pt-2">
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full h-[45px] px-6 rounded-[10px] border-[1px] border-[#D6D6D6] focus:border-[#3A6F78] outline-none transition-all placeholder:text-[#999] placeholder:font-semibold text-[15px] font-medium"
                />
                <input
                  type="tel"
                  placeholder="Contact Number"
                  className="w-full h-[45px] px-6 rounded-[10px] border-[1px] border-[#D6D6D6] focus:border-[#3A6F78] outline-none transition-all placeholder:text-[#999] placeholder:font-semibold text-[15px] font-medium"
                />
              </div>

              <div className="flex flex-col gap-3 mt-1">
                <button
                  type="submit"
                  className="w-full h-[45px] bg-[#3A6F78] text-white font-bold rounded-[10px] uppercase tracking-wide text-[13px] hover:bg-opacity-90 transition-all font-sans"
                >
                  BOOK FREE APPOINTMENT
                </button>

                <div className="flex items-center gap-4 py-0.5">
                  <div className="flex-1 h-[1px] bg-[#D6D6D6] opacity-50"></div>
                  <span className="text-[#999] text-[11px] font-bold uppercase tracking-widest leading-none">
                    OR
                  </span>
                  <div className="flex-1 h-[1px] bg-[#D6D6D6] opacity-50"></div>
                </div>

                <button
                  type="button"
                  className="w-full h-[45px] bg-[#77C5D2] text-white font-bold rounded-[10px] uppercase tracking-wide text-[13px] hover:bg-opacity-90 transition-all font-sans"
                >
                  CALL US
                </button>
              </div>

              <p className="text-[13px] lg:text-[14px] text-[#7C7C7C] font-semibold text-center mt-2 leading-[1.3] max-w-[407px] mx-auto">
                By clicking "Book Consultation", you agree to receive health
                updates on WhatsApp
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;
