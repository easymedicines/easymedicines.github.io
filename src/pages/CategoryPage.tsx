import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import { ProductCard } from '../components/ProductCard';
import { ArrowLeft, ArrowUpDown } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products, categories } = useCatalog();
  const [sortBy, setSortBy] = useState('featured');

  // Match category slug with normalized category name
  const matchedCategory = useMemo(() => {
    if (!slug) return '';
    const cleanSlug = slug.toLowerCase().replace(/-/g, ' ');
    return (
      categories.find((c) => c.toLowerCase().replace(/[^\w\s]/g, '') === cleanSlug) ||
      categories.find((c) => c.toLowerCase().includes(cleanSlug)) ||
      slug.replace(/-/g, ' ')
    );
  }, [slug, categories]);

  const categoryProducts = useMemo(() => {
    let list = products.filter(
      (p) =>
        p.category.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') === slug?.toLowerCase() ||
        p.category.toLowerCase() === matchedCategory.toLowerCase()
    );

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'alpha-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, slug, matchedCategory, sortBy]);

  return (
    <div className="w-full bg-[#f8fafc] py-8 md:py-12 font-sans min-h-screen">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[#008000]">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#008000]">Categories</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold capitalize">{matchedCategory}</span>
        </nav>

        {/* Back Link */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D477F] hover:text-[#008000] mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Medicines</span>
        </Link>

        {/* Category Header */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#008000] block mb-1">
              Therapeutic Category
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b355b] capitalize">
              {matchedCategory}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {categoryProducts.length} verified products available with lab tested quality.
            </p>
          </div>

          {/* Sort */}
          <div className="relative self-end sm:self-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm font-semibold text-gray-800 outline-none pr-8 cursor-pointer shadow-sm"
            >
              <option value="featured">Featured / Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="alpha-asc">Name: A to Z</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Products Grid */}
        {categoryProducts.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-2">No medications found</h3>
            <p className="text-sm text-gray-500 mb-4">No products are currently filed under this category.</p>
            <Link to="/shop" className="px-6 py-2.5 rounded-full bg-[#0D477F] text-white text-xs font-bold">
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
