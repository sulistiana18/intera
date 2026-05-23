import React from "react";
import Header from "@/components/Layout/Header"
import Hero from "@/components/Home/Hero";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "INTERA",
};

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
    </main>
  );
}