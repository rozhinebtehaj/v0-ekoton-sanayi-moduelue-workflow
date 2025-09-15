"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Download,
  FileText,
  Target,
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  DollarSign,
  Shield,
  Users,
  ArrowRight,
} from "lucide-react"
import { useScenario } from "@/hooks/use-scenario"
import { getScenarioReport } from "@/lib/scenario-reports"
import { toast } from "sonner"

export default function ReportPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const { scenario, isLoading, resetScenario } = useScenario()
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

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

  const report = getScenarioReport(scenario.id)
  if (!report) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-muted-foreground">Rapor verileri bulunamadı.</p>
        </div>
      </div>
    )
  }

  const handleDownloadPDF = async () => {
    if (!scenario) return

    setIsGeneratingPDF(true)
    try {
      const pdfMap: Record<number, string> = {
        0: "/baslangic.pdf",
        1: "/ortaseviye.pdf",
        2: "/ileriseviye.pdf",
        3: "/karmaprofil.pdf",
      }
      const href = pdfMap[scenario.id] ?? "/baslangic.pdf"

      // Fetch the file and trigger a Blob download to avoid path/base issues
      const response = await fetch(href, { cache: "no-store" })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const contentType = response.headers.get("content-type") || ""
      if (!contentType.toLowerCase().includes("application/pdf")) {
        // Fallback: open directly so browser handles it
        window.open(href, "_blank")
        toast.message("PDF tarayıcıda açılıyor.")
        return
      }
      const rawBlob = await response.blob()
      const pdfBlob = new Blob([rawBlob], { type: "application/pdf" })
      const url = URL.createObjectURL(pdfBlob)

      const link = document.createElement("a")
      link.href = url
      link.download = (href.split("/").pop() || "rapor.pdf").toString()
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      // Delay revocation to ensure the download stream is established
      setTimeout(() => URL.revokeObjectURL(url), 2000)
      toast.success("PDF indirilmeye başlandı.")
    } catch (error) {
      console.error("PDF download error:", error)
      toast.error("PDF indirilirken bir hata oluştu.")
    } finally {
      setIsGeneratingPDF(false)
    }
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

  const radarData = scenario.assessmentData.map((item) => ({
    subject: item.category.split(" ")[0],
    score: item.score,
    fullMark: 100,
  }))

  const totalActions =
    scenario.actionPlan.shortTerm.length + scenario.actionPlan.mediumTerm.length + scenario.actionPlan.longTerm.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kapsamlı Sürdürülebilirlik Raporu</h1>
          <p className="text-muted-foreground">Detaylı analiz ve gelişim planı</p>
          <p className="text-sm text-blue-600 mt-1">Profil: {scenario.name}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={resetScenario}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Yeni Senaryo
          </Button>
          <Button onClick={handleDownloadPDF} disabled={isGeneratingPDF} className="bg-green-600 hover:bg-green-700">
            {isGeneratingPDF ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            {isGeneratingPDF ? "Oluşturuluyor..." : "Kapsamlı PDF İndir"}
          </Button>
          <Badge className="bg-green-100 text-green-800">Rapor Hazır</Badge>
        </div>
      </div>

      {/* Report Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="analysis">Durum Analizi</TabsTrigger>
          <TabsTrigger value="development">Gelişim Planı</TabsTrigger>
          <TabsTrigger value="investment">Yatırım Analizi</TabsTrigger>
          <TabsTrigger value="risks">Risk Yönetimi</TabsTrigger>
          <TabsTrigger value="roadmap">Yol Haritası</TabsTrigger>
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
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                <p className="text-sm leading-relaxed">{report.executiveSummary}</p>
              </div>

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
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Kategori Bazında Performans</CardTitle>
                <CardDescription>Her kategorideki puanınız</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  id="assessment-bar-chart"
                  config={{
                    score: {
                      label: "Puan",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scenario.assessmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} fontSize={12} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="score" fill="var(--color-score)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Radar Analizi</CardTitle>
                <CardDescription>Güçlü ve zayıf yönleriniz</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  id="assessment-radar-chart"
                  config={{
                    score: {
                      label: "Puan",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Puan"
                        dataKey="score"
                        stroke="var(--color-score)"
                        fill="var(--color-score)"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

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

        <TabsContent value="analysis" className="space-y-6">
          {/* Current Status Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart className="h-5 w-5" />
                <span>Mevcut Durum Analizi</span>
              </CardTitle>
              <CardDescription>Organizasyonunuzun sürdürülebilirlik durumu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Genel Değerlendirme</h4>
                <p className="text-sm leading-relaxed">{report.currentStatusNarrative}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-green-800">Güçlü Yönler</h4>
                  <p className="text-sm leading-relaxed text-green-700">{report.strengthsAnalysis}</p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-orange-800">Gelişim Alanları</h4>
                  <p className="text-sm leading-relaxed text-orange-700">{report.challengesAnalysis}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Detaylı Performans Analizi</CardTitle>
              <CardDescription>Her kategori için ayrıntılı değerlendirme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scenario.assessmentData.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium">{item.category}</h3>
                        <Badge
                          variant={
                            item.status === "good" ? "default" : item.status === "medium" ? "secondary" : "destructive"
                          }
                        >
                          {item.status === "good" ? "Güçlü" : item.status === "medium" ? "Orta" : "Zayıf"}
                        </Badge>
                      </div>
                      <span className="text-lg font-bold text-green-600">
                        {item.score}/{item.maxScore}
                      </span>
                    </div>
                    <Progress value={item.score} className="h-2 mb-2" />
                    <div className="text-sm text-muted-foreground">
                      {item.score >= 70 &&
                        "Bu alanda güçlü performans gösteriyorsunuz. Mevcut uygulamalarınızı sürdürün ve optimize edin."}
                      {item.score >= 50 &&
                        item.score < 70 &&
                        "Bu alanda orta seviye performans. Sistematik iyileştirmeler ile hızla gelişim sağlayabilirsiniz."}
                      {item.score < 50 && "Bu alan öncelikli gelişim alanınız. Acil eylem planı ve yatırım gereklidir."}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="development" className="space-y-6">
          {/* Development Plan Phases */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Üç Aşamalı Gelişim Planı</span>
              </CardTitle>
              <CardDescription>Sistematik ve aşamalı gelişim yaklaşımı</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Phase 1 */}
              <div className="border-l-4 border-green-500 pl-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{report.developmentPlan.phase1.title}</h3>
                    <p className="text-sm text-muted-foreground">{report.developmentPlan.phase1.duration}</p>
                  </div>
                </div>
                <p className="text-sm mb-4">{report.developmentPlan.phase1.description}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Hedefler:</h4>
                    <ul className="text-sm space-y-1">
                      {report.developmentPlan.phase1.objectives.map((obj, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Başarı Metrikleri:</h4>
                    <ul className="text-sm space-y-1">
                      {report.developmentPlan.phase1.successMetrics.map((metric, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium mb-2">Temel Eylemler:</h4>
                  <div className="space-y-3">
                    {report.developmentPlan.phase1.keyActions.map((action, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                        <h5 className="font-medium">{action.action}</h5>
                        <p className="text-sm text-muted-foreground mt-1">{action.rationale}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{action.timeline}</span>
                          </span>
                          <span className="text-green-600">{action.expectedOutcome}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="border-l-4 border-blue-500 pl-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{report.developmentPlan.phase2.title}</h3>
                    <p className="text-sm text-muted-foreground">{report.developmentPlan.phase2.duration}</p>
                  </div>
                </div>
                <p className="text-sm mb-4">{report.developmentPlan.phase2.description}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Hedefler:</h4>
                    <ul className="text-sm space-y-1">
                      {report.developmentPlan.phase2.objectives.map((obj, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Başarı Metrikleri:</h4>
                    <ul className="text-sm space-y-1">
                      {report.developmentPlan.phase2.successMetrics.map((metric, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium mb-2">Temel Eylemler:</h4>
                  <div className="space-y-3">
                    {report.developmentPlan.phase2.keyActions.map((action, idx) => (
                      <div key={idx} className="bg-blue-50 p-3 rounded-lg">
                        <h5 className="font-medium">{action.action}</h5>
                        <p className="text-sm text-muted-foreground mt-1">{action.rationale}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{action.timeline}</span>
                          </span>
                          <span className="text-blue-600">{action.expectedOutcome}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="border-l-4 border-purple-500 pl-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{report.developmentPlan.phase3.title}</h3>
                    <p className="text-sm text-muted-foreground">{report.developmentPlan.phase3.duration}</p>
                  </div>
                </div>
                <p className="text-sm mb-4">{report.developmentPlan.phase3.description}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Hedefler:</h4>
                    <ul className="text-sm space-y-1">
                      {report.developmentPlan.phase3.objectives.map((obj, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Başarı Metrikleri:</h4>
                    <ul className="text-sm space-y-1">
                      {report.developmentPlan.phase3.successMetrics.map((metric, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <TrendingUp className="h-4 w-4 text-purple-600 mt-0.5" />
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium mb-2">Temel Eylemler:</h4>
                  <div className="space-y-3">
                    {report.developmentPlan.phase3.keyActions.map((action, idx) => (
                      <div key={idx} className="bg-purple-50 p-3 rounded-lg">
                        <h5 className="font-medium">{action.action}</h5>
                        <p className="text-sm text-muted-foreground mt-1">{action.rationale}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{action.timeline}</span>
                          </span>
                          <span className="text-purple-600">{action.expectedOutcome}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investment" className="space-y-6">
          {/* Investment Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Yatırım Analizi</span>
              </CardTitle>
              <CardDescription>Finansal projeksiyonlar ve yatırım dağılımı</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{report.investmentAnalysis.totalInvestment}</div>
                  <p className="text-sm text-muted-foreground">Toplam Yatırım</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{report.investmentAnalysis.roi}</div>
                  <p className="text-sm text-muted-foreground">Yatırım Getirisi</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">{report.investmentAnalysis.paybackPeriod}</div>
                  <p className="text-sm text-muted-foreground">Geri Dönüş Süresi</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">{report.investmentAnalysis.expectedSavings}</div>
                  <p className="text-sm text-muted-foreground">Yıllık Tasarruf</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Yatırım Dağılımı</h4>
                <div className="space-y-3">
                  {report.investmentAnalysis.breakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="font-medium">{item.category}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-semibold">{item.amount}</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                        </div>
                        <span className="text-sm text-muted-foreground w-12">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          {/* Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Risk Değerlendirmesi</span>
              </CardTitle>
              <CardDescription>Potansiyel riskler ve azaltma stratejileri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {report.riskAssessment.map((risk, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium">{risk.risk}</h4>
                      <div className="flex space-x-2">
                        <Badge
                          variant={
                            risk.impact === "Yüksek" ? "destructive" : risk.impact === "Orta" ? "default" : "secondary"
                          }
                        >
                          Etki: {risk.impact}
                        </Badge>
                        <Badge
                          variant={
                            risk.probability === "Yüksek"
                              ? "destructive"
                              : risk.probability === "Orta"
                                ? "default"
                                : "secondary"
                          }
                        >
                          Olasılık: {risk.probability}
                        </Badge>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h5 className="font-medium text-sm mb-1">Azaltma Stratejisi:</h5>
                      <p className="text-sm text-blue-800">{risk.mitigation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-6">
          {/* Implementation Roadmap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Uygulama Yol Haritası</span>
              </CardTitle>
              <CardDescription>Paydaş katılımı ve sonraki adımlar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stakeholder Engagement */}
              <div>
                <h4 className="font-medium mb-4 flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Paydaş Katılımı</span>
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {report.stakeholderEngagement.map((stakeholder, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{stakeholder.stakeholder}</h5>
                        <Badge variant="outline">{stakeholder.role}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{stakeholder.engagement}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div>
                <h4 className="font-medium mb-4 flex items-center space-x-2">
                  <ArrowRight className="h-4 w-4" />
                  <span>Sonraki Adımlar</span>
                </h4>
                <div className="space-y-3">
                  {report.nextSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline Visualization */}
              <div>
                <h4 className="font-medium mb-4">Zaman Çizelgesi</h4>
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

              {/* Progress Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Performans Trendi</CardTitle>
                  <CardDescription>Beklenen gelişim projeksiyonu</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    id="progress-line-chart"
                    config={{
                      overall: {
                        label: "Genel",
                        color: "hsl(var(--chart-1))",
                      },
                      energy: {
                        label: "Enerji",
                        color: "hsl(var(--chart-2))",
                      },
                      water: {
                        label: "Su",
                        color: "hsl(var(--chart-3))",
                      },
                      waste: {
                        label: "Atık",
                        color: "hsl(var(--chart-4))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={scenario.progressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="overall" stroke="var(--color-overall)" strokeWidth={3} />
                        <Line type="monotone" dataKey="energy" stroke="var(--color-energy)" />
                        <Line type="monotone" dataKey="water" stroke="var(--color-water)" />
                        <Line type="monotone" dataKey="waste" stroke="var(--color-waste)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
