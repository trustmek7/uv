import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from './BrandIcons';
import { INSTAGRAM_URL, FACEBOOK_URL } from '../data/constants';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [modalEmail, setModalEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setModalEmail(trimmed);
    setShowModal(true);
    setSubscribed(true);
    setEmail('');
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
    <footer className="bg-white text-navy border-t border-slate-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:pr-8">
            <Link to="/" className="block mb-6">
              <img src="/img/SolarWear_logo.jpeg" alt="SolarWear" className="h-10 w-auto object-contain" />
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
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-navy transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Comprar */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-medium mb-6">Comprar</h4>
            <ul className="space-y-4">
              {[
                { label: 'Novedades', href: '/catalogo?orden=nuevos' },
                { label: 'Ofertas', href: '/catalogo?oferta=true' },
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
          <p className="text-slate-400 text-xs font-light">© 2026 SolarWear Arequipa. Todos los derechos reservados.</p>
          <div className="flex gap-6 text-xs text-slate-400 font-light">
            <Link to="/privacidad" className="hover:text-navy transition-colors">Privacidad</Link>
            <Link to="/terminos" className="hover:text-navy transition-colors">Términos</Link>
            <Link to="/login" className="hover:text-navy transition-colors">Mi Cuenta</Link>
          </div>
        </div>
      </div>
    </footer>

    {/* Fake email confirmation modal */}
    {showModal && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        onClick={handleCloseModal}
      >
        <div
          className="bg-white rounded-sm max-w-sm w-full shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Email header */}
          <div className="bg-navy px-6 py-5 flex items-center justify-between">
            <img src="/img/SolarWear_logo.jpeg" alt="SolarWear" className="h-8 w-auto object-contain brightness-0 invert" />
            <button onClick={handleCloseModal} className="text-white/70 hover:text-white transition-colors">
              <X strokeWidth={1.5} className="w-5 h-5" />
            </button>
          </div>

          {/* Email body */}
          <div className="px-6 py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="text-xl font-light text-navy mb-2">¡Bienvenido/a a SolarWear!</h2>
            <p className="text-sm text-slate-400 font-light mb-4">
              Tu suscripción ha sido confirmada para:
            </p>
            <p className="text-sm font-medium text-navy bg-slate-50 rounded-sm px-4 py-2 mb-6 break-all">
              {modalEmail}
            </p>
            <p className="text-xs text-slate-400 font-light leading-relaxed mb-8">
              Pronto recibirás nuestras novedades, colecciones exclusivas y acceso anticipado a ofertas especiales. ¡Gracias por unirte a la familia SolarWear!
            </p>
            <button
              onClick={handleCloseModal}
              className="w-full py-3 bg-navy text-white text-xs uppercase tracking-widest font-medium hover:bg-navy/90 transition-colors rounded-sm"
            >
              Cerrar
            </button>
          </div>

          {/* Email footer */}
          <div className="px-6 py-4 border-t border-slate-100 text-center">
            <p className="text-[10px] text-slate-300 font-light">© 2026 SolarWear Arequipa · Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
