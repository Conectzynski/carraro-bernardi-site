import mapa from "@/assets/mapa.webp";

/**
 * Mapa estático provisório, no lugar do <GoogleMap /> interativo enquanto a
 * chave própria da Maps JavaScript API não estiver configurada.
 *
 * Para voltar ao mapa interativo: em routes/contato.tsx, troque <StaticMap />
 * por <GoogleMap /> e reative o import. O google-map.tsx segue intacto.
 */

const ENDERECO = "Rua Sete de Setembro, 153d, Centro · Chapecó — SC · 89801-140";
/** mesmas coordenadas do marcador em google-map.tsx */
const DESTINO = "-27.0948605,-52.615477";

export function StaticMap() {
  return (
    <figure className="relative">
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${DESTINO}`}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Abrir rota até ${ENDERECO} no Google Maps`}
        className="group relative block h-[22rem] w-full overflow-hidden border border-border/70 bg-brand-mist/15 sm:h-[30rem]"
      >
        <img
          src={mapa}
          alt={`Mapa da localização do escritório: ${ENDERECO}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />

        <span className="pointer-events-none absolute bottom-5 left-5 inline-flex items-center gap-3 border border-border/70 bg-background px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-brand-slate transition-colors duration-300 group-hover:bg-brand-slate group-hover:text-background">
          Ver rota
          <span aria-hidden="true">→</span>
        </span>
      </a>

      {/* A atribuição vem embutida no print, mas o object-cover a corta em telas
          estreitas — este rótulo garante que ela apareça em qualquer largura. */}
      <figcaption className="mt-3 px-5 text-right text-[10px] uppercase tracking-[0.24em] text-brand-graphite/70 lg:px-10">
        Dados cartográficos ©2026 Google
      </figcaption>
    </figure>
  );
}
