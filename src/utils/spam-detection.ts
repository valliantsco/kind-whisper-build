// ── Native spam detection (instant, no API) ──────────────────────────

const PROFANITY_LIST = [
  "merda", "porra", "caralho", "puta", "fdp", "foda", "buceta", "cacete",
  "viado", "arrombado", "cuzão", "bosta", "desgraça", "piranha"
];

// Valid Portuguese word-start consonant clusters
const VALID_STARTS = new Set([
  "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "z",
  "bl", "br", "cl", "cr", "ch", "dl", "dr", "fl", "fr", "gl", "gr", "gn", "lh", "nh",
  "pl", "pr", "ps", "qu", "sc", "sk", "sl", "sm", "sn", "sp", "st", "sw", "tr", "tl", "vr"
]);

// Valid Portuguese word-end patterns
const VALID_ENDS = /[aeioulmnrsxz]$/i;

// Common Portuguese bigrams that appear in real words
const COMMON_BIGRAMS = new Set([
  "de", "da", "do", "os", "as", "em", "um", "qu", "co", "ca", "re", "pa", "se", "ra", "te",
  "en", "es", "ta", "al", "an", "ar", "ma", "no", "na", "or", "er", "on", "in", "ri", "la",
  "me", "io", "to", "le", "ia", "ti", "mo", "ni", "li", "ro", "el", "lo", "po", "so", "sa",
  "ve", "ol", "si", "is", "pe", "il", "ic", "ce", "ci", "ao", "nh", "lh", "ch", "tr", "pr",
  "br", "cr", "gr", "fr", "pl", "bl", "cl", "fl", "dr", "gl", "gu", "am", "om", "im", "um",
  "th", "rt", "hu", "ur", "ph", "sh", "ck", "wn", "ew", "ws", "nd", "ng", "ld", "rd", "rn",
  "tt", "ff", "ll", "ss", "nn", "mm", "pp", "rr", "ks", "nk", "nt", "ns", "rs", "ls", "ts"
]);

export function isGibberish(text: string): boolean {
  const lower = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "");
  if (lower.length < 4) return false;

  // 1. Check word start: extract leading consonants
  const startMatch = lower.match(/^([^aeiou]*)/i);
  if (startMatch && startMatch[1].length >= 2) {
    if (!VALID_STARTS.has(startMatch[1])) return true;
  }

  // 2. Check consonant clusters: 3+ consonants in a row (non-standard)
  const clusters = lower.match(/[^aeiou]{3,}/gi) || [];
  const allowedClusters = [
    "str", "ntr", "nst", "ndr", "mbr", "mpr", "scr", "spr", "nsp", "nsc", "xtr", "xpr", "xpl",
    "rth", "sch", "ght", "phr", "chr", "thr", "rst", "rns", "ldr", "ngl", "ngr", "rpr", "schm",
    "ndt", "lph", "mph", "nth", "nch", "lth", "rch", "rgh", "sth", "tch", "dth"
  ];
  if (clusters.some((c) => !allowedClusters.some((a) => c.includes(a)))) return true;

  // 3. Check vowel ratio
  const vowelCount = [...lower].filter((c) => "aeiou".includes(c)).length;
  const vowelRatio = vowelCount / lower.length;
  if (lower.length >= 5 && (vowelRatio < 0.25 || vowelRatio > 0.8)) return true;

  // 4. Repetitive syllable pattern: "dsa dsa", "ada ada"
  if (lower.length >= 6) {
    const half = Math.floor(lower.length / 2);
    const first = lower.slice(0, half);
    const second = lower.slice(half, half + first.length);
    if (first === second && first.length >= 3) return true;
  }

  // 5. Word doesn't end with valid Portuguese ending
  if (lower.length >= 5 && !VALID_ENDS.test(lower)) return true;

  // 6. Bigram frequency check
  if (lower.length >= 4) {
    let commonCount = 0;
    const totalBigrams = lower.length - 1;
    for (let i = 0; i < totalBigrams; i++) {
      if (COMMON_BIGRAMS.has(lower.slice(i, i + 2))) commonCount++;
    }
    if (totalBigrams >= 3 && commonCount / totalBigrams < 0.35) return true;
  }

  // 7. Check for scrambled/anagram patterns
  if (lower.length >= 6 && lower.length <= 8) {
    const bigrams = new Set<string>();
    for (let i = 0; i < lower.length - 1; i++) bigrams.add(lower.slice(i, i + 2));
    let reversePairs = 0;
    for (const bg of bigrams) {
      const rev = bg[1] + bg[0];
      if (bg !== rev && bigrams.has(rev)) reversePairs++;
    }
    if (reversePairs >= 4) return true;
  }

  return false;
}

