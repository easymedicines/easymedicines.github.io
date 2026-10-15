import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
}

const articles: Article[] = [
  {
    id: 'a-1',
    slug: 'understanding-generic-vs-brand-medications',
    title: 'Understanding Generic vs. Brand Name Medications: What You Need to Know',
    excerpt: 'Generic medications contain the exact same active pharmaceutical ingredients as brand-name drugs, delivering identical therapeutic efficacy at up to 80% lower cost.',
    category: 'Medication Safety',
    date: 'October 12, 2026',
    author: 'Dr. Sarah Jenkins, PharmD',
    readTime: '5 min read',
  },
  {
    id: 'a-2',
    slug: 'proper-storage-guidelines-for-prescription-drugs',
    title: 'Proper Temperature & Humidity Storage Guidelines for Prescription Drugs',
    excerpt: 'Storing your medications properly is essential to maintaining active ingredient stability. Learn why the bathroom cabinet might be the worst place for your medicine.',
    category: 'Patient Care',
    date: 'September 28, 2026',
    author: 'Michael Vance, RPh',
    readTime: '4 min read',
  },
  {
    id: 'a-3',
    slug: 'safe-guidelines-for-managing-mens-health-medications',
    title: 'Safe Guidelines for Managing Men’s Health & Cardiovascular Precautions',
    excerpt: 'Comprehensive guidance on dosage timing, contraindications with nitrates, and what patients should discuss with their doctor before starting therapy.',
    category: "Men's Health",
    date: 'September 15, 2026',
    author: 'Dr. David Miller, MD',
    readTime: '6 min read',
  },
  {
    id: 'a-4',
    slug: 'respiratory-inhaler-techniques-for-maximum-relief',
    title: 'Correct Inhaler Techniques for Maximizing Daily Asthma & COPD Relief',
    excerpt: 'Studies show that up to 70% of patients do not use their metered-dose inhalers correctly. Follow this step-by-step primer to ensure full medication delivery.',
    category: 'Respiratory',
    date: 'August 30, 2026',
    author: 'Lisa Taylor, Respiratory Therapist',
    readTime: '5 min read',
  },
];

export const BlogPage: React.FC = () => {
  return (
    <div className="w-full bg-[#f8fafc] py-10 md:py-16 font-sans min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[#008000]">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Health & Medicine Blog</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaf5ee] text-[#008000] text-xs font-bold uppercase tracking-wider mb-3">
            <HeartPulse className="w-4 h-4" />
            <span>Health Insights & Guidance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0b355b] tracking-tight">
            EasyMeds Health & Pharmacy Journal
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-500">
            Evidence-based medical articles, safe drug administration protocols, and healthcare savings tips.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden p-6 sm:p-8 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="px-3 py-1 rounded-full bg-[#0D477F]/10 text-[#0D477F] font-bold">
                    {art.category}
                  </span>
                  <span>{art.readTime}</span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-gray-900 hover:text-[#008000] transition-colors leading-snug">
                  {art.title}
                </h2>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#008000]" />
                  <span>{art.author}</span>
                </div>
                <div className="flex items-center gap-1 text-[#0D477F] font-bold">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter / Advice Bar */}
        <div className="mt-14 bg-white rounded-3xl border border-gray-200 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900">
              Have Specific Questions About Your Health?
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xl">
              EasyMeds clinical team is here to assist with dosage guidelines, ingredient interactions, and volume pack inquiries.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-full bg-[#008000] hover:bg-[#006f19] text-white text-xs sm:text-sm font-bold shadow-md transition-all whitespace-nowrap"
          >
            Contact Pharmacy Staff
          </Link>
        </div>
      </div>
    </div>
  );
};
