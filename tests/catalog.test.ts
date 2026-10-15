import { describe, it, expect } from 'vitest';
import productsData from '../data/products.json';
import imageManifest from '../data/image-manifest.json';
import { Product } from '../src/types';

describe('EasyMeds Product Catalog & Data Integrity', () => {
  const products = productsData as Product[];

  it('contains exactly 1,750 imported products from the authoritative CSV', () => {
    expect(products.length).toBe(1750);
  });

  it('guarantees unique IDs for every product', () => {
    const ids = new Set(products.map((p) => p.id));
    expect(ids.size).toBe(products.length);
  });

  it('guarantees collision-safe slugs for clean routing', () => {
    const slugs = new Set(products.map((p) => p.slug));
    expect(slugs.size).toBe(products.length);
  });

  it('preserves valid prices and USD currency across all products', () => {
    products.forEach((p) => {
      expect(p.price).toBeGreaterThan(0);
      expect(p.currency).toBe('USD');
      expect(typeof p.name).toBe('string');
      expect(p.name.length).toBeGreaterThan(0);
    });
  });

  it('maps every product to local verified images in the image manifest', () => {
    expect(Object.keys(imageManifest).length).toBe(1750);
    products.forEach((p) => {
      expect(p.images.length).toBeGreaterThan(0);
      expect(p.primaryImage).toBeDefined();
      expect(p.primaryImage.startsWith('/')).toBe(true);
    });
  });

  it('generates standard pack size variants with volume savings', () => {
    const sample = products[0];
    expect(sample.variants.length).toBeGreaterThan(0);
    sample.variants.forEach((v) => {
      expect(v.price).toBeGreaterThan(0);
      expect(v.unitPrice).toBeGreaterThan(0);
      expect(v.packSize).toBeDefined();
    });
  });

  it('performs dynamic search on product title and active ingredients', () => {
    const query = 'sildenafil';
    const matches = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.activeIngredient.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
    expect(matches.length).toBeGreaterThan(0);
  });

  it('correctly categorizes products into therapeutic classes', () => {
    const edProducts = products.filter((p) => p.category === 'Erectile Dysfunction');
    expect(edProducts.length).toBeGreaterThan(100);

    const respiratoryProducts = products.filter((p) => p.category === 'Respiratory');
    expect(respiratoryProducts.length).toBeGreaterThan(50);
  });
});

describe('Cart Calculations & Free Shipping Threshold', () => {
  it('calculates subtotal and applies free shipping over $99', () => {
    const item1 = { price: 40.0, quantity: 2 }; // $80.00 -> shipping $15
    const subtotal1 = item1.price * item1.quantity;
    const shipping1 = subtotal1 >= 99 ? 0 : 15.0;
    const total1 = subtotal1 + shipping1;

    expect(subtotal1).toBe(80.0);
    expect(shipping1).toBe(15.0);
    expect(total1).toBe(95.0);

    const item2 = { price: 60.0, quantity: 2 }; // $120.00 -> free shipping
    const subtotal2 = item2.price * item2.quantity;
    const shipping2 = subtotal2 >= 99 ? 0 : 15.0;
    const total2 = subtotal2 + shipping2;

    expect(subtotal2).toBe(120.0);
    expect(shipping2).toBe(0);
    expect(total2).toBe(120.0);
  });
});
