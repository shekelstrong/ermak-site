import { MessageCircle, X, Send } from "lucide-react";
import { useState } from "react";

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Popup */}
      {open && (
        <div
          className="fixed z-[999] bottom-[170px] right-5 w-[320px] max-w-[calc(100vw-40px)] rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-fade-in"
          style={{
            background: "rgba(15,15,15,0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="p-6 text-center">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-foreground/40 hover:text-gold transition-colors"
            >
              <X size={18} />
            </button>
            <div className="text-4xl mb-3">💬</div>
            <h4 className="font-serif text-xl text-foreground mb-2">Остались вопросы?</h4>
            <p className="text-foreground/50 text-sm mb-5">Напишите нам — ответим в ближайшее время</p>
            <a
              href="https://t.me/ermakbrand"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2AABEE] hover:bg-[#229ED9] text-white text-sm px-6 py-3 rounded-xl transition-colors w-full justify-center"
            >
              <Send size={16} />
              Написать в Telegram
            </a>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed z-[999] bottom-[90px] right-5 w-14 h-14 rounded-full bg-gold/90 hover:bg-gold text-background shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Чат"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
};
