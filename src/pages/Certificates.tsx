import { motion } from "framer-motion";
import { ShieldCheck, Leaf, Trophy, Award, FileCheck, Globe, BadgeCheck } from "lucide-react";
import Header from "@/components/Header";
import HomeFooter from "@/components/home/HomeFooter";
import AnimatedBackground from "@/components/home/AnimatedBackground";
import PopUpContato01 from "@/components/PopUpContato01";
import { useState } from "react";

/* ── Certification cards data ── */
const certifications = [
  {
    title: "Frost & Sullivan — Market Position Certification",
    issuer: "AIMA",
    description:
      "Certificação que reconhece o posicionamento de mercado da AIMA como líder global no segmento de veículos elétricos de duas e três rodas.",
    icon: FileCheck,
  },
  {
    title: "Carbon Footprint Certification",
    issuer: "Certificação Ambiental",
    description:
      "Atestado de medição e compensação de pegada de carbono na cadeia produtiva, reforçando o compromisso com a sustentabilidade.",
    icon: Leaf,
  },
  {
    title: "UL 2849",
    issuer: "Underwriters Laboratories",
    description:
      "Norma de segurança para sistemas elétricos em bicicletas elétricas. Aplicável a modelos específicos do portfólio — consulte a ficha técnica de cada produto.",
    icon: ShieldCheck,
    note: "Aplicável a modelos específicos",
  },
  {
    title: "AIMA E-Bikes Certificates",
    issuer: "AIMA",
    description:
      "Conjunto de certificações de qualidade e conformidade técnica para bicicletas elétricas fabricadas sob padrão AIMA.",
    icon: BadgeCheck,
    note: "Aplicável a modelos selecionados",
  },
  {
    title: "Bafang Power Assist Components Certificates",
    issuer: "Bafang",
    description:
      "Certificações de qualidade e performance dos sistemas de assistência elétrica Bafang utilizados em modelos da linha.",
    icon: BadgeCheck,
    note: "Aplicável a modelos com motor Bafang",
  },
];

const esgItems = [
  {
    title: "Top MSCI ESG Rating",
    description:
      "Classificação de alto desempenho nos critérios ambientais, sociais e de governança avaliados pela MSCI, referência global em ratings ESG.",
    icon: Globe,
  },
  {
    title: "Pegada de Carbono Certificada",
    description:
      "Compromisso com a mensuração, redução e compensação de emissões ao longo de toda a cadeia de produção e logística.",
    icon: Leaf,
  },
  {
    title: "Mobilidade Sustentável",
    description:
      "Veículos 100% elétricos: zero emissões diretas, menor poluição sonora e contribuição ativa para cidades mais respiráveis.",
    icon: ShieldCheck,
  },
];

const awards = [
  { title: "TITAN Awards", tier: "Platinum Winner", year: "2024", icon: Trophy },
  { title: "TITAN Awards", tier: "Gold Winner", year: "2024", icon: Trophy },
  { title: "NY Product Design Awards", tier: "Gold Winner", year: "2024", icon: Award },
  { title: "French Design Awards", tier: "Gold Winner", year: "2024", icon: Award },
];

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

