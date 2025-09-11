import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Factory, Award, TrendingUp } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EKOTON</h1>
                <p className="text-xs text-gray-600">Sürdürülebilir Gelecek</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="outline">Giriş Yap</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Kayıt Ol</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">Sanayi Modülü</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Sanayi için
            <span className="text-green-600 block">Yeşil Dönüşüm</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            İşletmenizi sürdürülebilir geleceğe hazırlayın. EKOTON Sanayi Modülü ile çevre dostu dönüşümünüzü planlayın,
            uygulayın ve takip edin.
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
              Hemen Başlayın
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Neden EKOTON?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Factory className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Sanayi Odaklı</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sanayi işletmelerinin ihtiyaçlarına özel olarak tasarlanmış kapsamlı yeşil dönüşüm çözümleri.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Sertifikasyon</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  YES-TR ve EKOTON kriterlerine uygun değerlendirme ve sertifikasyon süreçleri.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Sürekli İyileştirme</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Performansınızı takip edin, iyileştirme alanlarını belirleyin ve sürdürülebilir büyüme sağlayın.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Süreç Nasıl İşliyor?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Kayıt & Giriş", desc: "Organizasyonunuzu kaydedin" },
              { step: "2", title: "Veri Girişi", desc: "Mevcut durumunuzu analiz edin" },
              { step: "3", title: "Değerlendirme", desc: "Otomatik puanlama alın" },
              { step: "4", title: "Eylem Planı", desc: "Öneriler ve takip" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Yeşil Dönüşümünüze Bugün Başlayın</h2>
          <p className="text-xl mb-8 opacity-90">Sürdürülebilir gelecek için ilk adımı atın</p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Ücretsiz Başlayın
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-6 w-6" />
            <span className="text-xl font-bold">EKOTON</span>
          </div>
          <p className="text-gray-400">© 2024 EKOTON. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  )
}
