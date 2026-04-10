import { useState } from "react";
import { motion } from "framer-motion";
import { Bike, MapPin, Clock, Calendar, ArrowRight, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import HomeFooter from "@/components/home/HomeFooter";
import PopUpContato01 from "@/components/PopUpContato01";
import AnimatedBackground from "@/components/home/AnimatedBackground";

const TestRide = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState<string | undefined>();

  const handleSchedule = () => {
    setContactSubject("Gostaria de agendar um test-ride");
    setContactOpen(true);
  };

  return (
    <div className="min-h-screen relative" style={{ background: "hsl(0 0% 4%)" }}>
      <AnimatedBackground />

      <div className="relative z-10">
        <Header onContactClick={() => setContactOpen(true)} />

        <section className="pt-28 md:pt-36 pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-14 md:mb-20"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary) / 0.12), hsl(var(--primary) / 0.06))",
                  border: "1px solid hsl(var(--primary) / 0.15)",
                }}
              >
                <Bike className="w-6 h-6 text-primary" />
              </motion.div>

              <h1 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-primary-foreground uppercase tracking-tight mb-4">
                Agende seu{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
                >
                  Test-Ride
                </span>
              </h1>
              <p className="text-base md:text-lg text-primary-foreground/45 max-w-xl mx-auto">
                Experimente antes de decidir. Conheça de perto a qualidade, o conforto e a performance dos nossos veículos.
              </p>
            </motion.div>

            {/* Steps */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
              {[
                {
                  icon: Calendar,
                  step: "01",
                  title: "Escolha o modelo",
                  desc: "Navegue pelo catálogo e selecione o veículo que você quer experimentar.",
                },
                {
                  icon: MessageCircle,
                  step: "02",
                  title: "Entre em contato",
                  desc: "Fale com nosso time pelo WhatsApp e agende o melhor horário para você.",
                },
                {
                  icon: Bike,
                  step: "03",
                  title: "Venha pilotar",
                  desc: "Visite nossa loja em Uberlândia e experimente o veículo ao vivo.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="group rounded-2xl p-6 md:p-8 text-center relative overflow-hidden transition-all duration-500 hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(145deg, hsl(0 0% 100% / 0.03) 0%, hsl(0 0% 100% / 0.01) 100%)",
                    border: "1px solid hsl(0 0% 100% / 0.06)",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(var(--primary) / 0.06) 0%, transparent 70%)" }}
                  />
                  <span
                    className="font-display font-black text-4xl bg-clip-text text-transparent block mb-4 relative z-10"
                    style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.1))" }}
                  >
                    {item.step}
                  </span>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4 relative z-10"
                    style={{
                      background: "hsl(var(--primary) / 0.1)",
                      border: "1px solid hsl(var(--primary) / 0.15)",
                    }}
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-primary-foreground/90 uppercase tracking-wide mb-2 relative z-10">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-primary-foreground/40 leading-relaxed relative z-10">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Location + CTA */}
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Location */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl p-6 md:p-8"
                style={{
                  background: "linear-gradient(145deg, hsl(0 0% 100% / 0.03) 0%, hsl(0 0% 100% / 0.01) 100%)",
                  border: "1px solid hsl(0 0% 100% / 0.06)",
                }}
              >
                <h3 className="font-display font-bold text-sm text-primary-foreground uppercase tracking-wide mb-5 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Onde estamos
                </h3>
                <div className="space-y-3">
                  <p className="text-sm text-primary-foreground/60">
                    Av. João Pinheiro, 3747<br />
                    Brasil — Uberlândia, MG<br />
                    CEP 38400-714
                  </p>
                  <div className="flex items-center gap-2 text-sm text-primary-foreground/40">
                    <Clock className="w-3.5 h-3.5 text-primary/60" />
                    Seg–Sex: 9h às 18h | Sáb: 9h às 12h
                  </div>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl p-6 md:p-8 flex flex-col justify-center items-center text-center relative overflow-hidden"
                style={{
                  background: "hsl(var(--primary) / 0.04)",
                  border: "1px solid hsl(var(--primary) / 0.15)",
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 80%, hsl(var(--primary) / 0.06) 0%, transparent 70%)" }}
                />
                <h3 className="font-display font-bold text-lg text-primary-foreground uppercase tracking-wide mb-3 relative z-10">
                  Pronto para experimentar?
                </h3>
                <p className="text-sm text-primary-foreground/40 mb-6 relative z-10">
                  Agende seu test-ride pelo WhatsApp.
                </p>
                <button
                  onClick={handleSchedule}
                  className="relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                    boxShadow: "0 8px 24px -6px hsl(var(--primary) / 0.4)",
                  }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.33 0-4.49-.744-6.255-2.01l-.438-.328-3.205 1.074 1.074-3.205-.328-.438A9.71 9.71 0 012.25 12 9.75 9.75 0 0112 2.25 9.75 9.75 0 0121.75 12 9.75 9.75 0 0112 21.75z" />
                  </svg>
                  Agendar test-ride
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        <HomeFooter
          onContactClick={() => setContactOpen(true)}
          onSupportClick={(s) => { setContactSubject(s); setContactOpen(true); }}
        />
      </div>

      <PopUpContato01
        isOpen={contactOpen}
        onClose={() => { setContactOpen(false); setContactSubject(undefined); }}
        initialSubject={contactSubject}
      />
    </div>
  );
};

export default TestRide;
