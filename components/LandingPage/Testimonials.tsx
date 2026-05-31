/* eslint-disable react/no-unescaped-entities */
// components/Testimonials.tsx
"use client";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Dan O. Daniel",
    role: "CEO, Richtec Ltd.",
    content:
      "Wonderhub transformed our digital presence completely. The team's attention to detail and creative vision exceeded our expectations. Our conversion rates have doubled since launch!",
    rating: 5,
    image: "/user.jpg",
  },
  {
    id: 2,
    name: "Daniel Miles",
    role: "Founder, Alaba.Market",
    content:
      "Working with Wonderhub was an absolute pleasure. They understood our vision and delivered a mobile app that our customers love. Highly recommended!",
    rating: 5,
    image: "/user.jpg",
  },
  {
    id: 3,
    name: "Tochuckwu Jason",
    role: "CEO, Healthify",
    content:
      "The team's expertise in UI/UX design is unparalleled. They created a seamless shopping experience that perfectly represents our brand. Outstanding work!",
    rating: 5,
    image: "/user.jpg",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((current + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            Testimonials
          </h2>
          <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            What Our Clients Say
          </p>
          <p className="mt-1 sm:mt-4 sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it — hear from our satisfied clients.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full shrink-0 px-2 sm:px-4"
                >
                  <div className="bg-linear-to-br from-gray-50 to-purple-50 rounded-2xl p-4 sm:p-8 md:p-12 text-center shadow-sm">
                    <div className="flex justify-center mb-6">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-purple-200">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonial.rating && "fill-yellow-400"
                          } text-yellow-400`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm sm:text-lg italic mb-4 sm:mb-6">
                      "{testimonial.content}"
                    </p>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-primary text-xs sm:text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === idx ? "w-8 bg-primary" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
