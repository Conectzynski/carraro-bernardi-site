import { useEffect, useMemo, useRef, useState } from "react";

const LINES: [number, number, number, number][] = [
  [1567.58,2.44531,1567.58,1398.74],
  [1741.58,176.844,1741.58,1397.79],
  [1915.58,176.844,1915.58,1398.5],
  [2089.58,176.844,2089.46,1399.13],
  [1393.46,2.47754,1393.46,1398.06],
  [1219.58,2.52539,1219.58,1398.49],
  [697.576,1.95215,697.576,1397.83],
  [175.824,1048.61,175.824,1225.05],
  [2959.58,176.844,2959.58,1398.18],
  [871.576,3.95703,871.576,1398.01],
  [2263.58,176.844,2263.58,1399.04],
  [522.576,177.398,3308.58,177.405],
  [174.98,1224.05,3306.58,1224.05],
  [348.576,526.281,3306.58,526.281],
  [1.99219,875.166,3306.58,875.166],
  [349.576,525.359,349.576,1399.11],
  [1.57617,699.716,1.57618,876.166],
  [175.824,701.723,175.824,874.736],
  [3133.58,176.844,3133.58,1398.18],
  [1045.58,2.78027,1045.58,1398.55],
  [2437.58,176.844,2437.58,1398.18],
  [3307.58,176.844,3307.58,1399.49],
  [2611.58,176.844,2611.58,1398.18],
  [523.576,176.927,523.576,1398.51],
  [2785.58,176.844,2785.58,1398.18],
  [698.436,2.95703,1568.58,2.95703],
  [174.98,1049.61,3306.58,1049.61],
  [350.422,351.84,3306.58,351.839],
  [174.824,1398.49,3306.58,1398.49],
  [1,700.724,3306.58,700.723],
  [697.005,178.003,524.253,351.298],
  [175.034,701.568,2.12791,874.905],
  [697.284,352.449,523.284,526.747],
  [869.062,525.916,698.115,700.666],
  [1218.92,3.65658,871.919,351.373],
  [522.987,1224.65,350.319,1397.61],
  [871.284,1050.24,698.141,1223.6],
  [1045.28,3.48599,872.655,176.795],
  [348.94,1224.75,175.52,1398.16],
  [1219.28,526.652,698.15,1049.12],
  [1566.85,701.298,1046.18,1223.64],
  [3306.73,178.277,2611.82,874.977],
  [1220.03,177.981,1393.6,351.882],
  [1393.68,177.691,1569.19,352.835],
  [1568.02,177.899,1741.28,351.621],
  [1567.86,2.67722,1741.87,177.429],
  [2090.26,352.478,2263.32,525.996],
  [698.179,3.53956,872.041,178.166],
  [1046.41,352.425,1219.25,526.12],
  [1393.83,526.575,1567.63,700.825],
  [1046.21,701.521,1219.26,874.331],
  [1219.73,1224.34,1392.74,1397.88],
  [1742,701.038,1914.53,873.515],
  [1916.18,701.018,2089.23,874.781],
  [1916.75,875.46,2089.19,1048.91],
  [2263.8,874.997,2437.04,1049.29],
  [2089.66,701.017,2262.84,874.595],
  [351.132,352.136,522.943,525.518],
  [524.314,701.017,698.295,875.624],
  [350.268,875.836,523.282,1047.88],
  [1394.05,875.839,1914.87,1397.76],
  [1393.79,176.792,1566.84,3.64709],
  [698.233,1397.82,871.133,1224.34],
  [1568.02,525.556,1740.69,352.633],
  [1741.99,525.997,2088.83,177.901],
  [1568.03,874.639,1741.51,701.038],
  [2090.14,1048.91,2262.87,875.46],
  [2438.22,1048.9,2611.22,875.46],
  [1568.08,1049.04,1741.14,875.46],
  [1220.2,874.332,1392.98,701.312],
  [1915.98,525.837,2262.86,178.243],
  [2264.12,351.416,2436.94,178.028],
  [2438.09,351.155,2610.91,177.663]
];

const FOLD_MS = 820;
const STEP_MS = 110;
const MODULE = 174; // passo do módulo da treliça
const X0 = 2;
const Y0 = 2;

/**
 * Triângulos "vazados": metade de um módulo quadrado preenchida em branco
 * sólido, como um furo na imagem com a forma da treliça.
 */
const HOLES: { points: string; fold: "a" | "b" }[] = [
  // módulo x1220.5→1394.5 / y177.9→351.4 — metade superior direita
  { points: "1220.5,177.9 1394.5,177.9 1394.5,351.4", fold: "a" },
  // módulo x698.5→872.5 / y1049.15→1223.59 — metade inferior direita
  { points: "872.5,1049.15 872.5,1223.59 698.5,1223.59", fold: "b" },
];

