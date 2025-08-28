import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { products } from '../data/products';
import { ProductCategory } from '../types';

const Breadcrumbs: React.FC = () => {
    const { t, language, dir } = useLanguage();
    const location = useLocation();
    const params = useParams<{ categorySlug?: string; sku?: string }>();

    const isRtl = dir === 'rtl';

    const crumbs = React.useMemo(() => {
        const generatedCrumbs: { label: string; path: string }[] = [];

        // 1. Home Crumb
        const homePath = language === 'tr' ? '/' : (language === 'en' ? '/en' : '/ar');
        generatedCrumbs.push({ label: t('home'), path: homePath });

        // 2. Category Crumb
        let category: ProductCategory | undefined;
        let product = null;

        if (params.sku) {
            product = products.find(p => p.SKU === params.sku);
            if (product) {
                category = product.Category;
            }
        } else if (params.categorySlug) {
            category = params.categorySlug as ProductCategory;
        }

        if (category && Object.values(ProductCategory).includes(category)) {
            const categoryPath = language === 'tr'
                ? `/urunler/${category}`
                : `/${language}/products/${category}`;
            generatedCrumbs.push({ label: t(category), path: categoryPath });
        }
        
        // 3. Product Crumb
        if (product) {
            const productName = language === 'en' ? product.Name_EN : language === 'ar' ? product.Name_AR : product.Name_TR;
            generatedCrumbs.push({ label: productName, path: location.pathname });
        }

        return generatedCrumbs;
    }, [location.pathname, params, language, t]);

    if (crumbs.length <= 1) {
        return null;
    }
    
    const ChevronIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    );

    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-500 flex-wrap">
                {crumbs.map((crumb, index) => {
                    const isLast = index === crumbs.length - 1;
                    return (
                        <li key={crumb.path} className="flex items-center space-x-2">
                            {isLast ? (
                                <span className="font-semibold text-birlik-primary truncate max-w-[200px] sm:max-w-none" aria-current="page">{crumb.label}</span>
                            ) : (
                                <Link to={crumb.path} className="hover:text-birlik-primary hover:underline transition-colors truncate max-w-[100px] sm:max-w-none">
                                    {crumb.label}
                                </Link>
                            )}
                            {!isLast && <ChevronIcon />}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
