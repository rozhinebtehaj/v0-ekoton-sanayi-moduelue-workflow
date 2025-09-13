export interface ScenarioReport {
  id: number
  executiveSummary: string
  currentStatusNarrative: string
  strengthsAnalysis: string
  challengesAnalysis: string
  developmentPlan: {
    phase1: {
      title: string
      duration: string
      description: string
      objectives: string[]
      keyActions: Array<{
        action: string
        rationale: string
        expectedOutcome: string
        timeline: string
        resources: string
      }>
      successMetrics: string[]
    }
    phase2: {
      title: string
      duration: string
      description: string
      objectives: string[]
      keyActions: Array<{
        action: string
        rationale: string
        expectedOutcome: string
        timeline: string
        resources: string
      }>
      successMetrics: string[]
    }
    phase3: {
      title: string
      duration: string
      description: string
      objectives: string[]
      keyActions: Array<{
        action: string
        rationale: string
        expectedOutcome: string
        timeline: string
        resources: string
      }>
      successMetrics: string[]
    }
  }
  riskAssessment: Array<{
    risk: string
    impact: "Düşük" | "Orta" | "Yüksek"
    probability: "Düşük" | "Orta" | "Yüksek"
    mitigation: string
  }>
  investmentAnalysis: {
    totalInvestment: string
    paybackPeriod: string
    expectedSavings: string
    roi: string
    breakdown: Array<{
      category: string
      amount: string
      percentage: number
    }>
  }
  stakeholderEngagement: Array<{
    stakeholder: string
    role: string
    engagement: string
  }>
  nextSteps: string[]
}

