import { ArrowRight, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const sections = [
  {
    title: "Магазинъ",
    links: ["Каталог", "Новинки", "Архив", "Размерная сетка"],
  },
  {
    title: "О бренде",
    links: ["Философия", "Производство", "Лукбук", "Журнал"],
  },
  {
    title: "Помощь",
    links: ["Доставка и Оплата", "Возврат", "Контакты", "FAQ"],
  },
];

const socials = [
  { label: "Telegram", href: "https://t.me/ermakbrand" },
  { label: "Instagram", href: "https://www.instagram.com/ermak.wear" },
  { label: "VK", href: "https://vk.com/ermakbrand" },
];

export const Footer = () => {
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Вы подписаны на вестникъ.");
    setEmail("");
  };

  return (
    <footer id="footer" className="relative bg-background pt-24 md:pt-32 pb-10 border-t border-border/60">
      <div className="container-luxe">
        {/* Top: slogan + newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pb-16 md:pb-24 border-b border-border/60">
          <div className="lg:col-span-7 reveal">
            <span className="text-gold text-[10px] tracking-[0.5em] uppercase block mb-6">
              ✦ Завет
            </span>
            <h3 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-foreground">
              Помни <span className="italic text-gold">свои</span><br />
              корни.
            </h3>
          </div>

          <div className="lg:col-span-5 reveal" style={{ transitionDelay: "150ms" }}>
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Подписаться на вестникъ
            </p>
            <p className="text-foreground/60 text-sm leading-relaxed mb-6 font-light">
              Узнавайте первыми о новых релизах, ограниченных капсулах и
              историях, стоящих за каждой вещью.
            </p>
            <form onSubmit={subscribe} className="flex items-center border-b border-foreground/30 focus-within:border-gold transition-colors py-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ваш@эл-почта.рф"
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground/60 text-foreground py-2"
              />
              <button
                type="submit"
                aria-label="Подписаться"
                className="p-2 text-foreground/70 hover:text-gold transition-colors"
              >
                <Send size={18} strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>

        {/* Middle: brand mark + nav columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-12 py-16">
          <div className="col-span-2 md:col-span-4">
            <a href="#top" className="font-display text-4xl md:text-5xl text-foreground hover:text-gold transition-colors block mb-4">
              ЕРМАК
            </a>
            <p className="text-foreground/50 text-sm leading-relaxed font-serif italic max-w-xs">
              Премiальная одежда, рождённая Традицией.
            </p>
            <div className="mt-8 flex gap-5 text-[10px] tracking-[0.3em] uppercase">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="text-foreground/60 hover:text-gold transition-colors group inline-flex items-center gap-1"
                >
                  {s.label}
                  <ArrowRight size={10} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {sections.map((sec) => (
            <div key={sec.title} className="md:col-span-2 lg:col-span-2 xl:col-span-2 col-span-1 md:col-start-auto" >
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-5">
                {sec.title}
              </div>
              <ul className="space-y-3">
                {sec.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/60 flex flex-col gap-4 text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>© 2026 ЕРМАК · Все права защищены</div>
            <div className="flex items-center gap-2">
              <span>Сдѣлано в Россiи</span>
              <span className="text-gold">☦</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-[9px] tracking-[0.15em] text-muted-foreground/60">
            <div>ИП Куценко Станислав Олегович · ИНН 640701170860</div>
            <div className="flex items-center gap-4">
              <a href="/oferta.pdf" className="hover:text-foreground transition-colors">Публичная оферта</a>
              <a href="/politics.pdf" className="hover:text-foreground transition-colors">Политика конфиденциальности</a>
            </div>
          </div>
        </div>
      </div>

      {/* Massive ghost wordmark removed */}
    </footer>
  );
};
