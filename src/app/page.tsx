"use client";

import { useAppSelector } from "@/features/hooks";
import Categories from "./_components/(home)/categories";
import CTA from "./_components/(home)/cta";
import FeaturedProducts from "./_components/(home)/featured-products";
import Features from "./_components/(home)/features";
import Hero from "./_components/(home)/hero";
import Testimonials from "./_components/(home)/testimonials";

export default function Home() {
  const user = useAppSelector((state) => state.auth.user);
  console.log(user);
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Categories Section */}
      <Categories />

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Call to Action Section */}
      <CTA />
    </div>
  );
}
