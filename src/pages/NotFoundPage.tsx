import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag, AlertTriangle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full min-h-[65vh] bg-[#f8fafc] flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="w-20 h-20 rounded-3xl bg-[#0D477F]/10 text-[#0D477F] flex items-center justify-center mb-5">
        <AlertTriangle className="w-10 h-10" />
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-[#008000] mb-2">
        Error 404
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0b355b] mb-3">
        Page Not Found
      </h1>
      <p className="text-sm text-gray-500 max-w-md mb-8">
        The page or medication link you are looking for may have been moved, renamed, or is temporarily unavailable.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0D477F] hover:bg-[#08385f] text-white text-xs sm:text-sm font-bold shadow-md transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#008000] hover:bg-[#006f19] text-white text-xs sm:text-sm font-bold shadow-md transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Explore All Medicines</span>
        </Link>
      </div>
    </div>
  );
};
