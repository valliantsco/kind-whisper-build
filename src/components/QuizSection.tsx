import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import QuizEngine from "@/components/quiz/QuizEngine";
import type { QuizConfig, QuizResult } from "@/components/quiz/types";

const childDirectResult: QuizResult = {
  category: "Infantil",
  justification:
    "Para crianças e adolescentes, temos opções seguras com controle parental de velocidade.",
  models: [
    {
      name: "Moto Cross Infantil",
      headline: "Diversão segura com controle parental de velocidade",
      specs: "Motor: 800W | Vel. máxima: 32km/h | Autonomia: 35km | Recarga: 6h | Preço: R$ 5.990",
      whyFits: "Possui seletor de velocidade com controle por chave, permitindo que os pais ajustem a velocidade máxima. Ideal para chácaras, sítios e condomínios.",
    },
    {
      name: "Drift Elétrico 350",
      headline: "Drift recreativo com LED RGB e Bluetooth",
      specs: "Motor: 350W | Vel. máxima: 12km/h | Autonomia: 8km | Recarga: 3-5h | Preço: R$ 1.999",
      whyFits: "Para crianças menores que buscam diversão lúdica com sistema de drift, luzes RGB e som Bluetooth em espaços controlados.",
    },
  ],
  suggestions: [],
  whatsappMessage:
    "Olá, fiz o quiz no site e tenho interesse em veículos da linha infantil. Gostaria de saber mais sobre disponibilidade e formas de pagamento.",
};

