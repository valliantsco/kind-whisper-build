import { useCallback, useEffect, useRef, useState } from "react";

const VIMEO_ORIGIN = "https://player.vimeo.com";

type PreviewVideoSource =
  | { type: "vimeo"; id: string }
  | { type: "mp4"; src: string };

interface InfluencerPreviewMediaProps {
  videos: PreviewVideoSource[];
  name: string;
  scale?: number;
  onReady?: () => void;
}

const parseVimeoMessage = (data: unknown) => {
  if (typeof data !== "string") return data;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

const InfluencerPreviewMedia = ({ videos, name, scale = 1.2, onReady }: InfluencerPreviewMediaProps) => {
  const [current, setCurrent] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const hasMultiple = videos.length > 1;
  const video = videos[current];

  const next = useCallback(() => {
    if (!hasMultiple) return;
    setCurrent((value) => (value + 1) % videos.length);
  }, [hasMultiple, videos.length]);

  useEffect(() => {
    setCurrent(0);
  }, [videos]);

  useEffect(() => {
    if (!hasMultiple || video?.type !== "vimeo") return;

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
  }, [hasMultiple, next, video]);

  const registerVimeoEvents = () => {
    if (!hasMultiple || video?.type !== "vimeo" || !iframeRef.current?.contentWindow) return;

    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ method: "addEventListener", value: "ended" }),
      VIMEO_ORIGIN,
    );
  };

  if (!video) return null;

  if (video.type === "vimeo") {
    return (
      <iframe
        ref={iframeRef}
        key={video.id}
        src={`https://player.vimeo.com/video/${video.id}?autoplay=1&muted=1&loop=${hasMultiple ? 0 : 1}&badge=0&title=0&byline=0&portrait=0&autopause=0&controls=0&dnt=1&quality=auto`}
        allow="autoplay; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        title={name}
        onLoad={() => { registerVimeoEvents(); onReady?.(); }}
        className="absolute inset-0 h-full w-full pointer-events-none"
        style={{ border: "none", transform: `scale(${scale})`, transformOrigin: "center" }}
      />
    );
  }

  return (
    <video
      key={video.src}
      src={video.src}
      autoPlay
      muted
      loop={!hasMultiple}
      playsInline
      preload="metadata"
      onEnded={hasMultiple ? next : undefined}
      onCanPlay={() => onReady?.()}
      className="h-full w-full object-cover pointer-events-none"
    />
  );
};

export default InfluencerPreviewMedia;