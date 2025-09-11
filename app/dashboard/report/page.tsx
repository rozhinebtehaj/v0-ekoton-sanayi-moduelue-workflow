"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Download,
  FileText,
  Target,
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Lightbulb,
} from "lucide-react"

const actionPlan = {
  shortTerm: [
    {
      title: "LED Aydınlatmaya Geçiş",
      description: "Tüm tesislerde LED aydınlatma sistemine geçiş",
      timeline: "3 ay",
      cost: "Düşük",
      impact: "Orta",
      category: "Enerji",
    },
    {
      title: "Atık Ayrıştırma Sistemi",
      description: "Kapsamlı atık ayrıştırma ve geri dönüşüm programı",
      timeline: "2 ay",
      cost: "Düşük",
      impact: "Yüksek",
      category: "Atık",
    },
    {
      title: "Su Tasarrufu Uygulamaları",
      description: "Su tasarruflu armatürler ve sızıntı kontrolü",
      timeline: "1 ay",
      cost: "Düşük",
      impact: "Orta",
      category: "Su",
    },
  ],
  mediumTerm: [
    {
      title: "Enerji İzleme Sistemi",
      description: "Otomatik enerji izleme ve raporlama sistemi kurulumu",
      timeline: "6 ay",
      cost: "Orta",
      impact: "Yüksek",
      category: "Enerji",
    },
    {
      title: "Tedarikçi Değerlendirme",
      description: "Sürdürülebilirlik kriterlerine göre tedarikçi değerlendirme sistemi",
      timeline: "4 ay",
      cost: "Düşük",
      impact: "Orta",
      category: "Tedarik",
    },
    {
      title: "Çalışan Eğitim Programı",
      description: "Sürdürülebilirlik ve çevre bilinci eğitim programı",
      timeline: "3 ay",
      cost: "Düşük",
      impact: "Yüksek",
      category: "Eğitim",
    },
  ],
  longTerm: [
    {
      title: "Güneş Enerjisi Sistemi",
      description: "Çatı üstü güneş paneli sistemi kurulumu",
      timeline: "12 ay",
      cost: "Yüksek",
      impact: "Çok Yüksek",
      category: "Enerji",
    },
    {
      title: "Sıfır Atık Sertifikasyonu",
      description: "Sıfır atık belgesi için gerekli altyapı ve süreçler",
      timeline: "18 ay",
      cost: "Orta",
      impact: "Çok Yüksek",
      category: "Atık",
    },
    {
      title: "Döngüsel Ekonomi Modeli",
      description: "Ürün tasarımında döngüsel ekonomi prensiplerinin uygulanması",
      timeline: "24 ay",
      cost: "Yüksek",
      impact: "Çok Yüksek",
      category: "Döngüsel",
    },
  ],
}

const recommendations = [
  {
    category: "Enerji Verimliliği",
    priority: "Yüksek",
    description:
      "Enerji tüketiminizi %20-30 azaltmak için LED aydınlatma, verimli motorlar ve ısı geri kazanım sistemleri kurun.",
    benefits: ["Yıllık 50.000 TL tasarruf", "CO2 emisyonunda %25 azalma", "Enerji bağımsızlığı"],
  },
  {
    category: "Su Yönetimi",
    priority: "Orta",
    description:
      "Su tüketiminizi optimize etmek için akıllı sulama, geri dönüşüm ve yağmur suyu toplama sistemleri kurun.",
    benefits: ["Yıllık %15 su tasarrufu", "Atık su arıtma maliyeti azalması", "Çevresel etki azalması"],
  },
  {
    category: "Atık Azaltma",
    priority: "Yüksek",
    description: "Sıfır atık hedefi için kapsamlı geri dönüşüm programı ve döngüsel tasarım prensipleri uygulayın.",
    benefits: ["Atık maliyetlerinde %40 azalma", "Geri dönüşüm geliri", "Marka değeri artışı"],
  },
]

