import type { ArticleCover as ArticleCoverT } from "@/lib/articles";

type Props = {
  cover: ArticleCoverT;
  title?: string;
  className?: string;
};

export function ArticleCover({ cover, title, className }: Props) {
  return (
    <div
      aria-label={title ? `Обложка: ${title}` : undefined}
      className={`absolute inset-0 h-full w-full ${className ?? ""}`}
      style={{
        background: `linear-gradient(135deg, ${cover.from} 0%, ${cover.to} 100%)`,
      }}
    >
      <Motif motif={cover.motif} accent={cover.accent} />
    </div>
  );
}

function Motif({
  motif,
  accent,
}: {
  motif: ArticleCoverT["motif"];
  accent: string;
}) {
  switch (motif) {
    case "hex":
      return (
        <svg
          viewBox="0 0 400 240"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <g fill="none" stroke={accent} strokeOpacity="0.35" strokeWidth="1">
            <path d="M300 20 L356 54 L356 122 L300 156 L244 122 L244 54 Z" />
            <path d="M300 60 L336 82 L336 126 L300 148 L264 126 L264 82 Z" />
          </g>
          <path
            d="M80 170 L120 194 L120 242 L80 266 L40 242 L40 194 Z"
            fill={accent}
            fillOpacity="0.14"
            stroke={accent}
            strokeOpacity="0.45"
          />
        </svg>
      );
    case "waves":
      return (
        <svg
          viewBox="0 0 400 240"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <g fill="none" stroke={accent} strokeOpacity="0.32" strokeWidth="1.2">
            <path d="M-20 170 Q 80 140, 200 170 T 420 170" />
            <path d="M-20 190 Q 80 160, 200 190 T 420 190" />
            <path d="M-20 210 Q 80 180, 200 210 T 420 210" />
          </g>
        </svg>
      );
    case "rings":
      return (
        <svg
          viewBox="0 0 400 240"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <g fill="none" stroke={accent} strokeOpacity="0.35" strokeWidth="1.1">
            <circle cx="320" cy="120" r="40" />
            <circle cx="320" cy="120" r="68" strokeOpacity="0.22" />
            <circle cx="320" cy="120" r="96" strokeOpacity="0.14" />
          </g>
          <circle cx="320" cy="120" r="18" fill={accent} fillOpacity="0.35" />
        </svg>
      );
    case "grid":
      return (
        <svg
          viewBox="0 0 400 240"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <pattern id="grid-p" width="28" height="28" patternUnits="userSpaceOnUse">
              <path
                d="M28 0H0V28"
                fill="none"
                stroke={accent}
                strokeOpacity="0.25"
                strokeWidth="0.8"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-p)" />
          <circle cx="96" cy="132" r="46" fill={accent} fillOpacity="0.14" />
        </svg>
      );
    case "sun":
      return (
        <svg
          viewBox="0 0 400 240"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <circle cx="310" cy="90" r="62" fill={accent} fillOpacity="0.18" />
          <circle cx="310" cy="90" r="36" fill={accent} fillOpacity="0.45" />
          <g stroke={accent} strokeOpacity="0.35" strokeWidth="1">
            <line x1="0" y1="200" x2="400" y2="200" />
            <line x1="0" y1="212" x2="400" y2="212" strokeOpacity="0.2" />
          </g>
        </svg>
      );
    case "moon":
      return (
        <svg
          viewBox="0 0 400 240"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <circle cx="290" cy="110" r="60" fill={accent} fillOpacity="0.2" />
          <circle cx="308" cy="98" r="54" fill="white" fillOpacity="0.8" />
          <g fill="white" fillOpacity="0.8">
            <circle cx="60" cy="60" r="1.2" />
            <circle cx="130" cy="48" r="0.9" />
            <circle cx="190" cy="90" r="1.1" />
            <circle cx="80" cy="140" r="0.8" />
            <circle cx="40" cy="180" r="1.1" />
          </g>
        </svg>
      );
  }
}
