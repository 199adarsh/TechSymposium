"use client";
import React, { useState } from "react";

interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

interface Partner {
  logoUrl: string;
  href: string;
}

interface ResponsiveHeroBannerProps {
  logoUrl?: string;
  backgroundImageUrl?: string;
  navLinks?: NavLink[];
  ctaButtonText?: string;
  ctaButtonHref?: string;
  badgeText?: string;
  badgeLabel?: string;
  title?: string;
  titleLine2?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  partners?: Partner[];
}

const ResponsiveHeroBanner: React.FC<ResponsiveHeroBannerProps> = ({
  logoUrl = "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/febf2421-4a9a-42d6-871d-ff4f9518021c_1600w.png",
  backgroundImageUrl = "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg",
  navLinks = [
    { label: "Home", href: "#", isActive: true },
    { label: "Events", href: "#" },
    { label: "Sponsors", href: "#" },
    { label: "Devlopers", href: "#" },
  ],
  ctaButtonText = "Events",
  ctaButtonHref = "#",
  badgeLabel = "New",
  badgeText = "Tech Symposium 2026",
  title = "A national stage for future engineers.",
  titleLine2 = " ",
  description = "Where India’s brightest engineering minds compete, collaborate, and create.",
  primaryButtonText = "Register Now",
  primaryButtonHref = "#",
  secondaryButtonText = "Watch Launch",
  secondaryButtonHref = "#",
  partners = [],
}) => {

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-neutral-100 overflow-x-hidden">
      <section className="relative w-[98%] h-[95vh] rounded-[32px] overflow-hidden isolate">
        {/* Background */}
        <img
          src={backgroundImageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* HEADER */}
        <header className="relative z-10 px-6 pt-4">
          <div className="flex items-center justify-between">
            <div
              className="inline-flex items-center justify-center bg-center w-[100px] h-[40px] bg-cover rounded"
              style={{ backgroundImage: `url(${logoUrl})` }}
              aria-label="Logo"
            />

            <nav className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-full bg-white/10 px-1 mt-1 py-1 backdrop-blur">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className={`px-3 py-2 text-sm transition-colors ${
                      link.isActive ? "text-white" : "text-white/70"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}

                <a
                  href={ctaButtonHref}
                  className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-neutral-900 hover:bg-white/90 transition-colors"
                >
                  {ctaButtonText}
                </a>
              </div>
            </nav>
          </div>
        </header>

        {/* CONTENT */}
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-3 py-2 backdrop-blur">
              <span className="bg-white/90 text-black text-xs font-semibold rounded-full px-2 py-0.5">
                {badgeLabel}
              </span>
              <span className="text-sm text-white/90">{badgeText}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-tight">
              {title}
              <br />
              {titleLine2}
            </h1>

            <p className="mt-6 text-white/80">{description}</p>

            <div className="mt-10">
              <a
                href={primaryButtonHref}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-white hover:bg-white/20 transition"
              >
                {primaryButtonText}
              </a>
            </div>

            {partners.length > 0 && (
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
                {partners.map((partner, index) => (
                  <div
                    key={index}
                    className="w-[120px] h-[36px] bg-center bg-contain bg-no-repeat opacity-80 hover:opacity-100 transition"
                    style={{
                      backgroundImage: `url(${partner.logoUrl})`,
                    }}
                    aria-label={`Partner ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResponsiveHeroBanner;
