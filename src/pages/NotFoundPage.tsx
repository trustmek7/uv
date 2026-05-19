import React from 'react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      <Link to="/" className="mb-10 block">
        <img src="/img/SolarWear_Logo.jpeg" alt="SolarWear" className="h-20 w-auto object-contain mix-blend-multiply mx-auto" />
      </Link>

      <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-4">Error 404</p>
      <h1 className="text-4xl sm:text-5xl font-light text-navy mb-4 leading-tight">
        Página no encontrada
      </h1>
      <p className="text-sm text-slate-400 font-light max-w-sm mb-12">
        La dirección que buscas no existe o fue movida. Puedes volver al inicio o explorar nuestro catálogo.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="px-8 py-4 bg-navy text-white text-xs uppercase tracking-widest font-medium hover:bg-navy/90 transition-colors rounded-sm"
        >
          Volver al inicio
        </Link>
        <Link
          to="/catalogo"
          className="px-8 py-4 border border-navy text-navy text-xs uppercase tracking-widest font-medium hover:bg-navy hover:text-white transition-colors rounded-sm"
        >
          Ver catálogo
        </Link>
      </div>
    </div>
  );
}
