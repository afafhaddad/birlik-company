
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Product } from '../types';
import { products } from '../data/products';


// --- SHARED COMPONENTS ---

interface CalculatorWrapperProps {
  children: React.ReactNode;
}

const CalculatorWrapper: React.FC<CalculatorWrapperProps> = ({ children }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {children}
    </div>
  );
};

interface CalculatorInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

const CalculatorInput: React.FC<CalculatorInputProps> = ({
  label,
  value,
  onChange,
  placeholder = "0",
  type = "number"
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min="0"
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-birlik-primary focus:border-birlik-primary sm:text-sm"
      />
    </div>
  );
};


interface ResultRowProps {
    label: string;
    value: React.ReactNode;
}

const ResultRow: React.FC<ResultRowProps> = ({ label, value }) => (
    <div className="flex justify-between items-center py-2 border-b last:border-b-0">
        <span className="text-gray-600">{label}</span>
        <span className="font-bold text-birlik-primary">{value}</span>
    </div>
);


// --- INDIVIDUAL CALCULATORS ---

interface CalculatorProps {
  product?: Product;
}

export const FlutedPanelCalculator: React.FC<CalculatorProps> = ({ product }) => {
  const { t } = useLanguage();
  const [wallWidth, setWallWidth] = useState('');
  const [wallHeight, setWallHeight] = useState('');

  const panelWidth = product?.Width_cm ?? 12;
  const panelLength = product?.Height_or_Length_cm ?? 290;

  const results = useMemo(() => {
    const ww = parseFloat(wallWidth);
    const wh = parseFloat(wallHeight);

    if (!ww || !wh || ww <= 0 || wh <= 0) return null;

    const panelsAcross = Math.ceil(ww / panelWidth);
    const pieces = panelsAcross;
    const offcutPerPiece = Math.max(panelLength - wh, 0);
    const totalOffcut = offcutPerPiece * pieces;
    const showWarning = wh > panelLength;

    return { pieces, offcutPerPiece, totalOffcut, showWarning };
  }, [wallWidth, wallHeight, panelWidth, panelLength]);

  return (
    <CalculatorWrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CalculatorInput label={t('wallWidth')} value={wallWidth} onChange={(e) => setWallWidth(e.target.value)} />
        <CalculatorInput label={t('wallHeight')} value={wallHeight} onChange={(e) => setWallHeight(e.target.value)} />
      </div>
      {results && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">{t('result')}</h3>
          <div className="bg-birlik-neutral-offwhite p-4 rounded-md">
            <ResultRow label={t('requiredPieces')} value={`${results.pieces} ${t('unitPieces')}`} />
            <ResultRow label={t('offcutPerPiece')} value={`${results.offcutPerPiece.toFixed(2)} cm`} />
            <ResultRow label={t('totalOffcut')} value={`${results.totalOffcut.toFixed(2)} cm`} />
          </div>
          {results.showWarning && (
              <p className="mt-4 text-sm text-yellow-700 bg-yellow-100 p-3 rounded-md">{t('heightWarning')}</p>
          )}
        </div>
      )}
    </CalculatorWrapper>
  );
};


export const MarbleSheetCalculator: React.FC<CalculatorProps> = ({ product }) => {
    const { t } = useLanguage();
    const [areaWidth, setAreaWidth] = useState('');
    const [areaHeight, setAreaHeight] = useState('');
    const [waste, setWaste] = useState('10');

    const sheetWidth = product?.Width_cm ?? 122;
    const sheetHeight = product?.Height_or_Length_cm ?? 244;

    const results = useMemo(() => {
        const aw = parseFloat(areaWidth);
        const ah = parseFloat(areaHeight);
        const wastePercent = parseFloat(waste) / 100;

        if (!aw || !ah || aw <= 0 || ah <= 0 || isNaN(wastePercent)) return null;
        
        const sheetsX = Math.ceil(aw / sheetWidth);
        const sheetsY = Math.ceil(ah / sheetHeight);
        const baseQty = sheetsX * sheetsY;
        const totalQty = Math.ceil(baseQty * (1 + wastePercent));

        return { quantity: totalQty };
    }, [areaWidth, areaHeight, waste, sheetWidth, sheetHeight]);

    return (
        <CalculatorWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <CalculatorInput label={t('areaWidth')} value={areaWidth} onChange={(e) => setAreaWidth(e.target.value)} />
                <CalculatorInput label={t('areaHeight')} value={areaHeight} onChange={(e) => setAreaHeight(e.target.value)} />
                <CalculatorInput label={t('wastePercentage')} value={waste} onChange={(e) => setWaste(e.target.value)} />
            </div>
            {results && (
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">{t('result')}</h3>
                     <div className="bg-birlik-neutral-offwhite p-4 rounded-md">
                        <ResultRow label={t('requiredSheets')} value={`${results.quantity} ${t('unitPieces')}`} />
                    </div>
                </div>
            )}
        </CalculatorWrapper>
    );
};

