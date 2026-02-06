import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";

const DepartmentPopup = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const cardRefs = useRef([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const departments = [
    {
      id: 1,
      title: "AI & ML",
      description: "Neural networks and deep learning research",
      videoSrc: "videos/feature-1.mp4"
    },
    {
      id: 2,
      title: "WEB DEV",
      description: "Full-stack development and modern frameworks",
      videoSrc: "videos/feature-2.mp4"
    },
    {
      id: 3,
      title: "SECURITY",
      description: "Ethical hacking and cryptography systems",
      videoSrc: "videos/feature-3.mp4"
    },
    {
      id: 4,
      title: "BLOCKCHAIN",
      description: "Decentralized tech and smart contracts",
      videoSrc: "videos/feature-4.mp4"
    }
  ];

  useEffect(() => {
    if (isOpen && popupRef.current) {
      gsap.fromTo(popupRef.current,
        {
          opacity: 0,
          scale: 0.9,
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
        },
        {
          opacity: 1,
          scale: 1,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 0.8,
          ease: "power3.out"
        }
      );

      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            {
              opacity: 0,
              y: 30
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.15,
              ease: "power2.out"
            }
          );
        }
      });
    }
  }, [isOpen]);

  const handleCardMouseMove = (event, cardIndex) => {
    if (!cardRefs.current[cardIndex]) return;
    
    const rect = cardRefs.current[cardIndex].getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setCursorPosition({ x, y });
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 8;
    const rotateY = (centerX - x) / 8;
    
    gsap.to(cardRefs.current[cardIndex], {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleCardMouseLeave = (cardIndex) => {
    if (cardRefs.current[cardIndex]) {
      gsap.to(cardRefs.current[cardIndex], {
        rotationX: 0,
        rotationY: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleDepartmentSelect = (department) => {
    gsap.to(cardRefs.current[department.id - 1], {
      scale: 1.02,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      onComplete: () => {
        console.log(`Selected: ${department.title}`);
      }
    });
  };

  const handleClose = () => {
    if (popupRef.current) {
      gsap.to(popupRef.current, {
        opacity: 0,
        scale: 0.9,
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        duration: 0.5,
        ease: "power2.in",
        onComplete: onClose
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div
        ref={popupRef}
        className="relative w-full max-w-5xl mx-auto p-8 bg-black rounded-lg border border-white/20"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 95%, 85% 100%, 0 100%)",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="special-font text-4xl md:text-5xl font-black text-blue-100 mb-4">
            <span className="text-blue-300">SELECT DEPARTMENT</span> 
          </h2>
          <p className="font-circular-web text-sm md:text-base text-blue-50/80 max-w-2xl mx-auto">
            Select your specialized department and begin your journey into the metagame layer
          </p>
        </div>

        {/* Department Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          {departments.map((dept, index) => (
            <div
              key={dept.id}
              ref={el => cardRefs.current[index] = el}
              className="relative h-48 md:h-64 cursor-pointer overflow-hidden rounded-lg bg-blue-75 border border-white/10"
              onMouseMove={(e) => handleCardMouseMove(e, index)}
              onMouseLeave={() => handleCardMouseLeave(index)}
              onMouseEnter={() => setHoveredCard(dept.id)}
              onClick={() => handleDepartmentSelect(dept)}
              style={{
                transformStyle: "preserve-3d"
              }}
            >
              {/* Video Background */}
              <video
                src={dept.videoSrc}
                loop
                muted
                autoPlay
                className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
              />
              
              {/* Hover Effect Overlay */}
              {hoveredCard === dept.id && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(200px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(109, 111, 226, 0.4), transparent)`,
                    mixBlendMode: "overlay"
                  }}
                />
              )}
              
              {/* Content Overlay */}
              <div className="relative z-10 flex flex-col justify-between h-full p-3 md:p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div>
                  <h3 className="special-font text-lg md:text-xl font-black text-blue-100 mb-2">
                    {dept.title.split(' ').map((word, i) => (
                      <span key={i}>
                        {i === 1 ? <b>{word}</b> : word}{' '}
                      </span>
                    ))}
                  </h3>
                  <p className="font-circular-web text-xs md:text-sm text-blue-50/70 leading-relaxed">
                    {dept.description}
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-row gap-2 mt-3">
                  <Button
                    id={`details-${dept.id}`}
                    title="Details"
                    containerClass="bg-blue-600/90 hover:bg-blue-600 text-white flex-center gap-1 text-[10px] px-2 py-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`See details: ${dept.title}`);
                    }}
                  />
                  <Button
                    id={`register-${dept.id}`}
                    title="Register"
                    leftIcon={<TiLocationArrow />}
                    containerClass="bg-yellow-300 flex-center gap-1 text-[10px] px-2 py-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open("https://forms.gle/YYhCjenFBC6xpquMA", "_blank");
                    }}
                  />
                </div>
              </div>
              
              {/* Border Glow */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20" />
              </div>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <div className="flex justify-center">
          <button
            onClick={handleClose}
            className="group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-300 px-6 py-2 text-black font-general text-xs uppercase tracking-wider"
          >
            <span className="relative inline-flex overflow-hidden">
              <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
                Close
              </div>
              <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                Close
              </div>
            </span>
          </button>
        </div>

        {/* Ambient Elements */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-300/10 rounded-full blur-xl" />
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-blue-400/10 rounded-full blur-2xl" />
      </div>
    </div>
  );
};

export default DepartmentPopup;
