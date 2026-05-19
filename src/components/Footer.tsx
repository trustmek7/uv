import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';
import { toast } from 'sonner';

const INSTAGRAM_URL = 'https://www.instagram.com/solarwear.peru/';
const FACEBOOK_URL = 'https://www.facebook.com/solarwear.peru';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    toast.success('¡Suscripción confirmada! Pronto recibirás nuestras novedades.', {
      description: 'Revisa tu bandeja de entrada.',
      duration: 5000,
    });
  };

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
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-navy transition-colors"
                aria-label="Instagram"
              >
                <Instagram strokeWidth={1.5} className="w-5 h-5" />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-navy transition-colors"
                aria-label="Facebook"
              >
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
                { label: 'Accesorios', href: '/catalogo?categoria=Accesorios' },
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
              {[
                { label: 'Preguntas Frecuentes', href: '/preguntas-frecuentes' },
                { label: 'Guía de Tallas', href: '/guia-de-tallas' },
                { label: 'Envíos y Devoluciones', href: '/envios-y-devoluciones' },
                { label: 'Tecnología UPF', href: '/tecnologia-upf' },
                { label: 'Contacto', href: '/contacto' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-slate-400 hover:text-navy transition-colors text-sm font-light">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-medium mb-6">Newsletter</h4>
            <p className="text-slate-400 text-sm font-light mb-4">
              Suscríbete para recibir novedades y acceso anticipado a colecciones.
            </p>

            {subscribed ? (
              <div className="border-b border-green-400 py-2">
                <p className="text-sm text-green-600 font-light">¡Suscripción confirmada!</p>
              </div>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  required
                  className="bg-transparent border-b border-slate-200 py-2 text-sm focus:outline-none focus:border-navy text-navy placeholder:text-slate-300 font-light transition-colors"
                />
                <button
                  type="submit"
                  className="text-left text-xs uppercase tracking-widest font-medium text-navy hover:opacity-70 transition-opacity mt-2"
                >
                  Suscribirse →
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-400 text-xs font-light">© 2026 SolarWear Perú. Todos los derechos reservados.</p>
          <div className="flex gap-6 text-xs text-slate-400 font-light">
            <Link to="/privacidad" className="hover:text-navy transition-colors">Privacidad</Link>
            <Link to="/terminos" className="hover:text-navy transition-colors">Términos</Link>
            <Link to="/login" className="hover:text-navy transition-colors">Mi Cuenta</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