const businessContext = `A MS Eletric é revendedora autorizada AIMA (líder mundial) de veículos elétricos em Uberlândia-MG.

=== CATÁLOGO COMPLETO COM GATILHOS DE RECOMENDAÇÃO ===

--- AUTOPROPELIDOS (não precisam de habilitação, até 32 km/h) ---

1. BIKE 350
Motor: 350W HUB | Vel. máxima: 29km/h | Autonomia: 40km | Recarga: 7-8h | Bateria: chumbo removível | Carga: 90-100kg | Preço: R$7.990
RECOMENDAR QUANDO: uso leve urbano curto (até 20-25km/dia), prioridade é economia, terreno plano
EVITAR QUANDO: muitas subidas, autonomia >35km/dia, uso profissional intenso

2. BIKE 400+
Motor: 400W Bosch | Vel. máxima: 32km/h | Autonomia: 50km | Recarga: 7-8h | Bateria: lítio removível | Carga: 90-100kg | Preço: R$10.990
RECOMENDAR QUANDO: urbano diário (11-35km/dia), precisa levar bateria para carregar (apartamento)
EVITAR QUANDO: autonomia >50km/dia, desempenho de moto

3. BIKE 500
Motor: 500W Bosch | Vel. máxima: 32km/h | Autonomia: 50km | Recarga: 7-8h | Bateria: lítio removível | Carga: 100-120kg | Preço: R$10.990
RECOMENDAR QUANDO: urbano frequente, condutor mais pesado, uso diário intenso
EVITAR QUANDO: autonomia muito alta (MS600/Bliss melhor), delivery profissional

4. BIKE MS 600
Motor: 600W | Vel. máxima: 32km/h | Autonomia: 70km | Recarga: 7-8h | Bateria: grafeno NÃO removível | Carga: 100-120kg | Preço: R$11.990
RECOMENDAR QUANDO: km/dia 21-55km, prioridade autonomia, rotina intensa sem querer moto
EVITAR QUANDO: precisa levar bateria para carregar (NÃO removível!)

5. BLISS
Motor: 800W | Vel. máxima: 32km/h | Autonomia: 70km | Recarga: 6-7h | Bateria: lítio | Carga: 120-150kg | Preço: R$15.990
RECOMENDAR QUANDO: km/dia 21-55km, prioridade conforto+robustez, ruas ruins/buracos, quer premium
EVITAR QUANDO: quer velocidade alta, delivery/carga profissional

6. LIBERTY ULTRA
Motor: 1.000W | Vel. máxima: 32km/h | Autonomia: 70km | Recarga: 5-6h | Bateria: lítio 64V/30Ah | Carga: 150kg | Preço: R$12.990
RECOMENDAR QUANDO: mais autonomia, baú traseiro, deslocamentos recorrentes, entregas leves
EVITAR QUANDO: quer velocidade de moto, carga pesada

--- BICICLETAS ELÉTRICAS (pedal assistido) ---

7. SANTA MONICA
Motor: 500W | Vel. máxima: 32km/h | Autonomia: 60km | Recarga: 5h | Bateria: lítio | Carga: 120-150kg
RECOMENDAR QUANDO: quer "cara de bike", conforto+recarga rápida, cidade+lazer
EVITAR QUANDO: carga/baú profissional, desempenho de moto

8. BIG SUR
Motor: 500W | Vel. máxima: 32km/h | Autonomia: 60km | Recarga: 5h | Bateria: lítio | Pneus fat 20x4.0 | Carga: 120-150kg
RECOMENDAR QUANDO: ruas ruins/paralelepípedo/terra leve, prioridade estabilidade, pouca confiança em 2 rodas
EVITAR QUANDO: desempenho de moto, carga pesada

--- SCOOTERS ELÉTRICAS ---

9. HOLIDAY 1000
Motor: 1.000W | Vel. máxima: 32km/h | Autonomia: 45km | Recarga: 8-10h | Bateria: lítio removível | Carga: 150kg | Preço: R$10.490
RECOMENDAR QUANDO: mobilidade urbana leve, visual amigável, velocidade controlada, deslocamentos curtos
EVITAR QUANDO: precisa de velocidade alta, autonomia muito longa

10. MS 2500
Motor: 2.500W | Vel. máxima: 52km/h | Autonomia: 50km | Recarga: 6-7h | Bateria: chumbo NÃO removível | Carga: 150kg | Preço: R$14.990
RECOMENDAR QUANDO: quer sensação de moto moderada, desempenho urbano
EVITAR QUANDO: precisa levar bateria (NÃO removível), autonomia muito alta

11. NEW HOLIDAY
Motor: 2.000W | Vel. máxima: 50km/h | Autonomia: 50km | Recarga: 6-8h | Bateria: lítio removível | Carga: 150kg | Preço: R$15.990
RECOMENDAR QUANDO: visual clássico, conforto, banco duplo, recursos: ré, NFC, alarme
EVITAR QUANDO: precisa de autonomia muito alta

12. TOUR 3K
Motor: 3.000W | Vel. máxima: 75km/h | Autonomia: 40km | Recarga: 6-8h | Bateria: lítio removível | Carga: 120kg | Preço: R$16.990
RECOMENDAR QUANDO: quer velocidade+agilidade, muitas subidas, bateria removível
EVITAR QUANDO: precisa rodar muito sem recarga (S3K melhor)

13. S3K
Motor: 3.500W | Vel. máxima: 80km/h | Autonomia: 85km | Recarga: 6-8h | Bateria: lítio removível | Carga: 120kg | Preço: R$19.990
RECOMENDAR QUANDO: km/dia 36-75km, prioridade autonomia+desempenho, quer a scooter mais completa
EVITAR QUANDO: deslocamento curto e econômico

--- TRICICLOS ELÉTRICOS ---

14. TRICICLO ELÉTRICO
Motor: 650W | Vel. máxima: 32km/h | Autonomia: 60km | Recarga: 6-7h | Bateria: chumbo NÃO removível | Carga: 120-150kg | Preço: R$15.990
RECOMENDAR QUANDO: perfil idoso/PCD/pouca confiança, prioridade estabilidade+segurança
EVITAR QUANDO: quer velocidade/agilidade, precisa levar bateria (NÃO removível)

--- UTILITÁRIOS ---

15. RHINO DELIVERY
Motor: 2.000W | Vel: 65km/h | Autonomia: 75km | Recarga: 6-8h | Bateria: lítio removível | Carga: 150kg | Preço: R$18.990
RECOMENDAR QUANDO: delivery/trabalho dia todo, km/dia 36-75km, carga leve a média
EVITAR QUANDO: carga pesada/frete (Cargo), uso pessoal curto

16. CARGO
Motor: 1.000W | Vel: 32km/h | Autonomia: 70km | Recarga: 6-7h | Bateria: chumbo | Carga útil: 400kg | Preço: R$28.990
RECOMENDAR QUANDO: carga pesada, caixas/mercadoria/frete, perfil empresa/equipe
EVITAR QUANDO: mobilidade pessoal+velocidade, delivery leve (Rhino melhor)

--- INFANTIL ---

17. MOTO CROSS INFANTIL
Motor: 800W | Vel: 32km/h | Autonomia: 35km | Recarga: 6h | Carga: 55kg | Preço: R$5.990
RECOMENDAR QUANDO: criança/adolescente, uso recreativo/lazer, chácaras/sítios

18. DRIFT ELÉTRICO 350
Motor: 350W | Vel: 12km/h | Autonomia: 8km | Recarga: 3-5h | Carga: 80kg | Preço: R$1.999
RECOMENDAR QUANDO: crianças menores, drift recreativo, diversão lúdica

--- PATINETES ---

19. PATINETE 350
Motor: 350W | Vel: 30km/h | Autonomia: 30km | Recarga: 5-6h | Carga: 120kg | Preço: R$2.800
RECOMENDAR QUANDO: última milha, condomínios, campus, mobilidade complementar leve

=== REGRAS GERAIS ===
- Sem habilitação → apenas Autopropelidos, Bicicletas Elétricas, Triciclos Elétricos ou Patinetes
- Com habilitação (CNH A/AB) → pode recomendar Scooters Elétricas e Utilitários também
- Bateria removível necessária → NÃO recomendar MS 600, Triciclo, MS 2500 (baterias fixas)
- Entregas profissionais → Rhino Delivery ou Cargo
- Carga pesada/frete → Cargo (400kg)
- Estabilidade/idoso/PCD → Triciclo Elétrico ou Big Sur
- Maior autonomia + potência → S3K
- Melhor custo-benefício entrada → Bike 350
- Ruas ruins → Big Sur (pneu fat) ou Bliss (pneu largo)`;

