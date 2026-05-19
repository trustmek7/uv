import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, ShoppingBag, ChevronRight, Minus, Plus, Shield, Droplets, Wind, RotateCcw, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { toast } from 'sonner';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const product = products.find((p) => p.id === id);

  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [sizeError, setSizeError] = useState(false);

  if (!product) {
    return (
      <div className="pt-[104px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-navy mb-4">Producto no encontrado</h2>
          <Link to="/catalogo" className="text-xs uppercase tracking-widest font-medium text-navy border-b border-navy pb-1">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const related = products.filter((p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender)).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      toast.error('Selecciona una talla');
      return;
    }
    setSizeError(false);
    addToCart(product, selectedColor, selectedSize, quantity);
    toast.success('Agregado al carrito');
  };

  const handleToggleWishlist = () => {
    toggle(product.id);
    toast.success(wishlisted ? 'Eliminado de favoritos' : 'Agregado a favoritos');
  };

  return (
    <div className="pt-[104px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 mb-10 flex-wrap">
          <Link to="/" className="hover:text-navy transition-colors">Inicio</Link>
          <ChevronRight strokeWidth={1.5} className="w-3 h-3" />
          <Link to="/catalogo" className="hover:text-navy transition-colors">Catálogo</Link>
          <ChevronRight strokeWidth={1.5} className="w-3 h-3" />
          <Link to={`/catalogo?categoria=${product.category}`} className="hover:text-navy transition-colors">
            {product.category}
          </Link>
          <ChevronRight strokeWidth={1.5} className="w-3 h-3" />
          <span className="text-navy">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Image gallery */}
          <div className="flex flex-col gap-4">
            <div className="aspect-[3/4] overflow-hidden rounded-sm bg-mist relative">
              <img
                src={product.images[activeImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.discount && (
                <span className="absolute top-4 left-4 bg-white text-red-500 text-xs font-medium px-3 py-1 rounded-sm border border-slate-100">
                  -{product.discount}%
                </span>
              )}
              <span className="absolute top-4 right-4 bg-navy text-white text-[9px] uppercase tracking-widest px-2 py-1 rounded-sm font-medium">
                {product.upf}
              </span>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 sm:w-20 flex-shrink-0 aspect-square overflow-hidden rounded-sm border-2 transition-colors ${
                      activeImage === i ? 'border-navy' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-slate-400 hover:text-navy transition-colors mb-6 w-fit"
            >
              <ArrowLeft strokeWidth={1.5} className="w-3.5 h-3.5" />
              Volver
            </button>

            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium mb-2">
              {product.category} · {product.gender}
            </span>

            <h1 className="text-2xl sm:text-3xl font-light text-navy mb-4 leading-snug">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl text-navy font-light">S/ {product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-base text-slate-400 line-through">
                  S/ {product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.discount && (
                <span className="bg-red-50 text-red-500 text-xs font-medium px-2 py-0.5 rounded-sm">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            <div className="w-12 h-px bg-slate-200 mb-6" />

            {/* Color selector */}
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-widest text-navy font-medium mb-3">
                Color
              </p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color ? 'border-navy scale-110' : 'border-slate-200 hover:border-slate-400'
                    }`}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] uppercase tracking-widest text-navy font-medium">
                  Talla {sizeError && <span className="text-red-500 normal-case tracking-normal font-light"> — Selecciona una talla</span>}
                </p>
                <Link to="/guia-de-tallas" className="text-[10px] uppercase tracking-widest text-slate-400 hover:text-navy transition-colors underline underline-offset-2">
                  Guía de tallas
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    className={`w-12 h-12 text-sm font-light rounded-sm border transition-all ${
                      selectedSize === size
                        ? 'border-navy bg-navy text-white'
                        : sizeError
                        ? 'border-red-300 text-slate-600 hover:border-navy'
                        : 'border-slate-200 text-slate-600 hover:border-navy'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center border border-slate-200 rounded-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-navy hover:bg-mist transition-colors"
                >
                  <Minus strokeWidth={1.5} className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-light text-navy">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-navy hover:bg-mist transition-colors"
                >
                  <Plus strokeWidth={1.5} className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm text-slate-400 font-light">En stock</span>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-navy text-white text-xs uppercase tracking-widest font-medium hover:bg-navy/90 transition-colors rounded-sm"
              >
                <ShoppingBag strokeWidth={1.5} className="w-4 h-4" />
                Agregar al Carrito
              </button>
              <button
                onClick={handleToggleWishlist}
                className={`w-12 h-12 flex items-center justify-center border rounded-sm transition-colors ${
                  wishlisted ? 'border-uv bg-uv/5 text-uv' : 'border-slate-200 text-slate-400 hover:border-navy hover:text-navy'
                }`}
              >
                <Heart
                  strokeWidth={1.5}
                  className={`w-5 h-5 ${wishlisted ? 'fill-uv' : ''}`}
                />
              </button>
            </div>

            <button
              onClick={() => {
                handleAddToCart();
                if (selectedSize) navigate('/carrito');
              }}
              className="w-full py-4 border border-navy text-navy text-xs uppercase tracking-widest font-medium hover:bg-navy hover:text-white transition-colors rounded-sm mb-10"
            >
              Comprar Ahora
            </button>

            {/* Feature badges */}
            <div className="grid grid-cols-2 gap-4 py-8 border-t border-b border-slate-100 mb-8">
              {[
                { icon: Shield, label: product.upf, desc: 'Protección certificada' },
                { icon: Droplets, label: 'Secado Rápido', desc: 'Tejido técnico' },
                { icon: Wind, label: 'Ultraligero', desc: 'Alta tecnología' },
                { icon: RotateCcw, label: 'Lavable', desc: 'Protección duradera' },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon strokeWidth={1.5} className="w-4 h-4 text-uv mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-navy">{label}</p>
                    <p className="text-[10px] text-slate-400 font-light">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-navy font-medium mb-3">
                Descripción
              </p>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                Prenda de alto rendimiento fabricada con tecnología UV avanzada. Ideal para actividades
                {product.activity === 'Playa' ? ' en la playa y deportes acuáticos' : ` de ${product.activity.toLowerCase()}`}.
                La protección {product.upf} bloquea el 98% de los rayos UVA y UVB, manteniéndote
                protegido sin sacrificar el confort ni el estilo.
              </p>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-24 lg:mt-32 pt-16 border-t border-slate-100">
            <h2 className="text-2xl font-light text-navy mb-12 text-center">También te puede interesar</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-10">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/producto/${p.id}`}
                  className="group flex flex-col"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-mist rounded-sm mb-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">{p.category}</span>
                  <h3 className="text-sm text-navy font-light line-clamp-1 mb-1">{p.name}</h3>
                  <span className="text-sm text-navy">S/ {p.price.toFixed(2)}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
