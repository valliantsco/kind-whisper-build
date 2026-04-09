import { motion } from "framer-motion";
import mediaFeatured from "@/assets/media-featured.jpg";

const placeholderNews = [
  {
    source: "Lorem Ipsum",
    date: "00/00/0000",
    title: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    excerpt: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    source: "Dolor Sit",
    date: "00/00/0000",
    title: "Ut enim ad minim veniam quis nostrud exercitation",
    excerpt: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
  },
  {
    source: "Amet Consectetur",
    date: "00/00/0000",
    title: "Duis aute irure dolor in reprehenderit in voluptate",
    excerpt: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim.",
  },
  {
    source: "Adipiscing Elit",
    date: "00/00/0000",
    title: "Excepteur sint occaecat cupidatat non proident sunt",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.",
  },
];

const MediaCoverage = () => {
  return (
    <section className="relative py-14 md:py-20 overflow-hidden">
      {[20, 40, 60, 80].map((left, i) => (
        <motion.div
          key={i}
          className="absolute top-[10%] pointer-events-none w-[1px]"
          style={{
            left: `${left}%`,
            background: "linear-gradient(to bottom, transparent, hsl(0 0% 100% / 0.03), transparent)",
          }}
          initial={{ height: 0 }}
          whileInView={{ height: "80%" }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2, duration: 1.5, ease: "easeOut" }}
        />
      ))}

      <div className="container mx-auto px-4 relative">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16 text-right"
        >
          <div className="flex items-center gap-3 mb-6 justify-end">
            <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-primary">
              MS na Mídia
            </span>
            <div className="w-8 h-px bg-primary" />
          </div>

          <h2 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-primary-foreground uppercase tracking-tight leading-[0.95]">
            Quem fala da{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))" }}
            >
              MS Eletric
            </span>
          </h2>
          <p className="text-sm md:text-base text-primary-foreground/45 leading-relaxed mt-4 max-w-lg ml-auto">
            A MS Eletric também vem ganhando espaço na imprensa e em canais que acompanham inovação, mobilidade e negócios. É mais um reflexo de uma marca que vem se consolidando com presença, estrutura e credibilidade.
          </p>
        </motion.div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ── Featured first card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative md:col-span-2 rounded-2xl border border-primary/20 bg-white/[0.03] overflow-hidden backdrop-blur-sm hover:border-primary/40 transition-colors duration-300"
          >
            <div className="flex flex-col md:flex-row">
              <div className="relative md:w-1/2 h-56 md:h-auto overflow-hidden">
                <img
                  src={mediaFeatured}
                  alt="Notícia destaque"
                  loading="lazy"
                  width={800}
                  height={512}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent md:hidden" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary text-primary-foreground">
                  Destaque
                </span>
              </div>
              <div className="p-6 md:p-10 flex flex-col justify-center md:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {placeholderNews[0].source}
                  </span>
                  <span className="text-xs text-primary-foreground/30">{placeholderNews[0].date}</span>
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl lg:text-3xl text-primary-foreground leading-tight mb-4">
                  {placeholderNews[0].title}
                </h3>
                <p className="text-sm md:text-base text-primary-foreground/40 leading-relaxed">
                  {placeholderNews[0].excerpt}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Remaining cards ── */}
          {placeholderNews.slice(1).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 1) * 0.1, duration: 0.5 }}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm hover:border-primary/20 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {item.source}
                </span>
                <span className="text-xs text-primary-foreground/30">{item.date}</span>
              </div>
              <h3 className="font-display font-bold text-lg md:text-xl text-primary-foreground leading-tight mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-primary-foreground/40 leading-relaxed">
                {item.excerpt}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaCoverage;
