import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import type { QuizResult } from "./types";

interface QuizResultViewProps {
  result: QuizResult;
  whatsappUrl: string;
  onReset: () => void;
}

const QuizResultView = ({ result, whatsappUrl, onReset }: QuizResultViewProps) => {
  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Category */}
      <div className="rounded-xl p-5 text-center bg-primary/5">
        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Categoria recomendada</p>
        <p className="font-display font-bold text-2xl text-primary">{result.category}</p>
      </div>

      {/* Justification */}
      <div className="bg-muted/50 rounded-xl p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Por que esta recomendação?</p>
        <p className="text-sm text-foreground leading-relaxed">{result.justification}</p>
      </div>

      {/* Suggestions */}
      {result.suggestions.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Modelos sugeridos</p>
          <div className="space-y-2">
            {result.suggestions.map((s) => (
              <div key={s} className="bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium">
                {s}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-col gap-3 pt-2">
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white text-[11px] sm:text-sm font-bold uppercase tracking-[0.14em] bg-primary"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <MessageCircle className="w-5 h-5" />
          Falar com consultor no WhatsApp
        </motion.a>
        <button
          onClick={onReset}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors py-2 uppercase tracking-wider font-medium"
        >
          Refazer quiz
        </button>
      </div>
    </motion.div>
  );
};

export default QuizResultView;
