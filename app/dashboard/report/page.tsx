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
  RefreshCw,
} from "lucide-react"
import { useScenario } from "@/hooks/use-scenario"

export default function ReportPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const { scenario, isLoading, resetScenario } = useScenario()

  if (isLoading || !scenario) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Rapor yükleniyor...</p>
        </div>
      </div>
    )
  }

  const handleDownloadPDF = () => {
    // Simulate PDF download
    alert(`${scenario.name} profili için PDF raporu indiriliyor...`)
  }

  const getCostColor = (cost: string) => {
    switch (cost) {
      case "Düşük":
        return "text-green-600 bg-green-100"
      case "Orta":
        return "text-yellow-600 bg-yellow-100"
      case "Yüksek":
        return "text-red-600 bg-red-100"
      case "Çok Yüksek":
        return "text-purple-600 bg-purple-100"
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
      case "Düşük":
        return "text-gray-600 bg-gray-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const totalActions =
    scenario.actionPlan.shortTerm.length + scenario.actionPlan.mediumTerm.length + scenario.actionPlan.longTerm.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dijital Öneri Raporu</h1>
          <p className="text-muted-foreground">Kişiselleştirilmiş yeşil dönüşüm eylem planınız</p>
          <p className="text-sm text-blue-600 mt-1">Profil: {scenario.name}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={resetScenario}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Yeni Senaryo
          </Button>
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
              <CardDescription>{scenario.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{scenario.overallScore}/100</div>
                  <p className="text-sm text-muted-foreground">Genel Puan</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{totalActions}</div>
                  <p className="text-sm text-muted-foreground">Öneri Sayısı</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {Math.max(...scenario.actionPlan.longTerm.map((action) => Number.parseInt(action.timeline)))}
                  </div>
                  <p className="text-sm text-muted-foreground">Ay Süre</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-medium">Öne Çıkan Bulgular:</h4>
                <ul className="space-y-2 text-sm">
                  {scenario.assessmentData
                    .filter((item) => item.score >= 70)
                    .slice(0, 2)
                    .map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>
                          {item.category} alanında güçlü performans ({item.score}/100)
                        </span>
                      </li>
                    ))}
                  {scenario.assessmentData
                    .filter((item) => item.score < 50)
                    .slice(0, 2)
                    .map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                        <span>
                          {item.category} alanında gelişim fırsatı ({item.score}/100)
                        </span>
                      </li>
                    ))}
                  <li className="flex items-start space-x-2">
                    <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                    <span>Önerilen iyileştirmelerle önemli performans artışı bekleniyor</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Key Recommendations */}
          <div className="grid md:grid-cols-3 gap-6">
            {scenario.recommendations.slice(0, 3).map((rec, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{rec.category}</CardTitle>
                    <Badge
                      variant={
                        rec.priority === "Yüksek" ? "destructive" : rec.priority === "Orta" ? "default" : "secondary"
                      }
                    >
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
                {scenario.actionPlan.shortTerm.map((action, index) => (
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
                {scenario.actionPlan.mediumTerm.map((action, index) => (
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
                {scenario.actionPlan.longTerm.map((action, index) => (
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
            {scenario.recommendations.map((rec, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Lightbulb className="h-5 w-5 text-yellow-600" />
                      <span>{rec.category}</span>
                    </CardTitle>
                    <Badge
                      variant={
                        rec.priority === "Yüksek" ? "destructive" : rec.priority === "Orta" ? "default" : "secondary"
                      }
                    >
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
                <span>Uygulama Takvimi</span>
              </CardTitle>
              <CardDescription>Önerilen eylemlerin zaman çizelgesi ({scenario.name})</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-medium text-green-600">Kısa Vade (0-6 ay)</h3>
                    <div className="space-y-2">
                      {scenario.actionPlan.shortTerm.map((action, index) => (
                        <div key={index} className="text-sm p-2 bg-green-50 rounded border-l-2 border-green-600">
                          <div className="font-medium">{action.title}</div>
                          <div className="text-muted-foreground">{action.timeline}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-blue-600">Orta Vade (6-12 ay)</h3>
                    <div className="space-y-2">
                      {scenario.actionPlan.mediumTerm.map((action, index) => (
                        <div key={index} className="text-sm p-2 bg-blue-50 rounded border-l-2 border-blue-600">
                          <div className="font-medium">{action.title}</div>
                          <div className="text-muted-foreground">{action.timeline}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-purple-600">Uzun Vade (12+ ay)</h3>
                    <div className="space-y-2">
                      {scenario.actionPlan.longTerm.map((action, index) => (
                        <div key={index} className="text-sm p-2 bg-purple-50 rounded border-l-2 border-purple-600">
                          <div className="font-medium">{action.title}</div>
                          <div className="text-muted-foreground">{action.timeline}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
