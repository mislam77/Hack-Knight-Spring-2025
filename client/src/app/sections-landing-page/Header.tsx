import React from "react";
import Image from "next/image";
import InvisLogo from "@/app/assets/invis-logo.png";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header>
      <div className="bg-black text-white text-sm flex justify-center items-center gap-3 py-3">
        <p className="text-white/70">Transactions have never been easier!</p>
        <div>
          <a href="#" className="hover:underline">
            Get started for free
          </a>
        </div>
      </div>
      <div className="py-5">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between">
            <Image
              src={InvisLogo}
              alt="Invis.io logo"
              height={20}
              className="w-auto"
            />
            <nav className="flex gap-4">
              <a href="#">About</a>
              <a href="#">Features</a>
              <a href="#">Updates</a>
              <Button>Sign in</Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
