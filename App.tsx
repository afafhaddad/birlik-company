
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CalculatorPage from './pages/CalculatorPage';
import ContactPage from './pages/ContactPage';

const HomeHandler: React.FC = () => {
  const { language } = useLanguage();

  if (language === 'en') {
    return <Navigate to="/en" replace />;
  }
  if (language === 'ar') {
    return <Navigate to="/ar" replace />;
  }
  return <HomePage />;
};

function App() {
  return (
    <LanguageProvider>
      <HashRouter>
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
            <Route path="/en/calculator" element={<CalculatorPage />} />
            <Route path="/en/contact" element={<ContactPage />} />
            
            {/* Arabic routes */}
            <Route path="/ar" element={<HomePage />} />
            <Route path="/ar/products/:categorySlug" element={<ProductListPage />} />
            <Route path="/ar/product/:sku" element={<ProductDetailPage />} />
            <Route path="/ar/calculator" element={<CalculatorPage />} />
            <Route path="/ar/contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </LanguageProvider>
  );
}

export default App;
