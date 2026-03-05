import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, User, MessageSquare, Loader2, Mic, Square, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useBusinessStatus } from "@/hooks/useBusinessHours";
import { BRAZILIAN_CITIES } from "@/data/brazilian-cities";

// ── Native spam detection (instant, no API) ──────────────────────────
const PROFANITY_LIST = [
"merda", "porra", "caralho", "puta", "fdp", "foda", "buceta", "cacete",
"viado", "arrombado", "cuzão", "bosta", "desgraça", "piranha"];


// Common Portuguese bigrams (natural language patterns)
const VOWELS = new Set("aeiouáéíóúâêîôûãõàèìòù");

// Valid Portuguese word-start consonant clusters
const VALID_STARTS = new Set([
"b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "z",
"bl", "br", "cl", "cr", "ch", "dl", "dr", "fl", "fr", "gl", "gr", "gn", "lh", "nh",
"pl", "pr", "ps", "qu", "sc", "sk", "sl", "sm", "sn", "sp", "st", "sw", "tr", "tl", "vr"]
);

// Valid Portuguese word-end patterns
const VALID_ENDS = /[aeioulmnrsxz]$/i;

// Common Portuguese bigrams that appear in real words
const COMMON_BIGRAMS = new Set([
"de", "da", "do", "os", "as", "em", "um", "qu", "co", "ca", "re", "pa", "se", "ra", "te",
"en", "es", "ta", "al", "an", "ar", "ma", "no", "na", "or", "er", "on", "in", "ri", "la",
"me", "io", "to", "le", "ia", "ti", "mo", "ni", "li", "ro", "el", "lo", "po", "so", "sa",
"ve", "ol", "si", "is", "pe", "il", "ic", "ce", "ci", "ao", "nh", "lh", "ch", "tr", "pr",
"br", "cr", "gr", "fr", "pl", "bl", "cl", "fl", "dr", "gl", "gu", "am", "om", "im", "um",
// Common in international names used in Brazil
"th", "rt", "hu", "ur", "ph", "sh", "ck", "wn", "ew", "ws", "nd", "ng", "ld", "rd", "rn",
"tt", "ff", "ll", "ss", "nn", "mm", "pp", "rr", "ks", "nk", "nt", "ns", "rs", "ls", "ts"]
);

function isGibberish(text: string): boolean {
  const lower = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "");
  if (lower.length < 4) return false;

  // 1. Check word start: extract leading consonants
  const startMatch = lower.match(/^([^aeiou]*)/i);
  if (startMatch && startMatch[1].length >= 2) {
    if (!VALID_STARTS.has(startMatch[1])) return true;
  }

  // 2. Check consonant clusters: 3+ consonants in a row (non-standard)
  const clusters = lower.match(/[^aeiou]{3,}/gi) || [];
  const allowedClusters = ["str", "ntr", "nst", "ndr", "mbr", "mpr", "scr", "spr", "nsp", "nsc", "xtr", "xpr", "xpl", "rth", "sch", "ght", "phr", "chr", "thr", "rst", "rns", "ldr", "ngl", "ngr", "rpr", "schm", "ndt", "lph", "mph", "nth", "nch", "lth", "rch", "rgh", "sth", "tch", "dth"];
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

  // 7. Check for scrambled/anagram patterns — only for very short words with extreme mashing
  if (lower.length >= 6 && lower.length <= 8) {
    const bigrams = new Set<string>();
    for (let i = 0; i < lower.length - 1; i++) bigrams.add(lower.slice(i, i + 2));
    let reversePairs = 0;
    for (const bg of bigrams) {
      const rev = bg[1] + bg[0];
      if (bg !== rev && bigrams.has(rev)) reversePairs++;
    }
    // Only flag if almost all bigrams are reverse pairs (true keyboard mashing like "adasdsa")
    if (reversePairs >= 4) return true;
  }

  return false;
}

