import { createFileRoute, Link } from "@tanstack/react-router";
import { GridLines } from "@/components/grid-lines";
import { Reveal } from "@/components/reveal";
import {
  DrawLine,
  MaskText,
  Parallax,
  ScrollBlurIn,
  ScrollExpand,
  ScrollFadeUp,
  ScrollMaskText,
  ScrollPinExpand,

  ScrollSlideIn,
  ScrollSlideMask,
  ScrollWipe,
  StickyTail,
} from "@/components/scroll-fx";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import trussGridSvg from "@/assets/gride-trelica-4.svg";
import leftTrussGridSvg from "@/assets/gride-trelica-esquerdo.svg";
import marcaWordmark from "@/assets/marca-wordmark.svg";
import studio from "@/assets/studio.webp";
import studio2 from "@/assets/studio-2.webp";
import studio3 from "@/assets/studio-3.webp";
import studio4 from "@/assets/studio-4.webp";

import gal2 from "@/assets/gal-2.webp";
import partner1 from "@/assets/partner-1.webp";
import partner2 from "@/assets/partner-2.webp";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o escritório | Carraro Bernardi" },
      {
        name: "description",
        content:
          "A história, a cultura e o modo de trabalhar do escritório Carraro Bernardi Arquitetos Associados, em Chapecó — SC.",
      },
      { property: "og:title", content: "Sobre o escritório | Carraro Bernardi" },
      {
        property: "og:description",
        content:
          "Conheça a prática de arquitetura, os princípios e a sociedade por trás dos projetos Carraro Bernardi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  {
    year: "2011",
    title: "O início",
    text: "O escritório nasce em Chapecó com uma ideia simples: fazer arquitetura próxima, rigorosa e conectada ao lugar.",
  },
  {
    year: "2015",
    title: "Uma prática autoral",
    text: "A experiência de cada obra passa a formar um repertório próprio de materiais, proporções e maneiras de construir.",
  },
  {
    year: "Hoje",
    title: "Entre desenho e obra",
    text: "Seguimos acompanhando cada projeto de perto  da primeira conversa ao último detalhe construído.",
  },
];

const principles = [
  {
    n: "01",
    title: "Escuta antes do desenho",
    text: "Cada projeto começa entendendo a vida que vai acontecer dentro dele.",
  },
  {
    n: "02",
    title: "Menos, com intenção",
    text: "A simplicidade não é ausência: é escolher o que realmente precisa permanecer.",
  },
  {
    n: "03",
    title: "O detalhe constrói o todo",
    text: "Materiais, luz e encontros são desenhados para que a arquitetura atravesse o tempo.",
  },
];

const partners = [
  {
    n: "01",
    role: "Sócio · Direção de projeto",
    title: "Olhar e síntese",
    text: "A leitura do contexto, a construção do conceito e as decisões que dão identidade a cada projeto.",
    image: partner1,
    alt: "Sócio responsável pela direção de projeto no estúdio do escritório",
    focus: [
      "Concepção e partido arquitetônico",
      "Estudo de implantação e programa",
      "Curadoria de materiais e luz",
    ],
  },
  {
    n: "02",
    role: "Sócio · Direção de obra",
    title: "Precisão e presença",
    text: "A passagem do desenho para a matéria, com atenção aos detalhes, aos encontros e à qualidade da execução.",
    image: partner2,
    alt: "Sócio responsável pela direção de obra analisando pranchas no canteiro",
    focus: [
      "Detalhamento executivo",
      "Acompanhamento de canteiro",
      "Compatibilização e cronograma",
    ],
  },
];


