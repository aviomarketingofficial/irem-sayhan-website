// Blog liste/kart meta verisi — İÇERİK YÜKLEMEDEN kullanılır (kartlar için).
// Okuma süreleri kelime sayısından üretildi (~200 kelime/dk). Yeni yazı
// eklendiğinde bu dosyaya da kayıt eklenmeli.
export type BlogCategoryKey =
  | "seffaf-plak"
  | "dis-teli"
  | "cocuk"
  | "cene"
  | "surec"
  | "agiz-dis"

export const BLOG_CATEGORIES: { key: BlogCategoryKey; label: string }[] = [
  { key: "seffaf-plak", label: "\u015eeffaf Plak" },
  { key: "dis-teli", label: "Di\u015f Teli (Braket)" },
  { key: "cocuk", label: "\u00c7ocuk Ortodontisi" },
  { key: "cene", label: "\u00c7ene Problemleri" },
  { key: "surec", label: "Tedavi S\u00fcreci" },
  { key: "agiz-dis", label: "A\u011f\u0131z ve Di\u015f Sa\u011fl\u0131\u011f\u0131" },
]

export function categoryLabel(key: BlogCategoryKey): string {
  return BLOG_CATEGORIES.find((c) => c.key === key)?.label ?? key
}

// Tüm yazılar aynı gerçek üretim tarihiyle yayında; yeni yazılar kendi
// tarihini alacak (karar: BLOG-TASARIM-KARARLARI.md).
export const BLOG_PUBLISH_DATE = "8 Temmuz 2026"
// Aynı günün ISO biçimi — schema.org JSON-LD (datePublished/dateModified) için.
// BLOG_PUBLISH_DATE değişirse burası da güncellenmeli.
export const BLOG_PUBLISH_DATE_ISO = "2026-07-08"

export const blogMeta: Record<string, { category: BlogCategoryKey; minutes: number }> = {
  "agiz-solunumu-cene-gelisimi": { category: "cocuk", minutes: 5 },
  "braket-cesitleri-karsilastirma": { category: "dis-teli", minutes: 4 },
  "cene-ameliyati-iyilesme-sureci": { category: "cene", minutes: 4 },
  "cene-ameliyati-tedavi-sureci": { category: "cene", minutes: 4 },
  "cene-gerimi-horlama-uyku-apnesi": { category: "cene", minutes: 4 },
  "cocuk-ortodonti-ihtiyaci-belirtileri": { category: "cocuk", minutes: 4 },
  "cocuklarda-cene-genisletme-damaklik": { category: "cocuk", minutes: 4 },
  "cocuklarda-ortodonti-hangi-yas": { category: "cocuk", minutes: 5 },
  "cocuklarda-parmak-emme-dis-etkisi": { category: "cocuk", minutes: 4 },
  "cocuklarda-seffaf-plak-invisalign-first": { category: "cocuk", minutes: 4 },
  "damak-genisletme-aparati-deneyim": { category: "cocuk", minutes: 4 },
  "damon-braket-nedir": { category: "dis-teli", minutes: 4 },
  "dis-siyirma-ipr-nedir": { category: "seffaf-plak", minutes: 4 },
  "dis-teli-agri-ne-kadar-surer": { category: "dis-teli", minutes: 4 },
  "dis-teli-beyaz-leke-onleme": { category: "agiz-dis", minutes: 4 },
  "dis-teli-fiyatini-belirleyen-faktorler": { category: "surec", minutes: 4 },
  "dis-teli-kac-yasinda-takilir": { category: "dis-teli", minutes: 4 },
  "dis-teli-kontrol-sikligi": { category: "surec", minutes: 4 },
  "dis-teli-mi-seffaf-plak-mi": { category: "seffaf-plak", minutes: 4 },
  "dis-teli-nasil-temizlenir": { category: "agiz-dis", minutes: 4 },
  "dis-teli-nefesli-calgilar": { category: "dis-teli", minutes: 4 },
  "dis-teli-oncesi-bilinmesi-gerekenler": { category: "dis-teli", minutes: 4 },
  "dis-teli-renkleri": { category: "dis-teli", minutes: 4 },
  "dis-teli-sgk-karsiliyor-mu": { category: "surec", minutes: 5 },
  "dis-teli-tedavisi-ne-kadar-surer": { category: "surec", minutes: 4 },
  "dis-teli-varken-ne-yenir-ne-yenmez": { category: "dis-teli", minutes: 4 },
  "dis-teli-yuz-seklini-degistirir-mi": { category: "dis-teli", minutes: 4 },
  "dis-teliyle-spor-yapmak": { category: "dis-teli", minutes: 4 },
  "erken-sut-disi-kaybi-yer-tutucu": { category: "cocuk", minutes: 4 },
  "gorunmez-dis-teli-lingual-ortodonti": { category: "dis-teli", minutes: 4 },
  "gummy-smile-dis-eti-gulusu": { category: "cene", minutes: 4 },
  "invisalign-atasmani-nedir": { category: "seffaf-plak", minutes: 4 },
  "invisalign-nedir-nasil-calisir": { category: "seffaf-plak", minutes: 4 },
  "lingual-dis-teli-konusma-uyum": { category: "dis-teli", minutes: 4 },
  "manisa-ortodonti-tedavisi-rehberi": { category: "surec", minutes: 4 },
  "ortodonti-ilk-muayenede-ne-yapilir": { category: "surec", minutes: 4 },
  "ortodonti-sonrasi-disler-eski-haline-doner-mi": { category: "surec", minutes: 4 },
  "ortodontik-acil-durumlar": { category: "dis-teli", minutes: 4 },
  "ortognatik-cerrahi-ne-zaman-gerekir": { category: "cene", minutes: 4 },
  "pekistirme-retainer-ne-kadar-takilir": { category: "surec", minutes: 4 },
  "seffaf-plak-gunde-kac-saat-takilir": { category: "seffaf-plak", minutes: 4 },
  "seffaf-plak-nasil-temizlenir": { category: "seffaf-plak", minutes: 4 },
  "seffaf-plak-refinement-ek-plak": { category: "seffaf-plak", minutes: 4 },
}
