import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ProductCategory, Product } from '../types';
import { translations, COMPANY_INFO } from '../constants';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const categoryImages: Record<ProductCategory, string> = {
  [ProductCategory.PS_FLUTED]: 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297556/ps-fluted_vbvx14.png',
  [ProductCategory.PVC_UV_MARBLE]: 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297556/pvc-uv-marble_g11cuq.png',
  [ProductCategory.PS_BASEBOARD]: 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297554/ps-baseboard_v13h9l.jpg',
  [ProductCategory.PS_MOLDING]: 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297554/ps-molding_g3j4ue.jpg',
  [ProductCategory.PU_MOTIF]: 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297556/pu-motif_egv0fv.png',
};

const CategoryCard: React.FC<{ category: ProductCategory }> = ({ category }) => {
  const { t, language } = useLanguage();
  const categoryName = translations[language][category];
  
  const getLink = () => {
    const base = '/urunler';
    switch(language) {
      case 'en': return `/en/products/${category}`;
      case 'ar': return `/ar/products/${category}`;
      default: return `${base}/${category}`;
    }
  }

  return (
    <Link to={getLink()} className="group relative block bg-black rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-1 transition-transform duration-300 ease-birlik-ease">
      <img
        src={categoryImages[category]}
        alt={categoryName}
        className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity duration-300 group-hover:opacity-40"
      />
      <div className="relative p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white">{categoryName}</h3>
          <p className="mt-2 text-sm text-birlik-accent-sand">{t('viewProducts')}</p>
        </div>
      </div>
    </Link>
  );
};

const HeroSection: React.FC = () => {
    const { t, language } = useLanguage();

    const getCalculatorPath = () => {
        switch(language) {
          case 'en': return '/en/calculator';
          case 'ar': return '/ar/calculator';
          default: return '/hesaplayici';
        }
    };

    return (
        <div className="relative bg-birlik-accent-sand h-[60vh] min-h-[400px] flex items-center justify-center text-center">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: "url('https://res.cloudinary.com/dsqrdreft/image/upload/v1756297581/ps_fluted_PS-ECO-P-12120_main_01_plc5tz.jpg')" }}
            ></div>
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl md:text-6xl font-bold text-birlik-primary drop-shadow-md">{t('heroTitle')}</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-birlik-neutral-charcoal">{t('heroSubtitle')}</p>
                <Link to={getCalculatorPath()} className="mt-8 inline-block bg-birlik-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300 ease-birlik-ease transform hover:scale-105">
                    {t('calculateNeeds')}
                </Link>
            </div>
        </div>
    );
};

const BestSellersSection: React.FC = () => {
    const { t } = useLanguage();
    // Select a few products as best sellers
    const bestSellers = [
        products.find(p => p.SKU === 'PS-DTB-20120'),
        products.find(p => p.SKU === 'PVC-PORTOFINO-244x122'),
        products.find(p => p.SKU === 'PS-SPR-115-1'),
        products.find(p => p.SKU === 'PU-CK-105M')
    ].filter((p): p is Product => p !== undefined);

    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-birlik-primary">{t('bestSellers')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {bestSellers.map(product => (
                        <ProductCard key={product.SKU} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const MissionSection: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section className="bg-birlik-neutral-offwhite py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img
                            src="https://res.cloudinary.com/dsqrdreft/image/upload/v1756297554/logo_yritwt.png"
                            alt={t('ourMission')}
                            className="rounded-lg shadow-xl w-full h-auto"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-birlik-primary mb-4">{t('ourMission')}</h2>
                        <p className="text-gray-700 leading-relaxed">{t('missionText')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Polymer Features Section ---

const useInView = (options: IntersectionObserverInit) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      options
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [containerRef, options]);

  return [containerRef, isInView] as const;
};


const PolymerFormulaIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.6 10.7c.8-1.5 2.1-2.8 3.7-3.8.7-.4 1.4-.7 2.2-.9M19.4 13.3c-.8 1.5-2.1 2.8-3.7 3.8-.7.4-1.4.7-2.2.9M14.7 4.6c1.5.8 2.8 2.1 3.8 3.7.4.7.7 1.4.9 2.2M9.3 19.4c-1.5-.8-2.8-2.1-3.8-3.7-.4-.7-.7-1.4-.9-2.2"/><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"/><path d="M15 9l-6 6"/><path d="m9 9 1.8 1.8"/><path d="m13.2 13.2 1.8 1.8"/></svg>;
const PaintableIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-3"/><path d="M18 16v-3"/><path d="M6 16v-3"/><path d="M12 13V2"/><path d="M20 8v5"/><path d="M4 8v5"/><path d="M12 2a4 4 0 0 0-4 4v5a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4Z"/></svg>;
const EasyInstallationIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.94 14.06a8.92 8.92 0 0 0-1.82-3.13c-.8-.9-1.7-1.7-2.7-2.3s-2.1-.9-3.3-1c-1.2-.1-2.4 0-3.6.4-1.2.4-2.3.9-3.3 1.6-1 .7-1.9 1.5-2.6 2.5a8.92 8.92 0 0 0-1.26 3.42"/><path d="M3.06 9.94a8.92 8.92 0 0 1 1.82-3.13c.8-.9 1.7-1.7 2.7-2.3s2.1-.9 3.3-1c1.2-.1 2.4 0 3.6.4 1.2.4 2.3.9 3.3 1.6 1 .7 1.9 1.5 2.6 2.5a8.92 8.92 0 0 1 1.26 3.42"/></svg>;
const AntibacterialIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m8.5 10.5 7 7"/><path d="m15.5 10.5-7 7"/></svg>;
const CutableIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-2"/><path d="M14.5 20h-5"/><path d="M21 16h.5a2.5 2.5 0 0 1 0 5h-19a2.5 2.5 0 0 1 0-5H3"/><path d="M21 16V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10"/><path d="M18 10c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2Z"/><path d="M6 10c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2Z"/></svg>;
const WaterResistantIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 12a3 3 0 0 0-3 3c0 1.66 2 3 3 3s3-1.34 3-3a3 3 0 0 0-3-3z"/></svg>;
const AdhesiveIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 4 4 4"/><path d="M12 22 6 16l6-6 6 6-6 6Z"/><path d="M12 16H6V4h2"/><path d="M12 8a2 2 0 1 1 4 0v8a2 2 0 1 1-4 0Z"/></svg>;
const EcoFriendlyIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/><path d="M7.5 3C9 3 10 4 11 5c1-1 2-2 3.5-2"/></svg>;
const ImpactResistantIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 15 2 2 2-2"/><path d="m22 15-2 2-2-2"/><path d="m15 2-2 2-2-2"/><path d="M9 22l2-2 2 2"/><path d="M17 17 7 7"/><path d="M7 17 17 7"/></svg>;
const RecyclableIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 8v4l-4-4"/><path d="M16 12h-4l-4 4"/></svg>;


const features = [
  { key: 'polymer_formula', Icon: PolymerFormulaIcon },
  { key: 'paintable', Icon: PaintableIcon },
  { key: 'easy_installation', Icon: EasyInstallationIcon },
  { key: 'antibacterial', Icon: AntibacterialIcon },
  { key: 'cutable', Icon: CutableIcon },
  { key: 'water_resistant', Icon: WaterResistantIcon },
  { key: 'adhesive', Icon: AdhesiveIcon },
  { key: 'eco_friendly', Icon: EcoFriendlyIcon },
  { key: 'impact_resistant', Icon: ImpactResistantIcon },
  { key: 'recyclable', Icon: RecyclableIcon },
];

