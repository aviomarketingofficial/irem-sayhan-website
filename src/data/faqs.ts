// Otomatik arastirmadan uretildi (Task 7). Elle duzenlenebilir.
// id: KALICI kimlik. Soru metni değişse bile bu değişmez; ana sayfa seçimi ve
// diğer referanslar metne değil bu kimliğe bakar (sessiz kayıp olmaz).
export type Faq = { id: string; category: string; question: string; answer: string }

export const faqCategories: string[] = ["Genel","Şeffaf Plak","Braket","Çocuk","Cerrahi","Süreç","Manisa"]

export const faqs: Faq[] = [
    {
      "id": "dis-teli-tedavisi-ne-kadar",
      "category": "Genel",
      "question": "Diş teli tedavisi ne kadar sürer?",
      "answer": "Tedavi süresi diş ve çene yapınıza, çapraşıklığın derecesine ve yaşınıza göre değişir. Çoğu hastada bu süre ortalama bir buçuk ila iki buçuk yıl arasında olur, hafif vakalarda ise çok daha kısa sürebilir. Size özel net süre, ilk muayene ve röntgen değerlendirmesinden sonra belirginleşir."
    },
    {
      "id": "dis-teli-takilirken-ya-da",
      "category": "Genel",
      "question": "Diş teli takılırken ya da takıldıktan sonra ağrı olur mu?",
      "answer": "Telin takılması ağrısız bir işlemdir, ancak ilk birkaç gün dişlerinizde baskı ve hassasiyet hissetmeniz son derece normaldir. Bu his genelde üç gün içinde hafifler ve yumuşak gıdalarla, gerektiğinde basit bir ağrı kesiciyle rahatça yönetilir. Her kontrolden sonra benzer bir hassasiyet olabilir ama ilk günkünden daha hafiftir."
    },
    {
      "id": "dis-teli-agrisina-ne-iyi",
      "category": "Genel",
      "question": "Diş teli ağrısına ne iyi gelir?",
      "answer": "İlk günlerde yumuşak gıdalar tercih etmek, ılık tuzlu suyla gargara yapmak ve gerekirse hekiminizin uygun gördüğü bir ağrı kesici kullanmak rahatlatır. Telin keskin bir ucu yanağınızı veya dudağınızı tahriş ediyorsa, üzerine ortodontik mum uygulayarak teması kesebilirsiniz. Geçmeyen ya da artan bir şikayette bizimle iletişime geçmeniz en doğrusudur."
    },
    {
      "id": "dis-teli-kac-yasinda-takilir",
      "category": "Genel",
      "question": "Diş teli kaç yaşında takılır, yaş sınırı var mı?",
      "answer": "Çocuklarda aktif diş teli genellikle dişlerin yerini aldığı dokuz on iki yaş arasında uygundur, ancak ilk ortodonti muayenesi için ideal zaman yedi yaş civarıdır. Yetişkinlerde ise üst yaş sınırı yoktur; dişeti ve kemik sağlığı uygun olduğu sürece otuz, kırk, hatta daha ileri yaşlarda tedavi rahatlıkla yapılabilir. Sizin için uygunluk muayenede netleşir."
    },
    {
      "id": "dis-teli-varken-neler-yenmez",
      "category": "Genel",
      "question": "Diş teli varken neler yenmez?",
      "answer": "Sert ve yapışkan gıdalar braketleri koparabileceği veya teli bükebileceği için bunlardan kaçınmak gerekir. Fındık, leblebi, sakız, karamel, sert ekmek kabukları ve elma gibi gıdaları küçük parçalara bölmeden ısırmamanızı öneririz. Asitli ve renkli içecekleri de azaltmak hem teli hem diş minenizi korur."
    },
    {
      "id": "dis-teli-nasil-temizlenir-gunde",
      "category": "Genel",
      "question": "Diş teli nasıl temizlenir, günde kaç kez fırçalamalıyım?",
      "answer": "Telli dişlerde yemek artıkları daha kolay biriktiği için her öğünden sonra fırçalamanızı, yani günde dört beş kez diş fırçalamanızı öneririz. Braketlerin etrafına ve tel altına ulaşmak için arayüz fırçası ve mümkünse florürlü macun kullanmak çok faydalıdır. Düzenli temizlik, diş üzerinde beyaz leke ve çürük oluşumunu önlemenin en etkili yoludur."
    },
    {
      "id": "dis-teli-yuz-seklini-ya",
      "category": "Genel",
      "question": "Diş teli yüz şeklini ya da yüz hatlarını değiştirir mi?",
      "answer": "Diş teli dişlerinizi ve kapanışınızı düzenler; yanağınızı çökertmez veya yüzünüzü zayıflatmaz. Sadece ileri derecede çene uyumsuzluğu olan ve cerrahi gerektiren vakalarda profilde belirgin bir değişim olabilir, sıradan diş düzeltmelerinde böyle bir etki beklenmez. Gülüş ve dudak desteğinde ise çoğu hastada olumlu bir denge sağlanır."
    },
    {
      "id": "dis-teli-konusmayi-etkiler-mi",
      "category": "Genel",
      "question": "Diş teli konuşmayı etkiler mi?",
      "answer": "Klasik dış yüzey diş telleri konuşmanızı genellikle etkilemez. İç yüzeye uygulanan lingual tellerde veya damak genişletici apareylerde ilk birkaç gün hafif bir uyum dönemi ve geçici peltekleşme olabilir, bu da dilin alışmasıyla kısa sürede düzelir. Endişelenmenize gerek yoktur, ağız kısa sürede yeni duruma alışır."
    },
    {
      "id": "gorunmez-ya-da-seffaf-dis",
      "category": "Genel",
      "question": "Görünmez ya da şeffaf diş teli seçenekleri nelerdir?",
      "answer": "Daha az fark edilen seçenekler arasında diş rengine yakın seramik braketler, dişin iç yüzeyine uygulanan lingual teller ve tamamen çıkarılabilir şeffaf plaklar bulunur. Her birinin estetik düzeyi, konforu ve uygun olduğu vakalar farklıdır. Hangisinin size en uygun olduğu, diş yapınız ve beklentileriniz değerlendirilerek muayenede netleşir."
    },
    {
      "id": "seffaf-plak-mi-dis-teli",
      "category": "Şeffaf Plak",
      "question": "Şeffaf plak mı diş teli mi, hangisi daha iyi?",
      "answer": "İkisi de etkili tedavi yöntemleridir; doğru seçim vakanızın türüne ve günlük yaşam tercihlerinize bağlıdır. Şeffaf plak estetik ve çıkarılabilir olmasıyla öne çıkarken, bazı karmaşık çapraşıklık ve kapanış sorunlarında sabit teller daha kontrollü sonuç verebilir. En uygun yöntem, dişlerinizin durumu incelendikten sonra birlikte kararlaştırılır."
    },
    {
      "id": "seffaf-plak-gercekten-disaridan-fark",
      "category": "Şeffaf Plak",
      "question": "Şeffaf plak gerçekten dışarıdan fark edilmiyor mu?",
      "answer": "Şeffaf plaklar ince ve diş yüzeyine tam oturduğu için günlük hayatta çok zor fark edilir, bu da onların en sevilen yanıdır. Bazı dişlere takılan küçük renkli tutucular yani ataşmanlar yakından bakıldığında hafifçe görünebilir ama genel görünüm yine de oldukça doğaldır. Çoğu hastamız çevresinin tedaviyi fark etmediğini söyler."
    },
    {
      "id": "seffaf-plak-gunde-kac-saat",
      "category": "Şeffaf Plak",
      "question": "Şeffaf plak günde kaç saat takılmalı?",
      "answer": "Şeffaf plakların başarısı düzenli kullanıma bağlıdır ve günde yaklaşık yirmi yirmi iki saat takılması gerekir. Yalnızca yemek yerken ve dişlerinizi fırçalarken çıkarmanız beklenir. Plağı yeterince takmazsanız dişler planlanan şekilde hareket etmez ve tedavi süresi uzar."
    },
    {
      "id": "seffaf-plak-takarken-yemek-yiyebilir",
      "category": "Şeffaf Plak",
      "question": "Şeffaf plak takarken yemek yiyebilir miyim?",
      "answer": "Şeffaf plağın en büyük avantajlarından biri, yemek yerken çıkarabilmenizdir; böylece beslenmenizde herhangi bir kısıtlama olmaz. Yemekten sonra dişlerinizi fırçalayıp plağı tekrar takmanız yeterlidir. Plak takılıyken sadece su içmenizi, renkli ve şekerli içeceklerden plak içindeyken kaçınmanızı öneririz."
    },
    {
      "id": "seffaf-plak-nasil-temizlenir-sararir",
      "category": "Şeffaf Plak",
      "question": "Şeffaf plak nasıl temizlenir, sararır mı?",
      "answer": "Plaklarınızı ılık suyla ve yumuşak bir fırçayla nazikçe temizlemeniz, sıcak su kullanmamanız önemlidir çünkü sıcaklık plağı deforme edebilir. Düzenli temizlik ve plak takılıyken renkli içeceklerden, sigaradan kaçınmak sararmayı önler. Zaten plaklar belirli aralıklarla yenileriyle değiştiği için kalıcı leke riski düşüktür."
    },
    {
      "id": "seffaf-plaktaki-atasman-nedir-dise",
      "category": "Şeffaf Plak",
      "question": "Şeffaf plaktaki ataşman nedir, dişe zarar verir mi?",
      "answer": "Ataşmanlar, dişe geçici olarak yapıştırılan küçük diş renginde dolgu noktalarıdır ve plağın dişi daha kontrollü hareket ettirmesini sağlar. Dişe zarar vermezler ve tedavi bittiğinde ağrısız şekilde sökülerek dişiniz eski haline döner. Bazı diş hareketleri için gerekli olduklarından tedavi planınızın doğal bir parçasıdır."
    },
    {
      "id": "metal-braket-mi-seramik-braket",
      "category": "Braket",
      "question": "Metal braket mi seramik braket mi tercih etmeliyim?",
      "answer": "Metal braketler dayanıklı ve genellikle daha ekonomik bir seçenekken, seramik braketler diş rengine yakın olduğu için estetik açıdan daha az belli olur. İkisi de tedavi başarısı açısından etkilidir; seçim büyük ölçüde görünüm tercihinize ve vakanıza bağlıdır. Hangisinin sizin için uygun olduğunu muayenede birlikte değerlendirebiliriz."
    },
    {
      "id": "seramik-braketler-sararir-ya-da",
      "category": "Braket",
      "question": "Seramik braketler sararır ya da lekelenir mi?",
      "answer": "Kaliteli seramik braketlerin kendisi lekelenmeye dirençlidir, ancak braketleri tutan lastikler renkli ve asitli gıdalardan etkilenebilir. Bu lastikler her kontrolde yenilendiği için kalıcı bir sararma sorunu yaşanmaz. Sigara, koyu kahve ve çay tüketimini azaltmak görünümü daha temiz tutmanıza yardımcı olur."
    },
    {
      "id": "braketim-koptu-ya-da-telim",
      "category": "Braket",
      "question": "Braketim koptu ya da telim battı, ne yapmalıyım?",
      "answer": "Kopan braket ya da batan bir tel acil bir tıbbi durum oluşturmaz, telaşlanmanıza gerek yoktur. Batan tel ucunu ortodontik mumla kapatarak geçici olarak rahatlayabilir, kopan parçayı saklayıp ilk fırsatta bizimle iletişime geçerek randevu alabilirsiniz. Teli kendiniz kesmeye ya da düzeltmeye çalışmamanız önemlidir."
    },
    {
      "id": "lingual-yani-icten-dis-teli",
      "category": "Braket",
      "question": "Lingual yani içten diş teli nedir?",
      "answer": "Lingual diş teli, braketlerin dişlerin iç yüzeyine yani dile bakan tarafına yerleştirildiği bir yöntemdir, bu sayede dışarıdan neredeyse hiç görünmez. Estetik kaygısı yüksek olan hastalar için iyi bir seçenektir. İlk günlerde dilde hafif bir alışma dönemi olabilir, bu da kısa sürede geçer."
    },
    {
      "id": "cocugumu-ilk-kez-kac-yasinda",
      "category": "Çocuk",
      "question": "Çocuğumu ilk kez kaç yaşında ortodontiste götürmeliyim?",
      "answer": "İlk ortodonti kontrolü için ideal zaman, çocuğunuz yedi yaş civarındayken yapılan değerlendirmedir. Bu yaşta diş teli takılması gerekmese bile, çene gelişimi ve olası sorunlar erkenden fark edilerek doğru zamanlama planlanabilir. Erken kontrol, ileride daha kapsamlı tedavi ihtiyacını azaltabilir."
    },
    {
      "id": "cocugumun-parmak-emmesi-dislerine-zarar",
      "category": "Çocuk",
      "question": "Çocuğumun parmak emmesi dişlerine zarar verir mi?",
      "answer": "Parmak emme üç dört yaşına kadar normal kabul edilir, ancak bu yaştan sonra devam ederse ön dişlerin ileri kaymasına ve açık kapanışa yol açabilir. Alışkanlığın dört yaşından önce nazikçe bırakılması en sağlıklısıdır. Gerektiğinde alışkanlığı durdurmaya yardımcı küçük apareyler de kullanılabilir, bunu muayenede değerlendirebiliriz."
    },
    {
      "id": "cocugum-agzi-acik-uyuyor-ve",
      "category": "Çocuk",
      "question": "Çocuğum ağzı açık uyuyor ve burnundan nefes almıyor, sorun olur mu?",
      "answer": "Sürekli ağızdan nefes alma, üst çenenin dar gelişmesine ve diş düzeninin bozulmasına yol açabileceği için önemlidir. Bunun arkasında çoğu zaman geniz eti veya bademcik gibi bir neden bulunur, bu yüzden hem kulak burun boğaz hekimi hem ortodontist değerlendirmesi faydalıdır. Erken fark edildiğinde gelişimi doğru yöne yönlendirmek mümkündür."
    },
    {
      "id": "cocugumda-damak-genisletme-apareyi-gerekiyor",
      "category": "Çocuk",
      "question": "Çocuğumda damak genişletme apareyi gerekiyor, ağrı yapar mı?",
      "answer": "Çene genişletme apareyleri genellikle ağrı yapmaz; çocuklar ilk birkaç gün hafif bir baskı ve dolgunluk hissi yaşayıp kısa sürede alışır. Bu apareyler çocukluk döneminde, kemikler henüz tam sertleşmeden uygulandığında dar üst çeneyi ameliyatsız genişletebilir. Apareyin nasıl kullanılacağını ve takip sürecini size ayrıntılı anlatırız."
    },
    {
      "id": "sut-disi-erken-dustu-yer",
      "category": "Çocuk",
      "question": "Süt dişi erken düştü, yer tutucu şart mı?",
      "answer": "Süt dişinin erken kaybı her zaman yer tutucu gerektirmez, ancak boşalan alana komşu dişler kayarak alttaki daimi dişin yerini daraltabilir. Bu durumda yer tutucu, ileride oluşabilecek çapraşıklığı önlemek için önerilir. Çocuğunuzun ağız yapısı değerlendirilerek yer tutucuya gerek olup olmadığı netleşir."
    },
    {
      "id": "cocuklarda-erken-yapilan-tedavi-ileride",
      "category": "Çocuk",
      "question": "Çocuklarda erken yapılan tedavi ileride diş teli ihtiyacını ortadan kaldırır mı?",
      "answer": "Erken müdahale, çene gelişimini yönlendirerek ileride yapılacak tedaviyi kolaylaştırabilir ve bazı durumlarda daha basit hale getirebilir, ancak her zaman ikinci aşama tel ihtiyacını tamamen ortadan kaldırmaz. Birçok çocukta gelişim tamamlandığında dişleri düzenlemek için kısa bir tel dönemi yine gerekebilir. Bu yüzden tedaviyi gerçekçi beklentilerle, aşama aşama planlamak en doğrusudur."
    },
    {
      "id": "cene-uyumsuzlugum-sadece-dis-teliyle",
      "category": "Cerrahi",
      "question": "Çene uyumsuzluğum sadece diş teliyle düzelir mi, yoksa ameliyat şart mı?",
      "answer": "Hafif ve orta düzeydeki uyumsuzluklar çoğu zaman sadece diş teliyle veya kamuflaj tedavisiyle düzeltilebilir. Ancak çenelerin konumu arasında ileri derecede bir uyumsuzluk varsa, kalıcı ve sağlıklı bir kapanış için ortognatik cerrahi gerekebilir. Sizin durumunuzun hangi gruba girdiği, röntgen ve ölçü değerlendirmesiyle muayenede netleşir."
    },
    {
      "id": "cene-ameliyati-surecinde-once-dis",
      "category": "Cerrahi",
      "question": "Çene ameliyatı sürecinde önce diş teli mi takılır?",
      "answer": "Evet, ortognatik cerrahide genellikle önce dişlerin doğru konuma getirilmesi için bir süre diş teli takılır, ardından ameliyat yapılır ve sonrasında ince ayar için bir süre daha tele devam edilir. Bu hazırlık döneminde dişler geçici olarak daha düzensiz görünebilir, bu sürecin doğal bir parçasıdır. Tüm aşamalar planlı şekilde, sizinle adım adım paylaşılarak ilerler."
    },
    {
      "id": "cene-ameliyatindan-sonra-iyilesme-ne",
      "category": "Cerrahi",
      "question": "Çene ameliyatından sonra iyileşme ne kadar sürer?",
      "answer": "Ameliyat sonrası şişlik ilk günlerde belirgindir ve genellikle iki haftada büyük ölçüde geriler, çoğu hasta yaklaşık bir hafta evde dinlendikten sonra günlük yaşamına dönmeye başlar. Çene kemiğinin tam kaynaması ise birkaç ayı bulur, bu sürede yumuşak ve sıvı ağırlıklı beslenmek gerekir. İyileşme süreci kişiden kişiye değişir, size özel takvim cerrahi ekiple birlikte belirlenir."
    },
    {
      "id": "cene-ameliyatini-ortodontist-mi-yoksa",
      "category": "Cerrahi",
      "question": "Çene ameliyatını ortodontist mi yoksa çene cerrahı mı yapar?",
      "answer": "Bu tedavi bir ekip işidir; ortodontist dişleri ameliyat öncesi ve sonrasında düzenler, ameliyatı ise ağız çene ve yüz cerrahisi uzmanı gerçekleştirir. İki uzman tedavi planını baştan birlikte oluşturur ve süreç boyunca uyum içinde çalışır. Böylece hem dişlerinizin dizilimi hem çene konumunuz birbirini tamamlayacak şekilde planlanır."
    },
    {
      "id": "ne-siklikla-kontrole-gitmem-gerekir",
      "category": "Süreç",
      "question": "Ne sıklıkla kontrole gitmem gerekir?",
      "answer": "Klasik diş teli tedavisinde kontroller genellikle dört ila altı haftada bir, şeffaf plak tedavisinde ise altı sekiz haftada bir yapılır. Bu randevularda teliniz ayarlanır, plaklarınız teslim edilir ve ilerleme değerlendirilir. Randevuları düzenli takip etmeniz tedavinin planlanan sürede tamamlanması için önemlidir."
    },
    {
      "id": "tedavi-bittikten-sonra-disler-eski",
      "category": "Süreç",
      "question": "Tedavi bittikten sonra dişler eski haline döner mi?",
      "answer": "Diş teli çıktıktan sonra dişlerin yeni konumlarını koruması için pekiştirme yani retainer kullanımı şarttır. Pekiştirme apareyini önerilen şekilde kullanmazsanız dişler zamanla eski yerlerine doğru kaymaya meyledebilir. Sabit veya hareketli pekiştirme seçeneklerini ve ne kadar süre kullanmanız gerektiğini tedavinin sonunda size ayrıntılı anlatırız."
    },
    {
      "id": "pekistirme-apareyini-ne-kadar-sure",
      "category": "Süreç",
      "question": "Pekiştirme apareyini ne kadar süre takmam gerekir?",
      "answer": "Pekiştirme genellikle ilk dönemde daha yoğun, ilerleyen aylarda azalan sıklıkta kullanılır ve dişlerin kalıcılığı için uzun vadeli, çoğu zaman gece kullanımı önerilir. Bu, tedaviyle elde edilen sonucu korumanın en güvenli yoludur. Size uygun kullanım planı, dişlerinizin durumuna göre belirlenir."
    },
    {
      "id": "ilk-muayenede-neler-yapilir",
      "category": "Süreç",
      "question": "İlk muayenede neler yapılır?",
      "answer": "İlk muayenede dişleriniz ve çene yapınız ayrıntılı incelenir, gerektiğinde röntgen ve fotoğraflarla durumunuz değerlendirilir. Size uygun tedavi seçenekleri, tahmini süreç ve sonrasında dikkat etmeniz gerekenler hakkında bilgi veririz. Aklınızdaki tüm soruları rahatça sorabileceğiniz, sizi tanıdığımız bir tanışma görüşmesi olarak düşünebilirsiniz."
    },
    {
      "id": "dis-teli-tedavisi-icin-dis",
      "category": "Süreç",
      "question": "Diş teli tedavisi için diş çekimi şart mı?",
      "answer": "Diş çekimi her vakada gerekmez; bu karar çapraşıklığın derecesine ve çenenizdeki yer darlığına göre değişir. Hafif vakalarda çekimsiz tedavi mümkünken, ileri çapraşıklıkta dişlere yer açmak için çekim gerekebilir. Sizin için en uygun yaklaşım, ağız yapınız değerlendirildikten sonra netleşir."
    },
    {
      "id": "dis-teli-fiyatlari-ne-kadar",
      "category": "Süreç",
      "question": "Diş teli fiyatları ne kadar?",
      "answer": "Tedavi ücreti; vakanızın türüne, seçilecek yönteme ve tedavi süresine göre kişiden kişiye değiştiği için tek bir rakam vermek doğru olmaz. Size özel net bilgi, ilk muayenede durumunuz değerlendirildikten sonra paylaşılır. Detaylar ve ödeme seçenekleri için bizimle iletişime geçebilirsiniz."
    },
    {
      "id": "dis-telini-ya-da-seffaf",
      "category": "Süreç",
      "question": "Diş telini ya da şeffaf plağı SGK karşılıyor mu?",
      "answer": "Genel uygulamada SGK on sekiz yaş altındaki bazı ortodontik tedavileri devlet veya üniversite hastaneleri üzerinden kapsayabilirken, yetişkinlerde ve özel kliniklerde durum farklıdır. Kapsam koşulları değişkenlik gösterdiği için kesin bir taahhütte bulunmak doğru olmaz. Güncel durumunuzu birlikte değerlendirip sizi en doğru şekilde yönlendirebiliriz."
    },
    {
      "id": "manisa-da-ortodonti-tedavisi-icin",
      "category": "Manisa",
      "question": "Manisa'da ortodonti tedavisi için nasıl randevu alabilirim?",
      "answer": "Manisa'daki kliniğimizden randevu almak için bizimle telefon veya iletişim kanallarımız üzerinden ulaşabilirsiniz. Size uygun bir gün ve saat belirleyerek ilk muayene için sizi bekleriz. Aklınızdaki soruları randevu öncesinde de iletebilir, tedavi süreci hakkında ön bilgi alabilirsiniz."
    },
    {
      "id": "manisa-disindan-cevre-ilcelerden-geliyorum",
      "category": "Manisa",
      "question": "Manisa dışından, çevre ilçelerden geliyorum; tedavimi nasıl planlarsınız?",
      "answer": "Turgutlu, Salihli, Akhisar gibi çevre ilçelerden ya da uzaktan gelen hastalarımız için kontrol randevularını mümkün olduğunca verimli aralıklarla planlamaya özen gösteririz. Böylece daha az sayıda gelişle tedavinizi sürdürebilirsiniz. Yol durumunuzu baştan paylaşırsanız, randevu takviminizi buna göre birlikte düzenleyebiliriz."
    }
  ]

// Ana sayfada gösterilen sorular (sıra önemlidir: genel → karar → kitle → randevu).
// HomeFaq.tsx ve scripts/prerender.ts AYNI listeyi kullanır — tek kaynak.
export const HOME_FAQ_IDS: string[] = [
    "dis-teli-tedavisi-ne-kadar",
    "seffaf-plak-mi-dis-teli",
    "metal-braket-mi-seramik-braket",
    "cocugumu-ilk-kez-kac-yasinda",
    "cene-uyumsuzlugum-sadece-dis-teliyle",
    "tedavi-bittikten-sonra-disler-eski",
    "manisa-da-ortodonti-tedavisi-icin"
  ]

// Kimlikten soru bulur. Bulunamazsa SESSİZ GEÇMEZ — hata fırlatır.
export function faqById(id: string): Faq {
  const hit = faqs.find((f) => f.id === id)
  if (!hit) throw new Error(`faqs: "${id}" kimlikli soru bulunamadı`)
  return hit
}
