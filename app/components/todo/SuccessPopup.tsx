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

      // 🌫 Backdrop fade
      tl.fromTo(
        backdrop,
        { opacity: 0 },
        { opacity: 1, duration: 0.25 }
      )

      // 🎬 Popup entry
      .fromTo(
        el,
        { scale: 0.7, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.8)"
        },
        "-=0.1"
      )

      // ✨ Text reveal
      .from(
        el.querySelectorAll(".popup-text span"),
        {
          y: 10,
          opacity: 0,
          stagger: 0.02,
          duration: 0.25
        },
        "-=0.2"
      )

      // 🌿 Soft pulse
      .to(
        el,
        {
          scale: 1.04,
          duration: 0.18,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut"
        },
        "+=0.15"
      )

      // 👋 Exit (smooth)
      .to(
        el,
        {
          y: -20,
          opacity: 0,
          scale: 0.85,
          duration: 0.35,
          ease: "power2.in"
        },
        "+=1"
      )

      .to(
        backdrop,
        {
          opacity: 0,
          duration: 0.25
        },
        "-=0.2"
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
        className="absolute inset-0 bg-black/10 backdrop-blur-sm"
      />

      {/* 💎 Popup */}
      <div
        ref={popupRef}
        className="relative bg-[var(--card)] border border-[var(--border)]
        shadow-xl rounded-2xl px-8 py-5 text-center"
      >
        {/* ✅ Icon */}
        <div className="text-2xl mb-1">✅</div>

        {/* ✨ Text */}
        <p className="popup-text text-sm font-medium text-[var(--foreground)]">
          {Array.from("Task added successfully").map((c, i) => (
            <span key={i} className="inline-block">
              {c}
            </span>
          ))}
        </p>
      </div>

    </div>
  );
}