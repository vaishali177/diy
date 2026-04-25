import { jsPDF } from 'jspdf'
import 'svg2pdf.js'

export type PaperSize = 'A4' | 'US_LETTER'

const SIZES = {
  'A4': { w: 210, h: 297 },
  'US_LETTER': { w: 215.9, h: 279.4 }
}

export function calculateGrid(totalWidthMm: number, totalHeightMm: number, paperSize: PaperSize) {
  const paper = SIZES[paperSize]
  const overlap = 15 // 15mm overlap for taping
  const printMargin = 10 // 10mm unprintable border assumed on standard home printers

  const usableW = paper.w - (printMargin * 2)
  const usableH = paper.h - (printMargin * 2)

  const stepW = usableW - overlap
  const stepH = usableH - overlap

  const cols = Math.ceil(totalWidthMm / stepW)
  const rows = Math.ceil(totalHeightMm / stepH)

  return { cols, rows, totalPages: cols * rows, stepW, stepH, usableW, usableH, paper, printMargin, overlap }
}

export async function generatePDF(
  svgString: string, 
  totalWidthMm: number, 
  totalHeightMm: number, 
  paperSize: PaperSize,
  patternName: string = "Pattern"
) {
  const grid = calculateGrid(totalWidthMm, totalHeightMm, paperSize)
  
  // Parse the SVG string into a real DOM element for svg2pdf
  const parser = new DOMParser()
  const svgDoc = parser.parseFromString(svgString, 'image/svg+xml')
  const svgElement = svgDoc.documentElement as unknown as HTMLElement

  // Initialize PDF
  // We use the exact paper dimensions in millimeters
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: paperSize === 'A4' ? 'a4' : 'letter'
  })

  let pageNum = 1

  for (let r = 0; r < grid.rows; r++) {
    for (let c = 0; c < grid.cols; c++) {
      if (pageNum > 1) {
        doc.addPage()
      }

      const offsetX = c * grid.stepW
      const offsetY = r * grid.stepH

      // Calculate the bounding box for this tile inside the physical paper.
      // We offset the SVG by (-offsetX, -offsetY) and place it starting at the printMargin
      const xPos = grid.printMargin - offsetX
      const yPos = grid.printMargin - offsetY

      // Draw the vector SVG natively into the PDF
      // The viewBox and clipping are handled by the width/height parameters
      await doc.svg(svgElement, {
        x: xPos,
        y: yPos,
        width: totalWidthMm,
        height: totalHeightMm
      })

      // -- Draw Overlap Shading (Light Grey Boxes) --
      doc.setFillColor(240, 240, 240)
      
      // Right overlap (if not last col)
      if (c < grid.cols - 1) {
        doc.rect(grid.printMargin + grid.stepW, grid.printMargin, grid.overlap, grid.usableH, 'F')
      }
      // Bottom overlap (if not last row)
      if (r < grid.rows - 1) {
        doc.rect(grid.printMargin, grid.printMargin + grid.stepH, grid.usableW, grid.overlap, 'F')
      }

      // -- Draw Alignment Marks (Crosshairs in the overlap zones) --
      doc.setDrawColor(150, 150, 150)
      doc.setLineWidth(0.5)

      const drawCrosshair = (x: number, y: number) => {
        doc.line(x - 5, y, x + 5, y)
        doc.line(x, y - 5, x, y + 5)
      }

      // Top-Left corner of the usable area
      drawCrosshair(grid.printMargin, grid.printMargin)
      // Top-Right
      drawCrosshair(grid.printMargin + grid.stepW, grid.printMargin)
      // Bottom-Left
      drawCrosshair(grid.printMargin, grid.printMargin + grid.stepH)
      // Bottom-Right
      drawCrosshair(grid.printMargin + grid.stepW, grid.printMargin + grid.stepH)

      // -- Draw Page Text Info --
      doc.setTextColor(100, 100, 100)
      doc.setFontSize(10)
      
      // Top left identifier
      doc.text(`${patternName} - Page ${pageNum} of ${grid.totalPages}`, grid.printMargin + 5, grid.printMargin + 10)
      
      // Grid coordinate (e.g., "Row 1, Col 2")
      doc.setFontSize(8)
      doc.text(`Row ${r + 1}, Col ${c + 1}`, grid.printMargin + 5, grid.printMargin + 15)

      // Cut here arrows
      doc.setFontSize(7)
      if (c < grid.cols - 1) {
        doc.text(`Match to Row ${r + 1}, Col ${c + 2} ->`, grid.printMargin + grid.stepW - 35, grid.printMargin + grid.stepH / 2)
      }
      if (r < grid.rows - 1) {
        doc.text(`Match to Row ${r + 2}, Col ${c + 1} \u2193`, grid.printMargin + grid.stepW / 2 - 20, grid.printMargin + grid.stepH - 2)
      }

      // -- Draw the 10x10mm Test Square on Page 1 --
      if (r === 0 && c === 0) {
        doc.setDrawColor(0, 0, 0)
        doc.setLineWidth(0.5)
        const testX = grid.printMargin + 10
        const testY = grid.printMargin + 30
        doc.rect(testX, testY, 10, 10, 'S') // 10x10mm square
        doc.setFontSize(7)
        doc.text("Test Square", testX, testY - 2)
        doc.text("10mm x 10mm", testX, testY + 14)
        doc.text("Verify this is exact", testX, testY + 18)
      }

      // Draw a solid border around the printable tile so users know the bounds
      doc.setDrawColor(200, 200, 200)
      doc.setLineWidth(0.2)
      doc.rect(grid.printMargin, grid.printMargin, grid.usableW, grid.usableH, 'S')

      pageNum++
    }
  }

  doc.save(`${patternName.replace(/\s+/g, '-').toLowerCase()}-pattern.pdf`)
}
