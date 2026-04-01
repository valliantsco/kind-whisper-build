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
  { icon: Shield, title: "Seriedade comprovada", text: "A associação à ABVE valida que a MS Eletric opera dentro dos padrões e práticas reconhecidas pelo setor." },
  { icon: Handshake, title: "Confiança institucional", text: "O cliente sabe que está diante de uma marca integrada ao ecossistema oficial da eletromobilidade." },
  { icon: TrendingUp, title: "Alinhamento setorial", text: "Participação ativa nas discussões que moldam regulamentações, tendências e o futuro do mercado." },
  { icon: Lightbulb, title: "Conexão com inovação", text: "Acesso direto às novidades, avanços tecnológicos e melhores práticas da indústria elétrica." },
  { icon: Leaf, title: "Sustentabilidade real", text: "Compromisso formalizado com a mobilidade de zero emissão e com o impacto positivo no planeta." },
  { icon: Building2, title: "Posicionamento de mercado", text: "A MS Eletric não está isolada — faz parte de uma rede que movimenta e transforma o setor no Brasil." },
];

const PILLARS = [
  { icon: BadgeCheck, title: "Credibilidade Setorial", desc: "Reconhecimento como empresa alinhada às melhores práticas e padrões da indústria de veículos elétricos no Brasil." },
  { icon: Lightbulb, title: "Alinhamento com Inovação", desc: "Proximidade com as tendências, tecnologias e avanços que definem o futuro da mobilidade elétrica." },
  { icon: Leaf, title: "Compromisso com Sustentabilidade", desc: "Participação ativa na construção de um mercado de transporte mais limpo, silencioso e eficiente." },
  { icon: Globe, title: "Ecossistema da Eletromobilidade", desc: "Integração a uma rede de empresas, fabricantes e instituições que movem o setor no país." },
  { icon: Shield, title: "Fortalecimento Institucional", desc: "Presença em um ambiente de diálogo estratégico, regulatório e técnico junto aos principais agentes do mercado." },
  { icon: HeartHandshake, title: "Confiança para o Cliente", desc: "Garantia adicional de seriedade, estrutura e comprometimento para quem busca mobilidade elétrica." },
];

const VALUES_CONNECT = [
  { icon: Zap, label: "Inovação", text: "Fazer parte da ABVE reforça a vocação da MS Eletric por soluções que antecipam o futuro." },
  { icon: Leaf, label: "Sustentabilidade", text: "A associação formaliza o compromisso com mobilidade zero emissão e impacto positivo." },
  { icon: Users, label: "Atendimento Consultivo", text: "O conhecimento compartilhado dentro do ecossistema eleva a qualidade da orientação ao cliente." },
  { icon: TrendingUp, label: "Evolução Contínua", text: "A conexão com a entidade garante acesso contínuo ao que há de mais atual no setor." },
];

