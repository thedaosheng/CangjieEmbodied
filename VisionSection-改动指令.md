# VisionSection.tsx 改动指令

> 目标：重写 Section 01 的叙事逻辑，从"行业趋势科普"切换为"我们在做什么生意"。新增飞轮图替代原市场规模柱状图。

---

## 一、整体结构变更

原结构：Section header → 三段叙事（确定性vs不确定性）→ 柱状图 → 物流市场表 → Why China 卡片

新结构：Section header → 三段叙事（去中心化 → 断裂 → 解锁）→ **飞轮图（新增）** → 物流市场表（保留） → Why China 卡片（保留）

**删除的组件：** `MarketBarChart`（整个组件删掉，不再需要市场规模柱状图）

**新增的组件：** `FlywheelDiagram`（飞轮 SVG 图，详见第四节）

**import 变更：** 去掉 `useCountUp`（本 section 不再用），其余保持不变。

---

## 二、Section Header 文案替换

### 小标题
```
旧：Section 01 — Paradigm Shift
新：Section 01 — The Unlock
```

### 大标题
```
旧：
从确定性到不确定性
一个万亿级的范式迁移（荧光绿）

新：
生产力的去中心化
从工厂到每一个仓库（荧光绿）
```

### 副标题
```
旧：过去 20 年属于工业机械臂。下一个 20 年，属于具身智能。
新：历史上每一次生产力去中心化，都催生了万亿级市场。我们正在把工业级机械臂的能力，解锁到中国数万个非结构化的长尾场景中。
```

---

## 三、三段叙事文案替换

用以下三段替换原有的三段正文，保持相同的 `<p>` 结构和 CSS class 不变（`text-white/55 text-base md:text-lg leading-[1.9]`）。

### 第一段：历史锚点

```
大型机→PC，让计算从实验室走进每张办公桌。中央电站→分布式能源，让供电从电网走进每栋建筑。核心模式永远是同一个：[白色加粗] 曾经只有大玩家能用的能力，被技术突破推到了长尾。
```

- "曾经只有大玩家能用的能力，被技术突破推到了长尾。" → `text-white font-medium`

### 第二段：指出断裂

```
工业机械臂的 [白色加粗]$340 亿[/白色加粗] 市场已经证明了一件事——机器替代人工的经济性完全成立。但这个能力被锁死在大型结构化场景里：汽车焊装线、半导体封装。不是技术不够好，而是它的部署范式（航天级精度 + 产线级集成 + 结构化环境）[荧光绿加粗]天然排斥了 80% 的劳动场景[/荧光绿加粗]。区县即时零售前置仓、小象超市、京东秒送站点、餐饮后厨、废品回收站——这些场景的特征是多种类、小批量、高不确定性。传统机器人在这里束手无策。
```

- "$340 亿" → `text-white font-semibold`
- "天然排斥了 80% 的劳动场景" → `text-neon font-semibold`

### 第三段：定义机会

```
[荧光绿加粗]仓颉要做的，是把这个"锁"打开。[/荧光绿加粗]通过遥操作 + 低成本硬件 + 真实场景数据飞轮，让每一个前置仓、每一个社区仓库、每一个小商户，都能用上机器人劳动力。操控机器人的人不需要在现场——他可以在越南、在县城，薪资只有现场工人的 1/3。[白色加粗]Day 1 就赚钱，同时每一笔操作都在为全自主 AI 积累不可替代的数据资产。[/白色加粗]
```

- "仓颉要做的，是把这个'锁'打开。" → `text-neon font-semibold`
- "Day 1 就赚钱……数据资产。" → `text-white font-medium`

---

## 四、新增飞轮图组件 `FlywheelDiagram`

放在三段叙事下方、物流市场表上方。外层容器样式和原柱状图一致：

```tsx
<div data-animate className="mb-20 p-6 md:p-10 rounded-2xl bg-surface/30 border border-white/5">
```

### 飞轮图上方的标题区

```
左侧竖线标记（w-1 h-6 bg-neon rounded-full）+ 标题：自增强飞轮：赚钱 × 攒数据 × 提自主
副标题：我们不是"先烧钱跑通技术，再找商业化场景"。飞轮从第一天就在转——遥操作赚钱的过程本身就是在积累通往全自主的数据壁垒。
```

### 飞轮 SVG 设计规格

**viewBox:** `0 0 600 540`，最大宽度 640px 居中。

**核心结构：** 4 个节点沿圆形排列（半径 120px，圆心 300,260），箭头顺时针连接形成闭环。3 条同心圆轨道表示飞轮的三圈。

**4 个飞轮节点（顺时针方向）：**

| 位置 | 角度 | 标题 | 副标题 | 是否高亮 |
|------|------|------|--------|----------|
| 顶部 | 270° | 遥操作部署 | 60 分钟开箱即用 | 否 |
| 右侧 | 0° | 地理劳动力套利 | Day 1 正毛利 | **是**（荧光绿描边+glow） |
| 底部 | 90° | 高保真数据积累 | 盈利的副产品 | 否 |
| 左侧 | 180° | 自主率提升 | 1 人管更多台 | 否 |

