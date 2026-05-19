import React from 'react';
import { Shield, Sun, Droplets, Thermometer } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Barrera UVA y UVB',
    desc: 'El tejido bloquea más del 98% de la radiación ultravioleta, tanto los rayos UVA (envejecimiento prematuro) como UVB (quemaduras solares). Certificación internacional AATCC 183 / AS/NZS 4399.',
  },
  {
    icon: Droplets,
    title: 'Secado Rápido',
    desc: 'Las fibras técnicas evacúan la humedad hacia el exterior de la tela, manteniéndote seco y fresco durante actividades al aire libre. Ideal para deportes acuáticos y días de calor intenso.',
  },
  {
    icon: Thermometer,
    title: 'Regulación Térmica',
    desc: 'El tejido refleja parte de la radiación solar y permite la circulación del aire, reduciendo la sensación de calor hasta 3°C en comparación con tejidos convencionales.',
  },
  {
    icon: Sun,
    title: 'Durabilidad UV',
    desc: 'La protección UPF se mantiene por más de 30 lavados bajo cuidado correcto. A diferencia del bloqueador solar que se aplica sobre la piel, la protección de la tela no se pierde con el sudor ni el agua.',
  },
];

const comparison = [
  { label: 'Camiseta de algodón blanco', upf: '5–8', blocks: '80–88%' },
  { label: 'Camiseta de algodón oscuro', upf: '10–15', blocks: '90–93%' },
  { label: 'Tela técnica estándar', upf: '20–30', blocks: '95–97%' },
  { label: 'SolarWear UPF 50+', upf: '50+', blocks: '+98%', highlight: true },
];

export function UPFTechPage() {
  return (
    <div className="pt-[104px]">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Tecnología</p>
          <h1 className="text-4xl font-light text-navy mb-4">Tecnología UPF 50+</h1>
          <p className="text-sm text-slate-400 font-light leading-relaxed max-w-xl">
            UPF significa <em>Ultraviolet Protection Factor</em>: el estándar internacional que mide
            la capacidad de un tejido para bloquear la radiación solar ultravioleta.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-5">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0">
                <Icon strokeWidth={1.5} className="w-5 h-5 text-navy" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-navy mb-2">{title}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mb-16">
          <h2 className="text-xs uppercase tracking-widest font-medium text-navy mb-6">
            Comparativa de Protección
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 pr-6 text-xs uppercase tracking-widest font-medium text-slate-400">Prenda</th>
                  <th className="text-left py-3 pr-6 text-xs uppercase tracking-widest font-medium text-slate-400">Factor UPF</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-medium text-slate-400">Bloqueo UV</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr
                    key={row.label}
                    className={`border-b ${row.highlight ? 'bg-navy text-white' : 'border-slate-50'}`}
                  >
                    <td className={`py-4 pr-6 font-light ${row.highlight ? 'text-white font-medium' : 'text-slate-600'}`}>{row.label}</td>
                    <td className={`py-4 pr-6 font-medium ${row.highlight ? 'text-white' : 'text-navy'}`}>{row.upf}</td>
                    <td className={`py-4 font-light ${row.highlight ? 'text-white' : 'text-slate-600'}`}>{row.blocks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Care instructions */}
        <div className="border-t border-slate-100 pt-12">
          <h2 className="text-xs uppercase tracking-widest font-medium text-navy mb-6">
            Cuidado de la Prenda
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              '✓  Lavar a mano o máquina en ciclo delicado',
              '✓  Agua fría (máximo 30°C)',
              '✓  No usar blanqueadores ni cloro',
              '✓  Secar a la sombra o en tendedero',
              '✗  No usar secadora',
              '✗  No planchar directamente sobre la tela técnica',
            ].map((item) => (
              <p key={item} className={`text-sm font-light ${item.startsWith('✗') ? 'text-slate-400' : 'text-slate-600'}`}>
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
