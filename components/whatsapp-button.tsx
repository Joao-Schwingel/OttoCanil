import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5551999965953?text=Ol%C3%A1!%20Tenho%20interesse%20em%20filhotes.%20Podem%20me%20ajudar%3F"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-[box-shadow,transform] duration-300 cursor-pointer group"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle className="w-6 h-6" aria-hidden="true" />
      <span className="text-sm font-semibold hidden sm:inline">
        Fale Conosco
      </span>
    </a>
  );
}
