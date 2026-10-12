import React from 'react';
import { CLIENT_PARTNERS } from '../data/companyData';
import { ShieldCheck } from 'lucide-react';

export const ClientsCarousel: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded border border-blue-200 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Pharmaceutical & Industrial Trust</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#102A43]">
              Trusted by Leading Pharma & Chemical Enterprises
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Our packaging solutions safeguard critical active pharmaceutical ingredients, fine chemicals, and bulk materials across India.
          </p>
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {CLIENT_PARTNERS.map((client) => (
            <div
              key={client.id}
              className="bg-slate-50 hover:bg-white rounded-lg border border-slate-200/80 p-4 flex flex-col items-center justify-center text-center transition-all duration-200 hover:shadow-md hover:border-blue-200 group min-h-[110px]"
            >
              <div className="h-12 w-full flex items-center justify-center mb-2">
                <img
                  src={client.logo}
                  alt={`${client.name} Logo`}
                  className="max-h-10 max-w-[85%] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-200 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 font-display line-clamp-1">
                {client.name}
              </span>
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-tight">
                {client.sector}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
