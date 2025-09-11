"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Settings, Download, RefreshCw, Eye, BarChart3, Target, TrendingUp, Award } from "lucide-react"
import { useScenario } from "@/hooks/use-scenario"
import { generatePDFReport } from "@/lib/pdf-generator"
import { toast } from "sonner"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const { scenario, isLoading, changeScenario, resetScenario, allScenarios } = useScenario()

  const [profileData, setProfileData] = useState({
    organizationName: "Sanayi A.Ş.",
    contactPerson: "Ahmet Yılmaz",
    email: "admin@sanayias.com",
    phone: "+90 212 555 0123",
    address: "İstanbul, Türkiye",
    sector: "Otomotiv",
    employeeCount: "251-1000",
    foundedYear: "1995",
  })

  const handleGeneratePDF = async () => {
    if (!scenario) return

    setIsGeneratingPDF(true)
    try {
      await generatePDFReport(scenario)
      toast.success("PDF raporu başarıyla oluşturuldu ve indirildi!")
    } catch (error) {
      console.error("PDF generation error:", error)
      toast.error("PDF oluşturulurken bir hata oluştu.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handleScenarioChange = (scenarioId: string) => {
    const newIndex = Number.parseInt(scenarioId, 10)
    changeScenario(newIndex)
    toast.success(`Senaryo "${allScenarios[newIndex].name}" olarak değiştirildi.`)
  }

  if (isLoading || !scenario) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Profil bilgileri yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Profil & Hesap Ayarları</h1>
          <p className="text-muted-foreground">Organizasyon bilgilerinizi ve senaryo detaylarınızı yönetin</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleGeneratePDF} disabled={isGeneratingPDF}>
            {isGeneratingPDF ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-2"></div>
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            {isGeneratingPDF ? "Oluşturuluyor..." : "PDF Rapor İndir"}
          </Button>
          <Badge className="bg-green-100 text-green-800">Aktif Profil</Badge>
        </div>
      </div>

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profil Bilgileri</TabsTrigger>
          <TabsTrigger value="scenario">Senaryo Detayları</TabsTrigger>
          <TabsTrigger value="performance">Performans Özeti</TabsTrigger>
          <TabsTrigger value="settings">Ayarlar</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Organization Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Organizasyon Bilgileri</span>
              </CardTitle>
              <CardDescription>Temel organizasyon bilgilerinizi görüntüleyin ve düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder-logo.png" />
                  <AvatarFallback className="text-lg">SA</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{profileData.organizationName}</h3>
                  <p className="text-muted-foreground">{profileData.sector} Sektörü</p>
                  <Badge variant="outline">{profileData.employeeCount} Çalışan</Badge>
                </div>
              </div>

              <Separator />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="organizationName">Organizasyon Adı</Label>
                    <Input
                      id="organizationName"
                      value={profileData.organizationName}
                      onChange={(e) => setProfileData({ ...profileData, organizationName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">İletişim Kişisi</Label>
                    <Input
                      id="contactPerson"
                      value={profileData.contactPerson}
                      onChange={(e) => setProfileData({ ...profileData, contactPerson: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Adres</Label>
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sector">Sektör</Label>
                    <Select
                      value={profileData.sector}
                      onValueChange={(value) => setProfileData({ ...profileData, sector: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="automotive">Otomotiv</SelectItem>
                        <SelectItem value="textile">Tekstil</SelectItem>
                        <SelectItem value="food">Gıda</SelectItem>
                        <SelectItem value="chemical">Kimya</SelectItem>
                        <SelectItem value="metal">Metal</SelectItem>
                        <SelectItem value="electronics">Elektronik</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employeeCount">Çalışan Sayısı</Label>
                    <Select
                      value={profileData.employeeCount}
                      onValueChange={(value) => setProfileData({ ...profileData, employeeCount: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10</SelectItem>
                        <SelectItem value="11-50">11-50</SelectItem>
                        <SelectItem value="51-250">51-250</SelectItem>
                        <SelectItem value="251-1000">251-1000</SelectItem>
                        <SelectItem value="1000+">1000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="foundedYear">Kuruluş Yılı</Label>
                    <Input
                      id="foundedYear"
                      value={profileData.foundedYear}
                      onChange={(e) => setProfileData({ ...profileData, foundedYear: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-green-600 hover:bg-green-700">Bilgileri Kaydet</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenario" className="space-y-6">
          {/* Current Scenario */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Mevcut Senaryo</span>
              </CardTitle>
              <CardDescription>Size atanan senaryo profili ve detayları</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{scenario.name}</h3>
                    <p className="text-muted-foreground mt-1">{scenario.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">{scenario.overallScore}</div>
                    <p className="text-sm text-muted-foreground">Genel Puan</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-lg font-semibold">{scenario.assessmentData.length}</div>
                    <p className="text-xs text-muted-foreground">Değerlendirme Kategorisi</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-lg font-semibold">
                      {scenario.actionPlan.shortTerm.length +
                        scenario.actionPlan.mediumTerm.length +
                        scenario.actionPlan.longTerm.length}
                    </div>
                    <p className="text-xs text-muted-foreground">Eylem Önerisi</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-lg font-semibold">{scenario.kpis.length}</div>
                    <p className="text-xs text-muted-foreground">KPI Göstergesi</p>
                  </div>
                </div>
              </div>

              {/* Assessment Breakdown */}
              <div>
                <h4 className="font-medium mb-4">Kategori Bazında Değerlendirme</h4>
                <div className="space-y-3">
                  {scenario.assessmentData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            item.status === "good"
                              ? "bg-green-500"
                              : item.status === "medium"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                        <span className="font-medium">{item.category}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold">{item.score}</span>
                        <span className="text-muted-foreground">/ {item.maxScore}</span>
                        <Badge
                          variant={
                            item.status === "good" ? "default" : item.status === "medium" ? "secondary" : "destructive"
                          }
                        >
                          {item.status === "good" ? "Güçlü" : item.status === "medium" ? "Orta" : "Zayıf"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* KPIs */}
              <div>
                <h4 className="font-medium mb-4">Performans Göstergeleri</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {scenario.kpis.map((kpi, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{kpi.title}</span>
                        <Badge variant="outline">{kpi.change}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold">{kpi.current}</span>
                        <span className="text-muted-foreground">
                          / {kpi.target}
                          {kpi.unit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scenario Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Senaryo Yönetimi</span>
              </CardTitle>
              <CardDescription>Farklı senaryoları test edin veya yeni bir senaryo atayın</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="scenario-select">Senaryo Seçin</Label>
                <Select value={scenario.id.toString()} onValueChange={handleScenarioChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {allScenarios.map((s) => (
                      <SelectItem key={s.id} value={s.id.toString()}>
                        {s.name} - {s.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-3">
                <Button variant="outline" onClick={resetScenario}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Rastgele Yeni Senaryo
                </Button>
                <Button
                  onClick={handleGeneratePDF}
                  disabled={isGeneratingPDF}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isGeneratingPDF ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  Bu Senaryo için PDF İndir
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Performans Özeti</span>
              </CardTitle>
              <CardDescription>Mevcut senaryonuza göre performans durumunuz</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">{scenario.overallScore}/100</div>
                  <p className="text-sm text-muted-foreground">Genel Puan</p>
                  <Badge className="mt-2 bg-green-100 text-green-800">
                    {scenario.overallScore >= 70 ? "İyi" : scenario.overallScore >= 50 ? "Orta" : "Gelişim Gerekli"}
                  </Badge>
                </div>

                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {scenario.assessmentData.filter((item) => item.status === "good").length}
                  </div>
                  <p className="text-sm text-muted-foreground">Güçlü Alan</p>
                  <Badge className="mt-2 bg-blue-100 text-blue-800">Başarılı</Badge>
                </div>

                <div className="text-center p-6 bg-yellow-50 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    {scenario.assessmentData.filter((item) => item.status === "low").length}
                  </div>
                  <p className="text-sm text-muted-foreground">Gelişim Alanı</p>
                  <Badge className="mt-2 bg-yellow-100 text-yellow-800">Fırsat</Badge>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-4">Öncelikli Öneriler</h4>
                <div className="space-y-3">
                  {scenario.recommendations.slice(0, 3).map((rec, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{rec.category}</h5>
                        <Badge variant={rec.priority === "Yüksek" ? "destructive" : "secondary"}>
                          {rec.priority} Öncelik
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Hesap Ayarları</span>
              </CardTitle>
              <CardDescription>Hesap güvenliği ve tercihlerinizi yönetin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Mevcut Şifre</Label>
                  <Input id="current-password" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">Yeni Şifre</Label>
                  <Input id="new-password" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Yeni Şifre Tekrar</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Bildirim Tercihleri</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">E-posta Bildirimleri</p>
                      <p className="text-sm text-muted-foreground">Önemli güncellemeler için e-posta alın</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Performans Raporları</p>
                      <p className="text-sm text-muted-foreground">Aylık performans raporları</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Hedef Uyarıları</p>
                      <p className="text-sm text-muted-foreground">Hedeflere yaklaştığınızda bildirim</p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline">İptal</Button>
                <Button className="bg-green-600 hover:bg-green-700">Ayarları Kaydet</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
