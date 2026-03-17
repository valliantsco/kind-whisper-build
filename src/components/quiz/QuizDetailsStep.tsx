import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Loader2, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface QuizDetailsStepProps {
  details: string;
  onDetailsChange: (val: string) => void;
}

const MAX_RECORDING_SECONDS = 15;

const QuizDetailsStep = ({ details, onDetailsChange }: QuizDetailsStepProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
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

  const showMicButton = !isFocused || isRecording || isTranscribing;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="space-y-1">
        <h3 className="font-bold text-base text-primary-foreground leading-snug">
          Quer contar mais sobre sua necessidade?
        </h3>
        <p className="text-xs text-primary-foreground/40 leading-relaxed">
          Opcional — quanto mais detalhes, melhor será a recomendação.
        </p>
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-primary-foreground/50 mb-1.5">
          <MessageSquare className="w-3 h-3" />
          Conte para gente o que você precisa
        </label>

        <div className="relative">
          <textarea
            ref={textareaRef}
            value={details}
            onChange={(e) => {
              onDetailsChange(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            placeholder={isTranscribing ? "Processando áudio..." : "Ex: Preciso de um veículo para usar no dia a dia..."}
            rows={3}
            maxLength={500}
            disabled={isTranscribing}
            className="w-full rounded-xl px-4 py-3.5 pr-14 text-sm text-primary-foreground placeholder:text-primary-foreground/30 resize-none focus:outline-none focus:ring-2 disabled:opacity-50 transition-all min-h-[100px]"
            style={{
              maxHeight: "30vh",
              overflow: "hidden",
              background: "hsl(0 0% 100% / 0.06)",
              border: "1px solid hsl(0 0% 100% / 0.1)",
              ...(isFocused
                ? {
                    borderColor: "hsl(var(--primary) / 0.5)",
                    boxShadow: "0 0 0 2px hsl(var(--primary) / 0.15)",
                  }
                : {}),
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {/* Mic button */}
          <AnimatePresence>
            {showMicButton && (
              <motion.div
                key="mic-group"
                className="absolute"
                style={{ width: 36, height: 36, right: 8, bottom: 12 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {!isRecording && !isTranscribing && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{ border: "1.5px solid hsl(var(--primary) / 0.25)" }}
                      animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{ border: "1px solid hsl(var(--primary) / 0.15)" }}
                      animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
                    />
                  </>
                )}
                <motion.button
                  type="button"
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isTranscribing}
                  aria-label={isRecording ? "Parar gravação" : "Gravar áudio"}
                  className="w-full h-full flex items-center justify-center rounded-full disabled:opacity-40 cursor-pointer min-h-[36px] min-w-[36px]"
                  style={{
                    background: isRecording
                      ? "hsl(var(--destructive) / 0.15)"
                      : isTranscribing
                        ? "hsl(0 0% 100% / 0.08)"
                        : "hsl(var(--primary) / 0.1)",
                    border: `1px solid ${isRecording ? "hsl(var(--destructive) / 0.35)" : "hsl(var(--primary) / 0.2)"}`,
                  }}
                  whileHover={isTranscribing ? {} : { scale: 1.1 }}
                  whileTap={isTranscribing ? {} : { scale: 0.88 }}
                  animate={
                    isRecording
                      ? {
                          borderColor: [
                            "hsl(var(--destructive) / 0.35)",
                            "hsl(var(--destructive) / 0.7)",
                            "hsl(var(--destructive) / 0.35)",
                          ],
                        }
                      : {}
                  }
                  transition={
                    isRecording
                      ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                      : { type: "spring", stiffness: 350, damping: 18 }
                  }
                >
                  {isTranscribing ? (
                    <Loader2 className="w-4 h-4 text-primary-foreground/50 animate-spin" />
                  ) : isRecording ? (
                    <motion.div
                      className="w-2.5 h-2.5 rounded-[2px] bg-destructive"
                      animate={{ scale: [1, 0.8, 1] }}
                      transition={{ duration: 0.7, repeat: Infinity }}
                    />
                  ) : (
                    <Mic className="text-primary" style={{ width: 15, height: 15 }} strokeWidth={2.2} />
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Recording / Transcribing indicators */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              className="flex items-center gap-2 mt-2 px-3 py-2.5 rounded-lg"
              style={{
                background: "hsl(var(--destructive) / 0.08)",
                border: "1px solid hsl(var(--destructive) / 0.15)",
              }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
              </span>
              <span className="text-[11px] text-primary-foreground/50">
                Gravando ({MAX_RECORDING_SECONDS - recordingSeconds}s)... toque para parar
              </span>
            </motion.div>
          )}
          {isTranscribing && (
            <motion.div
              className="flex items-center gap-2 mt-2 px-3 py-2.5 rounded-lg"
              style={{
                background: "hsl(var(--primary) / 0.08)",
                border: "1px solid hsl(var(--primary) / 0.15)",
              }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <Loader2 className="w-3 h-3 animate-spin shrink-0 text-primary" />
              <span className="text-[11px] text-primary-foreground/50">Processando áudio...</span>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-[10px] text-primary-foreground/25 text-right mt-1.5">{details.length}/500</p>
      </div>
    </motion.div>
  );
};

export default QuizDetailsStep;
