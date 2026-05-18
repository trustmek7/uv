import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, ChevronRight, User, LogOut, MapPin, Heart, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

interface OrderItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
  selectedSize: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  total: number;
  shipping: { name: string; address: string; district: string; city: string };
  payment: { method: string };
  status: 'procesando' | 'enviado' | 'entregado';
  userEmail?: string;
}

const STATUS_CONFIG = {
  procesando: { label: 'Procesando', color: 'bg-yellow-100 text-yellow-700' },
  enviado: { label: 'Enviado', color: 'bg-blue-100 text-blue-700' },
  entregado: { label: 'Entregado', color: 'bg-green-100 text-green-700' },
};

const TABS = [
  { key: 'perfil', label: 'Mi Perfil', icon: User },
  { key: 'pedidos', label: 'Mis Pedidos', icon: Package },
  { key: 'favoritos', label: 'Favoritos', icon: Heart },
];

export function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('perfil');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/perfil' } });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (window.location.hash === '#pedidos') setActiveTab('pedidos');
  }, []);

  useEffect(() => {
    const all: Order[] = JSON.parse(localStorage.getItem('solarwear_orders') || '[]');
    const mine = user ? all.filter((o) => !o.userEmail || o.userEmail === user.email) : all;
    setOrders(mine);
  }, [user]);

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="pt-[104px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header */}
        <div className="flex items-center gap-5 mb-12">
          <div className="w-16 h-16 rounded-full bg-navy text-white text-2xl font-medium flex items-center justify-center flex-shrink-0">
            {user.initials}
          </div>
          <div>
            <h1 className="text-2xl font-light text-navy">{user.name}</h1>
            <p className="text-sm text-slate-400 font-light">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Sidebar nav */}
          <div className="lg:col-span-1">
            <nav className="flex flex-col gap-1">
              {TABS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-light transition-colors text-left ${
                    activeTab === key
                      ? 'bg-navy text-white'
                      : 'text-slate-600 hover:bg-mist hover:text-navy'
                  }`}
                >
                  <Icon strokeWidth={1.5} className="w-4 h-4" />
                  {label}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-light text-red-400 hover:bg-red-50 transition-colors text-left mt-4"
              >
                <LogOut strokeWidth={1.5} className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </nav>
          </div>

          {/* Content area */}
          <div className="lg:col-span-3">

            {/* Tab: Mi Perfil */}
            {activeTab === 'perfil' && (
              <div>
                <h2 className="text-lg font-light text-navy mb-8 pb-4 border-b border-slate-100">
                  Información Personal
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { label: 'Nombre Completo', value: user.name, icon: User },
                    { label: 'Correo Electrónico', value: user.email, icon: User },
                    { label: 'Miembro desde', value: new Date(user.createdAt).toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' }), icon: Clock },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col gap-1">
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">{label}</p>
                      <p className="text-sm text-navy font-light">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-6 bg-mist rounded-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Package strokeWidth={1.5} className="w-5 h-5 text-uv" />
                    <p className="text-sm font-medium text-navy">{orders.length} {orders.length === 1 ? 'pedido realizado' : 'pedidos realizados'}</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('pedidos')}
                    className="text-xs uppercase tracking-widest font-medium text-navy border-b border-navy pb-0.5 hover:opacity-70 transition-opacity"
                  >
                    Ver todos mis pedidos →
                  </button>
                </div>
              </div>
            )}

            {/* Tab: Mis Pedidos */}
            {activeTab === 'pedidos' && (
              <div>
                <h2 className="text-lg font-light text-navy mb-8 pb-4 border-b border-slate-100">
                  Mis Pedidos
                </h2>

                {orders.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-12 h-12 rounded-full bg-mist flex items-center justify-center mx-auto mb-4">
                      <Package strokeWidth={1.5} className="w-5 h-5 text-slate-400" />
                    </div>
                    <p className="text-sm text-slate-400 font-light mb-6">Aún no tienes pedidos.</p>
                    <Link
                      to="/catalogo"
                      className="inline-block px-8 py-3 bg-navy text-white text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-navy/90 transition-colors"
                    >
                      Empezar a Comprar
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-slate-100 rounded-sm p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                          <div>
                            <p className="text-xs text-slate-400 font-light mb-1">
                              {new Date(order.date).toLocaleDateString('es-PE', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                            <p className="text-sm font-medium text-navy tracking-widest">{order.orderNumber}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm font-medium ${STATUS_CONFIG[order.status]?.color || ''}`}>
                              {STATUS_CONFIG[order.status]?.label || order.status}
                            </span>
                            <span className="text-sm font-light text-navy">S/ {order.total.toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="flex gap-3 overflow-x-auto">
                          {order.items.slice(0, 4).map((item, i) => (
                            <div key={i} className="flex-shrink-0">
                              <div className="w-14 h-16 bg-mist rounded-sm overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                            </div>
                          ))}
                          {order.items.length > 4 && (
                            <div className="w-14 h-16 bg-mist rounded-sm flex items-center justify-center flex-shrink-0">
                              <span className="text-xs text-slate-400 font-light">+{order.items.length - 4}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-3 text-xs text-slate-400 font-light">
                          <MapPin strokeWidth={1.5} className="w-3.5 h-3.5" />
                          {order.shipping.address}, {order.shipping.district}, {order.shipping.city}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Favoritos */}
            {activeTab === 'favoritos' && (
              <div>
                <h2 className="text-lg font-light text-navy mb-8 pb-4 border-b border-slate-100">
                  Mis Favoritos
                </h2>
                <div className="text-center py-10">
                  <Link to="/favoritos" className="inline-block px-8 py-3 bg-navy text-white text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-navy/90 transition-colors">
                    Ver Lista de Deseos
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
