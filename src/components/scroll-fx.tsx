import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
  type RefObject,
} from "react";

function prefersReduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Um único loop de animação compartilhado por todos os efeitos da página.
 * Evita dezenas de requestAnimationFrame simultâneos.
 */
type Tick = (vh: number) => void;
const tickers = new Set<Tick>();
let tickerRaf = 0;

function runTickers() {
  tickerRaf = requestAnimationFrame(runTickers);
  const vh = window.innerHeight || 1;
  tickers.forEach((fn) => fn(vh));
}

function addTicker(fn: Tick) {
  tickers.add(fn);
  if (!tickerRaf) tickerRaf = requestAnimationFrame(runTickers);
  return () => {
    tickers.delete(fn);
    if (tickers.size === 0 && tickerRaf) {
      cancelAnimationFrame(tickerRaf);
      tickerRaf = 0;
    }
  };
}

/**
 * Progresso (0 → 1) do elemento cruzando a viewport, ligado à rolagem (scrub).
 * `lerp` suaviza o scrub (como o "scrub suave" da referência).
 */
function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  {
    start = 0.92,
    end = 0.42,
    lerp = 0.12,
    ease,
  }: { start?: number; end?: number; lerp?: number; ease?: (t: number) => number } = {},
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) {
      setProgress(1);
      return;
    }

    let current = 0;
    let last = -1;
    let first = true;
    let active = false;
    let stopTicker: (() => void) | undefined;

    const update = (vh: number) => {
      const rect = el.getBoundingClientRect();
      const startY = vh * start;
      const endY = vh * end - Math.min(rect.height, vh) * 0.08;
      const raw = (startY - rect.top) / Math.max(1, startY - endY);
      const target = Math.min(1, Math.max(0, raw));

      current = first ? target : current + (target - current) * lerp;
      first = false;

      const p = ease ? ease(current) : current;
      if (Math.abs(p - last) > 0.0015) {
        last = p;
        setProgress(p);
      }
    };

    // Só anima quando o elemento está perto da viewport.
    const io = new IntersectionObserver(
      ([entry]) => {
        const near = entry?.isIntersecting ?? false;
        if (near === active) return;
        active = near;
        if (near) {
          stopTicker = addTicker(update);
        } else {
          stopTicker?.();
          stopTicker = undefined;
          // fora da tela: fixa no estado final/inicial correspondente
          const rect = el.getBoundingClientRect();
          const settled = rect.top < 0 ? 1 : 0;
          if (settled !== last) {
            last = settled;
            current = settled;
            first = true;
            setProgress(settled);
          }
        }
      },
      { rootMargin: "20% 0px 20% 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      stopTicker?.();
    };
  }, [ref, start, end, lerp, ease]);

  return progress;
}


const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Linha que se "desenha" conforme a rolagem (como em decorsystems.com.au):
 * horizontal cresce da esquerda para a direita, vertical de cima para baixo.
 */
export function DrawLine({
  orientation = "horizontal",
  className,
  start = 0.95,
  end = 0.62,
  delay = 0,
  color,
}: {
  orientation?: "horizontal" | "vertical";
  className?: string;
  start?: number;
  end?: number;
  /** atraso relativo (0 → 1) dentro do progresso da rolagem */
  delay?: number;
  /** cor da linha (padrão: token de borda) */
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(ref, { start, end, lerp: 0.14, ease: easeOutCubic });
  const local = Math.min(1, Math.max(0, (p - delay) / Math.max(0.0001, 1 - delay)));
  const horizontal = orientation === "horizontal";

  return (
    <div
      ref={ref}
      aria-hidden
      className={className}
      style={{
        backgroundColor: color ?? "var(--color-border)",
        [horizontal ? "height" : "width"]: "1px",
        transform: horizontal ? `scaleX(${local})` : `scaleY(${local})`,
        transformOrigin: horizontal ? "left center" : "center top",
        willChange: "transform",
      }}

    />
  );
}

/**
 * Fixa (pin) um bloco só depois que ele rolou por completo: enquanto o conteúdo
 * é maior que a tela, ele rola normalmente; ao chegar no fim, trava e a seção
 * seguinte passa por cima.
 */
export function StickyTail({
  children,
  className,
  offset = 64,
}: {
  children: ReactNode;
  className?: string;
  /** distância do topo quando o bloco cabe inteiro na tela */
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(offset);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const calc = () => {
      const h = el.offsetHeight;
      const vh = window.innerHeight || 0;
      setTop(Math.min(offset, vh - h));
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    window.addEventListener("resize", calc);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calc);
    };
  }, [offset]);

  return (
    <div ref={ref} className={className} style={{ position: "sticky", top }}>
      {children}
    </div>
  );
}

