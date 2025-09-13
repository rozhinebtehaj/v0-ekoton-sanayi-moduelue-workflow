import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import type { ScenarioData } from "./scenarios"
import type { ScenarioReport } from "./scenario-reports"
import { getScenarioReport } from "./scenario-reports"

export class EnhancedPDFGenerator {
  private pdf: jsPDF
  private pageWidth: number
  private pageHeight: number
  private margin: number
  private currentY: number
  private lineHeight: number

  constructor() {
    this.pdf = new jsPDF("p", "mm", "a4")
    this.pageWidth = this.pdf.internal.pageSize.getWidth()
    this.pageHeight = this.pdf.internal.pageSize.getHeight()
    this.margin = 20
    this.currentY = this.margin
    this.lineHeight = 6
  }

  private addNewPageIfNeeded(requiredHeight: number) {
    if (this.currentY + requiredHeight > this.pageHeight - this.margin) {
      this.pdf.addPage()
      this.currentY = this.margin
    }
  }

  private addTitle(text: string, fontSize = 16, color = [0, 0, 0]) {
    this.addNewPageIfNeeded(15)
    this.pdf.setFontSize(fontSize)
    this.pdf.setFont("helvetica", "bold")
    this.pdf.setTextColor(color[0], color[1], color[2])
    this.pdf.text(text, this.margin, this.currentY)
    this.currentY += 12

    // Add underline for main titles
    if (fontSize >= 16) {
      this.pdf.setDrawColor(46, 125, 50) // Green color
      this.pdf.line(this.margin, this.currentY - 8, this.pageWidth - this.margin, this.currentY - 8)
      this.currentY += 5
    }
  }

  private addSubtitle(text: string, fontSize = 12, color = [0, 0, 0]) {
    this.addNewPageIfNeeded(10)
    this.pdf.setFontSize(fontSize)
    this.pdf.setFont("helvetica", "bold")
    this.pdf.setTextColor(color[0], color[1], color[2])
    this.pdf.text(text, this.margin, this.currentY)
    this.currentY += 8
  }

  private addText(text: string, fontSize = 10, indent = 0) {
    this.addNewPageIfNeeded(8)
    this.pdf.setFontSize(fontSize)
    this.pdf.setFont("helvetica", "normal")
    this.pdf.setTextColor(0, 0, 0)

    const maxWidth = this.pageWidth - 2 * this.margin - indent
    const lines = this.pdf.splitTextToSize(text, maxWidth)

    for (let i = 0; i < lines.length; i++) {
      this.addNewPageIfNeeded(this.lineHeight)
      this.pdf.text(lines[i], this.margin + indent, this.currentY)
      this.currentY += this.lineHeight
    }
    this.currentY += 2
  }

  private addBulletPoint(text: string, fontSize = 10, indent = 5) {
    this.addNewPageIfNeeded(8)
    this.pdf.setFontSize(fontSize)
    this.pdf.setFont("helvetica", "normal")
    this.pdf.setTextColor(0, 0, 0)

    // Add bullet
    this.pdf.text("•", this.margin + indent, this.currentY)

    const maxWidth = this.pageWidth - 2 * this.margin - indent - 10
    const lines = this.pdf.splitTextToSize(text, maxWidth)

    for (let i = 0; i < lines.length; i++) {
      this.addNewPageIfNeeded(this.lineHeight)
      this.pdf.text(lines[i], this.margin + indent + 10, this.currentY)
      this.currentY += this.lineHeight
    }
    this.currentY += 1
  }

  private addTable(headers: string[], rows: string[][], title?: string) {
    if (title) {
      this.addSubtitle(title, 11)
    }

    const startY = this.currentY
    const cellHeight = 8
    const cellWidth = (this.pageWidth - 2 * this.margin) / headers.length

    this.addNewPageIfNeeded(cellHeight * (rows.length + 2))

    // Headers
    this.pdf.setFontSize(9)
    this.pdf.setFont("helvetica", "bold")
    this.pdf.setFillColor(46, 125, 50) // Green background
    this.pdf.setTextColor(255, 255, 255) // White text

    headers.forEach((header, index) => {
      this.pdf.rect(this.margin + index * cellWidth, startY, cellWidth, cellHeight, "F")
      this.pdf.text(header, this.margin + index * cellWidth + 2, startY + 5)
    })

    // Rows
    this.pdf.setFont("helvetica", "normal")
    this.pdf.setTextColor(0, 0, 0)
    this.pdf.setFillColor(245, 245, 245) // Light gray for alternating rows

    rows.forEach((row, rowIndex) => {
      const y = startY + cellHeight * (rowIndex + 1)

      // Alternating row colors
      if (rowIndex % 2 === 1) {
        this.pdf.rect(this.margin, y, this.pageWidth - 2 * this.margin, cellHeight, "F")
      }

      row.forEach((cell, cellIndex) => {
        this.pdf.rect(this.margin + cellIndex * cellWidth, y, cellWidth, cellHeight, "S")
        const cellText = this.pdf.splitTextToSize(cell, cellWidth - 4)
        this.pdf.text(cellText[0] || "", this.margin + cellIndex * cellWidth + 2, y + 5)
      })
    })

    this.currentY = startY + cellHeight * (rows.length + 1) + 10
  }

