import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Lock, Award, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white text-gray-800 border-t border-[#edf0f3] font-sans">
      {/* =========================================================
          MAIN 4-COLUMN FOOTER
      ========================================================= */}
      <div className="max-w-[1500px] mx-auto px-6 sm:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Col 1: Brand & Disclaimer */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img src="/assets/logo.svg" alt="EasyMeds" className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              EasyMeds is your trusted online healthcare destination for genuine, laboratory-tested prescription and wellness medications. Committed to discreet delivery, safety, and everyday affordability.
            </p>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-[11px] text-gray-500 leading-normal">
              <strong>Medical Disclaimer:</strong> Information provided is for educational and demo catalog purposes only. Always consult a licensed physician or healthcare provider before starting any new medication.
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="relative text-base font-bold text-[#111111] mb-5 pb-2.5 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-0.5 after:bg-[#008000] after:rounded">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/shop" className="text-[#0D477F] hover:text-[#008000] hover:translate-x-1 inline-block transition-all">
                  Shop All Medicines
                </Link>
              </li>
              <li>
                <Link to="/category/erectile-dysfunction" className="text-[#0D477F] hover:text-[#008000] hover:translate-x-1 inline-block transition-all">
                  Best Selling Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#0D477F] hover:text-[#008000] hover:translate-x-1 inline-block transition-all">
                  About EasyMeds
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-[#0D477F] hover:text-[#008000] hover:translate-x-1 inline-block transition-all">
                  Health & Medicine Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-[#0D477F] hover:text-[#008000] hover:translate-x-1 inline-block transition-all">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#0D477F] hover:text-[#008000] hover:translate-x-1 inline-block transition-all">
                  Contact Customer Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div>
            <h3 className="relative text-base font-bold text-[#111111] mb-5 pb-2.5 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-0.5 after:bg-[#008000] after:rounded">
              Popular Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/category/erectile-dysfunction" className="text-[#0D477F] hover:text-[#008000] hover:translate-x-1 inline-block transition-all">
                  Erectile Dysfunction
                </Link>
              </li>
              <li>
                <Link to="/category/respiratory" className="text-[#0D477F] hover:text-[#008000] hover:translate-x-1 inline-block transition-all">
                  Respiratory & Asthma
                </Link>
              </li>
              <li>
                <Link to="/category/anti-worm" className="text-[#0D477F] hover:text-[#008000] hover:translate-x-1 inline-block transition-all">
                  Anti Worm & Parasitic Care
                </Link>
              </li>
              <li>
                <Link to="/category/skin-care" className="text-[#0D477F] hover:text-[#008000] hover:translate-x-1 inline-block transition-all">
                  Skin Care & Dermatology
                </Link>
              </li>
              <li>
                <Link to="/category/life-saving-drugs" className="text-[#0D477F] hover:text-[#008000] hover:translate-x-1 inline-block transition-all">
                  Life Saving & Oncology
                </Link>
              </li>
              <li>
                <Link to="/category/viral-care" className="text-[#0D477F] hover:text-[#008000] hover:translate-x-1 inline-block transition-all">
                  Viral Care & Antivirals
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Care & Policies */}
          <div>
            <h3 className="relative text-base font-bold text-[#111111] mb-5 pb-2.5 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-0.5 after:bg-[#008000] after:rounded">
              Customer Support
            </h3>
            <div className="space-y-3 text-sm text-gray-600 mb-5">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-500">Call / Text Support</span>
                <span className="text-sm font-semibold text-[#0D477F]">+1 (800) 555-MEDS</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-500">Email Inquiries</span>
                <span className="text-sm font-semibold text-[#0D477F]">support@easymeds.com</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-500">Working Hours</span>
                <span className="text-xs text-gray-600">Mon - Sat: 9:00 AM - 8:00 PM EST</span>
              </div>
            </div>

            <ul className="space-y-1.5 text-xs text-gray-500">
              <li>
                <Link to="/shipping-policy" className="hover:text-[#008000] transition-colors">
                  • Fast & Discreet Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-[#008000] transition-colors">
                  • Refund & Return Guarantee
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#008000] transition-colors">
                  • Privacy & Data Protection Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#008000] transition-colors">
                  • Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* =========================================================
          TRUST BAR (#eaf5ee)
      ========================================================= */}
      <div className="w-full bg-[#eaf5ee] border-t border-b border-[#c5e6ca]">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-8 py-5 grid grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#008000]/15 text-[#008000] flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <strong className="block text-xs font-bold text-gray-900">100% Genuine Medicines</strong>
              <span className="block text-[11px] text-gray-600">Verified manufacturer authentic</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#008000]/15 text-[#008000] flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <strong className="block text-xs font-bold text-gray-900">Discreet Delivery</strong>
              <span className="block text-[11px] text-gray-600">Plain packaging with tracking</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#008000]/15 text-[#008000] flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <strong className="block text-xs font-bold text-gray-900">Secure Privacy</strong>
              <span className="block text-[11px] text-gray-600">256-bit encrypted checkout</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#008000]/15 text-[#008000] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <strong className="block text-xs font-bold text-gray-900">Best Price Everyday</strong>
              <span className="block text-[11px] text-gray-600">Direct volume pricing</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM COPYRIGHT & LEGAL BAR
      ========================================================= */}
      <div className="w-full bg-[#eaf5ee] py-4 text-xs text-gray-600">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>© 2026 <strong>EasyMeds Pharmacy</strong>. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#0D477F]">
            <Link to="/shipping-policy" className="hover:underline">Shipping Policy</Link>
            <Link to="/refund-policy" className="hover:underline">Refund Policy</Link>
            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* =========================================================
          FLOATING WHATSAPP CHAT BUTTON
      ========================================================= */}
      <a
        href="https://wa.me/18005556337?text=Hello%20EasyMeds%20Support%2C%20I%20have%20an%20inquiry%20regarding%20products."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-5 bottom-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] text-white font-semibold text-sm shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-200"
        aria-label="Chat with EasyMeds on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
        <span className="hidden sm:inline">Chat with us</span>
      </a>
    </footer>
  );
};
