import type { Route } from "./+types/home";
import { Navbar } from "~/components/Navbar";
import { Hero } from "~/components/Hero";
import { Features } from "~/components/Features";
import { About } from "~/components/About";
import { Pricing } from "~/components/Pricing";
import { Contact } from "~/components/Contact";
import { CTA } from "~/components/CTA";
import { Footer } from "~/components/Footer";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CRM Pro - Smart Customer Relationship Management" },
    { name: "description", content: "Streamline your business with our powerful CRM solution. Manage customers, track leads, and grow your business." },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Pricing />
      <Contact />
      <CTA />
      <Footer />
    </div>
  );
}
