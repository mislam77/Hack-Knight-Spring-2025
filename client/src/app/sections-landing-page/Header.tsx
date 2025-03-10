"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import InvisLogo from "@/app/assets/invis-Image.png";
import InvisLogoTransparent from "@/app/assets/invisio-logo-transparent.png";
import InvistLogoText from "@/app/assets/invisio-text-transparent.png";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Header() {
  const [hidden, setHidden] = useState(false);

  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    // Check if the user has visited before by looking for a flag in localStorage
    const visited = localStorage.getItem("hasVisited");

    if (!visited) {
      // This is the user's first visit, show the section and set the flag
      setIsFirstVisit(true);
      localStorage.setItem("hasVisited", "true"); // Mark the user as visited
    }
  }, []);

  return (
    <header className="sticky top-0 bg-white z-20">
      {isFirstVisit && (
        <div
          className={twMerge(
            "bg-black text-white text-sm flex justify-center items-center gap-3 py-3",
            hidden && "hidden"
          )}
        >
          <p className="text-white/70">Transactions have never been easier!</p>
          <div>
            <Link
              href="/signup"
              className="hover:underline flex gap-1 justify-center items-center"
            >
              <span className="text-sm">Get started</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
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
      )}
      <div className="pt-6 pb-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between">
            <div className="max-w-[300px] relative hover:cursor-pointer">
              <Link href="#" className="w-full">
                <Image
                  src={InvisLogoTransparent}
                  alt="Invis.io logo"
                  width={70}
                  className="h-auto logo-color"
                />
                <Image
                  src={InvistLogoText}
                  alt="Invis.io text"
                  className="w-full h-auto absolute -right-15 bottom-5 logo-color"
                />
              </Link>
            </div>
            <nav className="flex gap-8 font-medium items-center text-[17.5px]">
              <Link href="#" className="hover:text-[#41a5fa]">
                About us
              </Link>
              <Link href="#features" className="hover:text-[#41a5fa]">
                Features
              </Link>
              <Link href="#call-to-action" className="hover:text-[#41a5fa]">
                Updates
              </Link>
              <Link href="/login">
                <Button className="font-medium text-[17.5px] px-5 py-4 hover:cursor-pointer btn-color">
                  Sign in
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
