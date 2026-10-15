import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Clock, MessageSquare, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'General Medication Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'General Medication Inquiry',
        message: '',
      });
    }, 3000);
  };

  return (
    <div className="w-full bg-[#f8fafc] py-10 md:py-16 font-sans min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[#008000]">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Contact Customer Care</span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#008000] block mb-2">
            WE ARE HERE TO HELP
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0b355b] tracking-tight">
            Contact EasyMeds Pharmacy Support
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed">
            Our clinical team and customer service specialists are ready to answer your questions regarding medication availability, dosage formulations, and discreet dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-16 h-16 text-[#008000] mx-auto" />
                <h3 className="text-xl font-bold text-gray-900">Message Delivered!</h3>
                <p className="text-sm text-gray-600 max-w-sm mx-auto">
                  Thank you for reaching out. An EasyMeds healthcare representative will respond to your email within 4 to 6 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0b355b] uppercase mb-1">
                      First Name <span className="text-[#008b20]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="e.g. John"
                      className="w-full h-12 px-4 text-sm border border-[#d8ded9] rounded-xl outline-none focus:border-[#008b20] focus:ring-2 focus:ring-[#008b20]/10"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0b355b] uppercase mb-1">
                      Last Name <span className="text-[#008b20]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="e.g. Doe"
                      className="w-full h-12 px-4 text-sm border border-[#d8ded9] rounded-xl outline-none focus:border-[#008b20] focus:ring-2 focus:ring-[#008b20]/10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0b355b] uppercase mb-1">
                      Email Address <span className="text-[#008b20]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full h-12 px-4 text-sm border border-[#d8ded9] rounded-xl outline-none focus:border-[#008b20] focus:ring-2 focus:ring-[#008b20]/10"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0b355b] uppercase mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full h-12 px-4 text-sm border border-[#d8ded9] rounded-xl outline-none focus:border-[#008b20] focus:ring-2 focus:ring-[#008b20]/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0b355b] uppercase mb-1">
                    Subject / Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full h-12 px-4 text-sm border border-[#d8ded9] rounded-xl outline-none focus:border-[#008b20] bg-white"
                  >
                    <option>General Medication Inquiry</option>
                    <option>Dosage & Ingredient Consultation</option>
                    <option>Order Tracking & Shipping Status</option>
                    <option>Volume Bulk Pack Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0b355b] uppercase mb-1">
                    Your Message <span className="text-[#008b20]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can our clinical team help you today?"
                    className="w-full p-4 text-sm border border-[#d8ded9] rounded-xl outline-none focus:border-[#008b20] focus:ring-2 focus:ring-[#008b20]/10 resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[52px] rounded-xl bg-[#008b20] hover:bg-[#006f19] text-white text-sm font-bold shadow-md hover:-translate-y-0.5 transition-all"
                >
                  SEND MESSAGE TO EASYMEDS
                </button>
              </form>
            )}
          </div>

          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-gray-900 pb-3 border-b border-gray-100">
                Direct Contact Channels
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#008000]/15 text-[#008000] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-xs font-bold uppercase text-gray-400">Phone Support</strong>
                    <a href="tel:+18005556337" className="text-base font-bold text-[#0D477F] hover:underline">
                      +1 (800) 555-MEDS
                    </a>
                    <span className="block text-xs text-gray-500 mt-0.5">Toll-free customer hotline</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#008000]/15 text-[#008000] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-xs font-bold uppercase text-gray-400">Email Inquiries</strong>
                    <a href="mailto:support@easymeds.com" className="text-base font-bold text-[#0D477F] hover:underline">
                      support@easymeds.com
                    </a>
                    <span className="block text-xs text-gray-500 mt-0.5">Average response time: 4 hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#008000]/15 text-[#008000] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-xs font-bold uppercase text-gray-400">Operating Hours</strong>
                    <div className="text-sm font-semibold text-gray-800">Monday – Saturday</div>
                    <span className="block text-xs text-gray-500 mt-0.5">9:00 AM – 8:00 PM EST</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp direct box */}
              <div className="pt-4 border-t border-gray-100">
                <div className="p-4 rounded-2xl bg-[#eaf5ee] border border-[#c5e6ca] space-y-2 text-xs">
                  <strong className="block text-[#008000] font-bold text-sm">Instant WhatsApp Messaging</strong>
                  <p className="text-gray-600">
                    Need instant answers on dosage options or dispatch? Message our live pharmacy desk directly.
                  </p>
                  <a
                    href="https://wa.me/18005556337?text=Hello%20EasyMeds%2C%20I%20have%20an%20urgent%20medicine%20inquiry."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366] text-white font-bold text-xs shadow hover:opacity-95"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Open WhatsApp Chat</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
