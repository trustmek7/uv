import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

// ---------------------------------------------------------------------------
// UVLine: auto-discover ALL collections via Shopify API
// ---------------------------------------------------------------------------
const UVLINE_BASE = 'https://www.uvline.com.pe';

// Map collection handle fragments → gender bucket
const COLLECTION_GENDER_MAP = [
  { pattern: /mujer|femenin|women|woman/i, gender: 'mujer' },
  { pattern: /hombre|masculin|men(?!u)|man(?!ga)/i, gender: 'hombre' },
  { pattern: /ni[ñn]o|kids?|child|escolar/i, gender: 'ninos' },
  { pattern: /accesorio|accessorie|gorra|guante|manga/i, gender: 'accesorios' },
];

const inferCollectionGender = (handle = '', title = '') => {
  const text = `${handle} ${title}`.toLowerCase();
  
  // High priority markers
  if (text.includes('niño') || text.includes('nino') || text.includes('nina') || text.includes('niña') || text.includes('kids') || text.includes('infantil') || text.includes('baby') || text.includes('menina')) return 'ninos';
  if (text.includes('mujer') || text.includes('mujeres') || text.includes('women') || text.includes('woman') || text.includes('femenino')) return 'mujer';
  if (text.includes('hombre') || text.includes('hombres') || text.includes('men') || text.includes('man') || text.includes('masculino')) return 'hombre';
  
  // Accessory fallback
  if (text.includes('accesorio') || text.includes('gorra') || text.includes('guante') || text.includes('manga') || text.includes('visera')) return 'accesorios';

  for (const { pattern, gender } of COLLECTION_GENDER_MAP) {
    if (pattern.test(text)) return gender;
  }
  return null;
};

// Shopify collections we always skip (non-product pages, lookbooks, etc.)
const SKIP_COLLECTION_PATTERNS = [
  /frontpage|homepage|sale|oferta|outlet|featured|novedad|new-arrival|destacado|bundle|pack|gift|regalo/i,
];

const shouldSkipCollection = (handle) => SKIP_COLLECTION_PATTERNS.some((p) => p.test(handle));

// ---------------------------------------------------------------------------
// Trekking House: multiple category pages scraped with Puppeteer
// ---------------------------------------------------------------------------
const TREKKING_SOURCES = [
  {
    url: 'https://trekkinghouseperu.pe/categoria-producto/mujeres/todo-antiuv-mujeres/',
    collection: 'mujer',
  },
  {
    url: 'https://trekkinghouseperu.pe/categoria-producto/hombres/',
    collection: 'hombre',
  },
  {
    url: 'https://trekkinghouseperu.pe/categoria-producto/ninos/',
    collection: 'ninos',
  },
  {
    url: 'https://trekkinghouseperu.pe/categoria-producto/accesorios/',
    collection: 'accesorios',
  },
  {
    url: 'https://trekkinghouseperu.pe/categoria-producto/todo-antiuv/',
    collection: 'mujer', // fallback gender — will be inferred per product anyway
  },
];

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
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
  let lastError;
  for (let i = 0; i < 3; i++) {
    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
      });
      if (response.status === 429 || response.status >= 500) {
        throw new Error(`Status ${response.status}`);
      }
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText} for ${url}`);
      }
      return await response.json();
    } catch (err) {
      lastError = err;
      console.warn(`  Attempt ${i + 1} failed for ${url}: ${err.message}. Retrying in 2s...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  throw lastError;
};

// ---------------------------------------------------------------------------
// UVLine scraper
// ---------------------------------------------------------------------------
const fetchUvlineCollections = async () => {
  console.log('Discovering UVLine collections…');
  const collections = [];
  let page = 1;

  while (true) {
    const data = await fetchJson(`${UVLINE_BASE}/collections.json?limit=250&page=${page}`);
    const batch = Array.isArray(data.collections) ? data.collections : [];
    if (batch.length === 0) break;
    collections.push(...batch);
    if (batch.length < 250) break;
    page++;
  }

  const targets = [];
  for (const col of collections) {
    if (shouldSkipCollection(col.handle)) continue;
    const gender = inferCollectionGender(col.handle, col.title);
    if (!gender) continue;
    targets.push({
      name: gender,
      handle: col.handle,
      url: `${UVLINE_BASE}/collections/${col.handle}/products.json`,
    });
  }

  console.log(`Found ${targets.length} relevant UVLine collections.`);
  return targets;
};

