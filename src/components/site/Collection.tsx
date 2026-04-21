import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { useCart } from "@/store/cart";
import { toast } from "sonner";

type Product = {
  id: number;
  name: string;
  desc: string;
  price: number;
  oldPrice: number | null;
  category: string;
  sizes: string[];
  images: string[];
  badge: string | null;
  active: boolean;
  emoji: string;
};

const CF_URL = "https://orientation-ohio-palmer-donations.trycloudflare.com";

function getApiBase() {
  if (typeof window === "undefined") return "";
  const h = window.location.hostname;
  if (h.includes("vercel") || (h !== "108.165.164.85" && h !== "localhost" && h !== "127.0.0.1")) {
    return CF_URL;
  }
  return "";
}

function getImgBase() {
  return getApiBase();
}

export const Collection = () => {
  const add = useCart((s) => s.add);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeSize, setActiveSize] = useState<Record<number, string>>({});
  const [modal, setModal] = useState<Product | null>(null);
  const [modalSize, setModalSize] = useState("M");

  useEffect(() => {
    const base = getApiBase();
    fetch(`${base}/api/products`)
      .then((r) => r.json())
      .then((data: Product[]) => setProducts(data.filter((p) => p.active !== false)))
      .catch(() => {});
  }, []);

  const imgBase = getImgBase();

  const getImg = (p: Product) => {
    if (p.images && p.images.length > 0) {
      const src = p.images[0];
      return src.startsWith("http") ? src : `${imgBase}${src}`;
    }
    return null;
  };

  const handleAdd = (p: Product, size: string) => {
    const img = getImg(p) || "";
    add({ id: String(p.id), name: p.name, price: p.price, image: img, size });
    toast.success(`${p.name} · ${size} добавлено в корзину`);
  };

  const openModal = (p: Product) => {
    setModal(p);
    setModalSize(p.sizes?.[0] || "M");
  };

  return (
    <section id="collection" className="relative py-16 md:py-24 bg-surface/40">
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
            Каждая вещь несёт память поколений и создана для тех, кто помнит, откуда он родом.
          </p>
        </div>

        {/* Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 text-foreground/40 font-serif italic text-xl">
            Коллекция скоро обновится...
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((p, i) => {
            const img = getImg(p);
            return (
              <article
                key={p.id}
                className="product-card group cursor-pointer reveal"
                style={{ transitionDelay: `${i * 120}ms` }}
                onClick={() => openModal(p)}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-background">
                  {img ? (
                    <img
                      src={img}
                      alt={p.name}
                      loading="lazy"
                      width={1024}
                      height={1280}
                      className="product-image absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-7xl bg-surface">
                      {p.emoji || "📦"}
                    </div>
                  )}
                  {p.badge && (
                    <span className="absolute top-4 left-4 z-10 text-[10px] tracking-[0.3em] uppercase text-gold border border-gold/40 px-3 py-1 bg-background/40 backdrop-blur-sm">
                      {p.badge}
                    </span>
                  )}

                  {/* Hover overlay */}
                  <div className="product-overlay" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/60">
                        Размер
                      </span>
                      <div className="flex gap-1.5">
                        {(p.sizes || ["S","M","L","XL"]).map((s) => {
                          const selected = (activeSize[p.id] ?? p.sizes?.[0] ?? "M") === s;
                          return (
                            <button
                              key={s}
                              onClick={() => setActiveSize((prev) => ({ ...prev, [p.id]: s }))}
                              className={`w-8 h-8 text-xs border transition-all ${
                                selected ? "border-gold text-gold bg-gold/10" : "border-foreground/30 text-foreground/70 hover:border-foreground"
                              }`}
                            >
                              {s}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <button
                      onClick={() => handleAdd(p, activeSize[p.id] ?? p.sizes?.[0] ?? "M")}
                      className="w-full bg-foreground text-background text-[11px] tracking-[0.3em] uppercase py-3.5 font-medium hover:bg-gold transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <Plus size={14} strokeWidth={2} />
                      Добавить в корзину
                    </button>
                  </div>
                </div>

                <div className="p-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-foreground leading-tight tracking-wide">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
                      {p.desc}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    {p.oldPrice && (
                      <div className="text-xs text-muted-foreground line-through mb-0.5">
                        {p.oldPrice.toLocaleString("ru-RU")} ₽
                      </div>
                    )}
                    <div className="font-serif text-xl text-gold">
                      {p.price.toLocaleString("ru-RU")} ₽
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        )}
      </div>

      {/* Product Modal */}
      {modal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
          <div className="relative bg-surface border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-foreground/60 hover:text-gold z-10">
              <X size={24} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-square bg-background">
                {getImg(modal) ? (
                  <img src={getImg(modal)!} alt={modal.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-8xl">{modal.emoji || "📦"}</div>
                )}
              </div>
              <div className="p-8 flex flex-col justify-between">
                <div>
                  {modal.badge && (
                    <span className="text-[10px] tracking-[0.3em] uppercase text-gold border border-gold/40 px-3 py-1 bg-background/40">
                      {modal.badge}
                    </span>
                  )}
                  <h2 className="font-serif text-3xl text-foreground mt-3">{modal.name}</h2>
                  <p className="mt-3 text-foreground/60 text-sm leading-relaxed">{modal.desc}</p>
                  <div className="mt-4 flex items-baseline gap-3">
                    {modal.oldPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {modal.oldPrice.toLocaleString("ru-RU")} ₽
                      </span>
                    )}
                    <span className="font-serif text-3xl text-gold">
                      {modal.price.toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/60 mb-3">Размер</p>
                  <div className="flex gap-2 mb-6">
                    {(modal.sizes || ["S","M","L","XL"]).map((s) => (
                      <button
                        key={s}
                        onClick={() => setModalSize(s)}
                        className={`w-10 h-10 text-sm border transition-all ${
                          modalSize === s ? "border-gold text-gold bg-gold/10" : "border-foreground/30 text-foreground/70 hover:border-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => { handleAdd(modal, modalSize); setModal(null); }}
                    className="w-full bg-foreground text-background text-[11px] tracking-[0.3em] uppercase py-4 font-medium hover:bg-gold transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Plus size={14} strokeWidth={2} />
                    Добавить в корзину
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
