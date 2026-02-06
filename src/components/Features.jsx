import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import TechEventDetailsPopup from "./TechEventDetailsPopup";

/* =========================
   Bento Tilt (Desktop only)
========================= */
export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const isDesktop =
    typeof window !== "undefined" && window.innerWidth >= 768;

  const handleMouseMove = (event) => {
    if (!itemRef.current || !isDesktop) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    setTransformStyle(
      `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95,.95,.95)`
    );
  };

  const handleMouseLeave = () => {
    if (!isDesktop) return;
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: isDesktop ? transformStyle : "none" }}
    >
      {children}
    </div>
  );
};

/* =========================
   Bento Card
========================= */
export const BentoCard = ({ src, title, description, onViewDetails }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleButtonMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <div className="relative size-full overflow-hidden rounded-md">
      {/* Background */}
      <div
        className="absolute inset-0 bg-black/80"
        style={{
          backgroundImage: `url(/${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Video Support */}
      {src.endsWith(".mp4") && (
        <video
          src={src}
          loop
          muted
          autoPlay
          playsInline
          preload="metadata"
          className="absolute inset-0 size-full object-cover opacity-60"
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex size-full flex-col justify-between p-3 md:p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font text-xl md:text-3xl lg:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-64 text-xs md:text-base opacity-80">
              {description}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          {/* View Details */}
          <div
            onMouseMove={handleButtonMouseMove}
            onMouseEnter={() => setHoveredButton("details")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => onViewDetails?.(title)}
            className="relative flex cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-4 py-1.5 text-[10px] uppercase text-white/70 md:px-5 md:py-2 md:text-xs md:text-white/20"
          >
            <div
              className="pointer-events-none absolute -inset-px transition duration-300"
              style={{
                opacity: hoveredButton === "details" ? 1 : 0,
                background: `radial-gradient(80px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #3b82f688, transparent)`,
              }}
            />
            <TiLocationArrow className="relative z-10" />
            <span className="relative z-10">view details</span>
          </div>

          {/* Register */}
          <div
            onMouseMove={handleButtonMouseMove}
            onMouseEnter={() => setHoveredButton("register")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => window.open("https://forms.gle/YYhCjenFBC6xpquMA", "_blank")}
            className="relative flex cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-4 py-1.5 text-[10px] uppercase text-white/70 md:px-5 md:py-2 md:text-xs md:text-white/20"
          >
            <div
              className="pointer-events-none absolute -inset-px transition duration-300"
              style={{
                opacity: hoveredButton === "register" ? 1 : 0,
                background: `radial-gradient(80px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #fbbf2488, transparent)`,
              }}
            />
            <TiLocationArrow className="relative z-10" />
            <span className="relative z-10">register now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================
   Features Section
========================= */
export const Features = () => {
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleViewDetails = (eventTitle) => {
    setSelectedEvent(eventTitle);
    setIsDetailsPopupOpen(true);
  };

  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        {/* Intro */}
        <div className="px-5 py-32">
          <p className="text-lg text-blue-50">Enter the Symposium</p>
          <p className="max-w-md text-lg text-blue-50 opacity-50">
            Explore a dynamic digital space where emerging technologies unite
            to create seamless and interactive experiences.
          </p>
        </div>

        {/* Hero */}
        <BentoTilt className="relative mb-7 h-72 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="videos/feature-1.mp4"
            title={
              <>
                EXPLORE <b>E</b>VENTS
              </>
            }
            description="Discover a wide range of technical and non-technical events designed to challenge skills, spark creativity, and inspire innovation."
            onViewDetails={handleViewDetails}
          />
        </BentoTilt>

        {/* Grid → stack on mobile */}
        <div className="flex flex-col gap-5 md:grid md:h-[135vh] md:grid-cols-2 md:grid-rows-3">
          <BentoTilt className="relative h-44 md:h-auto md:row-span-2">
            <BentoCard
              src="img/cardbackground.png"
              title={
                <>
                  HAC<b>K</b>ATHON
                </>
              }
              description="High-energy problem solving meets innovation."
              onViewDetails={handleViewDetails}
            />
          </BentoTilt>

          <BentoTilt className="relative h-44 md:h-auto">
            <BentoCard
              src="img/cardbackground4.png"
              title={
                <>
                  MEC<b>A</b>NICAL
                </>
              }
              description="Engineering challenges that push real-world thinking."
              onViewDetails={handleViewDetails}
            />
          </BentoTilt>

          <BentoTilt className="relative h-44 md:h-auto">
            <BentoCard
              src="img/cardbackground2.png"
              title={
                <>
                  ELEC<b>T</b>RICAL
                </>
              }
              description="Innovative circuits, power, and automation."
              onViewDetails={handleViewDetails}
            />
          </BentoTilt>

          <BentoTilt className="relative h-44 md:h-auto">
            <BentoCard
              src="img/cardbackground3.png"
              title={
                <>
                  EN<b>T</b>C
                </>
              }
              description="Electronics & communication challenges."
              onViewDetails={handleViewDetails}
            />
          </BentoTilt>

          <BentoTilt className="relative h-44 md:h-auto">
            <BentoCard
              src="img/cardbackground4.png"
              title={
                <>
                  CI<b>V</b>IL
                </>
              }
              description="Design, structure, and sustainability."
              onViewDetails={handleViewDetails}
            />
          </BentoTilt>
        </div>
      </div>

      <TechEventDetailsPopup
        isOpen={isDetailsPopupOpen}
        onClose={() => setIsDetailsPopupOpen(false)}
        eventTitle={selectedEvent}
      />
    </section>
  );
};

export default Features;