export const msEletricQuizConfig: QuizConfig = {
  title: "Descubra seu modelo ideal",
  subtitle: "Responda algumas perguntas e receba uma recomendação personalizada",
  teaserHeading: "Não sabe qual escolher?",
  teaserSubheading: "Responda algumas perguntas e receba uma recomendação baseada no seu perfil de uso.",
  teaserCta: "Descobrir meu modelo ideal",
  whatsappNumber: "551151996628",
  businessContext,
  steps: [
    {
      id: "user_profile",
      question: "Quem vai usar o veículo?",
      helperText: "Isso ajuda a gente a indicar o modelo mais seguro e adequado.",
      options: [
        "Vou usar no dia a dia (trabalho, rotina e deslocamentos)",
        "É para presentear uma criança ou adolescente",
        "É para minha empresa / equipe (entregas ou frota)",
        "É para alguém que precisa de mais estabilidade e segurança (ex.: idoso ou pouca confiança em 2 rodas)",
      ],
      skipToResultIf: {
        optionIndex: 1,
        result: childDirectResult,
      },
    },
    {
      id: "main_use",
      question: "Qual será o uso principal do veículo?",
      options: [
        "Deslocamento urbano (dia a dia)",
        "Entregas (delivery)",
        "Transporte de carga/mercadorias",
        "Lazer / passeios",
        "Ainda estou em dúvida (quero uma recomendação)",
      ],
    },
    {
      id: "cnh",
      question: "Você possui habilitação (CNH A ou AB)?",
      helperText: "Autopropelidos e bicicletas elétricas não exigem habilitação.",
      options: [
        "Sim, tenho CNH A ou AB",
        "Não tenho habilitação",
        "Estou tirando / pretendo tirar",
      ],
    },
    {
      id: "budget",
      question: "Qual faixa de investimento faz mais sentido para você?",
      options: [
        "Até R$ 10 mil",
        "R$ 10 a 15 mil",
        "R$ 15 a 20 mil",
        "Acima de R$ 20 mil",
        "Prefiro ver as opções primeiro",
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
              className="inline-flex items-center justify-center gap-2.5 text-[11px] sm:text-sm font-bold uppercase tracking-[0.14em] px-8 md:px-10 py-3.5 md:py-4 rounded-xl text-white overflow-visible cursor-pointer bg-primary"
              whileHover={{ scale: 1.05 }}
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
