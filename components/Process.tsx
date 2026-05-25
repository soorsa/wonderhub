// components/Process.tsx
import { Code2, PenTool, Rocket, Search } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-8 w-8" />,
    title: "Discovery",
    description:
      "We dive deep into your goals, audience, and market to create a strategic foundation.",
    number: "01",
  },
  {
    icon: <PenTool className="h-8 w-8" />,
    title: "Design",
    description:
      "Our designers craft beautiful, intuitive interfaces that bring your vision to life.",
    number: "02",
  },
  {
    icon: <Code2 className="h-8 w-8" />,
    title: "Development",
    description:
      "We build robust, scalable solutions using cutting-edge technologies.",
    number: "03",
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "Launch & Grow",
    description:
      "After launch, we provide ongoing support and optimization for continuous growth.",
    number: "04",
  },
];

const Process = () => {
  return (
    <section
      id="process"
      className="py-20 bg-linear-to-br from-purple-50 to-pink-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">
            Our Process
          </h2>
          <p className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            How We Bring Ideas to Life
          </p>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            A transparent, collaborative approach that ensures your success.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-linear-to-r from-purple-300 via-pink-300 to-purple-300 transform -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white h-full rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <div className="absolute -top-19 left-1/2 transform -translate-x-1/2">
                      <div className="w-16 h-16 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold rotate-12 shadow-lg">
                        {step.number}
                      </div>
                    </div>
                    <div className="mt-8 mb-4 flex justify-center">
                      <div className="text-purple-600">{step.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
