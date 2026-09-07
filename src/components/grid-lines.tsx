import { useEffect, useRef } from "react";

/**
 * Linhas verticais fixas de fundo (grid editorial), alinhadas ao padding
 * horizontal das seções. As linhas se "desenham" de cima para baixo
 * conforme o usuário rola a página.
 */
export function GridLines({
  right = true,
  autoDraw = false,
}: { right?: boolean; autoDraw?: boolean } = {}) {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let current = 0;

    const target = () => {
      // Quando autoDraw, as linhas desenham até o fim assim que a página carrega.
      if (autoDraw) return 1;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return 1;
      // primeira rolagem já revela boa parte da linha
      const p = window.scrollY / max;
      return Math.min(1, Math.pow(p, 0.45) * 1.6 + 0.35);
    };

    let stopEl = document.querySelector<HTMLElement>("[data-grid-stop]");
    let stopRightEl = document.querySelector<HTMLElement>("[data-grid-stop-right]");
    const refresh = () => {
      stopEl = document.querySelector<HTMLElement>("[data-grid-stop]");
      stopRightEl = document.querySelector<HTMLElement>("[data-grid-stop-right]");
    };
    const refreshId = window.setInterval(refresh, 1000);

    const tick = () => {
      current += (target() - current) * 0.12;
      const left = Math.max(0, Math.min(1, current));

      // As linhas param no início da seção de contato (ou, na falta dela, antes do rodapé).
      const limitEl =
        document.querySelector<HTMLElement>("[data-grid-limit]") ??
        document.querySelector<HTMLElement>("footer");
      const footerLimit = limitEl
        ? Math.max(0, Math.min(window.innerHeight, limitEl.getBoundingClientRect().top))
        : window.innerHeight;

      // Se a página define um ponto de parada (ex.: menu de categorias),
      // a linha esquerda é limitada até esse ponto.
      const stopPx = Math.min(
        footerLimit,
        stopEl
          ? Math.max(0, Math.min(window.innerHeight, stopEl.getBoundingClientRect().bottom))
          : window.innerHeight,
      );


      if (leftRef.current) {
        leftRef.current.style.height = `${stopPx}px`;
        leftRef.current.style.transform = `scaleY(${left})`;
      }
      const stopRightPx = Math.min(
        footerLimit,
        stopRightEl
          ? Math.max(0, Math.min(window.innerHeight, stopRightEl.getBoundingClientRect().top))
          : window.innerHeight,
      );

      if (rightRef.current) {
        rightRef.current.style.height = `${stopRightPx}px`;
        rightRef.current.style.transform = `scaleY(${left})`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      window.clearInterval(refreshId);
      cancelAnimationFrame(raf);
    };

  }, [right, autoDraw]);

  const line = "absolute top-0 bottom-0 w-px bg-border/70 origin-top";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 mx-5 lg:mx-10">
      <div ref={leftRef} className={`${line} left-0`} style={{ transform: "scaleY(0)", willChange: "transform" }} />
      {right && (
        <div ref={rightRef} className={`${line} right-0`} style={{ transform: "scaleY(0)", willChange: "transform" }} />
      )}
    </div>
  );
}
