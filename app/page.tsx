// app/page.tsx
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero2 from "@/components/Hero2";
import Navbar from "@/components/NavBar";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

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
