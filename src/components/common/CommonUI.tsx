import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

/* ─────────────────────────────────────────────
   COUNTER — card raised amounts
───────────────────────────────────────────── */
export const Counter = ({ start = 0, end = 21800, duration = 2000, pct = 37 }) => {
  const [count, setCount] = useState(start);
  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;
      if (progress < 1) {
        setCount(Math.floor(start + (end - start) * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [start, end, duration]);
  return <span className="text-black font-black">${count.toLocaleString()} ({pct}%)</span>;
};

/* ─────────────────────────────────────────────
   STAT COUNTER — viewport-triggered
───────────────────────────────────────────── */
export const StatCounter = ({
  end, duration = 1800, prefix = "", suffix = "",
}: { end: number; duration?: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setCount(end);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let startTime: number | null = null;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * end));
        if (progress < 1) requestAnimationFrame(animate);
        else setCount(end);
      };
      requestAnimationFrame(animate);
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);
  return <span ref={ref} className="font-black">{prefix}{count.toLocaleString()}{suffix}</span>;
};

export const joinClasses = (...classNames: Array<string | false | null | undefined>) =>
  classNames.filter(Boolean).join(" ");

type DonateNowActionProps = {
  href?: string;
  onMainClick?: React.MouseEventHandler<HTMLAnchorElement>;
  onArrowClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
  label?: string;
  variant?: 'primary' | 'secondary';
};

const donateNowSizeMap = {
  sm: {
    main: "min-h-9 min-w-[7.75rem] rounded-[1rem] px-3.5 py-2 text-[8px]",
    arrow: "size-9",
    icon: "h-3 w-3",
    dot: "h-2 w-2",
  },
  md: {
    main: "min-h-11 min-w-[10.5rem] rounded-[1.1rem] px-5 py-3 text-[10px] lg:min-h-12 lg:px-6 lg:text-[11px]",
    arrow: "size-10 lg:size-11",
    icon: "h-4 w-4",
    dot: "h-2.5 w-2.5",
  },
  lg: {
    main: "min-h-12 min-w-[11.5rem] rounded-[1.25rem] px-6 py-3.5 text-[10px] md:min-h-13 md:px-7 md:text-[11px]",
    arrow: "size-11 md:size-12",
    icon: "h-4 w-4",
    dot: "h-3 w-3",
  },
} as const;

export const DonateNowAction = ({
  href = "#donate",
  onMainClick,
  onArrowClick,
  size = "md",
  fullWidth = false,
  className,
  label = "Donate Now",
  variant = 'primary',
}: DonateNowActionProps) => {
  const sizeClasses = donateNowSizeMap[size];

  const isSecondary = variant === 'secondary';

  return (
    <div className={joinClasses("flex items-center gap-2.5", fullWidth && "w-full", className)}>
      <a
        href={href}
        onClick={onMainClick}
        className={joinClasses(
          "inline-flex items-center justify-center gap-3 border font-black uppercase tracking-[0.18em] transition-all duration-200 hover:-translate-y-0.5",
          isSecondary 
            ? "border-black/20 bg-white text-black hover:bg-black/5" 
            : "border-black/70 bg-linear-to-b from-[#1b1b1b] via-[#101010] to-[#050505] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_14px_24px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_18px_30px_rgba(0,0,0,0.24)]",
          sizeClasses.main,
          fullWidth && "min-w-0 flex-1",
        )}
      >
        <span className={joinClasses("rounded-full bg-brand-lime shadow-[0_0_0_2px_rgba(255,255,255,0.12)]", sizeClasses.dot)} />
        <span>{label}</span>
      </a>
      {onArrowClick && (
        <button
          type="button"
          onClick={onArrowClick}
          aria-label="Open donation details"
          className={joinClasses(
            "inline-flex shrink-0 items-center justify-center rounded-full border border-black bg-white text-black shadow-[0_12px_20px_rgba(0,0,0,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-lime",
            sizeClasses.arrow,
          )}
        >
          <ArrowRight className={sizeClasses.icon} strokeWidth={2.2} />
        </button>
      )}
    </div>
  );
};

type FaceImage = { src: string; alt: string };

/**
 * Stacked circular avatars. Pass `images` to use files from `public/assets/...`;
 * otherwise `palette` renders CSS-colored circles (fallback).
 */
export function SupporterFaceStack({
  borderClass,
  sizeClass,
  palette,
  images,
}: {
  borderClass: string;
  sizeClass: string;
  palette?: readonly string[];
  images?: readonly FaceImage[];
}) {
  if (images && images.length > 0) {
    return (
      <div className="flex -space-x-2">
        {images.map((img) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className={`${sizeClass} shrink-0 rounded-full border-2 ${borderClass} object-cover`}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    );
  }

  const swatches = palette ?? [];
  return (
    <div className="flex -space-x-2" aria-hidden="true">
      {swatches.map((bg, i) => (
        <span
          key={i}
          className={`${sizeClass} ${bg} shrink-0 rounded-full border-2 ${borderClass}`}
        />
      ))}
    </div>
  );
}
