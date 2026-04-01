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
  "bike-400": {
    headline: "Equilíbrio urbano para quem quer mais do dia a dia",
    subheadline:
      "A Bike 400+ combina praticidade, visual e desempenho em um modelo pensado para quem usa a mobilidade elétrica com frequência — e quer uma experiência mais completa na cidade.",
    supportText:
      "Mais autonomia e mais potência do que a entrada da linha, sem perder a praticidade que faz da mobilidade elétrica uma escolha inteligente. Se você quer subir de nível no seu deslocamento urbano, a Bike 400+ é o passo certo.",
    idealFor: [
      {
        icon: "route",
        title: "Uso urbano frequente",
        desc: "Trajetos recorrentes de até 50 km — trabalho, estudo, compromissos e tarefas espalhadas pela cidade.",
      },
      {
        icon: "sparkles",
        title: "Mais equilíbrio no dia a dia",
        desc: "Para quem quer mais do que o básico: mais autonomia, mais potência e uma experiência de uso mais refinada.",
      },
      {
        icon: "piggyBank",
        title: "Economia com mais presença",
        desc: "Custo operacional mínimo aliado a um visual e conjunto que valorizam a escolha.",
      },
      {
        icon: "city",
        title: "Rotina dinâmica na cidade",
        desc: "Ágil, prática e com presença visual — combina com quem leva uma vida urbana moderna e funcional.",
      },
    ],
    whyChoose: [
      {
        title: "Equilíbrio inteligente",
        desc: "A Bike 400+ entrega mais autonomia e potência do que o modelo de entrada, sem complicar o uso. É o ponto certo entre custo, experiência e praticidade.",
      },
      {
        title: "Experiência mais completa",
        desc: "Mais conforto, mais fluidez na condução e um conjunto que faz diferença para quem usa com frequência.",
      },
      {
        title: "Visual que valoriza",
        desc: "Design urbano e contemporâneo. A Bike 400+ tem presença sem exagero — combina com quem valoriza forma e função.",
      },
      {
        title: "Economia real",
        desc: "Sem combustível, sem IPVA, manutenção simples. A economia aparece todo mês e se acumula rápido.",
      },
      {
        title: "Suporte MS Electric",
        desc: "Garantia, assistência técnica e peças de reposição. Você compra com segurança e conta com suporte real após a compra.",
      },
    ],
    dailyBenefits: [
      {
        title: "Mais autonomia para a rotina",
        desc: "50 km por carga significam ir e voltar do trabalho, resolver tarefas e ainda sobrar bateria — sem ansiedade.",
      },
      {
        title: "Condução mais fluida",
        desc: "O motor de 400W entrega respostas mais consistentes, tornando o uso diário mais agradável e confiável.",
      },
      {
        title: "Praticidade sem esforço",
        desc: "Sem embreagem, sem marcha, sem suar. Você chega ao destino com praticidade e sem complicação.",
      },
      {
        title: "Estacione onde quiser",
        desc: "Compacta e ágil o suficiente para se encaixar em qualquer vaga — ou simplesmente guardar dentro de casa.",
      },
      {
        title: "Recarregue na tomada",
        desc: "Tomada comum, de 7 a 8 horas. Conecte à noite, use pela manhã. Simples assim.",
      },
      {
        title: "Menos gasto, mais liberdade",
        desc: "Enquanto um carro custa R$ 15–30 por trajeto, a Bike 400+ custa centavos de energia por dia.",
      },
    ],
    urbanContext: {
      title: "Mobilidade que acompanha o seu ritmo",
      body: "A Bike 400+ foi pensada para quem vive a cidade de verdade — com compromissos, horários e a necessidade de se deslocar com praticidade e estilo. Ela entrega o equilíbrio certo entre desempenho, visual e funcionalidade para quem quer mais do que apenas um meio de transporte.",
      highlights: [
        "50 km de autonomia para cobrir a rotina com folga",
        "Ágil no trânsito e fácil de estacionar",
        "Visual urbano que combina com uma vida moderna",
        "Funcional para trabalho, estudo e lazer",
      ],
    },
    specContexts: {
      autonomy: "Faixa pensada para acompanhar deslocamentos urbanos com praticidade",
      speed: "Boa relação para uso urbano eficiente e seguro",
      motor: "Entrega equilibrada para a proposta do modelo",
      recharge: "Rotina simples — conecte à noite e use pela manhã",
      load: "Compatível com uma proposta urbana funcional",
    },
    differentials: {
      title: "Onde a Bike 400+ se destaca na linha MS Electric",
      body: "A Bike 400+ é uma escolha inteligente para quem quer mais equilíbrio, mais presença e uma experiência urbana mais completa — sem sair da proposta prática da mobilidade elétrica. Dentro do portfólio MS Electric, ela ocupa o espaço entre a entrada acessível e os modelos de maior robustez, entregando um conjunto mais refinado para quem usa com frequência e valoriza a qualidade do deslocamento diário.",
    },
    comparisonTip:
      "Se o que você busca é o menor investimento possível, a Bike 350 pode ser a porta de entrada ideal. Mas se você quer mais autonomia, mais potência e uma experiência mais completa para o uso frequente, a Bike 400+ é o passo natural. Para quem precisa de ainda mais robustez, a Bike 500 e a Bike MS 600 ampliam as possibilidades.",
    faq: [
      {
        q: "A Bike 400+ é indicada para qual tipo de uso?",
        a: "Para uso urbano frequente — deslocamentos diários de até 50 km, como ir ao trabalho, faculdade, compromissos e tarefas pela cidade. Ela entrega mais autonomia e potência do que a entrada da linha, sem perder a praticidade.",
      },
      {
        q: "Esse modelo faz sentido para quem usa todos os dias?",
        a: "Sim. A Bike 400+ foi pensada exatamente para o uso recorrente. Com 50 km de autonomia e motor de 400W, ela acompanha a rotina urbana com mais folga e conforto do que um modelo mais básico.",
      },
      {
        q: "Qual é a proposta dela em relação a um modelo mais básico?",
        a: "A Bike 400+ entrega mais autonomia (50 km vs 40 km), mais potência (400W vs 350W) e uma experiência de condução mais refinada. É o passo natural para quem quer mais equilíbrio e confiança no uso diário.",
      },
      {
        q: "Como funciona a recarga?",
        a: "Basta conectar na tomada comum (110V ou 220V). A carga completa leva de 7 a 8 horas — ideal para carregar durante a noite e usar durante o dia.",
      },
      {
        q: "A manutenção é complicada?",
        a: "Não. Por ser 100% elétrica, a Bike 400+ não precisa de troca de óleo, velas ou embreagem. A manutenção é simples, barata e muito menos frequente do que em veículos a combustão.",
      },
      {
        q: "Como funciona a garantia?",
        a: "A MS Electric oferece garantia de fábrica com suporte técnico e peças de reposição. Consulte um especialista para conhecer as condições completas.",
      },
      {
        q: "Para quem a Bike 400+ é a melhor escolha dentro da linha?",
        a: "Para quem quer mais do que o básico, mas não precisa de um modelo de alta potência. A Bike 400+ é ideal para quem valoriza equilíbrio entre custo, experiência e praticidade no uso urbano frequente.",
      },
    ],
    finalCta: {
      title: "Descubra se a Bike 400+ combina com a sua rotina",
      subtitle:
        "Fale com um especialista da MS Electric e receba orientação personalizada sobre o modelo ideal para o seu dia a dia.",
    },
  },
};
