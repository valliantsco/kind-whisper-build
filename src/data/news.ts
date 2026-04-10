export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: "evento" | "institucional" | "campanha" | "novidade";
  date: string; // ISO date
  image?: string;
  featured?: boolean;
}

export const NEWS_CATEGORIES = {
  evento: "Evento",
  institucional: "Institucional",
  campanha: "Campanha",
  novidade: "Novidade",
} as const;

/**
 * Placeholder news items — replace with real content when available.
 * Images are optional; cards render gracefully without them.
 */
export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "1",
    slug: "femec-2026",
    title: "MS Eletric na FEMEC 2026",
    summary:
      "A MS Eletric marca presença na Feira de Mecânica e Inovação Industrial, apresentando a linha completa de veículos elétricos para o público de Uberlândia e região.",
    category: "evento",
    date: "2026-04-05",
    featured: true,
  },
  {
    id: "2",
    slug: "parceria-cdl-uberlandia",
    title: "Parceria com a CDL Uberlândia",
    summary:
      "Ação conjunta com a Câmara de Dirigentes Lojistas para incentivar a mobilidade elétrica no comércio local, com condições especiais para associados.",
    category: "institucional",
    date: "2026-03-18",
  },
  {
    id: "3",
    slug: "novos-modelos-linha-2026",
    title: "Linha 2026: novos modelos disponíveis",
    summary:
      "Portfólio ampliado com novos modelos para uso urbano, profissional e recreativo. Conheça as novidades que chegaram ao catálogo.",
    category: "novidade",
    date: "2026-03-01",
  },
  {
    id: "4",
    slug: "campanha-primeiro-eletrico",
    title: "Campanha: seu primeiro elétrico",
    summary:
      "Condições facilitadas para quem quer migrar para a mobilidade elétrica. Fale com nosso time e descubra as opções disponíveis.",
    category: "campanha",
    date: "2026-02-15",
  },
  {
    id: "5",
    slug: "ms-eletric-certificacoes-internacionais",
    title: "Certificações internacionais da linha AIMA",
    summary:
      "Reconhecimentos como TITAN Awards e NY Product Design Awards reforçam a qualidade e o design dos veículos comercializados pela MS Eletric.",
    category: "institucional",
    date: "2026-01-20",
  },
  {
    id: "6",
    slug: "acao-sustentabilidade-uberlandia",
    title: "Ação de sustentabilidade em Uberlândia",
    summary:
      "Participação em evento local voltado à mobilidade limpa e responsabilidade ambiental, com test-rides abertos ao público.",
    category: "evento",
    date: "2025-12-10",
  },
];
