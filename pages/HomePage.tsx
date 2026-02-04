
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ProductCategory, Product, StockStatus } from '../types';
import { translations, COMPANY_INFO } from '../constants';
import { products } from '../data/products';

// --- Shared Dynamic Image & Atmosphere Components ---

const DynamicImageCycler: React.FC<{ imageUrls: string[]; interval?: number; className?: string }> = ({ imageUrls, interval = 4000, className }) => {
    const [currentIdx, setCurrentIdx] = useState(() => Math.floor(Math.random() * imageUrls.length));
    const [isFading, setIsFading] = useState(false);
    const [nextIdx, setNextIdx] = useState(0);

    useEffect(() => {
        if (imageUrls.length <= 1) return;
        
        const timer = setInterval(() => {
            const next = (currentIdx + 1) % imageUrls.length;
            setNextIdx(next);
            setIsFading(true);
            
            setTimeout(() => {
                setCurrentIdx(next);
                setIsFading(false);
            }, 800);
        }, interval + Math.random() * 2000);

        return () => clearInterval(timer);
    }, [currentIdx, imageUrls.length, interval]);

    return (
        <div className={`relative w-full h-full overflow-hidden ${className}`}>
            <img 
                src={imageUrls[currentIdx]} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[5000ms] scale-110 group-hover:scale-125" 
                alt="" 
            />
            {isFading && (
                <img 
                    src={imageUrls[nextIdx]} 
                    className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-1000 scale-110 group-hover:scale-125" 
                    alt="" 
                />
            )}
        </div>
    );
};

const CollageTile: React.FC<{ imageUrls: string[] }> = ({ imageUrls }) => {
    const [currentImg, setCurrentImg] = useState(() => imageUrls[Math.floor(Math.random() * imageUrls.length)]);
    const [nextImg, setNextImg] = useState('');
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const triggerChange = () => {
            const timeout = Math.random() * 3000 + 2000; 
            return setTimeout(() => {
                const randomImg = imageUrls[Math.floor(Math.random() * imageUrls.length)];
                setNextImg(randomImg);
                setIsFading(true);
                
                setTimeout(() => {
                    setCurrentImg(randomImg);
                    setIsFading(false);
                    triggerChange();
                }, 700); 
            }, timeout);
        };

        const timer = triggerChange();
        return () => clearTimeout(timer);
    }, [imageUrls]);

    return (
        <div className="relative w-full h-full overflow-hidden">
            <img 
                src={currentImg} 
                className="absolute inset-0 w-full h-full object-cover scale-110" 
                alt="" 
                loading="lazy"
            />
            {isFading && (
                <img 
                    src={nextImg} 
                    className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-700 scale-110" 
                    alt="" 
                />
            )}
        </div>
    );
};

