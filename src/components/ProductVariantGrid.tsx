import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  LayoutGrid,
  Table as TableIcon,
  ArrowRight,
  CheckCircle2,
  Package,
} from 'lucide-react';
import { IndividualProduct, DrumSpecification } from '../types';
import { SpecTable } from './SpecTable';

interface ProductVariantGridProps {
  products: IndividualProduct[];
  title?: string;
  subtitle?: string;
  specifications?: DrumSpecification[];
  onRequestQuote: (productName: string) => void;
  showCategoryFilter?: boolean;
  columns?: 2 | 3;
}

export const ProductVariantGrid: React.FC<ProductVariantGridProps> = ({
  products,
  title = 'Product Lineup & Available Sizing',
  subtitle = 'Browse individual industrial packaging variants with complete technical specifications',
  specifications,
  onRequestQuote,
  showCategoryFilter = false,
  columns = 3,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter products by search and category
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' || p.categorySlug === selectedCategory;

      const term = searchTerm.toLowerCase().trim();
      if (!term) return matchesCategory;

      const matchesSearch =
        p.name.toLowerCase().includes(term) ||
        p.capacity.toLowerCase().includes(term) ||
        (p.heightMm && p.heightMm.toLowerCase().includes(term)) ||
        (p.diameterMm && p.diameterMm.toLowerCase().includes(term)) ||
        (p.material && p.material.toLowerCase().includes(term)) ||
        (p.closure && p.closure.toLowerCase().includes(term));

      return matchesCategory && matchesSearch;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="w-full space-y-6">
      {/* Control Header: Title, Search, Category Filter, and View Switcher */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 sm:p-6 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#102A43]">
                {title}
              </h2>
            </div>
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-500 mt-1">{subtitle}</p>
            )}
          </div>

          {/* View Toggle (Grid / Table) */}
          <div className="flex items-center space-x-2 self-start md:self-auto">
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">View Mode:</span>
            <div className="bg-slate-100 p-1 rounded-lg border border-slate-200 flex items-center space-x-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#102A43] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>
              {specifications && (
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                    viewMode === 'table'
                      ? 'bg-white text-[#102A43] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Table View</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar & Category Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          {/* Category Filter Pills (if enabled) */}
          {showCategoryFilter ? (
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { label: 'All Packaging', value: 'All' },
                { label: 'HDPE Drums', value: 'hdpe-drums' },
                { label: 'Fibre Drums', value: 'fiber-drums' },
                { label: 'Composite Containers', value: 'composite-containers' },
              ].map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.value
                      ? 'bg-[#102A43] text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
              <Package className="w-4 h-4 text-blue-600" />
              <span>
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product Model' : 'Product Models'} Available
              </span>
            </div>
          )}

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search capacity, diameter, height..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Grid View of Products */}
      {viewMode === 'grid' && (
        <>
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <Package className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">No matching products found</h3>
              <p className="text-xs text-slate-500 mt-1">Try searching for a different capacity or size parameter.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4 text-xs font-semibold text-blue-600 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 ${
                columns === 2
                  ? 'md:grid-cols-2 lg:grid-cols-2 gap-8'
                  : 'md:grid-cols-2 lg:grid-cols-3 gap-6'
              }`}
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400/80 transition-all duration-300 flex flex-col overflow-hidden group ${
                    columns === 2 ? 'rounded-2xl' : 'rounded-xl'
                  }`}
                >
                  {/* Big Image Stage */}
                  <Link
                    to={`/product/${product.id}`}
                    className={`relative bg-gradient-to-b from-slate-50 via-white to-slate-100/60 p-6 flex items-center justify-center overflow-hidden border-b border-slate-100 group-hover:bg-blue-50/20 transition-colors ${
                      columns === 2 ? 'h-72 sm:h-80' : 'h-64 sm:h-72'
                    }`}
                  >
                    {/* Subtle studio glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.06)_0,transparent_75%)] pointer-events-none"></div>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110 drop-shadow-xl select-none"
                      loading="lazy"
                    />

                    {/* Capacity Badge */}
                    <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider font-bold bg-[#102A43] text-white px-2.5 py-1 rounded shadow-xs">
                        {product.capacity}
                      </span>
                      {product.heightMm && (
                        <span className="text-[10px] font-mono font-medium text-blue-700 bg-blue-50/90 px-2 py-1 rounded border border-blue-200">
                          H: {product.heightMm}
                        </span>
                      )}
                      {product.diameterMm && (
                        <span className="text-[10px] font-mono font-medium text-slate-700 bg-slate-100/90 px-2 py-1 rounded border border-slate-200">
                          Dia: {product.diameterMm}
                        </span>
                      )}
                    </div>

                    <span className="absolute bottom-2.5 right-3 text-[10px] font-mono text-slate-400 bg-white/90 px-2 py-0.5 rounded border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      Click for TDS & Details
                    </span>
                  </Link>

                  {/* Card Content Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category and Title */}
                      <div className="mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 block mb-1">
                          {product.category}
                        </span>
                        <Link to={`/product/${product.id}`}>
                          <h3 className="text-lg font-bold font-display text-[#102A43] group-hover:text-[#2563EB] transition-colors leading-snug">
                            {product.name}
                          </h3>
                        </Link>
                      </div>

                      {/* Brief Summary */}
                      <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                        {product.summary}
                      </p>

                      {/* Specification Tags */}
                      <div className="space-y-1.5 mb-4 text-xs">
                        <div className="flex items-center justify-between text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded font-mono text-[11px]">
                          <span className="text-slate-400">Material:</span>
                          <span className="font-semibold text-slate-800 truncate ml-2">
                            {product.categorySlug === 'hdpe-drums'
                              ? 'Prime HDPE'
                              : product.categorySlug === 'fiber-drums'
                              ? 'Kraft Paperboard'
                              : 'Spiral Paperboard'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded font-mono text-[11px]">
                          <span className="text-slate-400">Closure:</span>
                          <span className="font-semibold text-slate-800 truncate ml-2">
                            {product.closure.split(' ')[0]} {product.closure.split(' ')[1] || ''}
                          </span>
                        </div>
                      </div>

                      {/* Key Highlights */}
                      <ul className="space-y-1.5 mb-5 text-xs text-slate-700">
                        {product.features.slice(0, 2).map((feat, idx) => (
                          <li key={idx} className="flex items-start space-x-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                      <Link
                        to={`/product/${product.id}`}
                        className="flex-1 inline-flex items-center justify-center space-x-1.5 bg-[#102A43] hover:bg-[#2563EB] text-white py-2.5 px-3 rounded-md text-xs font-semibold tracking-wide transition-all shadow-xs"
                      >
                        <span>View Details & TDS</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => onRequestQuote(product.name)}
                        className="inline-flex items-center justify-center bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#2563EB] py-2.5 px-3 rounded-md text-xs font-semibold tracking-wide border border-slate-200 hover:border-blue-200 transition-all cursor-pointer"
                      >
                        <span>Quote</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Alternative Table View (if user toggles to table) */}
      {viewMode === 'table' && specifications && (
        <SpecTable
          title={title}
          subtitle={subtitle}
          specifications={specifications}
          onRequestQuoteWithSpec={(spec) => onRequestQuote(`${title} - ${spec}`)}
          showThumbnail={true}
        />
      )}
    </div>
  );
};
