import React from 'react';
const images = [
'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=600',
'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=600',
'https://images.unsplash.com/photo-1542272201-b1ca555f8505?auto=format&fit=crop&q=80&w=600',
'https://images.unsplash.com/photo-1521555562723-51829636b110?auto=format&fit=crop&q=80&w=600',
'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600'];

export function SocialGallery() {
  return (
    <section className="py-24 lg:py-32 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-sm uppercase tracking-widest font-medium text-navy mb-2">
          Síguenos en Instagram
        </h2>
        <a
          href="#"
          className="text-2xl font-light text-slate-500 hover:text-navy transition-colors">
          
          @solarwear
        </a>
      </div>

      <div className="flex w-full overflow-x-auto scrollbar-hide snap-x">
        {images.map((img, idx) =>
        <a
          key={idx}
          href="#"
          className="relative flex-none w-64 sm:w-1/4 lg:w-1/5 aspect-square group snap-center">
          
            <img
            src={img}
            alt="Instagram post"
            className="w-full h-full object-cover" />
          
            <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-300 flex items-center justify-center"></div>
          </a>
        )}
      </div>
    </section>);

}