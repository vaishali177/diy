'use client'

import { useState } from 'react'
import SaveBookmarkButton from '@/components/SaveBookmarkButton'
import { generatePDF, calculateGrid, PaperSize } from '@/utils/pdfGenerator'

// Use Tailwind/theme variable mappings.
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

const BEAR_RATIOS = {
  body_h:  0.50,
  body_w:  0.38,
  head_d:  0.38,
  gusset_l: 0.55,
  gusset_w: 0.16,
  arm_h:   0.30,
  arm_w:   0.14,
  leg_h:   0.28,
  leg_w:   0.16,
  ear_d:   0.12,
}

function round1(n: number) { return Math.round(n * 10) / 10 }

function calcPieces(h: number, seam: number) {
  const s = seam * 2
  return {
    body:  { w: round1(h * BEAR_RATIOS.body_w + s), h: round1(h * BEAR_RATIOS.body_h + s), qty: 2, label: 'Body', color: '#3a6b5a' },
    head:  { w: round1(h * BEAR_RATIOS.head_d + s), h: round1(h * BEAR_RATIOS.head_d + s), qty: 2, label: 'Head', color: '#2d5c4e' },
    gusset:{ w: round1(h * BEAR_RATIOS.gusset_w + s), h: round1(h * BEAR_RATIOS.gusset_l + s), qty: 1, label: 'Gusset', color: '#1f483c' },
    arm:   { w: round1(h * BEAR_RATIOS.arm_w  + s), h: round1(h * BEAR_RATIOS.arm_h  + s), qty: 4, label: 'Arm',  color: '#245044' },
    leg:   { w: round1(h * BEAR_RATIOS.leg_w  + s), h: round1(h * BEAR_RATIOS.leg_h  + s), qty: 4, label: 'Leg',  color: '#1c4438' },
    ear:   { w: round1(h * BEAR_RATIOS.ear_d  + s), h: round1(h * BEAR_RATIOS.ear_d  * 0.8 + s), qty: 4, label: 'Ear', color: '#163830' },
  }
}

function calcMaterials(h: number, seam: number, fabricMult: number) {
  const p = calcPieces(h, seam)
  const totalH = Object.values(p).reduce((a, piece) => a + piece.h * (piece.qty / 2), 0)
  const fabricLen = Math.round(totalH * fabricMult * 1.18)
  const stuffing  = Math.round(Math.pow(h / 25, 3) * 80)
  const eyes      = h <= 15 ? 9 : h <= 25 ? 12 : h <= 35 ? 15 : 18
  const thread    = Math.round(h * 3.5)
  return { fabricLen, stuffing, eyes, thread }
}

