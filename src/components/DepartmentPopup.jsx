import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";

const DepartmentPopup = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const contentRef = useRef(null);
  const timelineRef = useRef(null);

  const departments = [
    {
      title: 'Computer Science',
      shortName: 'CSE',
      description: 'Software development, AI, and cutting-edge technology.',
      events: ['Codekshestra', 'AI Workshop', 'Hackathon'],
      color: 'blue'
    },
    {
      title: 'Mechanical Engineering',
      shortName: 'MECH',
      description: 'Innovation in mechanical design and engineering.',
      events: ['Mech-Fit', 'Fun-O-Mech', 'Robotics'],
      color: 'orange'
    },
    {
      title: 'Electrical Engineering',
      shortName: 'EE',
      description: 'Power systems and electronics innovation.',
      events: ['E3 Event', 'Circuit Design', 'Power Challenge'],
      color: 'yellow'
    },
    {
      title: 'Electronics & Telecommunication',
      shortName: 'ENTC',
      description: 'Communication systems and electronic design.',
      events: ['Robotantra', 'Eco Canvas', 'Signal Processing'],
      color: 'purple'
    },
    {
      title: 'Civil Engineering',
      shortName: 'CIVIL',
      description: 'Infrastructure design and sustainable construction.',
      events: ['Cadonova', 'Survey Sprint', 'Bridge Design'],
      color: 'green'
    }
  ];

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

      // Stagger animate department cards
      tl.fromTo(".dept-card", {
        opacity: 0,
        y: 30,
        rotationX: -10,
        transformPerspective: 800
      }, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.5,
        stagger: 0.1,
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

  const handleDepartmentClick = (deptShortName) => {
    // This could open the TechEventDetailsPopup with the specific department
    // For now, we'll just log it
    console.log(`Department clicked: ${deptShortName}`);
  };

  if (!isOpen) return null;

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-500/20 border-blue-400/30 text-blue-100',
      orange: 'bg-orange-500/20 border-orange-400/30 text-orange-100',
      yellow: 'bg-yellow-500/20 border-yellow-400/30 text-yellow-100',
      purple: 'bg-purple-500/20 border-purple-400/30 text-purple-100',
      green: 'bg-green-500/20 border-green-400/30 text-green-100'
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-xl p-2 sm:p-4">
      <div
        ref={popupRef}
        className="relative w-full max-w-2xl sm:max-w-4xl mx-auto bg-black rounded-2xl border border-white/20 overflow-hidden max-h-[90vh] overflow-y-auto"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 98%, 98% 100%, 0 100%)",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Background Video */}
        <video
          src="/videos/hero-1.mp4"
          loop
          muted
          autoPlay
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />

        {/* Content Container */}
        <div ref={contentRef} className="relative z-10 p-3 sm:p-4 md:p-6">
          {/* Title Section */}
          <div className="mb-4 sm:mb-6">
            <h1 className="special-font text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-blue-100 mb-2 text-center">
              Explore Departments
            </h1>
            <p className="font-circular-web text-xs sm:text-sm text-blue-50/80 text-center">
              Choose your department to discover exciting events
            </p>
          </div>

          {/* Departments Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {departments.map((dept, index) => (
              <div
                key={index}
                className={`dept-card ${getColorClasses(dept.color)} backdrop-blur-sm rounded-lg p-3 sm:p-4 border hover:scale-105 transition-all duration-300 cursor-pointer`}
                onClick={() => handleDepartmentClick(dept.shortName)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="special-font text-sm sm:text-base font-black">
                    {dept.shortName}
                  </h3>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="text-xs sm:text-sm font-bold">{index + 1}</span>
                  </div>
                </div>
                <h4 className="font-circular-web text-xs sm:text-sm font-bold mb-1 sm:mb-2 opacity-90">
                  {dept.title}
                </h4>
                <p className="font-circular-web text-xs text-blue-50/80 mb-2 sm:mb-3 leading-relaxed">
                  {dept.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {dept.events.slice(0, 2).map((event, eventIndex) => (
                    <span
                      key={eventIndex}
                      className="text-xs bg-white/10 px-2 py-1 rounded-full"
                    >
                      {event}
                    </span>
                  ))}
                  {dept.events.length > 2 && (
                    <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                      +{dept.events.length - 2}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              id="register-all"
              title="Register for Events"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-2 text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3"
              onClick={() => window.open("https://forms.gle/YYhCjenFBC6xpquMA", "_blank")}
            />
            <Button
              id="learn-more"
              title="Learn More"
              containerClass="bg-white/10 flex-center gap-2 text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3 border border-white/20"
              onClick={() => window.open("#", "_blank")}
            />
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

export default DepartmentPopup;
