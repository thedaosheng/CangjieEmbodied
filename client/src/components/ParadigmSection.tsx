/*
 * Design: Industrial Cyberpunk — Our Paradigm
 * Mobius strip visual, cost curve comparison, "good-enough" philosophy
 */
import { IMAGES } from "@/lib/assets";
import { useFadeUpStagger } from "@/hooks/useAnimations";
import { motion } from "framer-motion";

export default function ParadigmSection() {
  const staggerRef = useFadeUpStagger();

  return (
    <section id="paradigm" className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Section header */}
      <div ref={staggerRef} className="container relative z-10 mb-16 md:mb-20">
        <p data-animate className="font-mono-brand text-neon/70 text-xs tracking-[0.25em] uppercase mb-4">
          Section 03 — Our Paradigm
        </p>
        <h2 data-animate className="font-cn font-black text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
          闭环反馈，
          <span className="text-neon neon-glow">平替刚性溢价</span>
        </h2>
        <p data-animate className="text-white/50 text-lg md:text-xl max-w-3xl leading-relaxed">
          我们不需要航天级的昂贵电机。因为开放世界需要的不是死板的精确，而是高频的纠错。
        </p>
      </div>

      {/* Mobius strip visual */}
      <div className="container relative z-10 mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden neon-border"
        >
          <img
            src={IMAGES.mobiusConcept}
            alt="闭环莫比乌斯环"
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-[#0A0A0F]/30" />

          {/* Labels on the mobius strip */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-data-blue animate-pulse" />
                <span className="font-display text-data-blue text-sm md:text-base">
                  差不多的硬件 Good-enough Hardware
                </span>
              </div>
              <div className="hidden md:block w-16 h-[1px] bg-neon/30" />
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-neon animate-pulse" />
                <span className="font-display text-neon text-sm md:text-base">
                  高频人在回路 Human-in-the-Loop
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Two pillars */}
      <div className="container relative z-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Pillar 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-8 rounded-xl bg-surface/50 border border-white/5"
          >
            <div className="w-12 h-12 rounded-lg bg-signal-red/10 border border-signal-red/20 flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-signal-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="font-cn font-bold text-white text-xl mb-3">刚性溢价的死胡同</h3>
            <p className="text-white/45 text-sm leading-relaxed mb-4">
              传统路径追求极致的硬件精度——航天级谐波减速器、±0.01mm的重复定位精度。这条路的代价是：每提升一个数量级的精度，成本呈指数级增长。
            </p>
            <p className="text-white/45 text-sm leading-relaxed">
              更致命的是，这种"刚性"思维假设世界是确定的、可预测的。但开放世界恰恰相反——它是连续的、混乱的、充满意外的。
            </p>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-8 rounded-xl bg-surface/50 border border-white/5"
          >
            <div className="w-12 h-12 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-cn font-bold text-white text-xl mb-3">"差不多"哲学的最优解</h3>
            <p className="text-white/45 text-sm leading-relaxed mb-4">
              仓颉的答案是：用"差不多"的硬件 + 高频闭环纠错，替代昂贵的刚性精度。就像人类——我们的手臂精度远不如工业机械臂，但我们能完成几乎所有任务。
            </p>
            <p className="text-white/45 text-sm leading-relaxed">
              秘密在于：我们有眼睛（视觉反馈）、有触觉（力反馈）、有大脑（实时决策）。我们不需要一次做对，我们可以不断纠错。
            </p>
          </motion.div>
        </div>
      </div>

      {/* Cost curve comparison */}
      <div className="container relative z-10">
        <h3 className="font-cn font-bold text-white text-xl md:text-2xl mb-8 text-center">
          成本曲线对比
        </h3>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto p-8 rounded-2xl bg-surface/30 border border-white/5"
        >
          {/* SVG Cost Curve */}
          <div className="relative w-full aspect-[2/1]">
            <svg viewBox="0 0 600 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={`h-${i}`}
                  x1="60"
                  y1={40 + i * 55}
                  x2="570"
                  y2={40 + i * 55}
                  stroke="rgba(255,255,255,0.05)"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Axes */}
              <line x1="60" y1="260" x2="570" y2="260" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="60" y1="40" x2="60" y2="260" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

              {/* X axis labels */}
              <text x="60" y="280" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="Space Grotesk">90%</text>
              <text x="180" y="280" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="Space Grotesk">95%</text>
              <text x="320" y="280" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="Space Grotesk">99%</text>
              <text x="500" y="280" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="Space Grotesk">99.99%</text>
              <text x="260" y="298" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="Space Grotesk">任务完成精度</text>

              {/* Y axis label */}
              <text x="15" y="155" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="Space Grotesk" transform="rotate(-90, 15, 155)">单次动作成本</text>

              {/* Traditional path - exponential red curve */}
              <path
                d="M 80 240 Q 200 230 300 200 Q 400 150 450 90 Q 500 50 550 42"
                fill="none"
                stroke="#FF3B3B"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Cangjie path - flat green curve */}
              <path
                d="M 80 220 Q 200 200 300 190 Q 400 185 500 183 L 550 182"
                fill="none"
                stroke="#00FF88"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Intersection point */}
              <circle cx="195" cy="210" r="6" fill="none" stroke="#00FF88" strokeWidth="2" />
              <circle cx="195" cy="210" r="3" fill="#00FF88" />

              {/* Sweet spot label */}
              <rect x="130" y="190" width="60" height="16" rx="3" fill="rgba(0,255,136,0.15)" />
              <text x="160" y="201" fill="#00FF88" fontSize="9" fontFamily="Space Grotesk" textAnchor="middle">Sweet Spot</text>

              {/* Legend */}
              <line x1="380" y1="30" x2="400" y2="30" stroke="#FF3B3B" strokeWidth="2" />
              <text x="405" y="34" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="Space Grotesk">传统路径</text>
              <line x1="380" y1="48" x2="400" y2="48" stroke="#00FF88" strokeWidth="2" />
              <text x="405" y="52" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="Space Grotesk">仓颉路径</text>
            </svg>
          </div>

          <p className="text-center text-white/30 text-xs mt-4 font-display">
            在95%精度处，两条曲线交叉——仓颉路径的边际成本趋近于零
          </p>
        </motion.div>
      </div>
    </section>
  );
}
