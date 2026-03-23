/*
 * Design: Industrial Cyberpunk — Step 4: Why Us
 * Merges Why China cards + Team content
 * 4a: 为什么在中国 (Three cards about China's advantages)
 * 4b: 团队 (Team members, RoboMaster, path comparison, media showcase)
 */
import { IMAGES } from "@/lib/assets";
import { useFadeUpStagger } from "@/hooks/useAnimations";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "杨卓霖",
    role: "创始人 / CEO",
    highlights: [
      "北理工机器人所在读",
      "北科大刘芹李泽湘班",
      "北科RM电控组组长",
      "RoboMaster国一、国三",
      "创业单月收入16W",
    ],
  },
  {
    name: "彭天宇",
    role: "联合创始人 / 创新结构设计师",
    highlights: [
      "Robot Native",
      "北师大二附机器人队",
      "北科RoboMaster成员",
      "联合创业伙伴",
      "代表作：多模态爬壁机器人、管道探测机器人",
    ],
  },
];

const whyChinaCards = [
  {
    icon: "🎓",
    title: "大量优质溢出的工程师人才",
    description: "中国每年数百万理工科毕业生中，相当比例进入制造业。由于产能过剩导致的内卷，优质工程师成本远低于欧美，但技术实力全球顶尖。",
  },
  {
    icon: "🏭",
    title: "最全面的非结构化场景",
    description: "从即时零售前置仓到社区团购站点，从餐饮后厨到废品回收站。中国拥有全球最复杂、最多元的非结构化场景，是具身智能的最佳训练场。",
  },
  {
    icon: "🚗",
    title: "电动汽车及智能制造产业的溢出",
    description: "新能源汽车供应链内卷带来的红利：关节电机、减速器、电池等核心部件成本持续下探，逼近材料物理极限。",
  },
];

