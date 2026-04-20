export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: "evento" | "institucional" | "campanha" | "novidade";
  date: string;
  image?: string;
  featured?: boolean;
  /** Full article content. array of content blocks */
  article?: ArticleBlock[];
  subtitle?: string;
}

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; src?: string; alt: string; caption?: string }
  | { type: "quote"; text: string; author?: string };

export const NEWS_CATEGORIES = {
  evento: "Evento",
  institucional: "Institucional",
  campanha: "Campanha",
  novidade: "Novidade",
} as const;

const LOREM_BODY: ArticleBlock[] = [
  { type: "paragraph", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
  { type: "paragraph", text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
  { type: "heading", text: "Sed ut perspiciatis unde omnis" },
  { type: "paragraph", text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet." },
  { type: "image", alt: "Imagem placeholder. substituir pelo conteúdo final" },
  { type: "paragraph", text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur." },
  { type: "quote", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore." },
  { type: "paragraph", text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident." },
];

/**
 * Placeholder news items with lorem ipsum content.
 * Replace each entry with real content when available.
 */
export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "1",
    slug: "placeholder-1",
    title: "Lorem ipsum dolor sit amet",
    subtitle: "Consectetur adipiscing elit sed do eiusmod tempor",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    category: "evento",
    date: "2026-04-05",
    featured: true,
    article: LOREM_BODY,
  },
  {
    id: "2",
    slug: "placeholder-2",
    title: "Consectetur adipiscing elit",
    subtitle: "Duis aute irure dolor in reprehenderit",
    summary: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.",
    category: "institucional",
    date: "2026-03-18",
    article: LOREM_BODY,
  },
  {
    id: "3",
    slug: "placeholder-3",
    title: "Sed do eiusmod tempor incididunt",
    subtitle: "Ut enim ad minim veniam quis nostrud",
    summary: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.",
    category: "novidade",
    date: "2026-03-01",
    article: LOREM_BODY,
  },
  {
    id: "4",
    slug: "placeholder-4",
    title: "Ut labore et dolore magna aliqua",
    subtitle: "Excepteur sint occaecat cupidatat non proident",
    summary: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis.",
    category: "campanha",
    date: "2026-02-15",
    article: LOREM_BODY,
  },
  {
    id: "5",
    slug: "placeholder-5",
    title: "Quis nostrud exercitation ullamco",
    subtitle: "Nemo enim ipsam voluptatem quia voluptas",
    summary: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.",
    category: "institucional",
    date: "2026-01-20",
    article: LOREM_BODY,
  },
  {
    id: "6",
    slug: "placeholder-6",
    title: "Duis aute irure dolor reprehenderit",
    subtitle: "Neque porro quisquam est qui dolorem",
    summary: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.",
    category: "evento",
    date: "2025-12-10",
    article: LOREM_BODY,
  },
];