const STRUCTURE_ITEMS = [
  { icon: MapPin, title: "Uberlândia — MG", text: "Sede e showroom principal na Av. João Pinheiro, uma das avenidas mais conhecidas da cidade." },
  { icon: Building2, title: "Revendas", text: "Pontos de atendimento em Uberlândia e Caldas Novas (GO), ampliando a presença regional." },
  { icon: Globe, title: "Atendimento Online", text: "Canais digitais de venda e atendimento para todo o território nacional." },
  { icon: Truck, title: "Entrega Imediata", text: "Estoque disponível para pronta entrega, sem longas esperas ou incertezas." },
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
                <SectionLabel>Associada ABVE</SectionLabel>
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
                A MS Eletric integra a Associação Brasileira do Veículo Elétrico — a entidade que reúne os principais agentes da eletromobilidade no país. Essa associação reflete nosso compromisso com inovação, credibilidade e o avanço real da mobilidade elétrica.
              </motion.p>

              <motion.p variants={fadeUp} custom={3}
                className="text-primary-foreground/40 text-base leading-relaxed max-w-2xl mb-10">
                Mais do que um selo, é a formalização de um posicionamento: estar ao lado de quem constrói o futuro do transporte no Brasil.
              </motion.p>

              <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-6">
                {[
                  { label: "Credibilidade setorial", icon: BadgeCheck },
                  { label: "Inovação contínua", icon: Lightbulb },
                  { label: "Sustentabilidade real", icon: Leaf },
                  { label: "Ecossistema nacional", icon: Globe },
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
                  A ABVE — Associação Brasileira do Veículo Elétrico — é a principal entidade representativa do setor de veículos elétricos no país. Fundada para promover o desenvolvimento, a regulamentação e a disseminação da mobilidade elétrica, a associação reúne fabricantes, distribuidores, prestadores de serviço e empresas comprometidas com a transformação do transporte.
                </p>
                <p>
                  Atuar junto à ABVE significa participar de um ambiente de diálogo técnico, regulatório e estratégico que influencia diretamente o futuro da eletromobilidade brasileira. É um espaço onde se discutem políticas públicas, tendências de mercado, infraestrutura de recarga e padrões de qualidade.
                </p>
                <p>
                  Ser associada à ABVE não é apenas uma credencial — é um compromisso com a evolução do setor e com a construção de um mercado mais maduro, confiável e acessível para todos.
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
                      <span className="text-xs uppercase tracking-[0.15em] text-primary font-semibold">Membro Oficial</span>
                    </div>
                    <p className="text-primary-foreground/40 text-sm">Associação Brasileira do Veículo Elétrico</p>
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
              Em um mercado em construção, estar conectado à entidade que organiza, representa e fortalece o setor não é opcional — é estratégico. Para a MS Eletric, essa associação vai além da representatividade: ela reforça cada promessa que fazemos.
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
                A mobilidade elétrica não é mais uma promessa distante. Ela já faz parte do presente — e a MS Eletric está posicionada exatamente nesse ponto de convergência entre o que já é possível e o que ainda está por vir.
              </p>
              <p>
                Participar da ABVE significa estar no centro das conversas que definem como o Brasil vai se mover nos próximos anos. Significa entender regulamentações antes que elas cheguem ao mercado. Significa antecipar tendências, absorver conhecimento e traduzir tudo isso em uma experiência mais completa para o cliente.
              </p>
              <p>
                A MS Eletric acredita que inovação não é apenas sobre tecnologia — é sobre aplicação prática. É sobre transformar um veículo elétrico em parte natural da rotina de alguém. É sobre tornar a transição para a mobilidade limpa mais simples, acessível e segura.
              </p>
              <p>
                Essa visão não surge isoladamente. Ela se fortalece dentro de um ecossistema. E a ABVE é esse ecossistema.
              </p>
            </motion.div>
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
                  A MS Eletric nasceu para apresentar soluções inovadoras de mobilidade, integrando tecnologia e sustentabilidade em cada detalhe — dos modelos oferecidos à experiência de atendimento.
                </p>
                <p>
                  Nosso portfólio é composto exclusivamente por veículos puramente elétricos: silenciosos, com zero emissão de gás carbônico e pensados para transformar a forma como as pessoas se deslocam. É uma experiência de condução completamente nova — mais limpa, mais inteligente e mais conectada ao futuro.
                </p>
                <p>
                  Mas não nos limitamos ao produto. Acreditamos que a experiência com mobilidade elétrica começa antes da compra e se estende muito além dela. Por isso, oferecemos entrega imediata, garantia real, assistência técnica especializada e personalização — porque cada cliente tem uma necessidade diferente, e cada solução precisa fazer sentido na prática.
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
                  Na MS Eletric, qualidade não é apenas um atributo do produto — é um compromisso que permeia cada interação. Do primeiro contato à assistência técnica, cada etapa é pensada para que o cliente se sinta seguro, bem orientado e confiante na sua escolha.
                </p>
                <p>
                  Trabalhamos com modelos que aliam design, desempenho e tecnologia de ponta. Cada veículo elétrico do nosso portfólio é selecionado com critério, testado com rigor e apresentado com transparência. Não vendemos apenas mobilidade — entregamos uma experiência completa.
                </p>
                <p>
                  É esse nível de cuidado que nos credencia como associada ABVE e nos posiciona como referência no segmento.
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
            <motion.div variants={fadeUp}><SectionLabel>Presença</SectionLabel></motion.div>
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
              A MS Eletric combina presença física com capacidade de atendimento em todo o país, garantindo proximidade e acessibilidade para diferentes perfis de cliente.
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
            <motion.div variants={fadeUp}><SectionLabel>Pilares</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} custom={1}
              className="font-display font-black text-3xl md:text-5xl text-primary-foreground uppercase tracking-tight leading-[0.95]">
              O que essa associação reforça sobre a{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                marca
              </span>
            </motion.h2>
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
              <motion.p variants={fadeUp} custom={2}
                className="text-primary-foreground/50 text-[15px] leading-relaxed max-w-2xl mx-auto">
                A associação à ABVE não é um adendo — é uma extensão natural dos valores que já guiam a MS Eletric desde o início.
              </motion.p>
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
              <motion.div variants={fadeUp}><SectionLabel>Próximo passo</SectionLabel></motion.div>
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
                A MS Eletric é mais do que uma empresa de veículos elétricos. É uma marca integrada ao ecossistema que transforma a mobilidade no Brasil. Descubra nossos modelos, visite nosso showroom ou fale com nosso time.
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
                    Explorar Modelos
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
                  Falar com o Time
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </Section>

        <HomeFooter onContactClick={() => setContactOpen(true)} />
      </div>

      <FloatingWhatsApp />
      <PopUpContato01 isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
