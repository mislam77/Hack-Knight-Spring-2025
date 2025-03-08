import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import InvisioLogo from "@/app/assets/invisio-logo.png";
import HeroImg from "@/app/assets/Drawing on canvas.png";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-10 pb-25 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,_#dcf5fc_50%,_#fff_100%)] overflow-x-clip">
      <div className="container mx-auto px-20">
        <div className="flex items-center justify-center">
          <div className="w-[478px] z-10">
            <h1 className="text-6xl font-bold tracking-tighter text-black/80 bg-clip-text mt-4">
              Pay anywhere effortlessly
            </h1>
            <p className="text-[19px] leading-[30px] tracking-tight text-[#010D3E] mt-5">
              Unlock seamless, contactless payments with our facial recognition
              technology.
            </p>
            <div className="flex gap-3 items-center mt-8">
              <Link href="/signup">
                <Button className="px-8 py-6 text-lg rounded-lg font-medium inline-flex items-center justify-center tracking-tight hover:cursor-pointer btn-color ">
                  Get started
                </Button>
              </Link>
              <Button className="px-8 py-6 gap-1 text-lg rounded-lg font-medium inline-flex items-center justify-center tracking-tight bg-transparent text-black hover:bg-transparent hover:cursor-pointer hover:text-[#41a5fa] shadow-none">
                <span className="">Learn more</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="h-[420px] flex-1 relative bg-red">
            <Image
              src={HeroImg}
              alt="hero image"
              className="h-full w-auto max-w-none absolute right-0 top-0 z-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
