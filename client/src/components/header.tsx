"use client";

import { Filters } from "./filters";
import Image from "next/image";
import Link from "next/link";
import InvisLogo from "@/app/assets/invis-logo-transparent.png";
import { FIREBASE_AUTH } from "../../firebase/clientApp";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import InvisLogoTransparent from "@/app/assets/invisio-logo-transparent.png";
import InvisLogoText from "@/app/assets/invisio-text-transparent.png";

export const Header = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(FIREBASE_AUTH);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="bg-[#103f62] pt-4 pb-80">
      <div className="max-w-[1200px] mx-auto relative">
        <div className="flex justify-between">
          <div className="max-w-[300px] relative hover:cursor-pointer">
            <Link href="#" className="w-full">
              <Image
                src={InvisLogoTransparent}
                alt="Invis.io logo"
                width={70}
                className="h-auto logo-color"
              />
            </Link>
          </div>
          <nav className="flex gap-8 font-medium items-center text-white text-[17.5px]">
            <Link href="/" className="hover:text-[#41a5fa]">
              About us
            </Link>
            <Link href="/customer-banking" className="hover:text-[#41a5fa]">
              Manage
            </Link>
            <Link href="/simulation-page" className="hover:text-[#41a5fa]">
              Simulation
            </Link>
            <Link
              href="/"
              onClick={handleSignOut}
              className="hover:text-[#41a5fa]"
            >
              Sign out
            </Link>
          </nav>
          <div className="absolute -bottom-25">
            <Filters />
          </div>
        </div>
      </div>
      {/* <div className="max-w-screen-2xl mx-auto">
        <nav className="flex justify-between items-center">
          <Image
            src={InvisLogo}
            alt="Invis logo"
            height={56}
            width={160}
            className="w-auto"
          />
          <div className="flex gap-12 font-medium items-center text-xl text-white">
            <Link href="/">About Us</Link>
            <Link href="customerBanking">Manage</Link>
            <Link href="/simulation-page">Simulation</Link>
            <Link href="/" onClick={handleSignOut} className="text-white">
              Sign Out
            </Link>
          </div>
        </nav>
        <div className="mt-12">
          <Filters />
        </div>
      </div> */}
    </header>
  );
};
