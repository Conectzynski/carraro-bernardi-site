import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

function Wrapper({ animate, className, children }: { animate: boolean; className?: string; children: ReactNode }) {
  if (!animate) return <div className={className}>{children}</div>;
  return (
    <Reveal stagger staggerStep={130} className={className}>
      {children}
    </Reveal>
  );
}

export function ContactCta({ id, animate = true }: { id?: string; animate?: boolean }) {
  return (
    <section id={id} data-grid-limit className="px-5 pt-2 lg:px-10">
      <Wrapper animate={animate} className="overflow-hidden bg-brand-mist text-brand-graphite">
        <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
          <div className="flex min-w-0 flex-col justify-between gap-12 border-b border-brand-slate/40 p-6 sm:gap-16 sm:p-10 lg:border-b-0 lg:border-r lg:p-14">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-brand-slate">
              <span>Contato</span>
              <span>&nbsp;/&nbsp;/</span>
            </div>

            <div>
              <span className="mb-5 block h-px w-12 bg-brand-slate" />
              <p className="max-w-[18ch] text-xl font-light leading-[1.15] sm:text-2xl">
                Cada projeto começa por uma conversa precisa.
              </p>
              <p className="mt-8 text-[10px] uppercase tracking-[0.18em] text-brand-slate">
                VAMOS CONVERSAR?
              </p>
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-between gap-12 bg-brand-slate p-6 text-background sm:gap-16 sm:p-10 lg:p-14">
            <div className="flex items-center justify-between border-b border-background/25 pb-5 text-[10px] uppercase tracking-[0.24em] text-background/70">
              <span>FALE CONOSCO</span>
              <span>Desde 2011</span>
            </div>

            <h2 className="max-w-3xl text-3xl font-light leading-[0.98] tracking-[-0.02em] sm:text-5xl lg:text-[5rem]">
              Seu&nbsp; próximo espaço começa <span className="text-background">aqui.</span>
            </h2>

            <div className="grid gap-6 border-t border-background/25 pt-6 text-sm sm:grid-cols-2 sm:gap-10">
              <a
                href="mailto:contato@carrarobernardi.com.br"
                className="group flex min-w-0 w-fit max-w-full flex-col gap-2 text-background transition-colors hover:text-brand-mist"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-background/60">Escreva para nós</span>
                <span className="break-all">contato@carrarobernardi.com.br <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">↗</span></span>
              </a>
              <div className="flex flex-col gap-2 text-background/75">
                <span className="text-[10px] uppercase tracking-[0.2em] text-background/60">Telefone</span>
                <span>+55 49 3316-3423</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 bg-brand-slate-deep px-6 py-5 text-background sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-12">
          <span className="text-[10px] uppercase tracking-[0.22em] text-background/60">Projetos residenciais · corporativos · interiores</span>
          <a
            href="mailto:contato@carrarobernardi.com.br"
            className="group flex w-fit items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-background"
          >
            Inicie uma conversa
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </Wrapper>
    </section>
  );
}
