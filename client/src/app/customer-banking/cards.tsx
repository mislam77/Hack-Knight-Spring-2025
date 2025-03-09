"use client";

import {
  GoogleMap,
  LoadScript,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import Image from "next/image";
import React from "react";
import holdingCard from "@/app/assets/card-holding-transparent.png";

function Cards() {
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const defaultCenter = { lat: 40.73692481817399, lng: -73.82031950399166 };

  return (
    <section className="py-5">
      <div className="max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Auto Loan Card */}
          <div className="rounded-lg overflow-hidden shadow-md bg-gradient-to-r from-[#103f62] to-[#68b7fb] text-white">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Auto Loan</h2>
                  <p className="text-sm opacity-80">...2973</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-2xl">$</span>
                  <span className="text-5xl font-medium">2,766.</span>
                  <span className="text-xl ml-1">43</span>
                </div>
                <p className="text-sm mt-2">Amount to pay today</p>
              </div>

              <div className="mt-6">
                <button className="banking-page-btn">See account</button>
              </div>
            </div>
          </div>

          {/* 360 Checking Card */}
          <div className="rounded-lg overflow-hidden shadow-md bg-gradient-to-t from-[#103f62] to-[#68b7fb] text-white">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold">360 Checking</h2>
                  <p className="text-sm opacity-80">...9452</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-2xl">$</span>
                  <span className="text-5xl font-medium">90.</span>
                  <span className="text-xl ml-1">03</span>
                </div>
                <p className="text-sm mt-2">Available balance</p>
              </div>

              <div className="mt-6">
                <button className="banking-page-btn">See account</button>
              </div>
            </div>
          </div>

          {/* Money Account Card */}
          <div className="rounded-lg overflow-hidden shadow-md bg-gradient-to-r from-[#103f62] to-[#68b7fb] text-white">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Savings</h2>
                  <p className="text-sm opacity-80">...7856</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-2xl">$</span>
                  <span className="text-5xl font-medium">700.</span>
                  <span className="text-xl ml-1">00</span>
                </div>
                <p className="text-sm mt-2">Available balance</p>
              </div>

              <div className="mt-6">
                <button className="banking-page-btn">See account</button>
              </div>
            </div>
          </div>

          {/* Explore Other Products Card */}
          <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200 bg-gray-50">
            <div className="p-6">
              <div className="mx-auto -mt-3">
                <Image
                  src={holdingCard}
                  alt="Holding card"
                  className="mx-auto w-[150px] h-auto"
                />
              </div>

              <div className="mt-3 flex gap-3 justify-center">
                <button className="text-white py-2 px-4 rounded-lg btn-color hover:cursor-pointer transition duration-300">
                  Add card
                </button>
                <button className="text-white py-2 px-4 rounded-lg btn-color hover:cursor-pointer transition duration-300">
                  Remove card
                </button>
              </div>
            </div>
          </div>

          {/* CreditWise Card - Added to main grid */}
          <div className="rounded-lg bg-white shadow-md p-4">
            <h2 className="text-xl font-bold mb-3">CreditWise</h2>

            <div className="flex items-start">
              <div className="w-20 h-20 mr-4 flex-shrink-0">
                {/* Credit score circle with gradient border */}
                <div
                  className="w-full h-full rounded-full relative flex items-center justify-center"
                  style={{
                    background:
                      "conic-gradient(from 90deg, #4ade80 0%, #a3e635 40%, #facc15 80%, #f87171 100%)",
                  }}
                >
                  <div className="absolute inset-1.5 bg-white rounded-full flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-700">
                      749
                    </span>
                    <span className="text-xs text-gray-500 font-semibold">
                      Good
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 justify-center flex flex-col gap-1">
                <p className=" font-medium mb-2">
                  Knowledge is power, don't let your credit report surprise you.
                </p>

                <div className="text-[13px]">
                  <div className="flex items-center">
                    <span className="mr-1 text-gray-500">
                      Updated: March 9, 2025
                    </span>
                    <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-500">−</span>
                    </div>
                  </div>
                </div>

                <a
                  href="#"
                  className="text-xs text-blue-500 hover:text-blue-700 mt-1"
                >
                  See more
                </a>
              </div>
            </div>
          </div>

          {/* Branch / ATM Finder Card - Added to main grid */}
          <div className="rounded-lg bg-white shadow-md overflow-hidden">
            <div className="p-3 border-b border-gray-200">
              <h2 className="text-xl font-bold">Branch / ATM Finder</h2>
            </div>

            <div className="w-full h-40">
              {/* Map area */}
              <div className="w-full h-full relative">
                <div className="w-full h-full">
                  <LoadScript
                    googleMapsApiKey={
                      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
                    }
                  >
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={defaultCenter}
                      zoom={14}
                    >
                      <Marker position={defaultCenter} />
                    </GoogleMap>
                  </LoadScript>
                </div>
                {/* <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-[#103f62] rounded-full p-1.5 text-white ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                </div> */}
                {/* <div className="absolute bottom-4 left-4 font-medium text-gray-700">
                  Invis.io
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cards;
