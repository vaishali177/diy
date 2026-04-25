'use client'

import { useState } from 'react'
import SaveBookmarkButton from '@/components/SaveBookmarkButton'
import { generatePDF, calculateGrid, PaperSize } from '@/utils/pdfGenerator'

const COLORS = {
  bg: '#1e2d34',
  sidebar: '#12201f',
  card: '#162420',
  border: 'rgba(214, 227, 223, 0.1)',
  sage: '#d6e3df',
  amber: '#d07023',
  muted: 'rgba(214, 227, 223, 0.6)',
  text: '#d6e3df',
  faint: 'rgba(214, 227, 223, 0.1)',
}

const FISH_RATIOS = {
  body_l:  1.0, 
  body_w:  0.45,
  tail_l:  0.25,
  tail_w:  0.30,
  fin_l:   0.15,
  fin_w:   0.10,
}

function round1(n: number) { return Math.round(n * 10) / 10 }

function calcPieces(length: number, seam: number) {
  const s = seam * 2
  return {
    body: { w: round1(length * FISH_RATIOS.body_l + s), h: round1(length * FISH_RATIOS.body_w + s), qty: 2, label: 'Main Body', color: '#2d5c4e' },
    tail: { w: round1(length * FISH_RATIOS.tail_l + s), h: round1(length * FISH_RATIOS.tail_w + s), qty: 2, label: 'Tail Fin', color: '#3a6b5a' },
    fin:  { w: round1(length * FISH_RATIOS.fin_l + s),  h: round1(length * FISH_RATIOS.fin_w + s), qty: 4, label: 'Side Fin', color: '#163830' },
  }
}

function calcMaterials(length: number, seam: number, fabricMult: number) {
  const p = calcPieces(length, seam)
  const totalH = Object.values(p).reduce((a, piece) => a + piece.h * (piece.qty / 2), 0)
  const fabricLen = Math.round(totalH * fabricMult * 1.1)
  const stuffing  = Math.round(Math.pow(length / 25, 3) * 60)
  const eyes      = length <= 20 ? 9 : length <= 40 ? 12 : 18
  const thread    = Math.round(length * 2.5)
  return { fabricLen, stuffing, eyes, thread }
}

// Generates the raw physical MM vector string for PDF parsing
function generateFishPatternSVG(length: number, seam: number) {
  const pieces = calcPieces(length, seam);
  const FABRIC_W_MM = 450; // standard 45cm fabric width in mm
  const PAD_MM = 10;

  const layout: any[] = [];
  let x = PAD_MM, y = PAD_MM, rowH = 0;
  
  Object.values(pieces).forEach((piece) => {
    const boxes = Math.ceil(piece.qty / 2);
    for (let i = 0; i < boxes; i++) {
      const pw = piece.w * 10; // convert cm to mm
      const ph = piece.h * 10;
      if (x + pw > FABRIC_W_MM - PAD_MM) {
        x = PAD_MM; y += rowH + PAD_MM; rowH = 0;
      }
      layout.push({ ...piece, x, y, pw, ph });
      x += pw + PAD_MM;
      if (ph > rowH) rowH = ph;
    }
  });

  const totalH = y + rowH + PAD_MM * 2;
  const totalW = FABRIC_W_MM;

  // Build the SVG string manually with hardcoded hex values (no CSS vars!)
  let svgContent = '';
  
  // Fabric bounds
  svgContent += `<rect x="0" y="0" width="${totalW}" height="${totalH}" fill="#ffffff" />`;
  svgContent += `<line x1="${PAD_MM}" y1="5" x2="${totalW - PAD_MM}" y2="5" stroke="#d07023" stroke-width="1" stroke-dasharray="10 5" />`;
  svgContent += `<text x="${PAD_MM + 5}" y="15" font-size="8" fill="#d07023" font-family="monospace">FOLD / SELVAGE EDGE</text>`;

  layout.forEach(p => {
    const { x, y, pw: w, ph: h, label } = p;
    const cx = x + w / 2;
    const cy = y + h / 2;
    const inset = seam * 10; // seam in mm
    
    let d = '';
    if (label === 'Main Body') {
      d = `M ${x} ${cy} C ${x+w*0.3} ${y}, ${x+w*0.7} ${y}, ${x+w} ${cy} C ${x+w*0.7} ${y+h}, ${x+w*0.3} ${y+h}, ${x} ${cy} Z`;
    } else if (label === 'Tail Fin') {
      d = `M ${x} ${cy} L ${x+w} ${y} L ${x+w*0.7} ${cy} L ${x+w} ${y+h} Z`;
    } else {
      d = `M ${x} ${cy} C ${cx} ${y}, ${x+w} ${y+h*0.3}, ${x+w} ${y+h} L ${x} ${y+h} Z`;
    }

    const scaleX = w > 0 ? (w - inset * 2) / w : 0;
    const scaleY = h > 0 ? (h - inset * 2) / h : 0;
    const tr = `translate(${cx}, ${cy}) scale(${scaleX > 0 ? scaleX : 0}, ${scaleY > 0 ? scaleY : 0}) translate(${-cx}, ${-cy})`;

    // Solid outer line (cut line)
    svgContent += `<path d="${d}" fill="none" stroke="#000000" stroke-width="1.5" />`;
    
    // Dashed inner line (seam line)
    if (scaleX > 0 && scaleY > 0) {
      svgContent += `<path d="${d}" fill="none" stroke="#666666" stroke-width="0.8" stroke-dasharray="4 2" transform="${tr}" />`;
    }
    
    // Text labels
    svgContent += `<text x="${cx}" y="${cy}" text-anchor="middle" font-size="12" font-weight="bold" fill="#000000">${label}</text>`;
    svgContent += `<text x="${cx}" y="${cy + 15}" text-anchor="middle" font-size="9" fill="#000000">Cut ${p.qty}</text>`;
  });

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}mm" height="${totalH}mm" viewBox="0 0 ${totalW} ${totalH}">${svgContent}</svg>`;
  
  return { svgString, totalW, totalH };
}

