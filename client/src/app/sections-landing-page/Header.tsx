"use client";

import { useState } from "react";
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
  // const router = useRouter();
  // const navigateToPage = () => {
  //   router.push("/login");
  // };

  return (
    <header className="sticky top-0 bg-white z-20">
      <div
        className={twMerge(
          "bg-black text-white text-sm flex justify-center items-center gap-3 py-3",
          hidden && "hidden"
        )}
      >
        <p className="text-white/70">Transactions have never been easier!</p>
        <div>
          {/* <a href="#" className="hover:underline">
            Get started
          </a> */}
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
      <div className="pt-6 pb-5">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between">
            <div className="max-w-[300px] relative hover:cursor-pointer">
              <a href="#" className="w-full">
                <Image
                  src={InvisLogoTransparent}
                  alt="Invis.io logo"
                  width={70}
                  className="h-auto"
                />
                <Image
                  src={InvistLogoText}
                  alt="Invis.io text"
                  className="w-full h-auto absolute -right-15 bottom-5"
                />
              </a>
            </div>
            <nav className="flex gap-8 font-medium items-center text-lg">
              <a href="#" className="hover:text-[#41a5fa]">
                About
              </a>
              <a href="#" className="hover:text-[#41a5fa]">
                Features
              </a>
              <a href="#" className="hover:text-[#41a5fa]">
                Updates
              </a>
              <Link href="/login">
                <Button className="text-lg font-medium px-5 py-5 hover:cursor-pointer btn-color">
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
