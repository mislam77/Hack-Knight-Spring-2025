import Image from "next/image";
import Header from "@/app/sections-landing-page/Header";
import Hero from "./sections-landing-page/Hero";
import Features from "./sections-landing-page/Features";
import CallToAction from "./sections-landing-page/CallToAction";
import Footer from "./sections-landing-page/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <CallToAction />
      <Footer />
    </>
  );
}
