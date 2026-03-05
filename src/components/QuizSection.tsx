import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import QuizEngine from "@/components/quiz/QuizEngine";
import type { QuizConfig } from "@/components/quiz/types";

const msEletricQuizConfig: QuizConfig = {
  title: "Descubra seu modelo ideal",
  subtitle: "Responda algumas perguntas e receba uma recomendação personalizada",
  teaserHeading: "Não sabe qual escolher?",
  teaserSubheading: "Responda algumas perguntas e receba uma recomendação baseada no seu uso.",
  teaserCta: "Descobrir meu modelo ideal",
  whatsappNumber: "551151996628",
  businessContext: `A MS Eletric é uma revendedora de veículos elétricos com as seguintes categorias:

1. Motos & Scooters Elétricas — Para uso urbano, rotina diária, deslocamento cidade. Modelos: Scooter City 800W, Urban Pro 1500W, Delivery Max.
2. Bike Elétrica — Mobilidade leve, pedal assistido, ciclovias. Modelos: E-Bike Urban, E-Bike Dobrável, E-Bike Cargo.
3. Triciclos Elétricos — Conforto, estabilidade, acessibilidade. Modelos: Comfort T3, Triciclo Premium, Triciclo Cargo.
4. Autopropelidos — Praticidade, última milha, compactos. Modelos: Patinete Pro, Hoverboard X, Monociclo Elétrico.
5. Motocross Elétrica — Lazer, trilha, off-road. Modelos: Trail X, Adventure Sport E, Cross 3000W.

Considere autonomia, terreno, peso suportado, velocidade e finalidade de uso ao recomendar.`,
  steps: [
    {
      question: "Qual será o principal uso do veículo?",
      options: [
        "Cidade / Rotina diária",
        "Trabalho / Entregas",
        "Lazer / Passeios",
        "Conforto / Estabilidade",
        "Não sei ainda",
      ],
    },
    {
      question: "Qual a distância média que você percorre por dia?",
      options: ["Até 15 km", "15 a 30 km", "30 a 60 km", "Mais de 60 km", "Não sei"],
    },
    {
      question: "Como é o terreno na sua região?",
      options: [
        "Plano (cidade, asfalto)",
        "Misto (plano + algumas subidas)",
        "Muitas subidas / terreno irregular",
      ],
    },
    {
      question: "Vai carregar peso ou garupa com frequência?",
      options: [
        "Sozinho na maior parte do tempo",
        "Garupa ocasionalmente",
        "Carga frequente (entregas, compras)",
      ],
    },
    {
      question: "O que é mais importante pra você?",
      options: [
        "Autonomia (ir mais longe)",
        "Conforto no dia a dia",
        "Economia e custo-benefício",
        "Desempenho e velocidade",
      ],
    },
  ],
};

const QuizSection = () => {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <>
      {/* Teaser section */}
      <section className="py-20 md:py-28 bg-foreground text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl mb-4">
              {msEletricQuizConfig.teaserHeading}{" "}
              <span className="text-primary">Descubra em 1 minuto.</span>
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">
              {msEletricQuizConfig.teaserSubheading}
            </p>
            <motion.button
              className="inline-flex items-center justify-center gap-2.5 text-[11px] sm:text-sm font-bold uppercase tracking-[0.14em] px-8 md:px-10 py-3.5 md:py-4 rounded-xl text-white overflow-visible cursor-pointer"
              style={{
                background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                boxShadow: "0 4px 20px hsl(11 81% 57% / 0.25)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px hsl(11 81% 57% / 0.5), 0 0 50px hsl(11 81% 57% / 0.2)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setQuizOpen(true)}
            >
              <Sparkles className="w-4 h-4" />
              {msEletricQuizConfig.teaserCta}
            </motion.button>
          </motion.div>
        </div>
      </section>

      <QuizEngine
        config={msEletricQuizConfig}
        open={quizOpen}
        onOpenChange={setQuizOpen}
      />
    </>
  );
};

export default QuizSection;
