import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Shield, Award, Leaf, Zap, Globe, Users, MapPin, Truck,
  ChevronRight, Building2, Handshake, TrendingUp, BadgeCheck,
  Lightbulb, HeartHandshake, Target, ArrowRight, CheckCircle2,
} from "lucide-react";
import Header from "@/components/Header";
import HomeFooter from "@/components/home/HomeFooter";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PopUpContato01 from "@/components/PopUpContato01";
import AnimatedBackground from "@/components/home/AnimatedBackground";
import { Link } from "react-router-dom";

/* ─── animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

/* ─── section wrapper ─── */
function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`relative py-20 md:py-28 ${className}`}>
      <div className="container mx-auto px-4 relative z-10">{children}</div>
    </section>
  );
}

/* ─── label component ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full mb-6"
      style={{
        background: "hsl(var(--primary) / 0.08)",
        color: "hsl(var(--primary))",
        border: "1px solid hsl(var(--primary) / 0.15)",
      }}>
      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      {children}
    </span>
  );
}

/* ─── divider ─── */
function Divider() {
  return (
    <div className="container mx-auto px-4">
      <div className="h-[1px]" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.2), transparent)" }} />
    </div>
  );
}

/* ─── data ─── */
const IMPORTANCE_CARDS = [
  { icon: Shield, title: "Seriedade comprovada", text: "A associação reforça a imagem de uma marca conectada a um ecossistema relevante e reconhecido nacionalmente." },
  { icon: Handshake, title: "Conexão institucional", text: "Estar presente nesse ambiente fortalece o posicionamento da MS Eletric dentro do setor e amplia sua leitura institucional." },
  { icon: TrendingUp, title: "Alinhamento setorial", text: "A marca se conecta com um mercado em evolução e com uma agenda cada vez mais importante para o país." },
  { icon: Lightbulb, title: "Conexão com inovação", text: "A associação reforça a proximidade da marca com tecnologia, transformação e novas soluções de mobilidade." },
  { icon: Leaf, title: "Sustentabilidade real", text: "Esse vínculo também conversa com uma visão mais consciente de futuro e com escolhas mais eficientes para o presente." },
  { icon: Building2, title: "Posicionamento de mercado", text: "A presença na ABVE ajuda a consolidar a MS Eletric como uma marca que participa ativamente do avanço da eletromobilidade no Brasil." },
];

const PILLARS = [
  { icon: BadgeCheck, title: "Credibilidade setorial", desc: "A associação fortalece a imagem de uma empresa alinhada ao desenvolvimento da mobilidade elétrica no Brasil." },
  { icon: Lightbulb, title: "Alinhamento com inovação", desc: "A marca se posiciona ao lado de um ecossistema que discute e impulsiona a evolução do setor." },
  { icon: Leaf, title: "Compromisso com sustentabilidade", desc: "Esse vínculo também comunica uma visão mais consciente de futuro e de mobilidade." },
  { icon: Globe, title: "Ecossistema da eletromobilidade", desc: "Integrar esse ambiente reforça a presença da marca dentro de um mercado em expansão." },
  { icon: Shield, title: "Fortalecimento institucional", desc: "A página ajuda a mostrar que a marca participa de uma estrutura mais ampla e mais madura dentro do setor." },
  { icon: HeartHandshake, title: "Confiança para o cliente", desc: "Quando a marca se conecta a um ecossistema reconhecido, isso também gera mais segurança para quem está escolhendo." },
];

const VALUES_CONNECT = [
  { icon: Zap, label: "Inovação", text: "Fazer parte desse ambiente fortalece uma visão de futuro que sempre esteve presente na identidade da marca." },
  { icon: Leaf, label: "Sustentabilidade", text: "A mobilidade elétrica propõe uma evolução mais consciente e essa associação reforça esse compromisso." },
  { icon: Users, label: "Atendimento consultivo", text: "A participação nesse setor amplia a responsabilidade da marca em orientar bem e construir uma experiência segura para o cliente." },
  { icon: TrendingUp, label: "Evolução contínua", text: "O mercado cresce, a tecnologia avança e a marca acompanha esse movimento com visão de longo prazo." },
];

const STRUCTURE_ITEMS = [
  { icon: MapPin, title: "Base em Uberlândia", text: "A marca conta com operação física em Uberlândia, reforçando proximidade, presença e atendimento real." },
  { icon: Building2, title: "Revendas", text: "A estrutura também inclui pontos parceiros que ampliam a presença da marca em outros mercados." },
  { icon: Globe, title: "Atendimento online", text: "Além da presença física, a MS Eletric também atende online com alcance nacional." },
  { icon: Truck, title: "Entrega imediata", text: "A operação foi estruturada para dar mais agilidade e praticidade ao processo comercial." },
];

