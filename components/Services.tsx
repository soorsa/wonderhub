// components/Services.tsx
import {
  BarChart3,
  Code2,
  Palette,
  Rocket,
  Smartphone,
  Users,
} from "lucide-react";

const services = [
  {
    icon: <Palette className="h-8 w-8" />,
    title: "UI/UX Design",
    description:
      "User-centered designs that delight and convert. We create intuitive interfaces that users love.",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: <Code2 className="h-8 w-8" />,
    title: "Web Development",
    description:
      "Responsive, fast, and SEO-friendly websites built with modern technologies.",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications for iOS and Android.",
    gradient: "from-green-500 to-green-600",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Brand Identity",
    description:
      "Comprehensive branding that tells your story and sets you apart.",
    gradient: "from-orange-500 to-orange-600",
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Digital Strategy",
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

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-purple-600 font-medium inline-flex items-center">
                  Learn more →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
