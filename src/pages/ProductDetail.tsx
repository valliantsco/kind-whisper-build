import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Zap, Gauge, Weight, Battery, Clock,
  MessageCircle, ChevronRight, Shield, Leaf, Wrench,
} from "lucide-react";
import Header from "@/components/Header";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PopUpContato01 from "@/components/PopUpContato01";
import HomeFooter from "@/components/home/HomeFooter";
import { PRODUCTS, type Product } from "@/data/products";
import { useState, useMemo } from "react";

const FULL_SPECS = [
  { icon: Zap, key: "autonomy" as const, label: "Autonomia", desc: "Distância máxima por carga" },
  { icon: Gauge, key: "speed" as const, label: "Velocidade máx.", desc: "Velocidade de pico" },
  { icon: Battery, key: "motor" as const, label: "Motor", desc: "Potência do motor elétrico" },
  { icon: Clock, key: "recharge" as const, label: "Recarga", desc: "Tempo médio de recarga" },
  { icon: Weight, key: "load" as const, label: "Capacidade de carga", desc: "Peso máximo suportado" },
];

const BENEFITS = [
  { icon: Leaf, title: "Zero emissão", desc: "100% elétrico, sem poluição" },
  { icon: Shield, title: "Garantia MS", desc: "Cobertura e suporte técnico" },
  { icon: Wrench, title: "Manutenção simples", desc: "Sem óleo, sem embreagem" },
];

