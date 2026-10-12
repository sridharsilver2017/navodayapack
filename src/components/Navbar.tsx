import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MapPin, ChevronDown, Menu, X, ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface NavbarProps {
  onRequestQuote: (preselectedProduct?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRequestQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    {
      label: 'Products',
      isDropdown: true,
      children: [
        {
          name: 'All Products Catalog',
          path: '/products',
          description: 'Explore all 25 manufactured packaging specifications in a visual grid',
          badge: 'All 25 Models',
        },
        {
          name: 'HDPE Drums',
          path: '/hdpe-drums',
          description: '6L to 120L Thermoplastic drums for bulk chemicals & APIs',
          badge: '6L - 120L',
        },
        {
          name: 'Fibre Drums',
          path: '/fiber-drums',
          description: 'Eco-friendly kraft paperboard drums (10" to 20" Dia)',
          badge: '10" - 20" Dia',
        },
        {
          name: 'Composite Containers',
          path: '/composite-containers',
          description: 'Rigid 75mm cylindrical containers with custom heights',
          badge: '75mm Dia',
        },
      ],
    },
    { label: 'Contact Us', path: '/contact-us' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-200">
      {/* Top Utility Bar - Verified Info Only */}
      <div className="bg-[#0B1D2F] text-slate-300 text-xs border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Plant: Kazipally IDA, Hyderabad, Telangana</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-300">Trusted by Leading Pharma Enterprises</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="tel:+919348851166"
              className="flex items-center space-x-1.5 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="font-medium">+91 93488 51166</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="tel:+919348451166"
              className="flex items-center space-x-1.5 text-slate-200 hover:text-white transition-colors"
            >
              <span>Factory: +91 93484 51166</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="mailto:info@navodayapack.in"
              className="flex items-center space-x-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>{COMPANY_INFO.salesEmail}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full bg-[#102A43] text-white border-b border-slate-800 transition-shadow ${
          scrolled ? 'shadow-xl' : 'shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center space-x-3.5 group">
            <div className="bg-white p-1.5 rounded border border-slate-200/20 shadow-sm flex items-center justify-center h-12 w-12 shrink-0">
              <img
                src="/images/NPI_New_Trans.png"
                alt="Navodaya Packing Industries Logo"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  // Fallback in case of asset rendering issue
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-xl font-bold tracking-tight font-display text-white group-hover:text-blue-300 transition-colors">
                NAVODAYA PACK
              </span>
              <span className="text-[8.5px] sm:text-[10px] tracking-tight sm:tracking-wider uppercase text-slate-400 font-mono whitespace-nowrap">
                Packing Industries India Pvt Ltd
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              if (link.isDropdown && link.children) {
                const isProductsActive =
                  location.pathname === '/products' ||
                  location.pathname === '/hdpe-drums' ||
                  location.pathname === '/fiber-drums' ||
                  location.pathname === '/composite-containers' ||
                  location.pathname.startsWith('/product/');

                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setProductsDropdownOpen(true)}
                    onMouseLeave={() => setProductsDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                      className={`flex items-center space-x-1.5 px-3 py-2 rounded text-sm font-semibold tracking-wide transition-colors ${
                        isProductsActive
                          ? 'text-white bg-slate-800/80'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                      }`}
                      aria-expanded={productsDropdownOpen}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          productsDropdownOpen ? 'rotate-180 text-blue-400' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {productsDropdownOpen && (
                      <div className="absolute top-full left-0 w-80 pt-2 z-50">
                        <div className="bg-[#0B1D2F] border border-slate-700/80 rounded-lg shadow-2xl p-2.5 backdrop-blur-md">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-800 mb-1">
                            Industrial Packaging Portfolio
                          </div>
                          {link.children.map((child) => {
                            const isCurrent = location.pathname === child.path;
                            return (
                              <Link
                                key={child.name}
                                to={child.path}
                                className={`block p-3 rounded-md transition-all ${
                                  isCurrent
                                    ? 'bg-[#2563EB] text-white shadow-md'
                                    : 'hover:bg-slate-800/80 text-slate-200 hover:text-white'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-semibold text-sm">{child.name}</span>
                                  <span
                                    className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                                      isCurrent
                                        ? 'bg-blue-900 text-white'
                                        : 'bg-slate-800 text-blue-400 border border-blue-900/50'
                                    }`}
                                  >
                                    {child.badge}
                                  </span>
                                </div>
                                <p
                                  className={`text-xs leading-relaxed ${
                                    isCurrent ? 'text-blue-100' : 'text-slate-400'
                                  }`}
                                >
                                  {child.description}
                                </p>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path!}
                  className={`px-3 py-2 rounded text-sm font-semibold tracking-wide transition-colors ${
                    isActive
                      ? 'text-white bg-slate-800/80 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Action */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => onRequestQuote()}
              className="inline-flex items-center space-x-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2.5 rounded font-semibold text-sm tracking-wide transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => onRequestQuote()}
              className="bg-[#2563EB] text-white px-3 py-1.5 rounded text-xs font-semibold"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B1D2F] border-b border-slate-800 px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2.5 rounded text-base font-semibold ${
                location.pathname === '/' ? 'bg-[#2563EB] text-white' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              Home
            </Link>

            <div className="pt-2 pb-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-3 mb-1">
                Products
              </div>
              <Link
                to="/hdpe-drums"
                className={`block px-4 py-2 rounded text-sm font-medium ${
                  location.pathname === '/hdpe-drums'
                    ? 'bg-[#2563EB] text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                HDPE Drums (6L - 120L)
              </Link>
              <Link
                to="/fiber-drums"
                className={`block px-4 py-2 rounded text-sm font-medium ${
                  location.pathname === '/fiber-drums'
                    ? 'bg-[#2563EB] text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                Fibre Drums (10" - 20" Dia)
              </Link>
              <Link
                to="/composite-containers"
                className={`block px-4 py-2 rounded text-sm font-medium ${
                  location.pathname === '/composite-containers'
                    ? 'bg-[#2563EB] text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                Composite Containers (75mm Dia)
              </Link>
            </div>

            <Link
              to="/contact-us"
              className={`block px-3 py-2.5 rounded text-base font-semibold ${
                location.pathname === '/contact-us'
                  ? 'bg-[#2563EB] text-white'
                  : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              Contact Us
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="text-xs text-slate-300 flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
              <a href="tel:+919348851166" className="text-white font-medium">
                +91 93488 51166
              </a>
              <span className="text-slate-600">/</span>
              <a href="tel:+919348451166" className="text-white font-medium">
                +91 93484 51166
              </a>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="w-full flex items-center justify-center space-x-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-3 rounded font-semibold text-sm"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
