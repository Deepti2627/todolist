"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function RunawaysPoster() {
  const ref = useRef<HTMLDivElement>(null);

  const text = "stay focused".split("");

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 🌿 Boxes appear softly
      gsap.from(".box", {
        scale: 0,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "back.out(2)"
      });

      // ✨ Text reveal
      gsap.from(".char", {
        y: -30,
        opacity: 0,
        stagger: 0.04,
        duration: 0.6,
        delay: 0.2
      });

      // 🔁 Subtle floating motion (NOT distracting)
      gsap.to(".corner", {
        y: (i) => (i % 2 === 0 ? -8 : 8),
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: "sine.inOut"
      });

    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full h-[120px] 
      bg-[var(--card)] border border-[var(--border)]
      rounded-2xl overflow-hidden mb-4"
    >
      {/* 🔲 Pattern */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 opacity-20">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="corner flex items-center justify-center">
            <div className="box w-6 h-6 border-2 border-[var(--primary)]"></div>
          </div>
        ))}
      </div>

      {/* 📝 Content */}
      <div className="relative z-10 p-4">
        <h1 className="text-lg font-semibold text-[var(--foreground)] flex flex-wrap">
          {text.map((c, i) => (
            <span key={i} className="char inline-block">
              {c}
            </span>
          ))}
        </h1>

        <p className="text-xs text-[var(--muted-foreground)] mt-1">
          Build consistency. Stay productive.
        </p>
      </div>
    </div>
  );
}