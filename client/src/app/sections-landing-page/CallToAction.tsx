import { Button } from "@/components/ui/button";
import { ArrowRight, MoveRight } from "lucide-react";
import React from "react";

export default function CallToAction() {
  return (
    <section className="py-20 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,_#dcf5fc_50%,_#fff_100%)] overflow-x-clip">
      <div>
        <div className="max-w-[540px] mx-auto">
          <h2 className="text-center text-3xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter mt-5">
            Experience Seamless Payments
          </h2>
          <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5">
            Transactions made simple. With advanced facial recognition, all you
            need is your face to pay.
          </p>
          <div className="flex justify-center gap-6 mt-12">
            <Button className="px-5 py-2.5 text-[17px] hover:cursor-pointer">
              Get started
            </Button>
            <Button className="px-5 py-2.5 gap-1 text-[17px] text-black bg-transparent hover:bg-transparent hover:cursor-pointer shadow-none">
              <span>Learn more</span>
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
