import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, ChevronDown, LogOut, User, Package, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { toast } from 'sonner';

const NAV_ITEMS: {
  label: string;
  href: string;
  dropdown?: { heading?: string; items: { label: string; href: string }[] }[];
}[] = [
  {
    label: 'Mujer',
    href: '/catalogo?genero=Mujer',
    dropdown: [
      {
        heading: 'Prendas',
        items: [
          { label: 'Polos UV', href: '/catalogo?genero=Mujer&categoria=Polos' },
          { label: 'Leggings', href: '/catalogo?genero=Mujer&categoria=Leggings' },
          { label: 'Casacas', href: '/catalogo?genero=Mujer&categoria=Casacas' },
          { label: 'Cortavientos', href: '/catalogo?genero=Mujer&categoria=Cortavientos' },
          { label: 'Conjuntos', href: '/catalogo?genero=Mujer&categoria=Conjuntos' },
        ],
      },
      {
        heading: 'Ropa de Baño',
        items: [
          { label: 'Rashguards', href: '/catalogo?genero=Mujer&categoria=Rashguards' },
          { label: 'Swimwear UPF', href: '/catalogo?genero=Mujer&categoria=Swimwear' },
          { label: 'Shorts UV', href: '/catalogo?genero=Mujer&categoria=Shorts' },
          { label: 'Pantalones UV', href: '/catalogo?genero=Mujer&categoria=Pantalones' },
          { label: 'Mangas UV', href: '/catalogo?genero=Mujer&categoria=Mangas' },
          { label: 'Guantes UV', href: '/catalogo?genero=Mujer&categoria=Guantes' },
        ],
      },
      {
        heading: 'Accesorios',
        items: [
          { label: 'Gorras UV', href: '/catalogo?genero=Mujer&categoria=Gorras' },
          { label: 'Sombreros', href: '/catalogo?categoria=Gorras' },
        ],
      },
    ],
  },
  {
    label: 'Hombre',
    href: '/catalogo?genero=Hombre',
    dropdown: [
      {
        heading: 'Prendas',
        items: [
          { label: 'Polos UV', href: '/catalogo?genero=Hombre&categoria=Polos' },
          { label: 'Casacas', href: '/catalogo?genero=Hombre&categoria=Casacas' },
          { label: 'Cortavientos', href: '/catalogo?genero=Hombre&categoria=Cortavientos' },
        ],
      },
      {
        heading: 'Accesorios',
        items: [
          { label: 'Gorras UV', href: '/catalogo?genero=Hombre&categoria=Gorras' },
          { label: 'Mangas UV', href: '/catalogo?genero=Hombre&categoria=Mangas' },
        ],
      },
    ],
  },
  {
    label: 'Niños',
    href: '/catalogo?genero=Niños',
    dropdown: [
      {
        heading: 'Escolar',
        items: [
          { label: 'Uniformes UV', href: '/catalogo?genero=Niños&actividad=Escolar' },
          { label: 'Conjuntos Escolares', href: '/catalogo?genero=Niños&categoria=Conjuntos' },
        ],
      },
    ],
  },
  { label: 'Deportivo', href: '/catalogo?actividad=Deportivo' },
  { label: 'Outdoor', href: '/catalogo?actividad=Outdoor' },
  { label: 'Escolar', href: '/catalogo?actividad=Escolar' },
  { label: 'Trekking', href: '/catalogo?actividad=Trekking' },
  {
    label: 'Accesorios',
    href: '/catalogo?categoria=Gorras',
    dropdown: [
      {
        items: [
          { label: 'Gorras UV', href: '/catalogo?categoria=Gorras' },
          { label: 'Mangas UV', href: '/catalogo?categoria=Mangas' },
          { label: 'Guantes UV', href: '/catalogo?categoria=Guantes' },
        ],
      },
    ],
  },
];

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { count } = useCart();
  const { items: wishlistItems } = useWishlist();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    toast.success('Sesión cerrada');
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalogo?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 bg-white ${
          isScrolled ? 'shadow-soft' : ''
        }`}
      >
        {/* Announcement bar */}
        <div className="bg-navy text-white py-2 px-4 text-center">
          <p className="text-[10px] uppercase tracking-widest font-medium">
            Envío gratis en compras desde S/ 199 &nbsp;·&nbsp; Tecnología UPF 50+ certificada
          </p>
        </div>

        {/* Main navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile menu */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-navy hover:opacity-70 transition-opacity"
            >
              <Menu strokeWidth={1.5} className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="font-sans text-xl sm:text-2xl font-medium text-navy tracking-wide uppercase">
                SolarWear
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={item.href}
                    className="flex items-center gap-1 text-[11px] uppercase tracking-widest font-medium text-navy hover:opacity-70 transition-all relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-navy hover:after:w-full after:transition-all after:duration-300"
                  >
                    {item.label}
                    {item.dropdown && (
                      <ChevronDown
                        strokeWidth={1.5}
                        className={`w-3 h-3 transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </Link>

                  {item.dropdown && activeDropdown === item.label && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white border border-slate-100 shadow-soft-lg rounded-sm py-6 px-6 min-w-[420px] z-50"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="flex gap-10">
                        {item.dropdown.map((group, gi) => (
                          <div key={gi} className="min-w-[120px]">
                            {group.heading && (
                              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium mb-3 border-b border-slate-100 pb-2">
                                {group.heading}
                              </p>
                            )}
                            <ul className="flex flex-col gap-2">
                              {group.items.map((sub) => (
                                <li key={sub.label}>
                                  <Link
                                    to={sub.href}
                                    onClick={() => setActiveDropdown(null)}
                                    className="text-sm text-slate-600 font-light hover:text-navy transition-colors whitespace-nowrap"
                                  >
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {item.label === 'Mujer' && (
                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-uv font-medium">
                              Nuevo — Ropa de Baño UV
                            </span>
                            <p className="text-xs text-slate-400 font-light mt-0.5">
                              Protección solar para la playa
                            </p>
                          </div>
                          <Link
                            to="/catalogo?actividad=Playa"
                            onClick={() => setActiveDropdown(null)}
                            className="text-[10px] uppercase tracking-widest font-medium text-navy border-b border-navy pb-0.5 hover:opacity-70 transition-opacity"
                          >
                            Ver todo →
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative group/tip hidden sm:flex">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-1 text-navy hover:opacity-70 transition-opacity"
                >
                  <Search strokeWidth={1.5} className="w-5 h-5" />
                </button>
                <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-navy text-white text-[10px] whitespace-nowrap rounded-sm opacity-0 group-hover/tip:opacity-100 transition-opacity z-50">
                  Buscar
                </span>
              </div>

              {/* User auth area */}
              {isAuthenticated && user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="w-8 h-8 rounded-full bg-navy text-white text-xs font-medium flex items-center justify-center hover:bg-navy/80 transition-colors"
                  >
                    {user.initials}
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 shadow-soft-lg rounded-sm py-2 z-50">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-xs font-medium text-navy truncate">{user.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/perfil"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-navy hover:bg-mist transition-colors"
                      >
                        <User strokeWidth={1.5} className="w-4 h-4" /> Mi Perfil
                      </Link>
                      <Link
                        to="/perfil#pedidos"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-navy hover:bg-mist transition-colors"
                      >
                        <Package strokeWidth={1.5} className="w-4 h-4" /> Mis Pedidos
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut strokeWidth={1.5} className="w-4 h-4" /> Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative group/tip hidden sm:flex">
                  <Link
                    to="/login"
                    className="p-1 text-navy hover:opacity-70 transition-opacity"
                  >
                    <User strokeWidth={1.5} className="w-5 h-5" />
                  </Link>
                  <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-navy text-white text-[10px] whitespace-nowrap rounded-sm opacity-0 group-hover/tip:opacity-100 transition-opacity z-50">
                    Iniciar sesión
                  </span>
                </div>
              )}

              <div className="relative group/tip">
                <Link to="/favoritos" className="p-1 text-navy hover:opacity-70 transition-opacity relative flex">
                  <Heart strokeWidth={1.5} className="w-5 h-5" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-navy text-white text-[9px] font-medium flex items-center justify-center rounded-full">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
                <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-navy text-white text-[10px] whitespace-nowrap rounded-sm opacity-0 group-hover/tip:opacity-100 transition-opacity z-50">
                  Favoritos
                </span>
              </div>

              <div className="relative group/tip">
                <Link
                  to="/carrito"
                  className="p-1 text-navy hover:opacity-70 transition-opacity relative flex"
                >
                  <ShoppingBag strokeWidth={1.5} className="w-5 h-5" />
                  {count > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-navy text-white text-[9px] font-medium flex items-center justify-center rounded-full">
                      {count}
                    </span>
                  )}
                </Link>
                <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-navy text-white text-[10px] whitespace-nowrap rounded-sm opacity-0 group-hover/tip:opacity-100 transition-opacity z-50">
                  Carrito
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="border-t border-slate-100 bg-white px-4 py-4">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex items-center gap-4">
              <Search strokeWidth={1.5} className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-sm text-navy placeholder:text-slate-400 font-light focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-slate-400 hover:text-navy transition-colors"
              >
                <X strokeWidth={1.5} className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col lg:hidden">
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <span className="text-xl font-medium text-navy tracking-wide uppercase">SolarWear</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-navy">
              <X strokeWidth={1.5} className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-1 p-6 overflow-y-auto flex-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-light text-navy hover:opacity-70 transition-opacity py-3 border-b border-slate-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-6 border-t border-slate-100 flex flex-col gap-4">
            {isAuthenticated && user ? (
              <>
                <Link
                  to="/perfil"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-sm text-navy"
                >
                  <div className="w-8 h-8 rounded-full bg-navy text-white text-xs font-medium flex items-center justify-center">
                    {user.initials}
                  </div>
                  {user.name}
                </Link>
                <button
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="text-left text-sm text-red-500"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <div className="flex gap-6">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-navy uppercase tracking-widest"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/registro"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-uv uppercase tracking-widest"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
