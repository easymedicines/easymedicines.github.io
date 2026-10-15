import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ArrowLeft, ShoppingBag } from 'lucide-react';
import { getAssetUrl } from '../lib/utils';

export const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, subtotal, shipping, total, itemCount } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="w-full min-h-[60vh] bg-white py-16 flex flex-col items-center justify-center text-center p-6 font-sans">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Shopping Cart is Empty</h1>
        <p className="text-sm text-gray-500 max-w-sm mb-6">
          Explore our certified catalog of over 1,700 medicines with guaranteed low everyday prices.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3 rounded-xl bg-[#008000] hover:bg-[#006f19] text-white text-sm font-bold shadow-md transition-all"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f8fafc] py-8 md:py-12 font-sans min-h-screen">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[#008000]">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Shopping Cart</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b355b] mb-8">
          Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Items Table (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.id} className="py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                  {/* Thumbnail */}
                  <Link
                    to={`/product/${item.slug}`}
                    className="w-20 h-20 rounded-xl bg-[#f8fbf9] p-2 border border-gray-200 flex-shrink-0 flex items-center justify-center"
                  >
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = getAssetUrl('/images/products/placeholder.svg');
                      }}
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.slug}`}
                      className="text-sm sm:text-base font-bold text-gray-900 hover:text-[#008000] block truncate"
                    >
                      {item.productName}
                    </Link>
                    {item.packSize && (
                      <span className="text-xs text-gray-500 block mt-0.5">
                        Pack Option: <strong>{item.packSize}</strong>
                      </span>
                    )}
                    <div className="text-xs text-gray-400 mt-1">
                      Unit price: ${(item.unitPrice || item.price).toFixed(2)}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 text-gray-600"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center text-xs font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 text-gray-600"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right min-w-[80px]">
                      <span className="text-base font-bold text-[#0D477F]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0D477F] hover:text-[#008000]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Cart Totals Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
              <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
                Cart Summary
              </h3>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-[#008000] font-bold text-xs uppercase px-2 py-0.5 rounded bg-[#eaf5ee]">
                        Free Shipping
                      </span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-gray-900 pt-3 border-t border-gray-100">
                  <span>Estimated Total</span>
                  <span className="text-[#0D477F] text-xl">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 rounded-xl bg-[#008000] hover:bg-[#006f19] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <span>PROCEED TO DEMO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="p-3 bg-gray-50 rounded-xl text-[11px] text-gray-500 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-gray-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#008000]" />
                  <span>Demonstration Mode</span>
                </div>
                <p>
                  No real credit card charges are processed. Orders placed are simulated for local review and catalog testing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
