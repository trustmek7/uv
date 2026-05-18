import React from 'react';
const reviews = [
{
  name: 'María Fernanda R.',
  content:
  'La calidad de los polos anti-UV es increíble. Corro todos los fines de semana en la sierra y la protección se nota. Además, son súper frescos.'
},
{
  name: 'Carlos Mendoza',
  content:
  'Compré los conjuntos escolares para mis hijos. Me da mucha tranquilidad saber que están protegidos del sol durante el recreo y educación física.'
},
{
  name: 'Lucía Vargas',
  content:
  'Las casacas cortavientos son ligeras pero protegen muy bien. El diseño es moderno, no parece la típica ropa técnica aburrida.'
}];

export function Testimonials() {
  return (
    <section className="bg-white py-24 lg:py-32 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-light text-navy mb-4">
            La Experiencia SolarWear
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {reviews.map((review, idx) =>
          <div key={idx} className="flex flex-col items-center text-center">
              <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed mb-6">
                "{review.content}"
              </p>
              <div className="w-8 h-[1px] bg-slate-200 mb-4"></div>
              <h4 className="text-xs uppercase tracking-widest text-navy font-medium">
                {review.name}
              </h4>
            </div>
          )}
        </div>
      </div>
    </section>);

}