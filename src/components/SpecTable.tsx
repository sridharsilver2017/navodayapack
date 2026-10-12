import React, { useState, useMemo } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import { DrumSpecification } from '../types';

interface SpecTableProps {
  title: string;
  subtitle?: string;
  specifications: DrumSpecification[];
  onRequestQuoteWithSpec?: (spec: string) => void;
  showThumbnail?: boolean;
}

export const SpecTable: React.FC<SpecTableProps> = ({
  title,
  subtitle,
  specifications,
  onRequestQuoteWithSpec,
  showThumbnail = true,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSpecs = useMemo(() => {
    if (!searchTerm.trim()) return specifications;
    const term = searchTerm.toLowerCase();
    return specifications.filter((s) => {
      const matchCap = s.capacity.toLowerCase().includes(term);
      const matchHeight = s.heightMm?.toString().toLowerCase().includes(term);
      const matchDia = s.diameterMm?.toString().toLowerCase().includes(term);
      const matchNotes = s.notes?.toLowerCase().includes(term);
      return matchCap || matchHeight || matchDia || matchNotes;
    });
  }, [specifications, searchTerm]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header with Search and Count */}
      <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
            <h3 className="text-lg sm:text-xl font-bold font-display text-[#102A43]">
              {title}
            </h3>
          </div>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter capacity or size..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <span className="text-xs font-mono text-slate-500 px-2.5 py-1.5 bg-white border border-slate-200 rounded shrink-0">
            {filteredSpecs.length} {filteredSpecs.length === 1 ? 'Size' : 'Sizes'}
          </span>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/80 text-[11px] font-mono uppercase tracking-wider text-slate-600 border-b border-slate-200">
              {showThumbnail && <th className="py-3 px-4 w-20">Profile</th>}
              <th className="py-3 px-4">Standard Capacity / Size</th>
              <th className="py-3 px-4">Dimensions / Height (*h)</th>
              <th className="py-3 px-4">Configuration Details</th>
              <th className="py-3 px-4 text-right">Inquire</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredSpecs.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400">
                  No matching configurations found.
                </td>
              </tr>
            ) : (
              filteredSpecs.map((spec, idx) => (
                <tr
                  key={`${spec.capacity}-${idx}`}
                  className="hover:bg-blue-50/50 transition-colors group"
                >
                  {showThumbnail && (
                    <td className="py-3 px-4">
                      {spec.image ? (
                        <div className="w-12 h-14 bg-slate-50 rounded border border-slate-200 flex items-center justify-center p-1 group-hover:border-blue-300 transition-colors">
                          <img
                            src={spec.image}
                            alt={spec.capacity}
                            className="max-h-full max-w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-14 bg-slate-100 rounded border border-slate-200 flex items-center justify-center text-[10px] text-slate-400 font-mono">
                          N/A
                        </div>
                      )}
                    </td>
                  )}
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 font-display text-sm block">
                      {spec.capacity}
                    </span>
                    {spec.code && (
                      <span className="text-[10px] font-mono text-slate-500">
                        Code: {spec.code}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700">
                    {spec.heightMm && (
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase block">Height</span>
                        <span>{spec.heightMm}</span>
                      </div>
                    )}
                    {spec.diameterMm && (
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase block">Diameter</span>
                        <span>{spec.diameterMm}</span>
                      </div>
                    )}
                    {!spec.heightMm && !spec.diameterMm && (
                      <span className="text-slate-400">Standard Spec</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    <p>{spec.notes || 'Standard manufacturing specification'}</p>
                    {spec.closure && (
                      <span className="inline-block mt-1 text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        Closure: {spec.closure}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {onRequestQuoteWithSpec && (
                      <button
                        onClick={() => onRequestQuoteWithSpec(spec.capacity)}
                        className="inline-flex items-center space-x-1 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition-colors cursor-pointer"
                      >
                        <span>Quote</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Grid View */}
      <div className="md:hidden divide-y divide-slate-100">
        {filteredSpecs.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400">
            No matching specifications found.
          </div>
        ) : (
          filteredSpecs.map((spec, idx) => (
            <div key={`${spec.capacity}-${idx}`} className="p-4 flex items-center space-x-4">
              {showThumbnail && spec.image && (
                <div className="w-16 h-20 bg-slate-50 rounded border border-slate-200 flex items-center justify-center p-1 shrink-0">
                  <img
                    src={spec.image}
                    alt={spec.capacity}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <span className="font-bold text-sm text-slate-900 font-display block">
                  {spec.capacity}
                </span>
                {(spec.heightMm || spec.diameterMm) && (
                  <p className="text-xs font-mono text-slate-600 mt-0.5">
                    {spec.heightMm ? `H: ${spec.heightMm}` : ''}
                    {spec.heightMm && spec.diameterMm ? ' | ' : ''}
                    {spec.diameterMm ? `Dia: ${spec.diameterMm}` : ''}
                  </p>
                )}
                {spec.notes && (
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {spec.notes}
                  </p>
                )}
                {onRequestQuoteWithSpec && (
                  <button
                    onClick={() => onRequestQuoteWithSpec(spec.capacity)}
                    className="mt-2 text-xs font-semibold text-[#2563EB] inline-flex items-center space-x-1"
                  >
                    <span>Request Quotation</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between font-mono">
        <span>*h denotes drum height in millimeters</span>
        <span>Custom dimensions available on request</span>
      </div>
    </div>
  );
};
