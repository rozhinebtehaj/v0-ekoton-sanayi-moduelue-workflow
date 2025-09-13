import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import type { ScenarioData } from "./scenarios"
import type { ScenarioReport } from "./scenario-reports"
import { getScenarioReport } from "./scenario-reports"

// Font configuration for UTF-8 support
const FONT_CONFIG = {
  primary: "helvetica",
  secondary: "times",
  sizes: {
    title: 24,
    heading1: 18,
    heading2: 16,
    heading3: 14,
    body: 11,
    caption: 9,
    small: 8,
  },
}

// Color palette for consistent branding
const COLORS = {
  primary: [46, 125, 50], // Green
  secondary: [33, 150, 243], // Blue
  accent: [255, 152, 0], // Orange
  success: [76, 175, 80], // Light Green
  warning: [255, 193, 7], // Yellow
  danger: [244, 67, 54], // Red
  text: {
    primary: [33, 33, 33], // Dark Gray
    secondary: [117, 117, 117], // Medium Gray
    light: [158, 158, 158], // Light Gray
    white: [255, 255, 255], // White
  },
  background: {
    primary: [255, 255, 255], // White
    light: [250, 250, 250], // Very Light Gray
    accent: [248, 249, 250], // Off White
  },
}

export class EnhancedPDFGenerator {
  private pdf: jsPDF
  private pageWidth: number
  private pageHeight: number
  private margin: number
  private currentY: number
  private lineHeight: number
  private pageNumber: number

