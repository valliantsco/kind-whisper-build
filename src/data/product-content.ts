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
  "bike-500": {
    headline: "Mais força e mais confiança para a sua rotina urbana",
    subheadline:
      "A Bike 500 entrega mais potência, mais capacidade de carga e uma proposta mais robusta para quem quer se deslocar pela cidade com mais estrutura e segurança no dia a dia.",
    supportText:
      "Se você sente que precisa de um modelo com mais corpo, mais presença e mais entrega real, a Bike 500 é o passo certo. Mais forte que os modelos de entrada, ela foi pensada para quem usa com frequência e não quer abrir mão de robustez.",
    idealFor: [
      {
        icon: "route",
        title: "Rotina urbana mais exigente",
        desc: "Trajetos frequentes de até 50 km com mais confiança, mais estabilidade e mais sensação de solidez.",
      },
      {
        icon: "sparkles",
        title: "Mais robustez no dia a dia",
        desc: "Para quem quer um veículo elétrico que transmita mais força e mais presença — sem ser excessivo.",
      },
      {
        icon: "piggyBank",
        title: "Melhor custo-benefício",
        desc: "Motor de 500W e maior capacidade de carga pelo mesmo investimento da faixa intermediária. Entrega real pelo que você paga.",
      },
      {
        icon: "city",
        title: "Uso frequente com confiança",
        desc: "Ideal para quem depende do veículo diariamente e quer mais tranquilidade em cada deslocamento.",
      },
    ],
    whyChoose: [
      {
        title: "Proposta mais robusta",
        desc: "Motor de 500W e capacidade para até 120 kg. A Bike 500 entrega mais força e mais estrutura do que os modelos de entrada — sem complicar o uso.",
      },
      {
        title: "Melhor custo-benefício da faixa",
        desc: "Mais potência e mais capacidade de carga pelo mesmo preço da Bike 400+. Uma escolha racional para quem compara com atenção.",
      },
      {
        title: "Confiança para uso recorrente",
        desc: "Um modelo que transmite mais solidez e mais segurança para quem usa todos os dias e precisa de consistência.",
      },
      {
        title: "Manutenção simples",
        desc: "100% elétrica, sem troca de óleo, sem velas, sem embreagem. A manutenção é mínima e o custo de uso é drasticamente menor.",
      },
      {
        title: "Suporte MS Electric",
        desc: "Garantia, assistência técnica e peças de reposição. Segurança na compra e acompanhamento real após a aquisição.",
      },
    ],
    dailyBenefits: [
      {
        title: "Mais tranquilidade na rotina",
        desc: "A sensação de pilotar um modelo mais robusto faz diferença para quem depende do veículo todos os dias.",
      },
      {
        title: "Mais capacidade de carga",
        desc: "Suporta até 120 kg — mais espaço para você, suas coisas e a realidade do uso urbano diário.",
      },
      {
        title: "Motor que responde melhor",
        desc: "500W entregam uma condução mais firme em subidas leves, arrancadas e situações do trânsito urbano.",
      },
      {
        title: "Economia consistente",
        desc: "Centavos de energia por dia, sem IPVA, sem combustível. A economia se acumula mês a mês.",
      },
      {
        title: "Praticidade total",
        desc: "Sem marcha, sem embreagem. Ligue e saia. A simplicidade de uso é a mesma dos modelos mais leves.",
      },
      {
        title: "Recarregue sem sair de casa",
        desc: "Tomada comum, de 7 a 8 horas. Conecte à noite, use pela manhã — sem filas, sem postos.",
      },
    ],
    urbanContext: {
      title: "Mais estrutura para quem vive a cidade de verdade",
      body: "A Bike 500 foi projetada para quem precisa de mais do que o básico. Se a sua rotina exige uso frequente, mais capacidade e mais confiança em cada deslocamento, esse é o modelo que entrega mais sem complicar.",
      highlights: [
        "50 km de autonomia para cobrir a rotina com folga",
        "Motor de 500W para mais firmeza na condução",
        "Capacidade de até 120 kg para uso real",
        "Proposta urbana com mais corpo e presença",
      ],
    },
    specContexts: {
      autonomy: "Faixa alinhada ao uso urbano com praticidade e folga para a rotina",
      speed: "Boa leitura para deslocamentos frequentes na cidade",
      motor: "Entrega coerente com a proposta mais robusta do modelo",
      recharge: "Pensada para encaixar bem na rotina — conecte à noite, use pela manhã",
      load: "Um dos pontos que reforçam a proposta mais forte do produto",
    },
    differentials: {
      title: "Onde a Bike 500 se destaca na linha MS Electric",
      body: "A Bike 500 é a escolha ideal para quem quer subir de nível dentro da mobilidade elétrica urbana, com mais força, mais sensação de robustez e mais confiança para o uso recorrente. Ela oferece o mesmo preço da Bike 400+, mas com motor mais potente e maior capacidade de carga — um custo-benefício difícil de ignorar para quem valoriza entrega real.",
    },
    comparisonTip:
      "Se você busca o menor investimento, a Bike 350 é a porta de entrada. Se quer equilíbrio e refinamento, a Bike 400+ é uma opção. Mas se a prioridade é mais força, mais capacidade e melhor custo-benefício nessa faixa, a Bike 500 é a escolha mais racional. Para quem precisa de ainda mais autonomia, a Bike MS 600 leva a proposta ainda mais longe.",
    faq: [
      {
        q: "A Bike 500 é indicada para qual tipo de uso?",
        a: "Para uso urbano frequente e mais exigente — trajetos diários de até 50 km, com mais confiança, mais capacidade de carga e uma proposta mais robusta do que os modelos de entrada.",
      },
      {
        q: "Qual a principal diferença dela em relação aos modelos mais básicos?",
        a: "Motor de 500W (vs 350W ou 400W) e capacidade de carga de até 120 kg (vs 90–100 kg). A Bike 500 entrega mais força e mais estrutura pelo mesmo preço da Bike 400+.",
      },
      {
        q: "Esse modelo faz sentido para quem usa todos os dias?",
        a: "Sim. A Bike 500 foi pensada para uso recorrente. Mais potência e mais capacidade significam mais confiança e mais tranquilidade na rotina diária.",
      },
      {
        q: "Como funciona a recarga?",
        a: "Tomada comum (110V ou 220V), de 7 a 8 horas para carga completa. Conecte à noite e tenha o veículo pronto pela manhã.",
      },
      {
        q: "A manutenção é cara ou complicada?",
        a: "Não. 100% elétrica, sem troca de óleo, sem velas, sem embreagem. A manutenção é simples, barata e muito menos frequente do que em veículos a combustão.",
      },
      {
        q: "Ela é indicada para quem busca mais robustez?",
        a: "Sim. Dentro da linha de autopropelidos, a Bike 500 é o modelo que melhor combina força, capacidade e proposta urbana sólida — sem ser excessiva.",
      },
      {
        q: "Como funciona a garantia?",
        a: "A MS Electric oferece garantia de fábrica com suporte técnico e peças de reposição. Consulte um especialista para conhecer as condições completas.",
      },
      {
        q: "Para quem a Bike 500 é a melhor escolha dentro da linha?",
        a: "Para quem compara com atenção e quer a melhor relação entre potência, capacidade e preço. Se robustez e custo-benefício são prioridade, a Bike 500 se destaca.",
      },
    ],
    finalCta: {
      title: "Descubra se a Bike 500 combina com a sua rotina",
      subtitle:
        "Fale com um especialista da MS Electric e receba orientação personalizada sobre o modelo ideal para o seu dia a dia.",
    },
  },
  "bike-ms-600": {
    headline: "A escolha mais completa da família Bike para o seu dia a dia",
    subheadline:
      "Com 70 km de autonomia e motor de 600W, a Bike MS 600 é o modelo mais preparado da linha para quem usa a mobilidade elétrica com frequência e quer mais liberdade na rotina urbana.",
    supportText:
      "Se autonomia é prioridade e você quer um veículo elétrico que acompanhe a sua rotina sem limitações, a Bike MS 600 entrega o que os outros modelos da família não alcançam. Mais quilômetros por carga, mais potência e mais tranquilidade para usar todos os dias.",
    idealFor: [
      {
        icon: "route",
        title: "Deslocamentos urbanos frequentes",
        desc: "70 km de autonomia para cobrir ida, volta e imprevistos — sem precisar se preocupar com a bateria no meio do caminho.",
      },
      {
        icon: "sparkles",
        title: "Quem valoriza autonomia",
        desc: "Para quem não quer ficar calculando distância. A Bike MS 600 dá liberdade real para rodar mais.",
      },
      {
        icon: "piggyBank",
        title: "Uso diário com economia",
        desc: "Centavos de energia por dia, sem IPVA, sem combustível. A economia é ainda mais significativa para quem usa com constância.",
      },
      {
        icon: "city",
        title: "Rotina urbana ativa",
        desc: "Ideal para quem tem uma vida dinâmica na cidade e precisa de um veículo confiável para acompanhar o ritmo.",
      },
    ],
    whyChoose: [
      {
        title: "Maior autonomia da linha Bike",
        desc: "70 km por carga — quase o dobro da entrada. A Bike MS 600 é o modelo que mais entrega para quem roda com frequência.",
      },
      {
        title: "Motor de 600W",
        desc: "Mais potência para uma condução mais firme, mais segura e mais consistente em qualquer situação urbana.",
      },
      {
        title: "Liberdade para a rotina",
        desc: "Menos preocupação com recarga, mais liberdade para usar quando e quanto precisar. A autonomia muda a experiência.",
      },
      {
        title: "Economia amplificada",
        desc: "Quanto mais você usa, mais economiza. Para quem roda todos os dias, a diferença em relação a um veículo a combustão é enorme.",
      },
      {
        title: "Suporte MS Electric",
        desc: "Garantia de fábrica, assistência técnica e peças de reposição. Segurança na compra e acompanhamento real.",
      },
    ],
    dailyBenefits: [
      {
        title: "Rode mais, recarregue menos",
        desc: "70 km significam que muitos usuários passam dias sem precisar recarregar. Menos paradas, mais continuidade.",
      },
      {
        title: "Mais confiança em cada trajeto",
        desc: "A sensação de ter autonomia de sobra muda completamente a experiência de uso diário.",
      },
      {
        title: "Condução firme e estável",
        desc: "O motor de 600W entrega respostas mais consistentes — subidas, arrancadas e trânsito urbano com mais segurança.",
      },
      {
        title: "Praticidade sem concessão",
        desc: "Sem marcha, sem embreagem, sem complicação. A mesma simplicidade dos modelos menores, com muito mais entrega.",
      },
      {
        title: "Economia que se multiplica",
        desc: "Para quem usa com frequência, o custo por km é quase insignificante comparado a qualquer alternativa a combustão.",
      },
      {
        title: "Recarregue com tranquilidade",
        desc: "7 a 8 horas na tomada comum. Conecte à noite e tenha o veículo pronto pela manhã — sempre.",
      },
    ],
    urbanContext: {
      title: "Liberdade de verdade para quem vive a cidade",
      body: "A Bike MS 600 nasceu para quem não quer contar quilômetros. Se a sua rotina exige deslocamentos frequentes, compromissos espalhados e a necessidade de ter um veículo sempre pronto, esse é o modelo que entrega mais liberdade dentro da família Bike.",
      highlights: [
        "70 km de autonomia — a maior da linha Bike",
        "Motor de 600W para mais firmeza e estabilidade",
        "Ideal para quem usa diariamente sem restrição",
        "Proposta completa para mobilidade urbana constante",
      ],
    },
    specContexts: {
      autonomy: "Faixa pensada para acompanhar uma rotina urbana mais recorrente sem limitações",
      speed: "Boa relação para deslocamentos eficientes e seguros na cidade",
      motor: "Entrega alinhada à proposta de uso urbano mais constante e mais exigente",
      recharge: "Rotina simples para manter o uso organizado no dia a dia",
      load: "Compatível com a proposta funcional e completa do modelo",
    },
    differentials: {
      title: "Onde a Bike MS 600 se destaca na linha MS Electric",
      body: "A Bike MS 600 é a escolha certa para quem quer uma mobilidade elétrica mais consistente no dia a dia, com mais sensação de autonomia, mais liberdade de uso e uma proposta urbana mais completa. É o topo da família Bike — o modelo que mais entrega para quem realmente usa a mobilidade elétrica como parte da rotina.",
    },
    comparisonTip:
      "Se você busca o menor investimento, a Bike 350 é a porta de entrada. Se quer equilíbrio, a Bike 400+ atende bem. Se precisa de mais robustez, a Bike 500 é forte. Mas se autonomia e liberdade de uso são a prioridade, a Bike MS 600 é a escolha mais completa da família — e a que mais entrega para quem usa com frequência.",
    faq: [
      {
        q: "A Bike MS 600 é indicada para qual tipo de uso?",
        a: "Para uso urbano frequente e constante — deslocamentos diários, rotas mais longas e rotinas que exigem mais autonomia. Com 70 km por carga, ela acompanha os dias mais intensos sem limitações.",
      },
      {
        q: "Esse modelo faz sentido para quem utiliza todos os dias?",
        a: "Sim. A Bike MS 600 foi pensada exatamente para o uso diário. A maior autonomia da linha Bike significa menos recargas, mais continuidade e mais tranquilidade na rotina.",
      },
      {
        q: "Qual o diferencial dela dentro da linha Bike?",
        a: "Autonomia de 70 km e motor de 600W — a maior entrega da família. É o modelo para quem quer o máximo de liberdade e consistência dentro da proposta compacta da linha Bike.",
      },
      {
        q: "A autonomia dela favorece uma rotina mais recorrente?",
        a: "Com certeza. 70 km por carga cobrem a maioria das rotinas urbanas com folga, permitindo uso por dias seguidos sem necessidade de recarga em muitos casos.",
      },
      {
        q: "Como funciona a recarga?",
        a: "Tomada comum (110V ou 220V), de 7 a 8 horas para carga completa. Conecte à noite e tenha o veículo pronto pela manhã.",
      },
      {
        q: "Como é a manutenção?",
        a: "Simples e barata. 100% elétrica, sem troca de óleo, sem velas, sem embreagem. A manutenção é mínima e muito menos frequente do que em veículos a combustão.",
      },
      {
        q: "Como funciona a garantia?",
        a: "A MS Electric oferece garantia de fábrica com suporte técnico e peças de reposição. Consulte um especialista para conhecer as condições completas.",
      },
      {
        q: "Para quem a Bike MS 600 é a melhor escolha dentro do portfólio?",
        a: "Para quem valoriza autonomia acima de tudo e quer o modelo mais completo da família Bike. Se liberdade de uso e constância são prioridade, a Bike MS 600 é a resposta.",
      },
    ],
    finalCta: {
      title: "Descubra se a Bike MS 600 combina com a sua rotina",
      subtitle:
        "Fale com um especialista da MS Electric e receba orientação personalizada sobre o modelo ideal para o seu dia a dia.",
    },
  },
  "bliss": {
    headline: "Mobilidade urbana com design que marca presença",
    subheadline:
      "A Bliss é o modelo mais vendido da MS Electric por um motivo: ela une praticidade urbana, motor potente de 800W e um design moderno que transforma cada deslocamento em uma experiência com mais estilo.",
    supportText:
      "Se você quer mais do que apenas ir do ponto A ao ponto B, a Bliss entrega personalidade, conforto e presença visual. Uma escolha para quem vê a mobilidade elétrica também como expressão de estilo de vida.",
    idealFor: [
      {
        icon: "sparkles",
        title: "Quem valoriza design",
        desc: "Para quem escolhe com os olhos e quer um veículo que combine com seu estilo pessoal e sua identidade urbana.",
      },
      {
        icon: "route",
        title: "Mobilidade urbana com presença",
        desc: "70 km de autonomia e visual marcante para quem quer se deslocar pela cidade com mais personalidade.",
      },
      {
        icon: "city",
        title: "Lifestyle urbano moderno",
        desc: "Ideal para quem vive a cidade de forma ativa e quer um veículo que reflita um estilo de vida contemporâneo.",
      },
      {
        icon: "piggyBank",
        title: "Premium sem exagero",
        desc: "Mais sofisticação e mais entrega do que modelos básicos, com economia real no uso diário.",
      },
    ],
    whyChoose: [
      {
        title: "Design que diferencia",
        desc: "A Bliss tem um visual moderno e marcante que se destaca em qualquer cenário urbano. Não é apenas um veículo — é uma escolha de estilo.",
      },
      {
        title: "O mais vendido da MS Electric",
        desc: "Não é por acaso. A Bliss combina o melhor equilíbrio entre design, potência, autonomia e preço dentro do portfólio.",
      },
      {
        title: "Motor de 800W",
        desc: "Mais potência para uma condução mais firme, mais confortável e mais confiável — em qualquer situação urbana.",
      },
      {
        title: "70 km de autonomia",
        desc: "Liberdade para rodar sem contar quilômetros. A Bliss acompanha rotinas intensas com folga.",
      },
      {
        title: "Suporte MS Electric",
        desc: "Garantia de fábrica, assistência técnica e peças de reposição. A segurança de comprar de uma marca que acompanha você.",
      },
    ],
    dailyBenefits: [
      {
        title: "Mais prazer em cada trajeto",
        desc: "Pilotar um veículo bonito muda a experiência. A Bliss transforma deslocamentos comuns em momentos mais agradáveis.",
      },
      {
        title: "Presença que chama atenção",
        desc: "Design moderno que gera comentários, olhares e elogios. Uma escolha que valoriza quem usa.",
      },
      {
        title: "Potência para o dia a dia",
        desc: "800W entregam uma condução fluida, segura e consistente — subidas, arrancadas e trânsito sem esforço.",
      },
      {
        title: "Autonomia de verdade",
        desc: "70 km por carga significam ir e voltar, resolver tarefas e ainda ter bateria — sem ansiedade.",
      },
      {
        title: "Economia invisível",
        desc: "Sem combustível, sem IPVA, manutenção mínima. A economia acontece automaticamente, todo mês.",
      },
      {
        title: "Recarregue sem complicação",
        desc: "6 a 7 horas na tomada comum. Conecte à noite, use pela manhã. Simples e prático.",
      },
    ],
    urbanContext: {
      title: "Sua identidade, em movimento",
      body: "A Bliss foi criada para quem entende que mobilidade também é expressão. Ela não é apenas um meio de transporte — é uma extensão do seu estilo, da sua personalidade e da forma como você escolhe viver a cidade.",
      highlights: [
        "Design moderno que se destaca no cenário urbano",
        "O modelo mais vendido da MS Electric",
        "70 km de autonomia + motor de 800W",
        "Praticidade com personalidade e presença",
      ],
    },
    specContexts: {
      autonomy: "Faixa pensada para acompanhar uma rotina urbana ativa com praticidade",
      speed: "Boa relação para deslocamentos na cidade com conforto e segurança",
      motor: "Entrega alinhada à proposta premium urbana do modelo",
      recharge: "Rotina simples para encaixar o uso no dia a dia sem complicação",
      load: "Compatível com a proposta funcional e elegante do produto",
    },
    differentials: {
      title: "Onde a Bliss se destaca na linha MS Electric",
      body: "A Bliss é a escolha certa para quem quer mais do que mobilidade elétrica funcional. Ela combina praticidade urbana com design marcante, mais personalidade e uma experiência visualmente mais premium. É o modelo mais vendido da marca — e isso reflete a capacidade dela de unir desejo e razão em uma única escolha.",
    },
    comparisonTip:
      "Se você busca uma opção mais acessível e funcional, os modelos da família Bike atendem bem. Se quer mais robustez pura, a Liberty Ultra pode ser o caminho. Mas se design, presença visual e uma experiência mais premium são prioridade, a Bliss é a escolha que mais entrega nessa direção — e não é à toa que é a mais vendida.",
    faq: [
      {
        q: "A Bliss é indicada para qual tipo de uso?",
        a: "Para uso urbano diário com mais estilo e presença. Com 70 km de autonomia e motor de 800W, ela acompanha rotinas intensas sem limitações — e com muito mais personalidade.",
      },
      {
        q: "Esse modelo faz sentido para quem usa no dia a dia?",
        a: "Sim. A Bliss é o modelo mais vendido da MS Electric justamente porque combina praticidade para o uso diário com um design que valoriza quem usa.",
      },
      {
        q: "Qual o diferencial dela em relação a modelos mais básicos?",
        a: "Design mais marcante, motor de 800W (vs 350–600W), maior capacidade de carga (até 150 kg) e uma experiência de uso mais premium e mais prazerosa.",
      },
      {
        q: "A Bliss é uma opção para quem valoriza design?",
        a: "Com certeza. A Bliss foi projetada para quem vê o veículo também como extensão de estilo. Seu visual moderno se destaca em qualquer cenário urbano.",
      },
      {
        q: "Como funciona a recarga?",
        a: "Tomada comum (110V ou 220V), de 6 a 7 horas para carga completa. Conecte à noite e tenha o veículo pronto pela manhã.",
      },
      {
        q: "Como é a manutenção?",
        a: "Simples e barata. 100% elétrica, sem troca de óleo, sem velas, sem embreagem. Manutenção mínima e muito menos frequente.",
      },
      {
        q: "Como funciona a garantia?",
        a: "A MS Electric oferece garantia de fábrica com suporte técnico e peças de reposição. Consulte um especialista para conhecer as condições.",
      },
      {
        q: "Para quem a Bliss é a melhor escolha dentro do portfólio?",
        a: "Para quem quer unir praticidade, potência e design em uma única escolha. Se estilo e presença visual importam tanto quanto funcionalidade, a Bliss é a resposta.",
      },
    ],
    finalCta: {
      title: "Descubra se a Bliss combina com o seu estilo e a sua rotina",
      subtitle:
        "Fale com um especialista da MS Electric e receba orientação personalizada sobre o modelo ideal para você.",
    },
  },
  "liberty-ultra": {
    headline: "Conforto e praticidade para quem usa de verdade",
    subheadline:
      "A Liberty Ultra combina motor de 1.000W, recarga mais rápida e capacidade para 150 kg em um modelo pensado para quem quer mobilidade elétrica urbana com mais conforto, mais estabilidade e mais conveniência no dia a dia.",
    supportText:
      "Se conforto e praticidade são tão importantes quanto desempenho, a Liberty Ultra é a escolha mais equilibrada. Ela foi projetada para quem quer usar todos os dias com tranquilidade, sem abrir mão de potência e capacidade real.",
    idealFor: [
      {
        icon: "route",
        title: "Uso urbano frequente e confortável",
        desc: "70 km de autonomia e motor de 1.000W para deslocamentos diários com mais estabilidade e menos esforço.",
      },
      {
        icon: "sparkles",
        title: "Quem valoriza conforto",
        desc: "Para quem quer uma experiência de uso mais madura, mais confortável e mais conveniente no cotidiano.",
      },
      {
        icon: "piggyBank",
        title: "Economia com mais entrega",
        desc: "Recarga mais rápida (5–6h), maior capacidade e custo operacional mínimo. Mais valor pelo que você investe.",
      },
      {
        icon: "city",
        title: "Rotina sem concessões",
        desc: "Para quem precisa de um veículo elétrico que funcione de verdade no dia a dia — com conforto, praticidade e confiança.",
      },
    ],
    whyChoose: [
      {
        title: "Motor de 1.000W",
        desc: "A maior potência entre os autopropelidos. Mais firmeza na condução, mais segurança em subidas e mais confiança no trânsito urbano.",
      },
      {
        title: "Recarga mais rápida",
        desc: "5 a 6 horas para carga completa — a mais rápida da categoria. Menos tempo parado, mais tempo rodando.",
      },
      {
        title: "Capacidade para 150 kg",
        desc: "A maior capacidade de carga da linha de autopropelidos. Mais espaço para você e para a realidade do uso diário.",
      },
      {
        title: "Conforto como prioridade",
        desc: "Um modelo pensado para quem valoriza conveniência e estabilidade, não apenas velocidade ou potência bruta.",
      },
      {
        title: "Suporte MS Electric",
        desc: "Garantia de fábrica, assistência técnica e peças de reposição. Segurança na compra e acompanhamento real.",
      },
    ],
    dailyBenefits: [
      {
        title: "Mais conforto em cada trajeto",
        desc: "A Liberty Ultra foi projetada para tornar o uso diário mais agradável — menos vibração, mais estabilidade, mais prazer.",
      },
      {
        title: "Recarga que encaixa na rotina",
        desc: "5 a 6 horas é tempo de uma noite de sono curta. Conecte ao chegar, use pela manhã — sem ajustes na rotina.",
      },
      {
        title: "Potência quando você precisa",
        desc: "1.000W entregam respostas firmes em qualquer situação — subidas, arrancadas e mudanças de ritmo no trânsito.",
      },
      {
        title: "Capacidade para o uso real",
        desc: "150 kg de carga significam que você não precisa se preocupar com peso. O veículo acompanha a sua realidade.",
      },
      {
        title: "Economia consistente",
        desc: "Centavos de energia por dia, sem IPVA, sem combustível. A economia é ainda maior para quem usa com constância.",
      },
      {
        title: "Praticidade total",
        desc: "Sem marcha, sem embreagem, sem complicação. A mesma simplicidade de sempre, com muito mais entrega.",
      },
    ],
    urbanContext: {
      title: "Praticidade que você sente no dia a dia",
      body: "A Liberty Ultra foi pensada para quem não quer concessões. Se a sua rotina exige um veículo confortável, potente e prático para usar todos os dias, esse é o modelo que entrega a experiência mais completa dentro da linha de autopropelidos.",
      highlights: [
        "Motor de 1.000W — o mais potente da categoria",
        "Recarga em 5–6h — a mais rápida da linha",
        "Capacidade para 150 kg — uso real sem restrição",
        "70 km de autonomia para cobrir a rotina com folga",
      ],
    },
    specContexts: {
      autonomy: "Faixa pensada para acompanhar uma rotina urbana com praticidade e folga",
      speed: "Boa relação para deslocamentos frequentes na cidade com conforto",
      motor: "A maior entrega de potência entre os autopropelidos da linha",
      recharge: "A recarga mais rápida da categoria — encaixa facilmente na rotina",
      load: "A maior capacidade de carga da linha, pensada para uso real",
    },
    differentials: {
      title: "Onde a Liberty Ultra se destaca na linha MS Electric",
      body: "A Liberty Ultra é a escolha certa para quem quer mobilidade elétrica urbana com mais conforto, mais praticidade e uma experiência de uso mais completa para a rotina do dia a dia. Com o motor mais potente, a recarga mais rápida e a maior capacidade de carga entre os autopropelidos, ela ocupa o topo da linha em entrega funcional — sem perder a simplicidade de uso.",
    },
    comparisonTip:
      "Se você busca uma opção mais acessível, a família Bike oferece modelos a partir de R$ 7.990. Se design e presença visual são prioridade, a Bliss pode ser a escolha. Mas se conforto, potência, capacidade de carga e recarga rápida são o que importa, a Liberty Ultra é a mais completa da linha — e a que mais entrega para quem usa com frequência.",
    faq: [
      {
        q: "A Liberty Ultra é indicada para qual tipo de uso?",
        a: "Para uso urbano frequente e confortável — deslocamentos diários com mais potência, mais estabilidade e mais capacidade. É o modelo mais completo entre os autopropelidos.",
      },
      {
        q: "Esse modelo faz sentido para quem usa no dia a dia?",
        a: "Sim. A Liberty Ultra foi projetada para uso constante. Motor de 1.000W, recarga rápida e 150 kg de capacidade tornam ela a opção mais preparada para o cotidiano.",
      },
      {
        q: "Qual o diferencial dela em relação a outras opções urbanas da linha?",
        a: "Motor mais potente (1.000W), recarga mais rápida (5–6h) e maior capacidade de carga (150 kg). A Liberty Ultra entrega mais em todos os critérios funcionais.",
      },
      {
        q: "A Liberty Ultra é uma boa escolha para quem busca mais conforto?",
        a: "Sim. Ela foi pensada para quem valoriza conforto e conveniência como critérios de decisão — não apenas potência ou preço.",
      },
      {
        q: "Como funciona a recarga?",
        a: "Tomada comum (110V ou 220V), de 5 a 6 horas para carga completa — a mais rápida entre os autopropelidos. Conecte ao chegar em casa e use pela manhã.",
      },
      {
        q: "Como é a manutenção?",
        a: "Simples e barata. 100% elétrica, sem troca de óleo, sem velas, sem embreagem. Manutenção mínima e muito menos frequente.",
      },
      {
        q: "Como funciona a garantia?",
        a: "A MS Electric oferece garantia de fábrica com suporte técnico e peças de reposição. Consulte um especialista para conhecer as condições.",
      },
      {
        q: "Para quem a Liberty Ultra é a melhor escolha dentro do portfólio?",
        a: "Para quem quer o autopropelido mais completo da linha: mais potência, mais capacidade, recarga mais rápida e mais conforto. Se uso real e conveniência são prioridade, a Liberty Ultra é a resposta.",
      },
    ],
    finalCta: {
      title: "Descubra se a Liberty Ultra combina com a sua rotina",
      subtitle:
        "Fale com um especialista da MS Electric e receba orientação personalizada sobre o modelo ideal para o seu dia a dia.",
    },
  },
  "santa-monica": {
    headline: "Liberdade sobre duas rodas, com assistência elétrica",
    subheadline:
      "A Santa Monica é uma e-bike urbana com visual retrô, motor de 500W e 60 km de autonomia — pensada para quem quer pedalar com mais liberdade, menos esforço e mais estilo na cidade.",
    supportText:
      "Pedal assistido ou acelerador direto: você escolhe como quer se mover. A Santa Monica combina a experiência natural da bicicleta com a conveniência da assistência elétrica, em um design que chama atenção por onde passa.",
    idealFor: [
      {
        icon: "route",
        title: "Deslocamentos urbanos leves",
        desc: "Trajetos de até 60 km com assistência elétrica — trabalho, estudo, lazer e tarefas do dia a dia sem esforço.",
      },
      {
        icon: "sparkles",
        title: "Mobilidade com lifestyle",
        desc: "Para quem quer se deslocar com mais estilo, mais leveza e uma experiência mais conectada ao ritmo da cidade.",
      },
      {
        icon: "piggyBank",
        title: "Economia e bem-estar",
        desc: "Custo operacional quase zero e a possibilidade de se exercitar no caminho — saúde e economia juntas.",
      },
      {
        icon: "city",
        title: "Rotina urbana flexível",
        desc: "Ideal para ciclovias, ruas e caminhos urbanos. Ágil, prática e fácil de integrar a qualquer rotina.",
      },
    ],
    whyChoose: [
      {
        title: "Pedal assistido + acelerador",
        desc: "Escolha entre pedalar com assistência elétrica ou acelerar sem esforço. Dois modos de uso em um único veículo.",
      },
      {
        title: "Design retrô moderno",
        desc: "Visual que combina nostalgia e modernidade. A Santa Monica é uma e-bike que chama atenção pelo bom gosto.",
      },
      {
        title: "60 km de autonomia",
        desc: "Liberdade para cobrir a maioria das rotinas urbanas sem se preocupar com a bateria.",
      },
      {
        title: "Recarga em 5 horas",
        desc: "A recarga mais rápida entre as e-bikes. Menos tempo parada, mais tempo disponível para uso.",
      },
      {
        title: "Suporte MS Electric",
        desc: "Garantia, assistência técnica e peças de reposição. Compra segura com acompanhamento real.",
      },
    ],
    dailyBenefits: [
      {
        title: "Chegue sem suar",
        desc: "A assistência elétrica elimina o esforço das subidas e dos trajetos mais longos. Você chega fresco ao destino.",
      },
      {
        title: "Mais liberdade na cidade",
        desc: "Ciclovias, ruas e caminhos alternativos. A Santa Monica amplia suas opções de trajeto e reduz o tempo no trânsito.",
      },
      {
        title: "Exercício quando quiser",
        desc: "Pedale com ou sem assistência. Nos dias que quiser se exercitar, basta reduzir o nível de assistência elétrica.",
      },
      {
        title: "Estacione em qualquer lugar",
        desc: "Uma bicicleta elétrica ocupa uma fração do espaço de um carro. Estacione fácil e sem custo.",
      },
      {
        title: "Visual que inspira",
        desc: "O design retrô moderno da Santa Monica transforma cada trajeto em um momento mais agradável e mais pessoal.",
      },
      {
        title: "Recarregue com praticidade",
        desc: "5 horas na tomada comum. Conecte ao chegar e tenha a e-bike pronta para a próxima saída.",
      },
    ],
    urbanContext: {
      title: "Sua cidade, no seu ritmo",
      body: "A Santa Monica foi criada para quem vê a mobilidade como parte do estilo de vida. Se você quer se mover pela cidade com mais liberdade, mais leveza e mais prazer, essa é a e-bike que transforma deslocamentos em experiências.",
      highlights: [
        "E-bike com pedal assistido e acelerador",
        "60 km de autonomia para cobrir a rotina com folga",
        "Design retrô moderno que se destaca na cidade",
        "Recarga em apenas 5 horas",
      ],
    },
    specContexts: {
      autonomy: "Faixa pensada para acompanhar deslocamentos urbanos com mais liberdade",
      speed: "Boa relação para uma mobilidade leve e eficiente na cidade",
      motor: "Entrega coerente com a proposta prática e fluida do modelo",
      recharge: "A recarga mais rápida entre as e-bikes — encaixa fácil na rotina",
      load: "Compatível com a proposta funcional e versátil da bicicleta elétrica",
    },
    differentials: {
      title: "Onde a Santa Monica se destaca na linha MS Electric",
      body: "A Santa Monica é a escolha certa para quem quer uma mobilidade elétrica mais leve, mais livre e mais conectada ao ritmo da cidade. Dentro do portfólio, ela ocupa o espaço da e-bike urbana com personalidade — unindo praticidade, estilo de vida e uso inteligente em um design que marca presença.",
    },
    comparisonTip:
      "Se você busca uma proposta mais robusta com pneus largos e presença off-road, a Big Sur pode ser o caminho. Mas se leveza, versatilidade e um visual retrô moderno são o que importa, a Santa Monica é a e-bike que mais entrega nessa direção.",
    faq: [
      {
        q: "A Santa Monica é indicada para qual tipo de uso?",
        a: "Para deslocamentos urbanos leves e práticos — trabalho, estudo, lazer e tarefas do dia a dia. Com pedal assistido e acelerador, ela se adapta a diferentes situações e níveis de esforço.",
      },
      {
        q: "Essa bicicleta elétrica faz sentido para deslocamentos urbanos?",
        a: "Sim. A Santa Monica foi pensada exatamente para isso — 60 km de autonomia, motor de 500W e design compacto para circular com agilidade pela cidade.",
      },
      {
        q: "Qual o diferencial dela em relação a outros modelos da linha?",
        a: "Ela é uma e-bike com pedal assistido e acelerador, visual retrô moderno e proposta mais leve. Diferente dos autopropelidos, permite pedalar com ou sem assistência elétrica.",
      },
      {
        q: "Ela é uma boa escolha para quem quer mais leveza e praticidade?",
        a: "Com certeza. A Santa Monica combina a experiência natural da bicicleta com a conveniência da assistência elétrica — mais leve e mais versátil do que um autopropelido.",
      },
      {
        q: "Como funciona a recarga?",
        a: "Tomada comum (110V ou 220V), em apenas 5 horas para carga completa — a mais rápida da categoria e-bikes. Conecte e use.",
      },
      {
        q: "Como é a manutenção?",
        a: "Simples. Componentes elétricos com manutenção mínima, combinados com a manutenção convencional de bicicleta (freios, pneus, corrente).",
      },
      {
        q: "Como funciona a garantia?",
        a: "A MS Electric oferece garantia de fábrica com suporte técnico e peças de reposição. Consulte um especialista para conhecer as condições.",
      },
      {
        q: "Para quem a Santa Monica é a melhor escolha dentro do portfólio?",
        a: "Para quem quer uma e-bike urbana com personalidade, versatilidade e estilo. Se mobilidade leve, liberdade e lifestyle importam, a Santa Monica é a resposta.",
      },
    ],
    finalCta: {
      title: "Descubra se a Santa Monica combina com a sua rotina",
      subtitle:
        "Fale com um especialista da MS Electric e receba orientação personalizada sobre o modelo ideal para o seu dia a dia.",
    },
  },
  "big-sur": {
    headline: "Presença, conforto e liberdade para ir além do asfalto",
    subheadline:
      "A Big Sur é uma fat bike elétrica com pneus largos, motor de 500W e 60 km de autonomia — feita para quem quer mais estabilidade, mais conforto e mais versatilidade em cada trajeto.",
    supportText:
      "Com visual marcante e presença que impressiona, a Big Sur vai além da bicicleta elétrica convencional. Seus pneus largos entregam mais aderência e conforto em qualquer superfície, enquanto o motor de 500W garante potência para cidade, trilhas leves e passeios com total liberdade.",
    idealFor: [
      {
        icon: "route",
        title: "Trajetos variados",
        desc: "Asfalto, terra, calçamento irregular — os pneus largos oferecem estabilidade e conforto em qualquer superfície.",
      },
      {
        icon: "sparkles",
        title: "Quem quer mais presença",
        desc: "Para quem busca uma bicicleta elétrica com visual marcante e personalidade que se destaca por onde passa.",
      },
      {
        icon: "city",
        title: "Cidade e lazer",
        desc: "Versátil para o uso urbano diário e perfeita para passeios mais longos e exploratórios no fim de semana.",
      },
      {
        icon: "piggyBank",
        title: "Conforto como prioridade",
        desc: "Os pneus fat absorvem irregularidades e entregam uma experiência de pedal mais suave e mais agradável.",
      },
    ],
    whyChoose: [
      {
        title: "Pneus fat para mais conforto",
        desc: "Pneus largos que absorvem imperfeições do terreno e entregam mais estabilidade, mais aderência e mais conforto em qualquer trajeto.",
      },
      {
        title: "Visual que marca presença",
        desc: "A Big Sur não passa despercebida. Seu design robusto e imponente transforma cada saída em uma experiência com mais personalidade.",
      },
      {
        title: "Versatilidade real",
        desc: "Asfalto, terra, areia, calçamento — a Big Sur se adapta a diferentes superfícies e diferentes estilos de uso.",
      },
      {
        title: "60 km de autonomia",
        desc: "Liberdade para cobrir a rotina urbana e ainda explorar trajetos mais longos sem se preocupar com a bateria.",
      },
      {
        title: "Suporte MS Electric",
        desc: "Garantia de fábrica, assistência técnica e peças de reposição. Segurança na compra e acompanhamento real.",
      },
    ],
    dailyBenefits: [
      {
        title: "Mais conforto em qualquer terreno",
        desc: "Os pneus fat fazem toda a diferença — menos impacto, menos vibração, mais suavidade em cada pedalada.",
      },
      {
        title: "Mais confiança para explorar",
        desc: "A estabilidade extra permite encarar caminhos que uma bicicleta convencional não enfrentaria com a mesma segurança.",
      },
      {
        title: "Presença que inspira",
        desc: "Um veículo que chama atenção positiva e transforma o simples ato de pedalar em algo mais especial.",
      },
      {
        title: "Cidade e natureza",
        desc: "Da ciclovia ao parque, do asfalto à trilha leve. A Big Sur acompanha onde sua vontade quiser ir.",
      },
      {
        title: "Exercício no seu ritmo",
        desc: "Pedal assistido permite dosar o esforço. Dias de exercício ou dias de conforto total — você escolhe.",
      },
      {
        title: "Recarregue com praticidade",
        desc: "5 horas na tomada comum para carga completa. Rápida, simples e prática.",
      },
    ],
    urbanContext: {
      title: "Liberdade sem fronteiras na cidade",
      body: "A Big Sur foi criada para quem não quer se limitar ao convencional. Se você busca uma bicicleta elétrica que entregue mais conforto, mais estabilidade e mais liberdade para explorar diferentes trajetos e experiências, esse é o modelo que amplia as suas possibilidades.",
      highlights: [
        "Pneus fat para conforto extremo em qualquer superfície",
        "Visual robusto e marcante que se destaca",
        "60 km de autonomia + motor de 500W",
        "Versátil para cidade, passeio e trilhas leves",
      ],
    },
    specContexts: {
      autonomy: "Faixa pensada para acompanhar uma rotina mais versátil e exploratória",
      speed: "Boa relação para mobilidade elétrica com conforto e confiança",
      motor: "Entrega alinhada à proposta mais robusta e versátil do modelo",
      recharge: "Rotina simples — 5 horas na tomada para estar pronta novamente",
      load: "Compatível com a proposta de estabilidade e versatilidade da bike",
    },
    differentials: {
      title: "Onde a Big Sur se destaca na linha MS Electric",
      body: "A Big Sur é a escolha certa para quem quer uma bicicleta elétrica com mais presença, mais estabilidade e mais conforto. Dentro do portfólio, ela ocupa o espaço da e-bike robusta e versátil — feita para quem quer ir além do convencional e explorar a cidade e o lazer com mais liberdade e personalidade.",
    },
    comparisonTip:
      "Se você busca uma e-bike mais leve e urbana com visual retrô, a Santa Monica é uma excelente opção. Mas se conforto extremo, pneus fat, mais estabilidade e presença visual marcante são prioridade, a Big Sur é a escolha que mais entrega nessa direção.",
    faq: [
      {
        q: "A Big Sur é indicada para qual tipo de uso?",
        a: "Para uso urbano, passeios e trajetos variados. Os pneus fat entregam conforto e estabilidade em asfalto, terra, calçamento irregular e até areia compacta.",
      },
      {
        q: "Essa bicicleta elétrica faz sentido para cidade e passeio?",
        a: "Sim. A Big Sur é versátil — funciona perfeitamente na cidade durante a semana e é ideal para passeios mais exploratórios no fim de semana.",
      },
      {
        q: "Qual o diferencial dela em relação a modelos mais leves?",
        a: "Pneus fat que entregam mais conforto e estabilidade, visual mais robusto e imponente, e capacidade de rodar com segurança em diferentes tipos de terreno.",
      },
      {
        q: "Ela é uma boa escolha para quem quer mais conforto e estabilidade?",
        a: "Com certeza. Os pneus largos absorvem irregularidades do terreno e entregam uma experiência de pedal significativamente mais suave e estável.",
      },
      {
        q: "Como funciona a recarga?",
        a: "Tomada comum (110V ou 220V), em apenas 5 horas para carga completa. Prática e rápida.",
      },
      {
        q: "Como é a manutenção?",
        a: "Componentes elétricos com manutenção mínima, combinados com a manutenção convencional de bicicleta. Simples e acessível.",
      },
      {
        q: "Como funciona a garantia?",
        a: "A MS Electric oferece garantia de fábrica com suporte técnico e peças de reposição. Consulte um especialista para conhecer as condições.",
      },
      {
        q: "Para quem a Big Sur é a melhor escolha dentro do portfólio?",
        a: "Para quem quer mais conforto, mais presença e mais versatilidade. Se estabilidade, visual marcante e liberdade para diferentes terrenos importam, a Big Sur é a resposta.",
      },
    ],
    finalCta: {
      title: "Descubra se a Big Sur combina com o seu estilo",
      subtitle:
        "Fale com um especialista da MS Electric e receba orientação personalizada sobre o modelo ideal para você.",
    },
  },
  "ms-2500": {
    headline: "Mais força e mais presença para a sua mobilidade urbana",
    subheadline:
      "A MS 2500 é uma scooter elétrica de 2.500W com 52 km/h de velocidade máxima e 50 km de autonomia — pensada para quem quer se deslocar pela cidade com mais potência, mais confiança e mais impacto.",
    supportText:
      "Se você quer uma scooter que acompanhe o ritmo real do trânsito urbano, a MS 2500 entrega velocidade, robustez e presença visual em um modelo pensado para uso frequente. Mais do que um meio de transporte — uma evolução na forma como você se move pela cidade.",
    idealFor: [
      {
        icon: "route",
        title: "Trânsito urbano real",
        desc: "52 km/h de velocidade máxima para acompanhar o fluxo do trânsito com segurança e sem ficar para trás.",
      },
      {
        icon: "sparkles",
        title: "Quem quer mais potência",
        desc: "2.500W de motor para arrancadas firmes, subidas sem esforço e uma condução mais confiante na cidade.",
      },
      {
        icon: "city",
        title: "Uso urbano frequente",
        desc: "Para quem depende do veículo diariamente e quer uma scooter com mais estrutura e mais presença.",
      },
      {
        icon: "piggyBank",
        title: "Economia com desempenho",
        desc: "Zero combustível, zero IPVA, manutenção mínima — com a potência de quem não abre mão de performance urbana.",
      },
    ],
    whyChoose: [
      {
        title: "Motor de 2.500W",
        desc: "Potência real para o trânsito urbano. Arrancadas firmes, subidas sem hesitação e uma condução que transmite mais confiança.",
      },
      {
        title: "52 km/h de velocidade",
        desc: "Velocidade suficiente para acompanhar o fluxo do trânsito da cidade, sem ficar limitado a vias secundárias.",
      },
      {
        title: "Presença visual marcante",
        desc: "Design robusto e encorpado que transmite força e personalidade. Uma scooter que se destaca por onde passa.",
      },
      {
        title: "Capacidade para 150 kg",
        desc: "Estrutura sólida e preparada para o uso real — com espaço para você e para a sua rotina.",
      },
      {
        title: "Suporte MS Electric",
        desc: "Garantia de fábrica, assistência técnica e peças de reposição. Segurança na compra e acompanhamento real.",
      },
    ],
    dailyBenefits: [
      {
        title: "Acompanhe o trânsito de verdade",
        desc: "Com 52 km/h, você não fica preso ao ritmo lento. A MS 2500 se integra ao fluxo da cidade com naturalidade.",
      },
      {
        title: "Arrancadas com confiança",
        desc: "2.500W entregam respostas imediatas — semáforos, ultrapassagens e mudanças de ritmo sem hesitação.",
      },
      {
        title: "Presença que impõe respeito",
        desc: "No trânsito, presença visual importa. A MS 2500 transmite robustez e faz você ser mais notado.",
      },
      {
        title: "Economia brutal",
        desc: "Centavos de energia por dia, sem IPVA, sem combustível. A economia é ainda mais significativa comparada a motos a combustão.",
      },
      {
        title: "Silenciosa e limpa",
        desc: "Toda a potência de 2.500W sem barulho e sem emissão. Uma experiência mais agradável para você e para a cidade.",
      },
      {
        title: "Recarregue na tomada",
        desc: "6 a 7 horas na tomada comum. Conecte à noite, use pela manhã — sem filas, sem postos.",
      },
    ],
    urbanContext: {
      title: "Potência elétrica para quem vive o trânsito",
      body: "A MS 2500 foi projetada para quem precisa de mais do que uma mobilidade elétrica básica. Se a sua rotina exige velocidade real, potência nas arrancadas e presença no trânsito, essa é a scooter que entrega tudo isso com zero emissão e custo operacional mínimo.",
      highlights: [
        "2.500W de potência para o trânsito urbano real",
        "52 km/h para acompanhar o fluxo da cidade",
        "50 km de autonomia para cobrir a rotina",
        "Capacidade para 150 kg — estrutura sólida",
      ],
    },
    specContexts: {
      autonomy: "Faixa pensada para acompanhar uma rotina urbana com mais confiança",
      speed: "Velocidade real para se integrar ao fluxo do trânsito da cidade",
      motor: "Entrega alinhada à proposta mais forte e mais robusta do modelo",
      recharge: "Rotina simples para encaixar o uso no dia a dia",
      load: "Compatível com a proposta urbana mais completa e mais sólida do produto",
    },
    differentials: {
      title: "Onde a MS 2500 se destaca na linha MS Electric",
      body: "A MS 2500 é a escolha certa para quem quer uma scooter elétrica com mais presença, mais potência e uma proposta urbana mais completa. Com 2.500W e 52 km/h, ela se posiciona como a opção para quem quer velocidade real no trânsito urbano sem abrir mão da economia e praticidade da mobilidade elétrica.",
    },
    comparisonTip:
      "Se você busca uma scooter mais acessível para começar, a Holiday 1000 é uma boa porta de entrada. Se quer um visual clássico com boa potência, a New Holiday atende bem. Mas se velocidade real no trânsito, mais potência e mais presença são prioridade, a MS 2500 é a scooter que mais entrega nessa faixa.",
    faq: [
      {
        q: "A MS 2500 é indicada para qual tipo de uso?",
        a: "Para uso urbano frequente com mais potência e velocidade. Com 2.500W e 52 km/h, ela acompanha o fluxo real do trânsito e entrega uma experiência de condução mais forte e mais confiante.",
      },
      {
        q: "Essa scooter elétrica faz sentido para uso diário?",
        a: "Sim. A MS 2500 foi pensada para quem depende do veículo no dia a dia. 50 km de autonomia cobrem a maioria das rotinas urbanas com folga.",
      },
      {
        q: "Qual o diferencial dela em relação a modelos mais básicos?",
        a: "Motor de 2.500W (vs 1.000–2.000W em modelos mais básicos) e velocidade de 52 km/h. Mais potência, mais velocidade e mais presença para o trânsito urbano.",
      },
      {
        q: "Ela é uma boa escolha para quem quer mais robustez e mais presença?",
        a: "Com certeza. A MS 2500 tem design encorpado, motor potente e estrutura para 150 kg — transmite força e confiança no trânsito.",
      },
      {
        q: "Como funciona a recarga?",
        a: "Tomada comum (110V ou 220V), de 6 a 7 horas para carga completa. Conecte à noite e tenha a scooter pronta pela manhã.",
      },
      {
        q: "Como é a manutenção?",
        a: "Simples e barata. 100% elétrica, sem troca de óleo, sem velas, sem embreagem. Manutenção mínima e muito menos frequente.",
      },
      {
        q: "Como funciona a garantia?",
        a: "A MS Electric oferece garantia de fábrica com suporte técnico e peças de reposição. Consulte um especialista para conhecer as condições.",
      },
      {
        q: "Para quem a MS 2500 é a melhor escolha dentro do portfólio?",
        a: "Para quem quer velocidade real no trânsito, mais potência e mais presença. Se robustez e desempenho urbano são prioridade, a MS 2500 é a resposta.",
      },
    ],
    finalCta: {
      title: "Descubra se a MS 2500 combina com a sua rotina",
      subtitle:
        "Fale com um especialista da MS Electric e receba orientação personalizada sobre o modelo ideal para o seu dia a dia.",
    },
  },
  "new-holiday": {
    headline: "Mobilidade elétrica completa para substituir a moto no dia a dia",
    subheadline:
      "A New Holiday é uma scooter elétrica de 2.000W com design clássico, 50 km de autonomia e 50 km/h — pensada para quem quer praticidade real na cidade sem abrir mão de conforto e presença.",
    supportText:
      "Se você busca uma alternativa elétrica para a moto convencional, a New Holiday entrega tudo o que você precisa: velocidade para o trânsito, autonomia para a rotina e economia brutal no uso diário. Uma scooter completa, funcional e bonita.",
    idealFor: [
      {
        icon: "route",
        title: "Substituir a moto a combustão",
        desc: "50 km/h e 50 km de autonomia para cobrir a rotina urbana com a mesma praticidade — e sem gasolina.",
      },
      {
        icon: "sparkles",
        title: "Design clássico e moderno",
        desc: "Para quem valoriza um visual elegante e atemporal, que combina bem com qualquer rotina urbana.",
      },
      {
        icon: "piggyBank",
        title: "Economia real todo mês",
        desc: "Sem combustível, sem IPVA, manutenção mínima. A diferença no bolso aparece já no primeiro mês.",
      },
      {
        icon: "city",
        title: "Deslocamentos urbanos completos",
        desc: "Trabalho, estudo, compromissos e lazer — a New Holiday acompanha a rotina inteira com praticidade.",
      },
    ],
    whyChoose: [
      {
        title: "Proposta completa",
        desc: "2.000W, 50 km/h e 50 km de autonomia. A New Holiday entrega tudo o que uma scooter urbana precisa — sem concessões.",
      },
      {
        title: "Design clássico atemporal",
        desc: "Visual que combina tecnologia moderna com linhas clássicas. Elegante, discreta e com presença que agrada.",
      },
      {
        title: "Alternativa real à moto",
        desc: "Velocidade e autonomia suficientes para substituir a moto a combustão na maioria das rotinas urbanas.",
      },
      {
        title: "Economia que se acumula",
        desc: "Centavos de energia por dia. Sem IPVA, sem combustível, sem troca de óleo. A economia é significativa e constante.",
      },
      {
        title: "Suporte MS Electric",
        desc: "Garantia de fábrica, assistência técnica e peças de reposição. Compra segura com acompanhamento real.",
      },
    ],
    dailyBenefits: [
      {
        title: "Adeus gasolina",
        desc: "Recarregue na tomada por centavos. Enquanto uma moto consome R$ 10–20 por dia, a New Holiday custa quase nada.",
      },
      {
        title: "Velocidade para o trânsito",
        desc: "50 km/h permitem acompanhar o fluxo urbano com segurança, sem ficar limitada a vias secundárias.",
      },
      {
        title: "Silenciosa e limpa",
        desc: "Toda a potência sem barulho e sem emissão. Uma experiência de condução mais agradável e mais civilizada.",
      },
      {
        title: "Conforto para o dia a dia",
        desc: "Design ergonômico pensado para uso frequente. Banco confortável e posição de condução natural.",
      },
      {
        title: "Manutenção quase zero",
        desc: "Sem troca de óleo, sem velas, sem correia. A manutenção elétrica é simples, barata e espaçada.",
      },
      {
        title: "Recarregue com simplicidade",
        desc: "6 a 8 horas na tomada comum. Conecte à noite e tenha a scooter pronta pela manhã.",
      },
    ],
    urbanContext: {
      title: "A evolução natural da moto urbana",
      body: "A New Holiday foi criada para quem quer manter a praticidade da moto, mas com a economia e a modernidade da mobilidade elétrica. Se você usa moto para a rotina e está cansado de gasolina, manutenção e barulho, esse é o upgrade que faz sentido.",
      highlights: [
        "2.000W de motor para o trânsito urbano",
        "50 km/h para acompanhar o fluxo da cidade",
        "50 km de autonomia para cobrir a rotina",
        "Design clássico com tecnologia moderna",
      ],
    },
    specContexts: {
      autonomy: "Faixa pensada para cobrir deslocamentos urbanos diários com praticidade",
      speed: "Velocidade adequada para acompanhar o fluxo real do trânsito da cidade",
      motor: "Entrega alinhada à proposta funcional e completa do modelo",
      recharge: "Rotina simples para encaixar o uso no dia a dia",
      load: "Compatível com a proposta urbana e cotidiana da scooter",
    },
    differentials: {
      title: "Onde a New Holiday se destaca na linha MS Electric",
      body: "A New Holiday é a scooter elétrica mais equilibrada do portfólio — combina design clássico, potência suficiente para o trânsito e autonomia para a rotina em um único modelo. Ela ocupa o espaço da scooter urbana completa: não é a mais potente, mas é a mais bem resolvida para quem quer substituir a moto a combustão no dia a dia.",
    },
    comparisonTip:
      "Se você busca uma entrada mais acessível nas scooters, a Holiday 1000 oferece um investimento menor. Se quer mais potência e velocidade, a MS 2500 sobe de nível. Mas se o objetivo é uma scooter completa, equilibrada e com design clássico para substituir a moto no dia a dia, a New Holiday é a escolha mais bem resolvida.",
    faq: [
      {
        q: "A New Holiday é indicada para qual tipo de uso?",
        a: "Para uso urbano diário como alternativa à moto a combustão. Com 2.000W, 50 km/h e 50 km de autonomia, ela cobre a maioria das rotinas urbanas com praticidade.",
      },
      {
        q: "Essa scooter elétrica faz sentido para deslocamentos diários?",
        a: "Sim. A New Holiday foi pensada exatamente para isso — velocidade para o trânsito, autonomia para a rotina e economia brutal no uso frequente.",
      },
      {
        q: "Qual o diferencial dela em relação a outros modelos da linha?",
        a: "Design clássico atemporal, proposta equilibrada entre potência e autonomia, e posicionamento como alternativa completa à moto a combustão.",
      },
      {
        q: "Ela é uma boa escolha para quem quer praticidade e simplicidade?",
        a: "Com certeza. A New Holiday é a scooter mais equilibrada da linha — funcional, bonita e fácil de incorporar na rotina sem complicação.",
      },
      {
        q: "Como funciona a recarga?",
        a: "Tomada comum (110V ou 220V), de 6 a 8 horas para carga completa. Conecte à noite e use pela manhã.",
      },
      {
        q: "Como é a manutenção?",
        a: "Simples e barata. 100% elétrica, sem troca de óleo, sem velas, sem embreagem. Manutenção mínima e muito menos frequente.",
      },
      {
        q: "Como funciona a garantia?",
        a: "A MS Electric oferece garantia de fábrica com suporte técnico e peças de reposição. Consulte um especialista para conhecer as condições.",
      },
      {
        q: "Para quem a New Holiday é a melhor escolha dentro do portfólio?",
        a: "Para quem quer uma scooter elétrica completa e equilibrada para substituir a moto no dia a dia. Se praticidade, design e economia importam, a New Holiday é a resposta.",
      },
    ],
    finalCta: {
      title: "Descubra se a New Holiday combina com a sua rotina",
      subtitle:
        "Fale com um especialista da MS Electric e receba orientação personalizada sobre o modelo ideal para o seu dia a dia.",
    },
  },
  "holiday-1000": {
    headline: "Sua porta de entrada no mundo das scooters elétricas",
    subheadline:
      "A Holiday 1000 é uma scooter elétrica acessível com motor de 1.000W, 45 km de autonomia e 32 km/h — pensada para quem quer mobilidade urbana prática, econômica e descomplicada.",
    supportText:
      "Compacta, funcional e fácil de usar. A Holiday 1000 é a scooter ideal para quem quer começar na mobilidade elétrica com investimento mais acessível, sem abrir mão de conforto, economia e praticidade real no dia a dia.",
    idealFor: [
      {
        icon: "route",
        title: "Deslocamentos urbanos leves",
        desc: "Trajetos de até 45 km na cidade — trabalho, estudo, compras e tarefas do dia a dia com praticidade.",
      },
      {
        icon: "sparkles",
        title: "Primeira scooter elétrica",
        desc: "Entrada acessível e descomplicada para quem quer experimentar a mobilidade elétrica em formato scooter.",
      },
      {
        icon: "piggyBank",
        title: "Economia no dia a dia",
        desc: "Sem combustível, sem IPVA, manutenção mínima. O menor custo de uso entre as scooters da linha.",
      },
      {
        icon: "city",
        title: "Rotina urbana simples",
        desc: "Para quem quer uma solução direta, fácil de usar e fácil de incorporar à rotina sem complicação.",
      },
    ],
    whyChoose: [
      {
        title: "O melhor preço entre as scooters",
        desc: "R$ 10.490 — o menor investimento para ter uma scooter elétrica completa da MS Electric com motor de 1.000W.",
      },
      {
        title: "Simplicidade de uso",
        desc: "Ligue e saia. Sem marcha, sem embreagem, sem complicação. A Holiday 1000 é feita para ser fácil.",
      },
      {
        title: "Conforto e economia",
        desc: "Banco confortável, posição ergonômica e custo operacional que cabe em qualquer orçamento.",
      },
      {
        title: "Capacidade para 150 kg",
        desc: "Estrutura sólida que suporta até 150 kg — espaço de sobra para você e suas coisas do dia a dia.",
      },
      {
        title: "Suporte MS Electric",
        desc: "Garantia de fábrica, assistência técnica e peças de reposição. Segurança na compra e suporte real.",
      },
    ],
    dailyBenefits: [
      {
        title: "Mobilidade sem complicação",
        desc: "A Holiday 1000 é tão simples quanto uma bicicleta, mas com o conforto e a praticidade de uma scooter.",
      },
      {
        title: "Economia que você sente",
        desc: "Centavos de energia por dia. Sem gasolina, sem IPVA. A diferença no bolso aparece já no primeiro mês.",
      },
      {
        title: "Compacta e ágil",
        desc: "Fácil de manobrar, fácil de estacionar e ágil o suficiente para circular pela cidade com praticidade.",
      },
      {
        title: "Silenciosa e limpa",
        desc: "Sem barulho, sem fumaça. Uma experiência de condução mais agradável para você e para a cidade.",
      },
      {
        title: "Conforto para o cotidiano",
        desc: "Banco ergonômico e posição natural de condução. Pensada para uso frequente sem desconforto.",
      },
      {
        title: "Recarregue na tomada",
        desc: "8 a 10 horas na tomada comum. Conecte à noite e tenha a scooter pronta pela manhã.",
      },
    ],
    urbanContext: {
      title: "Mobilidade elétrica acessível para a cidade",
      body: "A Holiday 1000 foi pensada para quem quer entrar no mundo das scooters elétricas sem grande investimento. Se você busca praticidade, economia e uma forma mais inteligente de se deslocar pela cidade, esse é o modelo que abre essa porta.",
      highlights: [
        "O menor investimento entre as scooters MS Electric",
        "Motor de 1.000W para deslocamentos urbanos práticos",
        "45 km de autonomia para cobrir a rotina",
        "Capacidade para 150 kg — estrutura sólida",
      ],
    },
    specContexts: {
      autonomy: "Faixa pensada para deslocamentos urbanos leves e cotidianos",
      speed: "Boa relação para uma mobilidade prática e segura na cidade",
      motor: "Entrega alinhada à proposta compacta e funcional do modelo",
      recharge: "Pensada para carregar durante a noite e usar durante o dia",
      load: "Capacidade compatível com uso real e cotidiano",
    },
    differentials: {
      title: "Onde a Holiday 1000 se destaca na linha MS Electric",
      body: "A Holiday 1000 é a porta de entrada mais acessível no universo das scooters elétricas MS Electric. Ela cumpre o papel de modelo inicial — funcional, econômico e descomplicado. Para quem quer mobilidade elétrica em formato scooter sem grande investimento, ela entrega exatamente o necessário para começar.",
    },
    comparisonTip:
      "Se você quer mais potência e velocidade para o trânsito, a New Holiday e a MS 2500 sobem de nível. Mas se praticidade, economia e o menor investimento possível em uma scooter são prioridade, a Holiday 1000 é a escolha mais direta e mais acessível da linha.",
    faq: [
      {
        q: "A Holiday 1000 é indicada para qual tipo de uso?",
        a: "Para deslocamentos urbanos leves e frequentes — trajetos curtos e médios na cidade, como ir ao trabalho, faculdade, mercado ou resolver tarefas do dia a dia.",
      },
      {
        q: "Essa scooter elétrica faz sentido para deslocamentos diários?",
        a: "Sim. Com 45 km de autonomia, a Holiday 1000 cobre a maioria das rotinas urbanas leves com praticidade e economia.",
      },
      {
        q: "Qual o diferencial dela em relação a outros modelos da linha?",
        a: "É a scooter mais acessível do portfólio — R$ 10.490 com motor de 1.000W e 150 kg de capacidade. A entrada mais econômica no formato scooter.",
      },
      {
        q: "Ela é uma boa escolha para quem quer uma proposta mais compacta e prática?",
        a: "Com certeza. A Holiday 1000 é feita para quem quer simplicidade, facilidade de uso e mobilidade urbana sem complicação.",
      },
      {
        q: "Como funciona a recarga?",
        a: "Tomada comum (110V ou 220V), de 8 a 10 horas para carga completa. Conecte à noite e use pela manhã.",
      },
      {
        q: "Como é a manutenção?",
        a: "Simples e barata. 100% elétrica, sem troca de óleo, sem velas, sem embreagem. Manutenção mínima.",
      },
      {
        q: "Como funciona a garantia?",
        a: "A MS Electric oferece garantia de fábrica com suporte técnico e peças de reposição. Consulte um especialista para conhecer as condições.",
      },
      {
        q: "Para quem a Holiday 1000 é a melhor escolha dentro do portfólio?",
        a: "Para quem quer a entrada mais acessível em scooters elétricas. Se economia, simplicidade e praticidade são prioridade, a Holiday 1000 é a resposta.",
      },
    ],
    finalCta: {
      title: "Descubra se a Holiday 1000 combina com a sua rotina",
      subtitle:
        "Fale com um especialista da MS Electric e receba orientação personalizada sobre o modelo ideal para o seu dia a dia.",
    },
  },

  "tour-3k": {
    headline: "Potência, presença e atitude para quem quer mais",
    subheadline:
      "A Tour 3K é a scooter elétrica para quem não se contenta com o básico. Com motor de 3.000W, visual custom chopper e até 75 km/h, ela entrega uma experiência urbana mais intensa, mais marcante e com muito mais personalidade.",
    supportText:
      "Se você busca uma mobilidade elétrica que chame atenção, transmita força e ofereça desempenho real na cidade, a Tour 3K é o próximo nível dentro da linha MS Electric.",
    idealFor: [
      {
        icon: "zap",
        title: "Quem quer mais potência",
        desc: "Motor de 3.000W para encarar a cidade com mais força, mais confiança e mais presença — inclusive em subidas.",
      },
      {
        icon: "crown",
        title: "Quem valoriza estilo",
        desc: "Visual custom chopper que se destaca em qualquer lugar. Uma scooter que expressa personalidade e atitude.",
      },
      {
        icon: "gauge",
        title: "Quem busca desempenho",
        desc: "Até 75 km/h para uma experiência urbana que vai além do convencional e entrega mais emoção na pilotagem.",
      },
      {
        icon: "trendingUp",
        title: "Quem quer evoluir",
        desc: "A escolha natural para quem já conhece mobilidade elétrica e quer subir de patamar em potência e presença.",
      },
    ],
    whyChoose: [
      {
        title: "Motor de 3.000W de verdade",
        desc: "Potência real que faz diferença na arrancada, nas subidas e na confiança do dia a dia — você sente a força desde o primeiro giro.",
      },
      {
        title: "Visual que não passa despercebido",
        desc: "Design custom chopper exclusivo dentro da linha. A Tour 3K não é apenas funcional — ela é uma declaração de estilo.",
      },
      {
        title: "Experiência urbana mais intensa",
        desc: "Com até 75 km/h e estrutura pensada para performance, cada deslocamento vira uma experiência mais marcante e prazerosa.",
      },
      {
        title: "Evolução dentro da linha MS Electric",
        desc: "Representa um salto claro em potência e presença em relação aos modelos mais básicos. É a escolha de quem exige mais.",
      },
      {
        title: "Suporte e confiança MS Electric",
        desc: "Todo o respaldo de uma marca especializada em mobilidade elétrica: assistência técnica, peças disponíveis e atendimento consultivo.",
      },
    ],
    dailyBenefits: [
      {
        title: "Presença que inspira confiança",
        desc: "Chegar ao destino com uma scooter que transmite força e personalidade muda a forma como você se sente na cidade.",
      },
      {
        title: "Subidas sem esforço",
        desc: "O motor de 3.000W entrega torque de sobra para encarar ladeiras e aclives sem perder ritmo ou confiança.",
      },
      {
        title: "Mais emoção na rotina",
        desc: "Pilotar a Tour 3K transforma deslocamentos em experiências — é mobilidade elétrica com adrenalina na medida certa.",
      },
      {
        title: "Economia com performance",
        desc: "Toda a potência sem gastar com combustível. Recarga na tomada, sem IPVA e com manutenção simplificada.",
      },
      {
        title: "Escolha que se destaca",
        desc: "Na garagem, no trânsito ou estacionada, a Tour 3K sempre chama atenção. É um produto que você tem orgulho de ter.",
      },
    ],
    urbanContext: {
      title: "Feita para quem quer dominar a cidade",
      body: "A Tour 3K foi projetada para quem vê a mobilidade elétrica como mais do que conveniência. É uma scooter para quem quer potência real, impacto visual e a sensação de pilotar algo que está acima do convencional. Com seu perfil custom chopper e motor de 3.000W, ela transforma qualquer trajeto urbano em uma experiência com mais força, mais estilo e mais personalidade.",
      highlights: [
        "Potência para subidas e arrancadas com confiança",
        "Design custom chopper único na linha",
        "Velocidade de até 75 km/h para mais dinamismo",
        "Autonomia de 40 km para a rotina urbana",
        "Presença visual que se destaca no trânsito",
        "Experiência de pilotagem mais intensa e marcante",
      ],
    },
    specContexts: {
      autonomy:
        "Faixa pensada para acompanhar uma proposta urbana mais forte, cobrindo trajetos do dia a dia com tranquilidade.",
      speed:
        "Até 75 km/h — entrega alinhada a uma experiência mais intensa de mobilidade elétrica, com desempenho que se sente de verdade.",
      motor:
        "3.000W de potência real — o grande diferencial do modelo, reforçando sua proposta de força, torque e presença.",
      recharge:
        "6 a 8 horas na tomada convencional. Carregue durante a noite e tenha a scooter pronta pela manhã.",
      load:
        "Capacidade de 120 kg, compatível com a proposta mais robusta e potente da scooter.",
    },
    differentials: {
      title: "Onde a Tour 3K se destaca",
      body: "A Tour 3K é a escolha certa para quem quer elevar o nível da mobilidade elétrica. Com o motor mais potente entre as scooters urbanas da linha, visual custom chopper exclusivo e velocidade de até 75 km/h, ela ocupa um espaço único no portfólio: é a scooter para quem quer mais potência, mais presença e uma experiência urbana muito mais marcante. Se você busca algo além do funcional — algo que transmita força, atitude e personalidade — a Tour 3K é o modelo que faz isso acontecer dentro da MS Electric.",
    },
    comparisonTip:
      "Se você busca a scooter elétrica mais potente e mais marcante da linha, a Tour 3K é a resposta com seus 3.000W e visual custom chopper. Se prefere mais autonomia e velocidade em um perfil esportivo, confira a S3K. Já se você quer robustez com um perfil mais urbano e equilibrado, a MS 2500 pode ser o caminho. Para uma entrada mais acessível, a Holiday 1000 e a New Holiday oferecem praticidade e economia.",
    faq: [
      {
        q: "A Tour 3K é indicada para qual tipo de uso?",
        a: "Para uso urbano de quem quer mais potência, mais presença e uma experiência de pilotagem mais intensa. Ideal para trajetos diários com mais confiança, incluindo trechos com subidas.",
      },
      {
        q: "O motor de 3.000W faz diferença real no dia a dia?",
        a: "Sim. Você sente a diferença na arrancada, nas subidas e na sensação geral de pilotagem. É uma potência que entrega mais segurança e mais prazer ao pilotar.",
      },
      {
        q: "Qual o diferencial dela em relação a modelos mais básicos?",
        a: "Potência significativamente maior, velocidade de até 75 km/h, visual custom chopper exclusivo e uma experiência de uso muito mais marcante e aspiracional.",
      },
      {
        q: "A Tour 3K é boa para subidas?",
        a: "Sim. O motor de 3.000W entrega torque suficiente para encarar aclives com tranquilidade, algo que modelos com menor potência não conseguem oferecer com a mesma confiança.",
      },
      {
        q: "Como funciona a recarga?",
        a: "Basta conectar na tomada convencional. A carga completa leva de 6 a 8 horas — ideal para carregar à noite e ter a scooter pronta pela manhã.",
      },
      {
        q: "Como é a manutenção?",
        a: "Simples e econômica. Scooters elétricas têm menos peças móveis que veículos a combustão, o que reduz custos e frequência de manutenção. A MS Electric oferece suporte técnico especializado.",
      },
      {
        q: "Como funciona a garantia?",
        a: "A MS Electric oferece garantia de fábrica com suporte técnico direto. Consulte um especialista para conhecer os termos completos e as condições de cobertura.",
      },
      {
        q: "Para quem a Tour 3K é a melhor escolha no portfólio?",
        a: "Para quem quer a combinação de mais potência com mais estilo. Se você valoriza força, presença visual e uma experiência de pilotagem acima da média, a Tour 3K é o modelo feito para você.",
      },
    ],
    finalCta: {
      title: "Pronto para sentir a potência da Tour 3K?",
      subtitle:
        "Fale com um especialista da MS Electric e descubra por que a Tour 3K é a escolha de quem quer mais força, mais presença e mais emoção na mobilidade elétrica.",
    },
  },
};
