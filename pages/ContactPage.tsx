import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { COMPANY_INFO } from '../constants';

const socialIcons = {
    instagram: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    ),
    facebook: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
    ),
    linkedin: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    )
};


const ContactPage: React.FC = () => {
  const { t, language } = useLanguage();
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(t('whatsappConsultationMessage'))}`;

  useEffect(() => {
    let title = 'Birlik Company İletişim | Mersin Dekorasyon Malzemeleri';
    let description = 'Birlik Company ile iletişime geçin. Mersin, Türkiye\'deki PS duvar lambirileri, PVC mermer levhalar, süpürgelikler, duvar çıtaları ve poliüretan motifler hakkında bilgi ve teklif alın.';
    
    if(language === 'en') {
        title = 'Contact Birlik Company | Decoration Materials in Mersin, Turkey';
        description = 'Contact Birlik Company for information and quotes on our full range of products in Mersin, Turkey: PS fluted panels, PVC marble sheets, baseboards, wall moldings, and polyurethane motifs.';
    } else if (language === 'ar') {
        title = 'اتصل بشركة بيرليك | مواد ديكور في مرسين، تركيا';
        description = 'تواصل مع شركة بيرليك في مرسين، تركيا للحصول على معلومات وعروض أسعار حول مجموعتنا الكاملة من المنتجات: بديل الخشب، بديل الرخام، نعلات بوليمر، إطارات بوليمر، والزخارف البولي يوريثان.';
    }
    
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
    
    // JSON-LD Schema
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Birlik Company",
        "url": window.location.origin,
        "logo": "https://res.cloudinary.com/dsqrdreft/image/upload/v1756297554/logo_yritwt.png",
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-birlik-primary">{t('getInTouch')}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">{t('contactIntro')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <form action={`https://formsubmit.co/${COMPANY_INFO.email}`} method="POST">
             {/* Disable Captcha */}
            <input type="hidden" name="_captcha" value="false" />
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('yourName')}</label>
                <input type="text" name="name" id="name" required className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-birlik-primary focus:border-birlik-primary" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('yourEmail')}</label>
                <input type="email" name="email" id="email" required className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-birlik-primary focus:border-birlik-primary" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t('yourMessage')}</label>
                <textarea id="message" name="message" rows={5} required className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-birlik-primary focus:border-birlik-primary"></textarea>
              </div>
              <div>
                <button type="submit" className="w-full bg-birlik-primary text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-birlik-primary/90 transition-all duration-300 ease-birlik-ease transform hover:scale-105">
                  {t('sendMessage')}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Contact Info and Map */}
        <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                 <h3 className="text-2xl font-bold text-birlik-primary mb-4">{t('contact')}</h3>
                 <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-gray-700">
                    <strong className="text-birlik-primary mt-1">{t('phoneLabel')}:</strong>
                    <a href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`} className="hover:text-birlik-primary break-all mt-1">{COMPANY_INFO.phone}</a>
                    
                    <strong className="text-birlik-primary mt-1">{t('emailLabel')}:</strong>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-birlik-primary break-all mt-1">{COMPANY_INFO.email}</a>
                   
                    <strong className="text-birlik-primary mt-1">{t('addressLabel')}:</strong>
                    <span className="mt-1">{COMPANY_INFO.address}</span>

                    <strong className="text-birlik-primary mt-1">{t('workingHoursLabel')}:</strong>
                    <span className="mt-1">{t('workingHoursValue')}</span>
                 </div>
                 <div className="mt-6 border-t border-gray-200 pt-4 flex justify-center items-center gap-x-6">
                    <a href={COMPANY_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-birlik-neutral-charcoal hover:text-birlik-primary transition-colors duration-200 ease-birlik-ease transform hover:scale-110" aria-label="Instagram">
                        {socialIcons.instagram}
                    </a>
                    <a href={COMPANY_INFO.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-birlik-neutral-charcoal hover:text-birlik-primary transition-colors duration-200 ease-birlik-ease transform hover:scale-110" aria-label="Facebook">
                        {socialIcons.facebook}
                    </a>
                    <a href={COMPANY_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-birlik-neutral-charcoal hover:text-birlik-primary transition-colors duration-200 ease-birlik-ease transform hover:scale-110" aria-label="LinkedIn">
                        {socialIcons.linkedin}
                    </a>
                </div>
            </div>

            {/* WhatsApp Consultation CTA */}
            <div className="bg-green-50 p-6 rounded-lg shadow-lg border border-green-200 text-center">
                <h3 className="text-2xl font-bold text-green-800">{t('bookConsultationTitle')}</h3>
                <p className="mt-2 text-green-700">{t('bookConsultationSubtitle')}</p>
                <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center bg-green-500 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 ease-birlik-ease transform hover:scale-105"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="currentColor" className="mr-3"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.12c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.82-1.26-4.38 0-4.54 3.68-8.22 8.22-8.22 2.22 0 4.29.86 5.81 2.38 1.52 1.52 2.38 3.59 2.38 5.82-.01 4.54-3.69 8.22-8.23 8.22zm4.32-5.11c-.24-.12-1.42-.7-1.64-.78-.23-.08-.39-.12-.56.12-.17.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2s-1.5-1.74-1.68-2.04-.03-.28.09-.39c.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.32-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.55-.42-.15 0-.31-.02-.48-.02s-.43.06-.66.3c-.22.24-.86.84-.86 2.07s.88 2.4 1 2.56c.12.16 1.73 2.64 4.2 3.72 2.46 1.08 2.46.72 2.9.7.44-.02 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.11-.22-.18-.46-.3z"/></svg>
                    {t('contactOnWhatsApp')}
                </a>
            </div>

            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={COMPANY_INFO.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t('addressLabel')}
              ></iframe>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;