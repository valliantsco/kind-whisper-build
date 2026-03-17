import { motion } from "framer-motion";
import type { QuizStep } from "./types";

interface QuizStepViewProps {
  stepConfig: QuizStep;
  currentAnswer: string;
  onAnswer: (answer: string) => void;
}

const QuizStepView = ({ stepConfig, currentAnswer, onAnswer }: QuizStepViewProps) => {
  const { question, options, multiSelect, maxSelections, helperText } = stepConfig;
  const selectedItems = multiSelect && currentAnswer ? currentAnswer.split("||") : [];

  const toggleMultiItem = (opt: string) => {
    let updated: string[];
    if (selectedItems.includes(opt)) {
      updated = selectedItems.filter((i) => i !== opt);
    } else if (maxSelections && selectedItems.length >= maxSelections) {
      updated = [...selectedItems.slice(1), opt];
    } else {
      updated = [...selectedItems, opt];
    }
    onAnswer(updated.join("||"));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="space-y-4"
    >
      <div className="space-y-1.5">
        <p className="font-bold text-base text-primary-foreground leading-snug">{question}</p>
        {helperText && <p className="text-primary-foreground/45 text-xs leading-relaxed">{helperText}</p>}
        {multiSelect && (
          <p className="text-[10px] uppercase tracking-[0.1em] text-primary-foreground/35 font-semibold">
            Selecione até {maxSelections || options.length} opções
          </p>
        )}
      </div>

      <div className="space-y-2" role="listbox" aria-multiselectable={!!multiSelect}>
        {options.map((opt) => {
          const isSelected = multiSelect ? selectedItems.includes(opt) : currentAnswer === opt;

          return (
            <motion.button
              key={opt}
              type="button"
              role="option"
              onClick={() => {
                if (navigator.vibrate) navigator.vibrate(10);
                multiSelect ? toggleMultiItem(opt) : onAnswer(opt);
              }}
              aria-selected={isSelected}
              className="w-full flex items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm cursor-pointer transition-colors min-h-[48px]"
              style={{
                background: isSelected ? "hsl(var(--primary) / 0.14)" : "hsl(0 0% 100% / 0.04)",
                border: isSelected
                  ? "1px solid hsl(var(--primary) / 0.55)"
                  : "1px solid hsl(0 0% 100% / 0.08)",
                color: isSelected ? "hsl(0 0% 100%)" : "hsl(0 0% 100% / 0.75)",
                boxShadow: isSelected ? "0 8px 24px hsl(var(--primary) / 0.12)" : "none",
              }}
              whileHover={{
                background: isSelected ? "hsl(var(--primary) / 0.2)" : "hsl(0 0% 100% / 0.08)",
                y: -1,
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span
                className="w-[18px] h-[18px] shrink-0 flex items-center justify-center"
                style={{
                  borderRadius: multiSelect ? "4px" : "50%",
                  border: isSelected
                    ? "2px solid hsl(var(--primary))"
                    : "1.5px solid hsl(0 0% 100% / 0.28)",
                  background: isSelected ? "hsl(var(--primary) / 0.08)" : "transparent",
                }}
              >
                {isSelected && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="block"
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: multiSelect ? "2px" : "50%",
                      background: "hsl(var(--primary))",
                    }}
                  />
                )}
              </span>

              <span className="flex-1 leading-relaxed">{opt}</span>

              {isSelected && (
                <motion.span
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[9px] uppercase tracking-[0.1em] font-semibold text-primary/80"
                >
                  ✓
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuizStepView;
