// Otomatik arastirmadan uretildi (Task 10). Elle duzenlenebilir.
export type BlogTopic = {
  title: string
  slug: string
  keyword: string
  audience: string
  outline: string[]
  relatedTreatment: string
}

export const blogTopics: BlogTopic[] = [
  {
    "title": "Diş Teli mi Şeffaf Plak mı? Hangisi Size Uygun?",
    "slug": "dis-teli-mi-seffaf-plak-mi",
    "keyword": "diş teli mi şeffaf plak mı",
    "audience": "Tedaviye karar vermeye çalışan, iki yöntem arasında kalan yetişkin hastalar",
    "outline": [
      "Diş teli (braket) ve şeffaf plak arasındaki temel farklar tablosu",
      "Estetik, konfor, hijyen ve günlük kullanım açısından karşılaştırma",
      "Hangi diş bozukluklarında hangi yöntemin daha uygun olduğu",
      "Tedavi süresi ve kontrol sıklığı farkları",
      "Doğru kararı hekimle birlikte nasıl verirsiniz"
    ],
    "relatedTreatment": "seffaf-plak"
  },
  {
    "title": "Invisalign Nedir? Şeffaf Plak Tedavisi Nasıl Çalışır?",
    "slug": "invisalign-nedir-nasil-calisir",
    "keyword": "invisalign nedir",
    "audience": "Invisalign markasını duymuş, telsiz ortodonti arayan yetişkinler ve gençler",
    "outline": [
      "Invisalign ve şeffaf plak kavramının açıklaması (marka ve yöntem ilişkisi)",
      "Dijital tarama ve tedavi öncesi sonuç önizlemesinin nasıl yapıldığı",
      "Plakların nasıl ve ne sıklıkla değiştiği",
      "Günde kaç saat takılması gerektiği ve uyumun önemi",
      "Hangi vakalara uygun olduğu ve sınırları"
    ],
    "relatedTreatment": "seffaf-plak"
  },
  {
    "title": "Şeffaf Plak Günde Kaç Saat Takılır? Takmazsanız Ne Olur?",
    "slug": "seffaf-plak-gunde-kac-saat-takilir",
    "keyword": "şeffaf plak günde kaç saat",
    "audience": "Şeffaf plak kullanan ya da kullanmayı düşünen, günlük uyum konusunda kaygılı hastalar",
    "outline": [
      "Önerilen günlük takma süresi ve neden bu kadar gerektiği",
      "Yetersiz takmanın tedavi süresine ve sonuca somut etkisi",
      "Plağı çıkarmanız gereken durumlar (yemek, içecek, fırçalama)",
      "Birkaç gün ara verirseniz ne yaşanır ve nasıl telafi edilir",
      "Uyumu kolaylaştıran pratik alışkanlıklar"
    ],
    "relatedTreatment": "seffaf-plak"
  },
  {
    "title": "Şeffaf Plak Nasıl Temizlenir ve Bakımı Nasıl Yapılır?",
    "slug": "seffaf-plak-nasil-temizlenir",
    "keyword": "şeffaf plak nasıl temizlenir",
    "audience": "Şeffaf plak kullanan, plağın sararması ve hijyeni konusunda endişeli hastalar",
    "outline": [
      "Plağın günlük temizlik rutini ve kullanılacak yöntemler",
      "Plağın neden sararabileceği ve sararmayı önleme yolları",
      "Kahve, çay, sigara ve renkli içeceklerin plağa etkisi",
      "Plak kutusu kullanımı ve kaybolma riskini azaltma",
      "Plağı kaybederseniz ya da kırarsanız ne yapmalısınız"
    ],
    "relatedTreatment": "seffaf-plak"
  },
  {
    "title": "Invisalign Ataşmanı Nedir, Plak Yine de Görünmez mi?",
    "slug": "invisalign-atasmani-nedir",
    "keyword": "invisalign attachment",
    "audience": "Şeffaf plak tedavisine başlamış ya da başlayacak, ataşmanları merak eden hastalar",
    "outline": [
      "Ataşmanın ne olduğu ve tedaviye nasıl katkı sağladığı",
      "Ataşman takılınca plağın estetiğinin nasıl etkilendiği",
      "Ataşmanların dişe zarar verip vermediği",
      "Tedavi sonunda ataşmanların nasıl çıkarıldığı",
      "Hangi vakalarda ataşman gerektiği"
    ],
    "relatedTreatment": "seffaf-plak"
  },
  {
    "title": "Braket Çeşitleri: Metal, Seramik ve Lingual Karşılaştırması",
    "slug": "braket-cesitleri-karsilastirma",
    "keyword": "braket çeşitleri",
    "audience": "Diş teli taktırmaya karar vermiş, braket tipi seçmeye çalışan hastalar",
    "outline": [
      "Metal, seramik ve lingual braketlerin farkları",
      "Estetik, dayanıklılık ve konfor açısından değerlendirme",
      "Hangi braketin tedavi süresini nasıl etkilediği",
      "Seramik braketin lekelenip lekelenmediği",
      "Hangi tipin kime daha uygun olduğu"
    ],
    "relatedTreatment": "braket-tedavisi"
  },
  {
    "title": "Görünmez Diş Teli: Lingual Ortodonti Nedir?",
    "slug": "gorunmez-dis-teli-lingual-ortodonti",
    "keyword": "görünmez diş teli",
    "audience": "Estetik kaygısı yüksek, dişin iç yüzeyine takılan teli merak eden yetişkinler",
    "outline": [
      "Lingual (içten) diş telinin nasıl çalıştığı",
      "Dışarıdan görünmemesinin nasıl sağlandığı",
      "Konuşma ve dil uyumunun ne kadar sürdüğü",
      "Şeffaf plak ile lingual tel arasındaki tercih kriterleri",
      "Hangi vakalara uygulanabildiği"
    ],
    "relatedTreatment": "lingual-ortodonti"
  },
  {
    "title": "Lingual Diş Teli Konuşmayı Etkiler mi? Uyum Süreci",
    "slug": "lingual-dis-teli-konusma-uyum",
    "keyword": "lingual diş teli konuşma",
    "audience": "Lingual tel düşünen ama konuşmasının bozulmasından çekinen hastalar",
    "outline": [
      "Lingual telin ilk günlerde konuşmaya etkisi",
      "Uyum sürecinin tipik olarak ne kadar sürdüğü",
      "Konuşmayı hızlandıran pratik öneriler ve egzersizler",
      "Dil tahrişi ve rahatsızlık için yapılabilecekler",
      "Ne zaman tamamen alıştığınızı anlarsınız"
    ],
    "relatedTreatment": "lingual-ortodonti"
  },
  {
    "title": "Damon Braket Nedir? Klasik Telden Farkı Var mı?",
    "slug": "damon-braket-nedir",
    "keyword": "damon braket",
    "audience": "Damon ya da self ligating braketi duymuş, klasik telle farkını merak eden hastalar",
    "outline": [
      "Damon (kendinden bağlamalı) braketin çalışma mantığı",
      "Klasik metal braketten teknik farkları",
      "Tedavi süresine ve konfora etkisi konusunda gerçekçi bilgi",
      "Kontrol sıklığı açısından farkları",
      "Hangi hastalar için avantajlı olabileceği"
    ],
    "relatedTreatment": "damon-braket"
  },
  {
    "title": "Diş Teli Tedavisi Ne Kadar Sürer? Süreyi Ne Belirler?",
    "slug": "dis-teli-tedavisi-ne-kadar-surer",
    "keyword": "diş teli ne kadar sürer",
    "audience": "Tedaviye başlamadan süreyi öğrenmek isteyen tüm yaş gruplarından hastalar",
    "outline": [
      "Ortalama tedavi süresi aralıkları ve neye göre değiştiği",
      "Yaş, vaka karmaşıklığı ve kemik yapısının etkisi",
      "Hafif çapraşıklıkta sürenin nasıl kısaldığı",
      "Tedavi süresini uzatan davranışlar (randevu kaçırma, braket koparma)",
      "Süreyi kısaltmak için yapabilecekleriniz"
    ],
    "relatedTreatment": "braket-tedavisi"
  },
  {
    "title": "Diş Teli Takılınca Ağrı Olur mu? Ne Kadar Sürer?",
    "slug": "dis-teli-agri-ne-kadar-surer",
    "keyword": "diş teli ağrı ne kadar sürer",
    "audience": "Diş teli taktıracak ya da yeni taktırmış, ağrıdan çekinen hastalar",
    "outline": [
      "Tel takılırken ve sonrasında ağrının nedeni",
      "İlk günlerde ağrının tipik olarak kaç gün sürdüğü",
      "Her kontrol sonrası neden hafif baskı hissedildiği",
      "Ağrıya iyi gelen pratik öneriler",
      "Tel batması ve yara için ortodontik mum kullanımı"
    ],
    "relatedTreatment": "braket-tedavisi"
  },
  {
    "title": "Diş Teli Kaç Yaşında Takılır? Yaş Sınırı Var mı?",
    "slug": "dis-teli-kac-yasinda-takilir",
    "keyword": "diş teli kaç yaşında takılır",
    "audience": "Kendisi ya da çocuğu için doğru yaşı merak eden ebeveynler ve yetişkinler",
    "outline": [
      "Çocuklarda ideal diş teli yaşı ve ilk muayene zamanı",
      "Yetişkinlerde üst yaş sınırı olmadığı gerçeği",
      "30, 40 ve sonrası yaşlarda tedavinin mümkün olması",
      "Yetişkin tedavisinin çocuktan farkları",
      "Yaşa göre değişen yöntem seçenekleri"
    ],
    "relatedTreatment": ""
  },
  {
    "title": "Diş Teli Varken Ne Yenir, Ne Yenmez?",
    "slug": "dis-teli-varken-ne-yenir-ne-yenmez",
    "keyword": "diş teli varken ne yenir ne yenmez",
    "audience": "Braket takan, beslenmesini telin gerektirdiği şekilde ayarlamak isteyen hastalar",
    "outline": [
      "Telden uzak durulması gereken sert ve yapışkan gıdalar",
      "İlk günlerde rahatça yenebilecek yumuşak besinler",
      "Asitli ve renkli içeceklerin tele ve dişe etkisi",
      "Sevdiğiniz yiyecekleri tele zarar vermeden tüketme yolları",
      "Braket koparsa ne yapmanız gerektiği"
    ],
    "relatedTreatment": "braket-tedavisi"
  },
  {
    "title": "Diş Teli Nasıl Temizlenir? Doğru Fırçalama Rehberi",
    "slug": "dis-teli-nasil-temizlenir",
    "keyword": "diş teli nasıl temizlenir",
    "audience": "Braket takan, hijyen ve diş sağlığını korumak isteyen hastalar",
    "outline": [
      "Telli dişlerin doğru fırçalama tekniği ve sıklığı",
      "Arayüz fırçası ve diş ipinin nasıl kullanıldığı",
      "Florürlü ürünler ve gargaranın rolü",
      "Elektrikli diş fırçasının tele etkisi",
      "Hijyensizliğin diş eti ve mine üzerindeki riskleri"
    ],
    "relatedTreatment": "braket-tedavisi"
  },
  {
    "title": "Diş Teli Altında Beyaz Leke Neden Olur, Nasıl Önlenir?",
    "slug": "dis-teli-beyaz-leke-onleme",
    "keyword": "diş teli beyaz leke",
    "audience": "Braket takan, tel çıkınca dişte kalıcı leke kalmasından korkan hastalar",
    "outline": [
      "Beyaz lekenin (demineralizasyon) nasıl oluştuğu",
      "Hangi alışkanlıkların leke riskini artırdığı",
      "Lekeyi önlemek için günlük bakım stratejisi",
      "Florür ve beslenmenin koruyucu rolü",
      "Tedavi sonrası lekelerin azaltılması için yapılabilecekler"
    ],
    "relatedTreatment": "braket-tedavisi"
  },
  {
    "title": "Diş Teli Yüz Şeklini Değiştirir mi? Doğru Bilinen Yanlışlar",
    "slug": "dis-teli-yuz-seklini-degistirir-mi",
    "keyword": "diş teli yüz şeklini değiştirir mi",
    "audience": "Telin yüzünü, dudaklarını ya da profilini değiştirmesinden endişe eden hastalar",
    "outline": [
      "Ortodontik tedavinin yüz hatlarına gerçek etkisi",
      "Dudak ve gülüş duruşunda görülebilecek değişimler",
      "Kilo verme ve yanak çökmesi gibi yaygın yanlış inanışlar",
      "Profil değişiminin hangi vakalarda beklenebileceği",
      "Endişeleri hekimle nasıl konuşmanız gerektiği"
    ],
    "relatedTreatment": ""
  },
  {
    "title": "Ortodonti Tedavisinden Sonra Dişler Eski Haline Döner mi?",
    "slug": "ortodonti-sonrasi-disler-eski-haline-doner-mi",
    "keyword": "ortodonti sonrası dişler eski haline döner mi",
    "audience": "Tedavisi bitmek üzere olan ya da nüks (geri dönme) korkusu taşıyan hastalar",
    "outline": [
      "Tedavi sonrası dişlerin neden kaymaya eğilimli olduğu",
      "Pekiştirme (retainer) tedavisinin neden şart olduğu",
      "Sabit ve hareketli pekiştiricinin farkları",
      "Pekiştiriciyi takmazsanız neler olabileceği",
      "Sonucun kalıcı olması için uzun vadeli alışkanlıklar"
    ],
    "relatedTreatment": ""
  },
  {
    "title": "Pekiştirme (Retainer) Ne Kadar Takılır? Bakımı Nasıl Olur?",
    "slug": "pekistirme-retainer-ne-kadar-takilir",
    "keyword": "pekiştirme retainer ne kadar takılır",
    "audience": "Tedavisi biten, pekiştirme sürecini ve bakımını öğrenmek isteyen hastalar",
    "outline": [
      "İlk yıl ve sonrasında önerilen takma sıklığı",
      "Sabit (yapıştırılan) tel ile hareketli plak arasında seçim",
      "Sabit pekiştiricinin uzun vadeli temizliği ve diş taşı riski",
      "Hareketli plağın saklanması ve sararmaması için bakım",
      "Pekiştirici kırılır ya da kaybolursa ne yapılmalı"
    ],
    "relatedTreatment": ""
  },
  {
    "title": "Çocuklarda Ortodonti Kaç Yaşında Başlamalı?",
    "slug": "cocuklarda-ortodonti-hangi-yas",
    "keyword": "çocuklarda ortodonti kaç yaşında",
    "audience": "Çocuğunun diş gelişimini takip eden, doğru zamanı arayan ebeveynler",
    "outline": [
      "İlk ortodonti muayenesi için önerilen yaş",
      "Süt dişleri dökülmeden tedaviye başlanabileceği durumlar",
      "Erken (koruyucu) ve geç tedavi farkı",
      "Hangi belirtilerde vakit kaybetmeden hekime gidilmeli",
      "İlk muayene ile tel takma yaşının birbirinden farkı"
    ],
    "relatedTreatment": "hareketli-ortodonti"
  },
  {
    "title": "Çocuğumun Ortodonti Tedavisine İhtiyacı Olduğunu Nasıl Anlarım?",
    "slug": "cocuk-ortodonti-ihtiyaci-belirtileri",
    "keyword": "çocuk ortodonti belirtileri",
    "audience": "Çocuğunda çapraşıklık ya da kapanış sorunu fark eden, emin olamayan ebeveynler",
    "outline": [
      "Dişlerde çapraşıklık ve sıkışma belirtileri",
      "Kapanış bozuklukları (ileri, geri, çapraz, açık kapanış)",
      "Çene gelişimi ve simetri sorununa işaret eden bulgular",
      "Süt dişindeki sorunun daimi dişi nasıl etkilediği",
      "Genetik ile önlenebilir alışkanlıkların ayrımı"
    ],
    "relatedTreatment": "hareketli-ortodonti"
  },
  {
    "title": "Çocuklarda Parmak Emme Dişleri Bozar mı?",
    "slug": "cocuklarda-parmak-emme-dis-etkisi",
    "keyword": "parmak emme diş etkisi",
    "audience": "Çocuğunun parmak emme ya da emzik alışkanlığından endişe eden ebeveynler",
    "outline": [
      "Parmak emmenin diş ve çene gelişimine etkisi",
      "Hangi yaşa kadar normal kabul edildiği",
      "Bırakılmazsa oluşabilecek açık kapanış ve çene darlığı",
      "Emzik ve biberon kullanımının benzer etkileri",
      "Alışkanlığı bırakmaya yardımcı yaklaşımlar ve aparey seçeneği"
    ],
    "relatedTreatment": "hareketli-ortodonti"
  },
  {
    "title": "Ağız Solunumu Çocuğun Çene Gelişimini Nasıl Etkiler?",
    "slug": "agiz-solunumu-cene-gelisimi",
    "keyword": "ağız solunumu çene gelişimi",
    "audience": "Çocuğu ağzı açık uyuyan ya da geniz eti sorunu olan ebeveynler",
    "outline": [
      "Ağız solunumunun dar damak ve çene gelişimine etkisi",
      "Geniz eti ve bademcik ile diş bozukluğu ilişkisi",
      "Önce KBB mi ortodontist mi sorusunun yanıtı",
      "Erken fark edildiğinde düzelme, geç kalındığında kalıcılık",
      "Tedavi yol haritası ve takip süreci"
    ],
    "relatedTreatment": "hareketli-ortodonti"
  },
  {
    "title": "Çocuklarda Çene Genişletme (Damaklık) Tedavisi",
    "slug": "cocuklarda-cene-genisletme-damaklik",
    "keyword": "çene genişletme aparatı",
    "audience": "Çocuğuna damaklık ya da çene genişletici önerilen ebeveynler",
    "outline": [
      "Çene genişletme aparatının ne işe yaradığı",
      "İdeal uygulama yaşı ve ameliyatsız çözüm avantajı",
      "Aparatın günde kaç saat takılması gerektiği",
      "Aparatın ağrı yapıp yapmadığı ve uyum süreci",
      "Genişletme vidasının nasıl ayarlandığı"
    ],
    "relatedTreatment": "hareketli-ortodonti"
  },
  {
    "title": "Erken Süt Dişi Kaybında Yer Tutucu Gerekli mi?",
    "slug": "erken-sut-disi-kaybi-yer-tutucu",
    "keyword": "yer tutucu gerekli mi",
    "audience": "Çocuğu erken süt dişi kaybeden ya da yer tutucu önerilen ebeveynler",
    "outline": [
      "Yer tutucunun neden gerekebileceği",
      "Her süt dişi kaybında gerekip gerekmediği",
      "Yer tutucu takılmazsa oluşabilecek sorunlar",
      "Sabit ve hareketli yer tutucu farkı",
      "Takip ve değişim süreci"
    ],
    "relatedTreatment": "hareketli-ortodonti"
  },
  {
    "title": "Çocuklarda Şeffaf Plak (Invisalign First) Uygulanır mı?",
    "slug": "cocuklarda-seffaf-plak-invisalign-first",
    "keyword": "çocuklarda şeffaf plak",
    "audience": "Çocuğu için telsiz seçenek arayan, Invisalign First duymuş ebeveynler",
    "outline": [
      "Çocuklara özel şeffaf plak yaklaşımının ne olduğu",
      "Hangi yaş ve vakalarda uygun olduğu",
      "Metal tele göre avantaj ve sınırları",
      "Çocukta günlük takma süresi ve uyum konusu",
      "Karışık dişlenme döneminde uygulanabilirliği"
    ],
    "relatedTreatment": "seffaf-plak"
  },
  {
    "title": "Çene Ameliyatı (Ortognatik Cerrahi) Ne Zaman Gerekir?",
    "slug": "ortognatik-cerrahi-ne-zaman-gerekir",
    "keyword": "ortognatik cerrahi nedir",
    "audience": "İleri çene uyumsuzluğu olan, ameliyatın şart olup olmadığını merak eden hastalar",
    "outline": [
      "Hangi çene uyumsuzluklarının sadece telle düzelmediği",
      "Kamuflaj tedavisi ile cerrahi arasındaki karar sınırı",
      "Tek çene mi çift çene mi kararının nasıl verildiği",
      "Estetik kaygının yanında işlevsel ve sağlık gerekçeleri",
      "Tedaviye uygunluk için yaş ve kemik gelişimi koşulu"
    ],
    "relatedTreatment": "cerrahi-ortodonti"
  },
  {
    "title": "Çene Ameliyatı Süreci: Önce Diş Teli mi, Önce Ameliyat mı?",
    "slug": "cene-ameliyati-tedavi-sureci",
    "keyword": "çene ameliyatı tedavi süreci",
    "audience": "Ortognatik cerrahi planlanan, sürecin sırasını ve süresini öğrenmek isteyen hastalar",
    "outline": [
      "Ameliyat öncesi ortodonti (hazırlık) aşamasının amacı",
      "Hazırlık döneminde kapanışın geçici olarak neden bozulduğu",
      "Ameliyat sonrası tel ve pekiştirme süreci",
      "Ortodontist ile çene cerrahının birlikte çalışması",
      "Toplam tedavi süresine dair gerçekçi beklenti"
    ],
    "relatedTreatment": "cerrahi-ortodonti"
  },
  {
    "title": "Çene Ameliyatı İyileşme Süreci: İlk Günlerde Ne Beklemeli?",
    "slug": "cene-ameliyati-iyilesme-sureci",
    "keyword": "çene ameliyatı iyileşme süreci",
    "audience": "Çene ameliyatı olacak ya da yeni olmuş, iyileşme dönemini merak eden hastalar",
    "outline": [
      "Ameliyat sonrası şişlik ve morarmanın seyri",
      "İşe ve sosyal hayata ne zaman dönülebileceği",
      "İlk haftalarda beslenme ve yumuşak diyet rehberi",
      "Yüzde ve dudakta uyuşma (his kaybı) ve geçme süreci",
      "Psikolojik hazırlık ve iyileşme döneminde destek"
    ],
    "relatedTreatment": "cerrahi-ortodonti"
  },
  {
    "title": "Çene Geriliği Horlama ve Uyku Apnesine Neden Olur mu?",
    "slug": "cene-gerimi-horlama-uyku-apnesi",
    "keyword": "çene geriliği uyku apnesi",
    "audience": "Çene geriliği olan, horlama ya da uyku apnesi yaşayan yetişkin hastalar",
    "outline": [
      "Çene geriliğinin hava yolunu nasıl daralttığı",
      "Horlama ve tıkayıcı uyku apnesi ile ilişkisi",
      "Ortodonti ve cerrahinin bu soruna katkısı",
      "Hangi belirtilerde uyku açısından değerlendirme gerektiği",
      "Sağlık temelli tedavi yaklaşımının önemi"
    ],
    "relatedTreatment": "cerrahi-ortodonti"
  },
  {
    "title": "Ortodontide İlk Muayenede Ne Yapılır?",
    "slug": "ortodonti-ilk-muayenede-ne-yapilir",
    "keyword": "ortodonti ilk muayenede ne yapılır",
    "audience": "İlk kez ortodontiste gidecek, sürecin nasıl işlediğini bilmeyen hastalar",
    "outline": [
      "İlk muayenede yapılan muayene, film ve ölçü işlemleri",
      "Ağız içi ve dışı fotoğrafların neden çekildiği",
      "Teşhis ve tedavi planının nasıl oluşturulduğu",
      "İlk muayeneye giderken yanınızda getirmeniz gerekenler",
      "Aynı gün tedaviye başlanıp başlanmadığı"
    ],
    "relatedTreatment": ""
  },
  {
    "title": "Diş Teli Taktıktan Sonra Ne Sıklıkla Kontrole Gidilir?",
    "slug": "dis-teli-kontrol-sikligi",
    "keyword": "diş teli kaç ayda bir kontrol",
    "audience": "Tedavisi devam eden, kontrol takvimini planlamak isteyen hastalar",
    "outline": [
      "Braket ve şeffaf plakta tipik kontrol aralıkları",
      "Her kontrolde ne yapıldığı ve ne kadar sürdüğü",
      "Bir kontrolü kaçırmanın tedaviye etkisi",
      "Şehir dışında ya da tatildeyken kontrol planlaması",
      "Acil durumda (tel battı, braket düştü) ne yapılması gerektiği"
    ],
    "relatedTreatment": ""
  },
  {
    "title": "Diş Teli Fiyatını Belirleyen Faktörler Nelerdir?",
    "slug": "dis-teli-fiyatini-belirleyen-faktorler",
    "keyword": "diş teli fiyatları nasıl belirlenir",
    "audience": "Tedavi maliyetini merak eden, fiyatın neye göre değiştiğini anlamak isteyen hastalar",
    "outline": [
      "Fiyatı etkileyen ana etkenler (vaka şiddeti, yöntem, süre)",
      "Metal, seramik ve şeffaf plak arasındaki maliyet farkının nedeni",
      "Tek çene ve çift çene ayrımının fiyata yansıması",
      "Tedavi ücretine genelde nelerin dahil olup olmadığı",
      "Ödeme planı ve taksit seçeneklerinin neden sorulması gerektiği"
    ],
    "relatedTreatment": ""
  },
  {
    "title": "Diş Teli ve SGK: Kapsam Nasıl İşler?",
    "slug": "dis-teli-sgk-karsiliyor-mu",
    "keyword": "diş teli SGK karşılıyor mu",
    "audience": "Tedavi masrafı için devlet ya da sigorta desteği arayan hastalar ve ebeveynler",
    "outline": [
      "SGK kapsamında 18 yaş altı ve üstü ayrımı",
      "Devlet ve üniversite hastanesi şartının ne anlama geldiği",
      "Estetik amaçlı tedavinin kapsam dışı olması",
      "Özel ve tamamlayıcı sağlık sigortasının ortodontiye bakışı",
      "18 yaş üstündeyseniz değerlendirebileceğiniz seçenekler"
    ],
    "relatedTreatment": ""
  },
  {
    "title": "Manisa'da Ortodonti Tedavisi: Süreç ve Sık Sorulanlar",
    "slug": "manisa-ortodonti-tedavisi-rehberi",
    "keyword": "Manisa ortodonti",
    "audience": "Manisa ve çevre ilçelerde ortodontist arayan yerel hastalar",
    "outline": [
      "Manisa ve çevresinde ortodonti tedavisine başlama adımları",
      "Randevu alma ve iletişim seçenekleri",
      "Şehir dışından ya da ilçelerden gelen hastalar için kontrol planlaması",
      "Devlet ve üniversite hastanesi ile özel muayenehane sürecinin farkı",
      "Doğru ortodontisti seçerken dikkat edilecek noktalar"
    ],
    "relatedTreatment": ""
  },
  {
    "title": "Diş Sıyırma (IPR) Nedir? Dişe Zararlı mı?",
    "slug": "dis-siyirma-ipr-nedir",
    "keyword": "diş sıyırma IPR",
    "audience": "Tedavisinde IPR önerilen, diş minesine zarar gelmesinden endişe eden hastalar",
    "outline": [
      "Diş sıyırmanın (IPR) ne olduğu ve neden yapıldığı",
      "Mineye ve diş sağlığına etkisinin gerçekte ne olduğu",
      "Diş eti çekilmesi ya da çürük riski oluşturup oluşturmadığı",
      "Hangi vakalarda diş çekimi yerine tercih edildiği",
      "İşlem sırasında ve sonrasında ne hissedildiği"
    ],
    "relatedTreatment": "seffaf-plak"
  },
  {
    "title": "Şeffaf Plakta Refinement (Ek Plak) Nedir, Neden Gerekir?",
    "slug": "seffaf-plak-refinement-ek-plak",
    "keyword": "şeffaf plak refinement",
    "audience": "Şeffaf plak tedavisi süren, ek plak ya da ikinci tarama önerilen hastalar",
    "outline": [
      "Refinement (ek plak) sürecinin ne anlama geldiği",
      "Neden ikinci bir tarama ve ek plak gerekebildiği",
      "Tedavinin uzayıp uzamadığı ve beklenti yönetimi",
      "Ek plak sürecinin nasıl ilerlediği",
      "Sonucu iyileştirmek için hasta uyumunun rolü"
    ],
    "relatedTreatment": "seffaf-plak"
  },
  {
    "title": "Diş Teliyle Spor Yapılır mı? Temas Sporları İçin Öneriler",
    "slug": "dis-teliyle-spor-yapmak",
    "keyword": "diş teli ile spor",
    "audience": "Aktif spor yapan, özellikle temas sporlarıyla ilgilenen telli hastalar",
    "outline": [
      "Diş teliyle spor yaparken karşılaşılabilecek riskler",
      "Temas sporlarında ağızlık (koruyucu) kullanımının önemi",
      "Tele uygun ağızlık seçimi ve kullanımı",
      "Darbe sonrası tel ya da braket zarar görürse ne yapılmalı",
      "Şeffaf plak kullananlar için spor avantajı"
    ],
    "relatedTreatment": "braket-tedavisi"
  },
  {
    "title": "Diş Teli ve Nefesli Çalgılar: Müzisyenler İçin Rehber",
    "slug": "dis-teli-nefesli-calgilar",
    "keyword": "diş teli nefesli çalgı",
    "audience": "Nefesli çalgı çalan öğrenciler, müzisyenler ve ebeveynleri",
    "outline": [
      "Diş telinin nefesli çalgı çalmaya etkisi",
      "İlk uyum döneminde yaşanabilecek zorluklar",
      "Çalmayı kolaylaştıran pratik öneriler ve koruyucular",
      "Hangi tel ya da plak tipinin müzisyene daha uygun olabileceği",
      "Uyum süresinin tipik olarak ne kadar sürdüğü"
    ],
    "relatedTreatment": "braket-tedavisi"
  },
  {
    "title": "Ortodontik Acil Durumlar: Tel Battı, Braket Koptu — Ne Yapmalı?",
    "slug": "ortodontik-acil-durumlar",
    "keyword": "tel battı ne yapmalıyım",
    "audience": "Tedavi sırasında tel batması, braket kopması gibi aksilikler yaşayan hastalar ve yakınları",
    "outline": [
      "Tel battığında evde yapılabilecek ilk müdahale",
      "Diş teli mumunun doğru kullanımı",
      "Braket koptuğunda ya da braketten çıktığında ne yapılmalı",
      "Arka tel kopması, bant ve pekiştirme teli sorunları",
      "Hangi durumların gerçekten acil olduğu",
      "Aksilikleri önlemeye yardımcı alışkanlıklar"
    ],
    "relatedTreatment": "braket-tedavisi"
  },
  {
    "title": "Diş Teli Öncesi Bilinmesi Gerekenler: Hazırlık Rehberi",
    "slug": "dis-teli-oncesi-bilinmesi-gerekenler",
    "keyword": "diş teli öncesi bilinmesi gerekenler",
    "audience": "Diş teli takılmasına karar vermiş, süreci önceden öğrenmek isteyen hastalar",
    "outline": [
      "Diş telinin neden takıldığı",
      "Tedavi öncesi hazırlık adımları",
      "Diş çekiminin hangi durumlarda gerekebildiği",
      "Telin nasıl takıldığı, seansın adım adım akışı",
      "İlk günlerde sizi nelerin beklediği",
      "Randevu öncesi yapılabilecek küçük hazırlıklar"
    ],
    "relatedTreatment": "braket-tedavisi"
  },
  {
    "title": "Diş Teli Renkleri: Nasıl Seçilir, Ne Zaman Değişir?",
    "slug": "dis-teli-renkleri",
    "keyword": "diş teli renkleri",
    "audience": "Renkli lastik seçimini merak eden gençler, çocuklar ve ebeveynleri",
    "outline": [
      "Renkli lastiklerin ne olduğu",
      "Renk seçerken nelere bakıldığı",
      "Hangi renklerin dişleri daha beyaz gösterebildiği",
      "Renklerin ne zaman değiştiği ve solup solmadığı",
      "Hangi braket türlerinde renk seçilebildiği",
      "Popüler kombinasyonlar ve pratik ipuçları"
    ],
    "relatedTreatment": "braket-tedavisi"
  },
  {
    "title": "Damak Genişletme Aparatı: Ebeveynler İçin Deneyim Rehberi",
    "slug": "damak-genisletme-aparati-deneyim",
    "keyword": "damak genişletme aparatı kullananlar",
    "audience": "Çocuğuna damak genişletme aparatı takılan, günlük kullanımı ve uyum sürecini merak eden ebeveynler",
    "outline": [
      "Aparatı kullanan ailelerin en sık anlattıkları",
      "İlk haftada nelerin normal sayıldığı",
      "Vidanın evde nasıl çevrildiği",
      "Tur unutulduğunda ya da anahtar kaçtığında ne yapılacağı",
      "Aparatı takmak istemeyen çocuğa yaklaşım",
      "Yemek, konuşma ve okul düzenine etkisi"
    ],
    "relatedTreatment": "hareketli-ortodonti"
  },
  {
    "title": "Gummy Smile (Diş Eti Gülüşü) Nedir? Ortodonti ile Düzelir mi?",
    "slug": "gummy-smile-dis-eti-gulusu",
    "keyword": "gummy smile tedavisi",
    "audience": "Gülerken diş etleri fazla görünen, çözüm seçeneklerini merak eden hastalar",
    "outline": [
      "Gummy smile (diş eti gülüşü) kavramının açıklaması",
      "Diş eti gülüşünün nedenleri",
      "Ortodontinin hangi durumlarda çözüm olabildiği",
      "Çene cerrahisinin gündeme geldiği durumlar",
      "Botoks ve diğer seçenekler hakkında bilinmesi gerekenler",
      "Doğru tanının önemi"
    ],
    "relatedTreatment": "cerrahi-ortodonti"
  }
]