function detectSpam(field: "name" | "city" | "details", value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null; // empty handled by required validation

  const lower = trimmed.toLowerCase();
  const nospaces = lower.replace(/\s/g, "");

  // Profanity check (all fields)
  if (PROFANITY_LIST.some((w) => lower.includes(w))) {
    return "Conteúdo inadequado detectado";
  }

  // Excessive repeated chars (e.g. "aaaa", "dddddd") — 4+ consecutive
  if (/(.)\1{3,}/i.test(nospaces)) {
    return field === "name" ? "*Informe seu nome verdadeiro" : field === "city" ? "Informe uma cidade válida" : "Mensagem inválida";
  }

  // Keyboard mashing patterns (common qwerty/sequential)
  const mashPatterns = ["asdf", "qwer", "zxcv", "hjkl", "abcd", "1234", "wasd"];
  if (mashPatterns.some((p) => nospaces.includes(p)) && nospaces.length < 20) {
    return field === "name" ? "*Informe seu nome verdadeiro" : field === "city" ? "Informe uma cidade válida" : "*Escreva uma mensagem coerente com o que precisa";
  }

  // Gibberish detection for all fields
  if (field === "city") {
    // Check each word in city for gibberish
    const words = trimmed.split(/[\s,]+/).filter(Boolean);
    if (words.some((w) => w.length >= 4 && isGibberish(w))) {
      return "Informe uma cidade válida";
    }
  }

  // Field-specific checks
  if (field === "name") {
    // Must have at least 2 words (first + last name)
    if (!trimmed.includes(" ")) {
      return "Inclua seu sobrenome também";
    }
    // Each word must have at least 2 chars
    const words = trimmed.split(/\s+/);
    if (words.some((w) => w.length < 2)) {
      return "Nome inválido";
    }
    // Duplicate words like "teste teste"
    if (words.length >= 2 && new Set(words.map((w) => w.toLowerCase())).size === 1) {
      return "*Informe seu nome verdadeiro";
    }
    // Only letters/accents/spaces
    if (!/^[A-Za-zÀ-ÿ\s'-]+$/.test(trimmed)) {
      return "Use apenas letras no nome";
    }
    // Light gibberish check for names: only flag if BOTH words are gibberish (tolerant of foreign names)
    const nameWords = words.filter((w) => w.length >= 4);
    if (nameWords.length >= 2 && nameWords.every((w) => isGibberish(w))) {
      return "*Informe seu nome verdadeiro";
    }
  }

  if (field === "details") {
    // High char frequency — single char is >50% of text
    if (nospaces.length > 5) {
      const freq: Record<string, number> = {};
      for (const c of nospaces) freq[c] = (freq[c] || 0) + 1;
      const maxFreq = Math.max(...Object.values(freq));
      if (maxFreq / nospaces.length > 0.5) {
        return "Mensagem inválida";
      }
    }
    // Same word repeated 3+ times — exclude common Portuguese stop words
    const stopWords = new Set(["a", "o", "e", "é", "de", "da", "do", "das", "dos", "em", "no", "na", "nos", "nas", "um", "uma", "uns", "umas", "para", "por", "com", "como", "que", "se", "os", "as", "eu", "ele", "ela", "ao", "à", "mas", "mais", "ou", "nem", "já", "lá", "aqui", "essa", "esse", "este", "esta", "essas", "esses", "meu", "minha", "seu", "sua", "não", "sim", "ter", "ser", "ir", "ver", "fazer", "queria", "saber", "muito", "bem", "também"]);
    const words = lower.split(/\s+/);
    const wordCount: Record<string, number> = {};
    for (const w of words) {
      if (!stopWords.has(w) && w.length >= 3) wordCount[w] = (wordCount[w] || 0) + 1;
    }
    if (Object.values(wordCount).some((c) => c >= 4)) {
      return "Mensagem parece ser spam";
    }
    // Check gibberish — only flag if MAJORITY of meaningful words are gibberish
    const meaningfulWords = words.filter((w) => w.length >= 5 && !stopWords.has(w));
    if (meaningfulWords.length >= 2) {
      const gibberishCount = meaningfulWords.filter((w) => isGibberish(w)).length;
      if (gibberishCount / meaningfulWords.length > 0.6) {
        return "*Escreva uma mensagem coerente com o que precisa";
      }
    }
  }

  return null; // clean
}

const WHATSAPP_NUMBER = "551151996628";

const businessHoursInfo = [
{ day: "Seg - Sex", hours: "08:00 – 18:00" },
{ day: "Sábado", hours: "08:00 – 12:00" },
{ day: "Domingo", hours: "Fechado" }];



const WhatsAppIcon = ({ className = "w-5 h-5" }: {className?: string;}) =>
<svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>;


const overlayVariants = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  visible: {
    opacity: 1,
    backdropFilter: "blur(12px)",
    transition: { duration: 0.4, ease: "easeOut" as const }
  },
  exit: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    transition: { duration: 0.3, ease: "easeIn" as const }
  }
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 28, stiffness: 320 }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 }
  }
};

