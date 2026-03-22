import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

type NavbarProps = {
  onHomeClick: () => void;
  onCampaignClick: () => void;
};

export function Navbar({ onHomeClick, onCampaignClick }: NavbarProps) {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const ids = ["home", "campaigns", "how-it-works", "testimonials", "donate", "contact"];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(id);
      }, { threshold: 0, rootMargin: "-35% 0px -55% 0px" });
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("scroll", close, { passive: true, once: true });
    return () => window.removeEventListener("scroll", close);
  }, [menuOpen]);

  const links = [
    { label: "Home", href: "#home", ids: ["home"], onClick: onHomeClick },
    { label: "Campaigns", href: "#campaigns", ids: ["campaigns"], onClick: onCampaignClick },
    { label: "Impact", href: "#how-it-works", ids: ["how-it-works", "testimonials"], onClick: onHomeClick },
    { label: "Contact", href: "#contact", ids: ["donate", "contact"], onClick: onHomeClick },
  ];

  const isActive = (ids: string[]) => ids.includes(active);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/90 backdrop-blur-md border-b border-black/5">
        <div className="flex items-center justify-between px-5 md:px-8 lg:px-10 py-4 max-w-360 mx-auto w-full">
          <button onClick={onHomeClick} className="flex items-center gap-3 shrink-0 cursor-pointer">
            <img src="/assets/brand/logo-horizontal.svg" className="h-8 md:h-9 w-auto" alt="Givebridge" />
          </button>

          <div className="hidden lg:flex items-center gap-8 text-[12px] font-black uppercase tracking-widest">
            {links.map(({ label, href, ids, onClick }) => (
              <a
                key={label}
                href={href}
                onClick={onClick}
                className={`transition-colors ${isActive(ids) ? "text-black" : "text-gray-400 hover:text-black"}`}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#donate"
              className="hidden lg:flex items-center gap-2 border-2 border-black px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-brand-lime border-2 border-black" />
              Donate Now
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((value) => !value)}
              className="lg:hidden w-9 h-9 border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-black transition-colors"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="relative mt-(--nav-h) bg-brand-cream border-b border-black/10 px-5 py-6 flex flex-col gap-5"
            onClick={(event) => event.stopPropagation()}
          >
            {links.map(({ label, href, ids, onClick }) => (
              <a
                key={label}
                href={href}
                onClick={() => {
                  onClick();
                  setMenuOpen(false);
                }}
                className={`text-lg font-black uppercase tracking-tight transition-colors ${isActive(ids) ? "text-black" : "text-gray-400"}`}
              >
                {label}
              </a>
            ))}
            <a
              href="#donate"
              onClick={() => setMenuOpen(false)}
              className="mt-2 bg-black text-white px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest text-center hover:bg-gray-900 transition-colors"
            >
              Donate Now
            </a>
          </div>
        </div>
      )}
    </>
  );
}
