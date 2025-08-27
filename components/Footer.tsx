
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { COMPANY_INFO } from '../constants';
import { ProductCategory } from '../types';

const socialIcons = {
    instagram: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    ),
    facebook: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
    ),
    whatsapp: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
    ),
    linkedin: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    )
};


const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const productCategories = Object.values(ProductCategory);

  const getCategoryLink = (category: ProductCategory) => {
    switch (language) {
      case 'en': return `/en/products/${category}`;
      case 'ar': return `/ar/products/${category}`;
      default: return `/urunler/${category}`;
    }
  };
  
  const homePath = language === 'en' ? '/en' : language === 'ar' ? '/ar' : '/';

  return (
    <footer className="bg-birlik-neutral-charcoal text-birlik-neutral-offwhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Logo & Socials */}
          <div className="space-y-4">
            <Link to={homePath} className="flex items-center gap-x-3 text-white">
                <img src="https://res.cloudinary.com/dsqrdreft/image/upload/v1756297555/logo_uej7ab.svg" alt="Birlik Company Logo" className="h-12 bg-white rounded-md p-1" />
                <span className="text-xl font-bold tracking-tight">Birlik Company</span>
            </Link>
            <p className="text-sm text-birlik-accent-sand leading-relaxed">
              {t('heroSubtitle')}
            </p>
            <div className="flex items-center gap-x-4 pt-2">
                <a href={COMPANY_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-birlik-accent-sand hover:text-white transition-colors" aria-label="Instagram">{socialIcons.instagram}</a>
                <a href={COMPANY_INFO.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-birlik-accent-sand hover:text-white transition-colors" aria-label="Facebook">{socialIcons.facebook}</a>
                <a href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-birlik-accent-sand hover:text-white transition-colors" aria-label="WhatsApp">{socialIcons.whatsapp}</a>
                <a href={COMPANY_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-birlik-accent-sand hover:text-white transition-colors" aria-label="LinkedIn">{socialIcons.linkedin}</a>
            </div>
          </div>
          
          {/* Column 2: Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('products')}</h3>
            <ul className="space-y-2">
              {productCategories.map(category => (
                <li key={category}>
                  <Link to={getCategoryLink(category)} className="text-sm text-birlik-accent-sand hover:text-white hover:underline transition-colors">
                    {t(category)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
            <div className="space-y-3 text-sm">
                <div className="flex items-start gap-x-3">
                    <span className="mt-1 font-semibold text-birlik-accent-beige">{t('addressLabel')}:</span>
                    <span className="text-birlik-accent-sand">{COMPANY_INFO.address}</span>
                </div>
                 <div className="flex items-start gap-x-3">
                    <span className="font-semibold text-birlik-accent-beige">{t('phoneLabel')}:</span>
                    <a href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`} className="text-birlik-accent-sand hover:text-white hover:underline break-all">{COMPANY_INFO.phone}</a>
                </div>
                <div className="flex items-start gap-x-3">
                    <span className="font-semibold text-birlik-accent-beige">{t('emailLabel')}:</span>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-birlik-accent-sand hover:text-white hover:underline break-all">{COMPANY_INFO.email}</a>
                </div>
                 <div className="flex items-start gap-x-3">
                    <span className="font-semibold text-birlik-accent-beige">{t('workingHoursLabel')}:</span>
                    <span className="text-birlik-accent-sand">{t('workingHoursValue')}</span>
                </div>
            </div>
          </div>
          
          {/* Column 4: Map */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Location</h3>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden h-40">
               <iframe
                src={COMPANY_INFO.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t('addressLabel')}
              ></iframe>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-birlik-accent-sand">
          <p>&copy; {new Date().getFullYear()} Birlik Company. {t('allRightsReserved')}</p>
          <p className="text-xs mt-2">{COMPANY_INFO.name} | Vergi No: {COMPANY_INFO.taxId}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;