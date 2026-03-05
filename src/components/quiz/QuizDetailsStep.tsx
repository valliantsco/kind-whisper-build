import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Loader2, Keyboard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface QuizDetailsStepProps {
  details: string;
  onDetailsChange: (val: string) => void;
}

const MAX_RECORDING_SECONDS = 15;

const QuizDetailsStep = ({ details, onDetailsChange }: QuizDetailsStepProps) => {
  const [mode, setMode] = useState<"idle" | "text" | "audio">("idle");
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const recordingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recordingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [details]);

  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) clearTimeout(recordingTimerRef.current);
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  // If details already has text, show text mode
  useEffect(() => {
    if (details.trim() && mode === "idle") setMode("text");
  }, [details, mode]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4",
      });
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType });
        chunksRef.current = [];
        setIsTranscribing(true);
        try {
          const arrayBuffer = await blob.arrayBuffer();
          const uint8 = new Uint8Array(arrayBuffer);
          let binary = "";
          const chunkSize = 8192;
          for (let i = 0; i < uint8.length; i += chunkSize) {
            binary += String.fromCharCode(...uint8.slice(i, i + chunkSize));
          }
          const base64 = btoa(binary);
          const { data, error } = await supabase.functions.invoke("transcribe-audio", {
            body: { audioBase64: base64 },
          });
          if (error || !data?.transcription) throw new Error("Transcription failed");
          const text = data.transcription;
          if (text && text !== "[áudio inaudível]") {
            onDetailsChange(details ? `${details} ${text}` : text);
            setMode("text");
          }
        } catch (err) {
          console.error("Transcription error:", err);
        } finally {
          setIsTranscribing(false);
        }
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      recordingIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
      recordingTimerRef.current = setTimeout(() => {
        if (recordingIntervalRef.current) {
          clearInterval(recordingIntervalRef.current);
          recordingIntervalRef.current = null;
        }
        if (mediaRecorderRef.current?.state === "recording") {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
          setRecordingSeconds(0);
        }
      }, MAX_RECORDING_SECONDS * 1000);
    } catch {
      console.error("Microphone access denied");
    }
  }, [details, onDetailsChange]);

  const stopRecording = useCallback(() => {
    if (recordingTimerRef.current) {
      clearTimeout(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    setRecordingSeconds(0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div>
        <h3 className="font-display font-bold text-lg text-foreground mb-1">
          Quer contar mais sobre sua necessidade?
        </h3>
        <p className="text-sm text-muted-foreground">
          Opcional — quanto mais detalhes, melhor será a recomendação.
        </p>
      </div>

      {/* Mode selector — only when idle and not recording/transcribing */}
      {mode === "idle" && !isRecording && !isTranscribing && (
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            type="button"
            onClick={() => {
              setMode("text");
              setTimeout(() => textareaRef.current?.focus(), 100);
            }}
            className="flex flex-col items-center gap-2 p-5 rounded-xl border-2 border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Keyboard className="w-7 h-7 text-primary" />
            <span className="text-sm font-semibold text-foreground">Digitar</span>
            <span className="text-[10px] text-muted-foreground">Escreva sua necessidade</span>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => {
              setMode("audio");
              startRecording();
            }}
            className="flex flex-col items-center gap-2 p-5 rounded-xl border-2 border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mic className="w-7 h-7 text-primary" />
            <span className="text-sm font-semibold text-foreground">Gravar áudio</span>
            <span className="text-[10px] text-muted-foreground">Máx. {MAX_RECORDING_SECONDS}s</span>
          </motion.button>
        </div>
      )}

      {/* Text input area */}
      {mode === "text" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <textarea
            ref={textareaRef}
            value={details}
            onChange={(e) => {
              onDetailsChange(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            placeholder="Ex: Preciso de um veículo para entregas em ruas com subida, rodo cerca de 40km por dia..."
            rows={3}
            maxLength={500}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            style={{ maxHeight: "30vh", overflow: "hidden" }}
            autoFocus
          />
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => { setMode("audio"); startRecording(); }}
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <Mic className="w-3 h-3" /> Ou gravar áudio
            </button>
            <span className="text-[10px] text-muted-foreground/60">{details.length}/500</span>
          </div>
        </motion.div>
      )}

      {/* Audio recording state */}
      {(mode === "audio" || isRecording || isTranscribing) && !details.trim() && mode !== "text" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {isRecording && (
            <motion.div
              className="flex flex-col items-center gap-4 py-6 rounded-xl bg-destructive/5 border border-destructive/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="relative">
                <motion.div
                  className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center cursor-pointer"
                  onClick={stopRecording}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Square className="w-6 h-6 text-destructive fill-destructive" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-destructive/30"
                  animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">
                  Gravando... {MAX_RECORDING_SECONDS - recordingSeconds}s
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Toque para parar
                </p>
              </div>
            </motion.div>
          )}

          {isTranscribing && (
            <motion.div
              className="flex flex-col items-center gap-3 py-6 rounded-xl bg-primary/5 border border-primary/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Transcrevendo seu áudio...</p>
            </motion.div>
          )}

          {!isRecording && !isTranscribing && (
            <button
              type="button"
              onClick={() => setMode("idle")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Voltar às opções
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuizDetailsStep;
