
import React from 'react';
import { HashRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CalculatorPage from './pages/CalculatorPage';
import ContactPage from './pages/ContactPage';
import Analytics from './components/Analytics';

const HomeHandler: React.FC = () => {
  // Directly render HomePage to avoid programmatic redirects (Navigate) 
  // which can trigger "Location.assign: Access denied" in some sandboxed environments.
  return <HomePage />;
};

function App() {
  // Detect if we are in a restricted blob environment (common in some sandboxes/previews)
  // MemoryRouter is used as a fallback because HashRouter/BrowserRouter might trigger 
  // Location.assign errors when trying to sync with the browser address bar.
  const isBlobEnvironment = typeof window !== 'undefined' && window.location.protocol === 'blob:';
  
  const Router = isBlobEnvironment ? MemoryRouter : HashRouter;

  return (
    <LanguageProvider>
      <Router>
        <Analytics />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeHandler />} />
            {/* Turkish routes (default) */}
            <Route path="/urunler/:categorySlug" element={<ProductListPage />} />
            <Route path="/urun/:sku" element={<ProductDetailPage />} />
            <Route path="/hesaplayici" element={<CalculatorPage />} />
            <Route path="/iletisim" element={<ContactPage />} />
            
            {/* English routes */}
            <Route path="/en" element={<HomePage />} />
            <Route path="/en/products/:categorySlug" element={<ProductListPage />} />
            <Route path="/en/product/:sku" element={<ProductDetailPage />} />
            <Route path="/en/calculator" element={<ProductDetailPage />} />
            <Route path="/en/contact" element={<ContactPage />} />
            
            {/* Arabic routes */}
            <Route path="/ar" element={<HomePage />} />
            <Route path="/ar/products/:categorySlug" element={<ProductListPage />} />
            <Route path="/ar/product/:sku" element={<ProductDetailPage />} />
            <Route path="/ar/calculator" element={<ProductDetailPage />} />
            <Route path="/ar/contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
