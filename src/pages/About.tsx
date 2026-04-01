import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Shield, Sparkles, Users, Eye, Target, Zap, HeartHandshake,
  Leaf, TrendingUp, Store, MessageCircle, ArrowRight, CheckCircle2,
  Lightbulb, Award, MapPin, Clock, Headphones, ChevronRight,
} from "lucide-react";
import Header from "@/components/Header";
import HomeFooter from "@/components/home/HomeFooter";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
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
                <SectionLabel>Sobre a MS Eletric</SectionLabel>
              </motion.div>

              <motion.h1 variants={fadeUp} custom={1}
                className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-primary-foreground uppercase tracking-tight leading-[0.92] mb-8">
                Tecnologia que move.{" "}
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                  Confiança que transforma.
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} custom={2}
                className="text-primary-foreground/70 text-lg md:text-xl leading-relaxed max-w-3xl mb-6">
                A MS Eletric nasceu da convicção de que a mobilidade elétrica não é uma tendência passageira — é uma mudança definitiva na forma como nos deslocamos, trabalhamos e vivemos. Desde o primeiro dia, nosso propósito foi claro: aproximar as pessoas de soluções elétricas reais, práticas e confiáveis, eliminando a distância entre a tecnologia do futuro e a rotina do presente.
              </motion.p>

              <motion.p variants={fadeUp} custom={3}
                className="text-primary-foreground/40 text-base leading-relaxed max-w-2xl mb-10">
                Com sede em Uberlândia – MG, somos referência em eletromobilidade no Brasil, oferecendo um portfólio completo de veículos elétricos, atendimento consultivo especializado e uma experiência de marca que começa muito antes da compra — e se estende muito além dela.
              </motion.p>

              <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-6">
                {[
                  { label: "Showroom físico", icon: Store },
                  { label: "Atendimento consultivo", icon: HeartHandshake },
                  { label: "Portfólio completo", icon: Zap },
                  { label: "Pós-venda dedicado", icon: Shield },
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
                  A MS Eletric surgiu em um momento em que o mercado brasileiro de mobilidade elétrica ainda era dominado por desconfiança e falta de informação. Enquanto a maioria das pessoas enxergava veículos elétricos como objetos distantes da realidade cotidiana, nós enxergamos uma oportunidade de construir algo diferente: uma marca que transformasse curiosidade em confiança e tecnologia em experiência palpável.
                </p>
                <p>
                  Desde o início, nossa abordagem foi oposta à do mercado convencional. Em vez de vender produtos em vitrines frias e catálogos impessoais, decidimos criar um espaço onde o cliente pudesse ver, tocar, comparar e entender cada modelo antes de tomar qualquer decisão. Esse compromisso com a experiência real deu origem ao nosso showroom em Uberlândia — um espaço que não é apenas um ponto de venda, mas um centro de vivência da eletromobilidade.
                </p>
                <p>
                  Com o passar do tempo, a MS Eletric se consolidou não apenas como uma referência comercial, mas como uma voz ativa na educação do mercado. Nosso time se especializou em entender perfis de uso, recomendar soluções adequadas e acompanhar cada cliente do primeiro contato até muito depois da entrega — porque acreditamos que mobilidade elétrica é uma relação, não uma transação.
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
            <motion.div variants={fadeUp}><SectionLabel>O que nos define</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} custom={1}
              className="font-display font-black text-3xl md:text-5xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-8">
              Mais do que veículos elétricos.{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                Uma nova forma de se mover.
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-primary-foreground/55 text-[15px] leading-[1.8] mb-6">
              A MS Eletric não é uma revenda comum. Somos uma marca construída sobre três pilares que nos diferenciam de tudo o que o mercado oferecia: <strong className="text-primary-foreground/80">tecnologia acessível</strong>, <strong className="text-primary-foreground/80">experiência consultiva</strong> e <strong className="text-primary-foreground/80">compromisso com o cliente</strong>. Acreditamos que a transição para a mobilidade elétrica exige mais do que produtos — exige orientação, confiança e acompanhamento real.
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="text-primary-foreground/40 text-[14px] leading-[1.8]">
              Enquanto outros vendem especificações, nós apresentamos soluções. Enquanto outros entregam produtos, nós construímos relações. A MS Eletric existe para que cada pessoa encontre o veículo elétrico certo para sua rotina — com segurança, clareza e a certeza de que fez a melhor escolha.
            </motion.p>
          </motion.div>

          {/* Positioning pillars */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
            {[
              {
                icon: Lightbulb, title: "Tecnologia com propósito",
                desc: "Cada modelo do nosso portfólio é selecionado por sua aplicação real. Não trabalhamos com tendências vazias — trabalhamos com soluções que funcionam no dia a dia, nas ruas do Brasil, para pessoas reais.",
              },
              {
                icon: HeartHandshake, title: "Experiência consultiva",
                desc: "Nosso time não vende — orienta. Entendemos o perfil de cada cliente, mapeamos suas necessidades e recomendamos a solução que faz mais sentido. Cada atendimento é uma conversa, não um discurso de vendas.",
              },
              {
                icon: Shield, title: "Compromisso de ponta a ponta",
                desc: "Do primeiro contato ao pós-venda, a MS Eletric acompanha cada etapa. Garantia, assistência técnica, suporte e orientação contínua fazem parte do que entregamos — porque confiança se constrói com presença.",
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
            <motion.div variants={fadeUp}><SectionLabel>Missão, Visão & Valores</SectionLabel></motion.div>
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
                text: "Tornar a mobilidade elétrica mais prática, acessível e confiável para cada perfil de cliente. Atuamos como ponte entre a tecnologia e o cotidiano, entregando soluções reais que simplificam a rotina, reduzem custos e contribuem para um futuro mais sustentável — com atendimento humano, orientação especializada e suporte contínuo em cada etapa da jornada.",
              },
              {
                icon: Eye, label: "Visão",
                text: "Ser a principal referência nacional em experiência de compra e confiança no segmento de mobilidade elétrica. Queremos que cada pessoa que procure um veículo elétrico pense na MS Eletric — não apenas pela qualidade dos produtos, mas pela forma como apresentamos, orientamos e acompanhamos cada cliente em sua transição para a eletromobilidade.",
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
              <span className="w-8 h-[1px] bg-primary/30" />Nossos Valores<span className="w-8 h-[1px] bg-primary/30" />
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: Sparkles, title: "Inovação com aplicação real", desc: "Não perseguimos novidades por si só. Toda inovação que adotamos precisa resolver um problema concreto, melhorar uma experiência ou simplificar a rotina do cliente." },
                { icon: HeartHandshake, title: "Atendimento consultivo", desc: "Cada cliente é único. Por isso, ouvimos antes de falar, entendemos antes de recomendar e acompanhamos antes de encerrar. Nosso atendimento é orientação, não pressão." },
                { icon: Shield, title: "Confiança como base", desc: "Transparência nos preços, clareza nas informações, honestidade nas recomendações. A confiança do cliente é o ativo mais valioso que construímos." },
                { icon: Leaf, title: "Sustentabilidade consciente", desc: "Zero emissão, recarga na tomada, silêncio urbano. Cada veículo que colocamos na rua é uma contribuição real para cidades mais limpas e um planeta mais saudável." },
                { icon: Award, title: "Excelência na experiência", desc: "Do showroom ao pós-venda, cada ponto de contato com a marca é pensado para ser memorável. Experiência não é detalhe — é nossa estratégia principal." },
                { icon: TrendingUp, title: "Evolução contínua", desc: "O mercado muda, a tecnologia avança e as necessidades se transformam. Nos comprometemos a evoluir junto — atualizando portfólio, conhecimento e processos continuamente." },
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
            <motion.div variants={fadeUp}><SectionLabel>Por que a MS Eletric</SectionLabel></motion.div>
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
              Em um mercado onde a maioria das marcas se limita a listar especificações e publicar fotos, a MS Eletric escolheu um caminho radicalmente diferente. Cada um dos nossos diferenciais existe por uma razão: facilitar a vida de quem quer migrar para a mobilidade elétrica com segurança e clareza.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: HeartHandshake, title: "Atendimento consultivo real",
                desc: "Nosso time é treinado para entender perfis de uso, não para empurrar o modelo mais caro. Cada recomendação é baseada na rotina, na necessidade e no orçamento do cliente. Atendemos quem nunca dirigiu um veículo elétrico e quem já está na segunda unidade — com a mesma atenção.",
              },
              {
                icon: Store, title: "Showroom para vivenciar",
                desc: "Acreditamos que a decisão de compra fica mais fácil quando o cliente pode ver, tocar, sentar e comparar. Nosso showroom em Uberlândia foi projetado para isso: um ambiente onde a mobilidade elétrica sai da tela e se torna tangível.",
              },
              {
                icon: Shield, title: "Suporte do início ao pós-venda",
                desc: "A relação com a MS Eletric não termina na entrega. Oferecemos garantia, assistência técnica especializada, orientação de uso e suporte contínuo. Porque um cliente bem acompanhado é um cliente que volta e recomenda.",
              },
              {
                icon: Users, title: "Capacidade de orientar perfis diferentes",
                desc: "Do profissional que precisa de um veículo utilitário ao jovem que quer uma solução urbana ágil. Da família que busca lazer ao entregador que precisa de autonomia e robustez. Temos solução — e conhecimento — para cada cenário.",
              },
              {
                icon: Zap, title: "Portfólio completo e diversificado",
                desc: "Autopropelidos, bicicletas elétricas, scooters, triciclos, utilitários, veículos infantis e patinetes. Mais de 19 modelos pensados para cobrir da mobilidade individual ao transporte profissional, sem depender de combustível fóssil.",
              },
              {
                icon: CheckCircle2, title: "Transparência em cada etapa",
                desc: "Preços claros, informações honestas, prazos reais e comunicação direta. Na MS Eletric, o cliente nunca fica no escuro. A transparência é o que sustenta a confiança — e a confiança é o que sustenta a marca.",
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
                className="text-primary-foreground/50 text-[15px] leading-[1.8] max-w-3xl mx-auto">
                O showroom da MS Eletric em Uberlândia não é apenas um ponto de venda. É um ambiente projetado para que o cliente viva a experiência da mobilidade elétrica antes de tomar qualquer decisão. Um espaço onde modelos se tornam tangíveis, dúvidas se transformam em respostas e a escolha ganha segurança.
              </motion.p>
            </div>

            <motion.div variants={fadeUp} custom={3}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Eye, title: "Veja de perto", desc: "Cada modelo exposto para você analisar acabamento, proporções e detalhes que nenhuma foto consegue transmitir." },
                { icon: Users, title: "Atendimento presencial", desc: "Consultores especializados prontos para ouvir, entender seu perfil e recomendar a solução mais adequada." },
                { icon: Zap, title: "Compare categorias", desc: "Autopropelidos, scooters, bicicletas elétricas e mais. Veja lado a lado e entenda as diferenças na prática." },
                { icon: Shield, title: "Confiança na decisão", desc: "A compra de um veículo elétrico fica mais segura quando você pode experimentar a marca pessoalmente." },
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
            <motion.div variants={fadeUp} custom={4}
              className="mt-10 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary) / 0.06), hsl(var(--primary) / 0.02))",
                border: "1px solid hsl(var(--primary) / 0.12)",
              }}>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-primary-foreground/80 text-sm font-semibold">Uberlândia – MG</p>
                  <p className="text-primary-foreground/40 text-[12px]">Showroom aberto para visitação • Atendimento presencial e online</p>
                </div>
              </div>
              <button onClick={() => setContactOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-[11px] font-semibold uppercase tracking-wider text-primary-foreground cursor-pointer shrink-0"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                Agendar visita <ArrowRight className="w-3.5 h-3.5" />
              </button>
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
              A MS Eletric entende que mobilidade elétrica não é uma solução única. Cada pessoa, cada rotina e cada necessidade exigem um veículo diferente. Por isso, construímos um portfólio diverso e uma equipe capaz de orientar cada perfil com a mesma profundidade.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { title: "Mobilidade urbana", desc: "Para quem busca agilidade no trânsito, economia no deslocamento diário e praticidade para ir e vir sem depender de combustível." },
              { title: "Lazer e bem-estar", desc: "Para quem quer explorar a cidade, pedalar com assistência ou curtir um passeio no fim de semana de forma leve e sustentável." },
              { title: "Uso profissional", desc: "Para entregadores, operadores logísticos e profissionais que precisam de autonomia, robustez e economia operacional." },
              { title: "Primeira experiência elétrica", desc: "Para quem nunca dirigiu um veículo elétrico e quer começar com orientação, suporte e um modelo adequado ao seu perfil." },
              { title: "Famílias", desc: "Para quem busca opções de mobilidade para diferentes membros da família — do adulto à criança, do urbano ao recreativo." },
              { title: "Operações utilitárias", desc: "Para negócios que precisam de veículos de carga, transporte pesado ou soluções específicas para operação comercial." },
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
            <motion.div variants={fadeUp}><SectionLabel>Olhando para frente</SectionLabel></motion.div>
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
                A transição energética não é uma promessa distante — ela já está acontecendo. E a MS Eletric escolheu estar na linha de frente dessa transformação, não como espectadora, mas como protagonista. Cada veículo que colocamos nas ruas brasileiras é uma demonstração concreta de que a mobilidade elétrica funciona, é viável e está pronta para substituir modelos baseados em combustível fóssil.
              </p>
              <p>
                Mas nosso compromisso vai além de vender veículos elétricos. Trabalhamos ativamente para educar o mercado, desmistificar preconceitos e mostrar que a eletromobilidade é mais simples, mais econômica e mais acessível do que a maioria das pessoas imagina. Cada cliente que convertemos é um agente de mudança — alguém que comprova, no próprio dia a dia, que é possível se mover de forma mais inteligente.
              </p>
              <p>
                Acreditamos que o futuro da mobilidade urbana é silencioso, limpo e inteligente. E acreditamos que esse futuro não precisa esperar — ele pode começar agora, com escolhas práticas, orientação adequada e uma marca que acompanha essa jornada de perto.
              </p>
            </motion.div>

            {/* Quote */}
            <motion.blockquote variants={fadeUp} custom={3}
              className="mt-10 pl-6 relative"
              style={{ borderLeft: "3px solid hsl(var(--primary) / 0.5)" }}>
              <p className="text-primary-foreground/70 text-lg md:text-xl font-medium italic leading-relaxed">
                "A mobilidade elétrica não é sobre substituir um veículo. É sobre repensar como nos movemos — e fazer isso de forma mais consciente, eficiente e conectada com o futuro."
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
                Cada um desses pontos não é um argumento de venda — é uma promessa que cumprimos todos os dias.
              </p>
            </motion.div>

            <motion.div variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Headphones, text: "Atendimento especializado e consultivo" },
                { icon: Store, text: "Showroom físico em Uberlândia – MG" },
                { icon: Shield, text: "Suporte do primeiro contato ao pós-venda" },
                { icon: HeartHandshake, text: "Orientação personalizada para cada perfil" },
                { icon: Clock, text: "Entrega imediata e garantia de fábrica" },
                { icon: CheckCircle2, text: "Experiência de compra segura e transparente" },
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
            <motion.div variants={fadeUp}><SectionLabel>Comece agora</SectionLabel></motion.div>
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
              Visite nosso showroom em Uberlândia, converse com nosso time de especialistas, conheça os modelos de perto e descubra qual veículo elétrico se encaixa perfeitamente na sua rotina. A mobilidade do futuro é mais simples do que você imagina — e estamos prontos para provar isso.
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
                <span className="relative z-10">Falar com um especialista</span>
              </button>
              <a href="/modelos"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[12px] font-semibold uppercase tracking-[0.12em] text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                style={{ border: "1px solid hsl(0 0% 100% / 0.1)" }}>
                Conhecer os modelos <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </motion.div>
        </Section>

        <HomeFooter onContactClick={() => setContactOpen(true)} />
      </div>
      <FloatingWhatsApp />
      <PopUpContato01 isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
