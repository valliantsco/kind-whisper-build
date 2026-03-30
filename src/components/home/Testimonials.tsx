import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  { name: "João P.", city: "Uberlândia, MG", text: "Comprei a S3K e estou impressionado com a autonomia. Faço 40km por dia e ainda sobra bateria. O atendimento da MS Eletric foi impecável.", stars: 5, isInfluencer: false },
  { name: "Maria S.", city: "Uberlândia, MG", text: "Minha Bike 400+ é perfeita para ir ao trabalho. Economizo muito com combustível e estacionamento. Super prática!", stars: 5, isInfluencer: false },
  { name: "Carlos M.", city: "Uberlândia, MG", text: "Uso o Rhino Delivery no trabalho e a economia é absurda. Bateria removível facilita muito. Recomendo demais.", stars: 5, isInfluencer: false },
  { name: "Ana L.", city: "Uberlândia, MG", text: "Comprei o triciclo para minha mãe e ela ama. Super estável e seguro. A assistência técnica é muito atenciosa.", stars: 5, isInfluencer: false },
  { name: "Roberto F.", city: "Uberlândia, MG", text: "A Tour 3K sobe ladeira como se fosse plano. Motor de 3000W faz toda diferença. Melhor investimento que fiz.", stars: 5, isInfluencer: false },
  { name: "Fernanda R.", city: "Uberlândia, MG", text: "Atendimento consultivo de verdade. Me ajudaram a escolher o modelo ideal com o quiz. Saí da loja com a Bliss e estou apaixonada!", stars: 5, isInfluencer: false },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.08 },
  }),
};

const Testimonials = () => {
  return (
    <section className="relative bg-foreground py-28 overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.06), transparent)" }}
      />

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(11 81% 57% / 0.04) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-4"
            style={{
              background: "hsl(11 81% 57% / 0.12)",
              color: "hsl(11 81% 57%)",
              border: "1px solid hsl(11 81% 57% / 0.25)",
            }}
          >
            Depoimentos
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-primary-foreground uppercase tracking-tight leading-[1]">
            Quem compra, <span className="gradient-text">recomenda</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="rounded-2xl p-6 relative"
              style={{
                background: "hsl(0 0% 11% / 0.8)",
                border: "1px solid hsl(0 0% 100% / 0.08)",
              }}
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "hsl(0 0% 100% / 0.06)" }}
                >
                  <span className="text-primary-foreground/30 text-xs font-bold">{t.name[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-foreground/90">{t.name}</p>
                  <p className="text-[11px] text-primary-foreground/30">{t.city}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }, (_, j) => (
                  <Star
                    key={j}
                    className="w-3.5 h-3.5"
                    style={{
                      color: j < t.stars ? "hsl(11 81% 57%)" : "hsl(0 0% 100% / 0.1)",
                      fill: j < t.stars ? "hsl(11 81% 57%)" : "transparent",
                    }}
                  />
                ))}
              </div>

              <p className="text-sm text-primary-foreground/50 leading-relaxed">"{t.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