/* ═══════════════════════════════════════════════════════════════ */
export default function ABVE() {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState<string | undefined>();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <div className="min-h-screen relative" style={{ background: "hsl(0 0% 4%)" }}>
      <AnimatedBackground />
      <div className="relative z-10">
        <Header onContactClick={() => setContactOpen(true)} />

        {/* ══════════════════════════════════════════════════════════
            1 · HERO
        ══════════════════════════════════════════════════════════ */}
        <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden">
          {/* Ambient glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.07) 0%, transparent 60%)", filter: "blur(120px)" }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none"
            style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.04) 0%, transparent 70%)", filter: "blur(80px)" }} />

          <motion.div style={{ opacity: heroOpacity }} className="container mx-auto px-4 pt-32 pb-20 relative z-10">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
              <motion.div variants={fadeUp}>
                <SectionLabel>Associação ABVE</SectionLabel>
              </motion.div>

              <motion.h1 variants={fadeUp} custom={1}
                className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-primary-foreground uppercase tracking-tight leading-[0.92] mb-8">
                Parte do ecossistema{" "}
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                  oficial
                </span>{" "}
                da mobilidade elétrica no Brasil
              </motion.h1>

              <motion.p variants={fadeUp} custom={2}
                className="text-primary-foreground/70 text-lg md:text-xl leading-relaxed max-w-3xl mb-6">
                A MS Eletric integra a Associação Brasileira do Veículo Elétrico, uma entidade que reúne empresas, marcas e iniciativas comprometidas com o avanço da mobilidade elétrica no país. Para a marca, essa associação reforça um posicionamento já presente no seu dia a dia: tecnologia aplicada, visão de futuro e compromisso com uma mobilidade mais inteligente.
              </motion.p>

              <motion.p variants={fadeUp} custom={3}
                className="text-primary-foreground/40 text-base leading-relaxed max-w-2xl mb-10">
                Mais do que um reconhecimento institucional, essa conexão fortalece a presença da MS Eletric dentro de um setor em transformação e reforça sua relação com inovação, sustentabilidade e experiência real de mercado.
              </motion.p>

              <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-6">
                {[
                  { label: "Credibilidade setorial", icon: BadgeCheck },
                  { label: "Visão de futuro", icon: Lightbulb },
                  { label: "Sustentabilidade real", icon: Leaf },
                  { label: "Crescimento no setor", icon: Globe },
                ].map(({ label, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-2.5 text-primary-foreground/50 text-sm">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.15)" }}>
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    {label}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{ background: "linear-gradient(to top, hsl(0 0% 4%), transparent)" }} />
        </section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════
            2 · O QUE É A ABVE
        ══════════════════════════════════════════════════════════ */}
        <Section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div variants={fadeUp}><SectionLabel>Sobre a ABVE</SectionLabel></motion.div>
              <motion.h2 variants={fadeUp} custom={1}
                className="font-display font-black text-3xl md:text-5xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-8">
                A voz da{" "}
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                  eletromobilidade
                </span>{" "}
                no Brasil
              </motion.h2>
              <motion.div variants={fadeUp} custom={2} className="space-y-5 text-primary-foreground/55 text-[15px] leading-[1.8]">
                <p>
                  A ABVE é uma entidade que reúne empresas, marcas e iniciativas ligadas ao desenvolvimento da mobilidade elétrica no Brasil. Seu papel é acompanhar o avanço do setor, ampliar o diálogo sobre o tema e fortalecer um ecossistema que conecta tecnologia, inovação e futuro.
                </p>
                <p>
                  Ao fazer parte desse ambiente, a MS Eletric reforça sua conexão com um movimento maior, que acompanha a evolução da eletromobilidade e ajuda a consolidar esse mercado no país.
                </p>
                <p>
                  Essa associação também amplia a percepção de solidez da marca, mostrando que a MS Eletric não atua de forma isolada, mas integrada a um setor que cresce, se organiza e se fortalece a cada ano.
                </p>
              </motion.div>
            </div>

            <motion.div variants={fadeUp} custom={3} className="relative">
              <div className="rounded-2xl overflow-hidden relative"
                style={{
                  background: "linear-gradient(145deg, hsl(0 0% 100% / 0.03), hsl(0 0% 100% / 0.01))",
                  border: "1px solid hsl(0 0% 100% / 0.06)",
                  boxShadow: "0 40px 80px -20px hsl(0 0% 0% / 0.5)",
                }}>
                <div className="aspect-square flex items-center justify-center p-12 md:p-16 relative">
                  <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, hsl(var(--primary) / 0.06) 0%, transparent 70%)" }} />
                  <div className="text-center relative z-10">
                    <img
                      src="https://abve.org.br/wp-content/uploads/2024/03/Ms-eletric.png"
                      alt="MS Eletric — Associada ABVE"
                      className="w-40 md:w-56 mx-auto mb-8 drop-shadow-lg"
                      loading="lazy"
                    />
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3"
                      style={{ background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.2)" }}>
                      <Award className="w-4 h-4 text-primary" />
                      <span className="text-xs uppercase tracking-[0.15em] text-primary font-semibold">Membro oficial</span>
                    </div>
                    <p className="text-primary-foreground/40 text-sm">Associada à Associação Brasileira do Veículo Elétrico</p>
                  </div>
                </div>
              </div>
              {/* Glow behind */}
              <div className="absolute -inset-4 -z-10 rounded-3xl pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />
            </motion.div>
          </motion.div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════
            3 · POR QUE ISSO IMPORTA
        ══════════════════════════════════════════════════════════ */}
        <Section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
            className="max-w-4xl mx-auto text-center mb-14">
            <motion.div variants={fadeUp}><SectionLabel>Relevância</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} custom={1}
              className="font-display font-black text-3xl md:text-5xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-6">
              Por que essa associação{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                importa
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2}
              className="text-primary-foreground/50 text-[15px] leading-relaxed max-w-2xl mx-auto">
              Para uma marca que trabalha com mobilidade elétrica de forma prática e próxima do cliente, fazer parte da ABVE reforça credibilidade, conexão com o setor e alinhamento com o futuro da mobilidade no Brasil.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {IMPORTANCE_CARDS.map((item, i) => {
              const isHovered = hoveredCard === i;
              return (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i * 0.5}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group"
                >
                  <div
                    className="h-full rounded-xl overflow-hidden transition-all duration-300 p-5 relative"
                    style={{
                      background: "hsl(0 0% 100% / 0.025)",
                      border: `1px solid ${isHovered ? "hsl(var(--primary) / 0.25)" : "hsl(0 0% 100% / 0.06)"}`,
                      transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                      boxShadow: isHovered ? "0 20px 50px -15px hsl(var(--primary) / 0.12)" : "none",
                    }}
                  >
                    {/* Hover glow overlay */}
                    <div className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-500"
                      style={{
                        background: "radial-gradient(ellipse at 30% 20%, hsl(var(--primary) / 0.06) 0%, transparent 70%)",
                        opacity: isHovered ? 1 : 0,
                      }} />

                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500"
                      style={{ background: `linear-gradient(90deg, transparent, hsl(var(--primary) / ${isHovered ? 0.6 : 0.05}), transparent)` }} />

                    <div className="relative">
                      <motion.div
                        className="w-11 h-11 rounded-lg flex items-center justify-center mb-5 relative"
                        style={{ background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.12)" }}
                        animate={isHovered ? { scale: 1.08, rotate: 3 } : { scale: 1, rotate: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <div className="absolute inset-0 rounded-lg transition-opacity duration-500"
                          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)", filter: "blur(6px)", opacity: isHovered ? 1 : 0 }} />
                        <item.icon className="w-5 h-5 relative z-10 text-primary" />
                      </motion.div>

                      <h3 className="font-display font-bold text-[13px] text-primary-foreground/85 uppercase tracking-[0.12em] mb-3">
                        {item.title}
                      </h3>

                      <div className="h-px mb-4 transition-all duration-500"
                        style={{ background: `linear-gradient(90deg, hsl(var(--primary) / ${isHovered ? 0.4 : 0.1}), transparent)`, width: isHovered ? "80%" : "40%" }} />

                      <p className="text-primary-foreground/35 text-xs leading-relaxed group-hover:text-primary-foreground/50 transition-colors duration-300">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════
            4 · MS ELETRIC E O FUTURO DA MOBILIDADE
        ══════════════════════════════════════════════════════════ */}
        <Section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
            className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <motion.div variants={fadeUp}><SectionLabel>Visão de futuro</SectionLabel></motion.div>
              <motion.h2 variants={fadeUp} custom={1}
                className="font-display font-black text-3xl md:text-5xl text-primary-foreground uppercase tracking-tight leading-[0.95]">
                MS Eletric e o futuro da{" "}
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                  mobilidade
                </span>
              </motion.h2>
            </div>

            <motion.div variants={fadeUp} custom={2} className="space-y-5 text-primary-foreground/55 text-[15px] leading-[1.8]">
              <p>
                A MS Eletric acredita que a mobilidade elétrica já faz parte do presente. E participar de um ecossistema como o da ABVE reforça esse entendimento de forma institucional, aproximando a marca de discussões, movimentos e iniciativas que acompanham a transformação do setor.
              </p>
              <p>
                Mais do que acompanhar tendências, a marca busca traduzir inovação em experiência real, aproximando o público de soluções que fazem sentido no dia a dia e tornando a eletromobilidade mais clara, mais próxima e mais acessível.
              </p>
            </motion.div>

            {/* Quote */}
            <motion.blockquote variants={fadeUp} custom={3}
              className="mt-10 pl-6 relative"
              style={{ borderLeft: "3px solid hsl(var(--primary) / 0.5)" }}>
              <p className="text-primary-foreground/70 text-lg md:text-xl font-medium italic leading-relaxed">
                "Fazer parte desse setor de forma ativa ajuda a marca a crescer com mais visão, mais consistência e mais conexão com o que realmente importa no futuro da mobilidade."
              </p>
            </motion.blockquote>
          </motion.div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════
            5 · POSICIONAMENTO INSTITUCIONAL
        ══════════════════════════════════════════════════════════ */}
        <Section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.div variants={fadeUp}><SectionLabel>Posicionamento</SectionLabel></motion.div>
              <motion.h2 variants={fadeUp} custom={1}
                className="font-display font-black text-3xl md:text-5xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-8">
                Mobilidade elétrica com{" "}
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                  propósito
                </span>
              </motion.h2>
              <motion.div variants={fadeUp} custom={2} className="space-y-5 text-primary-foreground/55 text-[15px] leading-[1.8]">
                <p>
                  A MS Eletric nasceu com a proposta de aproximar a mobilidade elétrica da vida real, unindo inovação, tecnologia e experiência prática para diferentes perfis de uso.
                </p>
                <p>
                  Na prática, isso significa trabalhar com soluções que não apenas acompanham uma tendência, mas ajudam a construir uma nova forma de mobilidade, mais eficiente, mais moderna e mais conectada ao que o mercado e o consumidor já começam a buscar.
                </p>
              </motion.div>
            </div>

            <div>
              <motion.div variants={fadeUp} custom={1}><SectionLabel>Excelência</SectionLabel></motion.div>
              <motion.h2 variants={fadeUp} custom={2}
                className="font-display font-black text-3xl md:text-5xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-8">
                Qualidade em cada{" "}
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                  etapa
                </span>
              </motion.h2>
              <motion.div variants={fadeUp} custom={3} className="space-y-5 text-primary-foreground/55 text-[15px] leading-[1.8]">
                <p>
                  Além dos produtos, a marca também constrói valor por meio da experiência que oferece. Atendimento, suporte, orientação e estrutura fazem parte dessa jornada e ajudam a fortalecer a confiança de quem escolhe a MS Eletric.
                </p>
                <p>
                  Essa visão combina com o que a associação à ABVE representa: uma marca que não apenas comercializa soluções elétricas, mas participa de um movimento maior, com maturidade institucional e compromisso com a evolução do setor.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════
            6 · ESTRUTURA E PRESENÇA
        ══════════════════════════════════════════════════════════ */}
        <Section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
            className="text-center mb-14">
            <motion.div variants={fadeUp}><SectionLabel>Estrutura</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} custom={1}
              className="font-display font-black text-3xl md:text-5xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-6">
              Estrutura real,{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                alcance nacional
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2}
              className="text-primary-foreground/50 text-[15px] leading-relaxed max-w-2xl mx-auto">
              A presença da MS Eletric vai além do posicionamento institucional. A marca também fortalece sua credibilidade por meio de estrutura real, atendimento próximo e capacidade de atender diferentes perfis de cliente em diferentes contextos.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto">
            {STRUCTURE_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i * 0.5}
                className="text-center group"
              >
                <div
                  className="h-full rounded-xl overflow-hidden transition-all duration-300 p-6 relative"
                  style={{
                    background: "hsl(0 0% 100% / 0.025)",
                    border: "1px solid hsl(0 0% 100% / 0.06)",
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), transparent)" }} />
                  <div className="w-12 h-12 rounded-xl mx-auto mb-5 flex items-center justify-center"
                    style={{ background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.12)" }}>
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-[13px] text-primary-foreground/85 uppercase tracking-[0.12em] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-primary-foreground/35 text-xs leading-relaxed group-hover:text-primary-foreground/50 transition-colors duration-300">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════
            7 · PILARES
        ══════════════════════════════════════════════════════════ */}
        <Section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
            className="text-center mb-14">
            <motion.div variants={fadeUp}><SectionLabel>Marca</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} custom={1}
              className="font-display font-black text-3xl md:text-5xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-6">
              O que essa associação reforça sobre a{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                marca
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2}
              className="text-primary-foreground/50 text-[15px] leading-relaxed max-w-2xl mx-auto">
              Mais do que um vínculo institucional, a presença da MS Eletric na ABVE reforça atributos que já fazem parte da construção da marca.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i * 0.4}
                className="group"
              >
                <div
                  className="h-full rounded-xl overflow-hidden transition-all duration-300 p-5 relative"
                  style={{
                    background: "hsl(0 0% 100% / 0.025)",
                    border: "1px solid hsl(0 0% 100% / 0.06)",
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), transparent)" }} />
                  <div className="absolute inset-0 pointer-events-none rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "radial-gradient(ellipse at 30% 20%, hsl(var(--primary) / 0.06) 0%, transparent 70%)" }} />
                  <div className="relative">
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-5"
                      style={{ background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.12)" }}>
                      <p.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-[13px] text-primary-foreground/85 uppercase tracking-[0.12em] mb-3">
                      {p.title}
                    </h3>
                    <div className="h-px mb-4 w-[40%] group-hover:w-[80%] transition-all duration-500"
                      style={{ background: "linear-gradient(90deg, hsl(var(--primary) / 0.15), transparent)" }} />
                    <p className="text-primary-foreground/35 text-xs leading-relaxed group-hover:text-primary-foreground/50 transition-colors duration-300">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════
            8 · CONEXÃO COM VALORES
        ══════════════════════════════════════════════════════════ */}
        <Section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
            className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <motion.div variants={fadeUp}><SectionLabel>Valores</SectionLabel></motion.div>
              <motion.h2 variants={fadeUp} custom={1}
                className="font-display font-black text-3xl md:text-5xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-6">
                ABVE e os valores da{" "}
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                  MS Eletric
                </span>
              </motion.h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {VALUES_CONNECT.map((v, i) => (
                <motion.div
                  key={v.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i * 0.5}
                  className="flex gap-4 items-start group"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
                    style={{ background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.15)" }}>
                    <v.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[13px] text-primary-foreground/85 uppercase tracking-[0.12em] mb-2">{v.label}</h3>
                    <p className="text-primary-foreground/40 text-sm leading-relaxed group-hover:text-primary-foreground/55 transition-colors duration-300">{v.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════
            9 · CTA FINAL
        ══════════════════════════════════════════════════════════ */}
        <Section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}
            className="max-w-3xl mx-auto text-center relative">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.06) 0%, transparent 60%)", filter: "blur(80px)" }} />

            <div className="relative z-10">
              <motion.div variants={fadeUp}><SectionLabel>A marca no setor</SectionLabel></motion.div>
              <motion.h2 variants={fadeUp} custom={1}
                className="font-display font-black text-3xl md:text-5xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-6">
                Conheça a marca que faz parte do{" "}
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                  futuro da mobilidade
                </span>
              </motion.h2>

              <motion.p variants={fadeUp} custom={2}
                className="text-primary-foreground/50 text-[15px] leading-relaxed max-w-xl mx-auto mb-10">
                A MS Eletric não atua sozinha. Ela participa de um movimento maior, conectado à evolução do setor, à inovação e ao futuro da mobilidade elétrica no Brasil. Essa associação reforça uma marca que cresce com estrutura, visão e presença real.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/modelos">
                  <motion.button
                    className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 rounded-xl"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                      color: "white",
                      boxShadow: "0 4px 20px hsl(var(--primary) / 0.25)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explorar modelos
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </Link>

                <motion.button
                  onClick={() => setContactOpen(true)}
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 rounded-xl transition-colors duration-300 cursor-pointer"
                  style={{ border: "1px solid hsl(var(--primary) / 0.3)", color: "hsl(0 0% 100% / 0.8)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-primary" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Falar com o time
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </Section>

        <HomeFooter onContactClick={() => setContactOpen(true)} onSupportClick={(s) => { setContactSubject(s); setContactOpen(true); }} />
      </div>

      <FloatingWhatsApp />
      <PopUpContato01 isOpen={contactOpen} onClose={() => { setContactOpen(false); setContactSubject(undefined); }} initialSubject={contactSubject} />
    </div>
  );
}
