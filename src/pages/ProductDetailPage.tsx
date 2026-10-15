import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { ShieldCheck, Truck, Clock, MessageSquare, Check, Plus, Minus, ArrowLeft, AlertCircle } from 'lucide-react';
import { getAssetUrl } from '../lib/utils';

interface ProductDetailPageProps {
  onOpenCallback?: (productName?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onOpenCallback }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getProductBySlug, getRelatedProducts } = useCatalog();
  const { addToCart } = useCart();

  const product = slug ? getProductBySlug(slug) : undefined;

  const [activeImage, setActiveImage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'warnings' | 'shipping'>('desc');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedVariants, setAddedVariants] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (product) {
      setActiveImage(getAssetUrl(product.primaryImage) || getAssetUrl('/images/products/placeholder.svg'));
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center p-8 font-sans">
        <AlertCircle className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
        <p className="text-sm text-gray-500 mt-2 mb-6 max-w-sm">
          The medicine you requested could not be located in our current catalog.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-2.5 rounded-full bg-[#0D477F] text-white text-xs font-bold hover:bg-[#08385f]"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product, 4);

  const handleRowQuantityChange = (variantId: string, val: number) => {
    setQuantities((prev) => ({
      ...prev,
      [variantId]: Math.max(1, val),
    }));
  };

  const handleAddVariantToCart = (variantId: string) => {
    const qty = quantities[variantId] || 1;
    addToCart(product, variantId, qty);
    setAddedVariants((prev) => ({ ...prev, [variantId]: true }));
    setTimeout(() => {
      setAddedVariants((prev) => ({ ...prev, [variantId]: false }));
    }, 1500);
  };

  return (
    <div className="w-full bg-white py-8 md:py-12 font-sans">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-[#008000]">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#008000]">Shop</Link>
          <span>/</span>
          <Link
            to={`/category/${product.category.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
            className="hover:text-[#008000]"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Back Link */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D477F] hover:text-[#008000] mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </Link>

        {/* =========================================================
            MAIN PRODUCT GRID (GALLERY + SUMMARY)
        ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Gallery (Left: 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="w-full h-[320px] sm:h-[400px] md:h-[450px] bg-[#f8fbf9] border border-[#009b35]/20 rounded-3xl p-6 flex items-center justify-center shadow-sm">
              <img
                src={activeImage}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
                onError={() => setActiveImage('/images/products/placeholder.svg')}
              />
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl p-2 bg-[#f8fbf9] border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      activeImage === img
                        ? 'border-[#008000] shadow-sm'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/products/placeholder.svg';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantee badges */}
            <div className="p-4 rounded-2xl bg-[#eaf5ee] border border-[#c5e6ca] space-y-2 text-xs text-gray-700">
              <div className="flex items-center gap-2 text-[#008000] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Genuine Certified Formulation</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Truck className="w-4 h-4 text-[#0D477F]" />
                <span>Discreet Plain Box Packaging (Zero external medicine branding)</span>
              </div>
            </div>
          </div>

          {/* Product Summary & Pack Table (Right: 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#008000] uppercase tracking-wider block mb-1">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#172b3a] leading-tight">
                {product.name}
              </h1>

              {/* Rating + SKU */}
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#f3b51b] text-base tracking-widest">★★★★★</span>
                  <span className="font-bold text-gray-800">{product.rating.toFixed(1)}</span>
                  <span className="text-gray-400">({product.reviewCount} customer reviews)</span>
                </div>
                <span className="text-gray-300">•</span>
                <span className="text-gray-500">
                  SKU: <strong className="text-gray-700">{product.sku}</strong>
                </span>
              </div>

              {/* Availability & Price Display */}
              <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t border-gray-100">
                <div>
                  <span className="text-xs text-gray-400 block mb-0.5">Availability</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#008000]/10 text-[#008000] text-xs font-extrabold">
                    <Check className="w-3.5 h-3.5" /> In Stock & Ready to Dispatch
                  </span>
                </div>

                <div>
                  <span className="text-xs text-gray-400 block mb-0.5">Starting Price</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#0D477F]">
                    ${product.price.toFixed(2)}
                    {product.highPrice && product.highPrice > product.price && (
                      <span className="text-base font-normal text-gray-500 ml-1.5">
                        – ${product.highPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-sm text-gray-600 leading-relaxed bg-[#f8fbf9] p-4 rounded-xl border border-gray-100">
              {product.description}
            </p>

            {/* Talk to Experts / Inquiry Button */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenCallback && onOpenCallback(product.name)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0D477F]/10 hover:bg-[#0D477F]/20 text-[#0D477F] text-xs font-bold transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Talk to Pharmacy Expert Regarding This Medicine</span>
              </button>
            </div>

            {/* =========================================================
                VTR PACK PRICE TABLE (.vtr-pack-table)
            ========================================================= */}
            <div className="pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-3 flex items-center justify-between">
                <span>Select Pack Size & Quantity</span>
                <span className="text-[11px] font-normal text-[#008000]">Volume Discounts Applied</span>
              </h3>

              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="vtr-pack-table">
                  <thead>
                    <tr>
                      <th>Pack Size</th>
                      <th>Total Price</th>
                      <th>Unit Price</th>
                      <th className="w-24">Quantity</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.variants.map((v) => {
                      const rowQty = quantities[v.id] || 1;
                      const isAdded = addedVariants[v.id] || false;

                      return (
                        <tr key={v.id}>
                          <td className="font-bold text-gray-900 whitespace-nowrap">
                            {v.packSize}
                            {v.savingsPercent > 0 && (
                              <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#008000]/10 text-[#008000]">
                                Save {v.savingsPercent}%
                              </span>
                            )}
                          </td>
                          <td className="font-bold text-[#0D477F] whitespace-nowrap text-base">
                            ${v.price.toFixed(2)}
                          </td>
                          <td className="text-xs text-gray-500 whitespace-nowrap">
                            ${v.unitPrice.toFixed(2)} / unit
                          </td>
                          <td>
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white w-20">
                              <button
                                type="button"
                                onClick={() => handleRowQuantityChange(v.id, rowQty - 1)}
                                className="w-6 h-7 flex items-center justify-center hover:bg-gray-100 text-gray-500"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="flex-1 text-center text-xs font-bold text-gray-800">
                                {rowQty}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRowQuantityChange(v.id, rowQty + 1)}
                                className="w-6 h-7 flex items-center justify-center hover:bg-gray-100 text-gray-500"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                          <td className="text-right">
                            <button
                              type="button"
                              onClick={() => handleAddVariantToCart(v.id)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                isAdded
                                  ? 'bg-[#008000] text-white'
                                  : 'bg-[#0D477F] hover:bg-[#008000] text-white shadow-sm'
                              }`}
                            >
                              {isAdded ? '✓ Added' : 'Add To Cart'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            DETAILED INFORMATION TABS
        ========================================================= */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 bg-[#f8fafc] overflow-x-auto">
            <button
              onClick={() => setActiveTab('desc')}
              className={`px-6 py-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'desc'
                  ? 'border-[#008000] text-[#008000] bg-white'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Medical Description
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-6 py-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'specs'
                  ? 'border-[#008000] text-[#008000] bg-white'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Drug Specifications
            </button>
            <button
              onClick={() => setActiveTab('warnings')}
              className={`px-6 py-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'warnings'
                  ? 'border-[#008000] text-[#008000] bg-white'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Usage & Precautions
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`px-6 py-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'shipping'
                  ? 'border-[#008000] text-[#008000] bg-white'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Shipping & Discreet Packaging
            </button>
          </div>

          {/* Tab Panels */}
          <div className="p-6 sm:p-8 text-sm text-gray-700 leading-relaxed">
            {activeTab === 'desc' && (
              <div className="space-y-4">
                <h4 className="text-base font-bold text-gray-900">
                  About {product.name}
                </h4>
                <div className="whitespace-pre-line text-gray-600">
                  {product.fullDescription || product.description}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-xl">
                <dl className="divide-y divide-gray-100">
                  <div className="py-2.5 flex justify-between">
                    <dt className="text-gray-500 font-medium">SKU / Item Code</dt>
                    <dd className="font-semibold text-gray-900">{product.sku}</dd>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <dt className="text-gray-500 font-medium">Therapeutic Category</dt>
                    <dd className="font-semibold text-gray-900">{product.category}</dd>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <dt className="text-gray-500 font-medium">Formulation</dt>
                    <dd className="font-semibold text-gray-900">{product.formulation}</dd>
                  </div>
                  {product.strength && (
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-gray-500 font-medium">Dosage Strength</dt>
                      <dd className="font-semibold text-gray-900">{product.strength}</dd>
                    </div>
                  )}
                  {product.activeIngredient && (
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-gray-500 font-medium">Active Pharmaceutical Ingredient</dt>
                      <dd className="font-semibold text-gray-900">{product.activeIngredient}</dd>
                    </div>
                  )}
                  <div className="py-2.5 flex justify-between">
                    <dt className="text-gray-500 font-medium">Batch Authenticity</dt>
                    <dd className="font-semibold text-[#008000]">Verified Lab Tested</dd>
                  </div>
                </dl>
              </div>
            )}

            {activeTab === 'warnings' && (
              <div className="space-y-4 max-w-2xl">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs sm:text-sm">
                  <strong>Important Medical Notice:</strong> EasyMeds encourages patients to consult their licensed physician before taking any prescription medication. Do not exceed recommended dosage.
                </div>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-gray-600">
                  <li>Store in a cool, dry place away from direct sunlight (below 25°C / 77°F).</li>
                  <li>Keep out of reach of children and pets.</li>
                  <li>Do not consume with alcohol or heavy grapefruit juices if taking cardiovascular or ED medications.</li>
                  <li>In case of unexpected allergic reaction or symptoms, seek immediate emergency medical care.</li>
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4 max-w-2xl">
                <h4 className="text-base font-bold text-gray-900">
                  Safe, Discreet & Fast Delivery
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  We understand that privacy is paramount when ordering medicines online. All orders from EasyMeds are shipped in unmarked, opaque packaging with zero indication of pharmaceutical contents.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <strong className="block text-xs font-bold text-gray-900">Plain Bubble Parcels</strong>
                    <span className="text-xs text-gray-500">No medical labels or store names on the outer box.</span>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <strong className="block text-xs font-bold text-gray-900">Tracked Priority Dispatch</strong>
                    <span className="text-xs text-gray-500">Live parcel tracking provided upon order completion.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =========================================================
            RELATED MEDICATIONS
        ========================================================= */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#008000]">
                  SIMILAR FORMULATIONS
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0b355b]">
                  Related Medications in {product.category}
                </h3>
              </div>
              <Link
                to={`/category/${product.category.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
                className="text-xs font-bold text-[#0D477F] hover:underline"
              >
                View Category →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
