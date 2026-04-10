import { motion } from "framer-motion";
import { Star, MessageSquareQuote } from "lucide-react";

export default function ProductSocialProof({ productName }: { productName: string }) {
  return (
    <section className="py-14 md:py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.12) 50%, transparent 100%)" }} />

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-primary/8 px-4 py-1.5 rounded-full mb-4" style={{ border: "1px solid hsl(var(--primary) / 0.12)" }}>
              <Star className="w-3 h-3" />
              Confiança
            </span>
            <h2 className="font-display font-black text-2xl md:text-3xl text-primary-foreground uppercase tracking-tight">
              Quem escolheu,{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                aprova
              </span>
            </h2>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              { stat: "GARANTIA", label: "respaldo de fábrica" },
              { stat: "100%", label: "suporte pós-venda" },
              { stat: "19+", label: "modelos no portfólio" },
            ].map((item, i) => (
              <div
                key={item.stat}
                className="text-center py-5 px-4 rounded-xl"
                style={{
                  background: "hsl(0 0% 100% / 0.02)",
                  border: "1px solid hsl(0 0% 100% / 0.05)",
                }}
              >
                <p
                  className="font-display font-black text-2xl bg-clip-text text-transparent mb-1"
                  style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
                >
                  {item.stat}
                </p>
                <p className="text-[11px] text-primary-foreground/35 uppercase tracking-wider">{item.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Placeholder for future testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-6 rounded-xl p-6 md:p-8 text-center"
            style={{
              background: "hsl(0 0% 100% / 0.015)",
              border: "1px dashed hsl(0 0% 100% / 0.06)",
            }}
          >
            <MessageSquareQuote className="w-6 h-6 text-primary/30 mx-auto mb-3" />
            <p className="text-[12px] text-primary-foreground/25 leading-relaxed max-w-sm mx-auto">
              Em breve, depoimentos de clientes que escolheram a {productName} para o dia a dia.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
