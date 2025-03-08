import { Button } from "@/components/ui/button";
import { ArrowRight, MoveRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import CallToActionImage from "@/app/assets/Discussion with graphs.png";
import { Input } from "@/components/ui/input";

export default function CallToAction() {
  return (
    <section className="pt-25 pb-20 bg-gradient-to-t from-[#dcf5fc] to-[#fff]">
      <div>
        {/* <div className="max-w-[540px] mx-auto">
          <h2 className="text-center text-[54px] leading-[60px] font-bold tracking-tighter text-[#1F2937] mt-5">
            Experience Seamless Payments
          </h2>
          <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5">
            Transactions made simple. With advanced facial recognition, all you
            need is your face to pay.
          </p>
          <div className="flex justify-center gap-6 mt-12">
            <Button className="px-6 py-3 text-[17px] hover:cursor-pointer bg-[#1895ff] hover:bg-[#41a5fa]">
              Get started
            </Button>
            <Button className="px-6 py-3 gap-1 text-[17px] text-black bg-transparent hover:bg-transparent hover:cursor-pointer hover:text-[#41a5fa] shadow-none">
              <span>Learn more</span>
              <ArrowRight />
            </Button>
          </div>
        </div> */}
        <div className="max-w-[900px] mx-auto bg-white px-10 py-8 rounded-lg flex items-center gap-8">
          <div>
            <Image
              src={CallToActionImage}
              alt="Call to action image"
              className="h-auto w-[450px] "
            />
          </div>
          <div className="">
            <div>
              <h2 className="text-xl font-medium">
                Subscribe to our Newsletter
              </h2>
              <p className="text-sm mt-2">
                Sign up to receive our latest news!
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                  <span>Name</span>
                  <Input type="text" placeholder="Enter your name" />
                </div>
                <div className="flex gap-2 items-center">
                  <span>Email</span>
                  <Input type="email" placeholder="Enter your email" />
                </div>
              </div>
              <Button className="text-center w-full bg-[#1895ff] hover:bg-[#41a5fa] hover:cursor-pointer mt-8">
                Subscribe
              </Button>
            </div>
            <div className="text-[10px] mt-15">
              <span>Our latest updates always to your inbox. Read our </span>
              <a href="#" className="underline">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
