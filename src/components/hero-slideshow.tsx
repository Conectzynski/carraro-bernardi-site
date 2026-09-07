import { useEffect, useState } from "react";

type Slide = { src: string; alt: string };

const FADE_MS = 2000;

/**
 * Troca do hero por crossfade longo, com zoom lento (Ken Burns) contínuo.
 */
export function HeroSlideshow({
  slides,
  interval = 7000,
  className,
  onSlideChange,
}: {
  slides: Slide[];
  interval?: number;
  className?: string;
  onSlideChange?: (index: number) => void;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [slides.length, interval]);

  useEffect(() => {
    onSlideChange?.(active);
  }, [active, onSlideChange]);

  return (
    <div className={`${className ?? ""} overflow-hidden`}>
      {slides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={i === active ? slide.alt : ""}
          aria-hidden={i === active ? undefined : true}
          width={1920}
          height={1200}
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "low"}
          decoding={i === 0 ? "sync" : "async"}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: i === active ? 1 : 0,
            transform: i === active ? "scale(1.08)" : "scale(1)",
            transition: `opacity ${FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1), transform 9000ms linear`,
            willChange: "opacity, transform",
          }}
        />
      ))}
    </div>
  );
}
