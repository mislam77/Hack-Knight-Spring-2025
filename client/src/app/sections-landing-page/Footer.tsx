import React from "react";
import InvisLogoTransparent from "@/app/assets/invisio-logo-transparent.png";
import Image from "next/image";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-700 py-8 text-center text-white/65">
      <div className="max-w-[428px] mx-auto">
        <div className="flex justify-center">
          <Image
            src={InvisLogoTransparent}
            alt="Invis logo"
            height={60}
            className="w-auto"
          />
        </div>
        <nav className="flex flex-row gap-6 mt-6 justify-center text-[14px]">
          <a href="#" className="hover:text-white">
            About
          </a>
          <a href="#" className="hover:text-white">
            Features
          </a>
          <a href="#" className="hover:text-white">
            Help
          </a>
          <a href="#" className="hover:text-white">
            Careers
          </a>
        </nav>
        <div className="flex justify-center gap-6 mt-6">
          <Youtube />
          <Instagram />
          <Twitter />
          <Linkedin />
        </div>
        <p className="mt-8 text-sm text-[12px]">
          &copy; 2025 Dummy Dum Dums, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
