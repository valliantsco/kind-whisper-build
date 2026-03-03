import { motion } from "framer-motion";
import aimaCertificates from "@/assets/aima-certificates.png";

const BrandSection = () => {
  return (
    <section id="sobre" className="relative overflow-hidden">
      {/* Full-width image banner */}
      <div className="w-full">
        <img
          src={aimaCertificates}
          alt="AIMA - Certificações e prêmios internacionais de design e liderança global em veículos elétricos"
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
};

export default BrandSection;
