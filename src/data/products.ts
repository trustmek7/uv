import { Product } from '../types';

export const products: Product[] = [
{
  id: 'p1',
  name: 'Polo Anti-UV Trail Mujer',
  price: 129.0,
  originalPrice: 159.0,
  discount: 19,
  image:
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800'],

  colors: ['#0B1F3A', '#FFFFFF', '#A9D6FF'],
  sizes: ['XS', 'S', 'M', 'L'],
  category: 'Polos',
  gender: 'Mujer',
  upf: 'UPF 50+',
  activity: 'Trekking',
  isConjunto: false,
  isNew: true
},
{
  id: 'p2',
  name: 'Polo Anti-UV Hombre Running',
  price: 119.0,
  image:
  'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800'],

  colors: ['#0B1F3A', '#3A86C8', '#000000'],
  sizes: ['S', 'M', 'L', 'XL'],
  category: 'Polos',
  gender: 'Hombre',
  upf: 'UPF 50+',
  activity: 'Running',
  isConjunto: false
},
{
  id: 'p3',
  name: 'Legging Deportivo High-Rise',
  price: 149.0,
  originalPrice: 189.0,
  discount: 21,
  image:
  'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'],

  colors: ['#0B1F3A', '#000000'],
  sizes: ['XS', 'S', 'M', 'L'],
  category: 'Leggings',
  gender: 'Mujer',
  upf: 'UPF 50+',
  activity: 'Deportivo',
  isConjunto: false
},
{
  id: 'p4',
  name: 'Casaca Outdoor Impermeable',
  price: 289.0,
  image:
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=800'],

  colors: ['#3A86C8', '#0B1F3A', '#808080'],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  category: 'Casacas',
  gender: 'Hombre',
  upf: 'UPF 50++',
  activity: 'Outdoor',
  isConjunto: false,
  isNew: true
},
{
  id: 'p5',
  name: 'Conjunto Escolar Deportivo Niño',
  price: 199.0,
  originalPrice: 249.0,
  discount: 20,
  image:
  'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800'],

  colors: ['#0B1F3A', '#FFFFFF'],
  sizes: ['S', 'M', 'L'],
  category: 'Conjuntos',
  gender: 'Niños',
  upf: 'UPF 30+',
  activity: 'Escolar',
  isConjunto: true
},
{
  id: 'p6',
  name: 'Cortavientos Trail Pro',
  price: 229.0,
  image:
  'https://images.unsplash.com/photo-1542272201-b1ca555f8505?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1542272201-b1ca555f8505?auto=format&fit=crop&q=80&w=800'],

  colors: ['#A9D6FF', '#000000'],
  sizes: ['S', 'M', 'L', 'XL'],
  category: 'Cortavientos',
  gender: 'Unisex',
  upf: 'UPF 50+',
  activity: 'Trekking',
  isConjunto: false
},
{
  id: 'p7',
  name: 'Gorra UV Outdoor',
  price: 69.0,
  image:
  'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800'],

  colors: ['#F7F9FC', '#0B1F3A'],
  sizes: ['M'],
  category: 'Gorras',
  gender: 'Unisex',
  upf: 'UPF 50++',
  activity: 'Outdoor',
  isConjunto: false
},
{
  id: 'p8',
  name: 'Conjunto Deportivo Mujer',
  price: 259.0,
  originalPrice: 299.0,
  discount: 13,
  image:
  'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800'],

  colors: ['#3A86C8', '#000000'],
  sizes: ['XS', 'S', 'M', 'L'],
  category: 'Conjuntos',
  gender: 'Mujer',
  upf: 'UPF 50+',
  activity: 'Deportivo',
  isConjunto: true,
  isNew: true
},
{
  id: 'p9',
  name: 'Mangas UV Ciclismo',
  price: 49.0,
  image:
  'https://images.unsplash.com/photo-1521555562723-51829636b110?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1521555562723-51829636b110?auto=format&fit=crop&q=80&w=800'],

  colors: ['#FFFFFF', '#000000'],
  sizes: ['S', 'M', 'L'],
  category: 'Mangas',
  gender: 'Unisex',
  upf: 'UPF 50+',
  activity: 'Deportivo',
  isConjunto: false
},
{
  id: 'p10',
  name: 'Camiseta Trekking Manga Larga',
  price: 139.0,
  image:
  'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=800'],

  colors: ['#A9D6FF', '#F7F9FC'],
  sizes: ['S', 'M', 'L', 'XL'],
  category: 'Polos',
  gender: 'Mujer',
  upf: 'UPF 50++',
  activity: 'Trekking',
  isConjunto: false
},
{
  id: 'p11',
  name: 'Uniforme Deportivo Escolar',
  price: 189.0,
  image:
  'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&q=80&w=800'],

  colors: ['#0B1F3A', '#FFFFFF'],
  sizes: ['XS', 'S', 'M', 'L'],
  category: 'Conjuntos',
  gender: 'Niños',
  upf: 'UPF 30+',
  activity: 'Escolar',
  isConjunto: true
},
{
  id: 'p12',
  name: 'Short Running UV',
  price: 89.0,
  originalPrice: 109.0,
  discount: 18,
  image:
  'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=800'],

  colors: ['#000000', '#3A86C8'],
  sizes: ['S', 'M', 'L', 'XL'],
  category: 'Leggings', // Grouping shorts with bottoms
  gender: 'Hombre',
  upf: 'UPF 50+',
  activity: 'Running',
  isConjunto: false
}];