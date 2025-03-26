
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CompanyList } from "@/components/CompanyList";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <CompanyList />
          <Features />
          {/* <Testimonials /> */}
          <Pricing />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
