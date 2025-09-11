"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  ChevronLeft,
  ChevronRight,
  Info,
  Building2,
  Zap,
  Droplets,
  Trash2,
  Leaf,
  ShoppingCart,
  Recycle,
  Shield,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const steps = [
  { id: 1, title: "Kurumsal Farkındalık", icon: Building2, description: "ESG, ISO ve yönetim sistemleri" },
  { id: 2, title: "Enerji Yönetimi", icon: Zap, description: "Enerji tüketimi ve verimliliği" },
  { id: 3, title: "Su Yönetimi", icon: Droplets, description: "Su kullanımı ve tasarrufu" },
  { id: 4, title: "Atık Yönetimi", icon: Trash2, description: "Atık üretimi ve geri dönüşüm" },
  { id: 5, title: "Yenilenebilir Enerji", icon: Leaf, description: "Temiz enerji kullanımı" },
  { id: 6, title: "Yeşil Tedarik", icon: ShoppingCart, description: "Sürdürülebilir tedarik zinciri" },
  { id: 7, title: "Döngüsel Ekonomi", icon: Recycle, description: "Sıfır atık uygulamaları" },
  { id: 8, title: "Afet Yönetimi", icon: Shield, description: "Dayanıklılık ve risk yönetimi" },
]

export default function DataEntryPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Record<string, any>>({})

  const progress = (currentStep / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      // Navigate to assessment
      window.location.href = "/dashboard/assessment"
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepData = steps[currentStep - 1]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mevcut Durum Analizi</h1>
          <p className="text-muted-foreground">
            Adım {currentStep} / {steps.length}: {currentStepData.title}
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          Veri Girişi
        </Badge>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>İlerleme</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Step Navigation */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(step.id)}
            className={`p-3 rounded-lg border text-center transition-colors ${
              step.id === currentStep
                ? "bg-green-100 border-green-300 text-green-700"
                : step.id < currentStep
                  ? "bg-gray-100 border-gray-300 text-gray-600"
                  : "bg-white border-gray-200 text-gray-400"
            }`}
          >
            <step.icon className="h-5 w-5 mx-auto mb-1" />
            <div className="text-xs font-medium">{step.id}</div>
          </button>
        ))}
      </div>

      {/* Current Step Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                <currentStepData.icon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle>{currentStepData.title}</CardTitle>
                <CardDescription>{currentStepData.description}</CardDescription>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Info className="h-4 w-4 mr-2" />
                  Bilgi
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{currentStepData.title} Hakkında</DialogTitle>
                  <DialogDescription>
                    Bu bölümde {currentStepData.description.toLowerCase()} ile ilgili mevcut durumunuzu
                    değerlendiriyoruz.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Örnekler:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Mevcut sertifikalarınız ve yönetim sistemleriniz</li>
                      <li>• Enerji tüketim verileri ve ölçüm sistemleri</li>
                      <li>• Çevresel etki değerlendirme çalışmaları</li>
                      <li>• Sürdürülebilirlik raporları ve hedefler</li>
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="form" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="form">Veri Girişi</TabsTrigger>
              <TabsTrigger value="info">Açıklamalar</TabsTrigger>
            </TabsList>

            <TabsContent value="form" className="space-y-6 mt-6">
              {currentStep === 1 && <CorporateAwarenessForm />}
              {currentStep === 2 && <EnergyManagementForm />}
              {currentStep === 3 && <WaterManagementForm />}
              {currentStep === 4 && <WasteManagementForm />}
              {currentStep === 5 && <RenewableEnergyForm />}
              {currentStep === 6 && <GreenProcurementForm />}
              {currentStep === 7 && <CircularEconomyForm />}
              {currentStep === 8 && <DisasterManagementForm />}
            </TabsContent>

            <TabsContent value="info" className="mt-6">
              <div className="space-y-4">
                <h4 className="font-medium">Bu bölümde neler değerlendiriliyor?</h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    {currentStepData.title} kapsamında işletmenizin mevcut durumu, uygulamaları ve gelecek planları
                    değerlendirilmektedir. Lütfen mümkün olduğunca detaylı ve doğru bilgi giriniz.
                  </p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-medium text-sm">Değerlendirme Kriterleri:</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Mevcut uygulamalar ve sistemler</li>
                    <li>• Ölçüm ve izleme kapasitesi</li>
                    <li>• Hedefler ve eylem planları</li>
                    <li>• Sertifikasyon ve uyumluluk durumu</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Önceki
        </Button>
        <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
          {currentStep === steps.length ? "Değerlendirmeye Geç" : "Sonraki"}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

function CorporateAwarenessForm() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label>ESG (Çevresel, Sosyal, Yönetişim) Politikanız var mı?</Label>
            <RadioGroup className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="esg-yes" />
                <Label htmlFor="esg-yes">Evet, yazılı politikamız var</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partial" id="esg-partial" />
                <Label htmlFor="esg-partial">Kısmen, bazı alanları kapsıyor</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="esg-no" />
                <Label htmlFor="esg-no">Hayır, henüz yok</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="iso-certs">Sahip olduğunuz ISO sertifikaları</Label>
            <div className="mt-2 space-y-2">
              {["ISO 14001", "ISO 50001", "ISO 45001", "ISO 9001"].map((cert) => (
                <div key={cert} className="flex items-center space-x-2">
                  <Checkbox id={cert} />
                  <Label htmlFor={cert}>{cert}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="sustainability-report">Sürdürülebilirlik raporu yayınlıyor musunuz?</Label>
            <Select>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Seçiniz" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annual">Yıllık yayınlıyoruz</SelectItem>
                <SelectItem value="biannual">İki yılda bir</SelectItem>
                <SelectItem value="irregular">Düzenli değil</SelectItem>
                <SelectItem value="no">Hayır</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="management-commitment">Üst yönetim çevre konularına ne kadar odaklanmış?</Label>
            <Select>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Seçiniz" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">Yüksek - Stratejik öncelik</SelectItem>
                <SelectItem value="medium">Orta - Önemli konular arasında</SelectItem>
                <SelectItem value="low">Düşük - Sınırlı ilgi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="current-practices">Mevcut çevresel uygulamalarınızı açıklayın</Label>
        <Textarea
          id="current-practices"
          placeholder="Örn: Atık ayrıştırma, enerji tasarrufu uygulamaları, çevre eğitimleri..."
          className="mt-2"
          rows={4}
        />
      </div>
    </div>
  )
}

function EnergyManagementForm() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="annual-energy">Yıllık enerji tüketiminiz (kWh)</Label>
            <Input id="annual-energy" type="number" placeholder="0" className="mt-2" />
          </div>

          <div>
            <Label htmlFor="energy-monitoring">Enerji izleme sisteminiz var mı?</Label>
            <RadioGroup className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="automated" id="energy-automated" />
                <Label htmlFor="energy-automated">Otomatik izleme sistemi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="energy-manual" />
                <Label htmlFor="energy-manual">Manuel takip</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="energy-none" />
                <Label htmlFor="energy-none">Sistematik takip yok</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="energy-efficiency">Son 3 yılda enerji verimliliği projeleriniz</Label>
            <div className="mt-2 space-y-2">
              {["LED aydınlatma", "Verimli motorlar", "Isı geri kazanım", "Bina yalıtımı"].map((project) => (
                <div key={project} className="flex items-center space-x-2">
                  <Checkbox id={project} />
                  <Label htmlFor={project}>{project}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="energy-target">Enerji tasarrufu hedefiniz (%)</Label>
            <Input id="energy-target" type="number" placeholder="0" className="mt-2" />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="energy-practices">Enerji yönetimi uygulamalarınızı detaylandırın</Label>
        <Textarea
          id="energy-practices"
          placeholder="Enerji verimliliği projeleri, tasarruf uygulamaları, hedefler..."
          className="mt-2"
          rows={4}
        />
      </div>
    </div>
  )
}

function WaterManagementForm() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="annual-water">Yıllık su tüketiminiz (m³)</Label>
            <Input id="annual-water" type="number" placeholder="0" className="mt-2" />
          </div>

          <div>
            <Label>Su kaynaklarınız</Label>
            <div className="mt-2 space-y-2">
              {["Şehir şebekesi", "Kuyu suyu", "Yağmur suyu", "Geri dönüştürülmüş su"].map((source) => (
                <div key={source} className="flex items-center space-x-2">
                  <Checkbox id={source} />
                  <Label htmlFor={source}>{source}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="water-treatment">Atık su arıtma sisteminiz var mı?</Label>
            <RadioGroup className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="advanced" id="water-advanced" />
                <Label htmlFor="water-advanced">İleri arıtma sistemi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="basic" id="water-basic" />
                <Label htmlFor="water-basic">Temel arıtma</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="water-none" />
                <Label htmlFor="water-none">Arıtma sistemi yok</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="water-savings">Su tasarrufu hedefiniz (%)</Label>
            <Input id="water-savings" type="number" placeholder="0" className="mt-2" />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="water-practices">Su yönetimi uygulamalarınızı açıklayın</Label>
        <Textarea
          id="water-practices"
          placeholder="Su tasarrufu projeleri, geri dönüşüm uygulamaları, kalite kontrol..."
          className="mt-2"
          rows={4}
        />
      </div>
    </div>
  )
}

function WasteManagementForm() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="annual-waste">Yıllık atık üretiminiz (ton)</Label>
            <Input id="annual-waste" type="number" placeholder="0" className="mt-2" />
          </div>

          <div>
            <Label>Atık türleriniz</Label>
            <div className="mt-2 space-y-2">
              {["Tehlikeli atık", "Geri dönüştürülebilir", "Organik atık", "Elektronik atık"].map((waste) => (
                <div key={waste} className="flex items-center space-x-2">
                  <Checkbox id={waste} />
                  <Label htmlFor={waste}>{waste}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="recycling-rate">Geri dönüşüm oranınız (%)</Label>
            <Input id="recycling-rate" type="number" placeholder="0" className="mt-2" />
          </div>

          <div>
            <Label htmlFor="waste-reduction">Atık azaltma hedefiniz (%)</Label>
            <Input id="waste-reduction" type="number" placeholder="0" className="mt-2" />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="waste-practices">Atık yönetimi uygulamalarınızı detaylandırın</Label>
        <Textarea
          id="waste-practices"
          placeholder="Atık ayrıştırma, geri dönüşüm projeleri, azaltma stratejileri..."
          className="mt-2"
          rows={4}
        />
      </div>
    </div>
  )
}

function RenewableEnergyForm() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label>Kullandığınız yenilenebilir enerji kaynakları</Label>
            <div className="mt-2 space-y-2">
              {["Güneş enerjisi", "Rüzgar enerjisi", "Biyokütle", "Jeotermal"].map((source) => (
                <div key={source} className="flex items-center space-x-2">
                  <Checkbox id={source} />
                  <Label htmlFor={source}>{source}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="renewable-percentage">Toplam enerjide yenilenebilir pay (%)</Label>
            <Input id="renewable-percentage" type="number" placeholder="0" className="mt-2" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="renewable-capacity">Kurulu yenilenebilir enerji kapasitesi (kW)</Label>
            <Input id="renewable-capacity" type="number" placeholder="0" className="mt-2" />
          </div>

          <div>
            <Label htmlFor="renewable-target">Yenilenebilir enerji hedefi (%)</Label>
            <Input id="renewable-target" type="number" placeholder="0" className="mt-2" />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="renewable-practices">Yenilenebilir enerji uygulamalarınızı açıklayın</Label>
        <Textarea
          id="renewable-practices"
          placeholder="Güneş paneli kurulumu, rüzgar enerjisi projeleri, gelecek planları..."
          className="mt-2"
          rows={4}
        />
      </div>
    </div>
  )
}

function GreenProcurementForm() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="green-suppliers">Yeşil tedarikçi oranınız (%)</Label>
            <Input id="green-suppliers" type="number" placeholder="0" className="mt-2" />
          </div>

          <div>
            <Label>Tedarikçi değerlendirme kriterleri</Label>
            <div className="mt-2 space-y-2">
              {["Çevre sertifikaları", "Karbon ayak izi", "Atık yönetimi", "Sosyal sorumluluk"].map((criteria) => (
                <div key={criteria} className="flex items-center space-x-2">
                  <Checkbox id={criteria} />
                  <Label htmlFor={criteria}>{criteria}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="local-procurement">Yerel tedarik oranı (%)</Label>
            <Input id="local-procurement" type="number" placeholder="0" className="mt-2" />
          </div>

          <div>
            <Label htmlFor="sustainable-materials">Sürdürülebilir malzeme kullanım oranı (%)</Label>
            <Input id="sustainable-materials" type="number" placeholder="0" className="mt-2" />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="procurement-practices">Yeşil tedarik uygulamalarınızı detaylandırın</Label>
        <Textarea
          id="procurement-practices"
          placeholder="Tedarikçi seçim kriterleri, sürdürülebilir malzeme tercihleri, yerel tedarik politikaları..."
          className="mt-2"
          rows={4}
        />
      </div>
    </div>
  )
}

function CircularEconomyForm() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label>Döngüsel ekonomi uygulamaları</Label>
            <div className="mt-2 space-y-2">
              {["Ürün yeniden tasarımı", "Malzeme geri kazanımı", "Paylaşım ekonomisi", "Servis modeli"].map(
                (practice) => (
                  <div key={practice} className="flex items-center space-x-2">
                    <Checkbox id={practice} />
                    <Label htmlFor={practice}>{practice}</Label>
                  </div>
                ),
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="waste-to-resource">Atıktan kaynak üretim oranı (%)</Label>
            <Input id="waste-to-resource" type="number" placeholder="0" className="mt-2" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="product-lifecycle">Ürün yaşam döngüsü değerlendirmesi yapıyor musunuz?</Label>
            <RadioGroup className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comprehensive" id="lifecycle-comprehensive" />
                <Label htmlFor="lifecycle-comprehensive">Kapsamlı LCA yapıyoruz</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="basic" id="lifecycle-basic" />
                <Label htmlFor="lifecycle-basic">Temel değerlendirme</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="lifecycle-none" />
                <Label htmlFor="lifecycle-none">Henüz yapmıyoruz</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="circular-target">Döngüsellik hedefi (%)</Label>
            <Input id="circular-target" type="number" placeholder="0" className="mt-2" />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="circular-practices">Döngüsel ekonomi uygulamalarınızı açıklayın</Label>
        <Textarea
          id="circular-practices"
          placeholder="Sıfır atık projeleri, malzeme geri kazanımı, ürün yeniden tasarımı..."
          className="mt-2"
          rows={4}
        />
      </div>
    </div>
  )
}

function DisasterManagementForm() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="risk-assessment">Risk değerlendirmesi yapıyor musunuz?</Label>
            <RadioGroup className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="regular" id="risk-regular" />
                <Label htmlFor="risk-regular">Düzenli risk değerlendirmesi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="annual" id="risk-annual" />
                <Label htmlFor="risk-annual">Yıllık değerlendirme</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="risk-none" />
                <Label htmlFor="risk-none">Sistematik değerlendirme yok</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label>Afet türleri için hazırlığınız</Label>
            <div className="mt-2 space-y-2">
              {["Deprem", "Sel/Su baskını", "Yangın", "Siber saldırı"].map((disaster) => (
                <div key={disaster} className="flex items-center space-x-2">
                  <Checkbox id={disaster} />
                  <Label htmlFor={disaster}>{disaster}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="business-continuity">İş sürekliliği planınız var mı?</Label>
            <RadioGroup className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comprehensive" id="continuity-comprehensive" />
                <Label htmlFor="continuity-comprehensive">Kapsamlı plan var</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="basic" id="continuity-basic" />
                <Label htmlFor="continuity-basic">Temel plan var</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="continuity-none" />
                <Label htmlFor="continuity-none">Plan yok</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="recovery-time">Hedef kurtarma süresi (saat)</Label>
            <Input id="recovery-time" type="number" placeholder="0" className="mt-2" />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="disaster-practices">Afet yönetimi ve dayanıklılık uygulamalarınızı açıklayın</Label>
        <Textarea
          id="disaster-practices"
          placeholder="Acil durum planları, yedekleme sistemleri, personel eğitimleri..."
          className="mt-2"
          rows={4}
        />
      </div>
    </div>
  )
}
