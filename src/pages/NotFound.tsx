import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/home/AnimatedBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative" style={{ background: "hsl(0 0% 4%)" }}>
      <AnimatedBackground />
      <div className="relative z-10">
        <Header onContactClick={() => {}} />
        <div className="flex min-h-[80vh] items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center px-4"
          >
            <h1
              className="font-display font-black text-7xl md:text-9xl uppercase tracking-tight mb-4 bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
              }}
            >
              404
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/50 mb-8">
              A página que você procura não foi encontrada.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] px-6 py-3 rounded-xl text-primary-foreground"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                boxShadow: "0 8px 32px hsl(var(--primary) / 0.3)",
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
