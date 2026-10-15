# DATA AUDIT REPORT

**Audit Date:** 2026-10-15  
**Data Sources:**
- Catalog Source: `/data/products.csv`
- Local Product Images: `/public/images/products/` (1,828 image files copied from verified scraper dataset)

---

## 1. Catalog CSV Schema & Integrity Audit

### Summary Counts
- **Total Rows in CSV:** 1,750 products
- **Valid Product Records:** 1,750
- **Missing Names:** 0 (100% of rows have valid product names)
- **Missing Prices:** 2 records have empty price (will be assigned default fallback / contact for pricing)
- **Currency:** USD (`$`) across all rows
- **Local Images Available:** 1,750 products have at least 1 image mapped in `downloaded_images`

### Raw CSV Column Analysis
| Column | Present | Description | Audit Finding |
|---|---|---|---|
| `name` | Yes | Product Title | Clean names, includes active ingredients in parentheses in many cases |
| `brand` | Yes | Manufacturer / Brand | Scraper recorded empty; will extract brand/ingredient from title/desc where present |
| `sku` | Yes | Product SKU Identifier | Present on all rows (often mirrors product title) |
| `description` | Yes | Short Summary | Rich descriptions for majority of products |
| `full_description` | Yes | Comprehensive Medical/Usage details | Multiline detailed medical overview, mechanism of action, uses |
| `price` | Yes | Product Base Price | Decimal formatted numeric string (e.g. `50.00`, `10.00`) |
| `high_price` | Yes | Upper range for variable products | Populated when product has variant price ranges |
| `currency` | Yes | Currency code | `USD` |
| `availability` | Yes | Schema.org availability | `https://schema.org/InStock` |
| `category` | Yes | Category tag | Empty in raw scraped column; derived from product classification & medical intent |
| `tags` | Yes | Product tags | Empty in raw column; generated deterministically |
| `rating` | Yes | Customer rating | Present on featured items |
| `review_count` | Yes | Review counter | Populated on featured products |
| `product_url` | Yes | Original reference URL | Used for slug extraction and canonical alignment |
| `page_title` | Yes | SEO title tag | Useful for brand and title fallback |
| `meta_description` | Yes | Meta description | Backup summary |
| `downloaded_images` | Yes | Local file references | Format: `output/images/<hash>_01.jpg \| output/images/<hash>_02.png` |
| `structured_product_data` | Yes | Embedded JSON-LD | Valid Schema.org Product markup containing SKU, description, price, offers |

---

## 2. Image Audit & Asset Mapping

### Image Directory Verification
- Total copied images: **1,828 files** in `/public/images/products/`
- Image Formats: `.jpg`, `.png`, `.webp`, `.jpeg`
- Primary image pattern: `<hash>_01.<ext>`
- Secondary image pattern: `<hash>_02.<ext>`

### Image Mapping Pipeline
1. **Primary Match:** Extract the base filename from `downloaded_images` (e.g. `b336bbfab398_01.jpg`).
2. **Local Path Verification:** Mapped to `/images/products/b336bbfab398_01.jpg`.
3. **Fallback:** If an image is missing or cannot be resolved, an SVG local fallback placeholder (`/images/products/placeholder.svg`) is used.
4. **Offline Rule:** ZERO external network calls or remote CDNs for product images. All assets are served locally from Vite `public/`.

---

## 3. Product Normalization & Category Classification

To enable rich faceted browsing (as seen on VitalTrustRx), our import script categorizes products based on medical formulation, therapeutic class, and ingredient matching into:
1. `Erectile Dysfunction` (Sildenafil, Tadalafil, Vardenafil, Vidalista, Cenforce, Kamagra, Fildena, etc.)
2. `Respiratory` (Inhalers, Salbutamol, Budesonide, Formoterol, Montelukast, Asthalin, etc.)
3. `Life Saving Drugs` (Chemotherapy, Oncology, Mercaptopurine, Capecitabine, Imatinib, etc.)
4. `Skin Care` (Tretinoin, Ciclopirox, Permethrin, Hydroquinone, Ketoconazole, etc.)
5. `Viral Care` (Acyclovir, Valacyclovir, Oseltamivir, Abacavir, Tenofovir, Sofosbuvir, etc.)
6. `Anti Worm` (Ivermectin, Albendazole, Fenbendazole, Mebendazole, etc.)
7. `Women's Health` (Lovegra, Clomiphene, Cabergoline, Hormonal health)
8. `Men's Health` (Finasteride, Dutasteride, Prostate & Vitality care)
9. `Liver Care` (Ursodeoxycholic acid, Silymarin, Hepato-protective)
10. `Eyes / Ear Care` (Latanoprost, Bimatoprost, Ciprofloxacin drops, etc.)
11. `Diabetes` (Metformin, Glimepiride, Dapagliflozin, Vildagliptin, etc.)
12. `Antibiotic & General Health` (Amoxicillin, Azithromycin, Doxycycline, etc.)

---

## 4. Variant Generation Rules (Pack Sizes)

Where products represent standard medications, realistic pack sizes with volume discounts (matching the reference site observed pack price tables) are generated:
- Standard Packs: `30 Tablets`, `60 Tablets`, `90 Tablets`, `120 Tablets`, `180 Tablets`
- Per-unit price calculation: `TotalPrice / UnitCount`
- Variant-aware line items in the cart tracking `productId` + `variantId`
