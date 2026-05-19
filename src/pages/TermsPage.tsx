import React from 'react';
import { WHATSAPP_URL } from '../data/constants';

const sections = [
  {
    title: 'Uso de la Tienda',
    content: `Al acceder y usar SolarWear Perú aceptas estos términos. La tienda está destinada a personas mayores de 18 años o menores bajo supervisión de un adulto. Queda prohibido el uso de la plataforma para actividades fraudulentas, ilegales o que perjudiquen a terceros.`,
  },
  {
    title: 'Pedidos y Precios',
    content: `Los precios mostrados incluyen IGV y están expresados en soles peruanos (S/). Nos reservamos el derecho de modificar precios sin previo aviso. Un pedido se considera confirmado únicamente cuando recibes la confirmación por correo electrónico. En caso de error de precio, nos comunicaremos contigo antes de procesar el pedido.`,
  },
  {
    title: 'Disponibilidad de Productos',
    content: `La disponibilidad de stock se actualiza en tiempo real. Si un producto no está disponible luego de confirmar tu pedido, te contactaremos para ofrecerte una alternativa o realizar el reembolso correspondiente.`,
  },
  {
    title: 'Medios de Pago',
    content: `Aceptamos los métodos de pago indicados en el proceso de checkout. Todos los pagos son procesados de forma segura. SolarWear Perú no almacena datos de tarjetas de crédito o débito.`,
  },
  {
    title: 'Propiedad Intelectual',
    content: `Todo el contenido de la tienda (imágenes, textos, logotipos, diseños) es propiedad de SolarWear Perú o de sus proveedores y está protegido por las leyes de propiedad intelectual. Queda prohibida su reproducción o uso sin autorización expresa.`,
  },
  {
    title: 'Limitación de Responsabilidad',
    content: `SolarWear Perú no se responsabiliza por daños derivados del uso incorrecto de los productos, demoras en la entrega causadas por el courier o fuerza mayor, ni por interrupciones temporales del servicio online.`,
  },
  {
    title: 'Ley Aplicable',
    content: `Estos términos se rigen por las leyes de la República del Perú. Cualquier controversia será sometida a los tribunales competentes de la ciudad de Arequipa.`,
  },
];

export function TermsPage() {
  return (
    <div className="pt-[104px]">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Legal</p>
          <h1 className="text-4xl font-light text-navy mb-4">Términos y Condiciones</h1>
          <p className="text-sm text-slate-400 font-light">
            Última actualización: mayo de 2026
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((sec) => (
            <div key={sec.title} className="border-b border-slate-100 pb-10">
              <h2 className="text-sm font-medium text-navy mb-4">{sec.title}</h2>
              <p className="text-sm text-slate-500 font-light leading-relaxed break-words">{sec.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-slate-50 rounded-sm text-center">
          <p className="text-sm text-navy font-light mb-4">¿Tienes dudas sobre nuestros términos?</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs uppercase tracking-widest font-medium text-navy border-b border-navy pb-1 hover:opacity-70 transition-opacity"
          >
            Contáctanos →
          </a>
        </div>
      </section>
    </div>
  );
}
