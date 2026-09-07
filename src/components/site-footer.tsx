import marca from "@/assets/Marca_Branca.webp";
import corretizaLogo from "@/assets/corretiza-logo-branca.svg";
import grideFooter from "@/assets/gride-footer.svg";

type FooterItem = { label: string; href?: string };

const columns: { index: string; title: string; items: FooterItem[] }[] = [
  {
    index: "01",
    title: "Navegue",
    items: [
      { label: "Sobre", href: "/sobre" },
      { label: "Projetos", href: "/projetos" },
      { label: "Contato", href: "/contato" },
    ],
  },
  {
    index: "02",
    title: "Escritório",
    items: [
      { label: "Chapecó — SC, Brasil" },
      { label: "Seg — Sex · 09h às 18h" },
      { label: "CAU/BR · Desde 2011" },
    ],
  },
  {
    index: "03",
    title: "Conecte",
    items: [
      { label: "WhatsApp ↗", href: "https://wa.me/554933163423" },
      { label: "Instagram ↗", href: "https://www.instagram.com/carrarobernardi/" },
      { label: "LinkedIn ↗", href: "https://www.linkedin.com/company/carrarobernardi" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 overflow-hidden bg-brand-slate text-background">
      {/* Três linhas inferiores da mesma treliça usada no hero */}
      <div className="relative h-[154px] w-full overflow-hidden sm:h-[218px]">
        <img
          src={grideFooter}
          alt=""
          aria-hidden
          className="absolute left-0 top-0 h-full w-full object-cover object-left opacity-20"
        />
      </div>


      {/* Manifesto */}
      <div className="relative grid gap-10 px-5 py-14 after:absolute after:bottom-0 after:left-5 after:right-5 after:h-px after:bg-background/15 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-20 lg:after:left-10 lg:after:right-10">
        <p className="max-w-[22ch] text-3xl font-light leading-[1.2] tracking-[-0.02em] sm:text-5xl">
          Arquitetura que <span className="text-background">permanece</span> depois do último detalhe.
        </p>
        <div className="flex flex-col justify-end gap-6">
          <span className="h-px w-16 bg-background/40" />
          <p className="max-w-[46ch] text-sm font-normal leading-relaxed tracking-[0.1em] text-background/70">
            Criamos projetos exclusivos, com atenção integral a cada terreno, programa e
            cliente. Se você chegou até aqui, provavelmente temos algo a construir juntos.
          </p>
        </div>
      </div>

      {/* Índice */}
      <div className="grid gap-10 border-b border-background/15 px-5 py-12 sm:grid-cols-3 lg:px-10">
        {columns.map((col) => (
          <nav
            key={col.index}
            className={`flex flex-col gap-4 ${col.index !== "01" ? "sm:pt-[100px] lg:pt-[116px]" : ""}`}
          >
            {col.index === "01" && (
              <a href="/" aria-label="Ir para a página inicial" className="mb-5 w-fit self-start transition-opacity hover:opacity-75">
                <img
                  src={marca}
                  alt="Carraro Bernardi Arquitetos Associados"
                  className="h-16 w-auto brightness-0 invert sm:h-20"
                  loading="lazy"
                />
              </a>
            )}
            <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-background/45">
              {col.index}
              <span className="h-px w-6 bg-background/30" />
              {col.title}
            </span>
            <ul className="flex flex-col gap-2 text-sm tracking-[0.1em] text-background/85">
              {col.items.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className="w-fit hover:text-brand-mist"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-background/60">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Assinatura */}
      <div className="px-5 pb-4 pt-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4 text-[10px] uppercase tracking-[0.22em] text-background/50">
          <span>© {year} Carraro Bernardi Arquitetos Associados</span>
          <span className="flex items-center gap-3">
            <span>Desenvolvido por</span>
            <a
              href="https://www.corretiza.com.br"
              target="_blank"
              rel="noreferrer"
              aria-label="Visitar Corretiza Imóveis Chapecó"
              className="transition-opacity hover:opacity-75"
            >
              <img
                src={corretizaLogo}
                alt="Corretiza Imóveis Chapecó"
                className="h-3 w-auto"
                loading="lazy"
              />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
