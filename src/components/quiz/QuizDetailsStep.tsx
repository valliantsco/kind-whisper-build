import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Loader2, MessageSquare } from "lucide-react";
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

      <div className="relative">
        <textarea
          ref={textareaRef}
          value={details}
          onChange={(e) => {
            onDetailsChange(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          placeholder={
            isTranscribing
              ? "Processando áudio..."
              : "Ex: Preciso de um veículo para entregas em ruas com subida, rodo cerca de 40km por dia..."
          }
          rows={3}
          maxLength={500}
          disabled={isTranscribing}
          className="w-full rounded-xl border border-border bg-card px-4 py-3 pr-14 text-sm text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 transition-all"
          style={{ maxHeight: "30vh", overflow: "hidden" }}
        />

        {/* Mic button */}
        <motion.button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isTranscribing}
          className="absolute flex items-center justify-center w-9 h-9 rounded-full disabled:opacity-40 cursor-pointer"
          style={{
            right: 8,
            bottom: 8,
            background: isRecording
              ? "hsl(var(--destructive) / 0.15)"
              : "hsl(var(--primary) / 0.1)",
            border: `1px solid ${isRecording ? "hsl(var(--destructive) / 0.3)" : "hsl(var(--primary) / 0.2)"}`,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isTranscribing ? (
            <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
          ) : isRecording ? (
            <Square className="w-3.5 h-3.5 text-destructive fill-destructive" />
          ) : (
            <Mic className="w-4 h-4 text-primary" />
          )}
        </motion.button>
      </div>

      {/* Recording indicator */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/5 border border-destructive/10"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
            </span>
            <span className="text-xs text-muted-foreground">
              Gravando ({MAX_RECORDING_SECONDS - recordingSeconds}s)... toque para parar
            </span>
          </motion.div>
        )}
        {isTranscribing && (
          <motion.div
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <Loader2 className="w-3 h-3 text-primary animate-spin shrink-0" />
            <span className="text-xs text-muted-foreground">Processando áudio...</span>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-[10px] text-muted-foreground/60 text-right">
        {details.length}/500
      </p>
    </motion.div>
  );
};

export default QuizDetailsStep;
