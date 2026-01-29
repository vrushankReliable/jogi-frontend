"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-[#3A6F78] pt-12 lg:pt-16 pb-8 text-white">
      <div className="w-full max-w-[1325px] mx-auto px-6 lg:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-center lg:text-left">
          {/* Column 1: Logo, Social, Newsletter */}
          <div className="flex flex-col gap-6 lg:gap-8 items-center lg:items-start">
            {/* Logo */}
            <div className="relative w-[180px] h-[60px]">
              <Image
                src="/logo.png"
                alt="JOGI Ayurved"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              {["instagram", "facebook", "youtube", "linkedin"].map(
                (social) => (
                  <div
                    key={social}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src={`/icons/footer-icons/${social}.svg`}
                      alt={social}
                      width={50}
                      height={50}
                      className="w-[50px] h-[50px]"
                    />
                  </div>
                ),
              )}
            </div>

            {/* Newsletter */}
            <div className="flex flex-col gap-3">
              <h3 className="text-[18px] font-semibold text-white">
                Subscribe a Newsletter
              </h3>
              <div className="bg-white rounded-[10px] h-[50px] w-full max-w-[330px] flex items-center px-4 overflow-hidden">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full h-full outline-none text-[#333] placeholder-[#999] bg-transparent text-[16px]"
                />
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-[20px] font-bold mb-6">Quick Links</h3>
            <ul className="flex flex-col w-full max-w-[200px] lg:max-w-none">
              {[
                { label: "Home", href: "/" },
                { label: "Our Doctors", href: "/doctors" },
                { label: "Services", href: "/services" },
                { label: "Testimonial", href: "/testimonial" },
                { label: "About Us", href: "/about" },
                { label: "Shop", href: "/shop" },
              ].map((link, i) => (
                <li
                  key={link.label}
                  className={`py-2 border-b border-[#ffffff33] ${i === 0 ? "pt-0" : ""}`}
                >
                  <Link
                    href={link.href}
                    className="text-[#D1E6EA] hover:text-white transition-colors text-[16px] font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-[20px] font-bold mb-6">Services</h3>
            <ul className="flex flex-col w-full max-w-[200px] lg:max-w-none">
              {[
                { label: "Online Consultation", href: "/online-consultation" },
                { label: "Panchkarma Treatment", href: "/panchakarma" },
                { label: "Garbh Sanskar", href: "/garbh-sanskar" },
              ].map((link, i) => (
                <li
                  key={link.label}
                  className={`py-2 border-b border-[#ffffff33] ${i === 0 ? "pt-0" : ""}`}
                >
                  <Link
                    href={link.href}
                    className="text-[#D1E6EA] hover:text-white transition-colors text-[16px] font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-[20px] font-bold mb-6">Contact</h3>
            <div className="flex flex-col gap-4 w-full max-w-[300px] lg:max-w-none">
              {/* Email */}
              <div className="flex items-center gap-2 py-2 border-b border-[#ffffff33] pt-0">
                <Image
                  src="/icons/footer-icons/mail.svg"
                  alt="mail"
                  width={25}
                  height={25}
                  className="w-[25px] h-[25px]"
                />
                <a
                  href="mailto:consulting@jogiayurved.com"
                  className="text-[#88C3CD] hover:text-white transition-colors text-[16px] font-medium"
                >
                  consulting@jogiayurved.com
                </a>
              </div>

              {/* Phone 1 */}
              <div className="flex items-center gap-2 py-2 border-b border-[#ffffff33]">
                <Image
                  src="/icons/footer-icons/call.svg"
                  alt="phone"
                  width={25}
                  height={25}
                  className="w-[25px] h-[25px]"
                />
                <span className="text-[#88C3CD] text-[16px] font-medium">
                  +91 90161 66757 [ONLINE-CONSULTATION]
                </span>
              </div>

              {/* Phone 2 */}
              <div className="flex items-center gap-2 py-2 border-b border-[#ffffff33]">
                <Image
                  src="/icons/footer-icons/call.svg"
                  alt="phone"
                  width={25}
                  height={25}
                  className="w-[25px] h-[25px]"
                />
                <span className="text-[#88C3CD] text-[16px] font-medium">
                  +91 81409 46153 [HOSPITAL]
                </span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2 py-2">
                <div className="mt-1 flex-shrink-0">
                  <Image
                    src="/icons/footer-icons/location.svg"
                    alt="location"
                    width={25}
                    height={25}
                    className="w-[25px] h-[25px]"
                  />
                </div>
                <p className="text-[#88C3CD] text-[16px] font-medium leading-relaxed max-w-[305px]">
                  3rd Floor / 4th Floor, Shreeji Arcade, A-301 / 401, Anand
                  Mahal Rd, behind Bhulka Bhawan School, Adajan Gam, Adajan,
                  Surat, Gujarat 395009
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
