import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Beaker, Layers, Phone } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { INDIVIDUAL_PRODUCTS } from '../data/individualProducts';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductVariantGrid } from '../components/ProductVariantGrid';

interface HdpeDrumsProps {
  onRequestQuote: (preselectedProduct?: string) => void;
}

export const HdpeDrums: React.FC<HdpeDrumsProps> = ({ onRequestQuote }) => {
  const product = PRODUCTS.find((p) => p.slug === 'hdpe-drums')!;
  const [activeImage, setActiveImage] = useState(product.primaryImage);
  const hdpeProducts = INDIVIDUAL_PRODUCTS.filter((p) => p.categorySlug === 'hdpe-drums');

  const relatedProducts = PRODUCTS.filter((p) => p.slug !== 'hdpe-drums');

  return (
    <div className="w-full bg-[#F1F5F9]">
      {/* Product Hero & Overview */}
      <section className="bg-[#102A43] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Breadcrumbs
            items={[
              { label: 'Products', path: '/#product-portfolio' },
              { label: 'HDPE Drums' },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mt-6">
            {/* Left: Product Information */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-400 bg-blue-950 px-3 py-1 rounded border border-blue-800 inline-block">
                Thermoplastic Industrial Containers
              </span>

              <h1 className="fluid-page-title font-extrabold font-display text-white tracking-tight">
                HDPE Drums
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {product.leadParagraph}
              </p>

              {/* Quick specs chips */}
              <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono">
                <span className="bg-slate-800 text-blue-300 px-3 py-1.5 rounded border border-slate-700">
                  Capacity: 6L to 120 Litres
                </span>
                <span className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded border border-slate-700">
                  Material: High-Density Polyethylene
                </span>
                <span className="bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700">
                  Chemical & Impact Resistant
                </span>
              </div>

              {/* Action buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onRequestQuote('HDPE Drums')}
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-7 py-3 rounded-md font-semibold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl inline-flex items-center space-x-2 cursor-pointer"
                >
                  <span>Request HDPE Drum Quotation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#specifications-table"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-3 rounded-md font-semibold text-sm tracking-wide border border-slate-700 transition-all"
                >
                  View Capacity Table
                </a>
              </div>
            </div>

            {/* Right: High-Resolution Visual Gallery */}
            <div className="lg:col-span-5">
              <div className="bg-white/5 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
                {/* Main Large Image */}
                <div className="h-64 sm:h-72 w-full bg-slate-900/60 rounded-xl p-4 flex items-center justify-center border border-slate-800 overflow-hidden">
                  <img
                    src={activeImage}
                    alt="Navodaya Pack HDPE Drums"
                    className="max-h-full max-w-full object-contain transition-all duration-300"
                  />
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-3 gap-2.5 mt-3">
                  <button
                    onClick={() => setActiveImage('/images/hdpe_all.png')}
                    className={`h-16 rounded-lg bg-slate-900/60 p-1 border flex items-center justify-center transition-all ${
                      activeImage === '/images/hdpe_all.png'
                        ? 'border-blue-500 ring-2 ring-blue-500/30'
                        : 'border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src="/images/hdpe_all.png"
                      alt="HDPE Multi-Capacity Lineup"
                      className="max-h-full max-w-full object-contain"
                    />
                  </button>
                  <button
                    onClick={() => setActiveImage('/images/sizes/hdpe_group.jpg')}
                    className={`h-16 rounded-lg bg-slate-900/60 p-1 border flex items-center justify-center transition-all ${
                      activeImage === '/images/sizes/hdpe_group.jpg'
                        ? 'border-blue-500 ring-2 ring-blue-500/30'
                        : 'border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src="/images/sizes/hdpe_group.jpg"
                      alt="HDPE Drum Group"
                      className="max-h-full max-w-full object-contain"
                    />
                  </button>
                  <button
                    onClick={() => setActiveImage('/images/sizes/50_lts_575.png')}
                    className={`h-16 rounded-lg bg-slate-900/60 p-1 border flex items-center justify-center transition-all ${
                      activeImage === '/images/sizes/50_lts_575.png'
                        ? 'border-blue-500 ring-2 ring-blue-500/30'
                        : 'border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src="/images/sizes/50_lts_575.png"
                      alt="50L Special Height Drum"
                      className="max-h-full max-w-full object-contain"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Verified Technical Properties */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Section 1: Detailed Material Overview */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                <Beaker className="w-5 h-5 text-[#2563EB]" />
                <h2 className="text-xl sm:text-2xl font-bold font-display text-[#102A43]">
                  Polyethylene Material Science & Properties
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {product.detailedOverview.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Section 2: Big Product Grid View with TDS Table Toggle (2 columns on desktop) */}
            <div id="specifications-table">
              <ProductVariantGrid
                title="HDPE Drum Lineup & Sizing Grid"
                subtitle="Explore all 15 blow-moulded HDPE capacity models. Click any drum to view its dedicated specifications, technical data sheet (TDS), and chemical resistance."
                products={hdpeProducts}
                specifications={product.specifications}
                onRequestQuote={(name) => onRequestQuote(`HDPE Drum - ${name}`)}
                columns={2}
              />
            </div>

            {/* Section 3: Applications & Chemical Compatibility */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-base font-bold font-display text-[#102A43] flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Key Applications</span>
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
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Performance Features</span>
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

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Fast Quote Widget */}
            <div className="bg-[#102A43] text-white rounded-xl p-6 border border-slate-800 shadow-lg space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                Direct Procurement
              </span>
              <h3 className="text-lg font-bold font-display text-white">
                Request HDPE Drum Quote
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect with our commercial dispatch team for truckload or recurring delivery schedule pricing.
              </p>
              <button
                onClick={() => onRequestQuote('HDPE Drums')}
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

            {/* Related Products Section */}
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
