import React from 'react';
const categories = [
{
  name: 'Mujer',
  image:
  'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=600'
},
{
  name: 'Hombre',
  image:
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600'
},
{
  name: 'Conjuntos',
  image:
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600'
},
{
  name: 'Outdoor',
  image:
  'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=600'
}];

export function FeaturedCategories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
      <div className="mb-12 flex justify-between items-end">
        <h2 className="text-2xl sm:text-3xl font-light text-navy">
          Comprar por Categoría
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {categories.map((category, index) =>
        <a key={index} href="#" className="group flex flex-col">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-mist mb-4">
              <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium uppercase tracking-widest text-navy">
                {category.name}
              </h3>
              <span className="text-xs text-slate-400 group-hover:text-navy transition-colors">
                &rarr;
              </span>
            </div>
          </a>
        )}
      </div>
    </section>);

}