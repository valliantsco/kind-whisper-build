import { useState } from "react";
import Header from "@/components/Header";
import PopUpContato01 from "@/components/PopUpContato01";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import HeroSlideshow from "@/components/home/HeroSlideshow";

import QuizCta from "@/components/home/QuizCta";
import ProductCarousel from "@/components/home/ProductCarousel";
import WhyChoose from "@/components/home/WhyChoose";
import Testimonials from "@/components/home/Testimonials";
import MediaCoverage from "@/components/home/MediaCoverage";
import HomeFooter from "@/components/home/HomeFooter";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-foreground">
      <Header onContactClick={() => setContactOpen(true)} />
      <HeroSlideshow />
      <SocialProofBadges />
      <QuizCta />
      <ProductCarousel />
      <WhyChoose />
      <Testimonials />
      <MediaCoverage />
      <HomeFooter />
      <FloatingWhatsApp />
      <PopUpContato01 isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
};

export default Index;