interface ContactWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const formatPhone = (digits: string): string => {
  if (digits.length === 0) return "";
  if (digits.length > 7) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  if (digits.length > 2) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits}`;
};

// Synchronous city filter against static list
const normaliseStr = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function filterCities(query: string): string[] {
  const q = normaliseStr(query.trim());
  if (q.length < 2) return [];
  return BRAZILIAN_CITIES.
  filter((c) => normaliseStr(c).includes(q)).
  slice(0, 8);
}



// Shared input style helper — replaces inline onFocus/onBlur handlers
const inputBaseStyle = "w-full px-3 py-2.5 rounded-lg text-sm text-white placeholder:text-white/35 focus:outline-none transition-[border-color,box-shadow] duration-200";

const getInputBorderStyle = (hasError: boolean) => ({
  background: "hsl(0 0% 100% / 0.06)",
  border: `1px solid ${hasError ? "hsl(0 84% 60% / 0.5)" : "hsl(0 0% 100% / 0.08)"}`
});

const ContactWidget = ({ isOpen, onClose }: ContactWidgetProps) => {
  const { isOnline: _isOnline, offlineMessage } = useBusinessStatus();
  const isOnline = true; // TEMP: simular online
  const [name, setName] = useState("");
  const [showHoursPopup, setShowHoursPopup] = useState(false);
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [cityValidated, setCityValidated] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [focusedCityIndex, setFocusedCityIndex] = useState(-1);
  const cityInputRef = useRef<HTMLInputElement | null>(null);
  const cityDropdownRef = useRef<HTMLDivElement | null>(null);
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isDetailsFocused, setIsDetailsFocused] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const recordingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recordingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const MAX_RECORDING_SECONDS = 15;


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  // Auto-resize textarea whenever details changes (covers transcription, autofill, etc.)
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [details]);

  // Cleanup MediaRecorder on unmount
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) clearTimeout(recordingTimerRef.current);
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};

    // Name — also run detectSpam for consistency
    const trimmedName = name.trim();
    if (!trimmedName) {
      errs.name = "Precisamos do seu nome completo";
    } else {
      const nameSpam = detectSpam("name", trimmedName);
      if (nameSpam) {
        errs.name = nameSpam;
      } else if (!trimmedName.includes(" ")) {
        errs.name = "Inclua seu sobrenome também";
      } else if (!/^[A-Za-zÀ-ÿ\s'-]+$/.test(trimmedName)) {
        errs.name = "Use apenas letras no nome";
      }
    }

    // Phone: 11 digits, valid DDD (11-99), 3rd digit must be 9
    const phoneDigits = phone.replace(/\D/g, "");
    if (!phone.trim()) {
      errs.phone = "Qual seu número de WhatsApp?";
    } else if (phoneDigits.length !== 11) {
      errs.phone = "O número deve ter DDD + 9 dígitos";
    } else {
      const ddd = parseInt(phoneDigits.slice(0, 2), 10);
      if (ddd < 11 || ddd > 99) {
        errs.phone = "*DDD inválido";
      } else if (phoneDigits[2] !== "9") {
        errs.phone = "*Celular deve começar com 9 após o DDD";
      } else {
        // Entropy check
        const body = phoneDigits.slice(2);
        const uniqueDigits = new Set(body).size;
        const digitFreq: Record<string, number> = {};
        for (const d of body) digitFreq[d] = (digitFreq[d] || 0) + 1;
        const maxFreq = Math.max(...Object.values(digitFreq));
        if (/^(\d)\1{10}$/.test(phoneDigits) || uniqueDigits <= 2 || maxFreq >= 7) {
          errs.phone = "*Insira um número válido";
        }
      }
    }

    // City — must be selected from list
    if (!city.trim()) {
      errs.city = "Informe sua cidade e estado";
    } else if (!cityValidated) {
      errs.city = "*Selecione uma localidade válida da lista";
    }

    // Details — also run detectSpam
    const trimmedDetails = details.trim();
    if (!trimmedDetails) {
      errs.details = "Informe o motivo do contato";
    } else if (trimmedDetails.length < 10) {
      errs.details = "Descreva com mais detalhes (mínimo 10 caracteres)";
    } else if (trimmedDetails.split(/\s+/).length < 2) {
      errs.details = "Escreva pelo menos duas palavras";
    } else {
      const detailsSpam = detectSpam("details", trimmedDetails);
      if (detailsSpam) {
        errs.details = detailsSpam;
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [name, phone, city, cityValidated, details]);


  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4"
      });
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType });
        chunksRef.current = [];
        setIsTranscribing(true);
        try {
          const arrayBuffer = await blob.arrayBuffer();
          const uint8 = new Uint8Array(arrayBuffer);
          let binary = "";
          const chunkSize = 8192;
          for (let i = 0; i < uint8.length; i += chunkSize) {
            binary += String.fromCharCode(...uint8.slice(i, i + chunkSize));
          }
          const base64 = btoa(binary);
          const { data, error } = await supabase.functions.invoke("transcribe-audio", {
            body: { audioBase64: base64 }
          });
          if (error || !data?.transcription) throw new Error("Transcription failed");
          const text = data.transcription;
          if (text && text !== "[áudio inaudível]") {
            setDetails((prev) => prev ? `${prev} ${text}` : text);
          }
        } catch (err) {
          console.error("Transcription error:", err);
        } finally {
          setIsTranscribing(false);
        }
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      recordingIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
      // Auto-stop after 20 seconds
      recordingTimerRef.current = setTimeout(() => {
        if (recordingIntervalRef.current) {
          clearInterval(recordingIntervalRef.current);
          recordingIntervalRef.current = null;
        }
        if (mediaRecorderRef.current?.state === "recording") {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
          setRecordingSeconds(0);
        }
      }, MAX_RECORDING_SECONDS * 1000);
    } catch {
      console.error("Microphone access denied");
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (recordingTimerRef.current) {
      clearTimeout(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    setRecordingSeconds(0);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!validate()) return;
    setIsLoading(true);

    let message: string;

    try {
      // Run classification and message generation in parallel
      const [classifyResult, messageResult] = await Promise.all([
      supabase.functions.invoke("classify-subject", {
        body: { details: details.trim() }
      }),
      supabase.functions.invoke("generate-whatsapp-message", {
        body: { name: name.trim(), city: city.trim(), phone: phone, details: details.trim() || undefined }
      })]
      );

      const subject = classifyResult.data?.subject || "Outros Assuntos";

      if (messageResult.error || !messageResult.data?.message) throw new Error("AI error");

      // Insert the classified subject into the message
      const aiMessage = messageResult.data.message as string;
      message = aiMessage.replace(
        /(\*Cidade:\*[^\n]*)/,
        `$1\n\n*Assunto:* ${subject}`
      );
    } catch {
      message = [
      `*Por favor, para que seu atendimento prossiga, não apague esta mensagem antes de enviar!*`,
      ``,
      `*Nome:* ${name.trim()}`,
      ``,
      `*WhatsApp:* ${phone}`,
      ``,
      `*Cidade:* ${city.trim()}`,
      ``,
      `*Assunto:* Outros Assuntos`,
      ``,
      `*Detalhes:* ${details.trim()}`].
      join("\n");
    }

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );

    setName("");
    setPhone("");
    setCity("");
    setCityValidated(false);
    setCitySuggestions([]);
    setDetails("");
    setErrors({});
    // Bug #1: reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    setIsLoading(false);
    onClose();
  }, [name, phone, city, details, validate, onClose]);

  return (
    <AnimatePresence>
      {isOpen &&
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit">
        
          {/* Backdrop */}
          <motion.div
          className="absolute inset-0 bg-foreground/60"
          onClick={onClose} />
        

          {/* Panel — glassmorphism dark style matching header */}
          <motion.div
          variants={panelVariants}
          className="relative w-full max-w-md rounded-[0.9rem] overflow-hidden max-h-[90vh] flex flex-col"
          style={{
            background: "hsl(0 0% 14% / 0.92)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid hsl(0 0% 100% / 0.08)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 40px hsl(11 81% 57% / 0.08)"
          }}>
          
            {/* Top gradient light strip */}
            <div
            className="h-[2px] shrink-0"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.8), hsl(11 90% 65% / 0.8), transparent)"
            }} />
          

            {/* Ambient glow — respects reduced motion */}
            <motion.div
            className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none motion-reduce:hidden"
            style={{
              background: "radial-gradient(circle, hsl(11 81% 57% / 0.08) 0%, transparent 70%)",
              filter: "blur(40px)"
            }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }} />
          

            {/* Scrollable content with fade indicators */}
            <div className="overflow-y-auto flex-1 relative scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
              {/* Top scroll fade */}
              <div
              className="sticky top-0 left-0 right-0 h-3 pointer-events-none z-10"
              style={{ background: "linear-gradient(to bottom, hsl(0 0% 14% / 0.92), transparent)" }} />
            

              {/* Header */}
              <div className="flex items-start justify-between px-5 pt-4 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Fale com um especialista da MS Eletric
                  </h3>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">
                    {isOnline ?
                  "Estamos online! Preencha os campos e fale agora com um especialista." :
                  "Preencha os campos abaixo e responderemos assim que nosso atendimento retornar."}
                  </p>
                </div>
                <motion.button
                onClick={onClose}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Status chip + hours popup */}
              <div className="px-[21px] py-[16px] pb-[16px] pt-px">
                <div className="relative">
                  <button
                  type="button"
                  onClick={() => setShowHoursPopup((v) => !v)}
                  className="group flex items-center gap-2.5 px-4 py-2 rounded-xl text-[11px] font-semibold tracking-wide border w-full cursor-pointer transition-all duration-200 hover:brightness-125"
                  style={{
                    background: isOnline ?
                    "linear-gradient(135deg, hsl(142 76% 36% / 0.15), hsl(142 76% 36% / 0.05))" :
                    "linear-gradient(135deg, hsl(15 30% 14%), hsl(20 20% 11%))",
                    borderColor: isOnline ?
                    "hsl(142 76% 36% / 0.3)" :
                    "hsl(11 81% 57% / 0.25)",
                    color: isOnline ? "hsl(142 70% 70%)" : "hsl(30 90% 75%)"
                  }}>
                  
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                      <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                      style={{ background: isOnline ? "hsl(142 76% 50%)" : "hsl(11 81% 57%)" }} />
                    
                      <span
                      className="relative inline-flex rounded-full h-2.5 w-2.5"
                      style={{ background: isOnline ? "hsl(142 76% 50%)" : "hsl(11 81% 57%)" }} />
                    </span>
                    {isOnline ? "Atendimento Online" : offlineMessage}
                    <span className="ml-auto flex items-center gap-1 text-[9px] opacity-50 group-hover:opacity-80 transition-opacity duration-200">
                      Ver horários <span className="inline-block transition-transform duration-200" style={{ transform: showHoursPopup ? "rotate(90deg)" : "rotate(0deg)" }}>›</span>
                    </span>
                  </button>


                  {/* Tooltip hint — shows briefly on first open */}
                  <AnimatePresence>
                    {!showHoursPopup &&
                  <motion.div
                    key="hours-tooltip"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: [0, 1, 1, 0], y: [4, 0, 0, -2] }}
                    transition={{ duration: 3, times: [0, 0.15, 0.7, 1], delay: 1.5 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 pointer-events-none whitespace-nowrap">
                    
                        <span
                      className="text-[9px] text-white/50 px-2 py-1 rounded-md"
                      style={{ background: "hsl(0 0% 10% / 0.8)", border: "1px solid hsl(0 0% 100% / 0.08)" }}>
                      
                          Toque para ver o horário de atendimento
                        </span>
                      </motion.div>
                  }
                  </AnimatePresence>

                  {/* Hours popup */}
                  <AnimatePresence>
                    {showHoursPopup &&
                  <>
                        {/* Backdrop to close on outside click */}
                        <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowHoursPopup(false)} />
                    
                        <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.92 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl p-4 space-y-1"
                      style={{
                        background: isOnline
                          ? "linear-gradient(135deg, hsl(142 76% 36% / 0.15), hsl(142 76% 36% / 0.05))"
                          : "linear-gradient(135deg, hsl(15 30% 14%), hsl(20 20% 11%))",
                        backdropFilter: "blur(24px)",
                        border: isOnline
                          ? "1px solid hsl(142 76% 36% / 0.3)"
                          : "1px solid hsl(11 81% 57% / 0.25)",
                        boxShadow: isOnline
                          ? "0 12px 40px hsl(0 0% 0% / 0.3), 0 0 20px hsl(142 76% 36% / 0.05)"
                          : "0 12px 40px hsl(0 0% 0% / 0.3), 0 0 20px hsl(11 81% 57% / 0.05)"
                      }}>
                      
                          <div className="flex items-center gap-2 mb-2.5 pb-2" style={{ borderBottom: `1px solid ${isOnline ? "hsl(142 76% 36% / 0.15)" : "hsl(0 0% 100% / 0.06)"}` }}>
                            <Clock className="w-2.5 h-2.5" style={{ color: isOnline ? "hsl(142 70% 70%)" : "hsl(11 81% 57% / 0.8)" }} />
                            <span className="text-[11px] font-semibold tracking-wide" style={{ color: isOnline ? "hsl(142 70% 70%)" : "hsl(30 90% 75%)" }}>
                              Horário de atendimento
                            </span>
                          </div>
                          {businessHoursInfo.map((item) => {
                        const isToday = new Date().getDay() === (
                          item.day === "Seg - Sex" ? (new Date().getDay() >= 1 && new Date().getDay() <= 5 ? new Date().getDay() : -1) :
                          item.day === "Sábado" ? 6 :
                          item.day === "Domingo" ? 0 : -1
                        );
                        const todayBg = isOnline ? "hsl(142 76% 36% / 0.08)" : "hsl(11 81% 57% / 0.08)";
                        const todayBorder = isOnline ? "2px solid hsl(142 76% 36% / 0.6)" : "2px solid hsl(11 81% 57% / 0.6)";
                        return (
                      <div
                        key={item.day}
                        className="grid items-center py-2 px-2.5 rounded-lg transition-colors duration-150"
                        style={{
                          gridTemplateColumns: "1fr auto",
                          background: isToday ? todayBg : "transparent",
                          borderLeft: isToday ? todayBorder : "2px solid transparent"
                        }}>
                        
                              <span className="text-[11px] font-medium" style={{ color: isToday ? "hsl(0 0% 100% / 0.85)" : "hsl(0 0% 100% / 0.50)" }}>
                                {item.day}
                                {isToday && <span className="ml-1.5 text-[8px] uppercase tracking-wider font-bold" style={{ color: isOnline ? "hsl(142 70% 70%)" : "hsl(11 81% 57% / 0.8)" }}>Hoje</span>}
                              </span>
                              <span
                          className="text-[11px] font-semibold text-right tabular-nums"
                          style={{ color: item.hours === "Fechado" ? "hsl(0 60% 55% / 0.7)" : isToday ? (isOnline ? "hsl(142 70% 70%)" : "hsl(11 81% 57%)") : (isOnline ? "hsl(142 70% 70% / 0.75)" : "hsl(11 81% 57% / 0.75)") }}>
                          
                                {item.hours}
                              </span>
                            </div>
                        );
                      })}
                        </motion.div>
                      </>
                  }
                  </AnimatePresence>
                </div>
              </div>

              {/* Divider */}
              <div
              className="mx-5 h-[1px]"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.3), transparent)"
              }} />
            

              {/* Form */}
              <div className="px-5 py-4 space-y-3.5">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-1.5">
                    <User className="w-3 h-3" />
                    Como podemos te chamar? <span className="text-primary/70">*</span>
                  </label>
                  <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    const PREPOSITIONS = new Set(["da", "de", "do", "dos", "das", "e"]);
                    const formatted = e.target.value.
                    toLowerCase().
                    split(/\s+/).
                    map((w, i) => {
                      if (i > 0 && PREPOSITIONS.has(w)) return w;
                      return w.charAt(0).toUpperCase() + w.slice(1);
                    }).
                    join(" ");
                    setName(formatted);
                    const spamErr = detectSpam("name", formatted);
                    setErrors((prev) => {
                      const next = { ...prev };
                      if (spamErr) next.name = spamErr;else
                      delete next.name;
                      return next;
                    });
                  }}
                  placeholder="João Silva"
                  maxLength={100}
                  className={`${inputBaseStyle} cw-input ${errors.name ? "cw-input-error" : ""}`}
                  style={getInputBorderStyle(!!errors.name)} />
                
                  {errors.name && <p className="text-[10px] mt-1" style={{ color: "hsl(0 84% 65%)" }}>{errors.name}</p>}
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-1.5">
                    <WhatsAppIcon className="w-3 h-3" />
                    WhatsApp para contato <span className="text-primary/70">*</span>
                  </label>
                  <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={phone}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "").slice(0, 11);
                    setPhone(formatPhone(raw));
                    // Instant phone validation
                    if (raw.length === 11) {
                      const ddd = parseInt(raw.slice(0, 2), 10);
                      if (ddd < 11 || ddd > 99) {
                        setErrors((prev) => ({ ...prev, phone: "*DDD inválido" }));
                      } else if (raw[2] !== "9") {
                        setErrors((prev) => ({ ...prev, phone: "*Celular deve começar com 9 após o DDD" }));
                      } else {
                        const body = raw.slice(2);
                        const uniqueDigits = new Set(body).size;
                        const digitFreq: Record<string, number> = {};
                        for (const d of body) digitFreq[d] = (digitFreq[d] || 0) + 1;
                        const maxFreq = Math.max(...Object.values(digitFreq));
                        const isFake = /^(\d)\1{10}$/.test(raw) || uniqueDigits <= 2 || maxFreq >= 7;
                        if (isFake) {
                          setErrors((prev) => ({ ...prev, phone: "*Insira um número válido" }));
                        } else {
                          setErrors((prev) => {const { phone, ...rest } = prev;return rest;});
                        }
                      }
                    } else if (raw.length > 0 && raw.length < 11) {
                      setErrors((prev) => {const { phone, ...rest } = prev;return rest;});
                    }
                  }}
                  placeholder="(00) 00000-0000"
                  maxLength={20}
                  className={`${inputBaseStyle} cw-input ${errors.phone ? "cw-input-error" : ""}`}
                  style={getInputBorderStyle(!!errors.phone)} />
                
                  {errors.phone && <p className="text-[10px] mt-1" style={{ color: "hsl(0 84% 65%)" }}>{errors.phone}</p>}
                </div>

                {/* City autocomplete */}
                <div className="relative">
                  <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-1.5">
                    <MapPin className="w-3 h-3" />
                    De onde você é? <span className="text-primary/70">*</span>
                  </label>
                  <input
                  ref={cityInputRef}
                  type="text"
                  value={city}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCity(val);
                    setCityValidated(false);
                    setErrors((prev) => {const { city: _, ...rest } = prev;return rest;});

                    // Instant local filter
                    if (val.trim().length >= 2) {
                      const results = filterCities(val.trim());
                      setCitySuggestions(results);
                      setIsCityDropdownOpen(results.length > 0);
                      setFocusedCityIndex(-1);
                    } else {
                      setCitySuggestions([]);
                      setIsCityDropdownOpen(false);
                    }
                  }}
                  onFocus={() => {
                    if (city.trim().length >= 2 && citySuggestions.length > 0) {
                      setIsCityDropdownOpen(true);
                    }
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setIsCityDropdownOpen(false);
                    }, 200);
                  }}
                  onKeyDown={(e) => {
                    if (!isCityDropdownOpen) return;
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setFocusedCityIndex((prev) => Math.min(prev + 1, citySuggestions.length - 1));
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setFocusedCityIndex((prev) => Math.max(prev - 1, 0));
                    } else if (e.key === "Enter" && focusedCityIndex >= 0) {
                      e.preventDefault();
                      setCity(citySuggestions[focusedCityIndex]);
                      setCityValidated(true);
                      setIsCityDropdownOpen(false);
                      setCitySuggestions([]);
                      setErrors((prev) => {const { city: _, ...rest } = prev;return rest;});
                    } else if (e.key === "Escape") {
                      setIsCityDropdownOpen(false);
                    }
                  }}
                  placeholder="São Paulo, SP"
                  maxLength={100}
                  className={`${inputBaseStyle} cw-input ${errors.city ? "cw-input-error" : ""}`}
                  style={getInputBorderStyle(!!errors.city)}
                  autoComplete="off" />
                
                  {/* Suggestions dropdown */}
                  <AnimatePresence>
                    {isCityDropdownOpen && citySuggestions.length > 0 &&
                  <motion.div
                    ref={cityDropdownRef}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 right-0 z-50 mt-1 rounded-lg overflow-hidden"
                    style={{
                      background: "hsl(0 0% 14% / 0.95)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid hsl(0 0% 100% / 0.1)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
                    }}>
                    
                        {citySuggestions.map((suggestion, index) =>
                    <button
                      key={suggestion}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setCity(suggestion);
                        setCityValidated(true);
                        setIsCityDropdownOpen(false);
                        setCitySuggestions([]);
                        setErrors((prev) => {const { city: _, ...rest } = prev;return rest;});
                      }}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                      focusedCityIndex === index ?
                      "text-white bg-white/10" :
                      "text-white/70 hover:bg-white/10 hover:text-white"}`
                      }>
                      
                            {suggestion}
                          </button>
                    )}
                      </motion.div>
                  }
                  </AnimatePresence>
                  {errors.city && <p className="text-[10px] mt-1" style={{ color: "hsl(0 84% 65%)" }}>{errors.city}</p>}
                </div>

                {/* Details with suggestion chips + mic */}
                <div>
                  <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-1.5">
                    <MessageSquare className="w-3 h-3" />
                    Conta pra gente o que você precisa <span className="text-primary/70">*</span>
                  </label>


                  <div className="relative">
                    <textarea
                    ref={textareaRef}
                    value={details}
                    onChange={(e) => {
                      const val = e.target.value;
                      setDetails(val);
                      // Native instant spam check
                      const spamErr = detectSpam("details", val);
                      setErrors((prev) => {
                        const next = { ...prev };
                        if (spamErr) next.details = spamErr;else
                        delete next.details;
                        return next;
                      });
                      // Auto-grow
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                    placeholder={isTranscribing ? "Processando áudio..." : "Ex: Quero saber mais sobre a scooter elétrica..."}
                    rows={3}
                    maxLength={500}
                    disabled={isTranscribing}
                    className={`${inputBaseStyle} pr-14 resize-none disabled:opacity-50 cw-input ${errors.details ? "cw-input-error" : ""}`}
                    style={{ ...getInputBorderStyle(!!errors.details), maxHeight: '40vh', overflow: 'hidden' }}
                    onFocus={() => setIsDetailsFocused(true)}
                    onBlur={() => setIsDetailsFocused(false)} />
                  

                    {/* Mic button inside textarea */}
                    <AnimatePresence>
                      {(!isDetailsFocused || isRecording || isTranscribing) &&
                    <motion.div
                      key="mic-group"
                      className="absolute"
                      style={{ width: 30, height: 30, right: 8, bottom: 14 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}>
                      
                          {/* Double pulse rings */}
                          {!isRecording && !isTranscribing &&
                      <>
                              <motion.div
                          className="absolute inset-0 rounded-full pointer-events-none motion-reduce:hidden"
                          style={{ border: "1.5px solid hsl(11 81% 57% / 0.25)" }}
                          animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} />
                        
                              <motion.div
                          className="absolute inset-0 rounded-full pointer-events-none motion-reduce:hidden"
                          style={{ border: "1px solid hsl(11 81% 57% / 0.15)" }}
                          animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }} />
                        
                            </>
                      }
                          <motion.button
                        type="button"
                        onClick={isRecording ? stopRecording : startRecording}
                        disabled={isTranscribing}
                        className="w-full h-full flex items-center justify-center rounded-full disabled:opacity-40 cursor-pointer"
                        style={{
                          background: isRecording ?
                          "hsl(0 84% 55% / 0.25)" :
                          isTranscribing ?
                          "hsl(0 0% 100% / 0.06)" :
                          "hsl(0 0% 100% / 0.08)",
                          backdropFilter: "blur(8px)",
                          border: `1px solid ${isRecording ? "hsl(0 84% 60% / 0.35)" : "hsl(0 0% 100% / 0.15)"}`,
                          boxShadow: isRecording ?
                          "0 0 14px hsl(0 84% 55% / 0.3)" :
                          "0 0 8px hsl(11 81% 57% / 0.08)"
                        }}
                        whileHover={isTranscribing ? {} : {
                          background: isRecording ? "hsl(0 84% 55% / 0.35)" : "hsl(11 81% 57% / 0.15)",
                          borderColor: isRecording ? "hsl(0 84% 60% / 0.5)" : "hsl(11 81% 57% / 0.5)",
                          boxShadow: "0 0 18px hsl(11 81% 57% / 0.3), 0 0 36px hsl(11 81% 57% / 0.1)",
                          scale: 1.15
                        }}
                        whileTap={isTranscribing ? {} : { scale: 0.88 }}
                        animate={isRecording ? {
                          borderColor: ["hsl(0 84% 60% / 0.35)", "hsl(0 84% 60% / 0.7)", "hsl(0 84% 60% / 0.35)"],
                          boxShadow: [
                          "0 0 14px hsl(0 84% 55% / 0.3)",
                          "0 0 22px hsl(0 84% 55% / 0.5)",
                          "0 0 14px hsl(0 84% 55% / 0.3)"]

                        } : {}}
                        transition={isRecording ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" } : { type: "spring", stiffness: 350, damping: 18 }}>
                        
                            {isTranscribing ?
                        <Loader2 className="w-4 h-4 text-white/60 animate-spin" /> :
                        isRecording ?
                        <motion.div
                          className="w-2.5 h-2.5 rounded-[2px]"
                          style={{ background: "hsl(0 84% 65%)" }}
                          animate={{ scale: [1, 0.8, 1] }}
                          transition={{ duration: 0.7, repeat: Infinity }} /> :


                        <Mic className="text-white/60" style={{ width: 14, height: 14 }} strokeWidth={2.2} />
                        }
                          </motion.button>
                        </motion.div>
                    }
                    </AnimatePresence>
                  </div>

                  {/* Recording indicator */}
                  <AnimatePresence>
                    {isRecording &&
                  <motion.div
                    className="flex items-center gap-2 mt-2 px-3 py-2 rounded-lg"
                    style={{
                      background: "hsl(0 84% 60% / 0.08)",
                      border: "1px solid hsl(0 84% 60% / 0.15)"
                    }}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}>
                    
                        <span className="relative flex h-2 w-2 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "hsl(0 84% 60%)" }} />
                          <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "hsl(0 84% 60%)" }} />
                        </span>
                        <span className="text-[10px] text-white/50 leading-relaxed">
                          Gravando ({MAX_RECORDING_SECONDS - recordingSeconds}s)... toque para parar
                        </span>
                      </motion.div>
                  }
                    {isTranscribing &&
                  <motion.div
                    className="flex items-center gap-2 mt-2 px-3 py-2 rounded-lg"
                    style={{
                      background: "hsl(11 81% 57% / 0.08)",
                      border: "1px solid hsl(11 81% 57% / 0.15)"
                    }}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}>
                    
                        <Loader2 className="w-3 h-3 text-white/40 animate-spin shrink-0" />
                        <span className="text-[10px] text-white/50">Processando áudio...</span>
                      </motion.div>
                  }
                  </AnimatePresence>
                  {errors.details && <p className="text-[10px] mt-1" style={{ color: "hsl(0 84% 65%)" }}>{errors.details}</p>}
                </div>

                {/* Submit */}
                <motion.button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-lg font-semibold text-sm tracking-wide text-white cursor-pointer relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #25D366, #128C7E)",
                  boxShadow: "0 4px 20px rgba(37,211,102,0.25)"
                }}
                whileHover={isLoading ? {} : {
                  scale: 1.02,
                  boxShadow: "0 0 25px rgba(37,211,102,0.5), 0 0 50px rgba(37,211,102,0.15)"
                }}
                whileTap={isLoading ? {} : { scale: 0.98 }}>
                
                  {isLoading ?
                <Loader2 className="w-5 h-5 animate-spin" /> :

                <WhatsAppIcon className="w-5 h-5" />
                }
                  {isLoading ? "Redirecionando..." : "Continuar no WhatsApp"}
                  
                </motion.button>

                <p className="text-[9px] text-white/30 text-center leading-relaxed pt-2 pb-1">
                  *Ao enviar, seus dados serão usados apenas para atendimento, conforme a LGPD (<span style={{ color: "hsl(11 81% 57%)" }}>Lei nº 13.709/2018</span>).
                </p>
              </div>

              {/* Bottom scroll fade */}
              <div
              className="sticky bottom-0 left-0 right-0 h-3 pointer-events-none"
              style={{ background: "linear-gradient(to top, hsl(0 0% 14% / 0.92), transparent)" }} />
            
            </div>

            {/* Bottom light strip */}
            <div
            className="h-[1px] shrink-0"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(11 81% 57% / 0.4), transparent)"
            }} />
          
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

};

export default ContactWidget;