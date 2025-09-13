"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Download, FileText, User, Building, Mail, Phone, MapPin, Calendar } from "lucide-react"
import { useScenario } from "@/hooks/use-scenario"
import { getUserLevel, getUserLevelName } from "@/lib/html-pdf-generator"

export default function ProfilePage() {
  const { scenario } = useScenario()
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const userLevel = getUserLevel(scenario.overallScore)
  const userLevelName = getUserLevelName(userLevel)

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)

    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scenarioData: scenario,
          useTemplate: true,
        }),
      })

      if (!response.ok) {
        throw new Error("PDF generation failed")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = `EKOTON-${userLevelName.replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("PDF oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "ileriseviye":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "ortaseviye":
        return "bg-green-100 text-green-800 border-green-200"
      case "karmaprofil":
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-orange-100 text-orange-800 border-orange-200"
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profil</h1>
          <p className="text-muted-foreground">Hesap bilgilerinizi ve sürdürülebilirlik seviyenizi görüntüleyin</p>
        </div>
        <Badge className={`${getLevelColor(userLevel)} font-medium`}>{userLevelName}</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Kişisel Bilgiler
            </CardTitle>
            <CardDescription>Hesap ve iletişim bilgileriniz</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Profil" />
                <AvatarFallback className="bg-teal-100 text-teal-700 text-lg font-semibold">AK</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">Ahmet Kaya</h3>
                <p className="text-sm text-muted-foreground">Sürdürülebilirlik Uzmanı</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">ahmet.kaya@example.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">+90 532 123 45 67</span>
              </div>
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">EKOTON Sürdürülebilirlik A.Ş.</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">İstanbul, Türkiye</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Üyelik: Ocak 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sustainability Level */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Sürdürülebilirlik Seviyesi
            </CardTitle>
            <CardDescription>Mevcut performans durumunuz ve rapor indirme</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-teal-600">{scenario.overallScore}/100</div>
              <p className="text-sm text-muted-foreground">Genel Sürdürülebilirlik Puanı</p>
              <Badge className={`${getLevelColor(userLevel)} font-medium`}>{userLevelName}</Badge>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium">Seviye Açıklaması</h4>
              <p className="text-sm text-muted-foreground">{scenario.description}</p>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium">Detaylı Rapor</h4>
              <p className="text-sm text-muted-foreground">
                Seviyenize özel kapsamlı sürdürülebilirlik raporunu indirin
              </p>
              <Button onClick={handleDownloadPDF} disabled={isGeneratingPDF} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                {isGeneratingPDF ? "PDF Oluşturuluyor..." : "PDF Raporu İndir"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Hesap Ayarları</CardTitle>
          <CardDescription>Hesap tercihlerinizi ve güvenlik ayarlarınızı yönetin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Button variant="outline">Profil Bilgilerini Düzenle</Button>
            <Button variant="outline">Şifre Değiştir</Button>
            <Button variant="outline">Bildirim Ayarları</Button>
            <Button variant="outline">Gizlilik Ayarları</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
