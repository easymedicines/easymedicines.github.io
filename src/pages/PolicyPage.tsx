import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Truck, RefreshCw, FileText, HelpCircle, Lock } from 'lucide-react';

export const PolicyPage: React.FC = () => {
  const { pathname } = useLocation();

  let title = 'Policies & Information';
  let icon = <FileText className="w-8 h-8 text-[#0D477F]" />;
  let content = null;

  if (pathname.includes('shipping')) {
    title = 'Shipping & Discreet Packaging Policy';
    icon = <Truck className="w-8 h-8 text-[#008000]" />;
    content = (
      <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
        <section className="space-y-2">
          <h3 className="text-base font-bold text-gray-900">1. Discreet Plain Packaging Guarantee</h3>
          <p>
            Your privacy is our utmost priority. Every order from EasyMeds is packaged in plain, unmarked cardboard boxes or secure bubble mailers. There is zero external mention of "EasyMeds", pharmaceuticals, or medicine names on the outer label. The package appears identical to any standard courier parcel.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-gray-900">2. Processing & Dispatch Timelines</h3>
          <p>
            Orders placed before 2:00 PM EST (Monday through Friday) are verified and transferred to packaging within 24 hours. Once your package is scanned into the courier system, you will receive an automated tracking number via email.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-gray-900">3. Delivery Options & Rates</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Standard Tracked Shipping:</strong> FREE on all orders over $99. For orders under $99, a flat rate of $15.00 applies. Estimated transit time: 4–7 business days.</li>
            <li><strong>Express Priority Courier:</strong> $25.00 flat fee. Estimated transit time: 2–3 business days with signature option available.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-gray-900">4. Temperature Sensitive Storage</h3>
          <p>
            Medications requiring specific temperature boundaries (such as certain eye drops or liquid suspensions) are dispatched with insulated packaging and temperature monitors where required.
          </p>
        </section>
      </div>
    );
  } else if (pathname.includes('refund')) {
    title = 'Refund & Returns Guarantee';
    icon = <RefreshCw className="w-8 h-8 text-[#008000]" />;
    content = (
      <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
        <section className="space-y-2">
          <h3 className="text-base font-bold text-gray-900">1. Quality Assurance Guarantee</h3>
          <p>
            EasyMeds guarantees that all medications dispatched match the verified pharmaceutical formulation and active ingredients described in our catalog. If an item arrives damaged in transit or differs from your order invoice, we will issue an immediate replacement or full refund.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-gray-900">2. Pharmacy Regulatory Return Policy</h3>
          <p>
            Under federal pharmaceutical safety guidelines, prescription medications cannot be returned to stock once they leave the controlled pharmacy environment. However, if you experience an issue with damaged packaging or missing items, contact our customer support within 30 days for a free replacement parcel or refund credit.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-gray-900">3. Refund Processing</h3>
          <p>
            Approved refund requests are processed within 3 business days back to the original method of payment.
          </p>
        </section>
      </div>
    );
  } else if (pathname.includes('privacy')) {
    title = 'Privacy & Data Protection Policy';
    icon = <Lock className="w-8 h-8 text-[#008000]" />;
    content = (
      <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
        <section className="space-y-2">
          <h3 className="text-base font-bold text-gray-900">1. Commitment to Patient Privacy</h3>
          <p>
            EasyMeds implements industry-leading 256-bit SSL encryption to ensure that your browsing session, health inquiries, and contact information remain strictly confidential.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-gray-900">2. No Third-Party Data Selling</h3>
          <p>
            We strictly do NOT sell, rent, or trade your medical purchase history or personal identity to third-party advertisers or data brokers under any circumstances.
          </p>
        </section>
      </div>
    );
  } else if (pathname.includes('faq')) {
    title = 'Frequently Asked Questions';
    icon = <HelpCircle className="w-8 h-8 text-[#008000]" />;
    content = (
      <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1.5">
          <h4 className="font-bold text-gray-900">Are all medicines listed 100% genuine?</h4>
          <p className="text-xs sm:text-sm text-gray-600">
            Yes. All 1,750+ medicines cataloged in our inventory originate from certified WHO-GMP and FDA-compliant manufacturing facilities with traceable batch certificates.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1.5">
          <h4 className="font-bold text-gray-900">What does the outer packaging look like?</h4>
          <p className="text-xs sm:text-sm text-gray-600">
            Every order is sent in plain, unmarked packaging without any pharmacy logo or drug descriptions on the box to protect your privacy.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1.5">
          <h4 className="font-bold text-gray-900">How do volume pack discounts work?</h4>
          <p className="text-xs sm:text-sm text-gray-600">
            When ordering 60, 90, 120, or 180 tablet packs, our direct wholesale volume discount applies automatically in the pack size pricing table, reducing the cost per unit by up to 32%.
          </p>
        </div>
      </div>
    );
  } else {
    title = 'Terms of Service';
    icon = <FileText className="w-8 h-8 text-[#008000]" />;
    content = (
      <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
        <section className="space-y-2">
          <h3 className="text-base font-bold text-gray-900">1. Acceptance of Terms</h3>
          <p>
            By accessing the EasyMeds catalog and placing orders, you confirm that you are at least 18 years of age and agree to comply with all applicable local healthcare laws and terms described herein.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-gray-900">2. Demonstration & Catalog Notice</h3>
          <p>
            EasyMeds frontend catalog is provided with local data and images for reliable, offline-first client-side browsing and demonstration testing.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f8fafc] py-10 md:py-16 font-sans min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[#008000]">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{title}</span>
        </nav>

        {/* Content Box */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-10">
          <div className="flex items-center gap-4 pb-6 border-b border-gray-100 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#eaf5ee] flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
            <div>
              <span className="text-xs font-bold text-[#008000] uppercase tracking-wider block">
                EasyMeds Customer Assurance
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0b355b]">
                {title}
              </h1>
            </div>
          </div>

          {content}
        </div>
      </div>
    </div>
  );
};
