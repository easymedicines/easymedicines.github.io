import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShieldAlert, CheckCircle, Lock, Truck, CreditCard, ArrowLeft } from 'lucide-react';
import { ShippingAddress, Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');
  const [paymentOption, setPaymentOption] = useState<'demo_card' | 'demo_cod'>('demo_card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="w-full min-h-[50vh] flex flex-col items-center justify-center p-8 text-center font-sans">
        <h2 className="text-xl font-bold text-gray-800 mb-2">No items to checkout</h2>
        <p className="text-sm text-gray-500 mb-4">Please add products to your cart before proceeding.</p>
        <Link to="/shop" className="px-6 py-2.5 rounded-full bg-[#0D477F] text-white text-xs font-bold">
          Go to Shop
        </Link>
      </div>
    );
  }

  const shippingCost = deliveryOption === 'express' ? 25.0 : shipping;
  const finalTotal = Math.round((subtotal + shippingCost) * 100) / 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedOrderId = `EM-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      orderId: generatedOrderId,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      items: [...items],
      subtotal,
      shipping: shippingCost,
      tax: 0,
      total: finalTotal,
      shippingAddress: formData,
      paymentMethod: paymentOption === 'demo_card' ? 'Simulated Card (Demo Mode)' : 'Demo Cash on Delivery',
      status: 'Confirmed',
    };

    // Store in sessionStorage for confirmation page
    sessionStorage.setItem('last_easymeds_order', JSON.stringify(newOrder));

    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      navigate('/order-confirmation');
    }, 800);
  };

  return (
    <div className="w-full bg-[#f8fafc] py-8 md:py-12 font-sans min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        {/* Prominent Demo Notice */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 flex items-start gap-3 shadow-sm">
          <ShieldAlert className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <strong className="block font-bold text-amber-950 mb-0.5">
              Demonstration Mode — No Real Payments Or Prescription Checks
            </strong>
            This is a local demonstration catalog checkout. No live charges will be billed to your payment card, and no real medical dispensing will take place without proper clinical validation.
          </div>
        </div>

        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D477F] hover:text-[#008000] mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Cart</span>
        </Link>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Checkout Steps Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Contact & Shipping */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-5">
              <h2 className="text-lg font-bold text-gray-900 pb-3 border-b border-gray-100 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0D477F] text-white text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <span>Shipping Address & Contact</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Robert Smith"
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#008000]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="robert@example.com"
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#008000]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#008000]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    required
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    placeholder="123 Health Ave, Suite 400"
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#008000]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Austin"
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#008000]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="TX"
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#008000]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      ZIP <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="78701"
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#008000]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Method */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-900 pb-3 border-b border-gray-100 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0D477F] text-white text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <span>Delivery Option</span>
              </h2>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-[#008000] has-[:checked]:border-[#008000] has-[:checked]:bg-[#eaf5ee]/30 transition-all">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryOption"
                      checked={deliveryOption === 'standard'}
                      onChange={() => setDeliveryOption('standard')}
                      className="text-[#008000] focus:ring-[#008000]"
                    />
                    <div>
                      <strong className="block text-sm font-bold text-gray-900">Standard Discreet Delivery</strong>
                      <span className="text-xs text-gray-500">Delivered in 4–7 business days in plain packaging</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#008000]">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </label>

                <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-[#008000] has-[:checked]:border-[#008000] has-[:checked]:bg-[#eaf5ee]/30 transition-all">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryOption"
                      checked={deliveryOption === 'express'}
                      onChange={() => setDeliveryOption('express')}
                      className="text-[#008000] focus:ring-[#008000]"
                    />
                    <div>
                      <strong className="block text-sm font-bold text-gray-900">Express Priority Courier</strong>
                      <span className="text-xs text-gray-500">Delivered in 2–3 business days with active tracking</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-900">$25.00</span>
                </label>
              </div>
            </div>

            {/* Step 3: Simulated Payment Method */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-900 pb-3 border-b border-gray-100 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0D477F] text-white text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <span>Simulated Payment (Demo Mode)</span>
              </h2>

              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer has-[:checked]:border-[#008000] has-[:checked]:bg-[#eaf5ee]/30">
                  <input
                    type="radio"
                    name="paymentOption"
                    checked={paymentOption === 'demo_card'}
                    onChange={() => setPaymentOption('demo_card')}
                    className="mt-1 text-[#008000] focus:ring-[#008000]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#0D477F]" />
                      <strong className="text-sm font-bold text-gray-900">Simulated Card Payment (Sandbox)</strong>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      No card numbers required. Instantly authorizes a simulated test transaction.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer has-[:checked]:border-[#008000] has-[:checked]:bg-[#eaf5ee]/30">
                  <input
                    type="radio"
                    name="paymentOption"
                    checked={paymentOption === 'demo_cod'}
                    onChange={() => setPaymentOption('demo_cod')}
                    className="mt-1 text-[#008000] focus:ring-[#008000]"
                  />
                  <div>
                    <strong className="text-sm font-bold text-gray-900">Demo Cash / Check On Delivery</strong>
                    <p className="text-xs text-gray-500 mt-1">
                      Pay upon delivery inspection (Simulated demo mode).
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
                Order Review ({items.length} {items.length === 1 ? 'item' : 'items'})
              </h3>

              {/* Items summary */}
              <div className="max-h-64 overflow-y-auto divide-y divide-gray-100 pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between text-xs gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center font-bold text-gray-700 flex-shrink-0">
                        {item.quantity}×
                      </span>
                      <div className="truncate">
                        <span className="font-semibold text-gray-900 truncate block">
                          {item.productName}
                        </span>
                        {item.packSize && (
                          <span className="text-[10px] text-gray-400 block truncate">
                            {item.packSize}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-gray-800 flex-shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery ({deliveryOption})</span>
                  <span className="font-semibold text-gray-900">
                    {shippingCost === 0 ? <span className="text-[#008000] font-bold">FREE</span> : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Taxes</span>
                  <span className="font-semibold text-gray-900">$0.00</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-xl text-[#0D477F]">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#008000] hover:bg-[#006f19] text-white text-sm font-extrabold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'PLACING DEMO ORDER...' : 'PLACE DEMO ORDER NOW'}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-2">
                <Lock className="w-3.5 h-3.5 text-[#008000]" />
                <span>256-Bit SSL Encrypted Demo Protection</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
