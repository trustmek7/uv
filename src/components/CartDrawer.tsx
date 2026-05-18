import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { CartItem } from '../context/CartContext';
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
}
export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem
}: CartDrawerProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  return (
    <AnimatePresence>
      {isOpen &&
      <>
          {/* Backdrop */}
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
          className="fixed inset-0 bg-navy/20 backdrop-blur-sm z-50" />
        

          {/* Drawer */}
          <motion.div
          initial={{
            x: '100%'
          }}
          animate={{
            x: 0
          }}
          exit={{
            x: '100%'
          }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 200
          }}
          className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 flex flex-col">
          
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-light text-navy">
                Tu Carrito ({items.length})
              </h2>
              <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-navy transition-colors">
              
                <X strokeWidth={1.5} className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col">
              {items.length === 0 ?
            <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-6">
                  <p className="font-light">Tu carrito está vacío.</p>
                  <button
                onClick={onClose}
                className="text-xs uppercase tracking-widest font-medium text-navy border-b border-navy pb-1">
                
                    Seguir comprando
                  </button>
                </div> :

            <div className="flex flex-col gap-6">
                  {items.map((item) =>
              <div
                key={item.id}
                className="flex gap-4 pb-6 border-b border-slate-100 last:border-0">
                
                      <div className="w-24 aspect-[3/4] bg-mist rounded-sm overflow-hidden flex-shrink-0">
                        <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover" />
                  
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h4 className="font-light text-navy text-sm leading-tight">
                            {item.product.name}
                          </h4>
                          <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-slate-400 hover:text-navy transition-colors p-1">
                      
                            <Trash2 strokeWidth={1.5} className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 font-light mb-auto">
                          Talla: {item.selectedSize} | Color:{' '}
                          <span
                      className="inline-block w-2.5 h-2.5 rounded-full align-middle ml-1 border border-slate-200"
                      style={{
                        backgroundColor: item.selectedColor
                      }}>
                    </span>
                        </p>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3 border border-slate-200 rounded-sm px-2 py-1">
                            <button
                        onClick={() =>
                        onUpdateQuantity(
                          item.id,
                          Math.max(1, item.quantity - 1)
                        )
                        }
                        className="text-slate-400 hover:text-navy">
                        
                              <Minus strokeWidth={1.5} className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-light w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                        onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="text-slate-400 hover:text-navy">
                        
                              <Plus strokeWidth={1.5} className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-sm text-navy">
                            S/ {(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
              )}
                </div>
            }
            </div>

            {/* Footer */}
            {items.length > 0 &&
          <div className="border-t border-slate-100 p-6 bg-white">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-slate-500 font-light">
                    Subtotal
                  </span>
                  <span className="text-xl text-navy">
                    S/ {subtotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mb-6 font-light">
                  Impuestos incluidos. Los gastos de envío se calculan en la
                  pantalla de pago.
                </p>
                <button className="w-full py-4 bg-navy text-white text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-navy/90 transition-colors">
                  Proceder al Pago
                </button>
              </div>
          }
          </motion.div>
        </>
      }
    </AnimatePresence>);

}