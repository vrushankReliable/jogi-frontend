"use client";
import React, { useState } from "react";
import Image from "next/image";

const ScheduleConsultation = () => {
  const [consultationType, setConsultationType] = useState<
    "offline" | "online"
  >("offline");

  return (
    <section className="w-full bg-white py-16 relative">
      <div className="w-full max-w-[1320px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Side - Content Card */}
          <div className="w-full lg:w-[57%] bg-[rgba(119,197,210,0.1)] rounded-[30px] p-10 lg:p-[60px] flex flex-col justify-center h-full min-h-[549px]">
            <h2 className="text-[32px] md:text-[36px] font-bold text-black mb-6 leading-tight">
              Schedule Your Consultation
            </h2>
            <p className="text-[#7C7C7C] text-[22px] font-medium leading-[26px] mb-10 max-w-[600px]">
              Every day, patients consult JOGI Ayurved Hospital to understand
              the root cause of their health concerns and receive personalised
              Ayurvedic treatment. With experienced doctors and natural
              therapies, the hospital focuses on safe, effective, and long-term
              healing.
            </p>

            <div className="flex flex-col gap-8">
              {/* Hospital Hours */}
              <div>
                <h3 className="text-[#3A6F78] text-[22px] font-bold leading-[26px] mb-2">
                  Hospital
                </h3>
                <div className="flex flex-col gap-1">
                  <p className="text-[#7C7C7C] text-[22px] font-medium leading-[26px]">
                    Monday-Sunday
                  </p>
                  <p className="text-[#7C7C7C] text-[22px] font-medium leading-[26px]">
                    7:30 AM - 9:00 PM
                  </p>
                </div>
              </div>

              {/* Online Consultation Hours */}
              <div>
                <h3 className="text-[#3A6F78] text-[22px] font-bold leading-[26px] mb-2">
                  Online Consultation
                </h3>
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="flex flex-col gap-1">
                    <p className="text-[#7C7C7C] text-[22px] font-medium leading-[26px]">
                      Monday-Saturday
                    </p>
                    <p className="text-[#7C7C7C] text-[22px] font-medium leading-[26px]">
                      8:00 AM - 8:00 PM
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[#7C7C7C] text-[22px] font-medium leading-[26px]">
                      Sunday
                    </p>
                    <p className="text-[#7C7C7C] text-[22px] font-medium leading-[26px]">
                      9:30 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form Card */}
          <div className="w-full lg:w-[43%] bg-[rgba(119,197,210,0.1)] rounded-[30px] p-8 lg:p-10 min-h-[549px]">
            {/* Radio Buttons */}
            <div className="flex gap-6 mb-8">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div
                  className={`w-6 h-6 rounded-full border-[2px] flex items-center justify-center transition-colors ${consultationType === "offline" ? "border-[#3A6F78]" : "border-[#D6D6D6]"}`}
                >
                  {consultationType === "offline" && (
                    <div className="w-3 h-3 rounded-full bg-[#3A6F78]" />
                  )}
                </div>
                <input
                  type="radio"
                  name="consultation"
                  className="hidden"
                  checked={consultationType === "offline"}
                  onChange={() => setConsultationType("offline")}
                />
                <span className="text-[#7C7C7C] font-semibold text-[15px]">
                  Offline Consultation
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div
                  className={`w-6 h-6 rounded-full border-[2px] flex items-center justify-center transition-colors ${consultationType === "online" ? "border-[#3A6F78]" : "border-[#D6D6D6]"}`}
                >
                  {consultationType === "online" && (
                    <div className="w-3 h-3 rounded-full bg-[#3A6F78]" />
                  )}
                </div>
                <input
                  type="radio"
                  name="consultation"
                  className="hidden"
                  checked={consultationType === "online"}
                  onChange={() => setConsultationType("online")}
                />
                <span className="text-[#7C7C7C] font-semibold text-[15px]">
                  Online Consultation
                </span>
              </label>
            </div>

            {/* Form Fields */}
            <form className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full h-[55px] px-6 rounded-[10px] border-[2px] border-[#D6D6D6] focus:border-[#3A6F78] outline-none text-[#333] placeholder:text-[#7C7C7C] placeholder:font-semibold placeholder:text-[16px] placeholder:font-montserrat bg-white text-[16px] transition-colors"
                style={{ borderColor: "#D6D6D6" }}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full h-[55px] px-6 rounded-[10px] border-[2px] border-[#D6D6D6] focus:border-[#3A6F78] outline-none text-[#333] placeholder:text-[#7C7C7C] placeholder:font-semibold placeholder:text-[16px] placeholder:font-montserrat bg-white text-[16px] transition-colors"
                style={{ borderColor: "#D6D6D6" }}
              />
              <input
                type="tel"
                placeholder="Contact No"
                className="w-full h-[55px] px-6 rounded-[10px] border-[2px] border-[#D6D6D6] focus:border-[#3A6F78] outline-none text-[#333] placeholder:text-[#7C7C7C] placeholder:font-semibold placeholder:text-[16px] placeholder:font-montserrat bg-white text-[16px] transition-colors"
                style={{ borderColor: "#D6D6D6" }}
              />
              <input
                type="text"
                placeholder="Additional Information"
                className="w-full h-[55px] px-6 rounded-[10px] border-[2px] border-[#D6D6D6] focus:border-[#3A6F78] outline-none text-[#333] placeholder:text-[#7C7C7C] placeholder:font-semibold placeholder:text-[16px] placeholder:font-montserrat bg-white text-[16px] transition-colors"
                style={{ borderColor: "#D6D6D6" }}
              />

              {/* Privacy Policy Checkbox */}
              <label className="flex items-center gap-3 mt-2 cursor-pointer select-none group">
                <div className="relative flex items-center justify-center w-6 h-6 bg-white border-[2px] border-[#D6D6D6] rounded group-hover:border-[#3A6F78] transition-colors">
                  <input
                    type="checkbox"
                    className="peer appearance-none w-full h-full cursor-pointer absolute opacity-0 z-10"
                  />
                  <div className="w-3 h-3 bg-[#3A6F78] opacity-0 peer-checked:opacity-100 transition-opacity rounded-[1px]" />
                </div>
                <span className="text-[#7C7C7C] text-[14px] font-semibold font-montserrat">
                  I agree to the terms and conditions, privacy policy.
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-[55px] mt-4 bg-[#3A6F78] text-white font-bold text-[16px] rounded-[10px] hover:bg-opacity-90 transition-opacity uppercase tracking-wide"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleConsultation;
