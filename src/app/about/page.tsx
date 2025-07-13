"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaLeaf, FaSpa, FaStar } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-fuchsia-50 via-white to-rose-50 pb-24">
      {/* hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-r from-rose-500 via-fuchsia-600 to-purple-600 text-white py-24 shadow-xl">
        <div className="absolute inset-0 bg-[url('/images/beauty-texture.png')] opacity-20 mix-blend-overlay" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl/tight lg:text-5xl font-extrabold tracking-tight drop-shadow-xl">
            Welcome to&nbsp;
            <span className="bg-white/20 px-3 py-1 rounded-xl backdrop-blur-sm">
              GlameHub
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg/relaxed text-white/90">
            Your one‑stop destination for luxury cosmetics, holistic spa
            treatments and personalised beauty consultations.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="mt-8 backdrop-blur-sm text-white hover:bg-white/10"
          >
            Explore Our Products
          </Button>
        </div>
      </section>

      {/* story */}
      <section className="container mx-auto px-4 md:px-6 mt-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
          <p className="text-gray-600 text-base/relaxed">
            GlameHub began as a boutique beauty studio in 2015 with a mission to
            combine eco‑friendly skincare with high‑performance makeup. Today we
            curate 100+ global brands and run an award‑winning spa where science
            meets self‑care.
          </p>
          <p className="text-gray-600 text-base/relaxed">
            Every formula we stock is cruelty‑free, dermatologically tested and
            enriched with botanicals sourced through fair‑trade networks. Our
            expert aestheticians craft bespoke treatment plans so you can glow
            with confidence—inside and out.
          </p>
        </div>
        <div className="relative aspect-video rounded-3xl shadow-xl overflow-hidden">
          <Image
            src="/images/spa-room.jpg"
            alt="GlameHub Spa Room"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* values */}
      <section className="container mx-auto px-4 md:px-6 mt-24">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          What Makes Us Different
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
            <FaLeaf className="h-10 w-10 text-emerald-600" />
            <h3 className="mt-4 font-semibold text-gray-800">
              Clean Ingredients
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Non‑toxic, vegan and sustainably‑sourced formulations that are
              kind to skin and planet.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
            <FaSpa className="h-10 w-10 text-rose-600" />
            <h3 className="mt-4 font-semibold text-gray-800">Holistic Spa</h3>
            <p className="mt-2 text-sm text-gray-500">
              From aromatherapy facials to LED phototherapy—experience
              next‑level pampering.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
            <FaStar className="h-10 w-10 text-yellow-500" />
            <h3 className="mt-4 font-semibold text-gray-800">
              Expert Guidance
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Certified beauty consultants ready to personalise your regimen and
              track your progress.
            </p>
          </div>
        </div>
      </section>

      {/* call to action */}
      <section className="mt-24 bg-[radial-gradient(circle_at_top,theme(colors.rose.100),transparent)] py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Ready to Elevate Your Glow?
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Join 20,000+ beauty lovers who trust GlameHub for their daily dose
            of self‑care. Sign up now and get 10% off your first order!
          </p>
          <Button size="lg" className="mt-6">
            Create Account
          </Button>
        </div>
      </section>
    </div>
  );
}
