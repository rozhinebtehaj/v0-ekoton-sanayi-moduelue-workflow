import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import type { ScenarioData } from "./scenarios"

export class PDFGenerator {
  private pdf: jsPDF
  private pageWidth: number
  private pageHeight: number
  private margin: number
  private currentY: number

  constructor() {
    this.pdf = new jsPDF("p", "mm", "a4")
    this.pageWidth = this.pdf.internal.pageSize.getWidth()
    this.pageHeight = this.pdf.internal.pageSize.getHeight()
    this.margin = 20
    this.currentY = this.margin
  }

  private addNewPageIfNeeded(requiredHeight: number) {
    if (this.currentY + requiredHeight > this.pageHeight - this.margin) {
      this.pdf.addPage()
      this.currentY = this.margin
    }
  }

  private addTitle(text: string, fontSize = 16) {
    this.addNewPageIfNeeded(15)
    this.pdf.setFontSize(fontSize)
    this.pdf.setFont("helvetica", "bold")
    this.pdf.text(text, this.margin, this.currentY)
    this.currentY += 10
  }

  private addSubtitle(text: string, fontSize = 12) {
    this.addNewPageIfNeeded(10)
    this.pdf.setFontSize(fontSize)
    this.pdf.setFont("helvetica", "normal")
    this.pdf.text(text, this.margin, this.currentY)
    this.currentY += 8
  }

  private addText(text: string, fontSize = 10) {
    this.addNewPageIfNeeded(8)
    this.pdf.setFontSize(fontSize)
    this.pdf.setFont("helvetica", "normal")

    // Handle text wrapping
    const lines = this.pdf.splitTextToSize(text, this.pageWidth - 2 * this.margin)
    this.pdf.text(lines, this.margin, this.currentY)
    this.currentY += lines.length * 5
  }

  private addTable(headers: string[], rows: string[][]) {
    const startY = this.currentY
    const cellHeight = 8
    const cellWidth = (this.pageWidth - 2 * this.margin) / headers.length

    this.addNewPageIfNeeded(cellHeight * (rows.length + 2))

    // Headers
    this.pdf.setFontSize(10)
    this.pdf.setFont("helvetica", "bold")
    headers.forEach((header, index) => {
      this.pdf.rect(this.margin + index * cellWidth, startY, cellWidth, cellHeight)
      this.pdf.text(header, this.margin + index * cellWidth + 2, startY + 5)
    })

    // Rows
    this.pdf.setFont("helvetica", "normal")
    rows.forEach((row, rowIndex) => {
      const y = startY + cellHeight * (rowIndex + 1)
      row.forEach((cell, cellIndex) => {
        this.pdf.rect(this.margin + cellIndex * cellWidth, y, cellWidth, cellHeight)
        this.pdf.text(cell, this.margin + cellIndex * cellWidth + 2, y + 5)
      })
    })

    this.currentY = startY + cellHeight * (rows.length + 1) + 10
  }

