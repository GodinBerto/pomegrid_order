"use client";

import { MessageCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="container bg-[url('/images/background.jpg')] bg-cover bg-center bg-no-repeat text-white rounded-4xl py-16 px-6 md:px-16 flex flex-col md:flex-row h-full shadow-2xl items-center justify-center md:justify-between gap-10 overflow-hidden">
      <div className="flex-1 md:flex justify-center md:justify-end relative hidden "></div>
      <div className="flex-1 space-y-6 max-w-2xl h-full flex flex-col justify-center">
        <div className="flex items-center gap-2 bg-green-800/50 px-3 py-1 rounded-full w-fit text-sm">
          <span>FRESH CATFISH AND TILAPIA</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Make healthy life with <span className="text-lime-300">fresh</span>{" "}
          fish
        </h1>

        <p className="text-white/80 text-base md:text-lg">
          Enjoy premium-quality <span className="text-lime-300">Tilapia</span>{" "}
          and <span className="text-lime-300">Catfish</span> — freshly harvested
          and delivered straight to your doorstep. Eat healthy, live better with
          <span className="font-semibold"> Pomegrid</span>.
        </p>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium shadow-md transition flex items-center gap-2 w-fit">
          <span>
            <MessageCircle />
          </span>
          Join WhatsApp Group
        </button>

        {/* <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-lg shadow">
            <Truck size={18} />
            <span className="text-sm font-semibold">Fast Delivery</span>
          </div>
          <div className="flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-lg shadow">
            <CheckCircle size={18} />
            <span className="text-sm font-semibold">100% Fresh</span>
          </div>
        </div> */}
      </div>
    </section>
  );
}
