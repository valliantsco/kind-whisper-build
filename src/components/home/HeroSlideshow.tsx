import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Battery, Gauge, CreditCard, Wallet, Banknote } from "lucide-react";

const SLIDE_DURATION = 20000;

interface PaymentHighlight {
  icon: typeof Zap;
  title: string;
  detail: string;
}

interface Slide {
  badge: string;
  headline: string[];
  highlightLine: number;
  subheadline: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  stats?: { icon: typeof Zap; value: string; label: string }[];
  payments?: PaymentHighlight[];
}

const SLIDES: Slide[] = [
  {
    badge: "MAIS VENDIDO",
    headline: ["MOBILIDADE", "100%", "ELÉTRICA"],
    highlightLine: 1,
    subheadline:
      "Mais de 19 modelos elétricos para cada estilo de vida. Zero emissão, economia real.",
    primaryCta: { text: "Explorar catálogo", href: "/modelos" },
    secondaryCta: { text: "Fazer o quiz", href: "#quiz" },
    youtubeId: "aogNFr_-56w",
    youtubeStart: 3,
  },
  {
    badge: "NOVIDADE",
    headline: ["TOUR 3K", "POTÊNCIA", "PARA SUBIDAS"],
    highlightLine: 1,
    subheadline:
      "Motor de 3.000W e velocidade de até 75km/h. Bateria de lítio removível e design esportivo.",
    primaryCta: { text: "Conhecer a Tour 3K", href: "/modelos/tour-3k" },
    secondaryCta: { text: "Ver todos os modelos", href: "/modelos" },
    youtubeId: "j9UspI7_KAg",
    youtubeStart: 4,
    stats: [
      { icon: Zap, value: "3.000W", label: "Motor" },
      { icon: Gauge, value: "75km/h", label: "Velocidade" },
      { icon: Battery, value: "40km", label: "Autonomia" },
    ],
  },
  {
    badge: "CONDIÇÕES ESPECIAIS",
    headline: ["FACILIDADE", "PARA SAIR", "PILOTANDO"],
    highlightLine: 1,
    subheadline:
      "Condições flexíveis para você escolher a melhor forma de pagamento na MS Eletric.",
    primaryCta: { text: "Consultar condições", href: "#contato" },
    secondaryCta: { text: "Ver todos os modelos", href: "/modelos" },
    youtubeId: "aogNFr_-56w",
    youtubeStart: 8,
    payments: [
      { icon: CreditCard, title: "Até 12x sem juros", detail: "No cartão de crédito" },
      { icon: Wallet, title: "Pix com desconto", detail: "Condição especial à vista" },
      { icon: Banknote, title: "Financiamento", detail: "Sob consulta" },
    ],
  },
];

