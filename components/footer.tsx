import { Instagram, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#4A290D] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 md:justify-items-center justify-center">
          <div>
            <h3 className="text-lg font-semibold mb-2">Contato</h3>
            <p className="text-sm">Email: maluc.schwingel@gmail.com</p>
            <a
              href="https://wa.me/5551999965953?text=Oi!%20Tenho%20interesse%20em%20alguns%20filhotes."
              className="ext-sm hover:underline flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone size={16} />
              (51) 99943-7523
            </a>
            <p className="text-sm">Porto Alegre - RS</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Horário</h3>
            <p className="text-sm">Segunda à Sexta: 9h às 18h</p>
            <p className="text-sm">Sábado: 9h às 14h</p>
            <p className="text-sm">Domingo: Fechado</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Redes Sociais</h3>
            <a
              href="https://www.instagram.com/ottocanil_/"
              className="text-sm hover:underline flex gap-2 items-center"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={16}></Instagram>
              Instagram
            </a>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Otto Hundehütte. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