const scrapeUvline = async () => {
  const collections = await fetchUvlineCollections();
  const products = [];

  for (const collection of collections) {
    let page = 1;
    console.log(`  Scraping UVLine collection: ${collection.handle}`);

    while (true) {
      const pageUrl = `${collection.url}?page=${page}`;
      let data;
      try {
        data = await fetchJson(pageUrl);
      } catch (err) {
        console.warn(`  Skipping ${pageUrl}: ${err.message}`);
        break;
      }

      const pageProducts = Array.isArray(data.products) ? data.products : [];
      if (pageProducts.length === 0) break;

      for (const product of pageProducts) {
        const images = (product.images || []).map((img) => img?.src).filter(Boolean);
        const image = product?.image?.src || images[0] || '';
        const variants = (product.variants || []).map((variant) => ({
          title: variant?.title || '',
          price: parsePrice(variant?.price),
        }));
        const price = variants.find((v) => v.price !== null)?.price ?? null;

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
          collection: collection.name,
        });
      }

      page++;
    }
  }

  // Deduplicate by Shopify product ID (same product may appear in multiple collections)
  const seen = new Set();
  return products.filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
};

// ---------------------------------------------------------------------------
// Trekking House scraper (Puppeteer)
// ---------------------------------------------------------------------------
const scrapeTrekkingList = async (page, url) => {
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForSelector('li.product, .products .product', { timeout: 15000 });
  } catch {
    console.warn(`  No products found at ${url}, skipping.`);
    return [];
  }

  return page.$$eval('li.product, .products .product', (cards) => {
    const getText = (el) => (el ? el.textContent.trim() : '');

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

    return cards
      .map((card) => {
        const link = card.querySelector('a');
        const titleEl = card.querySelector(
          'h2.woocommerce-loop-product__title, .woocommerce-loop-product__title'
        );
        const priceEl = card.querySelector('.price');
        const catEl = card.querySelector(
          '.ast-woo-product-category, .woocommerce-loop-product__category, .product-category'
        );

        return {
          name: getText(titleEl),
          priceText: getText(priceEl),
          url: link ? link.href : '',
          image: getImage(card),
          category: getText(catEl),
        };
      })
      .filter((item) => item.url && item.name);
  });
};

const scrapeTrekkingDetail = async (page, url) => {
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForSelector('body', { timeout: 15000 });
  } catch {
    return { description: '', images: [] };
  }

  return page.evaluate(() => {
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
      description: descriptionRoot ? descriptionRoot.innerHTML.trim() : '',
      images: Array.from(new Set(galleryImages)),
    };
  });
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
  const detailPage = await browser.newPage();
  detailPage.setDefaultTimeout(30000);
  detailPage.setUserAgent('Mozilla/5.0 (compatible; UV-Scraper/1.0)');

  const allResults = [];
  const seenUrls = new Set();

  for (const source of TREKKING_SOURCES) {
    console.log(`  Scraping Trekking source: ${source.url}`);
    const cards = await scrapeTrekkingList(listPage, source.url);

    for (const card of cards) {
      if (seenUrls.has(card.url)) continue;
      seenUrls.add(card.url);

      const detail = await scrapeTrekkingDetail(detailPage, card.url);
      const normalizedCard = normalizeUrl(card.image);
      const normalizedImages = detail.images.map(normalizeUrl).filter(Boolean);
      const hasMatchingImage = normalizedCard && normalizedImages.includes(normalizedCard);
      const images = detail.images.length > 0 ? detail.images : card.image ? [card.image] : [];
      const image = hasMatchingImage ? card.image : images[0] || card.image || '';

      allResults.push({
        name: card.name,
        price: parsePrice(card.priceText),
        url: card.url,
        collection: source.collection,
        image,
        images,
        description: detail.description || '',
        category: card.category || '',
      });
    }
  }

  await browser.close();
  return allResults;
};

