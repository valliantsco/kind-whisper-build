/**
 * Product-specific commercial content for rich product pages.
 * Keyed by product slug.
 */

export interface ProductContent {
  headline: string;
  subheadline: string;
  supportText: string;
  idealFor: { icon: string; title: string; desc: string }[];
  whyChoose: { title: string; desc: string }[];
  dailyBenefits: { title: string; desc: string }[];
  urbanContext: { title: string; body: string; highlights: string[] };
  specContexts: Record<string, string>;
  differentials: { title: string; body: string };
  comparisonTip: string;
  faq: { q: string; a: string }[];
  finalCta: { title: string; subtitle: string };
}

export const PRODUCT_CONTENT: Record<string, ProductContent> = {
  "bike-350": {
    headline: "Sua entrada inteligente na mobilidade elétrica",
    subheadline:
      "A Bike 350 é a escolha certa para quem quer praticidade, economia e um jeito mais leve de se deslocar pela cidade — sem complicação.",
    supportText:
      "Compacta, funcional e pensada para o dia a dia urbano. Se você busca uma alternativa prática ao carro, ao ônibus ou à bicicleta convencional, a Bike 350 entrega exatamente o que você precisa.",
    idealFor: [
      {
        icon: "route",
        title: "Deslocamentos curtos",
        desc: "Trajetos de até 40 km no dia a dia, como ir ao trabalho, faculdade ou resolver tarefas pela cidade.",
      },
      {
        icon: "piggyBank",
        title: "Economia na rotina",
        desc: "Sem combustível, sem IPVA, sem estacionamento caro. A recarga custa centavos por dia.",
      },
      {
        icon: "sparkles",
        title: "Primeiro veículo elétrico",
        desc: "Entrada acessível e descomplicada para quem quer experimentar a mobilidade elétrica sem grande investimento.",
      },
      {
        icon: "city",
        title: "Vida urbana prática",
        desc: "Ágil no trânsito, fácil de estacionar e ideal para quem valoriza praticidade acima de tudo.",
      },
    ],
    whyChoose: [
      {
        title: "Entrada inteligente",
        desc: "O menor investimento da linha MS Electric, sem abrir mão de qualidade, suporte e garantia da marca.",
      },
      {
        title: "Praticidade real",
        desc: "Leve, compacta e simples de operar. Você liga e sai — sem embreagem, sem marcha, sem complicação.",
      },
      {
        title: "Economia que você sente",
        desc: "Custo por km muito menor que qualquer alternativa a combustão. A economia aparece já no primeiro mês.",
      },
      {
        title: "Zero manutenção complexa",
        desc: "Sem troca de óleo, sem velas, sem correia. A manutenção é simples, barata e espaçada.",
      },
      {
        title: "Suporte MS Electric",
        desc: "Garantia, assistência técnica e peças de reposição. Você não fica sozinho após a compra.",
      },
    ],
    dailyBenefits: [
      {
        title: "Chegue mais rápido",
        desc: "Fuja do trânsito e dos horários de ônibus. A Bike 350 te leva direto ao destino, no seu tempo.",
      },
      {
        title: "Gaste menos por dia",
        desc: "Enquanto um carro consome R$ 15–30 por trajeto, a Bike 350 custa centavos de energia elétrica.",
      },
      {
        title: "Estacione em qualquer lugar",
        desc: "Compacta o suficiente para caber em espaços que um carro jamais entraria.",
      },
      {
        title: "Sem esforço físico",
        desc: "Diferente de uma bicicleta convencional, você chega ao destino sem suar — mesmo em subidas leves.",
      },
      {
        title: "Silenciosa e limpa",
        desc: "Sem barulho, sem fumaça, sem cheiro. Uma experiência mais agradável para você e para a cidade.",
      },
      {
        title: "Recarregue na tomada",
        desc: "Sem posto, sem fila. Basta uma tomada comum em casa ou no trabalho.",
      },
    ],
    urbanContext: {
      title: "Feita para a cidade que não para",
      body: "A Bike 350 nasceu para resolver o deslocamento urbano de um jeito mais inteligente. Se a sua rotina envolve trajetos curtos, compromissos espalhados pela cidade e a necessidade de chegar rápido sem complicação, esse é o modelo certo.",
      highlights: [
        "Perfeita para distâncias de até 40 km",
        "Ágil em ruas e ciclovias",
        "Funcional para trabalho, estudo e tarefas",
        "Alternativa real ao carro para uso leve",
      ],
    },
    specContexts: {
      autonomy: "Distância ideal para deslocamentos leves do dia a dia",
      speed: "Faixa adequada para uma condução urbana prática e segura",
      motor: "Entrega alinhada à proposta leve e funcional do modelo",
      recharge: "Tempo pensado para encaixar o uso na sua rotina noturna",
      load: "Compatível com a proposta cotidiana do produto",
    },
    differentials: {
      title: "Onde a Bike 350 se destaca na linha MS Electric",
      body: "A Bike 350 é a escolha certa para quem quer entrar no universo da mobilidade elétrica com mais praticidade, menor investimento e uma proposta funcional para o dia a dia urbano. Dentro do portfólio MS Electric, ela cumpre o papel de modelo de entrada — acessível, direto e sem excessos. Se o que você precisa é de um veículo prático para trajetos curtos, a Bike 350 entrega exatamente isso.",
    },
    comparisonTip:
      "Se você busca mais autonomia ou potência, considere subir para a Bike 400+ ou Bike 500. Mas se praticidade e economia são a prioridade, a Bike 350 continua sendo a opção mais direta e acessível da linha.",
    faq: [
      {
        q: "A Bike 350 é indicada para qual tipo de uso?",
        a: "Para deslocamentos urbanos curtos de até 40 km, como ir ao trabalho, faculdade, mercado ou resolver tarefas do dia a dia. Não é indicada para estradas ou trajetos de longa distância.",
      },
      {
        q: "Esse modelo é bom para deslocamentos diários?",
        a: "Sim. A Bike 350 foi pensada exatamente para a rotina urbana — trajetos curtos, frequentes e práticos. Com 40 km de autonomia, ela cobre a maioria dos deslocamentos diários com folga.",
      },
      {
        q: "Como funciona a recarga?",
        a: "Basta conectar na tomada comum (110V ou 220V). A carga completa leva de 7 a 8 horas — ideal para carregar durante a noite e usar durante o dia.",
      },
      {
        q: "É indicada para quem está começando na mobilidade elétrica?",
        a: "Com certeza. A Bike 350 é o modelo de entrada da MS Electric: mais acessível, mais simples de operar e perfeita para quem quer experimentar a mobilidade elétrica sem grande investimento.",
      },
      {
        q: "Como funciona a garantia?",
        a: "A MS Electric oferece garantia de fábrica com suporte técnico e peças de reposição. Consulte um especialista para conhecer as condições completas.",
      },
      {
        q: "A manutenção é cara?",
        a: "Não. Por ser 100% elétrica, a Bike 350 não precisa de troca de óleo, velas ou embreagem. A manutenção é simples, barata e muito menos frequente do que em veículos a combustão.",
      },
      {
        q: "A Bike 350 faz sentido para quem busca economia?",
        a: "Sim. O custo por km é drasticamente menor do que qualquer veículo a combustão. Além disso, não há IPVA, o seguro é mais barato e a manutenção é mínima.",
      },
    ],
    finalCta: {
      title: "Descubra se a Bike 350 combina com a sua rotina",
      subtitle:
        "Fale com um especialista da MS Electric e receba orientação personalizada sobre o modelo ideal para o seu dia a dia.",
    },
  },
};
