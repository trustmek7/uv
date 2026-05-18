import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Mujer',
    sub: 'Colección completa',
    href: '/catalogo?genero=Mujer',
    image: 'https://cdn.shopify.com/s/files/1/0619/2073/9502/files/11020139spcopacabana122mcfemareia_4_07f86bbf-e6be-45cb-9daa-09888b7b4366.jpg?v=1716224623',
  },
  {
    name: 'Trajes de Baño',
    sub: 'Protección solar',
    href: '/catalogo?categoria=Trajes%20de%20Ba%C3%B1o',
    image: 'https://cdn.shopify.com/s/files/1/0619/2073/9502/files/13010117mameninaflores124mlinfestampa_1.jpg?v=1715990847',
    badge: 'Nuevo',
  },
  {
    name: 'Hombre',
    sub: 'Outdoor & Running',
    href: '/catalogo?genero=Hombre',
    image: 'https://cdn.shopify.com/s/files/1/0619/2073/9502/files/177846-3500-auto.webp?v=1746548240',
  },
  {
    name: 'Accesorios',
    sub: 'Mangas, cuelleras y más',
    href: '/catalogo?categoria=Accesorios',
    image: 'https://cdn.shopify.com/s/files/1/0619/2073/9502/files/176595-3500-auto.webp?v=1739470749',
  },
  {
    name: 'Gorras UV',
    sub: 'Protección diaria',
    href: '/catalogo?categoria=Gorras',
    image: 'https://cdn.shopify.com/s/files/1/0619/2073/9502/files/176108-3500-auto.webp?v=1773075791',
  },
];

export function FeaturedCategories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium block mb-2">
            Explorar
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-navy">Comprar por Categoría</h2>
        </div>
        <Link
          to="/catalogo"
          className="hidden sm:block text-xs uppercase tracking-widest font-medium text-navy border-b border-navy pb-1 hover:opacity-70 transition-opacity"
        >
          Ver todo →
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Large tile — Mujer */}
        <Link to={categories[0].href} className="group col-span-2 row-span-2 flex flex-col">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden rounded-sm bg-mist">
            <img
              src={categories[0].image}
              alt={categories[0].name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-[10px] uppercase tracking-widest text-white/70 font-medium mb-1">
                {categories[0].sub}
              </p>
              <h3 className="text-2xl font-light text-white">{categories[0].name}</h3>
            </div>
          </div>
        </Link>

        {/* Ropa de Baño — highlighted */}
        <Link to={categories[1].href} className="group col-span-2 lg:col-span-1 flex flex-col">
          <div className="relative aspect-square overflow-hidden rounded-sm bg-mist">
            <img
              src={categories[1].image}
              alt={categories[1].name}
              className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
            {categories[1].badge && (
              <span className="absolute top-4 left-4 bg-uv text-white text-[9px] uppercase tracking-widest px-2 py-1 rounded-sm font-medium">
                {categories[1].badge}
              </span>
            )}
            <div className="absolute bottom-4 left-4">
              <p className="text-[9px] uppercase tracking-widest text-white/70 font-medium mb-0.5">
                {categories[1].sub}
              </p>
              <h3 className="text-sm font-medium text-white uppercase tracking-wide">
                {categories[1].name}
              </h3>
            </div>
          </div>
        </Link>

        {categories.slice(2).map((cat, i) => (
          <Link key={i} to={cat.href} className="group flex flex-col">
            <div className="relative aspect-square overflow-hidden rounded-sm bg-mist">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-[9px] uppercase tracking-widest text-white/70 font-medium mb-0.5">
                  {cat.sub}
                </p>
                <h3 className="text-sm font-medium text-white uppercase tracking-wide">{cat.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
