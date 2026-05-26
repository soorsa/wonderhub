// components/Portfolio.tsx
"use client";
import ProjectModal from "@/components/ProjectModal";
import { CATEGORIES, PROJECTS } from "@/data/constants";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category.includes(activeCategory));

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
        <div className="flex items-center pb-5 mb-5 text-xs sm:text-base divide-x divide-gray-300 border-b">
          <div className="pr-2 sm:pr-4">
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
          <div className="flex-1 ml-2 sm:ml-4 overflow-x-auto scrollbar-hide">
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden">
                  <div className="h-48 bg-linear-to-br from-blue-400 to-purple-500 relative">
                    {/* Project Image Placeholder */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        View Project →
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-gray-900 transition-colors duration-300">
                      {project.title}
                    </h4>
                    <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-0">
                    {project.category.slice(0, 4).map((category) => (
                      <span
                        key={category}
                        className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      {selectedProject && (
        <ProjectModal
          selectedProject={selectedProject}
          setSelectedProject={(project) => {
            setSelectedProject(project);
          }}
        />
      )}
    </section>
  );
};

export default Portfolio;
