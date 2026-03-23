/*
 * Design: Industrial Cyberpunk — Footer CTA
 * Deep space black, particle hints, final call-to-action
 */
import { motion } from "framer-motion";

export default function FooterSection() {
  return (
    <footer id="footer" className="relative py-24 md:py-32 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0F] to-[#0A0A0F]" />

      <div className="container relative z-10 text-center">
        {/* Main tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-cn font-black text-3xl md:text-5xl text-white leading-tight mb-4"
        >
          让我们创造自由的世界
          <br />
          让机器做回机器，让人做回人
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-white/40 text-base md:text-lg italic mb-12"
        >
          "Let machines be the mechanism, and humans be the mind."
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="tel:18829550789"
            className="inline-block neon-btn px-10 py-4 rounded-xl text-base md:text-lg font-display font-bold tracking-wide"
          >
            联系创始团队 Contact the Founders &rarr; 18829550789
          </a>
        </motion.div>

        {/* Divider */}
        <div className="w-16 h-[1px] bg-white/10 mx-auto my-16" />

        {/* Bottom info */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded border border-neon/30 flex items-center justify-center bg-neon/5">
              <span className="font-display font-bold text-neon text-[10px]">C</span>
            </div>
            <span className="font-display text-white/60 text-sm tracking-wide">
              CANGJIE EMBODIED AI
            </span>
          </div>

          <p className="text-white/20 text-xs font-display">
            仓颉具身 Cangjie Embodied AI — Bootstrapping Reality.
          </p>
          <p className="text-white/15 text-xs">
            给物理世界建立真实索引。从 Day 1 开始赚钱。
          </p>

          <p className="text-white/10 text-[10px] mt-8">
            &copy; {new Date().getFullYear()} Cangjie Embodied AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
