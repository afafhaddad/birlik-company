
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Product } from '../types';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { language } = useLanguage();
  
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
    <Link to={getLink()} className="group bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-200 ease-birlik-ease flex flex-col">
      <div className="w-full h-48 bg-gray-200">
        <img 
          src={product.images[0]} 
          alt={getProductName()} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
            <h3 className="text-md font-semibold text-birlik-neutral-charcoal truncate">{getProductName()}</h3>
            {product.Series && (
                <span className="text-xs bg-birlik-accent-sand text-birlik-primary font-medium px-2 py-0.5 rounded-full mt-1 inline-block capitalize">
                    {product.Series}
                </span>
            )}
        </div>
        <p className="text-sm text-gray-500 mt-2">SKU: {product.SKU}</p>
      </div>
    </Link>
  );
};

export default ProductCard;