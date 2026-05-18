import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { toast } from 'sonner';

export function WishlistPage() {
  const { items, toggle } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const wishlistProducts = products.filter((p) => items.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="pt-[104px] min-h-screen flex items-center justify-center">
        <div className="text-center max-w-sm mx-auto px-4">
          <div className="w-16 h-16 rounded-full bg-mist flex items-center justify-center mx-auto mb-6">
            <Heart strokeWidth={1.5} className="w-7 h-7 text-slate-400" />
          </div>
          <h2 className="text-2xl font-light text-navy mb-3">Tu lista de deseos está vacía</h2>
          <p className="text-sm text-slate-400 font-light mb-8">
            Guarda los productos que te gusten para verlos más tarde.
          </p>
          <Link
            to="/catalogo"
            className="inline-block px-10 py-4 bg-navy text-white text-xs uppercase tracking-widest font-medium hover:bg-navy/90 transition-colors rounded-sm"
          >
            Explorar Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[104px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="mb-10">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium block mb-2">
            Mi cuenta
          </span>
          <h1 className="text-3xl font-light text-navy">
            Lista de Deseos{' '}
            <span className="text-slate-400 text-xl">
              ({wishlistProducts.length} {wishlistProducts.length === 1 ? 'producto' : 'productos'})
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {wishlistProducts.map((product) => (
            <div key={product.id} className="group flex flex-col">
              {/* Image */}
              <div
                className="relative aspect-[3/4] overflow-hidden bg-mist rounded-sm mb-4 cursor-pointer"
                onClick={() => navigate(`/producto/${product.id}`)}
              >
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
                  <span className="absolute top-3 left-3 bg-white text-red-500 text-[9px] px-2 py-1 rounded-sm font-medium border border-slate-100">
                    -{product.discount}%
                  </span>
                )}

                {/* Remove from wishlist */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(product.id);
                    toast.success('Eliminado de favoritos');
                  }}
                  className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-sm text-slate-400 hover:text-red-400 transition-colors shadow-sm"
                >
                  <Trash2 strokeWidth={1.5} className="w-4 h-4" />
                </button>

                {/* Add to cart on hover */}
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

              {/* Info */}
              <span className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">
                {product.category}
              </span>
              <Link
                to={`/producto/${product.id}`}
                className="text-sm text-navy font-light mb-2 hover:opacity-70 transition-opacity line-clamp-1"
              >
                {product.name}
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-sm text-navy">S/ {product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    S/ {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Quick add button */}
              <button
                onClick={() => {
                  addToCart(product);
                  toast.success('Agregado al carrito');
                }}
                className="mt-3 w-full py-2.5 border border-slate-200 text-navy text-[10px] uppercase tracking-widest font-medium hover:border-navy hover:bg-navy hover:text-white transition-all rounded-sm"
              >
                Agregar al Carrito
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/catalogo"
            className="inline-block px-10 py-4 border border-navy text-navy text-xs uppercase tracking-widest font-medium hover:bg-navy hover:text-white transition-colors rounded-sm"
          >
            Seguir Explorando
          </Link>
        </div>
      </div>
    </div>
  );
}