  private async addChartFromElement(elementId: string, title: string) {
    const element = document.getElementById(elementId)
    if (!element) return

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
      })

      const imgData = canvas.toDataURL("image/png")
      const imgWidth = this.pageWidth - 2 * this.margin
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      this.addNewPageIfNeeded(imgHeight + 20)
      this.addSubtitle(title)
      this.pdf.addImage(imgData, "PNG", this.margin, this.currentY, imgWidth, imgHeight)
      this.currentY += imgHeight + 10
    } catch (error) {
      console.error("Error capturing chart:", error)
      this.addText(`[Grafik yüklenemedi: ${title}]`)
    }
  }

  async generateScenarioReport(scenario: ScenarioData): Promise<void> {
    // Cover Page
    this.pdf.setFontSize(24)
    this.pdf.setFont("helvetica", "bold")
    this.pdf.text("EKOTON", this.pageWidth / 2, 50, { align: "center" })

    this.pdf.setFontSize(18)
    this.pdf.text("Yeşil Dönüşüm Raporu", this.pageWidth / 2, 70, { align: "center" })

    this.pdf.setFontSize(14)
    this.pdf.setFont("helvetica", "normal")
    this.pdf.text(scenario.name, this.pageWidth / 2, 90, { align: "center" })

    this.pdf.setFontSize(12)
    this.pdf.text(new Date().toLocaleDateString("tr-TR"), this.pageWidth / 2, 110, { align: "center" })

    // Add company logo placeholder
    this.pdf.rect(this.pageWidth / 2 - 25, 130, 50, 30)
    this.pdf.text("Logo", this.pageWidth / 2, 150, { align: "center" })

    // New page for content
    this.pdf.addPage()
    this.currentY = this.margin

    // Executive Summary
    this.addTitle("YÖNETİCİ ÖZETİ", 18)
    this.addText(`Profil: ${scenario.name}`)
    this.addText(`Açıklama: ${scenario.description}`)
    this.addText(`Genel Puan: ${scenario.overallScore}/100`)
    this.currentY += 10

    // Assessment Results
    this.addTitle("DEĞERLENDİRME SONUÇLARI", 16)

    const assessmentHeaders = ["Kategori", "Puan", "Durum"]
    const assessmentRows = scenario.assessmentData.map((item) => [
      item.category,
      `${item.score}/100`,
      item.status === "good" ? "Güçlü" : item.status === "medium" ? "Orta" : "Zayıf",
    ])

    this.addTable(assessmentHeaders, assessmentRows)

    // KPIs
    this.addTitle("PERFORMANS GÖSTERGELERİ", 16)

    const kpiHeaders = ["Gösterge", "Mevcut", "Hedef", "Trend"]
    const kpiRows = scenario.kpis.map((kpi) => [
      kpi.title,
      `${kpi.current}${kpi.unit}`,
      `${kpi.target}${kpi.unit}`,
      kpi.trend === "up" ? "↗ Artış" : kpi.trend === "down" ? "↘ Azalış" : "→ Sabit",
    ])

    this.addTable(kpiHeaders, kpiRows)

    // Recommendations
    this.addTitle("ÖNERİLER", 16)
    scenario.recommendations.forEach((rec, index) => {
      this.addSubtitle(`${index + 1}. ${rec.category} (${rec.priority} Öncelik)`)
      this.addText(rec.description)
      this.addText("Beklenen Faydalar:")
      rec.benefits.forEach((benefit) => {
        this.addText(`• ${benefit}`)
      })
      this.currentY += 5
    })

    // Action Plan
    this.addTitle("EYLEM PLANI", 16)

    // Short Term
    this.addSubtitle("Kısa Vadeli Eylemler (0-6 ay)")
    scenario.actionPlan.shortTerm.forEach((action, index) => {
      this.addText(`${index + 1}. ${action.title}`)
      this.addText(`   Açıklama: ${action.description}`)
      this.addText(`   Süre: ${action.timeline} | Maliyet: ${action.cost} | Etki: ${action.impact}`)
      this.currentY += 3
    })

    // Medium Term
    this.addSubtitle("Orta Vadeli Eylemler (6-12 ay)")
    scenario.actionPlan.mediumTerm.forEach((action, index) => {
      this.addText(`${index + 1}. ${action.title}`)
      this.addText(`   Açıklama: ${action.description}`)
      this.addText(`   Süre: ${action.timeline} | Maliyet: ${action.cost} | Etki: ${action.impact}`)
      this.currentY += 3
    })

    // Long Term
    this.addSubtitle("Uzun Vadeli Eylemler (12+ ay)")
    scenario.actionPlan.longTerm.forEach((action, index) => {
      this.addText(`${index + 1}. ${action.title}`)
      this.addText(`   Açıklama: ${action.description}`)
      this.addText(`   Süre: ${action.timeline} | Maliyet: ${action.cost} | Etki: ${action.impact}`)
      this.currentY += 3
    })

    // Try to capture charts if available
    await this.addChartFromElement("assessment-bar-chart", "Kategori Bazında Performans")
    await this.addChartFromElement("assessment-radar-chart", "Radar Analizi")
    await this.addChartFromElement("progress-line-chart", "Performans Trendi")
  }

  save(filename: string) {
    this.pdf.save(filename)
  }

  getBlob(): Blob {
    return this.pdf.output("blob")
  }
}

export async function generatePDFReport(scenario: ScenarioData): Promise<void> {
  const generator = new PDFGenerator()
  await generator.generateScenarioReport(scenario)

  const filename = `EKOTON_Rapor_${scenario.name.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`
  generator.save(filename)
}
