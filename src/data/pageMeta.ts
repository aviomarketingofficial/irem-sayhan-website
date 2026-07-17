// Sayfa başına title + description verisi.
// NOT: Değerler SEO yazım hattı (agent'lar) tarafından doldurulur/denetlenir.
// Kurallar: title 50-65 karakter (marka ekiyle), description 140-160 karakter,
// hekime yazarlık/inceleme atfı yok, "en iyi" iddiası yok, fiyat/rakam yok.

export type StaticPageMeta = { title: string; description: string }

// Statik sayfalar (path ile)
export const staticPageMeta: Record<string, StaticPageMeta> = {
  "/": {
    title: "Manisa Ortodonti ve Şeffaf Plak | Dr. İrem Seyhan Uyarcan",
    description:
      "Manisa'da ortodonti uzmanı muayenehanesi: şeffaf plak, diş teli, çocuk ortodontisi ve ortognatik tedavi. Muayenehane Şehzadeler'de, randevu online alınabilir.",
  },
  "/hakkimda": {
    title: "Hakkımda — Ortodonti Uzmanı | Dr. İrem Seyhan Uyarcan",
    description:
      "Ortodonti uzmanı Dr. İrem Seyhan Uyarcan'ın eğitimi ve deneyimi: Ege Üniversitesi'nde uzmanlık, 2009'dan bu yana Manisa'daki muayenehanesinde hasta kabulü.",
  },
  "/tedaviler": {
    title: "Ortodonti Tedavileri ve Yöntemleri | Dr. İrem Seyhan Uyarcan",
    description:
      "Şeffaf plak mı diş teli mi? Braket, içten takılan diş teli (lingual), hareketli aparey ve ortognatik tedavi dahil ortodonti tedavi seçeneklerini inceleyin.",
  },
  "/blog": {
    title: "Blog: Ortodonti Rehberleri | Dr. İrem Seyhan Uyarcan",
    description:
      "Diş teli, şeffaf plak, çocuk ortodontisi ve çene tedavileri üzerine sade Türkçeyle yazılmış rehber yazılar. Merak ettiğiniz konuyu seçin, okumaya başlayın.",
  },
  "/sss": {
    title: "Ortodonti Sıkça Sorulan Sorular | Dr. İrem Seyhan Uyarcan",
    description:
      "Diş teli ne kadar sürer, ağrı yapar mı? Diş teli varken neler yenmez? Ortodonti tedavisinde en çok merak edilen soruların yanıtları bu sayfada.",
  },
  "/iletisim": {
    title: "İletişim ve Randevu — Manisa | Dr. İrem Seyhan Uyarcan",
    description:
      "Manisa ortodonti muayenehanesi Anafartalar Mah. Şehzadeler'de. Adres, harita, yol tarifi ve iletişim bilgileri; online randevu Doktortakvimi üzerinden.",
  },
  "/404": {
    title: "Aradığınız Sayfa Bulunamadı | Dr. İrem Seyhan Uyarcan",
    description:
      "Aradığınız sayfa taşınmış ya da kaldırılmış olabilir. Ana sayfadan ortodonti tedavilerine, şeffaf plak bilgilerine ve iletişime ulaşabilirsiniz.",
  },
}

// Tedavi detay sayfaları (slug ile)
export const treatmentPageMeta: Record<string, StaticPageMeta> = {
  "hareketli-ortodonti": {
    title: "Hareketli Ortodontik Tedavi | Dr. İrem Seyhan Uyarcan",
    description:
      "Çocuklarda damak genişletme aparatı ve takılıp çıkarılabilen apareylerle hareketli ortodontik tedavi: kimlere uygun, süreç nasıl ilerler? Manisa.",
  },
  "seffaf-plak": {
    title: "Şeffaf Plak Tedavisi (Manisa) | Dr. İrem Seyhan Uyarcan",
    description:
      "Günlük hayatta zor fark edilen şeffaf plaklarla diş düzeltme: kimlere uygun, tedavi nasıl planlanır, kontroller nasıl ilerler? Manisa'da şeffaf plak tedavisi.",
  },
  "braket-tedavisi": {
    title: "Sabit Ortodontik (Braketli) Tedavi | Dr. İrem Seyhan Uyarcan",
    description:
      "Metal ve seramik braketlerle çapraşıklık ve kapanış düzeltme: sürecin adımları, kontrol düzeni ve kimlere uygun olduğu. Manisa'da diş teli tedavisi.",
  },
  "damon-braket": {
    title: "Damon Sistem (Kapaklı Braket) | Dr. İrem Seyhan Uyarcan",
    description:
      "Manisa'da Damon braket tedavisi: lastik yerine kapakla teli tutan kapaklı sistem, klasik braketten farkları, kontrol düzeni ve kimlere uygun olduğu.",
  },
  "lingual-ortodonti": {
    title: "Lingual (İçten) Diş Teli | Dr. İrem Seyhan Uyarcan",
    description:
      "Braketlerin dişlerin iç yüzeyine takıldığı, dışarıdan görünmeyen içten takılan diş teli (lingual ortodonti): kimlere uygun, alışma süreci nasıl? Manisa.",
  },
  "cerrahi-ortodonti": {
    title: "Ortognatik Cerrahi Destekli Ortodonti | Dr. İrem Seyhan Uyarcan",
    description:
      "Çene geriliği ve belirgin çene uyumsuzluklarında ortognatik cerrahi ile ortodontinin birlikte planlanması: tedavi kimlere gerekir, süreç nasıl ilerler?",
  },
  "pekistirme": {
    title: "Pekiştirme (Retainer) Tedavisi | Dr. İrem Seyhan Uyarcan",
    description:
      "Diş teli veya şeffaf plak sonrası pekiştirme tedavisi: sabit ve hareketli retainer seçenekleri, kimlere uygun olduğu, bakım ve kontrol düzeni. Manisa.",
  },
}
