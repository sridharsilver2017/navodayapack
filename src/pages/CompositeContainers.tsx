import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Sparkles, Phone, Box } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { INDIVIDUAL_PRODUCTS } from '../data/individualProducts';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductVariantGrid } from '../components/ProductVariantGrid';

interface CompositeContainersProps {
  onRequestQuote: (preselectedProduct?: string) => void;
}

export const CompositeContainers: React.FC<CompositeContainersProps> = ({ onRequestQuote }) => {
  const product = PRODUCTS.find((p) => p.slug === 'composite-containers')!;
  const compositeProducts = INDIVIDUAL_PRODUCTS.filter((p) => p.categorySlug === 'composite-containers');
  const relatedProducts = PRODUCTS.filter((p) => p.slug !== 'composite-containers');

  return (
    <div className="w-full bg-[#F1F5F9]">
      {/* Product Hero */}
      <section className="bg-[#102A43] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Breadcrumbs
            items={[
              { label: 'Products', path: '/#product-portfolio' },
              { label: 'Composite Containers' },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mt-6">
            {/* Left: Product Information */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-400 bg-blue-950 px-3 py-1 rounded border border-blue-800 inline-block">
                Rigid Cylindrical Packaging
              </span>

              <h1 className="fluid-page-title font-extrabold font-display text-white tracking-tight">
                Composite Containers
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {product.leadParagraph}
              </p>

              {/* Verified Quick Highlights */}
              <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono">
                <span className="bg-slate-800 text-blue-300 px-3 py-1.5 rounded border border-slate-700">
                  Standard Diameter: 75 mm
                </span>
                <span className="bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700">
                  Custom Height as per Requirement
                </span>
                <span className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded border border-slate-700">
                  Shelf Retailing Appeal
                </span>
              </div>

              {/* Action buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onRequestQuote('Composite Containers')}
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-7 py-3 rounded-md font-semibold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl inline-flex items-center space-x-2 cursor-pointer"
                >
                  <span>Request Composite Container Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#specifications-table"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-3 rounded-md font-semibold text-sm tracking-wide border border-slate-700 transition-all"
                >
                  View Manufacturing Specifications
                </a>
              </div>
            </div>

            {/* Right: Technical Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="bg-white/5 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
                <div className="h-64 sm:h-72 w-full bg-slate-900/60 rounded-xl p-4 flex items-center justify-center border border-slate-800 overflow-hidden relative">
                  <img
                    src="/images/sizes/fiber_group.jpg"
                    alt="Navodaya Pack Composite Containers"
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#0B1D2F]/90 px-3 py-1.5 rounded border border-slate-700 text-[10px] font-mono text-blue-300">
                    75mm Dia • Spiral Paperboard & Metal Closures
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-center justify-between font-mono">
                  <span>Standard Core: 75 mm</span>
                  <span className="text-emerald-400">Custom Heights</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview & Engineering Benefits */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                <Box className="w-5 h-5 text-[#2563EB]" />
                <h2 className="text-xl sm:text-2xl font-bold font-display text-[#102A43]">
                  Product Overview & Shelf Retailing Impact
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {product.detailedOverview.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="bg-blue-50/60 p-4 rounded-lg border border-blue-200/80 space-y-1.5 mt-4">
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#102A43] block">
                  Available Sizing:
                </span>
                <p className="text-xs text-slate-700">
                  {product.availableSizesText}
                </p>
              </div>
            </div>

            {/* Specifications Big Product Grid View with TDS Table Toggle (2 columns on desktop) */}
            <div id="specifications-table">
              <ProductVariantGrid
                title="Composite Container Configurations & Models"
                subtitle="High precision cylindrical composite canisters engineered to custom heights. Click any canister to view individual specifications."
                products={compositeProducts}
                specifications={product.specifications}
                onRequestQuote={(name) => onRequestQuote(`Composite Container - ${name}`)}
                columns={2}
              />
            </div>

            {/* Diverse Usages & Applications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-base font-bold font-display text-[#102A43] flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Diverse Usages</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {product.applications.map((app, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-base font-bold font-display text-[#102A43] flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Brand & Product Benefits</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#102A43] text-white rounded-xl p-6 border border-slate-800 shadow-lg space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                Direct Inquiry
              </span>
              <h3 className="text-lg font-bold font-display text-white">
                Composite Container Quotation
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect with our production specialists for graphic labeling integration, closure options, and custom cylinder heights.
              </p>
              <button
                onClick={() => onRequestQuote('Composite Containers')}
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-3 rounded-md font-semibold text-xs tracking-wide transition-all shadow-md inline-flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Request Custom Pricing</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-3 border-t border-slate-700 text-xs text-slate-300 space-y-1 font-mono">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <a href="tel:+919348851166" className="hover:text-white">
                    +91 93488 51166
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <a href="tel:+919348451166" className="hover:text-white">
                    Factory: +91 93484 51166
                  </a>
                </div>
              </div>
            </div>

            {/* Related Products */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold px-1">
                Other Packaging Lines
              </h4>
              <div className="space-y-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 bg-slate-50 rounded border border-slate-100 p-1 flex items-center justify-center shrink-0">
                        <img
                          src={rel.primaryImage}
                          alt={rel.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-sm text-[#102A43] font-display block">
                          {rel.title}
                        </span>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                          {rel.leadParagraph}
                        </p>
                        <Link
                          to={`/${rel.slug}`}
                          className="text-xs font-semibold text-[#2563EB] inline-flex items-center space-x-1 mt-1 hover:underline"
                        >
                          <span>Explore {rel.title}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
