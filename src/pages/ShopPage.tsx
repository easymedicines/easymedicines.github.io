import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import { ProductCard } from '../components/ProductCard';
import { Filter, X, ChevronLeft, ChevronRight, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { products, categories, categoryCounts } = useCatalog();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query params state
  const searchQuery = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';
  const filterType = searchParams.get('filter') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync category from URL
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const itemsPerPage = 24;

  // Filter products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.activeIngredient.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (selectedCategory) {
      list = list.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Filter by special tags (best-seller, trending)
    if (filterType === 'best-seller') {
      list = list.filter((p) => p.isBestSeller);
    } else if (filterType === 'trending') {
      list = list.filter((p) => p.isTrending);
    }

    // Filter by price
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'alpha-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'alpha-desc') {
      list.sort((a, b) => b.name.localeCompare(a.name));
    }

    return list;
  }, [products, searchQuery, selectedCategory, filterType, priceRange, sortBy]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, filterType, priceRange, sortBy]);

  // Pagination calculation
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const clearAllFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 500]);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters = Boolean(searchQuery || selectedCategory || filterType || priceRange[0] > 0 || priceRange[1] < 500);

  return (
    <div className="w-full bg-[#f8fafc] py-8 md:py-12 font-sans min-h-screen">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[#008000]">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Shop All Medicines</span>
          {selectedCategory && (
            <>
              <span>/</span>
              <span className="text-[#008000] font-semibold">{selectedCategory}</span>
            </>
          )}
        </nav>

        {/* Header / Title Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b355b] tracking-tight">
              {selectedCategory ? selectedCategory : searchQuery ? `Search Results for "${searchQuery}"` : 'All Products & Medications'}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Showing {totalItems > 0 ? startIndex + 1 : 0}–{Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} verified medicines
            </p>
          </div>

          {/* Controls Right */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-xs font-bold text-gray-700 shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#0D477F]" />
              <span>Filters</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-gray-500 font-medium">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm font-semibold text-gray-800 outline-none focus:border-[#008000] pr-8 shadow-sm cursor-pointer"
                >
                  <option value="featured">Featured / Best Sellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="alpha-asc">Product Name: A to Z</option>
                  <option value="alpha-desc">Product Name: Z to A</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-gray-500 font-medium mr-1">Active Filters:</span>

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D477F]/10 text-[#0D477F] text-xs font-semibold">
                Search: {searchQuery}
                <button
                  onClick={() => {
                    const next = new URLSearchParams(searchParams);
                    next.delete('search');
                    setSearchParams(next);
                  }}
                  className="hover:text-red-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {selectedCategory && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#008000]/10 text-[#008000] text-xs font-semibold">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('')} className="hover:text-red-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {(priceRange[0] > 0 || priceRange[1] < 500) && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-xs font-semibold">
                Price: ${priceRange[0]} – ${priceRange[1]}
                <button onClick={() => setPriceRange([0, 500])} className="hover:text-red-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-xs text-red-600 hover:underline font-bold ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* =========================================================
              SIDEBAR FILTERS (DESKTOP)
          ========================================================= */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
              {/* Filter Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
                  <Filter className="w-4 h-4 text-[#008000]" />
                  <span>Filter Products</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-red-600 hover:underline font-semibold"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Categories Facet */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                  Categories
                </h4>
                <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg text-left transition-colors ${
                      selectedCategory === ''
                        ? 'bg-[#008000] text-white font-bold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>All Categories</span>
                    <span>{products.length}</span>
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg text-left transition-colors ${
                        selectedCategory.toLowerCase() === cat.toLowerCase()
                          ? 'bg-[#008000] text-white font-bold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="truncate pr-2">{cat}</span>
                      <span className="text-[11px] opacity-75">
                        {categoryCounts[cat] || 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                  Price Range
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label className="text-[10px] text-gray-400 block mb-1">Min ($)</label>
                      <input
                        type="number"
                        min="0"
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                        className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg outline-none focus:border-[#008000]"
                      />
                    </div>
                    <span className="text-gray-400 self-end pb-2">–</span>
                    <div className="flex-1">
                      <label className="text-[10px] text-gray-400 block mb-1">Max ($)</label>
                      <input
                        type="number"
                        min={priceRange[0]}
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 500])}
                        className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg outline-none focus:border-[#008000]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* In-Stock Guarantee Info */}
              <div className="p-4 rounded-xl bg-[#eaf5ee] text-[#008000] text-xs space-y-1">
                <strong className="block font-bold">100% In-Stock Guarantee</strong>
                <p className="text-[11px] text-gray-600 leading-normal">
                  All catalog items are verified for immediate packaging and tracking dispatch.
                </p>
              </div>
            </div>
          </aside>

          {/* =========================================================
              PRODUCT GRID (3 COLS ON DESKTOP WITH SIDEBAR)
          ========================================================= */}
          <main className="lg:col-span-3">
            {currentProducts.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mx-auto">
                  <Filter className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">No products match your criteria</h3>
                <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
                  Try adjusting your search terms, removing active category filters, or expanding the price range.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 rounded-full bg-[#008000] text-white text-xs font-bold hover:bg-[#006f19] transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
                    <span className="text-xs text-gray-500">
                      Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setCurrentPage((prev) => Math.max(1, prev - 1));
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={currentPage === 1}
                        className="px-3 py-2 rounded-lg border border-gray-300 text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none hover:bg-gray-50 flex items-center gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Prev</span>
                      </button>

                      {/* Display a compact window of pages */}
                      {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                        let pageNum = currentPage;
                        if (currentPage <= 3) {
                          pageNum = idx + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + idx;
                        } else {
                          pageNum = currentPage - 2 + idx;
                        }
                        if (pageNum < 1 || pageNum > totalPages) return null;

                        return (
                          <button
                            key={pageNum}
                            onClick={() => {
                              setCurrentPage(pageNum);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`w-9 h-9 rounded-lg text-xs font-bold transition-colors ${
                              currentPage === pageNum
                                ? 'bg-[#0D477F] text-white'
                                : 'border border-gray-300 hover:bg-gray-100 text-gray-700'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => {
                          setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 rounded-lg border border-gray-300 text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none hover:bg-gray-50 flex items-center gap-1"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Slide-Over Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
              <h3 className="font-bold text-base text-gray-900">Filters</h3>
              <button onClick={() => setIsMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Categories</h4>
                <div className="space-y-1 max-h-72 overflow-y-auto">
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      setIsMobileFilterOpen(false);
                    }}
                    className={`w-full py-2 px-3 text-xs rounded text-left font-semibold ${
                      selectedCategory === '' ? 'bg-[#008000] text-white' : 'text-gray-700'
                    }`}
                  >
                    All Categories ({products.length})
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedCategory(c);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full py-2 px-3 text-xs rounded text-left ${
                        selectedCategory === c ? 'bg-[#008000] text-white font-bold' : 'text-gray-700'
                      }`}
                    >
                      {c} ({categoryCounts[c] || 0})
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={() => {
                    clearAllFilters();
                    setIsMobileFilterOpen(false);
                  }}
                  className="w-full py-2.5 rounded-lg border border-red-500 text-red-600 text-xs font-bold"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
