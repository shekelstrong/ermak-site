import flatlay from "@/assets/lookbook-flatlay.jpg";
import detail from "@/assets/lookbook-detail.jpg";
import lifestyle from "@/assets/lifestyle-field.jpg";

export const Lookbook = () => {
  return (
    <section id="lookbook" className="relative py-24 md:py-32">
      <div className="container-luxe">
        <div className="text-center mb-16 md:mb-24 reveal">
          <span className="text-gold text-[10px] tracking-[0.5em] uppercase block mb-6">
            ✦ Лукбукъ · Атмосфера
          </span>
          <h2 className="font-serif text-5xl md:text-7xl text-foreground leading-tight max-w-4xl mx-auto text-balance">
            Детали, в которых
            <span className="italic text-gold"> живёт душа.</span>
          </h2>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[120px] md:auto-rows-[180px]">
          {/* Large flatlay */}
          <figure className="col-span-12 md:col-span-8 row-span-3 md:row-span-4 relative overflow-hidden group reveal">
            <img
              src={flatlay}
              alt="Флэтлей: книга, карманные часы, пшеница, крест и футболка"
              loading="lazy"
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxury)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <figcaption className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">
                  Реликвия · 01
                </div>
                <div className="font-serif text-2xl md:text-3xl text-foreground">
                  Память отцов
                </div>
              </div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-foreground/50">
                Книги · Часы · Пшеница
              </div>
            </figcaption>
          </figure>

          {/* Detail crop */}
          <figure className="col-span-12 md:col-span-4 row-span-3 md:row-span-2 relative overflow-hidden group reveal" style={{ transitionDelay: "150ms" }}>
            <img
              src={detail}
              alt="Деталь: золотая вышивка православного креста на чёрной ткани"
              loading="lazy"
              width={1200}
              height={1200}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxury)] group-hover:scale-105"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-gold/0 group-hover:ring-gold/40 transition-all duration-500" />
            <figcaption className="absolute bottom-4 left-4 text-[10px] tracking-[0.3em] uppercase text-foreground/80">
              Вышивка · Macro
            </figcaption>
          </figure>

          {/* Quote block */}
          <div className="col-span-12 md:col-span-4 row-span-3 md:row-span-2 bg-surface border border-border/60 p-8 md:p-10 flex flex-col justify-between reveal" style={{ transitionDelay: "250ms" }}>
            <span className="font-serif text-5xl text-gold leading-none">«</span>
            <p className="font-serif italic text-lg md:text-xl text-foreground/85 leading-snug">
              Земля помнит шаг каждого, кто прошёл по ней с честью.
            </p>
            <div className="flex items-center justify-between text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              <span>М. Шолоховъ</span>
              <span>—</span>
              <span>Тихiй Донъ</span>
            </div>
          </div>

          {/* Lifestyle */}
          <figure className="col-span-12 md:col-span-8 row-span-3 md:row-span-3 relative overflow-hidden group reveal" style={{ transitionDelay: "350ms" }}>
            <img
              src={lifestyle}
              alt="Лайфстайл: мужчина в коллекции ЕРМАКЪ в поле на закате"
              loading="lazy"
              width={1080}
              height={1920}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxury)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
            <figcaption className="absolute top-6 left-6 max-w-xs">
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">
                Кампания · Степь
              </div>
              <div className="font-serif text-3xl md:text-4xl text-foreground leading-tight">
                Где небо встречает<br />землю предков.
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};
