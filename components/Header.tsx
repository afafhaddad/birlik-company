import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Language, ProductCategory, Product } from '../types';
import { products } from '../data/products';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const languages: Language[] = [Language.TR, Language.EN, Language.AR];

  return (
    <div className="flex items-center bg-birlik-neutral-offwhite/80 rounded-full border border-birlik-accent-sand p-1 text-sm">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`px-3 py-1 rounded-full transition-colors duration-200 ${
            language === lang
              ? 'bg-birlik-primary text-white shadow'
              : 'text-birlik-neutral-charcoal hover:bg-birlik-accent-sand/50'
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

const SearchBar: React.FC<{ onResultClick: () => void }> = ({ onResultClick }) => {
    const { t, language } = useLanguage();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (query.trim().length > 1) {
            const lowerCaseQuery = query.toLowerCase();
            const filtered = products.filter(p =>
                p.Name_TR.toLowerCase().includes(lowerCaseQuery) ||
                p.Name_EN.toLowerCase().includes(lowerCaseQuery) ||
                p.Name_AR.toLowerCase().includes(lowerCaseQuery) ||
                p.SKU.toLowerCase().includes(lowerCaseQuery)
            ).slice(0, 7); // Limit to 7 results
            setResults(filtered);
        } else {
            setResults([]);
        }
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    const getProductLink = (sku: string) => {
        switch(language) {
            case 'en': return `/en/product/${sku}`;
            case 'ar': return `/ar/product/${sku}`;
            default: return `/urun/${sku}`;
        }
    };
    
    const getProductName = (product: Product) => {
        if (language === 'en') return product.Name_EN;
        if (language === 'ar') return product.Name_AR;
        return product.Name_TR;
    };
    
    const handleReset = () => {
        setQuery('');
        setResults([]);
        setIsFocused(false);
        onResultClick();
    };

    return (
        <div className="relative w-full md:w-64" ref={searchRef}>
            <div className="relative">
                 <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    placeholder={t('searchProducts')}
                    className="w-full pl-10 pr-4 py-2 border border-birlik-accent-sand rounded-full bg-birlik-neutral-offwhite/80 focus:ring-2 focus:ring-birlik-primary focus:outline-none transition-all"
                    aria-label={t('searchProducts')}
                />
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
            </div>
           
            {isFocused && results.length > 0 && (
                <div className="absolute top-full mt-2 w-full md:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-20 overflow-hidden right-0 md:right-auto md:left-0">
                    <ul className="max-h-96 overflow-y-auto">
                        {results.map(product => (
                            <li key={product.SKU}>
                                <Link
                                    to={getProductLink(product.SKU)}
                                    onClick={handleReset}
                                    className="flex items-center p-3 hover:bg-birlik-accent-sand/50 transition-colors duration-150"
                                >
                                    <img src={product.images[0]} alt={getProductName(product)} className="w-12 h-12 object-cover rounded-md mr-4 flex-shrink-0" />
                                    <div className="overflow-hidden">
                                        <p className="font-semibold text-sm text-birlik-neutral-charcoal truncate">{getProductName(product)}</p>
                                        <p className="text-xs text-gray-500">SKU: {product.SKU}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


// Centralized navigation configuration for scalability and easy maintenance.
const navLinks = [
  {
    key: 'home',
    paths: {
      [Language.TR]: '/',
      [Language.EN]: '/en',
      [Language.AR]: '/ar',
    },
  },
  { key: 'products' }, // Placeholder for the dropdown menu
  {
    key: 'contact',
    paths: {
      [Language.TR]: '/iletisim',
      [Language.EN]: '/en/contact',
      [Language.AR]: '/ar/contact',
    },
  },
  {
    key: 'calculator',
    paths: {
      [Language.TR]: '/hesaplayici',
      [Language.EN]: '/en/calculator',
      [Language.AR]: '/ar/calculator',
    },
  },
];

const Header: React.FC = () => {
  // --- Hooks & State ---
  const { t, language } = useLanguage();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // --- Dynamic Path/Link Generation ---
  const homePath = navLinks.find(link => link.key === 'home')?.paths?.[language] || '/';
  
  const getCategoryLink = (category: ProductCategory) => {
    switch (language) {
      case 'en': return `/en/products/${category}`;
      case 'ar': return `/ar/products/${category}`;
      default: return `/urunler/${category}`;
    }
  };

  const productCategories = Object.values(ProductCategory);
  
  // --- Effects for managing menu state & side-effects ---

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Close all menus on route change
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when any mobile overlay is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
        document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to={homePath} className="flex-shrink-0 flex items-center gap-x-3 text-birlik-primary">
              <img src="https://res.cloudinary.com/dsqrdreft/image/upload/v1756297555/logo_uej7ab.svg" alt="Birlik Company Logo" className="h-12 md:h-14" />
              <span className="text-xl md:text-2xl font-bold tracking-tight drop-shadow-sm">Birlik Company</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-x-8">
                <SearchBar onResultClick={() => {}} />
                {navLinks.map(link => {
                    if (link.key === 'products') {
                    return (
                        <div key="products-dropdown" className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(prev => !prev)}
                            className="flex items-center text-gray-600 hover:text-birlik-primary transition-colors"
                            aria-haspopup="true"
                            aria-expanded={isDropdownOpen}
                        >
                            {t('products')}
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ml-1 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
                            {productCategories.map(category => (
                                <Link
                                key={category}
                                to={getCategoryLink(category)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-birlik-accent-sand/50 hover:text-birlik-primary transition-colors"
                                >
                                {t(category)}
                                </Link>
                            ))}
                            </div>
                        )}
                        </div>
                    )
                    }

                    if (link.key === 'calculator') {
                    return (
                        <Link
                        key={link.key}
                        to={link.paths?.[language] || '#'}
                        className="bg-birlik-primary/10 text-birlik-primary px-4 py-2 rounded-full font-semibold hover:bg-birlik-primary/20 transition-colors"
                        >
                        {t(link.key)}
                        </Link>
                    )
                    }

                    return (
                    <Link key={link.key} to={link.paths?.[language] || '#'} className="text-gray-600 hover:text-birlik-primary transition-colors">
                        {t(link.key)}
                    </Link>
                    );
                })}
                <LanguageSwitcher />
            </nav>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-x-3">
              <LanguageSwitcher />
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-birlik-neutral-charcoal p-2"
                aria-label="Open menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
         <div className="fixed inset-0 z-50 bg-white flex flex-col">
            <div className="flex items-center justify-between h-20 px-4 border-b">
                <Link to={homePath} className="flex items-center gap-x-2 text-birlik-primary">
                    <img src="https://res.cloudinary.com/dsqrdreft/image/upload/v1756297555/logo_uej7ab.svg" alt="Birlik Company Logo" className="h-10" />
                     <span className="text-xl font-bold">Birlik Company</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 p-2" aria-label="Close menu">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            
            <div className="p-4 border-b">
                <SearchBar onResultClick={() => setIsMobileMenuOpen(false)} />
            </div>

            <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
                 {navLinks.map(link => {
                    if(link.key === 'products') {
                        return (
                            <div key="mobile-products">
                                <button onClick={() => setIsMobileProductsOpen(prev => !prev)} className="w-full flex justify-between items-center text-left py-3 text-lg font-medium text-gray-700">
                                    {t('products')}
                                     <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ml-1 transition-transform duration-200 ${isMobileProductsOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                </button>
                                {isMobileProductsOpen && (
                                    <div className="pl-4 border-l-2 border-birlik-accent-sand space-y-1 py-1">
                                        {productCategories.map(category => (
                                            <Link key={category} to={getCategoryLink(category)} className="block py-2 text-gray-600 hover:text-birlik-primary">{t(category)}</Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    }
                    return (
                        <Link key={link.key} to={link.paths?.[language] || '#'} className="block py-3 text-lg font-medium text-gray-700">{t(link.key)}</Link>
                    )
                 })}
            </nav>
         </div>
      )}
    </>
  );
};

export default Header;