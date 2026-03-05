import { BRAZILIAN_CITIES } from "@/data/brazilian-cities";

export const WHATSAPP_NUMBER = "551151996628";

export const BUSINESS_HOURS_INFO = [
  { day: "Seg - Sex", hours: "08:00 – 18:00" },
  { day: "Sábado", hours: "08:00 – 12:00" },
  { day: "Domingo", hours: "Fechado" },
] as const;

export const NAME_PREPOSITIONS = new Set(["da", "de", "do", "dos", "das", "e"]);

export const formatPhone = (digits: string): string => {
  if (digits.length === 0) return "";
  if (digits.length > 7) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  if (digits.length > 2) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits}`;
};

export const formatName = (raw: string): string => {
  return raw
    .toLowerCase()
    .split(/\s+/)
    .map((w, i) => {
      if (i > 0 && NAME_PREPOSITIONS.has(w)) return w;
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
};

const normaliseStr = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function filterCities(query: string): string[] {
  const q = normaliseStr(query.trim());
  if (q.length < 2) return [];
  return BRAZILIAN_CITIES.filter((c) => normaliseStr(c).includes(q)).slice(0, 8);
}

export const validatePhone = (phoneDigits: string): string | null => {
  if (phoneDigits.length !== 11) return "O número deve ter DDD + 9 dígitos";

  const ddd = parseInt(phoneDigits.slice(0, 2), 10);
  if (ddd < 11 || ddd > 99) return "*DDD inválido";
  if (phoneDigits[2] !== "9") return "*Celular deve começar com 9 após o DDD";

  const body = phoneDigits.slice(2);
  const uniqueDigits = new Set(body).size;
  const digitFreq: Record<string, number> = {};
  for (const d of body) digitFreq[d] = (digitFreq[d] || 0) + 1;
  const maxFreq = Math.max(...Object.values(digitFreq));
  const isFake = /^(\d)\1{10}$/.test(phoneDigits) || uniqueDigits <= 2 || maxFreq >= 7;
  if (isFake) return "*Insira um número válido";

  return null;
};

// Shared input style constants
export const INPUT_BASE_STYLE =
  "w-full px-3 py-2.5 rounded-lg text-sm text-white placeholder:text-white/35 focus:outline-none transition-[border-color,box-shadow] duration-200";

export const getInputBorderStyle = (hasError: boolean) => ({
  background: "hsl(0 0% 100% / 0.06)",
  border: `1px solid ${hasError ? "hsl(0 84% 60% / 0.5)" : "hsl(0 0% 100% / 0.08)"}`,
});
