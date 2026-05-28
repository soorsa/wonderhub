// components/Hero.tsx
"use client";
import Navbar from "@/components/NavBar";
import { STATS } from "@/data/constants";
import { ArrowRight, Monitor, Smartphone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Hero = () => {
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
    "Web & Mobile Design",
    "UI/UX Excellence",
    "Digital Innovation",
    "User-Centric Solutions",
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Navbar />

      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
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

      {/* Animated Background Elements (optional - can remove if too busy) */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse animation-delay-200"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="flex justify-center space-x-4 mb-8 animate-fade-in-down">
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 shadow-sm border border-white/30">
            <Monitor size={18} className="text-purple-300" />
            <span className="text-sm font-medium text-white">Web Design</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 shadow-sm border border-white/30">
            <Smartphone size={18} className="text-pink-300" />
            <span className="text-sm font-medium text-white">Mobile Apps</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            We Create Exceptional
          </span>
          <br />
          <div key={animatedTextIndex} className="text-white animate-slide-up">
            {animatedTexts[animatedTextIndex]}
          </div>
        </h1>

        {/* Animated Text */}
        {/* <div className="overflow-hidden h-16 mb-6">
          <div
            key={animatedTextIndex}
            className="animate-slide-up text-2xl md:text-3xl font-semibold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            {animatedTexts[animatedTextIndex]}
          </div>
        </div> */}

        <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-10">
          We craft stunning web and mobile experiences that captivate users and
          drive business growth. Your vision, our expertise.
        </p>

        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 justify-center">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-linear-to-r from-purple-600 to-pink-600 rounded-lg hover:shadow-lg transition-all duration-200 transform sm:hover:scale-105 hover:shadow-purple-500/30"
          >
            Start Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            href="#portfolio"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-white/20 backdrop-blur-md border border-white/30 rounded-lg hover:bg-white/30 hover:border-purple-400 transition-all duration-200"
          >
            View Our Work
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-white/20">
          {STATS.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">
                {stat.number}
              </div>
              <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
            </div>
          ))}
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
                ? "w-8 h-2 bg-purple-500"
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div> */}
    </section>
  );
};

export default Hero;
