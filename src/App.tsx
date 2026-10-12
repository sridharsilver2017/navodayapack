import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';
import ScrollToTop from './components/ScrollToTop';

import { Home } from './pages/Home';
import { HdpeDrums } from './pages/HdpeDrums';
import { FiberDrums } from './pages/FiberDrums';
import { CompositeContainers } from './pages/CompositeContainers';
import { ContactUs } from './pages/ContactUs';
import { ProductDetailView } from './pages/ProductDetailView';
import { ProductsCatalog } from './pages/ProductsCatalog';
import { INDIVIDUAL_PRODUCTS } from './data/individualProducts';

// Dynamic document title and meta description manager
const PageMetadataManager: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/product/')) {
      const prodId = location.pathname.replace('/product/', '');
      const item = INDIVIDUAL_PRODUCTS.find((p) => p.id === prodId);
      if (item) {
        document.title = `${item.name} — Navodaya Pack | Industrial Specifications`;
        return;
      }
    }

    switch (location.pathname) {
      case '/':
        document.title = 'Navodaya Pack — Industrial Packaging Solutions | HDPE & Fibre Drums';
        break;
      case '/products':
        document.title = 'Product Catalog (All 25 Models) — Navodaya Pack | HDPE, Fibre & Containers';
        break;
      case '/hdpe-drums':
        document.title = 'HDPE Drums (6L to 120L) — Navodaya Pack | Chemical & Industrial Packaging';
        break;
      case '/fiber-drums':
        document.title = 'Fibre Drums (10" to 20" Dia) — Navodaya Pack | Kraft Paperboard Drums';
        break;
      case '/composite-containers':
        document.title = 'Composite Containers (75mm Dia) — Navodaya Pack | Rigid Canisters';
        break;
      case '/contact-us':
        document.title = 'Contact Navodaya Pack — Hyderabad & Kazipally IDA Plant Facilities';
        break;
      default:
        document.title = 'Navodaya Pack — Industrial Packaging Solutions';
    }
  }, [location.pathname]);

  return null;
};

export const AppContent: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(undefined);

  const handleOpenQuote = (productName?: string) => {
    setSelectedProduct(productName);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteModalOpen(false);
    setSelectedProduct(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5F9] text-[#171C24] font-sans">
      <ScrollToTop />
      <PageMetadataManager />

      <Navbar onRequestQuote={handleOpenQuote} />

      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home onRequestQuote={handleOpenQuote} />} />
          <Route path="/products" element={<ProductsCatalog onRequestQuote={handleOpenQuote} />} />
          <Route path="/hdpe-drums" element={<HdpeDrums onRequestQuote={handleOpenQuote} />} />
          <Route path="/fiber-drums" element={<FiberDrums onRequestQuote={handleOpenQuote} />} />
          <Route path="/composite-containers" element={<CompositeContainers onRequestQuote={handleOpenQuote} />} />
          <Route path="/product/:productId" element={<ProductDetailView onRequestQuote={handleOpenQuote} />} />
          <Route path="/contact-us" element={<ContactUs />} />
          {/* Fallback route */}
          <Route path="*" element={<Home onRequestQuote={handleOpenQuote} />} />
        </Routes>
      </main>

      <Footer onRequestQuote={() => handleOpenQuote()} />

      <EnquiryModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuote}
        preselectedProduct={selectedProduct}
      />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
