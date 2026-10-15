import React from 'react';

const benefits = [
  { icon: '＄', title: 'Best Prices', subtitle: 'Everyday' },
  { icon: '✦', title: 'Exclusive Offers', subtitle: '& Discounts' },
  { icon: '♡', title: 'Health & Wellness', subtitle: 'Essentials' },
  { icon: '✓', title: '100% Genuine', subtitle: 'Medicines' },
  { icon: '▣', title: 'Fast & Discreet', subtitle: 'Delivery' },
  { icon: '♙', title: 'Secure & Private', subtitle: 'Shopping' },
];

export const BenefitTicker: React.FC = () => {
  return (
    <section className="w-full bg-white py-3 overflow-hidden border-b border-gray-100 font-sans">
      <div className="overflow-hidden">
        <div className="animate-benefits-ticker flex gap-3.5 py-1">
          {/* Double array for infinite seamless looping */}
          {[...benefits, ...benefits, ...benefits].map((b, idx) => (
            <div
              key={idx}
              className="w-[260px] sm:w-[285px] min-h-[82px] px-4 py-3 bg-white border border-[#eef3ef] rounded-2xl flex items-center gap-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex-shrink-0"
            >
              <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-[#eef8f1] text-[#008b2c] flex items-center justify-center text-xl sm:text-2xl font-bold flex-shrink-0">
                {b.icon}
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-sm sm:text-base font-bold text-[#303030] whitespace-nowrap leading-tight">
                  {b.title}
                </div>
                <div className="text-xs text-[#777777] whitespace-nowrap leading-tight mt-0.5">
                  {b.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
