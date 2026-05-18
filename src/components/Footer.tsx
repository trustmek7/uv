import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white text-navy border-t border-slate-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Brand */}
          <div className="lg:pr-8">
            <Link to="/" className="block mb-6">
              <span className="font-sans text-xl font-medium tracking-wide uppercase">SolarWear</span>
            </Link>
            <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
              Diseño minimalista y protección UV avanzada para acompañarte en todas tus aventuras al aire libre.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-navy transition-colors">
                <Instagram strokeWidth={1.5} className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-navy transition-colors">
                <Facebook strokeWidth={1.5} className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Comprar */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-medium mb-6">Comprar</h4>
            <ul className="space-y-4">
              {[
                { label: 'Novedades', href: '/catalogo?orden=nuevos' },
                { label: 'Mujer', href: '/catalogo?genero=Mujer' },
                { label: 'Hombre', href: '/catalogo?genero=Hombre' },
                { label: 'Niños', href: '/catalogo?genero=Niños' },
                { label: 'Ropa de Baño', href: '/catalogo?actividad=Playa' },
                { label: 'Accesorios', href: '/catalogo?categoria=Gorras' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-slate-400 hover:text-navy transition-colors text-sm font-light">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-medium mb-6">Soporte</h4>
            <ul className="space-y-4">
              {['Preguntas Frecuentes', 'Guía de Tallas', 'Envíos y Devoluciones', 'Tecnología UPF', 'Contacto'].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-navy transition-colors text-sm font-light">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-medium mb-6">Newsletter</h4>
            <p className="text-slate-400 text-sm font-light mb-4">
              Suscríbete para recibir novedades y acceso anticipado a colecciones.
            </p>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="bg-transparent border-b border-slate-200 py-2 text-sm focus:outline-none focus:border-navy text-navy placeholder:text-slate-300 font-light transition-colors"
              />
              <button className="text-left text-xs uppercase tracking-widest font-medium text-navy hover:opacity-70 transition-opacity mt-2">
                Suscribirse →
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-400 text-xs font-light">© 2026 SolarWear Perú. Todos los derechos reservados.</p>
          <div className="flex gap-6 text-xs text-slate-400 font-light">
            <a href="#" className="hover:text-navy transition-colors">Privacidad</a>
            <a href="#" className="hover:text-navy transition-colors">Términos</a>
            <Link to="/login" className="hover:text-navy transition-colors">Mi Cuenta</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
