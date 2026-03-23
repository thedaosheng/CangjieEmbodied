/*
 * Design: Industrial Cyberpunk — Why Now Section (Step 2)
 * 一边喊缺工，一边没人干
 * Section body: brief intro + entry card → opens 4-layer interactive overlay
 */
import { useFadeUpStagger } from "@/hooks/useAnimations";
import { motion } from "framer-motion";
import { useState } from "react";
import LaborCrisisPanel from "./LaborCrisisPanel";

export default function WhyNowSection() {
  const staggerRef = useFadeUpStagger();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <section id="why-now" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div ref={staggerRef} className="container relative z-10 max-w-4xl mx-auto text-center px-4">
        {/* Section header */}
        <p data-animate className="font-mono-brand text-neon/70 text-xs tracking-[0.25em] uppercase mb-4">
          Step 02 — Why Now
        </p>
        <h2 data-animate className="font-cn font-black text-2xl md:text-4xl lg:text-5xl text-white leading-tight mb-6">
          一边喊缺工，一边没人干
        </h2>
        <p data-animate className="text-white/60 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-12">
          这不是景气周期的问题，不是薪资不够高的问题。<br className="md:hidden" />
          是结构性的：年轻人不愿干，老龄化不可逆，机器人是唯一的出路。
        </p>

        {/* Entry Card */}
        <motion.div
          data-animate
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ scale: 1.02 }}
          className="inline-block"
        >
          <button
            onClick={() => setIsPanelOpen(true)}
            className="group relative px-10 py-8 md:px-16 md:py-12 rounded-2xl bg-surface/40 border border-white/5 border-l-2 border-l-neon hover:border-neon/30 transition-all duration-300 cursor-pointer text-left"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center group-hover:bg-neon/20 transition-all">
                <svg className="w-8 h-8 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l6-6m0 0l-6 6m10-3.5a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              {/* Text */}
              <div className="text-left">
                <h3 className="font-cn font-bold text-xl md:text-2xl text-white mb-2">
                  一个年轻人面前的两份工作
                </h3>
                <p className="text-white/50 text-sm md:text-base">
                  一个 60 秒的思想实验
                </p>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center group-hover:bg-neon/20 transition-all">
                  <svg className="w-6 h-6 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-4 text-neon/70 text-sm font-display">
              开始体验 →
            </div>
          </button>
        </motion.div>

        {/* Hint text */}
        <motion.p
          data-animate
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          className="text-white/30 text-sm mt-6 max-w-xl mx-auto"
        >
          花费 60 秒体验，理解全球劳动力危机的真相
        </motion.p>
      </div>

      {/* Interactive Overlay Panel */}
      <LaborCrisisPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </section>
  );
}
