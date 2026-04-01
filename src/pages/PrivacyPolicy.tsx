import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Shield, Eye, Lock, Database, UserCheck, Bell, Trash2, Mail, Scale } from "lucide-react";
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

/* ─── policy section card ─── */
function PolicyBlock({ icon: Icon, title, children, index }: { icon: typeof Shield; title: string; children: React.ReactNode; index: number }) {
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
export default function PrivacyPolicy() {
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
                Política de{" "}
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                  Privacidade
                </span>
              </motion.h1>
              <motion.p variants={fadeUp} custom={2}
                className="text-primary-foreground/50 text-lg leading-relaxed max-w-2xl mb-4">
                Sua confiança é parte essencial da nossa marca. Aqui você encontra, com total transparência, como a MS Eletric trata, protege e respeita seus dados pessoais — em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
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

            <PolicyBlock icon={Eye} title="1. Quem somos" index={0}>
              <p>
                A MS Eletric, inscrita sob o CNPJ nº XX.XXX.XXX/0001-XX, com sede na Av. João Pinheiro, 3747, Bairro Brasil, Uberlândia — MG, CEP 38400-714, é a controladora dos dados pessoais coletados por meio deste site, do showroom físico e de seus canais digitais de atendimento.
              </p>
              <p>
                Estamos comprometidos com a segurança, a privacidade e a transparência no tratamento de dados pessoais, respeitando integralmente a legislação brasileira vigente.
              </p>
            </PolicyBlock>

            <PolicyBlock icon={Database} title="2. Dados que coletamos" index={1}>
              <p>Durante sua interação com a MS Eletric, podemos coletar os seguintes dados:</p>
              <ul className="list-none space-y-2.5 mt-3">
                {[
                  "Nome completo — para identificação e personalização do atendimento",
                  "Número de WhatsApp/telefone — para comunicação direta e suporte consultivo",
                  "Cidade e estado — para adequar ofertas, logística e recomendação de modelos",
                  "Mensagens e áudios enviados — para compreender sua necessidade e direcionar o atendimento",
                  "Dados de navegação — cookies, endereço IP, páginas visitadas e tempo de permanência para melhorar a experiência do site",
                  "Informações do quiz — respostas às perguntas de recomendação de modelos para personalizar sugestões",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "hsl(var(--primary) / 0.5)" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </PolicyBlock>

            <PolicyBlock icon={UserCheck} title="3. Finalidade do tratamento" index={2}>
              <p>Seus dados são utilizados exclusivamente para:</p>
              <ul className="list-none space-y-2.5 mt-3">
                {[
                  "Atendimento consultivo — orientar sobre modelos, categorias e soluções de mobilidade elétrica",
                  "Comunicação — responder dúvidas, dar suporte técnico e acompanhar sua jornada de compra",
                  "Personalização — adaptar recomendações, conteúdo e ofertas ao seu perfil de uso",
                  "Melhoria do site — analisar padrões de navegação para otimizar a experiência digital",
                  "Obrigações legais — cumprir exigências fiscais, contratuais e regulatórias aplicáveis",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "hsl(var(--primary) / 0.5)" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Não utilizamos seus dados para envio de spam, marketing não autorizado ou qualquer finalidade incompatível com as listadas acima.
              </p>
            </PolicyBlock>

            <PolicyBlock icon={Lock} title="4. Compartilhamento de dados" index={3}>
              <p>
                A MS Eletric não vende, aluga ou compartilha seus dados pessoais com terceiros para fins comerciais. O compartilhamento pode ocorrer apenas em situações específicas:
              </p>
              <ul className="list-none space-y-2.5 mt-3">
                {[
                  "Prestadores de serviço — plataformas de comunicação (WhatsApp), hospedagem, analytics e processamento, sob contrato de confidencialidade",
                  "Obrigação legal — quando exigido por lei, decisão judicial ou requisição de autoridade competente",
                  "Proteção de direitos — para resguardar os direitos da MS Eletric em processos administrativos ou judiciais",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "hsl(var(--primary) / 0.5)" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </PolicyBlock>

            <PolicyBlock icon={Shield} title="5. Segurança dos dados" index={4}>
              <p>
                Adotamos medidas técnicas e organizacionais para proteger seus dados pessoais contra acesso não autorizado, perda, alteração ou destruição. Entre elas:
              </p>
              <ul className="list-none space-y-2.5 mt-3">
                {[
                  "Criptografia em trânsito (HTTPS/TLS) em todas as comunicações",
                  "Controle de acesso restrito aos dados, limitado à equipe autorizada",
                  "Armazenamento em infraestrutura segura com backups periódicos",
                  "Revisão contínua de processos de segurança",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "hsl(var(--primary) / 0.5)" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </PolicyBlock>

            <PolicyBlock icon={Bell} title="6. Cookies e tecnologias de rastreamento" index={5}>
              <p>
                Utilizamos cookies e tecnologias similares para melhorar a navegação, personalizar conteúdo e analisar o desempenho do site. Os cookies podem ser:
              </p>
              <ul className="list-none space-y-2.5 mt-3">
                {[
                  "Essenciais — necessários para o funcionamento básico do site",
                  "Analíticos — coletam dados anônimos sobre uso e performance",
                  "Funcionais — lembram preferências e configurações do usuário",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "hsl(var(--primary) / 0.5)" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Você pode gerenciar ou desabilitar cookies nas configurações do seu navegador. A desativação de cookies essenciais pode afetar o funcionamento do site.
              </p>
            </PolicyBlock>

            <PolicyBlock icon={Scale} title="7. Seus direitos" index={6}>
              <p>
                De acordo com a LGPD, você tem direito a:
              </p>
              <ul className="list-none space-y-2.5 mt-3">
                {[
                  "Confirmação e acesso — saber se tratamos seus dados e ter acesso a eles",
                  "Correção — solicitar a atualização de dados incompletos, inexatos ou desatualizados",
                  "Anonimização ou bloqueio — de dados desnecessários ou tratados em desconformidade",
                  "Eliminação — solicitar a exclusão de dados pessoais tratados com base no consentimento",
                  "Portabilidade — receber seus dados em formato estruturado",
                  "Revogação do consentimento — a qualquer momento, sem prejuízo ao tratamento já realizado",
                  "Oposição — a tratamento que viole a LGPD",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "hsl(var(--primary) / 0.5)" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Para exercer qualquer desses direitos, entre em contato conosco pelos canais indicados ao final desta página.
              </p>
            </PolicyBlock>

            <PolicyBlock icon={Trash2} title="8. Retenção e eliminação" index={7}>
              <p>
                Seus dados pessoais são armazenados apenas pelo tempo necessário para cumprir as finalidades descritas nesta política ou conforme exigido por lei. Após esse período, os dados são eliminados de forma segura ou anonimizados.
              </p>
              <p>
                Dados relacionados a obrigações legais, fiscais ou regulatórias poderão ser mantidos pelo prazo determinado pela legislação aplicável.
              </p>
            </PolicyBlock>

            <PolicyBlock icon={Mail} title="9. Contato e encarregado (DPO)" index={8}>
              <p>
                Se você tiver dúvidas, solicitações ou reclamações sobre o tratamento de seus dados pessoais, entre em contato:
              </p>
              <div className="mt-4 rounded-lg p-5"
                style={{ background: "hsl(0 0% 100% / 0.03)", border: "1px solid hsl(0 0% 100% / 0.06)" }}>
                <p className="font-semibold text-primary-foreground/70 mb-2">MS Eletric — Encarregado de Proteção de Dados</p>
                <p>E-mail: contato@mseletric.com</p>
                <p>Telefone: (34) 99284-9900</p>
                <p>Endereço: Av. João Pinheiro, 3747 — Brasil, Uberlândia — MG, 38400-714</p>
              </div>
              <p className="mt-4">
                A MS Eletric se reserva o direito de atualizar esta política a qualquer momento, sempre comunicando eventuais alterações relevantes por meio de seus canais oficiais.
              </p>
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
              <motion.div variants={fadeUp}><SectionLabel>Transparência</SectionLabel></motion.div>
              <motion.h2 variants={fadeUp} custom={1}
                className="font-display font-black text-2xl md:text-4xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-5">
                Dúvidas sobre seus{" "}
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}>
                  dados
                </span>?
              </motion.h2>
              <motion.p variants={fadeUp} custom={2}
                className="text-primary-foreground/45 text-[14px] leading-relaxed max-w-lg mx-auto mb-8">
                Nossa equipe está à disposição para esclarecer qualquer questão sobre privacidade, tratamento de dados ou exercício dos seus direitos.
              </motion.p>
              <motion.button
                variants={fadeUp} custom={3}
                onClick={() => { setContactSubject("Privacidade e proteção de dados"); setContactOpen(true); }}
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
