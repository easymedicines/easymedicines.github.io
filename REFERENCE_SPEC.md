# REFERENCE SPECIFICATION: VITALTRUSTRX.COM

**Audit Date:** 2026-10-15  
**Reference Target:** https://vitaltrustrx.com/  
**Application Target Brand:** EasyMeds (`easymeds`)

---

## 1. Visual Identity & Design System

### Color Palette
- **Primary Navy / Brand Blue:** `#0D477F` (Used in Topbar, Search button, Shop All CTA, Footer headings)
- **Primary Navy Dark:** `#08385f` (Hover state for Navy buttons)
- **Primary Green / Accent:** `#008000` / `#008b20` (Category Navigation bar, active badges, rating stars, price accents)
- **Secondary Green / Hover:** `#009b35` / `#2d8735` (Card borders, button hovers)
- **Vibrant Accent Yellow:** `#FFD200` (Hover color for "SHOP ALL" button)
- **Cart Badge Green:** `#95C11F` (Pill badge showing cart count in header)
- **WhatsApp Green:** `#25D366` (Floating WhatsApp chat widget)
- **Backgrounds:**
  - Page Background: `#FFFFFF`
  - Subtle Neutral Card Background: `#f8fbf9` / `#ffffff`
  - Category Card Background: `#edf5ee`
  - Trust Bar / Bottom Bar Background: `#eaf5ee`
  - Benefit Card Icon Background: `#eef8f1`
- **Typography & Text Colors:**
  - Primary Dark Text: `#111111` / `#172b3a` / `#151922`
  - Muted Text: `#777777` / `#737b83` / `#8b96a3`
  - Border Greys: `#edf0f3` / `#d9e0e6` / `#eeeeee`
  - Fonts: System Sans-serif fallback stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif`), serif accents (`Georgia, "Times New Roman", serif` on category labels).

---

## 2. Header Architecture (3-Row Layout)

### Row 1: Top Information Bar
- **Background:** `#0D477F` | **Height:** 54px (Mobile: 48px) | **Max-width:** 1500px
- **Elements:**
  1. Left: Email link with mail SVG icon (`support@easymeds.com`)
  2. Center: "Request a Call Back" with chat/phone icon
  3. Right: "US Call/Text: +1 (800) 555-MEDS" (editable business contact)
- **Behavior:** On mobile (<768px), email and phone hide, leaving centered "Request a Call Back".

### Row 2: Main Branding & Utility Row
- **Background:** `#FFFFFF` | **Min-Height:** 112px (Mobile: 78px) | **Border-bottom:** 1px solid `#edf0f3`
- **Elements:**
  1. **Brand Logo:** EasyMeds logo (175px desktop, 120px mobile)
  2. **Search Bar:**
     - Width: flex 1 (max 680px), centered
     - Height: 50px, border-radius 28px, border 1px solid `#d9e0e6`
     - Placeholder: "Search medicines, products..."
     - Submit Button: `#0D477F` with white magnifying glass icon
     - Focus: Border `#0D477F`, subtle blue box-shadow `0 5px 22px rgba(13,71,127,.10)`
  3. **Right Action Utility Icons:**
     - Search Icon (visible on mobile only, opens mobile search drawer)
     - User Account Icon (`/account` or `/my-account`)
     - Shopping Cart Icon with absolute badge (`#95C11F`, white bold counter)
     - Mobile Hamburger Toggle (`.vtr-mobile-btn`)

### Row 3: Category Navigation Bar
- **Background:** `#008000` | **Min-Height:** 70px | **Text:** `#FFFFFF`, 17px, font-weight 600
- **Items:**
  - `Erectile Dysfunction` ⌄
  - `Respiratory` ⌄
  - `Life Saving Drugs` ⌄
  - `Skin Care` ⌄
  - `Viral Care` ⌄
  - `Blog`
- **Shop All CTA:**
  - Background: `#0D477F`, border-radius 12px, height 52px, min-width 175px
  - Label: `♧ SHOP ALL` (Bold 18px)
  - Hover: Background `#FFD200`, text `#111111`, transform -2px translateY.
- **Mobile Drawer:** Slides down when hamburger is tapped; includes search bar and category list.

---

## 3. Homepage Layout & Section Hierarchy

1. **Hero Banner:**
   - Full viewport width, linking to `/shop`
   - High impact promotional artwork with healthcare trust messaging
2. **Auto-Scrolling Benefits Ticker (`.vtr-benefits-track`):**
   - Infinite horizontal CSS animation (30s linear loop, pauses on hover)
   - Cards (285px × 86px, border-radius 16px, border 1px solid `#eef3ef`):
     - `＄ Best Prices Everyday`
     - `✦ Exclusive Offers & Discounts`
     - `♡ Health & Wellness Essentials`
     - `✓ 100% Genuine Medicines`
     - `▣ Fast & Discreet Delivery`
     - `♙ Secure & Private Shopping`
