
export enum Language {
  TR = 'tr',
  EN = 'en',
  AR = 'ar',
}

export enum ProductCategory {
  PS_FLUTED = 'ps_fluted',
  PVC_UV_MARBLE = 'pvc_uv_marble',
  PS_BASEBOARD = 'ps_baseboard',
  PS_MOLDING = 'ps_molding',
  PU_MOTIF = 'pu_motif',
}

export enum ProductSeries {
  PREMIUM = 'premium',
  ECO = 'eco',
}

export enum StockStatus {
  IN_STOCK = 'in_stock',
  MADE_TO_ORDER = 'made_to_order',
}

export enum Material {
    PS = 'PS',
    PVC = 'PVC',
    PU = 'PU',
}

export interface Product {
  SKU: string;
  Name_TR: string;
  Name_EN: string;
  Name_AR: string;
  Category: ProductCategory;
  Series?: ProductSeries;
  Short_Desc_TR: string;
  Short_Desc_EN: string;
  Short_Desc_AR: string;
  Material: Material;
  Surface_Finish: string;
  Width_cm?: number;
  Height_or_Length_cm?: number;
  Thickness_cm?: number;
  Thickness_mm?: number;
  Pack_Size?: number;
  Compatible_PS_Molding_SKUs?: string;
  Stock_Status: StockStatus;
  Slug: string;
  images: string[];
}