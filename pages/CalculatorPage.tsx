
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ProductCategory, Product } from '../types';
import { products } from '../data/products';
import { COMPANY_INFO } from '../constants';
import { FlutedPanelCalculator, MarbleSheetCalculator, BaseboardCalculator, MoldingCalculator } from '../components/calculators';

interface ProjectItem {
  id: number;
  name: string;
  sku: string;
  width: string;
  height: string;
  length: string; // For baseboards
}

const quickCalcCategories: ProductCategory[] = [
  ProductCategory.PS_FLUTED,
  ProductCategory.PVC_UV_MARBLE,
  ProductCategory.PS_BASEBOARD,
  ProductCategory.PS_MOLDING,
];

// Custom Product Select Component with Thumbnails
interface ProductSelectProps {
  value: string;
  onChange: (sku: string) => void;
  groupedProducts: Record<ProductCategory, Product[]>;
  placeholder: string;
  getProductName: (product: Product) => string;
  t: (key: string) => string;
}

const ProductSelect: React.FC<ProductSelectProps> = ({ value, onChange, groupedProducts, placeholder, getProductName, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedProduct = useMemo(() => products.find(p => p.SKU === value), [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const filteredProducts = useMemo(() => {
      if (!searchTerm) {
          return groupedProducts;
      }
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered: Record<string, Product[]> = {};

      for (const category in groupedProducts) {
          const matchingProducts = groupedProducts[category as ProductCategory].filter(
              product => getProductName(product).toLowerCase().includes(lowercasedTerm) || product.SKU.toLowerCase().includes(lowercasedTerm)
          );
          if (matchingProducts.length > 0) {
              filtered[category as ProductCategory] = matchingProducts;
          }
      }
      return filtered;
  }, [searchTerm, groupedProducts, getProductName]);

  const handleSelect = (sku: string) => {
    onChange(sku);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative mt-2" ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 border border-gray-300 rounded-md bg-white text-left flex items-center justify-between"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedProduct ? (
          <div className="flex items-center gap-2 overflow-hidden">
            <img src={selectedProduct.images[0]} alt={getProductName(selectedProduct)} className="w-8 h-8 object-cover rounded flex-shrink-0" />
            <span className="text-sm truncate">{getProductName(selectedProduct)}</span>
          </div>
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder={t('searchProducts')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              autoFocus
            />
          </div>
          <ul className="max-h-60 overflow-y-auto" role="listbox">
            {Object.keys(filteredProducts).length > 0 ? Object.entries(filteredProducts).map(([category, productList]) => (
              <li key={category}>
                <div className="px-3 py-1 font-bold text-xs text-gray-500 bg-gray-100 sticky top-0">{t(category)}</div>
                <ul>
                  {productList.map(product => (
                    <li key={product.SKU} role="option" aria-selected={value === product.SKU}>
                      <button
                        type="button"
                        onClick={() => handleSelect(product.SKU)}
                        className="w-full text-left p-2 hover:bg-birlik-accent-sand/50 flex items-center gap-2"
                      >
                        <img src={product.images[0]} alt={getProductName(product)} className="w-8 h-8 object-cover rounded flex-shrink-0" />
                        <span className="text-sm">{getProductName(product)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            )) : <li className="p-3 text-sm text-gray-500 text-center">{t('noResults')}</li>}
          </ul>
        </div>
      )}
    </div>
  );
};


const CalculatorPage: React.FC = () => {
  const { t, language } = useLanguage();

  // State for Quick Calculators
  const [activeTab, setActiveTab] = useState<ProductCategory>(ProductCategory.PS_FLUTED);
  
  // State for Project Calculator
  const [items, setItems] = useState<ProjectItem[]>([]);

  useEffect(() => {
    const title = `${t('calculator')} | Birlik Company`;
    const description = t('calculatorIntro');
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
    
    // Remove schema script if it exists from other pages
    const scriptOnExit = document.getElementById('json-ld-schema');
    if (scriptOnExit) {
        scriptOnExit.remove();
    }

  }, [language, t]);

  const getProductName = (product: Product) => {
    if (language === 'en') return product.Name_EN;
    if (language === 'ar') return product.Name_AR;
    return product.Name_TR;
  };
  
  const handleAddItem = () => {
    const newItem: ProjectItem = {
      id: Date.now(),
      name: '',
      sku: '',
      width: '',
      height: '',
      length: '',
    };
    setItems(prevItems => [...prevItems, newItem]);
  };
  
  const handleRemoveItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const handleItemChange = (id: number, field: keyof ProjectItem, value: string) => {
    setItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, [field]: value } : item))
    );
  };
  
  const groupedProducts = useMemo(() => {
    return products.reduce((acc, product) => {
      if (product.Category === ProductCategory.PU_MOTIF) return acc;
      if (!acc[product.Category]) {
        acc[product.Category] = [];
      }
      acc[product.Category].push(product);
      return acc;
    }, {} as Record<ProductCategory, Product[]>);
  }, []);

  const calculateResultForItem = (item: ProjectItem): { required: number, unit: string } => {
    const product = products.find(p => p.SKU === item.sku);
    if (!product) return { required: 0, unit: t('unitPieces') };

    const width = parseFloat(item.width);
    const height = parseFloat(item.height);
    const length = parseFloat(item.length);
    const unit = product.Category === ProductCategory.PVC_UV_MARBLE ? t('requiredSheets') : t('requiredPieces');

    switch (product.Category) {
      case ProductCategory.PS_FLUTED: {
        const panelWidth = product.Width_cm;
        if (!width || !height || !panelWidth || width <= 0 || height <= 0) return { required: 0, unit };
        return { required: Math.ceil(width / panelWidth), unit };
      }
      case ProductCategory.PVC_UV_MARBLE: {
        const sheetWidth = product.Width_cm;
        const sheetHeight = product.Height_or_Length_cm;
        if (!width || !height || !sheetWidth || !sheetHeight || width <= 0 || height <= 0) return { required: 0, unit };
        const sheetsX = Math.ceil(width / sheetWidth);
        const sheetsY = Math.ceil(height / sheetHeight);
        return { required: sheetsX * sheetsY, unit };
      }
      case ProductCategory.PS_BASEBOARD: {
        const pieceLength = product.Height_or_Length_cm;
        if (!length || !pieceLength || length <= 0) return { required: 0, unit };
        return { required: Math.ceil(length / pieceLength), unit };
      }
      case ProductCategory.PS_MOLDING: {
        const pieceLength = product.Height_or_Length_cm;
        if (!width || !height || !pieceLength || width <= 0 || height <= 0) return { required: 0, unit };
        const perimeter = 2 * (width + height);
        return { required: Math.ceil(perimeter / pieceLength), unit };
      }
      default:
        return { required: 0, unit };
    }
  };
  
  const projectSummary = useMemo(() => {
    const totals: Record<string, { product: Product; quantity: number; unit: string; }> = {};

    items.forEach(item => {
        const product = products.find(p => p.SKU === item.sku);
        if (!product) return;

        const result = calculateResultForItem(item);
        if (result.required > 0) {
            if (totals[item.sku]) {
                totals[item.sku].quantity += result.required;
            } else {
                totals[item.sku] = {
                    product: product,
                    quantity: result.required,
                    unit: result.unit,
                };
            }
        }
    });

    return Object.values(totals);
  }, [items, language, t]);

  const handleSendToWhatsApp = () => {
    if (projectSummary.length === 0) return;

    const intro = t('whatsappProjectQuoteIntro');
    const messageParts = projectSummary.map(({ product, quantity, unit }) => {
        const productName = getProductName(product);
        return `- ${productName} (SKU: ${product.SKU}): ${quantity} ${unit}`;
    });

    const fullMessage = intro + '\n\n' + messageParts.join('\n');
    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };
  
  const renderInputs = (item: ProjectItem) => {
    const product = products.find(p => p.SKU === item.sku);
    if (!product) return null;
    
    const inputClassName = "w-full p-2 border border-gray-300 rounded-md bg-white text-birlik-neutral-charcoal placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-birlik-primary focus:border-transparent";

    switch(product.Category) {
      case ProductCategory.PS_FLUTED:
      case ProductCategory.PVC_UV_MARBLE:
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input type="number" placeholder={t('wallWidth')} value={item.width} onChange={e => handleItemChange(item.id, 'width', e.target.value)} className={inputClassName} />
            <input type="number" placeholder={t('wallHeight')} value={item.height} onChange={e => handleItemChange(item.id, 'height', e.target.value)} className={inputClassName} />
          </div>
        );
      case ProductCategory.PS_BASEBOARD:
        return (
            <div className="mt-4">
                <input type="number" placeholder={t('totalWallLength')} value={item.length} onChange={e => handleItemChange(item.id, 'length', e.target.value)} className={inputClassName} />
            </div>
        );
      case ProductCategory.PS_MOLDING:
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input type="number" placeholder={t('frameWidth')} value={item.width} onChange={e => handleItemChange(item.id, 'width', e.target.value)} className={inputClassName} />
            <input type="number" placeholder={t('frameHeight')} value={item.height} onChange={e => handleItemChange(item.id, 'height', e.target.value)} className={inputClassName} />
          </div>
        );
      default:
        return null;
    }
  };
  
  const renderQuickCalculator = () => {
    switch (activeTab) {
      case ProductCategory.PS_FLUTED:
        return <FlutedPanelCalculator />;
      case ProductCategory.PVC_UV_MARBLE:
        return <MarbleSheetCalculator />;
      case ProductCategory.PS_BASEBOARD:
        return <BaseboardCalculator />;
      case ProductCategory.PS_MOLDING:
        return <MoldingCalculator />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* --- INTRO & QUICK CALCULATORS SECTION --- */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-birlik-primary">
            {t('calculateNeeds')}
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
            {t('calculatorIntro')}
        </p>

        <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center text-birlik-neutral-charcoal">{t('productCalculators')}</h2>
            <div className="flex justify-center border-b border-gray-200 mb-6 flex-wrap">
            {quickCalcCategories.map(cat => (
                <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3 sm:px-4 py-3 -mb-px font-semibold text-sm sm:text-base transition-all duration-200 whitespace-nowrap ${
                    activeTab === cat
                    ? 'border-b-2 border-birlik-primary text-birlik-primary'
                    : 'text-gray-500 hover:text-birlik-primary border-b-2 border-transparent'
                }`}
                >
                {t(cat)}
                </button>
            ))}
            </div>
            <div>
            {renderQuickCalculator()}
            </div>
        </div>


        {/* --- PROJECT CALCULATOR SECTION --- */}
        <div className="border-t-2 border-birlik-accent-sand pt-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-birlik-primary">
                {t('projectCalculatorTitle')}
            </h2>

            <div className="max-w-4xl mx-auto space-y-4 pb-48"> {/* Padding bottom to not be obscured by summary */}
                {items.length === 0 && (
                     <div className="text-center py-8 px-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">{t('noItems')}</p>
                     </div>
                )}
                {items.map((item) => {
                const result = calculateResultForItem(item);
                return (
                    <div key={item.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 transition-all duration-300">
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex-grow">
                          <input type="text" placeholder={t('wallAreaName')} value={item.name} onChange={e => handleItemChange(item.id, 'name', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md font-semibold bg-white text-birlik-neutral-charcoal placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-birlik-primary focus:border-transparent" />
                          <ProductSelect 
                            value={item.sku}
                            onChange={(sku) => handleItemChange(item.id, 'sku', sku)}
                            groupedProducts={groupedProducts}
                            placeholder={t('selectProduct')}
                            getProductName={getProductName}
                            t={t}
                          />
                          {renderInputs(item)}
                        </div>
                        <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors flex-shrink-0 mt-1" aria-label={t('remove')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                    {result.required > 0 && (
                        <div className="mt-4 bg-birlik-accent-sand/50 text-birlik-primary font-bold p-3 rounded-md text-center">
                            {`${t('result')}: ${result.required} ${result.unit}`}
                        </div>
                    )}
                    </div>
                );
                })}

                <button
                onClick={handleAddItem}
                className="w-full bg-birlik-primary text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-birlik-primary/90 transition-all duration-300 ease-birlik-ease flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    {t('addWallArea')}
                </button>
            </div>

            {items.length > 0 && (
                 <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-birlik-primary shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-40">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h2 className="text-xl font-bold text-birlik-primary mb-3 text-center">{t('projectSummary')}</h2>
                    {projectSummary.length > 0 ? (
                        <>
                            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {projectSummary.map(({ product, quantity, unit }) => (
                                    <div key={product.SKU} className="bg-birlik-neutral-offwhite p-3 rounded-md border border-birlik-accent-sand flex items-center gap-3">
                                        <img src={product.images[0]} alt={getProductName(product)} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                                        <div className="overflow-hidden">
                                            <p className="font-semibold text-sm truncate" title={getProductName(product)}>{getProductName(product)}</p>
                                            <p className="text-gray-500 text-xs">SKU: {product.SKU}</p>
                                            <p className="text-birlik-primary font-bold text-lg mt-1">{`${t('totalRequired')}: ${quantity} ${unit}`}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="max-w-4xl mx-auto mt-4 text-center">
                                <button
                                    onClick={handleSendToWhatsApp}
                                    className="inline-flex items-center justify-center bg-green-500 text-white font-bold py-2 px-6 rounded-lg shadow hover:bg-green-600 transition-colors duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.12c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.82-1.26-4.38 0-4.54 3.68-8.22 8.22-8.22 2.22 0 4.29.86 5.81 2.38 1.52 1.52 2.38 3.59 2.38 5.82-.01 4.54-3.69 8.22-8.23 8.22zm4.32-5.11c-.24-.12-1.42-.7-1.64-.78-.23-.08-.39-.12-.56.12-.17.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2s-1.5-1.74-1.68-2.04-.03-.28.09-.39c.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.32-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.55-.42-.15 0-.31-.02-.48-.02s-.43.06-.66.3c-.22.24-.86.84-.86 2.07s.88 2.4 1 2.56c.12.16 1.73 2.64 4.2 3.72 2.46 1.08 2.46.72 2.9.7.44-.02 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.11-.22-.18-.46-.3z"/></svg>
                                    {t('getProjectQuoteOnWhatsApp')}
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-gray-500">{t('noItems')}</p>
                    )}
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default CalculatorPage;
