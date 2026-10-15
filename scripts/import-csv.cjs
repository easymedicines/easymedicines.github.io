const fs = require('fs');
const path = require('path');

const CSV_PATH = path.resolve(__dirname, '../data/products.csv');
const IMAGES_DIR = path.resolve(__dirname, '../public/images/products');
const OUTPUT_JSON_PATH = path.resolve(__dirname, '../data/products.json');
const OUTPUT_MANIFEST_PATH = path.resolve(__dirname, '../data/image-manifest.json');

// Helper to parse CSV properly supporting quoted values, commas, and newlines
function parseCSV(content) {
  // Strip BOM if present
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }

  const rows = [];
  let currentRow = [];
  let currentField = '';
  let insideQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentField);
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentField);
      currentField = '';
      if (currentRow.length > 1 || (currentRow.length === 1 && currentRow[0] !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
    } else {
      currentField += char;
    }
  }

  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  return rows;
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function detectCategory(name, desc) {
  const text = (name + ' ' + desc).toLowerCase();

  if (/sildenafil|tadalafil|vardenafil|cenforce|vidalista|kamagra|fildena|cobra|super p-force|avanafil|erectile|male enhancement|caverta|viagra|cialis|levitra/.test(text)) {
    return 'Erectile Dysfunction';
  }
  if (/ivermectin|albendazole|fenbendazole|mebendazole|praziquantel|iverjohn|ivermectol|zentel|bandy|anti-?worm|worm/.test(text)) {
    return 'Anti Worm';
  }
  if (/inhaler|rotacaps|budesonide|formoterol|salbutamol|montelukast|asthalin|seroflo|duolin|tiotropium|foracort|beclomethasone|respules|asthma|respiratory|copd/.test(text)) {
    return 'Respiratory';
  }
  if (/tretinoin|ciclopirox|permethrin|hydroquinone|ketoconazole|shampoo|acne|skin|adapalene|clindamycin|mupirocin|derma|melasma/.test(text)) {
    return 'Skin Care';
  }
  if (/acyclovir|valacyclovir|oseltamivir|abacavir|tenofovir|sofosbuvir|daclatasvir|efavirenz|ritonavir|lamivudine|anti-?viral|viral|hiv|hepatitis|herpes/.test(text)) {
    return 'Viral Care';
  }
  if (/lovegra|clomiphene|cabergoline|fertility|ovulation|women|female|femme|pregnancy|contraceptive/.test(text)) {
    return "Women's Health";
  }
  if (/finasteride|dutasteride|prostate|tamsulosin|silodosin|alfuzosin|urinary|hair loss/.test(text)) {
    return "Men's Health";
  }
  if (/ursodeoxycholic|silymarin|hepa|liver|udiliv|cirrhosis|jaundice/.test(text)) {
    return 'Liver Care';
  }
  if (/eye drop|ear drop|latanoprost|bimatoprost|travoprost|timolol|ciprofloxacin eye|carboxymethylcellulose|ophthalmic|glaucoma/.test(text)) {
    return 'Eyes / Ear Care';
  }
  if (/metformin|glimepiride|dapagliflozin|vildagliptin|sitagliptin|empagliflozin|gliclazide|diabetes|insulin|blood sugar/.test(text)) {
    return 'Diabetes';
  }
  if (/mercaptopurine|capecitabine|oncology|leukemia|cancer|chemo|imatinib|erlotinib|gefitinib|sorafenib|abiraterone|lenalidomide|methotrexate|temozolomide|tumor/.test(text)) {
    return 'Life Saving Drugs';
  }
  if (/amoxicillin|azithromycin|doxycycline|ciprofloxacin|levofloxacin|cefixime|augmentin|antibiotic|bacterial|infection/.test(text)) {
    return 'Antibiotics';
  }

  return 'General Healthcare';
}

function detectFormulation(name) {
  const n = name.toLowerCase();
  if (n.includes('inhaler') || n.includes('rotacaps') || n.includes('respules')) return 'Inhaler';
  if (n.includes('shampoo')) return 'Shampoo';
  if (n.includes('eye drop') || n.includes('ear drop') || n.includes('drop')) return 'Drops';
  if (n.includes('cream') || n.includes('ointment')) return 'Cream';
  if (n.includes('gel') || n.includes('oral jelly')) return 'Gel';
  if (n.includes('syrup') || n.includes('suspension')) return 'Syrup';
  if (n.includes('capsule')) return 'Capsule';
  if (n.includes('injection')) return 'Injection';
  return 'Tablet';
}

function detectStrength(name) {
  const match = name.match(/(\d+(?:\.\d+)?\s*(?:mg|ml|mcg|gm|g|iu|%))/i);
  return match ? match[1] : '';
}

function extractActiveIngredient(name) {
  const match = name.match(/\(([^)]+)\)/);
  if (match) {
    return match[1].trim();
  }
  return '';
}