export const scenarioReports: ScenarioReport[] = [
  {
    // Başlangıç Seviyesi
    id: 0,
    executiveSummary: `Bu rapor, yeşil dönüşüm yolculuğunun başında olan organizasyonunuzun mevcut durumunu değerlendirmekte ve kapsamlı bir gelişim planı sunmaktadır. 45/100 genel puanınız, güçlü bir temel oluşturmak için önemli fırsatları işaret etmektedir. Özellikle atık yönetimi (55/100) ve afet yönetimi (65/100) alanlarındaki mevcut kapasiteleriniz üzerine inşa ederek, sistematik bir yaklaşımla sürdürülebilirlik performansınızı artırabilirsiniz.`,

    currentStatusNarrative: `Organizasyonunuz sürdürülebilirlik alanında ilk adımlarını atmış durumda. Mevcut değerlendirmemiz, temel altyapı ve farkındalık eksikliklerini ortaya koymakla birlikte, gelişim için güçlü bir motivasyon ve potansiyel göstermektedir. Kurumsal farkındalık seviyeniz (40/100) henüz gelişim aşamasında olsa da, bu durum hızlı ilerleme için bir fırsat yaratmaktadır. Enerji yönetimi (35/100) ve su yönetimi (30/100) alanlarında sistematik yaklaşım eksikliği gözlemlenmekte, ancak bu alanlar için hızlı kazanımlar elde edilebilir. Yenilenebilir enerji kullanımınız (20/100) minimal seviyede olup, bu alan için büyük gelişim potansiyeli bulunmaktadır.`,

    strengthsAnalysis: `Organizasyonunuzun en güçlü yanları atık yönetimi uygulamalarınız ve afet yönetimi hazırlığınızdır. Atık yönetiminde gösterdiğiniz 55/100 performans, temel ayrıştırma ve geri dönüşüm süreçlerinin yerleşik olduğunu göstermektedir. Bu deneyim, döngüsel ekonomi yaklaşımına geçiş için değerli bir temel oluşturmaktadır. Afet yönetimindeki 65/100 puanınız, risk farkındalığınızın ve hazırlık kapasitenizenin iyi seviyede olduğunu işaret etmektedir. Bu güçlü yönler, genel sürdürülebilirlik stratejinizin omurgasını oluşturabilir.`,

    challengesAnalysis: `Temel zorluklarınız enerji ve su yönetimi alanlarında yoğunlaşmaktadır. Enerji tüketiminizin sistematik olarak izlenmemesi ve verimliliği artırıcı teknolojilerin eksikliği, maliyetlerinizi artırmakta ve çevresel etkilerinizi olumsuz etkilemektedir. Su yönetiminde de benzer sorunlar gözlemlenmekte; tüketim takibi ve tasarruf uygulamaları yetersiz kalmaktadır. Yenilenebilir enerji kullanımınızın düşük seviyesi, enerji maliyetlerinizi artırmakta ve karbon ayak izinizi olumsuz etkilemektedir. Kurumsal farkındalık eksikliği, çalışan katılımını sınırlamakta ve sürdürülebilirlik kültürünün gelişimini engellemektedir.`,

    developmentPlan: {
      phase1: {
        title: "Temel Altyapı ve Farkındalık Oluşturma",
        duration: "0-6 ay",
        description:
          "Bu aşamada temel ölçüm sistemleri kurulacak, çalışan farkındalığı artırılacak ve hızlı kazanımlar elde edilecektir.",
        objectives: [
          "Enerji ve su tüketim ölçüm sistemlerinin kurulması",
          "Çalışan farkındalığının artırılması",
          "Temel tasarruf uygulamalarının hayata geçirilmesi",
          "Atık yönetimi sisteminin optimize edilmesi",
        ],
        keyActions: [
          {
            action: "Akıllı sayaç sistemi kurulumu",
            rationale: "Tüketim verilerinin gerçek zamanlı takibi, tasarruf fırsatlarının belirlenmesi için kritiktir",
            expectedOutcome: "Enerji tüketiminde %10-15 azalma, su tüketiminde %8-12 azalma",
            timeline: "2 ay",
            resources: "50.000-75.000 TL yatırım, 1 teknik personel",
          },
          {
            action: "Çalışan eğitim programı",
            rationale: "Sürdürülebilirlik kültürünün oluşması için çalışan katılımı şarttır",
            expectedOutcome: "Çalışan farkındalığında %40 artış, gönüllü katılımda artış",
            timeline: "3 ay",
            resources: "25.000 TL eğitim bütçesi, 20 saat/ay eğitim zamanı",
          },
          {
            action: "LED aydınlatma dönüşümü",
            rationale: "Hızlı geri dönüş süresi olan, görünür tasarruf sağlayan uygulama",
            expectedOutcome: "Aydınlatma enerjisinde %60 tasarruf",
            timeline: "4 ay",
            resources: "100.000-150.000 TL yatırım",
          },
        ],
        successMetrics: [
          "Enerji tüketiminde %15 azalma",
          "Su tüketiminde %10 azalma",
          "Çalışan eğitim katılım oranı %90",
          "Atık geri dönüşüm oranında %20 artış",
        ],
      },
      phase2: {
        title: "Sistem Optimizasyonu ve Teknoloji Entegrasyonu",
        duration: "6-18 ay",
        description:
          "Temel sistemlerin optimize edilmesi, ileri teknolojilerin entegrasyonu ve süreçlerin standardizasyonu.",
        objectives: [
          "Enerji verimliliği sistemlerinin kurulması",
          "Su geri kazanım sistemlerinin geliştirilmesi",
          "Yenilenebilir enerji altyapısının oluşturulması",
          "Çevre yönetim sisteminin kurulması",
        ],
        keyActions: [
          {
            action: "HVAC sistemi modernizasyonu",
            rationale: "Enerji tüketiminin büyük kısmını oluşturan ısıtma/soğutma sistemlerinin verimliliği kritiktir",
            expectedOutcome: "HVAC enerjisinde %30 tasarruf",
            timeline: "8 ay",
            resources: "300.000-500.000 TL yatırım, sistem entegratörü",
          },
          {
            action: "Güneş paneli sistemi kurulumu",
            rationale: "Enerji maliyetlerinin azaltılması ve karbon ayak izinin düşürülmesi",
            expectedOutcome: "Elektrik ihtiyacının %25'inin karşılanması",
            timeline: "6 ay",
            resources: "400.000-600.000 TL yatırım, çatı alanı",
          },
          {
            action: "Su geri dönüşüm sistemi",
            rationale: "Su maliyetlerinin azaltılması ve çevresel etkinin düşürülmesi",
            expectedOutcome: "Su tüketiminde %20 azalma",
            timeline: "10 ay",
            resources: "200.000-300.000 TL yatırım, teknik uzmanlık",
          },
        ],
        successMetrics: [
          "Toplam enerji tüketiminde %25 azalma",
          "Yenilenebilir enerji oranı %25",
          "Su tüketiminde %20 azalma",
          "ISO 14001 sertifikası alımı",
        ],
      },
      phase3: {
        title: "İleri Düzey Sürdürülebilirlik ve Liderlik",
        duration: "18-36 ay",
        description:
          "İleri teknolojilerin uygulanması, sektör liderliğinin oluşturulması ve sürekli iyileştirme kültürünün yerleştirilmesi.",
        objectives: [
          "Karbon nötr operasyonlara geçiş",
          "Döngüsel ekonomi modelinin uygulanması",
          "Dijital sürdürülebilirlik platformunun kurulması",
          "Sektör liderliğinin oluşturulması",
        ],
        keyActions: [
          {
            action: "IoT tabanlı akıllı bina sistemi",
            rationale: "Yapay zeka destekli optimizasyon ile maksimum verimlilik",
            expectedOutcome: "Toplam enerji tüketiminde %15 ek tasarruf",
            timeline: "12 ay",
            resources: "500.000-750.000 TL yatırım, dijital uzmanlık",
          },
          {
            action: "Sıfır atık sertifikasyonu",
            rationale: "Döngüsel ekonomi modelinin tam uygulanması",
            expectedOutcome: "Atık bertarafında %90 azalma",
            timeline: "18 ay",
            resources: "150.000 TL danışmanlık, süreç yeniden tasarımı",
          },
          {
            action: "Karbon offset programı",
            rationale: "Karbon nötr hedefine ulaşım",
            expectedOutcome: "Net sıfır karbon emisyonu",
            timeline: "24 ay",
            resources: "Yıllık 100.000 TL offset maliyeti",
          },
        ],
        successMetrics: [
          "Karbon nötr operasyon",
          "Sıfır atık sertifikası",
          "Toplam enerji verimliliğinde %50 iyileşme",
          "Sektör sürdürülebilirlik ödülü",
        ],
      },
    },
    riskAssessment: [
      {
        risk: "Yatırım bütçesi kısıtlamaları",
        impact: "Yüksek",
        probability: "Orta",
        mitigation: "Aşamalı yatırım planı, hibe ve teşvik programlarından yararlanma",
      },
      {
        risk: "Çalışan direnci",
        impact: "Orta",
        probability: "Orta",
        mitigation: "Kapsamlı eğitim programı, teşvik sistemleri, liderlik desteği",
      },
      {
        risk: "Teknoloji entegrasyon zorlukları",
        impact: "Orta",
        probability: "Düşük",
        mitigation: "Deneyimli sistem entegratörleri ile çalışma, pilot uygulamalar",
      },
    ],
    investmentAnalysis: {
      totalInvestment: "1.500.000 - 2.200.000 TL",
      paybackPeriod: "4-6 yıl",
      expectedSavings: "Yıllık 400.000-600.000 TL",
      roi: "%18-25",
      breakdown: [
        { category: "Enerji Sistemleri", amount: "800.000 TL", percentage: 40 },
        { category: "Su Yönetimi", amount: "300.000 TL", percentage: 15 },
        { category: "Atık Yönetimi", amount: "200.000 TL", percentage: 10 },
        { category: "Dijital Sistemler", amount: "400.000 TL", percentage: 20 },
        { category: "Eğitim ve Danışmanlık", amount: "300.000 TL", percentage: 15 },
      ],
    },
    stakeholderEngagement: [
      {
        stakeholder: "Üst Yönetim",
        role: "Stratejik karar verici",
        engagement: "Aylık ilerleme raporları, ROI analizleri, risk değerlendirmeleri",
      },
      {
        stakeholder: "Çalışanlar",
        role: "Uygulayıcı",
        engagement: "Eğitim programları, öneri sistemleri, başarı hikayesi paylaşımları",
      },
      {
        stakeholder: "Tedarikçiler",
        role: "İş ortağı",
        engagement: "Sürdürülebilirlik kriterleri, ortak projeler, kapasite geliştirme",
      },
    ],
    nextSteps: [
      "Yönetim kurulu onayının alınması",
      "Detaylı proje planının hazırlanması",
      "Bütçe tahsisinin yapılması",
      "Proje ekibinin oluşturulması",
      "İlk aşama uygulamalarının başlatılması",
    ],
  },
  {
    // Orta Seviye
    id: 1,
    executiveSummary: `Organizasyonunuz sürdürülebilirlik yolculuğunda önemli mesafe kat etmiş ve 65/100 genel puanı ile sektör ortalamasının üzerinde performans göstermektedir. Kurumsal farkındalık (70/100) ve atık yönetimi (75/100) alanlarındaki güçlü performansınız, daha ileri düzey uygulamalara geçiş için sağlam bir temel oluşturmaktadır. Yenilenebilir enerji (45/100) ve döngüsel ekonomi (50/100) alanlarında ise önemli gelişim fırsatları bulunmaktadır.`,

    currentStatusNarrative: `Organizasyonunuz sürdürülebilirlik alanında orta-ileri seviyede konumlanmış durumda. Mevcut sistemleriniz ve uygulamalarınız, sektör standartlarını karşılamakta ve bazı alanlarda öncü konumda bulunmaktadır. Kurumsal farkındalık seviyenizin yüksek olması (70/100), sürdürülebilirlik kültürünün organizasyonda yerleşmeye başladığını göstermektedir. Enerji yönetimi (60/100) ve su yönetimi (55/100) alanlarında sistematik yaklaşımlarınız mevcut, ancak optimizasyon fırsatları bulunmaktadır. Atık yönetimindeki başarılı performansınız (75/100), döngüsel ekonomi uygulamalarına geçiş için güçlü bir temel oluşturmaktadır.`,

    strengthsAnalysis: `Organizasyonunuzun en güçlü yanları kurumsal farkındalık, atık yönetimi ve afet yönetimi alanlarındaki performansıdır. Kurumsal farkındalıktaki 70/100 puanınız, sürdürülebilirlik stratejilerinin üst yönetim desteği ile uygulandığını ve çalışan katılımının sağlandığını göstermektedir. Atık yönetimindeki 75/100 performansınız, sistematik ayrıştırma, geri dönüşüm süreçleri ve atık azaltma uygulamalarının başarılı şekilde uygulandığını işaret etmektedir. Yeşil tedarik (60/100) alanındaki performansınız, tedarik zinciri sürdürülebilirliği konusunda farkındalığınızı ve ilk adımlarınızı göstermektedir.`,

    challengesAnalysis: `Temel zorluklarınız yenilenebilir enerji kullanımı ve döngüsel ekonomi uygulamalarında yoğunlaşmaktadır. Yenilenebilir enerji oranınızın düşük olması (45/100), enerji maliyetlerinizi artırmakta ve karbon ayak izinizi olumsuz etkilemektedir. Döngüsel ekonomi uygulamalarınızın sınırlı olması (50/100), kaynak verimliliği ve maliyet optimizasyonu fırsatlarını kaçırmanıza neden olmaktadır. Enerji ve su yönetimi alanlarında mevcut sistemleriniz işlevsel olsa da, ileri teknolojiler ve optimizasyon uygulamaları ile önemli iyileştirmeler sağlanabilir.`,

    developmentPlan: {
      phase1: {
        title: "Mevcut Sistemlerin Optimizasyonu",
        duration: "0-8 ay",
        description: "Mevcut güçlü sistemlerin optimize edilmesi ve yenilenebilir enerji altyapısının oluşturulması.",
        objectives: [
          "Enerji verimliliği sistemlerinin optimize edilmesi",
          "Yenilenebilir enerji kapasitesinin artırılması",
          "Su yönetimi sistemlerinin geliştirilmesi",
          "Tedarik zinciri sürdürülebilirliğinin artırılması",
        ],
        keyActions: [
          {
            action: "Güneş enerjisi sistemi kurulumu (200kW)",
            rationale: "Enerji maliyetlerinin azaltılması ve karbon ayak izinin düşürülmesi için kritik yatırım",
            expectedOutcome: "Elektrik ihtiyacının %40'ının karşılanması, yıllık 150.000 TL tasarruf",
            timeline: "6 ay",
            resources: "800.000-1.200.000 TL yatırım, çatı alanı optimizasyonu",
          },
          {
            action: "Akıllı enerji yönetim sistemi",
            rationale: "Mevcut enerji tüketiminin optimize edilmesi ve verimliliğin artırılması",
            expectedOutcome: "Enerji tüketiminde %15 ek tasarruf",
            timeline: "4 ay",
            resources: "200.000 TL yatırım, sistem entegrasyonu",
          },
          {
            action: "Su geri kazanım sistemi genişletmesi",
            rationale: "Su maliyetlerinin azaltılması ve çevresel etkinin düşürülmesi",
            expectedOutcome: "Su tüketiminde %25 azalma",
            timeline: "8 ay",
            resources: "300.000-400.000 TL yatırım",
          },
        ],
        successMetrics: [
          "Yenilenebilir enerji oranı %40",
          "Toplam enerji tüketiminde %20 azalma",
          "Su tüketiminde %25 azalma",
          "Tedarikçi sürdürülebilirlik puanında %30 artış",
        ],
      },
      phase2: {
        title: "İleri Teknoloji Entegrasyonu ve Döngüsel Ekonomi",
        duration: "8-20 ay",
        description:
          "İleri teknolojilerin entegrasyonu, döngüsel ekonomi modelinin uygulanması ve dijital dönüşümün gerçekleştirilmesi.",
        objectives: [
          "Döngüsel ekonomi modelinin tam uygulanması",
          "Dijital sürdürülebilirlik platformunun kurulması",
          "İleri enerji depolama sistemlerinin entegrasyonu",
          "Sürdürülebilirlik raporlama sisteminin otomasyonu",
        ],
        keyActions: [
          {
            action: "Endüstri 4.0 tabanlı üretim optimizasyonu",
            rationale: "Kaynak verimliliğinin maksimize edilmesi ve atık minimizasyonu",
            expectedOutcome: "Üretim verimliliğinde %20 artış, atık üretiminde %30 azalma",
            timeline: "12 ay",
            resources: "1.000.000-1.500.000 TL yatırım, dijital dönüşüm uzmanlığı",
          },
          {
            action: "Enerji depolama sistemi (Battery Storage)",
            rationale: "Yenilenebilir enerji kullanımının optimize edilmesi ve şebeke bağımsızlığının artırılması",
            expectedOutcome: "Enerji maliyetlerinde %25 ek tasarruf",
            timeline: "8 ay",
            resources: "600.000-800.000 TL yatırım",
          },
          {
            action: "Sıfır atık sertifikasyon süreci",
            rationale: "Döngüsel ekonomi modelinin tam uygulanması ve maliyet optimizasyonu",
            expectedOutcome: "Atık bertaraf maliyetlerinde %80 azalma",
            timeline: "15 ay",
            resources: "100.000 TL danışmanlık, süreç yeniden tasarımı",
          },
        ],
        successMetrics: [
          "Döngüsel ekonomi oranı %70",
          "Dijital sürdürülebilirlik platformu aktif",
          "Enerji depolama kapasitesi 500kWh",
          "Sıfır atık ön sertifikası",
        ],
      },
      phase3: {
        title: "Sektör Liderliği ve İnovasyon",
        duration: "20-36 ay",
        description:
          "Sektör liderliğinin oluşturulması, inovatif çözümlerin geliştirilmesi ve sürdürülebilirlik ekosisteminin kurulması.",
        objectives: [
          "Karbon negatif operasyonlara geçiş",
          "Sürdürülebilirlik inovasyon merkezinin kurulması",
          "Sektör ortaklıklarının geliştirilmesi",
          "Uluslararası sertifikasyonların alınması",
        ],
        keyActions: [
          {
            action: "Karbon yakalama ve depolama teknolojisi",
            rationale: "Karbon negatif hedefine ulaşım ve iklim liderliği",
            expectedOutcome: "Net negatif karbon emisyonu",
            timeline: "18 ay",
            resources: "2.000.000-3.000.000 TL yatırım, AR-GE ortaklığı",
          },
          {
            action: "Sürdürülebilirlik inovasyon laboratuvarı",
            rationale: "Yeni teknolojilerin geliştirilmesi ve test edilmesi",
            expectedOutcome: "Yıllık 3-5 inovatif çözüm geliştirme",
            timeline: "12 ay",
            resources: "1.500.000 TL yatırım, AR-GE personeli",
          },
          {
            action: "Sektör sürdürülebilirlik platformu liderliği",
            rationale: "Sektör genelinde sürdürülebilirlik standartlarının yükseltilmesi",
            expectedOutcome: "Sektör liderliği konumunun pekiştirilmesi",
            timeline: "24 ay",
            resources: "500.000 TL platform geliştirme",
          },
        ],
        successMetrics: [
          "Karbon negatif operasyon",
          "5 patent başvurusu",
          "Uluslararası sürdürülebilirlik ödülü",
          "Sektör platform liderliği",
        ],
      },
    },
    riskAssessment: [
      {
        risk: "Teknoloji entegrasyon karmaşıklığı",
        impact: "Yüksek",
        probability: "Orta",
        mitigation: "Aşamalı entegrasyon, pilot projeler, uzman danışmanlık",
      },
      {
        risk: "Yüksek yatırım maliyetleri",
        impact: "Yüksek",
        probability: "Orta",
        mitigation: "Finansman çeşitlendirmesi, hibe programları, aşamalı yatırım",
      },
      {
        risk: "Pazar koşullarındaki değişimler",
        impact: "Orta",
        probability: "Orta",
        mitigation: "Esnek planlama, çoklu senaryo analizi, risk yönetimi",
      },
    ],
    investmentAnalysis: {
      totalInvestment: "4.500.000 - 6.500.000 TL",
      paybackPeriod: "5-7 yıl",
      expectedSavings: "Yıllık 800.000-1.200.000 TL",
      roi: "%15-20",
      breakdown: [
        { category: "Yenilenebilir Enerji", amount: "2.000.000 TL", percentage: 35 },
        { category: "Dijital Sistemler", amount: "1.500.000 TL", percentage: 25 },
        { category: "Üretim Optimizasyonu", amount: "1.200.000 TL", percentage: 20 },
        { category: "AR-GE ve İnovasyon", amount: "800.000 TL", percentage: 15 },
        { category: "Sertifikasyon ve Danışmanlık", amount: "300.000 TL", percentage: 5 },
      ],
    },
    stakeholderEngagement: [
      {
        stakeholder: "Yönetim Kurulu",
        role: "Stratejik yönlendirici",
        engagement: "Üç aylık stratejik değerlendirmeler, yatırım komitesi sunumları",
      },
      {
        stakeholder: "Operasyon Ekipleri",
        role: "Uygulayıcı",
        engagement: "Sürekli eğitim, performans takibi, iyileştirme önerileri",
      },
      {
        stakeholder: "Müşteriler",
        role: "Değer alıcısı",
        engagement: "Sürdürülebilirlik raporları, şeffaflık platformu, ortak projeler",
      },
      {
        stakeholder: "Yatırımcılar",
        role: "Finansör",
        engagement: "ESG raporlaması, sürdürülebilirlik performans metrikleri",
      },
    ],
    nextSteps: [
      "Yenilenebilir enerji yatırımının finansmanının sağlanması",
      "Dijital dönüşüm roadmap'inin detaylandırılması",
      "Sıfır atık sertifikasyon sürecinin başlatılması",
      "İnovasyon laboratuvarı için yer tahsisi",
      "Sektör ortaklıklarının geliştirilmesi",
    ],
  },
  {
    // İleri Seviye
    id: 2,
    executiveSummary: `Organizasyonunuz sürdürülebilirlik alanında sektör lideri konumunda bulunmakta ve 85/100 genel puanı ile mükemmellik seviyesine yaklaşmaktadır. Tüm ana kategorilerde güçlü performans göstermekte olup, özellikle atık yönetimi (95/100) ve kurumsal farkındalık (90/100) alanlarında sektör standardını belirleyici konumdadır. Bu seviyede odak noktanız, inovasyonu yönlendirmek, sektör liderliğinizi pekiştirmek ve gelecek nesil sürdürülebilirlik teknolojilerinin öncüsü olmaktır.`,

    currentStatusNarrative: `Organizasyonunuz sürdürülebilirlik alanında olgunluk seviyesine ulaşmış ve sektör için referans noktası haline gelmiştir. Kurumsal farkındalık seviyenizin çok yüksek olması (90/100), sürdürülebilirliğin organizasyon DNA'sına yerleştiğini ve tüm karar alma süreçlerinde dikkate alındığını göstermektedir. Enerji yönetimi (85/100) ve su yönetimi (80/100) alanlarında ileri düzey sistemleriniz, sektör best practice'lerini oluşturmaktadır. Atık yönetimindeki mükemmel performansınız (95/100), döngüsel ekonomi modelinin tam uygulandığını ve sıfır atık hedefine ulaştığınızı göstermektedir. Yenilenebilir enerji kullanımınız (75/100) ve yeşil tedarik uygulamalarınız (85/100) ile sürdürülebilir değer zinciri oluşturmuş durumdasınız.`,

    strengthsAnalysis: `Organizasyonunuzun güçlü yanları tüm sürdürülebilirlik alanlarında dengeli ve yüksek performans göstermesidir. Kurumsal farkındalıktaki mükemmel performansınız (90/100), sürdürülebilirlik stratejilerinin tam entegrasyonunu ve üst yönetim liderliğini yansıtmaktadır. Atık yönetimindeki sektör lideri konumunuz (95/100), döngüsel ekonomi prensiplerinin tam uygulandığını ve inovatif çözümler geliştirdiğinizi göstermektedir. Afet yönetimi (90/100) ve yeşil tedarik (85/100) alanlarındaki performansınız, risk yönetimi ve tedarik zinciri sürdürülebilirliğinde öncü konumunuzu pekiştirmektedir. Bu güçlü performans, sektör liderliğinizi ve sürdürülebilirlik inovasyonundaki rolünüzü desteklemektedir.`,

    challengesAnalysis: `Bu seviyede karşılaştığınız zorluklar, sürekli inovasyon baskısı ve gelecek nesil teknolojilere adaptasyon gerekliliğidir. Mevcut yüksek performansınızı sürdürürken, aynı zamanda yeni teknolojileri entegre etmek ve sektör liderliğinizi korumak kritik önem taşımaktadır. Karbon nötraliteden karbon negatif operasyonlara geçiş, teknolojik ve operasyonel karmaşıklık yaratmaktadır. Dijital dönüşümün hızlanması ile birlikte, sürdürülebilirlik teknolojilerinin entegrasyonu ve veri yönetimi yeni zorluklar oluşturmaktadır. Ayrıca, sektör liderliği sorumluluğu ile birlikte, diğer organizasyonlara rehberlik etme ve standart belirleme beklentileri artmaktadır.`,

    developmentPlan: {
      phase1: {
        title: "İnovasyon ve Teknoloji Liderliği",
        duration: "0-12 ay",
        description:
          "Gelecek nesil teknolojilerin entegrasyonu, inovasyon kapasitesinin artırılması ve dijital sürdürülebilirlik platformunun geliştirilmesi.",
        objectives: [
          "Yapay zeka destekli sürdürülebilirlik optimizasyonu",
          "Blockchain tabanlı şeffaflık platformu",
          "İleri enerji depolama ve yönetim sistemleri",
          "Sürdürülebilirlik inovasyon merkezi kurulumu",
        ],
        keyActions: [
          {
            action: "AI/ML tabanlı kaynak optimizasyon sistemi",
            rationale:
              "Mevcut yüksek performansın daha da optimize edilmesi ve predictive analytics ile proaktif yönetim",
            expectedOutcome: "Kaynak verimliliğinde %10 ek iyileşme, operasyonel maliyetlerde %15 azalma",
            timeline: "8 ay",
            resources: "2.000.000 TL yatırım, veri bilimi ekibi, AI uzmanları",
          },
          {
            action: "Blockchain tabanlı sürdürülebilirlik izlenebilirlik platformu",
            rationale: "Tedarik zinciri şeffaflığının artırılması ve sürdürülebilirlik iddialarının doğrulanması",
            expectedOutcome: "Tam tedarik zinciri şeffaflığı, müşteri güveninde artış",
            timeline: "10 ay",
            resources: "1.500.000 TL platform geliştirme, blockchain uzmanları",
          },
          {
            action: "İleri enerji depolama sistemi (1MW)",
            rationale: "Yenilenebilir enerji kullanımının maksimize edilmesi ve şebeke bağımsızlığının artırılması",
            expectedOutcome: "Enerji maliyetlerinde %20 ek tasarruf, şebeke bağımsızlığı %80",
            timeline: "12 ay",
            resources: "3.000.000 TL yatırım, enerji depolama teknolojisi",
          },
        ],
        successMetrics: [
          "AI optimizasyon sisteminin devreye alınması",
          "Blockchain platform beta lansmanı",
          "Enerji depolama kapasitesi 1MW",
          "İnovasyon merkezi operasyonel",
        ],
      },
      phase2: {
        title: "Karbon Negatif Dönüşüm ve Ekosistem Liderliği",
        duration: "12-24 ay",
        description:
          "Karbon negatif operasyonlara geçiş, sürdürülebilirlik ekosisteminin liderliği ve sektör standartlarının belirlenmesi.",
        objectives: [
          "Karbon yakalama ve kullanım teknolojilerinin uygulanması",
          "Sürdürülebilirlik ekosistem platformunun kurulması",
          "Sektör standartlarının belirlenmesi ve yayılması",
          "Uluslararası sürdürülebilirlik sertifikasyonlarının alınması",
        ],
        keyActions: [
          {
            action: "Karbon yakalama, kullanım ve depolama (CCUS) sistemi",
            rationale: "Karbon negatif hedefine ulaşım ve iklim değişikliği liderliği",
            expectedOutcome: "Net negatif karbon emisyonu, yıllık 1000 ton CO2 yakalama",
            timeline: "18 ay",
            resources: "5.000.000 TL yatırım, CCUS teknoloji ortaklığı",
          },
          {
            action: "Sürdürülebilirlik ekosistem platformu",
            rationale:
              "Sektör genelinde sürdürülebilirlik standartlarının yükseltilmesi ve liderlik konumunun pekiştirilmesi",
            expectedOutcome: "100+ şirketin platforma katılımı, sektör standartlarının belirlenmesi",
            timeline: "15 ay",
            resources: "2.000.000 TL platform geliştirme, ekosistem yönetimi",
          },
          {
            action: "Sürdürülebilirlik AR-GE merkezi",
            rationale: "Gelecek nesil sürdürülebilirlik teknolojilerinin geliştirilmesi",
            expectedOutcome: "Yıllık 5-8 patent başvurusu, 3-5 inovatif çözüm",
            timeline: "12 ay",
            resources: "3.000.000 TL AR-GE yatırımı, araştırma ekibi",
          },
        ],
        successMetrics: [
          "Karbon negatif operasyon sertifikası",
          "Ekosistem platformunda 100+ üye",
          "5 patent başvurusu",
          "Uluslararası sürdürülebilirlik ödülü",
        ],
      },
      phase3: {
        title: "Global Liderlik ve Gelecek Nesil Sürdürülebilirlik",
        duration: "24-36 ay",
        description:
          "Global sürdürülebilirlik liderliğinin oluşturulması, gelecek nesil teknolojilerin öncülüğü ve sürdürülebilirlik eğitim ekosisteminin kurulması.",
        objectives: [
          "Global sürdürülebilirlik standartlarının belirlenmesi",
          "Sürdürülebilirlik eğitim ve araştırma enstitüsünün kurulması",
          "Gelecek nesil sürdürülebilirlik teknolojilerinin ticarileştirilmesi",
          "Sürdürülebilirlik yatırım fonunun oluşturulması",
        ],
        keyActions: [
          {
            action: "Global sürdürülebilirlik standartları geliştirme",
            rationale: "Uluslararası düzeyde sürdürülebilirlik standartlarının belirlenmesi ve yaygınlaştırılması",
            expectedOutcome: "Uluslararası standart kabul edilmesi, global etki yaratma",
            timeline: "24 ay",
            resources: "1.000.000 TL standart geliştirme, uluslararası işbirlikleri",
          },
          {
            action: "Sürdürülebilirlik Enstitüsü kurulumu",
            rationale: "Sürdürülebilirlik alanında eğitim, araştırma ve danışmanlık merkezi oluşturma",
            expectedOutcome: "Yıllık 1000+ profesyonel eğitimi, 20+ araştırma projesi",
            timeline: "18 ay",
            resources: "4.000.000 TL kuruluş yatırımı, akademik ortaklıklar",
          },
          {
            action: "Sürdürülebilirlik teknolojileri ticarileştirme",
            rationale: "Geliştirilen inovatif çözümlerin ticarileştirilmesi ve gelir yaratma",
            expectedOutcome: "Yıllık 10.000.000 TL teknoloji geliri",
            timeline: "30 ay",
            resources: "2.000.000 TL ticarileştirme yatırımı",
          },
        ],
        successMetrics: [
          "Uluslararası standart kabul edilmesi",
          "Enstitü akreditasyonu",
          "3 teknoloji ticarileştirmesi",
          "Global sürdürülebilirlik liderlik ödülü",
        ],
      },
    },
    riskAssessment: [
      {
        risk: "Teknoloji geliştirme riskleri",
        impact: "Yüksek",
        probability: "Orta",
        mitigation: "Çoklu teknoloji portföyü, stratejik ortaklıklar, aşamalı geliştirme",
      },
      {
        risk: "Yüksek AR-GE maliyetleri",
        impact: "Yüksek",
        probability: "Yüksek",
        mitigation: "Çeşitlendirilmiş finansman, hibe programları, ortaklık modelleri",
      },
      {
        risk: "Rekabet baskısı",
        impact: "Orta",
        probability: "Yüksek",
        mitigation: "Sürekli inovasyon, patent portföyü, first-mover advantage",
      },
    ],
    investmentAnalysis: {
      totalInvestment: "15.000.000 - 20.000.000 TL",
      paybackPeriod: "6-8 yıl",
      expectedSavings: "Yıllık 2.000.000-3.000.000 TL",
      roi: "%12-18",
      breakdown: [
        { category: "AR-GE ve İnovasyon", amount: "8.000.000 TL", percentage: 45 },
        { category: "İleri Teknoloji Sistemleri", amount: "5.000.000 TL", percentage: 25 },
        { category: "Platform ve Ekosistem", amount: "3.000.000 TL", percentage: 15 },
        { category: "Eğitim ve Enstitü", amount: "2.000.000 TL", percentage: 10 },
        { category: "Uluslararası Genişleme", amount: "1.000.000 TL", percentage: 5 },
      ],
    },
    stakeholderEngagement: [
      {
        stakeholder: "Global Yatırımcılar",
        role: "Finansal destekçi",
        engagement: "ESG performans raporları, sürdürülebilirlik yatırım sunumları",
      },
      {
        stakeholder: "Akademik Kurumlar",
        role: "Araştırma ortağı",
        engagement: "Ortak araştırma projeleri, bilgi paylaşımı, eğitim programları",
      },
      {
        stakeholder: "Devlet Kurumları",
        role: "Politika ortağı",
        engagement: "Politika geliştirme, standart belirleme, düzenleyici işbirliği",
      },
      {
        stakeholder: "Uluslararası Organizasyonlar",
        role: "Standart belirleyici",
        engagement: "Global standart geliştirme, best practice paylaşımı",
      },
    ],
    nextSteps: [
      "AR-GE merkezi için stratejik ortaklıkların kurulması",
      "CCUS teknolojisi için pilot proje başlatılması",
      "Global standart geliştirme komitesinin oluşturulması",
      "Sürdürülebilirlik enstitüsü için yer tahsisi",
      "Uluslararası yatırımcı sunumlarının hazırlanması",
    ],
  },
  {
    // Karma Profil
    id: 3,
    executiveSummary: `Organizasyonunuz sürdürülebilirlik alanında karma bir profil sergilemekte ve 58/100 genel puanı ile sektör ortalaması civarında performans göstermektedir. Atık yönetimi (85/100) ve yeşil tedarik (70/100) alanlarındaki güçlü performansınız ile enerji yönetimi (45/100) ve yenilenebilir enerji (25/100) alanlarındaki gelişim ihtiyacınız arasında belirgin bir kontrast bulunmaktadır. Bu durum, mevcut güçlü yönlerinizi koruyarak zayıf alanlarınızı hızla geliştirme fırsatı sunmaktadır.`,

    currentStatusNarrative: `Organizasyonunuz sürdürülebilirlik yolculuğunda dengesiz bir gelişim göstermekte olup, bazı alanlarda sektör lideri performans sergilerken, diğer alanlarda temel seviyede kalmaktadır. Kurumsal farkındalık seviyenizin yüksek olması (75/100), sürdürülebilirlik konusunda üst yönetim desteği ve stratejik yaklaşımın varlığını göstermektedir. Atık yönetimindeki mükemmel performansınız (85/100), sistematik yaklaşım ve operasyonel mükemmellik kapasitenizenin kanıtıdır. Ancak, enerji yönetimi (45/100) ve yenilenebilir enerji (25/100) alanlarındaki düşük performans, teknolojik yatırım eksikliği ve sistematik yaklaşım ihtiyacını ortaya koymaktadır. Bu durum, hızlı iyileştirme potansiyeli olan bir profil yaratmaktadır.`,

    strengthsAnalysis: `Organizasyonunuzun en güçlü yanları atık yönetimi, yeşil tedarik ve kurumsal farkındalık alanlarındaki performansıdır. Atık yönetimindeki sektör lideri konumunuz (85/100), operasyonel mükemmellik, sistematik yaklaşım ve sürekli iyileştirme kültürünüzün göstergesidir. Bu başarı, döngüsel ekonomi uygulamalarına geçiş için güçlü bir temel oluşturmaktadır. Yeşil tedarik alanındaki performansınız (70/100), tedarik zinciri yönetiminde sürdürülebilirlik kriterlerini dikkate aldığınızı ve sorumlu satın alma uygulamalarını benimsediğinizi göstermektedir. Kurumsal farkındalıktaki yüksek puanınız (75/100), değişim yönetimi kapasitenizenin güçlü olduğunu ve yeni uygulamaları başarılı şekilde hayata geçirebileceğinizi işaret etmektedir.`,

    challengesAnalysis: `Temel zorluklarınız enerji yönetimi ve yenilenebilir enerji alanlarında yoğunlaşmaktadır. Enerji yönetimindeki düşük performans (45/100), sistematik enerji izleme eksikliği, verimsiz teknolojilerin kullanımı ve enerji optimizasyon fırsatlarının değerlendirilmemesinden kaynaklanmaktadır. Yenilenebilir enerji kullanımınızın çok düşük seviyesi (25/100), enerji maliyetlerinizi artırmakta ve karbon ayak izinizi olumsuz etkilemektedir. Döngüsel ekonomi uygulamalarınızın sınırlı olması (40/100), atık yönetimindeki başarınızın tam potansiyelini kullanamadığınızı göstermektedir. Bu dengesizlik, kaynak verimliliği ve maliyet optimizasyonu açısından önemli fırsatları kaçırmanıza neden olmaktadır.`,

    developmentPlan: {
      phase1: {
        title: "Enerji Sistemleri Modernizasyonu ve Hızlı Kazanımlar",
        duration: "0-9 ay",
        description:
          "Enerji yönetimi sistemlerinin modernizasyonu, mevcut güçlü alanların optimize edilmesi ve hızlı ROI sağlayacak iyileştirmelerin hayata geçirilmesi.",
        objectives: [
          "Enerji yönetimi sistemlerinin kurulması ve modernizasyonu",
          "Atık yönetimi başarısının döngüsel ekonomiye genişletilmesi",
          "Temel yenilenebilir enerji altyapısının oluşturulması",
          "Enerji verimliliği projelerinin hayata geçirilmesi",
        ],
        keyActions: [
          {
            action: "Kapsamlı enerji audit ve ölçüm sistemi kurulumu",
            rationale:
              "Mevcut enerji tüketim paternlerinin analiz edilmesi ve optimizasyon fırsatlarının belirlenmesi kritik",
            expectedOutcome: "Enerji tüketiminde %20 azalma, yıllık 200.000 TL tasarruf",
            timeline: "3 ay",
            resources: "150.000 TL yatırım, enerji uzmanı danışmanlığı",
          },
          {
            action: "Yüksek verimli ekipman değişimi programı",
            rationale: "Eski ve verimsiz ekipmanların değiştirilmesi ile hızlı enerji tasarrufu sağlanması",
            expectedOutcome: "Ekipman enerji tüketiminde %35 azalma",
            timeline: "6 ay",
            resources: "500.000-700.000 TL yatırım",
          },
          {
            action: "Güneş enerjisi sistemi (100kW) kurulumu",
            rationale: "Yenilenebilir enerji oranının artırılması ve enerji maliyetlerinin düşürülmesi",
            expectedOutcome: "Elektrik ihtiyacının %30'unun karşılanması",
            timeline: "8 ay",
            resources: "400.000-600.000 TL yatırım",
          },
          {
            action: "Atık-enerji dönüşüm sistemi",
            rationale: "Mevcut atık yönetimi başarısının enerji üretimine genişletilmesi",
            expectedOutcome: "Atık bertaraf maliyetinde %50 azalma, enerji üretimi",
            timeline: "9 ay",
            resources: "300.000-400.000 TL yatırım",
          },
        ],
        successMetrics: [
          "Enerji tüketiminde %25 azalma",
          "Yenilenebilir enerji oranı %30",
          "Atık-enerji dönüşüm oranı %40",
          "Enerji yönetimi puanı 65/100",
        ],
      },
      phase2: {
        title: "Entegre Sistem Optimizasyonu ve Teknoloji Yatırımları",
        duration: "9-21 ay",
        description:
          "Enerji, atık ve su sistemlerinin entegrasyonu, ileri teknoloji yatırımları ve döngüsel ekonomi modelinin tam uygulanması.",
        objectives: [
          "Entegre kaynak yönetimi sisteminin kurulması",
          "İleri enerji depolama ve yönetim teknolojilerinin uygulanması",
          "Döngüsel ekonomi modelinin tam uygulanması",
          "Dijital izleme ve optimizasyon sistemlerinin kurulması",
        ],
        keyActions: [
          {
            action: "Entegre kaynak yönetimi platformu",
            rationale: "Enerji, su ve atık sistemlerinin entegre yönetimi ile sinerjilerin yaratılması",
            expectedOutcome: "Toplam kaynak verimliliğinde %30 iyileşme",
            timeline: "12 ay",
            resources: "800.000-1.200.000 TL yatırım, sistem entegrasyonu",
          },
          {
            action: "Hibrit enerji sistemi (güneş + depolama)",
            rationale: "Enerji güvenliğinin artırılması ve şebeke bağımsızlığının sağlanması",
            expectedOutcome: "Enerji maliyetlerinde %40 azalma, şebeke bağımsızlığı %60",
            timeline: "10 ay",
            resources: "1.000.000-1.500.000 TL yatırım",
          },
          {
            action: "Sıfır atık sertifikasyon programı",
            rationale: "Mevcut atık yönetimi başarısının sıfır atık seviyesine çıkarılması",
            expectedOutcome: "Atık bertaraf maliyetlerinde %80 azalma",
            timeline: "15 ay",
            resources: "200.000 TL danışmanlık, süreç optimizasyonu",
          },
          {
            action: "IoT tabanlı akıllı izleme sistemi",
            rationale: "Gerçek zamanlı izleme ve predictive maintenance ile optimizasyon",
            expectedOutcome: "Operasyonel verimlilik %25 artış, bakım maliyetleri %30 azalma",
            timeline: "8 ay",
            resources: "400.000-600.000 TL yatırım",
          },
        ],
        successMetrics: [
          "Entegre sistem operasyonel",
          "Enerji depolama kapasitesi 200kWh",
          "Sıfır atık ön sertifikası",
          "IoT sensör ağı %100 kapsama",
        ],
      },
      phase3: {
        title: "İleri Düzey Optimizasyon ve Sürdürülebilirlik Liderliği",
        duration: "21-36 ay",
        description:
          "İleri teknolojilerin uygulanması, sürdürülebilirlik liderliğinin oluşturulması ve inovatif çözümlerin geliştirilmesi.",
        objectives: [
          "Yapay zeka destekli optimizasyon sistemlerinin kurulması",
          "Karbon nötr operasyonlara geçiş",
          "Sektör içi sürdürülebilirlik liderliğinin oluşturulması",
          "İnovatif sürdürülebilirlik çözümlerinin geliştirilmesi",
        ],
        keyActions: [
          {
            action: "AI/ML tabanlı kaynak optimizasyon sistemi",
            rationale: "Yapay zeka ile kaynak kullanımının optimize edilmesi ve predictive analytics",
            expectedOutcome: "Kaynak verimliliğinde %20 ek iyileşme",
            timeline: "15 ay",
            resources: "1.500.000-2.000.000 TL yatırım, AI uzmanları",
          },
          {
            action: "Karbon nötr sertifikasyon programı",
            rationale: "Karbon ayak izinin minimize edilmesi ve offset programları ile nötr hedefine ulaşım",
            expectedOutcome: "Net sıfır karbon emisyonu",
            timeline: "18 ay",
            resources: "300.000 TL/yıl offset maliyeti, süreç optimizasyonu",
          },
          {
            action: "Sürdürülebilirlik inovasyon laboratuvarı",
            rationale: "Yeni sürdürülebilirlik çözümlerinin geliştirilmesi ve test edilmesi",
            expectedOutcome: "Yıllık 2-3 inovatif çözüm geliştirme",
            timeline: "12 ay",
            resources: "800.000-1.200.000 TL yatırım",
          },
          {
            action: "Sektör sürdürülebilirlik platformu kurulumu",
            rationale: "Sektör içi best practice paylaşımı ve liderlik konumunun oluşturulması",
            expectedOutcome: "Sektör liderliği konumunun pekiştirilmesi",
            timeline: "24 ay",
            resources: "500.000 TL platform geliştirme",
          },
        ],
        successMetrics: [
          "AI optimizasyon sistemi aktif",
          "Karbon nötr sertifikası",
          "3 patent başvurusu",
          "Sektör platform liderliği",
        ],
      },
    },
    riskAssessment: [
      {
        risk: "Yatırım önceliklerinin belirlenmesi zorluğu",
        impact: "Yüksek",
        probability: "Orta",
        mitigation: "ROI analizi, aşamalı yatırım planı, pilot projeler",
      },
      {
        risk: "Sistem entegrasyon karmaşıklığı",
        impact: "Orta",
        probability: "Yüksek",
        mitigation: "Deneyimli sistem entegratörleri, aşamalı entegrasyon, test süreçleri",
      },
      {
        risk: "Teknoloji adaptasyon zorlukları",
        impact: "Orta",
        probability: "Orta",
        mitigation: "Kapsamlı eğitim programları, change management, teknik destek",
      },
      {
        risk: "Finansman kısıtlamaları",
        impact: "Yüksek",
        probability: "Orta",
        mitigation: "Çeşitlendirilmiş finansman, hibe programları, leasing seçenekleri",
      },
    ],
    investmentAnalysis: {
      totalInvestment: "6.000.000 - 8.500.000 TL",
      paybackPeriod: "4-6 yıl",
      expectedSavings: "Yıllık 1.200.000-1.800.000 TL",
      roi: "%20-25",
      breakdown: [
        { category: "Enerji Sistemleri", amount: "3.000.000 TL", percentage: 40 },
        { category: "Entegre Teknoloji Platformu", amount: "2.000.000 TL", percentage: 25 },
        { category: "Yenilenebilir Enerji", amount: "1.500.000 TL", percentage: 20 },
        { category: "AI ve Dijital Sistemler", amount: "800.000 TL", percentage: 10 },
        { category: "Sertifikasyon ve Danışmanlık", amount: "400.000 TL", percentage: 5 },
      ],
    },
    stakeholderEngagement: [
      {
        stakeholder: "Üst Yönetim",
        role: "Stratejik karar verici",
        engagement: "ROI odaklı sunumlar, risk-fayda analizleri, aşamalı yatırım planları",
      },
      {
        stakeholder: "Operasyon Ekipleri",
        role: "Uygulayıcı",
        engagement: "Teknik eğitimler, süreç optimizasyonu, performans takibi",
      },
      {
        stakeholder: "Finans Departmanı",
        role: "Bütçe yöneticisi",
        engagement: "Maliyet-fayda analizleri, finansman seçenekleri, geri dönüş hesaplamaları",
      },
      {
        stakeholder: "Tedarikçiler",
        role: "İş ortağı",
        engagement: "Sürdürülebilirlik kriterleri, ortak iyileştirme projeleri, kapasite geliştirme",
      },
    ],
    nextSteps: [
      "Enerji audit çalışmasının başlatılması",
      "Yatırım önceliklerinin belirlenmesi",
      "Güneş enerjisi sistemi için teknik fizibilite çalışması",
      "Entegre sistem tasarımının hazırlanması",
      "Finansman seçeneklerinin değerlendirilmesi",
    ],
  },
]

export function getScenarioReport(scenarioId: number): ScenarioReport | undefined {
  return scenarioReports.find((report) => report.id === scenarioId)
}
