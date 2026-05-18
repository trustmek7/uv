import React from 'react';
export function Footer() {
  return (
    <footer className="bg-white text-navy border-t border-slate-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Brand */}
          <div className="lg:pr-8">
            <a href="#" className="block mb-6">
              <span className="font-sans text-xl font-medium tracking-wide uppercase">
                SolarWear
              </span>
            </a>
            <p className="text-slate-500 text-sm font-light leading-relaxed mb-6">
              Diseño minimalista y protección UV avanzada para acompañarte en
              todas tus aventuras al aire libre.
            </p>
          </div>

          {/* Categorías */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-medium mb-6">
              Comprar
            </h4>
            <ul className="space-y-4">
              {[
              'Novedades',
              'Mujer',
              'Hombre',
              'Niños',
              'Conjuntos',
              'Accesorios'].
              map((item) =>
              <li key={item}>
                  <a
                  href="#"
                  className="text-slate-500 hover:text-navy transition-colors text-sm font-light">
                  
                    {item}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-medium mb-6">
              Soporte
            </h4>
            <ul className="space-y-4">
              {[
              'Preguntas Frecuentes',
              'Guía de Tallas',
              'Envíos y Devoluciones',
              'Tecnología UPF',
              'Contacto'].
              map((item) =>
              <li key={item}>
                  <a
                  href="#"
                  className="text-slate-500 hover:text-navy transition-colors text-sm font-light">
                  
                    {item}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-medium mb-6">
              Newsletter
            </h4>
            <p className="text-slate-500 text-sm font-light mb-4">
              Suscríbete para recibir novedades y acceso anticipado a
              colecciones.
            </p>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => e.preventDefault()}>
              
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="bg-transparent border-b border-slate-300 py-2 text-sm focus:outline-none focus:border-navy text-navy placeholder:text-slate-400 font-light transition-colors" />
              
              <button className="text-left text-xs uppercase tracking-widest font-medium text-navy hover:opacity-70 transition-opacity mt-2">
                Suscribirse &rarr;
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-400 text-xs font-light">
            © 2026 SolarWear Perú. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-slate-400 font-light">
            <a href="#" className="hover:text-navy transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-navy transition-colors">
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>);

}