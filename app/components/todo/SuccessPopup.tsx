"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SuccessPopup({ show }: any) {
  const popupRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show || !popupRef.current || !backdropRef.current) return;

    const el = popupRef.current;
    const backdrop = backdropRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 🌫 Backdrop fade in
      tl.fromTo(
        backdrop,
        { opacity: 0 },
        { opacity: 1, duration: 0.25 }
      )

        // 🎬 Popup entry
        .fromTo(
          el,
          { scale: 0.6, opacity: 0, y: 50 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(2)"
          },
          "-=0.1"
        )

        // ✨ Text reveal (FIXED spacing + smoother)
        .from(
          el.querySelectorAll(".popup-text span"),
          {
            y: 12,
            opacity: 0,
            scale: 0.9,
            stagger: 0.03,
            ease: "power2.out",
            duration: 0.25
          },
          "-=0.3"
        )

        // 🌿 soft bounce
        .to(
          el,
          {
            scale: 1.05,
            duration: 0.15,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut"
          },
          "+=0.2"
        )

        // 👋 exit animation (smooth delay)
        .to(
          el,
          {
            y: -20,
            opacity: 0,
            scale: 0.85,
            duration: 0.4,
            ease: "power2.in"
          },
          "+=1.2"
        )

        // 🌫 backdrop exit
        .to(
          backdrop,
          {
            opacity: 0,
            duration: 0.3
          },
          "-=0.3"
        );
    }, popupRef);

    return () => ctx.revert();
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">

      {/* 🌫 Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
      />

      {/* 💎 Popup */}
      <div
        ref={popupRef}
        className="relative bg-[var(--card)] border border-[var(--border)]
        shadow-2xl rounded-2xl px-8 py-5 text-center"
      >
        {/* ✅ Icon */}
        <div className="text-2xl mb-2">🎉</div>

        {/* ✨ Text (FIXED SPACING) */}
        <p className="popup-text text-sm font-medium text-[var(--foreground)] flex flex-wrap justify-center gap-[2px]">
          {Array.from("Task added successfully").map((c, i) => (
            <span
              key={i}
              className={c === " " ? "w-2" : "inline-block"}
            >
              {c}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}