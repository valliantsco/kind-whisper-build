import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { QuizStep } from "./types";

interface QuizStepViewProps {
  stepConfig: QuizStep;
  currentAnswer: string;
  onAnswer: (answer: string) => void;
}

const QuizStepView = ({ stepConfig, currentAnswer, onAnswer }: QuizStepViewProps) => {
  const { question, options, multiSelect, maxSelections, helperText } = stepConfig;

  // For multi-select, answers are stored as comma-separated string
  const selectedItems = multiSelect && currentAnswer ? currentAnswer.split("||") : [];

  const toggleMultiItem = (opt: string) => {
    let updated: string[];
    if (selectedItems.includes(opt)) {
      updated = selectedItems.filter((i) => i !== opt);
    } else {
      if (maxSelections && selectedItems.length >= maxSelections) {
        // Replace the first selected item
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
      <p className="font-display font-bold text-lg">{question}</p>
      {helperText && (
        <p className="text-muted-foreground text-sm -mt-2">{helperText}</p>
      )}

      {multiSelect ? (
        <div className="space-y-2">
          {options.map((opt) => {
            const isSelected = selectedItems.includes(opt);
            return (
              <div
                key={opt}
                className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition-colors ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/30"
                }`}
                onClick={() => toggleMultiItem(opt)}
              >
                <Checkbox checked={isSelected} />
                <span className="text-sm flex-1">{opt}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <RadioGroup value={currentAnswer} onValueChange={onAnswer}>
          {options.map((opt) => (
            <div
              key={opt}
              className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition-colors ${
                currentAnswer === opt
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/30"
              }`}
              onClick={() => onAnswer(opt)}
            >
              <RadioGroupItem value={opt} id={`quiz-opt-${opt}`} />
              <Label htmlFor={`quiz-opt-${opt}`} className="cursor-pointer flex-1 text-sm">
                {opt}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}
    </motion.div>
  );
};

export default QuizStepView;
