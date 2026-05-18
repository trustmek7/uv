import React from 'react';
import { Hero } from '../components/Hero';
import { FeaturedCategories } from '../components/FeaturedCategories';
import { PromoBanners } from '../components/PromoBanners';
import { BestSellers } from '../components/BestSellers';
import { KidsCollection } from '../components/KidsCollection';
import { UVTechnology } from '../components/UVTechnology';
import { Testimonials } from '../components/Testimonials';
import { SocialGallery } from '../components/SocialGallery';

export function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <PromoBanners />
      <KidsCollection />
      <BestSellers />
      <UVTechnology />
      <Testimonials />
      <SocialGallery />
    </>
  );
}
