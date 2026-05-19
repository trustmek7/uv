import React from 'react';
import { MessageCircle, Instagram, Facebook, Clock, MapPin } from 'lucide-react';

const WHATSAPP_NUMBER = '51986782148';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function ContactPage() {
  return (
    <div className="pt-[104px]">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Soporte</p>
          <h1 className="text-4xl font-light text-navy mb-4">Contacto</h1>
          <p className="text-sm text-slate-400 font-light">
            Estamos disponibles para ayudarte con cualquier consulta sobre productos, pedidos o envíos.
          </p>
        </div>

        {/* WhatsApp — acción principal */}
        <div className="mb-10">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-5 p-8 bg-[#25D366] rounded-sm hover:bg-[#1ebe5c] transition-colors group"
          >
            <MessageCircle strokeWidth={1.5} className="w-10 h-10 text-white flex-shrink-0" />
            <div>
              <p className="text-white font-medium text-lg">Escríbenos por WhatsApp</p>
              <p className="text-white/80 text-sm font-light mt-0.5">+51 986 782 148</p>
              <p className="text-white/70 text-xs mt-2 font-light">
                Respondemos en minutos en horario de atención
              </p>
            </div>
          </a>
        </div>

        {/* Info adicional */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="p-6 border border-slate-100 rounded-sm">
            <div className="flex items-center gap-3 mb-3">
              <Clock strokeWidth={1.5} className="w-4 h-4 text-navy" />
              <h3 className="text-xs uppercase tracking-widest font-medium text-navy">Horario de Atención</h3>
            </div>
            <p className="text-sm text-slate-500 font-light">Lunes a Viernes: 9:00 am – 6:00 pm</p>
            <p className="text-sm text-slate-500 font-light">Sábados: 9:00 am – 1:00 pm</p>
            <p className="text-sm text-slate-400 font-light mt-2">Domingos y feriados: cerrado</p>
          </div>

          <div className="p-6 border border-slate-100 rounded-sm">
            <div className="flex items-center gap-3 mb-3">
              <MapPin strokeWidth={1.5} className="w-4 h-4 text-navy" />
              <h3 className="text-xs uppercase tracking-widest font-medium text-navy">Ubicación</h3>
            </div>
            <p className="text-sm text-slate-500 font-light">Lima, Perú</p>
            <p className="text-sm text-slate-400 font-light mt-2">
              Operamos únicamente online y a través de distribuidores autorizados.
            </p>
          </div>
        </div>

        {/* Redes sociales */}
        <div className="border-t border-slate-100 pt-10">
          <h2 className="text-xs uppercase tracking-widest font-medium text-navy mb-6">
            Síguenos en Redes
          </h2>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/solarwear.peru/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 border border-slate-200 rounded-sm text-sm text-slate-600 hover:border-navy hover:text-navy transition-colors font-light"
            >
              <Instagram strokeWidth={1.5} className="w-4 h-4" />
              Instagram
            </a>
            <a
              href="https://www.facebook.com/solarwear.peru"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 border border-slate-200 rounded-sm text-sm text-slate-600 hover:border-navy hover:text-navy transition-colors font-light"
            >
              <Facebook strokeWidth={1.5} className="w-4 h-4" />
              Facebook
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
