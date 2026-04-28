import { X, Minus, Plus, ArrowRight, Send, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/store/cart";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const CartDrawer = () => {
  const { items, isOpen, close, setQty, remove, total } = useCart();
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleCheckout = () => {
    const orderId = "ERM-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const lines = items.map(
      (it) => `${it.name} (${it.size ?? "M"}) × ${it.qty} — ${(it.price * it.qty).toLocaleString("ru-RU")} ₽`
    );
    const totalStr = total().toLocaleString("ru-RU");
    const text = `Заказ ${orderId}%0A${encodeURIComponent(lines.join("\n"))}%0A%0AИтого: ${totalStr} ₽`;
    window.open(`https://t.me/ermakbrand?text=${text}`, "_blank");
  };

  return (
    <div
      className={`fixed inset-0 z-[80] transition-opacity duration-500 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={close} />
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[440px] bg-surface border-l border-border flex flex-col transition-transform duration-500 ease-[var(--ease-luxury)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-1">✦ Корзина</div>
            <h3 className="font-serif text-xl text-foreground">Ваш сундукъ ({items.length})</h3>
          </div>
          <button onClick={close} aria-label="Закрыть корзину" className="text-foreground/70 hover:text-gold transition-colors p-1">
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20">
              <div className="text-6xl text-gold/30 font-serif">☦</div>
              <p className="text-foreground/60 font-serif italic">Корзина пуста.</p>
              <p className="text-xs text-muted-foreground tracking-widest uppercase">Выберите что-то из коллекции</p>
              <button onClick={close} className="mt-4 text-[11px] tracking-[0.3em] uppercase border-b border-gold text-gold pb-1 hover:opacity-80">
                К коллекции
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((it) => (
                <li key={`${it.id}-${it.size}`} className="py-5 flex gap-4">
                  <div className="w-20 h-24 bg-background overflow-hidden shrink-0">
                    {it.image ? (
                      <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl bg-surface">📦</div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-serif text-base text-foreground leading-tight">{it.name}</div>
                        <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">Размер · {it.size ?? "M"}</div>
                      </div>
                      <button onClick={() => remove(it.id, it.size)} className="text-foreground/40 hover:text-crimson transition-colors text-xs" aria-label="Удалить">
                        <X size={14} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-border">
                        <button onClick={() => setQty(it.id, it.size, it.qty - 1)} className="px-2.5 py-1.5 text-foreground/70 hover:text-gold" aria-label="Меньше">
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-sm tabular-nums">{it.qty}</span>
                        <button onClick={() => setQty(it.id, it.size, it.qty + 1)} className="px-2.5 py-1.5 text-foreground/70 hover:text-gold" aria-label="Больше">
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="font-serif text-gold text-base">{(it.price * it.qty).toLocaleString("ru-RU")} ₽</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 bg-surface-elevated">
            <div className="flex items-baseline justify-between mb-1 text-sm">
              <span className="text-foreground/60 tracking-wide">Подитог</span>
              <span className="font-serif text-2xl text-foreground">{total().toLocaleString("ru-RU")} ₽</span>
            </div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-5">Доставка и налоги · при оформленiи</p>
            
            <div className="mb-5">
              <div className="flex items-start gap-3">
                <Checkbox 
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                  className="mt-0.5"
                />
                <Label 
                  htmlFor="terms" 
                  className="text-xs text-foreground/80 leading-relaxed cursor-pointer select-none"
                >
                  Я принимаю условия{" "}
                  <a href="/offer" className="text-gold hover:underline">публичной оферты</a>
                  {" "}и{" "}
                  <a href="/privacy" className="text-gold hover:underline">политики обработки персональных данных</a>
                </Label>
              </div>
            </div>
            
            <button
              onClick={handleCheckout}
              disabled={!acceptedTerms}
              className={`group w-full py-4 text-[11px] tracking-[0.3em] uppercase font-medium flex items-center justify-center gap-3 transition-all duration-300 ${
                acceptedTerms 
                  ? "bg-foreground text-background hover:bg-gold" 
                  : "bg-foreground/30 text-foreground/50 cursor-not-allowed"
              }`}
            >
              Оформить заказъ
              <Send size={14} className={acceptedTerms ? "group-hover:translate-x-1 transition-transform" : ""} />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