/** Triângulo branco a 30% que dobra dentro do módulo estático. */
const FOLD_SHAPE_FILLS: {
  points: string;
  fold: "a" | "b";
  delay: number;
  opacity?: number;
  /** quando true, o triângulo é um pedaço da imagem do hero */
  image?: boolean;
}[] = [
  { points: "2.5,874.7 2.5,700.3 176.7,700.3", fold: "b", delay: 300, opacity: 1, image: true },
  { points: "350.5,1223.59 350.5,1398 176.748,1398", fold: "a", delay: 380, opacity: 1, image: true },
  { points: "350.5,351.4 524.5,351.4 524.5,525.8", fold: "b", delay: 460, opacity: 1, image: true },
  { points: "350.5,874.7 350.5,1049.15 524.5,1049.15", fold: "b", delay: 540, opacity: 1, image: true },
  { points: "350.5,1223.59 524.5,1223.59 350.5,1398", fold: "b", delay: 620, opacity: 1, image: true },
  { points: "524.5,176.9 698.5,176.9 524.5,351.4", fold: "a", delay: 700, opacity: 1, image: true },
  { points: "524.5,351.4 698.5,351.4 524.5,525.8", fold: "a", delay: 780, opacity: 1, image: true },
  { points: "524.5,700.3 698.5,700.3 698.5,874.7", fold: "a", delay: 860, opacity: 1, image: true },
  { points: "698.5,2.5 872.5,2.5 872.5,176.9", fold: "b", delay: 940, opacity: 1, image: true },
  { points: "698.5,700.3 698.5,525.8 872.5,525.8", fold: "b", delay: 1020, opacity: 1, image: true },
  { points: "872.5,1223.59 872.5,1398 698.5,1398", fold: "b", delay: 1100, opacity: 1, image: true },
  { points: "872.5,2.5 1046.5,2.5 872.5,176.9", fold: "a", delay: 1180, opacity: 1, image: true },
  { points: "1046.5,176.9 1046.5,351.4 872.5,351.4", fold: "a", delay: 1260, opacity: 1, image: true },
  { points: "1046.5,2.5 1220.5,2.5 1046.5,176.9", fold: "b", delay: 1340, opacity: 1, image: true },
  { points: "1046.5,351.4 1220.5,351.4 1220.5,525.8", fold: "a", delay: 1420, opacity: 1, image: true },
  { points: "1046.5,700.3 1220.5,700.3 1220.5,874.7", fold: "a", delay: 1500, opacity: 1, image: true },
  { points: "1220.5,874.7 1394.5,874.7 1394.5,700.3", fold: "b", delay: 1580, opacity: 1, image: true },
  { points: "1220.5,1223.59 1220.5,1398 1394.5,1398", fold: "a", delay: 1660, opacity: 1, image: true },
  { points: "1394.5,2.5 1568.5,2.5 1394.5,176.9", fold: "a", delay: 1740, opacity: 1, image: true },
  { points: "1394.5,177.9 1394.5,351.4 1568.5,351.4", fold: "a", delay: 1820, opacity: 1, image: true },
  { points: "1568.5,525.8 1568.5,700.3 1394.5,700.3", fold: "a", delay: 1900, opacity: 1, image: true },
  { points: "1568.5,2.5 1568.5,176.9 1742.5,176.9", fold: "b", delay: 1980, opacity: 1, image: true },
  { points: "1568.5,177.9 1568.5,351.4 1742.5,351.4", fold: "b", delay: 2060, opacity: 1, image: true },
  { points: "1568.5,351.4 1742.5,351.4 1568.5,525.8", fold: "b", delay: 2140, opacity: 1, image: true },
  { points: "1568.5,700.3 1742.5,700.3 1568.5,874.7", fold: "a", delay: 2220, opacity: 1, image: true },
  { points: "1568.5,874.7 1742.5,874.7 1568.5,1049.15", fold: "a", delay: 2300, opacity: 1, image: true },
  { points: "1916.5,700.3 1916.5,874.7 1742.5,874.7", fold: "b", delay: 2380, opacity: 1, image: true },
  { points: "1916.5,700.3 2090.5,700.3 2090.5,874.7", fold: "a", delay: 2460, opacity: 1, image: true },
  { points: "2090.5,874.7 2090.5,1049.15 1916.5,1049.15", fold: "b", delay: 2540, opacity: 1, image: true },
  { points: "2090.5,351.4 2264.5,351.4 2264.5,525.8", fold: "a", delay: 2620, opacity: 1, image: true },
  { points: "2090.5,700.3 2264.5,700.3 2264.5,874.7", fold: "b", delay: 2700, opacity: 1, image: true },
  { points: "2090.5,874.7 2264.5,874.7 2090.5,1049.15", fold: "b", delay: 2780, opacity: 1, image: true },
  { points: "2264.5,176.9 2438.5,176.9 2264.5,351.4", fold: "b", delay: 2860, opacity: 1, image: true },
  { points: "2264.5,874.7 2438.5,874.7 2438.5,1049.15", fold: "a", delay: 2940, opacity: 1, image: true },
  { points: "2438.5,176.9 2612.5,176.9 2438.5,351.4", fold: "a", delay: 3020, opacity: 1, image: true },
  { points: "2438.5,874.7 2612.5,874.7 2438.5,1049.15", fold: "b", delay: 3100, opacity: 1, image: true },
];

