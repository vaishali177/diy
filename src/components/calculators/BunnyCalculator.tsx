'use client'

import { useState } from 'react'
import SaveBookmarkButton from '@/components/SaveBookmarkButton'

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

const BUNNY_RATIOS = {
  body_h:  0.50,
  body_w:  0.38,
  head_d:  0.38,
  gusset_l: 0.55,
  gusset_w: 0.16,
  arm_h:   0.30,
  arm_w:   0.14,
  leg_h:   0.32,
  leg_w:   0.16,
  ear_h:   0.45,
  ear_w:   0.15,
}

function round1(n: number) { return Math.round(n * 10) / 10 }

function calcPieces(h: number, seam: number) {
  const s = seam * 2
  return {
    body:  { w: round1(h * BUNNY_RATIOS.body_w + s), h: round1(h * BUNNY_RATIOS.body_h + s), qty: 2, label: 'Body', color: '#3a6b5a' },
    head:  { w: round1(h * BUNNY_RATIOS.head_d + s), h: round1(h * BUNNY_RATIOS.head_d + s), qty: 2, label: 'Head', color: '#2d5c4e' },
    gusset:{ w: round1(h * BUNNY_RATIOS.gusset_w + s), h: round1(h * BUNNY_RATIOS.gusset_l + s), qty: 1, label: 'Gusset', color: '#1f483c' },
    arm:   { w: round1(h * BUNNY_RATIOS.arm_w  + s), h: round1(h * BUNNY_RATIOS.arm_h  + s), qty: 4, label: 'Arm',  color: '#245044' },
    leg:   { w: round1(h * BUNNY_RATIOS.leg_w  + s), h: round1(h * BUNNY_RATIOS.leg_h  + s), qty: 4, label: 'Leg',  color: '#1c4438' },
    ear:   { w: round1(h * BUNNY_RATIOS.ear_w  + s), h: round1(h * BUNNY_RATIOS.ear_h  + s), qty: 4, label: 'Ear', color: '#163830' },
  }
}

function calcMaterials(h: number, seam: number, fabricMult: number) {
  const p = calcPieces(h, seam)
  const totalH = Object.values(p).reduce((a, piece) => a + piece.h * (piece.qty / 2), 0)
  const fabricLen = Math.round(totalH * fabricMult * 1.18)
  const stuffing  = Math.round(Math.pow(h / 25, 3) * 75)
  const eyes      = h <= 15 ? 9 : h <= 25 ? 12 : h <= 35 ? 15 : 18
  const thread    = Math.round(h * 3.8)
  return { fabricLen, stuffing, eyes, thread }
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
    <svg width="100%" viewBox={`0 0 ${svgW} ${totalH}`} className="bg-[#1a2e28] rounded-xl border border-dashed border-outline-variant/30 w-full">
      {Array.from({ length: Math.ceil(svgW / 20) }).map((_, i) => (
        <line key={i} x1={i * 20} y1={0} x2={i * 20} y2={totalH} stroke={COLORS.faint} strokeWidth="0.4" strokeDasharray="2 4" strokeOpacity="1" />
      ))}

      <line x1={PAD} y1={2} x2={svgW - PAD} y2={2} stroke={COLORS.amber} strokeWidth="1" strokeDasharray="6 3" />
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
          // Long petal shape for bunny ear
          d = `M ${cx} ${y} C ${x+w*0.8} ${y+h*0.3}, ${x+w} ${y+h*0.7}, ${cx} ${y+h} C ${x} ${y+h*0.7}, ${x+w*0.2} ${y+h*0.3}, ${cx} ${y} Z`;
        } else {
          d = `M ${x} ${y} L ${x+w} ${y} L ${x+w} ${y+h} L ${x} ${y+h} Z`;
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
            <text x={cx} y={cy - 5} textAnchor="middle" fontSize="8" fontWeight="600" fill={COLORS.sage}>
              {label}
            </text>
            <text x={cx} y={cy + 6} textAnchor="middle" fontSize="6.5" fill={COLORS.sage} fillOpacity="0.7">
              {p.w}×{p.h}
            </text>
            <text x={cx} y={cy + 15} textAnchor="middle" fontSize="6" fill={COLORS.amber}>
              {qty === 1 ? '×1 pc' : `×${qty} pcs`}
            </text>
          </g>
        );
      })}
    </svg>
  )
}

