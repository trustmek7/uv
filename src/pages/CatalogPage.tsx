import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Heart, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { FilterSidebar } from '../components/FilterSidebar';
import { products as allProducts } from '../data/products';
import { FilterState, Product } from '../types';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

type SortOption = 'destacados' | 'precio_asc' | 'precio_desc' | 'nuevos';

const EMPTY_FILTERS: FilterState = {
  gender: [],
  size: [],
  color: [],
  category: [],
  upf: [],
  activity: [],
  conjuntos: [],
  ropaDeBano: [],
  priceRange: [0, 500],
};

const sortLabels: Record<SortOption, string> = {
  destacados: 'Destacados',
  precio_asc: 'Precio: menor a mayor',
  precio_desc: 'Precio: mayor a menor',
  nuevos: 'Más nuevos',
};

function ProductCard({
  product,
}: {
  product: Product;
}) {
  const navigate = useNavigate();
  const { toggle, isWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group flex flex-col cursor-pointer" onClick={() => navigate(`/producto/${product.id}`)}>
      <div className="relative aspect-[3/4] overflow-hidden bg-mist rounded-sm mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
        />

        {product.isNew && (
          <span className="absolute top-3 left-3 bg-navy text-white text-[9px] uppercase tracking-widest px-2 py-1 rounded-sm font-medium">
            Nuevo
          </span>
        )}
        {product.discount && (
          <span className="absolute top-3 right-10 bg-white text-red-500 text-[9px] px-2 py-1 rounded-sm font-medium border border-slate-100">
            -{product.discount}%
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggle(product.id);
            toast.success(wishlisted ? 'Eliminado de favoritos' : 'Agregado a favoritos');
          }}
          className="absolute top-3 right-3 p-1 text-slate-400 hover:text-navy transition-colors"
        >
          <Heart
            strokeWidth={1.5}
            className={`w-5 h-5 ${wishlisted ? 'fill-uv text-uv' : ''}`}
          />
        </button>

        {/* Hover add to cart */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
              toast.success('Agregado al carrito');
            }}
            className="w-full bg-navy/90 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest py-3 hover:bg-navy transition-colors"
          >
            Agregar al Carrito
          </button>
        </div>
      </div>

      <span className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">
        {product.category}
      </span>
      <h3 className="text-sm text-navy font-light mb-2 line-clamp-1">{product.name}</h3>
      <div className="flex items-center gap-2">
        <span className="text-sm text-navy">S/ {product.price.toFixed(2)}</span>
        {product.originalPrice && (
          <span className="text-xs text-slate-400 line-through">
            S/ {product.originalPrice.toFixed(2)}
          </span>
        )}
        {product.discount && (
          <span className="text-[10px] text-red-500 font-medium">-{product.discount}%</span>
        )}
      </div>
      {product.colors.length > 1 && (
        <span className="text-xs text-slate-400 font-light mt-1">{product.colors.length} colores</span>
      )}
    </div>
  );
}

