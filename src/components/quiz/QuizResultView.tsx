import { motion } from "framer-motion";
import { MessageCircle, Star, ChevronRight } from "lucide-react";
import type { QuizResult } from "./types";
import { getModelImage } from "./modelImages";

interface QuizResultViewProps {
  result: QuizResult;
  whatsappUrl: string;
  onReset: () => void;
}

const QuizResultView = ({ result, whatsappUrl, onReset }: QuizResultViewProps) => {
  const models = result.models?.length ? result.models : [];
  const hasModels = models.length > 0;

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Category */}
      <div className="rounded-xl p-4 text-center bg-primary/5">
        <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">Categoria recomendada</p>
        <p className="font-display font-bold text-xl text-primary">{result.category}</p>
        <p className="text-xs text-muted-foreground mt-1">{result.justification}</p>
      </div>

      {hasModels ? (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Modelos recomendados
          </p>

          {models.map((model, i) => {
            const image = getModelImage(model.name);
            return (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-xl border overflow-hidden ${
                  i === 0
                    ? "border-primary/30 bg-primary/5"
                    : "border-border bg-card"
                }`}
              >
                {/* Primary model: show image prominently */}
                {i === 0 && image && (
                  <div className="w-full h-40 bg-white flex items-center justify-center overflow-hidden">
                    <img
                      src={image}
                      alt={model.name}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                )}

                <div className={`${i === 0 ? "p-4" : "p-3"}`}>
                  <div className="flex items-start gap-2">
                    {/* Secondary/tertiary: small thumbnail */}
                    {i > 0 && image && (
                      <div className="w-12 h-12 rounded-lg bg-white border border-border overflow-hidden flex-shrink-0 flex items-center justify-center">
                        <img
                          src={image}
                          alt={model.name}
                          className="h-full w-auto object-contain"
                        />
                      </div>
                    )}

                    {!image && i === 0 && (
                      <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0 fill-primary" />
                    )}
                    {!image && i > 0 && (
                      <ChevronRight className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        {i === 0 && image && (
                          <Star className="w-3.5 h-3.5 text-primary flex-shrink-0 fill-primary" />
                        )}
                        <p className={`font-bold ${i === 0 ? "text-base text-primary" : "text-sm text-foreground"}`}>
                          {model.name}
                        </p>
                      </div>
                      <p className={`${i === 0 ? "text-sm text-foreground" : "text-xs text-muted-foreground"} mt-0.5`}>
                        {model.headline}
                      </p>

                      {/* Primary model: full details */}
                      {i === 0 && model.specs && (
                        <div className="mt-2 bg-muted/50 rounded-lg px-3 py-2">
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-semibold">
                            Especificações
                          </p>
                          <p className="text-xs text-foreground">{model.specs}</p>
                        </div>
                      )}
                      {i === 0 && model.whyFits && (
                        <div className="mt-2">
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-semibold">
                            Por que combina com você
                          </p>
                          <p className="text-xs text-foreground leading-relaxed">{model.whyFits}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : result.suggestions.length > 0 ? (
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
      ) : null}

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
