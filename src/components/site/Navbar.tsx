import { useEffect, useState } from "react";
import { Menu, ShoppingBag, Search, X } from "lucide-react";
import { useCart } from "@/store/cart";

const links = [
  { label: "Каталог", href: "#collection" },
  { label: "О бренде", href: "#philosophy" },
  { label: "Лукбук", href: "#lookbook" },
  { label: "Доставка", href: "#footer" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open, count } = useCart();
  const itemCount = count();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-md bg-background/70 border-b border-border/60"
            : "bg-transparent"
        }`}
      >
        <div className="container-luxe flex items-center justify-between h-16 md:h-20">
          <button
            className="md:hidden text-foreground p-1 -ml-1"
            onClick={() => setMobileOpen(true)}
            aria-label="Меню"
          >
            <Menu size={22} />
          </button>

          <nav className="hidden lg:flex items-center gap-10 text-[11px] tracking-[0.22em] uppercase">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-foreground/70 hover:text-gold transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#top"
            className="absolute left-1/2 -translate-x-1/2 font-display text-2xl md:text-3xl tracking-wider text-foreground hover:text-gold transition-colors whitespace-nowrap"
            aria-label="ЕРМАК"
          >
            ЕРМАКЪ
          </a>

          <div className="flex items-center gap-4 md:gap-6 text-foreground/80">
            <button aria-label="Поиск" className="hidden md:block hover:text-gold transition-colors">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={open}
              aria-label="Корзина"
              className="relative hover:text-gold transition-colors"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-background text-[10px] font-semibold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-background/90 backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute inset-y-0 left-0 w-[80%] max-w-sm bg-surface border-r border-border p-8 flex flex-col transition-transform duration-500 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-12">
            <span className="font-display text-2xl text-gold">ЕРМАКЪ</span>
            <button onClick={() => setMobileOpen(false)} aria-label="Закрыть">
              <X size={22} />
            </button>
          </div>
          <nav className="flex flex-col gap-6 text-sm tracking-[0.2em] uppercase">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-foreground/80 hover:text-gold transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto pt-8 border-t border-border text-xs text-muted-foreground tracking-widest">
            ПОМНИ СВОИ КОРНИ
          </div>
        </div>
      </div>
    </>
  );
};
