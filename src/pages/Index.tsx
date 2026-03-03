import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BrandSection from "@/components/BrandSection";
import ModelsSection from "@/components/ModelsSection";
import QuizSection from "@/components/QuizSection";
import InfluencersSection from "@/components/InfluencersSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <main>
        <HeroSection />
        <BrandSection />
        <ModelsSection />
        <QuizSection />
        <InfluencersSection />
        <WhyChooseSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