function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <GridLines autoDraw />
      <SiteHeader />

      <main className="relative z-10">
        {/* Hero tipográfico */}
        <section className="relative px-5 pb-16 pt-[112px] lg:px-10 lg:pb-24 lg:pt-[116px]">



          <div className="lg:pl-8">
            <Reveal
              immediate
              className="reveal-quick flex items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-brand-mist"
            >
              <span className="h-px w-8 shrink-0 bg-brand-mist/70" />
              <span className="whitespace-nowrap">O ESCRITÓRIO</span>
            </Reveal>

            <h1 className="mt-10 max-w-[18ch] text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-[#26323B] sm:text-5xl lg:text-6xl">
              <MaskText as="span" className="block" text="Arquitetura para viver," delay={0} step={18} duration={520} />
              <MaskText as="span" className="block" text="construir e permanecer." delay={90} step={18} duration={520} />
            </h1>

            <div className="mt-8 grid gap-10 pb-8">
              <Reveal immediate delay={180} className="reveal-quick">

                <p className="max-w-xl text-sm font-light leading-relaxed tracking-[0.1em] text-brand-slate">
                  Somos um escritório de arquitetura sediado em Chapecó — SC. Trabalhamos entre a
                  clareza do desenho e a presença da matéria para criar espaços contemporâneos,
                  precisos e humanos.
                </p>
              </Reveal>
            </div>
          </div>
        </section>



        {/* Estúdio — imagem fixa que abre dentro do mesmo quadro conforme a rolagem */}
        <section className="px-5 pb-[calc(4.5vw-15px)] pt-0 lg:px-10 lg:pt-0">
          <div className="relative">
            <ScrollPinExpand
              className="block"
              frameClassName="h-[calc(50vw-20px)] lg:h-[calc(50vw-40px)]"
              track={90}
              insetX={37}
              insetY={24}
              diagonalClip
              backdropImage={marcaWordmark}
              images={[studio3, studio2, studio, studio4]}
              alt="Arquitetos do escritório trabalhando em maquetes no estúdio"
            />

            <div className="pointer-events-none absolute inset-0 z-10">
              <div className="sticky top-[64px] h-[calc(50vw-20px)] lg:h-[calc(50vw-40px)]">
                <img
                  src={trussGridSvg}
                  alt=""
                  aria-hidden
                  className="absolute inset-y-0 -right-5 h-[115%] w-full -translate-y-[6.5%] object-contain object-right lg:-right-10"
                  style={{ opacity: 0.5 }}
                />
              </div>
            </div>
          </div>
        </section>



        {/* História */}
        <section className="relative bg-brand-slate px-5 py-20 text-background lg:px-10 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-[0.7fr_1.8fr] lg:gap-20">
            <Reveal className="flex items-start gap-4 text-[10px] uppercase tracking-[0.24em] text-brand-mist">
              <span className="mt-[0.45em] h-px w-10 shrink-0 bg-brand-mist/70" />
              <span className="whitespace-nowrap">HISTÓRIA </span>
            </Reveal>

            <div>
              <ScrollMaskText
                as="h2"
                className="max-w-3xl text-3xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-6xl"
                text="Uma prática construída com tempo, proximidade e curiosidade."
                overlap={0.62}
                start={0.95}
                end={0.45}
              />
              <ScrollBlurIn blur={12} rise={14} start={0.94} end={0.58} className="mt-8 max-w-2xl">
                <p className="text-sm leading-relaxed tracking-[0.1em] text-background/70">
                  Para nós, cada obra é uma oportunidade de investigar como a arquitetura pode
                  organizar a rotina, revelar a luz e dar permanência às escolhas. Por isso, não
                  trabalhamos com fórmulas prontas: cada terreno, cada cliente e cada conversa
                  acrescentam uma camada ao projeto.
                </p>
              </ScrollBlurIn>

              <div className="mt-16">
                <DrawLine className="w-full" color="rgba(255,255,255,0.2)" start={0.98} end={0.7} />
                {timeline.map((item, index) => (
                  <div key={item.year}>
                    <ScrollSlideIn
                      direction={index % 2 === 0 ? "left" : "right"}
                      distance={56}
                      start={0.95}
                      end={0.58}
                      className="grid gap-5 py-7 sm:grid-cols-[0.45fr_0.8fr_1.2fr] sm:gap-8"
                    >
                      <span className="text-3xl font-light text-brand-mist">{item.year}</span>
                      <h3 className="text-base text-background">{item.title}</h3>
                      <p className="max-w-md text-sm leading-relaxed tracking-[0.1em] text-background/60">{item.text}</p>
                    </ScrollSlideIn>
                    <DrawLine className="w-full" color="rgba(255,255,255,0.2)" start={0.98} end={0.7} />
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        <div className="relative">
        {/* Cultura */}
        <StickyTail className="z-10">
        <section className="relative overflow-hidden bg-background px-5 py-20 lg:px-10 lg:py-32">
          <div className="grid gap-10">
            <Reveal className="flex items-start gap-4 text-[10px] uppercase tracking-[0.24em] text-brand-mist">
              <span className="mt-[0.45em] h-px w-10 shrink-0 bg-brand-mist/70" />
              <span className="whitespace-nowrap">CULTURA </span>
            </Reveal>

            <div className="grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
              <div>
                <MaskText
                  as="h2"
                  className="max-w-2xl text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-[#26323B] sm:text-5xl"
                  text="O projeto é uma conversa contínua entre ideia e realidade."
                  step={45}
                />
                <ScrollSlideIn direction="left" distance={64} start={0.95} end={0.6} className="mt-8 max-w-xl">
                  <p className="text-sm leading-relaxed tracking-[0.1em] text-brand-graphite">
                    Trabalhamos de forma próxima e colaborativa. Isso nos permite estar presentes nas
                    decisões importantes, manter o diálogo aberto e cuidar para que a intenção inicial de cada projeto se preserve do desenho à obra.
                  </p>
                </ScrollSlideIn>

                <div className="mt-14 max-w-xl space-y-6">
                  {principles.map((principle, index) => (
                    <ScrollBlurIn
                      key={principle.n}
                      blur={0}
                      rise={16}
                      start={0.95}
                      end={0.56}
                      delay={index * 0.12}
                    >
                      <h3 className="text-lg font-bold text-brand-slate">{principle.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed tracking-[0.1em] text-brand-graphite">
                        {principle.text}
                      </p>
                    </ScrollBlurIn>
                  ))}
                </div>
              </div>

              <ScrollWipe
                from="bottom"
                start={1}
                end={0.3}
                shift={16}
                className="aspect-[4/5] overflow-hidden lg:aspect-auto lg:h-full"
              >
                <Parallax className="h-full w-full" amount={12}>
                  <img
                    src={gal2}
                    alt="Estar integrado ao jardim — Casa Pátio"
                    width={1600}
                    height={1104}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </Parallax>
              </ScrollWipe>
            </div>
          </div>
        </section>
        </StickyTail>


        {/* Sociedade — passa por cima da seção Cultura, que fica fixa */}
        <section className="relative z-20 bg-brand-mist px-5 py-20 lg:px-10 lg:py-32">
          <img
            src={leftTrussGridSvg}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-[20px] bottom-0 z-10 h-[calc(57.5vw-46px)] w-auto object-contain object-left lg:left-[0px]"
            style={{ opacity: 0.5 }}
          />
          <div className="relative z-10 grid gap-16 lg:grid-cols-[0.7fr_1.8fr] lg:gap-20">

            <Reveal className="flex items-start gap-4 text-[10px] uppercase tracking-[0.24em] text-brand-slate">
              <span className="mt-[0.45em] h-px w-10 shrink-0 bg-brand-slate/70" />
              <span className="whitespace-nowrap">SOCIEDADE </span>
            </Reveal>

            <div>
              <ScrollMaskText
                as="h2"
                className="max-w-3xl text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-[#26323B] sm:text-5xl lg:text-6xl"
                text="Dois olhares, uma prática feita lado a lado."
                overlap={0.5}
                start={0.95}
                end={0.42}
              />
              <ScrollSlideIn direction="right" distance={64} start={0.95} end={0.6} className="mt-8 max-w-xl">
                <p className="text-sm leading-relaxed tracking-[0.1em] text-brand-slate">
                  A sociedade reúne diferentes sensibilidades em um mesmo processo: pensar com
                  liberdade, decidir com critério e acompanhar de perto tudo o que será construído.
                </p>
              </ScrollSlideIn>

              <div className="mt-16 grid gap-x-12 gap-y-16 sm:grid-cols-2">
                {partners.map((partner, index) => (
                  <ScrollFadeUp
                    key={partner.n}
                    distance={40 + index * 16}
                    start={0.95}
                    end={0.55}
                    className="group flex flex-col"
                  >
                    <ScrollSlideMask
                      direction={index % 2 === 0 ? "left" : "right"}
                      start={1}
                      end={0.38}
                      className="relative aspect-[4/5] overflow-hidden bg-brand-slate/10"
                    >
                      <img
                        src={partner.image}
                        alt={partner.alt}
                        loading="lazy"
                        width={1024}
                        height={1280}
                        className="h-full w-full object-cover grayscale transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                      />
                    </ScrollSlideMask>


                    <div className="mt-6 flex items-center justify-between pb-4 text-[10px] uppercase tracking-[0.22em] text-brand-slate">
                      <span>{partner.role}</span>
                    </div>
                    <DrawLine className="w-full" color="rgba(67,82,91,0.1)" start={0.98} end={0.7} />

                    <h3 className="mt-6 text-3xl font-light tracking-[-0.02em] text-[#26323B] sm:text-4xl">
                      {partner.title}
                    </h3>
                    <p className="mt-4 w-full text-sm leading-relaxed tracking-[0.1em] text-brand-slate">
                      {partner.text}
                    </p>

                    <ul className="mt-7">
                      <DrawLine className="w-full" color="rgba(67,82,91,0.1)" start={0.98} end={0.7} />
                      {partner.focus.map((item) => (
                        <li key={item} className="text-sm text-brand-slate">
                          <div className="flex items-start gap-4 py-3">
                            <span className="mt-[0.7em] h-px w-5 shrink-0 bg-brand-slate/50" />
                            {item}
                          </div>
                          <DrawLine className="w-full" color="rgba(67,82,91,0.1)" start={0.98} end={0.7} />
                        </li>
                      ))}
                    </ul>

                  </ScrollFadeUp>
                ))}
              </div>

            </div>
          </div>
        </section>
        </div>


        {/* Fechamento */}
        <section className="relative overflow-hidden bg-background px-5 py-24 lg:px-10 lg:py-40">
          <div className="pointer-events-none absolute right-[10%] top-1/2 h-[28rem] w-px -translate-y-1/2 rotate-[28deg] bg-brand-slate/15" />
          <div className="pointer-events-none absolute right-[17%] top-1/2 h-[28rem] w-px -translate-y-1/2 rotate-[28deg] bg-brand-slate/10" />
          <div className="relative max-w-4xl">
            <Reveal className="block">
              <span className="eyebrow flex items-center gap-4">
                <span className="h-px w-10 bg-brand-mist/70" />
                Próximo capítulo
              </span>
            </Reveal>
            
            <MaskText
              as="h2"
              className="mt-8 text-4xl font-bold leading-[1.04] tracking-[-0.025em] text-[#26323B] sm:text-6xl lg:text-7xl"
              text="O próximo projeto pode ser o seu, vamos conversar?"
              step={55}
            />
            <ScrollFadeUp distance={30} start={0.95} end={0.6}>
              <Link
                to="/contato"
                className="group mt-12 inline-flex items-center gap-4 border-b border-brand-slate/30 pb-3 text-[11px] uppercase tracking-[0.22em] text-brand-slate transition-colors hover:border-brand-slate"
              >
                Fale conosco
                <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </ScrollFadeUp>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
