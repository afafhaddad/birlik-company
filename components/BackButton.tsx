
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

interface BackButtonProps {
  to?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to }) => {
  const navigate = useNavigate();
  const { t, dir } = useLanguage();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  const isRtl = dir === 'rtl';

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center mb-6 text-sm font-medium text-birlik-primary hover:text-birlik-primary/80 transition-colors"
      aria-label={t('goBack')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${isRtl ? 'ml-2' : 'mr-2'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      {t('goBack')}
    </button>
  );
};

export default BackButton;
