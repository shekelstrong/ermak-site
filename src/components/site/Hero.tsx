import { useEffect, useRef } from "react";
import heroImg from "@/assets/hero-steppe.jpg";

export const Hero = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current) return;
      const y = window.scrollY;
      bgRef.current.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(1.08)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform animate-ken-burns"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Vignette + gradient */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
      <div className="absolute inset-0 bg-[var(--gradient-vignette)]" />

      {/* Subtle ornamental corners */}
      <div className="hidden md:block absolute top-28 left-10 text-gold/30 text-xs tracking-[0.4em] [writing-mode:vertical-rl] rotate-180">
        EST · MMXXVI · DON
      </div>
      <div className="hidden md:block absolute top-28 right-10 text-gold/30 text-xs tracking-[0.4em] [writing-mode:vertical-rl]">
        ВЕЧНОЕ НАСЛЕДИЕ
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="opacity-0 animate-fade-in-slow" style={{ animationDelay: "0.2s" }}>
          <span className="inline-block text-gold/80 text-[10px] md:text-xs tracking-[0.5em] uppercase mb-6 md:mb-8">
            ✦ Коллекция · 2026 ✦
          </span>
        </div>

        <h1
          className="font-display text-[18vw] md:text-[15vw] lg:text-[180px] leading-[0.9] text-foreground opacity-0 animate-fade-in"
          style={{ animationDelay: "0.4s", textShadow: "0 0 60px hsl(0 0% 0% / 0.6)" }}
        >
          ЕРМАКЪ
        </h1>

        <div
          className="mt-6 md:mt-8 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.9s" }}
        >
          <div className="divider-ornate w-72 md:w-96 mx-auto mb-6">
            <span className="text-base">☦</span>
          </div>
          <p className="font-serif italic text-lg md:text-2xl text-foreground/90 tracking-wide">
            Вчера. Сегодня. Вечно.
          </p>
        </div>

        <div
          className="mt-10 md:mt-14 flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in"
          style={{ animationDelay: "1.3s" }}
        >
          <a
            href="#collection"
            className="group relative px-10 py-4 bg-foreground text-background text-xs tracking-[0.3em] uppercase font-medium overflow-hidden transition-all duration-500 hover:bg-gold hover:shadow-[var(--shadow-gold)]"
          >
            <span className="relative z-10">В магазин</span>
          </a>
          <a
            href="#philosophy"
            className="px-10 py-4 border border-foreground/40 text-foreground text-xs tracking-[0.3em] uppercase font-medium hover:border-gold hover:text-gold transition-all duration-500"
          >
            Смотреть коллекцию
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 opacity-70">
        <span className="text-[10px] tracking-[0.4em] text-foreground/60 uppercase">Листать</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-foreground/60 to-transparent relative overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-3 bg-gold animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};
