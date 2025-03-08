"use client";

import { useState } from "react";
import Image from "next/image";
import InvisLogo from "@/app/assets/invis-logo.png";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function Header() {
  const [hidden, setHidden] = useState(false);

  return (
    <header>
      <div
        className={twMerge(
          "bg-black text-white text-sm flex justify-center items-center gap-3 py-3",
          hidden && "hidden"
        )}
      >
        <p className="text-white/70">Transactions have never been easier!</p>
        <div>
          <a href="#" className="hover:underline">
            Get started for free
          </a>
        </div>
        <div className="relative">
          <button
            onClick={() => {
              setHidden(true);
            }}
            className="h-full absolute -right-120 -top-2 hover:cursor-pointer"
          >
            <X size={20} color="white" />
          </button>
        </div>
      </div>
      <div className="py-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between">
            <Image
              src={InvisLogo}
              alt="Invis.io logo"
              height={28}
              width={80}
              className="w-auto"
            />
            <nav className="flex gap-8 font-medium items-center text-lg">
              <a href="#">About</a>
              <a href="#">Features</a>
              <a href="#">Updates</a>
              <Button className="text-lg font-medium px-5 py-5 hover:cursor-pointer bg-[#1895ff]">
                Sign in
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
