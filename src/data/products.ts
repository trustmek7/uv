import { Product } from '../types';

export const products: Product[] = [
{
  id: 'p1',
  name: 'Polo Anti-UV Trail Mujer',
  price: 79.0,
  originalPrice: 89.0,
  discount: 11,
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
  price: 72.0,
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
  price: 84.0,
  originalPrice: 90.0,
  discount: 7,
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
  price: 90.0,
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
  price: 68.0,
  originalPrice: 80.0,
  discount: 15,
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
  price: 88.0,
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
  price: 55.0,
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
  price: 78.0,
  originalPrice: 90.0,
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
  price: 45.0,
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
  price: 82.0,
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
  price: 70.0,
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
  price: 65.0,
  originalPrice: 78.0,
  discount: 17,
  image:
  'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=800'],
  colors: ['#000000', '#3A86C8'],
  sizes: ['S', 'M', 'L', 'XL'],
  category: 'Leggings',
  gender: 'Hombre',
  upf: 'UPF 50+',
  activity: 'Running',
  isConjunto: false
},
{
  id: 'rb1',
  name: 'Rashguard Manga Larga UPF 50+',
  price: 85.0,
  originalPrice: 90.0,
  discount: 6,
  image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
  images: [
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800'
  ],
  colors: ['#0B1F3A', '#3A86C8', '#FFFFFF'],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  category: 'Rashguards',
  gender: 'Mujer',
  upf: 'UPF 50+',
  activity: 'Playa',
  isConjunto: false,
  isNew: true
},
{
  id: 'rb2',
  name: 'Rashguard Manga Corta Solar',
  price: 75.0,
  image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=800',
  images: [
    'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800'
  ],
  colors: ['#A9D6FF', '#0B1F3A', '#000000'],
  sizes: ['XS', 'S', 'M', 'L'],
  category: 'Rashguards',
  gender: 'Mujer',
  upf: 'UPF 50+',
  activity: 'Playa',
  isConjunto: false
},
{
  id: 'rb3',
  name: 'Traje de Baño Entero UPF 50++',
  price: 84.0,
  originalPrice: 90.0,
  discount: 7,
  image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
  images: [
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800'
  ],
  colors: ['#0B1F3A', '#000000', '#3A86C8'],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  category: 'Swimwear',
  gender: 'Mujer',
  upf: 'UPF 50++',
  activity: 'Playa',
  isConjunto: false,
  isNew: true
},
{
  id: 'rb4',
  name: 'Short UV Deportivo Playa',
  price: 69.0,
  image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800',
  images: [
    'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800'
  ],
  colors: ['#0B1F3A', '#A9D6FF', '#FFFFFF'],
  sizes: ['XS', 'S', 'M', 'L'],
  category: 'Shorts',
  gender: 'Mujer',
  upf: 'UPF 50+',
  activity: 'Playa',
  isConjunto: false
},
{
  id: 'rb5',
  name: 'Pantalón UV Acuático Slim',
  price: 83.0,
  originalPrice: 90.0,
  discount: 8,
  image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
  images: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800'
  ],
  colors: ['#0B1F3A', '#000000'],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  category: 'Pantalones',
  gender: 'Mujer',
  upf: 'UPF 50+',
  activity: 'Playa',
  isConjunto: false
},
{
  id: 'rb6',
  name: 'Casaca Ligera UV Playa',
  price: 89.0,
  image: 'https://images.unsplash.com/photo-1542272201-b1ca555f8505?auto=format&fit=crop&q=80&w=800',
  images: [
    'https://images.unsplash.com/photo-1542272201-b1ca555f8505?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=800'
  ],
  colors: ['#FFFFFF', '#A9D6FF', '#0B1F3A'],
  sizes: ['S', 'M', 'L', 'XL'],
  category: 'Casacas',
  gender: 'Mujer',
  upf: 'UPF 50+',
  activity: 'Playa',
  isConjunto: false,
  isNew: true
},
{
  id: 'rb7',
  name: 'Polo Manga Larga UV Playa',
  price: 77.0,
  image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=800',
  images: [
    'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800'
  ],
  colors: ['#FFFFFF', '#3A86C8', '#0B1F3A'],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  category: 'Polos',
  gender: 'Mujer',
  upf: 'UPF 50++',
  activity: 'Playa',
  isConjunto: false
},
{
  id: 'rb8',
  name: 'Polo Manga Corta UV Anti-Solar',
  price: 72.0,
  originalPrice: 86.0,
  discount: 16,
  image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800',
  images: [
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800'
  ],
  colors: ['#A9D6FF', '#FFFFFF', '#0B1F3A'],
  sizes: ['XS', 'S', 'M', 'L'],
  category: 'Polos',
  gender: 'Mujer',
  upf: 'UPF 50+',
  activity: 'Playa',
  isConjunto: false
},
{
  id: 'rb9',
  name: 'Mangas UV Acuáticas Pro',
  price: 52.0,
  image: 'https://images.unsplash.com/photo-1521555562723-51829636b110?auto=format&fit=crop&q=80&w=800',
  images: [
    'https://images.unsplash.com/photo-1521555562723-51829636b110?auto=format&fit=crop&q=80&w=800'
  ],
  colors: ['#FFFFFF', '#A9D6FF', '#0B1F3A'],
  sizes: ['S', 'M', 'L'],
  category: 'Mangas',
  gender: 'Mujer',
  upf: 'UPF 50+',
  activity: 'Playa',
  isConjunto: false
},
{
  id: 'rb10',
  name: 'Guantes UV Solar Slim',
  price: 45.0,
  image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800',
  images: [
    'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800'
  ],
  colors: ['#FFFFFF', '#0B1F3A'],
  sizes: ['S', 'M', 'L'],
  category: 'Guantes',
  gender: 'Mujer',
  upf: 'UPF 50++',
  activity: 'Playa',
  isConjunto: false,
  isNew: true
},
{
  id: 'rb11',
  name: 'Bikini UV Sport Top + Short',
  price: 79.0,
  originalPrice: 90.0,
  discount: 12,
  image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800',
  images: [
    'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800'
  ],
  colors: ['#3A86C8', '#0B1F3A', '#000000'],
  sizes: ['XS', 'S', 'M', 'L'],
  category: 'Swimwear',
  gender: 'Mujer',
  upf: 'UPF 50+',
  activity: 'Playa',
  isConjunto: true
},
{
  id: 'rb12',
  name: 'Conjunto Outdoor Playa UV',
  price: 86.0,
  originalPrice: 90.0,
  discount: 4,
  image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800',
  images: [
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=800'
  ],
  colors: ['#0B1F3A', '#A9D6FF'],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  category: 'Conjuntos',
  gender: 'Mujer',
  upf: 'UPF 50++',
  activity: 'Playa',
  isConjunto: true,
  isNew: true
},
{
  id: 'k1',
  name: 'Polo Solar Kids Active',
  price: 58.0,
  originalPrice: 68.0,
  discount: 15,
  image:
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?auto=format&fit=crop&q=80&w=800'],

  colors: ['#0B1F3A', '#A9D6FF', '#FFFFFF'],
  sizes: ['XS', 'S', 'M', 'L'],
  category: 'Polos',
  gender: 'Niños',
  upf: 'UPF 50+',
  activity: 'Deportivo',
  isConjunto: false,
  isNew: true
},
{
  id: 'k2',
  name: 'Rashguard Junior Manga Larga',
  price: 79.0,
  originalPrice: 90.0,
  discount: 12,
  image:
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800'],

  colors: ['#0B1F3A', '#3A86C8'],
  sizes: ['XS', 'S', 'M', 'L'],
  category: 'Rashguards',
  gender: 'Niños',
  upf: 'UPF 50+',
  activity: 'Playa',
  isConjunto: false
},
{
  id: 'k3',
  name: 'Short UV Kids Explorer',
  price: 54.0,
  image:
  'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=800'],

  colors: ['#0B1F3A', '#A9D6FF'],
  sizes: ['XS', 'S', 'M', 'L'],
  category: 'Shorts',
  gender: 'Niños',
  upf: 'UPF 50+',
  activity: 'Outdoor',
  isConjunto: false
},
{
  id: 'k4',
  name: 'Sombrero UV Junior Safari',
  price: 49.0,
  image:
  'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800'],

  colors: ['#F7F9FC', '#0B1F3A'],
  sizes: ['S', 'M'],
  category: 'Gorras',
  gender: 'Niños',
  upf: 'UPF 50++',
  activity: 'Outdoor',
  isConjunto: false
},
{
  id: 'k5',
  name: 'Pantalon UV Escolar Flex',
  price: 69.0,
  originalPrice: 82.0,
  discount: 16,
  image:
  'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'],

  colors: ['#0B1F3A', '#808080'],
  sizes: ['XS', 'S', 'M', 'L'],
  category: 'Pantalones',
  gender: 'Niños',
  upf: 'UPF 30+',
  activity: 'Escolar',
  isConjunto: false
},
{
  id: 'k6',
  name: 'Casaca UV Kids Wind',
  price: 88.0,
  originalPrice: 90.0,
  discount: 2,
  image:
  'https://images.unsplash.com/photo-1542272201-b1ca555f8505?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1542272201-b1ca555f8505?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=800'],

  colors: ['#A9D6FF', '#0B1F3A'],
  sizes: ['S', 'M', 'L'],
  category: 'Casacas',
  gender: 'Niños',
  upf: 'UPF 50+',
  activity: 'Outdoor',
  isConjunto: false
},
{
  id: 'k7',
  name: 'Mangas UV Kids Sport',
  price: 45.0,
  image:
  'https://images.unsplash.com/photo-1521555562723-51829636b110?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1521555562723-51829636b110?auto=format&fit=crop&q=80&w=800'],

  colors: ['#FFFFFF', '#0B1F3A'],
  sizes: ['S', 'M', 'L'],
  category: 'Mangas',
  gender: 'Niños',
  upf: 'UPF 50+',
  activity: 'Deportivo',
  isConjunto: false
},
{
  id: 'k8',
  name: 'Guantes UV Kids Grip',
  price: 47.0,
  image:
  'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800'],

  colors: ['#FFFFFF', '#0B1F3A'],
  sizes: ['S', 'M', 'L'],
  category: 'Guantes',
  gender: 'Niños',
  upf: 'UPF 50++',
  activity: 'Outdoor',
  isConjunto: false
},
{
  id: 'k9',
  name: 'Swimwear UV Kids Pacific',
  price: 83.0,
  originalPrice: 90.0,
  discount: 8,
  image:
  'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800'],

  colors: ['#3A86C8', '#0B1F3A'],
  sizes: ['XS', 'S', 'M', 'L'],
  category: 'Swimwear',
  gender: 'Niños',
  upf: 'UPF 50+',
  activity: 'Playa',
  isConjunto: false,
  isNew: true
},
{
  id: 'k10',
  name: 'Conjunto Kids Outdoor UV',
  price: 86.0,
  originalPrice: 90.0,
  discount: 4,
  image:
  'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=800',
  images: [
  'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800'],

  colors: ['#0B1F3A', '#A9D6FF'],
  sizes: ['XS', 'S', 'M', 'L'],
  category: 'Conjuntos',
  gender: 'Niños',
  upf: 'UPF 50+',
  activity: 'Outdoor',
  isConjunto: true,
  isNew: true
}
];