"use client";
import React from "react";
import Image from "next/image";

// Product data - all showing Chyavanprash for now
const products = [
  { id: 1, name: "CHYAVANPRASH", image: "/CHYAVANPRASH.png" },
  { id: 2, name: "CHYAVANPRASH", image: "/CHYAVANPRASH.png" },
  { id: 3, name: "CHYAVANPRASH", image: "/CHYAVANPRASH.png" },
  { id: 4, name: "CHYAVANPRASH", image: "/CHYAVANPRASH.png" },
  { id: 5, name: "CHYAVANPRASH", image: "/CHYAVANPRASH.png" },
  { id: 6, name: "CHYAVANPRASH", image: "/CHYAVANPRASH.png" },
  { id: 7, name: "CHYAVANPRASH", image: "/CHYAVANPRASH.png" },
  { id: 8, name: "CHYAVANPRASH", image: "/CHYAVANPRASH.png" },
];

const JogiBrandEstore = () => {
  return (
    <section
      id="jogi-brand-estore"
      className="w-full bg-white py-16 overflow-hidden"
    >
      <div className="w-full max-w-[1320px] mx-auto px-4">
        {/* Title */}
        <h2 className="text-[32px] font-bold text-black text-center mb-10">
          JOGI Brand E-store
        </h2>

        {/* Products Grid - 4x2 */}
        <div className="grid grid-cols-4 gap-5 mb-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-[20px] border-2 border-[#3A6F78] p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-shadow aspect-[311/377]"
            >
              {/* Product Image */}
              <div className="relative w-[180px] h-[280px] flex-shrink-0 mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>  

              {/* Product Name */}
              <h3 className="text-[20px] font-semibold text-black text-center">
                {product.name}
              </h3>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <button className="bg-[#3A6F78] text-white px-10 py-3 rounded-full text-[14px] font-medium uppercase tracking-wider hover:bg-[#2d5a61] transition-colors">
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default JogiBrandEstore;
