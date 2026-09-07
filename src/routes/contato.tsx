import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Instagram, Linkedin } from "lucide-react";
import { z } from "zod";
import { GoogleMap } from "@/components/google-map";
import { ContactCta } from "@/components/contact-cta";
import { Button } from "@/components/ui/button";
import { GridLines } from "@/components/grid-lines";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato | Carraro Bernardi Arquitetos" },
      {
        name: "description",
        content:
          "Entre em contato com o escritório Carraro Bernardi Arquitetos Associados para conversar sobre seu próximo projeto.",
      },
      { property: "og:title", content: "Contato | Carraro Bernardi Arquitetos" },
      {
        property: "og:description",
        content: "Vamos conversar sobre arquitetura residencial, corporativa, interiores e obra.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(100, "O nome deve ter até 100 caracteres."),
  email: z.string().trim().email("Informe um e-mail válido.").max(255, "O e-mail deve ter até 255 caracteres."),
  projectType: z.string().trim().min(1, "Selecione o tipo de projeto."),
  message: z.string().trim().min(10, "Conte um pouco mais sobre o projeto.").max(2000, "A mensagem deve ter até 2.000 caracteres."),
});

type ContactForm = z.infer<typeof contactSchema>;

const initialForm: ContactForm = {
  name: "",
  email: "",
  projectType: "",
  message: "",
};

