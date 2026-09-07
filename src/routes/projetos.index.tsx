import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { GridLines } from "@/components/grid-lines";
import { Reveal } from "@/components/reveal";
import { DrawLine, Parallax, ScrollExpand } from "@/components/scroll-fx";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ProjectImageHover } from "@/components/project-image-hover";
import { projects, type Project } from "@/data/projects";


export const Route = createFileRoute("/projetos/")({
  head: () => ({
    meta: [
      { title: "Projetos | Carraro Bernardi Arquitetos" },
      {
        name: "description",
        content:
          "Conheça os projetos residenciais e corporativos do escritório Carraro Bernardi Arquitetos Associados, em Chapecó — SC.",
      },
      { property: "og:title", content: "Projetos | Carraro Bernardi Arquitetos" },
      {
        property: "og:description",
        content:
          "Uma seleção de projetos Carraro Bernardi: arquitetura contemporânea, materialidade e desenho preciso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

const categories = ["Todos", "Residencial", "Corporativo"] as const;
type CategoryFilter = (typeof categories)[number];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;

  return (
    <article className="group md:grid md:grid-cols-12 md:gap-x-8">
      <DrawLine
        className={`w-full md:col-span-8 ${flipped ? "md:col-start-1" : "md:col-start-5"}`}
      />
      <Reveal
        stagger
        staggerStep={140}
        className="grid gap-8 pt-6 md:col-span-12 md:grid-cols-12 md:items-end md:gap-x-8"
      >
        <div
          className={`relative z-10 bg-background md:col-span-4 ${
            flipped ? "md:order-2 md:col-start-9" : ""
          }`}
        >
          <div className="flex items-baseline gap-4 text-[11px] uppercase tracking-[0.2em] text-brand-mist">
            <span>{project.number}</span>
            <span className="h-px flex-1 bg-brand-mist/40" />
            <span>{project.status}</span>
          </div>

          <h2 className="mt-6 text-2xl font-light tracking-[-0.01em] text-[#26323B] lg:text-[2.75rem] lg:leading-[1.05]">
            {project.title}
          </h2>

          <p className="mt-5 max-w-sm text-sm leading-relaxed tracking-[0.1em] text-brand-graphite">
            {project.description}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6">
            {[
              ["Programa", project.category],
              ["Área", project.facts.find((f) => f.label === "Área")?.value ?? "—"],
              ["Local", project.place],
              ["Ano", project.year],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-border/70 py-3">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-brand-mist">{k}</dt>
                <dd className="mt-1 text-sm text-brand-slate">{v}</dd>
              </div>
            ))}
          </dl>

          <Link
            to="/projetos/$slug"
            params={{ slug: project.slug }}
            className="group/cta mt-8 inline-flex items-center gap-3 border-b border-brand-slate/30 pb-2 text-[11px] uppercase tracking-[0.2em] text-brand-slate transition-colors hover:border-brand-slate"
          >
            Ver projeto
            <span className="transition-transform duration-500 ease-out group-hover/cta:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <figure
          {...(index === 0 ? { "data-grid-stop-right": "" } : {})}
          className={`md:col-span-8 ${flipped ? "md:order-1 md:col-start-1" : ""}`}
        >
          <Link
            to="/projetos/$slug"
            params={{ slug: project.slug }}
            className="block overflow-hidden bg-muted"
          >
            <ProjectImageHover
              gallery={project.gallery.map((g) => g.src)}
              title={project.title}
            >
              <ScrollExpand inset={32} start={1} end={0.25}>
                <Parallax
                  className={`w-full ${index % 3 === 1 ? "aspect-[4/5]" : "aspect-[16/10]"}`}
                  amount={10}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} — ${project.category} em ${project.place}`}
                    width={1200}
                    height={1500}
                    loading={index < 2 ? "eager" : "lazy"}
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
  );
}

function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("Todos");
  const filteredProjects = useMemo(
    () =>
      activeCategory === "Todos"
        ? projects
        : projects.filter((project) => project.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className="min-h-screen bg-background">
      <GridLines autoDraw />
      <SiteHeader />

      <main className="relative z-10">
        {/* Hero tipográfico */}
        <section className="relative px-5 pb-16 pt-[112px] lg:px-10 lg:pb-24 lg:pl-[72px] lg:pt-[116px]">
          <Reveal
            immediate
            className="flex items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-brand-mist"
          >
            <span className="h-px w-12 shrink-0 bg-brand-mist/70" />
            <span className="whitespace-nowrap">ARQUIVO DE PROJETOS</span>
          </Reveal>

          <Reveal immediate delay={120}>
            <h1 className="mt-10 max-w-[18ch] text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-[#26323B] sm:text-5xl lg:text-6xl">
              Cada projeto,
              <br />
              um lugar único.
            </h1>
          </Reveal>

          <div className="mt-8 grid gap-10">
            <Reveal immediate delay={220}>
              <p className="max-w-xl text-sm font-light leading-relaxed tracking-[0.1em] text-brand-slate">
                Uma seleção de trabalhos desenvolvidos entre desenho, matéria e modo de viver. Cada
                projeto nasce de uma leitura particular do lugar e da vida que vai acontecer nele.
              </p>
            </Reveal>
          </div>
        </section>


        <section className="px-5 pb-16 pt-8 lg:px-10 lg:pb-24 lg:pt-8">


          <div data-grid-stop>
          <Reveal delay={100} className="flex flex-wrap items-center gap-3 border-y border-border/70 py-5">

            <div className="flex items-center gap-4 pl-4 text-[10px] uppercase tracking-[0.22em] text-brand-mist">
              <span>Filtre por categoria</span>
              <span className="h-px w-8 bg-brand-mist/60" />
            </div>

            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar projetos por categoria">
              {categories.map((category) => {
                const selected = activeCategory === category;
                return (
                  <Button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-none border px-3 py-2 text-[10px] font-normal uppercase tracking-[0.18em] shadow-none transition-colors ${
                      selected
                        ? "border-brand-slate bg-brand-slate text-background hover:bg-brand-slate hover:text-background"
                        : "border-transparent text-brand-mist hover:border-border hover:bg-transparent hover:text-brand-slate"
                    }`}
                  >
                    {category}
                  </Button>
                );
              })}
            </div>
          </Reveal>
          </div>

        </section>

        <section className="px-5 pb-24 lg:px-10 lg:pb-40" aria-label="Lista de projetos">
          <div className="space-y-20 lg:space-y-32">
            {filteredProjects.map((project, index) => (
              <ProjectRow key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden bg-brand-mist px-5 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.8fr] lg:gap-20">
            <Reveal className="flex items-start gap-4 text-[10px] uppercase tracking-[0.24em] text-brand-slate">
              <span className="mt-[0.45em] h-px w-10 shrink-0 bg-brand-slate/70" />
              <span className="whitespace-nowrap">SEU PROJETO</span>
            </Reveal>
            <Reveal delay={120}>
              <p className="max-w-3xl text-3xl font-light leading-[1.08] tracking-[-0.02em] text-brand-slate sm:text-5xl">
                O próximo projeto pode ser o seu, vamos conversar?
              </p>
              <Link
                to="/contato"
                className="group mt-10 inline-flex items-center gap-4 border-b border-brand-slate/35 pb-3 text-[11px] uppercase tracking-[0.22em] text-brand-slate transition-colors hover:border-brand-slate"
              >
                Vamos projetar
                <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