export function detectSpam(field: "name" | "city" | "details", value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const lower = trimmed.toLowerCase();
  const nospaces = lower.replace(/\s/g, "");

  // Profanity check
  if (PROFANITY_LIST.some((w) => lower.includes(w))) {
    return "Conteúdo inadequado detectado";
  }

  // Excessive repeated chars (4+ consecutive)
  if (/(.)\1{3,}/i.test(nospaces)) {
    return field === "name" ? "*Informe seu nome verdadeiro" : field === "city" ? "Informe uma cidade válida" : "Mensagem inválida";
  }

  // Keyboard mashing patterns
  const mashPatterns = ["asdf", "qwer", "zxcv", "hjkl", "abcd", "1234", "wasd"];
  if (mashPatterns.some((p) => nospaces.includes(p)) && nospaces.length < 20) {
    return field === "name" ? "*Informe seu nome verdadeiro" : field === "city" ? "Informe uma cidade válida" : "*Escreva uma mensagem coerente com o que precisa";
  }

  // Gibberish detection for city
  if (field === "city") {
    const words = trimmed.split(/[\s,]+/).filter(Boolean);
    if (words.some((w) => w.length >= 4 && isGibberish(w))) {
      return "Informe uma cidade válida";
    }
  }

  // Name-specific checks
  if (field === "name") {
    if (!trimmed.includes(" ")) {
      return "Inclua seu sobrenome também";
    }
    const words = trimmed.split(/\s+/);
    if (words.some((w) => w.length < 2)) {
      return "Nome inválido";
    }
    if (words.length >= 2 && new Set(words.map((w) => w.toLowerCase())).size === 1) {
      return "*Informe seu nome verdadeiro";
    }
    if (!/^[A-Za-zÀ-ÿ\s'-]+$/.test(trimmed)) {
      return "Use apenas letras no nome";
    }
    const nameWords = words.filter((w) => w.length >= 4);
    if (nameWords.length >= 2 && nameWords.every((w) => isGibberish(w))) {
      return "*Informe seu nome verdadeiro";
    }
  }

  // Details-specific checks
  if (field === "details") {
    if (nospaces.length > 5) {
      const freq: Record<string, number> = {};
      for (const c of nospaces) freq[c] = (freq[c] || 0) + 1;
      const maxFreq = Math.max(...Object.values(freq));
      if (maxFreq / nospaces.length > 0.5) {
        return "Mensagem inválida";
      }
    }
    const stopWords = new Set([
      "a", "o", "e", "é", "de", "da", "do", "das", "dos", "em", "no", "na", "nos", "nas",
      "um", "uma", "uns", "umas", "para", "por", "com", "como", "que", "se", "os", "as",
      "eu", "ele", "ela", "ao", "à", "mas", "mais", "ou", "nem", "já", "lá", "aqui",
      "essa", "esse", "este", "esta", "essas", "esses", "meu", "minha", "seu", "sua",
      "não", "sim", "ter", "ser", "ir", "ver", "fazer", "queria", "saber", "muito", "bem", "também"
    ]);
    const words = lower.split(/\s+/);
    const wordCount: Record<string, number> = {};
    for (const w of words) {
      if (!stopWords.has(w) && w.length >= 3) wordCount[w] = (wordCount[w] || 0) + 1;
    }
    if (Object.values(wordCount).some((c) => c >= 4)) {
      return "Mensagem parece ser spam";
    }
    const meaningfulWords = words.filter((w) => w.length >= 5 && !stopWords.has(w));
    if (meaningfulWords.length >= 2) {
      const gibberishCount = meaningfulWords.filter((w) => isGibberish(w)).length;
      if (gibberishCount / meaningfulWords.length > 0.6) {
        return "*Escreva uma mensagem coerente com o que precisa";
      }
    }
  }

  return null;
}
