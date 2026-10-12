import React from 'react';
import { ArrowRight, ShieldCheck, Factory, Phone, MapPin, Layers } from 'lucide-react';
import { COMPANY_INFO, FACILITIES } from '../data/companyData';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ClientsCarousel } from '../components/ClientsCarousel';
import { HeroSlider } from '../components/HeroSlider';

interface HomeProps {
  onRequestQuote: (preselectedProduct?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onRequestQuote }) => {
  return (
    <div className="flex flex-col w-full">
      {/* High-Impact Hero Slider with AI Industrial Imagery & Interactive Controls */}
      <HeroSlider onRequestQuote={onRequestQuote} />

      {/* Verified Company Introduction Statement */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider text-[#2563EB] bg-blue-50 px-3 py-1 rounded border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Corporate Profile</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-[#102A43] tracking-tight">
              A Trustworthy Organization in Industrial Packaging
            </h2>

            <blockquote className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal bg-slate-50 p-6 sm:p-8 rounded-xl border-l-4 border-[#2563EB] text-left">
              "{COMPANY_INFO.verifiedIntro}"
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-left">
              <div className="p-4 rounded-lg border border-slate-200 bg-white">
                <span className="text-xs font-mono uppercase tracking-wider text-blue-600 block mb-1">
                  Quality Supervision
                </span>
                <p className="text-xs text-slate-600">
                  Developed under strict oversight by quality experts matching industry-set benchmarks.
                </p>
              </div>

              <div className="p-4 rounded-lg border border-slate-200 bg-white">
                <span className="text-xs font-mono uppercase tracking-wider text-blue-600 block mb-1">
                  Robust Construction
                </span>
                <p className="text-xs text-slate-600">
                  Appreciated for compact designs, compatibility, and rigorous containment safety.
                </p>
              </div>

              <div className="p-4 rounded-lg border border-slate-200 bg-white">
                <span className="text-xs font-mono uppercase tracking-wider text-blue-600 block mb-1">
                  Pharma Preferred
                </span>
                <p className="text-xs text-slate-600">
                  Proven supply record with leading pharmaceutical and chemical organizations across India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Portfolio Showcase */}
      <section id="product-portfolio" className="py-16 sm:py-24 bg-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider text-[#2563EB] bg-blue-100/60 px-3 py-1 rounded border border-blue-200 mb-2">
                <Layers className="w-3.5 h-3.5" />
                <span>Product Portfolio</span>
              </div>
              <h2 className="fluid-section-title font-extrabold font-display text-[#102A43]">
                Industrial Packaging Range
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md">
              Explore our core product lines built with verified manufacturing tolerances, barrier coatings, and closure mechanisms.
            </p>
          </div>

          {/* Three Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onRequestQuote={onRequestQuote}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pharmaceutical & Industrial Clients Trust Section */}
      <ClientsCarousel />

      {/* Facilities & Manufacturing Locations Section */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-[#2563EB] bg-blue-50 px-3 py-1 rounded border border-blue-200 inline-block mb-2">
              Manufacturing & Operations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#102A43]">
              Dual Infrastructure in Telangana
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Our operations combine dedicated corporate administration in Kukatpally, Hyderabad, with an industrial manufacturing plant at Kazipally IDA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Facility 1 */}
            <div className="bg-slate-50 rounded-xl p-6 sm:p-8 border border-slate-200 hover:border-blue-200 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  Corporate Headquarters
                </span>
                <span className="text-[10px] font-mono bg-blue-100 text-[#2563EB] px-2 py-0.5 rounded">
                  PIN: {FACILITIES[0].primaryPincode}
                </span>
              </div>
              <h3 className="text-xl font-bold font-display text-[#102A43] mb-3">
                {FACILITIES[0].title}
              </h3>
              <div className="space-y-2 text-xs text-slate-600 mb-6">
                {FACILITIES[0].addressLines.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-400 text-[11px] block">Contact Numbers</span>
                  {FACILITIES[0].phones.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="font-semibold text-slate-800 hover:text-blue-600 block"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
                <a
                  href={FACILITIES[0].mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-slate-100 text-slate-800 px-4 py-2 rounded border border-slate-300 font-medium inline-flex items-center space-x-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Directions</span>
                </a>
              </div>
            </div>

            {/* Facility 2 */}
            <div className="bg-slate-50 rounded-xl p-6 sm:p-8 border border-slate-200 hover:border-blue-200 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  Production Facility
                </span>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  PIN: {FACILITIES[1].primaryPincode}
                </span>
              </div>
              <h3 className="text-xl font-bold font-display text-[#102A43] mb-3">
                {FACILITIES[1].title}
              </h3>
              <div className="space-y-2 text-xs text-slate-600 mb-6">
                {FACILITIES[1].addressLines.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-400 text-[11px] block">Plant Phone Numbers</span>
                  {FACILITIES[1].phones.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="font-semibold text-slate-800 hover:text-blue-600 block"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
                <a
                  href={FACILITIES[1].mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-slate-100 text-slate-800 px-4 py-2 rounded border border-slate-300 font-medium inline-flex items-center space-x-1"
                >
                  <Factory className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Plant Map</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial High-Conversion Enquiry CTA */}
      <section className="py-16 sm:py-24 bg-[#102A43] text-white relative overflow-hidden">
        <div className="absolute inset-0 industrial-grid opacity-20 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="text-xs font-mono uppercase tracking-wider text-blue-400 bg-blue-950 px-3.5 py-1.5 rounded border border-blue-800 inline-block">
            Start Your Packaging Partnership
          </span>

          <h2 className="fluid-section-title font-extrabold font-display text-white">
            Discuss Your Industrial Packaging Requirements
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Whether you require standard 50L/80L/120L HDPE containers, customized fibre drums with barrier liners, or composite retail packaging, our engineering team is ready to deliver.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onRequestQuote()}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-3.5 rounded-md font-semibold text-sm tracking-wide transition-all shadow-xl hover:shadow-2xl inline-flex items-center space-x-2 cursor-pointer"
            >
              <span>Submit Packaging Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:+919348851166"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-6 py-3.5 rounded-md font-semibold text-sm tracking-wide border border-slate-700 transition-all inline-flex items-center space-x-2"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>Call: +91 93488 51166</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
