/*
 * Design: Industrial Cyberpunk — Step 3: How We Solve It (v4 FINAL)
 * 3a: 四象限坐标系 + 公司真实定位 + 可拖动时间轴
 * 3b: 投资驱动 vs 收入驱动 对比
 * 3c: 为什么是遥操作 + 4张对比图
 * 3d: 再过10年，你靠什么赢（竞争壁垒）
 * 3e: 算力引用 + 对比表格
 * 3f: 飞轮图（多圈螺旋 + 人机比例递增 1:1→1:3→1:5→1:10）
 * 3g: 多场景跨国套利计算器（中国/日本/美国）
 */
import { IMAGES } from "@/lib/assets";
import { useFadeUpStagger, useInView } from "@/hooks/useAnimations";
import { motion } from "framer-motion";
import { useState } from "react";

const comparisonData = [
  { dimension: "硬件精度", traditional: "航天级谐波减速器，±0.01mm", cangjie: "80年前已成熟的行星减速器" },
  { dimension: "容错机制", traditional: "无反馈盲操，一次做对", cangjie: "高频人在回路，实时闭环纠错" },
  { dimension: "评价标准", traditional: "这个动作精度够不够？", cangjie: "这个任务能不能做成？" },
  { dimension: "数据定义权", traditional: "由算法工程师在实验室定义", cangjie: "由真实场景中的物理交互定义" },
  { dimension: "成本结构", traditional: "硬件成本占主导，边际成本指数增长", cangjie: "硬件成本极低，智能成本随数据积累递减" },
];