// ---------------------------------------------------------------------------
// Catalog builder
// ---------------------------------------------------------------------------
const CATEGORY_RULES = [
  { category: 'Rashguards', keywords: ['rashguard', 'rash'] },
  { category: 'Trajes de Baño', keywords: ['traje de bano', 'traje de baño', 'bikini', 'swimwear', 'banador', 'enterizo', 'one-piece', 'sunga', 'boxer natacion', 'bermuda natacion'] },
  { category: 'Polos', keywords: ['polo', 'camiseta', 't-shirt', 'tshirt', 'camisa'] },
  { category: 'Leggings', keywords: ['legging', 'calza'] },
  { category: 'Casacas', keywords: ['casaca', 'chaqueta', 'jacket', 'parka', 'plumon', 'plumifero', 'vientos'] },
  { category: 'Cortavientos', keywords: ['cortaviento', 'windbreaker'] },
  { category: 'Gorras', keywords: ['gorra', 'sombrero', 'visera', 'cap', 'hat'] },
  { category: 'Mangas', keywords: ['manga', 'mangas'] },
  { category: 'Guantes', keywords: ['guante', 'glove'] },
  { category: 'Conjuntos', keywords: ['conjunto', 'set', 'kit'] },
  { category: 'Pantalones', keywords: ['pantalon', 'pant'] },
  { category: 'Shorts', keywords: ['short'] },
];

const SIZE_ORDER = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
const DEFAULT_COLORS = ['#0B1F3A', '#A9D6FF', '#FFFFFF'];

const normalizeText = (value) => {
  if (!value) return '';
  return value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
};

const uniq = (items) => Array.from(new Set(items));

const inferCategory = (item) => {
  const productType = normalizeText(item.product_type || item.category || '');
  const name = normalizeText(item.name || '');
  const tags = normalizeText((item.tags || []).join(' '));
  const description = normalizeText(item.description || '');
  const haystack = `${name} ${productType} ${tags} ${description}`;

  // 1. High-priority specific categories (to avoid "casaca" ending up in "gorras" because it mentions "gorro desmontable")
  if (haystack.includes('casaca') || haystack.includes('chaqueta') || haystack.includes('parka') || haystack.includes('jacket') || haystack.includes('plumifero') || haystack.includes('plumon') || name.includes('vientos') || haystack.includes('casaca ')) return 'Casacas';
  if (haystack.includes('pantalon') || haystack.includes(' pants') || name.includes(' leggings') || (name.includes('silver ridge') && !name.includes('camisa'))) return 'Pantalones';
  if (haystack.includes('short')) return 'Shorts';

  // 2. Headwear
  if (haystack.includes('gorra') || haystack.includes('sombrero') || haystack.includes('visera') || haystack.includes('cap') || haystack.includes('hat')) return 'Gorras';

  // 3. Swimwear
  if (
    haystack.includes('ropa de bano') || 
    haystack.includes('traje de bano') || 
    haystack.includes('swimwear') || 
    haystack.includes('banador') || 
    haystack.includes('bikini') || 
    haystack.includes('enterizo') || 
    haystack.includes('tankini') ||
    haystack.includes('salida de bano') ||
    haystack.includes('sunga') ||
    haystack.includes('boxer natacion') ||
    haystack.includes('bermuda natacion')
  ) return 'Trajes de Baño';

  // 4. Gloves and other small accessories
  if (haystack.includes('guante') || haystack.includes('glove')) return 'Guantes';

  // 5. Tops
  if (haystack.includes('camiseta') || haystack.includes('camisa') || haystack.includes('polo') || haystack.includes('t-shirt') || haystack.includes('tshirt')) return 'Polos';
  
  // 6. Generic or keyword-based fallback
  if (item.collection === 'accesorios' || haystack.includes('accesorio') || haystack.includes('lente') || haystack.includes('funda') || haystack.includes('mochila')) return 'Accesorios';

  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((kw) => haystack.includes(normalizeText(kw)))) return rule.category;
  }

  return 'Accesorios';
};

