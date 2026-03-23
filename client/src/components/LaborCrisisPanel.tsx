/*
 * Design: Industrial Cyberpunk — Labor Crisis Interactive Panel (4-Layer Experience)
 * Layer 1: Two Job Offers (China/Japan/US tabs)
 * Layer 2: Supply-Demand Gap (dynamic curves + 6 data anchors)
 * Layer 3: Real-world Scenarios (3 cards)
 * Layer 4: Blue Ocean Market (funnel visualization)
 */
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { IMAGES } from "@/lib/assets";

type Country = "cn" | "jp" | "us";
type Layer = 1 | 2 | 3 | 4;
type UserChoice = "A" | "B" | null;

interface LaborCrisisPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const jobData = {
  cn: {
    country: "中国",
    flag: "🇨🇳",
    jobA: {
      title: "工作 A",
      salary: "5,000 - 7,000 元/月",
      location: "仓库内固定工位",
      hours: "12 小时轮班",
      content: "重体力搬运分拣",
      benefits: "五险一金不全",
      prospect: "无上升通道",
    },
    jobB: {
      title: "工作 B",
      salary: "8,000 - 12,000 元/月",
      location: "户外自由跑单",
      hours: "时间自主安排",
      content: "按单计薪",
      benefits: "无社保但自由度高",
      prospect: "收入弹性大",
    },
    reveal: {
      A: "仓库分拣工",
      B: "外卖骑手",
    },
    revealImage: {
      A: IMAGES.jobWarehouseCn,
      B: IMAGES.jobDeliveryCn,
    },
    source: "国家统计局、人社部、澎湃新闻",
  },
  jp: {
    country: "日本",
    flag: "🇯🇵",
    jobA: {
      title: "仕事 A",
      salary: "18-22 万日元/月",
      location: "物流仓库",
      hours: "长时间轮班",
      content: "体力劳动",
      benefits: "社保完善",
      prospect: "老龄化同事为主",
    },
    jobB: {
      title: "仕事 B",
      salary: "22-28 万日元/月",
      location: "便利店/服务业",
      hours: "班次灵活",
      content: "室内工作",
      benefits: "社保完善",
      prospect: "年龄多样、社会认可度更高",
    },
    reveal: {
      A: "物流搬运工",
      B: "便利店店员",
    },
    revealImage: {
      A: IMAGES.jobLogisticsJp,
      B: IMAGES.jobConvenienceJp,
    },
    source: "Recruit Holdings、Reuters/Nikkei、日本厚生劳动省",
  },
  us: {
    country: "美国",
    flag: "🇺🇸",
    jobA: {
      title: "Job A",
      salary: "$17-19/小时",
      location: "仓库内拣货打包",
      hours: "固定排班",
      content: "拣货打包",
      benefits: "有医保",
      prospect: "工伤率 4.7/100 人，年离职率 >40%",
    },
    jobB: {
      title: "Job B",
      salary: "$20-30/小时（含小费）",
      location: "用自己的车",
      hours: "完全自主",
      content: "配送服务",
      benefits: "无保险但自由",
      prospect: "高但自愿",
    },
    reveal: {
      A: "Warehouse Picker",
      B: "Gig Economy Driver",
    },
    revealImage: {
      A: IMAGES.jobWarehouseUs,
      B: IMAGES.jobGigUs,
    },
    source: "BLS、JOLTS",
  },
};

const dataAnchors = [
  {
    flag: "🇨🇳",
    number: "11.4%",
    text: "中国仓库分拣岗 30 岁以下工人占比",
    source: "鄂州市经信局调研",
  },
  {
    flag: "🇨🇳",
    number: "18%",
    text: "中国制造业/仓储离职率，高于全行业 3 个百分点",
    source: "前程无忧 2021 离职报告",
  },
  {
    flag: "🇨🇳",
    number: "长期",
    text: "人社部「最缺工」排行中，装卸搬运工、邮件分拣员",
    source: "人社部",
  },
  {
    flag: "🇺🇸",
    number: ">40%",
    text: "美国仓储行业年离职率，Amazon 仓库超 150%",
    source: "BLS、Verdict",
  },
  {
    flag: "🇯🇵",
    number: "342起",
    text: "日本 2024 年因缺工导致企业破产，创历史纪录",
    source: "Teikoku Databank",
  },
  {
    flag: "🌍",
    number: "-591万/年",
    text: "中国劳动力年均减少，日本预计 2040 年缺口 1,100 万人",
    source: "国家发改委、Recruit Holdings",
  },
];

