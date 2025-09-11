"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
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
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingDown, Award, AlertTriangle, CheckCircle, ArrowRight, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useScenario } from "@/hooks/use-scenario"

export default function AssessmentPage() {
  const { scenario, isLoading, resetScenario } = useScenario()

  if (isLoading || !scenario) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Değerlendirme sonuçları yükleniyor...</p>
        </div>
      </div>
    )
  }

  const radarData = scenario.assessmentData.map((item) => ({
    subject: item.category.split(" ")[0],
    score: item.score,
    fullMark: 100,
  }))

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600"
    if (score >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 70) return <Badge className="bg-green-100 text-green-800">Güçlü</Badge>
    if (score >= 50) return <Badge className="bg-yellow-100 text-yellow-800">Orta</Badge>
    return <Badge className="bg-red-100 text-red-800">Zayıf</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Otomatik Değerlendirme Sonuçları</h1>
          <p className="text-muted-foreground">YES-TR ve EKOTON kriterlerine göre puanlama</p>
          <p className="text-sm text-blue-600 mt-1">Profil: {scenario.name}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={resetScenario}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Yeni Senaryo
          </Button>
          <Badge variant="outline" className="px-3 py-1">
            Değerlendirme Tamamlandı
          </Badge>
        </div>
      </div>

      {/* Overall Score */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">{scenario.overallScore}/100</h2>
              <p className="text-lg text-muted-foreground">Genel Puan</p>
              <div className="flex items-center space-x-2 mt-2">
                {scenario.overallScore >= 70 ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : scenario.overallScore >= 50 ? (
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-600" />
                )}
                <span className={`font-medium ${getScoreColor(scenario.overallScore)}`}>
                  {scenario.overallScore >= 70
                    ? "İyi Seviye"
                    : scenario.overallScore >= 50
                      ? "Orta Seviye"
                      : "Gelişim Gerekli"}
                </span>
              </div>
            </div>
            <div className="text-right">
              <Award className="h-16 w-16 text-green-600 mb-2" />
              <p className="text-sm text-muted-foreground">Sertifikasyon Durumu</p>
              <Badge
                className={
                  scenario.overallScore >= 60 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }
              >
                {scenario.overallScore >= 60 ? "Uygun" : "Gelişim Gerekli"}
              </Badge>
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

      {/* Detailed Results */}
      <Card>
        <CardHeader>
          <CardTitle>Detaylı Sonuçlar</CardTitle>
          <CardDescription>Her kategori için ayrıntılı değerlendirme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scenario.assessmentData.map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium">{item.category}</h3>
                    {getScoreBadge(item.score)}
                  </div>
                  <span className={`text-lg font-bold ${getScoreColor(item.score)}`}>
                    {item.score}/{item.maxScore}
                  </span>
                </div>
                <Progress value={item.score} className="h-2 mb-2" />
                <div className="text-sm text-muted-foreground">
                  {item.score >= 70 && "Bu alanda güçlü performans gösteriyorsunuz. Mevcut uygulamalarınızı sürdürün."}
                  {item.score >= 50 &&
                    item.score < 70 &&
                    "Bu alanda orta seviye performans. İyileştirme fırsatları mevcut."}
                  {item.score < 50 && "Bu alan öncelikli gelişim alanınız. Acil eylem planı gerekli."}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scenario Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Değerlendirme Tamamlandı!</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {scenario.description}. Detaylı öneriler ve eylem planınız hazır.
            </p>
            <Link href="/dashboard/report">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Raporu Görüntüle
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
