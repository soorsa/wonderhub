// components/Hero.tsx
"use client";
import { STATS } from "@/data/constants";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Hero2 = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animatedTextIndex, setAnimatedTextIndex] = useState(0);

  // Background images for slideshow
  const backgroundImages = [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&h=1080&fit=crop", // Coding workspace
    "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1920&h=1080&fit=crop", // Mobile design
    "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1920&h=1080&fit=crop", // UI/UX design
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop", // Team collaboration
  ];

  // Animated text options
  const animatedTexts = [
    "That Drives Sales",
    "That Drives Growth",
    "That Drives Leads",
    "That Drives Trust",
    "That Drives Results",
  ];
  // Change background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Change animated text every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedTextIndex(
        (prevIndex) => (prevIndex + 1) % animatedTexts.length
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [animatedTexts.length]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="px-2 w-full">
        <div className="relative h-35 sm:h-75 w-full mb-8 max-w-7xl rounded-2xl sm:rounded-4xl overflow-hidden">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                currentImageIndex === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${image})` }}
              />
              {/* Dark Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/60" />
            </div>
          ))}
        </div>
      </div>

      <div className="z-10 px-4 sm:px-6 lg:px-8 py- w-full max-w-7xl grid sm:flex gap-4 sm:gap-10">
        <div className="text-left sm:w-[60%] flex-1">
          <h1 className="text-4xl min-h-40 md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-black">We Build Platforms</span>
            <br />
            <div
              key={animatedTextIndex}
              className="bg-linear-to-r from-primary to-pink-700 bg-clip-text text-transparent animate-slide-up"
            >
              {animatedTexts[animatedTextIndex]}
            </div>
          </h1>
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
            <Link
              href="https://wa.me/+2349042334662"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-linear-to-r from-primary to-pink-600 rounded-2xl hover:shadow-lg transition-all duration-200 transform sm:hover:scale-105 hover:shadow-primary/30"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#portfolio"
              className="inline-flex items-center text-black justify-center px-6 py-3 text-base font-medium bg-gray-200 backdrop-blur-md border border-white/30 rounded-2xl hover:bg-white/30 hover:border-purple-400 transition-all duration-200"
            >
              View Our Work
            </Link>
          </div>
        </div>
        <div className="space-y-5 sm:w-[40%]">
          <p className="text-gray-700">
            We deliver{" "}
            <span className="font-semibold text-primary">
              comprehensive digital solutions
            </span>{" "}
            including web & mobile development, e-commerce, digital marketing,
            and technical consulting that captivate users and drive business
            growth.
          </p>
          {/* <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-10">
            We craft stunning web and mobile experiences that captivate users
            and drive business growth. Your vision, our expertise.
          </p> */}
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-5 pt-10 border-t border-gray-200">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-black">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-700 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              currentImageIndex === index
                ? "w-8 h-2 bg-primary"
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div> */}
    </section>
  );
};

export default Hero2;
