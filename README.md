# EasyMeds — VitalTrustRx-Style E-Commerce Platform

A production-ready, responsive, local-first healthcare e-commerce website designed in the visual aesthetic of **VitalTrustRx** under the **EasyMeds** brand identity.

Powered entirely by local catalog data (`data/products.csv`), 1,828 verified local product images (`public/images/products/`), zero external product APIs, and zero runtime scraping.

---

## 1. Quick Start

### Installation & Development
```bash
# Install dependencies
npm install

# Start local development server (http://localhost:3000)
npm run dev

# Run Vitest automated test suite
npm test

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Updating or Re-Importing Catalog Data
To re-process `/data/products.csv` and regenerate `/data/products.json` and `/data/image-manifest.json`:
```bash
node scripts/import-csv.cjs
```

---

## 2. Key Architecture & Features

### Visual System & Layout (Matched to VitalTrustRx Reference)
- **Authentic 3-Row Header:**
  - Row 1: Top Information Bar (`#0D477F`) with email, "Request a Call Back" modal trigger, and toll-free phone number.
  - Row 2: Brand Logo (EasyMeds), 50px pill Search Bar with `#0D477F` search button, My Account link, Shopping Cart with `#95C11F` pill count badge, and mobile drawer toggle.
  - Row 3: Green Category Navigation Bar (`#008000`) with dropdown carets and high-contrast `#0D477F` "SHOP ALL" button (with `#FFD200` yellow hover state).
  - Mobile Search Drawer & Slide-Out Navigation.
- **Hero & Trust Sections:**
  - Full-width hero banner linking to `/shop`.
  - Infinite auto-scrolling ticker replicating `.vtr-benefits-track` with 6 benefit cards (Best Prices Everyday, 100% Genuine, Fast Discreet Delivery, etc.).
  - 4-column "Best Selling Products" section with green card borders (`#009b35`) and circular add-to-cart controls.
  - 5×3 Bento Category Grid with responsive 2×2 mobile accordion.
  - 4-column "Trending Products" section with trending badges.
  - 4-column "Most Viewed Products" section with full-width cart buttons.
  - Verified Customer Reviews carousel with 4.8 / 5.0 satisfaction badge.
  - 4-column Footer with Trustbar, legal links, and floating WhatsApp widget (`#25D366`).
- **Product Detail Page (PDP):**
  - High-res product gallery with thumbnail switcher.
  - **Pack Price Table (`.vtr-pack-table`)**: Pack size (30, 60, 90, 120, 180 tablets), total price, unit price (`$0.86 / Unit`), row quantity adjustment, and direct "Add to Cart" button.
  - Detailed tabs: Medical Description, Drug Specifications, Usage & Precautions, Shipping & Discreet Packaging.
  - Related medications carousel.

---

## 3. Data Integrity & Verification

| Metric | Status |
|---|---|
| **Total Products** | 1,750 verified medicines |
| **Local Images** | 1,828 packaging images in `/public/images/products/` |
| **Missing Image Rate** | 0% (100% mapped to local assets) |
| **External API Calls** | 0 (100% offline-first runtime catalog) |
| **Currency** | USD (`$`) |
| **Test Suite** | 9 passing Vitest unit & integration tests |
| **Production Build** | Passes in ~1.40s with zero errors |

---

## 4. Directory Structure

```
├── data/
│   ├── products.csv            # Authoritative CSV dataset (1,750 products)
│   ├── products.json           # Normalized local catalog
│   └── image-manifest.json     # Product ID to local asset mapping
├── public/
│   ├── assets/                 # SVGs, icons, EasyMeds brand logo
│   └── images/
│       └── products/           # 1,828 local product packaging images
├── scripts/
│   └── import-csv.cjs          # Repeatable normalization & validation pipeline
├── src/
│   ├── components/
│   │   ├── Header.tsx          # 3-tier header & mobile navigation
│   │   ├── Footer.tsx          # 4-column footer, trustbar & WhatsApp
│   │   ├── ProductCard.tsx     # Reusable product card with zoom & badge
│   │   ├── BenefitTicker.tsx   # Infinite auto-scrolling ticker
│   │   ├── BentoCategories.tsx # 5x3 bento category grid
│   │   ├── ReviewsCarousel.tsx # Verified customer testimonials
│   │   ├── CartDrawer.tsx      # Slide-out cart drawer
│   │   └── CallToActionModal.tsx # Consultation & callback request modal
│   ├── context/
│   │   ├── CatalogContext.tsx  # Fast in-memory catalog search & filters
│   │   └── CartContext.tsx     # Cart state with localStorage sync
│   ├── pages/
│   │   ├── HomePage.tsx        # Complete landing experience
│   │   ├── ShopPage.tsx        # Filterable catalog with search & pagination
│   │   ├── CategoryPage.tsx    # Category-specific listing
│   │   ├── ProductDetailPage.tsx # PDP with pack price table
│   │   ├── CartPage.tsx        # Full cart review page
│   │   ├── CheckoutPage.tsx    # Explicit demo checkout form
│   │   ├── OrderConfirmationPage.tsx # Simulated receipt page
│   │   ├── BlogPage.tsx        # Health & pharmacy articles
│   │   ├── PolicyPage.tsx      # Shipping, refund, privacy, FAQ, terms
│   │   ├── AboutPage.tsx       # EasyMeds story & credentials
│   │   ├── ContactPage.tsx     # Working inquiry form & support hotline
│   │   └── NotFoundPage.tsx    # 404 page
│   ├── types/
│   │   └── index.ts            # TypeScript definitions
│   ├── styles/
│   │   └── globals.css         # Tailwind & custom CSS animations
│   ├── App.tsx                 # Route configuration
│   └── main.tsx                # App entry point
├── tests/
│   └── catalog.test.ts         # Vitest test suite
├── PROJECT_STATUS.md           # Progress tracking & phase documentation
├── REFERENCE_SPEC.md           # Observational audit of vitaltrustrx.com
├── DATA_AUDIT.md               # CSV schema & image audit report
└── package.json
```

---

## 5. Demonstration Mode & Limitations
- **Local Demo Checkout:** The checkout process is clearly labelled as a demonstration. It validates form input, calculates totals, clears the cart, and issues a simulated receipt with an order ID without charging payment cards or claiming to dispense real prescription medications.
- **Offline Reliability:** Runtime browsing requires no network connectivity once static bundle assets are loaded.
