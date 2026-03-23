/*
 * Design: Industrial Cyberpunk — Story Navigation
 * Left sidebar navigation showing 4 steps of the narrative
 * Uses scroll position to determine active section (works with very long sections)
 */
import { useEffect, useState, useCallback } from "react";

type Step = 1 | 2 | 3 | 4;

interface StoryNavProps {
  sectionIds: string[];
}

const steps = [
  { id: "hero", step: 1, label: "What", sublabel: "我们做什么" },
  { id: "why-now", step: 2, label: "Why Now", sublabel: "为什么是现在" },
  { id: "how", step: 3, label: "How", sublabel: "解决方案" },
  { id: "why-us", step: 4, label: "Why Us", sublabel: "为什么是我们" },
];

export default function StoryNav({ sectionIds }: StoryNavProps) {
  const [activeStep, setActiveStep] = useState<Step>(1);

  const updateActiveFromScroll = useCallback(() => {
    const viewportMid = window.scrollY + window.innerHeight * 0.35;

    let bestIndex = 0;
    sectionIds.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (top <= viewportMid) {
        bestIndex = index;
      }
    });

    setActiveStep((bestIndex + 1) as Step);
  }, [sectionIds]);

  useEffect(() => {
    // Initial check
    updateActiveFromScroll();

    const handleScroll = () => {
      updateActiveFromScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateActiveFromScroll]);

  const scrollToSection = (id: string, stepNum: Step) => {
    const element = document.getElementById(id);
    if (element) {
      // Immediately update active state on click
      setActiveStep(stepNum);
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-0 pointer-events-none"
      style={{ minWidth: "150px" }}
    >
      {/* Vertical connector line */}
      <div className="absolute left-[7px] top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />

      {steps.map((step) => {
        const isActive = step.step === activeStep;
        const isPast = step.step < activeStep;
        const stepNumber = step.step as Step;

        return (
          <button
            key={step.id}
            onClick={() => scrollToSection(step.id, step.step as Step)}
            className="pointer-events-auto relative flex items-center gap-4 py-5 group text-left"
          >
            {/* Node dot */}
            <div className="relative flex-shrink-0">
              <div
                className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-500 ${
                  isActive
                    ? "bg-neon border-neon shadow-[0_0_12px_rgba(0,255,136,0.8)]"
                    : isPast
                    ? "bg-neon/50 border-neon/50"
                    : "bg-transparent border-white/20"
                }`}
              />
              {isActive && (
                <div className="absolute inset-0 rounded-full bg-neon/30 animate-ping" />
              )}
            </div>

            {/* Label block */}
            <div
              className={`transition-all duration-300 ${
                isActive ? "opacity-100" : isPast ? "opacity-55" : "opacity-25"
              }`}
            >
              <p
                className={`text-[10px] font-mono-brand tracking-widest mb-0.5 ${
                  isActive ? "text-neon" : isPast ? "text-neon/60" : "text-white/40"
                }`}
              >
                0{stepNumber}
              </p>
              <p
                className={`text-sm font-display font-semibold leading-none mb-1 whitespace-nowrap ${
                  isActive ? "text-white" : "text-white/50"
                }`}
              >
                {step.label}
              </p>
              <p
                className={`text-xs font-cn leading-none whitespace-nowrap ${
                  isActive ? "text-white/60" : "text-white/25"
                }`}
              >
                {step.sublabel}
              </p>
            </div>

            {/* Active indicator bar */}
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-neon rounded-full shadow-[0_0_8px_rgba(0,255,136,0.6)] -translate-x-3" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
