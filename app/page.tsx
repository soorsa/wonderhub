// app/page.tsx
import Contact from "@/components/LandingPage/Contact";
import Hero2 from "@/components/LandingPage/Hero2";
import Portfolio from "@/components/LandingPage/Portfolio";
import Process from "@/components/LandingPage/Process";
import Services from "@/components/LandingPage/Services";
import Testimonials from "@/components/LandingPage/Testimonials";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/NavBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <Hero2 />
      {/* <Hero /> */}
      <Services />
      <Portfolio />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
