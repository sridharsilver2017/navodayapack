import React, { useState, useMemo } from 'react';
import { CLIENT_PARTNERS } from '../data/companyData';
import {
  ShieldCheck,
  Sparkles,
  LayoutGrid,
  Repeat,
  ExternalLink,
} from 'lucide-react';

export const ClientsCarousel: React.FC = () => {
  const [viewMode, setViewMode] = useState<'ribbon' | 'grid'>('ribbon');
  const [selectedSector, setSelectedSector] = useState<string>('All');

  // Split into 2 rows for smooth counter-scrolling ribbon
  const firstHalf = useMemo(() => CLIENT_PARTNERS.slice(0, Math.ceil(CLIENT_PARTNERS.length / 2)), []);
  const secondHalf = useMemo(() => CLIENT_PARTNERS.slice(Math.ceil(CLIENT_PARTNERS.length / 2)), []);

  // Duplicate for seamless infinite loop
  const row1 = useMemo(() => [...firstHalf, ...firstHalf, ...firstHalf], [firstHalf]);
  const row2 = useMemo(() => [...secondHalf, ...secondHalf, ...secondHalf], [secondHalf]);

  // Sector filter options
  const sectors = useMemo(() => {
    return ['All', 'Pharmaceuticals', 'Active Pharma Ingredients', 'Bulk Drugs', 'Specialty Chemicals'];
  }, []);

  const filteredGridClients = useMemo(() => {
    if (selectedSector === 'All') return CLIENT_PARTNERS;
    return CLIENT_PARTNERS.filter((c) =>
      c.sector.toLowerCase().includes(selectedSector.toLowerCase())
    );
  }, [selectedSector]);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-white border-y border-slate-200 overflow-hidden relative">
      {/* Background Subtle Industrial Mesh Accent */}
      <div className="absolute inset-0 industrial-grid-dark opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#2563EB] bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">35+ Enterprise Pharma Partnerships</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-[#102A43] tracking-tight">
              Trusted by Leading Pharma &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-sky-500">
                Chemical Enterprises
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal">
              Navodaya Pack is the trusted packaging vendor for India’s premier Active Pharmaceutical Ingredient (API) manufacturers, formulation laboratories, and industrial chemical corporations.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="inline-flex items-center p-1 bg-slate-200/80 rounded-lg border border-slate-300/80 text-xs font-mono">
              <button
                type="button"
                onClick={() => setViewMode('ribbon')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  viewMode === 'ribbon'
                    ? 'bg-white text-[#102A43] font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Repeat className="w-3.5 h-3.5" />
                <span>Flowing Ribbon</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#102A43] font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>All Partners Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enterprise Trust Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {[
            { label: 'Enterprise Clients', value: '35+', desc: 'Top-tier Indian pharma houses' },
            { label: 'Quality Compliance', value: '100%', desc: 'Tested to strict drop & leak benchmarks' },
            { label: 'Direct Plant Supply', value: 'Kazipally IDA', desc: 'Sanga Reddy industrial corridor' },
            { label: 'Zero Contamination', value: '100% Virgin', desc: 'Food & API grade raw resins' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs flex flex-col justify-between"
            >
              <div className="text-xl sm:text-2xl font-extrabold font-display text-[#102A43]">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-800 mt-0.5">{stat.label}</div>
              <div className="text-[11px] text-slate-500 font-mono mt-0.5">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* VIEW 1: DUAL-TRACK CONTINUOUS SMOOTH MARQUEE RIBBON */}
      {viewMode === 'ribbon' && (
        <div className="space-y-6 w-full">
          {/* Row 1: Leftward continuous scroll */}
          <div className="overflow-hidden relative w-full py-2">
            {/* Edge fade gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee space-x-5 pl-4">
              {row1.map((client, idx) => (
                <div
                  key={`r1-${client.id}-${idx}`}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 w-64 sm:w-80 shrink-0 flex flex-col items-center justify-between group cursor-default"
                >
                  {/* Big High-Impact Logo Container */}
                  <div className="h-28 sm:h-32 w-full flex items-center justify-center p-3 sm:p-4 rounded-xl bg-slate-50/70 group-hover:bg-white border border-slate-100 group-hover:border-blue-100 transition-colors">
                    <img
                      src={client.logo}
                      alt={`${client.name} official logo`}
                      className="max-h-20 sm:max-h-24 max-w-[92%] w-auto object-contain filter-none drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="text-center w-full mt-3.5 pt-2.5 border-t border-slate-100">
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 font-display truncate">
                      {client.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Rightward counter-continuous scroll */}
          <div className="overflow-hidden relative w-full py-2">
            {/* Edge fade gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-reverse space-x-5 pl-4">
              {row2.map((client, idx) => (
                <div
                  key={`r2-${client.id}-${idx}`}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 w-64 sm:w-80 shrink-0 flex flex-col items-center justify-between group cursor-default"
                >
                  {/* Big High-Impact Logo Container */}
                  <div className="h-28 sm:h-32 w-full flex items-center justify-center p-3 sm:p-4 rounded-xl bg-slate-50/70 group-hover:bg-white border border-slate-100 group-hover:border-blue-100 transition-colors">
                    <img
                      src={client.logo}
                      alt={`${client.name} official logo`}
                      className="max-h-20 sm:max-h-24 max-w-[92%] w-auto object-contain filter-none drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="text-center w-full mt-3.5 pt-2.5 border-t border-slate-100">
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 font-display truncate">
                      {client.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: COMPLETE PARTNERS GRID WITH SECTOR FILTERING */}
      {viewMode === 'grid' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-2">
            {sectors.map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => setSelectedSector(sec)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  selectedSector === sec
                    ? 'bg-[#102A43] text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {filteredGridClients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 group"
              >
                {/* Big High-Impact Logo Container */}
                <div className="h-28 sm:h-32 w-full flex items-center justify-center p-3 sm:p-4 rounded-xl bg-slate-50/70 group-hover:bg-white border border-slate-100 group-hover:border-blue-100 transition-colors mb-3">
                  <img
                    src={client.logo}
                    alt={`${client.name} official logo`}
                    className="max-h-20 sm:max-h-24 max-w-[92%] w-auto object-contain filter-none drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="w-full pt-2.5 border-t border-slate-100">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 font-display block line-clamp-1">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Dispatch Reassurance Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-[#102A43] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 relative z-10 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-blue-300 bg-blue-950/80 px-2.5 py-1 rounded border border-blue-800">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Pharmaceutical Grade Assurance</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-display text-white">
              Packaging Supplies Validated for Audits & Regulatory Compliances
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-normal">
              Every drum batch is traceable to certified raw resin lots, tested for wall thickness uniformity, drop resilience, and hydro-static containment.
            </p>
          </div>

          <div className="shrink-0 relative z-10">
            <a
              href="tel:+919348851166"
              className="inline-flex items-center space-x-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-md text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer"
            >
              <span>Partner With Navodaya</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
