import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedCategories } from './components/FeaturedCategories';
import { PromoBanners } from './components/PromoBanners';
import { Catalog } from './components/Catalog';
import { Testimonials } from './components/Testimonials';
import { SocialGallery } from './components/SocialGallery';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductQuickView } from './components/ProductQuickView';
import { Product, CartItem } from './types';
export function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
    prev.includes(productId) ?
    prev.filter((id) => id !== productId) :
    [...prev, productId]
    );
    if (!wishlist.includes(productId)) {
      toast.success('Agregado a favoritos', {
        style: {
          background: '#0B1F3A',
          color: 'white',
          border: 'none',
          borderRadius: '2px'
        }
      });
    }
  };
  const handleAddToCart = (
  product: Product,
  color?: string,
  size?: string,
  quantity: number = 1) =>
  {
    const selectedColor = color || product.colors[0];
    const selectedSize = size || product.sizes[0];
    const cartItemId = `${product.id}-${selectedColor}-${selectedSize}`;
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === cartItemId);
      if (existingItem) {
        return prev.map((item) =>
        item.id === cartItemId ?
        {
          ...item,
          quantity: item.quantity + quantity
        } :
        item
        );
      }
      return [
      ...prev,
      {
        id: cartItemId,
        product,
        quantity,
        selectedColor,
        selectedSize
      }];

    });
    toast.success('Agregado al carrito', {
      style: {
        background: '#0B1F3A',
        color: 'white',
        border: 'none',
        borderRadius: '2px'
      }
    });
  };
  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
    prev.map((item) =>
    item.id === id ?
    {
      ...item,
      quantity
    } :
    item
    )
    );
  };
  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Toaster position="bottom-right" />

      <Navbar
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      

      <main className="flex-grow">
        <Hero />
        <FeaturedCategories />
        <PromoBanners />

        <div id="catalog">
          <Catalog
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={setQuickViewProduct}
            onOpenMobileFilters={() => {
              document.getElementById('catalog')?.scrollIntoView({
                behavior: 'smooth'
              });
            }} />
          
        </div>

        <Testimonials />
        <SocialGallery />
      </main>

      <Footer />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem} />
      

      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart} />
      

      {/* Basic Mobile Menu Overlay */}
      {isMobileMenuOpen &&
      <div className="fixed inset-0 z-50 bg-white flex flex-col p-6 lg:hidden">
          <div className="flex justify-end">
            <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-navy">
            
              <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round">
              
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-8 mt-12 px-4">
            {[
          'Novedades',
          'Mujer',
          'Hombre',
          'Niños',
          'Conjuntos',
          'Outdoor'].
          map((item) =>
          <a
            key={item}
            href="#"
            className="text-2xl font-light text-navy hover:opacity-70 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}>
            
                {item}
              </a>
          )}
          </nav>
        </div>
      }
    </div>);

}