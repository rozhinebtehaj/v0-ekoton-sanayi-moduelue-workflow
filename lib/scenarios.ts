export interface ScenarioData {
  id: number
  name: string
  description: string
  overallScore: number
  assessmentData: Array<{
    category: string
    score: number
    maxScore: number
    status: "good" | "medium" | "low"
  }>
  progressData: Array<{
    month: string
    energy: number
    water: number
    waste: number
    overall: number
  }>
  kpis: Array<{
    title: string
    current: number
    target: number
    trend: "up" | "down" | "stable"
    change: string
    unit: string
  }>
  recommendations: Array<{
    category: string
    priority: "Yüksek" | "Orta" | "Düşük"
    description: string
    benefits: string[]
  }>
  actionPlan: {
    shortTerm: Array<{
      title: string
      description: string
      timeline: string
      cost: "Düşük" | "Orta" | "Yüksek"
      impact: "Düşük" | "Orta" | "Yüksek" | "Çok Yüksek"
      category: string
    }>
    mediumTerm: Array<{
      title: string
      description: string
      timeline: string
      cost: "Düşük" | "Orta" | "Yüksek"
      impact: "Düşük" | "Orta" | "Yüksek" | "Çok Yüksek"
      category: string
    }>
    longTerm: Array<{
      title: string
      description: string
      timeline: string
      cost: "Düşük" | "Orta" | "Yüksek"
      impact: "Düşük" | "Orta" | "Yüksek" | "Çok Yüksek"
      category: string
    }>
  }
}

