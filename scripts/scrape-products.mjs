import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const UVLINE_COLLECTIONS = [
  {
    name: 'mujer',
    url: 'https://www.uvline.com.pe/collections/ropa-mujeres-1/products.json'
  },
  {
    name: 'hombre',
    url: 'https://www.uvline.com.pe/collections/hombres/products.json'
  },
  {
    name: 'ninos',
    url: 'https://www.uvline.com.pe/collections/ninos/products.json'
  },
  {
    name: 'accesorios',
    url: 'https://www.uvline.com.pe/collections/accesorios/products.json'
  }
];

const TREKKING_URL = 'https://trekkinghouseperu.pe/categoria-producto/mujeres/todo-antiuv-mujeres/';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const SCRAPED_DIR = path.join(DATA_DIR, 'scraped');
const OUTPUT_SCRAPED_PATH = path.join(DATA_DIR, 'products_scraped.json');
const OUTPUT_PRODUCTS_PATH = path.join(DATA_DIR, 'products.generated.json');
const OUTPUT_FILTERS_PATH = path.join(DATA_DIR, 'products_filters.json');
const OUTPUT_UVLINE_PATH = path.join(SCRAPED_DIR, 'uvline.json');
const OUTPUT_TREKKING_PATH = path.join(SCRAPED_DIR, 'trekking.json');
const OUTPUT_UVLINE_BY_CATEGORY_PATH = path.join(SCRAPED_DIR, 'uvline.by-category.json');
const OUTPUT_TREKKING_BY_CATEGORY_PATH = path.join(SCRAPED_DIR, 'trekking.by-category.json');

const normalizeUrl = (value) => (value ? value.split('?')[0] : '');

const parsePrice = (value) => {
  if (!value) return null;
  const cleaned = value.replace(/[^0-9.,]/g, '').replace(/,/g, '');
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
};

const normalizeTags = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.map((tag) => String(tag).trim()).filter(Boolean);
  return String(tags)
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
};

