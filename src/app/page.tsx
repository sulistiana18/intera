import React from "react";
import Header from "@/components/Layout/Header";
import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import Selection from "@/components/Home/Selection";
import FAQ from "@/components/Home/Faq";
import Footer from "@/components/Layout/Footer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "INTERA",
};

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Selection />
      <FAQ />
      <Footer />
    </main>
  );
}