import React, { createContext, useContext, useMemo } from 'react';
import rawProducts from '../../data/products.json';
import { Product } from '../types';

interface CatalogContextType {
  products: Product[];
  categories: string[];
  categoryCounts: Record<string, number>;
  bestSellers: Product[];
  trending: Product[];
  mostViewed: Product[];
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
  getRelatedProducts: (product: Product, limit?: number) => Product[];
  searchProducts: (query: string) => Product[];
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const products = useMemo(() => rawProducts as Product[], []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of products) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, [products]);

  const categories = useMemo(() => {
    return Object.keys(categoryCounts).sort();
  }, [categoryCounts]);

  const bestSellers = useMemo(() => {
    const list = products.filter(p => p.isBestSeller);
    return list.length >= 8 ? list.slice(0, 8) : products.slice(0, 8);
  }, [products]);

  const trending = useMemo(() => {
    const list = products.filter(p => p.isTrending);
    return list.length >= 8 ? list.slice(0, 8) : products.slice(8, 16);
  }, [products]);

  const mostViewed = useMemo(() => {
    const list = products.filter(p => p.isMostViewed);
    return list.length >= 8 ? list.slice(0, 8) : products.slice(16, 24);
  }, [products]);

  const getProductBySlug = (slug: string): Product | undefined => {
    const cleanSlug = slug.toLowerCase().trim();
    return products.find(p => p.slug === cleanSlug);
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
  };

  const getRelatedProducts = (product: Product, limit = 4): Product[] => {
    return products
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, limit);
  };

  const searchProducts = (query: string): Product[] => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.activeIngredient.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  };

  return (
    <CatalogContext.Provider
      value={{
        products,
        categories,
        categoryCounts,
        bestSellers,
        trending,
        mostViewed,
        getProductBySlug,
        getProductById,
        getRelatedProducts,
        searchProducts,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};
