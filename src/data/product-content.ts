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
};
