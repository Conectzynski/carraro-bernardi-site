import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** atraso inicial em ms */
  delay?: number;
  /** máscara + zoom lento (para imagens) */
  image?: boolean;
  /** entra os filhos diretos em sequência */
  stagger?: boolean;
  /** intervalo entre os filhos, em ms */
  staggerStep?: number;
  /** inicia imediatamente, sem depender da área de interseção */
  immediate?: boolean;
  id?: string;
};

export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  image = false,
  stagger = false,
  staggerStep = 110,
  immediate = false,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const attr = image ? "data-reveal-image" : stagger ? "data-stagger" : "data-reveal";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (immediate) {
      el.setAttribute(attr, "in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.setAttribute(attr, "in");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [attr, immediate]);

  const props = {
    ref,
    id,
    className,
    style: {
      "--reveal-delay": `${delay}ms`,
      "--reveal-stagger": `${staggerStep}ms`,
    } as CSSProperties,
    [attr]: immediate ? "in" : "out",
  };

  return <Tag {...props}>{children}</Tag>;
}
