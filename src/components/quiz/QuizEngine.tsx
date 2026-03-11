import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Sparkles, Loader2, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { QuizConfig, QuizResult } from "./types";
import QuizStepView from "./QuizStepView";
import QuizResultView from "./QuizResultView";
import QuizDetailsStep from "./QuizDetailsStep";

/* ── Animation variants ─────────────────────────────────────────── */
const overlayVariants = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  visible: {
    opacity: 1,
    backdropFilter: "blur(12px)",
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    transition: { duration: 0.3, ease: "easeIn" as const },
  },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 28, stiffness: 320 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 },
  },
};

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
  const [showDetailsStep, setShowDetailsStep] = useState(false);
  const [extraDetails, setExtraDetails] = useState("");

  const totalSteps = config.steps.length;
  const progressTotal = totalSteps + 1;
  const progressCurrent = showDetailsStep ? totalSteps + 1 : step + 1;
  const progress = (progressCurrent / progressTotal) * 100;

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const reset = useCallback(() => {
    setStep(0);
    setAnswers([]);
    setResult(null);
    setLoading(false);
    setError(null);
    setShowDetailsStep(false);
    setExtraDetails("");
  }, []);

  const handleClose = useCallback(() => {
    reset();
    onOpenChange(false);
  }, [reset, onOpenChange]);

  // Escape key
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, handleClose]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[step] = answer;
    setAnswers(newAnswers);
  };

  const submitToAI = async (finalAnswers: string[], details?: string) => {
    setLoading(true);
    setError(null);
    try {
      const questionsWithAnswers = config.steps.map((s, i) => ({
        question: s.question,
        answer: finalAnswers[i] || "",
      }));

      if (details?.trim()) {
        questionsWithAnswers.push({
          question: "Detalhes adicionais fornecidos pelo usuário",
          answer: details.trim(),
        });
      }

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
      setShowDetailsStep(true);
    }
  };

  const handleSubmitFromDetails = async () => {
    await submitToAI(answers, extraDetails);
  };

  const prevStep = () => {
    if (showDetailsStep) {
      setShowDetailsStep(false);
      return;
    }
    if (step > 0) setStep(step - 1);
  };

  const canProceed = !!answers[step];
  const isOnDetailsStep = showDetailsStep && !result && !loading && !error;

  const headerTitle = result
    ? "Encontramos seu modelo ideal"
    : loading
      ? "Analisando seu perfil..."
      : config.title;

  const headerSubtitle = result
    ? "Recomendação personalizada com base nas suas respostas"
    : loading
      ? "Estamos cruzando suas respostas com nosso catálogo"
      : showDetailsStep
        ? "Última etapa — algum detalhe a mais?"
        : config.subtitle || "Responda e descubra o veículo ideal para você";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div className="absolute inset-0 bg-foreground/60" onClick={handleClose} />

          {/* Panel */}
          <motion.div
            variants={panelVariants}
            role="dialog"
            aria-modal="true"
            aria-label="Quiz de recomendação de veículos"
            className="relative w-full max-w-md rounded-[0.9rem] overflow-hidden max-h-[90vh] flex flex-col"
            style={{
              background: "hsl(0 0% 14% / 0.92)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid hsl(0 0% 100% / 0.08)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 40px hsl(var(--primary) / 0.08)",
            }}
          >
            {/* Top gradient light strip */}
            <div
              className="h-[2px] shrink-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.8), hsl(11 90% 65% / 0.8), transparent)",
              }}
            />

            {/* Ambient glow */}
            <div
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 70%)",
              }}
            />

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 relative scrollbar-hide">
              {/* Header */}
              <div className="items-start justify-between px-5 pt-4 pb-3 flex flex-row">
                <div className="min-w-0 flex-1 pr-3">
                  <h3 className="text-base font-bold text-primary-foreground tracking-tight">{headerTitle}</h3>
                  <p className="text-xs text-primary-foreground/50 mt-1 leading-relaxed">{headerSubtitle}</p>
                </div>
                <motion.button
                  onClick={handleClose}
                  aria-label="Fechar quiz"
                  className="p-2 rounded-xl text-primary-foreground cursor-pointer shrink-0"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)), hsl(11 90% 65%))",
                    boxShadow: "0 4px 20px hsl(var(--primary) / 0.25)",
                  }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 25px hsl(var(--primary) / 0.5), 0 0 50px hsl(var(--primary) / 0.2)",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Progress bar */}
              {!result && !loading && (
                <div className="px-5 pb-3">
                  <div className="w-full rounded-full h-1.5" style={{ background: "hsl(0 0% 100% / 0.08)" }}>
                    <motion.div
                      className="h-1.5 rounded-full"
                      style={{
                        background: "linear-gradient(90deg, hsl(var(--primary)), hsl(11 90% 65%))",
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>
              )}

              {/* Divider */}
              <div
                className="mx-5 h-[1px]"
                style={{
                  background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)",
                }}
              />

              {/* Content area */}
              <div className="px-5 py-4">
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
                      <p className="text-primary-foreground/50 text-sm">Gerando sua recomendação personalizada...</p>
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
                      <p className="text-sm text-destructive">{error}</p>
                      <motion.button
                        onClick={() => {
                          setError(null);
                          submitToAI(answers, extraDetails);
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-primary-foreground text-sm font-bold uppercase tracking-wide cursor-pointer"
                        style={{
                          background: "linear-gradient(135deg, hsl(var(--primary)), hsl(11 90% 65%))",
                          boxShadow: "0 4px 20px hsl(var(--primary) / 0.3)",
                        }}
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
                    <QuizResultView result={result} whatsappNumber={config.whatsappNumber} onReset={reset} />
                  )}

                  {/* Details step */}
                  {isOnDetailsStep && (
                    <QuizDetailsStep key="details-step" details={extraDetails} onDetailsChange={setExtraDetails} />
                  )}

                  {/* Question steps */}
                  {!result && !loading && !error && !showDetailsStep && (
                    <QuizStepView
                      key={`step-${step}`}
                      stepConfig={config.steps[step]}
                      currentAnswer={answers[step] || ""}
                      onAnswer={handleAnswer}
                    />
                  )}
                </AnimatePresence>

                {/* Navigation - Questions */}
                {!result && !loading && !error && !showDetailsStep && (
                  <div className="flex gap-3 mt-5">
                    {step > 0 && (
                      <motion.button
                        onClick={prevStep}
                        className="inline-flex items-center gap-1 px-5 py-2.5 rounded-xl text-sm font-medium text-primary-foreground/70 cursor-pointer"
                        style={{
                          border: "1px solid hsl(0 0% 100% / 0.12)",
                          background: "hsl(0 0% 100% / 0.05)",
                        }}
                        whileHover={{ background: "hsl(0 0% 100% / 0.1)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ArrowLeft className="w-4 h-4" /> Voltar
                      </motion.button>
                    )}
                    <motion.button
                      onClick={nextStep}
                      disabled={!canProceed}
                      className="flex-1 inline-flex items-center justify-center gap-1 py-2.5 rounded-xl text-primary-foreground text-sm font-bold uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      style={{
                        background: "linear-gradient(135deg, hsl(var(--primary)), hsl(11 90% 65%))",
                        boxShadow: canProceed ? "0 4px 20px hsl(var(--primary) / 0.3)" : "none",
                      }}
                      whileHover={
                        canProceed
                          ? {
                              scale: 1.02,
                              boxShadow:
                                "0 0 25px hsl(var(--primary) / 0.5), 0 0 50px hsl(var(--primary) / 0.2)",
                            }
                          : {}
                      }
                      whileTap={canProceed ? { scale: 0.98 } : {}}
                    >
                      Continuar <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                )}

                {/* Navigation - Details step */}
                {isOnDetailsStep && (
                  <div className="flex gap-3 mt-5">
                    <motion.button
                      onClick={prevStep}
                      className="inline-flex items-center gap-1 px-5 py-2.5 rounded-xl text-sm font-medium text-primary-foreground/70 cursor-pointer"
                      style={{
                        border: "1px solid hsl(0 0% 100% / 0.12)",
                        background: "hsl(0 0% 100% / 0.05)",
                      }}
                      whileHover={{ background: "hsl(0 0% 100% / 0.1)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowLeft className="w-4 h-4" /> Voltar
                    </motion.button>
                    <motion.button
                      onClick={handleSubmitFromDetails}
                      className="flex-1 inline-flex items-center justify-center gap-1 py-2.5 rounded-xl text-primary-foreground text-sm font-bold uppercase tracking-wide cursor-pointer"
                      style={{
                        background: "linear-gradient(135deg, hsl(var(--primary)), hsl(11 90% 65%))",
                        boxShadow: "0 4px 20px hsl(var(--primary) / 0.3)",
                      }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 25px hsl(var(--primary) / 0.5), 0 0 50px hsl(var(--primary) / 0.2)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {extraDetails.trim() ? "Ver minha recomendação" : "Pular e ver recomendação"}{" "}
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuizEngine;
