import { motion } from "framer-motion";
import {
  Shield, Award, Leaf, Zap, Globe, Users, MapPin, Truck,
  ChevronRight, Building2, Handshake, TrendingUp, BadgeCheck,
  Lightbulb, HeartHandshake, Target,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

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

const ABVE = () => {
  return (
    <div className="min-h-screen bg-foreground text-primary-foreground">
      <Header />

      {/* ─── 1. HERO ─── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, hsl(11 81% 57% / 0.3), transparent 70%)", filter: "blur(80px)" }} />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, hsl(11 90% 65% / 0.25), transparent 70%)", filter: "blur(60px)" }} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.4), transparent)" }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-xs uppercase tracking-[0.15em] text-primary font-medium">Associada ABVE</span>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-[0.95] mb-6">
              Parte do ecossistema{" "}
              <span className="gradient-text">oficial</span> da mobilidade elétrica no Brasil
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-base md:text-lg text-primary-foreground/50 max-w-2xl mx-auto leading-relaxed mb-4">
              A MS Eletric integra a Associação Brasileira do Veículo Elétrico — a entidade que reúne os principais agentes da eletromobilidade no país. Essa associação reflete nosso compromisso com inovação, credibilidade e o avanço real da mobilidade elétrica.
            </motion.p>

            <motion.p variants={fadeUp} custom={3} className="text-sm text-primary-foreground/35 max-w-xl mx-auto leading-relaxed">
              Mais do que um selo, é a formalização de um posicionamento: estar ao lado de quem constrói o futuro do transporte no Brasil.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. O QUE É A ABVE ─── */}
      <section className="py-20 md:py-28 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4 block">Sobre a ABVE</span>
              <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight leading-[1] mb-6">
                A voz da eletromobilidade no Brasil
              </h2>
              <div className="space-y-4 text-primary-foreground/55 text-sm md:text-base leading-relaxed">
                <p>
                  A ABVE — Associação Brasileira do Veículo Elétrico — é a principal entidade representativa do setor de veículos elétricos no país. Fundada para promover o desenvolvimento, a regulamentação e a disseminação da mobilidade elétrica, a associação reúne fabricantes, distribuidores, prestadores de serviço e empresas comprometidas com a transformação do transporte.
                </p>
                <p>
                  Atuar junto à ABVE significa participar de um ambiente de diálogo técnico, regulatório e estratégico que influencia diretamente o futuro da eletromobilidade brasileira. É um espaço onde se discutem políticas públicas, tendências de mercado, infraestrutura de recarga e padrões de qualidade.
                </p>
                <p>
                  Ser associada à ABVE não é apenas uma credencial — é um compromisso com a evolução do setor e com a construção de um mercado mais maduro, confiável e acessível para todos.
                </p>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={2} className="relative">
              <div className="aspect-square rounded-2xl border border-primary/10 bg-primary/[0.03] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, hsl(11 81% 57% / 0.08), transparent 70%)" }} />
                <div className="text-center relative z-10 p-8">
                  <img
                    src="https://abve.org.br/wp-content/uploads/2024/03/Ms-eletric.png"
                    alt="MS Eletric — Associada ABVE"
                    className="w-48 md:w-56 mx-auto mb-6 drop-shadow-lg"
                    loading="lazy"
                  />
                  <p className="text-xs uppercase tracking-[0.2em] text-primary/70 font-medium">Membro Oficial</p>
                  <p className="text-lg font-bold text-primary-foreground/80 mt-1">ABVE</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 3. POR QUE ISSO IMPORTA ─── */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-primary/[0.02]" />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.15), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.15), transparent)" }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4 block">Relevância</span>
            <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight leading-[1] mb-5">
              Por que essa associação importa
            </h2>
            <p className="text-primary-foreground/50 text-sm md:text-base leading-relaxed">
              Em um mercado em construção, estar conectado à entidade que organiza, representa e fortalece o setor não é opcional — é estratégico. Para a MS Eletric, essa associação vai além da representatividade: ela reforça cada promessa que fazemos.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Seriedade comprovada", text: "A associação à ABVE valida que a MS Eletric opera dentro dos padrões e práticas reconhecidas pelo setor." },
              { icon: Handshake, title: "Confiança institucional", text: "O cliente sabe que está diante de uma marca integrada ao ecossistema oficial da eletromobilidade." },
              { icon: TrendingUp, title: "Alinhamento setorial", text: "Participação ativa nas discussões que moldam regulamentações, tendências e o futuro do mercado." },
              { icon: Lightbulb, title: "Conexão com inovação", text: "Acesso direto às novidades, avanços tecnológicos e melhores práticas da indústria elétrica." },
              { icon: Leaf, title: "Sustentabilidade real", text: "Compromisso formalizado com a mobilidade de zero emissão e com o impacto positivo no planeta." },
              { icon: Building2, title: "Posicionamento de mercado", text: "A MS Eletric não está isolada — faz parte de uma rede que movimenta e transforma o setor no Brasil." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={fadeUp}
                custom={i * 0.5}
                className="p-6 rounded-2xl border border-primary/10 bg-primary/[0.03] hover:border-primary/25 transition-colors duration-300"
              >
                <item.icon className="w-6 h-6 text-primary mb-4" />
                <h3 className="font-bold text-sm uppercase tracking-wide mb-2 text-primary-foreground/90">{item.title}</h3>
                <p className="text-xs text-primary-foreground/45 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. MS ELETRIC E O FUTURO DA MOBILIDADE ─── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4 block text-center">Visão de futuro</span>
              <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight leading-[1] mb-8 text-center">
                MS Eletric e o futuro da mobilidade
              </h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={1} className="space-y-5 text-primary-foreground/55 text-sm md:text-base leading-relaxed">
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
          </div>
        </div>
      </section>

      {/* ─── 5. BLOCO INSTITUCIONAL — CONTEÚDO ABVE ─── */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-primary/[0.02]" />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.15), transparent)" }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4 block">Posicionamento</span>
              <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight leading-[1] mb-6">
                Mobilidade elétrica com propósito
              </h2>
              <div className="space-y-4 text-primary-foreground/55 text-sm md:text-base leading-relaxed">
                <p>
                  A MS Eletric nasceu para apresentar soluções inovadoras de mobilidade, integrando tecnologia e sustentabilidade em cada detalhe — dos modelos oferecidos à experiência de atendimento.
                </p>
                <p>
                  Nosso portfólio é composto exclusivamente por veículos puramente elétricos: silenciosos, com zero emissão de gás carbônico e pensados para transformar a forma como as pessoas se deslocam. É uma experiência de condução completamente nova — mais limpa, mais inteligente e mais conectada ao futuro.
                </p>
                <p>
                  Mas não nos limitamos ao produto. Acreditamos que a experiência com mobilidade elétrica começa antes da compra e se estende muito além dela. Por isso, oferecemos entrega imediata, garantia real, assistência técnica especializada e personalização — porque cada cliente tem uma necessidade diferente, e cada solução precisa fazer sentido na prática.
                </p>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={2}>
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4 block">Excelência</span>
              <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight leading-[1] mb-6">
                Qualidade em cada etapa
              </h2>
              <div className="space-y-4 text-primary-foreground/55 text-sm md:text-base leading-relaxed">
                <p>
                  Na MS Eletric, qualidade não é apenas um atributo do produto — é um compromisso que permeia cada interação. Do primeiro contato à assistência técnica, cada etapa é pensada para que o cliente se sinta seguro, bem orientado e confiante na sua escolha.
                </p>
                <p>
                  Trabalhamos com modelos que aliam design, desempenho e tecnologia de ponta. Cada veículo elétrico do nosso portfólio é selecionado com critério, testado com rigor e apresentado com transparência. Não vendemos apenas mobilidade — entregamos uma experiência completa.
                </p>
                <p>
                  É esse nível de cuidado que nos credencia como associada ABVE e nos posiciona como referência no segmento.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 6. ESTRUTURA E PRESENÇA ─── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4 block">Presença</span>
            <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight leading-[1] mb-5">
              Estrutura real, alcance nacional
            </h2>
            <p className="text-primary-foreground/50 text-sm md:text-base leading-relaxed">
              A MS Eletric combina presença física com capacidade de atendimento em todo o país, garantindo proximidade e acessibilidade para diferentes perfis de cliente.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MapPin, title: "Uberlândia — MG", text: "Sede e showroom principal na Av. João Pinheiro, uma das avenidas mais conhecidas da cidade." },
              { icon: Building2, title: "Revendas", text: "Pontos de atendimento em Uberlândia e Caldas Novas (GO), ampliando a presença regional." },
              { icon: Globe, title: "Atendimento Online", text: "Canais digitais de venda e atendimento para todo o território nacional." },
              { icon: Truck, title: "Entrega Imediata", text: "Estoque disponível para pronta entrega, sem longas esperas ou incertezas." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={fadeUp}
                custom={i * 0.5}
                className="text-center p-6 rounded-2xl border border-primary/10 bg-primary/[0.03]"
              >
                <item.icon className="w-7 h-7 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-sm uppercase tracking-wide mb-2 text-primary-foreground/90">{item.title}</h3>
                <p className="text-xs text-primary-foreground/45 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. PILARES — O QUE ESSA ASSOCIAÇÃO REFORÇA ─── */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-primary/[0.02]" />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.15), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.15), transparent)" }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4 block">Pilares</span>
            <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight leading-[1] mb-5">
              O que essa associação reforça sobre a marca
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={fadeUp}
                custom={i * 0.4}
                className="p-6 rounded-2xl border border-primary/10 bg-primary/[0.03] hover:border-primary/25 transition-colors duration-300"
              >
                <p.icon className="w-6 h-6 text-primary mb-4" />
                <h3 className="font-bold text-sm uppercase tracking-wide mb-2 text-primary-foreground/90">{p.title}</h3>
                <p className="text-xs text-primary-foreground/45 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. CONEXÃO COM VALORES ─── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4 block">Valores</span>
            <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight leading-[1] mb-5">
              ABVE e os valores da MS Eletric
            </h2>
            <p className="text-primary-foreground/50 text-sm md:text-base leading-relaxed">
              A associação à ABVE não é um adendo — é uma extensão natural dos valores que já guiam a MS Eletric desde o início.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-8">
            {VALUES_CONNECT.map((v, i) => (
              <motion.div
                key={v.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={fadeUp}
                custom={i * 0.5}
                className="flex gap-4 items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wide mb-1 text-primary-foreground/90">{v.label}</h3>
                  <p className="text-xs text-primary-foreground/45 leading-relaxed">{v.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. CTA FINAL ─── */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, hsl(11 81% 57% / 0.06), transparent 70%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.3), transparent)" }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="max-w-3xl mx-auto text-center">
            <h2 className="font-black text-3xl md:text-5xl uppercase tracking-tight leading-[0.95] mb-6">
              Conheça a marca que faz parte do{" "}
              <span className="gradient-text">futuro da mobilidade</span>
            </h2>
            <p className="text-primary-foreground/50 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-10">
              A MS Eletric é mais do que uma empresa de veículos elétricos. É uma marca integrada ao ecossistema que transforma a mobilidade no Brasil. Descubra nossos modelos, visite nosso showroom ou fale com nosso time.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/modelos">
                <motion.button
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                    color: "white",
                    boxShadow: "0 4px 20px hsl(11 81% 57% / 0.25)",
                  }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px hsl(11 81% 57% / 0.5)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explorar Modelos
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </Link>

              <a
                href="https://wa.me/5534992849900"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 rounded-xl border border-primary/30 text-primary-foreground/80 hover:border-primary/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-primary" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Falar com o Time
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default ABVE;
