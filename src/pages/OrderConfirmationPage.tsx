import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldAlert, Package, Printer, ArrowRight } from 'lucide-react';
import { Order } from '../types';

export const OrderConfirmationPage: React.FC = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('last_easymeds_order');
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  if (!order) {
    return (
      <div className="w-full min-h-[50vh] flex flex-col items-center justify-center p-8 text-center font-sans">
        <h2 className="text-xl font-bold text-gray-800 mb-2">No Recent Order Found</h2>
        <p className="text-sm text-gray-500 mb-4">You have not completed any demonstration orders in this session.</p>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-2.5 rounded-full bg-[#0D477F] text-white text-xs font-bold"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f8fafc] py-10 md:py-16 font-sans min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Success Card */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-6 sm:p-10 text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#eaf5ee] text-[#008000] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-[#008000] block mb-1">
            DEMO CHECKOUT COMPLETE
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b355b] mb-2">
            Simulated Order Placed Successfully!
          </h1>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Order Reference: <strong className="text-[#0D477F]">{order.orderId}</strong>
          </p>

          {/* Demo Disclaimer Box */}
          <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm text-left flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Demonstration Notice:</strong> This order was generated for user-interface validation. No physical goods will be shipped, and no credit card was charged.
            </div>
          </div>
        </div>

        {/* Order Details Receipt */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-base font-bold text-gray-900">Order Summary</h2>
              <span className="text-xs text-gray-500">Placed on {order.date}</span>
            </div>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
          </div>

          {/* Items */}
          <div className="divide-y divide-gray-100">
            {order.items.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <strong className="block text-gray-900">{item.productName}</strong>
                  {item.packSize && (
                    <span className="text-xs text-gray-500">{item.packSize}</span>
                  )}
                  <span className="text-xs text-gray-400 block mt-0.5">
                    Qty: {item.quantity} × ${(item.unitPrice || item.price).toFixed(2)}
                  </span>
                </div>
                <span className="font-bold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="pt-4 border-t border-gray-100 space-y-2 text-xs sm:text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-gray-900">
                {order.shipping === 0 ? <span className="text-[#008000] font-bold">FREE</span> : `$${order.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-gray-900 pt-3 border-t border-gray-200">
              <span>Total Paid</span>
              <span className="text-xl text-[#0D477F]">${order.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Delivery & Payment destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-xs text-gray-600">
            <div className="p-4 rounded-xl bg-gray-50">
              <strong className="block text-gray-900 font-bold mb-1 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-[#008000]" />
                <span>Simulated Shipping Address</span>
              </strong>
              <div>{order.shippingAddress.fullName}</div>
              <div>{order.shippingAddress.addressLine1}</div>
              <div>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </div>
              <div className="text-gray-400 mt-1">{order.shippingAddress.phone}</div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50">
              <strong className="block text-gray-900 font-bold mb-1">Payment Method</strong>
              <div>{order.paymentMethod}</div>
              <div className="text-xs text-[#008000] font-bold mt-2">Status: Approved (Demo)</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0D477F] hover:bg-[#08385f] text-white text-xs sm:text-sm font-bold shadow-lg transition-all"
          >
            <span>Continue Browsing EasyMeds</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
