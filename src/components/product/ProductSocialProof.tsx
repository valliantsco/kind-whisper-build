import { motion } from "framer-motion";
import { Star, Quote, ShieldCheck, MessageSquareQuote } from "lucide-react";
import type { ProductContent, ProductTestimonial } from "@/data/product-content";

interface Props {
  productName: string;
  content?: ProductContent;
}

const PLACEHOLDER_TESTIMONIALS: ProductTestimonial[] = [
  {
    quote: "Depoimento de cliente em breve.",
    author: ". ",
    context: "Aguardando validação",
  },
];

export default function ProductSocialProof({ productName, content }: Props) {
  const testimonials = content?.socialProof?.testimonials;
  const trustBadge = content?.socialProof?.trustBadge;
  const hasRealTestimonials = testimonials && testimonials.length > 0;
  const displayTestimonials = hasRealTestimonials ? testimonials : PLACEHOLDER_TESTIMONIALS;

  return (
    <section className="py-12 md:py-16 relative overflow-x-clip">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.12) 50%, transparent 100%)" }}
      />

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-10"
          >
            <span
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-primary/8 px-4 py-1.5 rounded-full mb-4"
              style={{ border: "1px solid hsl(var(--primary) / 0.12)" }}
            >
              <Star className="w-3 h-3" />
              Confiança
            </span>
            <h2 className="font-display font-black text-2xl md:text-4xl text-primary-foreground uppercase tracking-tight">
              Quem escolheu,{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
              >
                aprova
              </span>
            </h2>
          </motion.div>

          {/* Trust badge. model-specific highlight */}
          {trustBadge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2.5 mb-8"
            >
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary-foreground/70 tracking-wide">
                {trustBadge}
              </span>
            </motion.div>
          )}

          {/* Trust signals. compact strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-3 mb-8"
          >
            {[
              { stat: "GARANTIA", label: "Respaldo de fábrica" },
              { stat: "100%", label: "Suporte pós-venda" },
              { stat: "19+", label: "Modelos no portfólio" },
            ].map((item) => (
              <div
                key={item.stat}
                className="text-center py-4 px-3 rounded-xl"
                style={{
                  background: "hsl(0 0% 100% / 0.02)",
                  border: "1px solid hsl(0 0% 100% / 0.05)",
                }}
              >
                <p
                  className="font-display font-black text-lg md:text-2xl bg-clip-text text-transparent mb-0.5"
                  style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
                >
                  {item.stat}
                </p>
                <p className="text-[10px] text-primary-foreground/35 uppercase tracking-wider">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayTestimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-5 md:p-6 relative group"
                style={{
                  background: hasRealTestimonials
                    ? "linear-gradient(145deg, hsl(0 0% 100% / 0.03) 0%, hsl(0 0% 100% / 0.01) 100%)"
                    : "hsl(0 0% 100% / 0.015)",
                  border: hasRealTestimonials
                    ? "1px solid hsl(0 0% 100% / 0.06)"
                    : "1px dashed hsl(0 0% 100% / 0.06)",
                }}
              >
                <Quote className="w-5 h-5 text-primary/20 mb-3" />
                <p
                  className={`text-sm leading-relaxed mb-4 ${
                    hasRealTestimonials
                      ? "text-primary-foreground/60"
                      : "text-primary-foreground/25 italic"
                  }`}
                >
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-primary"
                    style={{
                      background: "hsl(var(--primary) / 0.1)",
                      border: "1px solid hsl(var(--primary) / 0.15)",
                    }}
                  >
                    {t.author.charAt(0) === ". " ? "?" : t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-primary-foreground/70">
                      {t.author}
                    </p>
                    <p className="text-[10px] text-primary-foreground/30">
                      {t.context}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Fallback message when no real testimonials */}
          {!hasRealTestimonials && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-4 text-center"
            >
              <p className="text-[11px] text-primary-foreground/20">
                Em breve, depoimentos de clientes que escolheram a {productName}.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
