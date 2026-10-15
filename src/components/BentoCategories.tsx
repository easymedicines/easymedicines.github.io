import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  desktopClass: string;
  bgGradient: string;
}

const categories: CategoryItem[] = [
  {
    id: 'cat-1',
    name: 'Erectile Dysfunction',
    slug: 'erectile-dysfunction',
    image: '/images/products/b336bbfab398_01.jpg',
    desktopClass: 'lg:col-span-2 lg:row-span-1',
    bgGradient: 'from-blue-900/60 to-transparent',
  },
  {
    id: 'cat-2',
    name: 'Anti Worm & Parasitic',
    slug: 'anti-worm',
    image: '/images/products/b4b4370df17a_01.jpg',
    desktopClass: 'lg:col-start-4 lg:col-span-2 lg:row-span-1',
    bgGradient: 'from-emerald-900/60 to-transparent',
  },
  {
    id: 'cat-3',
    name: "Women's Health",
    slug: 'womens-health',
    image: '/images/products/0f4563e7cb94_01.jpg',
    desktopClass: 'lg:col-span-1 lg:row-span-1',
    bgGradient: 'from-pink-900/60 to-transparent',
  },
  {
    id: 'cat-4',
    name: "Men's Health",
    slug: 'mens-health',
    image: '/images/products/80ded885ca10_01.jpg',
    desktopClass: 'lg:col-span-1 lg:row-span-1',
    bgGradient: 'from-cyan-900/60 to-transparent',
  },
  {
    id: 'cat-5',
    name: 'Liver Care',
    slug: 'liver-care',
    image: '/images/products/2b9e3016ab21_01.webp',
    desktopClass: 'lg:col-start-3 lg:col-span-1 lg:row-span-2',
    bgGradient: 'from-teal-900/60 to-transparent',
  },
  {
    id: 'cat-6',
    name: 'Respiratory Care',
    slug: 'respiratory',
    image: '/images/products/b336bbfab398_01.jpg',
    desktopClass: 'lg:col-start-4 lg:col-span-1 lg:row-span-1',
    bgGradient: 'from-indigo-900/60 to-transparent',
  },
  {
    id: 'cat-7',
    name: 'Life Saving Drugs',
    slug: 'life-saving-drugs',
    image: '/images/products/0f4563e7cb94_01.jpg',
    desktopClass: 'lg:col-span-2 lg:row-span-1',
    bgGradient: 'from-rose-900/60 to-transparent',
  },
  {
    id: 'cat-8',
    name: 'Eyes / Ear Care',
    slug: 'eyes-ear-care',
    image: '/images/products/80ded885ca10_01.jpg',
    desktopClass: 'lg:col-start-3 lg:col-span-1 lg:row-span-1',
    bgGradient: 'from-sky-900/60 to-transparent',
  },
  {
    id: 'cat-9',
    name: 'Skin Care',
    slug: 'skin-care',
    image: '/images/products/b4b4370df17a_01.jpg',
    desktopClass: 'lg:col-start-4 lg:col-span-1 lg:row-span-1',
    bgGradient: 'from-amber-900/60 to-transparent',
  },
  {
    id: 'cat-10',
    name: 'Diabetes & Metabolism',
    slug: 'diabetes',
    image: '/images/products/2b9e3016ab21_01.webp',
    desktopClass: 'lg:col-start-5 lg:col-span-1 lg:row-span-2',
    bgGradient: 'from-purple-900/60 to-transparent',
  },
];

export const BentoCategories: React.FC = () => {
  const [showAllMobile, setShowAllMobile] = useState(false);

  // On mobile show 4 categories initially unless expanded
  const visibleCategories = showAllMobile ? categories : categories.slice(0, 4);

  return (
    <section className="w-full bg-white py-12 md:py-16 font-sans">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111] tracking-tight">
            Shop by Categories
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500">
            Explore trusted medications and healthcare solutions curated by category.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="hidden lg:grid grid-cols-5 auto-rows-[160px] gap-3.5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className={`group relative overflow-hidden rounded-[19px] bg-[#edf5ee] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 block ${cat.desktopClass}`}
            >
              {/* Product preview artwork */}
              <div className="absolute inset-0 p-4 flex items-center justify-center bg-[#f8fbf9]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 opacity-90"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 group-hover:opacity-75 transition-opacity" />

              {/* Category Pill Label */}
              <div className="absolute left-4 bottom-4 z-10 px-4 py-2 bg-white/95 backdrop-blur-sm text-[#172f4d] rounded-full font-serif font-bold text-xs sm:text-sm shadow-md group-hover:bg-[#008000] group-hover:text-white transition-colors duration-200">
                {cat.name}
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile & Tablet Grid */}
        <div className="lg:hidden grid grid-cols-2 gap-3">
          {visibleCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group relative h-[140px] sm:h-[160px] overflow-hidden rounded-2xl bg-[#edf5ee] shadow-sm block"
            >
              <div className="absolute inset-0 p-3 flex items-center justify-center bg-[#f8fbf9]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="max-h-full max-w-full object-contain opacity-90"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute left-2.5 right-2.5 bottom-2.5 z-10 px-3 py-1.5 bg-white/95 rounded-full font-serif font-bold text-[11px] sm:text-xs text-[#172f4d] text-center shadow truncate">
                {cat.name}
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <div className="lg:hidden flex justify-center mt-6">
          <button
            onClick={() => setShowAllMobile(!showAllMobile)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#172f4d] text-[#172f4d] hover:bg-[#008000] hover:text-white hover:border-[#008000] text-xs font-bold transition-all"
          >
            <span>{showAllMobile ? 'Show Less Categories' : 'View All Categories'}</span>
            {showAllMobile ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </section>
  );
};
