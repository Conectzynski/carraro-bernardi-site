import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAdjacentProject, getProject, getRelatedProjects } from "@/data/projects";

export const Route = createFileRoute("/projetos/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project, next: getAdjacentProject(params.slug), related: getRelatedProjects(params.slug) };
  },

  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Projeto indisponível | Carraro Bernardi Arquitetos" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    const title = `${project.title} | Carraro Bernardi Arquitetos`;
    return {
      meta: [
        { title },
        { name: "description", content: project.description },
        { property: "og:title", content: title },
        { property: "og:description", content: project.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectDetail,
});

function ProjectNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="relative z-10 px-5 pb-32 pt-48 lg:px-10 lg:pt-60">
        <p className="text-[10px] uppercase tracking-[0.28em] text-brand-mist">Projeto não encontrado</p>
        <h1 className="mt-8 max-w-[16ch] text-[2.5rem] font-light leading-[0.98] tracking-[-0.03em] text-brand-slate sm:text-6xl">
          Esse projeto não está no arquivo.
        </h1>
        <Link
          to="/projetos"
          className="group mt-12 inline-flex items-center gap-4 border-b border-brand-slate/35 pb-3 text-[11px] uppercase tracking-[0.22em] text-brand-slate transition-colors hover:border-brand-slate"
        >
          Ver todos os projetos
          <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}

function ProjectDetail() {
  const { project, related } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="relative z-10">
        {/* Hero tipográfico */}
        <section className="px-5 pb-12 pt-[112px] lg:px-10 lg:pb-16 lg:pt-[116px]">
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-brand-mist">
            <span className="h-px w-12 shrink-0 bg-brand-mist/70" />
            <span className="whitespace-nowrap">
              {project.number} — {project.category}
            </span>
          </div>

          <h1 className="mt-10 max-w-[16ch] text-[2.5rem] font-light leading-[0.98] tracking-[-0.03em] text-brand-slate sm:text-6xl lg:text-[6.5rem]">
            {project.title}
          </h1>

          <p className="mt-10 max-w-xl text-sm font-light leading-relaxed tracking-[0.1em] text-brand-slate">
            {project.intro}
          </p>

          <div className="mt-12 border-t border-border/70" />
        </section>

        {/* Vista frontal da construção */}
        <section className="px-5 lg:px-10">
          <Reveal image>
            <figure className="overflow-hidden bg-muted">
              <img
                src={project.front}
                alt={`Vista frontal completa de ${project.title} — ${project.category} em ${project.place}`}
                width={1920}
                height={1080}
                loading="eager"
                decoding="async"
                className="aspect-[16/9] h-full w-full object-cover"
              />
              <figcaption className="mt-3 text-[10px] uppercase tracking-[0.2em] text-brand-mist">
                Vista frontal — {project.title}
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* Ficha técnica + memorial */}
        <section className="px-5 py-20 lg:px-10 lg:py-28">
          <div className="border-t border-border/70" />
          <div className="mt-6 grid gap-14 lg:grid-cols-[0.8fr_1.6fr] lg:gap-20">
            <Reveal className="grid h-fit gap-6">
              {project.facts.map((fact) => (
                <div key={fact.label} className="grid gap-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand-mist">{fact.label}</span>
                  <span className="text-sm leading-relaxed tracking-[0.1em] text-brand-slate">{fact.value}</span>
                </div>
              ))}
              <div className="grid gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-mist">Local</span>
                <span className="text-sm leading-relaxed tracking-[0.1em] text-brand-slate">{project.place}</span>
              </div>
              <div className="grid gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-mist">Situação</span>
                <span className="text-sm leading-relaxed tracking-[0.1em] text-brand-slate">{project.status}</span>
              </div>
            </Reveal>

            <Reveal delay={120} className="grid gap-6">
              {project.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="max-w-[62ch] text-sm font-light leading-relaxed tracking-[0.1em] text-brand-slate"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Galeria */}
        <section className="px-5 pb-24 lg:px-10 lg:pb-32" aria-label="Galeria do projeto">
          <div className="grid gap-8 md:grid-cols-12 md:gap-x-8 md:gap-y-16">
            {project.gallery.map((item, index) => (
              <Reveal
                key={item.src + index}
                image
                delay={index * 100}
                className={index % 2 === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-16"}
              >
                <figure className="bg-transparent">
                  <div className="overflow-hidden bg-muted">
                    <img
                      src={item.src}
                      alt={item.alt}
                      width={1200}
                      height={900}
                      loading="lazy"
                      decoding="async"
                      className={`h-full w-full object-cover ${index % 2 === 0 ? "aspect-[16/10]" : "aspect-[4/5]"}`}
                    />
                  </div>
                  <figcaption className="mt-3 text-[11px] uppercase leading-relaxed tracking-[0.18em] text-brand-slate/60">
                    {item.alt}
                  </figcaption>
                </figure>

              </Reveal>
            ))}
          </div>
        </section>

        {/* Projetos relacionados */}
        {related.length > 0 && (
          <section className="border-t border-border/70 px-5 py-20 lg:px-10 lg:py-28" aria-label="Projetos relacionados">
            <Reveal className="mt-0">
              <Carousel opts={{ align: "start", loop: related.length > 2 }} className="w-full">
                <div className="mb-8 flex items-center justify-between gap-6">
                  <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.24em] text-brand-mist">
                    <span className="h-px w-8 shrink-0 bg-brand-mist/70" />
                    <span className="whitespace-nowrap">Projetos relacionados</span>
                  </div>
                  <div className="flex gap-3">
                    <CarouselPrevious className="static translate-y-0 border-border/70 text-brand-slate shadow-none" />
                    <CarouselNext className="static translate-y-0 border-border/70 text-brand-slate shadow-none" />
                  </div>
                </div>
                <CarouselContent className="-ml-6">
                  {related.map((item) => (
                    <CarouselItem key={item.slug} className="pl-6 sm:basis-1/2 lg:basis-1/3">
                      <Link to="/projetos/$slug" params={{ slug: item.slug }} className="group block">
                        <div className="overflow-hidden bg-muted">
                          <img
                            src={item.image}
                            alt={`${item.title} — ${item.category} em ${item.place}`}
                            width={1200}
                            height={1500}
                            loading="lazy"
                            decoding="async"
                            className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        </div>
                        <div className="mt-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-brand-mist">
                          <span>{item.number}</span>
                          <span className="h-px w-6 bg-brand-mist/70" />
                          <span>{item.category}</span>
                        </div>
                        <h3 className="mt-3 text-xl font-light tracking-[-0.01em] text-[#26323B]">{item.title}</h3>
                        <p className="mt-3 max-w-[40ch] text-sm font-light leading-relaxed tracking-[0.1em] text-brand-slate">
                          {item.description}
                        </p>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </Reveal>
          </section>
        )}

      </main>

      <SiteFooter />
    </div>
  );
}
