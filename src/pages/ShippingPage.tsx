import React from 'react';
import { Truck, RefreshCw, PackageCheck, AlertCircle } from 'lucide-react';

const shipping = [
  {
    zone: 'Lima Metropolitana',
    time: '1–3 días hábiles',
    cost: 'Gratis en pedidos desde S/ 99 · S/ 10 en pedidos menores',
  },
  {
    zone: 'Provincias (principales ciudades)',
    time: '3–5 días hábiles',
    cost: 'S/ 15 – S/ 20 según destino',
  },
  {
    zone: 'Zonas alejadas / rurales',
    time: '5–10 días hábiles',
    cost: 'S/ 20 – S/ 30 según destino',
  },
];

const returnSteps = [
  'Contacta con nuestro equipo por WhatsApp (+51 986 782 148) indicando tu número de pedido y el motivo.',
  'Te enviaremos las instrucciones para la devolución del producto.',
  'Envía el producto sin usar, con etiquetas y en su empaque original dentro de los 15 días desde la recepción.',
  'Una vez recibido y validado, procesamos el cambio o reembolso en un plazo de 5 días hábiles.',
];

const noReturn = [
  'Prendas de baño y ropa interior por higiene.',
  'Productos usados, lavados o sin etiquetas.',
  'Productos dañados por mal uso.',
  'Pedidos fuera del plazo de 15 días calendario.',
];

export function ShippingPage() {
  return (
    <div className="pt-[104px]">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Soporte</p>
          <h1 className="text-4xl font-light text-navy mb-4">Envíos y Devoluciones</h1>
          <p className="text-sm text-slate-400 font-light">
            Todo lo que necesitas saber sobre tiempos de entrega y nuestra política de cambios.
          </p>
        </div>

        {/* Envíos */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Truck strokeWidth={1.5} className="w-5 h-5 text-navy" />
            <h2 className="text-lg font-light text-navy">Envíos</h2>
          </div>

          <div className="space-y-4">
            {shipping.map((s) => (
              <div key={s.zone} className="p-6 border border-slate-100 rounded-sm">
                <p className="text-sm font-medium text-navy mb-1">{s.zone}</p>
                <p className="text-xs text-slate-400 font-light mb-2">{s.time}</p>
                <p className="text-sm text-slate-500 font-light">{s.cost}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 rounded-sm">
            <PackageCheck strokeWidth={1.5} className="w-4 h-4 text-navy mt-0.5 flex-shrink-0" />
            <p className="text-xs text-slate-600 font-light">
              Los pedidos realizados antes de las <strong>12:00 pm</strong> (días hábiles) se procesan el mismo día.
              Recibirás un correo con el número de seguimiento una vez despachado.
            </p>
          </div>
        </div>

        {/* Devoluciones */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <RefreshCw strokeWidth={1.5} className="w-5 h-5 text-navy" />
            <h2 className="text-lg font-light text-navy">Cambios y Devoluciones</h2>
          </div>

          <p className="text-sm text-slate-500 font-light mb-6 leading-relaxed">
            Aceptamos cambios y devoluciones dentro de los <strong>15 días calendario</strong> desde
            la recepción del pedido, cumpliendo las siguientes condiciones:
          </p>

          <ol className="space-y-4 mb-10">
            {returnSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="w-6 h-6 rounded-full bg-navy text-white text-xs font-medium flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-slate-500 font-light leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>

          <div className="border-t border-slate-100 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle strokeWidth={1.5} className="w-4 h-4 text-slate-400" />
              <h3 className="text-xs uppercase tracking-widest font-medium text-slate-400">
                No aplica devolución en
              </h3>
            </div>
            <ul className="space-y-2">
              {noReturn.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-500 font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-8 bg-slate-50 rounded-sm text-center">
          <p className="text-sm text-navy font-light mb-4">¿Tienes algún problema con tu pedido?</p>
          <a
            href="https://wa.me/51986782148"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs uppercase tracking-widest font-medium text-navy border-b border-navy pb-1 hover:opacity-70 transition-opacity"
          >
            Contactar por WhatsApp →
          </a>
        </div>
      </section>
    </div>
  );
}
