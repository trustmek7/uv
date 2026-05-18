import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Product } from '../types';
interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
  product: Product,
  color: string,
  size: string,
  quantity: number)
  => void;
}
export function ProductQuickView({
  product,
  isOpen,
  onClose,
  onAddToCart
}: ProductQuickViewProps) {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
      setQuantity(1);
      setActiveImage(0);
    }
  }, [product]);
  if (!product) return null;
  const handleAddToCart = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    onClose();
  };
  return (
    <AnimatePresence>
      {isOpen &&
      <>
          <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          onClick={onClose}
          className="fixed inset-0 bg-navy/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6" />
        
          <motion.div
          initial={{
            opacity: 0,
            scale: 0.98,
            y: 10
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            scale: 0.98,
            y: 10
          }}
          className="fixed inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 bg-white sm:rounded-sm shadow-2xl w-full sm:max-w-4xl sm:max-h-[85vh] overflow-hidden flex flex-col md:flex-row">
          
            <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-navy transition-colors bg-white/50 backdrop-blur-sm rounded-full">
            
              <X strokeWidth={1.5} className="w-5 h-5" />
            </button>

            {/* Image Gallery */}
            <div className="w-full md:w-1/2 bg-mist flex flex-col h-[50vh] md:h-auto">
              <div className="flex-1 overflow-hidden">
                <img
                src={product.images[activeImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover" />
              
              </div>
              <div className="flex gap-2 p-4 overflow-x-auto scrollbar-hide bg-white">
                {product.images.map((img, idx) =>
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-16 h-20 overflow-hidden flex-shrink-0 transition-opacity ${activeImage === idx ? 'opacity-100 ring-1 ring-navy ring-offset-1' : 'opacity-50 hover:opacity-100'}`}>
                
                    <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover" />
                
                  </button>
              )}
              </div>
            </div>

            {/* Details */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] uppercase tracking-widest text-slate-500">
                  {product.category}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-navy border border-navy px-2 py-0.5 rounded-sm">
                  {product.upf}
                </span>
              </div>

              <h2 className="text-2xl font-light text-navy mb-4">
                {product.name}
              </h2>

              <div className="flex items-center gap-3 mb-8">
                <span className="text-xl text-navy">
                  S/ {product.price.toFixed(2)}
                </span>
                {product.originalPrice &&
              <span className="text-sm text-slate-400 line-through">
                    S/ {product.originalPrice.toFixed(2)}
                  </span>
              }
              </div>

              {/* Color Selection */}
              <div className="mb-8">
                <h4 className="text-xs uppercase tracking-widest text-navy mb-3">
                  Color
                </h4>
                <div className="flex gap-3">
                  {product.colors.map((color) =>
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${selectedColor === color ? 'ring-1 ring-navy ring-offset-2' : 'ring-1 ring-slate-200'}`}
                  style={{
                    backgroundColor: color
                  }} />

                )}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs uppercase tracking-widest text-navy">
                    Talla
                  </h4>
                  <button className="text-[10px] uppercase tracking-widest text-slate-400 border-b border-slate-300 pb-0.5">
                    Guía de tallas
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) =>
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-10 border text-sm font-light transition-all rounded-sm ${selectedSize === size ? 'border-navy bg-navy text-white' : 'border-slate-200 text-slate-600 hover:border-navy'}`}>
                  
                      {size}
                    </button>
                )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8 mt-auto">
                <div className="flex items-center border border-slate-200 rounded-sm px-2">
                  <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-slate-400 hover:text-navy">
                  
                    -
                  </button>
                  <span className="w-8 text-center font-light text-sm">
                    {quantity}
                  </span>
                  <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-slate-400 hover:text-navy">
                  
                    +
                  </button>
                </div>
                <button
                onClick={handleAddToCart}
                className="flex-1 bg-navy text-white text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-navy/90 transition-colors">
                
                  Agregar al Carrito
                </button>
              </div>

              {/* Description */}
              <div className="text-sm text-slate-500 font-light leading-relaxed">
                <p>
                  Prenda diseñada con tecnología avanzada de protección solar.
                  Bloquea el 98% de los rayos UVA y UVB, garantizando tu
                  seguridad durante actividades al aire libre.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>);

}