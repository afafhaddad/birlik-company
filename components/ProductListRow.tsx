
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Product, StockStatus } from '../types';

interface ProductListRowProps {
  product: Product;
}

const ProductListRow: React.FC<ProductListRowProps> = ({ product }) => {
  const { language, t, dir } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const isSoldOut = product.Stock_Status === StockStatus.OUT_OF_STOCK;
  const isRtl = dir === 'rtl';

  const getProductName = () => {
    if (language === 'en') return product.Name_EN;
    if (language === 'ar') return product.Name_AR;
    return product.Name_TR;
  };

  const getProductDesc = () => {
    if (language === 'en') return product.Short_Desc_EN;
    if (language === 'ar') return product.Short_Desc_AR;
    return product.Short_Desc_TR;
  };

  const getLink = () => {
    switch (language) {
      case 'en': return `/en/product/${product.SKU}`;
      case 'ar': return `/ar/product/${product.SKU}`;
      default: return `/urun/${product.SKU}`;
    }
  };

  return (
    <div className={`group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-100 mb-8 flex flex-col lg:flex-row ${isSoldOut ? 'opacity-50 grayscale-[0.6]' : 'hover:shadow-2xl hover:-translate-y-1'}`}>
      
      {/* Image Section / Carousel */}
      <div className="lg:w-1/2 relative overflow-hidden bg-gray-100">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-square">
          <img 
            src={product.images[activeImageIndex]} 
            alt={getProductName()} 
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          
          {/* Status Badges */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-widest">
                {t('newLabel')}
              </span>
            )}
            {isSoldOut && (
              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-widest">
                {t('soldOut')}
              </span>
            )}
          </div>
          
          {isSoldOut && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
               <span className="bg-white/90 text-red-600 font-black px-6 py-2 rounded-full text-lg shadow-2xl border-2 border-red-600 transform -rotate-6">
                 {t('soldOut')}
               </span>
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 overflow-x-auto max-w-[90%] no-scrollbar p-1">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveImageIndex(idx);
                }}
                className={`w-12 h-12 rounded-md border-2 overflow-hidden flex-shrink-0 transition-all ${activeImageIndex === idx ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-70'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center">
        <div className="mb-4">
          <span className="text-sm font-bold text-birlik-primary/60 tracking-widest uppercase">
            {t(product.Category)}
          </span>
          <h2 className={`text-2xl lg:text-4xl font-bold mt-1 ${isSoldOut ? 'text-gray-400' : 'text-birlik-neutral-charcoal'}`}>
            {getProductName()}
          </h2>
          <p className="text-sm text-gray-400 font-mono mt-1 uppercase tracking-tighter">SKU: {product.SKU}</p>
        </div>

        <p className={`text-base lg:text-lg mb-8 leading-relaxed ${isSoldOut ? 'text-gray-300' : 'text-gray-600'}`}>
          {getProductDesc()}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
           <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-[10px] text-gray-400 uppercase font-bold">{t('material')}</p>
              <p className="text-sm font-semibold text-birlik-primary">{product.Material}</p>
           </div>
           {product.Width_cm && (
            <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-[10px] text-gray-400 uppercase font-bold">{t('width')}</p>
                <p className="text-sm font-semibold text-birlik-primary">{product.Width_cm} cm</p>
            </div>
           )}
           {product.Height_or_Length_cm && (
            <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-[10px] text-gray-400 uppercase font-bold">{t('heightLength')}</p>
                <p className="text-sm font-semibold text-birlik-primary">{product.Height_or_Length_cm} cm</p>
            </div>
           )}
           <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-[10px] text-gray-400 uppercase font-bold">{t('surface')}</p>
              <p className="text-sm font-semibold text-birlik-primary">{t(product.Surface_Finish)}</p>
           </div>
        </div>

        <Link 
          to={getLink()} 
          className={`inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg transition-all shadow-md group ${isSoldOut ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-birlik-primary text-white hover:bg-birlik-neutral-charcoal hover:shadow-xl'}`}
        >
          {isSoldOut ? t('soldOut') : t('viewProducts')}
          {!isSoldOut && (
             <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ml-2 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
             </svg>
          )}
        </Link>
      </div>
    </div>
  );
};

export default ProductListRow;
