import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Droplets, Wind, Shield } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'UPF 50+',
    desc: 'Bloquea el 98% de rayos UVA y UVB. El estándar más alto certificado por ARPANSA (Australia).',
  },
  {
    icon: Droplets,
    title: 'Secado Rápido',
    desc: 'Tejido técnico micro-perforado que evacúa la humedad y seca en minutos, perfecto para la playa.',
  },
  {
    icon: Wind,
    title: 'Ultraligero',
    desc: 'Fibras de alta tecnología que pesan menos del 30% que el algodón, sin sacrificar durabilidad.',
  },
  {
    icon: Sun,
    title: 'Protección Duradera',
    desc: 'La protección UV no se lava ni se desgasta. Dura toda la vida útil de la prenda.',
  },
];

export function UVTechnology() {
  return (
    <section className="bg-navy text-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16 lg:mb-20">
          <span className="text-[10px] uppercase tracking-widest text-white/50 font-medium block mb-4">
            Tecnología SolarWear
          </span>
          <h2 className="text-3xl sm:text-4xl font-light leading-tight mb-6">
            Más que ropa. <br />
            Es protección que viaja contigo.
          </h2>
          <p className="text-white/60 font-light text-sm leading-relaxed">
            Cada prenda SolarWear está fabricada con tejidos de alto rendimiento que combinan
            protección solar certificada con comodidad de uso diario, tanto en la playa como en la montaña.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-20">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-sm bg-white/10 flex items-center justify-center">
                <f.icon strokeWidth={1.5} className="w-5 h-5 text-sky" />
              </div>
              <h3 className="text-sm font-medium uppercase tracking-widest text-white">{f.title}</h3>
              <p className="text-white/50 font-light text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-sky font-medium block mb-2">
              Especial Ropa de Baño
            </span>
            <p className="text-white/70 font-light text-sm max-w-md">
              Nuestra línea de baño combina protección UPF 50+ con materiales resistentes al cloro
              y al salitre. Diseñada para durar temporada tras temporada.
            </p>
          </div>
          <Link
            to="/catalogo?actividad=Playa"
            className="flex-shrink-0 px-8 py-4 border border-white/30 text-white text-xs uppercase tracking-widest font-medium hover:bg-white hover:text-navy transition-colors rounded-sm"
          >
            Ver Ropa de Baño
          </Link>
        </div>
      </div>
    </section>
  );
}