function WhatsAppIcon({ size = 20, strokeWidth = 1.25 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-4.06-1.03L3 20l1.06-5.3A8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z" />
      <path d="M9.2 8.6c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.5l.7 1.6c.1.2 0 .4-.1.6l-.4.5c-.1.2-.2.3-.1.5.3.6 1.1 1.6 2.2 2.1.3.2.5.1.6 0l.5-.6c.2-.2.3-.2.5-.1l1.5.8c.2.1.3.3.3.4 0 .3-.2 1-.6 1.3-.4.3-1 .5-1.6.4-1.2-.2-2.9-1-4.2-2.4-1.3-1.4-1.9-3-1.9-3.9 0-.6.2-1.1.4-1.4Z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/carrarobernardi/", icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/carrarobernardi", icon: Linkedin },
  { label: "WhatsApp", href: "https://wa.me/554933163423", icon: WhatsAppIcon },
];


function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [sent, setSent] = useState(false);

  function updateField(field: keyof ContactForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setSent(false);
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = contactSchema.safeParse(form);

    if (!result.success) {
      const nextErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string" && !nextErrors[field as keyof ContactForm]) {
          nextErrors[field as keyof ContactForm] = issue.message;
        }
      });
      setErrors(nextErrors);
      setSent(false);
      return;
    }

    const { name, email, projectType, message } = result.data;
    const subject = encodeURIComponent(`Novo contato — ${projectType}`);
    const body = encodeURIComponent(
      `Nome: ${name}\nE-mail: ${email}\nTipo de projeto: ${projectType}\n\n${message}`,
    );
    window.location.href = `mailto:contato@carrarobernardi.com.br?subject=${subject}&body=${body}`;
    setErrors({});
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-background">
      <GridLines />
      <SiteHeader />

      <main className="relative z-10">
        <div className="pt-20 lg:pt-24">
          <ContactCta animate={false} />
        </div>
        <section className="px-5 pb-20 pt-20 lg:px-10 lg:pb-32 lg:pt-28">

          <div className="grid gap-16 lg:grid-cols-[0.7fr_1.8fr] lg:gap-20">
            <div aria-hidden="true" />


            <div className="flex flex-col gap-0 lg:pr-32">



              <Reveal delay={180}>
                <form onSubmit={handleSubmit} noValidate className="pt-14">

                  <div className="border-b border-border/70 py-5">
                    <label htmlFor="name" className="text-[10px] uppercase tracking-[0.2em] text-brand-mist">Seu nome</label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={(event) => updateField("name", event.target.value)}
                      maxLength={100}
                      autoComplete="name"
                      className="mt-3 block w-full bg-transparent text-base text-brand-slate outline-none placeholder:text-brand-mist/60"
                      placeholder="Como podemos chamar você?"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && <p id="name-error" className="mt-2 text-xs text-brand-slate">{errors.name}</p>}
                  </div>

                  <div className="border-b border-border/70 py-5">
                    <label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] text-brand-mist">Seu e-mail</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      maxLength={255}
                      autoComplete="email"
                      className="mt-3 block w-full bg-transparent text-base text-brand-slate outline-none placeholder:text-brand-mist/60"
                      placeholder="voce@exemplo.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && <p id="email-error" className="mt-2 text-xs text-brand-slate">{errors.email}</p>}
                  </div>

                  <div className="border-b border-border/70 py-5">
                    <label htmlFor="projectType" className="text-[10px] uppercase tracking-[0.2em] text-brand-mist">Tipo de projeto</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={form.projectType}
                      onChange={(event) => updateField("projectType", event.target.value)}
                      className="mt-3 block w-full bg-transparent text-base text-brand-slate outline-none"
                      aria-invalid={Boolean(errors.projectType)}
                      aria-describedby={errors.projectType ? "project-type-error" : undefined}
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="Arquitetura residencial">Arquitetura residencial</option>
                      <option value="Arquitetura corporativa">Arquitetura corporativa</option>
                      <option value="Interiores">Interiores</option>
                      <option value="Outro">Outro</option>
                    </select>
                    {errors.projectType && <p id="project-type-error" className="mt-2 text-xs text-brand-slate">{errors.projectType}</p>}
                  </div>

                  <div className="mt-6 border border-border/70 py-5 px-5">
                    <label htmlFor="message" className="text-[10px] uppercase tracking-[0.2em] text-brand-mist">Sua mensagem</label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={(event) => updateField("message", event.target.value)}
                      maxLength={2000}
                      rows={4}
                      className="mt-3 block w-full resize-y bg-transparent text-base leading-relaxed text-brand-slate outline-none placeholder:text-brand-mist/60"
                      placeholder="Fale sobre o terreno, a cidade e o que você precisa."
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && <p id="message-error" className="mt-2 text-xs text-brand-slate">{errors.message}</p>}
                  </div>

                  <div className="pt-7">
                    <Button type="submit" className="h-auto rounded-none bg-brand-slate px-5 py-4 text-[10px] font-normal uppercase tracking-[0.2em] text-background shadow-none hover:bg-brand-slate-deep">
                      Enviar mensagem
                      <ArrowUpRight size={16} strokeWidth={1.2} />
                    </Button>
                    {sent && <p role="status" className="mt-4 text-xs leading-relaxed text-brand-graphite">Seu cliente de e-mail foi aberto. Aguardamos sua mensagem.</p>}
                  </div>
                </form>

                <div className="mt-14 border-t border-border/70 pt-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand-mist">Atendimento</span>
                  <p className="mt-3 text-sm leading-relaxed tracking-[0.1em] text-brand-graphite">
                    Segunda a sexta
                    <br />
                    09h às 18h · Nosso horário
                    <br />
                    Rua Sete de Setembro, 153d, Centro · Chapecó — SC · 89801-140
                  </p>
                  <div className="mt-6 flex items-center gap-5">
                    {socialLinks.map(({ label, href, icon: Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={label}
                        className="text-brand-slate transition-colors hover:text-brand-mist"
                      >
                        <Icon size={20} strokeWidth={1.25} />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="px-5 pt-20 pb-0 lg:px-10 lg:pt-28 lg:pb-0">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.8fr] lg:gap-x-20 lg:gap-y-8">

            <div className="col-span-full -mx-5 w-auto lg:-mx-10">
              <GoogleMap />
            </div>

          </div>
        </section>

        <section className="bg-brand-mist px-5 py-20 lg:px-10 lg:py-28">
          <Reveal className="grid gap-8 lg:grid-cols-[0.7fr_1.8fr] lg:gap-20">
            <span className="flex items-start gap-4 text-[10px] uppercase tracking-[0.24em] text-brand-slate">
              <span className="mt-[0.45em] h-px w-10 bg-brand-slate/70" />
              Até breve
            </span>
            <p className="max-w-3xl text-3xl font-light leading-[1.08] tracking-[-0.02em] text-brand-slate sm:text-5xl">
              Boas conversas também constroem lugares.
            </p>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
