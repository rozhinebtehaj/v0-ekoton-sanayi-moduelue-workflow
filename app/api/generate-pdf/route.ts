import { type NextRequest, NextResponse } from "next/server"
import { HTMLToPDFGenerator } from "@/lib/html-pdf-generator"

export async function POST(request: NextRequest) {
  try {
    const { scenarioData, useTemplate } = await request.json()

    if (!scenarioData) {
      return NextResponse.json({ error: "Scenario data is required" }, { status: 400 })
    }

    const generator = new HTMLToPDFGenerator()

    if (useTemplate) {
      // Use HTML template based on user level
      const result = await generator.generateLevelBasedPDF(scenarioData)

      return new NextResponse(result.buffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${result.filename}"`,
          "Content-Length": result.buffer.length.toString(),
        },
      })
    } else {
      // Fallback to enhanced PDF generator if needed
      const { EnhancedPDFGenerator } = await import("@/lib/enhanced-pdf-generator")
      const enhancedGenerator = new EnhancedPDFGenerator()
      const pdfBuffer = await enhancedGenerator.generateComprehensivePDF(scenarioData)

      return new NextResponse(pdfBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="EKOTON-Sustainability-Report.pdf"',
          "Content-Length": pdfBuffer.length.toString(),
        },
      })
    }
  } catch (error) {
    console.error("PDF generation error:", error)
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 })
  }
}
