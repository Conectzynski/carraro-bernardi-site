import { useState } from "react";
import { ProjectImageHover } from "@/components/project-image-hover";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GridLines } from "@/components/grid-lines";
import { Reveal } from "@/components/reveal";
import { ContactCta } from "@/components/contact-cta";
import {
  DrawLine,
  MaskText,
  Parallax,
  ScrollExpand,
  ScrollFadeUp,
  ScrollMaskText,
  ScrollPinExpand,
  StickyTail,
} from "@/components/scroll-fx";
import hero from "@/assets/hero.webp";
import hero2 from "@/assets/hero-2.webp";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { TrussGrid } from "@/components/truss-grid";
import studio from "@/assets/studio.webp";
import detail from "@/assets/detail.webp";
import project1 from "@/assets/project-1.webp";
import project2 from "@/assets/project-2.webp";
import conceptual from "@/assets/conceptual.webp";
import project3 from "@/assets/project-3.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Carraro Bernardi | Arquitetos Associados" },
      {
        name: "description",
        content:
          "Escritório de arquitetura contemporânea em Chapecó — SC. Projetos residenciais, corporativos e de interiores com desenho preciso e materialidade honesta.",
      },
      { property: "og:title", content: "Carraro Bernardi | Arquitetos Associados" },
      {
        property: "og:description",
        content:
          "Arquitetura contemporânea e minimalista em Chapecó — SC: projetos residenciais, corporativos e de interiores.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "preload", as: "image", href: hero, fetchpriority: "high" }],
  }),
  component: Index,
});

const projects = [
  {
    n: "01",
    title: "Casa Pátio",
    slug: "casa-patio",
    place: "Chapecó — SC",
    year: "2025",
    type: "Residencial",
    area: "420 m²",
    status: "Construído",
    idea: "Um pátio central organiza a casa e leva luz e ventilação a todos os ambientes.",
    image: project1,
    gallery: [project1, detail, conceptual],
  },
  {
    n: "02",
    title: "Edifício Cortina",
    slug: "edificio-cortina",
    place: "Chapecó — SC",
    year: "2024",
    type: "Corporativo",
    area: "3.180 m²",
    status: "Em obra",
    idea: "Brises verticais em concreto filtram o sol poente e dão ritmo à fachada urbana.",
    image: project2,
    gallery: [project2, project3, studio],
  },
  {
    n: "03",
    title: "Residência Horizonte",
    slug: "residencia-horizonte",
    place: "Xanxerê — SC",
    year: "2023",
    type: "Residencial",
    area: "610 m²",
    status: "Construído",
    idea: "Volume horizontal suspenso sobre o declive, com vista contínua para o vale.",
    image: project3,
    gallery: [project3, conceptual, detail],
  },
  {
    n: "04",
    title: "Casa Concreto",
    slug: "casa-concreto",
    place: "Chapecó — SC",
    year: "2022",
    type: "Residencial",
    area: "280 m²",
    status: "Construído",
    idea: "Paredes de concreto definem uma sequência de pátios, sombras e enquadramentos do jardim.",
    image: detail,
    gallery: [detail, project1, studio],
  },
  {
    n: "05",
    title: "Casa de Linha",
    slug: "casa-de-linha",
    place: "Joaçaba — SC",
    year: "2021",
    type: "Residencial",
    area: "360 m²",
    status: "Construído",
    idea: "Uma composição essencial de planos e vazios aproxima a casa da paisagem e da luz natural.",
    image: conceptual,
    gallery: [conceptual, project3, project1],
  },
];

const services = [
  { n: "01", title: "Arquitetura residencial", text: "Casas e residências desenhadas a partir do terreno, da luz e do modo de viver de cada cliente." },
  { n: "02", title: "Corporativo e comercial", text: "Espaços de trabalho e varejo com identidade construída, do partido geral ao detalhe executivo." },
  { n: "03", title: "Interiores e mobiliário", text: "Continuidade entre arquitetura e interior: materiais, marcenaria sob medida e iluminação." },
  { n: "04", title: "Gestão e acompanhamento", text: "Detalhamento executivo e acompanhamento de obra para garantir o projeto como foi desenhado." },
];


