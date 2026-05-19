import React, { useState } from 'react';
import { WHATSAPP_URL } from '../data/constants';

const categories = ['Polos / Camisetas', 'Gorras', 'Guantes'] as const;
type Category = typeof categories[number];

const tables: Record<Category, { headers: string[]; rows: string[][] }> = {
  'Polos / Camisetas': {
    headers: ['Talla', 'Pecho (cm)', 'Cintura (cm)', 'Largo (cm)'],
    rows: [
      ['XS', '82–86', '68–72', '65'],
      ['S', '87–91', '73–77', '67'],
      ['M', '92–96', '78–82', '69'],
      ['L', '97–101', '83–87', '71'],
      ['XL', '102–106', '88–92', '73'],
    ],
  },
  Gorras: {
    headers: ['Talla', 'Circunferencia cabeza (cm)', 'Equivalencia'],
    rows: [
      ['S', '54–55', 'Pequeño'],
      ['M', '56–57', 'Mediano'],
      ['L', '58–60', 'Grande'],
    ],
  },
  Guantes: {
    headers: ['Talla', 'Circunferencia mano (cm)', 'Largo mano (cm)'],
    rows: [
      ['S', '17–18', '17'],
      ['M', '19–20', '18'],
      ['L', '21–22', '19'],
      ['XL', '23–24', '20'],
    ],
  },
};

const tips = [
  'Mide siempre sobre ropa ajustada o directamente sobre la piel.',
  'Usa una cinta métrica flexible para mayor precisión.',
  'Si estás entre dos tallas, elige la talla mayor para mayor comodidad.',
  'Para niños, considera que las prendas UV se usan ajustadas para mayor cobertura.',
];

export function SizeGuidePage() {
  const [active, setActive] = useState<Category>('Polos / Camisetas');
  const table = tables[active];

  return (
    <div className="pt-[104px]">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Soporte</p>
          <h1 className="text-4xl font-light text-navy mb-4">Guía de Tallas</h1>
          <p className="text-sm text-slate-400 font-light">
            Encuentra tu talla perfecta para cada prenda UV.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex gap-1 border-b border-slate-100 mb-10 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-3 text-xs uppercase tracking-widest font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                active === cat
                  ? 'border-navy text-navy'
                  : 'border-transparent text-slate-400 hover:text-navy'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto mb-12">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                {table.headers.map((h) => (
                  <th key={h} className="text-left py-3 pr-3 sm:pr-6 text-xs uppercase tracking-widest font-medium text-slate-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <tr key={row[0]} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  {row.map((cell, i) => (
                    <td key={i} className={`py-3 pr-3 sm:pr-6 font-light text-slate-600 text-sm ${i === 0 ? 'font-medium text-navy' : ''}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tips */}
        <div className="border-t border-slate-100 pt-10">
          <h2 className="text-xs uppercase tracking-widest font-medium text-navy mb-6">Consejos para Medir</h2>
          <ul className="space-y-3">
            {tips.map((tip) => (
              <li key={tip} className="flex items-start gap-3 text-sm text-slate-500 font-light">
                <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 p-8 bg-slate-50 rounded-sm text-center">
          <p className="text-sm text-navy font-light mb-4">¿Tienes dudas sobre tu talla?</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs uppercase tracking-widest font-medium text-navy border-b border-navy pb-1 hover:opacity-70 transition-opacity"
          >
            Consultar por WhatsApp →
          </a>
        </div>
      </section>
    </div>
  );
}
