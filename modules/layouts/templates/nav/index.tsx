"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap"; // GSAP Import
import { useGSAP } from "@gsap/react";

const TopBar = () => {
  return (
    <div className="bg-primary h-[40px] overflow-hidden flex items-center relative text-text-white text-sm font-medium z-50">
      <div className="whitespace-nowrap absolute w-full text-center animate-marquee">
        Hello World! This is a header line that is scrolling continuously
      </div>
    </div>
  );
};

const NavLink = ({ href, children, hasDropdown, isActive, onClick }: any) => {
  return (
    <div
      className="relative flex items-center h-full px-3 cursor-pointer select-none"
      onClick={onClick}
    >
      <div className="flex items-center gap-1 text-sm font-medium tracking-wide uppercase text-neutral-text hover:text-primary transition-colors">
        {children}
        {hasDropdown && (
          <Image src="/icons/down.svg" alt="down" width={10} height={6} />
        )}
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Body Scroll Lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // GSAP Animation for Menu
  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .to(overlayRef.current, {
          opacity: 1,
          visibility: "visible",
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          menuRef.current,
          {
            x: "0%",
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.3",
        );
    },
    { scope: menuRef },
  ); // Scope isn't strictly necessary here but good practice if wrapping

  // Handle Menu Toggle
  useEffect(() => {
    if (tl.current) {
      if (isMobileMenuOpen) {
        tl.current.play();
      } else {
        tl.current.reverse();
      }
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="flex flex-col w-full font-sans fixed top-0 left-0 right-0 z-50">
      <TopBar />

      <div className="h-[80px] min-[769px]:h-[100px] bg-neutral-bg flex items-center justify-between px-4 min-[769px]:px-12 relative z-50 shadow-sm min-[769px]:shadow-none">
        {/* Logo - First Item (Left Aligned) */}
        <Link
          href="/"
          className="flex-shrink-0 relative w-[100px] min-[769px]:w-[150px] h-[40px] min-[769px]:h-[50px] mr-auto"
        >
          <Image
            src="/logo.png"
            alt="JOGI Ayurved"
            fill
            className="object-contain"
          />
        </Link>

        <div className="flex items-center gap-3 min-[769px]:hidden">
          <button className="w-[36px] h-[36px] bg-primary rounded-full flex items-center justify-center">
            <Image
              src="/icons/search.svg"
              alt="Search"
              width={16}
              height={16}
            />
          </button>

          {/* Mobile Menu Button inside the group */}
          <button
            className="p-1 pl-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Image src="/icons/menu.svg" alt="Menu" width={24} height={24} />
          </button>
        </div>

        {/* Desktop Navigation - Hidden on Mobile */}
        <div className="hidden min-[769px]:flex items-center h-full gap-8">
          {/* Navigation Links */}
          <div className="flex items-center h-full gap-0">
            <Link href="/doctors">
              <NavLink>OUR DOCTORS</NavLink>
            </Link>

            <div className="h-full flex items-center relative">
              <NavLink
                hasDropdown
                isActive={isServicesOpen}
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                SERVICES
              </NavLink>

              {/* Dropdown */}
              {isServicesOpen && (
                <div
                  className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[309px] bg-white shadow-lg rounded-[10px] py-4 flex flex-col gap-2 border border-gray-100"
                  style={{ height: "183px" }}
                >
                  {[
                    "IN-PERSON CONSULTATION",
                    "ONLINE CONSULTATION",
                    "PANCHAKARMA",
                    "GARBHA SANSKAR",
                  ].map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="px-6 py-2 text-xs font-semibold text-neutral-text uppercase tracking-wide transition-colors hover:text-[var(--primary-color)]"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/testimonial">
              <NavLink>TESTIMONIAL</NavLink>
            </Link>
            <Link href="/blog">
              <NavLink>BLOG</NavLink>
            </Link>
            <Link href="/about">
              <NavLink>ABOUT US</NavLink>
            </Link>
            <Link href="/shop">
              <NavLink>SHOP</NavLink>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="w-[44px] h-[44px] bg-primary rounded-full flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer">
              <Image
                src="/icons/search.svg"
                alt="Search"
                width={18}
                height={18}
              />
            </button>

            <button
              className="flex items-center justify-center gap-2 bg-primary text-text-white rounded-[50px] px-6 hover:opacity-90 transition-opacity cursor-pointer"
              style={{ width: "195px", height: "44px" }}
            >
              <Image
                src="/icons/phone.svg"
                alt="Phone"
                width={18}
                height={18}
              />
              <span className="text-sm font-medium">+91 88001 18053</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/60 z-[60] invisible opacity-0 min-[769px]:hidden"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white z-[70] transform -translate-x-full min-[769px]:hidden flex flex-col shadow-2xl h-full"
      >
        {/* Drawer Header */}
        <div className="h-[60px] flex items-center justify-between px-6 border-b border-gray-100">
          <Image
            src="/logo.png"
            alt="JOGI"
            width={100}
            height={35}
            className="object-contain"
          />
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
            <Image src="/icons/cross.svg" alt="Close" width={14} height={14} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          <Link
            href="/doctors"
            className="px-4 py-3 text-sm font-bold text-neutral-text hover:bg-gray-50 rounded-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            OUR DOCTORS
          </Link>

          {/* Mobile Services Accordion */}
          <div>
            <button
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-neutral-text hover:bg-gray-50 rounded-lg"
            >
              SERVICES
              <Image
                src="/icons/down.svg"
                alt="down"
                width={10}
                height={6}
                className={`transition-transform duration-300 ${isMobileServicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${isMobileServicesOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}
            >
              <div className="flex flex-col bg-gray-50 rounded-lg mt-1 mx-2 py-2">
                {[
                  "IN-PERSON CONSULTATION",
                  "ONLINE CONSULTATION",
                  "PANCHAKARMA",
                  "GARBHA SANSKAR",
                ].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="px-6 py-2.5 text-xs font-semibold text-gray-600 hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/testimonial"
            className="px-4 py-3 text-sm font-bold text-neutral-text hover:bg-gray-50 rounded-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            TESTIMONIAL
          </Link>
          <Link
            href="/blog"
            className="px-4 py-3 text-sm font-bold text-neutral-text hover:bg-gray-50 rounded-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            BLOG
          </Link>
          <Link
            href="/about"
            className="px-4 py-3 text-sm font-bold text-neutral-text hover:bg-gray-50 rounded-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ABOUT US
          </Link>
          <Link
            href="/shop"
            className="px-4 py-3 text-sm font-bold text-neutral-text hover:bg-gray-50 rounded-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            SHOP
          </Link>
          <a
            href="tel:+918800118053"
            className="px-4 py-3 text-sm font-bold text-neutral-text hover:bg-gray-50 rounded-lg flex items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            CALL US
          </a>
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex flex-col gap-4">
            <button className="flex items-center gap-3 w-full bg-primary text-white p-3 rounded-lg justify-center">
              <Image
                src="/icons/phone.svg"
                alt="Phone"
                width={18}
                height={18}
              />
              <span className="text-sm font-bold">+91 88001 18053</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
