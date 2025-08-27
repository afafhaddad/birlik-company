
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { products } from '../data/products';
import { Product, ProductCategory } from '../types';
import { translations } from '../constants';
import ProductCard from '../components/ProductCard';
import BackButton from '../components/BackButton';

const ProductListPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { language, t } = useLanguage();

  const category = categorySlug as ProductCategory;
  const filteredProducts = products.filter(p => p.Category === category);
  const categoryName = translations[language][category] || 'Category';
  
  useEffect(() => {
    if (categoryName) {
      const title = `${categoryName} | Birlik Company`;
      const description = `${t('exploreProducts')} ${categoryName}. High-quality, durable, and aesthetic solutions for interior design.`;
      const canonicalUrl = window.location.href;

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
      <BackButton />
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-birlik-primary">{categoryName}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.SKU} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
