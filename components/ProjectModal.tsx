import { AnimatePresence, motion, Variants } from "framer-motion";
import { X } from "lucide-react";
import React from "react";
interface Prop {
  selectedProject: Project;
  setSelectedProject: (project: Project | null) => void;
}
const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const ProjectModal: React.FC<Prop> = ({
  selectedProject,
  setSelectedProject,
}) => {
  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <div className="h-64 bg-linear-to-br from-blue-500 to-purple-600 relative">
                {/* Project Image */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {selectedProject.title}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="fixed top-4 right-4 sm:right-20 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-300"
                >
                  <X />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="flex flex-col lg:flex-row justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedProject.title}
                  </h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-500 dark:text-gray-400">
                      {selectedProject.year}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3 mt-4 lg:mt-0">
                  <motion.a
                    href={`/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    Live Demo
                  </motion.a>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Project Overview
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.category.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