function PatternDiagram({ length, seam }: { length: number, seam: number }) {
  const pieces = calcPieces(length, seam)
  const FABRIC_W_CM = 45
  const SCALE = 200 / FABRIC_W_CM
  const PAD = 6

  const layout: any[] = []
  let x = PAD, y = PAD, rowH = 0
  Object.values(pieces).forEach((piece) => {
    const boxes = Math.ceil(piece.qty / 2)
    for (let i = 0; i < boxes; i++) {
      const pw = piece.w * SCALE
      const ph = piece.h * SCALE
      if (x + pw > FABRIC_W_CM * SCALE - PAD) {
        x = PAD; y += rowH + PAD; rowH = 0
      }
      layout.push({ ...piece, x, y, pw, ph })
      x += pw + PAD
      if (ph > rowH) rowH = ph
    }
  })

  const totalH = y + rowH + PAD * 2
  const svgW = FABRIC_W_CM * SCALE + PAD * 2

  return (
    <svg width="100%" viewBox={`0 0 ${svgW} ${totalH}`} className="bg-[#1a2e28] rounded-xl border border-dashed border-outline-variant/30 w-full">
      {Array.from({ length: Math.ceil(svgW / 20) }).map((_, i) => (
        <line key={i} x1={i * 20} y1={0} x2={i * 20} y2={totalH} stroke={COLORS.faint} strokeWidth="0.4" strokeDasharray="2 4" strokeOpacity="1" />
      ))}
      <line x1={PAD} y1={2} x2={svgW - PAD} y2={2} stroke={COLORS.amber} strokeWidth="1" strokeDasharray="6 3" />
      <text x={PAD + 4} y={10} fontSize="7" fill={COLORS.amber} fontFamily="monospace">FOLD / SELVAGE EDGE</text>

      {layout.map((p, i) => {
        const { x, y, pw: w, ph: h, label, color, qty } = p;
        const cx = x + w / 2;
        const cy = y + h / 2;
        const inset = seam * SCALE;
        
        let d = '';
        if (label === 'Main Body') {
          // Pointed ellipse for a fish body
          d = `M ${x} ${cy} C ${x+w*0.3} ${y}, ${x+w*0.7} ${y}, ${x+w} ${cy} C ${x+w*0.7} ${y+h}, ${x+w*0.3} ${y+h}, ${x} ${cy} Z`;
        } else if (label === 'Tail Fin') {
          // Classic tail shape (V at the back)
          d = `M ${x} ${cy} L ${x+w} ${y} L ${x+w*0.7} ${cy} L ${x+w} ${y+h} Z`;
        } else {
          // Standard fin
          d = `M ${x} ${cy} C ${cx} ${y}, ${x+w} ${y+h*0.3}, ${x+w} ${y+h} L ${x} ${y+h} Z`;
        }

        const scaleX = w > 0 ? (w - inset * 2) / w : 0;
        const scaleY = h > 0 ? (h - inset * 2) / h : 0;
        const tr = `translate(${cx}, ${cy}) scale(${scaleX > 0 ? scaleX : 0}, ${scaleY > 0 ? scaleY : 0}) translate(${-cx}, ${-cy})`;

        return (
          <g key={i}>
            <path d={d} fill={color} stroke={COLORS.sage} strokeWidth="1" />
            {scaleX > 0 && scaleY > 0 && (
              <path d={d} fill="none" stroke={COLORS.sage} strokeWidth="0.6" strokeDasharray="3 2" style={{ opacity: 0.5 }} transform={tr} />
            )}
            <text x={cx} y={cy} textAnchor="middle" fontSize="8" fontWeight="600" fill={COLORS.sage}>
              {label}
            </text>
            <text x={cx} y={cy + 10} textAnchor="middle" fontSize="6.5" fill={COLORS.sage} fillOpacity="0.7">
              {p.w}×{p.h}
            </text>
          </g>
        );
      })}
    </svg>
  )
}