/** Texto que sobe palavra a palavra ligado ao progresso da rolagem (scrub). */
export function ScrollMaskText({
  text,
  as: Tag = "p",
  className,
  start = 0.95,
  end = 0.4,
  overlap = 0.55,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  start?: number;
  end?: number;
  /** quanto as palavras se sobrepõem no tempo (0 = uma por vez, 1 = todas juntas) */
  overlap?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const p = useScrollProgress(ref, { start, end, lerp: 0.14, ease: easeOutCubic });
  const words = text.split(" ");
  const span = Math.max(0.0001, 1 / (words.length * (1 - overlap) + overlap));

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => {
        const startAt = i * span * (1 - overlap);
        const local = Math.min(1, Math.max(0, (p - startAt) / span));
        const eased = easeOutCubic(local);
        return (
          <span key={`${w}-${i}`}>
            <span
              style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
            >
              <span
                style={{
                  display: "inline-block",
                  transform: `translateY(${(1 - eased) * 110}%)`,
                  willChange: "transform",
                }}
              >
                {w}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </Tag>
  );
}

/** Bloco que sobe e aparece conforme a rolagem (scrub), sem "salto". */
export function ScrollFadeUp({
  children,
  className,
  distance = 42,
  start = 0.95,
  end = 0.5,
  lerp = 0.14,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  start?: number;
  end?: number;
  lerp?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(ref, { start, end, lerp, ease: easeOutCubic });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: Math.min(1, p * 1.15),
        transform: `translate3d(0, ${(1 - p) * distance}px, 0)`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}

/** Mídia que entra estreita e vai abrindo lateralmente conforme a rolagem, como na referência. */
export function ScrollExpand({
  children,
  className,
  inset = 34,
  start = 1,
  end = 0.2,
  zoom = 0.14,
}: {
  children: ReactNode;
  className?: string;
  inset?: number;
  start?: number;
  end?: number;
  zoom?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(ref, { start, end, lerp: 0.12, ease: easeOutCubic });
  const side = inset * (1 - p);

  return (
    <div
      ref={ref}
      className={className}
      style={{ clipPath: `inset(0 ${side}% 0 ${side}%)`, willChange: "clip-path" }}
    >
      <div
        style={{
          height: "100%",
          transform: `scale(${1 + zoom * (1 - p)})`,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Cortina vertical: a imagem é revelada de baixo para cima (ou o inverso),
 * enquanto o conteúdo interno faz um contra-movimento — sem zoom lateral.
 */
export function ScrollWipe({
  children,
  className,
  from = "bottom",
  start = 1,
  end = 0.32,
  shift = 14,
}: {
  children: ReactNode;
  className?: string;
  from?: "bottom" | "top";
  start?: number;
  end?: number;
  /** contra-movimento interno em % */
  shift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(ref, { start, end, lerp: 0.12, ease: easeOutCubic });
  const hidden = (1 - p) * 100;
  const clip =
    from === "bottom"
      ? `inset(${hidden}% 0 0 0)`
      : `inset(0 0 ${hidden}% 0)`;

  return (
    <div
      ref={ref}
      className={className}
      style={{ clipPath: clip, willChange: "clip-path" }}
    >
      <div
        style={{
          height: "100%",
          transform: `translate3d(0, ${(from === "bottom" ? 1 : -1) * (1 - p) * shift}%, 0)`,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Máscara deslizante: o recorte abre de um lado e o conteúdo entra na direção
 * oposta, criando um leve descolamento entre moldura e imagem.
 */
export function ScrollSlideMask({
  children,
  className,
  direction = "left",
  start = 1,
  end = 0.35,
  shift = 18,
}: {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right";
  start?: number;
  end?: number;
  shift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(ref, { start, end, lerp: 0.13, ease: easeOutCubic });
  const hidden = (1 - p) * 100;
  const clip =
    direction === "left"
      ? `inset(0 ${hidden}% 0 0)`
      : `inset(0 0 0 ${hidden}%)`;
  const dir = direction === "left" ? -1 : 1;

  return (
    <div
      ref={ref}
      className={className}
      style={{ clipPath: clip, willChange: "clip-path" }}
    >
      <div
        style={{
          height: "100%",
          transform: `translate3d(${dir * (1 - p) * -shift}%, 0, 0) scale(${1 + 0.06 * (1 - p)})`,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Parallax vertical contínuo dentro de um contêiner com overflow hidden. */


/**
 * Mídia fixa (pin) no centro da tela: enquanto o usuário rola, a imagem cresce
 * de pequena até ocupar toda a área; só depois a página volta a rolar.
 */
export function ScrollPinExpand({
  children,
  after,
  className,
  frameClassName,
  images,
  alt,
  /** altura do "trilho" de rolagem, em vh, além da tela fixa */
  track = 110,
  /** recuo lateral inicial (%) */
  insetX = 30,
  /** recuo vertical inicial (%) */
  insetY = 22,
  zoom = 0.16,
  /** corta a imagem em 45° no início, mostrando só a parte inferior */
  diagonalClip = false,
  backdropWord,
  backdropImage,

}: {
  children?: ReactNode;
  /** conteúdo que só começa a cobrir a imagem depois da expansão completa */
  after?: ReactNode;
  className?: string;
  /** altura do quadro fixo (padrão: tela cheia) */
  frameClassName?: string;
  /** sequência de imagens que se alternam conforme a imagem abre */
  images?: string[];
  alt?: string;
  track?: number;
  insetX?: number;
  insetY?: number;
  zoom?: number;
  diagonalClip?: boolean;
  backdropWord?: string;
  backdropImage?: string;

}) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) {
      setP(1);
      return;
    }
    let last = -1;
    let stopTicker: (() => void) | undefined;
    const update = (vh: number) => {
      const rect = el.getBoundingClientRect();
      const total = Math.max(1, (track / 100) * vh);
      const value = Math.min(1, Math.max(0, -rect.top / total));
      if (Math.abs(value - last) > 0.0015) {
        last = value;
        setP(value);
      }
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          stopTicker ??= addTicker(update);
        } else {
          stopTicker?.();
          stopTicker = undefined;
        }
      },
      { rootMargin: "20% 0px 20% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stopTicker?.();
    };
  }, [track]);


  const eased = easeOutCubic(Math.min(1, p / 0.98));
  const w = 100 - insetX * 2 * (1 - eased);
  const h = 100 - insetY * 2 * (1 - eased);
  // 1º momento: quadrado inteiro. Depois: seis trocas de corte diagonal,
  // intercalando 45° e -45°, até a imagem abrir por completo.
  const diagStart = 0.03;
  const diagEnd = 0.8;
  // 12 etapas: alterna corte diagonal (45°/-45°) e imagem retangular inteira.
  const diagSteps = 12;
  const diagIndex = Math.floor(
    ((eased - diagStart) / (diagEnd - diagStart)) * diagSteps,
  );
  const inDiagRange = eased >= diagStart && eased < diagEnd;
  const isRect = !inDiagRange || diagIndex % 2 === 0;
  const diagCut = isRect ? 0 : 1;
  const diagFlipped = Math.floor(diagIndex / 2) % 2 === 1;




  // A primeira troca acontece quando a imagem ultrapassa as linhas verticais
  // do grid (colunas de 25%), ou seja, quando a largura chega a ~50vw.
  const easedAtLines = Math.min(
    0.95,
    Math.max(0, 1 - 50 / Math.max(1, insetX * 2)),
  );
  const pAtLines = (1 - Math.cbrt(1 - easedAtLines)) * 0.98;
  const swapSpan = Math.max(0.0001, 0.85 - pAtLines);
  const swapProgress = Math.min(0.999, Math.max(0, (p - pAtLines) / swapSpan));
  const active =
    images && images.length > 0
      ? diagonalClip
        ? // troca de imagem a cada mudança de ângulo do corte
          Math.min(
            images.length - 1,
            Math.max(0, diagIndex + 1) % images.length,
          )
        : p < pAtLines
          ? 0
          : Math.min(
              images.length - 1,
              1 + Math.floor(swapProgress * (images.length - 1)),
            )
      : 0;


  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: "relative",
        zIndex: 0,
      }}
    >
      <div
        className={`sticky top-[64px] flex w-full items-center justify-center overflow-hidden ${frameClassName ?? "h-[calc(100vh-64px)]"}`}
      >
        {backdropImage ? (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <img
              src={backdropImage}
              alt=""
              aria-hidden="true"
              className="w-[calc(46%+96px)] max-w-none opacity-40"
            />
          </span>
        ) : backdropWord ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex select-none items-center justify-center whitespace-nowrap px-2 text-center font-display font-bold uppercase leading-none tracking-[-0.02em] text-brand-mist/35"
            style={{ fontSize: "clamp(1.25rem, 5.5vw, 5.5rem)" }}
          >
            {backdropWord}
          </span>
        ) : null}

        <div
          className="overflow-hidden"
          style={{
            width: `${w}%`,
            height: `${h}%`,
            willChange: "width, height",
            ...(diagonalClip
              ? {
                  clipPath: diagFlipped
                    ? `polygon(0% 0%, 100% ${100 * diagCut}%, 100% 100%, 0% 100%)`
                    : `polygon(0% ${100 * diagCut}%, 100% 0%, 100% 100%, 0% 100%)`,
                }
              : null),


          }}
        >

          <div
            className="relative"
            style={{
              height: "100%",
              transform: `scale(${1 + zoom * (1 - eased)})`,
              willChange: "transform",
            }}
          >
            {images && images.length > 0
              ? images.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={i === active ? (alt ?? "") : ""}
                    aria-hidden={i === active ? undefined : true}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ opacity: i === active ? 1 : 0 }}
                  />
                ))
              : children}
          </div>
        </div>
      </div>
      <div aria-hidden="true" style={{ height: `${track}vh` }} />
      {after ? <div className="relative z-20">{after}</div> : null}
    </div>
  );
}

export function Parallax({
  children,
  className,
  amount = 10,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(ref, { start: 1.15, end: -0.35, lerp: 0.16 });
  const y = (p - 0.5) * amount;

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <div
        style={{
          transform: `translate3d(0, ${y}%, 0) scale(${1 + amount / 100})`,
          willChange: "transform",
          height: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Texto que sobe palavra a palavra de dentro de uma máscara, com stagger. */
export function MaskText({
  text,
  as: Tag = "p",
  className,
  delay = 0,
  step = 60,
  duration = 1250,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  step?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -18% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <span
            style={
              {
                display: "inline-block",
                transform: shown ? "translateY(0)" : "translateY(110%)",
                transition: `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                transitionDelay: `${delay + i * step}ms`,
                willChange: "transform",
              } as CSSProperties
            }
          >
            {w}
          </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

/** Texto que entra desfocado e ganha nitidez conforme a rolagem (scrub). */
export function ScrollBlurIn({
  children,
  className,
  blur = 10,
  rise = 18,
  start = 0.95,
  end = 0.55,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  blur?: number;
  rise?: number;
  start?: number;
  end?: number;
  /** atraso relativo (0 → 1) dentro do progresso */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(ref, { start, end, lerp: 0.13, ease: easeOutCubic });
  const local = Math.min(1, Math.max(0, (p - delay) / Math.max(0.0001, 1 - delay)));

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: Math.min(1, local * 1.2),
        filter: `blur(${(1 - local) * blur}px)`,
        transform: `translate3d(0, ${(1 - local) * rise}px, 0)`,
        willChange: "transform, opacity, filter",
      }}
    >
      {children}
    </div>
  );
}

/** Bloco que desliza lateralmente e revela por máscara conforme a rolagem. */
export function ScrollSlideIn({
  children,
  className,
  direction = "left",
  distance = 48,
  start = 0.95,
  end = 0.55,
}: {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right";
  distance?: number;
  start?: number;
  end?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(ref, { start, end, lerp: 0.13, ease: easeOutCubic });
  const dir = direction === "left" ? -1 : 1;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: Math.min(1, p * 1.25),
        transform: `translate3d(${dir * (1 - p) * distance}px, 0, 0)`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