const scenarios = [
  {
    flag: "🇯🇵",
    title: "86 岁的配送员",
    content: "日本农村，86 岁老人仍在搬运包裹配送。70 岁老人为 90 岁老人提供日间照护。2024 年三分之二日本企业表示劳动力短缺严重影响经营，因缺工导致的企业破产创历史新高。预计 2040 年劳动力缺口达 1,100 万人。",
    source: "Recruit Holdings、Reuters/Nikkei",
  },
  {
    flag: "🇺🇸",
    title: "150% 的离职率",
    content: "Amazon 仓库员工年离职率超过 150%——一年要把团队换一遍半。仓储劳动力成本占运营预算 55-70%。59% 的仓库表示难以招到合格工人。工伤率 4.7/100 人。企业靠 EB-3 移民签证从海外引进工人填补仓库岗位。",
    source: "BLS、Verdict、EB3.Work",
  },
  {
    flag: "🇨🇳",
    title: "60 岁分拣工猝死在岗位上",
    content: "2023 年 2 月，宁波中通分拣中心，60 岁分拣工工作时心脏骤停猝死。人社局：'60 周岁不属于劳动者范畴'，无法认定工伤。44% 的规上工业企业反映招工难是最大难题。年轻人宁可送外卖也不愿进仓库。",
    source: "澎湃新闻、国家统计局 9 万家企业调查",
  },
];

