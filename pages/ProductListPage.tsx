
import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { products } from '../data/products';
import { Product, ProductCategory, StockStatus } from '../types';
import { translations } from '../constants';
import ProductCard from '../components/ProductCard';
import Breadcrumbs from '../components/Breadcrumbs';

const ProductListPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { language, t } = useLanguage();

  const category = categorySlug as ProductCategory;
  
  // Sort products based on priority:
  // 1. isNew (true first)
  // 2. Stock_Status (IN_STOCK > MADE_TO_ORDER > OUT_OF_STOCK)
  const sortedProducts = useMemo(() => {
    const filtered = products.filter(p => p.Category === category);
    
    return [...filtered].sort((a, b) => {
        // First priority: isNew
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;

        // Second priority: Stock Status
        const statusPriority: Record<StockStatus, number> = {
            [StockStatus.IN_STOCK]: 0,
            [StockStatus.MADE_TO_ORDER]: 1,
            [StockStatus.OUT_OF_STOCK]: 2,
        };

        return statusPriority[a.Stock_Status] - statusPriority[b.Stock_Status];
    });
  }, [category]);

  const categoryName = translations[language][category] || 'Category';
  
  useEffect(() => {
    if (categoryName) {
      let title: string;
      let description: string;
      const canonicalUrl = window.location.href;
      
      switch(language) {
          case 'en':
              title = `${categoryName} for Sale in Mersin, Turkey | Birlik Company`;
              description = `Explore the best ${categoryName} in Mersin, Turkey. Birlik Company offers modern, durable, and aesthetic solutions for your interior design needs.`;
              break;
          case 'ar':
              title = `أسعار ${categoryName} في مرسين، تركيا | شركة بيرليك`;
              description = `اكتشف أفضل أنواع ${categoryName} في مرسين، تركيا. تقدم شركة بيرليك حلولاً عصرية ومتينة وجمالية لتلبية احتياجات التصميم الداخلي لديك.`;
              break;
          default: // tr
              title = `${categoryName} Fiyatları Mersin, Türkiye | Birlik Company`;
              description = `Mersin, Türkiye'deki en iyi ${categoryName} çeşitlerini keşfedin. Birlik Company, modern ve dayanıklı dekorasyon çözümleri sunar.`;
              break;
      }


      document.title = title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
      
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical) {
        existingCanonical.setAttribute('href', canonicalUrl);
      } else {
        const link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', canonicalUrl);
        document.head.appendChild(link);
      }
      
      // JSON-LD for Breadcrumbs
      const homePath = language === 'tr' ? '' : `/${language}`;
      const homeUrl = `${window.location.origin}/#${homePath}`;

      const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": t('home'),
                "item": homeUrl
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": categoryName,
                "item": canonicalUrl
            }
        ]
      };
      
      const scriptId = 'json-ld-schema';
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (!script) {
          script = document.createElement('script');
          script.id = scriptId;
          script.type = 'application/ld+json';
          document.head.appendChild(script);
      }
      script.innerHTML = JSON.stringify(schema);
    }
  }, [categoryName, language, t, categorySlug]);

  if (!category || !Object.values(ProductCategory).includes(category)) {
      return <div className="text-center py-10">Invalid Category</div>
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs />
      <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-birlik-primary">{categoryName}</h1>
            <p className="text-gray-500 mt-2">{t('exploreProducts')}</p>
          </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map(product => (
          <ProductCard key={product.SKU} product={product} />
        ))}
      </div>
      
      {sortedProducts.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-400">{t('noResults') || 'No products found in this category.'}</p>
          </div>
      )}
    </div>
  );
};

export default ProductListPage;
