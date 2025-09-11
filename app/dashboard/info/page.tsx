import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, ArrowRight, Leaf, Award, Target, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function InfoPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-lg">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Sanayi için Yeşil Dönüşüm</h1>
            <p className="text-muted-foreground">Sürdürülebilir gelecek için dönüşüm yolculuğunuz</p>
          </div>
        </div>
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aktif Süreç</Badge>
      </div>

      {/* Process Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <span>Yeşil Dönüşüm Eylem Planı</span>
            </CardTitle>
            <CardDescription>
              Sürdürülebilir kalkınma hedefleri doğrultusunda işletmenizi geleceğe hazırlayın
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Çevresel Etki Azaltma</p>
                  <p className="text-sm text-muted-foreground">
                    Karbon ayak izinizi azaltın ve çevre dostu üretim süreçleri geliştirin
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Enerji Verimliliği</p>
                  <p className="text-sm text-muted-foreground">
                    Yenilenebilir enerji kaynaklarına geçiş ve enerji tasarrufu
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Döngüsel Ekonomi</p>
                  <p className="text-sm text-muted-foreground">
                    Atık yönetimi ve geri dönüşüm süreçlerini optimize edin
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-blue-600" />
              <span>Sertifikasyon Süreci</span>
            </CardTitle>
            <CardDescription>YES-TR ve EKOTON kriterlerine göre değerlendirme</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Kurumsal Farkındalık</span>
                <Badge variant="outline">Değerlendirme Bekliyor</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Enerji & Su Yönetimi</span>
                <Badge variant="outline">Değerlendirme Bekliyor</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Atık & Geri Dönüşüm</span>
                <Badge variant="outline">Değerlendirme Bekliyor</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tedarik Zinciri</span>
                <Badge variant="outline">Değerlendirme Bekliyor</Badge>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-medium">
              <span>Genel Durum</span>
              <Badge>Başlangıç</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>Yeşil Dönüşümün Faydaları</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-medium">Maliyet Tasarrufu</h3>
              <p className="text-sm text-muted-foreground">
                Enerji verimliliği ve atık azaltma ile operasyonel maliyetleri düşürün
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="font-medium">Rekabet Avantajı</h3>
              <p className="text-sm text-muted-foreground">Sürdürülebilir üretim ile pazar konumunuzu güçlendirin</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-medium">Uyumluluk</h3>
              <p className="text-sm text-muted-foreground">Çevresel düzenlemelere uyum ve risk yönetimi</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Yeşil Dönüşüm Yolculuğunuza Başlayın</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Mevcut durumunuzu analiz ederek, size özel eylem planınızı oluşturun. Adım adım rehberlik ile
              sürdürülebilir geleceğe doğru ilerleyin.
            </p>
            <Link href="/dashboard/data-entry">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Veri Girişine Başla
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
