import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { ProductContent } from "@/data/product-content";

export default function ProductFAQ({ content }: { content: ProductContent }) {
  if (!content.faq.length) return null;

  return (
    <section className="py-14 md:py-20" style={{ borderTop: "1px solid hsl(0 0% 100% / 0.04)" }}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">Dúvidas</p>
            <h2 className="font-display font-black text-2xl md:text-3xl text-primary-foreground uppercase tracking-tight">
              Perguntas <span className="text-primary">frequentes</span>
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-2">
            {content.faq.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border-0 overflow-hidden"
                style={{ background: "hsl(0 0% 100% / 0.02)", border: "1px solid hsl(0 0% 100% / 0.05)" }}
              >
                <AccordionTrigger className="px-5 py-4 text-[13px] font-semibold text-primary-foreground/80 hover:no-underline hover:text-primary transition-colors [&>svg]:text-primary/50">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 text-[12px] text-primary-foreground/40 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