/* ── Shared card wrapper ── */
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 ${className}`}
      style={{
        background: "hsl(0 0% 100% / 0.025)",
        border: "1px solid hsl(0 0% 100% / 0.06)",
      }}
    >
      {children}
    </div>
  );
}

/* ── Section header ── */
function SectionHeader({ tag, title, subtitle }: { tag: string; title: string; subtitle: string }) {
  return (
    <motion.div {...fadeUp} className="mb-10 md:mb-14">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-px bg-primary" />
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{tag}</span>
      </div>
      <h2 className="font-display font-black text-2xl md:text-4xl lg:text-5xl text-primary-foreground uppercase tracking-tight leading-[0.95]">
        {title}
      </h2>
      <p className="text-sm md:text-base text-primary-foreground/45 leading-relaxed mt-4 max-w-2xl">{subtitle}</p>
    </motion.div>
  );
}

/* ── Page ── */
export default function Certificates() {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState<string | undefined>();

  return (
    <div className="min-h-screen relative" style={{ background: "hsl(0 0% 4%)" }}>
      <AnimatedBackground />
      <div className="relative z-10">
        <Header onContactClick={() => setContactOpen(true)} />

        {/* Hero */}
        <section className="pt-28 pb-14 md:pt-36 md:pb-20">
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-px bg-primary" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Institucional</span>
              </div>
              <h1 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-5">
                Qualidade que se{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
                >
                  comprova
                </span>
              </h1>
              <p className="text-base md:text-lg text-primary-foreground/50 leading-relaxed max-w-2xl">
                Conheça os certificados, prêmios e compromissos que sustentam a confiança na marca e nos produtos MS Eletric.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══ Section 1 — Certificados e Conformidade ═══ */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              tag="Conformidade"
              title="Certificados e Conformidade"
              subtitle="Documentações técnicas e certificações que atestam a qualidade, a segurança e a procedência dos veículos."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {certifications.map((cert, i) => (
                <motion.div key={cert.title + i} {...fadeUp} transition={{ delay: i * 0.08 }}>
                  <GlassCard className="h-full flex flex-col">
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.12)" }}
                      >
                        <cert.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-sm text-primary-foreground/90 leading-tight">{cert.title}</h3>
                        <p className="text-[10px] text-primary/70 uppercase tracking-wider mt-0.5">{cert.issuer}</p>
                      </div>
                    </div>
                    <p className="text-xs text-primary-foreground/40 leading-relaxed flex-1">{cert.description}</p>
                    {cert.note && (
                      <span
                        className="inline-block mt-3 text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full text-primary/80"
                        style={{ background: "hsl(var(--primary) / 0.08)", border: "1px solid hsl(var(--primary) / 0.1)" }}
                      >
                        {cert.note}
                      </span>
                    )}
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="container mx-auto px-4">
          <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.12), transparent)" }} />
        </div>

        {/* ═══ Section 2 — ESG e Sustentabilidade ═══ */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              tag="Sustentabilidade"
              title="ESG e Sustentabilidade"
              subtitle="Compromisso com práticas ambientais, sociais e de governança que vão além do produto."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {esgItems.map((item, i) => (
                <motion.div key={item.title} {...fadeUp} transition={{ delay: i * 0.08 }}>
                  <GlassCard className="h-full">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                      style={{ background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.12)" }}
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-sm text-primary-foreground/90 mb-2">{item.title}</h3>
                    <p className="text-xs text-primary-foreground/40 leading-relaxed">{item.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="container mx-auto px-4">
          <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.12), transparent)" }} />
        </div>

        {/* ═══ Section 3 — Prêmios e Reconhecimentos ═══ */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              tag="Reconhecimento"
              title="Prêmios e Reconhecimentos"
              subtitle="Premiações internacionais que validam o design, a inovação e a excelência dos veículos."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {awards.map((award, i) => (
                <motion.div key={award.title + award.tier} {...fadeUp} transition={{ delay: i * 0.08 }}>
                  <GlassCard className="text-center h-full flex flex-col items-center justify-center py-8">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                      style={{
                        background: award.tier.includes("Platinum")
                          ? "linear-gradient(135deg, hsl(0 0% 75% / 0.15), hsl(0 0% 90% / 0.08))"
                          : "linear-gradient(135deg, hsl(45 80% 55% / 0.15), hsl(45 90% 65% / 0.08))",
                        border: `1px solid ${award.tier.includes("Platinum") ? "hsl(0 0% 80% / 0.15)" : "hsl(45 70% 55% / 0.15)"}`,
                      }}
                    >
                      <award.icon
                        className="w-6 h-6"
                        style={{
                          color: award.tier.includes("Platinum") ? "hsl(0 0% 80%)" : "hsl(45 80% 60%)",
                        }}
                      />
                    </div>
                    <h3 className="font-display font-bold text-sm text-primary-foreground/90 mb-1">{award.title}</h3>
                    <p
                      className="text-xs font-bold uppercase tracking-wider mb-1"
                      style={{
                        color: award.tier.includes("Platinum") ? "hsl(0 0% 80%)" : "hsl(45 80% 60%)",
                      }}
                    >
                      {award.tier}
                    </p>
                    <p className="text-[10px] text-primary-foreground/30">{award.year}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="container mx-auto px-4 pb-10">
          <p className="text-[10px] text-primary-foreground/20 leading-relaxed max-w-2xl">
            As certificações, prêmios e ratings apresentados referem-se à fabricante AIMA e seus componentes homologados.
            A aplicabilidade de certificações específicas (como UL 2849 e Bafang) varia conforme o modelo.
            Consulte a ficha técnica individual de cada produto para detalhes.
          </p>
        </div>

        <HomeFooter
          onContactClick={() => setContactOpen(true)}
          onSupportClick={(s) => {
            setContactSubject(s);
            setContactOpen(true);
          }}
        />
      </div>

      <PopUpContato01
        isOpen={contactOpen}
        onClose={() => {
          setContactOpen(false);
          setContactSubject(undefined);
        }}
        initialSubject={contactSubject}
      />
    </div>
  );
}
