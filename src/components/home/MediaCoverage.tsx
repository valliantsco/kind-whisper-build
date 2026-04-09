import { motion } from "framer-motion";

const newsItems = [
  {
    source: "Veículo 1",
    date: "Jan 2024",
    title: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    excerpt:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.",
    url: "",
    featured: true,
  },
  {
    source: "Veículo 2",
    date: "Fev 2024",
    title: "Ut enim ad minim veniam quis nostrud exercitation ullamco",
    excerpt:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    url: "",
  },
  {
    source: "Veículo 3",
    date: "Mar 2024",
    title: "Duis aute irure dolor in reprehenderit in voluptate velit",
    excerpt:
      "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.",
    url: "",
  },
];
const MediaCoverage = () => {
  const featured = newsItems[0];
  const others = newsItems.slice(1);

  return (
    <section className="relative py-14 md:py-20 overflow-hidden">
      {/* ── Newspaper column lines ── */}
      {[20, 40, 60, 80].map((left, i) => (
        <motion.div
          key={i}
          className="absolute top-[10%] pointer-events-none w-[1px]"
          style={{
            left: `${left}%`,
            background:
              "linear-gradient(to bottom, transparent, hsl(0 0% 100% / 0.03), transparent)",
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
              style={{
                backgroundImage:
                  "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
              }}
            >
              MS Eletric
            </span>
          </h2>
          <p className="text-sm md:text-base text-primary-foreground/45 leading-relaxed mt-4 max-w-lg ml-auto">
            A MS Eletric também vem ganhando espaço na imprensa e em canais que
            acompanham inovação, mobilidade e negócios. É mais um reflexo de uma
            marca que vem se consolidando com presença, estrutura e
            credibilidade.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured card – spans 2 cols on md */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm flex flex-col justify-end"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary text-primary-foreground">
                  {featured.source}
                </span>
                <span className="text-xs text-primary-foreground/50">
                  {featured.date}
                </span>
              </div>
              <h3 className="font-display font-bold text-xl md:text-2xl lg:text-3xl text-primary-foreground leading-tight mb-3">
                {featured.title}
              </h3>
              <p className="text-sm text-primary-foreground/50 leading-relaxed max-w-xl">
                {featured.excerpt}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary/40 mt-4">
              Em breve
            </span>
          </motion.div>

          {/* Smaller text cards */}
          {others.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 1) * 0.1, duration: 0.5 }}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {item.source}
                  </span>
                  <span className="text-xs text-primary-foreground/30">
                    {item.date}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base md:text-lg text-primary-foreground leading-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-primary-foreground/40 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-primary/40 mt-4">
                Em breve
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaCoverage;
