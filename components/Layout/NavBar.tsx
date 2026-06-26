// components/Navbar.tsx
"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#portfolio" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
    { name: "Academy", href: "/https://wonderhub-academy.vercel.app" },
  ];

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm text-gray-700"
          : "bg-transparent text-gray-700"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center divide-x divide-gray-300">
            <div className="relative w-10 pr-2">
              <Image
                src={`/logo.png`}
                alt="wonderhub"
                width={100}
                height={100}
              />
            </div>
            <div className="pl-2">
              <div className="text-xl font-bold bg-linear-to-r from-primary to-pink-600 bg-clip-text text-transparent ">
                WonderHUB
              </div>
              <div className="text-gray-500 text-xs">
                Digital Solution Agency
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-primary transition-colors duration-200 font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#contact"
              className="bg-linear-to-r from-primary to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden ${
              scrolled ? "text-gray-700" : "text-gray-700"
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="md:hidden fixed inset-0 h-screen top-0 left-0 right-0 bg-white shadow-lg py-4 px-4 flex justify-center items-center"
          >
            <div className="border absolute top-4 right-4 rounded-lg border-gray-200 flex items-center justify-center p-1 hover:bg-gray-200 cursor-pointer">
              <X />
            </div>
            <div className="-mt-20 space-y-3 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-700 text-lg hover:text-primary transition-colors py-2"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block bg-linear-to-r from-primary to-pink-600 text-white px-10 text-xl font-bold py-2 rounded-lg text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
