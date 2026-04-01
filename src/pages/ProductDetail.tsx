import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PopUpContato01 from "@/components/PopUpContato01";
import PopUpContatoProduto from "@/components/product/PopUpContatoProduto";
import HomeFooter from "@/components/home/HomeFooter";
import { PRODUCTS } from "@/data/products";
import { PRODUCT_CONTENT } from "@/data/product-content";
import { useState, useMemo, useCallback } from "react";
import type { ProductColor } from "@/data/products";

import ProductHero from "@/components/product/ProductHero";
import ProductWhyChoose from "@/components/product/ProductWhyChoose";
import ProductDailyBenefits from "@/components/product/ProductDailyBenefits";
import ProductUrbanContext from "@/components/product/ProductUrbanContext";
import ProductSpecs from "@/components/product/ProductSpecs";
import ProductDifferentials from "@/components/product/ProductDifferentials";
import ProductComparison from "@/components/product/ProductComparison";
import ProductFAQ from "@/components/product/ProductFAQ";
import ProductFinalCTA from "@/components/product/ProductFinalCTA";
import AnimatedBackground from "@/components/home/AnimatedBackground";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [contactOpen, setContactOpen] = useState(false);
  const [productContactOpen, setProductContactOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);

  const handleColorChange = useCallback((color: ProductColor) => {
    setSelectedColor(color);
  }, []);

  const product = useMemo(() => PRODUCTS.find((p) => p.slug === slug), [slug]);
  const content = useMemo(() => (slug ? PRODUCT_CONTENT[slug] : undefined), [slug]);

  const related = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 3);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "hsl(0 0% 4%)" }}>
        <Header onContactClick={() => setContactOpen(false)} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-primary-foreground/50 text-lg mb-4">Modelo não encontrado</p>
            <Link to="/modelos" className="text-primary text-sm underline">Voltar ao catálogo</Link>
          </div>
        </div>
      </div>
    );
  }

  if (content) {
    return (
      <div className="min-h-screen relative" style={{ background: "hsl(0 0% 4%)" }}>
        <AnimatedBackground />
        <div className="relative z-10">
          <Header onContactClick={() => setContactOpen(true)} />
          <ProductHero product={product} content={content} onContact={() => setProductContactOpen(true)} selectedColor={selectedColor} onColorChange={handleColorChange} />
          <ProductWhyChoose content={content} />
          <ProductDailyBenefits content={content} />
          <ProductUrbanContext content={content} />
          <ProductSpecs product={product} content={content} />
          <ProductDifferentials content={content} />
          <ProductComparison related={related} content={content} />
          <ProductFAQ content={content} />
          <ProductFinalCTA content={content} onContact={() => setProductContactOpen(true)} />
          <HomeFooter />
        </div>
        <FloatingWhatsApp />
        <PopUpContato01 isOpen={contactOpen} onClose={() => setContactOpen(false)} />
        <PopUpContatoProduto isOpen={productContactOpen} onClose={() => setProductContactOpen(false)} product={product} selectedColor={selectedColor} />
      </div>
    );
  }

  // Fallback
  return (
    <div className="min-h-screen relative" style={{ background: "hsl(0 0% 4%)" }}>
      <AnimatedBackground />
      <div className="relative z-10">
        <Header onContactClick={() => setContactOpen(true)} />
        <ProductHero
          product={product}
          content={{
            headline: product.description, subheadline: "", supportText: "",
            idealFor: [], whyChoose: [], dailyBenefits: [],
            urbanContext: { title: "", body: "", highlights: [] },
            specContexts: {}, differentials: { title: "", body: "" },
            comparisonTip: "", faq: [],
            finalCta: { title: "Fale com um especialista", subtitle: "Tire suas dúvidas e descubra as melhores condições." },
          }}
          onContact={() => setProductContactOpen(true)}
          selectedColor={selectedColor}
          onColorChange={handleColorChange}
        />
        <ProductSpecs
          product={product}
          content={{ headline: "", subheadline: "", supportText: "", idealFor: [], whyChoose: [], dailyBenefits: [], urbanContext: { title: "", body: "", highlights: [] }, specContexts: {}, differentials: { title: "", body: "" }, comparisonTip: "", faq: [], finalCta: { title: "", subtitle: "" } }}
        />
        <ProductComparison
          related={related}
          content={{ headline: "", subheadline: "", supportText: "", idealFor: [], whyChoose: [], dailyBenefits: [], urbanContext: { title: "", body: "", highlights: [] }, specContexts: {}, differentials: { title: "", body: "" }, comparisonTip: "", faq: [], finalCta: { title: "", subtitle: "" } }}
        />
        <HomeFooter />
      </div>
      <FloatingWhatsApp />
      <PopUpContato01 isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <PopUpContatoProduto isOpen={productContactOpen} onClose={() => setProductContactOpen(false)} product={product} />
    </div>
  );
};

export default ProductDetail;