function BunnyPreview({ h }: { h: number }) {
  const scale = Math.min(h / 30, 2.2)
  const s = scale
  return (
    <svg width={80 * s} height={100 * s} viewBox="0 0 80 100" className="block mx-auto">
      {/* Long ears */}
      <ellipse cx="25" cy="20" rx="8" ry="25" fill={COLORS.faint} transform="rotate(-15 25 20)" />
      <ellipse cx="55" cy="20" rx="8" ry="25" fill={COLORS.faint} transform="rotate(15 55 20)" />
      {/* Main head */}
      <circle cx="40" cy="40" r="18" fill={COLORS.faint} />
      <ellipse cx="40" cy="45" rx="8" ry="5" fill="#2d5c4e" />
      <circle cx="33" cy="36" r="3" fill={COLORS.sage} />
      <circle cx="47" cy="36" r="3" fill={COLORS.sage} />
      <circle cx="34" cy="36" r="1.5" fill={COLORS.bg} />
      <circle cx="48" cy="36" r="1.5" fill={COLORS.bg} />
      <ellipse cx="40" cy="43" rx="2" ry="1.5" fill={COLORS.amber} />
      {/* Body */}
      <ellipse cx="40" cy="72" rx="15" ry="18" fill={COLORS.faint} />
      <ellipse cx="20" cy="70" rx="4" ry="12" fill={COLORS.faint} transform="rotate(-20 20 70)" />
      <ellipse cx="60" cy="70" rx="4" ry="12" fill={COLORS.faint} transform="rotate(20 60 70)" />
      <ellipse cx="30" cy="90" rx="6" ry="4" fill={COLORS.faint} />
      <ellipse cx="50" cy="90" rx="6" ry="4" fill={COLORS.faint} />
      <circle cx="40" cy="75" r="9" fill="#2d5c4e" fillOpacity="0.4" />
    </svg>
  )
}

export default function BunnyCalculator() {
  const [height, setHeight]   = useState(30)
  const [seam, setSeam]       = useState(1)
  const [fabric, setFabric]   = useState(1.12) // Default to minky for bunnies
  const [activeTab, setActiveTab] = useState<'pieces' | 'pattern' | 'steps'>('pieces')

  const pieces    = calcPieces(height, seam)
  const materials = calcMaterials(height, seam, fabric)

  return (
    <div className="w-full text-on-surface">
      <div className="mb-10">
        <div className="text-[11px] text-tertiary tracking-[0.1em] uppercase mb-1">
          Pattern Calculator
        </div>
        <h1 className="font-serif text-4xl font-medium m-0 text-inverse-surface">
          Bunny Plushie
        </h1>
        <p className="text-on-surface/60 mt-3 text-[14px]">
          Enter your desired size to get cut pieces, fabric, and a printable pattern layout for a lovable bunny.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
        <div className="flex flex-col gap-4">
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-5 text-center shadow-sm">
            <BunnyPreview h={height} />
            <div className="mt-4 text-[22px] font-medium text-inverse-surface">{height} cm</div>
            <div className="text-[11px] text-on-surface/60 uppercase tracking-widest mt-0.5">finished height</div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-4 shadow-sm">
            <div className="mb-4">
              <label className="text-[11px] text-on-surface/60 uppercase tracking-widest mb-2 block">Desired height</label>
              <div className="flex items-center gap-2">
                <input type="range" min={15} max={80} value={height} step={1}
                  onChange={e => setHeight(+e.target.value)}
                  className="flex-1 accent-primary" />
                <input type="number" min={15} max={80} value={height}
                  onChange={e => setHeight(Math.min(80, Math.max(15, +e.target.value)))}
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
                <option value={1.12}>Minky / Plush (Recommended)</option>
              </select>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <div className="text-[11px] font-semibold text-tertiary uppercase tracking-[0.06em]">
                Materials needed
              </div>
              <SaveBookmarkButton itemType="calculation" referenceId="bunny" metadata={{ height, seam, fabric }} label="Save Calc" />
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

        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full bg-clip-padding">
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
                            {key === 'ear'   && 'Cut absolutely straight on the grainline'}
                            {key === 'body'  && 'Cut on fold, front & back'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'pattern' && (
              <div className="animate-in fade-in duration-300">
                <PatternDiagram h={height} seam={seam} />
              </div>
            )}

            {activeTab === 'steps' && (
              <div className="animate-in fade-in duration-300">
                <div className="text-[14px] font-medium text-inverse-surface mb-5">Bunny specific cutting guide</div>
                <div>
                  {[
                    { n: '01', title: 'The Ears', body: `Bunny ears are long and floppy. It is critical that you cut them perfectly on the grainline of the fabric, otherwise they will twist like corkscrews when stuffed.` },
                    { n: '02', title: 'Fold the fabric', body: `Fold your fabric in half lengthwise, right sides together. This lets you cut mirror-image pairs in one cut each.` },
                    { n: '03', title: 'Marking', body: `Using a fabric marker or chalk, mark the exact dimensions onto your fabric. Ensure your D-shape for the ears is traced carefully.` },
                  ].map(step => (
                    <div key={step.n} className="flex gap-4 mb-5 pb-5 border-b border-outline-variant/10 last:border-0 last:pb-0">
                       <div className="w-8 h-8 rounded-[8px] bg-surface flex items-center justify-center text-[11px] text-primary font-bold shrink-0 font-mono shadow-sm border border-outline-variant/20">{step.n}</div>
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
