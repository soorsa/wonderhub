// components/Portfolio.tsx
"use client";
import { CATEGORIES, PROJECTS } from "@/data/constants";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">
            Our Work
          </h2>
          <p className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Recent Projects
          </p>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our latest creations that have helped businesses grow.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center mb-12 divide-x divide-gray-300">
          <div className="pr-4">
            <div
              onClick={() => setActiveCategory("All")}
              className={`px-6 py-2 cursor-pointer rounded-lg transition-all duration-200 ${
                activeCategory === "All"
                  ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </div>
          </div>
          <div className="flex-1 ml-4 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2">
              {CATEGORIES.map((category) => (
                <div
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 cursor-pointer text-nowrap rounded-lg transition-all duration-200 ${
                    activeCategory === category
                      ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-lg group-hover:translate-y-0 transition-transform duration-300">
                  <button className="text-white bg-purple-600 p-2 rounded-lg hover:bg-purple-700 transition">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <span className="text-sm text-purple-600 font-semibold">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
