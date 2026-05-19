import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const SHIPPING_THRESHOLD = 99;

export function CartPage() {
  const { items, removeItem, updateQuantity, total, count } = useCart();
  const navigate = useNavigate();

  const shipping = total >= SHIPPING_THRESHOLD ? 0 : 15;
  const finalTotal = total + shipping;

  if (items.length === 0) {
    return (
      <div className="pt-[104px] min-h-screen flex items-center justify-center">
        <div className="text-center max-w-sm mx-auto px-4">
          <div className="w-16 h-16 rounded-full bg-mist flex items-center justify-center mx-auto mb-6">
            <ShoppingBag strokeWidth={1.5} className="w-7 h-7 text-slate-400" />
          </div>
          <h2 className="text-2xl font-light text-navy mb-3">Tu carrito está vacío</h2>
          <p className="text-sm text-slate-400 font-light mb-8">
            Explora nuestra colección y agrega los productos que más te gusten.
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
        {/* Header */}
        <div className="mb-10">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 mb-4">
            <Link to="/" className="hover:text-navy transition-colors">Inicio</Link>
            <ChevronRight strokeWidth={1.5} className="w-3 h-3" />
            <span className="text-navy">Carrito</span>
          </nav>
          <h1 className="text-3xl font-light text-navy">
            Carrito <span className="text-slate-400 text-xl">({count} {count === 1 ? 'artículo' : 'artículos'})</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Items list */}
          <div className="lg:col-span-2 flex flex-col gap-0">
            {items.map((item, i) => (
              <div
                key={item.id}
                className={`flex gap-5 py-6 ${i < items.length - 1 ? 'border-b border-slate-100' : ''}`}
              >
                {/* Image */}
                <Link to={`/producto/${item.productId}`} className="flex-shrink-0">
                  <div className="w-24 h-32 sm:w-28 sm:h-36 overflow-hidden rounded-sm bg-mist">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1">
                        {item.product.category}
                      </span>
                      <Link
                        to={`/producto/${item.productId}`}
                        className="text-sm font-light text-navy hover:opacity-70 transition-opacity"
                      >
                        {item.product.name}
                      </Link>
                      <div className="flex items-center gap-3 mt-2">
                        <div
                          className="w-4 h-4 rounded-full border border-slate-200"
                          style={{ backgroundColor: item.selectedColor }}
                        />
                        <span className="text-xs text-slate-400 font-light">Talla: {item.selectedSize}</span>
                        <span className="text-xs text-slate-200">|</span>
                        <span className="text-[10px] uppercase tracking-widest text-uv font-medium">
                          {item.product.upf}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        removeItem(item.id);
                        toast.success('Producto eliminado');
                      }}
                      className="text-slate-300 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 strokeWidth={1.5} className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Qty controls */}
                    <div className="flex items-center border border-slate-200 rounded-sm">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center text-navy hover:bg-mist transition-colors disabled:opacity-30"
                      >
                        <Minus strokeWidth={1.5} className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-light text-navy">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-navy hover:bg-mist transition-colors"
                      >
                        <Plus strokeWidth={1.5} className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-light text-navy">
                      S/ {(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-mist rounded-sm p-6 lg:p-8 sticky top-28">
              <h2 className="text-sm uppercase tracking-widest font-medium text-navy mb-6">
                Resumen del Pedido
              </h2>

              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between text-sm font-light text-slate-600">
                  <span>Subtotal ({count} artículos)</span>
                  <span>S/ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-light text-slate-600">
                  <span>Envío</span>
                  {shipping === 0 ? (
                    <span className="text-green-600">Gratis</span>
                  ) : (
                    <span>S/ {shipping.toFixed(2)}</span>
                  )}
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-slate-400 font-light -mt-1">
                    Agrega S/ {(SHIPPING_THRESHOLD - total).toFixed(2)} más para envío gratis.
                  </p>
                )}
              </div>

              <div className="border-t border-slate-200 pt-4 mb-8">
                <div className="flex justify-between text-navy">
                  <span className="text-sm font-medium uppercase tracking-widest">Total</span>
                  <span className="text-lg font-light">S/ {finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full flex items-center justify-center gap-2 py-4 bg-navy text-white text-xs uppercase tracking-widest font-medium hover:bg-navy/90 transition-colors rounded-sm mb-4"
              >
                Proceder al Pago
                <ArrowRight strokeWidth={1.5} className="w-4 h-4" />
              </button>

              <Link
                to="/catalogo"
                className="block text-center text-xs uppercase tracking-widest text-slate-400 hover:text-navy transition-colors"
              >
                Seguir Comprando
              </Link>

              {/* Trust badges */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col gap-2">
                {['Pago 100% seguro', 'Devoluciones gratis en 30 días', 'Envío protegido'].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-uv flex-shrink-0" />
                    <span className="text-xs text-slate-400 font-light">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
