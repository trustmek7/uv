import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.email.trim()) e.email = 'El correo es requerido.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Ingresa un correo válido.';
    if (!form.password) e.password = 'La contraseña es requerida.';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    const result = await login(form.email, form.password);
    setLoading(false);
    if (result.success) {
      toast.success('¡Bienvenido de vuelta!');
      navigate(from, { replace: true });
    } else {
      setErrors({ email: result.error });
    }
  };

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — image panel */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1200"
          alt="SolarWear lifestyle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/40" />
        <div className="absolute bottom-12 left-12 right-12">
          <span className="text-white/60 text-[10px] uppercase tracking-widest block mb-3">
            SolarWear — Protección UV
          </span>
          <p className="text-white text-3xl font-light leading-snug">
            Protégete del sol con estilo.
          </p>
        </div>
      </div>

      {/* Right — form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-16">
        <div className="max-w-sm w-full mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-navy transition-colors text-xs uppercase tracking-widest mb-12">
            <ArrowLeft strokeWidth={1.5} className="w-4 h-4" />
            Volver
          </Link>

          <div className="mb-10">
            <Link to="/" className="text-xl font-medium text-navy tracking-wide uppercase block mb-8">
              SolarWear
            </Link>
            <h1 className="text-2xl font-light text-navy mb-2">Iniciar Sesión</h1>
            <p className="text-sm text-slate-400 font-light">
              ¿No tienes cuenta?{' '}
              <Link to="/registro" className="text-navy underline underline-offset-4 hover:opacity-70">
                Regístrate aquí
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
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
                  placeholder="••••••••"
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
              {errors.password && <p className="text-xs text-red-500 mt-1.5">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-4 bg-navy text-white text-xs uppercase tracking-widest font-medium hover:bg-navy/90 transition-colors rounded-sm disabled:opacity-60"
            >
              {loading ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400 font-light">
              Al continuar, aceptas nuestros{' '}
              <a href="#" className="underline underline-offset-2">Términos y Condiciones</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
