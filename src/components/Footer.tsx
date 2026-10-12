import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, ExternalLink, ArrowRight, ShieldCheck, Factory } from 'lucide-react';
import { FACILITIES } from '../data/companyData';

interface FooterProps {
  onRequestQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onRequestQuote }) => {
  return (
    <footer className="bg-[#0B1D2F] text-slate-300 border-t border-slate-800">
      {/* Pre-footer Industrial Banner */}
      <div className="bg-[#102A43] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-blue-400 bg-blue-950/60 px-3 py-1 rounded border border-blue-800/50">
                <Factory className="w-3.5 h-3.5" />
                <span>Direct Industrial Manufacturer</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Require Bulk Industrial Packaging?
              </h3>
              <p className="text-sm text-slate-300 max-w-xl">
                Connect directly with our Hyderabad manufacturing facility for capacity specifications, custom heights, and volume commercial quotations.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onRequestQuote}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-md font-semibold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl inline-flex items-center space-x-2 cursor-pointer"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/contact-us"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-6 py-3 rounded-md font-semibold text-sm tracking-wide transition-all border border-slate-700"
              >
                Contact Details
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-1.5 rounded border border-slate-200/30 flex items-center justify-center h-12 w-12 shrink-0">
                <img
                  src="/images/NPI_New_Trans.png"
                  alt="Navodaya Packing Industries"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div>
                <span className="text-lg font-bold font-display text-white tracking-tight block">
                  NAVODAYA PACK
                </span>
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
                  Navodaya Packing Industries India Pvt Ltd
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Leading manufacturer of industrial HDPE Drums, Fibre Drums, and Composite Containers. All products are developed under strict supervision by quality experts in accordance with industry-set standards.
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Trusted packaging partner to top pharmaceutical leaders</span>
            </div>
          </div>

          {/* Col 2: Products Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold border-b border-slate-800 pb-2">
              Products
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  to="/hdpe-drums"
                  className="text-slate-400 hover:text-blue-400 transition-colors flex items-center justify-between"
                >
                  <span>HDPE Drums</span>
                  <span className="text-[10px] font-mono text-slate-400">6L - 120L</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/fiber-drums"
                  className="text-slate-400 hover:text-blue-400 transition-colors flex items-center justify-between"
                >
                  <span>Fibre Drums</span>
                  <span className="text-[10px] font-mono text-slate-400">10" - 20"</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/composite-containers"
                  className="text-slate-400 hover:text-blue-400 transition-colors flex items-center justify-between"
                >
                  <span>Composite Containers</span>
                  <span className="text-[10px] font-mono text-slate-400">75mm Dia</span>
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-800/80">
                <Link
                  to="/contact-us"
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium inline-flex items-center space-x-1"
                >
                  <span>Custom Dimensions</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Facility 1 (Corporate Office) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold border-b border-slate-800 pb-2">
              Corporate Office
            </h4>
            <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-200 font-medium">Hyderabad Office</p>
                  {FACILITIES[0].addressLines.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>
              <div className="flex items-start space-x-2 pt-1">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  {FACILITIES[0].phones.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="block text-slate-300 hover:text-white transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
              <a
                href={FACILITIES[0].mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 pt-1 text-[11px]"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 4: Facility 2 (Factory / Plant) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold border-b border-slate-800 pb-2">
              Manufacturing Facility
            </h4>
            <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
              <div className="flex items-start space-x-2">
                <Factory className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-200 font-medium">Kazipally IDA Plant</p>
                  {FACILITIES[1].addressLines.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>
              <div className="flex items-start space-x-2 pt-1">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  {FACILITIES[1].phones.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="block text-slate-300 hover:text-white transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
              <a
                href={FACILITIES[1].mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 pt-1 text-[11px]"
              >
                <span>View Plant on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80 bg-[#071320] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Navodaya Packing Industries India Pvt Ltd. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="text-slate-400">Manufactured in Telangana, India</span>
            <span className="text-slate-700">|</span>
            <Link to="/contact-us" className="hover:text-slate-300 transition-colors">
              Business Enquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
