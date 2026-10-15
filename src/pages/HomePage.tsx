import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Clock, Award, PhoneCall } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';
import { ProductCard } from '../components/ProductCard';
import { BenefitTicker } from '../components/BenefitTicker';
import { BentoCategories } from '../components/BentoCategories';
import { ReviewsCarousel } from '../components/ReviewsCarousel';

interface HomePageProps {
  onOpenCallback: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenCallback }) => {
  const { bestSellers, trending, mostViewed } = useCatalog();

  return (
    <div className="w-full bg-white font-sans">
      {/* =========================================================
          HERO BANNER (VTR-STYLE HIGH IMPACT SECTION)
      ========================================================= */}
      <section className="relative w-full bg-gradient-to-r from-[#0D477F] via-[#093a69] to-[#008000] text-white py-12 sm:py-16 md:py-20 overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-white/5 pointer-events-none blur-2xl" />
        <div className="absolute left-1/3 -bottom-24 w-80 h-80 rounded-full bg-[#95C11F]/10 pointer-events-none blur-3xl" />

        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Hero Left Content */}
          <div className="max-w-2xl text-center md:text-left space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-[#FFD200] uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#FFD200]" />
              <span>Certified Online Pharmacy • 100% Genuine</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Trusted Healthcare & Genuine Medicines
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed max-w-xl">
              Access over 1,700+ verified prescription and over-the-counter medications. Fast, discreet door-to-door delivery with transparent pricing.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <Link
                to="/shop"
                className="px-8 py-4 rounded-xl bg-[#008000] hover:bg-[#006f19] text-white text-base font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <span>EXPLORE ALL MEDICINES</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <button
                onClick={onOpenCallback}
                className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/30 text-sm font-semibold backdrop-blur-sm transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#95C11F]" />
                <span>Talk to Pharmacist</span>
              </button>
            </div>

            {/* Badges row */}
            <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs text-white/80">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#95C11F]" />
                <span>Laboratory Verified Quality</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#95C11F]" />
                <span>Discreet & Fast Dispatch</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Showcase */}
          <div className="w-full md:w-auto max-w-md flex justify-center">
            <div className="relative p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl flex flex-col items-center text-center">
              <div className="w-48 sm:w-56 h-48 sm:h-56 bg-white rounded-2xl p-4 shadow-inner flex items-center justify-center mb-4">
                <img
                  src="/images/products/b336bbfab398_01.jpg"
                  alt="Featured Medicine"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="px-3 py-1 rounded-full bg-[#008000] text-white text-xs font-bold mb-2">
                Featured Best Seller
              </span>
              <h3 className="text-base font-bold text-white mb-1">
                Prescription & OTC Essentials
              </h3>
              <p className="text-xs text-white/80 mb-3">
                Volume pack savings on everyday medications
              </p>
              <Link
                to="/shop"
                className="text-xs font-bold text-[#FFD200] hover:underline flex items-center gap-1"
              >
                <span>Browse Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INFINITE BENEFITS TICKER
      ========================================================= */}
      <BenefitTicker />

      {/* =========================================================
          SECTION 1 — BEST SELLING PRODUCTS (4-COL GRID)
      ========================================================= */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <span className="block text-xs font-bold uppercase tracking-[2px] text-[#008b20] mb-2">
                SHOP OUR TOP PICKS
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b355b] tracking-tight">
                Best Selling Products
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-500">
                Discover our most popular products, trusted by thousands of patients.
              </p>
            </div>

            <Link
              to="/shop?filter=best-seller"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#0b355b] text-[#0b355b] hover:bg-[#0b355b] hover:text-white text-xs sm:text-sm font-semibold transition-all whitespace-nowrap self-start sm:self-auto"
            >
              <span>View All Products</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 2 — BENTO SHOP BY CATEGORIES
      ========================================================= */}
      <BentoCategories />

      {/* =========================================================
          SECTION 3 — TRENDING PRODUCTS
      ========================================================= */}
      <section className="w-full py-12 md:py-16 bg-[#f8fbf9] border-t border-b border-gray-100">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <span className="block text-xs font-bold uppercase tracking-[2px] text-[#008b20] mb-2">
                SHOP WHATS TRENDING
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b355b] tracking-tight">
                Trending Products
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-500">
                High demand formulations with verified batch authenticity.
              </p>
            </div>

            <Link
              to="/shop?filter=trending"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#0b355b] text-[#0b355b] hover:bg-[#0b355b] hover:text-white text-xs sm:text-sm font-semibold transition-all whitespace-nowrap self-start sm:self-auto"
            >
              <span>View All Products</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {trending.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} badge="Trending" />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 4 — MOST VIEWED PRODUCTS
      ========================================================= */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <span className="block text-xs font-bold uppercase tracking-[2px] text-[#008b20] mb-2">
                WHAT CUSTOMERS ARE VIEWING
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b355b] tracking-tight">
                Most Viewed Products
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-500">
                Explore the top viewed and re-ordered medicines this week.
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#0b355b] text-[#0b355b] hover:bg-[#0b355b] hover:text-white text-xs sm:text-sm font-semibold transition-all whitespace-nowrap self-start sm:self-auto"
            >
              <span>View All Products</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {mostViewed.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="large-btn"
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CONSULTATION & PHARMACY ASSISTANCE BANNER
      ========================================================= */}
      <section className="w-full bg-[#0D477F] text-white py-12 md:py-14">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Need Assistance With Your Prescription or Dosage?
            </h2>
            <p className="text-sm text-white/80 max-w-2xl">
              Our clinical pharmacists and support team are available 6 days a week to clarify pack sizes, active ingredients, and shipping timelines.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenCallback}
              className="px-6 py-3.5 rounded-xl bg-[#95C11F] hover:bg-[#86b01a] text-gray-900 font-extrabold text-sm transition-all shadow-lg flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>REQUEST A CALL BACK</span>
            </button>
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-xl border border-white/30 text-white hover:bg-white/10 font-bold text-sm transition-all"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 5 — VERIFIED REVIEWS CAROUSEL
      ========================================================= */}
      <ReviewsCarousel />
    </div>
  );
};
