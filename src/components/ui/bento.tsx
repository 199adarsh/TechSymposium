import React, { useEffect, useRef, useState } from "react";
import {  Trophy,
  Layers3,
  Gauge,
  Users,
  History,} from "lucide-react";

const getRootTheme = () => {
  if (typeof document === "undefined") {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  }

  const root = document.documentElement;
  if (root.classList.contains("dark")) return "dark";
  if (root.getAttribute("data-theme") === "dark" || root.dataset?.theme === "dark") return "dark";
  if (root.classList.contains("light")) return "light";

  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return "light";
};

type Feature = {
  title: string;
  blurb: string;
  meta: string;
  icon: React.ComponentType<any>;
  animation: string;
};

function FeaturesSectionMinimal() {
  const [theme, setTheme] = useState(() => getRootTheme());
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const id = "bento2-animations";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      @keyframes bento2-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6%); }
      }
      @keyframes bento2-pulse {
        0%, 100% { transform: scale(1); opacity: 0.85; }
        50% { transform: scale(1.08); opacity: 1; }
      }
      @keyframes bento2-tilt {
        0% { transform: rotate(-2deg); }
        50% { transform: rotate(2deg); }
        100% { transform: rotate(-2deg); }
      }
      @keyframes bento2-drift {
        0%, 100% { transform: translate3d(0, 0, 0); }
        50% { transform: translate3d(6%, -6%, 0); }
      }
      @keyframes bento2-glow {
        0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 0 rgba(0,0,0,0.4)); }
        50% { opacity: 1; filter: drop-shadow(0 0 6px rgba(0,0,0,0.2)); }
      }
      @keyframes bento2-intro {
        0% { opacity: 0; transform: translate3d(0, 28px, 0); }
        100% { opacity: 1; transform: translate3d(0, 0, 0); }
      }
      @keyframes bento2-card {
        0% { opacity: 0; transform: translate3d(0, 18px, 0) scale(0.96); }
        100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    const syncTheme = () => {
      const next = getRootTheme();
      setTheme((prev) => (prev === next ? prev : next));
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class", "data-theme"] });

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "bento-theme") syncTheme();
    };

    const media =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null;

    const handleMediaChange = () => syncTheme();

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorage);
    }
    media?.addEventListener("change", handleMediaChange);

    return () => {
      observer.disconnect();
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", handleStorage);
      }
      media?.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") return;

    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);



const features = [
  {
    title: "National-Level Competition",
    blurb:
      "A curated arena where future engineers across India compete through precision-built challenges and real-world problem solving.",
    meta: "OVERVIEW",
    icon: Trophy,
    animation: "bento2-float 6s ease-in-out infinite",
  },
  {
    title: "Multi-Domain Events",
    blurb:
      "Coding, data science, robotics, CAD, design—each discipline, thoughtfully represented on one national stage.",
    meta: "CATEGORIES",
    icon: Layers3,
    animation: "bento2-pulse 4s ease-in-out infinite",
  },
  {
    title: "Skill-Driven Format",
    blurb:
      "Every competition is designed to test clarity of thought, speed of execution, and depth of understanding.",
    meta: "FORMAT",
    icon: Gauge,
    animation: "bento2-tilt 5.5s ease-in-out infinite",
  },
  {
    title: "Open to Future Engineers",
    blurb:
      "A common platform for students from DKTE and institutions across India to compete on equal ground.",
    meta: "ELIGIBILITY",
    icon: Users,
    animation: "bento2-drift 8s ease-in-out infinite",
  },
  {
    title: "Built on Legacy",
    blurb:
      "After the success of Tech Symposium 2K25, we return with elevated standards and sharper challenges.",
    meta: "HISTORY",
    icon: History,
    animation: "bento2-glow 7s ease-in-out infinite",
  },
];


  const spans = [
    "col-span-2 row-span-2 md:col-span-4 md:row-span-2",
    "col-span-1 row-span-1 md:col-span-2 md:row-span-1",
    "col-span-1 row-span-1 md:col-span-2 md:row-span-1",
    "col-span-1 row-span-1 md:col-span-3 md:row-span-1",
    "col-span-1 row-span-1 md:col-span-3 md:row-span-1",
  ];

  return (
    <div className="relative min-h-screen w-full bg-white text-neutral-900 transition-colors duration-500 dark:bg-black dark:text-white">
      <div className="absolute inset-0 -z-30 overflow-hidden">
        <div
          className="absolute inset-0 [--aurora-base:#ffffff] [--aurora-accent:rgba(148,163,184,0.15)] dark:[--aurora-base:#040404] dark:[--aurora-accent:rgba(59,130,246,0.15)]"
          style={{
            background:
              "radial-gradient(ellipse 55% 100% at 12% 0%, var(--aurora-accent), transparent 65%), radial-gradient(ellipse 40% 80% at 88% 0%, rgba(148,163,184,0.1), transparent 70%), var(--aurora-base)",
          }}
        />
        <div
          className="absolute inset-0 [--grid-color:rgba(17,17,17,0.08)] dark:[--grid-color:rgba(255,255,255,0.06)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage:
              "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)",
            WebkitMaskImage:
              "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
            opacity: 0.9,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 [--edge-color:rgba(255,255,255,1)] dark:[--edge-color:rgba(0,0,0,1)]"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0) 55%, var(--edge-color) 100%)",
            filter: "blur(40px)",
            opacity: 0.75,
          }}
        />
      </div>

      <section
        ref={sectionRef}
        className={`relative mx-auto w-[90vw] max-w-none px-6 py-20 motion-safe:opacity-0 ${
          sectionVisible ? "motion-safe:animate-[bento2-intro_0.9s_ease-out_forwards]" : ""
        }`}
      >
        <header className="mb-10 flex flex-col gap-6 border-b border-neutral-900/10 pb-6 transition-colors duration-500 md:flex-row md:items-end md:justify-between dark:border-white/10">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.35em] text-neutral-500 transition-colors duration-500 dark:text-white/40">
              About
            </span>
            <h2 className="text-3xl font-black tracking-tight text-neutral-900 transition-colors duration-500 md:text-5xl dark:text-white">
              TECH SYMPOSIUM 
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <p className="max-w-sm text-sm text-neutral-600 transition-colors duration-500 md:text-base dark:text-white/60">
              A national-level technical competition bringing together engineering talent from across India
            </p>
            <button
              type="button"
            
              className="rounded-full border border-neutral-900/15 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-600 transition-colors duration-500 hover:bg-neutral-900/5 hover:text-neutral-900 dark:border-white/20 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
            >
              07 MARCH 2026
            </button>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-3 auto-rows-[minmax(100px,auto)] md:auto-rows-[minmax(120px,auto)] md:grid-cols-6">
          {features.map((feature, index) => (
            <BentoItem
              key={feature.title}
              span={spans[index]}
              feature={feature}
              theme={theme}
              index={index}
              isVisible={sectionVisible}
            />
          ))}
        </div>

        <footer className="mt-16 border-t border-neutral-900/10 pt-6 text-xs uppercase tracking-[0.2em] text-neutral-500 transition-colors duration-500 dark:border-white/10 dark:text-white/40">
          Compete. Perform. Rise.
        </footer>
      </section>
    </div>
  );
}

