import React, { useMemo, useState } from 'react';
import { FilterSidebar } from './FilterSidebar';
import { ProductCard } from './ProductCard';
import { Product, FilterState } from '../types';
import { products as initialProducts } from '../data/products';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
interface CatalogProps {
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onQuickView: (product: Product) => void;
  onOpenMobileFilters: () => void;
}
type SortOption = 'destacados' | 'precio_asc' | 'precio_desc' | 'nuevos';
export function Catalog({
  wishlist,
  onToggleWishlist,
  onQuickView,
  onOpenMobileFilters
}: CatalogProps) {
  const [filters, setFilters] = useState<FilterState>({
    gender: [],
    size: [],
    color: [],
    category: [],
    upf: [],
    activity: [],
    conjuntos: [],
    ropaDeBano: [],
    priceRange: [0, 500]
  });
  const [sortBy, setSortBy] = useState<SortOption>('destacados');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const filteredProducts = useMemo(() => {
    return initialProducts.
    filter((product) => {
      if (
      filters.gender.length > 0 &&
      !filters.gender.includes(product.gender))

      return false;
      if (
      filters.category.length > 0 &&
      !filters.category.includes(product.category))

      return false;
      if (filters.upf.length > 0 && !filters.upf.includes(product.upf))
      return false;
      if (
      filters.activity.length > 0 &&
      !filters.activity.includes(product.activity))

      return false;
      return true;
    }).
    sort((a, b) => {
      switch (sortBy) {
        case 'precio_asc':
          return a.price - b.price;
        case 'precio_desc':
          return b.price - a.price;
        case 'nuevos':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default:
          return 0;
      }
    });
  }, [filters, sortBy]);
  const sortLabels: Record<SortOption, string> = {
    destacados: 'Destacados',
    precio_asc: 'Precio: menor a mayor',
    precio_desc: 'Precio: mayor a menor',
    nuevos: 'Más nuevos'
  };
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-32">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
            <div>
              <h1 className="text-3xl font-light text-navy mb-2">
                Toda la Colección
              </h1>
              <p className="text-sm text-slate-500 font-light">
                {filteredProducts.length} productos
              </p>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenMobileFilters}
                className="lg:hidden flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-navy border-b border-navy pb-1">
                
                <SlidersHorizontal strokeWidth={1.5} className="w-4 h-4" />
                Filtros
              </button>

              <div className="relative flex-1 sm:flex-none">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="w-full sm:w-auto flex items-center justify-between gap-2 text-xs uppercase tracking-widest font-medium text-navy border-b border-slate-300 pb-1 hover:border-navy transition-colors">
                  
                  <span className="truncate">
                    Ordenar: {sortLabels[sortBy]}
                  </span>
                  <ChevronDown strokeWidth={1.5} className="w-4 h-4" />
                </button>

                {isSortOpen &&
                <div className="absolute right-0 top-full mt-2 w-56 bg-white shadow-soft-lg border border-slate-100 py-2 z-20 rounded-sm">
                    {(Object.entries(sortLabels) as [SortOption, string][]).map(
                    ([key, label]) =>
                    <button
                      key={key}
                      onClick={() => {
                        setSortBy(key as SortOption);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm font-light transition-colors ${sortBy === key ? 'text-navy font-medium bg-mist' : 'text-slate-600 hover:bg-mist/50'}`}>
                      
                          {label}
                        </button>

                  )}
                  </div>
                }
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ?
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 sm:gap-y-16">
              {filteredProducts.map((product) =>
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView} />

            )}
            </div> :

          <div className="py-32 text-center">
              <h3 className="text-xl font-light text-navy mb-4">
                No se encontraron productos
              </h3>
              <p className="text-sm text-slate-500 font-light mb-8">
                Intenta ajustar tus filtros para ver más resultados.
              </p>
              <button
              onClick={() =>
              setFilters({
                gender: [],
                size: [],
                color: [],
                category: [],
                upf: [],
                activity: [],
                conjuntos: [],
                ropaDeBano: [],
                priceRange: [0, 500]
              })
              }
              className="text-xs uppercase tracking-widest font-medium text-navy border-b border-navy pb-1">

                Limpiar filtros
              </button>
            </div>
          }

          {/* Pagination (Visual) */}
          {filteredProducts.length > 0 &&
          <div className="mt-24 flex justify-center items-center gap-6 text-sm font-light text-slate-500">
              <button
              className="hover:text-navy transition-colors disabled:opacity-30"
              disabled>
              
                &larr; Anterior
              </button>
              <span className="text-navy font-medium">1 / 3</span>
              <button className="hover:text-navy transition-colors">
                Siguiente &rarr;
              </button>
            </div>
          }
        </div>
      </div>
    </section>);

}