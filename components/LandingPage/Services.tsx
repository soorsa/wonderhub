// components/Services.tsx
"use client";
import { services } from "@/data/constants";
import { motion, useInView, Variants } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const headerVariants: Variants = {
  hidden: { y: -30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};
const itemVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: "some" });

  return (
    <section id="services" className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? ["visible"] : ["hidden"]}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            What We Do
          </h2>
          <p className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Comprehensive Design Solutions
          </p>
          <p className="mt-2 sm:mt-4 text-sm sm:text-xl text-gray-600 max-w-2xl mx-auto">
            From concept to launch, we provide end-to-end design and development
            services.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:cursor-pointer hover:shadow-md transition-all duration-300 transform"
              variants={itemVariants}
              whileHover={{
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-linear-to-r ${service.gradient} text-white mb-3 sm:mb-6`}
              >
                <service.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {service.description}
              </p>
              {/* Features List */}
              <ul className="space-y-1.5 sm:space-y-2 mt-2 sm:mt-3">
                {service.features?.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: featureIndex * 0.1 }}
                    className="flex items-center text-sm text-gray-600 dark:text-gray-400 gap-2"
                  >
                    <Check size={18} className="text-green-500" />
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link
                  href={service.href || "#"}
                  className="text-primary text-sm sm:text-base font-medium inline-flex items-center"
                >
                  Learn more →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
