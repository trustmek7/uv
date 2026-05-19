import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { WHATSAPP_URL } from '../data/constants';

const faqs = [
  {
    question: '¿Qué es la protección UPF 50+?',
    answer:
      'El UPF (Ultraviolet Protection Factor) mide cuánta radiación UV bloquea una tela. UPF 50+ bloquea más del 98% de los rayos UVA y UVB, ofreciendo la máxima protección certificada. Es el estándar más alto de protección solar en indumentaria.',
  },
  {
    question: '¿Cómo sé cuál es mi talla?',
    answer:
      'Puedes consultar nuestra Guía de Tallas detallada en la sección de soporte. En general, recomendamos medir el contorno de pecho, cintura y cadera, y compararlo con la tabla de medidas de cada producto. Si estás entre dos tallas, te recomendamos elegir la talla mayor para mayor comodidad.',
  },
  {
    question: '¿Cuánto tiempo tarda el envío?',
    answer:
      'Para Arequipa ciudad, el envío tarda entre 1 y 2 días hábiles. Para otras provincias y ciudades, entre 3 y 7 días hábiles dependiendo del destino. Los pedidos realizados antes de las 12:00 pm se procesan el mismo día.',
  },
  {
    question: '¿Puedo hacer devoluciones?',
    answer:
      'Sí. Aceptamos devoluciones dentro de los 15 días calendario desde la recepción del pedido, siempre que el producto esté sin usar, con etiquetas originales y en su empaque original. Las prendas de baño no admiten cambios por higiene.',
  },
  {
    question: '¿La protección UV se mantiene tras los lavados?',
    answer:
      'Nuestras telas están diseñadas para mantener su nivel de protección UPF 50+ por más de 30 lavados, siempre que se sigan las instrucciones de cuidado (lavado a mano o máquina en ciclo delicado, agua fría, sin cloro). La exposición prolongada al sol y el uso intensivo pueden reducir gradualmente la eficacia.',
  },
  {
    question: '¿Puedo usar la ropa UV en la playa?',
    answer:
      'Por supuesto. Toda nuestra línea es apta para uso en playa, piscina y actividades acuáticas. Los tejidos de secado rápido se adaptan perfectamente al ambiente marino. Para ropa de baño específica, visita nuestra sección Playa.',
  },
  {
    question: '¿Tienen tienda física?',
    answer:
      'Actualmente operamos online y a través de distribuidores autorizados en Arequipa. Para consultas sobre puntos de venta, contáctanos por WhatsApp al +51 986 782 148.',
  },
  {
    question: '¿Cómo puedo rastrear mi pedido?',
    answer:
      'Una vez despachado tu pedido, recibirás un correo con el número de seguimiento y el enlace al courier correspondiente. También puedes consultar el estado de tu pedido iniciando sesión en tu cuenta.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 py-6">
      <button
        className="flex w-full items-start justify-between text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-medium text-navy leading-relaxed">{question}</span>
        {open ? (
          <ChevronUp strokeWidth={1.5} className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
        ) : (
          <ChevronDown strokeWidth={1.5} className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
        )}
      </button>
      {open && (
        <p className="mt-4 text-sm text-slate-500 font-light leading-relaxed pr-8">{answer}</p>
      )}
    </div>
  );
}

export function FAQPage() {
  return (
    <div className="pt-[104px]">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Soporte</p>
          <h1 className="text-4xl font-light text-navy mb-4">Preguntas Frecuentes</h1>
          <p className="text-sm text-slate-400 font-light">
            Todo lo que necesitas saber sobre nuestros productos y servicios.
          </p>
        </div>

        <div>
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="mt-16 p-8 bg-slate-50 rounded-sm text-center">
          <p className="text-sm text-navy font-light mb-4">¿No encontraste lo que buscabas?</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs uppercase tracking-widest font-medium text-navy border-b border-navy pb-1 hover:opacity-70 transition-opacity"
          >
            Escríbenos por WhatsApp →
          </a>
        </div>
      </section>
    </div>
  );
}