export const BaseboardCalculator: React.FC<CalculatorProps> = ({ product }) => {
    const { t } = useLanguage();
    const [totalLength, setTotalLength] = useState('');

    const pieceLength = product?.Height_or_Length_cm ?? 240;

    const results = useMemo(() => {
        const tl = parseFloat(totalLength);
        if (!tl || tl <= 0) return null;

        const pieces = Math.ceil(tl / pieceLength);
        const totalWaste = (pieces * pieceLength) - tl;

        return { pieces, totalWaste };
    }, [totalLength, pieceLength]);

    return (
        <CalculatorWrapper>
            <CalculatorInput label={t('totalWallLength')} value={totalLength} onChange={(e) => setTotalLength(e.target.value)} />
            {results && (
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">{t('result')}</h3>
                    <div className="bg-birlik-neutral-offwhite p-4 rounded-md">
                        <ResultRow label={t('requiredPieces')} value={`${results.pieces} ${t('unitPieces')}`} />
                        <ResultRow label={t('totalWaste')} value={`${results.totalWaste.toFixed(2)} cm`} />
                    </div>
                    <p className="mt-4 text-sm text-gray-600 bg-gray-100 p-3 rounded-md">{t('baseboardTip')}</p>
                </div>
            )}
        </CalculatorWrapper>
    );
};


export const MoldingCalculator: React.FC<CalculatorProps> = ({ product }) => {
    const { t } = useLanguage();
    const [frameWidth, setFrameWidth] = useState('');
    const [frameHeight, setFrameHeight] = useState('');

    const pieceLength = product?.Height_or_Length_cm ?? 240;

    const results = useMemo(() => {
        const fw = parseFloat(frameWidth);
        const fh = parseFloat(frameHeight);
        if (!fw || !fh || fw <= 0 || fh <= 0) return null;

        const perimeter = 2 * (fw + fh);
        const pieces = Math.ceil(perimeter / pieceLength);
        const totalWaste = (pieces * pieceLength) - perimeter;
        
        return { perimeter, pieces, totalWaste };
    }, [frameWidth, frameHeight, pieceLength]);

    return (
        <CalculatorWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CalculatorInput label={t('frameWidth')} value={frameWidth} onChange={(e) => setFrameWidth(e.target.value)} />
                <CalculatorInput label={t('frameHeight')} value={frameHeight} onChange={(e) => setFrameHeight(e.target.value)} />
            </div>
            {results && (
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">{t('result')}</h3>
                     <div className="bg-birlik-neutral-offwhite p-4 rounded-md">
                        <ResultRow label={t('totalPerimeter')} value={`${results.perimeter.toFixed(2)} cm`} />
                        <ResultRow label={t('requiredPieces')} value={`${results.pieces} ${t('unitPieces')}`} />
                        <ResultRow label={t('totalWaste')} value={`${results.totalWaste.toFixed(2)} cm`} />
                    </div>
                    <p className="mt-4 text-sm text-gray-600 bg-gray-100 p-3 rounded-md">{t('moldingNote')}</p>
                </div>
            )}
        </CalculatorWrapper>
    );
};

export const MotifInfo: React.FC<CalculatorProps> = ({ product }) => {
    const { t, language } = useLanguage();
    const compatibleSKU = product?.Compatible_PS_Molding_SKUs;
    const compatibleProduct = compatibleSKU ? products.find(p => p.SKU === compatibleSKU) : null;
    
    if (!compatibleProduct) return null;

    const getLink = (sku: string) => {
        switch(language) {
            case 'en': return `/en/product/${sku}`;
            case 'ar': return `/ar/product/${sku}`;
            default: return `/urun/${sku}`;
        }
    };
    
    const getProductName = (p: Product) => {
        if (language === 'en') return p.Name_EN;
        if (language === 'ar') return p.Name_AR;
        return p.Name_TR;
    }

    return (
        <CalculatorWrapper>
            <h3 className="font-semibold mb-2">{t('compatibleMolding')}</h3>
            <Link to={getLink(compatibleProduct.SKU)} className="text-birlik-primary hover:underline">
                {getProductName(compatibleProduct)} (SKU: {compatibleProduct.SKU})
            </Link>
        </CalculatorWrapper>
    );
};
