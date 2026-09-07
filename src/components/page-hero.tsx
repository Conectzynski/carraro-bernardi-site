import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

type Meta = { label: string; value: string };

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  image: string;
  imageAlt: string;
  meta?: Meta[];
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  meta = [],
  children,
}: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-[92vh] flex-col justify-end overflow-hidden">
      <img
        src={image}
        alt={imageAlt}
        width={1920}
        height={1200}
        loading="eager"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full animate-[hero-drift_18s_ease-out_forwards] object-cover grayscale"
      />
      <div className="absolute inset-0 -z-10 bg-brand-slate-deep/45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-slate-deep/95 via-brand-slate-deep/35 to-brand-slate-deep/10" />

      <div className="relative w-full px-5 pb-12 pt-40 lg:px-10 lg:pb-16 lg:pt-56">
        <Reveal
          immediate
          className="flex items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-background/70"
        >
          <span className="h-px w-12 shrink-0 bg-background/50" />
          <span className="whitespace-nowrap">{eyebrow}</span>
        </Reveal>

        <Reveal immediate delay={120}>
          <h1 className="mt-8 max-w-[16ch] text-[2.75rem] font-light leading-[0.98] tracking-[-0.03em] text-background sm:text-7xl lg:text-[7.5rem]">
            {title}
          </h1>
        </Reveal>

        <div className="mt-10 grid gap-8 border-t border-background/20 pt-6 lg:mt-16 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-20">
          <Reveal immediate delay={220}>
            <p className="max-w-xl text-sm leading-relaxed tracking-[0.1em] text-background/80">
              {lead}
            </p>
          </Reveal>

          {meta.length > 0 && (
            <Reveal
              immediate
              delay={320}
              className="flex flex-wrap gap-x-12 gap-y-6 lg:justify-end"
            >
              {meta.map((item) => (
                <div key={item.label} className="min-w-[7rem]">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-background/55">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-light tracking-[-0.01em] text-background">
                    {item.value}
                  </p>
                </div>
              ))}
            </Reveal>
          )}
        </div>

        {children}
      </div>
    </section>
  );
}
