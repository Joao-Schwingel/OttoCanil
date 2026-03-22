'use client';

export function ScrollToBreeds() {
  return (
    <button
      type="button"
      onClick={() => {
        const el = document.getElementById('racas');

        if (!el) {
          console.log('Elemento não encontrado');
          return;
        }

        console.log('Offset:', el.offsetTop);

        window.scrollTo({
          top: el.offsetTop,
          behavior: 'smooth'
        });
      }}
      className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full text-base font-semibold transition-colors cursor-pointer"
    >
      Ver Raças Disponíveis
    </button>
  );
}
