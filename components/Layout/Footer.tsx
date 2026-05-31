// components/Footer.tsx
import LinkButton from "@/components/General/LinkButton";
import { ArrowRight, Copyright, Mail, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="bg-primary text-white rounded-t-[30px] sm:rounded-t-[50px] overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col justify-center items-center mb-12 space-y-3">
          <Image
            src={`/white-logo-h.png`}
            width={100}
            height={100}
            className="w-50 sm:w-100 mb-5"
            alt="wonderhub"
          />
          <div className="text-center">
            <div className="font-bold sm:text-2xl">DIGITAL SOLUTION AGENCY</div>
            <div className="text-sm sm:text-base">
              Bringing excellence to your business.
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-1 sm:gap-2 text-sm w-full sm:w-2/5">
            <LinkButton
              link="https://wa.me/+2349042334662"
              label="Start your Project"
              className="no-underline!"
              rightIcon={<ArrowRight size={18} />}
            />
            <LinkButton
              link="https://wa.me/+2349042334662"
              label="Book Free Demo"
              className="bg-purple-700! text-white no-underline!"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg sm:text-2xl font-bold bg-linear-to-r from-white to-pink-400 bg-clip-text text-transparent mb-4">
              WonderHUB
            </h3>
            <p className="text-gray-200 text-xs sm:text-sm">
              Crafting exceptional digital experiences for forward-thinking
              brands.
            </p>
            <div className="hidden sm:flex space-x-4 mt-4">
              <Link
                href="#"
                className="text-primary bg-white p-1 rounded-md hover:text-purple-400 transition"
              >
                <FaFacebook size={20} />
              </Link>
              <Link
                href="#"
                className="text-primary bg-white p-1 rounded-md hover:text-purple-400 transition"
              >
                <FaInstagram size={20} />
              </Link>
              <Link
                href="#"
                className="text-primary rounded-md p-1 bg-white hover:text-purple-400 transition"
              >
                <FaWhatsapp size={20} />
              </Link>
              <Link
                href="#"
                className="text-primary bg-white p-1 rounded-md hover:text-purple-400 transition"
              >
                <RiTwitterXFill size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-gray-200 text-xs sm:text-sm">
              <li>
                <Link href="#" className="hover:text-purple-400 transition">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-400 transition">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-400 transition">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-400 transition">
                  Brand Identity
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-200 text-xs sm:text-sm">
              <li>
                <Link href="#" className="hover:text-purple-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-400 transition">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-400 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-400 transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-gray-200 text-xs sm:text-sm">
              <li>
                <Link
                  href="#"
                  className=" truncate hover:text-purple-400 transition flex items-center gap-2"
                >
                  <Mail size={14} /> wonderhub.dev@gmail.com
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className=" truncate hover:text-purple-400 transition flex items-center gap-2"
                >
                  <PhoneCall size={14} /> +234 904 2334 662
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className=" truncate hover:text-purple-400 transition flex items-center gap-2"
                >
                  <FaWhatsapp size={15} /> +234 904 2334 662
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-400 mt-8 pt-8 text-center text-gray-200 text-sm">
          <p className="flex items-center justify-center gap-1">
            wonderHUB <Copyright size={14} />
            {year}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