/**
 * Treliça sobre o hero. A cada mudança de `pulse` (troca de imagem do hero)
 * as linhas se redesenham em cascata, da esquerda para a direita.
 */
type Shape = {
  key: string;
  points: string;
  fold: "a" | "b" | "yl" | "yr";
  delay: number;
  opacity?: number;
  origin?: string;
};

/** Dois quadrados vizinhos que dobram um sobre o outro (dobradiça central). */
const SQUARE_FOLDS: Shape[] = [
  {
    key: "sq-l",
    points: "2264.5,700.3 2438.5,700.3 2438.5,874.7 2264.5,874.7",
    fold: "yl",
    delay: 3180,
    opacity: 1,
    origin: "right center",
  },
  {
    key: "sq-r",
    points: "2438.5,700.3 2612.5,700.3 2612.5,874.7 2438.5,874.7",
    fold: "yr",
    delay: 3320,
    opacity: 1,
    origin: "left center",
  },
];

/** Todas as peças que dobram, cada uma com seu próprio recorte da imagem. */
const SHAPES: Shape[] = [
  ...HOLES.map((h, i) => ({
    key: `h${i}`,
    points: h.points,
    fold: h.fold,
    delay: 260 + i * 200,
    opacity: 1,
  })),
  ...FOLD_SHAPE_FILLS.map((f, i) => ({
    key: `f${i}`,
    points: f.points,
    fold: f.fold,
    delay: f.delay,
    opacity: f.opacity ?? 0.3,
  })),
  ...SQUARE_FOLDS,
];

