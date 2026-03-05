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
      question: "Me conta, quem vai usar o veículo?",
      options: [
        "Eu mesmo, para o dia a dia",
        "É para presentear uma criança ou adolescente",
        "Para minha empresa ou equipe de entregas",
        "Para um familiar que precisa de mais estabilidade",
      ],
    },
    {
      question: "Como é a sua rotina hoje? O que mais pesa no seu deslocamento?",
      options: [
        "Vou e volto do trabalho/faculdade todo dia, preciso de algo confiável",
        "Faço entregas o dia inteiro, preciso de autonomia e agilidade",
        "Uso mais nos fins de semana, passeios e lazer",
        "Preciso resolver coisas rápidas no bairro (mercado, farmácia, banco)",
        "Quero algo para trilhas e diversão off-road",
      ],
    },
    {
      question: "Como são as ruas e o trajeto onde você anda?",
      options: [
        "Tudo plano, asfalto liso, cidade tranquila",
        "Tem bastante subida e o asfalto nem sempre é bom",
        "Pego estrada de terra, trilha ou terreno irregular",
        "Misto — um pouco de tudo",
      ],
    },
    {
      question: "Você tem habilitação para pilotar moto?",
      options: [
        "Sim, tenho CNH categoria A ou AB",
        "Não tenho, quero algo que não precise",
        "Estou tirando, mas ainda não tenho",
      ],
    },
    {
      question: "Quanto você costuma andar por dia, mais ou menos?",
      options: [
        "Bem pouco, menos de 15 km",
        "Entre 15 e 40 km",
        "Entre 40 e 70 km",
        "Mais de 70 km por dia",
      ],
    },
    {
      question: "Vai precisar carregar peso, carga ou outra pessoa?",
      options: [
        "Só eu, sem carga",
        "Levo mochila, compras do mercado, coisas leves",
        "Preciso levar carga pesada (caixas, entregas grandes)",
        "Quero levar garupa de vez em quando",
      ],
    },
    {
      question: "Se tivesse que escolher só uma coisa, o que importa mais?",
      options: [
        "Pagar o menor preço possível",
        "Ir o mais longe sem recarregar",
        "Ter velocidade e potência",
        "Conforto e praticidade no dia a dia",
        "Não precisar de habilitação",
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