const inferGender = (item) => {
  const name = normalizeText(item.name || '');
  const description = normalizeText(item.description || '');
  const tags = normalizeText((item.tags || []).join(' '));
  const productType = normalizeText(item.product_type || item.category || '');
  const collection = item.collection || '';
  
  const haystack = `${name} ${description} ${tags} ${productType}`.toLowerCase();

  // 1. Check for explicit "Infantil/Niño/Niña" FIRST
  // If it contains "Basic" and "Pantalón", these are usually adult UV Line products that ended up in kids
  const isBasicPant = name.includes('basic') && name.includes('pantalon');
  if (!isBasicPant && (haystack.includes('para nino') || haystack.includes('para nina') || haystack.includes('infantil') || haystack.includes('kids') || haystack.includes('baby') || haystack.includes('menina'))) return 'Niños';
  if (!isBasicPant && collection === 'ninos') return 'Niños';

  // 2. Strong keyword markers in name/description
  if (haystack.includes('para mujer') || haystack.includes('femenino') || haystack.includes('dama') || haystack.includes('modelo femenino')) return 'Mujer';
  if (haystack.includes('para hombre') || haystack.includes('masculino') || haystack.includes('caballero') || haystack.includes('modelo masculino')) return 'Hombre';

  // 3. Collection markers
  if (collection === 'mujer') return 'Mujer';
  if (collection === 'hombre') return 'Hombre';

  // 4. Specific product mappings
  if (name.includes('silver ridge') && (name.includes('pantalon') || name.includes('camisa'))) return 'Hombre';
  if (name.includes('copacabana') || name.includes('copenhagen')) return 'Hombre'; // These shirts are usually male
  if (name.includes('olaian') && name.includes('camiseta')) return 'Hombre'; // Specific Olaian UV shirt fix

  // 5. Category/Type hints
  if (haystack.includes('women') || haystack.includes(' mujer')) return 'Mujer';
  if (haystack.includes('men ') || haystack.includes(' hombre')) return 'Hombre';

  // 6. Default to Unisex for accessories
  if (collection === 'accesorios' || haystack.includes('unisex') || haystack.includes('lente') || haystack.includes('funda')) return 'Unisex';
  
  return 'Unisex';
};

const inferUpf = (item) => {
  const text = normalizeText([item.name, item.description, (item.tags || []).join(' ')].filter(Boolean).join(' '));
  const match = text.match(/upf\s*(\d{2})\s*\+*/);
  if (match) {
    if (text.includes('50++')) return 'UPF 50++';
    if (match[1] === '30') return 'UPF 30+';
    if (match[1] === '50') return 'UPF 50+';
  }
  return 'UPF 50+';
};

