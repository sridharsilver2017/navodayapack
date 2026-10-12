import React from 'react';
import { ArrowRight, Phone, ShieldCheck, Factory } from 'lucide-react';
import { INDIVIDUAL_PRODUCTS } from '../data/individualProducts';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductVariantGrid } from '../components/ProductVariantGrid';

interface ProductsCatalogProps {
  onRequestQuote: (preselectedProduct?: string) => void;
}

export const ProductsCatalog: React.FC<ProductsCatalogProps> = ({ onRequestQuote }) => {
  return (
    <div className="w-full bg-[#F1F5F9] pb-16">
      {/* Top Hero Section */}
      <section className="bg-[#102A43] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Breadcrumbs items={[{ label: 'Product Portfolio' }]} />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mt-4">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-wider text-blue-300 bg-blue-950/80 px-2.5 py-1 rounded border border-blue-800/80">
                <Factory className="w-3.5 h-3.5 text-blue-400" />
                <span>Manufacturing Plant: Kazipally IDA, Hyderabad</span>
              </div>

              <h1 className="fluid-page-title font-extrabold font-display text-white tracking-tight">
                Industrial Packaging Catalog
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Browse our complete catalog of blow-moulded HDPE drums, eco-friendly kraft fibre drums, and cylindrical composite containers. Click any product variant to inspect full technical data sheets (TDS), dimensional drawings, and chemical compatibility profiles.
              </p>

              {/* Quick specs chips */}
              <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono">
                <span className="bg-slate-800 text-blue-300 px-3 py-1.5 rounded border border-slate-700">
                  HDPE Drums: 6L to 120L
                </span>
                <span className="bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700">
                  Fibre Drums: 10" to 20" Dia
                </span>
                <span className="bg-slate-800 text-purple-300 px-3 py-1.5 rounded border border-slate-700">
                  Composite: 75mm Dia
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onRequestQuote('Full Product Catalog Inquiry')}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-md font-semibold text-xs tracking-wide transition-all shadow-md inline-flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Request Commercial Catalog Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+919348851166"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2.5 rounded-md text-xs font-mono border border-slate-700 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>Direct Sales: +91 93488 51166</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Big Product Grid Catalog */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <ProductVariantGrid
          title="All Industrial Packaging Products"
          subtitle="Showing all 25 manufactured specifications. Filter by category or search by capacity to find the right container for your process."
          products={INDIVIDUAL_PRODUCTS}
          onRequestQuote={onRequestQuote}
          showCategoryFilter={true}
        />
      </div>

      {/* Trust & Quality Assurance Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-lg flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-[#102A43]">
                Need Custom Capacities, Branding, or Special Tolerances?
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Our Kazipally IDA blow-moulding facility and paperboard line can produce custom dimensions, embossed logos, and multi-color silk screen printing for your enterprise.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onRequestQuote('Custom Capacity Specification')}
            className="bg-[#102A43] hover:bg-[#2563EB] text-white px-5 py-2.5 rounded-md text-xs font-semibold shrink-0 transition-colors cursor-pointer"
          >
            Inquire for Custom Run
          </button>
        </div>
      </section>
    </div>
  );
};
