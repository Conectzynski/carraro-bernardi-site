import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "@tanstack/react-router";
import { Instagram, Linkedin, MessageCircle } from "lucide-react";
import marca from "@/assets/marca-horizontal.webp";
import marcaSlate from "@/assets/marca-horizontal-slate.webp";

const nav = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Projetos", href: "/projetos" },
  { label: "Contato", href: "/contato" },
];

let headerAlreadyShown = false;

export function SiteHeader() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(headerAlreadyShown);
  const [hydrated, setHydrated] = useState(false);
  const [animateInitialEntrance] = useState(() => isHome && !headerAlreadyShown);

  useEffect(() => {
    setHydrated(true);
    if (headerAlreadyShown) {
      setMounted(true);
      return;
    }
    const id = window.setTimeout(() => {
      headerAlreadyShown = true;
      setMounted(true);
    }, 60);
    return () => window.clearTimeout(id);
  }, []);


  // Evita qualquer transição no instante em que a rota muda (ex.: clique na marca)
  const [settledPath, setSettledPath] = useState(location.pathname);
  useEffect(() => {
    const id = window.setTimeout(() => setSettledPath(location.pathname), 120);
    return () => window.clearTimeout(id);
  }, [location.pathname]);

  const transitionsEnabled = isHome && settledPath === location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      style={
        animateInitialEntrance
          ? { opacity: mounted ? 1 : 0, transition: "opacity 500ms cubic-bezier(0.16,1,0.3,1)" }
          : undefined
      }
      className={`fixed inset-x-0 top-0 z-50 ${
        transitionsEnabled ? "transition-[background-color,box-shadow] duration-500" : ""
      } ${scrolled || !isHome ? "bg-background/30 backdrop-blur" : "bg-transparent"}`}
    >
      <div
        className={`flex items-center justify-between px-5 lg:px-10 ${
          transitionsEnabled ? "transition-[padding] duration-500" : ""
        } ${scrolled || !isHome ? "py-4" : "py-5 lg:py-7"}`}
      >
        <Link to="/" className="group flex items-center gap-4">
          <img
            src={scrolled || !isHome ? marcaSlate : marca}
            alt="Carraro Bernardi Arquitetos Associados"
            className={`w-auto ${transitionsEnabled ? "transition-all duration-500" : ""} ${scrolled || !isHome ? "h-4 lg:h-5" : "h-[18px] brightness-0 invert lg:h-8"}`}
          />
        </Link>



        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="group relative z-[70] flex flex-col items-end gap-1.5 lg:gap-2.5"
        >
          <span
            className={`h-px origin-center ${transitionsEnabled ? "transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]" : ""} ${
              open
                ? "w-8 translate-y-[7px] rotate-45 bg-primary-foreground group-hover:rotate-[135deg] lg:w-12 lg:translate-y-[11px]"
                : `w-7 origin-right group-hover:w-4 lg:w-11 lg:group-hover:w-7 ${scrolled || !isHome ? "bg-brand-slate" : "bg-background"}`
            }`}
          />
          <span
            className={`h-px w-7 origin-right ${transitionsEnabled ? "transition-all delay-75 duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]" : ""} lg:w-11 ${scrolled || !isHome ? "bg-brand-slate" : "bg-background"} ${open ? "scale-x-0 opacity-0" : "group-hover:w-5 lg:group-hover:w-9"}`}
          />
          <span
            className={`h-px origin-center ${transitionsEnabled ? "transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]" : ""} ${
              open
                ? "w-8 -translate-y-[7px] -rotate-45 bg-primary-foreground group-hover:rotate-[-135deg] lg:w-12 lg:-translate-y-[11px]"
                : `w-7 origin-right ${transitionsEnabled ? "delay-150" : ""} lg:w-11 ${scrolled || !isHome ? "bg-brand-slate" : "bg-background"}`
            }`}
          />

        </button>
      </div>

      {hydrated &&
        createPortal(
          <div className="pointer-events-none fixed inset-0 z-[9999] isolate overflow-x-clip">
            {/* Overlay */}
            <div
              onClick={() => setOpen(false)}
              className={`absolute inset-0 bg-brand-slate/50 transition-opacity duration-500 ${
                open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
              }`}
            />

            {/* Painel lateral */}
            <aside
              aria-hidden={!open}
              className={`pointer-events-auto absolute inset-y-0 right-0 flex w-[86%] max-w-md flex-col justify-between overflow-y-auto bg-brand-slate px-8 py-24 transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] lg:px-12 ${
                open ? "translate-x-0" : "pointer-events-none translate-x-full"
              }`}
            >
              <button
                type="button"
                aria-label="Fechar menu"
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="group absolute right-8 top-8 flex h-10 w-10 items-center justify-center lg:right-12"
              >
                <span className="absolute h-px w-8 rotate-45 bg-primary-foreground transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[135deg] lg:w-10" />
                <span className="absolute h-px w-8 -rotate-45 bg-primary-foreground transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[-135deg] lg:w-10" />
              </button>

              <nav>
                <ul className="flex flex-col gap-2">
                  {nav.map((item, i) => (
                    <li key={item.label} className="overflow-hidden">
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        tabIndex={open ? 0 : -1}
                        style={{ transitionDelay: open ? `${180 + i * 80}ms` : "0ms" }}
                        className={`block py-3 text-2xl font-light tracking-[-0.01em] text-primary-foreground transition-[transform,opacity] duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:text-brand-mist lg:text-4xl ${
                          open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="grid gap-3 border-t border-primary-foreground/25 pt-8 text-[11px] uppercase tracking-[0.2em] text-primary-foreground/70">
                <div className="mb-3 flex items-center gap-5">
                  {[
                    { label: "Instagram", href: "https://www.instagram.com/carrarobernardi/", Icon: Instagram },
                    { label: "LinkedIn", href: "https://www.linkedin.com/company/carrarobernardi", Icon: Linkedin },
                    { label: "WhatsApp", href: "https://wa.me/554933163423", Icon: MessageCircle },
                  ].map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={label}
                      tabIndex={open ? 0 : -1}
                      className="text-primary-foreground/80 transition-opacity hover:opacity-60"
                    >
                      <Icon size={20} strokeWidth={1.25} />
                    </a>
                  ))}
                </div>
                <a
                  href="mailto:contato@carrarobernardi.com.br"
                  tabIndex={open ? 0 : -1}
                  className="normal-case tracking-normal text-primary-foreground transition-opacity hover:opacity-70"
                >
                  contato@carrarobernardi.com.br
                </a>
                <span>Chapecó — SC</span>
              </div>
            </aside>
          </div>,
          document.body,
        )}
    </header>
  );
}