const FeatureCard: React.FC<{ feature: {key: string; Icon: React.FC}; index: number; inView: boolean }> = ({ feature, index, inView }) => {
  const { t } = useLanguage();
  const { key, Icon } = feature;
  return (
    <div 
      className={`bg-white p-6 rounded-lg shadow-lg border border-birlik-accent-sand/30 text-center transform transition-all duration-500 ease-birlik-ease hover:shadow-xl hover:-translate-y-2 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex justify-center items-center mb-4">
        <div className="bg-birlik-accent-sand p-3 rounded-full text-birlik-primary">
          <Icon />
        </div>
      </div>
      <h3 className="text-lg font-bold text-birlik-primary mb-2 uppercase">{t(`feature_${key}_title`)}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{t(`feature_${key}_desc`)}</p>
    </div>
  );
};

const PolymerFeaturesSection = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-birlik-primary">{t('polymerProductFeatures')}</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">{t('polymerProductFeatures_subtitle')}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.key} feature={feature} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- END Polymer Features Section ---

const NewsletterSection: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section className="bg-birlik-accent-beige py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-birlik-primary">{t('newsletterTitle')}</h2>
                <p className="mt-2 text-birlik-neutral-charcoal max-w-xl mx-auto">{t('newsletterSubtitle')}</p>
                <form
                  action={`https://formsubmit.co/${COMPANY_INFO.email}`}
                  method="POST"
                  className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-4"
                >
                    {/* Formsubmit Settings */}
                    <input type="hidden" name="_subject" value="New Newsletter Subscription Request" />
                    <input type="hidden" name="_captcha" value="false" />

                    <input
                        type="email"
                        name="email"
                        placeholder={t('emailPlaceholder')}
                        className="w-full px-4 py-3 rounded-lg border border-birlik-primary/20 focus:ring-2 focus:ring-birlik-primary focus:outline-none"
                        aria-label={t('emailPlaceholder')}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-birlik-primary text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-opacity-90 transition-colors duration-200"
                    >
                        {t('subscribe')}
                    </button>
                </form>
            </div>
        </section>
    );
};


const HomePage: React.FC = () => {
  const { t, language } = useLanguage();
  const categories = Object.values(ProductCategory);

  useEffect(() => {
    let title = 'Birlik Company | PS Lambri & PVC Mermer Panel - Mersin';
    let description = 'Birlik Company, Mersin, Türkiye\'de lider dekorasyon malzemeleri tedarikçinizdir. PS duvar lambirileri, PVC mermer levhalar, PS süpürgelikler, duvar çıtaları ve poliüretan motifler gibi geniş ürün yelpazemizi keşfedin.';
    
    if (language === 'en') {
        title = 'Birlik Company | PS Fluted & PVC Marble Panels - Mersin, Turkey';
        description = 'Birlik Company is your leading supplier of decorative materials in Mersin, Turkey. Explore our wide range of products including PS fluted panels, PVC marble sheets, PS baseboards, wall moldings, and polyurethane motifs.';
    } else if (language === 'ar') {
        title = 'شركة بيرليك | بديل الخشب وبديل الرخام - مرسين، تركيا';
        description = 'شركة بيرليك هي موردك الرائد لمواد الديكور في مرسين، تركيا. اكتشف مجموعتنا الواسعة من المنتجات بما في ذلك بديل الخشب، بديل الرخام، نعلات فوم، إطارات فوم، والزخارف البولي يوريثان.';
    }

    const canonicalUrl = window.location.href;

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    
    // Set Canonical URL
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
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "name": "Birlik Company",
                "url": window.location.origin,
                "logo": "https://res.cloudinary.com/dsqrdreft/image/upload/v1756297555/logo_uej7ab.svg",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": COMPANY_INFO.phone,
                    "contactType": "Customer Service",
                    "email": COMPANY_INFO.email
                },
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Akdeniz Mah. 39716 Sk. Özgül 2 Apt. No: 10/1A",
                    "addressLocality": "Mezitli",
                    "addressRegion": "Mersin",
                    "addressCountry": "TR"
                },
                "sameAs": [
                    COMPANY_INFO.instagramUrl,
                    COMPANY_INFO.facebookUrl,
                    COMPANY_INFO.linkedinUrl
                ]
            },
            {
                "@type": "WebSite",
                "url": window.location.origin,
                "name": "Birlik Company"
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

  }, [language, t]);

  return (
    <>
      <HeroSection />

      <section id="categories" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-birlik-primary">{t('categories')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map(cat => (
            <CategoryCard key={cat} category={cat} />
            ))}
        </div>
      </section>
        
      <BestSellersSection />

      <MissionSection />
      
      <PolymerFeaturesSection />

      <NewsletterSection />
    </>
  );
};

export default HomePage;