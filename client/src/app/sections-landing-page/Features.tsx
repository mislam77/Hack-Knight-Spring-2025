import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IdCard,
  LayoutDashboard,
  MapPinCheckInside,
  ShieldUser,
} from "lucide-react";

export default function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="max-w-[540px] mx-auto">
          <h2 className="text-center text-3xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-5">
            Our features
          </h2>
          <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5">
            Pay everywhere using our service for a hassle-free experience
          </p>
        </div>
        <div className="flex gap-6 justify-center mt-25">
          <Card className="w-[250px] pb-8 mt-20">
            <CardHeader className="">
              <div className="flex justify-center">
                <IdCard strokeWidth={1.5} className="" size={50} />
              </div>
              <CardTitle className="text-center text-lg mt-6">
                Facial Recognition
              </CardTitle>
              <CardDescription className="text-center">
                Eliminate the need for physical cards or PINs using facial
                recognition identification.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-[250px] h-[250px]">
            <CardHeader className="">
              <div className="flex justify-center">
                <LayoutDashboard strokeWidth={1.5} size={50} />
              </div>
              <CardTitle className="text-center text-lg mt-6">
                Dashboard
              </CardTitle>
              <CardDescription className="text-center">
                A comprehensive dashboard provides users with detailed
                information about their transactions.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-[250px] h-[250px]">
            <CardHeader className="">
              <div className="flex justify-center">
                <ShieldUser strokeWidth={1.5} size={50} />
              </div>
              <CardTitle className="text-center text-lg mt-6">
                Account Protection
              </CardTitle>
              <CardDescription className="text-center">
                Users are immediately notified via email if a facial recognition
                attempt is unsuccessful.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-[250px] pb-8 mt-20">
            <CardHeader className="">
              <div className="flex justify-center">
                <MapPinCheckInside strokeWidth={1.5} size={50} />
              </div>
              <CardTitle className="text-center text-lg mt-6">
                Transaction Map
              </CardTitle>
              <CardDescription className="text-center">
                Provides an interactive map displaying all locations of previous
                transactions.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
