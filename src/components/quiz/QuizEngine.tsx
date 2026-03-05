import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, MessageCircle, Loader2, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { QuizConfig, QuizResult } from "./types";

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

  const nextStep = async () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      // Last step — call AI
      setLoading(true);
      setError(null);
      try {
        const questionsWithAnswers = config.steps.map((s, i) => ({
          question: s.question,
          answer: answers[i] || "",
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
                background: "linear-gradient(90deg, hsl(11 81% 57%), hsl(11 90% 65%))",
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
                onClick={() => { setError(null); nextStep(); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold uppercase tracking-wide cursor-pointer"
                style={{ background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))" }}
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
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              {/* Category */}
              <div className="rounded-xl p-5 text-center" style={{ background: "linear-gradient(135deg, hsl(11 81% 57% / 0.08), hsl(11 90% 65% / 0.04))" }}>
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
                  className="flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white text-[11px] sm:text-sm font-bold uppercase tracking-[0.14em]"
                  style={{
                    background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                    boxShadow: "0 4px 20px hsl(11 81% 57% / 0.25)",
                  }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 25px hsl(11 81% 57% / 0.5), 0 0 50px hsl(11 81% 57% / 0.2)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Falar com consultor no WhatsApp
                </motion.a>
                <button
                  onClick={() => { reset(); }}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors py-2 uppercase tracking-wider font-medium"
                >
                  Refazer quiz
                </button>
              </div>
            </motion.div>
          )}

          {/* Question steps */}
          {!result && !loading && !error && (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <p className="font-display font-bold text-lg">{config.steps[step].question}</p>
              <RadioGroup value={answers[step] || ""} onValueChange={handleAnswer}>
                {config.steps[step].options.map((opt) => (
                  <div
                    key={opt}
                    className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition-colors ${
                      answers[step] === opt
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                    onClick={() => handleAnswer(opt)}
                  >
                    <RadioGroupItem value={opt} id={`quiz-${step}-${opt}`} />
                    <Label htmlFor={`quiz-${step}-${opt}`} className="cursor-pointer flex-1 text-sm">
                      {opt}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </motion.div>
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
              className="flex-1 inline-flex items-center justify-center gap-1 py-2.5 rounded-xl text-white text-sm font-bold uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: canProceed
                  ? "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))"
                  : "hsl(0 0% 70%)",
              }}
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
