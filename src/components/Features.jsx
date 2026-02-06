import { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import TechEventDetailsPopup from "./TechEventDetailsPopup";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, onViewDetails }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleButtonMouseMove = (event, buttonType) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleButtonMouseEnter = (buttonType) => setHoveredButton(buttonType);
  const handleButtonMouseLeave = () => setHoveredButton(null);

  const handleViewDetailsClick = () => {
    if (onViewDetails) {
      onViewDetails(title);
    }
  };

  return (
    <div className="relative size-full">
      <div 
        className="absolute inset-0 w-full h-full bg-black/80"
        style={{
          backgroundImage: `url(/${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      {src.endsWith('.mp4') && (
        <video
          src={src}
          loop
          muted
          autoPlay
          playsInline
          preload="metadata"
          className="absolute left-0 top-0 size-full object-cover object-center opacity-60"
          onLoadedData={() => {
            // Video loaded successfully
          }}
          onError={() => {
            // Fallback to background if video fails
          }}
        />
      )}
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        <div className="flex flex-row gap-2">
          {/* View Details Button */}
          <div
            onMouseMove={(e) => handleButtonMouseMove(e, 'details')}
            onMouseEnter={() => handleButtonMouseEnter('details')}
            onMouseLeave={handleButtonMouseLeave}
            onClick={handleViewDetailsClick}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoveredButton === 'details' ? 1 : 0,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #3b82f688, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">view details</p>
          </div>

          {/* Register Now Button */}
          <div
            onMouseMove={(e) => handleButtonMouseMove(e, 'register')}
            onMouseEnter={() => handleButtonMouseEnter('register')}
            onMouseLeave={handleButtonMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoveredButton === 'register' ? 1 : 0,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #fbbf2488, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">register now</p>
          </div>
        </div>
      </div>
    </div>
  );
};

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
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Enter the Symposium
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
        
        Explore a dynamic digital space where emerging technologies unite to create seamless and interactive experiences.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
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

      <div className="grid h-auto w-full grid-cols-1 gap-7 md:h-[135vh] md:grid-cols-2 md:grid-rows-3">
        <BentoTilt className="bento-tilt_1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="public/img/cardbackground.png"
            title={
              <>
                HAC<b>K</b>ATHON
              </>
            }
            description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            onViewDetails={handleViewDetails}
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 md:col-span-1 md:row-span-1">
          <BentoCard
            src="img/cardbackground4.png"
            title={
              <>
              MEC<b>A</b>NICAL
              </>
            }
            description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
            onViewDetails={handleViewDetails}
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 md:col-span-1 md:row-span-1">
          <BentoCard
            src="img/cardbackground2.png"
            title={
              <>
                ELEC<b>T</b>RICAL
              </>
            }
            description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
            onViewDetails={handleViewDetails}
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2 md:col-span-1 md:row-span-1">
          <BentoCard
            src="img/cardbackground3.png"
            title={
              <>
              EN<b>T</b>C
              </>
            }
            description="Additional features and experiences coming soon to enhance your journey."
            onViewDetails={handleViewDetails}
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2 md:col-span-1 md:row-span-1">
          <BentoCard
            src="img/cardbackground4.png"
            title={
              <>
              CI<b>V</b>IL
              </>
            }
            description="Explore our complete collection of innovative metagame experiences."
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
