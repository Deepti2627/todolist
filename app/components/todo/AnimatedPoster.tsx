"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedPoster() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 🌿 Title reveal
      tl.from(".title", {
        y: -30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      })

      // ✨ Subtitle stagger
      .from(".info span", {
        y: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4
      }, "-=0.3")

      // 📊 Bars grow (progress feel)
      .from(".bar", {
        scaleX: 0,
        transformOrigin: "left",
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3");

    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={stageRef}
      className="relative w-full h-[100px] 
      bg-[var(--card)] border border-[var(--border)]
      rounded-2xl overflow-hidden mb-4"
    >
      {/* 📊 subtle bars */}
      <div className="absolute inset-0 flex flex-col justify-center gap-2 px-4 opacity-20">
        <div className="bar h-2 bg-[var(--primary)] rounded-full w-full"></div>
        <div className="bar h-2 bg-[var(--primary)] rounded-full w-2/3"></div>
        <div className="bar h-2 bg-[var(--primary)] rounded-full w-5/6"></div>
      </div>

      {/* 🧠 Content */}
      <div className="relative z-10 p-4">
        <h1 className="title text-lg font-semibold text-[var(--foreground)]">
          Stay Organized
        </h1>

        <p className="info text-xs text-[var(--muted-foreground)] mt-1 flex gap-1">
          <span>Focus.</span>
          <span>Track.</span>
          <span>Complete.</span>
        </p>
      </div>
    </div>
  );
}