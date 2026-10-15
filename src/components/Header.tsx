import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, Phone, Mail, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onOpenCallback?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCallback }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileSearchOpen(false);
    }
  };

  const navCategories = [
    { name: 'Erectile Dysfunction', slug: 'erectile-dysfunction' },
    { name: 'Respiratory', slug: 'respiratory' },
    { name: 'Life Saving Drugs', slug: 'life-saving-drugs' },
    { name: 'Skin Care', slug: 'skin-care' },
    { name: 'Viral Care', slug: 'viral-care' },
    { name: 'Anti Worm', slug: 'anti-worm' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <header className="w-full relative z-50 bg-white font-sans">
      {/* =========================================================
          ROW 1 — TOP INFORMATION BAR (#0D477F)
      ========================================================= */}
      <div className="w-full bg-[#0D477F] text-white">
        <div className="max-w-[1500px] min-h-[50px] mx-auto px-4 sm:px-8 flex items-center justify-between text-xs sm:text-sm font-semibold gap-4">
          {/* Email */}
          <a
            href="mailto:support@easymeds.com"
            className="hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity text-white"
          >
            <Mail className="w-4 h-4 text-white" />
            <span>support@easymeds.com</span>
          </a>

          {/* Callback button */}
          <button
            onClick={onOpenCallback}
            className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity mx-auto md:mx-0 py-1"
          >
            <MessageSquare className="w-4 h-4 text-white" />
            <span>Request a Call Back</span>
          </button>

          {/* Phone */}
          <a
            href="tel:+18005556337"
            className="hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity text-white"
          >
            <Phone className="w-4 h-4 text-white" />
            <span>US Call/Text: +1 (800) 555-MEDS</span>
          </a>
        </div>
      </div>

      {/* =========================================================
          ROW 2 — LOGO + SEARCH + ACCOUNT / CART
      ========================================================= */}
      <div className="w-full bg-white border-b border-[#edf0f3]">
        <div className="max-w-[1500px] min-h-[78px] md:min-h-[105px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-4 md:gap-10">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src="/assets/logo.svg"
              alt="EasyMeds Pharmacy"
              className="h-9 sm:h-11 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-[650px] h-[50px] mx-auto items-center border border-[#d9e0e6] rounded-full bg-white overflow-hidden focus-within:border-[#0D477F] focus-within:shadow-search transition-all"
          >
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medicines, products, active ingredients..."
              className="flex-1 h-full px-5 text-sm text-gray-800 bg-transparent outline-none border-none focus:ring-0 placeholder-gray-400"
            />
            <button
              type="submit"
              aria-label="Search"
              className="w-14 h-full bg-[#0D477F] hover:bg-[#08385f] text-white flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Search className="w-5 h-5 text-white" />
            </button>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
            {/* Mobile Search Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-[#0D477F] transition-colors"
              aria-label="Toggle mobile search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Link */}
            <Link
              to="/account"
              className="hidden sm:flex items-center justify-center w-8 h-8 text-gray-700 hover:text-[#0D477F] hover:-translate-y-0.5 transition-all"
              aria-label="Account"
            >
              <User className="w-6 h-6 stroke-[1.8]" />
            </Link>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center w-8 h-8 text-gray-800 hover:text-[#0D477F] hover:-translate-y-0.5 transition-all"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-6 h-6 stroke-[1.8]" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2.5 min-w-[20px] h-5 px-1 rounded-full bg-[#95C11F] text-white text-[10px] font-extrabold flex items-center justify-center shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-[#0D477F] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Drawer */}
        {isMobileSearchOpen && (
          <div className="md:hidden px-4 py-3 bg-gray-50 border-t border-[#edf0f3]">
            <form onSubmit={handleSearchSubmit} className="flex h-11 border border-gray-300 rounded-full overflow-hidden bg-white">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medicines..."
                className="flex-1 px-4 text-sm outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="w-12 bg-[#0D477F] text-white flex items-center justify-center"
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* =========================================================
          ROW 3 — GREEN CATEGORY BAR (#008000)
      ========================================================= */}
      <div className="hidden md:block w-full bg-[#008000]">
        <div className="max-w-[1500px] min-h-[64px] mx-auto px-8 flex items-center justify-between gap-6">
          {/* Category Navigation Links */}
          <nav className="flex items-center gap-7 lg:gap-9 flex-1">
            {navCategories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.path || `/category/${cat.slug}`}
                className="inline-flex items-center gap-1.5 text-white hover:opacity-80 transition-opacity text-[16px] font-semibold tracking-wide whitespace-nowrap"
              >
                <span>{cat.name}</span>
                {!cat.path && <span className="text-xs opacity-70">⌄</span>}
              </Link>
            ))}
          </nav>

          {/* SHOP ALL BUTTON */}
          <Link
            to="/shop"
            className="flex-shrink-0 min-w-[170px] h-[48px] px-6 rounded-xl bg-[#0D477F] hover:bg-[#FFD200] hover:text-[#111111] text-white text-[17px] font-bold border border-white/20 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
          >
            <span className="text-lg">♧</span>
            <span>SHOP ALL</span>
          </Link>
        </div>
      </div>

      {/* Mobile Slide-Down Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full bg-white border-b border-gray-200 shadow-xl px-5 py-4 divide-y divide-gray-100">
          <div className="py-2 flex flex-col gap-1">
            <Link
              to="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg bg-[#0D477F] text-white text-center font-bold text-sm mb-2"
            >
              SHOP ALL MEDICINES
            </Link>

            {navCategories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.path || `/category/${cat.slug}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 px-3 text-gray-800 hover:text-[#008000] hover:bg-gray-50 rounded text-sm font-medium transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 pb-2 text-xs text-gray-500 space-y-2">
            <div className="flex items-center gap-2 text-gray-700">
              <Mail className="w-3.5 h-3.5 text-[#008000]" />
              <span>support@easymeds.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Phone className="w-3.5 h-3.5 text-[#008000]" />
              <span>+1 (800) 555-MEDS</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
