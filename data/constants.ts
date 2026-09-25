import {
  BarChartBig,
  Code2,
  FileText,
  Globe,
  HelpCircle,
  LayoutTemplate,
  Megaphone,
  Server,
  Settings,
  ShoppingCart,
  Smartphone,
} from "lucide-react";

export const PROJECTS = [
  {
    id: 1,
    title: "Alaba.Market",
    category: ["Web Design", "Mobile App", "E-commerce"],
    year: "2024",
    image: "/mockups/alaba-market.png",
    description: "Real-time analytics dashboard for financial institutions",
  },
  {
    id: 2,
    title: "Adron Homes",
    category: ["Web Design", "Mobile App"],
    year: "2025",
    image: "/mockups/adron-homes.png",
    description: "Sustainable shopping platform with carbon tracking",
  },
  {
    id: 12,
    title: "WashTrack",
    category: ["Web Design", "Mobile App"],
    year: "2024",
    image: "/mockups/washtrack.png",
    description: "Interactive learning platform for students",
  },

  {
    id: 3,
    title: "Richtec Professional Equipment. LTD",
    category: ["Web Design", "Branding"],
    year: "2025",
    image: "/mockups/mockup1.png",
    description: "Personalized wellness app with AI coach",
  },
  {
    id: 4,
    title: "Brown Box",
    category: ["Web Design", "E-commerce"],
    year: "2022",
    image: "/mockups/mockup1.png",
    description: "Immersive travel booking experience",
  },
  {
    id: 5,
    title: "Starnest",
    category: ["Web Design"],
    year: "2025",
    image: "/mockups/starnest.png",
    description: "Digital art marketplace branding",
  },
  {
    id: 6,
    title: "E-Learning Suite",
    category: ["Web Design"],
    year: "2019",
    image: "/mockups/mockup1.png",
    description: "Interactive learning platform for students",
  },
  {
    id: 7,
    title: "Mr & Mrs Real",
    category: ["Web Design"],
    year: "2024",
    image: "/mockups/mockup1.png",
    description: "Interactive learning platform for students",
  },
  {
    id: 8,
    title: "DeMarriage Academy",
    category: ["Web Design", "Mobile App"],
    year: "2026",
    image: "/mockups/demarriage.png",
    description: "Interactive learning platform for students",
  },
  {
    id: 9,
    title: "Reumskky",
    category: ["Web Design", "Mobile App", "E-commerce"],
    year: "2021",
    image: "/mockups/mockup1.png",
    description: "Interactive learning platform for students",
  },
  {
    id: 10,
    title: "Healthify",
    category: ["Web Design", "E-commerce"],
    year: "2025",
    image: "/mockups/mockup1.png",
    description: "Interactive learning platform for students",
  },
  {
    id: 11,
    title: "Rechargeit",
    category: ["Web Design", "E-commerce"],
    year: "2020",
    image: "/mockups/mockup1.png",
    description: "Interactive learning platform for students",
  },
];

export const CATEGORIES = [
  "Web Design",
  "Mobile App",
  "E-commerce",
  "UI/UX",
  "Branding",
];

export const STATS = [
  { number: "150+", label: "Projects Delivered" },
  { number: "98%", label: "Happy Client" },
  { number: "12", label: "Industry Awards" },
  { number: "50+", label: "Expert Designers" },
];

class Navigation {
  workspace = [
    {
      label: "Overview",
      icon: LayoutTemplate,
      path: "/dashboard",
    },
    {
      label: "Domains",
      icon: Globe,
      path: "/dashboard/domains",
    },
    {
      label: "Hosting",
      icon: Server,
      path: "/dashboard/hosting",
    },
    {
      label: "invoces",
      icon: FileText,
      path: "/dashboard/invoices",
    },
  ];
  system = [
    {
      label: " report",
      icon: BarChartBig,
      path: "/dashboard/reports",
    },

    {
      label: "settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
    {
      label: "Surport",
      icon: HelpCircle,
      path: "/dashboard/support",
    },
  ];
}
export const navigation = new Navigation();

export const Hostings = [
  {
    type: "Shared Hosting (cPanel)",
    duration: "1 Year",
    expires: "10-16-2026",
    domains: [
      {
        domain: "richtecafrica.com",
        protocol: "https",
        secured: true,
        duration: "1 Year",
        expires: "10-16-2026",
      },
      {
        domain: "alaba.market",
        protocol: "https",
        secured: true,
        duration: "1 Year",
        expires: "10-21-2026",
      },
    ],
  },
];

export const services = [
  {
    icon: Code2,
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
    icon: Smartphone,
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
    icon: ShoppingCart,
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
    icon: Settings,
    title: "Consulting & Maintenance",
    description:
      "Expert guidance and strategic consulting to optimize your digital products and technical infrastructure.",
    gradient: "from-gray-500 to-gray-600",
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
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "Data-driven strategies to achieve your business goals and maximize ROI.",
    gradient: "from-red-500 to-red-600",
    features: [
      "SEO Strategy & Implementation",
      "Content Marketing",
      "Social Media Management",
      "Email Marketing Campaigns",
      "PPC Advertising",
      "Analytics & Reporting",
      "Conversion Rate Optimization",
    ],
  },
  // {
  //   icon: Rocket  ,
  //   title: "Web Hosting",
  //   description:
  //     "Continuous improvement and A/B testing to enhance performance.",
  //   gradient: "from-indigo-500 to-indigo-600",
  // },
  {
    icon: Server,
    href: "/dashboard",
    title: "Web Hosting",
    description:
      "Reliable, secure, and scalable hosting solutions with continuous deployment and monitoring.",
    gradient: "from-indigo-500 to-indigo-600",
    features: [
      "Cloud Hosting (AWS/GCP/Azure)",
      "Database Management",
      "SSL Certificates",
      "Domain Management",
      "Server Monitoring",
      "24/7 Uptime Monitoring",
    ],
  },
];

export const INVOICES: Invoice[] = [
  {
    id: "WH-2026-0042",
    issueDate: "2026-09-24",
    dueDate: "2027-10-9",
    status: "overdue",
    customer: {
      name: "Daniel O. Daniel",
      email: "richteckitchenworld@gmail.com",
      phone: "08108713152",
      address: "",
    },
    paymentMethod: { brand: "Paystack" },
    items: [
      {
        id: "1",
        name: "Domain Registration",
        type: "domain",
        quantity: 1,
        unitPrice: 35000,
        description: "richtecafrica.com · 1 year",
      },
      {
        id: "3",
        name: "Privacy Protection & SSL",
        type: "ssl",
        quantity: 1,
        unitPrice: 2500,
        description: "Domain Privacy Protection & SSL Certificate",
      },
      {
        id: "4",
        name: "Shared Hosting (cPanel)",
        type: "hosting",
        quantity: 1,
        unitPrice: 80590.62,
        description: "4 vCPU · 8GB RAM · 1 year",
      },
    ],
    /** Absolute dollar amount already applied (not a percentage). */
    discountAmount: 0,
    /** Decimal, e.g. 0.0825 for 8.25%. */
    taxRate: 0.07,
  },
];
