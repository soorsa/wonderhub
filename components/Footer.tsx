// components/Footer.tsx
import { Heart, Home } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              PixelForge
            </h3>
            <p className="text-gray-400 text-sm">
              Crafting exceptional digital experiences for forward-thinking
              brands.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-purple-400 transition"
              >
                <Home size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-purple-400 transition"
              >
                <Home size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-purple-400 transition"
              >
                <Home size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-purple-400 transition"
              >
                <Home size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
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
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
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
            <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-3">
              Get design tips & updates
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-gray-900 rounded-l-lg focus:outline-none"
              />
              <button className="bg-linear-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-r-lg hover:opacity-90 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p className="flex items-center justify-center gap-1">
            Made with{" "}
            <Heart size={14} className="text-pink-500 fill-pink-500" /> by
            PixelForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
