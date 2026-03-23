/*
 * Design: Industrial Cyberpunk — Hero Section
 * Full-viewport cinematic hero with parallax background, typed headline, particle canvas
 */
import { useEffect, useRef, useState } from "react";
import { IMAGES } from "@/lib/assets";
import { motion } from "framer-motion";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 136, ${p.alpha})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 255, 136, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-[2] pointer-events-none" />;
}

export default function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const fullText = "仓颉具身 Cangjie Embodied AI";
  const typingDone = useRef(false);

  useEffect(() => {
    if (typingDone.current) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setTypedText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(timer);
        typingDone.current = true;
      }
    }, 60);
    return () => clearInterval(timer);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById("why-now");
    if (nextSection) {
      const offset = 80; // navbar height + some padding
      const elementPosition = nextSection.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden scanlines"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.heroBg}
          alt=""
          className="w-full h-full object-cover scale-105"
          style={{ filter: "brightness(0.7) contrast(1.1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/70 via-[#0A0A0F]/50 to-[#0A0A0F]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 z-[1]" />

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Content */}
      <div className="relative z-10 container text-center px-4">
        {/* Typed headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="font-mono-brand text-neon/80 text-sm md:text-base tracking-[0.2em] mb-6">
            {typedText}
            <span className="animate-pulse">_</span>
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-cn font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-4"
        >
          仓颉具身
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-cn text-xl sm:text-2xl md:text-3xl lg:text-4xl text-neon neon-glow font-bold mb-8"
        >
          60 分钟开箱即用的半价机器人员工
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-white/50 text-sm md:text-base tracking-wide max-w-2xl mx-auto mb-4"
        >
          遥操打底 &times; 劳动力套利 &times; Robotics Native 数据垄断
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/40 text-sm md:text-lg max-w-3xl mx-auto mb-12 leading-relaxed italic"
        >
          "我们不造昂贵的玩具。我们从采数据的第一天起，就在真实世界里赚钱。"
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="flex flex-col items-center gap-4"
        >
          <button
            onClick={scrollToNext}
            className="neon-btn px-8 py-4 rounded-xl text-base md:text-lg font-display font-bold tracking-wide"
          >
            查看商业账本 → Unlock the Economic Engine
          </button>
          <p className="text-white/20 text-xs font-display tracking-wider">
            CANGJIE EMBODIED AI &middot; BOOTSTRAPPING REALITY
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-neon"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
