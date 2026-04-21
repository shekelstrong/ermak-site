import lifestyle from "@/assets/lifestyle-field.jpg";

export const Philosophy = () => {
  return (
    <section
      id="philosophy"
      className="relative py-24 md:py-40 overflow-hidden"
    >
      {/* Watermark cross */}
      <div
        aria-hidden
        className="hidden md:block absolute -right-20 top-1/2 -translate-y-1/2 text-[28rem] md:text-[42rem] text-gold/[0.04] font-serif select-none pointer-events-none leading-none overflow-hidden"
      >
        ☦
      </div>

      <div className="container-luxe grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <div className="lg:col-span-5 reveal">
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={lifestyle}
              alt="Атмосфера ЕРМАКЪ — мужчина в чёрной футболке в пшеничном поле на закате"
              loading="lazy"
              width={1080}
              height={1440}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] tracking-[0.3em] text-foreground/70 uppercase">
              <span>Поле · Степь</span>
              <span>№ 001</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="lg:col-span-7 reveal" style={{ transitionDelay: "150ms" }}>
          <span className="text-gold text-[10px] tracking-[0.5em] uppercase block mb-6">
            ✦ Философия Бренда
          </span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground mb-10 text-balance">
            Мы не следуем моде —<br />
            <span className="italic text-gold">мы храним Традицию.</span>
          </h2>
          <div className="space-y-6 max-w-2xl text-base md:text-lg text-foreground/70 leading-relaxed font-light">
            <p>
              Новый фундамент — право на жизнь, добытое силой. Но любовь здесь
              ещё выше. Каждая нить нашей ткани — это память о земле, о крови,
              о вере отцов.
            </p>
            <p className="text-foreground/50 italic font-serif text-xl">
              «Помни, кто ты есть. Помни, откуда твой род.»
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-md">
            {[
              { num: "100%", label: "Хлопок" },
              { num: "RU", label: "Производство" },
              { num: "MMXXVI", label: "Год основания" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-serif text-2xl text-gold mb-1">{s.num}</div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
