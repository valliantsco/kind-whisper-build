export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: "evento" | "institucional" | "campanha" | "novidade";
  date: string;
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
 * Placeholder news items with lorem ipsum content.
 * Replace each entry with real content when available.
 */
export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "1",
    slug: "placeholder-1",
    title: "Lorem ipsum dolor sit amet",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    category: "evento",
    date: "2026-04-05",
    featured: true,
  },
  {
    id: "2",
    slug: "placeholder-2",
    title: "Consectetur adipiscing elit",
    summary:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.",
    category: "institucional",
    date: "2026-03-18",
  },
  {
    id: "3",
    slug: "placeholder-3",
    title: "Sed do eiusmod tempor incididunt",
    summary:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.",
    category: "novidade",
    date: "2026-03-01",
  },
  {
    id: "4",
    slug: "placeholder-4",
    title: "Ut labore et dolore magna aliqua",
    summary:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis.",
    category: "campanha",
    date: "2026-02-15",
  },
  {
    id: "5",
    slug: "placeholder-5",
    title: "Quis nostrud exercitation ullamco",
    summary:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.",
    category: "institucional",
    date: "2026-01-20",
  },
  {
    id: "6",
    slug: "placeholder-6",
    title: "Duis aute irure dolor reprehenderit",
    summary:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.",
    category: "evento",
    date: "2025-12-10",
  },
];
