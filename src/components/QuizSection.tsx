import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import QuizEngine from "@/components/quiz/QuizEngine";
import type { QuizConfig, QuizResult } from "@/components/quiz/types";

const childDirectResult: QuizResult = {
  category: "Moto Cross Infantil",
  justification:
    "Para crianças e adolescentes, a Moto Cross Infantil é a escolha perfeita com controle de velocidade por chave.",
  models: [
    {
      name: "Moto Cross Infantil",
      headline: "Diversão segura com controle parental de velocidade",
      specs: "Motor: 800W | Vel: 32km/h | Autonomia: 35km | Recarga: 6h | Preço: R$ 5.990",
      whyFits: "Possui seletor de velocidade com controle por chave, permitindo que os pais ajustem a velocidade máxima conforme a idade e experiência. Ideal para diversão segura com ângulo de escalada de 18°.",
    },
  ],
  suggestions: [],
  whatsappMessage:
    "Olá, fiz o quiz no site e tenho interesse na Moto Cross Infantil para presentear. Gostaria de saber mais sobre disponibilidade, formas de pagamento e se posso fazer um test ride.",
};

const businessContext = `A MS Eletric é revendedora autorizada AIMA (líder mundial) de veículos elétricos em Uberlândia-MG.

=== CATÁLOGO COMPLETO COM GATILHOS DE RECOMENDAÇÃO ===

--- AUTOPROPELIDOS (não precisam de habilitação, até 32 km/h) ---

1. BIKE 350
Motor: 350W HUB | Vel: 29km/h | Autonomia: 40km | Recarga: 7-8h | Bateria: chumbo removível | Carga: 90-100kg | Escalada: 7° | Preço: R$7.990
RECOMENDAR QUANDO: uso leve urbano curto (até 20-25km/dia), prioridade é economia/custo-benefício, terreno plano
EVITAR QUANDO: muitas subidas, autonomia >35km/dia, uso profissional intenso, busca velocidade

2. BIKE 400+
Motor: 400W Bosch | Vel: 32km/h | Autonomia: 50km | Recarga: 7-8h | Bateria: lítio removível | Carga: 90-100kg | Escalada: 10° | Freio dianteiro disco | Preço: R$10.990
RECOMENDAR QUANDO: urbano diário (11-35km/dia), precisa levar bateria para carregar (apartamento), prioridade economia+praticidade
EVITAR QUANDO: autonomia >50km/dia, desempenho de moto, carga/baú grande

3. BIKE 500
Motor: 500W Bosch | Vel: 32km/h | Autonomia: 50km | Recarga: 7-8h | Bateria: lítio removível | Carga: 110-120kg | Escalada: 10° | Preço: R$10.990
RECOMENDAR QUANDO: urbano frequente (11-35km/dia), condutor mais pesado, prioridade robustez/durabilidade, uso diário intenso
EVITAR QUANDO: autonomia muito alta (MS600/Bliss melhor), delivery profissional (Rhino), carga pesada (Cargo)

4. BIKE MS 600
Motor: 600W | Vel: 32km/h | Autonomia: 70km | Recarga: 7-8h | Bateria: grafeno NÃO removível | Carga: 100-120kg | Escalada: 10° | Freio dianteiro disco | Preço: R$11.990
RECOMENDAR QUANDO: km/dia 21-55km, prioridade autonomia, rotina intensa sem querer moto
EVITAR QUANDO: precisa levar bateria para carregar (NÃO removível!), quer desempenho de moto

5. BLISS
Motor: 800W | Vel: 32km/h | Autonomia: 70km | Recarga: 6-7h | Bateria: lítio | Pneus: 3.0-10 (largos) | Carga: 120-150kg | Preço: R$15.990
RECOMENDAR QUANDO: km/dia 21-55km, prioridade conforto+robustez+autonomia, ruas ruins/buracos, quer premium sem ser moto
EVITAR QUANDO: quer velocidade alta (Tour 3K/S3K), delivery/carga profissional

--- BICICLETAS ELÉTRICAS (pedal assistido) ---

6. SANTA MONICA
Motor: 500W | Vel: 32km/h | Autonomia: 60km | Recarga: 5h | Bateria: lítio | Aro 27.5" | Freio disco óleo | Carga: 120-150kg
RECOMENDAR QUANDO: quer "cara de bike", conforto+recarga rápida, cidade+lazer, km/dia 11-45km
EVITAR QUANDO: carga/baú profissional, desempenho de moto

7. BIG SUR
Motor: 500W | Vel: 32km/h | Autonomia: 60km | Recarga: 5h | Bateria: lítio | Pneus fat 20x4.0 | Freio disco óleo | Carga: 120-150kg
RECOMENDAR QUANDO: ruas ruins/paralelepípedo/terra leve, prioridade conforto+estabilidade, pouca confiança em 2 rodas (alternativa ao triciclo)
EVITAR QUANDO: desempenho de moto, carga pesada/delivery profissional

--- TRICICLO ---

8. TRICICLO ELÉTRICO
Motor: 650W | Vel: 32km/h | Autonomia: 60km | Recarga: 6-7h | Bateria: chumbo NÃO removível | Carga: 120-150kg | Preço: R$15.990
RECOMENDAR QUANDO: perfil idoso/PCD/pouca confiança, prioridade estabilidade+segurança, urbano tranquilo (11-45km/dia)
EVITAR QUANDO: quer moto rápida/agilidade, carga pesada (Cargo), precisa levar bateria (NÃO removível)

--- MOTOCICLETAS (exigem habilitação CNH A/AB) ---

9. MS 2500
Motor: 2500W | Vel: 52km/h | Autonomia: 50km | Recarga: 6-7h | Bateria: chumbo NÃO removível | Carga: 150kg | Escalada: 12° | Preço: R$18.990
RECOMENDAR QUANDO: quer sensação de moto moderada, desempenho urbano (11-40km/dia)
EVITAR QUANDO: precisa levar bateria (NÃO removível), autonomia muito alta, delivery profissional

10. TOUR 3K
Motor: 3000W | Vel: 75km/h | Autonomia: 40km | Recarga: 6-8h | Bateria: lítio removível | Carga: 120kg | Escalada: 18° | Preço: R$16.990
RECOMENDAR QUANDO: quer moto+velocidade+agilidade, muitas subidas, bateria removível, km/dia 11-35km
EVITAR QUANDO: precisa rodar muito sem recarga (S3K/Rhino melhor), busca economia/uso tranquilo

11. S3K (MS 3500)
Motor: 3500W | Vel: 80km/h | Autonomia: 85km | Recarga: 6-8h | Bateria: lítio removível | Carga: 120kg | Escalada: 18° | Preço: R$18.990
RECOMENDAR QUANDO: km/dia 36-75km, prioridade autonomia+desempenho, rotina intensa, quer a moto mais completa
EVITAR QUANDO: deslocamento curto e econômico (autopropelidos), foco delivery com estrutura (Rhino)

12. RHINO DELIVERY
Motor: 2000W | Vel: 65km/h | Autonomia: 75km | Recarga: 6-8h | Bateria: lítio removível | Carga: 150kg | Preço: R$18.990
RECOMENDAR QUANDO: delivery/trabalho dia todo, km/dia 36-75km, prioridade durabilidade+autonomia+agilidade, carga leve a média
EVITAR QUANDO: carga pesada/frete (Cargo), uso pessoal curto (autopropelidos)

13. CARGO
Motor: 1000W | Vel: 32km/h | Autonomia: 70km | Recarga: 6-7h | Bateria: chumbo | Carga útil: 400kg | Preço: R$28.990
RECOMENDAR QUANDO: carga pesada, caixas/mercadoria/frete, perfil empresa/equipe, transporte de mercadorias
EVITAR QUANDO: mobilidade pessoal+velocidade, delivery leve de comida/pacotes (Rhino melhor)

14. MOTO CROSS INFANTIL
Motor: 800W | Vel: 32km/h | Autonomia: 35km | Recarga: 6h | Seletor de velocidade com controle por chave | Carga: 55kg | Preço: R$5.990
RECOMENDAR QUANDO: criança/adolescente, uso recreativo/lazer
EVITAR QUANDO: qualquer cenário de deslocamento urbano real, trabalho, entrega

=== REGRAS GERAIS ===
- Sem habilitação → apenas Autopropelidos, Bikes Elétricas ou Triciclo
- Bateria removível necessária → NÃO recomendar MS 600, Triciclo, MS 2500 (baterias fixas)
- Entregas profissionais → Rhino Delivery ou Cargo
- Carga pesada/frete → Cargo (400kg)
- Estabilidade/idoso/PCD → Triciclo Elétrico ou Big Sur
- Maior autonomia + potência com moto → S3K
- Melhor custo-benefício entrada → Bike 350
- Ruas ruins → Big Sur (pneu fat) ou Bliss (pneu largo)`;