const HeroSlideshow = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % SLIDES.length), []);
  const prev = useCallback(
    () => setCurrent((p) => (p - 1 + SLIDES.length) % SLIDES.length),
    []
  );

  useEffect(() => {
    setProgress(0);
    const interval = 50;
    const prog = setInterval(() => {
      setProgress((p) => Math.min(p + (interval / SLIDE_DURATION) * 100, 100));
    }, interval);
    const timer = setTimeout(next, SLIDE_DURATION);
    return () => {
      clearInterval(prog);
      clearTimeout(timer);
    };
  }, [current, next]);

  const slide = SLIDES[current];

  return (
    <section className="relative min-h-[85vh] md:min-h-[92vh] flex items-end overflow-hidden">
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-foreground" />

      {/* YouTube background video */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          key={slide.youtubeId}
          src={`https://www.youtube.com/embed/${slide.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${slide.youtubeId}&controls=0&showinfo=0&modestbranding=1&rel=0&start=${slide.youtubeStart ?? 0}&playsinline=1&enablejsapi=1&iv_load_policy=3&disablekb=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          title={slide.badge}
          className="absolute top-1/2 left-1/2 pointer-events-none border-0"
          style={{
            width: "177.78vh",
            height: "100vh",
            minWidth: "100vw",
            minHeight: "56.25vw",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* ── Gradient overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/85 to-foreground/40 md:via-foreground/80 md:to-foreground/30 z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/50 to-foreground/30 md:via-foreground/40 md:to-foreground/20 z-[2]" />

      {/* ── Ambient glow ── */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[400px] h-[400px] md:w-[900px] md:h-[900px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 60%)",
            filter: "blur(100px)",
            top: "-10%",
            left: "-5%",
          }}
          animate={{ x: [0, 200, 0], y: [0, 80, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-4 pb-16 md:pb-20 mt-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-4xl"
          >

            {/* Headline */}
            <h1 className="font-display font-black text-[clamp(1.75rem,7vw,4.8rem)] text-primary-foreground leading-[1.08] mb-3 md:mb-5 uppercase tracking-tight">
              {slide.headline.map((line, i) => (
                <motion.span
                  key={i}
                  className="block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.45 }}
                >
                  {i === slide.highlightLine ? (
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                        filter:
                          "drop-shadow(0 0 24px hsl(var(--primary) / 0.35))",
                      }}
                    >
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </h1>

            {/* Subheadline */}
            <motion.p
              className="text-sm md:text-base text-primary-foreground/50 mb-5 md:mb-7 max-w-sm md:max-w-lg leading-relaxed tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {slide.subheadline}
            </motion.p>

            {/* Inline specs */}
            {slide.stats && (
              <motion.div
                className="flex items-center gap-3 md:gap-6 mb-5 md:mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                {slide.stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-1.5 md:gap-2">
                    <div
                      className="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: "hsl(var(--primary) / 0.1)",
                        border: "1px solid hsl(var(--primary) / 0.15)",
                      }}
                    >
                      <stat.icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-black text-xs md:text-sm text-primary-foreground leading-none">
                        {stat.value}
                      </p>
                      <p className="text-[8px] md:text-[10px] text-primary-foreground/30 uppercase tracking-wider">
                        {stat.label}
                      </p>
                    </div>
                    {i < slide.stats!.length - 1 && (
                      <div
                        className="w-px h-5 md:h-6 ml-1.5 md:ml-3"
                        style={{ background: "hsl(0 0% 100% / 0.08)" }}
                      />
                    )}
                  </div>
                ))}
              </motion.div>
            )}

            {/* Payment highlights */}
            {slide.payments && (
              <motion.div
                className="flex flex-wrap items-center gap-3 md:gap-5 mb-5 md:mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                {slide.payments.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 md:gap-2.5">
                    <div
                      className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: "hsl(var(--primary) / 0.1)",
                        border: "1px solid hsl(var(--primary) / 0.15)",
                      }}
                    >
                      <p.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-display font-bold text-[11px] md:text-sm text-primary-foreground leading-tight">
                        {p.title}
                      </p>
                      <p className="text-[9px] md:text-[10px] text-primary-foreground/35 uppercase tracking-wider hidden md:block">
                        {p.detail}
                      </p>
                    </div>
                    {i < slide.payments!.length - 1 && (
                      <div
                        className="w-px h-7 md:h-8 ml-1 md:ml-2"
                        style={{ background: "hsl(0 0% 100% / 0.08)" }}
                      />
                    )}
                  </div>
                ))}
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <motion.a
                href={slide.primaryCta.href}
                onClick={(e) => {
                  if (slide.primaryCta.href === "#contato") {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent("open-contact"));
                  }
                }}
                className="group inline-flex items-center gap-2 text-[12px] md:text-sm font-semibold uppercase tracking-[0.12em] px-6 py-3 md:px-7 md:py-3.5 rounded-xl text-primary-foreground relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                  boxShadow:
                    "0 8px 32px hsl(var(--primary) / 0.3), 0 1px 0 inset hsl(0 0% 100% / 0.1)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 40%, hsl(0 0% 100% / 0.12) 50%, transparent 60%)",
                  }}
                />
                <span className="relative z-10">{slide.primaryCta.text}</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-0.5" />
              </motion.a>

              <a
                href={slide.secondaryCta.href}
                className="inline-flex items-center gap-2 text-[12px] md:text-sm font-semibold uppercase tracking-[0.12em] px-6 py-3 md:px-7 md:py-3.5 rounded-xl text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-300"
                style={{
                  border: "1px solid hsl(0 0% 100% / 0.1)",
                  background: "hsl(0 0% 100% / 0.03)",
                }}
              >
                {slide.secondaryCta.text}
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* ── Navigation arrows. bottom right on mobile ── */}
        <div className="absolute right-4 md:right-8 bottom-20 md:top-1/2 md:-translate-y-1/2 md:bottom-auto flex flex-row md:flex-col gap-2 z-20">
          {[
            { action: prev, icon: ChevronLeft },
            { action: next, icon: ChevronRight },
          ].map(({ action, icon: Icon }, i) => (
            <button
              key={i}
              onClick={action}
              className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center text-primary-foreground/40 hover:text-primary-foreground transition-all duration-300"
              style={{
                background: "hsl(0 0% 100% / 0.05)",
                border: "1px solid hsl(0 0% 100% / 0.08)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      {/* ── Slide indicators ── */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300"
            style={{
              width: i === current ? 44 : 16,
              background:
                i === current
                  ? "hsl(0 0% 100% / 0.15)"
                  : "hsl(0 0% 100% / 0.08)",
            }}
          >
            {i === current && (
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: "hsl(var(--primary))",
                  width: `${progress}%`,
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Bottom light strip ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), hsl(var(--primary-glow) / 0.4), transparent)",
        }}
      />
    </section>
  );
};

export default HeroSlideshow;