export function CatalogPage() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>('destacados');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync URL params to filters on mount / URL change
  useEffect(() => {
    const genero = searchParams.get('genero');
    const categoria = searchParams.get('categoria');
    const actividad = searchParams.get('actividad');
    const q = searchParams.get('q');

    setFilters((prev) => ({
      ...EMPTY_FILTERS,
      gender: genero ? [genero] : [],
      category: categoria ? [categoria] : [],
      activity: actividad ? [actividad] : [],
      searchQuery: q || '',
    } as FilterState & { searchQuery?: string }));
  }, [searchParams]);

  const searchQuery = (searchParams.get('q') || '').toLowerCase();

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((p) => {
        if (filters.gender.length > 0 && !filters.gender.includes(p.gender) && p.gender !== 'Unisex') {
          if (filters.gender.length > 0 && !filters.gender.includes(p.gender)) return false;
        }
        if (filters.category.length > 0 && !filters.category.includes(p.category)) return false;
        if (filters.upf.length > 0 && !filters.upf.includes(p.upf)) return false;
        if (filters.activity.length > 0 && !filters.activity.includes(p.activity)) return false;
        if (filters.size.length > 0 && !filters.size.some((s) => p.sizes.includes(s))) return false;
        if (searchQuery && !p.name.toLowerCase().includes(searchQuery) && !p.category.toLowerCase().includes(searchQuery)) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'precio_asc') return a.price - b.price;
        if (sortBy === 'precio_desc') return b.price - a.price;
        if (sortBy === 'nuevos') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0;
      });
  }, [filters, sortBy, searchQuery]);

  const activeFilterCount =
    filters.gender.length +
    filters.category.length +
    filters.activity.length +
    filters.upf.length +
    filters.size.length;

  const pageTitle = (() => {
    if (searchQuery) return `Resultados para "${searchParams.get('q')}"`;
    if (filters.gender.length === 1) return filters.gender[0];
    if (filters.activity.length === 1) return filters.activity[0];
    if (filters.category.length === 1) return filters.category[0];
    return 'Toda la Colección';
  })();

  return (
    <div className="pt-[104px]">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-32">
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
              <div>
                <h1 className="text-3xl font-light text-navy mb-2">{pageTitle}</h1>
                <p className="text-sm text-slate-400 font-light">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
                </p>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* Mobile filters button */}
                <button
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-navy border-b border-navy pb-1"
                >
                  <SlidersHorizontal strokeWidth={1.5} className="w-4 h-4" />
                  Filtros
                  {activeFilterCount > 0 && (
                    <span className="bg-navy text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Sort dropdown */}
                <div className="relative flex-1 sm:flex-none">
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="w-full sm:w-auto flex items-center justify-between gap-2 text-xs uppercase tracking-widest font-medium text-navy border-b border-slate-300 pb-1 hover:border-navy transition-colors"
                  >
                    <span className="truncate">Ordenar: {sortLabels[sortBy]}</span>
                    <ChevronDown strokeWidth={1.5} className="w-4 h-4" />
                  </button>

                  {isSortOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white shadow-soft-lg border border-slate-100 py-2 z-20 rounded-sm">
                      {(Object.entries(sortLabels) as [SortOption, string][]).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => { setSortBy(key); setIsSortOpen(false); }}
                          className={`w-full text-left px-4 py-2 text-sm font-light transition-colors ${
                            sortBy === key ? 'text-navy font-medium bg-mist' : 'text-slate-600 hover:bg-mist/50'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Active filters pills */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {[...filters.gender, ...filters.category, ...filters.activity, ...filters.upf, ...filters.size].map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-mist text-navy text-xs font-light rounded-sm"
                  >
                    {f}
                    <button
                      onClick={() => {
                        setFilters((prev) => ({
                          ...prev,
                          gender: prev.gender.filter((x) => x !== f),
                          category: prev.category.filter((x) => x !== f),
                          activity: prev.activity.filter((x) => x !== f),
                          upf: prev.upf.filter((x) => x !== f),
                          size: prev.size.filter((x) => x !== f),
                        }));
                      }}
                    >
                      <X strokeWidth={1.5} className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <button
                  onClick={() => setFilters(EMPTY_FILTERS)}
                  className="text-xs text-slate-400 hover:text-navy transition-colors underline underline-offset-2"
                >
                  Limpiar todo
                </button>
              </div>
            )}

            {/* Product grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 sm:gap-y-16">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-32 text-center">
                <h3 className="text-xl font-light text-navy mb-4">Sin resultados</h3>
                <p className="text-sm text-slate-400 font-light mb-8">
                  Intenta ajustar los filtros para ver más productos.
                </p>
                <button
                  onClick={() => setFilters(EMPTY_FILTERS)}
                  className="text-xs uppercase tracking-widest font-medium text-navy border-b border-navy pb-1"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filters drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-navy/20" onClick={() => setIsMobileFiltersOpen(false)} />
          <div className="relative ml-auto w-80 bg-white h-full overflow-y-auto p-6 shadow-soft-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-light text-navy">Filtros</h2>
              <button onClick={() => setIsMobileFiltersOpen(false)}>
                <X strokeWidth={1.5} className="w-5 h-5 text-navy" />
              </button>
            </div>
            <FilterSidebar filters={filters} setFilters={setFilters} />
            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="mt-8 w-full py-4 bg-navy text-white text-xs uppercase tracking-widest font-medium rounded-sm"
            >
              Ver {filteredProducts.length} productos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
