import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, MessageCircle, Loader2, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { QuizConfig, QuizResult } from "./types";
import QuizStepView from "./QuizStepView";
import QuizResultView from "./QuizResultView";

interface QuizEngineProps {
  config: QuizConfig;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuizEngine = ({ config, open, onOpenChange }: QuizEngineProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = config.steps.length;
  const progress = ((step + 1) / totalSteps) * 100;

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
    setLoading(false);
    setError(null);
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[step] = answer;
    setAnswers(newAnswers);
  };

  const submitToAI = async (finalAnswers: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const questionsWithAnswers = config.steps.map((s, i) => ({
        question: s.question,
        answer: finalAnswers[i] || "",
      }));

      const { data, error: fnError } = await supabase.functions.invoke("quiz-recommend", {
        body: {
          answers: questionsWithAnswers,
          businessContext: config.businessContext,
        },
      });

      if (fnError) throw new Error(fnError.message || "Erro ao processar");

      if (data?.error) {
        if (data.error.includes("Rate limit") || data.error.includes("429")) {
          throw new Error("Muitas requisições. Tente novamente em alguns segundos.");
        }
        if (data.error.includes("402") || data.error.includes("Payment")) {
          throw new Error("Serviço temporariamente indisponível.");
        }
        throw new Error(data.error);
      }

      setResult(data as QuizResult);
    } catch (e: any) {
      console.error("Quiz AI error:", e);
      setError(e.message || "Erro ao gerar recomendação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async () => {
    const currentStep = config.steps[step];

    // Check for conditional skip (e.g., child → direct result)
    if (currentStep.skipToResultIf) {
      const selectedOption = answers[step];
      const skipOption = currentStep.options[currentStep.skipToResultIf.optionIndex];
      if (selectedOption === skipOption) {
        setResult(currentStep.skipToResultIf.result);
        return;
      }
    }

    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      await submitToAI(answers);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const canProceed = !!answers[step];

  const whatsappUrl = result
    ? `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(result.whatsappMessage)}`
    : "#";

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {result ? "Sua recomendação" : loading ? "Analisando..." : config.title}
          </DialogTitle>
          <DialogDescription>
            {result
              ? "Baseado nas suas respostas"
              : loading
              ? "A IA está processando suas respostas"
              : `Etapa ${step + 1} de ${totalSteps}`}
          </DialogDescription>
        </DialogHeader>

        {/* Progress bar */}
        {!result && !loading && (
          <div className="w-full bg-muted rounded-full h-2 mb-4">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.7))",
              }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Loading state */}
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 gap-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-10 h-10 text-primary" />
              </motion.div>
              <p className="text-muted-foreground text-sm">Gerando sua recomendação personalizada...</p>
            </motion.div>
          )}

          {/* Error state */}
          {error && !loading && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 py-8 text-center"
            >
              <p className="text-destructive text-sm">{error}</p>
              <motion.button
                onClick={() => { setError(null); submitToAI(answers); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold uppercase tracking-wide cursor-pointer bg-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-4 h-4" />
                Tentar novamente
              </motion.button>
            </motion.div>
          )}

          {/* Result */}
          {result && !loading && (
            <QuizResultView result={result} whatsappUrl={whatsappUrl} onReset={reset} />
          )}

          {/* Question steps */}
          {!result && !loading && !error && (
            <QuizStepView
              key={`step-${step}`}
              stepConfig={config.steps[step]}
              currentAnswer={answers[step] || ""}
              onAnswer={handleAnswer}
            />
          )}
        </AnimatePresence>

        {/* Navigation */}
        {!result && !loading && !error && (
          <div className="flex gap-3 mt-4">
            {step > 0 && (
              <motion.button
                onClick={prevStep}
                className="inline-flex items-center gap-1 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4" /> Voltar
              </motion.button>
            )}
            <motion.button
              onClick={nextStep}
              disabled={!canProceed}
              className="flex-1 inline-flex items-center justify-center gap-1 py-2.5 rounded-xl text-white text-sm font-bold uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed bg-primary"
              whileHover={canProceed ? { scale: 1.02 } : {}}
              whileTap={canProceed ? { scale: 0.98 } : {}}
            >
              {step === totalSteps - 1 ? "Ver resultado" : "Próximo"} <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuizEngine;
