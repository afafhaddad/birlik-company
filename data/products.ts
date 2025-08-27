
import { Product, ProductCategory, ProductSeries, StockStatus, Material } from '../types';

function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export const products: Product[] = [
  // A) PS Polimer Duvar Lambiri (Premium + Eco)
  {
    SKU: 'PS-MN-20120', Name_TR: 'PS Polimer Duvar Lambiri 12 cm - Mermer Noir', Name_EN: 'PS Fluted Wall Panel 12 cm - Mermer Noir', Name_AR: 'بديل خشب PS 12 سم - Mermer Noir', Category: ProductCategory.PS_FLUTED, Series: ProductSeries.PREMIUM,
    Short_Desc_TR: 'Modern ve şık mekanlar için mermer desenli duvar lambirisi.', Short_Desc_EN: 'Marble patterned wall panel for modern and stylish spaces.', Short_Desc_AR: 'لوح حائط بنمط رخامي للمساحات العصرية والأنيقة.',
    Material: Material.PS, Surface_Finish: 'uvMat', Width_cm: 12, Height_or_Length_cm: 290, Thickness_cm: 1.5, Pack_Size: 12, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Polimer Duvar Lambiri 12 cm - Mermer Noir'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297590/ps_fluted_PS-MN-20120_main_01_twv5u0.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297594/ps_fluted_PS-MN-20120_room_02_lb1ea0.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297593/ps_fluted_PS-MN-20120_room_01_lic7tq.png']
  },
  {
    SKU: 'PS-RG-20120', Name_TR: 'PS Polimer Duvar Lambiri 12 cm - Rustic Gold', Name_EN: 'PS Fluted Wall Panel 12 cm - Rustic Gold', Name_AR: 'بديل خشب PS 12 سم - Rustic Gold', Category: ProductCategory.PS_FLUTED, Series: ProductSeries.PREMIUM,
    Short_Desc_TR: 'Altın yansımalı rustik dokusuyla dikkat çeken duvar lambirisi.', Short_Desc_EN: 'Wall panel that stands out with its rustic texture and gold reflections.', Short_Desc_AR: 'لوح حائط يبرز بملمسه الريفي وانعكاساته الذهبية.',
    Material: Material.PS, Surface_Finish: 'reflective', Width_cm: 12, Height_or_Length_cm: 290, Thickness_cm: 1.5, Pack_Size: 12, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Polimer Duvar Lambiri 12 cm - Rustic Gold'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297592/ps_fluted_PS-RG-20120_main_01_dphqpe.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297601/ps_fluted_PS-RG-20120_room_01_m78ize.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297600/ps_fluted_PS-RG-20120_room_02_dspkmu.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297595/ps_fluted_PS-RG-20120_room_03_i8ujsa.jpg']
  },
  {
    SKU: 'PS-DT-20120', Name_TR: 'PS Polimer Duvar Lambiri 12 cm - Dark Timber', Name_EN: 'PS Fluted Wall Panel 12 cm - Dark Timber', Name_AR: 'بديل خشب PS 12 سم - Dark Timber', Category: ProductCategory.PS_FLUTED, Series: ProductSeries.PREMIUM,
    Short_Desc_TR: 'Koyu ahşap tonlarıyla sıcak ve doğal bir atmosfer yaratın.', Short_Desc_EN: 'Create a warm and natural atmosphere with dark wood tones.', Short_Desc_AR: 'اخلق جوًا دافئًا وطبيعيًا مع درجات الخشب الداكنة.',
    Material: Material.PS, Surface_Finish: 'woodLook', Width_cm: 12, Height_or_Length_cm: 290, Thickness_cm: 1.5, Pack_Size: 12, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Polimer Duvar Lambiri 12 cm - Dark Timber'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297573/ps_fluted_PS-DT-20120_main_01_gwjqch.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297574/ps_fluted_PS-DT-20120_room_01_adjcex.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297567/ps_fluted_PS-DT-20120_room_02_cx8drg.jpg']
  },
  {
    SKU: 'PS-DTB-20120', Name_TR: 'PS Polimer Duvar Lambiri 12 cm - Dark Timber Black', Name_EN: 'PS Fluted Wall Panel 12 cm - Dark Timber Black', Name_AR: 'بديل خشب PS 12 سم - Dark Timber Black', Category: ProductCategory.PS_FLUTED, Series: ProductSeries.PREMIUM,
    Short_Desc_TR: 'Siyah detaylı koyu ahşap görünümüyle modern ve asil bir dokunuş.', Short_Desc_EN: 'A modern and noble touch with a dark wood look with black details.', Short_Desc_AR: 'لمسة عصرية ونبيلة بمظهر الخشب الداكن مع تفاصيل سوداء.',
    Material: Material.PS, Surface_Finish: 'woodLook', Width_cm: 12, Height_or_Length_cm: 290, Thickness_cm: 1.5, Pack_Size: 12, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Polimer Duvar Lambiri 12 cm - Dark Timber Black'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297570/ps_fluted_PS-DTB-20120_main_01_j1nqzz.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297569/ps_fluted_PS-DTB-20120_room_01_mw4f4q.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297569/ps_fluted_PS-DTB-20120_room_02_mp3crp.png']
  },
  {
    SKU: 'PS-VT-20120', Name_TR: 'PS Polimer Duvar Lambiri 12 cm - Vintage Timber', Name_EN: 'PS Fluted Wall Panel 12 cm - Vintage Timber', Name_AR: 'بديل خشب PS 12 سم - Vintage Timber', Category: ProductCategory.PS_FLUTED, Series: ProductSeries.PREMIUM,
    Short_Desc_TR: 'Vintage ahşap dokusuyla mekanlarınıza nostaljik bir hava katın.', Short_Desc_EN: 'Add a nostalgic atmosphere to your spaces with its vintage wood texture.', Short_Desc_AR: 'أضف جوًا حنينيًا إلى مساحاتك بملمسها الخشبي العتيق.',
    Material: Material.PS, Surface_Finish: 'woodLook', Width_cm: 12, Height_or_Length_cm: 290, Thickness_cm: 1.5, Pack_Size: 12, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Polimer Duvar Lambiri 12 cm - Vintage Timber'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297602/ps_fluted_PS-VT-20120_main_01_bcgb9z.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297599/ps_fluted_PS-VT-20120_room_01_m1pri7.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297596/ps_fluted_PS-VT-20120_room_02_iiebnw.jpg']
  },
  {
    SKU: 'PS-LT-20120', Name_TR: 'PS Polimer Duvar Lambiri 12 cm - Light Timber', Name_EN: 'PS Fluted Wall Panel 12 cm - Light Timber', Name_AR: 'بديل خشب PS 12 سم - Light Timber', Category: ProductCategory.PS_FLUTED, Series: ProductSeries.PREMIUM,
    Short_Desc_TR: 'Açık renkli ahşap deseniyle ferah ve aydınlık ortamlar için ideal.', Short_Desc_EN: 'Ideal for spacious and bright environments with its light-colored wood pattern.', Short_Desc_AR: 'مثالي للبيئات الفسيحة والمشرقة بنمط الخشب فاتح اللون.',
    Material: Material.PS, Surface_Finish: 'woodLook', Width_cm: 12, Height_or_Length_cm: 290, Thickness_cm: 1.5, Pack_Size: 12, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Polimer Duvar Lambiri 12 cm - Light Timber'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297586/ps_fluted_PS-LT-20120_main_01_dtuivk.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297584/ps_fluted_PS-LT-20120_room_01_ilfzi7.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297586/ps_fluted_PS-LT-20120_room_02_lfttya.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297586/ps_fluted_PS-LT-20120_texture_01_qq6ch0.png']
  },
  {
    SKU: 'PS-LTB-20120', Name_TR: 'PS Polimer Duvar Lambiri 12 cm - Light Timber Black', Name_EN: 'PS Fluted Wall Panel 12 cm - Light Timber Black', Name_AR: 'بديل خشب PS 12 سم - Light Timber Black', Category: ProductCategory.PS_FLUTED, Series: ProductSeries.PREMIUM,
    Short_Desc_TR: 'Siyah çıtalı açık ahşap görünümüyle kontrast ve modern bir stil.', Short_Desc_EN: 'A contrasting and modern style with a light wood look with black slats.', Short_Desc_AR: 'أسلوب متباين وعصري بمظهر خشب فاتح مع شرائح سوداء.',
    Material: Material.PS, Surface_Finish: 'woodLook', Width_cm: 12, Height_or_Length_cm: 290, Thickness_cm: 1.5, Pack_Size: 12, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Polimer Duvar Lambiri 12 cm - Light Timber Black'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297593/ps_fluted_PS-LTB-20120_main_01_s27sae.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297587/ps_fluted_PS-LTB-20120_room_01_qswzr2.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297587/ps_fluted_PS-LTB-20120_room_02_qpx2ye.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297587/ps_fluted_PS-LTB-20120_detail_01_ngd5d7.jpg']
  },
  {
    SKU: 'PS-AB-20120', Name_TR: 'PS Polimer Duvar Lambiri 12 cm - Antrasit Black', Name_EN: 'PS Fluted Wall Panel 12 cm - Antrasit Black', Name_AR: 'بديل خشب PS 12 سم - Antrasit Black', Category: ProductCategory.PS_FLUTED, Series: ProductSeries.PREMIUM,
    Short_Desc_TR: 'Mat antrasit siyah rengiyle minimalist ve güçlü bir ifade.', Short_Desc_EN: 'A minimalist and strong statement with its matte anthracite black color.', Short_Desc_AR: 'بيان بسيط وقوي بلونه الأسود الأنثراسيت غير اللامع.',
    Material: Material.PS, Surface_Finish: 'uvMat', Width_cm: 12, Height_or_Length_cm: 290, Thickness_cm: 1.5, Pack_Size: 12, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Polimer Duvar Lambiri 12 cm - Antrasit Black'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297556/ps_fluted_PS-AB-20120_main_01_puymui.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297556/ps_fluted_PS-AB-20120_room_01_g2vivn.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297557/ps_fluted_PS-AB-20120_room_02_zlzpha.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297558/ps_fluted_PS-AB-20120_room_03_ee3zds.jpg']
  },
  {
    SKU: 'PS-AW-20120', Name_TR: 'PS Polimer Duvar Lambiri 12 cm - Adaptable White', Name_EN: 'PS Fluted Wall Panel 12 cm - Adaptable White', Name_AR: 'بديل خشب PS 12 سم - Adaptable White', Category: ProductCategory.PS_FLUTED, Series: ProductSeries.PREMIUM,
    Short_Desc_TR: 'Her dekora uyum sağlayan, boyanabilir, mat beyaz yüzey.', Short_Desc_EN: 'Paintable, matte white surface that adapts to any decor.', Short_Desc_AR: 'سطح أبيض غير لامع قابل للطلاء يتكيف مع أي ديكور.',
    Material: Material.PS, Surface_Finish: 'matteWhite', Width_cm: 12, Height_or_Length_cm: 290, Thickness_cm: 1.5, Pack_Size: 12, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Polimer Duvar Lambiri 12 cm - Adaptable White'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297560/ps_fluted_PS-AW-20120_main_01_mhmol0.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297557/ps_fluted_PS-AW-20120_room_01_gp72bu.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297559/ps_fluted_PS-AW-20120_room_02_ocr85f.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297559/ps_fluted_PS-AW-20120_room_03_dhlwvj.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297560/ps_fluted_PS-AW-20120_room_04_r9avil.jpg']
  },
  {
    SKU: 'PS-ECO-R-12120', Name_TR: 'PS Polimer Duvar Lambiri 11.5 cm (Eco) - Royal', Name_EN: 'PS Fluted Wall Panel 11.5 cm (Eco) - Royal', Name_AR: 'بديل خشب PS 11.5 سم (Eco) - Royal', Category: ProductCategory.PS_FLUTED, Series: ProductSeries.ECO,
    Short_Desc_TR: 'Ekonomik seride yansıtıcı yüzeyiyle kraliyet şıklığı.', Short_Desc_EN: 'Royal elegance with a reflective surface in the economy series.', Short_Desc_AR: 'أناقة ملكية بسطح عاكس في السلسلة الاقتصادية.',
    Material: Material.PS, Surface_Finish: 'reflective', Width_cm: 11.5, Height_or_Length_cm: 290, Thickness_cm: 0.6, Pack_Size: 22, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Polimer Duvar Lambiri 11.5 cm (Eco) - Royal'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297582/ps_fluted_PS-ECO-R-12120_main_01_degrze.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297590/ps_fluted_PS-ECO-R-12120_room_01_ximywt.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297584/ps_fluted_PS-ECO-R-12120_room_03_ahlnpg.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297584/ps_fluted_PS-ECO-R-12120_texture_01_nrphui.jpg']
  },
  {
    SKU: 'PS-ECO-DTB-12120', Name_TR: 'PS Polimer Duvar Lambiri 11.5 cm (Eco) - Dark Timber Black', Name_EN: 'PS Fluted Wall Panel 11.5 cm (Eco) - Dark Timber Black', Name_AR: 'بديل خشب PS 11.5 سم (Eco) - Dark Timber Black', Category: ProductCategory.PS_FLUTED, Series: ProductSeries.ECO,
    Short_Desc_TR: 'Ekonomik ve şık, siyah detaylı koyu ahşap lambiri.', Short_Desc_EN: 'Economical and stylish, dark wood paneling with black details.', Short_Desc_AR: 'ألواح خشبية داكنة اقتصادية وأنيقة مع تفاصيل سوداء.',
    Material: Material.PS, Surface_Finish: 'woodLook', Width_cm: 11.5, Height_or_Length_cm: 290, Thickness_cm: 0.6, Pack_Size: 22, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Polimer Duvar Lambiri 11.5 cm (Eco) - Dark Timber Black'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297574/ps_fluted_PS-ECO-DTB-12120_main_01_h0wbil.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297583/ps_fluted_PS-ECO-DTB-12120_room_02_e7olut.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297580/ps_fluted_PS-ECO-DTB-12120_room_01_pncgel.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297579/ps_fluted_PS-ECO-DTB-12120_room_03_owlqt3.png']
  },
  {
    SKU: 'PS-ECO-AB-12120', Name_TR: 'PS Polimer Duvar Lambiri 11.5 cm (Eco) - Antrasit Black', Name_EN: 'PS Fluted Wall Panel 11.5 cm (Eco) - Antrasit Black', Name_AR: 'بديل خشب PS 11.5 سم (Eco) - Antrasit Black', Category: ProductCategory.PS_FLUTED, Series: ProductSeries.ECO,
    Short_Desc_TR: 'Modern tasarımlar için ekonomik mat antrasit siyah seçenek.', Short_Desc_EN: 'Economical matte anthracite black option for modern designs.', Short_Desc_AR: 'خيار أسود أنثراسيت غير لامع اقتصادي للتصميمات الحديثة.',
    Material: Material.PS, Surface_Finish: 'uvMat', Width_cm: 11.5, Height_or_Length_cm: 290, Thickness_cm: 0.6, Pack_Size: 22, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Polimer Duvar Lambiri 11.5 cm (Eco) - Antrasit Black'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297570/ps_fluted_PS-ECO-AB-12120_main_01_qykelv.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297570/ps_fluted_PS-ECO-AB-12120_room_01_rucgrb.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297571/ps_fluted_PS-ECO-AB-12120_room_02_lshwry.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297571/ps_fluted_PS-ECO-AB-12120_texture_01_mrjnaq.webp']
  },
  {
    SKU: 'PS-ECO-IG-12120', Name_TR: 'PS Polimer Duvar Lambiri 11.5 cm (Eco) - Icy Gri', Name_EN: 'PS Fluted Wall Panel 11.5 cm (Eco) - Icy Grey', Name_AR: 'بديل خشب PS 11.5 سم (Eco) - Icy Grey', Category: ProductCategory.PS_FLUTED, Series: ProductSeries.ECO,
    Short_Desc_TR: 'Buzlu gri tonlarında, ahşap görünümlü ekonomik duvar lambirisi.', Short_Desc_EN: 'Economical wood-look wall panel in icy grey tones.', Short_Desc_AR: 'لوح حائط اقتصادي بمظهر خشبي بدرجات اللون الرمادي الجليدي.',
    Material: Material.PS, Surface_Finish: 'woodLook', Width_cm: 11.5, Height_or_Length_cm: 290, Thickness_cm: 0.6, Pack_Size: 22, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Polimer Duvar Lambiri 11.5 cm (Eco) - Icy Gri'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297578/ps_fluted_PS-ECO-IG-12120_main_01_ttcugb.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297576/ps_fluted_PS-ECO-IG-12120_room_01_dqorrw.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297586/ps_fluted_PS-ECO-IG-12120_room_02_feaqyx.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297579/ps_fluted_PS-ECO-IG-12120_room_03_yzeuk3.jpg']
  },
  {
    SKU: 'PS-ECO-P-12120', Name_TR: 'PS Polimer Duvar Lambiri 11.5 cm (Eco) - Platinum', Name_EN: 'PS Fluted Wall Panel 11.5 cm (Eco) - Platinum', Name_AR: 'بديل خشب PS 11.5 سم (Eco) - Platinum', Category: ProductCategory.PS_FLUTED, Series: ProductSeries.ECO,
    Short_Desc_TR: 'Platin rengiyle aydınlık ve modern bir görünüm sunan ekonomik seri.', Short_Desc_EN: 'Economy series offering a bright and modern look with its platinum color.', Short_Desc_AR: 'سلسلة اقتصادية تقدم مظهرًا مشرقًا وعصريًا بلونها البلاتيني.',
    Material: Material.PS, Surface_Finish: 'uvMat', Width_cm: 11.5, Height_or_Length_cm: 290, Thickness_cm: 0.6, Pack_Size: 22, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Polimer Duvar Lambiri 11.5 cm (Eco) - Platinum'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297581/ps_fluted_PS-ECO-P-12120_main_01_plc5tz.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297580/ps_fluted_PS-ECO-P-12120_room_01_r2hvdr.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297581/ps_fluted_PS-ECO-P-12120_room_02_usahc9.jpg']
  },
  {
    SKU: 'PS-ECO-C-12120', Name_TR: 'PS Polimer Duvar Lambiri 11.5 cm (Eco) - Cappucino', Name_EN: 'PS Fluted Wall Panel 11.5 cm (Eco) - Cappucino', Name_AR: 'بديل خشب PS 11.5 سم (Eco) - Cappucino', Category: ProductCategory.PS_FLUTED, Series: ProductSeries.ECO,
    Short_Desc_TR: 'Yansıtıcılı yüzeyi ve sıcak cappuccino tonlarıyla davetkar bir atmosfer.', Short_Desc_EN: 'An inviting atmosphere with its reflective surface and warm cappuccino tones.', Short_Desc_AR: 'جو جذاب بسطحه العاكس ودرجات الكابتشينو الدافئة.',
    Material: Material.PS, Surface_Finish: 'reflective', Width_cm: 11.5, Height_or_Length_cm: 290, Thickness_cm: 0.6, Pack_Size: 22, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Polimer Duvar Lambiri 11.5 cm (Eco) - Cappucino'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297575/ps_fluted_PS-ECO-C-12120_main_01_biz1rh.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297578/ps_fluted_PS-ECO-C-12120_room_01_qs8w9y.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297572/ps_fluted_PS-ECO-C-12120_room_02_vdiuoh.jpg']
  },

  // B) PVC UV Kaplamalı Mermer Levhalar
  {
    SKU: 'PVC-PARMA-244x122', Name_TR: 'Parma UV Mermer Levha', Name_EN: 'PVC UV Marble Sheet - Parma', Name_AR: 'بديل رخام PVC UV – Parma', Category: ProductCategory.PVC_UV_MARBLE,
    Short_Desc_TR: 'Parlak yüzeyli, yüksek kaliteli Parma desenli mermer levha.', Short_Desc_EN: 'High-quality Parma patterned marble sheet with a glossy surface.', Short_Desc_AR: 'لوح رخام عالي الجودة بنمط بارما وسطح لامع.',
    Material: Material.PVC, Surface_Finish: 'glossy', Width_cm: 122, Height_or_Length_cm: 244, Thickness_mm: 0.3, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('Parma UV Mermer Levha'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297605/pvc_uv_marble_PVC-PARMA-244x122_main_01_s7aoxc.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297609/pvc_uv_marble_PVC-PARMA-244x122_room_01_cyjjh5.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297609/pvc_uv_marble_PVC-PARMA-244x122_room_02_x16qay.png']
  },
  {
    SKU: 'PVC-TARANTO-244x122', Name_TR: 'Taranto UV Mermer Levha', Name_EN: 'PVC UV Marble Sheet - Taranto', Name_AR: 'بديل رخام PVC UV – Taranto', Category: ProductCategory.PVC_UV_MARBLE,
    Short_Desc_TR: 'Zarif Taranto deseniyle mekanlarınıza lüks bir dokunuş katın.', Short_Desc_EN: 'Add a touch of luxury to your spaces with the elegant Taranto pattern.', Short_Desc_AR: 'أضف لمسة من الفخامة إلى مساحاتك بنمط تارانتو الأنيق.',
    Material: Material.PVC, Surface_Finish: 'glossy', Width_cm: 122, Height_or_Length_cm: 244, Thickness_mm: 0.3, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('Taranto UV Mermer Levha'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297610/pvc_uv_marble_PVC-TARANTO-244x122_main_01_j97jef.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297613/pvc_uv_marble_PVC-TARANTO-244x122_room_01_s2moei.png']
  },
  {
    SKU: 'PVC-ONYX-244x122', Name_TR: 'Onyx UV Mermer Levha', Name_EN: 'PVC UV Marble Sheet - Onyx', Name_AR: 'بديل رخام PVC UV - Onyx', Category: ProductCategory.PVC_UV_MARBLE,
    Short_Desc_TR: 'Göz alıcı Onyx deseniyle dramatik ve sofistike bir görünüm.', Short_Desc_EN: 'A dramatic and sophisticated look with a stunning Onyx pattern.', Short_Desc_AR: 'مظهر درامي ومتطور بنمط أونيكس مذهل.',
    Material: Material.PVC, Surface_Finish: 'glossy', Width_cm: 122, Height_or_Length_cm: 244, Thickness_mm: 0.3, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('Onyx UV Mermer Levha'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297602/pvc_uv_marble_PVC-ONYX-244x122_main_01_xolptr.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297608/pvc_uv_marble_PVC-ONYX-244x122_room_01_g43xdw.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297602/pvc_uv_marble_PVC-ONYX-244x122_room_02_jczffk.png']
  },
  {
    SKU: 'PVC-PORTOFINO-244x122', Name_TR: 'Portofino UV Mermer Levha', Name_EN: 'PVC UV Marble Sheet - Portofino', Name_AR: 'بديل رخام PVC UV – Portofino', Category: ProductCategory.PVC_UV_MARBLE,
    Short_Desc_TR: 'Portofino mermerinin doğal ve zarif damarlarıyla estetik bir seçim.', Short_Desc_EN: 'An aesthetic choice with the natural and elegant veins of Portofino marble.', Short_Desc_AR: 'خيار جمالي مع عروق رخام بورتوفينو الطبيعية والأنيقة.',
    Material: Material.PVC, Surface_Finish: 'glossy', Width_cm: 122, Height_or_Length_cm: 244, Thickness_mm: 0.3, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('Portofino UV Mermer Levha'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297606/pvc_uv_marble_PVC-PORTOFINO-244x122_main_01_egkcbb.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297612/pvc_uv_marble_PVC-PORTOFINO-244x122_room_02_eb8zkv.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297613/pvc_uv_marble_PVC-PORTOFINO-244x122_room_01_roblwm.png']
  },
  {
    SKU: 'PVC-FLORENCE-244x122', Name_TR: 'Florence UV Mermer Levha', Name_EN: 'PVC UV Marble Sheet - Florence', Name_AR: 'بديل رخام PVC UV – Florence', Category: ProductCategory.PVC_UV_MARBLE,
    Short_Desc_TR: 'Florence desenli levha ile klasik İtalyan mermer şıklığı.', Short_Desc_EN: 'Classic Italian marble elegance with the Florence patterned sheet.', Short_Desc_AR: 'أناقة الرخام الإيطالي الكلاسيكي مع لوح فلورنسا المنقوش.',
    Material: Material.PVC, Surface_Finish: 'glossy', Width_cm: 122, Height_or_Length_cm: 244, Thickness_mm: 0.3, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('Florence UV Mermer Levha'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297600/pvc_uv_marble_PVC-FLORENCE-244x122_main_01_s3jzzq.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297600/pvc_uv_marble_PVC-FLORENCE-244x122_room_01_jtisku.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297601/pvc_uv_marble_PVC-FLORENCE-244x122_room_02_v1cqg9.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297601/pvc_uv_marble_PVC-FLORENCE-244x122_room_03_mnmioe.jpg']
  },
  
  // C) PS Süpürgelikler (Baseboards)
  {
    SKU: 'PS-SPR-115-1', Name_TR: 'PS LED Aydınlatmayı Destekleyen Süpürgelik 11.5 cm', Name_EN: 'PS Baseboard 11.5 cm (LED Compatible)', Name_AR: 'لوح قاعدة PS 11.5 سم (LED Compatible)', Category: ProductCategory.PS_BASEBOARD,
    Short_Desc_TR: 'LED aydınlatma entegrasyonu için özel kanallı modern süpürgelik.', Short_Desc_EN: 'Modern baseboard with special channels for LED lighting integration.', Short_Desc_AR: 'لوح قاعدة حديث مع قنوات خاصة لدمج إضاءة LED.',
    Material: Material.PS, Surface_Finish: 'matteWhite', Height_or_Length_cm: 240, Thickness_cm: 1.7, Width_cm: 11.5, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS LED Aydinlatmayi Destekleyen Supurgelik 11.5 cm'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297595/ps_baseboard_PS-SPR-115-1_main_01_ja01ku.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297595/ps_baseboard_PS-SPR-115-1_detail_04_mv3imd.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297594/ps_baseboard_PS-SPR-115-1_detail_01_lq4uqv.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297594/ps_baseboard_PS-SPR-115-1_detail_02_uuludh.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297594/ps_baseboard_PS-SPR-115-1_detail_03_fr1fog.jpg']
  },
  {
    SKU: 'PS-SPR-115-2', Name_TR: 'PS Süpürgelik 10 cm', Name_EN: 'PS Baseboard 10 cm', Name_AR: 'لوح قاعدة PS 10', Category: ProductCategory.PS_BASEBOARD,
    Short_Desc_TR: 'Sade ve modern tasarımlar için 10 cm yüksekliğinde PS süpürgelik.', Short_Desc_EN: '10 cm high PS baseboard for simple and modern designs.', Short_Desc_AR: 'لوح قاعدة PS بارتفاع 10 سم للتصميمات البسيطة والحديثة.',
    Material: Material.PS, Surface_Finish: 'matteWhite', Height_or_Length_cm: 240, Thickness_cm: 1.3, Width_cm: 10, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Supurgelik 10 cm'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297596/ps_baseboard_PS-SPR-115-2_main_01_y1b7ij.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297595/ps_baseboard_PS-SPR-115-2_detail_01_zudlwl.jpg']
  },

  // D) PS Duvar Çıtaları (Moldings)
  {
    SKU: 'PS-C-010', Name_TR: 'PS Sınır Çıta 4.8 cm', Name_EN: 'PS Border Molding 4.8 cm', Name_AR: 'قالب حائط PS 4.8 سم (Border)', Category: ProductCategory.PS_MOLDING,
    Short_Desc_TR: 'Duvar panelleri ve çerçeveler için ideal 4.8 cm sınır çıtası.', Short_Desc_EN: 'Ideal 4.8 cm border molding for wall panels and frames.', Short_Desc_AR: 'قالب حدود مثالي بعرض 4.8 سم لألواح الجدران والإطارات.',
    Material: Material.PS, Surface_Finish: 'matteWhite', Height_or_Length_cm: 240, Width_cm: 4.8, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Sinir Cita 4.8 cm'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297560/ps_molding_PS-C-010_main_01_tiobdw.jpg']
  },
  {
    SKU: 'PS-C-103', Name_TR: 'PS Simplex Çıta 2.5 cm', Name_EN: 'PS Simplex Molding 2.5 cm', Name_AR: 'قالب حائط PS 2.5 سم (Simplex)', Category: ProductCategory.PS_MOLDING,
    Short_Desc_TR: 'Minimalist duvar çerçeveleri için 2.5 cm genişliğinde Simplex çıta.', Short_Desc_EN: '2.5 cm wide Simplex molding for minimalist wall frames.', Short_Desc_AR: 'قالب سيمبلكس بعرض 2.5 سم لإطارات الجدران البسيطة.',
    Material: Material.PS, Surface_Finish: 'matteWhite', Height_or_Length_cm: 240, Width_cm: 2.5, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Simplex Cita 2.5 cm'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297564/ps_molding_PS-C-103_main_01_rvqi32.jpg']
  },
  {
    SKU: 'PS-C-105', Name_TR: 'PS Simplex Çıta 4 cm', Name_EN: 'PS Simplex Molding 4 cm', Name_AR: 'قالب حائط PS 4 سم (Simplex)', Category: ProductCategory.PS_MOLDING,
    Short_Desc_TR: 'Daha belirgin duvar tasarımları için 4 cm genişliğinde Simplex çıta.', Short_Desc_EN: '4 cm wide Simplex molding for more prominent wall designs.', Short_Desc_AR: 'قالب سيمبلكس بعرض 4 سم لتصميمات جدران أكثر بروزًا.',
    Material: Material.PS, Surface_Finish: 'matteWhite', Height_or_Length_cm: 240, Width_cm: 4, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Simplex Cita 4 cm'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297564/ps_molding_PS-C-105_main_01_egj54g.jpg']
  },
  {
    SKU: 'PS-C-101', Name_TR: 'PS Stik Çıta 1.5 cm', Name_EN: 'PS Stick Molding 1.5 cm', Name_AR: 'قالب حائط PS 1.5 سم (Stick)', Category: ProductCategory.PS_MOLDING,
    Short_Desc_TR: 'İnce ve zarif detaylar için 1.5 cm genişliğinde Stik çıta.', Short_Desc_EN: '1.5 cm wide Stick molding for fine and elegant details.', Short_Desc_AR: 'قالب ستيك بعرض 1.5 سم للتفاصيل الدقيقة والأنيقة.',
    Material: Material.PS, Surface_Finish: 'matteWhite', Height_or_Length_cm: 240, Width_cm: 1.5, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Stik Cita 1.5 cm'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297563/ps_molding_PS-C-101_main_01_atsrmc.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297563/ps_molding_PS-C-101_room_03_xa3bgd.jpg']
  },
  {
    SKU: 'PS-C-107', Name_TR: 'PS Komplex Çıta 4 cm', Name_EN: 'PS Complex Molding 4 cm', Name_AR: 'قالب حائط PS 4 سم (Complex)', Category: ProductCategory.PS_MOLDING,
    Short_Desc_TR: 'Klasik ve oymalı tasarımlar için 4 cm Komplex duvar çıtası.', Short_Desc_EN: '4 cm Complex wall molding for classic and carved designs.', Short_Desc_AR: 'قالب حائط كومبلكس بعرض 4 سم للتصميمات الكلاسيكية والمنحوتة.',
    Material: Material.PS, Surface_Finish: 'matteWhite', Height_or_Length_cm: 240, Width_cm: 4, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Komplex Cita 4 cm'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297564/ps_molding_PS-C-107_main_01_ipeyaq.jpg']
  },
  {
    SKU: 'PS-C-107A', Name_TR: 'PS Komplex Çıta 2 cm', Name_EN: 'PS Complex Molding 2 cm', Name_AR: 'قالب حائط PS 2 سم (Complex)', Category: ProductCategory.PS_MOLDING,
    Short_Desc_TR: 'Daha küçük ölçekli klasik tasarımlar için 2 cm Komplex çıta.', Short_Desc_EN: '2 cm Complex molding for smaller scale classic designs.', Short_Desc_AR: 'قالب كومبلكس بعرض 2 سم للتصميمات الكلاسيكية ذات النطاق الأصغر.',
    Material: Material.PS, Surface_Finish: 'matteWhite', Height_or_Length_cm: 240, Width_cm: 2, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Komplex Cita 2 cm'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297564/ps_molding_PS-C-107A_main_01_qrdgp7.jpg']
  },
  {
    SKU: 'PS-C-013', Name_TR: 'PS Sınır Çıta 4 cm', Name_EN: 'PS Border Molding 4 cm', Name_AR: 'قالب حائط PS 4 سم (Border)', Category: ProductCategory.PS_MOLDING,
    Short_Desc_TR: 'Çok amaçlı kullanım için 4 cm genişliğinde PS sınır çıtası.', Short_Desc_EN: '4 cm wide PS border molding for multi-purpose use.', Short_Desc_AR: 'قالب حدود PS بعرض 4 سم للاستخدام متعدد الأغراض.',
    Material: Material.PS, Surface_Finish: 'matteWhite', Height_or_Length_cm: 240, Width_cm: 4, Stock_Status: StockStatus.IN_STOCK, Slug: createSlug('PS Sinir Cita 4 cm'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297560/ps_molding_PS-C-013_main_01_k0jbuq.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297560/ps_molding_PS-C-013_room_01_l0jdib.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297560/ps_molding_PS-C-013_room_02_tr3shj.jpg', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297562/ps_molding_PS-C-013_room_03_fmwanp.jpg']
  },

  // E) Poliüretan Dekoratif Motifler
  {
    SKU: 'PU-CK-105M', Name_TR: 'Royal Köşe Motif', Name_EN: 'Royal Corner Motif', Name_AR: 'زخرفة بولي يوريثان - Royal Corner Motif', Category: ProductCategory.PU_MOTIF,
    Short_Desc_TR: 'Klasik ve şık bir görünüm için boyanabilir royal köşe motifi.', Short_Desc_EN: 'Paintable royal corner motif for a classic and elegant look.', Short_Desc_AR: 'زخرفة زاوية ملكية قابلة للطلاء لمظهر كلاسيكي وأنيق.',
    Material: Material.PU, Surface_Finish: 'paintable', Width_cm: 42, Height_or_Length_cm: 42, Compatible_PS_Molding_SKUs: 'PS-C-105', Stock_Status: StockStatus.MADE_TO_ORDER, Slug: createSlug('Royal Kose Motif'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297606/pu_motif_PU-CK-105M_main_01_jpovpz.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297600/pu_motif_PU-CK-105M_detail_01_wtf6hk.jpg']
  },
  {
    SKU: 'PU-CK-103B', Name_TR: 'Greek Köşe Motif', Name_EN: 'Greek Corner Motif', Name_AR: 'زخرفة بولي يوريثان - Greek Corner Motif', Category: ProductCategory.PU_MOTIF,
    Short_Desc_TR: 'Antik Yunan esintili, boyanabilir dekoratif köşe motifi.', Short_Desc_EN: 'Ancient Greek inspired, paintable decorative corner motif.', Short_Desc_AR: 'زخرفة زاوية زخرفية قابلة للطلاء مستوحاة من اليونان القديمة.',
    Material: Material.PU, Surface_Finish: 'paintable', Width_cm: 19, Height_or_Length_cm: 19, Compatible_PS_Molding_SKUs: 'PS-C-105', Stock_Status: StockStatus.MADE_TO_ORDER, Slug: createSlug('Greek Kose Motif'), images: ['https://res.cloudinary.com/dsqrdreft/image/upload/v1756297599/pu_motif_PU-CK-103B_main_01_fwmzt1.png', 'https://res.cloudinary.com/dsqrdreft/image/upload/v1756297598/pu_motif_PU-CK-103B_detail_01_r1kvnt.jpg']
  }
];
