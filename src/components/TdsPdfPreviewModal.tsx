import React, { useState } from 'react';
import {
  X,
  Download,
  Printer,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Beaker,
  ShieldCheck,
  Loader2,
} from 'lucide-react';
import { IndividualProduct } from '../types';
import { downloadProductTdsPdf } from '../utils/generateProductPdf';

interface TdsPdfPreviewModalProps {
  product: IndividualProduct;
  isOpen: boolean;
  onClose: () => void;
}

export const TdsPdfPreviewModal: React.FC<TdsPdfPreviewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadProductTdsPdf(product);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-slate-100 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-700/60 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Control Bar */}
        <div className="bg-[#102A43] text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-2.5">
            <FileText className="w-5 h-5 text-blue-400" />
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-blue-300 block">
                Official Technical Data Sheet
              </span>
              <h3 className="text-sm font-bold font-display text-white truncate max-w-md">
                {product.name} — Technical Specification (TDS)
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-md text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="inline-flex items-center space-x-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-3.5 py-1.5 rounded-md text-xs font-semibold shadow-md transition-all cursor-pointer disabled:opacity-60"
            >
              {isDownloading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{isDownloading ? 'Generating...' : 'Download PDF File'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Container (Styled as Authentic A4 Sheet) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-200/80 flex justify-center">
          <div
            id="printable-tds-sheet"
            className="bg-white w-full max-w-[760px] shadow-xl rounded-sm border border-slate-300 p-8 sm:p-10 space-y-6 text-slate-800 font-sans"
          >
            {/* 1. Header Banner */}
            <div className="border-b-2 border-[#102A43] pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-700 font-bold block mb-1">
                  NAVODAYA PACKING INDUSTRIES INDIA PVT. LTD.
                </span>
                <h1 className="text-xl sm:text-2xl font-black font-display text-[#102A43] tracking-tight">
                  TECHNICAL DATA SHEET (TDS)
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Industrial Packaging Specification & Compliance Record
                </p>
              </div>

              <div className="text-right sm:self-start bg-slate-50 p-2.5 rounded border border-slate-200 text-[11px] font-mono text-slate-600 shrink-0">
                <div>DOC REF: <span className="font-bold text-slate-900">NPI/TDS/{product.id.toUpperCase()}</span></div>
                <div>DATE: <span className="text-slate-900">{today}</span></div>
                <div>PLANT: <span className="text-blue-700 font-bold">Kazipally IDA</span></div>
              </div>
            </div>

            {/* 2. Product Identity & Quick Parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-slate-50/70 p-4 rounded-xl border border-slate-200">
              <div className="sm:col-span-4 flex items-center justify-center p-3 bg-white rounded-lg border border-slate-200 h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain drop-shadow-md select-none"
                />
              </div>

              <div className="sm:col-span-8 space-y-2.5">
                <div className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded font-bold">
                  <span>{product.category}</span>
                  <span>•</span>
                  <span>{product.capacity}</span>
                </div>

                <h2 className="text-xl font-bold font-display text-[#102A43]">
                  {product.name}
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {product.summary}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1 font-mono">
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">STANDARD CAPACITY</span>
                    <span className="font-bold text-slate-900">{product.capacity}</span>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">CLOSURE SYSTEM</span>
                    <span className="font-bold text-slate-900 truncate block">{product.closure}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Detailed Parameter Matrix */}
            <div>
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#102A43]">
                  1.0 Physical & Manufacturing Specifications
                </h3>
              </div>

              <table className="w-full text-xs text-left border-collapse border border-slate-200">
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-slate-50">
                    <td className="py-2 px-3 font-semibold text-slate-600 w-1/3 border-r border-slate-200">Standard Nominal Capacity</td>
                    <td className="py-2 px-3 font-bold text-slate-900">{product.capacity}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-600 border-r border-slate-200">Raw Material Polymer / Core</td>
                    <td className="py-2 px-3 text-slate-900">{product.material}</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="py-2 px-3 font-semibold text-slate-600 border-r border-slate-200">Closure / Sealing Mechanism</td>
                    <td className="py-2 px-3 text-slate-900">{product.closure}</td>
                  </tr>
                  {product.heightMm && (
                    <tr>
                      <td className="py-2 px-3 font-semibold text-slate-600 border-r border-slate-200">Standard Overall Height (*h)</td>
                      <td className="py-2 px-3 font-mono text-slate-900">{product.heightMm}</td>
                    </tr>
                  )}
                  {product.diameterMm && (
                    <tr className="bg-slate-50">
                      <td className="py-2 px-3 font-semibold text-slate-600 border-r border-slate-200">Standard Diameter (Dia)</td>
                      <td className="py-2 px-3 font-mono text-slate-900">{product.diameterMm}</td>
                    </tr>
                  )}
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-600 border-r border-slate-200">Manufacturing Facility</td>
                    <td className="py-2 px-3 text-slate-900">Kazipally IDA, Sangareddy Dist, Telangana</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="py-2 px-3 font-semibold text-slate-600 border-r border-slate-200">Compliance Benchmark</td>
                    <td className="py-2 px-3 text-slate-900">Developed as per industry-set quality standards</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 4. Chemical Compatibility Matrix */}
            {product.chemicalResistance && (
              <div>
                <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 mb-3">
                  <Beaker className="w-3.5 h-3.5 text-blue-600" />
                  <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#102A43]">
                    2.0 Chemical Compatibility Profile
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg space-y-1">
                    <span className="font-bold text-emerald-900 block flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Highly Compatible</span>
                    </span>
                    <ul className="text-emerald-800 text-[11px] space-y-0.5">
                      {product.chemicalResistance.compatible.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg space-y-1">
                    <span className="font-bold text-amber-900 block flex items-center space-x-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Moderate Exposure</span>
                    </span>
                    <ul className="text-amber-800 text-[11px] space-y-0.5">
                      {product.chemicalResistance.moderate.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg space-y-1">
                    <span className="font-bold text-red-900 block flex items-center space-x-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                      <span>Restricted Usage</span>
                    </span>
                    <ul className="text-red-800 text-[11px] space-y-0.5">
                      {product.chemicalResistance.caution.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Features & Verified Applications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="border border-slate-200 rounded-lg p-3.5 bg-slate-50/50">
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#102A43] block mb-2">
                  Engineering Attributes
                </span>
                <ul className="text-xs space-y-1 text-slate-700">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-slate-200 rounded-lg p-3.5 bg-slate-50/50">
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#102A43] block mb-2">
                  Verified Applications
                </span>
                <ul className="text-xs space-y-1 text-slate-700">
                  {product.applications.map((app, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 6. Official Quality Certification & Dispatch Seal */}
            <div className="bg-blue-50/60 border border-blue-200 rounded-lg p-3 flex items-center justify-between text-xs text-blue-900">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span className="font-semibold">
                  Factory Quality Verified • Kazipally IDA Plant, Telangana
                </span>
              </div>
              <span className="font-mono text-[10px] text-blue-700">AUTHENTIC NPI RECORD</span>
            </div>

            {/* 7. Footer Contact & Address */}
            <div className="border-t-2 border-slate-200 pt-3 text-[10px] text-slate-500 font-mono space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-slate-700">
                <span>NAVODAYA PACKING INDUSTRIES INDIA PVT. LTD.</span>
                <span>www.navodayapack.in</span>
              </div>
              <div>Corporate: Flat No. 102, Sri Nilayam, Srinagar Colony, Hyderabad - 500073</div>
              <div className="flex flex-wrap gap-x-4">
                <span>Plant: Kazipally IDA, Sangareddy Dist, Telangana</span>
                <span>Mobile: +91 93488 51166, +91 93484 51166</span>
                <span>Email: sales@navodayapack.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="bg-white px-6 py-3 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            Print-ready A4 technical sheet with complete chemical & handling matrices
          </span>
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="inline-flex items-center space-x-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2 rounded-md text-xs font-semibold shadow-md transition-all cursor-pointer disabled:opacity-60"
            >
              {isDownloading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{isDownloading ? 'Generating PDF...' : 'Download Official PDF'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