- 普通节点：`fill="rgba(10,10,15,0.9)"` / `stroke="rgba(255,255,255,0.1)"` / `strokeWidth=0.5`
- 高亮节点：`fill="rgba(0,255,136,0.08)"` / `stroke="#00FF88"` / `strokeWidth=1` / 加 `feGaussianBlur` glow filter
- 节点尺寸：普通 126×50，高亮 140×50，`rx=8`
- 标题 13px font-cn fontWeight 700，副标题 11px font-cn

**4 条弧形箭头（节点之间）：**
- 沿半径 120 的圆弧，顺时针，每条箭头距节点中心偏移 28° 起止
- `stroke="#00FF88"` / `strokeWidth=1.5` / `opacity=0.5`
- 箭头 marker：`markerWidth=5 markerHeight=5`，`stroke="#00FF88"`
- 动画：`pathLength` 从 0 到 1，依次延迟进入

**3 条同心圆轨道：**

| 圈 | 半径 | strokeDasharray | opacity | 右侧标注 |
|----|------|-----------------|---------|----------|
| 第一圈 | 120 | 4 6 | 0.15 | 今天 / 纯套利利润 / 1:1 |
| 第二圈 | 185 | 6 4 | 0.12 | 12-18 个月 / 套利 + 效率倍增 / 1:3 |
| 第三圈 | 245 | none（实线） | 0.08 | 3-5 年 / 接近全自主 SaaS / 1:10+ |

- `stroke="#00FF88"` / `strokeWidth=0.8`

**右侧标注卡片（每条轨道一个）：**
- 位置 x=460，y 对齐各轨道顶部
- 背景 `fill="rgba(10,10,15,0.8)"` / `stroke="rgba(0,255,136,0.1)"` / `rx=6`
- 尺寸 130×38
- 包含：时间（10px font-mono rgba白35%）、描述（11px font-cn 白60%）、比率（12px font-mono 荧光绿70%，右对齐）

**中心文字：**
- "仓颉飞轮" — 15px font-cn fontWeight 800 white
- "每一圈都在赚钱" — 11px font-cn rgba白40%

**底部说明文字：**
- "飞轮越转越快：自主率每提升 10%，操作员人效翻一倍" — 12px font-cn rgba白30%
- "EARN → COLLECT DATA → BOOST AUTONOMY → EARN MORE" — 11px font-mono rgba荧光绿35%

### 飞轮图下方 Metric 卡片（3列 grid）

紧接 SVG 下方，`grid grid-cols-3 gap-3 mt-4`：

| 卡片 | 比率 | 说明 |
|------|------|------|
| 第一圈 · 今天 | 1 : 1 | 套利毛利 ~60% |
| 第二圈 · 自主30%+ | 1 : 3 | 单位成本降 3 倍 |
| 第三圈 · 自主80%+ | 1 : 10+ | 接近纯 SaaS 利润 |

- 卡片样式：`p-4 rounded-xl bg-surface/40 border border-white/5`
- label: `text-white/30 text-[10px] font-mono-brand`
- ratio: `font-mono-brand text-neon text-xl md:text-2xl font-bold neon-glow`
- note: `text-white/40 text-xs`

### 动画规格

所有动画使用 framer-motion，和现有 section 保持一致风格：

- 轨道圆：opacity 从 0 渐入，delay 0.3 + i*0.2
- 右侧标注：opacity 从 0 + x 偏移 10px，delay 0.8 + i*0.2
- 弧形箭头：pathLength 0→1 + opacity 0→0.5，delay 1.2 + i*0.15，ease [0.16, 1, 0.3, 1]
- 中心文字：opacity + scale 0.8→1，delay 0.5
- 节点：opacity + scale 0.7→1，delay 0.6 + i*0.12
- 底部文字：opacity 渐入，delay 2.0 / 2.2
- Metric 卡片：whileInView opacity + y 偏移 20px，delay i*0.1

---

## 五、保留不动的部分

以下组件代码和文案不变，只是在页面中的位置调整（飞轮图插在它们前面）：

1. **LogisticsMarketSizing** — 物流场景人力搬运可替代市场规模表格 + 2030预测卡片，完全保留
2. **whyChinaCards** — "为什么是中国"三张卡片，标题、副标题、卡片内容完全保留
3. **Why China 的 section header** — "在全球最完整的硬件供应链与最庞大的非结构化场景中"，完全保留

---

## 六、删除的部分

1. `MarketBarChart` 组件 — 整个删除（含对数刻度柱状图、增长倍数 badge）
2. 原三段叙事文案 — 替换为第三节的新文案
3. `useCountUp` 的 import — 本 section 不再使用
