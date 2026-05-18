import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const BEST_SELLER_IDS = ['p1', 'p3', 'p8', 'rb1', 'rb3', 'rb6', 'rb10', 'rb12'];
const ALL_BEST = products.filter((p) => BEST_SELLER_IDS.includes(p.id));

export function BestSellers() {
  const { toggle, isWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'mujer' | 'bano'>('all');

  const displayed = ALL_BEST.filter((p) => {
    if (activeTab === 'mujer') return p.gender === 'Mujer' && p.activity !== 'Playa';
    if (activeTab === 'bano') return p.activity === 'Playa';
    return true;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 border-t border-slate-100">
      <div className="text-center mb-12">
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium block mb-2">
          Los más elegidos
        </span>
        <h2 className="text-2xl sm:text-3xl font-light text-navy mb-8">Más Vendidos</h2>

        <div className="inline-flex border-b border-slate-200">
          {([['all', 'Todo'], ['mujer', 'Mujer'], ['bano', 'Ropa de Baño']] as const).map(
            ([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 text-xs uppercase tracking-widest font-medium transition-all ${
                  activeTab === key
                    ? 'text-navy border-b-2 border-navy -mb-px'
                    : 'text-slate-400 hover:text-navy'
                }`}
              >
                {label}
              </button>
            )
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {displayed.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col cursor-pointer"
            onClick={() => navigate(`/producto/${product.id}`)}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-mist rounded-sm mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
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
                  toast.success(isWishlisted(product.id) ? 'Eliminado de favoritos' : 'Agregado a favoritos');
                }}
                className="absolute top-3 right-3 p-1 text-slate-400 hover:text-navy transition-colors"
              >
                <Heart
                  strokeWidth={1.5}
                  className={`w-5 h-5 ${isWishlisted(product.id) ? 'fill-uv text-uv' : ''}`}
                />
              </button>
              <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                    toast.success('Agregado al carrito');
                  }}
                  className="w-full bg-navy/90 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest py-3 hover:bg-navy transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag strokeWidth={1.5} className="w-3.5 h-3.5" />
                  Agregar al Carrito
                </button>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">{product.category}</span>
            <h3 className="text-sm text-navy font-light mb-2 line-clamp-1">{product.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-navy">S/ {product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">S/ {product.originalPrice.toFixed(2)}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-14">
        <Link
          to="/catalogo"
          className="inline-block px-10 py-4 border border-navy text-navy text-xs uppercase tracking-widest font-medium hover:bg-navy hover:text-white transition-colors rounded-sm"
        >
          Ver toda la colección
        </Link>
      </div>
    </section>
  );
}