export default function WhyUsSection() {
  const staggerRef = useFadeUpStagger();

  return (
    <section id="why-us" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={IMAGES.teamBg} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#0A0A0F]/90 to-[#0A0A0F]" />
      </div>

      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      }} />

      {/* ====== 4a. 为什么在中国 ====== */}
      <div ref={staggerRef} className="container relative z-10 mb-20 md:mb-28">
        <p className="font-mono-brand text-neon/70 text-xs tracking-[0.25em] uppercase mb-4">
          Step 04 — Why Us
        </p>
        <h2 className="font-cn font-black text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
          在全球最完整的硬件供应链
          <br />
          与<span className="text-neon neon-glow">最庞大的非结构化场景</span>中
        </h2>
        <p className="text-white/50 text-base md:text-lg max-w-3xl leading-relaxed mb-12">
          中国恰好具备做这件事的所有结构性优势。不是我们选择中国，是这件事只能发生在中国。
        </p>

        {/* Three Why China cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
          {whyChinaCards.map((card, i) => (
            <motion.div
              key={card.title}
              data-animate
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="p-6 md:p-8 rounded-xl bg-surface/40 border border-white/5 hover:border-neon/15 transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-neon/5 border border-neon/10 flex items-center justify-center mb-5 group-hover:bg-neon/10 transition-colors">
                <span className="text-2xl">{card.icon}</span>
              </div>
              <h3 className="font-cn font-bold text-white text-lg mb-3">{card.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="container relative z-10">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ====== 4b. 团队 ====== */}
      <div className="container relative z-10 mt-20 md:mt-28 mb-16">
        <h3 className="font-cn font-bold text-2xl md:text-4xl text-white leading-tight mb-4">
          从 Day One 就靠机器人创业
          <br />
          <span className="text-neon neon-glow">赚到过钱的 Team</span>
        </h3>
        <p className="text-white/50 text-base md:text-lg max-w-3xl leading-relaxed">
          一起打过比赛、睡过走廊、分过钱的 00 后机器人团队
        </p>
      </div>

      {/* RoboMaster badge */}
      <div className="container relative z-10 mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-4 px-6 py-4 rounded-xl bg-neon/5 border border-neon/20"
          style={{ boxShadow: "0 0 30px rgba(0,255,136,0.08)" }}
        >
          <div className="w-10 h-10 rounded-full border-2 border-neon/40 flex items-center justify-center">
            <span className="font-display font-bold text-neon text-sm">RM</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm md:text-base">国家级一等奖 · 全国前16强</p>
            <p className="text-white/40 text-xs">400+支全国顶尖高校队伍 · 真实对抗 · 真实摩擦</p>
          </div>
        </motion.div>
      </div>

      {/* Team members */}
      <div className="container relative z-10 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="p-8 rounded-xl bg-surface/40 border border-white/5 hover:border-neon/15 transition-colors"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-neon/10 border border-neon/20 flex items-center justify-center">
                  <span className="font-cn font-bold text-neon text-lg">{member.name[0]}</span>
                </div>
                <div>
                  <h4 className="font-cn font-bold text-white text-lg">{member.name}</h4>
                  <p className="font-display text-neon/60 text-sm">{member.role}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {member.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-white/45 text-sm">
                    <span className="text-neon/50 mt-1.5 flex-shrink-0">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video / Media showcase - Real content */}
      <div className="container relative z-10 mb-20">
        <h4 className="font-cn font-bold text-white text-lg md:text-xl mb-2">
          我们一起做过的事
        </h4>
        <p className="text-white/30 text-sm mb-8">
          从 RoboMaster 赛场到创业实战，每一步都在真实世界中磨练
        </p>

        {/* Videos row 1 - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mb-5">
          {[
            { label: "Robomaster 工程机器人", desc: "真实对抗中锻造的工程直觉", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663453066566/ayJeiMxTjivGmNlZ.mp4" },
            { label: "管道探测机器人", desc: "从概念到产品的完整交付", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663453066566/JzrNwGZZrFjsXdNP.mp4" },
            { label: "智能网球拍", desc: "传感器融合与运动分析", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663453066566/UnhoGqEUfQXSxzrV.mp4" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl overflow-hidden border border-white/8 bg-surface/30 hover:border-white/20 transition-all duration-300"
            >
              <div className="aspect-video bg-black">
                <video className="w-full h-full object-cover" src={item.src} controls muted loop playsInline preload="metadata" />
              </div>
              <div className="p-3">
                <p className="font-display font-bold text-white text-sm mb-0.5">{item.label}</p>
                <p className="text-white/40 text-xs">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Videos row 2 - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mb-12">
          {[
            { label: "收存发全自动羽毛球发球机", desc: "机电一体化 · 自动化系统设计", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663453066566/jIdhLBjOrCvTxjMq.mp4" },
            { label: "机器人夏令营", desc: "带领学生从零搭建机器人", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663453066566/vNqWldrutadOXkoz.mp4" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
              className="rounded-xl overflow-hidden border border-white/8 bg-surface/30 hover:border-white/20 transition-all duration-300"
            >
              <div className="aspect-video bg-black">
                <video className="w-full h-full object-cover" src={item.src} controls muted loop playsInline preload="metadata" />
              </div>
              <div className="p-3">
                <p className="font-display font-bold text-white text-sm mb-0.5">{item.label}</p>
                <p className="text-white/40 text-xs">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Photos - ordered timeline */}
        <p className="text-white/20 text-xs font-mono-brand tracking-widest uppercase mb-6">— 成长轨迹 —</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl">
          {[
            { label: "一起做机器人", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663453066566/KaFIXHWEjicQVsJA.jpg" },
            { label: "输过比赛", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663453066566/MFmaklDUEgOFVpPd.jpg" },
            { label: "开公司", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663453066566/QdRULBqXrovqsqXP.jpg" },
            { label: "做自己的创客工作室", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663453066566/ZFgSKcGyOpGWKBMd.jpg" },
            { label: "办暑期研学", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663453066566/NrKwFrmoinnbkgks.jpg" },
            { label: "交付过 50 台机器人", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663453066566/ZyTtkJbwiYzscLnU.jpg" },
            { label: "获得学生和家长的极大肯定", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663453066566/GByPNDuSSppHAZmD.jpg" },
          ].map((photo, i) => (
            <motion.div
              key={photo.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="rounded-xl overflow-hidden border border-white/8 bg-surface/30 hover:border-neon/20 transition-all duration-300 group"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-2.5">
                <p className="text-white/50 text-xs font-cn text-center">{photo.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why us quote */}
      <div className="container relative z-10">
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="font-cn text-xl md:text-2xl text-white/70 leading-relaxed italic">
            "从第一天起就拒绝了纯仿真路线，拒绝了UMI的构型妥协。选择了最难但最正确的道路——用真机，在真实场景中干活。"
          </p>
          <p className="text-neon/60 text-base md:text-lg mt-6 font-display">
            "未来，属于那些敢于弄脏双手的人。"
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}
