import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Beaker,
  Layers,
  FileText,
  AlertTriangle,
  ChevronRight,
  Package,
  Download,
  FileDown,
  Loader2,
} from 'lucide-react';
import { INDIVIDUAL_PRODUCTS } from '../data/individualProducts';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { EnquiryForm } from '../components/EnquiryForm';
import { COMPANY_INFO } from '../data/companyData';
import { TdsPdfPreviewModal } from '../components/TdsPdfPreviewModal';
import { downloadProductTdsPdf } from '../utils/generateProductPdf';

interface ProductDetailViewProps {
  onRequestQuote: (preselectedProduct?: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ onRequestQuote }) => {
  const { productId } = useParams<{ productId: string }>();

  const product = INDIVIDUAL_PRODUCTS.find((p) => p.id === productId);

  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const handleDirectDownload = async () => {
    if (!product) return;
    setIsDownloadingPdf(true);
    try {
      await downloadProductTdsPdf(product);
    } catch (err) {
      console.error('Failed to download PDF:', err);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-blue-100 text-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold font-display text-[#102A43] mb-2">
          Product Variant Not Found
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mb-6 max-w-md mx-auto">
          The requested packaging specification could not be located. Please browse our primary product category catalogs.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/hdpe-drums"
            className="bg-[#2563EB] text-white px-5 py-2.5 rounded-md text-xs font-semibold"
          >
            HDPE Drums Catalog
          </Link>
          <Link
            to="/fiber-drums"
            className="bg-slate-800 text-white px-5 py-2.5 rounded-md text-xs font-semibold"
          >
            Fibre Drums Catalog
          </Link>
          <Link
            to="/composite-containers"
            className="bg-slate-800 text-white px-5 py-2.5 rounded-md text-xs font-semibold"
          >
            Composite Containers
          </Link>
        </div>
      </div>
    );
  }

  // Find adjacent product items for quick navigation
  const adjacentProducts = INDIVIDUAL_PRODUCTS.filter((item) =>
    product.adjacentProductIds?.includes(item.id)
  );

  return (
    <div className="w-full bg-[#F1F5F9] pb-16">
      {/* Top Header & Breadcrumb Bar */}
      <section className="bg-[#102A43] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Breadcrumbs
            items={[
              { label: product.category, path: `/${product.categorySlug}` },
              { label: product.name },
            ]}
          />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-3">
            <div>
              <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-wider text-blue-300 bg-blue-950/80 px-2.5 py-1 rounded border border-blue-800/80 mb-2">
                <span>{product.category}</span>
                <span>•</span>
                <span>{product.capacity}</span>
              </div>
              <h1 className="fluid-section-title font-extrabold font-display text-white tracking-tight">
                {product.name}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
              <button
                type="button"
                onClick={handleDirectDownload}
                disabled={isDownloadingPdf}
                className="inline-flex items-center space-x-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-3.5 py-2 rounded-md text-xs font-semibold shadow-md transition-all cursor-pointer disabled:opacity-60"
              >
                {isDownloadingPdf ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>Download TDS (PDF)</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPdfModalOpen(true)}
                className="inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-md text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Preview PDF</span>
              </button>

              <Link
                to={`/${product.categorySlug}`}
                className="inline-flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3 py-2 rounded border border-slate-700 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to {product.category}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Detail Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Left Column: Visual Showcase & Technical Overview */}
          <div className="lg:col-span-7 space-y-8">
            {/* Image Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
                <span className="text-[10px] font-mono uppercase tracking-wider font-semibold bg-[#102A43] text-white px-2.5 py-1 rounded">
                  {product.capacity}
                </span>
                {product.heightMm && (
                  <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                    Height: {product.heightMm}
                  </span>
                )}
              </div>

              <div className="w-full h-80 sm:h-96 flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain drop-shadow-xl"
                />
              </div>

              <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                <div className="flex items-center space-x-1.5 text-emerald-600">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Quality Supervised Manufacturing</span>
                </div>
                <span>Plant: Kazipally IDA</span>
              </div>
            </div>

            {/* Product Summary & Detailed Description */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold font-display text-[#102A43]">
                Specification Overview
              </h2>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">
                {product.summary}
              </p>
              <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                {product.detailedDescription.map((desc, idx) => (
                  <p key={idx}>{desc}</p>
                ))}
              </div>
            </div>

            {/* Technical Specifications Matrix */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-[#2563EB]" />
                  <h3 className="text-lg font-bold font-display text-[#102A43]">
                    Technical Data Sheet (TDS)
                  </h3>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsPdfModalOpen(true)}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md border border-slate-200 transition-all cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>Preview Sheet</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDirectDownload}
                    disabled={isDownloadingPdf}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-3.5 py-1.5 rounded-md shadow-xs transition-all cursor-pointer disabled:opacity-60"
                  >
                    {isDownloadingPdf ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Download className="w-3.5 h-3.5" />
                    )}
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-semibold text-slate-500 w-1/3">Standard Capacity</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">{product.capacity}</td>
                    </tr>
                    {product.heightMm && (
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-semibold text-slate-500">Height (*h)</td>
                        <td className="py-2.5 px-3 font-mono text-slate-900">{product.heightMm}</td>
                      </tr>
                    )}
                    {product.diameterMm && (
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-semibold text-slate-500">Diameter (Dia)</td>
                        <td className="py-2.5 px-3 font-mono text-slate-900">{product.diameterMm}</td>
                      </tr>
                    )}
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-semibold text-slate-500">Raw Material</td>
                      <td className="py-2.5 px-3 text-slate-900">{product.material}</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-semibold text-slate-500">Closure Mechanism</td>
                      <td className="py-2.5 px-3 text-slate-900">{product.closure}</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-semibold text-slate-500">Production Facility</td>
                      <td className="py-2.5 px-3 text-slate-900">Kazipally IDA, Hyderabad, Telangana</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-semibold text-slate-500">Compliance Benchmark</td>
                      <td className="py-2.5 px-3 text-slate-900">Developed as per industry-set quality standards</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Chemical Resistance Profile (if applicable) */}
            {product.chemicalResistance && (
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                  <Beaker className="w-5 h-5 text-[#2563EB]" />
                  <h3 className="text-lg font-bold font-display text-[#102A43]">
                    Chemical Compatibility Profile
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg space-y-1.5">
                    <span className="font-bold text-emerald-900 block flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Highly Compatible</span>
                    </span>
                    <ul className="space-y-1 text-emerald-800">
                      {product.chemicalResistance.compatible.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg space-y-1.5">
                    <span className="font-bold text-amber-900 block flex items-center space-x-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Moderate Exposure</span>
                    </span>
                    <ul className="space-y-1 text-amber-800">
                      {product.chemicalResistance.moderate.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-red-50/70 border border-red-200 rounded-lg space-y-1.5">
                    <span className="font-bold text-red-900 block flex items-center space-x-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                      <span>Restricted Usage</span>
                    </span>
                    <ul className="space-y-1 text-red-800">
                      {product.chemicalResistance.caution.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Key Features & Applications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
                <h4 className="font-bold font-display text-sm text-[#102A43] flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-[#2563EB]" />
                  <span>Key Engineering Features</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
                <h4 className="font-bold font-display text-sm text-[#102A43] flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Applications</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {product.applications.map((app, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Procurement & Dedicated Enquiry Form */}
          <div className="lg:col-span-5 space-y-6">
            {/* Commercial Quotation Card */}
            <div className="bg-[#102A43] text-white rounded-xl p-6 border border-slate-800 shadow-lg space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 bg-blue-950 px-2.5 py-1 rounded border border-blue-800">
                Direct Procurement Desk
              </span>
              <h3 className="text-xl font-bold font-display text-white">
                Request Commercial Pricing
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect directly with our Hyderabad sales desk for formal commercial quotes, bulk volume slabs, and production scheduling.
              </p>

              <button
                onClick={() => onRequestQuote(`${product.name}`)}
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-3 px-4 rounded-md font-semibold text-xs tracking-wide transition-all shadow-md inline-flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Request Fast Quote for this Drum</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsPdfModalOpen(true)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white py-2.5 px-4 rounded-md font-semibold text-xs tracking-wide transition-all border border-slate-700 inline-flex items-center justify-center space-x-2 cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-blue-400" />
                <span>View & Print PDF Specification</span>
              </button>

              <div className="pt-3 border-t border-slate-700/80 text-xs text-slate-300 space-y-2 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Sales Mobile:</span>
                  <a href="tel:+919348851166" className="font-bold text-white hover:text-blue-300">
                    +91 93488 51166
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Factory Mobile:</span>
                  <a href="tel:+919348451166" className="font-bold text-white hover:text-blue-300">
                    +91 93484 51166
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Corporate Email:</span>
                  <a
                    href={`mailto:${COMPANY_INFO.salesEmail}`}
                    className="text-blue-300 hover:text-white"
                  >
                    {COMPANY_INFO.salesEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Specific Product Enquiry Form */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h4 className="text-base font-bold font-display text-[#102A43]">
                  Enquire for {product.name}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pre-configured inquiry sent directly to Navodaya Pack.
                </p>
              </div>

              <EnquiryForm
                initialProduct={product.category}
                isCompact={true}
              />
            </div>

            {/* Adjacent / Alternative Size Variants */}
            {adjacentProducts.length > 0 && (
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  Adjacent Capacities & Alternatives
                </h4>
                <div className="space-y-3">
                  {adjacentProducts.map((adj) => (
                    <Link
                      key={adj.id}
                      to={`/product/${adj.id}`}
                      className="p-3 rounded-lg border border-slate-100 hover:border-blue-300 hover:bg-blue-50/30 transition-all flex items-center space-x-3 group"
                    >
                      <div className="w-12 h-14 bg-slate-50 rounded p-1 flex items-center justify-center shrink-0 border border-slate-100">
                        <img
                          src={adj.image}
                          alt={adj.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-xs text-[#102A43] group-hover:text-[#2563EB] font-display block truncate">
                          {adj.name}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 block">
                          {adj.capacity} {adj.heightMm ? `• H: ${adj.heightMm}` : ''}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Official Technical Data Sheet (TDS) PDF Preview & Print Modal */}
      <TdsPdfPreviewModal
        product={product}
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />
    </div>
  );
};
