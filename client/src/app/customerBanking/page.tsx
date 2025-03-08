"use client"

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../assets/invisio-logo.png";
import { List, HelpCircle, User, ChevronDown, Copyright } from "lucide-react";
import Link from "next/link";
import Cards from "./cards";
import Bottom from "./footer";

function Banking() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <div className="h-[80px] shadow-sm">
        <nav className="px-4 md:px-6 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div className="flex items-center">
              <Image 
                src={Logo} 
                alt="InvisIO logo" 
                width={60} 
                height={10} 
                className="object-contain"
              />
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
            <ul className="hidden md:flex items-center space-x-8">
              <li className="flex items-center text-gray-700 hover:text-blue-600">
                <HelpCircle size={18} className="mr-1" />
                <Link href="/help">Need Help?</Link>
              </li>
              <li className="flex items-center text-gray-700 hover:text-blue-600">
                <User size={18} className="mr-1" />
                <Link href="/profile">Profile</Link>
              </li>
              <li className="relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-600">
                  Menu
                  <ChevronDown size={16} className="ml-1" />
                </button>
                <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link href="/accounts" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Accounts</Link>
                  <Link href="/transactions" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Transactions</Link>
                  <Link href="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</Link>
                  <Link href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</Link>
                </div>
              </li>
            </ul>
          </div>

          {/* Mobile navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 border-t">
                <Link href="/help" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">
                  Need Help?
                </Link>
                <Link href="/profile" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">
                  Profile
                </Link>
                <button 
                  className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    // Handle dropdown toggle logic here
                  }}
                >
                  Menu
                  <ChevronDown size={16} className="ml-1" />
                </button>
                <div className="pl-4 border-l-2 border-gray-200">
                  <Link href="/accounts" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">
                    Accounts
                  </Link>
                  <Link href="/transactions" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">
                    Transactions
                  </Link>
                  <Link href="/settings" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">
                    Settings
                  </Link>
                  <Link href="/logout" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
      <hr className="border-gray-200" />
      
      {/* Rest of your banking page content goes here */}
      <div className="p-4">
        {/* Your content */}
      </div>
      <Cards />
      <Bottom />
    </div>
  );
}

export default Banking;