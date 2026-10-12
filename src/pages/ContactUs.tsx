import React from 'react';
import { MapPin, Phone, Mail, ExternalLink, Building2, Factory } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { EnquiryForm } from '../components/EnquiryForm';
import { COMPANY_INFO, FACILITIES } from '../data/companyData';

export const ContactUs: React.FC = () => {
  return (
    <div className="w-full bg-[#F1F5F9]">
      {/* Header Banner */}
      <section className="bg-[#102A43] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} />

          <div className="max-w-3xl space-y-4 mt-4">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-400 bg-blue-950 px-3 py-1 rounded border border-blue-800 inline-block">
              Direct B2B Communications
            </span>
            <h1 className="fluid-page-title font-extrabold font-display text-white tracking-tight">
              Let's Talk Packaging.
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Whether discussing tailored drum dimensions, bulk pharmaceutical order timelines, or custom closure specifications, connect directly with our engineering and procurement team.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Form & Contact Locations */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#102A43]">
                Commercial Quotation Request
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Fill out the technical requirements below and our commercial sales desk will respond with formal pricing.
              </p>
            </div>

            <EnquiryForm isCompact={false} />
          </div>

          {/* Contact Details & Addresses Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Facility 1: Corporate Office */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-[#102A43]">
                  <Building2 className="w-5 h-5 text-[#2563EB]" />
                  <h3 className="font-bold font-display text-base">Corporate Office</h3>
                </div>
                <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  Hyderabad
                </span>
              </div>

              <div className="text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-900">{COMPANY_INFO.legalName}</p>
                {FACILITIES[0].addressLines.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-start space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    {FACILITIES[0].phones.map((p, idx) => (
                      <a
                        key={idx}
                        href={`tel:${p.replace(/\s+/g, '')}`}
                        className="block font-medium text-slate-800 hover:text-blue-600"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </div>

                <a
                  href={FACILITIES[0].mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] pt-1"
                >
                  <span>Open Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Facility 2: Manufacturing Factory */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-[#102A43]">
                  <Factory className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold font-display text-base">Manufacturing Plant</h3>
                </div>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                  Kazipally IDA
                </span>
              </div>

              <div className="text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-900">{COMPANY_INFO.legalName}</p>
                {FACILITIES[1].addressLines.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-start space-x-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    {FACILITIES[1].phones.map((p, idx) => (
                      <a
                        key={idx}
                        href={`tel:${p.replace(/\s+/g, '')}`}
                        className="block font-medium text-slate-800 hover:text-emerald-700"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </div>

                <a
                  href={FACILITIES[1].mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 pt-1"
                >
                  <span>Open Plant on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* General Inquiries Card */}
            <div className="bg-[#102A43] text-white rounded-xl p-6 border border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <h4 className="font-bold font-display text-sm">Official Email Correspondence</h4>
              </div>
              <p className="text-xs text-slate-300">
                For tender notices, vendor registration documents, and formal specifications:
              </p>
              <a
                href={`mailto:${COMPANY_INFO.salesEmail}`}
                className="text-xs font-mono font-semibold text-blue-300 hover:text-white block"
              >
                {COMPANY_INFO.salesEmail}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Google Maps Plant Location Embed */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#2563EB]" />
              <span className="text-xs font-bold font-display text-[#102A43]">
                Manufacturing Facility Map Location (Kazipally IDA, Hyderabad)
              </span>
            </div>
            <a
              href={FACILITIES[1].mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#2563EB] hover:underline inline-flex items-center space-x-1"
            >
              <span>Open Full Interactive Map</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-full h-80 sm:h-96 bg-slate-100">
            <iframe
              title="Navodaya Packing Industries Plant Location"
              src={FACILITIES[1].embedMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
