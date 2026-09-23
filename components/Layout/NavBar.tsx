// components/Navbar.tsx
"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { services } from "@/data/constants";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
    setOpenSubmenu(null);
  }, [pathname]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Our Services", href: "#services", menu: services },
    { name: "Our Portfolio", href: "#portfolio" },
    { name: "Our Process", href: "#process" },
    { name: "Contact Us", href: "#contact" },
    { name: "Academy", href: "https://wonderhub-academy.vercel.app" },
  ];

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/80 text-gray-700 shadow-sm backdrop-blur-md"
          : "bg-transparent text-gray-700",
        // Keep a solid background on mobile when the drawer is open
        isOpen && "bg-white text-gray-700 shadow-sm"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center divide-x divide-gray-300"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative w-10 pr-2">
              <Image src="/logo.png" alt="wonderhub" width={100} height={100} />
            </div>
            <div className="pl-2">
              <div className="bg-linear-to-r from-primary to-pink-600 bg-clip-text text-xl font-bold text-transparent">
                WonderHUB
              </div>
              <div className="text-xs text-gray-500">
                Digital Solution Agency
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <NavigationMenu className="hidden max-w-none items-center space-x-8 md:flex">
            <NavigationMenuList className="gap-1">
              {navLinks.map((item, i) => (
                <NavigationMenuItem key={i} className="cursor-pointer">
                  {item.menu ? (
                    <>
                      <NavigationMenuTrigger className="h-9 bg-transparent px-3 font-medium">
                        {item.name}
                      </NavigationMenuTrigger>

                      <NavigationMenuContent>
                        <div className="flex w-fit flex-col gap-2 p-6">
                          {item.menu.map((sub, j) => (
                            <Link
                              href={sub.href ? sub.href : "#services"}
                              key={j}
                              className="flex items-center gap-2 border-b border-transparent py-2 text-sm hover:border-gray-200"
                            >
                              <sub.icon className="h-3.5 w-3.5" />
                              <span>{sub.title}</span>
                            </Link>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      href={item.href}
                      className="h-9 bg-transparent px-3 font-medium"
                    >
                      {item.name}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden md:flex">
            <Link
              href="#contact"
              className="rounded-lg bg-linear-to-r from-primary to-pink-600 px-4 py-2 text-white transition-shadow duration-200 hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
            className="text-gray-700 md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 z-40 origin-top overflow-y-auto bg-white transition-all duration-300 md:hidden",
          isOpen
            ? "pointer-events-auto max-h-[calc(100vh-4rem)] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        )}
      >
        <div className="space-y-1 px-4 pb-8 pt-4 sm:px-6">
          {navLinks.map((item, i) => {
            const isSubmenuOpen = openSubmenu === item.name;

            if (!item.menu) {
              return (
                <Link
                  key={i}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  {item.name}
                </Link>
              );
            }

            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenSubmenu(isSubmenuOpen ? null : item.name)
                  }
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-gray-700 transition hover:bg-gray-50"
                  aria-expanded={isSubmenuOpen}
                >
                  {item.name}
                  <ChevronDown
                    size={18}
                    className={cn(
                      "transition-transform duration-200",
                      isSubmenuOpen && "rotate-180"
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "overflow-hidden transition-[max-height] duration-300",
                    isSubmenuOpen ? "max-h-96" : "max-h-0"
                  )}
                >
                  <div className="ml-3 space-y-1 border-l border-gray-200 pl-3">
                    {item.menu.map((sub, j) => (
                      <Link
                        key={j}
                        href={sub.href ? sub.href : "#services"}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                      >
                        <sub.icon className="h-4 w-4" />
                        <span>{sub.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Mobile CTA */}
          <div className="pt-4">
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block rounded-lg bg-linear-to-r from-primary to-pink-600 px-4 py-3 text-center font-medium text-white shadow-md transition hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