function Index() {
  const [slide, setSlide] = useState(0);
  return (
    <div className="min-h-screen bg-background">
      <GridLines />
      <SiteHeader />

      <main className="relative z-10 pb-32">
        {/* Hero */}
        <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden lg:h-[96vh]">
          <Parallax className="absolute inset-0 h-full w-full" amount={14}>
            <HeroSlideshow
              className="relative h-full w-full"
              interval={6000}
              onSlideChange={setSlide}
              slides={[
                {
                  src: hero,
                  alt: "Residência contemporânea em concreto e madeira projetada pelo escritório",
                },
                {
                  src: hero2,
                  alt: "Fachada em concreto aparente com estrutura metálica e brises de madeira",
                },
              ]}
            />
          </Parallax>
          <div className="absolute inset-0 bg-brand-slate/45" />

          {/* Grid de treliça sobre a imagem, alinhado à direita */}
          <div className="pointer-events-none absolute inset-y-0 right-[-1000px] flex items-end justify-end opacity-40 sm:opacity-100 lg:right-[-900px]">
            <TrussGrid
              pulse={slide}
              imageSrc={slide === 1 ? hero2 : hero}
              className="h-[calc(100%-160px)] w-auto text-primary-foreground/40"
            />
          </div>

          {/* O bloco de texto e a linha horizontal são ancorados na mesma
              altura da linha horizontal da treliça (viewBox y=1223.59 de 1401,
              em um SVG de altura calc(100% - 100px) alinhado embaixo). */}
          <div className="relative h-full px-5 lg:px-10">
            <div className="absolute inset-x-5 bottom-[calc(12.663%+8px)] lg:inset-x-10 lg:bottom-[calc(12.663%+11px)]">
              <Reveal
                delay={80}
                className="mb-4 text-[9px] uppercase leading-[1.6] tracking-[0.16em] text-primary-foreground/70 sm:text-[10px] sm:tracking-[0.24em]"
              >
                <span className="block sm:inline">Escritório de arquitetura</span>
                <span className="hidden sm:inline"> · </span>
                <span className="block sm:inline">Chapecó — SC</span>
              </Reveal>

              <h1 className="max-w-3xl text-left text-[1.75rem] font-bold leading-[1.08] tracking-[-0.02em] text-primary-foreground sm:text-4xl lg:text-[4rem]">
                <MaskText as="span" className="block" text="Arquitetura" delay={100} step={50} />
                <MaskText
                  as="span"
                  className="block"
                  text="contemporânea"
                  delay={180}
                  step={50}
                />
                <MaskText as="span" className="block" text="e atemporal" delay={260} step={50} />
              </h1>
            </div>

            <div className="absolute inset-x-5 top-[calc(87.337%+21px)] lg:inset-x-10 lg:top-[calc(87.337%+21px)]">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-primary-foreground/25 pt-4 text-[8px] uppercase tracking-[0.1em] text-primary-foreground/75 [&>span:nth-child(even)]:text-right sm:grid-cols-4 sm:gap-6 sm:pt-6 sm:text-[11px] sm:tracking-[0.2em] sm:[&>span:nth-child(even)]:text-left">
                <span>DESDE 2011</span>
                <span>Residencial · Corporativo</span>
                <span>Interiores · Obra</span>
                <span className="sm:!text-right">Role para explorar ↓</span>
              </div>
            </div>
          </div>
        </section>

        {/* Manifesto */}
        <section id="filosofia" className="px-5 pb-10 pt-8 lg:px-10 lg:pb-16 lg:pt-8">
          <div className="-mx-5 grid gap-10 border-t border-border/70 pt-32 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:-mx-6">

            <ScrollFadeUp distance={28} start={0.95} end={0.78}>
              <p className="ml-5 flex items-center gap-4 bg-background pr-4 text-[11px] uppercase tracking-[0.2em] text-brand-mist lg:ml-6">
                <span className="h-px w-10 bg-brand-mist/60" />
                O que nos move
              </p>
            </ScrollFadeUp>
            <div className="ml-[32vw] grid min-w-0 gap-10 md:ml-0 md:grid-cols-2 lg:-translate-x-[52px]">
              <ScrollFadeUp distance={44} start={0.78} end={0.6}>
                <p className="bg-background pr-4 text-sm font-normal leading-relaxed tracking-[0.1em] text-brand-slate">
                  Os projetos nascem de uma resposta medida ao modo como cada cliente vive. Refinados,
                  confortáveis e inconfundivelmente pessoais — da primeira conversa ao último detalhe
                  de obra.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp distance={60} start={0.6} end={0.42}>
                <p className="bg-background pr-4 text-sm font-normal leading-relaxed tracking-[0.1em] text-brand-slate">
                  A complexidade nos interessa. Cada terreno, programa e restrição é uma chance de
                  explorar, depurar e construir com intenção — sem excessos, com materiais que ganham
                  caráter com o tempo.
                </p>
              </ScrollFadeUp>
            </div>
          </div>
        </section>

        {/* Banda de imagem: fica fixa e abre até a tela cheia antes de liberar a rolagem */}
        <ScrollPinExpand
          className="-mt-[22vh] block"
          track={110}
          insetX={32}
          insetY={24}
          images={[detail, studio, conceptual]}
          alt="Detalhe de fachada em concreto, madeira e estrutura metálica"
          after={
            <div className="relative">
            <StickyTail className="z-10">
            <section className="bg-brand-slate px-5 py-12 text-background lg:px-10 lg:py-20">
              <Reveal className="mb-14 flex items-center gap-4 text-[11px] uppercase tracking-[0.24em] text-background/70">
                <span className="h-px w-10 bg-background/60" />
                Atuação
              </Reveal>

              <div className="border-t border-primary-foreground/25">
                {services.map((s, i) => (
                  <div
                    key={s.n}
                    className="group border-b border-primary-foreground/25 py-8 transition-colors hover:bg-primary-foreground/10 md:py-10"
                  >
                    <ScrollFadeUp
                      distance={26}
                      start={1 - i * 0.05}
                      end={0.5 - i * 0.05}
                      lerp={0.09}
                      className="grid gap-4 md:grid-cols-[80px_1fr_1.2fr] md:items-baseline"
                    >
                      <span className="text-[11px] tracking-[0.2em] text-background/60">{s.n}</span>
                      <h3 className="text-xl font-light tracking-[-0.01em] text-background transition-transform duration-500 ease-out group-hover:translate-x-2 lg:text-3xl">
                        {s.title}
                      </h3>
                      <p className="max-w-xl text-sm leading-relaxed tracking-[0.1em] text-background/75">{s.text}</p>
                    </ScrollFadeUp>
                  </div>
                ))}
              </div>
            </section>
            </StickyTail>

            {/* Projetos — passa por cima da seção Atuação, que fica fixa */}
            <section
              id="projetos"
              className="relative z-20 bg-background px-5 pb-24 pt-24 lg:px-10 lg:pb-40 lg:pt-32"
            >
              <DrawLine className="w-full" />
              <Reveal
                stagger
                staggerStep={140}
                className="grid gap-10 pt-10 lg:grid-cols-[1fr_2fr]"
              >
                <p className="relative z-10 h-fit w-fit bg-background pr-4 text-[11px] uppercase tracking-[0.24em] text-brand-mist">
                  Projetos selecionados
                </p>
                <div className="relative z-10 bg-background lg:-ml-4">
                  <MaskText
                    as="h2"
                    className="-translate-x-[2px] bg-background text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#26323B] lg:text-6xl"
                    text="Obra construída"
                    step={70}
                  />
                  <p className="mt-8 max-w-xl bg-background text-sm font-normal leading-relaxed tracking-[0.1em] text-brand-slate">
                    Assumimos um número limitado de projetos por vez, garantindo a cada um o tempo,
                    o foco e o cuidado que ele exige.
                  </p>
                </div>
              </Reveal>

              <div className="mt-20 space-y-20 lg:space-y-32">
                {projects.map((p, i) => (
                  <article key={p.title} className="group md:grid md:grid-cols-12 md:gap-x-8">
                    <DrawLine
                      className={`w-full md:col-span-8 ${
                        i % 2 === 1 ? "md:col-start-1" : "md:col-start-5"
                      }`}
                    />
                    <Reveal
                      stagger
                      staggerStep={140}
                      className="grid gap-8 pt-6 md:col-span-12 md:grid-cols-12 md:items-end md:gap-x-8"
                    >
                      {/* Ficha técnica — a linha vira uma régua de dados */}
                      <div
                        className={`relative z-10 bg-background md:col-span-4 ${
                          i % 2 === 1 ? "md:order-2 md:col-start-9" : ""
                        }`}
                      >
                        <div className="flex items-baseline gap-4 text-[11px] uppercase tracking-[0.2em] text-brand-mist">
                          <span>{p.n}</span>
                          <span className="h-px flex-1 bg-brand-mist/40" />
                          <span>{p.status}</span>
                        </div>

                        <h3 className="mt-6 text-2xl font-light tracking-[-0.01em] text-[#26323B] lg:text-[2.75rem] lg:leading-[1.05]">
                          {p.title}
                        </h3>

                        <p className="mt-5 max-w-sm text-sm leading-relaxed tracking-[0.1em] text-brand-graphite">
                          {p.idea}
                        </p>

                        <dl className="mt-8 grid grid-cols-2 gap-x-6">
                          {[
                            ["Programa", p.type],
                            ["Área", p.area],
                            ["Local", p.place],
                            ["Ano", p.year],
                          ].map(([k, v]) => (
                            <div key={k} className="border-t border-border/70 py-3">
                              <dt className="text-[10px] uppercase tracking-[0.18em] text-brand-mist">
                                {k}
                              </dt>
                              <dd className="mt-1 text-sm text-brand-slate">{v}</dd>
                            </div>
                          ))}
                        </dl>

                        <Link
                          to="/projetos/$slug"
                          params={{ slug: p.slug }}
                          className="group/cta mt-8 inline-flex items-center gap-3 border-b border-brand-slate/30 pb-2 text-[11px] uppercase tracking-[0.2em] text-brand-slate transition-colors hover:border-brand-slate"
                        >
                          Ver projeto
                          <span className="transition-transform duration-500 ease-out group-hover/cta:translate-x-1">
                            →
                          </span>
                        </Link>
                      </div>

                      <figure
                        className={`md:col-span-8 ${i % 2 === 1 ? "md:order-1 md:col-start-1" : ""}`}
                      >
                        <Link to="/projetos/$slug" params={{ slug: p.slug }} className="block">
                        <ProjectImageHover gallery={p.gallery} title={p.title}>
                          <ScrollExpand inset={32} start={1} end={i === 1 ? 0.55 : 0.25}>
                            <Parallax
                              className={`w-full ${i === 1 ? "aspect-[4/5]" : "aspect-[16/10]"}`}
                              amount={10}
                            >
                              <img
                                src={p.image}
                                alt={`${p.title} — ${p.type} em ${p.place}, ${p.year}`}
                                width={1200}
                                height={1500}
                                loading={i === 1 ? "eager" : "lazy"}
                                decoding="async"
                                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover/image:scale-[1.03]"
                              />
                            </Parallax>
                          </ScrollExpand>
                        </ProjectImageHover>
                        </Link>

                      </figure>
                    </Reveal>
                  </article>
                ))}
              </div>

              {/* CTA final da seleção de projetos */}
              <Reveal className="relative z-10 mt-24 bg-background lg:mt-40">
                <Link
                  to="/projetos"
                  aria-label="Ver todos os projetos"
                  className="group/more flex items-center justify-center gap-5 py-8 text-brand-slate transition-colors hover:text-brand-mist lg:py-10"
                >
                  <span className="text-[11px] uppercase tracking-[0.24em]">Todos os projetos</span>
                  <span className="text-2xl leading-none transition-transform duration-500 ease-out group-hover/more:translate-x-1">
                    →
                  </span>
                </Link>
              </Reveal>
            </section>
            </div>
          }
        />

        {/* Estúdio */}
        <section className="px-5 pb-24 lg:px-10 lg:pb-40">
          <div className="grid gap-12 border-t border-border/70 pt-16 lg:grid-cols-2 lg:items-center lg:gap-20">
            <ScrollExpand inset={32} start={1} end={0.25}>
              <Parallax className="aspect-[4/3] w-full" amount={10}>
                <img
                  src={studio}
                  alt="Arquitetos analisando maquetes e pranchas no estúdio"
                  width={1400}
                  height={1000}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </Parallax>
            </ScrollExpand>
            <Reveal stagger staggerStep={130} className="relative z-10 bg-background">
              <p className="text-[11px] uppercase tracking-[0.24em] text-brand-mist">O estúdio</p>
              <h2 className="mt-8 bg-background text-2xl font-light leading-[1.15] tracking-[-0.02em] text-[#26323B] lg:text-4xl">
                Uma equipe integrada, trabalhando lado a lado com clientes, engenheiros e construtores.
              </h2>
               <p className="mt-8 max-w-lg bg-background text-sm font-normal leading-relaxed tracking-[0.1em] text-brand-slate">
                 Do estudo preliminar ao acompanhamento de obra, o processo é conduzido pelos mesmos
                 arquitetos — o que mantém a coerência entre a ideia inicial e o espaço construído.
               </p>
                <Link
                  to="/sobre"
                  className="group mt-10 inline-flex items-center gap-3 border-b border-brand-slate/30 bg-background pb-2 text-[11px] uppercase tracking-[0.2em] text-brand-slate transition-colors hover:border-brand-slate"
                >
                  Conheça o escritório
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
             </Reveal>
          </div>
        </section>

         {/* Contato */}
         <ContactCta id="contato" />

      </main>

      <SiteFooter />
    </div>
  );
}
