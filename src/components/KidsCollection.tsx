import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';

const kidsProducts = products.filter((product) => product.gender === 'Niños').slice(0, 3);

export function KidsCollection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky/20 via-white to-mist" />
      <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-uv/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-navy/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-[10px] uppercase tracking-widest text-uv font-medium block mb-2">
              Nueva Sección
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-navy">Colección Niños</h2>
            <p className="text-sm text-slate-500 font-light mt-3 max-w-xl">
              Protección UPF y telas suaves para el día a día. Diseños pensados para juegos al aire libre y actividades escolares.
            </p>
          </div>
          <Link
            to="/catalogo?genero=Niños"
            className="text-xs uppercase tracking-widest font-medium text-navy border-b border-navy pb-1 hover:opacity-70 transition-opacity"
          >
            Ver colección Niños →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kidsProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.08 }}
              className="group bg-white rounded-sm border border-slate-100 shadow-soft-sm overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-white/90 text-navy text-[9px] uppercase tracking-widest px-2 py-1 rounded-sm font-medium">
                  {product.upf}
                </span>
              </div>
              <div className="p-5">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1">
                  {product.category}
                </span>
                <h3 className="text-sm text-navy font-light mb-2 line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-navy">S/ {product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">S/ {product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