export default function LaborCrisisPanel({ isOpen, onClose }: LaborCrisisPanelProps) {
  const [currentLayer, setCurrentLayer] = useState<Layer>(1);
  const [selectedCountry, setSelectedCountry] = useState<Country>("cn");
  const [userChoices, setUserChoices] = useState<Record<Country, UserChoice>>({ cn: null, jp: null, us: null });
  const [revealed, setRevealed] = useState<Record<Country, boolean>>({ cn: false, jp: false, us: false });
  const [allCountriesSelected, setAllCountriesSelected] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Check if all countries have been selected
  useEffect(() => {
    const allSelected = userChoices.cn && userChoices.jp && userChoices.us;
    setAllCountriesSelected(!!allSelected);
  }, [userChoices]);

  const handleChoice = (choice: "A" | "B") => {
    setUserChoices((prev) => ({ ...prev, [selectedCountry]: choice }));
    setRevealed((prev) => ({ ...prev, [selectedCountry]: true }));
  };

  const handleTabChange = (country: Country) => {
    setSelectedCountry(country);
  };

  const goToNextLayer = () => {
    if (currentLayer < 4) {
      setCurrentLayer((prev) => (prev + 1) as Layer);
    } else {
      onClose();
    }
  };

  const goToPrevLayer = () => {
    if (currentLayer > 1) {
      setCurrentLayer((prev) => (prev - 1) as Layer);
    }
  };

  if (!isOpen) return null;

  const currentData = jobData[selectedCountry];
  const currentChoice = userChoices[selectedCountry];
  const isRevealed = revealed[selectedCountry];

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0F]/95 backdrop-blur-sm overflow-y-auto">
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
      >
        <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="min-h-screen py-20 px-4">
        <AnimatePresence mode="wait">
          {/* Layer 1: Two Job Offers */}
          {currentLayer === 1 && (
            <motion.div
              key="layer1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="container max-w-5xl mx-auto"
            >
              {/* Country Tabs */}
              <div className="flex justify-center gap-2 mb-8">
                {(["cn", "jp", "us"] as Country[]).map((country) => {
                  const data = jobData[country];
                  const isSelected = selectedCountry === country;
                  const hasChosen = userChoices[country];

                  return (
                    <button
                      key={country}
                      onClick={() => handleTabChange(country)}
                      disabled={hasChosen !== null && country !== selectedCountry}
                      className={`px-6 py-3 rounded-lg font-display font-medium transition-all ${
                        isSelected
                          ? "bg-neon/20 border-2 border-neon text-neon"
                          : hasChosen
                          ? "bg-surface/40 border-2 border-neon/40 text-neon/60 cursor-not-allowed"
                          : "bg-surface/40 border-2 border-white/10 text-white/60 hover:border-white/30"
                      }`}
                    >
                      <span className="mr-2">{data.flag}</span>
                      {data.country}
                    </button>
                  );
                })}
              </div>

              {/* Switch hint */}
              {Object.values(userChoices).filter(Boolean).length > 0 &&
                Object.values(userChoices).filter(Boolean).length < 3 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-neon/70 text-sm mb-6"
                  >
                    全世界的年轻人都在做同一个选择。
                  </motion.p>
                )}

              {/* Job Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {(["A", "B"] as const).map((job) => {
                  const jobInfo = job === "A" ? currentData.jobA : currentData.jobB;
                  const isSelected = currentChoice === job;
                  const isRevealedChoice = isRevealed && currentChoice === job;
                  const otherRevealed = isRevealed && currentChoice !== job;

                  return (
                    <motion.div
                      key={job}
                      whileHover={isRevealed ? {} : { scale: 1.02 }}
                      className={`relative p-6 rounded-xl border-2 transition-all ${
                        isRevealedChoice
                          ? "bg-neon/10 border-neon"
                          : otherRevealed
                          ? "bg-white/5 border-white/10 opacity-50"
                          : "bg-surface/40 border-white/10 hover:border-neon/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-cn font-bold text-white text-xl">{jobInfo.title}</h3>
                        {isRevealedChoice && (
                          <span className="px-3 py-1 rounded-full bg-neon/20 text-neon text-sm font-mono-brand">
                            你的选择
                          </span>
                        )}
                      </div>

                      <div className="space-y-3 text-white/70 text-sm">
                        <div className="flex justify-between">
                          <span>薪资：</span>
                          <span className="text-white">{jobInfo.salary}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>地点：</span>
                          <span className="text-white">{jobInfo.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>时间：</span>
                          <span className="text-white">{jobInfo.hours}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>内容：</span>
                          <span className="text-white">{jobInfo.content}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>福利：</span>
                          <span className="text-white">{jobInfo.benefits}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>前景：</span>
                          <span className="text-white">{jobInfo.prospect}</span>
                        </div>
                      </div>

                      {isRevealed && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 pt-4 border-t border-white/10"
                        >
                          <p className="text-neon font-bold text-lg mb-3">
                            揭秘：{currentData.reveal[job]}
                          </p>
                          <div className="relative rounded-xl overflow-hidden aspect-[16/9]">
                            <img
                              src={(currentData as any).revealImage[job]}
                              alt={currentData.reveal[job]}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/60 to-transparent" />
                            <div className="absolute bottom-2 left-3">
                              <span className="text-white/70 text-xs font-cn">{currentData.reveal[job]}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {!isRevealed && (
                        <button
                          onClick={() => handleChoice(job)}
                          className="w-full mt-4 py-3 rounded-lg bg-white/5 hover:bg-neon/20 hover:border-neon/30 border border-white/10 text-white/90 hover:text-neon transition-all font-display font-medium"
                        >
                          选择 {job}
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Source */}
              {isRevealed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-white/30 text-xs"
                >
                  来源：{currentData.source}
                </motion.p>
              )}

              {/* All selected message */}
              {allCountriesSelected && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-8"
                >
                  <p className="font-cn font-black text-xl md:text-2xl text-white mb-6">
                    全世界的年轻人都在做同一个选择。
                    <br />
                    没有人愿意在仓库里搬货了。
                  </p>
                  <button
                    onClick={goToNextLayer}
                    className="neon-btn px-8 py-3 rounded-lg font-display font-bold"
                  >
                    继续探索 →
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Layer 2: Supply-Demand Gap */}
          {currentLayer === 2 && (
            <motion.div
              key="layer2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="container max-w-5xl mx-auto"
            >
              <h2 className="font-cn font-black text-2xl md:text-3xl text-white text-center mb-4">
                结构性缺工
                <span className="text-neon"> — 供需剪刀差</span>
              </h2>
              <p className="text-white/50 text-center mb-8">
                需求持续上升，供给系统性地崩塌
              </p>

              {/* Dynamic Curve Chart */}
              <div className="relative bg-surface/30 rounded-2xl border border-white/5 p-6 mb-8">
                <svg viewBox="0 0 600 300" className="w-full h-auto">
                  <defs>
                    <linearGradient id="gapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(0,255,136,0)" />
                      <stop offset="50%" stopColor="rgba(0,255,136,0.1)" />
                      <stop offset="100%" stopColor="rgba(0,255,136,0.2)" />
                    </linearGradient>
                  </defs>

                  {/* Grid */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={`h-${i}`}
                      x1="60" y1={40 + i * 55}
                      x2="560" y2={40 + i * 55}
                      stroke="rgba(255,255,255,0.05)"
                      strokeDasharray="4 4"
                    />
                  ))}

                  {/* Axes */}
                  <line x1="60" y1="260" x2="560" y2="260" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <line x1="60" y1="40" x2="60" y2="260" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

                  {/* Demand curve (green, rising) */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    d="M 60 220 Q 180 200 300 160 Q 420 120 560 60"
                    fill="none"
                    stroke="#00FF88"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Supply curve (red, falling) */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    d="M 60 100 Q 180 120 300 180 Q 420 220 560 240"
                    fill="none"
                    stroke="#FF3B3B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Gap area */}
                  <path
                    d="M 60 220 Q 180 200 300 160 Q 420 120 560 60 L 560 240 Q 420 220 300 180 Q 180 120 60 100 Z"
                    fill="url(#gapGradient)"
                  />

                  {/* "Now" marker */}
                  <motion.line
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    x1="310"
                    y1="60"
                    x2="310"
                    y2="240"
                    stroke="#00FF88"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                    x="310"
                    y="55"
                    fill="#00FF88"
                    fontSize="11"
                    textAnchor="middle"
                    fontFamily="Space Grotesk"
                  >
                    现在
                  </motion.text>

                  {/* Labels */}
                  <text x="60" y="280" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="Space Grotesk">2010</text>
                  <text x="560" y="280" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="Space Grotesk" textAnchor="end">2030</text>
                  <text x="310" y="295" fill="#00FF88" fontSize="11" fontFamily="Space Grotesk" textAnchor="middle">这个缺口就是仓颉的机会</text>

                  {/* Legend */}
                  <line x1="420" y1="25" x2="440" y2="25" stroke="#00FF88" strokeWidth="2" />
                  <text x="445" y="29" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="Space Grotesk">物流需求</text>
                  <line x1="500" y1="25" x2="520" y2="25" stroke="#FF3B3B" strokeWidth="2" />
                  <text x="525" y="29" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="Space Grotesk">劳动力供给</text>
                </svg>
              </div>

              {/* Data Anchors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {dataAnchors.map((anchor, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-surface/40 border border-white/5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{anchor.flag}</span>
                      <div className="flex-1">
                        <p className="font-mono-brand text-neon text-xl font-bold">{anchor.number}</p>
                        <p className="text-white/60 text-sm mt-1">{anchor.text}</p>
                        <p className="text-white/30 text-xs mt-2">来源：{anchor.source}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Closing statement */}
              <div className="text-center mb-8">
                <p className="font-cn font-black text-2xl md:text-4xl text-white leading-tight">
                  不是机器人在抢人的饭碗，
                  <br />
                  是这碗饭已经<span className="text-neon">没有人愿意端了</span>。
                </p>
              </div>

              {/* Navigation */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={goToPrevLayer}
                  className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all"
                >
                  ← 返回
                </button>
                <button
                  onClick={goToNextLayer}
                  className="neon-btn px-8 py-3 rounded-lg font-display font-bold"
                >
                  继续探索 →
                </button>
              </div>
            </motion.div>
          )}

          {/* Layer 3: Real-world Scenarios */}
          {currentLayer === 3 && (
            <motion.div
              key="layer3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="container max-w-5xl mx-auto"
            >
              <h2 className="font-cn font-black text-2xl md:text-3xl text-white text-center mb-4">
                全球社会现象
                <span className="text-neon"> — 三个真实场景</span>
              </h2>
              <p className="text-white/50 text-center mb-8">
                从东京到洛杉矶到宁波，同一个故事正在上演
              </p>

              {/* Scenario Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {scenarios.map((scenario, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="p-6 rounded-xl bg-surface/50 border border-white/5 hover:border-neon/20 transition-all"
                  >
                    <div className="text-3xl mb-3">{scenario.flag}</div>
                    <h3 className="font-cn font-bold text-white text-lg mb-3">{scenario.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-3">{scenario.content}</p>
                    <p className="text-white/30 text-xs">来源：{scenario.source}</p>
                  </motion.div>
                ))}
              </div>

              {/* Transition text */}
              <div className="text-center mb-8">
                <p className="font-cn font-bold text-lg md:text-xl text-white/80">
                  这些岗位的劳动力供给正在<span className="text-signal-red">系统性地崩塌</span>。
                </p>
              </div>

              {/* Navigation */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={goToPrevLayer}
                  className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all"
                >
                  ← 返回
                </button>
                <button
                  onClick={goToNextLayer}
                  className="neon-btn px-8 py-3 rounded-lg font-display font-bold"
                >
                  继续探索 →
                </button>
              </div>
            </motion.div>
          )}

          {/* Layer 4: Blue Ocean Market */}
          {currentLayer === 4 && (
            <motion.div
              key="layer4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="container max-w-4xl mx-auto"
            >
              <h2 className="font-cn font-black text-2xl md:text-3xl text-white text-center mb-4">
                蓝海市场
                <span className="text-neon"> — 专属于机器人的市场</span>
              </h2>

              {/* Funnel Visualization */}
              <div className="relative py-8">
                {/* Funnel levels */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="max-w-md mx-auto"
                >
                  {/* Level 1 */}
                  <div className="w-full py-6 px-8 bg-neon/10 border-2 border-neon/30 rounded-lg text-center mb-2">
                    <p className="font-mono-brand text-neon text-2xl font-bold">&gt; $1 万亿</p>
                    <p className="text-white/70 text-sm mt-1">全球仓储市场（2023）</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <svg className="w-6 h-6 text-neon/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Level 2 */}
                  <div className="w-11/12 mx-auto py-5 px-6 bg-neon/15 border-2 border-neon/25 rounded-lg text-center mb-2">
                    <p className="font-mono-brand text-neon text-xl font-bold">$5,500 - 7,000 亿</p>
                    <p className="text-white/70 text-xs mt-1">劳动力成本占比 55-70%</p>
                    <p className="text-white/40 text-[10px]">来源：ID Logistics</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <svg className="w-6 h-6 text-neon/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Level 3 */}
                  <div className="w-10/12 mx-auto py-4 px-5 bg-neon/20 border-2 border-neon/40 rounded-lg text-center mb-2">
                    <p className="font-mono-brand text-white text-lg font-bold">正在"空出来"的部分</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <svg className="w-6 h-6 text-neon/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Level 4 */}
                  <div className="w-9/12 mx-auto py-5 px-6 bg-neon/30 border-2 border-neon rounded-lg text-center shadow-[0_0_30px_rgba(0,255,136,0.3)]">
                    <p className="font-cn font-bold text-white text-lg">= 专属于机器人的蓝海</p>
                  </div>
                </motion.div>
              </div>

              {/* Market projection */}
              <div className="text-center mb-8">
                <p className="text-white/60 text-sm mb-2">
                  预计 2030 年达 $1.72-1.87 万亿，CAGR 8-11%
                </p>
                <p className="text-white/30 text-xs">来源：Grand View Research（2023 市场规模）</p>
              </div>

              {/* Revenue projection */}
              <div className="mb-8">
                <h3 className="font-cn font-bold text-white text-xl text-center mb-6">
                  仓颉的<span className="text-neon"> 10 年营收路径</span>
                </h3>
                <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto mb-6">
                  {[
                    { year: "第 1 年", rev: "¥1,200 万", note: "首批 20 台 · 越南操作员跑通" },
                    { year: "第 3 年", rev: "¥1.2 亿", note: "200 台 · 1:3 人机比 · 日本场景" },
                    { year: "第 5 年", rev: "¥12 亿", note: "2,000 台 · SaaS 智能溢价" },
                  ].map(item => (
                    <div key={item.year} className="p-4 rounded-xl bg-neon/5 border border-neon/20 text-center">
                      <p className="text-white/40 text-xs font-mono-brand mb-1">{item.year}</p>
                      <p className="text-neon font-mono-brand font-bold text-lg mb-1">{item.rev}</p>
                      <p className="text-white/40 text-[10px] leading-tight">{item.note}</p>
                    </div>
                  ))}
                </div>
                <div className="max-w-2xl mx-auto p-5 rounded-xl bg-surface/40 border border-neon/15 text-center">
                  <p className="text-white/40 text-xs font-mono-brand mb-2">第 10 年 · 全自主阶段</p>
                  <p className="text-neon font-mono-brand font-bold text-3xl mb-1">¥100 亿+</p>
                  <p className="text-white/50 text-sm">1:10 人机比 · 近 SaaS 利润率 · 全球非结构化场景</p>
                </div>
                <p className="text-white/25 text-xs text-center mt-3">基于 BOM ¥6 万 · 月租 ¥4,000 · 人机比逐步提升的保守测算</p>
              </div>

              {/* Back to BP button */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={goToPrevLayer}
                  className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all"
                >
                  ← 返回
                </button>
                <button
                  onClick={onClose}
                  className="neon-btn px-8 py-3 rounded-lg font-display font-bold"
                >
                  回到商业计划 →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Layer indicator */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {[1, 2, 3, 4].map((layer) => (
          <div
            key={layer}
            className={`w-2 h-2 rounded-full transition-all ${
              currentLayer === layer
                ? "bg-neon w-6"
                : currentLayer > layer
                ? "bg-neon/40"
                : "bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
