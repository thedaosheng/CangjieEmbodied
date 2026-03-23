import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CountUp } from "countup.js";

gsap.registerPlugin(ScrollTrigger);

/** Observe element entering viewport and trigger once */
export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/** Fade-up stagger animation for children */
export function useFadeUpStagger() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const children = el.querySelectorAll("[data-animate]");
    if (!children.length) return;

    gsap.set(children, { opacity: 0, y: 50 });

    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        });
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return containerRef;
}

/** CountUp animation for numbers */
export function useCountUp(
  endVal: number,
  options?: {
    duration?: number;
    prefix?: string;
    suffix?: string;
    separator?: string;
    decimal?: string;
    decimals?: number;
  }
) {
  const ref = useRef<HTMLSpanElement>(null);
  const countUpRef = useRef<CountUp | null>(null);
  const hasStarted = useRef(false);

  // Stabilize options reference
  const stableOpts = useMemo(
    () => ({
      duration: options?.duration ?? 2.5,
      prefix: options?.prefix ?? "",
      suffix: options?.suffix ?? "",
      separator: options?.separator ?? ",",
      decimal: options?.decimal ?? ".",
      decimals: options?.decimals ?? 0,
    }),
    // eslint-disable-next-line
    [
      options?.duration,
      options?.prefix,
      options?.suffix,
      options?.separator,
      options?.decimal,
      options?.decimals,
    ]
  );

  const start = useCallback(() => {
    if (hasStarted.current || !ref.current) return;
    hasStarted.current = true;
    countUpRef.current = new CountUp(ref.current, endVal, {
      duration: stableOpts.duration,
      prefix: stableOpts.prefix,
      suffix: stableOpts.suffix,
      separator: stableOpts.separator,
      decimal: stableOpts.decimal,
      decimalPlaces: stableOpts.decimals,
      useEasing: true,
    });
    if (!countUpRef.current.error) {
      countUpRef.current.start();
    }
  }, [endVal, stableOpts]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [start]);

  return ref;
}

/** Parallax scroll effect */
export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      y: () => speed * 200,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [speed]);

  return ref;
}
