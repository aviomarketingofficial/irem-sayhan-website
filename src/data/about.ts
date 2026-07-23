// Hakkımda sayfası içeriği — TEK KAYNAK.
// pages/Hakkimda.tsx (kullanıcıya gösterir) ve scripts/prerender.ts
// (botlar için statik HTML'e yazar) aynı veriyi okur.

export const ABOUT_LEAD =
  "2009 yılından bu yana Manisa'daki kendi muayenehanesinde yetişkinler ve çocuklar için ortodontik tedaviler uyguluyor. Diş ve çene düzensizliklerinde, sizi dinleyerek ve süreci açıkça anlatarak yola çıkmayı önemsiyor."

export const ABOUT_PARAGRAPHS: string[] = [
  "1979'da Manisa'da doğdu. Lisans eğitimini Ege Üniversitesi Diş Hekimliği Fakültesi'nde tamamladıktan sonra aynı üniversitenin Ortodonti Ana Bilim Dalı'nda uzmanlığını aldı.",
  "2009'dan bu yana Şehzadeler, Manisa'daki kendi muayenehanesinde yalnızca ortodonti üzerine çalışıyor. Tel tedavisinden şeffaf plak ve görünmez ortodontiye kadar farklı yöntemleri, kişinin ihtiyacına göre değerlendiriyor.",
  "Ortodontinin yalnızca düzgün dişler değil, sağlıklı bir kapanış ve rahat bir gülümseme meselesi olduğuna inanıyor. Bu yüzden tedaviye başlamadan önce muayene ve ölçümlerle hangi yolun size uygun olduğunu birlikte konuşmayı tercih ediyor.",
]

export type TimelineEntry = { year: string; title: string; detail: string }

export const TIMELINE: TimelineEntry[] = [
  {
    year: "2003",
    title: "Diş Hekimliği mezuniyeti",
    detail: "Ege Üniversitesi Diş Hekimliği Fakültesi'nden mezun oldu.",
  },
  {
    year: "2009",
    title: "Ortodonti uzmanlığı",
    detail:
      "Ege Üniversitesi Diş Hekimliği Fakültesi Ortodonti Ana Bilim Dalı'nda uzmanlık eğitimini tamamladı.",
  },
  {
    year: "2009'dan bugüne",
    title: "Manisa'da kendi muayenehanesi",
    detail:
      "Şehzadeler, Manisa'daki kendi muayenehanesinde ortodonti uzmanı olarak hasta kabul ediyor.",
  },
]

export const INTERESTS: string[] = [
  "Diş çapraşıklığı",
  "Sınıf 3 maloklüzyonlar",
  "Çene problemleri",
  "Gömülü dişler",
  "Dudak ve damak yarıkları",
  "Şeffaf plak tedavisi",
  "Lingual (görünmez) ortodonti",
  "Ortognatik (cerrahi destekli) ortodonti",
]

export type AboutValue = { title: string; text: string }

export const VALUES: AboutValue[] = [
  {
    title: "Anlaşılır anlatım",
    text: "Tedavi sürecini, seçenekleri ve nedenlerini sade bir dille anlatır. Her aşamada ne olduğunu bilirsiniz.",
  },
  {
    title: "Kişiye özel planlama",
    text: "Her ağız yapısı farklıdır. Tedavi, sizin diş ve çene yapınıza göre tek tek planlanır.",
  },
  {
    title: "Uzun soluklu takip",
    text: "Tedavi bitince iş bitmez. Sonucun kalıcı olması için kontroller ve pekiştirme aşaması özenle yürütülür.",
  },
]

export const MINISTATS: { value: string; label: string }[] = [
  { value: "17+", label: "Yıl deneyim" },
  { value: "2009", label: "Kendi muayenehanesi" },
  { value: "Manisa", label: "Şehzadeler" },
]
