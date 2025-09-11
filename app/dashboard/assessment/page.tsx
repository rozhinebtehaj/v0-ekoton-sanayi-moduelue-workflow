"use client"

import { useState } from "react"
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
import { TrendingDown, Award, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

const assessmentData = [
  { category: "Kurumsal Farkındalık", score: 75, maxScore: 100, status: "good" },
  { category: "Enerji Yönetimi", score: 60, maxScore: 100, status: "medium" },
  { category: "Su Yönetimi", score: 45, maxScore: 100, status: "low" },
  { category: "Atık Yönetimi", score: 80, maxScore: 100, status: "good" },
  { category: "Yenilenebilir Enerji", score: 30, maxScore: 100, status: "low" },
  { category: "Yeşil Tedarik", score: 55, maxScore: 100, status: "medium" },
  { category: "Döngüsel Ekonomi", score: 40, maxScore: 100, status: "low" },
  { category: "Afet Yönetimi", score: 70, maxScore: 100, status: "good" },
]

const radarData = assessmentData.map((item) => ({
  subject: item.category.split(" ")[0],
  score: item.score,
  fullMark: 100,
}))

const pieData = [
  { name: "Güçlü Alanlar", value: 3, color: "#22c55e" },
  { name: "Gelişim Alanları", value: 2, color: "#f59e0b" },
  { name: "Kritik Alanlar", value: 3, color: "#ef4444" },
]

const overallScore = Math.round(assessmentData.reduce((sum, item) => sum + item.score, 0) / assessmentData.length)

export default function AssessmentPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

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
        </div>
        <Badge variant="outline" className="px-3 py-1">
          Değerlendirme Tamamlandı
        </Badge>
      </div>

      {/* Overall Score */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">{overallScore}/100</h2>
              <p className="text-lg text-muted-foreground">Genel Puan</p>
              <div className="flex items-center space-x-2 mt-2">
                {overallScore >= 70 ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : overallScore >= 50 ? (
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-600" />
                )}
                <span className={`font-medium ${getScoreColor(overallScore)}`}>
                  {overallScore >= 70 ? "İyi Seviye" : overallScore >= 50 ? "Orta Seviye" : "Gelişim Gerekli"}
                </span>
              </div>
            </div>
            <div className="text-right">
              <Award className="h-16 w-16 text-green-600 mb-2" />
              <p className="text-sm text-muted-foreground">Sertifikasyon Durumu</p>
              <Badge className="bg-green-100 text-green-800">Uygun</Badge>
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
                <BarChart data={assessmentData}>
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
            {assessmentData.map((item, index) => (
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

      {/* Recommendations Summary */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Değerlendirme Tamamlandı!</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Detaylı öneriler ve eylem planınız hazır. Yeşil dönüşüm yolculuğunuzun bir sonraki adımına geçin.
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
