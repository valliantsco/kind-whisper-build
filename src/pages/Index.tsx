import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/home/AnimatedBackground";
import Header from "@/components/Header";
import PopUpContato01 from "@/components/PopUpContato01";

import HeroSlideshow from "@/components/home/HeroSlideshow";
import QuizCta from "@/components/home/QuizCta";
import ProductCarousel from "@/components/home/ProductCarousel";
import WhyChoose from "@/components/home/WhyChoose";
import Testimonials from "@/components/home/Testimonials";
import MediaCoverage from "@/components/home/MediaCoverage";
import HomeFooter from "@/components/home/HomeFooter";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState<string | undefined>();

  const handleSupportClick = (subject: string) => {
    setContactSubject(subject);
    setContactOpen(true);
  };

  const handleContactClose = () => {
    setContactOpen(false);
    setContactSubject(undefined);
  };
  return (
    <div className="min-h-screen relative" style={{ background: "hsl(0 0% 4%)" }}>
      {/* ── Unified page background ── */}

      {/* Dot grid — full page */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02] z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Slow-moving ambient glow — top */}
      <motion.div
        className="fixed top-0 right-0 w-[600px] h-[400px] md:w-[1200px] md:h-[800px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(var(--primary) / 0.06) 0%, transparent 60%)",
          filter: "blur(140px)",
        }}
        animate={{ x: [0, -200, 0], y: [0, 100, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Slow-moving ambient glow — bottom */}
      <motion.div
        className="fixed bottom-0 left-0 w-[1000px] h-[700px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(var(--primary) / 0.04) 0%, transparent 55%)",
          filter: "blur(120px)",
        }}
        animate={{ x: [0, 150, 0], y: [0, -80, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Diagonal gradient overlay — full page */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "linear-gradient(160deg, hsl(0 0% 100% / 0.01) 0%, transparent 35%, hsl(var(--primary) / 0.015) 100%)",
        }}
      />

      {/* Animated thematic elements */}
      <AnimatedBackground />

      {/* Content — above background */}
      <div className="relative z-10">
        <Header onContactClick={() => setContactOpen(true)} />
        <HeroSlideshow />
        <QuizCta />
        <ProductCarousel />
        <WhyChoose />
        <Testimonials />
        <MediaCoverage />
        <HomeFooter onContactClick={() => setContactOpen(true)} onSupportClick={handleSupportClick} />
      </div>

      <PopUpContato01 isOpen={contactOpen} onClose={handleContactClose} initialSubject={contactSubject} />
    </div>
  );
};

export default Index;
