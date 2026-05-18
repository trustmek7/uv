import React from 'react';
export function PromoBanners() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="relative w-full aspect-[4/3] sm:aspect-[21/9] bg-mist overflow-hidden rounded-sm group flex items-center">
        {/* Full bleed image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=2000"
            alt="Protección Total"
            className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" />
          
        </div>

        {/* Content Overlay - Clean, minimal */}
        <div className="relative z-10 p-8 sm:p-16 md:p-24 max-w-xl">
          <span className="inline-block text-[10px] uppercase tracking-widest font-medium text-navy bg-white px-3 py-1 mb-6 rounded-sm">
            Tecnología UPF 50+
          </span>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-navy mb-6 leading-tight">
            Diseñado para el movimiento.
          </h3>
          <p className="text-sm text-navy/80 mb-8 font-light max-w-md">
            Nuestra nueva línea de ropa deportiva bloquea el 98% de los rayos
            UVA y UVB, manteniéndote fresco y protegido.
          </p>
          <button className="text-xs uppercase tracking-widest font-medium text-navy border-b border-navy pb-1 hover:opacity-70 transition-opacity">
            Descubrir la colección
          </button>
        </div>
      </div>
    </section>);

}