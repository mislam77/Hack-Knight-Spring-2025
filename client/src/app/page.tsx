import Image from "next/image";
import Header from "@/app/sections-landing-page/Header";
import Hero from "./sections-landing-page/Hero";
import ProductShowcase from "./sections-landing-page/ProductShowcase";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ProductShowcase />
    </>
  );
}
