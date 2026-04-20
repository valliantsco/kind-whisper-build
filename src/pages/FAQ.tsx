import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Search, ChevronDown, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import HomeFooter from "@/components/home/HomeFooter";
import PopUpContato01 from "@/components/PopUpContato01";
import AnimatedBackground from "@/components/home/AnimatedBackground";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ_CATEGORIES = [
  {
    id: "compra",
    label: "Compra e Pagamento",
    questions: [
      { q: "Como funciona o processo de compra?", a: "Você pode iniciar sua compra pelo nosso site, entrando em contato pelo WhatsApp ou visitando nossa loja em Uberlândia. Um consultor especializado acompanha cada etapa para garantir a melhor experiência." },
      { q: "Quais formas de pagamento são aceitas?", a: "Trabalhamos com diversas formas de pagamento. Consulte nosso time comercial para conhecer as condições disponíveis para o modelo de seu interesse." },
      { q: "Vocês fazem entrega para todo o Brasil?", a: "Consulte nosso time para verificar a disponibilidade de entrega na sua região e as condições de frete." },
      { q: "É possível financiar?", a: "Entre em contato com nosso time comercial para conhecer as opções de pagamento facilitado disponíveis." },
    ],
  },
  {
    id: "produto",
    label: "Produtos e Modelos",
    questions: [
      { q: "Qual modelo é ideal para mim?", a: "Depende do seu perfil de uso. Nosso quiz de recomendação ajuda a identificar o modelo certo, ou você pode falar com um consultor para uma indicação personalizada." },
      { q: "Preciso de habilitação para pilotar?", a: "Depende do modelo. Autopropelidos e bicicletas elétricas não exigem habilitação. Motos elétricas podem exigir CNH categoria A. Consulte as especificações de cada modelo." },
      { q: "Qual a autonomia dos veículos?", a: "A autonomia varia conforme o modelo, condições de uso, peso do piloto e terreno. Cada página de produto apresenta a autonomia estimada em condições normais de uso." },
      { q: "Posso fazer um test-ride?", a: "Sim! Oferecemos a possibilidade de test-ride em nossa loja de Uberlândia. Entre em contato para agendar o seu." },
    ],
  },
  {
    id: "pos-venda",
    label: "Pós-venda e Suporte",
    questions: [
      { q: "Como funciona a garantia?", a: "Todos os veículos contam com garantia de fábrica. As condições específicas variam conforme o modelo. Consulte nosso time para detalhes completos." },
      { q: "Onde encontro assistência técnica?", a: "A MS Eletric oferece suporte técnico direto. Entre em contato pelo WhatsApp para orientações, agendamento de manutenção ou solicitação de peças." },
      { q: "Vocês vendem peças de reposição?", a: "Sim. Trabalhamos com peças originais para todos os modelos do nosso portfólio. Entre em contato para verificar disponibilidade." },
      { q: "Como faço a manutenção do meu veículo?", a: "A manutenção de veículos elétricos é mais simples que a de veículos a combustão. Nosso time pode orientar sobre os cuidados básicos e agendar revisões quando necessário." },
    ],
  },
  {
    id: "geral",
    label: "Geral",
    questions: [
      { q: "A MS Eletric é revendedora autorizada?", a: "Sim. A MS Eletric é revendedora autorizada AIMA no Brasil, com produtos certificados e suporte oficial." },
      { q: "Onde fica a loja física?", a: "Nossa loja fica na Av. João Pinheiro, 3747 — Brasil, Uberlândia/MG. Funcionamos de segunda a sexta das 9h às 18h e sábados das 9h às 12h." },
      { q: "Vocês atuam em outras cidades?", a: "Atualmente nossa loja física está em Uberlândia, mas atendemos clientes de diversas regiões. Consulte as condições de envio para sua localidade." },
    ],
  },
];