function FishPreview({ l }: { l: number }) {
  const scale = Math.min(l / 40, 2.0)
  const s = scale
  return (
    <svg width={100 * s} height={60 * s} viewBox="0 0 100 60" className="block mx-auto">
      {/* Body */}
      <path d="M 20 30 C 40 10, 70 10, 90 30 C 70 50, 40 50, 20 30 Z" fill={COLORS.faint} />
      {/* Tail */}
      <path d="M 25 30 L 5 15 L 15 30 L 5 45 Z" fill={COLORS.faint} />
      {/* Top Fin */}
      <path d="M 50 15 C 60 5, 70 15, 75 20 L 50 20 Z" fill={COLORS.faint} />
      {/* Side Fin */}
      <path d="M 60 30 C 65 35, 70 40, 55 42 Z" fill="#2d5c4e" fillOpacity="0.8" />
      {/* Eye */}
      <circle cx="80" cy="27" r="3" fill="#2d5c4e" />
      <circle cx="81" cy="26" r="1" fill={COLORS.bg} />
    </svg>
  )
}

export default function FishCalculator() {
  const [length, setLength]   = useState(40)
  const [seam, setSeam]       = useState(1)
  const [fabric, setFabric]   = useState(1.08) // Cotton is great for simple fish
  const [activeTab, setActiveTab] = useState<'pieces' | 'pattern' | 'steps'>('pieces')
  
  const [paperSize, setPaperSize] = useState<PaperSize>('A4')
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  const pieces    = calcPieces(length, seam)
  const materials = calcMaterials(length, seam, fabric)
  
  const patternData = generateFishPatternSVG(length, seam)
  const gridPreview = calculateGrid(patternData.totalW, patternData.totalH, paperSize)

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true)
    try {
      await generatePDF(patternData.svgString, patternData.totalW, patternData.totalH, paperSize, 'Fish Plushie')
    } catch(err) {
      alert("Error generating PDF")
      console.error(err)
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  return (
    <div className="w-full text-on-surface">
      <div className="mb-10">
        <div className="text-[11px] text-tertiary tracking-[0.1em] uppercase mb-1">
          Pattern Calculator
        </div>
        <h1 className="font-serif text-4xl font-medium m-0 text-inverse-surface">
          Simple Fish Plushie
        </h1>
        <p className="text-on-surface/60 mt-3 text-[14px]">
          Enter your desired length from nose to tail to get exact fabric cuts and templates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
        <div className="flex flex-col gap-4">
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-5 text-center shadow-sm">
            <FishPreview l={length} />
            <div className="mt-4 text-[22px] font-medium text-inverse-surface">{length} cm</div>
            <div className="text-[11px] text-on-surface/60 uppercase tracking-widest mt-0.5">total length</div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-4 shadow-sm">
            <div className="mb-4">
              <label className="text-[11px] text-on-surface/60 uppercase tracking-widest mb-2 block">Desired length</label>
              <div className="flex items-center gap-2">
                <input type="range" min={15} max={100} value={length} step={1}
                  onChange={e => setLength(+e.target.value)}
                  className="flex-1 accent-primary" />
                <input type="number" min={15} max={100} value={length}
                  onChange={e => setLength(Math.min(100, Math.max(15, +e.target.value)))}
                  className="w-16 p-2 bg-surface-container border border-outline-variant/10 rounded-lg text-center text-[13px] outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all" />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-[11px] text-on-surface/60 uppercase tracking-widest mb-2 block">Seam allowance</label>
              <select value={seam} onChange={e => setSeam(+e.target.value)} 
                className="w-full p-2 bg-surface-container border border-outline-variant/10 rounded-lg text-sm outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all">
                <option value={0.5}>0.5 cm</option>
                <option value={1}>1.0 cm</option>
              </select>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-4 shadow-sm">
             <div className="flex justify-between items-center mb-3">
               <div className="text-[11px] font-semibold text-tertiary uppercase tracking-[0.06em]">Materials</div>
               <SaveBookmarkButton itemType="calculation" referenceId="fish" metadata={{ length, seam, fabric }} label="Save" />
             </div>
             <div className="text-[15px] font-semibold text-primary">{materials.fabricLen} cm fabric</div>
             <div className="text-[13px] text-on-surface/60">{materials.stuffing}g stuffing</div>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full bg-clip-padding">
          <div className="flex border-b border-outline-variant/10 overflow-x-auto bg-surface/50">
            {['pieces', 'pattern'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab as any)}
                className={`py-3.5 px-5 text-[13px] transition-colors whitespace-nowrap outline-none flex-1 border-b-[2px] capitalize
                  ${activeTab === tab ? 'bg-surface-container-low text-primary border-primary font-medium' : 'text-on-surface/60 border-transparent hover:text-on-surface'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8 overflow-y-auto">
            {activeTab === 'pieces' && (
              <div className="animate-in fade-in duration-300">
                <table className="w-full text-left border-collapse text-[13px]">
                  <thead>
                    <tr className="border-b border-outline-variant/10">
                      {['Piece', 'W × H', 'Qty', 'Notes'].map(h => <th key={h} className="pb-2 text-on-surface/60">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(pieces).map(([key, p]) => (
                      <tr key={key} className="border-b border-outline-variant/5">
                        <td className="py-3 px-2 font-medium">{p.label}</td>
                        <td className="py-3 px-2 text-tertiary">{p.w} × {p.h}</td>
                        <td className="py-3 px-2">×{p.qty}</td>
                        <td className="py-3 px-2 text-on-surface/60">{key === 'body' && 'Cut mirror pairs'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'pattern' && (
              <div className="animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-surface-container-low p-4 rounded-xl border border-outline-variant/20">
                  <div>
                    <h4 className="text-sm font-bold text-inverse-surface mb-1">Printable Vector Pattern</h4>
                    <p className="text-xs text-on-surface/60">
                      Requires {gridPreview.totalPages} sheets of paper ({gridPreview.cols}×{gridPreview.rows} grid).
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-3 sm:mt-0">
                    <select 
                      value={paperSize} 
                      onChange={e => setPaperSize(e.target.value as PaperSize)}
                      className="bg-surface-container border border-outline-variant/20 rounded-md text-xs p-2.5 outline-none font-medium text-inverse-surface cursor-pointer"
                    >
                      <option value="A4">A4 Paper</option>
                      <option value="US_LETTER">US Letter</option>
                    </select>
                    <button 
                      onClick={handleDownloadPdf}
                      disabled={isGeneratingPdf}
                      className="bg-primary text-surface-container-lowest px-5 py-2.5 rounded-md text-xs font-bold tracking-widest uppercase hover:bg-primary/90 transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
                    >
                      {isGeneratingPdf ? 'Generating...' : 'Download PDF'}
                    </button>
                  </div>
                </div>
                <PatternDiagram length={length} seam={seam} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
