/* eslint-disable react/no-unescaped-entities */
// components/Contact.tsx
"use client";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            Get In Touch
          </h2>
          <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Let's Create Something Amazing
          </p>
          <p className="mt-1 sm:mt-4 sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to transform your digital presence? We'd love to hear about
            your project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="">
              <Link href={`https://wa.me/2349042334662`}>
                <div className="bg-linear-to-r from-primary to-pink-600 rounded-2xl p-5 sm:p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
                  <p className="mb-4 opacity-90 text-sm sm:text-base">
                    Click to chat with me on WhatsApp get free consultation and
                    quote for your project.
                  </p>
                  <div className="text-xl sm:text-3xl font-bold flex items-center gap-1 sm:gap-2">
                    <div className="flex justify-center items-center p-1 rounded-lg border border-gray-100">
                      <FaWhatsapp className="h-5 w-5 sm:h-7 sm:w-7" />
                    </div>
                    <div className="">+234 904 2334 662</div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className="bg-purple-100 p-2 sm:p-3 rounded-full">
                    <Mail className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className=" text-gray-500">Email</p>
                    <p className="text-gray-900 font-medium">
                      wonderhub.dev@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className="bg-purple-100 p-2 sm:p-3 rounded-full">
                    <Phone className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900 font-medium">
                      +234 904 2334 662
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className="bg-purple-100 p-2 sm:p-3 rounded-full">
                    <MapPin className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="text-sm text-gray-500">Office</p>
                    <p className="text-gray-900 font-medium">
                      123 Design Street, Creative District, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 shadow-sm"
          >
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="hello@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-linear-to-r from-primary to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Send Message
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