const FAQ = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState<string | undefined>();
  const [activeCategory, setActiveCategory] = useState("compra");
  const [searchTerm, setSearchTerm] = useState("");

  const activeQuestions = FAQ_CATEGORIES.find((c) => c.id === activeCategory)?.questions ?? [];

  const filteredQuestions = searchTerm.trim()
    ? FAQ_CATEGORIES.flatMap((c) => c.questions).filter(
        (q) =>
          q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.a.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : activeQuestions;

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
              className="text-center mb-12 md:mb-16"
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
                <HelpCircle className="w-6 h-6 text-primary" />
              </motion.div>

              <h1 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-primary-foreground uppercase tracking-tight mb-4">
                Perguntas{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
                >
                  Frequentes
                </span>
              </h1>
              <p className="text-base text-primary-foreground/45 max-w-xl mx-auto">
                Encontre respostas rápidas sobre nossos produtos, compra, pagamento e suporte.
              </p>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="max-w-lg mx-auto mb-10"
            >
              <div
                className="relative rounded-xl overflow-hidden"
                style={{
                  background: "hsl(0 0% 100% / 0.03)",
                  border: "1px solid hsl(0 0% 100% / 0.08)",
                }}
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/30" />
                <input
                  type="text"
                  placeholder="Buscar pergunta..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent pl-11 pr-4 py-3.5 text-sm text-primary-foreground placeholder:text-primary-foreground/25 outline-none"
                />
              </div>
            </motion.div>

            {/* Category tabs */}
            {!searchTerm.trim() && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-2 mb-10"
              >
                {FAQ_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-300 cursor-pointer ${
                      activeCategory === cat.id
                        ? "text-primary-foreground"
                        : "text-primary-foreground/40 hover:text-primary-foreground/60"
                    }`}
                    style={{
                      background:
                        activeCategory === cat.id
                          ? "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.08))"
                          : "hsl(0 0% 100% / 0.03)",
                      border: `1px solid ${
                        activeCategory === cat.id
                          ? "hsl(var(--primary) / 0.25)"
                          : "hsl(0 0% 100% / 0.06)"
                      }`,
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Questions */}
            <div className="max-w-2xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {filteredQuestions.map((item, i) => (
                  <motion.div
                    key={`${activeCategory}-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <AccordionItem
                      value={`faq-${i}`}
                      className="rounded-xl border-0 overflow-hidden"
                      style={{
                        background: "linear-gradient(145deg, hsl(0 0% 100% / 0.03) 0%, hsl(0 0% 100% / 0.01) 100%)",
                        border: "1px solid hsl(0 0% 100% / 0.06)",
                      }}
                    >
                      <AccordionTrigger className="px-6 py-5 text-sm font-semibold text-primary-foreground/85 hover:no-underline hover:text-primary transition-colors [&>svg]:text-primary/50 [&>svg]:w-4 [&>svg]:h-4">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-5 text-sm text-primary-foreground/50 leading-relaxed">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>

              {filteredQuestions.length === 0 && (
                <p className="text-center text-sm text-primary-foreground/30 py-12">
                  Nenhuma pergunta encontrada para "{searchTerm}".
                </p>
              )}
            </div>

            {/* CTA — didn't find your answer */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-lg mx-auto mt-16 rounded-2xl p-8 text-center relative overflow-hidden"
              style={{
                background: "hsl(var(--primary) / 0.04)",
                border: "1px solid hsl(var(--primary) / 0.12)",
              }}
            >
              <MessageCircle className="w-8 h-8 text-primary/40 mx-auto mb-4" />
              <h3 className="font-display font-bold text-lg text-primary-foreground uppercase tracking-wide mb-2">
                Não encontrou sua resposta?
              </h3>
              <p className="text-sm text-primary-foreground/40 mb-6">
                Fale com nosso time. Respondemos rápido e sem burocracia.
              </p>
              <button
                onClick={() => setContactOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                  boxShadow: "0 8px 24px -6px hsl(var(--primary) / 0.4)",
                }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.33 0-4.49-.744-6.255-2.01l-.438-.328-3.205 1.074 1.074-3.205-.328-.438A9.71 9.71 0 012.25 12 9.75 9.75 0 0112 2.25 9.75 9.75 0 0121.75 12 9.75 9.75 0 0112 21.75z" />
                </svg>
                Falar com a MS Eletric
              </button>
            </motion.div>
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

export default FAQ;
