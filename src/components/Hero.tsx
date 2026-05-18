import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative h-[88vh] min-h-[620px] w-full bg-mist overflow-hidden pt-[104px]">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2000"
          alt="Editorial outdoor lifestyle"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-white/95 backdrop-blur-sm p-8 sm:p-12 max-w-md shadow-soft rounded-sm"
        >
          <span className="text-[10px] font-medium tracking-widest uppercase text-slate-400 block mb-6">
            Nueva Colección 2026
          </span>

          <h1 className="text-4xl sm:text-5xl font-light leading-tight mb-6 text-navy">
            Protección UV para tu estilo de vida.
          </h1>

          <p className="text-sm text-slate-500 mb-10 font-light leading-relaxed">
            Ropa deportiva y outdoor con tecnología UPF 50+ para mantenerte protegido bajo el sol,
            con un diseño minimalista y elegante.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/catalogo"
              className="px-8 py-4 bg-navy text-white text-xs uppercase tracking-widest font-medium hover:bg-navy/90 transition-colors rounded-sm text-center"
            >
              Explorar Colección
            </Link>
            <Link
              to="/catalogo?actividad=Playa"
              className="px-8 py-4 border border-navy text-navy text-xs uppercase tracking-widest font-medium hover:bg-navy hover:text-white transition-colors rounded-sm text-center"
            >
              Ropa de Baño UV
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
