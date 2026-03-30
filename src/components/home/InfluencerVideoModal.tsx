import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type VideoSource =
  | { type: "vimeo"; id: string }
  | { type: "mp4"; src: string };

interface InfluencerVideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videos: VideoSource[];
  name: string;
}

const VIMEO_ORIGIN = "https://player.vimeo.com";

const parseVimeoMessage = (data: unknown) => {
  if (typeof data !== "string") return data;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

const InfluencerVideoModal = ({ open, onOpenChange, videos, name }: InfluencerVideoModalProps) => {
  const [current, setCurrent] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const video = videos[current];
  const hasMultiple = videos.length > 1;

  const prev = () => setCurrent((c) => (c - 1 + videos.length) % videos.length);
  const next = () => setCurrent((c) => (c + 1) % videos.length);

  useEffect(() => {
    if (!open) return;
    setCurrent(0);
  }, [open, videos]);

  useEffect(() => {
    if (!open || !hasMultiple || video?.type !== "vimeo") return;

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== VIMEO_ORIGIN) return;
      if (!iframeRef.current?.contentWindow || event.source !== iframeRef.current.contentWindow) return;

      const payload = parseVimeoMessage(event.data);

      if (payload && typeof payload === "object" && "event" in payload && payload.event === "ended") {
        next();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [hasMultiple, next, open, video]);

  const registerVimeoEvents = () => {
    if (!hasMultiple || video?.type !== "vimeo" || !iframeRef.current?.contentWindow) return;

    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ method: "addEventListener", value: "ended" }),
      VIMEO_ORIGIN,
    );
  };

  if (!video) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) setCurrent(0); }}>
      <DialogContent className="max-w-[420px] w-[95vw] p-0 bg-black border-none rounded-2xl overflow-hidden aspect-[9/16] flex items-center justify-center [&>button]:hidden">
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Video counter */}
        {hasMultiple && (
          <div className="absolute top-3 left-3 z-30 text-[11px] font-bold text-white/70 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {current + 1} / {videos.length}
          </div>
        )}

        {/* Player */}
        {video.type === "vimeo" ? (
          <div className="absolute inset-0" style={{ padding: "177.5% 0 0 0", position: "relative" }}>
            <iframe
              ref={iframeRef}
              key={video.id}
              src={`https://player.vimeo.com/video/${video.id}?autoplay=1&loop=${hasMultiple ? 0 : 1}&badge=0&title=0&byline=0&portrait=0&autopause=0&controls=0&dnt=1`}
              allow="autoplay; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              title={name}
              onLoad={registerVimeoEvents}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            />
          </div>
        ) : (
          <video
            key={video.src}
            src={video.src}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop={!hasMultiple}
            playsInline
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            onEnded={hasMultiple ? next : undefined}
          />
        )}

        {/* Nav arrows */}
        {hasMultiple && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Progress dots */}
        {hasMultiple && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-white w-5" : "bg-white/40"}`}
              />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InfluencerVideoModal;
export type { VideoSource };