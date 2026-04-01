import { Instagram, Facebook, Youtube, MapPin, Phone, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import msLogo from "@/assets/ms-eletric-logo-white.png";

const modelLinks = [
  { label: "Scooters Elétricas", href: "/modelos?categoria=scooters-eletricas" },
  { label: "Autopropelidos", href: "/modelos?categoria=autopropelidos" },
  { label: "Bicicletas Elétricas", href: "/modelos?categoria=bicicletas-eletricas" },
  { label: "Triciclos Elétricos", href: "/modelos?categoria=triciclos-eletricos" },
  { label: "Utilitários", href: "/modelos?categoria=utilitarios" },
  { label: "Linha Infantil", href: "/modelos?categoria=infantil" },
  { label: "Patinetes", href: "/modelos?categoria=patinetes" },
];
const institutionalLinks = [
  { label: "Sobre a MS Eletric", href: "/sobre" },
  { label: "Associada ABVE", href: "/abve" },
];
const supportLinks = ["Assistência técnica", "Garantia de fábrica", "Peças de reposição", "Condições de pagamento"];
const policyLinks = [
  { label: "Política de privacidade", href: "/politica-de-privacidade" },
  { label: "Termos de uso", href: "/termos-de-uso" },
];

interface HomeFooterProps {
  onContactClick?: () => void;
  onSupportClick?: (subject: string) => void;
}

const HomeFooter = ({ onContactClick, onSupportClick }: HomeFooterProps) => {
  return (
    <footer id="contato" className="text-primary-foreground relative overflow-hidden">
      {/* Top accent line */}
      <div
        className="h-[3px]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), hsl(var(--primary) / 0.6), transparent)",
        }}
      />

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src={msLogo} alt="MS Eletric" className="h-[3.2rem] w-auto mb-5" />
            <p className="text-primary-foreground/50 text-sm leading-relaxed max-w-xs mb-6">
              A MS Eletric conecta mobilidade elétrica, atendimento consultivo e suporte especializado para quem busca uma escolha mais prática, moderna e confiável. Do primeiro contato ao pós-venda, a experiência é pensada para dar mais clareza, mais segurança e mais confiança em cada etapa.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(11 81% 57%)" }} />
                <span className="text-sm text-primary-foreground/50">Av. João Pinheiro, 3747 - Brasil, Uberlândia - MG, 38400-714</span>
              </div>
              <button
                onClick={onContactClick}
                className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <svg className="w-4 h-4 shrink-0" style={{ color: "hsl(11 81% 57%)" }} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="text-sm text-primary-foreground/50">(34) 99284-9900</span>
              </button>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0" style={{ color: "hsl(11 81% 57%)" }} />
                <span className="text-sm text-primary-foreground/50">(34) 3222-8899</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 shrink-0" style={{ color: "hsl(11 81% 57%)" }} />
                <span className="text-sm text-primary-foreground/50">Seg–Sex: 9h às 18h | Sáb: 9h às 12h</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/mseletricbr" },
                { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/mseletricbr" },
                { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@mseletric" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300"
                  style={{
                    background: "hsl(0 0% 100% / 0.06)",
                    border: "1px solid hsl(0 0% 100% / 0.08)",
                  }}
                  aria-label={s.label}
                >
                  <s.icon className="w-5 h-5 text-primary-foreground/60" />
                </a>
              ))}
            </div>
          </div>

          {/* Modelos */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] mb-5" style={{ color: "hsl(11 81% 57%)" }}>
              Modelos
            </h4>
            <ul className="space-y-2.5">
              {modelLinks.map((link) => (
                <li key={link}>
                  <a href="#modelos" className="text-sm text-primary-foreground/40 hover:text-primary hover:translate-x-1 transition-all inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] mb-5" style={{ color: "hsl(11 81% 57%)" }}>
              Institucional
            </h4>
            <ul className="space-y-2.5">
              {institutionalLinks.map((link) => (
                <li key={link}>
                  <a href="#sobre" className="text-sm text-primary-foreground/40 hover:text-primary hover:translate-x-1 transition-all inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Suporte + Políticas */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] mb-5" style={{ color: "hsl(11 81% 57%)" }}>
              Suporte
            </h4>
            <ul className="space-y-2.5 mb-8">
              {supportLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => onSupportClick?.(link)}
                    className="text-sm text-primary-foreground/40 hover:text-primary hover:translate-x-1 transition-all inline-block cursor-pointer bg-transparent border-none p-0 text-left"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>

            <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] mb-5" style={{ color: "hsl(11 81% 57%)" }}>
              Políticas
            </h4>
            <ul className="space-y-2.5">
              {policyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-primary-foreground/40 hover:text-primary hover:translate-x-1 transition-all inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{ borderTop: "1px solid hsl(0 0% 100% / 0.06)" }}>
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-primary-foreground/30">© 2026 MS Eletric. Todos os direitos reservados.</p>
          <p className="text-xs text-primary-foreground/30">
            Desenvolvido por <span className="font-medium" style={{ color: "hsl(11 81% 57%)" }}>Valliants</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