3. **Best Selling Products Section:**
   - Label: `SHOP OUR TOP PICKS` (`#008b20`, uppercase, letter-spacing 2px)
   - Title: `Best Selling Products` (`#0b355b`, 30px bold)
   - Subtitle: "Discover our most popular products, trusted by our customers."
   - Action: "View All Products →" pill button
   - Grid: 4 columns desktop, 2 columns tablet/mobile
   - Cards: 1px green border (`#009b35`), 18px rounded corners, badge "Best Seller", 300px image box with `#f8fbf9` background, price + circular `+` button.
4. **Shop by Categories (Bento Grid):**
   - Title: "Shop by Categories"
   - Desktop Layout: 5 columns × 3 rows bento grid:
     - 1. Erectile Dysfunction (Col 1-2, Row 1)
     - 2. Ivermectin (Col 4-5, Row 1)
     - 3. Women's Health (Col 1, Row 2)
     - 4. Men's Health (Col 2, Row 2)
     - 5. Liver Care (Col 3, Row 1-2 tall)
     - 6. Hair Care (Col 4, Row 2)
     - 7. Anti Worm (Col 1-2, Row 3)
     - 8. Eyes / Ear Care (Col 3, Row 3)
     - 9. Skin Care (Col 4, Row 3)
     - 10. Diabetes (Col 5, Row 2-3 tall)
   - Mobile: 2×2 grid with "View All Categories ↓" expand toggle button.
5. **Trending Products Section:**
   - Label: `SHOP WHATS TRENDING`
   - Title: `Trending Products`
   - Badge: `Trending` (`#008b20`)
   - 4-column responsive grid
6. **Most Viewed Products Section:**
   - Label: `WHAT CUSTOMERS ARE VIEWING`
   - Title: `Most Viewed Products`
   - Card variant: Includes full-width "🛒 ADD TO CART" button
7. **Customer Reviews Carousel:**
   - Verified customer badges, 5-star ratings, testimonials, previous/next carousel arrows
   - Rating Summary: 4.8 / 5.0 "Excellent Customer Experience"
8. **Trust Bar & Footer:**
   - 4-column layout:
     - Col 1: Brand story, FDA/compliance disclaimer, contact summary
     - Col 2: Quick Links (Shop All, Best Sellers, Categories, About Us)
     - Col 3: Categories (Erectile Dysfunction, Respiratory, Skin Care, Anti Worm, etc.)
     - Col 4: Customer Support & Policies (Shipping Policy, Refund Policy, Privacy Policy, Terms)
   - Bottom Bar: Copyright notice + legal policy links
   - Floating WhatsApp Support widget in bottom right (`#25D366`)

---

## 4. Product Detail Page (PDP) Architecture

- **Breadcrumbs:** `Home / Category / Product Name`
- **Left Column: Gallery**
  - Main Product Image preview with zoom / contain container
  - Thumbnail selector row for multi-image products
- **Right Column: Product Information & Variations**
  - Product Title (`h1`, `#172b3a`)
  - Star Rating + Review Count
  - Stock Availability (`In Stock` in green `#008b20`)
  - Price Range (`$XX.XX – $YY.YY`)
  - "Talk to Experts" modal button
  - **Pack Price Table (`.vtr-pack-table`):**
    - Columns: `Pack Size` | `Price (with unit price)` | `Quantity` | `Add To Cart`
    - Seamless addition of individual pack sizes to cart
- **Tabs / Lower Sections:**
  - Description & Usage Guidelines
  - Specifications (Strength, Formulation, SKU)
  - Medical Information Disclaimer
  - Related Products Carousel

---

## 5. Shop & Catalog Experience

- **Search:** Instant client-side search across name, SKU, active ingredient, and description
- **Filters:**
  - Category filter with dynamic count
  - Price range slider / min-max inputs
  - In-stock availability toggle
  - Active filter chips with "Clear All"
- **Sorting:**
  - Featured / Default
  - Price: Low to High
  - Price: High to Low
  - Alphabetical: A to Z
  - Alphabetical: Z to A
- **Pagination:** Clean page navigation (12/24 items per page) preserving query parameters in URL.

---

## 6. Cart & Demo Checkout Flow

- **Frontend Cart:**
  - Flyout drawer or dedicated `/cart` page
  - Line items with product thumbnail, title, selected pack size, unit price, quantity stepper `[-] [N] [+]`, subtotal, and remove item `×`
  - Order summary: Subtotal, Shipping (Free / Estimated), Tax (Estimated demo), Total
  - LocalStorage persistence across page reloads
- **Demo Checkout (`/checkout`):**
  - Prominent banner: **"Demonstration Mode — No real payments or medical dispensing occur."**
  - Step 1: Contact details & Shipping address
  - Step 2: Simulated delivery option
  - Step 3: Simulated payment method (Demo Cash on Delivery / Demo Card test mode)
  - Order review & "Place Demo Order" button
- **Order Confirmation (`/order-confirmation`):**
  - Generated Order ID (e.g. `EM-849201`)
  - Itemized receipt, shipping address, simulated delivery timeline
  - "Continue Shopping" button
