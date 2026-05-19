import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Partial<Record<keyof typeof form, string>> = {};
    if (!form.name.trim()) e.name = 'El nombre es requerido.';
    else if (form.name.trim().length < 2) e.name = 'Ingresa tu nombre completo.';
    if (!form.email.trim()) e.email = 'El correo es requerido.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Ingresa un correo válido.';
    if (!form.password) e.password = 'La contraseña es requerida.';
    else if (form.password.length < 6) e.password = 'Mínimo 6 caracteres.';
    if (!form.confirm) e.confirm = 'Confirma tu contraseña.';
    else if (form.confirm !== form.password) e.confirm = 'Las contraseñas no coinciden.';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    const result = await register(form.name, form.email, form.password);
    setLoading(false);
    if (result.success) {
      toast.success('¡Cuenta creada! Bienvenido a SolarWear.');
      navigate('/');
    } else {
      setErrors({ email: result.error });
    }
  };

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const passwordStrength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthLabels = ['', 'Débil', 'Buena', 'Fuerte'];
  const strengthColors = ['', 'bg-red-400', 'bg-yellow-400', 'bg-green-500'];

  return (
    <div className="min-h-screen flex">
      {/* Left — image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src="/img/SolarWear_portada.jpg"
          alt="SolarWear lifestyle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/40" />
        <div className="absolute bottom-12 left-12 right-12">
          <span className="text-white/60 text-[10px] uppercase tracking-widest block mb-3">
            Nueva cuenta
          </span>
          <p className="text-white text-3xl font-light leading-snug">
            Únete a la comunidad SolarWear.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            {['Descuentos exclusivos para miembros', 'Historial de pedidos', 'Lista de deseos'].map((b) => (
              <div key={b} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                  <Check strokeWidth={2.5} className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-white/70 text-sm font-light">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-16 overflow-y-auto">
        <div className="max-w-sm w-full mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-navy transition-colors text-xs uppercase tracking-widest mb-12">
            <ArrowLeft strokeWidth={1.5} className="w-4 h-4" />
            Volver
          </Link>

          <div className="mb-10">
            <Link to="/" className="text-xl font-medium text-navy tracking-wide uppercase block mb-8">
              SolarWear
            </Link>
            <h1 className="text-2xl font-light text-navy mb-2">Crear Cuenta</h1>
            <p className="text-sm text-slate-400 font-light">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-navy underline underline-offset-4 hover:opacity-70">
                Inicia sesión
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
            {/* Name */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-navy font-medium mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                placeholder="Nombre Apellido"
                className={`w-full border-b py-2.5 text-sm text-navy placeholder:text-slate-300 font-light focus:outline-none transition-colors bg-transparent ${
                  errors.name ? 'border-red-400' : 'border-slate-200 focus:border-navy'
                }`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-navy font-medium mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="tu@correo.com"
                className={`w-full border-b py-2.5 text-sm text-navy placeholder:text-slate-300 font-light focus:outline-none transition-colors bg-transparent ${
                  errors.email ? 'border-red-400' : 'border-slate-200 focus:border-navy'
                }`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-navy font-medium mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange('password')}
                  placeholder="Mínimo 6 caracteres"
                  className={`w-full border-b py-2.5 text-sm text-navy placeholder:text-slate-300 font-light focus:outline-none transition-colors bg-transparent pr-8 ${
                    errors.password ? 'border-red-400' : 'border-slate-200 focus:border-navy'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy transition-colors"
                >
                  {showPassword ? (
                    <EyeOff strokeWidth={1.5} className="w-4 h-4" />
                  ) : (
                    <Eye strokeWidth={1.5} className="w-4 h-4" />
                  )}
                </button>
              </div>
              {form.password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${strengthColors[passwordStrength]}`}
                      style={{ width: `${(passwordStrength / 3) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400">{strengthLabels[passwordStrength]}</span>
                </div>
              )}
              {errors.password && <p className="text-xs text-red-500 mt-1.5">{errors.password}</p>}
            </div>

            {/* Confirm */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-navy font-medium mb-2">
                Confirmar Contraseña
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.confirm}
                onChange={handleChange('confirm')}
                placeholder="Repite tu contraseña"
                className={`w-full border-b py-2.5 text-sm text-navy placeholder:text-slate-300 font-light focus:outline-none transition-colors bg-transparent ${
                  errors.confirm ? 'border-red-400' : 'border-slate-200 focus:border-navy'
                }`}
              />
              {errors.confirm && <p className="text-xs text-red-500 mt-1.5">{errors.confirm}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-4 bg-navy text-white text-xs uppercase tracking-widest font-medium hover:bg-navy/90 transition-colors rounded-sm disabled:opacity-60"
            >
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
          </form>

          <p className="text-[10px] text-slate-400 text-center mt-6 font-light leading-relaxed">
            Al registrarte aceptas nuestros{' '}
            <a href="#" className="underline underline-offset-2">Términos y Condiciones</a>{' '}
            y nuestra{' '}
            <a href="#" className="underline underline-offset-2">Política de Privacidad</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
