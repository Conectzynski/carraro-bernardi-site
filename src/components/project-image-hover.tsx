import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

/**
 * Wrapper de imagem de projeto com hover: cursor "Ver projeto" que acompanha
 * o ponteiro e troca rápida entre as imagens da galeria.
 */
export function ProjectImageHover({
  children,
  gallery = [],
  title,
}: {
  children: ReactNode;
  gallery?: string[];
  title?: string;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!hovering || gallery.length < 2) return;
    const id = window.setInterval(() => {
      setFrame((f) => (f + 1) % gallery.length);
    }, 320);
    return () => window.clearInterval(id);
  }, [hovering, gallery.length]);

  function handlePointerMove(event: MouseEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });
  }

  return (
    <div
      className="group/image relative isolate overflow-hidden"
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => {
        setPosition({ x: 0, y: 0 });
        setHovering(false);
        setFrame(0);
      }}
    >
      {children}
      {gallery.length > 1 && (
        <div className="pointer-events-none absolute inset-0 z-10">
          {gallery.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={title ? `${title} — imagem ${i + 1}` : ""}
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-150 ${
                hovering && frame === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      )}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 whitespace-nowrap text-[11px] uppercase tracking-[0.24em] text-background opacity-0 transition-opacity duration-200 group-hover/image:opacity-100"
        style={{ transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)` }}
      >
        Ver projeto
        <span className="text-lg leading-none">→</span>
      </span>
    </div>
  );
}
