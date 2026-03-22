import { Instagram, Phone, MapPin, Clock, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-brown text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-playfair mb-3 text-brand-gold">
              Otto Hundeh&uuml;tte
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Criação responsável de cães de raça pura desde 2019. Filhotes
              saudáveis, vacinados e com muito amor.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-brand-gold-light">
              Contato
            </h4>
            <div className="space-y-2">
              <a
                href="https://wa.me/5551999965953?text=Oi!%20Tenho%20interesse%20em%20alguns%20filhotes."
                className="text-sm hover:text-brand-gold flex items-center gap-2 transition-colors cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone size={14} aria-hidden="true" />
                (51) 99996-5953
              </a>
              <p className="text-sm flex items-center gap-2 text-white/70">
                <Mail size={14} aria-hidden="true" />
                ottohundehutte@gmail.com
              </p>
              <p className="text-sm flex items-center gap-2 text-white/70">
                <MapPin size={14} aria-hidden="true" />
                Viamão - RS
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-brand-gold-light">
              Horário
            </h4>
            <div className="space-y-1 text-sm text-white/70">
              <p className="flex items-center gap-2">
                <Clock size={14} aria-hidden="true" />
                Seg a Sex: 9h às 18h
              </p>
              <p className="pl-[22px]">Sábado: 9h às 14h</p>
              <p className="pl-[22px]">Domingo: Fechado</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-brand-gold-light">
              Redes Sociais
            </h4>
            <a
              href="https://www.instagram.com/ottocanil_/"
              className="text-sm hover:text-brand-gold flex gap-2 items-center transition-colors cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={16} aria-hidden="true" />
              @ottocanil_
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-white/50">
          <p>
            &copy; {new Date().getFullYear()} Otto Hundeh&uuml;tte. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
