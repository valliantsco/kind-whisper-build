import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { ProductContent } from "@/data/product-content";

export default function ProductFAQ({ content }: { content: ProductContent }) {
  if (!content.faq.length) return null;

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.12) 50%, transparent 100%)" }} />

      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="w-12 h-12 rounded-xl mx-auto mb-5 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--primary) / 0.05))",
                border: "1px solid hsl(var(--primary) / 0.15)",
              }}
            >
              <HelpCircle className="w-5 h-5 text-primary" />
            </motion.div>
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-primary/8 px-4 py-1.5 rounded-full mb-4" style={{ border: "1px solid hsl(var(--primary) / 0.12)" }}>
              Dúvidas
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-primary-foreground uppercase tracking-tight">
              Perguntas{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                frequentes
              </span>
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {content.faq.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <AccordionItem
                  value={`faq-${i}`}
                  className="rounded-xl border-0 overflow-hidden transition-all duration-300"
                  style={{
                    background: "linear-gradient(145deg, hsl(0 0% 100% / 0.03) 0%, hsl(0 0% 100% / 0.01) 100%)",
                    border: "1px solid hsl(0 0% 100% / 0.06)",
                  }}
                >
                  <AccordionTrigger className="px-6 py-5 text-[13px] font-semibold text-primary-foreground/85 hover:no-underline hover:text-primary transition-colors [&>svg]:text-primary/50 [&>svg]:w-4 [&>svg]:h-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-[13px] text-primary-foreground/45 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