const msEletricQuizConfig: QuizConfig = {
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
      id: "km_per_day",
      question: "Em média, quantos quilômetros pretende rodar por dia?",
      options: [
        "Até 20 km",
        "21 a 35 km",
        "36 a 55 km",
        "Mais de 55 km",
      ],
    },
    {
      id: "route_terrain",
      question: "Como são as ruas e o relevo onde você anda?",
      options: [
        "Cidade com asfalto bom, poucas subidas",
        "Ruas ruins (buracos, paralelepípedo) ou muitas subidas",
        "Misto (asfalto + terra leve)",
        "Uso curto (condomínio / bairro / pequenas distâncias)",
      ],
    },
    {
      id: "cargo_need",
      question: "Precisa transportar carga com frequência?",
      options: [
        "Não, no máximo mochila ou bolsa",
        "Sim, itens leves (pequenos volumes)",
        "Sim, baú médio / volumes maiores",
        "Sim, carga pesada (mercadorias/frete)",
      ],
    },
    {
      id: "charging",
      question: "Onde pretende carregar o veículo?",
      helperText: "Isso ajuda a definir se você precisa de bateria removível.",
      options: [
        "Tenho tomada fácil na garagem (carrego no local)",
        "Preciso levar a bateria para carregar (apartamento / sem tomada)",
        "No trabalho ou faculdade",
        "Em casa e no trabalho",
      ],
    },
    {
      id: "priorities",
      question: "O que é mais importante para você? (escolha até 2)",
      multiSelect: true,
      maxSelections: 2,
      options: [
        "Autonomia (rodar mais sem preocupação)",
        "Economia (menor custo no dia a dia)",
        "Conforto (uso agradável e estável)",
        "Desempenho (mais velocidade e retomada)",
        "Estabilidade e segurança (paradas e manobras)",
        "Robustez / durabilidade (uso intenso)",
        "Capacidade de carga (transportar volumes)",
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