const AtmosphericBackground: React.FC<{ blurAmount?: string; opacity?: string; gridConfig?: string }> = ({ 
    blurAmount = "blur-[2px]", 
    opacity = "opacity-50",
    gridConfig = "grid-cols-3 sm:grid-cols-4 md:grid-cols-6 grid-rows-8 sm:grid-rows-6 md:grid-rows-4"
}) => {
    const allImages = useMemo(() => products.flatMap(p => p.images), []);
    const slots = useMemo(() => Array.from({ length: 24 }), []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute inset-0 grid ${gridConfig} gap-1 ${opacity} scale-105`}>
                {slots.map((_, i) => <CollageTile key={i} imageUrls={allImages} />)}
            </div>
            <div className={`absolute inset-0 bg-birlik-primary/60 backdrop-blur-${blurAmount}`}></div>
        </div>
    );
};

// --- Specialized Mission Map Component ---

const RegionMap = () => {
    const { t, language } = useLanguage();
    const isAr = language === 'ar';
    const branchesText = t('currentOpenBranches');
    
    const words = branchesText.split(' ');
    const firstPart = words.slice(0, 2).join(' ');
    const lastPart = words.slice(2).join(' ');

    return (
        <div className="relative w-full max-w-6xl mx-auto h-[450px] md:h-[650px] group flex items-center justify-center mt-6">
            <div className="relative w-full h-full">
                
                {/* Localized Floating Header Text - Razor Sharp */}
                <div className={`absolute top-0 pointer-events-none z-20 ${isAr ? 'right-0 md:right-4 text-right' : 'left-0 md:left-4 text-left'}`}>
                    <p className="text-4xl md:text-8xl font-black text-white/10 tracking-tighter leading-none mb-2">
                        {firstPart}
                    </p>
                    <p className="text-xl md:text-4xl font-light text-birlik-accent-sand/40 tracking-[0.8em] uppercase leading-none">
                        {lastPart}
                    </p>
                </div>

                <svg viewBox="0 0 1000 600" className="w-full h-full overflow-visible">
                    <defs>
                        <radialGradient id="markerGlowPremium" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#E4D8C7" stopOpacity="0.9" />
                            <stop offset="50%" stopColor="#E4D8C7" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#E4D8C7" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    <path 
                        d="M0,220 L300,180 L480,200 L680,260 L850,340 L880,450 L840,600" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="4" 
                        className="text-birlik-accent-sand/20"
                    />
                    
                    {/* Mersin (Headquarters) */}
                    <g transform="translate(480, 200)">
                        <circle r="90" fill="url(#markerGlowPremium)" className="animate-pulse opacity-30" />
                        <circle r="45" className="fill-birlik-accent-sand/10 animate-ping" />
                        <circle r="20" className="fill-birlik-accent-sand shadow-2xl" />
                        
                        <g className="drop-shadow-[0_4px_8px_rgba(0,0,0,1)]">
                            <text y="-85" x="0" textAnchor="middle" className="fill-white text-[48px] font-black uppercase tracking-[0.05em] select-none">MERSIN</text>
                            <text y="-45" x="0" textAnchor="middle" className="fill-birlik-accent-sand text-[22px] uppercase tracking-[0.3em] font-extrabold select-none">{t('headquarters')}</text>
                        </g>
                    </g>
                    
                    {/* Lattakia (Regional Hub) */}
                    <g transform="translate(850, 420)">
                        <circle r="90" fill="url(#markerGlowPremium)" className="animate-pulse opacity-30" />
                        <circle r="45" className="fill-birlik-accent-sand/10 animate-ping" />
                        <circle r="20" className="fill-birlik-accent-sand shadow-2xl" />
                        
                        <g className="drop-shadow-[0_4px_8px_rgba(0,0,0,1)]">
                            <text y="95" x="0" textAnchor="middle" className="fill-white text-[48px] font-black uppercase tracking-[0.05em] select-none">LATTAKIA</text>
                            <text y="135" x="0" textAnchor="middle" className="fill-birlik-accent-sand text-[22px] uppercase tracking-[0.3em] font-extrabold select-none">{t('regionalHub')}</text>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
    );
};

// --- Section Components ---

const HeroSection: React.FC = () => {
    const { t, language } = useLanguage();
    const getCalculatorPath = () => language === 'tr' ? '/hesaplayici' : `/${language}/calculator`;

    return (
        <div className="relative h-[95vh] min-h-[700px] flex items-center justify-center text-center overflow-hidden bg-birlik-primary">
            <AtmosphericBackground blurAmount="[1px]" opacity="opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-birlik-primary"></div>
            
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="mb-10 flex flex-col items-center animate-in fade-in slide-in-from-top-10 duration-1000">
                    <img 
                        src="https://res.cloudinary.com/dsqrdreft/image/upload/v1756297555/logo_uej7ab.svg" 
                        alt="Birlik Company Logo" 
                        className="h-24 md:h-32 mb-8 drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)] filter brightness-110"
                    />
                    <div className="inline-block px-5 py-2 bg-birlik-accent-sand/15 border border-birlik-accent-sand/20 rounded-full backdrop-blur-xl">
                        <span className="text-xs font-bold text-birlik-accent-sand uppercase tracking-[0.4em]">Premium Interior Solutions</span>
                    </div>
                </div>
                <h1 className="text-4xl md:text-8xl font-bold text-white drop-shadow-2xl mb-8 max-w-5xl mx-auto leading-tight tracking-tighter">{t('heroTitle')}</h1>
                <p className="max-w-2xl mx-auto text-lg md:text-2xl text-birlik-accent-sand/90 font-light drop-shadow-lg mb-12">{t('heroSubtitle')}</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-lg">
                    <Link to={getCalculatorPath()} className="w-full sm:w-auto bg-birlik-accent-sand text-birlik-primary font-black py-4 px-12 rounded-full shadow-2xl hover:bg-white transition-all duration-500 transform hover:scale-105 active:scale-95 uppercase tracking-widest text-sm">{t('calculateNeeds')}</Link>
                    <a href="#categories" className="w-full sm:w-auto bg-white/5 text-white border border-white/20 backdrop-blur-xl font-bold py-4 px-12 rounded-full hover:bg-white/10 transition-all text-sm uppercase tracking-widest">{t('exploreProducts')}</a>
                </div>
            </div>
        </div>
    );
};

const MissionSection: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section className="relative bg-birlik-primary pt-24 pb-4 lg:pt-32 lg:pb-8 overflow-hidden border-t border-white/5">
            <AtmosphericBackground blurAmount="3xl" opacity="opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-birlik-primary/90 via-birlik-primary/95 to-birlik-primary"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="max-w-5xl mx-auto flex flex-col items-center">
                    
                    {/* Mission Text Body */}
                    <div className="mb-12 animate-in fade-in slide-in-from-top-5 duration-1000 max-w-4xl">
                        <h2 className="text-5xl md:text-8xl font-extrabold text-white tracking-tighter leading-none mb-10 drop-shadow-xl">
                            {t('ourMission')}
                        </h2>
                        
                        <div className="max-w-3xl mx-auto px-4">
                            <div className="h-px w-24 bg-birlik-accent-sand/40 mx-auto mb-10"></div>
                            <p className="text-birlik-accent-sand/90 text-xl md:text-4xl font-light leading-relaxed italic drop-shadow-sm">
                                {t('missionText')}
                            </p>
                        </div>
                    </div>

                    {/* Global Presence Badge - Anchoring the Map */}
                    <div className="inline-block px-8 py-3 bg-birlik-accent-sand/10 border border-birlik-accent-sand/20 rounded-full mb-6 backdrop-blur-md">
                         <span className="text-sm md:text-base font-black text-birlik-accent-sand tracking-[0.4em] uppercase">
                            {t('globalPresence')}
                         </span>
                    </div>

                    <RegionMap />
                </div>
            </div>
        </section>
    );
};

const CategoryTile: React.FC<{ category: ProductCategory; images: string[] }> = ({ category, images }) => {
    const { t, language } = useLanguage();
    const categoryName = translations[language][category];
    const getLink = () => language === 'tr' ? `/urunler/${category}` : `/${language}/products/${category}`;

    return (
        <Link 
            to={getLink()} 
            className="group relative block aspect-[4/5] sm:aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-birlik-accent-sand/30"
        >
            <DynamicImageCycler imageUrls={images} className="brightness-75 group-hover:brightness-50 transition-all duration-1000" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <div className="bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 transform transition-all duration-700 group-hover:-translate-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-birlik-accent-sand uppercase tracking-[0.3em] mb-1 opacity-80">
                                {t('products')}
                            </p>
                            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                                {categoryName}
                            </h3>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20 group-hover:bg-birlik-accent-sand group-hover:text-birlik-primary transition-all duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" /></svg>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const CategoriesSection: React.FC = () => {
    const { t } = useLanguage();
    const categories = Object.values(ProductCategory);
    const categoryImagePools = useMemo(() => {
        const pools: Record<string, string[]> = {};
        categories.forEach(cat => {
            pools[cat] = products.filter(p => p.Category === cat).flatMap(p => p.images);
        });
        return pools;
    }, [categories]);

    return (
        <section id="categories" className="bg-birlik-primary pt-12 pb-24 lg:pt-16 lg:pb-32 relative overflow-hidden">
            <AtmosphericBackground blurAmount="3xl" opacity="opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-birlik-primary via-birlik-primary/95 to-birlik-primary"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
                    <div className="max-w-2xl mx-auto md:mx-0">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
                            <span className="w-2.5 h-2.5 rounded-full bg-birlik-accent-sand animate-pulse"></span>
                            <span className="text-sm font-black text-birlik-accent-sand tracking-[0.3em] uppercase">{t('categories')}</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">{t('categories')}</h2>
                    </div>
                    <p className="text-birlik-accent-sand/60 max-w-sm text-xl italic font-light leading-relaxed md:text-right">
                        {t('heroSubtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {categories.map(cat => (
                        <CategoryTile key={cat} category={cat} images={categoryImagePools[cat]} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const PolymerFeaturesSection = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.1 });
  return (
    <section ref={ref} className="relative bg-birlik-primary py-24 lg:py-32 overflow-hidden border-t border-white/5">
        <AtmosphericBackground blurAmount="3xl" opacity="opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-birlik-primary via-birlik-primary/90 to-birlik-primary"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-24">
                <div className="inline-block px-6 py-2.5 bg-birlik-accent-sand/20 border border-birlik-accent-sand/30 rounded-full mb-8 backdrop-blur-xl">
                    <span className="text-sm font-black text-birlik-accent-sand tracking-[0.4em] uppercase">Premium Quality Standards</span>
                </div>
                <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-10">{t('polymerProductFeatures')}</h2>
                <p className="text-birlik-accent-sand/60 max-w-2xl mx-auto text-2xl font-light italic">{t('polymerProductFeatures_subtitle')}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-10">
                {features.map((feature, index) => <FeatureCard key={feature.key} feature={feature} index={index} inView={inView} />)}
            </div>
        </div>
    </section>
  );
};

const BestSellersSection: React.FC = () => {
    const { t } = useLanguage();
    const bestSellerSkus = ['PS-AB-20120', 'PVC-ELEGANCE-244X122', 'PS-SPR-115-1', 'PS-C-013', 'PS-ECO-LW-12120', 'PVC-ROCKY-244x122'];

    const bestSellers = useMemo(() => {
        return bestSellerSkus.map(sku => products.find(p => p.SKU === sku)).filter((p): p is Product => p !== undefined);
    }, []);

    return (
        <section className="relative bg-birlik-primary py-24 lg:py-40 overflow-hidden border-t border-white/5">
            <AtmosphericBackground blurAmount="3xl" opacity="opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-birlik-primary via-birlik-primary/90 to-birlik-primary/95"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-24">
                    <div className="inline-block px-6 py-2.5 bg-birlik-accent-sand/30 rounded-full mb-8 backdrop-blur-2xl shadow-xl">
                        <span className="text-sm font-black text-white tracking-[0.4em] uppercase">{t('bestSellers')}</span>
                    </div>
                    <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none mb-10">
                        {t('bestSellers')}
                    </h2>
                    <p className="text-birlik-accent-sand/60 max-w-2xl mx-auto text-2xl font-light italic leading-relaxed">
                        {t('heroSubtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-16">
                    {bestSellers.map(product => (
                        <BestSellerGalleryCard key={product.SKU} product={product} />
                    ))}
                </div>

                <div className="mt-28 text-center">
                    <Link 
                        to="/urunler/ps_fluted" 
                        className="group inline-flex items-center gap-6 px-16 py-6 bg-birlik-accent-sand text-birlik-primary font-black rounded-full shadow-[0_20px_50px_rgba(228,216,199,0.2)] hover:bg-white transition-all duration-700 hover:scale-110 active:scale-95"
                    >
                        <span className="text-xl tracking-widest uppercase">{t('exploreProducts')}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transition-transform duration-500 group-hover:translate-x-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

// --- Best Seller Gallery Card ---

const BestSellerGalleryCard: React.FC<{ product: Product }> = ({ product }) => {
    const { language, t } = useLanguage();
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    useEffect(() => {
        if (product.images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentImgIndex((prev) => (prev + 1) % product.images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [product.images.length]);

    const getProductName = () => {
        if (language === 'en') return product.Name_EN;
        if (language === 'ar') return product.Name_AR;
        return product.Name_TR;
    };

    const getLink = () => language === 'tr' ? `/urun/${product.SKU}` : `/${language}/product/${product.SKU}`;
    const isSoldOut = product.Stock_Status === StockStatus.OUT_OF_STOCK;

    return (
        <Link 
            to={getLink()} 
            className={`group relative bg-white/5 backdrop-blur-xl rounded-[3rem] shadow-2xl overflow-hidden block transition-all duration-1000 border border-white/10 hover:border-birlik-accent-sand/40 hover:-translate-y-6 ${isSoldOut ? 'grayscale opacity-70' : ''}`}
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-black/20">
                {product.images.map((img, idx) => (
                    <img 
                        key={idx}
                        src={img}
                        alt={`${getProductName()} view ${idx + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-in-out transform ${idx === currentImgIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
                    />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
                <div className="absolute top-8 left-8 flex flex-col gap-3 z-10">
                    {product.isNew && (
                        <span className="bg-green-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-2xl uppercase tracking-widest animate-pulse">
                            {t('newLabel')}
                        </span>
                    )}
                    {isSoldOut && (
                        <span className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-2xl uppercase tracking-widest">
                            {t('soldOut')}
                        </span>
                    )}
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-10 text-white z-10">
                <div className="mb-3">
                    <span className="text-xs font-bold text-birlik-accent-sand uppercase tracking-[0.3em] opacity-90">
                        {t(product.Category)}
                    </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-4 drop-shadow-2xl">
                    {getProductName()}
                </h3>
                <div className="flex items-center justify-between mt-6">
                    <p className="text-[10px] font-mono text-white/50 tracking-widest">SKU: {product.SKU}</p>
                    <div className="flex items-center gap-3 text-sm font-black text-birlik-accent-sand transition-all duration-500 group-hover:translate-x-2">
                        <span>{t('viewProducts')}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M9 5l7 7-7 7" /></svg>
                    </div>
                </div>
            </div>
        </Link>
    );
};

// --- Polymer Feature Component ---

const FeatureCard: React.FC<{ feature: {key: string; Icon: React.FC}; index: number; inView: boolean }> = ({ feature, index, inView }) => {
  const { t } = useLanguage();
  const { key, Icon } = feature;
  return (
    <div 
      className={`bg-white/5 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/10 text-center transform transition-all duration-1000 ease-birlik-ease hover:border-birlik-accent-sand/40 hover:-translate-y-6 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex justify-center items-center mb-8">
        <div className="bg-birlik-accent-sand p-5 rounded-3xl text-birlik-primary shadow-[0_15px_30px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform duration-500">
          <Icon />
        </div>
      </div>
      <h3 className="text-xl font-black text-white mb-4 uppercase tracking-widest leading-tight drop-shadow-lg">{t(`feature_${key}_title`)}</h3>
      <p className="text-base text-birlik-accent-sand/70 leading-relaxed font-light">{t(`feature_${key}_desc`)}</p>
    </div>
  );
};

// --- Helper Components ---

const useInView = (options: IntersectionObserverInit) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsInView(true); observer.unobserve(entry.target); } },
      options
    );
    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [containerRef, options]);

  return [containerRef, isInView] as const;
};

const PolymerFormulaIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.6 10.7c.8-1.5 2.1-2.8 3.7-3.8.7-.4 1.4-.7 2.2-.9M19.4 13.3c-.8 1.5-2.1 2.8-3.7 3.8-.7.4-1.4.7-2.2.9M14.7 4.6c1.5.8 2.8 2.1 3.8 3.7.4.7.7 1.4.9 2.2M9.3 19.4c-1.5-.8-2.8-2.1-3.8-3.7-.4-.7-.7-1.4-.9-2.2"/><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"/><path d="M15 9l-6 6"/><path d="m9 9 1.8 1.8"/><path d="m13.2 13.2 1.8 1.8"/></svg>;
const PaintableIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-3"/><path d="M18 16v-3"/><path d="M6 16v-3"/><path d="M12 13V2"/><path d="M20 8v5"/><path d="M4 8v5"/><path d="M12 2a4 4 0 0 0-4 4v5a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4Z"/></svg>;
const EasyInstallationIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.94 14.06a8.92 8.92 0 0 0-1.82-3.13c-.8-.9-1.7-1.7-2.7-2.3s-2.1-.9-3.3-1c-1.2-.1-2.4 0-3.6.4-1.2.4-2.3.9-3.3 1.6-1 .7-1.9 1.5-2.6 2.5a8.92 8.92 0 0 0-1.26 3.42"/><path d="M3.06 9.94a8.92 8.92 0 0 1 1.82-3.13c.8-.9 1.7-1.7 2.7-2.3s2.1-.9 3.3-1c1.2-.1 2.4 0 3.6.4 1.2.4 2.3.9-3.3 1.6-1 .7-1.9 1.5-2.6 2.5a8.92 8.92 0 0 1 1.26 3.42"/></svg>;
const AntibacterialIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m8.5 10.5 7 7"/><path d="m15.5 10.5-7 7"/></svg>;
const CutableIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-2"/><path d="M14.5 20h-5"/><path d="M21 16h.5a2.5 2.5 0 0 1 0 5h-19a2.5 2.5 0 0 1 0-5H3"/><path d="M21 16V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10"/><path d="M18 10c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2Z"/><path d="M6 10c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2Z"/></svg>;
const WaterResistantIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 12a3 3 0 0 0-3 3c0 1.66 2 3 3 3s3-1.34 3-3a3 3 0 0 0-3-3z"/></svg>;
const AdhesiveIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m14 4 4 4"/><path d="M12 22 6 16l6-6 6 6-6 6Z"/><path d="M12 16H6V4h2"/><path d="M12 8a2 2 0 1 1 4 0v8a2 2 0 1 1-4 0Z"/></svg>;
const EcoFriendlyIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/><path d="M7.5 3C9 3 10 4 11 5c1-1 2-2 3.5-2"/></svg>;
const ImpactResistantIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m2 15 2 2 2-2"/><path d="m22 15-2 2-2-2"/><path d="m15 2-2 2-2-2"/><path d="M9 22l2-2 2 2"/><path d="M17 17 7 7"/><path d="M7 17 17 7"/></svg>;
const RecyclableIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 8v4l-4-4"/><path d="M16 12h-4l-4 4"/></svg>;

const features = [
  { key: 'polymer_formula', Icon: PolymerFormulaIcon }, { key: 'paintable', Icon: PaintableIcon },
  { key: 'easy_installation', Icon: EasyInstallationIcon }, { key: 'antibacterial', Icon: AntibacterialIcon },
  { key: 'cutable', Icon: CutableIcon }, { key: 'water_resistant', Icon: WaterResistantIcon },
  { key: 'adhesive', Icon: AdhesiveIcon }, { key: 'eco_friendly', Icon: EcoFriendlyIcon },
  { key: 'impact_resistant', Icon: ImpactResistantIcon }, { key: 'recyclable', Icon: RecyclableIcon },
];

const NewsletterSection: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section className="bg-birlik-accent-beige py-20 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h2 className="text-4xl font-bold text-birlik-primary tracking-tight mb-4">{t('newsletterTitle')}</h2>
                <p className="mt-2 text-birlik-neutral-charcoal max-w-2xl mx-auto text-xl font-light italic">{t('newsletterSubtitle')}</p>
                <form action={`https://formsubmit.co/${COMPANY_INFO.email}`} method="POST" className="mt-12 max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
                    <input type="hidden" name="_subject" value="New Newsletter Subscription Request" /><input type="hidden" name="_captcha" value="false" />
                    <input type="email" name="email" placeholder={t('emailPlaceholder')} className="w-full px-6 py-4 rounded-full border border-birlik-primary/20 focus:ring-4 focus:ring-birlik-primary/10 focus:outline-none transition-all" required />
                    <button type="submit" className="bg-birlik-primary text-white font-black py-4 px-10 rounded-full shadow-2xl hover:bg-birlik-neutral-charcoal transition-all duration-300 transform hover:scale-105 active:scale-95 uppercase tracking-widest">{t('subscribe')}</button>
                </form>
            </div>
        </section>
    );
};

const HomePage: React.FC = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    let title = 'Birlik Company | PS Lambri & PVC Mermer Panel - Mersin';
    let description = 'Birlik Company, Mersin, Türkiye\'de lider dekorasyon malzemeleri tedarikçinizdir.';
    if (language === 'en') { title = 'Birlik Company | PS Fluted & PVC Marble Panels - Mersin, Turkey'; description = 'Birlik Company is your leading supplier of decorative materials in Mersin, Turkey.'; }
    else if (language === 'ar') { title = 'شركة بيرليك | بديل الخشب وبديل الرخام - مرسين، تركيا'; description = 'شركة بيرليك هي موردك الرائد لمواد الديكور في مرسين، تركيا.'; }

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    
    const schema = {
        "@context": "https://schema.org",
        "@graph": [{ "@type": "Organization", "name": "Birlik Company", "url": window.location.origin, "logo": "https://res.cloudinary.com/dsqrdreft/image/upload/v1756297554/logo_yritwt.png", "contactPoint": { "@type": "ContactPoint", "telephone": COMPANY_INFO.phone, "contactType": "Customer Service", "email": COMPANY_INFO.email } }]
    };

    const scriptId = 'json-ld-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) { script = document.createElement('script'); script.id = scriptId; script.type = 'application/ld+json'; document.head.appendChild(script); }
    script.innerHTML = JSON.stringify(schema);
  }, [language, t]);

  return (
    <>
      <HeroSection />
      <MissionSection />
      <CategoriesSection />
      <PolymerFeaturesSection />
      <BestSellersSection />
      <NewsletterSection />
    </>
  );
};

export default HomePage;
