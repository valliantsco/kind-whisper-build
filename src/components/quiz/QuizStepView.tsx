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
    } else {
      if (maxSelections && selectedItems.length >= maxSelections) {
        updated = [...selectedItems.slice(1), opt];
      } else {
        updated = [...selectedItems, opt];
      }
    }
    onAnswer(updated.join("||"));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <p className="font-bold text-base text-white">{question}</p>
      {helperText && (
        <p className="text-white/40 text-xs -mt-2">{helperText}</p>
      )}

      <div className="space-y-2">
        {options.map((opt) => {
          const isSelected = multiSelect
            ? selectedItems.includes(opt)
            : currentAnswer === opt;

          return (
            <motion.button
              key={opt}
              type="button"
              onClick={() => multiSelect ? toggleMultiItem(opt) : onAnswer(opt)}
              className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm cursor-pointer transition-all"
              style={{
                background: isSelected
                  ? "hsl(11 81% 57% / 0.12)"
                  : "hsl(0 0% 100% / 0.04)",
                border: isSelected
                  ? "1px solid hsl(11 81% 57% / 0.5)"
                  : "1px solid hsl(0 0% 100% / 0.08)",
                color: isSelected ? "white" : "hsl(0 0% 100% / 0.7)",
              }}
              whileHover={{
                background: isSelected
                  ? "hsl(11 81% 57% / 0.18)"
                  : "hsl(0 0% 100% / 0.08)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Radio/Checkbox indicator */}
              <span
                className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center"
                style={{
                  border: isSelected
                    ? "2px solid hsl(11 81% 57%)"
                    : "1.5px solid hsl(0 0% 100% / 0.25)",
                  ...(multiSelect ? { borderRadius: "4px" } : {}),
                }}
              >
                {isSelected && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="block"
                    style={{
                      width: multiSelect ? 8 : 8,
                      height: multiSelect ? 8 : 8,
                      borderRadius: multiSelect ? "2px" : "50%",
                      background: "hsl(11 81% 57%)",
                    }}
                  />
                )}
              </span>
              <span className="flex-1">{opt}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuizStepView;
