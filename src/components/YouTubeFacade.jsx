import { useState } from 'react';
import { Play } from 'lucide-react';

export default function YouTubeFacade({ videoId, title }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        className="h-full w-full rounded-lg shadow-lg"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      onClick={() => setIsPlaying(true)}
      className="group relative block h-full w-full overflow-hidden rounded-lg shadow-lg"
      aria-label={`Reproducir: ${title}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-ink-900/30 transition-colors group-hover:bg-ink-900/40">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-brand-600 transition-transform group-hover:scale-110">
          <Play size={28} fill="currentColor" className="ml-1" />
        </div>
      </div>
    </button>
  );
}