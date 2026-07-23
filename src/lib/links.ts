// Dış bağlantılar — tek yerden yönetilir
export const APPOINTMENT_URL =
  "https://www.doktortakvimi.com/irem-seyhan-uyarcan/ortodonti-dis-hekimi/manisa"

// İletişim bilgileri — tek yerden yönetilir
export const WHATSAPP_NUMBER = "905527544545"
export const WHATSAPP_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}`
  : "#"

// Cep / genel hat (WhatsApp ile aynı numara)
export const PHONE_DISPLAY = "0552 754 45 45"
export const PHONE_TEL = "tel:+905527544545"
// Sabit hat
export const LANDLINE_DISPLAY = "0236 234 91 16"
export const LANDLINE_TEL = "tel:+902362349116"
// E-posta
export const EMAIL = "iremuyarcan@yahoo.com"
export const EMAIL_URL = "mailto:iremuyarcan@yahoo.com"

// Sosyal hesaplar — tek kaynak (Footer.tsx ve Iletisim.tsx buradan okur;
// index.html'deki schema.org sameAs listesiyle aynı olmalı).
export const INSTAGRAM_URL = "https://www.instagram.com/ortodontimanisa/"
export const FACEBOOK_URL = "https://www.facebook.com/driremuyarcan"

// Çalışma saatleri
export const WORKING_HOURS: { label: string; value: string }[] = [
  { label: "Hafta içi", value: "09:00 – 17:00" },
  { label: "Hafta sonu", value: "09:00 – 14:00" },
]

// Muayenehane adresi ve konumu — tek kaynak (Visit.tsx, Iletisim.tsx ve
// scripts/prerender.ts buradan okur; index.html'deki schema.org ile aynı olmalı).
export const ADDRESS =
  "Anafartalar Mah. 1610 Sok. Bakoğlu Apt. No: 1/3, Şehzadeler / Manisa 45020"
// Gerçek Google Maps konumu (pin tam burada)
export const COORDS = "38.6141386,27.4297752"
export const MAP_EMBED_URL = `https://maps.google.com/maps?q=${COORDS}&z=17&output=embed`
export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${COORDS}`

// Görsel CDN'i: anasayfa/ ve paylasimli/ görselleri jsDelivr üzerinden (düz kök yapı).
// Repo: github.com/aviomarketingofficial/irem-sayhan-website-photos
export const PHOTO_CDN =
  "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main"

// Hero kare dizisi (Apple tarzı). Kareler CDN'de düz kökte.
// İki boyut var: 1920px (masaüstü) ve 780px (telefon, "-780" ekiyle).
// Telefonda 74 kare 4 MB yerine ~1 MB iner; kare SAYISI değişmediği için
// geçişin akıcılığı aynı kalır.
export const HERO_FRAME_COUNT = 74
export const heroFramePath = (i: number, small = false) =>
  `${PHOTO_CDN}/anasayfa-hero-${String(i).padStart(3, "0")}${small ? "-780" : ""}.webp`
