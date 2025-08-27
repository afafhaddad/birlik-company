
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { products } from '../data/products';
import { COMPANY_INFO } from '../constants';
import BackButton from '../components/BackButton';
import ProductCalculator from '../components/ProductCalculator';

const ProductDetailPage: React.FC = () => {
  const { sku } = useParams<{ sku: string }>();
  const { language, t } = useLanguage();
  const product = products.find(p => p.SKU === sku);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const getProductName = (p = product) => {
    if (!p) return '';
    if (language === 'en') return p.Name_EN;
    if (language === 'ar') return p.Name_AR;
    return p.Name_TR;
  };
  
  const getProductDesc = (p = product) => {
    if (!p) return '';
    if (language === 'en') return p.Short_Desc_EN;
    if (language === 'ar') return p.Short_Desc_AR;
    return p.Short_Desc_TR;
  };
  
  const getCategoryLink = (p = product) => {
    if (!p) return '/';
    const categorySlug = p.Category;
    switch (language) {
      case 'en': return `/en/products/${categorySlug}`;
      case 'ar': return `/ar/products/${categorySlug}`;
      default: return `/urunler/${categorySlug}`;
    }
  };
  
  useEffect(() => {
    if (product) {
        const productName = getProductName(product);
        const productDesc = getProductDesc(product);
        const canonicalUrl = window.location.href;

        document.title = `${productName} | Birlik Company`;
        document.querySelector('meta[name="description"]')?.setAttribute('content', productDesc);

        const existingCanonical = document.querySelector('link[rel="canonical"]');
        if (existingCanonical) {
            existingCanonical.setAttribute('href', canonicalUrl);
        } else {
            const link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            link.setAttribute('href', canonicalUrl);
            document.head.appendChild(link);
        }
        
        // JSON-LD Schema
        const homePath = language === 'tr' ? '' : `/${language}`;
        const homeUrl = `${window.location.origin}/#${homePath}`;
        const categoryUrl = `${window.location.origin}/#${getCategoryLink(product)}`;

        const schema = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Product",
                    "name": productName,
                    "sku": product.SKU,
                    "image": product.images,
                    "description": productDesc,
                    "brand": {
                        "@type": "Brand",
                        "name": "Birlik Company"
                    },
                    "offers": {
                        "@type": "Offer",
                        "url": window.location.href,
                        "priceCurrency": "TRY",
                        "availability": product.Stock_Status === 'in_stock' ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
                        "seller": {
                            "@type": "Organization",
                            "name": "Birlik Company"
                        }
                    }
                },
                {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": t('home'), "item": homeUrl },
                        { "@type": "ListItem", "position": 2, "name": t(product.Category), "item": categoryUrl },
                        { "@type": "ListItem", "position": 3, "name": productName, "item": canonicalUrl }
                    ]
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
  }, [product, language, t, sku]);
  
  if (!product) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/" className="text-birlik-primary hover:underline mt-4 inline-block">
          {t('home')}
        </Link>
      </div>
    );
  }

  const generateWhatsAppLink = () => {
    let message = '';
    const pageUrl = window.location.href;
    if (language === 'en') {
      message = `Hello Birlik, I'm interested in: ${product.Name_EN} (SKU: ${product.SKU}) - ${pageUrl}`;
    } else if (language === 'ar') {
      message = `مرحباً بيرليك، أنا مهتم بالمنتج: ${product.Name_AR} (SKU: ${product.SKU}) - ${pageUrl}`;
    } else {
      message = `Merhaba Birlik, şu ürünle ilgiliyorum: ${product.Name_TR} (SKU: ${product.SKU}) - ${pageUrl}`;
    }
    return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };
  
  const handlePrevImage = () => {
    setCurrentImageIndex(prev => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => (prev === product.images.length - 1 ? 0 : prev + 1));
  };


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BackButton to={getCategoryLink()} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Gallery */}
        <div className="w-full">
            <div className="relative aspect-square bg-gray-200 rounded-lg shadow-lg overflow-hidden group">
                <img 
                    src={product.images[currentImageIndex]} 
                    alt={`${getProductName()} ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    key={product.images[currentImageIndex]}
                />
                {product.images.length > 1 && (
                    <>
                        <button 
                            onClick={handlePrevImage}
                            className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white/60 p-2 rounded-full text-birlik-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                            aria-label="Previous image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                         <button 
                            onClick={handleNextImage}
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white/60 p-2 rounded-full text-birlik-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                            aria-label="Next image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </>
                )}
            </div>
            {product.images.length > 1 && (
                <div className="mt-4 grid grid-cols-5 gap-2">
                    {product.images.slice(0, 5).map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`aspect-square rounded-md overflow-hidden border-2 transition-all duration-200 ${currentImageIndex === index ? 'border-birlik-primary shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                            <img src={image} alt={`Thumbnail ${getProductName()} ${index + 1}`} className="w-full h-full object-cover"/>
                        </button>
                    ))}
                </div>
            )}
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-birlik-primary">{getProductName()}</h1>
          <p className="text-md text-gray-500 mt-2">SKU: {product.SKU}</p>
          <p className="mt-4 text-lg text-birlik-neutral-charcoal">{getProductDesc()}</p>
          
          <div className="mt-6 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">{t('productDetails')}</h2>
            <ul className="space-y-2 text-gray-700">
                <li><strong>{t('material')}:</strong> {product.Material}</li>
                {product.Width_cm && <li><strong>{t('width')}:</strong> {product.Width_cm} cm</li>}
                {product.Height_or_Length_cm && <li><strong>{t('heightLength')}:</strong> {product.Height_or_Length_cm} cm</li>}
                {product.Thickness_cm && <li><strong>{t('thickness')}:</strong> {product.Thickness_cm} cm</li>}
                {product.Thickness_mm && <li><strong>{t('thickness')}:</strong> {product.Thickness_mm} mm</li>}
                {product.Pack_Size && <li><strong>{t('packSize')}:</strong> {product.Pack_Size} {t('unitPieces')}</li>}
                <li><strong>{t('surface')}:</strong> {t(product.Surface_Finish)}</li>
            </ul>
          </div>

          <div className="mt-8">
            <a 
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors duration-200 shadow"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-3"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.12c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.82-1.26-4.38 0-4.54 3.68-8.22 8.22-8.22 2.22 0 4.29.86 5.81 2.38 1.52 1.52 2.38 3.59 2.38 5.82-.01 4.54-3.69 8.22-8.23 8.22zm4.32-5.11c-.24-.12-1.42-.7-1.64-.78-.23-.08-.39-.12-.56.12-.17.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2s-1.5-1.74-1.68-2.04-.03-.28.09-.39c.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.32-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.55-.42-.15 0-.31-.02-.48-.02s-.43.06-.66.3c-.22.24-.86.84-.86 2.07s.88 2.4 1 2.56c.12.16 1.73 2.64 4.2 3.72 2.46 1.08 2.46.72 2.9.7.44-.02 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.11-.22-.18-.46-.3z"/></svg>
              {t('getQuoteOnWhatsApp')}
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <ProductCalculator product={product} />
      </div>

    </div>
  );
};

export default ProductDetailPage;
