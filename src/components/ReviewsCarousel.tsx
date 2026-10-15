import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface Review {
  id: string;
  initial: string;
  name: string;
  text: string;
}

const reviews: Review[] = [
  {
    id: 'r-1',
    initial: 'T',
    name: 'Thomas B.',
    text: 'Smooth experience and quick communication. Everything was straightforward, discrete, and arrived exactly as ordered.',
  },
  {
    id: 'r-2',
    initial: 'N',
    name: 'Nick S.',
    text: 'Very good experience. The catalog and ordering process was simple and the medicine packaging was completely intact.',
  },
  {
    id: 'r-3',
    initial: 'P',
    name: 'Peter L.',
    text: 'Easy to use, professional service and very convenient pricing. I appreciate the transparent batch details.',
  },
  {
    id: 'r-4',
    initial: 'K',
    name: 'Kevin S.',
    text: 'The ordering process was quick and clear. The package arrived safely and well ahead of the estimated date.',
  },
  {
    id: 'r-5',
    initial: 'E',
    name: 'Emma R.',
    text: 'Clean website, prompt customer support, and a genuinely smooth overall checkout experience. Highly recommend.',
  },
  {
    id: 'r-6',
    initial: 'D',
    name: 'Daniel M.',
    text: 'Simple ordering process and reliable service. Everything went exactly as expected from browsing to delivery.',
  },
];

export const ReviewsCarousel: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);

  const prevReview = () => {
    setStartIndex((prev) => (prev === 0 ? reviews.length - 3 : prev - 1));
  };

  const nextReview = () => {
    setStartIndex((prev) => (prev >= reviews.length - 3 ? 0 : prev + 1));
  };

  return (
    <section className="w-full bg-white py-12 md:py-16 font-sans">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="block text-xs font-bold uppercase tracking-[2.5px] text-[#008b20] mb-2">
            CUSTOMER EXPERIENCES
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b355b] tracking-tight">
            Verified Customer Reviews
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500">
            Real feedback from patients and healthcare shoppers across the country.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Controls */}
          <button
            onClick={prevReview}
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-gray-700 hover:bg-[#008b20] text-white flex items-center justify-center shadow-lg transition-all"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextReview}
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-gray-700 hover:bg-[#008b20] text-white flex items-center justify-center shadow-lg transition-all"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Track */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.slice(startIndex, startIndex + 3).map((r) => (
              <div
                key={r.id}
                className="bg-white border border-[#009b35] rounded-[20px] p-6 sm:p-7 shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#eaf7ee] text-[#008b20] flex items-center justify-center text-lg font-bold flex-shrink-0">
                      {r.initial}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#172b3a] text-base leading-tight">
                        {r.name}
                      </h3>
                      <span className="text-xs text-gray-400">Verified Customer</span>
                    </div>
                    <div className="ml-auto w-6 h-6 rounded-full bg-[#008b20] text-white flex items-center justify-center text-xs flex-shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>

                  <div className="text-[#008b20] text-sm tracking-widest mb-3">
                    ★★★★★
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    "{r.text}"
                  </p>
                </div>

                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider pt-3 border-t border-gray-100">
                  Verified Order
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rating Summary Bar */}
        <div className="mt-10 max-w-sm mx-auto p-4 rounded-2xl bg-[#eaf5ee] border border-[#c5e6ca] flex items-center justify-center gap-4 text-center">
          <div className="text-3xl font-extrabold text-[#0D477F]">4.8</div>
          <div className="text-[#008b20] text-lg tracking-widest">★★★★★</div>
          <div className="text-left text-xs leading-tight">
            <strong className="block text-gray-900 font-bold">Excellent 4.8 / 5.0</strong>
            <span className="text-gray-600">Customer Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
};
