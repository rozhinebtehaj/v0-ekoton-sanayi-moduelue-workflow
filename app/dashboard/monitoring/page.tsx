"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  TrendingUp,
  TrendingDown,
  Bell,
  Calendar,
  Target,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"
import { useScenario } from "@/hooks/use-scenario"

const notifications = [
  {
    type: "success",
    title: "Hedef Tamamlandı",
    message: "Atık geri dönüşüm hedefi %100'e ulaştı",
    time: "2 saat önce",
  },
  {
    type: "warning",
    title: "Dikkat Gerekli",
    message: "Su tüketimi bu ay %5 arttı",
    time: "1 gün önce",
  },
  {
    type: "info",
    title: "Yeni Düzenleme",
    message: "Çevre mevzuatında güncellemeler var",
    time: "3 gün önce",
  },
]

const upcomingTasks = [
  {
    title: "Enerji Audit Raporu",
    deadline: "15 Ocak 2024",
    status: "pending",
    priority: "high",
  },
  {
    title: "Tedarikçi Değerlendirmesi",
    deadline: "20 Ocak 2024",
    status: "in-progress",
    priority: "medium",
  },
  {
    title: "Çalışan Eğitimi",
    deadline: "25 Ocak 2024",
    status: "pending",
    priority: "low",
  },
]

export default function MonitoringPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const { scenario, isLoading, resetScenario } = useScenario()

  if (isLoading || !scenario) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">İzleme verileri yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Sürekli İzleme & Güncellemeler</h1>
          <p className="text-muted-foreground">Performansınızı takip edin ve hedeflerinize ulaşın</p>
          <p className="text-sm text-blue-600 mt-1">Profil: {scenario.name}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={resetScenario}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Yeni Senaryo
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Verileri Güncelle
          </Button>
          <Badge className="bg-green-100 text-green-800">Aktif İzleme</Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        {scenario.kpis.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">{kpi.title}</span>
                {kpi.trend === "up" && <TrendingUp className="h-4 w-4 text-green-600" />}
                {kpi.trend === "down" && <TrendingDown className="h-4 w-4 text-red-600" />}
                {kpi.trend === "stable" && <div className="h-4 w-4 bg-gray-400 rounded-full" />}
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold">{kpi.current}</span>
                  <span className="text-sm text-muted-foreground">{kpi.unit}</span>
                  <span
                    className={`text-sm font-medium ${
                      kpi.trend === "up" ? "text-green-600" : kpi.trend === "down" ? "text-red-600" : "text-gray-600"
                    }`}
                  >
                    {kpi.change}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>
                      Hedef: {kpi.target}
                      {kpi.unit}
                    </span>
                    <span>{Math.round((kpi.current / kpi.target) * 100)}%</span>
                  </div>
                  <Progress value={(kpi.current / kpi.target) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Progress */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performans Trendi</CardTitle>
            <CardDescription>Son 6 aylık gelişim ({scenario.name})</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
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

        <Card>
          <CardHeader>
            <CardTitle>Hedef Takibi</CardTitle>
            <CardDescription>2024 yılı hedeflerinize ulaşma durumu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {scenario.kpis.map((kpi, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{kpi.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {kpi.current}/{kpi.target}
                      {kpi.unit}
                    </span>
                  </div>
                  <Progress value={(kpi.current / kpi.target) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications and Tasks */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Bildirimler</span>
            </CardTitle>
            <CardDescription>Son güncellemeler ve uyarılar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                  {notification.type === "success" && <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />}
                  {notification.type === "warning" && <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />}
                  {notification.type === "info" && <Bell className="h-5 w-5 text-blue-600 mt-0.5" />}
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Yaklaşan Görevler</span>
            </CardTitle>
            <CardDescription>Tamamlanması gereken işler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      <p className="text-xs text-muted-foreground">{task.deadline}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                      }
                    >
                      {task.priority === "high" ? "Yüksek" : task.priority === "medium" ? "Orta" : "Düşük"}
                    </Badge>
                    <Badge variant="outline">{task.status === "pending" ? "Bekliyor" : "Devam Ediyor"}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Update Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Veri Güncelleme</span>
          </CardTitle>
          <CardDescription>Mevcut verilerinizi güncelleyin ve ilerlemenizi takip edin</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="quick-update">
            <TabsList>
              <TabsTrigger value="quick-update">Hızlı Güncelleme</TabsTrigger>
              <TabsTrigger value="detailed-update">Detaylı Güncelleme</TabsTrigger>
            </TabsList>

            <TabsContent value="quick-update" className="space-y-4 mt-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="energy-consumption">Bu Ay Enerji Tüketimi (kWh)</Label>
                  <Input id="energy-consumption" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="water-consumption">Bu Ay Su Tüketimi (m³)</Label>
                  <Input id="water-consumption" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waste-generated">Bu Ay Atık Üretimi (kg)</Label>
                  <Input id="waste-generated" type="number" placeholder="0" />
                </div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">Verileri Kaydet</Button>
            </TabsContent>

            <TabsContent value="detailed-update" className="mt-6">
              <div className="text-center py-8">
                <Button variant="outline" size="lg">
                  Detaylı Veri Girişine Git
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Tüm kategoriler için kapsamlı veri güncellemesi yapın
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
