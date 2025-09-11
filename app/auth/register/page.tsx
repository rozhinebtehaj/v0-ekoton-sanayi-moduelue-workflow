"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Leaf, ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    organizationName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactPerson: "",
    phone: "",
    sector: "",
    employeeCount: "",
    agreeTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate registration
    router.push("/dashboard/info")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Ana Sayfaya Dön
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">EKOTON</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Organizasyon Kaydı</CardTitle>
            <CardDescription>
              Sanayi için Yeşil Dönüşüm modülüne katılmak için organizasyonunuzu kaydedin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="organizationName">Organizasyon Adı *</Label>
                <Input
                  id="organizationName"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-posta *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Şifre *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Şifre Tekrar *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPerson">İletişim Kişisi *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sector">Sektör *</Label>
                <Select value={formData.sector} onValueChange={(value) => setFormData({ ...formData, sector: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sektör seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automotive">Otomotiv</SelectItem>
                    <SelectItem value="textile">Tekstil</SelectItem>
                    <SelectItem value="food">Gıda</SelectItem>
                    <SelectItem value="chemical">Kimya</SelectItem>
                    <SelectItem value="metal">Metal</SelectItem>
                    <SelectItem value="electronics">Elektronik</SelectItem>
                    <SelectItem value="other">Diğer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeeCount">Çalışan Sayısı</Label>
                <Select
                  value={formData.employeeCount}
                  onValueChange={(value) => setFormData({ ...formData, employeeCount: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Çalışan sayısı seçiniz" />
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

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                />
                <Label htmlFor="agreeTerms" className="text-sm">
                  <Link href="#" className="text-green-600 hover:underline">
                    Kullanım şartları
                  </Link>{" "}
                  ve{" "}
                  <Link href="#" className="text-green-600 hover:underline">
                    gizlilik politikası
                  </Link>
                  nı kabul ediyorum
                </Label>
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Kayıt Ol
              </Button>

              <div className="text-center text-sm">
                Zaten hesabınız var mı?{" "}
                <Link href="/auth/login" className="text-green-600 hover:underline">
                  Giriş yapın
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
