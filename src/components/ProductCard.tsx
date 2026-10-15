import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Check, Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  badge?: string;
  variant?: 'default' | 'large-btn';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  badge,
  variant = 'default',
}) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.primaryImage || '/images/products/placeholder.svg');

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const displayBadge = badge || (product.isBestSeller ? 'Best Seller' : product.isTrending ? 'Trending' : null);

  return (
    <article className="group relative bg-white border border-[#009b35] rounded-[18px] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover font-sans">
      {/* =========================================================
          IMAGE CONTAINER (#f8fbf9)
      ========================================================= */}
      <Link
        to={`/product/${product.slug}`}
        className="relative block h-[220px] sm:h-[260px] md:h-[290px] p-4 sm:p-6 bg-[#f8fbf9] overflow-hidden flex items-center justify-center"
      >
        <img
          src={imgSrc}
          alt={product.name}
          loading="lazy"
          onError={() => setImgSrc('/images/products/placeholder.svg')}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
        />

        {displayBadge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#008b20] text-white text-[10px] sm:text-[11px] font-bold tracking-wide shadow-sm">
            {displayBadge}
          </span>
        )}
      </Link>

      {/* =========================================================
          CARD CONTENT
      ========================================================= */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <Link
            to={`/category/${product.category.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
            className="block text-[11px] font-semibold text-[#008b20] uppercase tracking-wider truncate mb-1.5 hover:underline"
          >
            {product.category}
          </Link>

          {/* Product Title */}
          <h3 className="text-sm sm:text-base font-semibold text-[#172b3a] line-clamp-2 leading-snug group-hover:text-[#008b20] transition-colors min-h-[42px]">
            <Link to={`/product/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span className="text-[#f3b51b] tracking-widest text-sm">★★★★★</span>
            <span className="text-gray-500 font-medium">({product.rating.toFixed(1)})</span>
          </div>
        </div>

        {/* =========================================================
            BOTTOM PRICE & CART BUTTON
        ========================================================= */}
        <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between">
          <div className="text-[#0b355b] font-bold text-base sm:text-lg">
            ${product.price.toFixed(2)}
            {product.highPrice && product.highPrice > product.price && (
              <span className="text-xs font-normal text-gray-500 ml-1">
                – ${product.highPrice.toFixed(2)}
              </span>
            )}
          </div>

          {variant === 'large-btn' ? (
            <button
              onClick={handleAddToCart}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                added
                  ? 'bg-[#008b20] text-white'
                  : 'bg-[#0D477F] hover:bg-[#008b20] text-white'
              }`}
            >
              {added ? <Check className="w-3.5 h-3.5" /> : null}
              <span>{added ? 'ADDED' : 'ADD TO CART'}</span>
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              aria-label={`Add ${product.name} to cart`}
              className={`w-9 sm:w-10 h-9 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                added
                  ? 'bg-[#008b20] text-white scale-110'
                  : 'bg-[#0D477F] hover:bg-[#008b20] hover:scale-110 text-white shadow-sm'
              }`}
            >
              {added ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Plus className="w-5 h-5 stroke-[2.5]" />}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
