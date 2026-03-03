import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MarqueeText from "@/components/MarqueeText";
import StatsSection from "@/components/StatsSection";
import BrandSection from "@/components/BrandSection";
import ManifestoSection from "@/components/ManifestoSection";
import ModelsSection from "@/components/ModelsSection";
import QuizSection from "@/components/QuizSection";
import InfluencersSection from "@/components/InfluencersSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <MarqueeText />
        <StatsSection />
        <BrandSection />
        <ManifestoSection />
        <ModelsSection />
        <QuizSection />
        <InfluencersSection />
        <WhyChooseSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
