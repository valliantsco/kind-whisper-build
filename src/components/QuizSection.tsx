import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

const steps = [
  {
    question: "Qual será o principal uso?",
    options: ["Cidade / Rotina", "Trabalho / Entregas", "Lazer", "Conforto / Estabilidade", "Não sei ainda"],
  },
  {
    question: "Qual a distância média por dia?",
    options: ["Até 15 km", "15 a 30 km", "30 a 60 km", "Mais de 60 km", "Não sei"],
  },
  {
    question: "Como é o terreno na sua região?",
    options: ["Plano", "Misto (plano + algumas subidas)", "Muitas subidas"],
  },
  {
    question: "Vai carregar peso ou garupa?",
    options: ["Sozinho na maior parte", "Garupa às vezes", "Carga frequente"],
  },
  {
    question: "O que é mais importante pra você?",
    options: ["Autonomia (ir mais longe)", "Conforto", "Economia", "Desempenho"],
  },
];

const recommendations: Record<string, { category: string; models: string[] }> = {
  "Cidade / Rotina": { category: "Motos & Scooters Elétricas", models: ["Scooter City 800", "Urban Pro 1500"] },
  "Trabalho / Entregas": { category: "Motos & Scooters Elétricas", models: ["Delivery Max", "Cargo E-1000"] },
  "Lazer": { category: "Motocross", models: ["Trail X", "Adventure Sport E"] },
  "Conforto / Estabilidade": { category: "Triciclos", models: ["Comfort T3", "Triciclo Premium"] },
  "Não sei ainda": { category: "Motos & Scooters Elétricas", models: ["Scooter City 800", "Urban Pro 1500"] },
};

const QuizSection = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [leadData, setLeadData] = useState({ name: "", phone: "", city: "", lgpd: false });
  const [showResult, setShowResult] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = steps.length + 1; // questions + lead form
  const isLeadStep = step === steps.length;
  const progress = ((step + 1) / (totalSteps + 1)) * 100;

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[step] = answer;
    setAnswers(newAnswers);
  };

  const nextStep = () => {
    if (isLeadStep) {
      // Submit
      console.log("Lead data:", { ...leadData, answers });
      setSubmitted(true);
      setShowResult(true);
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setLeadData({ name: "", phone: "", city: "", lgpd: false });
    setShowResult(false);
    setSubmitted(false);
  };

  const canProceed = isLeadStep
    ? leadData.name.trim() && leadData.phone.trim() && leadData.city.trim() && leadData.lgpd
    : answers[step];

  const result = recommendations[answers[0]] || recommendations["Não sei ainda"];

  return (
    <>
      {/* Teaser section */}
      <section className="py-20 md:py-28 bg-foreground text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl mb-4">
              Não sabe qual escolher?{" "}
              <span className="text-primary">Descubra em 1 minuto.</span>
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">
              Responda algumas perguntas e receba uma recomendação baseada no seu uso.
            </p>
            <motion.button
              className="inline-flex items-center justify-center gap-2.5 text-[11px] sm:text-sm font-bold uppercase tracking-[0.14em] px-8 md:px-10 py-3.5 md:py-4 rounded-xl text-white overflow-visible cursor-pointer"
              style={{
                background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                boxShadow: "0 4px 20px hsl(11 81% 57% / 0.25)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px hsl(11 81% 57% / 0.5), 0 0 50px hsl(11 81% 57% / 0.2)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { reset(); setOpen(true); }}
            >
              <Sparkles className="w-4 h-4" />
              Descobrir meu modelo (Quiz)
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Quiz Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {showResult ? "Sua recomendação" : "Descubra seu modelo ideal"}
            </DialogTitle>
            <DialogDescription>
              {showResult ? "Baseado nas suas respostas" : `Etapa ${step + 1} de ${totalSteps}`}
            </DialogDescription>
          </DialogHeader>

          {!showResult && (
            <div className="w-full bg-muted rounded-full h-2 mb-6">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <AnimatePresence mode="wait">
            {showResult ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {submitted && (
                  <div className="bg-muted border border-border rounded-xl p-4 text-foreground text-sm">
                    Recebemos seu pedido. Um consultor poderá entrar em contato.
                  </div>
                )}

                <div className="bg-muted rounded-xl p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Categoria recomendada</p>
                  <p className="font-display font-bold text-2xl text-primary">{result.category}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-3">Sugestões iniciais:</p>
                  <div className="space-y-2">
                    {result.models.map((m) => (
                      <div key={m} className="bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium">
                        {m}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button className="rounded-xl" asChild>
                    <a href="#modelos" onClick={() => setOpen(false)}>Ver modelos recomendados</a>
                  </Button>
                  <Button variant="outline" className="rounded-xl gap-2" asChild>
                    <a
                      href={`https://wa.me/5500000000000?text=${encodeURIComponent(`Olá! Fiz o quiz e minha recomendação foi: ${result.category}. Modelos sugeridos: ${result.models.join(", ")}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Falar com consultor no WhatsApp
                    </a>
                  </Button>
                </div>
              </motion.div>
            ) : isLeadStep ? (
              <motion.div
                key="lead"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <p className="text-sm text-muted-foreground mb-2">
                  Para enviarmos a recomendação, informe seus dados:
                </p>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="quiz-name">Nome</Label>
                    <Input
                      id="quiz-name"
                      placeholder="Seu nome"
                      value={leadData.name}
                      onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="quiz-phone">Telefone (WhatsApp)</Label>
                    <Input
                      id="quiz-phone"
                      placeholder="(00) 00000-0000"
                      value={leadData.phone}
                      onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="quiz-city">Cidade</Label>
                    <Input
                      id="quiz-city"
                      placeholder="Sua cidade"
                      value={leadData.city}
                      onChange={(e) => setLeadData({ ...leadData, city: e.target.value })}
                    />
                  </div>
                  <div className="flex items-start gap-3 pt-2">
                    <Checkbox
                      id="quiz-lgpd"
                      checked={leadData.lgpd}
                      onCheckedChange={(checked) => setLeadData({ ...leadData, lgpd: checked === true })}
                    />
                    <Label htmlFor="quiz-lgpd" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                      Concordo com o uso dos meus dados para receber recomendações e contato da MS Eletric, conforme a LGPD.
                    </Label>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <p className="font-display font-bold text-lg">{steps[step].question}</p>
                <RadioGroup value={answers[step] || ""} onValueChange={handleAnswer}>
                  {steps[step].options.map((opt) => (
                    <div
                      key={opt}
                      className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition-colors ${answers[step] === opt ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"}`}
                      onClick={() => handleAnswer(opt)}
                    >
                      <RadioGroupItem value={opt} id={opt} />
                      <Label htmlFor={opt} className="cursor-pointer flex-1 text-sm">{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </motion.div>
            )}
          </AnimatePresence>

          {!showResult && (
            <div className="flex gap-3 mt-4">
              {step > 0 && (
                <Button variant="outline" onClick={prevStep} className="rounded-xl gap-1">
                  <ArrowLeft className="w-4 h-4" /> Voltar
                </Button>
              )}
              <Button
                onClick={nextStep}
                disabled={!canProceed}
                className="flex-1 rounded-xl gap-1"
              >
                {isLeadStep ? "Ver resultado" : "Próximo"} <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuizSection;
