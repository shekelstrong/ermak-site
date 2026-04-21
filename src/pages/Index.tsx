import { useEffect } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Philosophy } from "@/components/site/Philosophy";
import { Collection } from "@/components/site/Collection";
import { Lookbook } from "@/components/site/Lookbook";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { ChatWidget } from "@/components/site/ChatWidget";
import { useReveal } from "@/hooks/useReveal";

const Index = () => {
  useReveal();

  useEffect(() => {
    document.title = "ЕРМАК — Премиум одежда. Вчера. Сегодня. Вечно.";
    const meta = document.querySelector('meta[name="description"]');
    const desc =
      "ЕРМАК — премиум стритвер, вдохновлённый казачьей культурой и православной традицией. Коллекция футболок ручной работы из России.";
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <Collection />
        <Lookbook />
      </main>
      <Footer />
      <CartDrawer />
      <ChatWidget />
    </div>
  );
};

export default Index;
