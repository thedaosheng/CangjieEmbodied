/*
 * Design: Industrial Cyberpunk — The Economic Engine
 * CountUp numbers, player matrix, labor cost comparison, 15-month payback formula
 */
import { useCountUp, useFadeUpStagger } from "@/hooks/useAnimations";
import { motion } from "framer-motion";
import { useMemo } from "react";

const players = [
  {
    name: "1X Technologies",
    desc: "NEO人形机器人，$20K售价，与EQT合作计划2026-2030部署10,000台",
    tag: "$100亿估值目标",
  },
  {
    name: "Reflex Robotics",
    desc: "YC孵化的双臂轮式机器人，已与GXO等物流巨头合作商业出货",
    tag: "生产成本降低20倍",
  },
  {
    name: "Tesla Optimus",
    desc: "2025年Tesla Diner爆米花遥操演示，计划将Fremont工厂转产Optimus",
    tag: "目标年产数千台",
  },
  {
    name: "Telexistence × 7-11",
    desc: "已在日本300+家便利店部署补货机器人，由菲律宾马尼拉工人远程VR操控",
    tag: "遥操+套利验证",
  },
];

export default function EngineSection() {
  const staggerRef = useFadeUpStagger();

  const bomOpts = useMemo(() => ({ prefix: "¥", separator: "," }), []);
  const monthlyOpts = useMemo(() => ({ prefix: "¥", separator: "," }), []);
  const paybackOpts = useMemo(() => ({ suffix: "个月" }), []);

  const bomRef = useCountUp(60000, bomOpts);
  const monthlyRef = useCountUp(4000, monthlyOpts);
  const paybackRef = useCountUp(15, paybackOpts);

  return (
    <section id="engine" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />

      {/* Section header */}
      <div ref={staggerRef} className="container relative z-10 mb-16 md:mb-20">
        <p data-animate className="font-mono-brand text-neon/70 text-xs tracking-[0.25em] uppercase mb-4">
          Section 04 — The Economic Engine
        </p>
        <h2 data-animate className="font-cn font-black text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
          <span className="text-neon neon-glow">15个月</span>，极速回本
        </h2>
        <p data-animate className="text-white/50 text-lg md:text-xl max-w-3xl leading-relaxed">
          当硅谷还在烧钱跑Demo时，我们已经从Day 1开始，把跨国劳动力套利变成了现金流。
        </p>
      </div>

      {/* Industry players horizontal scroll */}
      <div className="container relative z-10 mb-20">
        <h3 className="font-cn font-bold text-white text-lg md:text-xl mb-6">行业共识：遥操作的黎明已经到来</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide scroll-mask">
          {players.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="min-w-[300px] md:min-w-[340px] snap-start p-6 rounded-xl bg-surface/50 border border-white/5 hover:border-neon/20 transition-all group flex-shrink-0"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-display font-bold text-white text-base">{p.name}</h4>
                <span className="text-[10px] font-mono-brand text-neon/70 bg-neon/10 px-2 py-1 rounded whitespace-nowrap ml-2">
                  {p.tag}
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Labor cost comparison */}
      <div className="container relative z-10 mb-20">
        <h3 className="font-cn font-bold text-white text-lg md:text-xl mb-8 text-center">
          一笔刺眼的账：跨国劳动力套利
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-center">
          {/* China cost */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 md:p-8 rounded-xl bg-signal-red/5 border border-signal-red/20 text-center"
          >
            <p className="text-white/40 text-sm mb-2">中国二线城市 · 物流分拣工人</p>
            <p className="font-mono-brand text-signal-red text-3xl md:text-4xl font-bold">
              ¥7,000<span className="text-lg">-8,000</span>
            </p>
            <p className="text-white/30 text-xs mt-2">月薪 / Monthly</p>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center py-4"
          >
            <span className="text-neon text-4xl font-bold neon-glow">&times;</span>
            <p className="text-neon/60 text-xs mt-2 text-center font-display">跨国劳动力套利的巨大势能差</p>
          </motion.div>

          {/* Vietnam cost */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 md:p-8 rounded-xl bg-neon/5 border border-neon/20 text-center"
          >
            <p className="text-white/40 text-sm mb-2">越南制造业腹地 · 熟练工人</p>
            <p className="font-mono-brand text-neon text-3xl md:text-4xl font-bold">
              ¥2,000<span className="text-lg">-3,000</span>
            </p>
            <p className="text-white/30 text-xs mt-2">月薪 / Monthly</p>
          </motion.div>
        </div>
      </div>

      {/* 15-month payback formula */}
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto p-8 md:p-12 rounded-2xl neon-border bg-[#0A0A0F]/80 text-center"
        >
          <p className="font-mono-brand text-neon/50 text-xs tracking-widest uppercase mb-8">
            Core Formula / 核心公式
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-10">
            {/* BOM */}
            <div className="text-center">
              <span ref={bomRef} className="font-mono-brand text-white text-3xl md:text-5xl font-bold block">
                ¥0
              </span>
              <p className="text-white/30 text-xs mt-2">BOM 成本</p>
            </div>

            <span className="text-white/30 text-2xl md:text-4xl font-light">&divide;</span>

            {/* Monthly */}
            <div className="text-center">
              <span ref={monthlyRef} className="font-mono-brand text-neon text-3xl md:text-5xl font-bold block">
                ¥0
              </span>
              <p className="text-white/30 text-xs mt-2">月净套利值</p>
            </div>

            <span className="text-white/30 text-2xl md:text-4xl font-light">=</span>

            {/* Payback */}
            <div className="text-center">
              <span ref={paybackRef} className="font-mono-brand text-neon text-4xl md:text-6xl font-bold neon-glow block">
                0
              </span>
              <p className="text-white/30 text-xs mt-2">回本周期</p>
            </div>
          </div>

          {/* Comparison callout */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-6 border-t border-white/5">
            <div className="flex items-center gap-3">
              <span className="text-white/20 text-2xl">&#9749;</span>
              <div className="text-left">
                <p className="text-white/50 text-sm">投资一家奶茶店</p>
                <p className="text-white/30 text-xs">回本周期 ≈ 12个月</p>
              </div>
            </div>
            <div className="hidden sm:block w-8 h-[1px] bg-white/10" />
            <div className="flex items-center gap-3">
              <span className="text-neon/60 text-2xl">&#9881;</span>
              <div className="text-left">
                <p className="text-neon/70 text-sm font-medium">投资一台仓颉机器人</p>
                <p className="text-white/30 text-xs">回本周期 ≈ 15个月</p>
              </div>
            </div>
          </div>

          <p className="text-white/25 text-xs mt-6 leading-relaxed max-w-lg mx-auto">
            加速器：随着新能源汽车供应链内卷，关节电机成本正无限逼近材料物理极限 → 回本周期只会越来越短
          </p>
        </motion.div>
      </div>
    </section>
  );
}
