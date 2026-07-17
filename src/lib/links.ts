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

// Çalışma saatleri
export const WORKING_HOURS: { label: string; value: string }[] = [
  { label: "Hafta içi", value: "09:00 – 17:00" },
  { label: "Hafta sonu", value: "09:00 – 14:00" },
]

// Görsel CDN'i: anasayfa/ ve paylasimli/ görselleri jsDelivr üzerinden (düz kök yapı).
// Repo: github.com/aviomarketingofficial/irem-sayhan-website-photos
export const PHOTO_CDN =
  "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main"

// Hero kare dizisi (Apple tarzı). Kareler CDN'de düz kökte: anasayfa-hero-NNN.webp
export const HERO_FRAME_COUNT = 74
export const heroFramePath = (i: number) =>
  `${PHOTO_CDN}/anasayfa-hero-${String(i).padStart(3, "0")}.webp`
