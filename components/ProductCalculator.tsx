
import React from 'react';
import { Product, ProductCategory } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
    FlutedPanelCalculator, 
    MarbleSheetCalculator, 
    BaseboardCalculator, 
    MoldingCalculator,
    MotifInfo
} from './calculators';


interface ProductCalculatorProps {
  product: Product;
}

const ProductCalculator: React.FC<ProductCalculatorProps> = ({ product }) => {
  const { t } = useLanguage();

  const renderCalculator = () => {
    switch (product.Category) {
      case ProductCategory.PS_FLUTED:
        return <FlutedPanelCalculator product={product} />;
      case ProductCategory.PVC_UV_MARBLE:
        return <MarbleSheetCalculator product={product} />;
      case ProductCategory.PS_BASEBOARD:
        return <BaseboardCalculator product={product} />;
      case ProductCategory.PS_MOLDING:
        return <MoldingCalculator product={product} />;
       case ProductCategory.PU_MOTIF:
        return <MotifInfo product={product} />;
      default:
        return null;
    }
  };
  
  const calculatorComponent = renderCalculator();

  if (!calculatorComponent) {
    return null;
  }

  return (
    <div>
        <h2 className="text-2xl font-bold text-birlik-primary mb-6">{t('quantityCalculator')}</h2>
        {calculatorComponent}
    </div>
  );
};

export default ProductCalculator;
