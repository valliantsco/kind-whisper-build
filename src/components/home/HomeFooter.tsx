import { Instagram, Facebook, Youtube, MapPin, Phone, Clock } from "lucide-react";
import msLogo from "@/assets/ms-eletric-logo-white.png";

const modelLinks = ["Scooters Elétricas", "Autopropelidos", "Bicicletas Elétricas", "Triciclos Elétricos", "Utilitários", "Linha Infantil", "Patinetes", "Acessórios"];
const institutionalLinks = ["Sobre a MS Eletric", "Parceria AIMA", "Associada ABVE"];
const supportLinks = ["Assistência técnica", "Garantia de fábrica", "Peças de reposição", "Condições de pagamento"];
const policyLinks = ["Política de privacidade", "Termos de uso"];

const HomeFooter = () => {
  return (
    <footer id="contato" className="text-primary-foreground relative overflow-hidden" style={{ background: "hsl(0 0% 4%)" }}>
      {/* Top accent line */}
      <div
        className="h-[3px]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), hsl(var(--primary) / 0.6), transparent)",
        }}
      />

      {/* Radial glows */}
      <div
        className="absolute top-0 left-1/3 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.06) 0%, transparent 60%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute bottom-0 right-[10%] w-[500px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.04) 0%, transparent 55%)",
          filter: "blur(80px)",
        }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src={msLogo} alt="MS Eletric" className="h-[3.2rem] w-auto mb-5" />
            <p className="text-primary-foreground/50 text-sm leading-relaxed max-w-xs mb-6">
              Revendedora autorizada AIMA. Mobilidade 100% elétrica com atendimento consultivo, portfólio completo e suporte do início ao pós-venda.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(11 81% 57%)" }} />
                <span className="text-sm text-primary-foreground/50">Uberlândia, MG — Brasil</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0" style={{ color: "hsl(11 81% 57%)" }} />
                <span className="text-sm text-primary-foreground/50">(11) 5199-6628</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 shrink-0" style={{ color: "hsl(11 81% 57%)" }} />
                <span className="text-sm text-primary-foreground/50">Seg–Sex: 9h–18h | Sáb: 9h–13h</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: "Instagram", href: "https://instagram.com/mseletricbr" },
                { icon: Facebook, label: "Facebook", href: "#" },
                { icon: Youtube, label: "YouTube", href: "#" },
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
                  <a href="#contato" className="text-sm text-primary-foreground/40 hover:text-primary hover:translate-x-1 transition-all inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] mb-5" style={{ color: "hsl(11 81% 57%)" }}>
              Políticas
            </h4>
            <ul className="space-y-2.5">
              {policyLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-primary-foreground/40 hover:text-primary hover:translate-x-1 transition-all inline-block">
                    {link}
                  </a>
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