function getWhatsAppLink(product: Product) {
  const msg = encodeURIComponent(
    `Olá! Tenho interesse no modelo *${product.name}* (${product.category}). Gostaria de mais informações sobre disponibilidade e condições de pagamento.`
  );
  return `https://wa.me/5511999999999?text=${msg}`;
}

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [contactOpen, setContactOpen] = useState(false);

  const product = useMemo(() => PRODUCTS.find((p) => p.slug === slug), [slug]);

  const related = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter(
      (p) => p.slug !== product.slug && p.category === product.category
    ).slice(0, 3);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "hsl(0 0% 4%)" }}>
        <Header onContactClick={() => setContactOpen(false)} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-primary-foreground/50 text-lg mb-4">Modelo não encontrado</p>
            <Link to="/modelos" className="text-primary text-sm underline">
              Voltar ao catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ background: "hsl(0 0% 4%)" }}>
      {/* Background glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.04) 0%, transparent 65%)",
          filter: "blur(120px)",
        }}
      />

      <div className="relative z-10">
        <Header onContactClick={() => setContactOpen(true)} />

        {/* Breadcrumb */}
        <div className="container mx-auto px-4 pt-28 md:pt-36">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-[11px] text-primary-foreground/30 uppercase tracking-[0.12em] mb-8"
          >
            <button
              onClick={() => navigate("/modelos")}
              className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3" />
              Catálogo
            </button>
            <ChevronRight className="w-3 h-3 opacity-40" />
            <span className="text-primary-foreground/50">{product.category}</span>
            <ChevronRight className="w-3 h-3 opacity-40" />
            <span className="text-primary-foreground/70 font-semibold">{product.name}</span>
          </motion.div>
        </div>

        {/* Hero section */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div
                  className="relative rounded-2xl overflow-hidden bg-white p-8 md:p-12"
                  style={{
                    border: "1px solid hsl(0 0% 100% / 0.06)",
                    boxShadow: "0 30px 80px -20px hsl(0 0% 0% / 0.5)",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto object-contain max-h-[380px] mx-auto"
                  />
                  {/* Badge */}
                  {product.badge && (
                    <span
                      className="absolute top-4 left-4 px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-[0.12em] text-primary-foreground"
                      style={{
                        background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>
                {/* Decorative glow */}
                <div
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 blur-2xl rounded-full pointer-events-none"
                  style={{ background: "hsl(var(--primary) / 0.08)" }}
                />
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-4"
                  style={{
                    background: "hsl(var(--primary) / 0.1)",
                    color: "hsl(var(--primary))",
                    border: "1px solid hsl(var(--primary) / 0.2)",
                  }}
                >
                  {product.category}
                </span>

                <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-primary-foreground uppercase tracking-tight leading-[0.95] mb-4">
                  {product.name}
                </h1>

                {product.highlight && (
                  <p className="text-primary-foreground/50 text-base md:text-lg mb-6">
                    {product.highlight}
                  </p>
                )}

                <div
                  className="font-display font-black text-3xl md:text-4xl bg-clip-text text-transparent mb-8"
                  style={{
                    backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                  }}
                >
                  {product.price}
                </div>

                {/* Quick specs */}
                <div
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8"
                >
                  {FULL_SPECS.map((spec) => (
                    <div
                      key={spec.key}
                      className="rounded-xl p-3"
                      style={{
                        background: "hsl(0 0% 100% / 0.03)",
                        border: "1px solid hsl(0 0% 100% / 0.05)",
                      }}
                    >
                      <spec.icon className="w-4 h-4 text-primary mb-1.5" />
                      <p className="text-[13px] font-bold text-primary-foreground/85 tabular-nums">
                        {product[spec.key]}
                      </p>
                      <p className="text-[9px] text-primary-foreground/30 uppercase tracking-wider mt-0.5">
                        {spec.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={getWhatsAppLink(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-[12px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                      boxShadow: "0 8px 24px -6px hsl(var(--primary) / 0.35)",
                    }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Falar com consultor
                  </a>
                  <button
                    onClick={() => setContactOpen(true)}
                    className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-[12px] font-semibold uppercase tracking-[0.14em] transition-all duration-200 hover:border-primary/30 hover:text-primary cursor-pointer"
                    style={{
                      border: "1px solid hsl(0 0% 100% / 0.1)",
                      color: "hsl(0 0% 100% / 0.6)",
                    }}
                  >
                    Solicitar contato
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits strip */}
        <section className="py-12 md:py-16" style={{ borderTop: "1px solid hsl(0 0% 100% / 0.04)" }}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 rounded-xl p-5"
                  style={{
                    background: "hsl(0 0% 100% / 0.02)",
                    border: "1px solid hsl(0 0% 100% / 0.04)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: "hsl(var(--primary) / 0.1)",
                      border: "1px solid hsl(var(--primary) / 0.15)",
                    }}
                  >
                    <b.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[13px] text-primary-foreground/85 uppercase tracking-wide mb-1">
                      {b.title}
                    </h3>
                    <p className="text-[12px] text-primary-foreground/40 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Full specs table */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-display font-black text-2xl md:text-3xl text-primary-foreground uppercase tracking-tight mb-8 text-center">
                Especificações{" "}
                <span className="text-primary">técnicas</span>
              </h2>

              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid hsl(0 0% 100% / 0.06)" }}
              >
                {FULL_SPECS.map((spec, i) => (
                  <div
                    key={spec.key}
                    className="flex items-center justify-between p-4 md:p-5"
                    style={{
                      background: i % 2 === 0 ? "hsl(0 0% 100% / 0.02)" : "transparent",
                      borderBottom: i < FULL_SPECS.length - 1 ? "1px solid hsl(0 0% 100% / 0.04)" : "none",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <spec.icon className="w-4 h-4 text-primary/60" />
                      <div>
                        <p className="text-[12px] font-semibold text-primary-foreground/70 uppercase tracking-wide">
                          {spec.label}
                        </p>
                        <p className="text-[10px] text-primary-foreground/25">{spec.desc}</p>
                      </div>
                    </div>
                    <span className="font-display font-bold text-[14px] text-primary-foreground/90 tabular-nums">
                      {product[spec.key]}
                    </span>
                  </div>
                ))}
                {/* Price row */}
                <div
                  className="flex items-center justify-between p-4 md:p-5"
                  style={{ background: "hsl(var(--primary) / 0.04)" }}
                >
                  <p className="text-[12px] font-semibold text-primary/80 uppercase tracking-wide">
                    Preço
                  </p>
                  <span
                    className="font-display font-black text-lg bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                    }}
                  >
                    {product.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related models */}
        {related.length > 0 && (
          <section className="py-12 md:py-16" style={{ borderTop: "1px solid hsl(0 0% 100% / 0.04)" }}>
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display font-black text-xl md:text-2xl text-primary-foreground uppercase tracking-tight">
                  Modelos <span className="text-primary">relacionados</span>
                </h2>
                <Link
                  to="/modelos"
                  className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground/40 hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  Ver todos
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((rel, i) => (
                  <motion.div
                    key={rel.slug}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      to={`/modelos/${rel.slug}`}
                      className="group block rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/20"
                      style={{
                        background: "hsl(0 0% 100% / 0.025)",
                        border: "1px solid hsl(0 0% 100% / 0.06)",
                      }}
                    >
                      <div className="h-36 bg-white flex items-center justify-center p-5">
                        <img
                          src={rel.image}
                          alt={rel.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-display font-bold text-[12px] text-primary-foreground/85 uppercase tracking-wide group-hover:text-primary transition-colors">
                            {rel.name}
                          </h3>
                          <p className="text-[10px] text-primary-foreground/30 mt-0.5">{rel.category}</p>
                        </div>
                        <span
                          className="font-display font-bold text-[13px] bg-clip-text text-transparent"
                          style={{
                            backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                          }}
                        >
                          {rel.price}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <HomeFooter />
      </div>

      <FloatingWhatsApp />
      <PopUpContato01 isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
};

export default ProductDetail;
