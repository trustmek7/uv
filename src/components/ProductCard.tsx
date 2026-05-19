import React from 'react';
import { Heart } from 'lucide-react';
import { Product } from '../types';
interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onQuickView: (product: Product) => void;
}
export function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView
}: ProductCardProps) {
  return (
    <div
      className="group flex flex-col cursor-pointer"
      onClick={() => onQuickView(product)}>
      
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-mist rounded-sm mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" />
        

        {/* Wishlist Button */}
        <div className="absolute top-4 right-4 z-10 group/tip">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className="p-1 text-slate-400 hover:text-navy transition-colors"
            aria-label="Toggle wishlist">
            <Heart
              strokeWidth={1.5}
              className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-uv text-uv' : ''}`} />
          </button>
          <span className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-full mr-2 px-2 py-1 bg-navy text-white text-[10px] whitespace-nowrap rounded-sm opacity-0 group-hover/tip:opacity-100 transition-opacity">
            {isWishlisted ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] uppercase tracking-widest text-slate-500">
            {product.category}
          </span>
          {product.isNew &&
          <span className="text-[10px] uppercase tracking-widest text-navy font-medium">
              Nuevo
            </span>
          }
        </div>

        <h3 className="text-sm text-navy font-light mb-2 line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-navy">
            S/ {product.price.toFixed(2)}
          </span>
          {product.originalPrice &&
          <span className="text-sm text-slate-400 line-through">
              S/ {product.originalPrice.toFixed(2)}
            </span>
          }
          {product.discount &&
          <span className="text-[10px] text-red-500 font-medium ml-1">
              -{product.discount}%
            </span>
          }
        </div>

        {/* Minimal Color Indicator */}
        {product.colors.length > 1 &&
        <span className="text-xs text-slate-400 font-light mt-auto pt-2">
            {product.colors.length} colores
          </span>
        }
      </div>
    </div>);

}