// ============================================================
// Four Quadrant Coordinate System
// ============================================================
function FourQuadrantSystem() {
  const [timeline, setTimeline] = useState(0);
  const yearLabel = timeline < 33 ? "今天" : timeline < 66 ? "2030–2040" : "2050 (AGI)";

  const companies = [
    // 仿真训练路线（左上）：仿真环境 + 真实本体
    { cx: 155, cy: 145, label: "银河通用", sublabel: "Sim-to-Real", color: "#FF6B6B" as const, size: 9 },
    { cx: 195, cy: 195, label: "星海图", sublabel: "Sim闭环", color: "#FF6B6B" as const, size: 9 },
    // UMI路线（右下）：虚拟本体（人类示教） + 真实场景
    { cx: 465, cy: 445, label: "UMI", sublabel: "人类示教采集", color: "#FFB347" as const, size: 9 },
    // 真机真实路线（右上）：真实本体 + 真实场景
    { cx: 540, cy: 165, label: "特斯拉 Optimus", sublabel: "FSD数据飞轮", color: "#87CEEB" as const, size: 9 },
    { cx: 490, cy: 215, label: "1X / EX", sublabel: "真机真实场景", color: "#87CEEB" as const, size: 9 },
    // 仓颉（终点）
    { cx: 608, cy: 98, label: "仓颉", sublabel: "终点", color: "#00FF88" as const, size: 14, isCangjie: true },
  ];

  const getPos = (c: typeof companies[0]) => {
    if ((c as any).isCangjie || timeline < 33) return { cx: c.cx, cy: c.cy };
    const t = (timeline - 33) / 67;
    const dx = c.color === "#FF6B6B" ? 90 * t : c.color === "#FFB347" ? 40 * t : 25 * t;
    const dy = c.color === "#FF6B6B" ? -70 * t : c.color === "#FFB347" ? -90 * t : -25 * t;
    return { cx: c.cx + dx, cy: c.cy + dy };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-20 p-6 md:p-10 rounded-2xl bg-surface/30 border border-white/5"
    >
      <div className="text-center mb-8">
        <h3 className="font-cn font-bold text-white text-2xl md:text-3xl mb-2">通往具身智能的四条路</h3>
        <p className="text-white/50 text-base md:text-lg">为什么我们从第一天就站在终点</p>
      </div>

      <div className="relative max-w-4xl mx-auto mb-6">
        <svg viewBox="0 0 700 700" className="w-full" style={{ height: "75vh", maxHeight: "600px", minHeight: "380px" }}>
          <defs>
            <filter id="glowGreenQ">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Quadrant backgrounds */}
          <rect x="52" y="52" width="296" height="296" fill="rgba(255,107,107,0.03)" rx="3" />
          <rect x="352" y="52" width="296" height="296" fill="rgba(0,255,136,0.06)" rx="3" stroke="rgba(0,255,136,0.08)" strokeWidth="1" />
          <rect x="52" y="352" width="296" height="296" fill="rgba(255,107,107,0.02)" rx="3" />
          <rect x="352" y="352" width="296" height="296" fill="rgba(255,179,71,0.02)" rx="3" />

          {/* Axes */}
          <line x1="350" y1="28" x2="350" y2="672" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
          <line x1="28" y1="350" x2="672" y2="350" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />

          {/* Arrowheads */}
          <polygon points="350,28 343,50 357,50" fill="rgba(255,255,255,0.25)" />
          <polygon points="672,350 650,343 650,357" fill="rgba(255,255,255,0.25)" />

          {/* Axis labels — single line, no wrapping */}
          <text x="350" y="18" fill="rgba(255,255,255,0.75)" fontSize="15" textAnchor="middle" fontFamily="system-ui" fontWeight="700">真实本体</text>
          <text x="350" y="695" fill="rgba(255,255,255,0.45)" fontSize="14" textAnchor="middle" fontFamily="system-ui">虚拟本体</text>
          <text x="685" y="355" fill="rgba(255,255,255,0.75)" fontSize="15" textAnchor="start" fontFamily="system-ui" fontWeight="700">真实环境</text>
          <text x="15" y="355" fill="rgba(255,255,255,0.45)" fontSize="14" textAnchor="end" fontFamily="system-ui">仿真环境</text>

          {/* Quadrant corner labels */}
          <text x="200" y="82" fill="rgba(255,107,107,0.55)" fontSize="12" textAnchor="middle" fontFamily="system-ui" fontWeight="600">仿真训练路线</text>
          <text x="500" y="82" fill="rgba(0,255,136,0.7)" fontSize="12" textAnchor="middle" fontFamily="system-ui" fontWeight="700">真机真实路线 ✓</text>
          <text x="200" y="678" fill="rgba(255,255,255,0.22)" fontSize="11" textAnchor="middle" fontFamily="system-ui">纯仿真</text>
          <text x="500" y="678" fill="rgba(255,179,71,0.45)" fontSize="11" textAnchor="middle" fontFamily="system-ui">人类示教路线</text>

          {/* Subtle grid */}
          {[150, 250, 450, 550].map(v => (
            <g key={v}>
              <line x1={v} y1="52" x2={v} y2="648" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
              <line x1="52" y1={v} x2="648" y2={v} stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
            </g>
          ))}

          {/* Company dots */}
          {companies.map((c, i) => {
            const pos = getPos(c);
            const isCangjie = (c as any).isCangjie;
            return (
              <motion.g key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              >
                {isCangjie ? (
                  <>
                    <motion.circle cx={pos.cx} cy={pos.cy} r="26" fill="none" stroke="#00FF88" strokeWidth="1.5" strokeOpacity="0.25"
                      animate={{ r: [26, 36, 26], opacity: [0.25, 0.08, 0.25] }} transition={{ duration: 2.8, repeat: Infinity }} />
                    <motion.circle cx={pos.cx} cy={pos.cy} r="18" fill="none" stroke="#00FF88" strokeWidth="1" strokeOpacity="0.45"
                      animate={{ r: [18, 26, 18], opacity: [0.45, 0.15, 0.45] }} transition={{ duration: 2.8, repeat: Infinity, delay: 0.4 }} />
                    <circle cx={pos.cx} cy={pos.cy} r={c.size} fill="#00FF88" filter="url(#glowGreenQ)" />
                    <text x={pos.cx} y={pos.cy - 22} fill="#00FF88" fontSize="14" textAnchor="middle" fontFamily="system-ui" fontWeight="800">{c.label}</text>
                    <text x={pos.cx} y={pos.cy - 7} fill="rgba(0,255,136,0.65)" fontSize="10" textAnchor="middle" fontFamily="system-ui">{c.sublabel}</text>
                  </>
                ) : (
                  <>
                    <circle cx={pos.cx} cy={pos.cy} r={c.size} fill={c.color} opacity="0.88" />
                    <circle cx={pos.cx} cy={pos.cy} r={c.size + 3} fill="none" stroke={c.color} strokeWidth="1" opacity="0.3" />
                    <text x={pos.cx} y={pos.cy - 15} fill={c.color} fontSize="11" textAnchor="middle" fontFamily="system-ui" fontWeight="600" opacity="0.9">{c.label}</text>
                    <text x={pos.cx} y={pos.cy - 3} fill="rgba(255,255,255,0.38)" fontSize="9" textAnchor="middle" fontFamily="system-ui">{c.sublabel}</text>
                  </>
                )}
              </motion.g>
            );
          })}
        </svg>

        <motion.div key={timeline} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-3">
          {timeline < 33 && <p className="text-white/45 text-sm">当前：各路玩家分布在四个象限，仓颉从第一天就在右上角终点</p>}
          {timeline >= 33 && timeline < 80 && <p className="text-neon text-sm font-medium">2030–2040：所有玩家开始往右上角移动，各自遇到"坑"——迁移困境、构型错配</p>}
          {timeline >= 80 && <p className="text-neon text-base font-bold">2050 AGI时代：仓颉从一开始就在终点，其他人绕了一大圈才到这里。</p>}
        </motion.div>
      </div>

      {/* Slider */}
      <div className="max-w-lg mx-auto">
        <label className="block text-white/50 text-xs mb-3 text-center font-mono-brand tracking-widest uppercase">拖动时间轴：{yearLabel}</label>
        <input type="range" min="0" max="100" value={timeline} onChange={e => setTimeline(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer" style={{ accentColor: "#00FF88" }} />
        <div className="flex justify-between text-white/30 text-xs mt-2 font-mono-brand">
          <span>今天</span><span>2030</span><span>2040</span><span>2050 AGI</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-5 mt-6">
        {[
          { color: "#FF6B6B", label: "仿真训练路线（银河通用、星海图）" },
          { color: "#FFB347", label: "人类示教路线（UMI）" },
          { color: "#87CEEB", label: "真机真实路线（特斯拉 Optimus、1X/EX）" },
          { color: "#00FF88", label: "仓颉（终点）" },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-white/40 text-xs">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================================
// Investment vs Earning Comparison
// ============================================================
function InvestmentVsEarning() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-20 p-6 md:p-10 rounded-2xl bg-surface/30 border border-white/5"
    >
      <div className="text-center mb-8">
        <h3 className="font-cn font-bold text-white text-2xl md:text-3xl mb-2">两条路的本质差异</h3>
        <p className="text-white/50 text-base">投资驱动 vs 收入驱动</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <motion.div className="p-6 md:p-8 rounded-xl bg-signal-red/5 border-2 border-signal-red/15" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-signal-red/10 border border-signal-red/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-signal-red" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div>
              <h4 className="font-display font-bold text-signal-red text-lg">传统路线</h4>
              <p className="text-white/40 text-xs">先烧钱，再找场景</p>
            </div>
          </div>
          <div className="space-y-3">
            {["融资 → 研发 → 仿真训练 → 找场景 → 再融资", "数据来自仿真器，与真实世界存在 Sim-to-Real Gap", "每一步都在消耗资本，没有正向现金流", "等待 AGI 降临才能真正落地"].map(t => (
              <div key={t} className="flex items-start gap-2">
                <span className="text-signal-red mt-1 text-xs flex-shrink-0">✗</span>
                <p className="text-white/50 text-sm">{t}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="p-6 md:p-8 rounded-xl bg-neon/5 border-2 border-neon/20" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-neon/10 border border-neon/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-neon" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <div>
              <h4 className="font-display font-bold text-neon text-lg">仓颉路线</h4>
              <p className="text-white/40 text-xs">先赚钱，顺便采数据</p>
            </div>
          </div>
          <div className="space-y-3">
            {["进场景 → 遥操作赚钱 → 顺便采真实数据", "数据来自真实物理交互，天然无 Sim-to-Real Gap", "Day 1 就有正向现金流，越跑越便宜", "每台机器人都是数据采集节点 + 收入来源"].map(t => (
              <div key={t} className="flex items-start gap-2">
                <span className="text-neon mt-1 text-xs flex-shrink-0">✓</span>
                <p className="text-white/60 text-sm">{t}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============================================================
// Flywheel Diagram — Multi-ring spiral, ratio 1:1→1:3→1:5→1:10
// ============================================================
function FlywheelDiagram() {
  const cx = 300, cy = 300;
  const rings = [
    { r: 80, ratio: "1:1", label: "遥操作赚钱", color: "#00FF88", opacity: 0.9 },
    { r: 140, ratio: "1:3", label: "数据驱动优化", color: "#34D399", opacity: 0.75 },
    { r: 200, ratio: "1:5", label: "模型自主增强", color: "#6EE7B7", opacity: 0.6 },
    { r: 255, ratio: "1:10", label: "规模化复制", color: "#A7F3D0", opacity: 0.45 },
  ];

  const steps = [
    { angle: -90, label: "真机部署", sublabel: "进入真实场景" },
    { angle: 0, label: "遥操作赚钱", sublabel: "Day 1 正向现金流" },
    { angle: 90, label: "采集真实数据", sublabel: "物理交互数据" },
    { angle: 180, label: "训练真实模型", sublabel: "无 Sim-to-Real Gap" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-20 p-6 md:p-10 rounded-2xl bg-surface/30 border border-white/5"
    >
      <div className="text-center mb-8">
        <h3 className="font-cn font-bold text-white text-2xl md:text-3xl mb-2">仓颉飞轮</h3>
        <p className="text-white/50 text-base">每转一圈，人机比例提升——赚更多钱，用更少人</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8 max-w-5xl mx-auto">
        {/* SVG Flywheel */}
        <div className="flex-shrink-0 w-full max-w-sm mx-auto lg:mx-0">
          <svg viewBox="0 0 600 600" className="w-full">
            <defs>
              <filter id="glowGreen">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              {rings.map((ring, i) => (
                <marker key={i} id={`arrow${i}`} markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill={ring.color} opacity={ring.opacity} />
                </marker>
              ))}
            </defs>

            {/* Background rings (static) */}
            {rings.map((ring, i) => (
              <circle key={`bg-${i}`} cx={cx} cy={cy} r={ring.r}
                fill="none" stroke={ring.color} strokeWidth="1" strokeOpacity="0.08" strokeDasharray="4 6" />
            ))}

            {/* Animated spiral arcs */}
            {rings.map((ring, i) => (
              <motion.circle key={`arc-${i}`} cx={cx} cy={cy} r={ring.r}
                fill="none" stroke={ring.color} strokeWidth={3 - i * 0.4}
                strokeOpacity={ring.opacity}
                strokeDasharray={`${ring.r * Math.PI * 1.6} ${ring.r * Math.PI * 0.4}`}
                strokeDashoffset={ring.r * Math.PI * 0.4}
                strokeLinecap="round"
                initial={{ rotate: -90, opacity: 0 }}
                whileInView={{ rotate: 270, opacity: ring.opacity }}
                viewport={{ once: true }}
                transition={{ duration: 2 + i * 0.5, delay: i * 0.3, ease: "easeOut" }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />
            ))}

            {/* Step nodes on outermost ring */}
            {steps.map((step, i) => {
              const rad = (step.angle * Math.PI) / 180;
              const nx = cx + 255 * Math.cos(rad);
              const ny = cy + 255 * Math.sin(rad);
              const lx = cx + 295 * Math.cos(rad);
              const ly = cy + 295 * Math.sin(rad);
              const anchor = step.angle === 0 ? "start" : step.angle === 180 ? "end" : "middle";
              return (
                <motion.g key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.5 + i * 0.15 }}
                >
                  <circle cx={nx} cy={ny} r="10" fill="#00FF88" filter="url(#glowGreen)" opacity="0.9" />
                  <circle cx={nx} cy={ny} r="14" fill="none" stroke="#00FF88" strokeWidth="1" opacity="0.3" />
                  <text x={lx} y={ly - 6} fill="#FFFFFF" fontSize="11" textAnchor={anchor} fontFamily="system-ui" fontWeight="700">{step.label}</text>
                  <text x={lx} y={ly + 8} fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor={anchor} fontFamily="system-ui">{step.sublabel}</text>
                </motion.g>
              );
            })}

            {/* Center label */}
            <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
              <circle cx={cx} cy={cy} r="55" fill="rgba(0,255,136,0.08)" stroke="#00FF88" strokeWidth="1.5" strokeOpacity="0.4" />
              <text x={cx} y={cy - 10} fill="#00FF88" fontSize="16" textAnchor="middle" fontFamily="system-ui" fontWeight="800">仓颉飞轮</text>
              <text x={cx} y={cy + 8} fill="rgba(0,255,136,0.6)" fontSize="10" textAnchor="middle" fontFamily="system-ui">自增强循环</text>
            </motion.g>
          </svg>
        </div>

        {/* Ratio progression */}
        <div className="flex-1 w-full">
          <p className="text-white/50 text-sm mb-6 font-cn">每转一圈，人机比例提升，边际成本递减：</p>
          <div className="space-y-4">
            {rings.map((ring, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-surface/40 border border-white/5"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2"
                  style={{ borderColor: ring.color, backgroundColor: `${ring.color}15` }}>
                  <span className="font-mono-brand font-bold text-sm" style={{ color: ring.color }}>{ring.ratio}</span>
                </div>
                <div className="flex-1">
                  <p className="font-cn font-bold text-white text-sm mb-0.5">
                    第 {i + 1} 圈 — {ring.label}
                  </p>
                  <p className="text-white/40 text-xs">
                    {i === 0 && "1 名操作员控制 1 台机器人，开始积累真实数据"}
                    {i === 1 && "模型优化后，1 人可监管 3 台，收入翻 3 倍"}
                    {i === 2 && "自主能力提升，1 人监管 5 台，利润率大幅提升"}
                    {i === 3 && "接近全自主，1 人监管 10 台，边际成本趋近于零"}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-white/30 text-xs font-mono-brand">收入倍率</p>
                  <p className="font-mono-brand font-bold text-lg" style={{ color: ring.color }}>
                    {["1x", "3x", "5x", "10x"][i]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// Arbitrage Calculator — Multi-scenario
// ============================================================
const scenarios = [
  {
    id: "cn",
    flag: "🇨🇳",
    label: "中国场景",
    workerCountry: "越南",
    workerSalary: 400,
    localSalary: 6000,
    robotCost: 60000,
    monthlyRent: 4000,
    currency: "¥",
    desc: "越南操作员（¥400/月）替代中国仓储工人（¥6,000/月）",
  },
  {
    id: "jp",
    flag: "🇯🇵",
    label: "日本场景",
    workerCountry: "越南",
    workerSalary: 400,
    localSalary: 20000,
    robotCost: 60000,
    monthlyRent: 15000,
    currency: "¥",
    desc: "越南操作员（¥400/月）替代日本工人（¥20,000/月）",
  },
  {
    id: "us",
    flag: "🇺🇸",
    label: "美国场景",
    workerCountry: "越南",
    workerSalary: 400,
    localSalary: 30000,
    robotCost: 60000,
    monthlyRent: 22000,
    currency: "¥",
    desc: "越南操作员（¥400/月）替代美国工人（¥30,000/月）",
  },
];

function ArbitrageCalculator() {
  const [activeId, setActiveId] = useState("cn");
  const sc = scenarios.find(s => s.id === activeId)!;

  const saving = sc.monthlyRent - sc.workerSalary;
  const paybackMonths = Math.ceil(sc.robotCost / saving);
  const annualSaving = saving * 12;
  const roi3yr = (((saving * 36 - sc.robotCost) / sc.robotCost) * 100).toFixed(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto"
    >
      {/* Scenario tabs */}
      <div className="flex gap-3 mb-8 justify-center flex-wrap">
        {scenarios.map(s => (
          <button key={s.id} onClick={() => setActiveId(s.id)}
            className={`px-5 py-2.5 rounded-lg font-display font-medium text-sm transition-all duration-200 ${
              activeId === s.id
                ? "bg-neon text-black"
                : "bg-white/5 text-white/50 hover:bg-white/10 border border-white/10"
            }`}
          >
            {s.flag} {s.label}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-10 rounded-2xl bg-surface/30 border border-white/5">
        <p className="text-white/50 text-sm text-center mb-8">{sc.desc}</p>

        {/* Cost comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-xl bg-signal-red/5 border border-signal-red/15 text-center">
            <p className="text-white/40 text-xs font-mono-brand mb-2 uppercase tracking-widest">本地工人月薪</p>
            <p className="font-mono-brand font-bold text-2xl text-signal-red">{sc.currency}{sc.localSalary.toLocaleString()}</p>
            <p className="text-white/30 text-xs mt-1">/ 月</p>
          </div>
          <div className="p-5 rounded-xl bg-white/3 border border-white/8 text-center flex flex-col items-center justify-center">
            <div className="text-3xl mb-2">→</div>
            <p className="text-white/40 text-xs">仓颉机器人</p>
            <p className="text-white/30 text-xs">BOM {sc.currency}{sc.robotCost.toLocaleString()}</p>
          </div>
          <div className="p-5 rounded-xl bg-neon/5 border border-neon/15 text-center">
            <p className="text-white/40 text-xs font-mono-brand mb-2 uppercase tracking-widest">机器人月租</p>
            <p className="font-mono-brand font-bold text-2xl text-neon">{sc.currency}{sc.monthlyRent.toLocaleString()}</p>
            <p className="text-white/30 text-xs mt-1">含越南操作员 {sc.currency}{sc.workerSalary}</p>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "每月节省", value: `${sc.currency}${saving.toLocaleString()}`, sub: "相比本地工人", color: "#00FF88" },
            { label: "回本周期", value: `${paybackMonths} 个月`, sub: `约 ${(paybackMonths / 12).toFixed(1)} 年`, color: "#60A5FA" },
            { label: "3年ROI", value: `${roi3yr}%`, sub: `年省 ${sc.currency}${annualSaving.toLocaleString()}`, color: "#FFB347" },
          ].map(m => (
            <div key={m.label} className="p-4 rounded-xl bg-surface/40 border border-white/5 text-center">
              <p className="text-white/40 text-xs font-mono-brand mb-2 uppercase tracking-widest">{m.label}</p>
              <p className="font-mono-brand font-bold text-xl md:text-2xl" style={{ color: m.color }}>{m.value}</p>
              <p className="text-white/30 text-xs mt-1">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// Main Export
// ============================================================
export default function SolutionSection() {
  const staggerRef = useFadeUpStagger();
  const { ref: tableRef, inView: tableInView } = useInView(0.1);
  return (
    <section id="how" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      {/* Section Header */}
      <div ref={staggerRef} className="container relative z-10 mb-16 md:mb-20">
        <p className="font-mono-brand text-neon/70 text-xs tracking-[0.25em] uppercase mb-4">Step 03 — How We Solve It</p>
        <h2 className="font-cn font-black text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
          生产力的去中心化<br />
          <span className="text-neon neon-glow">从工厂到每一个仓库</span>
        </h2>
        <p className="text-white/50 text-base md:text-lg max-w-3xl leading-relaxed">
          历史上每一次生产力去中心化，都催生了万亿级市场。我们正在把工业级机械臂的能力，解锁到中国数万个非结构化的长尾场景中。
        </p>
      </div>

      {/* 四象限坐标系 */}
      <div className="container relative z-10"><FourQuadrantSystem /></div>

      {/* 竞品视频占位框 */}
      <div className="container relative z-10 mb-20">
        <div className="mb-8">
          <h3 className="font-cn font-bold text-white text-2xl md:text-3xl mb-2">他们在做什么<span className="text-neon">？</span></h3>
          <p className="text-white/50 text-base">全球顶尖玩家的最新进展——我们从第一天就站在他们的终点。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { label: "特斯拉 Optimus", sublabel: "真机 · 真实场景 · FSD数据飞轮", color: "#87CEEB", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663453066566/tuRZHcuXztXUhrlr.mp4" },
            { label: "EX Robotics", sublabel: "真机 · 真实场景 · 工业部署", color: "#87CEEB", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663453066566/vnvEvCYsDcSKWSZY.mp4" },
            { label: "711 便利店机器人", sublabel: "真实场景 · 零售落地", color: "#FFB347", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663453066566/FdzAmxZVKQBUiboj.mp4" },
            { label: "Reflex Robotics", sublabel: "真机 · 遥操作 · 服务场景", color: "#A78BFA", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663453066566/ZdtBcOyvsTvpavhU.mp4" },
          ].map((item, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden border border-white/8 bg-surface/30 group hover:border-white/20 transition-all duration-300">
              {/* 16:9 video */}
              <div className="aspect-video bg-black relative">
                <video
                  className="w-full h-full object-cover"
                  src={item.src}
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                {/* Corner badge */}
                <div className="absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-mono-brand font-bold z-10 pointer-events-none" style={{ backgroundColor: `${item.color}20`, color: item.color, border: `1px solid ${item.color}40` }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
              {/* Label */}
              <div className="p-4">
                <p className="font-display font-bold text-white text-base mb-0.5">{item.label}</p>
                <p className="text-white/40 text-xs">{item.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 投资 vs 赚钱 */}
      <div className="container relative z-10"><InvestmentVsEarning /></div>

      {/* Divider */}
      <div className="container relative z-10">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* 为什么是遥操作 */}
      <div className="container relative z-10 mt-20 md:mt-28 mb-16">
        <h3 className="font-cn font-bold text-white text-2xl md:text-3xl mb-4">为什么是遥操作<span className="text-neon">？</span></h3>
        <p className="text-white/50 text-base md:text-lg max-w-3xl leading-relaxed mb-10">从第一天就让机器人在真实场景里迭代进化，而不是在仿真环境里搭建完美的假象。</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mb-12">
          {[
            { num: "01", text: "计算机无法真实模仿真实物理世界的场景 —— 仿真器与真实世界之间存在不可逾越的 Sim-to-Real Gap" },
            { num: "02", text: "人和机器人的感受器、执行器不相同 —— UMI 采集路线面临构型错位的结构性问题" },
          ].map(item => (
            <div key={item.num} className="flex items-start gap-3 p-5 rounded-xl bg-signal-red/5 border border-signal-red/10">
              <span className="text-signal-red text-lg mt-0.5 shrink-0 font-mono-brand font-bold">{item.num}</span>
              <p className="text-white/70 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Images */}
      <div className="container relative z-10 mb-16">
        <h4 className="font-cn font-bold text-white text-lg md:text-xl mb-3">幻觉 01 / <span className="text-signal-red">仿真 ≠ 真实</span></h4>
        <p className="text-white/40 text-sm mb-6 max-w-2xl">同样的机械臂，同样的动作指令——但场景不同，结果天壤之别。</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {[
            { src: IMAGES.simLabScene, label: "仿真实验室", color: "#60A5FA", desc: "完美的桌面、标准光照、无干扰环境。机器人精准抓取——一切都太完美了，这不是真实世界。" },
            { src: IMAGES.realClutterScene, label: "真实场景", color: "#F87171", desc: "杂乱桌面、奇形光线、随机障碍物。同样的指令，仿真训练的模型完全失效——这才是真实世界。" },
          ].map((img, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative rounded-2xl overflow-hidden border border-white/8 group">
              <img src={img.src} alt={img.label} className="w-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/90 via-[#0A0A0F]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: img.color }} />
                  <span className="font-display font-bold text-sm" style={{ color: img.color }}>{img.label}</span>
                </div>
                <p className="text-white/50 text-xs leading-relaxed">{img.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <h4 className="font-cn font-bold text-white text-lg md:text-xl mb-3">幻觉 02 / <span className="text-signal-red">没有本体感受 = 抓不住</span></h4>
        <p className="text-white/40 text-sm mb-6 max-w-2xl">同样的箱子，同样的抓取动作——但没有力反馈，机器人无法区分棉花和石头。</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { src: IMAGES.cottonGrasp, label: "装棉花的箱子", color: "#34D399", badge: "✓ 成功", isSuccess: true, desc: "透视视角可见箱内棉花。机器人有本体感受，能感知轻重——成功抓起并搬运。" },
            { src: IMAGES.stoneDrop, label: "装石头的箱子", color: "#F87171", badge: "✗ 失败", isSuccess: false, desc: "透视视角可见箱内石头。没有力反馈的机器人无法区分重量——箱子掉落在地。" },
          ].map((img, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative rounded-2xl overflow-hidden border border-white/8 group">
              <img src={img.src} alt={img.label} className="w-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/90 via-[#0A0A0F]/20 to-transparent" />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-mono-brand font-bold border ${img.isSuccess ? "bg-neon/20 border-neon/40 text-neon" : "bg-signal-red/20 border-signal-red/40 text-signal-red"}`}>{img.badge}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: img.color }} />
                  <span className="font-display font-bold text-sm" style={{ color: img.color }}>{img.label}</span>
                </div>
                <p className="text-white/50 text-xs leading-relaxed">{img.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 再过10年，你靠什么赢 */}
      <div className="container relative z-10 mb-16 mt-20 md:mt-28">
        <h3 className="font-cn font-bold text-white text-2xl md:text-3xl mb-4">
          再过 10 年，你靠什么赢<span className="text-neon">？</span>
        </h3>
        <p className="text-white/50 text-base md:text-lg max-w-3xl leading-relaxed mb-10">
          当算力变成商品、算法可以开源，所有公司的模型都差不多的时候，什么才是真正的护城河？
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mb-10">
          {[
            { icon: "🏭", title: "高保真场景数据", desc: "真实物理交互生成的数据，无法在仿真环境中复制。每一台机器人在工作，就是在为数据壁垒加砖。", color: "#00FF88" },
            { icon: "🔄", title: "自增强飞轮", desc: "赚到钱 → 采数据 → 训练模型 → 更少人监管更多台机器人 → 赚更多钱。并联而非串联。", color: "#60A5FA" },
            { icon: "🌏", title: "跨国劳动力套利", desc: "资产在中国，操作员在越南，服务在日本和美国。这个套利窗口小且时间有限。", color: "#FFB347" },
          ].map(item => (
            <div key={item.title} className="p-5 rounded-xl bg-surface/30 border border-white/5 hover:border-white/10 transition-colors">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h4 className="font-cn font-bold text-base mb-2" style={{ color: item.color }}>{item.title}</h4>
              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Core conclusion quote */}
      <div className="container relative z-10 mb-20">
        <blockquote className="relative max-w-4xl mx-auto text-center py-10 px-6 rounded-2xl bg-surface/20 border border-white/5">
          <div className="absolute -top-px left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-neon/60 to-transparent" />
          <p className="font-cn font-bold text-xl md:text-3xl text-white leading-relaxed">
            "算力是商品。算法会流动。<br className="hidden md:block" />
            唯有<span className="text-neon neon-glow">高保真场景数据</span>，难以复制。"
          </p>
          <p className="mt-6 text-neon/80 text-base md:text-lg font-cn font-semibold">我们选择在第一天让机器人在场景里迭代进化。</p>
        </blockquote>
      </div>

      {/* Comparison Table */}
      <div ref={tableRef} className="container relative z-10 mb-20">
        <h4 className="font-cn font-bold text-white text-xl md:text-2xl mb-6 text-center">传统路径 vs <span className="text-neon">仓颉路径</span></h4>
        <div className="overflow-x-auto rounded-xl border border-white/5">
          <table className="w-full max-w-4xl mx-auto border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-surface/30">
                <th className="text-left py-4 px-5 text-white/50 text-sm font-display font-medium w-28">维度</th>
                <th className="text-left py-4 px-5 text-signal-red/80 text-sm font-display font-medium">传统路径</th>
                <th className="text-left py-4 px-5 text-neon/80 text-sm font-display font-medium">仓颉路径</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <motion.tr key={row.dimension}
                  initial={{ opacity: 0, x: -20 }} animate={tableInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-5 text-white/70 text-sm font-medium">{row.dimension}</td>
                  <td className="py-4 px-5 text-white/40 text-sm">{row.traditional}</td>
                  <td className="py-4 px-5 text-neon/70 text-sm font-medium">{row.cangjie}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Flywheel */}
      <div className="container relative z-10"><FlywheelDiagram /></div>

      {/* Divider */}
      <div className="container relative z-10">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Arbitrage Calculator */}
      <div className="container relative z-10 mt-20 md:mt-28">
        <h3 className="font-cn font-bold text-white text-2xl md:text-3xl mb-6 text-center">
          <span className="text-neon neon-glow">跨国劳动力套利</span>，极速回本
        </h3>
        <p className="text-white/50 text-center text-base md:text-lg mb-12 max-w-2xl mx-auto">
          当硅谷还在烧钱跑Demo时，我们已经从Day 1开始，把跨国劳动力套利变成了现金流。
        </p>
        <ArbitrageCalculator />
      </div>
    </section>
  );
}
