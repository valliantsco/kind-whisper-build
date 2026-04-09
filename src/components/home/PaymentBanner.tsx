import { motion } from "framer-motion";
import { CreditCard, Wallet, Banknote, ArrowRight } from "lucide-react";

const BENEFITS = [
  { icon: CreditCard, title: "Até 12x sem juros", detail: "No cartão de crédito" },
  { icon: Wallet, title: "Pix com desconto", detail: "Condição especial à vista" },
  { icon: Banknote, title: "Financiamento", detail: "Consulte condições" },
];

interface PaymentBannerProps {
  onContactClick?: () => void;
}

const PaymentBanner = ({ onContactClick }: PaymentBannerProps) => {
  return (
    <section className="relative py-10 md:py-14 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(0 0% 100% / 0.03), hsl(0 0% 100% / 0.015))",
            border: "1px solid hsl(0 0% 100% / 0.08)",
          }}
        >
          {/* Top accent */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), transparent)",
            }}
          />

          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 30% 50%, hsl(var(--primary) / 0.06) 0%, transparent 60%)",
            }}
          />

          <div className="relative px-6 py-8 md:px-10 md:py-10">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Left — copy */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="font-display font-black text-xl md:text-2xl text-primary-foreground uppercase tracking-tight leading-tight mb-2">
                  Facilidade para{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                    }}
                  >
                    sair pilotando
                  </span>
                </h3>
                <p className="text-sm text-primary-foreground/40 max-w-md mx-auto lg:mx-0">
                  Condições flexíveis para você escolher a melhor forma de pagamento.
                </p>
              </div>

              {/* Center — benefits */}
              <div className="flex items-center gap-4 md:gap-8">
                {BENEFITS.map((b, i) => (
                  <div key={b.title} className="flex items-center gap-3">
                    {i > 0 && (
                      <div className="w-px h-10 mr-1 md:mr-4" style={{ background: "hsl(0 0% 100% / 0.08)" }} />
                    )}
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: "hsl(var(--primary) / 0.1)",
                        border: "1px solid hsl(var(--primary) / 0.15)",
                      }}
                    >
                      <b.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs md:text-sm font-bold text-primary-foreground/80 whitespace-nowrap">
                        {b.title}
                      </p>
                      <p className="text-[10px] md:text-xs text-primary-foreground/35 whitespace-nowrap">
                        {b.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right — CTA */}
              <motion.button
                onClick={onContactClick}
                className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] px-7 py-3.5 rounded-xl text-primary-foreground cursor-pointer relative overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                  boxShadow: "0 8px 32px hsl(var(--primary) / 0.3), 0 1px 0 inset hsl(0 0% 100% / 0.1)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, hsl(0 0% 100% / 0.12) 50%, transparent 60%)",
                  }}
                />
                <span className="relative z-10">Consultar condições</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-0.5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PaymentBanner;
