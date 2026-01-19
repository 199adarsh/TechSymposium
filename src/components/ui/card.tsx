import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils"; // Your utility for merging Tailwind classes

// Define the type for a single partner
export interface Partner {
  name: string;
  cashback: string;
  logo: React.ReactNode;
  href: string;
}

// Define the props for the main component
export interface CashbackPartnersCardProps {
  title: string;
  partners: Partner[];
  viewAllHref?: string;
  className?: string;
}

/**
 * A responsive, theme-adaptive card component to display EXPLORE.
 * Features a grid layout and subtle animations on load.
 */
export const CashbackPartnersCard = ({
  title,
  partners,
  viewAllHref = "#",
  className,
}: CashbackPartnersCardProps) => {
  // Animation variants for the container to orchestrate children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for each partner item
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(
        "w-full max-w-[90vw] rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm",
        className
      )}
    >
      {/* Card Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <a
          href={viewAllHref}
          aria-label="Explore Events partners"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 text-muted-foreground transition-colors hover:bg-muted"
        >
          <ArrowUpRight className="h-5 w-5" />
        </a>
      </div>

      {/* Partners Grid */}
      <motion.ul
        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {partners.map((partner, index) => (
          <motion.li key={index} variants={itemVariants}>
            <a
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 md:gap-3 rounded-full border border-border bg-transparent p-1.5 md:p-3 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-accent hover:shadow-md"
            >
              {/* Partner Logo */}
              <div className="flex h-6 w-6 md:h-10 md:w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted/50">
                {partner.logo}
              </div>
              {/* Partner Info */}
              <div>
                <p className="text-[10px] md:font-medium md:text-base text-card-foreground">{partner.name}</p>
                <p className="text-[8px] md:text-sm text-muted-foreground">{`Cashback ${partner.cashback}`}</p>
              </div>
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
};


// --- Logo Components using external SVG URLs ---
const GoogleLogo = () => (
  <img src="https://svgl.app/library/google.svg" alt="Google logo" className="h-6 w-6" />
);

const AppleLogo = () => (
  <img src="https://svgl.app/library/n8n.svg" alt="Apple logo" className="h-7 w-7" />
);

const Slack = () => (
  <img src="https://svgl.app/library/slack.svg" alt="Mailchimp logo" className="h-7 w-7" />
);

const FigmaLogo = () => (
  <img src="https://svgl.app/library/figma.svg" alt="Figma logo" className="h-7 w-7" />
);


// --- Demo Component ---
const CashbackPartnersDemo = () => {
  const partnersData: Partner[] = [
    {
      name: "COMPUTER SCIENCE ",
      cashback: "1.5%",
      logo: <GoogleLogo />,
      href: "#",
    },
    {
      name: "AI ML",
      cashback: "1.1%",
      logo: <AppleLogo />,
      href: "#",
    },
    {
      name: "DATA SCIENCE",
      cashback: "3.2%",
      logo: <Slack />,
      href: "#",
    },
    {
      name: "ENTC",
      cashback: "2.8%",
      logo: <FigmaLogo />,
      href: "#",
    },
     {
      name: "ELECTRICAL",
      cashback: "1.5%",
      logo: <GoogleLogo />,
      href: "#",
    },
    {
      name: "MECHANICAL",
      cashback: "1.1%",
      logo: <AppleLogo />,
      href: "#",
    },
    {
      name: "CIVIL",
      cashback: "3.2%",
      logo: <Slack />,
      href: "#",
    },
 
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

      <section className="relative mx-auto w-[90vw] max-w-none px-6 py-20">
        <header className="mb-10 flex flex-col gap-6 border-b border-neutral-900/10 pb-6 transition-colors duration-500 md:flex-row md:items-end md:justify-between dark:border-white/10">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.35em] text-neutral-500 transition-colors duration-500 dark:text-white/40">
              Explore Our Events
            </span>
            <h2 className="text-3xl font-black tracking-tight text-neutral-900 transition-colors duration-500 md:text-5xl dark:text-white">
              CLUBS
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <p className="max-w-sm text-sm text-neutral-600 transition-colors duration-500 md:text-base dark:text-white/60">
              Discover competitions, workshops, and challenges hosted by our club to test skill and spark growth.          </p>
            <button
              type="button"
              className="rounded-full border border-neutral-900/15 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-600 transition-colors duration-500 hover:bg-neutral-900/5 hover:text-neutral-900 dark:border-white/20 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
            >
              Explore Events
            </button>
          </div>
        </header>

        <CashbackPartnersCard 
          title="Featured Partners" 
          partners={partnersData} 
        />
      </section>
    </div>
  );
};

export default CashbackPartnersDemo;