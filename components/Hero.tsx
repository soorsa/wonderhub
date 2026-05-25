// components/Hero.tsx
"use client";
import Navbar from "@/components/NavBar";
import { ArrowRight, Monitor, Smartphone } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-purple-50 via-white to-pink-50">
      <Navbar />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-200"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="flex justify-center space-x-4 mb-8 animate-fade-in-down">
          <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
            <Monitor size={18} className="text-purple-600" />
            <span className="text-sm font-medium text-gray-700">
              Web Design
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
            <Smartphone size={18} className="text-pink-600" />
            <span className="text-sm font-medium text-gray-700">
              Mobile Apps
            </span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <span className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Exceptional Design
          </span>
          <br />
          <span className="text-gray-900">For Digital Excellence</span>
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          We craft stunning web and mobile experiences that captivate users and
          drive business growth. Your vision, our expertise.
        </p>

        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 justify-center">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-linear-to-r from-purple-600 to-pink-600 rounded-lg hover:shadow-lg transition-all duration-200 transform sm:hover:scale-105"
          >
            Start Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            href="#portfolio"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:border-purple-500 hover:text-purple-600 transition-all duration-200"
          >
            View Our Work
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-gray-200">
          {[
            { number: "150+", label: "Projects Delivered" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "12", label: "Industry Awards" },
            { number: "50+", label: "Expert Designers" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900">
                {stat.number}
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
