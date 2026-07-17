// Kanonik tedavi listesi. Slug'lar blog ve diğer sayfalarla uyumludur.
export type Treatment = {
  slug: string
  title: string
  emoji: string
  short: string // tek cümlelik özet (kartta görünür)
  intro: string // 2-3 cümlelik giriş
  forWhom: string[] // kimler için uygun
  process: string // süreç ve süre hakkında 2-3 cümle
  note: string // bilgilendirme / muayene notu
  image?: string // poster / durağan görsel
  video?: string // varsa web mp4: slider'da aktifte, kartta hover'da, detayda otomatik oynar
}

export const treatments: Treatment[] = [
  {
    slug: "hareketli-ortodonti",
    title: "Hareketli Ortodontik Tedavi",
    emoji: "🧩",
    short: "Takılıp çıkarılabilen apareylerle, özellikle çocuklarda gelişimi yönlendirir.",
    intro:
      "Hareketli ortodontik tedavi, takılıp çıkarılabilen apareylerle uygulanır. Özellikle gelişim çağındaki çocuklarda dar damağı genişletmek, basit diş düzensizliklerini düzeltmek ve parmak emme gibi alışkanlıkları bırakmaya yardımcı olmak için kullanılır. Doğru yaşta uygulandığında konforlu ve etkili bir seçenek olabilir.",
    forWhom: [
      "Gelişim çağında, damak genişletme veya basit düzeltme gereken çocuklar",
      "Parmak emme, dil itme gibi alışkanlıkları diş dizilimini etkileyen çocuklar",
      "Sabit tedaviye geçmeden önce yönlendirmeye uygun durumlar",
      "Apareyi günde önerilen süre boyunca düzenli takabilecek olanlar",
    ],
    process:
      "Ağız ölçüsü alınarak kişiye özel aparey hazırlanır ve nasıl kullanılacağı ayrıntılı anlatılır. Apareyin günde belirli bir süre takılması ve düzenli kontrollere gelinmesi gerekir. Uygunluk ve süre muayenede netleşir.",
    note: "Hareketli apareyin uygun olup olmadığı ve doğru zamanlama muayenede netleşir.",
    image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/paylasimli-hareketli-ortodonti.jpg",
  },
  {
    slug: "seffaf-plak",
    title: "Şeffaf Plak",
    emoji: "😬",
    short: "Çıkarılabilen, günlük hayatta fark edilmeyen şeffaf plaklarla diş dizilimini düzeltir.",
    intro:
      "Şeffaf plak tedavisi, diş üzerine geçen ince ve şeffaf plaklarla dişleri kademeli olarak hareket ettirir. Plaklar çıkarılabildiği için yeme içme ve diş bakımı günlük rutininizi fazla değiştirmez. Estetik kaygısı olan birçok kişi için rahat bir seçenek olabilir.",
    forWhom: [
      "Tedavinin mümkün olduğunca görünmez olmasını isteyenler",
      "Hafif ve orta düzeydeki çapraşıklık veya boşluk durumları",
      "Metal braket konforunu tercih etmeyen yetişkinler ve gençler",
      "Plakları gün içinde önerilen süre boyunca düzenli takabilecek olanlar",
    ],
    process:
      "Tedavi, ağız içi dijital tarama ve planlamayla başlar; her plak dişleri hedeflenen konuma doğru bir adım daha taşır. Plaklar belirli aralıklarla yenileriyle değiştirilir ve süreç boyunca düzenli kontroller yapılır. Toplam süre kişinin durumuna göre değişir ve muayenede netleşir.",
    note: "Şeffaf plağın size uygun olup olmadığı ve tahmini süre, dişlerinizin durumuna göre muayenede netleşir.",
    image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/paylasimli-seffaf-plak.jpg",
    video: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/paylasimli-seffaf-plak.mp4",
  },
  {
    slug: "braket-tedavisi",
    title: "Sabit Ortodontik Tedavi (Braketli Tedavi)",
    emoji: "🦷",
    short: "Dişlere yapıştırılan braketlerle çapraşıklık ve kapanış sorunlarını etkili biçimde düzeltir.",
    intro:
      "Braket tedavisi, dişlere yapıştırılan braketler ve bunları birbirine bağlayan tel yardımıyla dişleri planlı şekilde hareket ettirir. Metal braketler yaygın ve dayanıklı bir seçenekken, seramik braketler diş rengine daha yakın olduğu için daha az belirgindir. Geniş bir vaka yelpazesinde güvenle uygulanan, köklü bir yöntemdir.",
    forWhom: [
      "Çapraşıklık, boşluk ve kapanış sorunlarını düzeltmek isteyenler",
      "Daha az belirgin bir görünüm için seramik braketi tercih edenler",
      "Karmaşık diş hareketleri gerektiren durumlar",
      "Şeffaf plak kullanımında düzeni sürdürmenin zor olabileceği gençler ve çocuklar",
    ],
    process:
      "Braketler dişlere yapıştırılır ve tel ile bağlanır; sonraki kontrollerde tel ayarlanarak dişler adım adım hedeflenen konuma getirilir. Genellikle belirli aralıklarla kontrol randevuları gerekir. Tedavi süresi vakanın karmaşıklığına göre değişir ve muayenede netleşir.",
    note: "Metal mi yoksa seramik braketin mi uygun olduğu ve tedavi süresi muayenede birlikte değerlendirilir.",
    image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/paylasimli-braket-tedavisi.jpg",
    video: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/paylasimli-braket-tedavisi.mp4",
  },
  {
    slug: "damon-braket",
    title: "Damon Sistem",
    emoji: "✨",
    short: "Lastik yerine kendi kapağıyla teli tutan, daha az kontrol gerektirebilen braket sistemidir.",
    intro:
      "Damon braketler, teli sabitlemek için lastik yerine braketin kendi kapak mekanizmasını kullanır. Bu yapı, sürtünmeyi azaltarak dişlerin daha akıcı hareket etmesine yardımcı olabilir. Klasik braket mantığına dayanan, kapağı sayesinde farklılaşan bir sistemdir.",
    forWhom: [
      "Braket tedavisi düşünüp daha az sürtünmeli bir sistem isteyenler",
      "Kontrol randevularının sıklığını azaltmayı tercih edenler",
      "Çapraşıklık ve kapanış sorunlarını braketle çözmek isteyenler",
      "Hekimin uygun gördüğü, sisteme elverişli vakalar",
    ],
    process:
      "Damon braketler dişlere yapıştırılır ve teller kapak mekanizmasıyla yerinde tutulur. Sürtünmenin azalması, bazı vakalarda kontroller arası süreyi uzatabilir. Tedavi planı ve süresi kişinin durumuna göre muayenede netleşir.",
    note: "Damon sisteminin size uygunluğu ve klasik brakete göre avantajları muayenede değerlendirilir.",
    image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/paylasimli-damon-braket.jpg",
  },
  {
    slug: "lingual-ortodonti",
    title: "Lingual (Görünmez) Ortodonti",
    emoji: "🙈",
    short: "Braketler dişlerin iç yüzeyine yerleştirildiği için dışarıdan tamamen gizli kalır.",
    intro:
      "Lingual ortodontide braketler dişlerin dil tarafındaki iç yüzeyine yapıştırılır. Böylece tedavi dışarıdan görünmeden ilerler ve gülümseme estetiği tedavi boyunca korunur. Görünürlüğün öncelikli olduğu durumlar için tasarlanmış bir yaklaşımdır.",
    forWhom: [
      "Tedavinin tamamen gizli olmasını isteyenler",
      "Mesleği veya yaşam tarzı gereği görünür braket istemeyenler",
      "Braket etkisini isteyip estetikten ödün vermek istemeyenler",
      "Hekimin uygun gördüğü, sisteme elverişli vakalar",
    ],
    process:
      "Braketler dişlerin iç yüzeyine, kişiye özel planlamayla yerleştirilir. İlk dönemde dile alışma süresi olabilir ve süreç boyunca düzenli kontroller gerekir. Uygunluk ve tedavi süresi muayenede netleşir.",
    note: "Lingual ortodontinin size uygun olup olmadığı ve alışma süreci muayenede ele alınır.",
    image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/paylasimli-lingual-ortodonti.jpg",
    video: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/paylasimli-lingual-ortodonti.mp4",
  },
  {
    slug: "cerrahi-ortodonti",
    title: "Ortognatik Cerrahi (Cerrahi Destekli Ortodontik Tedavi)",
    emoji: "🩺",
    short: "Belirgin çene uyumsuzluklarında ortodonti ile çene cerrahisinin birlikte planlandığı tedavidir.",
    intro:
      "Ortognatik ortodonti, yani çene cerrahisiyle birlikte planlanan ortodonti, yalnızca dişlerle çözülemeyen belirgin çene uyumsuzluklarında gündeme gelir. Tedavi, ortodontik diş düzenlemesi ile çene cerrahisinin birlikte planlanmasını içerir. Çene cerrahisi bölümüyle ortak yürütülen, kapsamlı bir süreçtir.",
    forWhom: [
      "Üst ve alt çene arasında belirgin uyumsuzluğu olanlar",
      "Yalnızca ortodontik tedaviyle giderilemeyen iskeletsel kapanış sorunları",
      "Çene yapısı çiğneme veya konuşmayı etkileyen kişiler",
      "Hekimin cerrahi değerlendirme önerdiği yetişkin hastalar",
    ],
    process:
      "Süreç genellikle dişleri hazırlayan bir ortodontik aşamayla başlar, ardından çene cerrahisi planlanır ve sonrasında ince ayar için ortodontik takip sürer. Aşamalar ilgili uzmanlarla birlikte yürütülür. Cerrahiye gerçekten gerek olup olmadığı ve planın ayrıntıları muayene ve değerlendirmeyle netleşir.",
    note: "Cerrahi gerekip gerekmediği ve tedavi planı, kapsamlı bir muayene ve değerlendirme sonrası netleşir.",
    image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/paylasimli-cerrahi-ortodonti.jpg",
    video: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/paylasimli-cerrahi-ortodonti.mp4",
  },
  {
    slug: "pekistirme",
    title: "Pekiştirme Tedavisi",
    emoji: "🛡️",
    short: "Aktif tedavi bittikten sonra dişlerin yeni konumunu uzun vadede korur.",
    intro:
      "Pekiştirme, diş teli ya da şeffaf plak tedavisi tamamlandıktan sonraki aşamadır. Dişler yeni konumlarına tam yerleşene kadar geri kaymaya eğilimli olduğu için pekiştirici kullanımı sonucun kalıcılığı açısından önemlidir. Sabit ve hareketli pekiştirici seçenekleri vardır.",
    forWhom: [
      "Aktif ortodonti tedavisini yeni tamamlamış olanlar",
      "Tedavi sonucunun uzun vadede korunmasını isteyenler",
      "Daha önce tedavi görüp dişlerinde geri kayma fark edenler",
      "Sabit veya hareketli pekiştirici arasında yönlendirme isteyenler",
    ],
    process:
      "Tedavi biter bitmez dişlerin arkasına yapıştırılan ince bir tel ya da gece takılan şeffaf bir plak şeklinde pekiştirici uygulanır. İlk dönem daha sık, ilerleyen aylarda azalan kullanımla uzun vadeli koruma sağlanır. Size uygun pekiştirici türü ve süre muayenede belirlenir.",
    note: "Hangi pekiştiricinin uygun olduğu ve ne kadar kullanılacağı muayenede belirlenir.",
    image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/anasayfa-hero-074.jpg",
  },
]