function generateVariants(basePrice, formulation) {
  const p = parseFloat(basePrice) || 50;
  const unit = formulation.toLowerCase() === 'tablet' ? 'Tablets' :
               formulation.toLowerCase() === 'capsule' ? 'Capsules' :
               formulation.toLowerCase() === 'gel' ? 'Packs' :
               formulation.toLowerCase() === 'inhaler' ? 'Inhalers' :
               formulation.toLowerCase() === 'drops' ? 'Bottles' : 'Units';

  const packConfigs = [
    { count: 30, discount: 0 },
    { count: 60, discount: 0.10 },
    { count: 90, discount: 0.18 },
    { count: 120, discount: 0.25 },
    { count: 180, discount: 0.32 },
  ];

  return packConfigs.map((cfg, idx) => {
    // 30 count base: proportional to basePrice
    const countRatio = cfg.count / 30;
    const rawTotal = (p * countRatio) * (1 - cfg.discount);
    const totalPrice = Math.round(rawTotal * 100) / 100;
    const unitPrice = Math.round((totalPrice / cfg.count) * 100) / 100;

    return {
      id: `v-${idx + 1}`,
      packSize: `${cfg.count} ${unit}`,
      count: cfg.count,
      unit,
      price: totalPrice,
      unitPrice,
      savingsPercent: Math.round(cfg.discount * 100),
      inStock: true
    };
  });
}

function main() {
  console.log('Reading CSV from:', CSV_PATH);
  const csvContent = fs.readFileSync(CSV_PATH, 'utf8');
  const rawRows = parseCSV(csvContent);

  if (rawRows.length < 2) {
    console.error('CSV contains insufficient rows.');
    process.exit(1);
  }

  const header = rawRows[0].map(h => h.trim().replace(/^[\uFEFF\u200B]/, ''));
  console.log('Detected headers:', header);

  const colIdx = {};
  header.forEach((name, idx) => {
    colIdx[name] = idx;
  });

  const availableLocalImages = new Set(fs.readdirSync(IMAGES_DIR));
  console.log(`Found ${availableLocalImages.size} files in local images directory.`);

  const products = [];
  const imageManifest = {};
  const slugsSeen = new Map();
  const categoryCounts = {};

  let missingPriceCount = 0;
  let missingImageCount = 0;

  for (let i = 1; i < rawRows.length; i++) {
    const row = rawRows[i];
    if (row.length === 0 || (row.length === 1 && !row[0])) continue;

    const name = (row[colIdx['name']] || '').trim();
    if (!name) continue;

    let baseSlug = slugify(name);
    if (!baseSlug) baseSlug = `product-${i}`;

    let slug = baseSlug;
    if (slugsSeen.has(slug)) {
      const count = slugsSeen.get(slug) + 1;
      slugsSeen.set(slug, count);
      slug = `${slug}-${count}`;
    } else {
      slugsSeen.set(slug, 1);
    }

    const sku = (row[colIdx['sku']] || name).trim();
    let priceStr = (row[colIdx['price']] || '').trim();
    let price = parseFloat(priceStr);
    if (isNaN(price) || price <= 0) {
      price = 45.00;
      missingPriceCount++;
    }

    let highPrice = parseFloat(row[colIdx['high_price']] || '');
    if (isNaN(highPrice)) highPrice = null;

    const rawDesc = (row[colIdx['description']] || '').trim();
    const fullDesc = (row[colIdx['full_description']] || rawDesc).trim();

    const category = detectCategory(name, fullDesc);
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;

    const formulation = detectFormulation(name);
    const strength = detectStrength(name);
    const activeIngredient = extractActiveIngredient(name);

    // Resolve images
    const rawDownloadedImages = (row[colIdx['downloaded_images']] || '').split('|').map(s => s.trim()).filter(Boolean);
    const mappedImages = [];

    for (const rawImg of rawDownloadedImages) {
      const filename = path.basename(rawImg);
      if (availableLocalImages.has(filename)) {
        mappedImages.push(`/images/products/${filename}`);
      }
    }

    if (mappedImages.length === 0) {
      mappedImages.push('/assets/categoryBox.svg');
      missingImageCount++;
    }

    // Keep primary image manifest entry
    const productId = `prod-${i}`;
    imageManifest[productId] = mappedImages;

    // Featured flags based on verified top products
    const isBestSeller = /cenforce|vidalista|kamagra|tadalafil 40|tadalafil 10|fildena/i.test(name);
    const isTrending = /fenbendazole|mebendazole|albendazole|ivermectin/i.test(name);
    const isMostViewed = /cenforce 100|lovegra|kamagra oral jelly|vidalista 60/i.test(name);

    const variants = generateVariants(price, formulation);

    products.push({
      id: productId,
      name,
      slug,
      sku,
      category,
      formulation,
      strength,
      activeIngredient,
      price,
      highPrice: highPrice || (variants.length ? variants[variants.length - 1].price : null),
      currency: 'USD',
      inStock: true,
      description: rawDesc || `High quality pharmaceutical grade ${name}. Order securely online with discreet delivery.`,
      fullDescription: fullDesc || rawDesc,
      images: mappedImages,
      primaryImage: mappedImages[0],
      rating: isBestSeller || isTrending ? 5.0 : 4.8,
      reviewCount: isBestSeller ? 24 : isTrending ? 18 : 8,
      isBestSeller,
      isTrending,
      isMostViewed,
      variants,
      sourceUrl: row[colIdx['product_url']] || '',
    });
  }

  console.log(`\nImport Summary:`);
  console.log(`- Total valid products imported: ${products.length}`);
  console.log(`- Products with missing price (defaulted to $45.00): ${missingPriceCount}`);
  console.log(`- Products missing local image: ${missingImageCount}`);
  console.log(`- Category distribution:`, categoryCounts);

  fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(products, null, 2), 'utf8');
  console.log(`Wrote normalized products to: ${OUTPUT_JSON_PATH}`);

  fs.writeFileSync(OUTPUT_MANIFEST_PATH, JSON.stringify(imageManifest, null, 2), 'utf8');
  console.log(`Wrote image manifest to: ${OUTPUT_MANIFEST_PATH}`);
}

main();
