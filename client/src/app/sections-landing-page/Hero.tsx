import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import InvisioLogo from "@/app/assets/invisio-logo.png";

export default function Hero() {
  return (
    <section className="pt-5 pb-10 ">
      <div className="container mx-auto px-20">
        <div className="flex items-center justify-center">
          <div className="w-[478px]">
            <h1 className="text-7xl font-bold tracking-tighter bg-gradient-to-b from-[#1e8fde] to-[#103f62] text-transparent bg-clip-text mt-6">
              Pay anywhere effortlessly
            </h1>
            <p className="text-[20px] leading-[30px] tracking-tight text-[#010D3E] mt-5">
              Unlock seamless, contactless payments with our facial recognition
              technology.
            </p>
            <div className="flex gap-3 items-center mt-8">
              <Button className="px-5 py-4 text-lg rounded-lg font-medium inline-flex items-center justify-center tracking-tight hover:cursor-pointer">
                Join now
              </Button>
              <Button className="px-5 py-4 text-lg rounded-lg font-medium inline-flex items-center justify-center tracking-tight bg-transparent text-black hover:bg-transparent hover:cursor-pointer">
                Learn more
              </Button>
            </div>
          </div>
          <div className="h-[500px] flex-1 relative bg-red">
            <Image
              src={InvisioLogo}
              alt="hero image"
              className="h-full w-auto max-w-none absolute right-0 top-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
