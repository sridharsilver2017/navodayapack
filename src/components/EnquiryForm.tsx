import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, Mail } from 'lucide-react';
import { EnquirySubmission } from '../types';
import { COMPANY_INFO } from '../data/companyData';

interface EnquiryFormProps {
  initialProduct?: string;
  onSuccess?: () => void;
  isCompact?: boolean;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialProduct = 'HDPE Drums',
  onSuccess,
  isCompact = false,
}) => {
  const [formData, setFormData] = useState<EnquirySubmission>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    productInterest: (initialProduct as any) || 'HDPE Drums',
    quantityVolume: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EnquirySubmission, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submissionFeedback, setSubmissionFeedback] = useState<string>('');

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof EnquirySubmission, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      newErrors.phone = 'Please provide a valid phone number with area/country code';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please describe your packaging or delivery requirements';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('submitting');

    // Frontend simulation of enterprise enquiry handling
    setTimeout(() => {
      setStatus('success');
      setSubmissionFeedback(
        `Thank you, ${formData.fullName}. Your packaging enquiry for ${formData.productInterest} has been recorded locally. In production, this form routes directly to ${COMPANY_INFO.legalName} sales department.`
      );
      if (onSuccess) {
        setTimeout(onSuccess, 3500);
      }
    }, 1200);
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-4 animate-in fade-in">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-lg font-bold font-display text-emerald-900">
          Enquiry Interface Ready
        </h4>
        <p className="text-xs sm:text-sm text-emerald-700 leading-relaxed max-w-md mx-auto">
          {submissionFeedback}
        </p>

        <div className="pt-2 border-t border-emerald-200/60 text-xs text-emerald-800 space-y-1">
          <p className="font-semibold">Immediate Assistance Contacts:</p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
            <a
              href="tel:+919348851166"
              className="inline-flex items-center space-x-1 font-medium hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 93488 51166</span>
            </a>
            <a
              href={`mailto:${COMPANY_INFO.salesEmail}`}
              className="inline-flex items-center space-x-1 font-medium hover:underline"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{COMPANY_INFO.salesEmail}</span>
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            setFormData({
              fullName: '',
              companyName: '',
              email: '',
              phone: '',
              productInterest: 'HDPE Drums',
              quantityVolume: '',
              message: '',
            });
          }}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline mt-2"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {status === 'error' && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>There was an error processing your enquiry. Please verify the fields.</span>
        </div>
      )}

      {/* Row 1: Name & Company */}
      <div className={`grid ${isCompact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-4`}>
        <div>
          <label htmlFor="fullName" className="block text-xs font-medium text-slate-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g. Ramesh Kumar"
            className={`w-full px-3.5 py-2.5 text-xs bg-white border rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
            }`}
          />
          {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="companyName" className="block text-xs font-medium text-slate-700 mb-1">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            id="companyName"
            type="text"
            required
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="e.g. Apex Pharma Laboratories"
            className={`w-full px-3.5 py-2.5 text-xs bg-white border rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.companyName ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
            }`}
          />
          {errors.companyName && (
            <p className="text-[11px] text-red-500 mt-1">{errors.companyName}</p>
          )}
        </div>
      </div>

      {/* Row 2: Email & Phone */}
      <div className={`grid ${isCompact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-4`}>
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-slate-700 mb-1">
            Work Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="procurement@company.com"
            className={`w-full px-3.5 py-2.5 text-xs bg-white border rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
            }`}
          />
          {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-medium text-slate-700 mb-1">
            Phone / Mobile <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 98765 43210"
            className={`w-full px-3.5 py-2.5 text-xs bg-white border rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.phone ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
            }`}
          />
          {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Row 3: Product Interest & Quantity Requirement */}
      <div className={`grid ${isCompact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-4`}>
        <div>
          <label htmlFor="productInterest" className="block text-xs font-medium text-slate-700 mb-1">
            Primary Product Interest <span className="text-red-500">*</span>
          </label>
          <select
            id="productInterest"
            value={formData.productInterest}
            onChange={(e) =>
              setFormData({ ...formData, productInterest: e.target.value as any })
            }
            className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="HDPE Drums">HDPE Drums (6L - 120L)</option>
            <option value="Fibre Drums">Fibre Drums (10" - 20" Dia)</option>
            <option value="Composite Containers">Composite Containers (75mm Dia)</option>
            <option value="Multiple Products / Custom Inquiry">Multiple Products / Custom Specification</option>
          </select>
        </div>

        <div>
          <label htmlFor="quantityVolume" className="block text-xs font-medium text-slate-700 mb-1">
            Estimated Quantity / Recurring Volume <span className="text-slate-400">(Optional)</span>
          </label>
          <input
            id="quantityVolume"
            type="text"
            value={formData.quantityVolume}
            onChange={(e) => setFormData({ ...formData, quantityVolume: e.target.value })}
            placeholder="e.g. 500 units / monthly"
            className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Row 4: Message / Requirements */}
      <div>
        <label htmlFor="message" className="block text-xs font-medium text-slate-700 mb-1">
          Packaging Specifications & Requirements <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={isCompact ? 3 : 4}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Please specify desired capacity (e.g., 50L 575mm height, 16x21 fibre drum, internal lining preference, destination plant location)..."
          className={`w-full px-3.5 py-2.5 text-xs bg-white border rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
            errors.message ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
          }`}
        />
        {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
      </div>

      {/* Action CTA */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full flex items-center justify-center space-x-2 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-blue-400 text-white py-3 px-6 rounded-md font-semibold text-sm tracking-wide transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Transmitting Enquiry...</span>
          </>
        ) : (
          <>
            <span>Submit Quotation Enquiry</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-[11px] text-slate-500 text-center font-mono pt-1">
        Direct B2B enquiry to Navodaya Packing Industries India Pvt Ltd.
      </p>
    </form>
  );
};