export default function ReportPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const handleDownloadPDF = () => {
    // Simulate PDF download
    alert("PDF raporu indiriliyor...")
  }

  const getCostColor = (cost: string) => {
    switch (cost) {
      case "Düşük":
        return "text-green-600 bg-green-100"
      case "Orta":
        return "text-yellow-600 bg-yellow-100"
      case "Yüksek":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Çok Yüksek":
        return "text-purple-600 bg-purple-100"
      case "Yüksek":
        return "text-blue-600 bg-blue-100"
      case "Orta":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dijital Öneri Raporu</h1>
          <p className="text-muted-foreground">Kişiselleştirilmiş yeşil dönüşüm eylem planınız</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleDownloadPDF}>
            <Download className="h-4 w-4 mr-2" />
            PDF İndir
          </Button>
          <Badge className="bg-green-100 text-green-800">Rapor Hazır</Badge>
        </div>
      </div>

      {/* Report Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="action-plan">Eylem Planı</TabsTrigger>
          <TabsTrigger value="recommendations">Öneriler</TabsTrigger>
          <TabsTrigger value="timeline">Zaman Çizelgesi</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Executive Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Yönetici Özeti</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">57/100</div>
                  <p className="text-sm text-muted-foreground">Genel Puan</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
                  <p className="text-sm text-muted-foreground">Öneri Sayısı</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">24</div>
                  <p className="text-sm text-muted-foreground">Ay Süre</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-medium">Öne Çıkan Bulgular:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Atık yönetimi alanında güçlü performans (80/100)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <span>Yenilenebilir enerji kullanımında gelişim fırsatı (30/100)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                    <span>Önerilen iyileştirmelerle %40 performans artışı bekleniyor</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Key Recommendations */}
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{rec.category}</CardTitle>
                    <Badge variant={rec.priority === "Yüksek" ? "destructive" : "secondary"}>
                      {rec.priority} Öncelik
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{rec.description}</p>
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Beklenen Faydalar:</h5>
                    <ul className="text-xs space-y-1">
                      {rec.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="action-plan" className="space-y-6">
          {/* Short Term Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-600" />
                <span>Kısa Vadeli Eylemler (0-6 ay)</span>
              </CardTitle>
              <CardDescription>Hemen başlayabileceğiniz düşük maliyetli iyileştirmeler</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {actionPlan.shortTerm.map((action, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{action.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                      </div>
                      <Badge variant="outline">{action.category}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{action.timeline}</span>
                      </div>
                      <Badge className={getCostColor(action.cost)}>{action.cost} Maliyet</Badge>
                      <Badge className={getImpactColor(action.impact)}>{action.impact} Etki</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Medium Term Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>Orta Vadeli Eylemler (6-12 ay)</span>
              </CardTitle>
              <CardDescription>Orta ölçekli yatırım gerektiren projeler</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {actionPlan.mediumTerm.map((action, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{action.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                      </div>
                      <Badge variant="outline">{action.category}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{action.timeline}</span>
                      </div>
                      <Badge className={getCostColor(action.cost)}>{action.cost} Maliyet</Badge>
                      <Badge className={getImpactColor(action.impact)}>{action.impact} Etki</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Long Term Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-purple-600" />
                <span>Uzun Vadeli Eylemler (12+ ay)</span>
              </CardTitle>
              <CardDescription>Stratejik yatırımlar ve dönüşüm projeleri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {actionPlan.longTerm.map((action, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{action.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                      </div>
                      <Badge variant="outline">{action.category}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{action.timeline}</span>
                      </div>
                      <Badge className={getCostColor(action.cost)}>{action.cost} Maliyet</Badge>
                      <Badge className={getImpactColor(action.impact)}>{action.impact} Etki</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid gap-6">
            {recommendations.map((rec, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Lightbulb className="h-5 w-5 text-yellow-600" />
                      <span>{rec.category}</span>
                    </CardTitle>
                    <Badge variant={rec.priority === "Yüksek" ? "destructive" : "secondary"}>
                      {rec.priority} Öncelik
                    </Badge>
                  </div>
                  <CardDescription>{rec.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span>Beklenen Faydalar</span>
                      </h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        {rec.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>24 Aylık Uygulama Takvimi</span>
              </CardTitle>
              <CardDescription>Önerilen eylemlerin zaman çizelgesi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Timeline visualization would go here */}
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Detaylı zaman çizelgesi görselleştirmesi burada yer alacak</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
