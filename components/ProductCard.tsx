
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Product, StockStatus } from '../types';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { language, t } = useLanguage();
  const isSoldOut = product.Stock_Status === StockStatus.OUT_OF_STOCK;
  
  const getProductName = () => {
    if (language === 'en') return product.Name_EN;
    if (language === 'ar') return product.Name_AR;
    return product.Name_TR;
  };
  
  const getLink = () => {
    switch(language) {
        case 'en': return `/en/product/${product.SKU}`;
        case 'ar': return `/ar/product/${product.SKU}`;
        default: return `/urun/${product.SKU}`;
    }
  };

  return (
    <Link 
      to={getLink()} 
      className={`group bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-200 ease-birlik-ease flex flex-col relative ${isSoldOut ? 'opacity-60 grayscale-[0.5]' : ''}`}
    >
      {/* Badges Container */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.isNew && (
            <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
                {t('newLabel')}
            </span>
        )}
        {isSoldOut && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
                {t('soldOut')}
            </span>
        )}
      </div>

      <div className="w-full h-48 bg-gray-200 relative overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={getProductName()} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isSoldOut && (
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                 <span className="bg-white/90 text-red-600 font-bold px-4 py-1 rounded-full text-sm shadow-md border border-red-100">
                    {t('soldOut')}
                 </span>
            </div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
            <h3 className={`text-md font-semibold text-birlik-neutral-charcoal truncate ${isSoldOut ? 'text-gray-400' : ''}`}>
                {getProductName()}
            </h3>
            <div className="flex gap-2 mt-1 flex-wrap">
                {product.Series && (
                    <span className="text-[10px] bg-birlik-accent-sand text-birlik-primary font-medium px-2 py-0.5 rounded-full capitalize">
                        {product.Series}
                    </span>
                )}
                 {product.Stock_Status === StockStatus.IN_STOCK && !isSoldOut && (
                    <span className="text-[10px] bg-green-100 text-green-700 font-medium px-2 py-0.5 rounded-full uppercase">
                        {t('in_stock') || 'IN STOCK'}
                    </span>
                )}
            </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">SKU: {product.SKU}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
