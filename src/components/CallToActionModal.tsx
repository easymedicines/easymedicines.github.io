import React, { useState } from 'react';
import { X, CheckCircle, PhoneCall, Clock } from 'lucide-react';

interface CallToActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  defaultProduct?: string;
}

export const CallToActionModal: React.FC<CallToActionModalProps> = ({
  isOpen,
  onClose,
  title = 'Request a Call Back',
  defaultProduct,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (9 AM - 12 PM)');
  const [notes, setNotes] = useState(defaultProduct ? `Inquiry regarding: ${defaultProduct}` : '');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 font-sans">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#0D477F] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <PhoneCall className="w-5 h-5 text-[#95C11F]" />
            <h3 className="font-bold text-base sm:text-lg">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle className="w-14 h-14 text-[#008000] mx-auto animate-bounce" />
              <h4 className="text-lg font-bold text-gray-900">Request Received!</h4>
              <p className="text-sm text-gray-600 max-w-sm mx-auto">
                Thank you, <strong>{name}</strong>. An EasyMeds healthcare specialist will call you at{' '}
                <strong>{phone}</strong> during your requested window.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs sm:text-sm text-gray-600">
                Have questions about medication dosages, pack pricing, or delivery? Leave your phone number and our licensed pharmacy support team will call you back.
              </p>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Miller"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#008000] focus:ring-2 focus:ring-[#008000]/10"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +1 (555) 000-0000"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#008000] focus:ring-2 focus:ring-[#008000]/10"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-500" />
                  <span>Preferred Callback Time</span>
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#008000] bg-white"
                >
                  <option>Morning (9 AM - 12 PM EST)</option>
                  <option>Afternoon (12 PM - 4 PM EST)</option>
                  <option>Evening (4 PM - 8 PM EST)</option>
                  <option>As soon as possible</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Notes / Question (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Specific medicine inquiry, dosage question, etc."
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#008000]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-lg border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#008000] hover:bg-[#006f19] text-white text-xs font-bold transition-all shadow-md"
                >
                  Submit Callback Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