export const scenarios: ScenarioData[] = [
  {
    id: 0,
    name: "Başlangıç Seviyesi",
    description: "Yeşil dönüşüme yeni başlayan işletme profili",
    overallScore: 45,
    assessmentData: [
      { category: "Kurumsal Farkındalık", score: 40, maxScore: 100, status: "low" },
      { category: "Enerji Yönetimi", score: 35, maxScore: 100, status: "low" },
      { category: "Su Yönetimi", score: 30, maxScore: 100, status: "low" },
      { category: "Atık Yönetimi", score: 55, maxScore: 100, status: "medium" },
      { category: "Yenilenebilir Enerji", score: 20, maxScore: 100, status: "low" },
      { category: "Yeşil Tedarik", score: 25, maxScore: 100, status: "low" },
      { category: "Döngüsel Ekonomi", score: 30, maxScore: 100, status: "low" },
      { category: "Afet Yönetimi", score: 65, maxScore: 100, status: "medium" },
    ],
    progressData: [
      { month: "Oca", energy: 35, water: 30, waste: 55, overall: 40 },
      { month: "Şub", energy: 38, water: 32, waste: 58, overall: 43 },
      { month: "Mar", energy: 40, water: 35, waste: 60, overall: 45 },
      { month: "Nis", energy: 42, water: 38, waste: 62, overall: 47 },
      { month: "May", energy: 45, water: 40, waste: 65, overall: 50 },
      { month: "Haz", energy: 48, water: 42, waste: 68, overall: 53 },
    ],
    kpis: [
      { title: "Enerji Verimliliği", current: 48, target: 70, trend: "up", change: "+8%", unit: "%" },
      { title: "Su Tasarrufu", current: 42, target: 60, trend: "up", change: "+12%", unit: "%" },
      { title: "Geri Dönüşüm Oranı", current: 68, target: 80, trend: "up", change: "+15%", unit: "%" },
      { title: "Karbon Azaltımı", current: 35, target: 50, trend: "up", change: "+20%", unit: "%" },
    ],
    recommendations: [
      {
        category: "Temel Altyapı",
        priority: "Yüksek",
        description: "Enerji ve su ölçüm sistemleri kurarak mevcut tüketiminizi izlemeye başlayın.",
        benefits: ["Tüketim farkındalığı", "Tasarruf fırsatlarının tespiti", "Veri tabanlı karar verme"],
      },
      {
        category: "Atık Yönetimi",
        priority: "Yüksek",
        description: "Atık ayrıştırma sistemi kurarak geri dönüşüm oranınızı artırın.",
        benefits: ["Atık maliyeti azalması", "Çevresel etki azalması", "Yasal uyumluluk"],
      },
      {
        category: "Personel Eğitimi",
        priority: "Orta",
        description: "Çalışanlarınıza çevre bilinci ve tasarruf konularında eğitim verin.",
        benefits: ["Farkındalık artışı", "Davranış değişikliği", "Kültürel dönüşüm"],
      },
    ],
    actionPlan: {
      shortTerm: [
        {
          title: "Enerji Ölçüm Sistemi",
          description: "Temel enerji sayaçları ve izleme sistemi kurulumu",
          timeline: "2 ay",
          cost: "Düşük",
          impact: "Yüksek",
          category: "Enerji",
        },
        {
          title: "Atık Ayrıştırma",
          description: "Temel atık ayrıştırma konteynerleri ve işaretleme",
          timeline: "1 ay",
          cost: "Düşük",
          impact: "Orta",
          category: "Atık",
        },
      ],
      mediumTerm: [
        {
          title: "LED Dönüşümü",
          description: "Tüm aydınlatma sistemlerinin LED'e dönüştürülmesi",
          timeline: "6 ay",
          cost: "Orta",
          impact: "Yüksek",
          category: "Enerji",
        },
      ],
      longTerm: [
        {
          title: "Çevre Yönetim Sistemi",
          description: "ISO 14001 çevre yönetim sistemi kurulumu",
          timeline: "18 ay",
          cost: "Yüksek",
          impact: "Çok Yüksek",
          category: "Yönetim",
        },
      ],
    },
  },
  {
    id: 1,
    name: "Orta Seviye",
    description: "Bazı uygulamaları olan, gelişim halindeki işletme profili",
    overallScore: 65,
    assessmentData: [
      { category: "Kurumsal Farkındalık", score: 70, maxScore: 100, status: "good" },
      { category: "Enerji Yönetimi", score: 60, maxScore: 100, status: "medium" },
      { category: "Su Yönetimi", score: 55, maxScore: 100, status: "medium" },
      { category: "Atık Yönetimi", score: 75, maxScore: 100, status: "good" },
      { category: "Yenilenebilir Enerji", score: 45, maxScore: 100, status: "low" },
      { category: "Yeşil Tedarik", score: 60, maxScore: 100, status: "medium" },
      { category: "Döngüsel Ekonomi", score: 50, maxScore: 100, status: "medium" },
      { category: "Afet Yönetimi", score: 75, maxScore: 100, status: "good" },
    ],
    progressData: [
      { month: "Oca", energy: 55, water: 50, waste: 70, overall: 58 },
      { month: "Şub", energy: 58, water: 53, waste: 72, overall: 61 },
      { month: "Mar", energy: 60, water: 55, waste: 75, overall: 63 },
      { month: "Nis", energy: 62, water: 58, waste: 77, overall: 66 },
      { month: "May", energy: 65, water: 60, waste: 80, overall: 68 },
      { month: "Haz", energy: 68, water: 62, waste: 82, overall: 71 },
    ],
    kpis: [
      { title: "Enerji Verimliliği", current: 68, target: 80, trend: "up", change: "+6%", unit: "%" },
      { title: "Su Tasarrufu", current: 62, target: 75, trend: "up", change: "+10%", unit: "%" },
      { title: "Geri Dönüşüm Oranı", current: 82, target: 90, trend: "up", change: "+8%", unit: "%" },
      { title: "Karbon Azaltımı", current: 58, target: 70, trend: "up", change: "+15%", unit: "%" },
    ],
    recommendations: [
      {
        category: "Yenilenebilir Enerji",
        priority: "Yüksek",
        description: "Güneş paneli sistemi kurarak yenilenebilir enerji kullanımına başlayın.",
        benefits: ["Enerji maliyeti azalması", "Karbon ayak izi azalması", "Enerji bağımsızlığı"],
      },
      {
        category: "Su Verimliliği",
        priority: "Orta",
        description: "Su geri dönüşüm sistemi kurarak su tüketiminizi optimize edin.",
        benefits: ["Su maliyeti tasarrufu", "Çevresel etki azalması", "Sürdürülebilir üretim"],
      },
      {
        category: "Tedarik Zinciri",
        priority: "Orta",
        description: "Tedarikçilerinizi sürdürülebilirlik kriterlerine göre değerlendirin.",
        benefits: ["Tedarik zinciri riski azalması", "Marka değeri artışı", "Uyumluluk sağlama"],
      },
    ],
    actionPlan: {
      shortTerm: [
        {
          title: "Akıllı Termostat",
          description: "HVAC sistemleri için akıllı termostat kurulumu",
          timeline: "1 ay",
          cost: "Düşük",
          impact: "Orta",
          category: "Enerji",
        },
        {
          title: "Su Tasarruf Armatürleri",
          description: "Düşük akışlı musluk ve duş başlıkları",
          timeline: "2 ay",
          cost: "Düşük",
          impact: "Orta",
          category: "Su",
        },
      ],
      mediumTerm: [
        {
          title: "Güneş Paneli Fizibilite",
          description: "Güneş enerjisi sistemi fizibilite çalışması",
          timeline: "4 ay",
          cost: "Düşük",
          impact: "Yüksek",
          category: "Enerji",
        },
        {
          title: "Tedarikçi Audit",
          description: "Sürdürülebilirlik odaklı tedarikçi değerlendirmesi",
          timeline: "6 ay",
          cost: "Orta",
          impact: "Yüksek",
          category: "Tedarik",
        },
      ],
      longTerm: [
        {
          title: "Güneş Enerjisi Sistemi",
          description: "100kW güneş paneli sistemi kurulumu",
          timeline: "12 ay",
          cost: "Yüksek",
          impact: "Çok Yüksek",
          category: "Enerji",
        },
        {
          title: "Su Geri Dönüşüm Sistemi",
          description: "Endüstriyel su geri dönüşüm ve arıtma sistemi",
          timeline: "15 ay",
          cost: "Yüksek",
          impact: "Yüksek",
          category: "Su",
        },
      ],
    },
  },
  {
    id: 2,
    name: "İleri Seviye",
    description: "Sürdürülebilirlik alanında öncü, yüksek performanslı işletme profili",
    overallScore: 85,
    assessmentData: [
      { category: "Kurumsal Farkındalık", score: 90, maxScore: 100, status: "good" },
      { category: "Enerji Yönetimi", score: 85, maxScore: 100, status: "good" },
      { category: "Su Yönetimi", score: 80, maxScore: 100, status: "good" },
      { category: "Atık Yönetimi", score: 95, maxScore: 100, status: "good" },
      { category: "Yenilenebilir Enerji", score: 75, maxScore: 100, status: "good" },
      { category: "Yeşil Tedarik", score: 85, maxScore: 100, status: "good" },
      { category: "Döngüsel Ekonomi", score: 80, maxScore: 100, status: "good" },
      { category: "Afet Yönetimi", score: 90, maxScore: 100, status: "good" },
    ],
    progressData: [
      { month: "Oca", energy: 80, water: 75, waste: 90, overall: 82 },
      { month: "Şub", energy: 82, water: 78, waste: 92, overall: 84 },
      { month: "Mar", energy: 85, water: 80, waste: 94, overall: 86 },
      { month: "Nis", energy: 87, water: 82, waste: 96, overall: 88 },
      { month: "May", energy: 90, water: 85, waste: 98, overall: 91 },
      { month: "Haz", energy: 92, water: 87, waste: 100, overall: 93 },
    ],
    kpis: [
      { title: "Enerji Verimliliği", current: 92, target: 95, trend: "up", change: "+3%", unit: "%" },
      { title: "Su Tasarrufu", current: 87, target: 90, trend: "up", change: "+5%", unit: "%" },
      { title: "Geri Dönüşüm Oranı", current: 100, target: 100, trend: "stable", change: "0%", unit: "%" },
      { title: "Karbon Azaltımı", current: 85, target: 90, trend: "up", change: "+8%", unit: "%" },
    ],
    recommendations: [
      {
        category: "Karbon Nötralite",
        priority: "Yüksek",
        description: "Karbon nötr üretim hedefi için kalan emisyonları offset edin.",
        benefits: ["Karbon nötr sertifikası", "Marka liderliği", "Gelecek nesil hazırlığı"],
      },
      {
        category: "Döngüsel Tasarım",
        priority: "Orta",
        description: "Ürün tasarımında döngüsel ekonomi prensiplerini tam olarak uygulayın.",
        benefits: ["Malzeme verimliliği", "Yenilik fırsatları", "Pazar avantajı"],
      },
      {
        category: "Dijital Dönüşüm",
        priority: "Orta",
        description: "IoT ve AI teknolojileri ile sürdürülebilirlik performansını optimize edin.",
        benefits: ["Operasyonel verimlilik", "Predictive maintenance", "Akıllı kaynak yönetimi"],
      },
    ],
    actionPlan: {
      shortTerm: [
        {
          title: "IoT Sensör Ağı",
          description: "Gerçek zamanlı çevresel izleme sensörleri",
          timeline: "3 ay",
          cost: "Orta",
          impact: "Yüksek",
          category: "Teknoloji",
        },
        {
          title: "Karbon Offset Programı",
          description: "Kalan emisyonlar için karbon offset projesi",
          timeline: "2 ay",
          cost: "Orta",
          impact: "Yüksek",
          category: "Karbon",
        },
      ],
      mediumTerm: [
        {
          title: "AI Optimizasyon",
          description: "Yapay zeka ile enerji ve kaynak optimizasyonu",
          timeline: "8 ay",
          cost: "Yüksek",
          impact: "Çok Yüksek",
          category: "Teknoloji",
        },
        {
          title: "Döngüsel Tasarım Lab",
          description: "Ürün geliştirme için döngüsel tasarım laboratuvarı",
          timeline: "10 ay",
          cost: "Yüksek",
          impact: "Çok Yüksek",
          category: "Ar-Ge",
        },
      ],
      longTerm: [
        {
          title: "Karbon Negatif Hedefi",
          description: "Karbon negatif üretim süreçleri geliştirme",
          timeline: "24 ay",
          cost: "Çok Yüksek",
          impact: "Çok Yüksek",
          category: "Karbon",
        },
        {
          title: "Sektör Liderliği",
          description: "Sektörde sürdürülebilirlik standartları belirleme",
          timeline: "36 ay",
          cost: "Yüksek",
          impact: "Çok Yüksek",
          category: "Liderlik",
        },
      ],
    },
  },
  {
    id: 3,
    name: "Karma Profil",
    description: "Bazı alanlarda güçlü, bazı alanlarda gelişim gerektiren işletme profili",
    overallScore: 58,
    assessmentData: [
      { category: "Kurumsal Farkındalık", score: 75, maxScore: 100, status: "good" },
      { category: "Enerji Yönetimi", score: 45, maxScore: 100, status: "low" },
      { category: "Su Yönetimi", score: 65, maxScore: 100, status: "medium" },
      { category: "Atık Yönetimi", score: 85, maxScore: 100, status: "good" },
      { category: "Yenilenebilir Enerji", score: 25, maxScore: 100, status: "low" },
      { category: "Yeşil Tedarik", score: 70, maxScore: 100, status: "good" },
      { category: "Döngüsel Ekonomi", score: 40, maxScore: 100, status: "low" },
      { category: "Afet Yönetimi", score: 55, maxScore: 100, status: "medium" },
    ],
    progressData: [
      { month: "Oca", energy: 40, water: 60, waste: 80, overall: 60 },
      { month: "Şub", energy: 42, water: 62, waste: 82, overall: 62 },
      { month: "Mar", energy: 45, water: 65, waste: 85, overall: 65 },
      { month: "Nis", energy: 47, water: 67, waste: 87, overall: 67 },
      { month: "May", energy: 50, water: 70, waste: 90, overall: 70 },
      { month: "Haz", energy: 52, water: 72, waste: 92, overall: 72 },
    ],
    kpis: [
      { title: "Enerji Verimliliği", current: 52, target: 75, trend: "up", change: "+12%", unit: "%" },
      { title: "Su Tasarrufu", current: 72, target: 80, trend: "up", change: "+7%", unit: "%" },
      { title: "Geri Dönüşüm Oranı", current: 92, target: 95, trend: "up", change: "+5%", unit: "%" },
      { title: "Karbon Azaltımı", current: 45, target: 65, trend: "up", change: "+18%", unit: "%" },
    ],
    recommendations: [
      {
        category: "Enerji Modernizasyonu",
        priority: "Yüksek",
        description: "Eski enerji sistemlerini modern, verimli teknolojilerle değiştirin.",
        benefits: ["Dramatik enerji tasarrufu", "Bakım maliyeti azalması", "Güvenilirlik artışı"],
      },
      {
        category: "Yenilenebilir Enerji",
        priority: "Yüksek",
        description: "Güçlü atık yönetimi deneyiminizi yenilenebilir enerjiye genişletin.",
        benefits: ["Enerji maliyeti kontrolü", "Sürdürülebilirlik liderliği", "Risk azaltma"],
      },
      {
        category: "Entegre Yaklaşım",
        priority: "Orta",
        description: "Güçlü olduğunuz alanları zayıf alanlarla entegre ederek sinerjiler yaratın.",
        benefits: ["Holistic iyileştirme", "Maliyet optimizasyonu", "Sistem verimliliği"],
      },
    ],
    actionPlan: {
      shortTerm: [
        {
          title: "Enerji Audit",
          description: "Kapsamlı enerji verimliliği değerlendirmesi",
          timeline: "2 ay",
          cost: "Düşük",
          impact: "Yüksek",
          category: "Enerji",
        },
        {
          title: "Verimli Motor Değişimi",
          description: "Kritik sistemlerde yüksek verimli motor kullanımı",
          timeline: "4 ay",
          cost: "Orta",
          impact: "Yüksek",
          category: "Enerji",
        },
      ],
      mediumTerm: [
        {
          title: "Hibrit Enerji Sistemi",
          description: "Güneş + şebeke hibrit enerji çözümü",
          timeline: "8 ay",
          cost: "Yüksek",
          impact: "Çok Yüksek",
          category: "Enerji",
        },
        {
          title: "Döngüsel Süreç Tasarımı",
          description: "Atık yönetimi başarısını döngüsel süreçlere genişletme",
          timeline: "10 ay",
          cost: "Orta",
          impact: "Yüksek",
          category: "Döngüsel",
        },
      ],
      longTerm: [
        {
          title: "Entegre Yönetim Sistemi",
          description: "Enerji, çevre ve kalite yönetim sistemlerinin entegrasyonu",
          timeline: "18 ay",
          cost: "Yüksek",
          impact: "Çok Yüksek",
          category: "Yönetim",
        },
      ],
    },
  },
]

export class ScenarioManager {
  private static readonly STORAGE_KEY = "ekoton-user-scenario"

  static getScenarioIndex(): number {
    if (typeof window === "undefined") return 0

    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (stored !== null) {
      const index = Number.parseInt(stored, 10)
      if (index >= 0 && index < scenarios.length) {
        return index
      }
    }

    // Generate new random scenario
    const randomIndex = Math.floor(Math.random() * scenarios.length)
    localStorage.setItem(this.STORAGE_KEY, randomIndex.toString())
    return randomIndex
  }

  static getCurrentScenario(): ScenarioData {
    const index = this.getScenarioIndex()
    return scenarios[index]
  }

  static setScenarioIndex(index: number): void {
    if (typeof window === "undefined") return

    if (index >= 0 && index < scenarios.length) {
      localStorage.setItem(this.STORAGE_KEY, index.toString())
    }
  }

  static clearScenario(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(this.STORAGE_KEY)
  }

  static getAllScenarios(): ScenarioData[] {
    return scenarios
  }
}
