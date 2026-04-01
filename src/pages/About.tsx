import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Shield, Sparkles, Users, Eye, Target, Zap, HeartHandshake,
  Leaf, TrendingUp, Store, MessageCircle, ArrowRight, CheckCircle2,
  Lightbulb, Award, MapPin, Clock, Headphones, ChevronRight,
} from "lucide-react";
import Header from "@/components/Header";
import HomeFooter from "@/components/home/HomeFooter";

import PopUpContato01 from "@/components/PopUpContato01";
import AnimatedBackground from "@/components/home/AnimatedBackground";

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

/* ═══════════════════════════════════════════════════════════════ */
export default function About() {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState<string | undefined>();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <div className="min-h-screen relative" style={{ background: "hsl(0 0% 4%)" }}>
      <AnimatedBackground />
      <div className="relative z-10">
        <Header onContactClick={() => setContactOpen(true)} />

        {/* ══════════════════════════════════════════════════════════
            1 · HERO INSTITUCIONAL
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
                <SectionLabel>Sobre a marca</SectionLabel>
              </motion.div>

              <motion.h1 variants={fadeUp} custom={1}
                className="font-display font-black text-3xl md:text-6xl lg:text-7xl text-primary-foreground uppercase tracking-tight leading-[0.92] mb-6 md:mb-8">
                Tecnologia que move.{" "}
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                  Confiança que transforma.
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} custom={2}
                className="text-primary-foreground/70 text-base md:text-xl leading-relaxed max-w-3xl mb-4 md:mb-6">
                A MS Eletric nasceu para aproximar a mobilidade elétrica da vida real. Mais do que oferecer veículos, a marca foi construída para entregar uma experiência completa, com atendimento próximo, orientação consultiva e soluções que fazem sentido para diferentes rotinas de uso.
              </motion.p>

              <motion.p variants={fadeUp} custom={3}
                className="text-primary-foreground/40 text-sm md:text-base leading-relaxed max-w-2xl mb-8 md:mb-10">
                Com operação em Uberlândia, presença física e atendimento online, a MS Eletric une tecnologia, praticidade e confiança para tornar a eletromobilidade mais acessível, mais clara e mais presente no dia a dia de quem busca uma nova forma de se mover.
              </motion.p>

              <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-6">
                {[
                  { label: "Mobilidade elétrica com propósito", icon: Zap },
                  { label: "Atendimento consultivo", icon: HeartHandshake },
                  { label: "Portfólio para diferentes perfis", icon: Store },
                  { label: "Experiência do início ao pós-venda", icon: Shield },
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
            2 · NOSSA HISTÓRIA
        ══════════════════════════════════════════════════════════ */}
        <Section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.div variants={fadeUp}><SectionLabel>Nossa história</SectionLabel></motion.div>
              <motion.h2 variants={fadeUp} custom={1}
                className="font-display font-black text-3xl md:text-5xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-8">
                De Uberlândia para o{" "}
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                  futuro da mobilidade
                </span>
              </motion.h2>
              <motion.div variants={fadeUp} custom={2} className="space-y-5 text-primary-foreground/55 text-[15px] leading-[1.8]">
                <p>
                  A MS Eletric entra no mercado com uma proposta clara: tornar a mobilidade elétrica mais próxima, mais prática e mais confiável para quem busca inovação sem abrir mão de atendimento, suporte e segurança na escolha.
                </p>
                <p>
                  Desde o início, a marca foi pensada para ir além da simples exposição de produtos. A ideia sempre foi construir uma experiência mais completa, em que o cliente possa entender melhor cada categoria, comparar modelos, tirar dúvidas com clareza e encontrar uma solução que realmente combine com sua rotina.
                </p>
                <p>
                  Com showroom físico em Uberlândia e operação preparada para atender também online, a MS Eletric conecta presença real, tecnologia e atendimento consultivo em uma jornada de compra mais próxima e mais segura.
                </p>
                <p>
                  Esse posicionamento faz com que a marca não seja percebida apenas como uma loja de veículos elétricos, mas como uma empresa que acompanha a evolução da mobilidade e ajuda a traduzi-la para a vida prática das pessoas e das empresas.
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
                <div className="aspect-video relative">
                  <iframe
                    src="https://www.youtube.com/embed/ml6ODnWanys?rel=0&modestbranding=1"
                    title="Showroom MS Eletric"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[11px] text-primary-foreground/40 uppercase tracking-wider font-semibold">
                    Conheça nosso showroom em Uberlândia – MG
                  </p>
                </div>
              </div>
              {/* Glow behind video */}
              <div className="absolute -inset-4 -z-10 rounded-3xl pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />
            </motion.div>
          </motion.div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════
            3 · POSICIONAMENTO
        ══════════════════════════════════════════════════════════ */}
        <Section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
            className="max-w-4xl mx-auto text-center">
            <motion.div variants={fadeUp}><SectionLabel>Nosso posicionamento</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} custom={1}
              className="font-display font-black text-3xl md:text-5xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-8">
              Mais do que veículos elétricos.{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                Uma nova forma de se mover.
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-primary-foreground/55 text-[15px] leading-[1.8] mb-6">
              A MS Eletric acredita que mobilidade elétrica não se resume a ficha técnica. Ela envolve rotina, contexto de uso, confiança na decisão e suporte ao longo da jornada. Por isso, a marca se posiciona como uma ponte entre inovação e experiência real.
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="text-primary-foreground/40 text-[14px] leading-[1.8]">
              Nosso papel é tornar essa transição mais simples, mais clara e mais segura para quem quer entrar no universo elétrico com a sensação de que está fazendo uma escolha bem orientada.
            </motion.p>
          </motion.div>

          {/* Positioning pillars */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
            {[
              {
                icon: Lightbulb, title: "Tecnologia com propósito",
                desc: "Acreditamos em inovação aplicada ao cotidiano. Tecnologia, para nós, precisa resolver, facilitar e melhorar a experiência de quem usa.",
              },
              {
                icon: HeartHandshake, title: "Qualidade com visão de futuro",
                desc: "Trabalhamos com soluções que acompanham a evolução da mobilidade e respondem a um mercado que busca mais eficiência, praticidade e consciência.",
              },
              {
                icon: Shield, title: "Uma experiência que acompanha você",
                desc: "Da primeira conversa ao pós-venda, a experiência com a MS Eletric é pensada para gerar segurança, clareza e confiança em cada etapa.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} variants={fadeUp} custom={i}
                className="rounded-xl p-7 relative overflow-hidden group"
                style={{
                  background: "linear-gradient(145deg, hsl(0 0% 100% / 0.03), hsl(0 0% 100% / 0.01))",
                  border: "1px solid hsl(0 0% 100% / 0.06)",
                }}>
                <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                  style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.04) 0%, transparent 70%)" }} />
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                  style={{ background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.2)" }}>
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-primary-foreground/90 text-base mb-3">{title}</h3>
                <p className="text-primary-foreground/45 text-[13px] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════
            4 · MISSÃO, VISÃO E VALORES
        ══════════════════════════════════════════════════════════ */}
        <Section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
            className="text-center mb-16">
            <motion.div variants={fadeUp}><SectionLabel>Nossos fundamentos</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} custom={1}
              className="font-display font-black text-3xl md:text-5xl text-primary-foreground uppercase tracking-tight leading-[0.95]">
              Os alicerces que sustentam{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                cada decisão
              </span>
            </motion.h2>
          </motion.div>

          {/* Mission & Vision */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-5xl mx-auto">
            {[
              {
                icon: Target, label: "Missão",
                text: "Tornar a mobilidade elétrica mais prática, acessível, confiável e presente na vida das pessoas e das empresas, conectando tecnologia, atendimento e experiência em uma jornada de compra mais clara e mais segura.",
              },
              {
                icon: Eye, label: "Visão",
                text: "Ser referência em mobilidade elétrica não apenas pelos produtos que oferecemos, mas pela forma como orientamos, atendemos e construímos valor em cada ponto de contato com o cliente.",
              },
            ].map(({ icon: Icon, label, text }, i) => (
              <motion.div key={label} variants={fadeUp} custom={i}
                className="rounded-xl p-8 relative overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, hsl(0 0% 100% / 0.03), hsl(0 0% 100% / 0.01))",
                  border: "1px solid hsl(0 0% 100% / 0.06)",
                }}>
                <div className="absolute top-0 left-0 w-full h-[2px]"
                  style={{ background: "linear-gradient(90deg, hsl(var(--primary) / 0.5), transparent)" }} />
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.2)" }}>
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-black text-primary-foreground/90 uppercase tracking-wider text-sm">{label}</h3>
                </div>
                <p className="text-primary-foreground/50 text-[14px] leading-[1.8]">{text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Values */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
            className="max-w-5xl mx-auto">
            <motion.h3 variants={fadeUp}
              className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-8 flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-primary/30" />Valores que guiam a marca<span className="w-8 h-[1px] bg-primary/30" />
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: Sparkles, title: "Inovação com aplicação real", desc: "A tecnologia precisa fazer sentido no cotidiano. Inovar é aproximar o futuro de uma experiência concreta e útil." },
                { icon: HeartHandshake, title: "Atendimento consultivo", desc: "Cada cliente tem uma necessidade diferente. Escutar, orientar e recomendar com clareza faz parte da essência da marca." },
                { icon: Shield, title: "Confiança em cada etapa", desc: "Queremos construir relações sustentadas por transparência, suporte e segurança do primeiro contato ao pós-venda." },
                { icon: Award, title: "Excelência na experiência", desc: "Cada detalhe importa. A forma como recebemos, apresentamos e acompanhamos o cliente também comunica o que a marca é." },
                { icon: TrendingUp, title: "Evolução contínua", desc: "O mercado muda, a mobilidade evolui e o comportamento do consumidor acompanha esse movimento. Crescer com consistência faz parte do nosso caminho." },
                { icon: Lightbulb, title: "Visão de futuro", desc: "Acreditamos em uma mobilidade mais inteligente, mais eficiente e cada vez mais integrada à vida real das pessoas e das empresas." },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div key={title} variants={fadeUp} custom={i}
                  className="flex gap-4 p-5 rounded-xl group hover:bg-primary-foreground/[0.02] transition-colors duration-300"
                  style={{ border: "1px solid hsl(0 0% 100% / 0.04)" }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "hsl(var(--primary) / 0.08)", border: "1px solid hsl(var(--primary) / 0.12)" }}>
                    <Icon className="w-4 h-4 text-primary/80 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-foreground/85 text-[13px] mb-1.5">{title}</h4>
                    <p className="text-primary-foreground/40 text-[12px] leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════
            5 · DIFERENCIAIS DA MARCA
        ══════════════════════════════════════════════════════════ */}
        <Section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.div variants={fadeUp}><SectionLabel>Diferenciais da marca</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} custom={1}
              className="font-display font-black text-3xl md:text-5xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-6 max-w-3xl">
              O que nos torna{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                diferentes de verdade
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2}
              className="text-primary-foreground/45 text-[15px] leading-[1.8] max-w-2xl mb-14">
              A MS Eletric busca construir uma experiência que vá além da venda. Nosso diferencial está em unir portfólio, atendimento, presença física e suporte em uma jornada que ajuda o cliente a escolher melhor e comprar com mais confiança.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: HeartHandshake, title: "Atendimento que orienta de verdade",
                desc: "Mais do que apresentar modelos, buscamos entender a necessidade de cada cliente para indicar a solução mais adequada ao seu perfil.",
              },
              {
                icon: Store, title: "Showroom que aproxima",
                desc: "Ver os modelos de perto, comparar categorias e entender melhor o produto faz diferença. A experiência presencial reforça segurança e confiança na decisão.",
              },
              {
                icon: Zap, title: "Portfólio para diferentes necessidades",
                desc: "Da mobilidade urbana ao uso profissional, a marca reúne opções para diferentes rotinas, objetivos e contextos de uso.",
              },
              {
                icon: Shield, title: "Suporte ao longo da jornada",
                desc: "A relação com o cliente não termina na escolha do modelo. O acompanhamento continua com suporte, orientação e proximidade.",
              },
              {
                icon: CheckCircle2, title: "Experiência de compra mais clara",
                desc: "Nosso objetivo é tornar a decisão menos confusa e mais segura, com comunicação clara e atendimento preparado para explicar cada etapa.",
              },
              {
                icon: Users, title: "Presença real que gera confiança",
                desc: "Ter estrutura física, operação organizada e atendimento próximo fortalece a credibilidade da marca e da experiência oferecida.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} variants={fadeUp} custom={i}
                className="rounded-xl p-7 relative overflow-hidden group"
                style={{
                  background: "linear-gradient(145deg, hsl(0 0% 100% / 0.025), hsl(0 0% 100% / 0.008))",
                  border: "1px solid hsl(0 0% 100% / 0.06)",
                }}>
                <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 70%)" }} />
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.15)" }}>
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-foreground/90 text-[15px] mb-2">{title}</h3>
                    <p className="text-primary-foreground/45 text-[13px] leading-[1.75]">{desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════
            6 · SHOWROOM E EXPERIÊNCIA PRESENCIAL
        ══════════════════════════════════════════════════════════ */}
        <Section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
            className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <motion.div variants={fadeUp}><SectionLabel>Showroom MS Eletric</SectionLabel></motion.div>
              <motion.h2 variants={fadeUp} custom={1}
                className="font-display font-black text-3xl md:text-5xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-6">
                Um espaço para{" "}
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                  vivenciar a mobilidade elétrica
                </span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2}
                className="text-primary-foreground/50 text-[15px] leading-[1.8] max-w-3xl mx-auto mb-4">
                O showroom da MS Eletric foi pensado para transformar curiosidade em experiência real. É nesse espaço que o cliente pode conhecer melhor os modelos, perceber diferenças entre categorias, entender propostas de uso e se sentir mais seguro para escolher.
              </motion.p>
              <motion.p variants={fadeUp} custom={3}
                className="text-primary-foreground/40 text-[14px] leading-[1.8] max-w-3xl mx-auto">
                Mais do que um ponto de venda, esse ambiente reforça um dos pilares da marca: tornar a mobilidade elétrica próxima, acessível e tangível para quem quer enxergar essa mudança de perto.
              </motion.p>
            </div>

            <motion.div variants={fadeUp} custom={4}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Eye, title: "Ver de perto faz diferença", desc: "A experiência presencial ajuda o cliente a comparar e entender melhor o que faz sentido para sua rotina." },
                { icon: Users, title: "Atendimento próximo e consultivo", desc: "O showroom amplia a qualidade da conversa e torna o processo de escolha mais claro e mais confiante." },
                { icon: Zap, title: "Portfólio organizado por proposta de uso", desc: "A apresentação dos modelos ajuda a traduzir melhor as diferenças entre categorias, estilos e objetivos." },
                { icon: Shield, title: "Estrutura que reforça credibilidade", desc: "A presença física fortalece a percepção de marca séria, preparada e conectada a uma experiência real." },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div key={title} variants={fadeUp} custom={i}
                  className="rounded-xl p-6 text-center relative overflow-hidden"
                  style={{
                    background: "linear-gradient(145deg, hsl(0 0% 100% / 0.025), hsl(0 0% 100% / 0.008))",
                    border: "1px solid hsl(0 0% 100% / 0.06)",
                  }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.15)" }}>
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-primary-foreground/85 text-[13px] mb-2">{title}</h3>
                  <p className="text-primary-foreground/40 text-[12px] leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Location highlight */}
            <motion.div variants={fadeUp} custom={5}
              className="mt-10 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary) / 0.06), hsl(var(--primary) / 0.02))",
                border: "1px solid hsl(var(--primary) / 0.12)",
              }}>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-primary-foreground/80 text-sm font-semibold">Showroom em Uberlândia</p>
                  <p className="text-primary-foreground/40 text-[12px]">Av. João Pinheiro, 3747, Bairro Brasil, Uberlândia, MG</p>
                </div>
              </div>
              <a href="https://maps.google.com/?q=Av.+João+Pinheiro,+3747,+Bairro+Brasil,+Uberlândia,+MG" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-[11px] font-semibold uppercase tracking-wider text-primary-foreground cursor-pointer shrink-0"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                Ver no mapa <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </motion.div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════
            7 · PARA QUEM A MS ELETRIC EXISTE
        ══════════════════════════════════════════════════════════ */}
        <Section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
            className="text-center mb-14">
            <motion.div variants={fadeUp}><SectionLabel>Para quem existimos</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} custom={1}
              className="font-display font-black text-3xl md:text-5xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-6">
              Mobilidade elétrica para{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                todos os perfis
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2}
              className="text-primary-foreground/50 text-[15px] leading-[1.8] max-w-3xl mx-auto">
              A MS Eletric atende diferentes formas de uso porque a mobilidade elétrica já não se limita a um único perfil. O que muda é a necessidade de cada cliente. O que permanece é o compromisso da marca com orientação, suporte e experiência.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { title: "Mobilidade urbana", desc: "Para quem busca mais praticidade, economia e agilidade no dia a dia da cidade." },
              { title: "Lazer e estilo de vida", desc: "Para quem quer unir mobilidade, liberdade e experiências mais leves fora da lógica tradicional." },
              { title: "Uso profissional", desc: "Para operações e atividades que exigem praticidade, eficiência e aplicação real no cotidiano." },
              { title: "Primeira experiência no universo elétrico", desc: "Para quem está entrando nesse mercado agora e precisa de clareza para entender melhor as opções." },
              { title: "Portfólio completo e flexível", desc: "A variedade de categorias permite atender rotinas, expectativas e necessidades diferentes com mais precisão." },
              { title: "Escolhas mais bem orientadas", desc: "Nosso papel é ajudar cada cliente a encontrar o modelo certo para o seu contexto, sem indicação genérica." },
            ].map(({ title, desc }, i) => (
              <motion.div key={title} variants={fadeUp} custom={i}
                className="rounded-xl p-6 group hover:bg-primary-foreground/[0.02] transition-colors duration-300"
                style={{ border: "1px solid hsl(0 0% 100% / 0.05)" }}>
                <div className="w-2 h-2 rounded-full bg-primary/60 mb-4 group-hover:bg-primary group-hover:shadow-[0_0_10px_hsl(var(--primary)/0.4)] transition-all" />
                <h3 className="font-bold text-primary-foreground/85 text-[14px] mb-2">{title}</h3>
                <p className="text-primary-foreground/40 text-[12px] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════
            8 · COMPROMISSO COM O FUTURO
        ══════════════════════════════════════════════════════════ */}
        <Section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
            className="max-w-4xl mx-auto">
            <motion.div variants={fadeUp}><SectionLabel>Visão de futuro</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} custom={1}
              className="font-display font-black text-3xl md:text-5xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-8">
              Construindo o futuro da{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                mobilidade no Brasil
              </span>
            </motion.h2>
            <motion.div variants={fadeUp} custom={2} className="space-y-5 text-primary-foreground/55 text-[15px] leading-[1.8]">
              <p>
                A mobilidade está mudando e a MS Eletric acredita que essa mudança precisa ser vivida de forma prática, acessível e bem acompanhada. O avanço do setor não depende apenas de tecnologia. Ele também depende de marcas capazes de traduzir inovação em experiência real.
              </p>
              <p>
                Por isso, nosso compromisso é aproximar a eletromobilidade das pessoas e das empresas com mais clareza, mais suporte e mais confiança. Queremos participar ativamente dessa transformação, ajudando a tornar esse novo momento cada vez mais presente no cotidiano.
              </p>
            </motion.div>

            {/* Quote */}
            <motion.blockquote variants={fadeUp} custom={3}
              className="mt-10 pl-6 relative"
              style={{ borderLeft: "3px solid hsl(var(--primary) / 0.5)" }}>
              <p className="text-primary-foreground/70 text-lg md:text-xl font-medium italic leading-relaxed">
                "A mobilidade elétrica não é mais apenas uma ideia. É uma resposta cada vez mais real para um futuro mais inteligente, mais leve e conectado ao presente."
              </p>
            </motion.blockquote>
          </motion.div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════
            9 · BLOCO DE CONFIANÇA
        ══════════════════════════════════════════════════════════ */}
        <Section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}
            className="max-w-5xl mx-auto rounded-2xl p-10 md:p-14 relative overflow-hidden"
            style={{
              background: "linear-gradient(145deg, hsl(var(--primary) / 0.06), hsl(var(--primary) / 0.02))",
              border: "1px solid hsl(var(--primary) / 0.12)",
            }}>
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />

            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="font-display font-black text-2xl md:text-4xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-4">
                Por que confiar na MS Eletric
              </h2>
              <p className="text-primary-foreground/50 text-[14px] max-w-2xl mx-auto">
                Cada ponto de contato da marca foi pensado para transmitir clareza, estrutura e confiança.
              </p>
            </motion.div>

            <motion.div variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Headphones, text: "Atendimento próximo e consultivo" },
                { icon: Store, text: "Showroom físico em Uberlândia" },
                { icon: Zap, text: "Portfólio para diferentes perfis" },
                { icon: Shield, text: "Suporte do início ao pós-venda" },
                { icon: Clock, text: "Estrutura real de operação" },
                { icon: CheckCircle2, text: "Experiência mais segura na escolha" },
              ].map(({ icon: Icon, text }, i) => (
                <motion.div key={text} variants={fadeUp} custom={i}
                  className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "hsl(var(--primary) / 0.12)", border: "1px solid hsl(var(--primary) / 0.2)" }}>
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-primary-foreground/75 text-[13px] font-medium">{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════
            10 · CTA FINAL
        ══════════════════════════════════════════════════════════ */}
        <Section className="pb-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}
            className="max-w-3xl mx-auto text-center">
            <motion.h2 variants={fadeUp} custom={1}
              className="font-display font-black text-3xl md:text-5xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-6">
              Sua próxima forma de se mover{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                começa aqui
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2}
              className="text-primary-foreground/50 text-[15px] leading-[1.8] mb-10 max-w-2xl mx-auto">
              Se você quer conhecer melhor a MS Eletric, entender qual modelo faz mais sentido para sua rotina ou viver essa experiência de perto, nosso time está pronto para te atender.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => setContactOpen(true)}
                className="relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-[12px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden group cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                  boxShadow: "0 12px 32px -8px hsl(var(--primary) / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.1)",
                }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(135deg, hsl(var(--primary-glow)), hsl(var(--primary)))" }} />
                <svg className="w-4 h-4 relative z-10" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.33 0-4.49-.744-6.255-2.01l-.438-.328-3.205 1.074 1.074-3.205-.328-.438A9.71 9.71 0 012.25 12 9.75 9.75 0 0112 2.25 9.75 9.75 0 0121.75 12 9.75 9.75 0 0112 21.75z"/></svg>
                <span className="relative z-10">Falar com a MS Eletric</span>
              </button>
              <a href="/modelos"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[12px] font-semibold uppercase tracking-[0.12em] text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                style={{ border: "1px solid hsl(0 0% 100% / 0.1)" }}>
                Conhecer os modelos <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </motion.div>
        </Section>

        <HomeFooter onContactClick={() => setContactOpen(true)} onSupportClick={(s) => { setContactSubject(s); setContactOpen(true); }} />
      </div>
      <PopUpContato01 isOpen={contactOpen} onClose={() => { setContactOpen(false); setContactSubject(undefined); }} initialSubject={contactSubject} />
    </div>
  );
}
