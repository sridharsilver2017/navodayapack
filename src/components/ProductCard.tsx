import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ProductDetail } from '../types';

interface ProductCardProps {
  product: ProductDetail;
  onRequestQuote?: (productTitle: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onRequestQuote }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:border-blue-300">
      {/* Visual Image Showcase */}
      <div className="relative h-60 sm:h-64 bg-slate-100 p-6 flex items-center justify-center overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-200/50 to-transparent opacity-60"></div>

        <img
          src={product.primaryImage}
          alt={product.title}
          className="max-h-full max-w-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute top-4 left-4 z-20">
          <span className="text-[10px] font-mono uppercase tracking-wider font-semibold bg-[#102A43] text-white px-2.5 py-1 rounded shadow-sm">
            {product.categoryTag}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-xl font-bold font-display text-[#102A43] group-hover:text-[#2563EB] transition-colors">
              {product.title}
            </h3>
            {product.availableSizesText && (
              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0">
                {product.slug === 'hdpe-drums'
                  ? '6L - 120L'
                  : product.slug === 'fiber-drums'
                  ? '10" - 20" Dia'
                  : '75mm Dia'}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
            {product.leadParagraph}
          </p>

          {/* Highlights */}
          <ul className="space-y-1.5 mb-6 text-xs text-slate-700">
            {product.keyHighlights.slice(0, 3).map((highlight, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                <span className="line-clamp-1">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
          <Link
            to={`/${product.slug}`}
            className="flex-1 inline-flex items-center justify-center space-x-1.5 bg-[#102A43] hover:bg-[#2563EB] text-white py-2.5 px-3 rounded-md text-xs font-semibold tracking-wide transition-all"
          >
            <span>View Specifications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {onRequestQuote && (
            <button
              onClick={() => onRequestQuote(product.title)}
              className="inline-flex items-center justify-center bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#2563EB] py-2.5 px-3 rounded-md text-xs font-semibold tracking-wide border border-slate-200 hover:border-blue-200 transition-all cursor-pointer"
            >
              <span>Get Quote</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
