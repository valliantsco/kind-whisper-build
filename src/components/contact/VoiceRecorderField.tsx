import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Loader2, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { detectSpam } from "@/utils/spam-detection";
import { INPUT_BASE_STYLE, getInputBorderStyle } from "@/utils/form-helpers";

interface VoiceRecorderFieldProps {
  details: string;
  setDetails: (val: string) => void;
  error?: string;
  setError: (err: string | null) => void;
}

const MAX_RECORDING_SECONDS = 15;

const VoiceRecorderField = ({ details, setDetails, error, setError }: VoiceRecorderFieldProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isDetailsFocused, setIsDetailsFocused] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const recordingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recordingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [details]);

  // Cleanup on unmount
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
            setDetails(details ? `${details} ${text}` : text);
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
  }, [details, setDetails]);

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
    <div>
      <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-1.5">
        <MessageSquare className="w-3 h-3" />
        Conte para gente o que você precisa <span className="text-primary/70">*</span>
      </label>

      <div className="relative">
        <textarea
          ref={textareaRef}
          value={details}
          onChange={(e) => {
            const val = e.target.value;
            setDetails(val);
            const spamErr = detectSpam("details", val);
            setError(spamErr);
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          placeholder={isTranscribing ? "Processando áudio..." : "Ex: Quero saber mais sobre a moto elétrica..."}
          rows={3}
          maxLength={500}
          disabled={isTranscribing}
          className={`${INPUT_BASE_STYLE} pr-14 resize-none disabled:opacity-50 cw-input ${error ? "cw-input-error" : ""}`}
          style={{ ...getInputBorderStyle(!!error), maxHeight: "40vh", overflow: "hidden" }}
          onFocus={() => setIsDetailsFocused(true)}
          onBlur={() => setIsDetailsFocused(false)}
        />

        {/* Mic button */}
        <AnimatePresence>
          {(!isDetailsFocused || isRecording || isTranscribing) && (
            <motion.div
              key="mic-group"
              className="absolute"
              style={{ width: 30, height: 30, right: 8, bottom: 14 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {/* Pulse rings (idle state) */}
              {!isRecording && !isTranscribing && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none motion-reduce:hidden"
                    style={{ border: "1.5px solid hsl(11 81% 57% / 0.25)" }}
                    animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none motion-reduce:hidden"
                    style={{ border: "1px solid hsl(11 81% 57% / 0.15)" }}
                    animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
                  />
                </>
              )}
              <motion.button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isTranscribing}
                className="w-full h-full flex items-center justify-center rounded-full disabled:opacity-40 cursor-pointer"
                style={{
                  background: isRecording
                    ? "hsl(0 84% 55% / 0.25)"
                    : isTranscribing
                      ? "hsl(0 0% 100% / 0.06)"
                      : "hsl(0 0% 100% / 0.08)",
                  backdropFilter: "blur(8px)",
                  border: `1px solid ${isRecording ? "hsl(0 84% 60% / 0.35)" : "hsl(0 0% 100% / 0.15)"}`,
                  boxShadow: isRecording
                    ? "0 0 14px hsl(0 84% 55% / 0.3)"
                    : "0 0 8px hsl(11 81% 57% / 0.08)",
                }}
                whileHover={
                  isTranscribing
                    ? {}
                    : {
                        background: isRecording ? "hsl(0 84% 55% / 0.35)" : "hsl(0 0% 100% / 0.14)",
                        borderColor: isRecording ? "hsl(0 84% 60% / 0.5)" : "hsl(0 0% 100% / 0.25)",
                        boxShadow: isRecording
                          ? "0 0 18px hsl(0 84% 55% / 0.3)"
                          : "0 0 12px hsl(0 0% 100% / 0.08)",
                        scale: 1.1,
                      }
                }
                whileTap={isTranscribing ? {} : { scale: 0.88 }}
                animate={
                  isRecording
                    ? {
                        borderColor: ["hsl(0 84% 60% / 0.35)", "hsl(0 84% 60% / 0.7)", "hsl(0 84% 60% / 0.35)"],
                        boxShadow: [
                          "0 0 14px hsl(0 84% 55% / 0.3)",
                          "0 0 22px hsl(0 84% 55% / 0.5)",
                          "0 0 14px hsl(0 84% 55% / 0.3)",
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
                  <Loader2 className="w-4 h-4 text-white/60 animate-spin" />
                ) : isRecording ? (
                  <motion.div
                    className="w-2.5 h-2.5 rounded-[2px]"
                    style={{ background: "hsl(0 84% 65%)" }}
                    animate={{ scale: [1, 0.8, 1] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                  />
                ) : (
                  <Mic className="text-white/60" style={{ width: 14, height: 14 }} strokeWidth={2.2} />
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
            className="flex items-center gap-2 mt-2 px-3 py-2 rounded-lg"
            style={{
              background: "hsl(0 84% 60% / 0.08)",
              border: "1px solid hsl(0 84% 60% / 0.15)",
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: "hsl(0 84% 60%)" }}
              />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "hsl(0 84% 60%)" }} />
            </span>
            <span className="text-[10px] text-white/50 leading-relaxed">
              Gravando ({MAX_RECORDING_SECONDS - recordingSeconds}s)... toque para parar
            </span>
          </motion.div>
        )}
        {isTranscribing && (
          <motion.div
            className="flex items-center gap-2 mt-2 px-3 py-2 rounded-lg"
            style={{
              background: "hsl(11 81% 57% / 0.08)",
              border: "1px solid hsl(11 81% 57% / 0.15)",
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <Loader2 className="w-3 h-3 text-white/40 animate-spin shrink-0" />
            <span className="text-[10px] text-white/50">Processando áudio...</span>
          </motion.div>
        )}
      </AnimatePresence>
      {error && (
        <p className="text-[10px] mt-1" style={{ color: "hsl(0 84% 65%)" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default VoiceRecorderField;
