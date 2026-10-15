import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Truck, Lock, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full bg-[#f8fafc] py-10 md:py-16 font-sans min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[#008000]">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">About Us</span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#0D477F] to-[#008000] text-white rounded-3xl p-8 sm:p-14 shadow-lg mb-12 text-center max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider text-[#FFD200]">
            Our Mission & Commitment
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Accessible, Genuine Healthcare For Every Home
          </h1>
          <p className="text-sm sm:text-base text-white/85 max-w-2xl mx-auto leading-relaxed">
            EasyMeds was founded to eliminate unnecessary pharmaceutical markups, providing patients direct access to laboratory-tested genuine medications with total privacy and discrete delivery.
          </p>
        </div>

        {/* Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#eaf5ee] text-[#008000] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">100% Genuine Medicines</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Every pharmaceutical product in our catalog of over 1,700 items is sourced from licensed WHO-GMP compliant facilities with verifiable batch tracking.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#eaf5ee] text-[#008000] flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Discreet & Secure Dispatch</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              We package every medication in unmarked, tamper-evident boxes. Your privacy is protected from dispatch to delivery with full live courier tracking.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#eaf5ee] text-[#008000] flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Fair & Transparent Pricing</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              By working directly with volume distributors and avoiding high storefront overhead, we pass savings of up to 70% directly to you.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 shadow-sm max-w-4xl mx-auto space-y-6 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-[#0b355b]">
            Setting the Standard in Online Pharmaceutical Care
          </h2>
          <p>
            Navigating medical treatment can be complex and stressful. At EasyMeds, we believe that obtaining essential medications—whether for respiratory care, cardiovascular health, or specialized life-saving regimens—should be simple, transparent, and completely dependable.
          </p>
          <p>
            Our catalog is continuously reviewed by healthcare specialists to ensure accurate dosage information, active pharmaceutical ingredient clarity, and complete batch verification.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="px-6 py-3 rounded-xl bg-[#008000] hover:bg-[#006f19] text-white text-xs sm:text-sm font-bold shadow-md transition-all"
            >
              Browse Catalog
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-800 text-xs sm:text-sm font-bold hover:bg-gray-50 transition-all"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