  private addInfoBox(title: string, content: string, color = [46, 125, 50]) {
    this.addNewPageIfNeeded(30)

    const boxHeight = 25
    const boxY = this.currentY

    // Draw colored box
    this.pdf.setFillColor(color[0], color[1], color[2])
    this.pdf.setDrawColor(color[0], color[1], color[2])
    this.pdf.rect(this.margin, boxY, this.pageWidth - 2 * this.margin, boxHeight, "FD")

    // Add title
    this.pdf.setFontSize(12)
    this.pdf.setFont("helvetica", "bold")
    this.pdf.setTextColor(255, 255, 255)
    this.pdf.text(title, this.margin + 5, boxY + 8)

    // Add content
    this.pdf.setFontSize(10)
    this.pdf.setFont("helvetica", "normal")
    const lines = this.pdf.splitTextToSize(content, this.pageWidth - 2 * this.margin - 10)
    lines.slice(0, 2).forEach((line: string, index: number) => {
      this.pdf.text(line, this.margin + 5, boxY + 15 + index * 6)
    })

    this.currentY = boxY + boxHeight + 10
  }

  private async addChartFromElement(elementId: string, title: string) {
    const element = document.getElementById(elementId)
    if (!element) {
      this.addText(`[Grafik bulunamadı: ${title}]`)
      return
    }

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: "#ffffff",
        scale: 1.5,
        logging: false,
        useCORS: true,
      })

      const imgData = canvas.toDataURL("image/png")
      const imgWidth = this.pageWidth - 2 * this.margin
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      this.addNewPageIfNeeded(imgHeight + 20)
      this.addSubtitle(title, 11)
      this.pdf.addImage(imgData, "PNG", this.margin, this.currentY, imgWidth, imgHeight)
      this.currentY += imgHeight + 10
    } catch (error) {
      console.error("Error capturing chart:", error)
      this.addText(`[Grafik yüklenemedi: ${title}]`)
    }
  }

  async generateComprehensiveReport(scenario: ScenarioData): Promise<void> {
    const report = getScenarioReport(scenario.id)
    if (!report) {
      throw new Error("Scenario report not found")
    }

    // Cover Page
    this.addCoverPage(scenario)

    // Table of Contents
    this.pdf.addPage()
    this.currentY = this.margin
    this.addTableOfContents()

    // Executive Summary
    this.pdf.addPage()
    this.currentY = this.margin
    this.addExecutiveSummary(report)

    // Current Status Analysis
    this.pdf.addPage()
    this.currentY = this.margin
    this.addCurrentStatusAnalysis(scenario, report)

    // Development Plan
    this.pdf.addPage()
    this.currentY = this.margin
    await this.addDevelopmentPlan(report)

    // Investment Analysis
    this.pdf.addPage()
    this.currentY = this.margin
    this.addInvestmentAnalysis(report)

    // Risk Assessment
    this.addRiskAssessment(report)

    // Implementation Roadmap
    this.pdf.addPage()
    this.currentY = this.margin
    this.addImplementationRoadmap(report)

    // Charts and Visualizations
    this.pdf.addPage()
    this.currentY = this.margin
    await this.addChartsSection(scenario)

    // Appendices
    this.pdf.addPage()
    this.currentY = this.margin
    this.addAppendices(scenario, report)
  }

  private addCoverPage(scenario: ScenarioData) {
    // Header with logo placeholder
    this.pdf.setFillColor(46, 125, 50)
    this.pdf.rect(0, 0, this.pageWidth, 40, "F")

    this.pdf.setFontSize(24)
    this.pdf.setFont("helvetica", "bold")
    this.pdf.setTextColor(255, 255, 255)
    this.pdf.text("EKOTON", this.pageWidth / 2, 25, { align: "center" })

    // Main title
    this.currentY = 70
    this.pdf.setFontSize(20)
    this.pdf.setTextColor(46, 125, 50)
    this.pdf.text("Yeşil Dönüşüm Raporu", this.pageWidth / 2, this.currentY, { align: "center" })

    this.currentY += 20
    this.pdf.setFontSize(16)
    this.pdf.setTextColor(0, 0, 0)
    this.pdf.text("Kapsamlı Sürdürülebilirlik Değerlendirmesi", this.pageWidth / 2, this.currentY, { align: "center" })

    // Scenario info
    this.currentY += 30
    this.pdf.setFontSize(14)
    this.pdf.setFont("helvetica", "bold")
    this.pdf.text(`Profil: ${scenario.name}`, this.pageWidth / 2, this.currentY, { align: "center" })

    this.currentY += 10
    this.pdf.setFontSize(12)
    this.pdf.setFont("helvetica", "normal")
    this.pdf.text(scenario.description, this.pageWidth / 2, this.currentY, { align: "center" })

    // Score highlight
    this.currentY += 40
    this.pdf.setFillColor(46, 125, 50)
    this.pdf.setDrawColor(46, 125, 50)
    this.pdf.roundedRect(this.pageWidth / 2 - 30, this.currentY - 15, 60, 30, 5, 5, "FD")

    this.pdf.setFontSize(24)
    this.pdf.setFont("helvetica", "bold")
    this.pdf.setTextColor(255, 255, 255)
    this.pdf.text(`${scenario.overallScore}/100`, this.pageWidth / 2, this.currentY, { align: "center" })

    this.pdf.setFontSize(10)
    this.pdf.text("Genel Puan", this.pageWidth / 2, this.currentY + 8, { align: "center" })

    // Date and footer
    this.currentY = this.pageHeight - 40
    this.pdf.setFontSize(12)
    this.pdf.setTextColor(0, 0, 0)
    this.pdf.text(`Rapor Tarihi: ${new Date().toLocaleDateString("tr-TR")}`, this.pageWidth / 2, this.currentY, {
      align: "center",
    })

    this.currentY += 20
    this.pdf.setFontSize(10)
    this.pdf.setTextColor(100, 100, 100)
    this.pdf.text(
      "Bu rapor EKOTON Sürdürülebilirlik Platformu tarafından oluşturulmuştur.",
      this.pageWidth / 2,
      this.currentY,
      { align: "center" },
    )
  }

  private addTableOfContents() {
    this.addTitle("İÇİNDEKİLER", 18, [46, 125, 50])

    const contents = [
      { title: "1. Yönetici Özeti", page: "3" },
      { title: "2. Mevcut Durum Analizi", page: "4" },
      { title: "3. Gelişim Planı", page: "5" },
      { title: "4. Yatırım Analizi", page: "8" },
      { title: "5. Risk Değerlendirmesi", page: "9" },
      { title: "6. Uygulama Yol Haritası", page: "10" },
      { title: "7. Grafikler ve Görselleştirmeler", page: "11" },
      { title: "8. Ekler", page: "12" },
    ]

    contents.forEach((item) => {
      this.pdf.setFontSize(12)
      this.pdf.setFont("helvetica", "normal")
      this.pdf.text(item.title, this.margin, this.currentY)
      this.pdf.text(item.page, this.pageWidth - this.margin - 10, this.currentY)

      // Add dots
      const dotsWidth = this.pageWidth - 2 * this.margin - this.pdf.getTextWidth(item.title) - 20
      const dotCount = Math.floor(dotsWidth / 3)
      const dots = ".".repeat(dotCount)
      this.pdf.text(dots, this.margin + this.pdf.getTextWidth(item.title) + 5, this.currentY)

      this.currentY += 8
    })
  }

  private addExecutiveSummary(report: ScenarioReport) {
    this.addTitle("1. YÖNETİCİ ÖZETİ", 18, [46, 125, 50])
    this.addText(report.executiveSummary, 11)

    this.currentY += 10
    this.addSubtitle("Temel Bulgular", 14)
    this.addBulletPoint("Organizasyonunuz sürdürülebilirlik yolculuğunda önemli potansiyele sahiptir")
    this.addBulletPoint("Mevcut güçlü yönleriniz üzerine inşa edilebilir bir gelişim planı önerilmektedir")
    this.addBulletPoint("Önerilen yatırımlar orta vadede önemli tasarruflar sağlayacaktır")
    this.addBulletPoint("Risk yönetimi ile birlikte sürdürülebilir büyüme mümkündür")
  }

  private addCurrentStatusAnalysis(scenario: ScenarioData, report: ScenarioReport) {
    this.addTitle("2. MEVCUT DURUM ANALİZİ", 18, [46, 125, 50])

    this.addSubtitle("Genel Değerlendirme", 14)
    this.addText(report.currentStatusNarrative, 11)

    this.currentY += 10
    this.addSubtitle("Güçlü Yönler", 14, [46, 125, 50])
    this.addText(report.strengthsAnalysis, 11)

    this.currentY += 10
    this.addSubtitle("Gelişim Alanları", 14, [255, 152, 0])
    this.addText(report.challengesAnalysis, 11)

    // Performance table
    this.currentY += 10
    const headers = ["Kategori", "Mevcut Puan", "Durum", "Öncelik"]
    const rows = scenario.assessmentData.map((item) => [
      item.category,
      `${item.score}/100`,
      item.status === "good" ? "Güçlü" : item.status === "medium" ? "Orta" : "Zayıf",
      item.score < 50 ? "Yüksek" : item.score < 70 ? "Orta" : "Düşük",
    ])

    this.addTable(headers, rows, "Kategori Bazında Performans")
  }

  private async addDevelopmentPlan(report: ScenarioReport) {
    this.addTitle("3. GELİŞİM PLANI", 18, [46, 125, 50])

    // Phase 1
    this.addSubtitle(`Faz 1: ${report.developmentPlan.phase1.title}`, 14, [46, 125, 50])
    this.addText(`Süre: ${report.developmentPlan.phase1.duration}`, 10)
    this.addText(report.developmentPlan.phase1.description, 11)

    this.addSubtitle("Hedefler:", 12)
    report.developmentPlan.phase1.objectives.forEach((objective) => {
      this.addBulletPoint(objective)
    })

    this.addSubtitle("Temel Eylemler:", 12)
    report.developmentPlan.phase1.keyActions.forEach((action) => {
      this.addText(`• ${action.action}`, 10, 5)
      this.addText(`  Gerekçe: ${action.rationale}`, 9, 10)
      this.addText(`  Beklenen Sonuç: ${action.expectedOutcome}`, 9, 10)
      this.addText(`  Süre: ${action.timeline} | Kaynak: ${action.resources}`, 9, 10)
      this.currentY += 3
    })

    // Phase 2
    this.pdf.addPage()
    this.currentY = this.margin
    this.addSubtitle(`Faz 2: ${report.developmentPlan.phase2.title}`, 14, [33, 150, 243])
    this.addText(`Süre: ${report.developmentPlan.phase2.duration}`, 10)
    this.addText(report.developmentPlan.phase2.description, 11)

    this.addSubtitle("Hedefler:", 12)
    report.developmentPlan.phase2.objectives.forEach((objective) => {
      this.addBulletPoint(objective)
    })

    this.addSubtitle("Temel Eylemler:", 12)
    report.developmentPlan.phase2.keyActions.forEach((action) => {
      this.addText(`• ${action.action}`, 10, 5)
      this.addText(`  Gerekçe: ${action.rationale}`, 9, 10)
      this.addText(`  Beklenen Sonuç: ${action.expectedOutcome}`, 9, 10)
      this.addText(`  Süre: ${action.timeline} | Kaynak: ${action.resources}`, 9, 10)
      this.currentY += 3
    })

    // Phase 3
    this.addSubtitle(`Faz 3: ${report.developmentPlan.phase3.title}`, 14, [156, 39, 176])
    this.addText(`Süre: ${report.developmentPlan.phase3.duration}`, 10)
    this.addText(report.developmentPlan.phase3.description, 11)

    this.addSubtitle("Hedefler:", 12)
    report.developmentPlan.phase3.objectives.forEach((objective) => {
      this.addBulletPoint(objective)
    })

    this.addSubtitle("Temel Eylemler:", 12)
    report.developmentPlan.phase3.keyActions.forEach((action) => {
      this.addText(`• ${action.action}`, 10, 5)
      this.addText(`  Gerekçe: ${action.rationale}`, 9, 10)
      this.addText(`  Beklenen Sonuç: ${action.expectedOutcome}`, 9, 10)
      this.addText(`  Süre: ${action.timeline} | Kaynak: ${action.resources}`, 9, 10)
      this.currentY += 3
    })
  }

  private addInvestmentAnalysis(report: ScenarioReport) {
    this.addTitle("4. YATIRIM ANALİZİ", 18, [46, 125, 50])

    // Investment summary box
    this.addInfoBox(
      "Yatırım Özeti",
      `Toplam Yatırım: ${report.investmentAnalysis.totalInvestment} | ROI: ${report.investmentAnalysis.roi} | Geri Dönüş: ${report.investmentAnalysis.paybackPeriod}`,
    )

    // Investment breakdown table
    const headers = ["Kategori", "Tutar", "Oran (%)"]
    const rows = report.investmentAnalysis.breakdown.map((item) => [item.category, item.amount, `${item.percentage}%`])

    this.addTable(headers, rows, "Yatırım Dağılımı")

    this.currentY += 10
    this.addSubtitle("Finansal Projeksiyonlar", 14)
    this.addText(`Beklenen Yıllık Tasarruf: ${report.investmentAnalysis.expectedSavings}`, 11)
    this.addText(`Geri Dönüş Süresi: ${report.investmentAnalysis.paybackPeriod}`, 11)
    this.addText(`Yatırım Getirisi (ROI): ${report.investmentAnalysis.roi}`, 11)
  }

  private addRiskAssessment(report: ScenarioReport) {
    this.currentY += 15
    this.addTitle("5. RİSK DEĞERLENDİRMESİ", 18, [46, 125, 50])

    const headers = ["Risk", "Etki", "Olasılık", "Azaltma Stratejisi"]
    const rows = report.riskAssessment.map((risk) => [risk.risk, risk.impact, risk.probability, risk.mitigation])

    this.addTable(headers, rows, "Risk Matrisi")
  }

  private addImplementationRoadmap(report: ScenarioReport) {
    this.addTitle("6. UYGULAMA YOL HARİTASI", 18, [46, 125, 50])

    this.addSubtitle("Paydaş Katılımı", 14)
    report.stakeholderEngagement.forEach((stakeholder) => {
      this.addText(`• ${stakeholder.stakeholder} (${stakeholder.role})`, 10, 5)
      this.addText(`  ${stakeholder.engagement}`, 9, 10)
      this.currentY += 2
    })

    this.currentY += 10
    this.addSubtitle("Sonraki Adımlar", 14)
    report.nextSteps.forEach((step) => {
      this.addBulletPoint(step)
    })
  }

  private async addChartsSection(scenario: ScenarioData) {
    this.addTitle("7. GRAFİKLER VE GÖRSELLEŞTİRMELER", 18, [46, 125, 50])

    // Try to capture charts from the DOM
    await this.addChartFromElement("assessment-bar-chart", "Kategori Bazında Performans")
    await this.addChartFromElement("assessment-radar-chart", "Radar Analizi")
    await this.addChartFromElement("progress-line-chart", "Performans Trendi")

    // Add KPI summary table
    const kpiHeaders = ["KPI", "Mevcut", "Hedef", "Trend"]
    const kpiRows = scenario.kpis.map((kpi) => [
      kpi.title,
      `${kpi.current}${kpi.unit}`,
      `${kpi.target}${kpi.unit}`,
      kpi.trend === "up" ? "↗ Artış" : kpi.trend === "down" ? "↘ Azalış" : "→ Sabit",
    ])

    this.addTable(kpiHeaders, kpiRows, "Performans Göstergeleri")
  }

  private addAppendices(scenario: ScenarioData, report: ScenarioReport) {
    this.addTitle("8. EKLER", 18, [46, 125, 50])

    this.addSubtitle("Ek A: Metodoloji", 14)
    this.addText(
      "Bu rapor YES-TR (Yeşil Ekonomiye Geçiş Türkiye) ve EKOTON kriterlerine göre hazırlanmıştır. Değerlendirme 8 ana kategori altında 100 puan üzerinden yapılmıştır.",
      10,
    )

    this.currentY += 10
    this.addSubtitle("Ek B: Sertifikasyon Kriterleri", 14)
    this.addText(
      "Sürdürülebilirlik sertifikasyonu için minimum 60/100 puan gereklidir. Her kategori için asgari performans standartları belirlenmiştir.",
      10,
    )

    this.currentY += 10
    this.addSubtitle("Ek C: İletişim Bilgileri", 14)
    this.addText("EKOTON Sürdürülebilirlik Platformu", 10)
    this.addText("E-posta: info@ekoton.com.tr", 10)
    this.addText("Web: www.ekoton.com.tr", 10)
    this.addText("Telefon: +90 212 555 0123", 10)
  }

  save(filename: string) {
    this.pdf.save(filename)
  }

  getBlob(): Blob {
    return this.pdf.output("blob")
  }
}

export async function generateComprehensivePDFReport(scenario: ScenarioData): Promise<void> {
  const generator = new EnhancedPDFGenerator()
  await generator.generateComprehensiveReport(scenario)

  const filename = `EKOTON_Kapsamli_Rapor_${scenario.name.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`
  generator.save(filename)
}