function BentoItem({ feature, span = "", theme = "light", index = 0, isVisible = false }: { feature: Feature; span?: string; theme?: string; index?: number; isVisible?: boolean }) {
  const { icon: Icon, animation, title, blurb, meta } = feature;
  const gradientFill =
    theme === "dark"
      ? "radial-gradient(ellipse 60% 120% at 12% 0%, rgba(59,130,246,0.24), transparent 72%)"
      : "radial-gradient(ellipse 60% 120% at 12% 0%, rgba(148,163,184,0.32), transparent 72%)";
  const animationDelay = `${Math.max(index * 0.12, 0)}s`;

  return (
    <article
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/80 p-2 md:p-5 shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] motion-safe:opacity-0 ${
        isVisible ? "motion-safe:animate-[bento2-card_0.8s_ease-out_forwards]" : ""
      } dark:border-white/10 dark:bg-white/5 dark:shadow-[0_18px_40px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_28px_70px_rgba(0,0,0,0.55)] ${span}`}
      style={{ animationDelay }}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-white/85 transition-colors duration-500 dark:bg-white/8" />
        <div
          className="absolute inset-0 opacity-70 transition-opacity duration-500 dark:opacity-60"
          style={{ background: gradientFill }}
        />
      </div>
      <div className="flex items-start gap-2 md:gap-4">
        <div className="flex h-8 w-8 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border border-neutral-900/15 bg-white transition-colors duration-500 dark:border-white/15 dark:bg-white/10">
          <Icon
            className="h-4 w-4 md:h-7 md:w-7 text-neutral-900 transition-colors duration-500 dark:text-white"
            strokeWidth={1.5}
            style={{ animation }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <header className="flex items-start gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-900 transition-colors duration-500 md:text-base dark:text-white truncate">
              {title}
            </h3>
            {meta && (
              <span className="ml-auto flex-shrink-0 rounded-full border border-neutral-900/10 px-1 py-0.5 text-[8px] md:px-2 md:text-[10px] uppercase tracking-[0.3em] text-neutral-500 transition-colors duration-500 dark:border-white/15 dark:text-white/60 hidden md:inline-flex">
                {meta}
              </span>
            )}
          </header>
          <p className="mt-1 text-[10px] leading-snug text-neutral-600 transition-colors duration-500 md:mt-2 md:text-xs md:leading-snug dark:text-white/60 line-clamp-3">
            {blurb}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div
          className="absolute inset-0 rounded-2xl border border-neutral-900/10 transition-colors duration-500 dark:border-white/10"
          style={{
            maskImage:
              "radial-gradient(220px_220px_at_var(--x,50%)_var(--y,50%), black, transparent)",
            WebkitMaskImage:
              "radial-gradient(220px_220px_at_var(--x,50%)_var(--y,50%), black, transparent)",
          }}
        />
      </div>
    </article>
  );
}

export default FeaturesSectionMinimal;
export { FeaturesSectionMinimal };