const fetchJson = async (url) => {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; UV-Scraper/1.0)'
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText} for ${url}`);
  }

  return response.json();
};

const scrapeUvline = async () => {
  const products = [];

  for (const collection of UVLINE_COLLECTIONS) {
    let page = 1;

    while (true) {
      const pageUrl = `${collection.url}?page=${page}`;
      const data = await fetchJson(pageUrl);
      const pageProducts = Array.isArray(data.products) ? data.products : [];

      if (pageProducts.length === 0) break;

      for (const product of pageProducts) {
        const images = (product.images || []).map((img) => img?.src).filter(Boolean);
        const image = product?.image?.src || images[0] || '';
        const variants = (product.variants || []).map((variant) => ({
          title: variant?.title || '',
          price: parsePrice(variant?.price)
        }));
        const price = variants.find((variant) => variant.price !== null)?.price ?? null;

        products.push({
          id: product.id,
          name: product.title,
          title: product.title,
          handle: product.handle || '',
          description: product.body_html || '',
          body_html: product.body_html || '',
          price,
          image,
          images,
          product_type: product.product_type || '',
          tags: normalizeTags(product.tags),
          variants,
          collection: collection.name
        });
      }

      page += 1;
    }
  }

  // Deduplicate by Shopify product ID — same product may appear in multiple collections
  const seen = new Set();
  return products.filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
};

const scrapeTrekkingList = async (page) => {
  await page.goto(TREKKING_URL, { waitUntil: 'networkidle2' });
  await page.waitForSelector('li.product, .products .product', { timeout: 15000 });

  return page.$$eval('li.product, .products .product', (cards) => {
    const getText = (element) => (element ? element.textContent.trim() : '');

    const getImage = (card) => {
      const img = card.querySelector('img');
      if (!img) return '';
      return (
        img.getAttribute('data-src') ||
        img.getAttribute('data-lazy-src') ||
        img.getAttribute('src') ||
        (img.getAttribute('srcset') || '').split(' ')[0] ||
        ''
      );
    };

    const getPrice = (card) => {
      const priceEl = card.querySelector('.price');
      return getText(priceEl);
    };

    const getCategory = (card) => {
      const catEl = card.querySelector('.ast-woo-product-category, .woocommerce-loop-product__category, .product-category');
      return getText(catEl);
    };

    return cards
      .map((card) => {
        const link = card.querySelector('a');
        const titleEl = card.querySelector('h2.woocommerce-loop-product__title, .woocommerce-loop-product__title');

        return {
          name: getText(titleEl),
          priceText: getPrice(card),
          url: link ? link.href : '',
          image: getImage(card),
          category: getCategory(card)
        };
      })
      .filter((item) => item.url && item.name);
  });
};

const scrapeTrekkingDetail = async (page, url) => {
  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.waitForSelector('body', { timeout: 15000 });

  return page.evaluate(() => {
    const getHtml = (element) => (element ? element.innerHTML.trim() : '');
    const getImage = (img) => {
      if (!img) return '';
      return (
        img.getAttribute('data-src') ||
        img.getAttribute('data-lazy-src') ||
        img.getAttribute('src') ||
        (img.getAttribute('srcset') || '').split(' ')[0] ||
        ''
      );
    };

    const descriptionRoot =
      document.querySelector('#tab-description') ||
      document.querySelector('.woocommerce-Tabs-panel--description') ||
      document.querySelector('.woocommerce-product-details__short-description');

    const galleryImages = Array.from(
      document.querySelectorAll(
        '.woocommerce-product-gallery__wrapper img, .woocommerce-product-gallery__image img, .woocommerce-product-gallery img'
      )
    )
      .map((img) => getImage(img))
      .filter(Boolean);

    return {
      description: getHtml(descriptionRoot),
      images: Array.from(new Set(galleryImages))
    };
  });
};

const getCollectionFromUrl = (url) => {
  if (/mujeres/.test(url)) return 'mujer';
  if (/hombres/.test(url)) return 'hombre';
  if (/ninos/.test(url)) return 'ninos';
  return 'accesorios';
};

const extractSlugFromUrl = (url) => {
  if (!url) return null;
  const match = url.match(/\/producto\/([^/]+)\/?$/);
  return match ? match[1] : null;
};

const scrapeTrekking = async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const listPage = await browser.newPage();
  listPage.setDefaultTimeout(30000);
  listPage.setUserAgent('Mozilla/5.0 (compatible; UV-Scraper/1.0)');

  const cards = await scrapeTrekkingList(listPage);
  const collection = getCollectionFromUrl(TREKKING_URL);

  const detailPage = await browser.newPage();
  detailPage.setDefaultTimeout(30000);
  detailPage.setUserAgent('Mozilla/5.0 (compatible; UV-Scraper/1.0)');

  const results = [];

  for (const card of cards) {
    const detail = await scrapeTrekkingDetail(detailPage, card.url);
    const normalizedCard = normalizeUrl(card.image);
    const normalizedImages = detail.images.map(normalizeUrl).filter(Boolean);

    const hasMatchingImage = normalizedCard && normalizedImages.includes(normalizedCard);
    const images = detail.images.length > 0 ? detail.images : (card.image ? [card.image] : []);
    const image = hasMatchingImage ? card.image : (images[0] || card.image || '');

    if (card.image && !hasMatchingImage && images[0]) {
      console.warn(`Image mismatch for ${card.url}. Using product gallery image.`);
    }

    results.push({
      name: card.name,
      price: parsePrice(card.priceText),
      url: card.url,
      collection,
      image,
      images,
      description: detail.description || '',
      category: card.category || ''
    });
  }

  await browser.close();
  return results;
};

const CATEGORY_RULES = [
  { category: 'Rashguards', keywords: ['rashguard', 'rash'] },
  {
    category: 'Trajes de Baño',
    keywords: ['traje de bano', 'traje de baño', 'bikini', 'swimwear', 'banador', 'enterizo', 'one-piece']
  },
  { category: 'Polos', keywords: ['polo', 'camiseta', 't-shirt', 'tshirt', 'camisa'] },
  { category: 'Leggings', keywords: ['legging', 'calza'] },
  { category: 'Casacas', keywords: ['casaca', 'chaqueta', 'jacket', 'parka'] },
  { category: 'Cortavientos', keywords: ['cortaviento', 'windbreaker'] },
  { category: 'Gorras', keywords: ['gorra', 'sombrero', 'visera', 'cap', 'hat'] },
  { category: 'Mangas', keywords: ['manga', 'mangas'] },
  { category: 'Guantes', keywords: ['guante', 'glove'] },
  { category: 'Conjuntos', keywords: ['conjunto', 'set', 'kit'] },
  { category: 'Shorts', keywords: ['short'] },
  { category: 'Pantalones', keywords: ['pantalon', 'pant'] }
];

const SIZE_ORDER = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
const DEFAULT_COLORS = ['#0B1F3A', '#A9D6FF', '#FFFFFF'];

const normalizeText = (value) => {
  if (!value) return '';
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

const uniq = (items) => Array.from(new Set(items));

const inferCategory = (item) => {
  const productType = normalizeText(item.product_type || item.category || '');

  // Always resolve specific product_types before checking collection
  if (productType.includes('guante') || productType.includes('glove')) return 'Guantes';
  if (productType.includes('gorra') || productType.includes('sombrero')) return 'Gorras';
  if (productType.includes('camiseta') || productType.includes('camisa')) return 'Polos';
  if (productType.includes('ropa de bano') || productType.includes('bano')) return 'Trajes de Baño';

  // Accessories collection fallback after specific type checks
  if (item.collection === 'accesorios') return 'Accesorios';

  const haystack = normalizeText(
    [item.name, item.product_type, item.category, (item.tags || []).join(' ')].filter(Boolean).join(' ')
  );

  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((keyword) => haystack.includes(normalizeText(keyword)))) {
      return rule.category;
    }
  }

  return 'Accesorios';
};

const inferGender = (item) => {
  if (item.collection === 'mujer') return 'Mujer';
  if (item.collection === 'hombre') return 'Hombre';
  if (item.collection === 'ninos') return 'Niños';
  if (item.collection === 'accesorios') return 'Unisex';

  const haystack = normalizeText([item.name, item.category, item.product_type].filter(Boolean).join(' '));
  if (haystack.includes('mujer') || haystack.includes('femenin')) return 'Mujer';
  if (haystack.includes('hombre') || haystack.includes('masculin')) return 'Hombre';
  if (haystack.includes('nino') || haystack.includes('nina') || haystack.includes('kids') || haystack.includes('baby')) return 'Niños';
  return 'Unisex';
};

const inferUpf = (item) => {
  const text = normalizeText([item.name, item.description, (item.tags || []).join(' ')].filter(Boolean).join(' '));
  const match = text.match(/upf\s*(\d{2})\s*\+*/);
  if (match) {
    const level = match[1];
    if (text.includes('50++')) return 'UPF 50++';
    if (level === '30') return 'UPF 30+';
    if (level === '50') return 'UPF 50+';
  }
  return 'UPF 50+';
};

const inferActivity = (item, category) => {
  // Category is the primary signal — swimwear/rashguards are always beach
  if (category === 'Trajes de Baño' || category === 'Rashguards') return 'Playa';
  // Use only name + description, never tags — UVLine tags like "Playa" are marketing labels
  // applied to almost all products, making them useless as activity classifiers.
  const text = normalizeText([item.name, item.description].filter(Boolean).join(' '));
  if (text.includes('trekking') || text.includes('hiking') || text.includes('senderismo') || text.includes('montani')) return 'Outdoor';
  if (text.includes('running') || text.includes('correr')) return 'Running';
  if (text.includes('escolar') || text.includes('escuela')) return 'Escolar';
  return 'Deportivo';
};

const extractSizesFromVariants = (variants) => {
  if (!variants || variants.length === 0) return [];
  const sizes = new Set();

  for (const variant of variants) {
    const tokens = String(variant.title || '')
      .split(/[\/|-]/g)
      .map((part) => part.trim().toUpperCase())
      .filter(Boolean);
    for (const token of tokens) {
      if (SIZE_ORDER.includes(token)) sizes.add(token);
    }
  }

  return SIZE_ORDER.filter((size) => sizes.has(size));
};

const defaultSizesFor = (category, gender) => {
  if (category === 'Gorras' || category === 'Guantes') return ['S', 'M', 'L'];
  if (gender === 'Niños') return ['XS', 'S', 'M', 'L'];
  return ['S', 'M', 'L', 'XL'];
};

const defaultColorsFor = (category) => {
  if (category === 'Gorras' || category === 'Guantes') return ['#0B1F3A', '#FFFFFF'];
  return DEFAULT_COLORS;
};

const isNewItem = (item) => {
  const text = normalizeText([item.name, (item.tags || []).join(' ')].filter(Boolean).join(' '));
  return text.includes('nuevo') || text.includes('new');
};

const slugify = (value) => {
  const normalized = normalizeText(value).replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return normalized || 'producto';
};

const SUSPECT_IMAGE_PATTERNS = ['tabla', 'medida', 'size-chart', 'sizechart', 'chart', 'talla'];

const filterProductImages = (images) =>
  images.filter((img) => {
    const lower = img.toLowerCase();
    return !SUSPECT_IMAGE_PATTERNS.some((p) => lower.includes(p));
  });

const buildCatalogProduct = (item, source) => {
  const category = inferCategory(item);
  const gender = inferGender(item);
  const activity = inferActivity(item, category);
  const upf = inferUpf(item);
  const sizes = extractSizesFromVariants(item.variants) || [];
  const finalSizes = sizes.length > 0 ? sizes : defaultSizesFor(category, gender);
  const colors = defaultColorsFor(category);
  const rawImages = item.images && item.images.length > 0 ? item.images : (item.image ? [item.image] : []);
  const images = filterProductImages(rawImages);
  const image = filterProductImages([item.image || ''])[0] || images[0] || '';
  const price = item.price ?? null;

  if (!image || price === null) return null;

  const idPrefix = source === 'uvline' ? 'uv' : 'trek';
  const id = item.id
    ? `${idPrefix}-${item.id}`
    : `${idPrefix}-${extractSlugFromUrl(item.url) || slugify(item.name)}`;

  return {
    id,
    name: item.name,
    price,
    image,
    images,
    colors,
    sizes: finalSizes,
    category,
    gender,
    upf,
    activity,
    isConjunto: category === 'Conjuntos',
    isNew: isNewItem(item)
  };
};

const buildCatalogProducts = (uvline, trekking) => {
  const uvlineProducts = uvline
    .map((item) => buildCatalogProduct(item, 'uvline'))
    .filter(Boolean);
  const trekkingProducts = trekking
    .map((item) => buildCatalogProduct(item, 'trekking'))
    .filter(Boolean);

  return [...uvlineProducts, ...trekkingProducts];
};

const buildFilters = (products) => {
  const categories = uniq(products.map((p) => p.category)).sort();
  const genders = uniq(products.map((p) => p.gender)).sort();
  const activities = uniq(products.map((p) => p.activity)).sort();
  const upf = uniq(products.map((p) => p.upf)).sort();
  const sizes = uniq(products.flatMap((p) => p.sizes));

  const sizeSorted = SIZE_ORDER.filter((size) => sizes.includes(size));
  return {
    categories,
    genders,
    activities,
    upf,
    sizes: sizeSorted
  };
};

const groupBy = (items, getKey) => {
  return items.reduce((acc, item) => {
    const key = getKey(item) || 'Otros';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
};

const run = async () => {
  await fs.mkdir(SCRAPED_DIR, { recursive: true });

  const [uvline, trekking] = await Promise.all([scrapeUvline(), scrapeTrekking()]);

  const payload = {
    uvline,
    trekking
  };

  await fs.writeFile(OUTPUT_SCRAPED_PATH, JSON.stringify(payload, null, 2), 'utf-8');
  await fs.writeFile(OUTPUT_UVLINE_PATH, JSON.stringify(uvline, null, 2), 'utf-8');
  await fs.writeFile(OUTPUT_TREKKING_PATH, JSON.stringify(trekking, null, 2), 'utf-8');

  await fs.writeFile(
    OUTPUT_UVLINE_BY_CATEGORY_PATH,
    JSON.stringify(groupBy(uvline, (item) => inferCategory(item)), null, 2),
    'utf-8'
  );
  await fs.writeFile(
    OUTPUT_TREKKING_BY_CATEGORY_PATH,
    JSON.stringify(groupBy(trekking, (item) => inferCategory(item)), null, 2),
    'utf-8'
  );

  const catalogProducts = buildCatalogProducts(uvline, trekking);
  const filters = buildFilters(catalogProducts);

  await fs.writeFile(OUTPUT_PRODUCTS_PATH, JSON.stringify(catalogProducts, null, 2), 'utf-8');
  await fs.writeFile(OUTPUT_FILTERS_PATH, JSON.stringify(filters, null, 2), 'utf-8');

  console.log(
    `Saved ${uvline.length} uvline products and ${trekking.length} trekking products. Catalog: ${catalogProducts.length}.`
  );
  console.log(`Scraped data: ${OUTPUT_SCRAPED_PATH}`);
  console.log(`Catalog data: ${OUTPUT_PRODUCTS_PATH}`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
