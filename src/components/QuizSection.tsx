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
  businessContext: `A MS Eletric é revendedora autorizada AIMA (líder mundial) de veículos elétricos em Uberlândia-MG. Catálogo real:

AUTOPROPELIDOS (não precisam de habilitação, até 32 km/h):
- Bike 350: 350W HUB, 29km/h, 40km autonomia, bateria chumbo removível, 90-100kg carga, R$7.990
- Bike 400+: 400W Bosch, 32km/h, 50km autonomia, bateria lítio removível, 90-100kg carga, R$10.990
- Bike 500: 500W Bosch, 32km/h, 50km autonomia, bateria lítio removível, 100-120kg carga, R$10.990
- Bike MS 600: 600W, 32km/h, 70km autonomia, bateria grafeno (não removível), freio a disco, 100-120kg, R$11.990
- Bliss: 800W, 32km/h, 70km autonomia, bateria lítio, 120-150kg carga, R$15.990

BIKES ELÉTRICAS (pedal assistido, pneus grandes):
- Santa Monica: 500W, 32km/h, 60km autonomia, bateria lítio, freio disco óleo, pneu 27.5", 120-150kg
- Big Sur: 500W, 32km/h, 60km autonomia, bateria lítio, freio disco óleo, pneu fat 20"x4.0, 120-150kg

TRICICLO ELÉTRICO:
- Triciclo Elétrico: 650W, 32km/h, 60km autonomia, bateria chumbo, 120-150kg, R$15.990 (ideal para estabilidade e acessibilidade)

MOTOCICLETAS ELÉTRICAS (exigem habilitação):
- Tour 3K: 3000W, 75km/h, 40km autonomia, bateria lítio removível, 120kg, R$16.990
- MS 3500: 3500W, 80km/h, 85km autonomia, bateria lítio removível, 120kg, R$18.990
- MS 2500: 2500W, 52km/h, 50km autonomia, bateria chumbo, 150kg, R$18.990
- Rhino Delivery: 2000W, 65km/h, 75km autonomia, bateria lítio removível, 150kg, R$18.990 (foco entregas)
- Cargo: 1000W, 32km/h, 70km autonomia, bateria chumbo, 400kg carga útil, R$28.990 (triciclo de carga pesada)

INFANTIL:
- Moto Cross Infantil: 800W, 32km/h, 35km autonomia, seletor de velocidade com controle por chave, 55kg, R$5.990

REGRAS DE RECOMENDAÇÃO:
- Sem habilitação → apenas Autopropelidos, Bikes Elétricas ou Triciclo
- Entregas/delivery → Rhino Delivery ou Cargo
- Criança → Moto Cross Infantil
- Maior autonomia + potência → MS 3500
- Melhor custo-benefício → Bike 350 ou Bike 400+
- Terreno irregular/trilha → Big Sur (pneu fat) ou Santa Monica
- Estabilidade/idoso/PCD → Triciclo Elétrico
- Carga pesada comercial → Cargo (400kg)`,
  steps: [
    {
      question: "Para quem é o veículo?",
      options: [
        "Para mim (adulto)",
        "Para uma criança / adolescente",
        "Para minha empresa (entregas/operação)",
      ],
    },
    {
      question: "Qual será o principal uso?",
      options: [
        "Ir e voltar do trabalho / faculdade",
        "Entregas e delivery",
        "Lazer e passeios",
        "Preciso de estabilidade extra (idoso, PCD)",
        "Não sei ainda",
      ],
    },
    {
      question: "Você possui habilitação (CNH)?",
      options: [
        "Sim, posso pilotar motocicleta",
        "Não tenho habilitação",
        "Não sei se precisa",
      ],
    },
    {
      question: "Qual a distância média que você percorre por dia?",
      options: ["Até 15 km", "15 a 40 km", "40 a 70 km", "Mais de 70 km"],
    },
    {
      question: "O que é mais importante pra você?",
      options: [
        "Menor preço / economia",
        "Maior autonomia (ir mais longe)",
        "Velocidade e potência",
        "Capacidade de carga",
        "Conforto e praticidade",
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
