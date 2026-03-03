import { Instagram, Facebook, Youtube } from "lucide-react";

const modelLinks = [
  "Motos & Scooters",
  "Bike Elétrica",
  "Triciclos",
  "Autopropelidos",
  "Motocross",
  "Quadriciclos",
  "Infantis",
  "Acessórios",
];

const Footer = () => {
  return (
    <footer id="contato" className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="font-display font-black text-2xl mb-4">
              MS <span className="text-primary">Eletric</span>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Mobilidade 100% elétrica com atendimento consultivo, portfólio completo e suporte do início ao pós-venda.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="https://instagram.com/mseletricbr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Models */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4 text-primary">Nossos modelos</h4>
            <ul className="space-y-2">
              {modelLinks.map((link) => (
                <li key={link}>
                  <a href="#modelos" className="text-sm text-primary-foreground/60 hover:text-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4 text-primary">Suporte</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-primary-foreground/60 hover:text-primary transition-colors">Pagamento / Condições</a></li>
              <li><a href="#por-que" className="text-sm text-primary-foreground/60 hover:text-primary transition-colors">Garantia</a></li>
              <li><a href="#contato" className="text-sm text-primary-foreground/60 hover:text-primary transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Institutional */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4 text-primary">MS Eletric</h4>
            <ul className="space-y-2">
              <li><a href="#sobre" className="text-sm text-primary-foreground/60 hover:text-primary transition-colors">Sobre</a></li>
              <li><a href="#onde-estamos" className="text-sm text-primary-foreground/60 hover:text-primary transition-colors">Onde estamos</a></li>
              <li><a href="#contato" className="text-sm text-primary-foreground/60 hover:text-primary transition-colors">Contato</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
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
