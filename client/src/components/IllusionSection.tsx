/*
 * Design: Industrial Cyberpunk — Data Ownership Section
 * Title: 具身数据的定义权在场景里
 * Two contrast pairs using generated comparison images
 * Updated: Sim vs Real description (stone grasping + box falling), UMI comparison
 */
import { IMAGES } from "@/lib/assets";
import { useFadeUpStagger, useInView } from "@/hooks/useAnimations";
import { motion } from "framer-motion";

const comparisonData = [
  {
    dimension: "硬件精度",
    traditional: "航天级谐波减速器，\u00b10.01mm",
    cangjie: "80 年前已经成熟的行星减速器",
  },
  {
    dimension: "容错机制",
    traditional: "无反馈盲操，一次做对",
    cangjie: "高频人在回路，实时闭环纠错",
  },
  {
    dimension: "评价标准",
    traditional: "这个动作精度够不够？",
    cangjie: "这个任务能不能做成？",
  },
  {
    dimension: "数据定义权",
    traditional: "由算法工程师在实验室定义",
    cangjie: "由真实场景中的物理交互定义",
  },
  {
    dimension: "成本结构",
    traditional: "硬件成本占主导，边际成本指数增长",
    cangjie: "硬件成本极低，智能成本随数据积累递减",
  },
];

export default function IllusionSection() {
  const staggerRef = useFadeUpStagger();
  const { ref: tableRef, inView: tableInView } = useInView(0.1);

  return (
    <section id="illusion" className="relative py-24 md:py-32 overflow-hidden">
      {/* Section header */}
      <div ref={staggerRef} className="container mb-16 md:mb-20">
        <p data-animate className="font-mono-brand text-neon/70 text-xs tracking-[0.25em] uppercase mb-4">
          Section 02 — Data Ownership
        </p>
        <h2 data-animate className="font-cn font-black text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
          具身数据的定义权
          <br />
          <span className="text-neon">在场景里</span>
        </h2>
        <p data-animate className="text-white/30 text-sm md:text-base font-display tracking-wide mb-6">
          Robotic Native Makes Robot Alive
        </p>

        {/* Two core insights */}
        <div data-animate className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-signal-red/5 border border-signal-red/10">
            <span className="text-signal-red text-lg mt-0.5 shrink-0">01</span>
            <div>
              <p className="text-white/70 text-sm leading-relaxed">
                <span className="text-signal-red font-medium">计算机无法真实模仿真实物理世界的场景</span> —— 仿真器与真实世界之间存在不可逾越的 Sim-to-Real Gap
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-signal-red/5 border border-signal-red/10">
            <span className="text-signal-red text-lg mt-0.5 shrink-0">02</span>
            <div>
              <p className="text-white/70 text-sm leading-relaxed">
                <span className="text-signal-red font-medium">人和机器人的感受器、执行器不相同</span> —— UMI 采集路线面临构型错位的结构性问题
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contrast Pair 1: Simulation vs Reality - Full width comparison image */}
      <div className="container mb-16">
        <h3 className="font-cn font-bold text-white text-lg md:text-xl mb-6">
          幻觉 01 / <span className="text-signal-red">仿真 ≠ 真实</span>
        </h3>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden neon-border"
        >
          <img
            src={IMAGES.simVsReal}
            alt="仿真环境 vs 真实场景对比"
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-display font-bold text-white text-lg mb-2">仿真场景</h4>
                <p className="text-white/40 text-sm leading-relaxed">
                  完美的桌面、标准的石头、均匀的光照。机器人精准地抓取石头——一切都太完美了，这不是真实世界。
                </p>
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-lg mb-2">真实场景</h4>
                <p className="text-white/40 text-sm leading-relaxed">
                  同样的夹取姿势、同样的开合程度，但箱子里是石头。没有力反馈的机器人无法区分重量——箱子掉落在地。
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contrast Pair 2: UMI Human vs Robot - Full width comparison image */}
      <div className="container mb-16">
        <h3 className="font-cn font-bold text-white text-lg md:text-xl mb-6">
          幻觉 02 / <span className="text-signal-red">人手 ≠ 机器手</span>
        </h3>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden neon-border"
        >
          <img
            src={IMAGES.umiComparison}
            alt="人类示教采集 vs 机器人自主执行"
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-display font-bold text-white text-lg mb-2">人手采集 (UMI)</h4>
                <p className="text-white/40 text-sm leading-relaxed">
                  人手有天然的力反馈，能感知物体的重量并自适应调节握力。数据看起来完美，但这是人的能力，不是机器人的。
                </p>
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-lg mb-2">机器人执行</h4>
                <p className="text-white/40 text-sm leading-relaxed">
                  机器人的感受器和执行器与人完全不同。用人手采集的数据训练机器人，就像用鸟的飞行数据教飞机飞行——构型错位。
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Core conclusion */}
      <div className="container mb-20">
        <blockquote className="relative max-w-4xl mx-auto text-center py-8">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-neon/50" />
          <p className="font-cn font-bold text-xl md:text-3xl text-white leading-relaxed">
            "算力是商品。算法会流动。
            <br className="hidden md:block" />
            唯有<span className="text-neon neon-glow">高保真场景数据</span>，难以复制。"
          </p>
          <p className="mt-6 text-neon/80 text-base md:text-lg font-cn font-semibold">
            我们选择在第一天让机器人在场景里迭代进化。
          </p>
        </blockquote>
      </div>

      {/* Comparison table */}
      <div ref={tableRef} className="container">
        <h3 className="font-cn font-bold text-white text-xl md:text-2xl mb-6 text-center">
          传统路径 vs <span className="text-neon">仓颉路径</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full max-w-4xl mx-auto border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4 text-white/50 text-sm font-display font-medium w-28">维度</th>
                <th className="text-left py-4 px-4 text-signal-red/80 text-sm font-display font-medium">传统路径</th>
                <th className="text-left py-4 px-4 text-neon/80 text-sm font-display font-medium">仓颉路径</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <motion.tr
                  key={row.dimension}
                  initial={{ opacity: 0, x: -20 }}
                  animate={tableInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-4 px-4 text-white/70 text-sm font-medium">{row.dimension}</td>
                  <td className="py-4 px-4 text-white/40 text-sm">{row.traditional}</td>
                  <td className="py-4 px-4 text-neon/70 text-sm font-medium">{row.cangjie}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
