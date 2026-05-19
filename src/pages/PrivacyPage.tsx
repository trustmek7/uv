import React from 'react';
import { WHATSAPP_URL } from '../data/constants';

const sections = [
  {
    title: 'Información que Recopilamos',
    content: `Al utilizar nuestra tienda recopilamos:
• Datos de registro: nombre, correo electrónico y contraseña al crear una cuenta.
• Datos de pedido: dirección de entrega, número de contacto e historial de compras.
• Datos de navegación: páginas visitadas, productos visualizados y preferencias de filtrado (cookies técnicas).
• Correo de suscripción al newsletter (únicamente si lo proporcionas voluntariamente).`,
  },
  {
    title: 'Uso de la Información',
    content: `Utilizamos tus datos exclusivamente para:
• Procesar y gestionar tus pedidos.
• Enviarte confirmaciones y actualizaciones de estado de envío.
• Enviar novedades y promociones si te suscribes al newsletter (puedes darte de baja en cualquier momento).
• Mejorar la experiencia de navegación en la tienda.
No vendemos ni compartimos tus datos personales con terceros para fines comerciales.`,
  },
  {
    title: 'Seguridad de los Datos',
    content: `Implementamos medidas técnicas y organizativas para proteger tu información:
• Contraseñas almacenadas con cifrado seguro.
• Conexiones protegidas mediante HTTPS.
• Acceso restringido a datos personales al personal autorizado.`,
  },
  {
    title: 'Cookies',
    content: `Usamos cookies técnicas necesarias para el funcionamiento de la tienda (carrito, sesión de usuario). No utilizamos cookies publicitarias de terceros. Puedes deshabilitar las cookies en tu navegador, aunque algunas funcionalidades podrían verse afectadas.`,
  },
  {
    title: 'Tus Derechos',
    content: `Conforme a la Ley N° 29733 de Protección de Datos Personales del Perú, tienes derecho a:
• Acceder a tus datos personales.
• Solicitar la rectificación de datos incorrectos.
• Solicitar la cancelación de tu cuenta y datos asociados.
• Oponerte al tratamiento de tus datos.
Para ejercer cualquiera de estos derechos, contáctanos por WhatsApp al +51 986 782 148 (Arequipa, Perú).`,
  },
  {
    title: 'Cambios a esta Política',
    content: `Nos reservamos el derecho de actualizar esta política de privacidad. Cualquier cambio significativo será notificado mediante un aviso en la tienda o por correo electrónico.`,
  },
];

export function PrivacyPage() {
  return (
    <div className="pt-[104px]">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Legal</p>
          <h1 className="text-4xl font-light text-navy mb-4">Política de Privacidad</h1>
          <p className="text-sm text-slate-400 font-light">
            Última actualización: mayo de 2026
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((sec) => (
            <div key={sec.title} className="border-b border-slate-100 pb-10">
              <h2 className="text-sm font-medium text-navy mb-4">{sec.title}</h2>
              <p className="text-sm text-slate-500 font-light leading-relaxed whitespace-pre-line break-words">
                {sec.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-slate-50 rounded-sm text-center">
          <p className="text-sm text-navy font-light mb-4">¿Tienes preguntas sobre privacidad?</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs uppercase tracking-widest font-medium text-navy border-b border-navy pb-1 hover:opacity-70 transition-opacity"
          >
            Contáctanos →
          </a>
        </div>
      </section>
    </div>
  );
}
