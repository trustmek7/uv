import React, { useEffect, useState } from 'react';
import { Search, User, Heart, ShoppingBag, Menu } from 'lucide-react';
interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenMobileMenu: () => void;
}
export function Navbar({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenMobileMenu
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 bg-white ${isScrolled ? 'shadow-sm' : ''}`}>
      
      {/* Utility Bar */}
      <div className="bg-navy text-white py-2 px-4 text-center">
        <p className="text-[10px] uppercase tracking-widest font-medium">
          Envío gratis a todo el Perú en compras desde S/ 199
        </p>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 -ml-2 text-navy hover:opacity-70 transition-opacity">
            
            <Menu strokeWidth={1.5} className="w-6 h-6" />
          </button>

          {/* Logo */}
          <a href="#" className="flex items-center group">
            <span className="font-sans text-xl sm:text-2xl font-medium text-navy tracking-wide uppercase">
              SolarWear
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
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
              className="text-xs uppercase tracking-widest font-medium text-navy hover:opacity-70 transition-all relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-navy hover:after:w-full after:transition-all after:duration-300">
              
                {item}
              </a>
            )}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button className="hidden sm:flex p-1 text-navy hover:opacity-70 transition-opacity">
              <Search strokeWidth={1.5} className="w-5 h-5" />
            </button>
            <button className="hidden sm:flex p-1 text-navy hover:opacity-70 transition-opacity">
              <User strokeWidth={1.5} className="w-5 h-5" />
            </button>
            <button className="p-1 text-navy hover:opacity-70 transition-opacity relative">
              <Heart strokeWidth={1.5} className="w-5 h-5" />
              {wishlistCount > 0 &&
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-navy text-white text-[9px] font-medium flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              }
            </button>
            <button
              onClick={onOpenCart}
              className="p-1 text-navy hover:opacity-70 transition-opacity relative">
              
              <ShoppingBag strokeWidth={1.5} className="w-5 h-5" />
              {cartCount > 0 &&
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-navy text-white text-[9px] font-medium flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              }
            </button>
          </div>
        </div>
      </div>
    </header>);

}