// Generates the raw physical MM vector string for PDF parsing
function generateBearPatternSVG(h: number, seam: number) {
  const pieces = calcPieces(h, seam);
  const FABRIC_W_MM = 450;
  const PAD_MM = 10;

  const layout: any[] = [];
  let x = PAD_MM, y = PAD_MM, rowH = 0;
  
  Object.values(pieces).forEach((piece) => {
    const boxes = Math.ceil(piece.qty / 2);
    for (let i = 0; i < boxes; i++) {
      const pw = piece.w * 10;
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

  let svgContent = '';
  
  svgContent += `<rect x="0" y="0" width="${totalW}" height="${totalH}" fill="#ffffff" />`;
  svgContent += `<line x1="${PAD_MM}" y1="5" x2="${totalW - PAD_MM}" y2="5" stroke="#d07023" stroke-width="1" stroke-dasharray="10 5" />`;
  svgContent += `<text x="${PAD_MM + 5}" y="15" font-size="8" fill="#d07023" font-family="monospace">FOLD / SELVAGE EDGE</text>`;

  layout.forEach(p => {
    const { x, y, pw: w, ph: h, label } = p;
    const cx = x + w / 2;
    const cy = y + h / 2;
    const inset = seam * 10;
    
    let d = '';
    if (label === 'Head') {
      d = `M ${cx} ${y} C ${x+w} ${y}, ${x+w} ${y+h*0.6}, ${x+w*0.9} ${y+h*0.8} C ${x+w*0.7} ${y+h}, ${x} ${y+h}, ${x+0.1*w} ${y+h*0.5} C ${x+0.2*w} ${y}, ${cx} ${y}, ${cx} ${y} Z`;
    } else if (label === 'Body') {
      d = `M ${x+w*0.3} ${y+h*0.1} A ${w*0.2} ${h*0.1} 0 0 1 ${x+w*0.7} ${y+h*0.1} C ${x+w} ${y+h*0.5}, ${x+w} ${y+h}, ${cx} ${y+h} C ${x} ${y+h}, ${x} ${y+h*0.5}, ${x+w*0.3} ${y+h*0.1} Z`;
    } else if (label === 'Gusset') {
      d = `M ${cx} ${y} C ${x+w} ${y+h*0.2}, ${x+w} ${y+h*0.8}, ${cx} ${y+h} C ${x} ${y+h*0.8}, ${x} ${y+h*0.2}, ${cx} ${y} Z`;
    } else if (label === 'Arm') {
      d = `M ${x+w*0.2} ${y+h*0.2} A ${w*0.3} ${h*0.2} 0 0 1 ${x+w*0.8} ${y+h*0.2} L ${x+w*0.9} ${y+h*0.8} A ${w*0.4} ${h*0.2} 0 0 1 ${x+w*0.1} ${y+h*0.8} Z`;
    } else if (label === 'Leg') {
      d = `M ${x+w*0.2} ${y+h*0.2} A ${w*0.3} ${h*0.2} 0 0 1 ${x+w*0.8} ${y+h*0.2} L ${x+w} ${y+h*0.9} A ${w*0.5} ${h*0.1} 0 0 1 ${x} ${y+h*0.9} Z`;
    } else if (label === 'Ear') {
      d = `M ${x+w*0.1} ${y+h*0.9} A ${w*0.4} ${h*0.9} 0 0 1 ${x+w*0.9} ${y+h*0.9} Z`;
    } else {
      d = `M ${x} ${y} L ${x+w} ${y} L ${x+w} ${y+h} L ${x} ${y+h} Z`;
    }

    const scaleX = w > 0 ? (w - inset * 2) / w : 0;
    const scaleY = h > 0 ? (h - inset * 2) / h : 0;
    const tr = `translate(${cx}, ${cy}) scale(${scaleX > 0 ? scaleX : 0}, ${scaleY > 0 ? scaleY : 0}) translate(${-cx}, ${-cy})`;

    svgContent += `<path d="${d}" fill="none" stroke="#000000" stroke-width="1.5" />`;
    if (scaleX > 0 && scaleY > 0) {
      svgContent += `<path d="${d}" fill="none" stroke="#666666" stroke-width="0.8" stroke-dasharray="4 2" transform="${tr}" />`;
    }
    
    // Add marks for Teddy Bear
    if (label === 'Head') {
      const ex = x + w * 0.75, ey = y + h * 0.35;
      svgContent += `<line x1="${ex - 2}" y1="${ey - 2}" x2="${ex + 2}" y2="${ey + 2}" stroke="#000000" stroke-width="1.5" />`;
      svgContent += `<line x1="${ex - 2}" y1="${ey + 2}" x2="${ex + 2}" y2="${ey - 2}" stroke="#000000" stroke-width="1.5" />`;
    }
    if (label === 'Body') {
      const ax = x + w * 0.65, ay = y + h * 0.3;
      svgContent += `<circle cx="${ax}" cy="${ay}" r="1.5" fill="#000000" />`;
      const lx = x + w * 0.55, ly = y + h * 0.75;
      svgContent += `<circle cx="${lx}" cy="${ly}" r="1.5" fill="#000000" />`;
    }

    svgContent += `<text x="${cx}" y="${cy}" text-anchor="middle" font-size="12" font-weight="bold" fill="#000000">${label}</text>`;
    svgContent += `<text x="${cx}" y="${cy + 15}" text-anchor="middle" font-size="9" fill="#000000">Cut ${p.qty}</text>`;
  });

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}mm" height="${totalH}mm" viewBox="0 0 ${totalW} ${totalH}">${svgContent}</svg>`;
  
  return { svgString, totalW, totalH };
}

function PatternDiagram({ h, seam }: { h: number, seam: number }) {
  const pieces = calcPieces(h, seam)
  const FABRIC_W_CM = 45
  const SCALE = 200 / FABRIC_W_CM
  const PAD = 6

  const layout: any[] = []
  let x = PAD, y = PAD, rowH = 0
  const allPieces = Object.values(pieces)

  allPieces.forEach((piece) => {
    const boxes = Math.ceil(piece.qty / 2)
    for (let i = 0; i < boxes; i++) {
      const pw = piece.w * SCALE
      const ph = piece.h * SCALE
      if (x + pw > FABRIC_W_CM * SCALE - PAD) {
        x = PAD
        y += rowH + PAD
        rowH = 0
      }
      layout.push({ ...piece, x, y, pw, ph })
      x += pw + PAD
      if (ph > rowH) rowH = ph
    }
  })

  const totalH = y + rowH + PAD * 2
  const svgW = FABRIC_W_CM * SCALE + PAD * 2

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${svgW} ${totalH}`}
      className="bg-[#1a2e28] rounded-xl border border-dashed border-outline-variant/30 w-full"
    >
      {Array.from({ length: Math.ceil(svgW / 20) }).map((_, i) => (
        <line key={i} x1={i * 20} y1={0} x2={i * 20} y2={totalH}
          stroke={COLORS.faint} strokeWidth="0.4" strokeDasharray="2 4" strokeOpacity="1" />
      ))}

      <line x1={PAD} y1={2} x2={svgW - PAD} y2={2}
        stroke={COLORS.amber} strokeWidth="1" strokeDasharray="6 3" />
      <text x={PAD + 4} y={10} fontSize="7" fill={COLORS.amber} fontFamily="monospace">
        FOLD / SELVAGE EDGE
      </text>

      {layout.map((p, i) => {
        const { x, y, pw: w, ph: h, label, color, qty } = p;
        const cx = x + w / 2;
        const cy = y + h / 2;
        const inset = seam * SCALE;
        
        let d = '';
        if (label === 'Head') {
          // Profile head, side view
          d = `M ${cx} ${y}
               C ${x+w} ${y}, ${x+w} ${y+h*0.6}, ${x+w*0.9} ${y+h*0.8}
               C ${x+w*0.7} ${y+h}, ${x} ${y+h}, ${x+0.1*w} ${y+h*0.5}
               C ${x+0.2*w} ${y}, ${cx} ${y}, ${cx} ${y} Z`;
        } else if (label === 'Body') {
          // Profile body (pear shape)
          d = `M ${x+w*0.3} ${y+h*0.1}
               A ${w*0.2} ${h*0.1} 0 0 1 ${x+w*0.7} ${y+h*0.1}
               C ${x+w} ${y+h*0.5}, ${x+w} ${y+h}, ${cx} ${y+h}
               C ${x} ${y+h}, ${x} ${y+h*0.5}, ${x+w*0.3} ${y+h*0.1} Z`;
        } else if (label === 'Gusset') {
          // Surfboard / petal shape for over the head
          d = `M ${cx} ${y}
               C ${x+w} ${y+h*0.2}, ${x+w} ${y+h*0.8}, ${cx} ${y+h}
               C ${x} ${y+h*0.8}, ${x} ${y+h*0.2}, ${cx} ${y} Z`;
        } else if (label === 'Arm') {
          // Capsule: rounded top, slightly wider bottom
          d = `M ${x+w*0.2} ${y+h*0.2}
               A ${w*0.3} ${h*0.2} 0 0 1 ${x+w*0.8} ${y+h*0.2}
               L ${x+w*0.9} ${y+h*0.8}
               A ${w*0.4} ${h*0.2} 0 0 1 ${x+w*0.1} ${y+h*0.8} Z`;
        } else if (label === 'Leg') {
          // Foot: drumstick shape (cap top, wide rounded bottom base)
          d = `M ${x+w*0.2} ${y+h*0.2}
               A ${w*0.3} ${h*0.2} 0 0 1 ${x+w*0.8} ${y+h*0.2}
               L ${x+w} ${y+h*0.9}
               A ${w*0.5} ${h*0.1} 0 0 1 ${x} ${y+h*0.9} Z`;
        } else if (label === 'Ear') {
          // Semi-circle D shape matching the flap edge
          d = `M ${x+w*0.1} ${y+h*0.9} A ${w*0.4} ${h*0.9} 0 0 1 ${x+w*0.9} ${y+h*0.9} Z`;
        } else {
          d = `M ${x} ${y} L ${x+w} ${y} L ${x+w} ${y+h} L ${x} ${y+h} Z`;
        }

        const scaleX = (w - inset * 2) / w;
        const scaleY = (h - inset * 2) / h;
        const tr = `translate(${cx}, ${cy}) scale(${scaleX > 0 ? scaleX : 0}, ${scaleY > 0 ? scaleY : 0}) translate(${-cx}, ${-cy})`;

        return (
          <g key={i}>
            {/* Cut line */}
            <path d={d} fill={color} stroke={COLORS.sage} strokeWidth="1" />
            
            {/* Sew line - inner dashed */}
            {scaleX > 0 && scaleY > 0 && (
              <path d={d} fill="none" stroke={COLORS.sage} strokeWidth="0.6" strokeDasharray="3 2" style={{ opacity: 0.5 }} transform={tr} />
            )}

            {/* Grainline */}
            <g opacity="0.35">
              <line x1={cx} y1={y + h * 0.15} x2={cx} y2={y + h * 0.85} stroke={COLORS.sage} strokeWidth="0.8" strokeDasharray="none" />
              <polyline points={`${cx - 3},${y + h * 0.85 - 4} ${cx},${y + h * 0.85 + 1} ${cx + 3},${y + h * 0.85 - 4}`} fill="none" stroke={COLORS.sage} strokeWidth="0.8" />
              <polyline points={`${cx - 3},${y + h * 0.15 + 4} ${cx},${y + h * 0.15 - 1} ${cx + 3},${y + h * 0.15 + 4}`} fill="none" stroke={COLORS.sage} strokeWidth="0.8" />
            </g>

            {/* Placement marks */}
            {label === 'Head' && (
              <g opacity="0.6">
                {/* Eye dot/cross */}
                <line x1={x + w * 0.75 - 2} y1={y + h * 0.35 - 2} x2={x + w * 0.75 + 2} y2={y + h * 0.35 + 2} stroke={COLORS.bg} strokeWidth="1.5" />
                <line x1={x + w * 0.75 - 2} y1={y + h * 0.35 + 2} x2={x + w * 0.75 + 2} y2={y + h * 0.35 - 2} stroke={COLORS.bg} strokeWidth="1.5" />
              </g>
            )}
            {label === 'Body' && (
              <g opacity="0.6">
                {/* Arm attachment */}
                <circle cx={x + w * 0.65} cy={y + h * 0.3} r="1.5" fill={COLORS.bg} />
                <circle cx={x + w * 0.65} cy={y + h * 0.3} r="4" fill="none" stroke={COLORS.bg} strokeWidth="0.5" strokeDasharray="1 1" />
                {/* Leg attachment */}
                <circle cx={x + w * 0.55} cy={y + h * 0.75} r="1.5" fill={COLORS.bg} />
                <circle cx={x + w * 0.55} cy={y + h * 0.75} r="4" fill="none" stroke={COLORS.bg} strokeWidth="0.5" strokeDasharray="1 1" />
              </g>
            )}
            
            {/* Labels overlay */}
            <text
              x={cx} y={cy - 5}
              textAnchor="middle" fontSize="8" fontWeight="600"
              fill={COLORS.sage} fontFamily="monospace"
            >
              {label}
            </text>
            <text
              x={cx} y={cy + 6}
              textAnchor="middle" fontSize="6.5"
              fill={COLORS.sage} fillOpacity="0.7" fontFamily="monospace"
            >
              {p.w}×{p.h}cm
            </text>
            <text
              x={cx} y={cy + 15}
              textAnchor="middle" fontSize="6"
              fill={COLORS.amber} fontFamily="monospace"
            >
              {qty === 1 ? '×1 pc (single layer)' : `×${qty} pcs`}
            </text>
            
            {/* Width arrow indicator */}
            <line x1={x + 2} y1={y + h + 4}
                  x2={x + w - 2} y2={y + h + 4}
                  stroke={COLORS.sage} strokeWidth="0.5" strokeOpacity="0.4" />
            <text x={cx} y={y + h + 10}
              textAnchor="middle" fontSize="5.5" fill={COLORS.sage} fillOpacity="0.5" fontFamily="monospace">
              {p.w}
            </text>
          </g>
        );
      })}

      <rect x={PAD} y={totalH - 18} width={8} height={6} fill="none"
        stroke={COLORS.sage} strokeWidth="0.6" strokeDasharray="3 2" />
      <text x={PAD + 11} y={totalH - 12} fontSize="6.5" fill={COLORS.sage} fillOpacity="0.6" fontFamily="monospace">
        Seam line (cut on outer box, sew on inner dashed)
      </text>
    </svg>
  )
}

function BearPreview({ h }: { h: number }) {
  const scale = Math.min(h / 30, 2.2)
  const s = scale
  return (
    <svg width={80 * s} height={90 * s} viewBox="0 0 80 90" className="block mx-auto">
      <circle cx="22" cy="18" r="10" fill={COLORS.faint} />
      <circle cx="58" cy="18" r="10" fill={COLORS.faint} />
      <circle cx="22" cy="18" r="6"  fill="#2d5c4e" />
      <circle cx="58" cy="18" r="6"  fill="#2d5c4e" />
      <circle cx="40" cy="30" r="20" fill={COLORS.faint} />
      <ellipse cx="40" cy="37" rx="9" ry="6" fill="#2d5c4e" />
      <circle cx="32" cy="26" r="3" fill={COLORS.sage} />
      <circle cx="48" cy="26" r="3" fill={COLORS.sage} />
      <circle cx="33" cy="26" r="1.5" fill={COLORS.bg} />
      <circle cx="49" cy="26" r="1.5" fill={COLORS.bg} />
      <ellipse cx="40" cy="35" rx="3" ry="2" fill={COLORS.amber} />
      <ellipse cx="40" cy="68" rx="17" ry="20" fill={COLORS.faint} />
      <ellipse cx="18" cy="65" rx="6" ry="13" fill={COLORS.faint} transform="rotate(-15 18 65)" />
      <ellipse cx="62" cy="65" rx="6" ry="13" fill={COLORS.faint} transform="rotate(15 62 65)" />
      <ellipse cx="30" cy="85" rx="7" ry="5" fill={COLORS.faint} />
      <ellipse cx="50" cy="85" rx="7" ry="5" fill={COLORS.faint} />
      <ellipse cx="40" cy="70" rx="10" ry="12" fill="#2d5c4e" fillOpacity="0.5" />
    </svg>
  )
}

export default function TeddyBearCalculator() {
  const [height, setHeight]   = useState(25)
  const [seam, setSeam]       = useState(1)
  const [fabric, setFabric]   = useState(1.08)
  const [activeTab, setActiveTab] = useState<'pieces' | 'pattern' | 'steps'>('pieces')

  const pieces    = calcPieces(height, seam)
  const materials = calcMaterials(height, seam, fabric)

  const [paperSize, setPaperSize] = useState<PaperSize>('A4')
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  const patternData = generateBearPatternSVG(height, seam)
  const gridPreview = calculateGrid(patternData.totalW, patternData.totalH, paperSize)

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true)
    try {
      await generatePDF(patternData.svgString, patternData.totalW, patternData.totalH, paperSize, 'Teddy Bear')
    } catch(err) {
      alert("Error generating PDF")
      console.error(err)
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  return (
    <div className="w-full text-on-surface">
      {/* header */}
      <div className="mb-10">
        <div className="text-[11px] text-tertiary tracking-[0.1em] uppercase mb-1">
          Pattern Calculator
        </div>
        <h1 className="font-serif text-4xl font-medium m-0 text-inverse-surface">
          Teddy Bear
        </h1>
        <p className="text-on-surface/60 mt-3 text-[14px]">
          Enter your desired size to get cut pieces, fabric, and a printable pattern layout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">

        {/* LEFT — inputs + bear preview */}
        <div className="flex flex-col gap-4">

          {/* bear preview card */}
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-5 text-center shadow-sm">
            <BearPreview h={height} />
            <div className="mt-4 text-[22px] font-medium text-inverse-surface">{height} cm</div>
            <div className="text-[11px] text-on-surface/60 uppercase tracking-widest mt-0.5">finished height</div>
          </div>

          {/* inputs card */}
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-4 shadow-sm">
            <div className="mb-4">
              <label className="text-[11px] text-on-surface/60 uppercase tracking-widest mb-2 block">Desired height</label>
              <div className="flex items-center gap-2">
                <input type="range" min={10} max={60} value={height} step={1}
                  onChange={e => setHeight(+e.target.value)}
                  className="flex-1 accent-primary" />
                <input type="number" min={10} max={60} value={height}
                  onChange={e => setHeight(Math.min(60, Math.max(10, +e.target.value)))}
                  className="w-16 p-2 bg-surface-container border border-outline-variant/10 rounded-lg text-center text-[13px] outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all" />
                <span className="text-[12px] text-on-surface/60">cm</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-[11px] text-on-surface/60 uppercase tracking-widest mb-2 block">Seam allowance</label>
              <select value={seam} onChange={e => setSeam(+e.target.value)} 
                className="w-full p-2 bg-surface-container border border-outline-variant/10 rounded-lg text-sm outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all">
                <option value={0.5}>0.5 cm — pro</option>
                <option value={1}>1.0 cm — standard</option>
                <option value={1.5}>1.5 cm — beginner</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-on-surface/60 uppercase tracking-widest mb-2 block">Fabric type</label>
              <select value={fabric} onChange={e => setFabric(+e.target.value)} 
                className="w-full p-2 bg-surface-container border border-outline-variant/10 rounded-lg text-sm outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all">
                <option value={1}>Fleece / Felt</option>
                <option value={1.08}>Cotton / Quilting</option>
                <option value={1.12}>Minky / Plush</option>
              </select>
            </div>
          </div>

          {/* materials summary */}
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <div className="text-[11px] font-semibold text-tertiary uppercase tracking-[0.06em]">
                Materials needed
              </div>
              <SaveBookmarkButton itemType="calculation" referenceId="teddy-bear" metadata={{ height, seam, fabric }} label="Save Calc" />
            </div>
            {[
              { label: 'Fabric strip', value: `${materials.fabricLen} cm`, sub: '× 45 cm wide' },
              { label: 'Stuffing', value: `${materials.stuffing} g`, sub: 'polyester fill' },
              { label: 'Safety eyes', value: `${materials.eyes} mm`, sub: 'x2 pieces' },
              { label: 'Thread', value: `${materials.thread} m`, sub: 'approx.' },
            ].map((item, idx) => (
              <div key={item.label} className={`flex justify-between items-center py-2.5 ${idx !== 3 ? 'border-b border-outline-variant/10' : ''}`}>
                <div>
                  <div className="text-[13px] font-medium text-inverse-surface">{item.label}</div>
                  <div className="text-[11px] text-on-surface/60 leading-tight mt-0.5">{item.sub}</div>
                </div>
                <div className="text-[15px] font-semibold text-primary">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — tabs: pieces table + pattern diagram */}
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full bg-clip-padding">

          {/* tabs */}
          <div className="flex border-b border-outline-variant/10 overflow-x-auto bg-surface/50">
            {[
              { id: 'pieces',  label: 'Cut pieces' },
              { id: 'pattern', label: 'Pattern layout' },
              { id: 'steps',   label: 'Cutting guide' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 px-5 text-[13px] transition-colors whitespace-nowrap outline-none flex-1 border-b-[2px]
                  ${activeTab === tab.id 
                    ? 'bg-surface-container-low text-primary border-primary font-medium' 
                    : 'text-on-surface/60 border-transparent hover:text-on-surface hover:bg-surface-container-lowest font-normal'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8 overflow-y-auto">

            {/* CUT PIECES TAB */}
            {activeTab === 'pieces' && (
              <div className="animate-in fade-in duration-300">
                <p className="text-[13px] text-on-surface/60 mb-5">
                  All dimensions include {seam} cm seam allowance. Cut each piece on folded fabric unless noted.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[13px] min-w-[400px]">
                    <thead>
                      <tr className="border-b border-outline-variant/10">
                        {['Piece', 'Width', 'Height', 'Qty', 'Notes'].map(h => (
                          <th key={h} className="pb-2 text-on-surface/60 text-[11px] font-medium uppercase tracking-[0.06em] px-2">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(pieces).map(([key, p]) => (
                        <tr key={key} className="border-b border-outline-variant/5">
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2.5">
                              <div className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: p.color }} />
                              <span className="font-medium text-inverse-surface">{p.label}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-tertiary font-mono">{p.w} cm</td>
                          <td className="py-3 px-2 text-tertiary font-mono">{p.h} cm</td>
                          <td className="py-3 px-2">
                            <span className="bg-primary text-surface-container-lowest text-[11px] font-bold py-0.5 px-2 rounded-[4px]">
                              ×{p.qty}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-on-surface/60 text-[12px]">
                            {key === 'body'  && 'Cut on fold, front & back'}
                            {key === 'head'  && 'Side profile, mirror pairs'}
                            {key === 'gusset'&& 'Center profile, cut 1 single layer'}
                            {key === 'arm'   && 'Mirror pairs'}
                            {key === 'leg'   && 'Mirror pairs'}
                            {key === 'ear'   && '2 outer + 2 inner fabric'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 bg-surface-container border border-outline-variant/10 rounded-xl p-4 text-[13px] text-on-surface/70 leading-relaxed shadow-sm">
                  <span className="text-primary font-medium">Tip: </span>
                  For a {height} cm bear, fold your fabric in half lengthwise before cutting body and head pieces &mdash; this gives you mirror-image pairs automatically and reduces cutting time.
                </div>
              </div>
            )}

            {/* PATTERN LAYOUT TAB */}
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
                <PatternDiagram h={height} seam={seam} />
                <div className="mt-4 text-[12px] text-on-surface/60 leading-relaxed">
                  Each rectangle shown represents a pair of pieces cut on folded fabric.
                  Pieces are arranged to minimise waste on a standard 45 cm wide fabric roll.
                  Add <strong>{Math.round(materials.fabricLen * 0.1)} cm</strong> extra to your purchase for safety.
                </div>
              </div>
            )}

            {/* CUTTING GUIDE TAB */}
            {activeTab === 'steps' && (
              <div className="animate-in fade-in duration-300">
                <div className="text-[14px] font-medium text-inverse-surface mb-5">Step-by-step cutting guide</div>
                <div>
                  {[
                    { n: '01', title: 'Prewash your fabric', body: `Wash and iron your ${fabric === 1 ? 'fleece/felt' : fabric === 1.08 ? 'cotton' : 'minky/plush'} fabric before cutting. Fabric can shrink up to 5% and cutting pre-washed fabric means your finished bear keeps its shape after cleaning.` },
                    { n: '02', title: 'Fold the fabric', body: `Fold your fabric in half lengthwise, right sides together. This lets you cut mirror-image pairs for the body, head, arms, and legs in one cut each. Note: Cut the Gusset on a single flat layer.` },
                    { n: '03', title: 'Check the Grainline', body: `Place your pieces so the double-headed arrows point parallel to the selvage edge. This ensures your bear stretches consistently in the correct direction when stuffed.` },
                    { n: '04', title: 'Transfer measurements', body: `Using a fabric marker or chalk, mark the exact dimensions onto your fabric. Mark all joint and eye placement dots (X marks and circles) so your limbs will attach symmetrically.` },
                    { n: '05', title: 'Mark seam lines', body: `Inside your cut trace, evaluate a ${seam} cm inner dashed line. The outer line is your cut line. The inner line is your sew line.` },
                    { n: '06', title: 'Cut in order — largest first', body: `Cut body and head pieces first while the fabric is large. Then cut the arms, legs, ears, and gusset from the remaining strips.` },
                    { n: '07', title: 'Safety eyes placement', body: `Before sewing the head and gusset closed, insert your ${materials.eyes} mm safety eyes at the marked crosses on the side heads and lock the washers inside.` },
                  ].map(step => (
                    <div key={step.n} className="flex gap-4 mb-5 pb-5 border-b border-outline-variant/10 last:border-0 last:pb-0">
                      <div className="w-8 h-8 rounded-[8px] bg-surface flex items-center justify-center text-[11px] text-primary font-bold shrink-0 font-mono shadow-sm border border-outline-variant/20">
                        {step.n}
                      </div>
                      <div>
                        <div className="text-[14px] font-medium text-inverse-surface mb-1">{step.title}</div>
                        <div className="text-[13px] text-on-surface/70 leading-relaxed max-w-[95%]">{step.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
