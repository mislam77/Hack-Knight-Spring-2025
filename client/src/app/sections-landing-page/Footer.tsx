import React from "react";
import InvisLogo from "@/app/assets/invisio-logo.png";
import Image from "next/image";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black py-8 text-center text-white/65">
      <div className="max-w-[428px] mx-auto">
        <div className="flex justify-center">
          <Image src={InvisLogo} alt="Invis logo" height={80} className="" />
        </div>
        <nav className="flex flex-row gap-6 mt-6 justify-center">
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
        <p className="mt-8 text-sm">
          &copy; 2025 Dummy Dum Dums, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