export function TrussGrid({
  className,
  pulse = 0,
  imageSrc,
  lineOnly = false,
  fit = "hero",
  viewBox = "0 0 3310 1400",
}: {
  className?: string;
  pulse?: number;
  imageSrc?: string;
  lineOnly?: boolean;
  fit?: "hero" | "fill" | "cover";
  viewBox?: string;
}) {
  const [drawn, setDrawn] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);
  // Cada peça guarda a imagem que recortou: só troca quando a sua própria
  // dobra começa (e permanece assim até a próxima dobra).
  const [shapeSrcs, setShapeSrcs] = useState<Record<string, string>>(() =>
    imageSrc
      ? Object.fromEntries(SHAPES.map((s) => [s.key, imageSrc]))
      : {},
  );

  useEffect(() => {
    if (!imageSrc) return;
    let cancelled = false;
    let ids: number[] = [];
    // Só troca o recorte depois que a nova foto já está decodificada,
    // senão o triângulo fica vazio por alguns frames.
    const schedule = () => {
      if (cancelled) return;
      ids = SHAPES.map((s) =>
        window.setTimeout(
          () => setShapeSrcs((prev) => ({ ...prev, [s.key]: imageSrc })),
          s.delay,
        ),
      );
    };
    const pre = new Image();
    pre.src = imageSrc;
    if (pre.complete) schedule();
    else {
      pre.onload = schedule;
      pre.onerror = schedule;
    }
    return () => {
      cancelled = true;
      ids.forEach((id) => window.clearTimeout(id));
    };
  }, [imageSrc]);
  // Retângulo (em unidades do viewBox) onde a foto do hero aparece na tela,
  // para que o pedaço que dobra seja a continuação exata da imagem.
  const [imgBox, setImgBox] = useState({ x: 0, y: 0, w: 3310, h: 1400 });

  useEffect(() => {
    const measure = () => {
      const svg = svgRef.current;
      const hero = svg?.closest("section");
      if (!svg || !hero) return;
      const sr = svg.getBoundingClientRect();
      if (!sr.width) return;
      // imagem do hero atualmente visível (crossfade + ken burns + parallax)
      const imgs = Array.from(hero.querySelectorAll("img"));
      let active: HTMLImageElement | null = null;
      let best = 0;
      for (const im of imgs) {
        const o = Number(getComputedStyle(im).opacity || "0");
        if (o > best) {
          best = o;
          active = im as HTMLImageElement;
        }
      }
      if (!active) return;
      const ir = active.getBoundingClientRect();
      if (!ir.width || !ir.height) return;
      const s = Math.min(sr.width / 3310, sr.height / 1400);
      const contentLeft = sr.right - 3310 * s;
      const contentTop = sr.top + (sr.height - 1400 * s) / 2;
      // object-cover: parte realmente pintada dentro do <img>
      const nw = active.naturalWidth || 1920;
      const nh = active.naturalHeight || 1200;
      const cover = Math.max(ir.width / nw, ir.height / nh);
      const paintedW = nw * cover;
      const paintedH = nh * cover;
      const paintedLeft = ir.left + (ir.width - paintedW) / 2;
      const paintedTop = ir.top + (ir.height - paintedH) / 2;
      const next = {
        x: (paintedLeft - contentLeft) / s,
        y: (paintedTop - contentTop) / s,
        w: paintedW / s,
        h: paintedH / s,
      };
      setImgBox((prev) =>
        Math.abs(prev.x - next.x) < 0.5 &&
        Math.abs(prev.y - next.y) < 0.5 &&
        Math.abs(prev.w - next.w) < 0.5 &&
        Math.abs(prev.h - next.h) < 0.5
          ? prev
          : next,
      );
    };
    let raf = 0;
    const loop = () => {
      measure();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    setDrawn(false);
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setDrawn(true)),
    );
    return () => cancelAnimationFrame(raf);
  }, [pulse]);

  // Cada peça (quadrado ou triângulo) do grid vira uma "dobra": agrupamos as
  // linhas pelo módulo em que estão e cada módulo se abre a partir de uma de
  // suas arestas, em cascata diagonal — como um origami sendo desdobrado.
  const folds = useMemo(() => {
    const map = new Map<
      string,
      { col: number; row: number; lines: [number, number, number, number][] }
    >();
    for (const l of LINES) {
      const mx = (l[0] + l[2]) / 2;
      const my = (l[1] + l[3]) / 2;
      const col = Math.round((mx - X0 - MODULE / 2) / MODULE);
      const row = Math.round((my - Y0 - MODULE / 2) / MODULE);
      const k = `${col}:${row}`;
      const cell = map.get(k);
      if (cell) cell.lines.push(l);
      else map.set(k, { col, row, lines: [l] });
    }
    return [...map.values()].sort(
      (a, b) => a.col + a.row * 0.6 - (b.col + b.row * 0.6),
    );
  }, []);

  const waveStep = (col: number, row: number) => col + row * 0.5;
  const minWave = Math.min(...folds.map((f) => waveStep(f.col, f.row)));

  return (
    <svg
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      ref={svgRef}
      className={className}
      preserveAspectRatio={
        fit === "fill" ? "none" : fit === "cover" ? "xMidYMax slice" : "xMaxYMid meet"
      }
      style={{ perspective: 1600 }}
    >
      <defs>
        {!lineOnly &&
          SHAPES.map((s) => {
            const src = shapeSrcs[s.key];
            if (!src) return null;
            return (
              <pattern
                key={`pat-${s.key}`}
                id={`truss-fold-img-${s.key}`}
                patternUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={3310}
                height={1400}
              >
                <image
                  href={src}
                  x={imgBox.x}
                  y={imgBox.y}
                  width={imgBox.w}
                  height={imgBox.h}
                  preserveAspectRatio="none"
                />
                {/* mesma lente do hero para casar com a cor da imagem de fundo */}
                <rect
                  x={0}
                  y={0}
                  width={3310}
                  height={1400}
                  fill="#43525b"
                  fillOpacity={0.45}
                />
              </pattern>
            );
          })}
      </defs>
      {!lineOnly && SHAPES.map((s) => (
        <polygon
          key={`${s.key}-${pulse}`}
          points={s.points}
          fill={
            shapeSrcs[s.key]
              ? `url(#truss-fold-img-${s.key})`
              : "var(--color-background)"
          }
          fillOpacity={s.opacity ?? 1}
          style={{
            transformBox: "fill-box",
            transformOrigin: s.origin ?? "center",
            // Antes do delay, a peça permanece no estado final da dobra
            // anterior. `both` aplicava o frame inicial (invisível) assim que
            // o slide mudava, deixando apenas as linhas até a nova dobra.
            animation: `truss-fold-${s.fold} ${FOLD_MS * 1.6}ms cubic-bezier(0.22, 1, 0.36, 1) ${s.delay}ms forwards`,
          }}
        />
      ))}
      {folds.map(({ col, row, lines }) => {
        const delay = (waveStep(col, row) - minWave) * STEP_MS;
        return (
          <g key={`${col}:${row}`}>
            <g
              style={{
                opacity: drawn ? 1 : 0,
                transition: `opacity 420ms ease-out ${delay}ms`,
              }}
            >
            {lines.map(([x1, y1, x2, y2]: [number, number, number, number], i: number) => (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="2"
              />
            ))}
            </g>
          </g>
        );
      })}
    </svg>
  );
}