  constructor() {
    // Initialize with UTF-8 support
    this.pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
      compress: true,
    })

    // Set UTF-8 encoding
    this.pdf.setProperties({
      title: "EKOTON Sürdürülebilirlik Raporu",
      subject: "Yeşil Dönüşüm Değerlendirmesi",
      author: "EKOTON Platform",
      creator: "EKOTON Sürdürülebilirlik Platformu",
      producer: "EKOTON PDF Generator",
    })

    this.pageWidth = this.pdf.internal.pageSize.getWidth()
    this.pageHeight = this.pdf.internal.pageSize.getHeight()
    this.margin = 20
    this.currentY = this.margin
    this.lineHeight = 6
    this.pageNumber = 1
  }

  private addNewPageIfNeeded(requiredHeight: number) {
    if (this.currentY + requiredHeight > this.pageHeight - this.margin - 15) {
      // Reserve space for footer
      this.addPageFooter()
      this.pdf.addPage()
      this.pageNumber++
      this.addPageHeader()
      this.currentY = this.margin + 20 // Account for header
    }
  }

  private addPageHeader() {
    const headerHeight = 15

    // Header background
    this.pdf.setFillColor(...COLORS.primary)
    this.pdf.rect(0, 0, this.pageWidth, headerHeight, "F")

    // EKOTON logo/text
    this.pdf.setFontSize(FONT_CONFIG.sizes.heading3)
    this.pdf.setFont(FONT_CONFIG.primary, "bold")
    this.pdf.setTextColor(...COLORS.text.white)
    this.pdf.text("EKOTON", this.margin, 10)

    // Document title
    this.pdf.setFontSize(FONT_CONFIG.sizes.caption)
    this.pdf.setFont(FONT_CONFIG.primary, "normal")
    this.pdf.text("Sürdürülebilirlik Raporu", this.pageWidth - this.margin, 10, { align: "right" })

    // Reset text color
    this.pdf.setTextColor(...COLORS.text.primary)
  }

  private addPageFooter() {
    const footerY = this.pageHeight - 10

    // Footer line
    this.pdf.setDrawColor(...COLORS.text.light)
    this.pdf.setLineWidth(0.5)
    this.pdf.line(this.margin, footerY - 5, this.pageWidth - this.margin, footerY - 5)

    // Page number
    this.pdf.setFontSize(FONT_CONFIG.sizes.small)
    this.pdf.setFont(FONT_CONFIG.primary, "normal")
    this.pdf.setTextColor(...COLORS.text.secondary)
    this.pdf.text(`Sayfa ${this.pageNumber}`, this.pageWidth / 2, footerY, { align: "center" })

    // Date
    this.pdf.text(new Date().toLocaleDateString("tr-TR"), this.pageWidth - this.margin, footerY, { align: "right" })

    // Company info
    this.pdf.text("EKOTON Sürdürülebilirlik Platformu", this.margin, footerY)
  }

  private addTitle(text: string, level: 1 | 2 | 3 = 1, color = COLORS.primary) {
    const fontSize =
      level === 1
        ? FONT_CONFIG.sizes.heading1
        : level === 2
          ? FONT_CONFIG.sizes.heading2
          : level === 3 ? FONT_CONFIG.sizes.heading3
\
    this.addNewPageIfNeeded(fontSize + 10)

    this.pdf.setFontSize(fontSize)
    this.pdf.setFont(FONT_CONFIG.primary, "bold")
    this.pdf.setTextColor(color[0], color[1], color[2])

    // Add UTF-8 text with proper encoding
    this.pdf.text(text, this.margin, this.currentY)
    this.currentY += fontSize * 0.6

    // Add decorative underline for main titles
    if (level === 1) {
      this.pdf.setDrawColor(...color)
      this.pdf.setLineWidth(1)
      this.pdf.line(this.margin, this.currentY, this.margin + 60, this.currentY)
      this.currentY += 8
    } else {
      this.currentY += 5
    }
  }

  private addSubtitle(text: string, fontSize = FONT_CONFIG.sizes.heading3, color = COLORS.text.primary) {
    this.addNewPageIfNeeded(fontSize + 5)
    this.pdf.setFontSize(fontSize)
    this.pdf.setFont(FONT_CONFIG.primary, "bold")
    this.pdf.setTextColor(color[0], color[1], color[2])
    this.pdf.text(text, this.margin, this.currentY)
    this.currentY += fontSize * 0.6 + 3
  }

  private addText(text: string, fontSize = FONT_CONFIG.sizes.body, indent = 0, justify = false) {
    this.addNewPageIfNeeded(fontSize + 2)
    this.pdf.setFontSize(fontSize)
    this.pdf.setFont(FONT_CONFIG.primary, "normal")
    this.pdf.setTextColor(...COLORS.text.primary)

    const maxWidth = this.pageWidth - 2 * this.margin - indent
    const lines = this.pdf.splitTextToSize(text, maxWidth)

    for (let i = 0; i < lines.length; i++) {
      this.addNewPageIfNeeded(this.lineHeight)

      if (justify && i < lines.length - 1) {
        // Justify text (except last line)
        const words = lines[i].split(" ")
        if (words.length > 1) {
          const totalWidth = words.reduce((sum, word) => sum + this.pdf.getTextWidth(word), 0)
          const spaceWidth = (maxWidth - totalWidth) / (words.length - 1)
          let x = this.margin + indent

          words.forEach((word, index) => {
            this.pdf.text(word, x, this.currentY)
            x += this.pdf.getTextWidth(word) + (index < words.length - 1 ? spaceWidth : 0)
          })
        } else {
          this.pdf.text(lines[i], this.margin + indent, this.currentY)
        }
      } else {
        this.pdf.text(lines[i], this.margin + indent, this.currentY)
      }

      this.currentY += this.lineHeight
    }
    this.currentY += 2
  }

  private addBulletPoint(text: string, fontSize = FONT_CONFIG.sizes.body, indent = 5, bulletColor = COLORS.primary) {
    this.addNewPageIfNeeded(fontSize + 2)
    this.pdf.setFontSize(fontSize)
    this.pdf.setFont(FONT_CONFIG.primary, "normal")

    // Add colored bullet
    this.pdf.setTextColor(bulletColor[0], bulletColor[1], bulletColor[2])
    this.pdf.text("●", this.margin + indent, this.currentY)

    // Add text
    this.pdf.setTextColor(...COLORS.text.primary)
    const maxWidth = this.pageWidth - 2 * this.margin - indent - 10
    const lines = this.pdf.splitTextToSize(text, maxWidth)

    for (let i = 0; i < lines.length; i++) {
      this.addNewPageIfNeeded(this.lineHeight)
      this.pdf.text(lines[i], this.margin + indent + 10, this.currentY)
      this.currentY += this.lineHeight
    }
    this.currentY += 1
  }

  private addStyledTable(headers: string[], rows: string[][], title?: string, headerColor = COLORS.primary) {
    if (title) {
      this.addSubtitle(title, FONT_CONFIG.sizes.heading3)
    }

    const startY = this.currentY
    const cellHeight = 10
    const cellWidth = (this.pageWidth - 2 * this.margin) / headers.length

    this.addNewPageIfNeeded(cellHeight * (rows.length + 2))

    // Headers with gradient effect
    this.pdf.setFontSize(FONT_CONFIG.sizes.caption)
    this.pdf.setFont(FONT_CONFIG.primary, "bold")

    // Header background
    this.pdf.setFillColor(headerColor[0], headerColor[1], headerColor[2])
    this.pdf.rect(this.margin, startY, this.pageWidth - 2 * this.margin, cellHeight, "F")

    // Header text
    this.pdf.setTextColor(...COLORS.text.white)
    headers.forEach((header, index) => {
      const cellX = this.margin + index * cellWidth
      this.pdf.rect(cellX, startY, cellWidth, cellHeight, "S")

      // Center text in cell
      const textWidth = this.pdf.getTextWidth(header)
      const textX = cellX + (cellWidth - textWidth) / 2
      this.pdf.text(header, textX, startY + 6)
    })

    // Rows with alternating colors
    this.pdf.setFont(FONT_CONFIG.primary, "normal")
    this.pdf.setTextColor(...COLORS.text.primary)

    rows.forEach((row, rowIndex) => {
      const y = startY + cellHeight * (rowIndex + 1)

      // Alternating row background
      if (rowIndex % 2 === 1) {
        this.pdf.setFillColor(...COLORS.background.accent)
        this.pdf.rect(this.margin, y, this.pageWidth - 2 * this.margin, cellHeight, "F")
      }

      row.forEach((cell, cellIndex) => {
        const cellX = this.margin + cellIndex * cellWidth
        this.pdf.rect(cellX, y, cellWidth, cellHeight, "S")

        // Handle long text with wrapping
        const maxCellWidth = cellWidth - 4
        const cellText = this.pdf.splitTextToSize(cell, maxCellWidth)
        const textY = y + 6

        if (cellText.length === 1) {
          this.pdf.text(cellText[0], cellX + 2, textY)
        } else {
          this.pdf.text(cellText[0] + "...", cellX + 2, textY)
        }
      })
    })

    this.currentY = startY + cellHeight * (rows.length + 1) + 10
  }

  private addInfoBox(title: string, content: string, color = COLORS.primary, icon?: string) {
    this.addNewPageIfNeeded(35)

    const boxHeight = 30
    const boxY = this.currentY

    // Main box with rounded corners effect
    this.pdf.setFillColor(color[0], color[1], color[2])
    this.pdf.setDrawColor(color[0], color[1], color[2])
    this.pdf.roundedRect(this.margin, boxY, this.pageWidth - 2 * this.margin, boxHeight, 2, 2, "FD")

    // Icon placeholder (if provided)
    if (icon) {
      this.pdf.setFontSize(16)
      this.pdf.setTextColor(...COLORS.text.white)
      this.pdf.text(icon, this.margin + 8, boxY + 12)
    }

    // Title
    this.pdf.setFontSize(FONT_CONFIG.sizes.heading3)
    this.pdf.setFont(FONT_CONFIG.primary, "bold")
    this.pdf.setTextColor(...COLORS.text.white)
    this.pdf.text(title, this.margin + (icon ? 25 : 8), boxY + 12)

    // Content
    this.pdf.setFontSize(FONT_CONFIG.sizes.body)
    this.pdf.setFont(FONT_CONFIG.primary, "normal")
    const lines = this.pdf.splitTextToSize(content, this.pageWidth - 2 * this.margin - 16)
    lines.slice(0, 2).forEach((line: string, index: number) => {
      this.pdf.text(line, this.margin + (icon ? 25 : 8), boxY + 20 + index * 6)
    })

    this.currentY = boxY + boxHeight + 10
  }

  private addStatCard(title: string, value: string, subtitle: string, color = COLORS.primary) {
    const cardWidth = (this.pageWidth - 2 * this.margin - 20) / 3
    const cardHeight = 25

    // Card background
    this.pdf.setFillColor(...COLORS.background.light)
    this.pdf.setDrawColor(...COLORS.text.light)
    this.pdf.roundedRect(this.margin, this.currentY, cardWidth, cardHeight, 2, 2, "FD")

    // Value
    this.pdf.setFontSize(FONT_CONFIG.sizes.title)
    this.pdf.setFont(FONT_CONFIG.primary, "bold")
    this.pdf.setTextColor(color[0], color[1], color[2])
    this.pdf.text(value, this.margin + cardWidth / 2, this.currentY + 12, { align: "center" })

    // Title
    this.pdf.setFontSize(FONT_CONFIG.sizes.caption)
    this.pdf.setFont(FONT_CONFIG.primary, "bold")
    this.pdf.setTextColor(...COLORS.text.primary)
    this.pdf.text(title, this.margin + cardWidth / 2, this.currentY + 18, { align: "center" })

    // Subtitle
    this.pdf.setFontSize(FONT_CONFIG.sizes.small)
    this.pdf.setTextColor(...COLORS.text.secondary)
    this.pdf.text(subtitle, this.margin + cardWidth / 2, this.currentY + 22, { align: "center" })
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
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: true,
      })

      const imgData = canvas.toDataURL("image/png", 0.95)
      const imgWidth = this.pageWidth - 2 * this.margin
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      this.addNewPageIfNeeded(imgHeight + 25)
      this.addSubtitle(title, FONT_CONFIG.sizes.heading3)

      // Add border around chart
      this.pdf.setDrawColor(...COLORS.text.light)
      this.pdf.setLineWidth(0.5)
      this.pdf.rect(this.margin, this.currentY, imgWidth, imgHeight, "S")

      this.pdf.addImage(imgData, "PNG", this.margin, this.currentY, imgWidth, imgHeight)
      this.currentY += imgHeight + 15
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
    this.pageNumber++
    this.addPageHeader()
    this.currentY = this.margin + 25
    this.addTableOfContents()

    // Executive Summary
    this.pdf.addPage()
    this.pageNumber++
    this.addPageHeader()
    this.currentY = this.margin + 25
    this.addExecutiveSummary(scenario, report)

    // Current Status Analysis
    this.pdf.addPage()
    this.pageNumber++
    this.addPageHeader()
    this.currentY = this.margin + 25
    this.addCurrentStatusAnalysis(scenario, report)

    // Development Plan
    this.pdf.addPage()
    this.pageNumber++
    this.addPageHeader()
    this.currentY = this.margin + 25
    await this.addDevelopmentPlan(report)

    // Investment Analysis
    this.pdf.addPage()
    this.pageNumber++
    this.addPageHeader()
    this.currentY = this.margin + 25
    this.addInvestmentAnalysis(report)

    // Risk Assessment
    this.addRiskAssessment(report)

    // Implementation Roadmap
    this.pdf.addPage()
    this.pageNumber++
    this.addPageHeader()
    this.currentY = this.margin + 25
    this.addImplementationRoadmap(report)

    // Charts and Visualizations
    this.pdf.addPage()
    this.pageNumber++
    this.addPageHeader()
    this.currentY = this.margin + 25
    await this.addChartsSection(scenario)

    // Appendices
    this.pdf.addPage()
    this.pageNumber++
    this.addPageHeader()
    this.currentY = this.margin + 25
    this.addAppendices(scenario, report)

    // Add final footer
    this.addPageFooter()
  }

  private addCoverPage(scenario: ScenarioData) {
    // Modern gradient header
    this.pdf.setFillColor(...COLORS.primary)
    this.pdf.rect(0, 0, this.pageWidth, 60, "F")

    // Secondary color accent
    this.pdf.setFillColor(...COLORS.secondary)
    this.pdf.rect(0, 50, this.pageWidth, 10, "F")

    // EKOTON Logo/Brand
    this.pdf.setFontSize(FONT_CONFIG.sizes.title + 8)
    this.pdf.setFont(FONT_CONFIG.primary, "bold")
    this.pdf.setTextColor(...COLORS.text.white)
    this.pdf.text("EKOTON", this.pageWidth / 2, 35, { align: "center" })

    this.pdf.setFontSize(FONT_CONFIG.sizes.body)
    this.pdf.setFont(FONT_CONFIG.primary, "normal")
    this.pdf.text("Sürdürülebilir Gelecek İçin", this.pageWidth / 2, 45, { align: "center" })

    // Main title section
    this.currentY = 90
    this.pdf.setFontSize(FONT_CONFIG.sizes.title)
    this.pdf.setTextColor(...COLORS.primary)
    this.pdf.text("Yeşil Dönüşüm Raporu", this.pageWidth / 2, this.currentY, { align: "center" })

    this.currentY += 15
    this.pdf.setFontSize(FONT_CONFIG.sizes.heading2)
    this.pdf.setTextColor(...COLORS.text.primary)
    this.pdf.text("Kapsamlı Sürdürülebilirlik Değerlendirmesi", this.pageWidth / 2, this.currentY, { align: "center" })

    // Scenario info card
    this.currentY += 30
    const cardY = this.currentY
    const cardHeight = 40

    this.pdf.setFillColor(...COLORS.background.light)
    this.pdf.setDrawColor(...COLORS.primary)
    this.pdf.setLineWidth(1)
    this.pdf.roundedRect(this.margin + 20, cardY, this.pageWidth - 2 * this.margin - 40, cardHeight, 5, 5, "FD")

    this.pdf.setFontSize(FONT_CONFIG.sizes.heading2)
    this.pdf.setFont(FONT_CONFIG.primary, "bold")
    this.pdf.setTextColor(...COLORS.primary)
    this.pdf.text(`Profil: ${scenario.name}`, this.pageWidth / 2, cardY + 15, { align: "center" })

    this.pdf.setFontSize(FONT_CONFIG.sizes.body)
    this.pdf.setFont(FONT_CONFIG.primary, "normal")
    this.pdf.setTextColor(...COLORS.text.secondary)
    this.pdf.text(scenario.description, this.pageWidth / 2, cardY + 25, { align: "center" })

    // Score highlight with modern design
    this.currentY += 70
    const scoreBoxY = this.currentY

    // Score circle background
    this.pdf.setFillColor(...COLORS.success)
    this.pdf.circle(this.pageWidth / 2, scoreBoxY + 20, 25, "F")

    // Score text
    this.pdf.setFontSize(FONT_CONFIG.sizes.title + 4)
    this.pdf.setFont(FONT_CONFIG.primary, "bold")
    this.pdf.setTextColor(...COLORS.text.white)
    this.pdf.text(`${scenario.overallScore}`, this.pageWidth / 2, scoreBoxY + 25, { align: "center" })

    this.pdf.setFontSize(FONT_CONFIG.sizes.body)
    this.pdf.text("/ 100", this.pageWidth / 2, scoreBoxY + 32, { align: "center" })

    this.pdf.setFontSize(FONT_CONFIG.sizes.heading3)
    this.pdf.setTextColor(...COLORS.text.primary)
    this.pdf.text("Genel Sürdürülebilirlik Puanı", this.pageWidth / 2, scoreBoxY + 55, { align: "center" })

    // Footer with date and branding
    this.currentY = this.pageHeight - 50
    this.pdf.setDrawColor(...COLORS.text.light)
    this.pdf.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY)

    this.currentY += 10
    this.pdf.setFontSize(FONT_CONFIG.sizes.body)
    this.pdf.setTextColor(...COLORS.text.secondary)
    this.pdf.text(
      `Rapor Tarihi: ${new Date().toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`,
      this.pageWidth / 2,
      this.currentY,
      { align: "center" },
    )

    this.currentY += 15
    this.pdf.setFontSize(FONT_CONFIG.sizes.caption)
    this.pdf.text(
      "Bu rapor EKOTON Sürdürülebilirlik Platformu tarafından oluşturulmuştur.",
      this.pageWidth / 2,
      this.currentY,
      { align: "center" },
    )

    this.currentY += 8
    this.pdf.setFontSize(FONT_CONFIG.sizes.caption)
    this.pdf.text("Tüm hakları saklıdır. © 2024 EKOTON", this.pageWidth / 2, this.currentY, { align: "center" })
  }

  // Continue with other methods using the same modern styling approach...
  // (The rest of the methods would follow the same pattern with enhanced styling)

  private addTableOfContents() {
    this.addTitle("İÇİNDEKİLER", 1, COLORS.primary)

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

    this.currentY += 10

    contents.forEach((item, index) => {
      this.addNewPageIfNeeded(12)

      // Add section number styling
      this.pdf.setFillColor(...COLORS.primary)
      this.pdf.circle(this.margin + 5, this.currentY - 2, 3, "F")

      this.pdf.setFontSize(FONT_CONFIG.sizes.body)
      this.pdf.setFont(FONT_CONFIG.primary, "normal")
      this.pdf.setTextColor(...COLORS.text.primary)
      this.pdf.text(item.title, this.margin + 15, this.currentY)

      // Dotted line
      const dotsStart = this.margin + 15 + this.pdf.getTextWidth(item.title) + 5
      const dotsEnd = this.pageWidth - this.margin - 20
      const dotCount = Math.floor((dotsEnd - dotsStart) / 3)

      this.pdf.setTextColor(...COLORS.text.light)
      for (let i = 0; i < dotCount; i++) {
        this.pdf.text(".", dotsStart + i * 3, this.currentY)
      }

      this.pdf.setTextColor(...COLORS.text.primary)
      this.pdf.text(item.page, this.pageWidth - this.margin - 10, this.currentY)

      this.currentY += 12
    })
  }

  private addExecutiveSummary(scenario: ScenarioData, report: ScenarioReport) {
    this.addTitle("1. YÖNETİCİ ÖZETİ", 1, COLORS.primary)

    // Executive summary in a styled box
    this.addInfoBox("Özet", report.executiveSummary, COLORS.secondary, "📊")

    this.currentY += 10
    this.addSubtitle("Temel Bulgular", FONT_CONFIG.sizes.heading3, COLORS.primary)

    const findings = [
      "Organizasyonunuz sürdürülebilirlik yolculuğunda önemli potansiyele sahiptir",
      "Mevcut güçlü yönleriniz üzerine inşa edilebilir bir gelişim planı önerilmektedir",
      "Önerilen yatırımlar orta vadede önemli tasarruflar sağlayacaktır",
      "Risk yönetimi ile birlikte sürdürülebilir büyüme mümkündür",
    ]

    findings.forEach((finding) => {
      this.addBulletPoint(finding, FONT_CONFIG.sizes.body, 5, COLORS.success)
    })

    // Add key metrics cards
    this.currentY += 15
    this.addSubtitle("Temel Metrikler", FONT_CONFIG.sizes.heading3, COLORS.primary)

    // Create a row of stat cards
    const startY = this.currentY
    this.addStatCard("Genel Puan", `${scenario.overallScore}/100`, "Sürdürülebilirlik", COLORS.primary)

    // Move to next card position
    const cardWidth = (this.pageWidth - 2 * this.margin - 20) / 3
    this.pdf.setFillColor(...COLORS.background.light)
    this.pdf.setDrawColor(...COLORS.text.light)
    this.pdf.roundedRect(this.margin + cardWidth + 10, startY, cardWidth, 25, 2, 2, "FD")

    this.pdf.setFontSize(FONT_CONFIG.sizes.title)
    this.pdf.setFont(FONT_CONFIG.primary, "bold")
    this.pdf.setTextColor(...COLORS.secondary)
    this.pdf.text(
      `${scenario.assessmentData.filter((item) => item.status === "good").length}`,
      this.margin + cardWidth + 10 + cardWidth / 2,
      startY + 12,
      { align: "center" },
    )

    this.pdf.setFontSize(FONT_CONFIG.sizes.caption)
    this.pdf.setFont(FONT_CONFIG.primary, "bold")
    this.pdf.setTextColor(...COLORS.text.primary)
    this.pdf.text("Güçlü Alan", this.margin + cardWidth + 10 + cardWidth / 2, startY + 18, { align: "center" })

    this.pdf.setFontSize(FONT_CONFIG.sizes.small)
    this.pdf.setTextColor(...COLORS.text.secondary)
    this.pdf.text("Kategori", this.margin + cardWidth + 10 + cardWidth / 2, startY + 22, { align: "center" })

    // Third card
    this.pdf.setFillColor(...COLORS.background.light)
    this.pdf.setDrawColor(...COLORS.text.light)
    this.pdf.roundedRect(this.margin + 2 * (cardWidth + 10), startY, cardWidth, 25, 2, 2, "FD")

    this.pdf.setFontSize(FONT_CONFIG.sizes.title)
    this.pdf.setFont(FONT_CONFIG.primary, "bold")
    this.pdf.setTextColor(...COLORS.accent)
    this.pdf.text(
      `${scenario.actionPlan.shortTerm.length + scenario.actionPlan.mediumTerm.length + scenario.actionPlan.longTerm.length}`,
      this.margin + 2 * (cardWidth + 10) + cardWidth / 2,
      startY + 12,
      { align: "center" },
    )

    this.pdf.setFontSize(FONT_CONFIG.sizes.caption)
    this.pdf.setFont(FONT_CONFIG.primary, "bold")
    this.pdf.setTextColor(...COLORS.text.primary)
    this.pdf.text("Eylem Önerisi", this.margin + 2 * (cardWidth + 10) + cardWidth / 2, startY + 18, { align: "center" })

    this.pdf.setFontSize(FONT_CONFIG.sizes.small)
    this.pdf.setTextColor(...COLORS.text.secondary)
    this.pdf.text("Toplam", this.margin + 2 * (cardWidth + 10) + cardWidth / 2, startY + 22, { align: "center" })

    this.currentY = startY + 35
  }

  // Add the remaining methods with similar styling improvements...
  // (I'll continue with a few key methods to show the pattern)

  private addCurrentStatusAnalysis(scenario: ScenarioData, report: ScenarioReport) {
    this.addTitle("2. MEVCUT DURUM ANALİZİ", 1, COLORS.primary)

    this.addSubtitle("Genel Değerlendirme", 2, COLORS.secondary)
    this.addText(report.currentStatusNarrative, FONT_CONFIG.sizes.body, 0, true)

    this.currentY += 10
    this.addInfoBox("Güçlü Yönler", report.strengthsAnalysis, COLORS.success, "✓")

    this.currentY += 5
    this.addInfoBox("Gelişim Alanları", report.challengesAnalysis, COLORS.warning, "⚠")

    // Performance table with enhanced styling
    this.currentY += 10
    const headers = ["Kategori", "Mevcut Puan", "Durum", "Öncelik"]
    const rows = scenario.assessmentData.map((item) => [
      item.category,
      `${item.score}/100`,
      item.status === "good" ? "Güçlü" : item.status === "medium" ? "Orta" : "Zayıf",
      item.score < 50 ? "Yüksek" : item.score < 70 ? "Orta" : "Düşük",
    ])

    this.addStyledTable(headers, rows, "Kategori Bazında Performans", COLORS.primary)
  }

  private async addDevelopmentPlan(report: ScenarioReport) {
    this.addTitle("3. GELİŞİM PLANI", 1, COLORS.primary)

    // Phase 1 with modern styling
    this.addPhaseSection(report.developmentPlan.phase1, 1, COLORS.success)

    // Phase 2
    this.addPhaseSection(report.developmentPlan.phase2, 2, COLORS.secondary)

    // Phase 3
    this.addPhaseSection(report.developmentPlan.phase3, 3, COLORS.accent)
  }

  private addPhaseSection(phase: any, phaseNumber: number, color: number[]) {
    // Phase header with colored background
    this.addNewPageIfNeeded(40)

    const headerY = this.currentY
    this.pdf.setFillColor(color[0], color[1], color[2])
    this.pdf.roundedRect(this.margin, headerY, this.pageWidth - 2 * this.margin, 15, 3, 3, "F")

    // Phase number circle
    this.pdf.setFillColor(...COLORS.text.white)
    this.pdf.circle(this.margin + 10, headerY + 7.5, 5, "F")

    this.pdf.setFontSize(FONT_CONFIG.sizes.heading3)
    this.pdf.setFont(FONT_CONFIG.primary, "bold")
    this.pdf.setTextColor(color[0], color[1], color[2])
    this.pdf.text(phaseNumber.toString(), this.margin + 10, headerY + 10, { align: "center" })

    // Phase title
    this.pdf.setTextColor(...COLORS.text.white)
    this.pdf.text(`Faz ${phaseNumber}: ${phase.title}`, this.margin + 20, headerY + 8)

    // Duration
    this.pdf.setFontSize(FONT_CONFIG.sizes.caption)
    this.pdf.text(phase.duration, this.pageWidth - this.margin - 5, headerY + 8, { align: "right" })

    this.currentY = headerY + 20

    // Description
    this.addText(phase.description, FONT_CONFIG.sizes.body, 0, true)

    this.currentY += 5
    this.addSubtitle("Hedefler:", FONT_CONFIG.sizes.heading3, color)
    phase.objectives.forEach((objective: string) => {
      this.addBulletPoint(objective, FONT_CONFIG.sizes.body, 5, color)
    })

    this.currentY += 5
    this.addSubtitle("Temel Eylemler:", FONT_CONFIG.sizes.heading3, color)
    phase.keyActions.forEach((action: any) => {
      this.addNewPageIfNeeded(25)

      // Action box
      this.pdf.setFillColor(...COLORS.background.accent)
      this.pdf.setDrawColor(...color)
      this.pdf.roundedRect(this.margin + 5, this.currentY, this.pageWidth - 2 * this.margin - 10, 20, 2, 2, "FD")

      this.pdf.setFontSize(FONT_CONFIG.sizes.body)
      this.pdf.setFont(FONT_CONFIG.primary, "bold")
      this.pdf.setTextColor(...COLORS.text.primary)
      this.pdf.text(`• ${action.action}`, this.margin + 10, this.currentY + 6)

      this.pdf.setFontSize(FONT_CONFIG.sizes.caption)
      this.pdf.setFont(FONT_CONFIG.primary, "normal")
      this.pdf.setTextColor(...COLORS.text.secondary)
      this.pdf.text(`Gerekçe: ${action.rationale}`, this.margin + 10, this.currentY + 11)

      this.pdf.setTextColor(color[0], color[1], color[2])
      this.pdf.text(`Sonuç: ${action.expectedOutcome}`, this.margin + 10, this.currentY + 16)

      this.currentY += 25
    })

    this.currentY += 10
  }

  private addInvestmentAnalysis(report: ScenarioReport) {
    this.addTitle("4. YATIRIM ANALİZİ", 1, COLORS.primary)

    // Investment summary with modern cards
    this.addInfoBox(
      "Yatırım Özeti",
      `Toplam Yatırım: ${report.investmentAnalysis.totalInvestment} | ROI: ${report.investmentAnalysis.roi} | Geri Dönüş: ${report.investmentAnalysis.paybackPeriod}`,
      COLORS.success,
      "💰",
    )

    // Investment breakdown with enhanced table
    const headers = ["Kategori", "Tutar", "Oran (%)", "Öncelik"]
    const rows = report.investmentAnalysis.breakdown.map((item) => [
      item.category,
      item.amount,
      `${item.percentage}%`,
      item.percentage > 30 ? "Yüksek" : item.percentage > 15 ? "Orta" : "Düşük",
    ])

    this.addStyledTable(headers, rows, "Yatırım Dağılımı", COLORS.primary)

    this.currentY += 10
    this.addSubtitle("Finansal Projeksiyonlar", 2, COLORS.secondary)

    const projections = [
      `Beklenen Yıllık Tasarruf: ${report.investmentAnalysis.expectedSavings}`,
      `Geri Dönüş Süresi: ${report.investmentAnalysis.paybackPeriod}`,
      `Yatırım Getirisi (ROI): ${report.investmentAnalysis.roi}`,
    ]

    projections.forEach((projection) => {
      this.addBulletPoint(projection, FONT_CONFIG.sizes.body, 5, COLORS.success)
    })
  }

  private addRiskAssessment(report: ScenarioReport) {
    this.currentY += 15
    this.addTitle("5. RİSK DEĞERLENDİRMESİ", 1, COLORS.primary)

    const headers = ["Risk", "Etki", "Olasılık", "Azaltma Stratejisi"]
    const rows = report.riskAssessment.map((risk) => [
      risk.risk,
      risk.impact,
      risk.probability,
      risk.mitigation.substring(0, 50) + "...",
    ])

    this.addStyledTable(headers, rows, "Risk Matrisi", COLORS.danger)

    // Add risk legend
    this.currentY += 10
    this.addSubtitle("Risk Seviyeleri:", FONT_CONFIG.sizes.heading3, COLORS.danger)

    const riskLevels = [
      { level: "Yüksek", color: COLORS.danger, description: "Acil eylem gerektirir" },
      { level: "Orta", color: COLORS.warning, description: "Yakın takip edilmeli" },
      { level: "Düşük", color: COLORS.success, description: "Rutin izleme yeterli" },
    ]

    riskLevels.forEach((risk) => {
      this.addNewPageIfNeeded(8)
      this.pdf.setFillColor(...risk.color)
      this.pdf.circle(this.margin + 5, this.currentY - 2, 2, "F")

      this.pdf.setFontSize(FONT_CONFIG.sizes.body)
      this.pdf.setFont(FONT_CONFIG.primary, "bold")
      this.pdf.setTextColor(...COLORS.text.primary)
      this.pdf.text(`${risk.level}: ${risk.description}`, this.margin + 12, this.currentY)

      this.currentY += 8
    })
  }

  private addImplementationRoadmap(report: ScenarioReport) {
    this.addTitle("6. UYGULAMA YOL HARİTASI", 1, COLORS.primary)

    this.addSubtitle("Paydaş Katılımı", 2, COLORS.secondary)
    report.stakeholderEngagement.forEach((stakeholder) => {
      this.addNewPageIfNeeded(15)

      // Stakeholder card
      this.pdf.setFillColor(...COLORS.background.light)
      this.pdf.setDrawColor(...COLORS.secondary)
      this.pdf.roundedRect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 12, 2, 2, "FD")

      this.pdf.setFontSize(FONT_CONFIG.sizes.body)
      this.pdf.setFont(FONT_CONFIG.primary, "bold")
      this.pdf.setTextColor(...COLORS.text.primary)
      this.pdf.text(`${stakeholder.stakeholder} (${stakeholder.role})`, this.margin + 5, this.currentY + 6)

      this.pdf.setFontSize(FONT_CONFIG.sizes.caption)
      this.pdf.setFont(FONT_CONFIG.primary, "normal")
      this.pdf.setTextColor(...COLORS.text.secondary)
      this.pdf.text(stakeholder.engagement, this.margin + 5, this.currentY + 10)

      this.currentY += 17
    })

    this.currentY += 10
    this.addSubtitle("Sonraki Adımlar", 2, COLORS.secondary)
    report.nextSteps.forEach((step, index) => {
      this.addNewPageIfNeeded(12)

      // Step number circle
      this.pdf.setFillColor(...COLORS.primary)
      this.pdf.circle(this.margin + 8, this.currentY - 2, 4, "F")

      this.pdf.setFontSize(FONT_CONFIG.sizes.caption)
      this.pdf.setFont(FONT_CONFIG.primary, "bold")
      this.pdf.setTextColor(...COLORS.text.white)
      this.pdf.text((index + 1).toString(), this.margin + 8, this.currentY + 1, { align: "center" })

      this.pdf.setFontSize(FONT_CONFIG.sizes.body)
      this.pdf.setTextColor(...COLORS.text.primary)
      this.pdf.text(step, this.margin + 18, this.currentY)

      this.currentY += 12
    })
  }

  private async addChartsSection(scenario: ScenarioData) {
    this.addTitle("7. GRAFİKLER VE GÖRSELLEŞTİRMELER", 1, COLORS.primary)

    // Try to capture charts from the DOM
    await this.addChartFromElement("assessment-bar-chart", "Kategori Bazında Performans")
    await this.addChartFromElement("assessment-radar-chart", "Radar Analizi")
    await this.addChartFromElement("progress-line-chart", "Performans Trendi")

    // Add KPI summary table with enhanced styling
    const kpiHeaders = ["KPI", "Mevcut", "Hedef", "Trend", "Durum"]
    const kpiRows = scenario.kpis.map((kpi) => [
      kpi.title,
      `${kpi.current}${kpi.unit}`,
      `${kpi.target}${kpi.unit}`,
      kpi.trend === "up" ? "↗ Artış" : kpi.trend === "down" ? "↘ Azalış" : "→ Sabit",
      Math.round((kpi.current / kpi.target) * 100) >= 80
        ? "İyi"
        : Math.round((kpi.current / kpi.target) * 100) >= 60
          ? "Orta"
          : "Gelişim Gerekli",
    ])

    this.addStyledTable(kpiHeaders, kpiRows, "Performans Göstergeleri", COLORS.secondary)
  }

  private addAppendices(scenario: ScenarioData, report: ScenarioReport) {
    this.addTitle("8. EKLER", 1, COLORS.primary)

    this.addSubtitle("Ek A: Metodoloji", 2, COLORS.secondary)
    this.addText(
      "Bu rapor YES-TR (Yeşil Ekonomiye Geçiş Türkiye) ve EKOTON kriterlerine göre hazırlanmıştır. Değerlendirme 8 ana kategori altında 100 puan üzerinden yapılmıştır. Puanlama sistemi uluslararası sürdürülebilirlik standartlarına uygun olarak geliştirilmiştir.",
      FONT_CONFIG.sizes.body,
      0,
      true,
    )

    this.currentY += 10
    this.addSubtitle("Ek B: Sertifikasyon Kriterleri", 2, COLORS.secondary)
    this.addText(
      "Sürdürülebilirlik sertifikasyonu için minimum 60/100 puan gereklidir. Her kategori için asgari performans standartları belirlenmiş olup, sürekli iyileştirme yaklaşımı benimsenmiştir.",
      FONT_CONFIG.sizes.body,
      0,
      true,
    )

    this.currentY += 10
    this.addSubtitle("Ek C: Glossary - Terimler Sözlüğü", 2, COLORS.secondary)

    const terms = [
      { term: "ESG", definition: "Çevresel, Sosyal ve Yönetişim (Environmental, Social, Governance)" },
      { term: "KPI", definition: "Anahtar Performans Göstergesi (Key Performance Indicator)" },
      { term: "ROI", definition: "Yatırım Getirisi (Return on Investment)" },
      { term: "CCUS", definition: "Karbon Yakalama, Kullanım ve Depolama" },
    ]

    terms.forEach((term) => {
      this.addText(`${term.term}: ${term.definition}`, FONT_CONFIG.sizes.body, 5)
    })

    this.currentY += 15
    this.addSubtitle("Ek D: İletişim Bilgileri", 2, COLORS.secondary)

    // Contact info in a styled box
    this.addInfoBox(
      "İletişim",
      "EKOTON Sürdürülebilirlik Platformu\nE-posta: info@ekoton.com.tr\nWeb: www.ekoton.com.tr\nTelefon: +90 212 555 0123",
      COLORS.primary,
      "📞",
    )
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
