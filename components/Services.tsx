// components/Services.tsx
"use client";
import { motion, useInView, Variants } from "framer-motion";
import {
  Check,
  Code2,
  Megaphone,
  Rocket,
  Settings,
  ShoppingCart,
  Smartphone,
} from "lucide-react";
import { useRef } from "react";

const services = [
  {
    icon: <Code2 className="h-8 w-8" />,
    title: "Web Development",
    description:
      "Responsive, fast, and SEO-friendly websites built with modern technologies.",
    gradient: "from-blue-500 to-blue-600",
    features: [
      "Responsive Design",
      "React/Next.js Development",
      "API Integration",
      "Performance Optimization",
      "SEO Friendly",
      "Cross-browser Compatibility",
    ],
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications for iOS and Android.",
    gradient: "from-green-500 to-green-600",
    features: [
      "React Native Development",
      "iOS & Android Apps",
      "App Store Deployment",
      "Push Notifications",
      "Offline Functionality",
      "UI/UX Design",
    ],
  },
  {
    icon: <ShoppingCart className="h-8 w-8" />,
    title: "E-commerce Solutions",
    description:
      "Complete online store development with secure payment integration.",
    gradient: "from-purple-500 to-purple-600",
    features: [
      "Shopping Cart System",
      "Payment Gateway Integration",
      "Inventory Management",
      "Admin Dashboard",
      "Order Tracking",
      "Security & SSL",
    ],
  },
  {
    icon: <Settings className="h-8 w-8" />,
    title: "Consulting & Maintenance",
    description:
      "Comprehensive branding that tells your story and sets you apart.",
    gradient: "from-orange-500 to-orange-600",
    features: [
      "Code Reviews",
      "Performance Audits",
      "Technical Consulting",
      "Regular Updates",
      "Bug Fixing",
      "Security Patches",
    ],
  },
  {
    icon: <Megaphone className="h-8 w-8" />,
    title: "Digital Marketing",
    description:
      "Data-driven strategies to achieve your business goals and maximize ROI.",
    gradient: "from-red-500 to-red-600",
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "Growth Optimization",
    description:
      "Continuous improvement and A/B testing to enhance performance.",
    gradient: "from-indigo-500 to-indigo-600",
  },
];

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
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section id="services" className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? ["visible"] : ["hidden"]}
          className="text-center mb-16"
        >
          <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">
            What We Do
          </h2>
          <p className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Comprehensive Design Solutions
          </p>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            From concept to launch, we provide end-to-end design and development
            services.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 transform"
              variants={itemVariants}
              whileHover={{
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-linear-to-r ${service.gradient} text-white mb-6`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
              {/* Features List */}
              <ul className="space-y-2 mt-3">
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
                <span className="text-purple-600 font-medium inline-flex items-center">
                  Learn more →
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
