import puppeteer from "puppeteer"
import { readFileSync } from "fs"
import { join } from "path"

// User level to template mapping
const USER_LEVEL_TEMPLATES = {
  baslangicseviyesi: "baslangicseviyesi.html",
  karmaprofil: "karmaprofil.html",
  ortaseviye: "ortaseviye.html",
  ileriseviye: "ileriseviye.html",
} as const

type UserLevel = keyof typeof USER_LEVEL_TEMPLATES

export function getUserLevel(score: number): UserLevel {
  if (score >= 80) return "ileriseviye"
  if (score >= 65) return "ortaseviye"
  if (score >= 50) return "karmaprofil"
  return "baslangicseviyesi"
}

export function getUserLevelName(level: UserLevel): string {
  const names = {
    baslangicseviyesi: "Başlangıç Seviyesi",
    karmaprofil: "Karma Profil",
    ortaseviye: "Orta Seviye",
    ileriseviye: "İleri Seviye",
  }
  return names[level]
}

export class HTMLToPDFGenerator {
  private async loadTemplate(userLevel: UserLevel): Promise<string> {
    try {
      const templatePath = join(process.cwd(), "public", "templates", USER_LEVEL_TEMPLATES[userLevel])
      return readFileSync(templatePath, "utf-8")
    } catch (error) {
      console.error("Error loading template:", error)
      throw new Error(`Template not found for user level: ${userLevel}`)
    }
  }

  private replaceTemplatePlaceholders(html: string, data: any): string {
    // Replace dynamic content placeholders
    let processedHtml = html

    // Replace score in circle
    processedHtml = processedHtml.replace(
      /<div class="circle">(\d+)<\/div>/g,
      `<div class="circle">${data.overallScore}</div>`,
    )

    // Replace report date
    const currentDate = new Date().toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    processedHtml = processedHtml.replace(/Rapor Tarihi: [^<]+/g, `Rapor Tarihi: ${currentDate}`)

    return processedHtml
  }

  async generatePDF(userLevel: UserLevel, scenarioData: any): Promise<Buffer> {
    let browser

    try {
      // Load HTML template
      const htmlTemplate = await this.loadTemplate(userLevel)
      const processedHtml = this.replaceTemplatePlaceholders(htmlTemplate, scenarioData)

      // Launch Puppeteer
      browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      })

      const page = await browser.newPage()

      // Set content with UTF-8 encoding
      await page.setContent(processedHtml, {
        waitUntil: "networkidle0",
      })

      // Generate PDF with professional settings
      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "20mm",
          right: "15mm",
          bottom: "20mm",
          left: "15mm",
        },
        displayHeaderFooter: true,
        headerTemplate: `
          <div style="font-size: 10px; color: #666; width: 100%; text-align: center; margin-top: 10px;">
            EKOTON Sürdürülebilirlik Platformu
          </div>
        `,
        footerTemplate: `
          <div style="font-size: 10px; color: #666; width: 100%; text-align: center; margin-bottom: 10px;">
            <span class="pageNumber"></span> / <span class="totalPages"></span>
          </div>
        `,
      })

      return pdfBuffer
    } catch (error) {
      console.error("PDF generation error:", error)
      throw new Error("PDF generation failed")
    } finally {
      if (browser) {
        await browser.close()
      }
    }
  }

  async generateLevelBasedPDF(scenarioData: any): Promise<{
    buffer: Buffer
    filename: string
    userLevel: UserLevel
  }> {
    const userLevel = getUserLevel(scenarioData.overallScore)
    const buffer = await this.generatePDF(userLevel, scenarioData)

    const timestamp = new Date().toISOString().split("T")[0]
    const filename = `EKOTON-${getUserLevelName(userLevel).replace(/\s+/g, "-")}-${timestamp}.pdf`

    return {
      buffer,
      filename,
      userLevel,
    }
  }
}