const inferActivity = (item, category) => {
  const text = normalizeText([item.name, item.description].filter(Boolean).join(' '));
  if (category === 'Trajes de Baño' || category === 'Rashguards' || text.includes('natacion') || text.includes('piscina')) return 'Playa';
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
      .split(/[/|-]/g)
      .map((p) => p.trim().toUpperCase())
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

// Price scaling: bring raw prices (often 100–300 soles) into display range 19–90
const scalePrice = (raw) => Math.max(19, Math.min(90, Math.round(raw * 0.32)));

const buildCatalogProduct = (item, source) => {
  const category = inferCategory(item);
  const gender = inferGender(item);
  const activity = inferActivity(item, category);
  const upf = inferUpf(item);
  const sizes = extractSizesFromVariants(item.variants) || [];
  const finalSizes = sizes.length > 0 ? sizes : defaultSizesFor(category, gender);
  const colors = defaultColorsFor(category);
  const rawImages = item.images && item.images.length > 0 ? item.images : item.image ? [item.image] : [];
  const images = filterProductImages(rawImages);
  const image = filterProductImages([item.image || ''])[0] || images[0] || '';
  const rawPrice = item.price ?? null;

  if (!image || rawPrice === null) return null;

  const idPrefix = source === 'uvline' ? 'uv' : 'trek';
  const id = item.id
    ? `${idPrefix}-${item.id}`
    : `${idPrefix}-${extractSlugFromUrl(item.url) || slugify(item.name)}`;

  return {
    id,
    name: item.name,
    price: scalePrice(rawPrice),
    image,
    images,
    colors,
    sizes: finalSizes,
    category,
    gender,
    upf,
    activity,
    isConjunto: category === 'Conjuntos',
    isNew: isNewItem(item),
  };
};

const buildCatalogProducts = (uvline, trekking) => {
  const uvlineProducts = uvline.map((item) => buildCatalogProduct(item, 'uvline')).filter(Boolean);
  const trekkingProducts = trekking.map((item) => buildCatalogProduct(item, 'trekking')).filter(Boolean);
  return [...uvlineProducts, ...trekkingProducts];
};

const buildFilters = (products) => {
  const categories = uniq(products.map((p) => p.category)).sort();
  const genders = uniq(products.map((p) => p.gender)).sort();
  const activities = uniq(products.map((p) => p.activity)).sort();
  const upf = uniq(products.map((p) => p.upf)).sort();
  const sizes = uniq(products.flatMap((p) => p.sizes));
  return {
    categories,
    genders,
    activities,
    upf,
    sizes: SIZE_ORDER.filter((size) => sizes.includes(size)),
  };
};

const groupBy = (items, getKey) =>
  items.reduce((acc, item) => {
    const key = getKey(item) || 'Otros';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------
const run = async () => {
  await fs.mkdir(SCRAPED_DIR, { recursive: true });

  console.log('Starting scrape…');
  const [uvline, trekking] = await Promise.all([scrapeUvline(), scrapeTrekking()]);

  const payload = { uvline, trekking };
  await fs.writeFile(OUTPUT_SCRAPED_PATH, JSON.stringify(payload, null, 2), 'utf-8');
  await fs.writeFile(OUTPUT_UVLINE_PATH, JSON.stringify(uvline, null, 2), 'utf-8');
  await fs.writeFile(OUTPUT_TREKKING_PATH, JSON.stringify(trekking, null, 2), 'utf-8');
  await fs.writeFile(
    OUTPUT_UVLINE_BY_CATEGORY_PATH,
    JSON.stringify(groupBy(uvline, inferCategory), null, 2),
    'utf-8'
  );
  await fs.writeFile(
    OUTPUT_TREKKING_BY_CATEGORY_PATH,
    JSON.stringify(groupBy(trekking, inferCategory), null, 2),
    'utf-8'
  );

  const catalogProducts = buildCatalogProducts(uvline, trekking);
  const filters = buildFilters(catalogProducts);

  await fs.writeFile(OUTPUT_PRODUCTS_PATH, JSON.stringify(catalogProducts, null, 2), 'utf-8');
  await fs.writeFile(OUTPUT_FILTERS_PATH, JSON.stringify(filters, null, 2), 'utf-8');

  const uvCount = uvline.length;
  const trCount = trekking.length;
  const catCount = catalogProducts.length;
  const prices = catalogProducts.map((p) => p.price);
  const avgPrice = (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(1);
  const maxPrice = Math.max(...prices);

  console.log(`\n✓ UVLine: ${uvCount} | Trekking: ${trCount} | Catalog total: ${catCount}`);
  console.log(`  Precio promedio: S/ ${avgPrice} | Máximo: S/ ${maxPrice}`);
  console.log(`  Catálogo → ${OUTPUT_PRODUCTS_PATH}`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
