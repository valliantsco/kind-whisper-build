import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { FileText, Scale, ShieldCheck, AlertTriangle, Globe, Gavel, RefreshCw, Mail, Ban } from "lucide-react";
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

function Divider() {
  return (
    <div className="container mx-auto px-4">
      <div className="h-[1px]" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.2), transparent)" }} />
    </div>
  );
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`relative py-16 md:py-24 ${className}`}>
      <div className="container mx-auto px-4 relative z-10">{children}</div>
    </section>
  );
}

function PolicyBlock({ icon: Icon, title, children, index }: { icon: typeof FileText; title: string; children: React.ReactNode; index: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      custom={index * 0.3}
      className="group"
    >
      <div className="rounded-xl p-6 md:p-8 transition-all duration-300 hover:border-primary/20"
        style={{
          background: "hsl(0 0% 100% / 0.02)",
          border: "1px solid hsl(0 0% 100% / 0.06)",
        }}>
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.15)" }}>
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display font-bold text-lg md:text-xl text-primary-foreground/90 tracking-tight pt-1.5">{title}</h3>
        </div>
        <div className="text-primary-foreground/50 text-[14px] leading-[1.9] space-y-4 pl-14">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
export default function TermsOfUse() {
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

        {/* ── HERO ── */}
        <section ref={heroRef} className="relative min-h-[55vh] flex items-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.06) 0%, transparent 60%)", filter: "blur(120px)" }} />

          <motion.div style={{ opacity: heroOpacity }} className="container mx-auto px-4 pt-32 pb-16 relative z-10">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
              <motion.div variants={fadeUp}><SectionLabel>Legal</SectionLabel></motion.div>
              <motion.h1 variants={fadeUp} custom={1}
                className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-primary-foreground uppercase tracking-tight leading-[0.92] mb-8">
                Termos de{" "}
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                  Uso
                </span>
              </motion.h1>
              <motion.p variants={fadeUp} custom={2}
                className="text-primary-foreground/50 text-lg leading-relaxed max-w-2xl mb-4">
                Ao acessar e utilizar o site da MS Eletric, você concorda com os termos e condições descritos neste documento. Recomendamos a leitura atenta antes de navegar ou interagir com nossos serviços.
              </motion.p>
              <motion.p variants={fadeUp} custom={3}
                className="text-primary-foreground/30 text-sm">
                Última atualização: Abril de 2026
              </motion.p>
            </motion.div>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{ background: "linear-gradient(to top, hsl(0 0% 4%), transparent)" }} />
        </section>

        <Divider />

        {/* ── CONTENT ── */}
        <Section>
          <div className="max-w-4xl mx-auto space-y-6">

            <PolicyBlock icon={FileText} title="1. Aceitação dos termos" index={0}>
              <p>
                Ao acessar, navegar ou utilizar qualquer funcionalidade do site mseletric.com, você declara que leu, compreendeu e concorda integralmente com estes Termos de Uso. Caso não concorde com algum ponto, recomendamos que não utilize o site.
              </p>
              <p>
                Estes termos se aplicam a todos os visitantes, usuários e qualquer pessoa que acesse o site ou seus serviços digitais, incluindo o quiz de recomendação, formulários de contato e canais de atendimento integrados.
              </p>
            </PolicyBlock>

            <PolicyBlock icon={Globe} title="2. Sobre o site e os serviços" index={1}>
              <p>
                O site da MS Eletric tem como objetivo apresentar a marca, seus modelos de veículos elétricos, serviços e canais de atendimento. O conteúdo aqui disponibilizado é de caráter informativo e institucional.
              </p>
              <p>
                As informações sobre produtos — incluindo especificações técnicas, preços, cores e disponibilidade — são apresentadas com a maior precisão possível, mas podem sofrer alterações sem aviso prévio, de acordo com atualizações de fabricantes, variações cambiais ou decisões estratégicas da empresa.
              </p>
              <p>
                O site não constitui oferta comercial vinculante. A efetivação de qualquer compra depende de confirmação direta com a equipe de atendimento da MS Eletric.
              </p>
            </PolicyBlock>

            <PolicyBlock icon={ShieldCheck} title="3. Propriedade intelectual" index={2}>
              <p>
                Todo o conteúdo presente no site — incluindo, mas não se limitando a textos, imagens, logotipos, ícones, vídeos, layouts, gráficos, design e código-fonte — é de propriedade da MS Eletric ou de seus licenciadores e está protegido pela legislação brasileira de direitos autorais e propriedade intelectual.
              </p>
              <p>
                É expressamente proibido:
              </p>
              <ul className="list-none space-y-2.5 mt-3">
                {[
                  "Reproduzir, copiar, distribuir ou republicar qualquer conteúdo do site sem autorização prévia por escrito",
                  "Utilizar a marca, logotipos ou identidade visual da MS Eletric para fins comerciais ou institucionais",
                  "Modificar, descompilar ou realizar engenharia reversa do código do site",
                  "Utilizar o conteúdo para criar materiais derivados sem consentimento",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "hsl(var(--primary) / 0.5)" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </PolicyBlock>

            <PolicyBlock icon={Ban} title="4. Conduta do usuário" index={3}>
              <p>
                Ao utilizar o site, você se compromete a não:
              </p>
              <ul className="list-none space-y-2.5 mt-3">
                {[
                  "Fornecer informações falsas, enganosas ou fraudulentas nos formulários de contato",
                  "Utilizar o site para envio de spam, conteúdo ofensivo ou ilegal",
                  "Tentar acessar áreas restritas, sistemas internos ou dados de outros usuários",
                  "Utilizar bots, scrapers ou qualquer ferramenta automatizada para coleta de dados do site",
                  "Praticar qualquer ato que possa comprometer a segurança, integridade ou disponibilidade do site",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "hsl(var(--primary) / 0.5)" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                A MS Eletric se reserva o direito de bloquear o acesso de qualquer usuário que viole estas condições, sem aviso prévio.
              </p>
            </PolicyBlock>

            <PolicyBlock icon={AlertTriangle} title="5. Limitação de responsabilidade" index={4}>
              <p>
                A MS Eletric se empenha para manter o site atualizado, funcional e seguro, mas não garante:
              </p>
              <ul className="list-none space-y-2.5 mt-3">
                {[
                  "Disponibilidade ininterrupta — o site pode passar por manutenções ou instabilidades temporárias",
                  "Precisão absoluta — informações podem conter imprecisões técnicas ou tipográficas",
                  "Resultados específicos — o quiz de recomendação oferece sugestões baseadas em algoritmos, não substituindo a consulta com um especialista",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "hsl(var(--primary) / 0.5)" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                A MS Eletric não se responsabiliza por danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso ou impossibilidade de uso do site.
              </p>
            </PolicyBlock>

            <PolicyBlock icon={Scale} title="6. Links externos" index={5}>
              <p>
                O site pode conter links para sites de terceiros (redes sociais, parceiros, entidades como a ABVE). A MS Eletric não se responsabiliza pelo conteúdo, práticas de privacidade ou disponibilidade desses sites externos.
              </p>
              <p>
                A inclusão de links não implica endosso, parceria comercial ou responsabilidade sobre o conteúdo de terceiros.
              </p>
            </PolicyBlock>

            <PolicyBlock icon={RefreshCw} title="7. Alterações nos termos" index={6}>
              <p>
                A MS Eletric se reserva o direito de modificar, atualizar ou revisar estes Termos de Uso a qualquer momento, sem aviso prévio. As alterações entram em vigor imediatamente após a publicação no site.
              </p>
              <p>
                Recomendamos que você consulte esta página periodicamente para se manter informado sobre eventuais atualizações. O uso continuado do site após alterações constitui aceitação dos novos termos.
              </p>
            </PolicyBlock>

            <PolicyBlock icon={Gavel} title="8. Legislação e foro" index={7}>
              <p>
                Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Para dirimir quaisquer questões decorrentes destes termos, fica eleito o foro da Comarca de Uberlândia — MG, com exclusão de qualquer outro, por mais privilegiado que seja.
              </p>
            </PolicyBlock>

            <PolicyBlock icon={Mail} title="9. Contato" index={8}>
              <p>
                Se você tiver dúvidas ou solicitações relacionadas a estes Termos de Uso, entre em contato:
              </p>
              <div className="mt-4 rounded-lg p-5"
                style={{ background: "hsl(0 0% 100% / 0.03)", border: "1px solid hsl(0 0% 100% / 0.06)" }}>
                <p className="font-semibold text-primary-foreground/70 mb-2">MS Eletric</p>
                <p>E-mail: contato@mseletric.com</p>
                <p>Telefone: (34) 99284-9900</p>
                <p>Endereço: Av. João Pinheiro, 3747 — Brasil, Uberlândia — MG, 38400-714</p>
              </div>
            </PolicyBlock>

          </div>
        </Section>

        <Divider />

        {/* ── CTA ── */}
        <Section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}
            className="max-w-2xl mx-auto text-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.05) 0%, transparent 60%)", filter: "blur(80px)" }} />
            <div className="relative z-10">
              <motion.div variants={fadeUp}><SectionLabel>Dúvidas</SectionLabel></motion.div>
              <motion.h2 variants={fadeUp} custom={1}
                className="font-display font-black text-2xl md:text-4xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-5">
                Precisa de{" "}
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                  esclarecimento
                </span>?
              </motion.h2>
              <motion.p variants={fadeUp} custom={2}
                className="text-primary-foreground/45 text-[14px] leading-relaxed max-w-lg mx-auto mb-8">
                Se algo não ficou claro ou se você tem perguntas sobre nossos termos, nossa equipe está pronta para ajudar.
              </motion.p>
              <motion.button
                variants={fadeUp} custom={3}
                onClick={() => { setContactSubject("Dúvidas sobre os termos de uso"); setContactOpen(true); }}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-[0.12em] text-white cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                  boxShadow: "0 4px 20px hsl(var(--primary) / 0.25)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-4 h-4" />
                Falar com a equipe
              </motion.button>
            </div>
          </motion.div>
        </Section>

        <HomeFooter onContactClick={() => setContactOpen(true)} onSupportClick={(s) => { setContactSubject(s); setContactOpen(true); }} />
      </div>

      <PopUpContato01 isOpen={contactOpen} onClose={() => { setContactOpen(false); setContactSubject(undefined); }} initialSubject={contactSubject} />
    </div>
  );
}
