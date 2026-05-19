import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Check, CreditCard, Smartphone, ArrowLeft, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

type Step = 'envio' | 'pago' | 'confirmacion';

interface ShippingData {
  name: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  city: string;
  reference: string;
}

interface PaymentData {
  method: 'card' | 'yape' | 'plin';
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
}

const ORDERS_KEY = 'solarwear_orders';

function generateOrderNumber() {
  return 'SW-' + Date.now().toString(36).toUpperCase();
}

const STEPS: { key: Step; label: string }[] = [
  { key: 'envio', label: 'Envío' },
  { key: 'pago', label: 'Pago' },
  { key: 'confirmacion', label: 'Confirmación' },
];

export function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>('envio');
  const [orderNumber, setOrderNumber] = useState('');

  const [shipping, setShipping] = useState<ShippingData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    district: '',
    city: 'Lima',
    reference: '',
  });

  const [payment, setPayment] = useState<PaymentData>({
    method: 'card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const [shippingErrors, setShippingErrors] = useState<Partial<ShippingData>>({});
  const [paymentErrors, setPaymentErrors] = useState<Partial<PaymentData>>({});
  const [loading, setLoading] = useState(false);

  const shippingCost = total >= 99 ? 0 : 15;
  const finalTotal = total + shippingCost;

  if (items.length === 0 && step !== 'confirmacion') {
    return (
      <div className="pt-[104px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-navy mb-4">Tu carrito está vacío</h2>
          <Link to="/catalogo" className="text-xs uppercase tracking-widest font-medium text-navy border-b border-navy pb-1">
            Ir al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  const validateShipping = () => {
    const e: Partial<ShippingData> = {};
    if (!shipping.name.trim()) e.name = 'Requerido';
    if (!shipping.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) e.email = 'Correo inválido';
    if (!shipping.phone.trim() || shipping.phone.length < 9) e.phone = 'Teléfono inválido';
    if (!shipping.address.trim()) e.address = 'Requerido';
    if (!shipping.district.trim()) e.district = 'Requerido';
    return e;
  };

  const validatePayment = () => {
    const e: Partial<PaymentData> = {};
    if (payment.method === 'card') {
      const clean = payment.cardNumber.replace(/\s/g, '');
      if (clean.length < 16) e.cardNumber = 'Número inválido';
      if (!payment.cardName.trim()) e.cardName = 'Requerido';
      if (!payment.cardExpiry.match(/^\d{2}\/\d{2}$/)) e.cardExpiry = 'Formato MM/AA';
      if (payment.cardCvv.length < 3) e.cardCvv = 'CVV inválido';
    }
    return e;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateShipping();
    if (Object.keys(errs).length) { setShippingErrors(errs); return; }
    setShippingErrors({});
    setStep('pago');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validatePayment();
    if (Object.keys(errs).length) { setPaymentErrors(errs); return; }
    setPaymentErrors({});
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1800));

    const num = generateOrderNumber();
    setOrderNumber(num);

    const order = {
      id: Date.now().toString(),
      orderNumber: num,
      date: new Date().toISOString(),
      items: items.map((i) => ({
        productId: i.productId,
        name: i.product.name,
        image: i.product.image,
        price: i.product.price,
        quantity: i.quantity,
        selectedSize: i.selectedSize,
        selectedColor: i.selectedColor,
      })),
      shipping,
      payment: { method: payment.method },
      total: finalTotal,
      subtotal: total,
      shippingCost,
      userEmail: user?.email,
      status: 'procesando',
    };

    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    orders.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

    clearCart();
    setLoading(false);
    setStep('confirmacion');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatCardNumber = (val: string) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})/g, '$1 ').trim();

  const formatExpiry = (val: string) =>
    val.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d)/, '$1/$2');

  const currentStepIndex = STEPS.findIndex((s) => s.key === step);

  return (
    <div className="pt-[104px] min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Logo */}
        <Link to="/" className="block text-center text-xl font-medium text-navy tracking-wide uppercase mb-10">
          SolarWear
        </Link>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.key}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                    i < currentStepIndex
                      ? 'bg-navy text-white'
                      : i === currentStepIndex
                      ? 'bg-navy text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {i < currentStepIndex ? (
                    <Check strokeWidth={2.5} className="w-4 h-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`text-[10px] uppercase tracking-widest mt-2 font-medium ${
                    i === currentStepIndex ? 'text-navy' : 'text-slate-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-16 sm:w-24 h-px mx-3 mt-[-12px] ${i < currentStepIndex ? 'bg-navy' : 'bg-slate-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Form area */}
          <div className="lg:col-span-3">

            {/* STEP 1: Shipping */}
            {step === 'envio' && (
              <form onSubmit={handleShippingSubmit} noValidate className="flex flex-col gap-6">
                <h2 className="text-xl font-light text-navy mb-2">Datos de Envío</h2>

                {[
                  { key: 'name', label: 'Nombre Completo', type: 'text', placeholder: 'Nombre Apellido' },
                  { key: 'email', label: 'Correo Electrónico', type: 'email', placeholder: 'tu@correo.com' },
                  { key: 'phone', label: 'Teléfono', type: 'tel', placeholder: '9XX XXX XXX' },
                  { key: 'address', label: 'Dirección', type: 'text', placeholder: 'Av. / Jr. / Calle Nro.' },
                  { key: 'district', label: 'Distrito', type: 'text', placeholder: 'Ej: Miraflores, San Isidro...' },
                  { key: 'city', label: 'Ciudad', type: 'text', placeholder: 'Lima' },
                  { key: 'reference', label: 'Referencia (opcional)', type: 'text', placeholder: 'Cerca de...' },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-[10px] uppercase tracking-widest text-navy font-medium mb-2">
                      {label}
                    </label>
                    <input
                      type={type}
                      value={shipping[key as keyof ShippingData]}
                      onChange={(e) => {
                        setShipping((prev) => ({ ...prev, [key]: e.target.value }));
                        setShippingErrors((prev) => ({ ...prev, [key]: undefined }));
                      }}
                      placeholder={placeholder}
                      className={`w-full border-b py-2.5 text-sm text-navy placeholder:text-slate-300 font-light focus:outline-none transition-colors bg-transparent ${
                        shippingErrors[key as keyof ShippingData] ? 'border-red-400' : 'border-slate-200 focus:border-navy'
                      }`}
                    />
                    {shippingErrors[key as keyof ShippingData] && (
                      <p className="text-xs text-red-500 mt-1">{shippingErrors[key as keyof ShippingData]}</p>
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full py-4 bg-navy text-white text-xs uppercase tracking-widest font-medium hover:bg-navy/90 transition-colors rounded-sm mt-4"
                >
                  Continuar al Pago →
                </button>

                <Link to="/carrito" className="flex items-center gap-1 text-xs text-slate-400 hover:text-navy transition-colors mt-2">
                  <ArrowLeft strokeWidth={1.5} className="w-3.5 h-3.5" />
                  Volver al carrito
                </Link>
              </form>
            )}

            {/* STEP 2: Payment */}
            {step === 'pago' && (
              <form onSubmit={handlePaymentSubmit} noValidate className="flex flex-col gap-6">
                <h2 className="text-xl font-light text-navy mb-2">Método de Pago</h2>

                {/* Payment method selector */}
                <div className="grid grid-cols-3 gap-3">
                  {([
                    { key: 'card', label: 'Tarjeta', icon: CreditCard },
                    { key: 'yape', label: 'Yape', icon: Smartphone },
                    { key: 'plin', label: 'Plin', icon: Smartphone },
                  ] as const).map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setPayment((prev) => ({ ...prev, method: key }))}
                      className={`flex flex-col items-center gap-2 py-4 border rounded-sm transition-all ${
                        payment.method === key ? 'border-navy bg-navy/5' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Icon strokeWidth={1.5} className={`w-5 h-5 ${payment.method === key ? 'text-navy' : 'text-slate-400'}`} />
                      <span className={`text-xs font-medium uppercase tracking-widest ${payment.method === key ? 'text-navy' : 'text-slate-400'}`}>
                        {label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Card fields */}
                {payment.method === 'card' && (
                  <div className="flex flex-col gap-5 mt-2">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-navy font-medium mb-2">
                        Número de Tarjeta
                      </label>
                      <input
                        type="text"
                        value={payment.cardNumber}
                        onChange={(e) => setPayment((prev) => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
                        placeholder="0000 0000 0000 0000"
                        className={`w-full border-b py-2.5 text-sm text-navy placeholder:text-slate-300 font-light focus:outline-none bg-transparent transition-colors ${
                          paymentErrors.cardNumber ? 'border-red-400' : 'border-slate-200 focus:border-navy'
                        }`}
                      />
                      {paymentErrors.cardNumber && <p className="text-xs text-red-500 mt-1">{paymentErrors.cardNumber}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-navy font-medium mb-2">
                        Nombre en la Tarjeta
                      </label>
                      <input
                        type="text"
                        value={payment.cardName}
                        onChange={(e) => setPayment((prev) => ({ ...prev, cardName: e.target.value.toUpperCase() }))}
                        placeholder="NOMBRE APELLIDO"
                        className={`w-full border-b py-2.5 text-sm text-navy placeholder:text-slate-300 font-light focus:outline-none bg-transparent transition-colors ${
                          paymentErrors.cardName ? 'border-red-400' : 'border-slate-200 focus:border-navy'
                        }`}
                      />
                      {paymentErrors.cardName && <p className="text-xs text-red-500 mt-1">{paymentErrors.cardName}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-navy font-medium mb-2">
                          Vencimiento
                        </label>
                        <input
                          type="text"
                          value={payment.cardExpiry}
                          onChange={(e) => setPayment((prev) => ({ ...prev, cardExpiry: formatExpiry(e.target.value) }))}
                          placeholder="MM/AA"
                          className={`w-full border-b py-2.5 text-sm text-navy placeholder:text-slate-300 font-light focus:outline-none bg-transparent transition-colors ${
                            paymentErrors.cardExpiry ? 'border-red-400' : 'border-slate-200 focus:border-navy'
                          }`}
                        />
                        {paymentErrors.cardExpiry && <p className="text-xs text-red-500 mt-1">{paymentErrors.cardExpiry}</p>}
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-navy font-medium mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={payment.cardCvv}
                          onChange={(e) => setPayment((prev) => ({ ...prev, cardCvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                          placeholder="123"
                          className={`w-full border-b py-2.5 text-sm text-navy placeholder:text-slate-300 font-light focus:outline-none bg-transparent transition-colors ${
                            paymentErrors.cardCvv ? 'border-red-400' : 'border-slate-200 focus:border-navy'
                          }`}
                        />
                        {paymentErrors.cardCvv && <p className="text-xs text-red-500 mt-1">{paymentErrors.cardCvv}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {(payment.method === 'yape' || payment.method === 'plin') && (
                  <div className="bg-mist rounded-sm p-6 text-center">
                    <Smartphone strokeWidth={1.5} className="w-10 h-10 text-uv mx-auto mb-3" />
                    <p className="text-sm font-light text-navy mb-1">
                      Pagarás con {payment.method === 'yape' ? 'Yape' : 'Plin'} al confirmar
                    </p>
                    <p className="text-xs text-slate-400 font-light">
                      Se mostrará el número de cuenta tras confirmar el pedido.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-navy text-white text-xs uppercase tracking-widest font-medium hover:bg-navy/90 transition-colors rounded-sm mt-2 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Procesando pago...
                    </>
                  ) : (
                    <>
                      <Shield strokeWidth={1.5} className="w-4 h-4" />
                      Confirmar Pedido · S/ {finalTotal.toFixed(2)}
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('envio')}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-navy transition-colors"
                >
                  <ArrowLeft strokeWidth={1.5} className="w-3.5 h-3.5" />
                  Editar envío
                </button>
              </form>
            )}

            {/* STEP 3: Confirmation */}
            {step === 'confirmacion' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <Check strokeWidth={2.5} className="w-7 h-7 text-green-600" />
                </div>
                <h2 className="text-2xl font-light text-navy mb-2">¡Pedido Confirmado!</h2>
                <p className="text-slate-400 font-light text-sm mb-6">
                  Gracias por tu compra, {shipping.name.split(' ')[0]}.
                </p>
                <div className="bg-mist rounded-sm px-8 py-4 inline-block mb-8">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Número de Pedido</p>
                  <p className="text-xl font-medium text-navy tracking-widest">{orderNumber}</p>
                </div>
                <p className="text-sm text-slate-400 font-light mb-10 max-w-md mx-auto">
                  Te enviaremos una confirmación a <strong className="text-navy">{shipping.email}</strong>.
                  Tu pedido llegará en 2–4 días hábiles.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/"
                    className="px-8 py-4 bg-navy text-white text-xs uppercase tracking-widest font-medium hover:bg-navy/90 transition-colors rounded-sm"
                  >
                    Volver al Inicio
                  </Link>
                  <Link
                    to="/perfil#pedidos"
                    className="px-8 py-4 border border-navy text-navy text-xs uppercase tracking-widest font-medium hover:bg-navy hover:text-white transition-colors rounded-sm"
                  >
                    Ver Mis Pedidos
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          {step !== 'confirmacion' && (
            <div className="lg:col-span-2">
              <div className="bg-mist rounded-sm p-6 sticky top-28">
                <h3 className="text-xs uppercase tracking-widest font-medium text-navy mb-5">
                  Resumen ({items.length} {items.length === 1 ? 'artículo' : 'artículos'})
                </h3>

                <div className="flex flex-col gap-4 mb-5 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-14 h-16 overflow-hidden rounded-sm bg-white flex-shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-light text-navy line-clamp-1">{item.product.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Talla: {item.selectedSize} · ×{item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-light text-navy flex-shrink-0">
                        S/ {(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-200 pt-4 flex flex-col gap-2">
                  <div className="flex justify-between text-xs font-light text-slate-500">
                    <span>Subtotal</span>
                    <span>S/ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-light text-slate-500">
                    <span>Envío</span>
                    <span className={shippingCost === 0 ? 'text-green-600' : ''}>{shippingCost === 0 ? 'Gratis' : `S/ ${shippingCost.toFixed(2)}`}</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 mt-3 pt-3 flex justify-between text-navy">
                  <span className="text-xs font-medium uppercase tracking-widest">Total</span>
                  <span className="text-base font-light">S/ {finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
