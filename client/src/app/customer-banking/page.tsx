"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../assets/invisio-logo.png";
import { List, HelpCircle, User, ChevronDown, Copyright } from "lucide-react";
import InvisLogoTransparent from "@/app/assets/invisio-logo-transparent.png";
import InvistLogoText from "@/app/assets/invisio-text-transparent.png";
import Link from "next/link";
import Cards from "./cards";
import Bottom from "./footer";

function Banking() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <header className="max-w-[1200px] mx-auto">
        <div className="pt-4 pb-3">
          <nav className="px-4 md:px-6 h-full">
            <div className="flex items-center justify-between h-full">
              {/* Logo */}
              <div className="max-w-[300px] relative hover:cursor-pointer">
                <a href="#" className="w-full">
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
                </a>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <List size={24} />
                </button>
              </div>

              {/* Desktop navigation */}
              <ul className="hidden md:flex gap-8 font-medium items-center">
                <li className="flex items-center text-gray-700 hover:text-[#41a5fa]">
                  <HelpCircle size={18} className="mr-1" />
                  <Link href="3">Need Help?</Link>
                </li>
                <li className="flex items-center text-gray-700 hover:text-[#41a5fa]">
                  <User size={18} className="mr-1" />
                  <Link href="/data-dashboard-page">Profile</Link>
                </li>
                <li className="relative group">
                  <button className="flex items-center text-gray-700 hover:text-[#41a5fa] hover:cursor-pointer">
                    Menu
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                  <div className="absolute right-0 w-48 mt-2 bg-white opacity-0 invisible rounded-lg shadow-xl group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <Link
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:rounded-t-lg"
                    >
                      Accounts
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Transactions
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:rounded-b-lg"
                    >
                      Logout
                    </Link>
                  </div>
                </li>
              </ul>
            </div>

            {/* Mobile navigation */}
            {isMenuOpen && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 border-t">
                  <Link
                    href="/help"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Need Help?
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Profile
                  </Link>
                  <button
                    className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => {}}
                  >
                    Menu
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                  <div className="pl-4 border-l-2 border-gray-200">
                    <Link
                      href="/accounts"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Accounts
                    </Link>
                    <Link
                      href="/transactions"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Transactions
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Settings
                    </Link>
                    <Link
                      href="/logout"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>
      <hr className="border-gray-200" />

      <Cards />
      <Bottom />
    </div>
  );
}

export default Banking;
