import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const BannerPopup = ({ isOpen, onClose, imageSrc }) => {
  const popupRef = useRef(null);
  const contentRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (isOpen && popupRef.current) {
      // Kill any existing timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      // Create new timeline
      const tl = gsap.timeline();
      timelineRef.current = tl;

      // Initial state
      gsap.set(popupRef.current, {
        opacity: 0,
        scale: 0.8,
        rotationY: 15,
        transformPerspective: 1200
      });

      gsap.set(contentRef.current, {
        opacity: 0,
        y: 50
      });

      // Animate popup entrance
      tl.to(popupRef.current, {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");

      // Animate image entrance
      tl.fromTo(".banner-image", {
        scale: 0.8,
        opacity: 0,
        rotationX: -5
      }, {
        scale: 1,
        opacity: 1,
        rotationX: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.2");
    }
  }, [isOpen]);

  const handleClose = () => {
    if (timelineRef.current && popupRef.current) {
      timelineRef.current.reverse().then(() => {
        onClose();
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-xl p-2 sm:p-4">
      <div
        ref={popupRef}
        className="relative w-full max-w-4xl sm:max-w-6xl mx-auto bg-black rounded-2xl border border-white/20 overflow-hidden max-h-[90vh] overflow-y-auto"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 98%, 98% 100%, 0 100%)",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Content Container */}
        <div ref={contentRef} className="relative z-10 p-3 sm:p-4 md:p-6">
          {/* Title Section */}
          <div className="mb-4 sm:mb-6">
            <h1 className="special-font text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-blue-100 mb-2 text-center">
              Tech Symposium Banner
            </h1>
            <p className="font-circular-web text-xs sm:text-sm text-blue-50/80 text-center">
              Official event banner for Tech Symposium 2026
            </p>
          </div>

          {/* Banner Image */}
          <div className="banner-image relative mb-4 sm:mb-6 rounded-xl overflow-hidden border border-white/10">
            <img
              src={imageSrc}
              alt="Tech Symposium Banner"
              className="w-full h-full max-h-[60vh] object-contain fill"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.open(imageSrc, "_blank")}
              className="bg-yellow-300 text-black px-6 py-2 rounded-full font-circular-web font-bold hover:bg-yellow-400 transition-all duration-300 hover:scale-105"
            >
              Download Banner
            </button>
            <button
              onClick={handleClose}
              className="bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-full font-circular-web font-bold border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Ambient Effects */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default BannerPopup;
