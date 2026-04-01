import { Instagram, Facebook, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import msLogo from "@/assets/ms-eletric-logo-white.png";

const modelLinks = [
  { label: "Scooters Elétricas", href: "/modelos?categoria=scooters-eletricas" },
  { label: "Autopropelidos", href: "/modelos?categoria=autopropelidos" },
  { label: "Bicicletas Elétricas", href: "/modelos?categoria=bicicletas-eletricas" },
  { label: "Triciclos Elétricos", href: "/modelos?categoria=triciclos-eletricos" },
  { label: "Utilitários", href: "/modelos?categoria=utilitarios" },
  { label: "Infantil", href: "/modelos?categoria=infantil" },
  { label: "Patinetes", href: "/modelos?categoria=patinetes" },
];

interface FooterProps {
  onContactClick?: () => void;
  onSupportClick?: (subject: string) => void;
}

const Footer = ({ onContactClick, onSupportClick }: FooterProps) => {
  return (
    <footer id="contato" className="bg-foreground text-primary-foreground relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 opacity-[0.04]" style={{ background: "radial-gradient(circle, hsl(11 81% 57%) 0%, transparent 60%)" }} />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/">
              <img src={msLogo} alt="MS Eletric" className="h-[3.2rem] w-auto mb-4" />
            </Link>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Mobilidade 100% elétrica com atendimento consultivo, portfólio completo e suporte do início ao pós-venda.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/mseletricbr" },
                { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/mseletricbr" },
                { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@mseletric" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-foreground/10 rounded-xl flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Models */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4 text-primary">Nossos modelos</h4>
            <ul className="space-y-2">
              {modelLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-primary-foreground/60 hover:text-primary hover:translate-x-1 transition-all inline-block">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4 text-primary">Suporte</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSupportClick?.("Pagamento / Condições")}
                  className="text-sm text-primary-foreground/60 hover:text-primary hover:translate-x-1 transition-all inline-block cursor-pointer bg-transparent border-none p-0 text-left"
                >
                  Pagamento / Condições
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSupportClick?.("Garantia de fábrica")}
                  className="text-sm text-primary-foreground/60 hover:text-primary hover:translate-x-1 transition-all inline-block cursor-pointer bg-transparent border-none p-0 text-left"
                >
                  Garantia
                </button>
              </li>
              <li>
                <button
                  onClick={() => onContactClick?.()}
                  className="text-sm text-primary-foreground/60 hover:text-primary hover:translate-x-1 transition-all inline-block cursor-pointer bg-transparent border-none p-0 text-left"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4 text-primary">MS Eletric</h4>
            <ul className="space-y-2">
              <li><Link to="/sobre" className="text-sm text-primary-foreground/60 hover:text-primary hover:translate-x-1 transition-all inline-block">Sobre</Link></li>
              <li><Link to="/abve" className="text-sm text-primary-foreground/60 hover:text-primary hover:translate-x-1 transition-all inline-block">Associada ABVE</Link></li>
              <li>
                <button
                  onClick={() => onContactClick?.()}
                  className="text-sm text-primary-foreground/60 hover:text-primary hover:translate-x-1 transition-all inline-block cursor-pointer bg-transparent border-none p-0 text-left"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-primary-foreground/40">
            © 2026 MS Eletric. Todos os direitos reservados.
          </p>
          <p className="text-xs text-primary-foreground/40">
            Desenvolvido por <span className="text-primary font-medium">Valliants</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
