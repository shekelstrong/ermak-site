import { useState } from "react";
import { Plus } from "lucide-react";
import { useCart } from "@/store/cart";
import { toast } from "sonner";
import tikhiyDon from "@/assets/product-tikhiy-don.jpg";
import kazak from "@/assets/product-kazak.jpg";
import slavaBogu from "@/assets/product-slava-bogu.jpg";

type Product = {
  id: string;
  name: string;
  subtitle?: string;
  quote?: string;
  price: number;
  image: string;
  tag: string;
};

const products: Product[] = [
  {
    id: "tikhiy-don",
    name: "ТИХИЙ ДОН",
    subtitle: "Футболка · Чёрный",
    price: 3500,
    image: tikhiyDon,
    tag: "Архив",
  },
  {
    id: "kazak",
    name: "КАЗАКЪ",
    subtitle: "Футболка · Триптих",
    quote: "Это символ того, что наше наследие ковалось в огне и крови.",
    price: 3900,
    image: kazak,
    tag: "Новинка",
  },
  {
    id: "slava-bogu",
    name: "СЛАВА БОГУ МЫ КАЗАКИ",
    subtitle: "Футболка · Минимал",
    price: 3200,
    image: slavaBogu,
    tag: "Канон",
  },
];

const sizes = ["S", "M", "L", "XL"];

export const Collection = () => {
  const add = useCart((s) => s.add);
  const [activeSize, setActiveSize] = useState<Record<string, string>>({});

  const handleAdd = (p: Product) => {
    const size = activeSize[p.id] ?? "M";
    add({ id: p.id, name: p.name, price: p.price, image: p.image, size });
    toast.success(`${p.name} · ${size} добавлено в корзину`);
  };

  return (
    <section id="collection" className="relative py-24 md:py-32 bg-surface/40">
      <div className="container-luxe">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24 gap-8 reveal">
          <div>
            <span className="text-gold text-[10px] tracking-[0.5em] uppercase block mb-6">
              ✦ Коллекция · I
            </span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-foreground">
              Канон<br />
              <span className="italic text-foreground/50">наследия</span>
            </h2>
          </div>
          <p className="max-w-md text-foreground/60 text-base md:text-lg leading-relaxed font-light">
            Три капсулы. Три истории. Каждая вещь несёт память поколений и
            создана для тех, кто помнит, откуда он родом.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((p, i) => (
            <article
              key={p.id}
              className="product-card group reveal"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-background">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="product-image absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 z-10 text-[10px] tracking-[0.3em] uppercase text-gold border border-gold/40 px-3 py-1 bg-background/40 backdrop-blur-sm">
                  {p.tag}
                </span>

                {/* Hover overlay */}
                <div className="product-overlay">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/60">
                      Размер
                    </span>
                    <div className="flex gap-1.5">
                      {sizes.map((s) => {
                        const selected = (activeSize[p.id] ?? "M") === s;
                        return (
                          <button
                            key={s}
                            onClick={() =>
                              setActiveSize((prev) => ({ ...prev, [p.id]: s }))
                            }
                            className={`w-8 h-8 text-xs border transition-all ${
                              selected
                                ? "border-gold text-gold bg-gold/10"
                                : "border-foreground/30 text-foreground/70 hover:border-foreground"
                            }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <button
                    onClick={() => handleAdd(p)}
                    className="w-full bg-foreground text-background text-[11px] tracking-[0.3em] uppercase py-3.5 font-medium hover:bg-gold transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Plus size={14} strokeWidth={2} />
                    Добавить в корзину
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-foreground leading-tight tracking-wide">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
                    {p.subtitle}
                  </p>
                  {p.quote && (
                    <p className="mt-3 text-xs italic text-foreground/40 max-w-xs leading-relaxed font-serif">
                      «{p.quote}»
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <div className="font-serif text-xl text-gold">
                    {p.price.toLocaleString("ru-RU")} ₽
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
