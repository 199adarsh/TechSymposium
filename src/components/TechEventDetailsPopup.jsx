import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";

const TechEventDetailsPopup = ({ isOpen, onClose, eventTitle }) => {
  const popupRef = useRef(null);
  const contentRef = useRef(null);
  const timelineRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  const eventDetails = {
    'radiant': {
      title: 'RADIANT',
      time: 'March 15-17, 2024',
      location: 'Virtual + Silicon Valley',
      description: 'Revolutionary metagame platform that seamlessly integrates Web2 and Web3 gaming experiences into a unified reward ecosystem.',
      rounds: [
        { title: 'Qualification Round', desc: 'Initial screening and portfolio review' },
        { title: 'Semi-Finals', desc: 'Technical challenges and live coding' },
        { title: 'Grand Finale', desc: 'Final presentation and awards ceremony' }
      ],
      video: '/videos/feature-1.mp4'
    },
    'zigma': {
      title: 'ZIGMA',
      time: 'March 22-24, 2024',
      location: 'Tokyo, Japan',
      description: 'Anime and gaming-inspired NFT collection and IP expansion platform bringing together digital art and blockchain technology.',
      rounds: [
        { title: 'Art Submission', desc: 'Digital artwork and character design submission' },
        { title: 'Community Voting', desc: 'Community judging and feedback phase' },
        { title: 'NFT Minting', desc: 'Final selection and NFT minting event' }
      ],
      video: '/videos/feature-2.mp4'
    },
    'nexus': {
      title: 'NEXUS',
      time: 'April 5-7, 2024',
      location: 'Berlin, Germany',
      description: 'Gamified social hub adding new dimensions of play to social interaction for Web3 communities and digital spaces.',
      rounds: [
        { title: 'Social Challenge', desc: 'Community engagement and networking tasks' },
        { title: 'Platform Demo', desc: 'Live platform demonstration and testing' },
        { title: 'Integration Awards', desc: 'Best integration and innovation awards' }
      ],
      video: '/videos/feature-3.mp4'
    },
    'azul': {
      title: 'AZUL',
      time: 'April 12-14, 2024',
      location: 'Austin, Texas',
      description: 'Cross-world AI Agent elevating your gameplay to be more fun and productive with intelligent assistance.',
      rounds: [
        { title: 'AI Training', desc: 'AI model training and optimization' },
        { title: 'Beta Testing', desc: 'Closed beta with community feedback' },
        { title: 'Public Launch', desc: 'Public release and showcase event' }
      ],
      video: '/videos/feature-4.mp4'
    },
    'more': {
      title: 'MORE FEATURES',
      time: 'April 19-21, 2024',
      location: 'Miami, Florida',
      description: 'Additional features and experiences coming soon to enhance your journey through the metagame layer.',
      rounds: [
        { title: 'Feature Preview', desc: 'Exclusive preview of upcoming features' },
        { title: 'Developer Workshop', desc: 'Hands-on development and integration' },
        { title: 'Feature Release', desc: 'Official feature launch and demonstration' }
      ],
      video: '/videos/feature-5.mp4'
    },
    'features': {
      title: 'FEATURES SHOWCASE',
      time: 'April 26-28, 2024',
      location: 'San Francisco, CA',
      description: 'Explore our complete collection of innovative metagame experiences and cutting-edge technology demonstrations.',
      rounds: [
        { title: 'Innovation Expo', desc: 'Technology showcase and demonstrations' },
        { title: 'Expert Panels', desc: 'Industry expert discussions and insights' },
        { title: 'Awards Ceremony', desc: 'Recognition of outstanding innovations' }
      ],
      video: '/videos/feature-5.mp4'
    }
  };

  const event = eventDetails[eventTitle?.props?.children?.[0]?.toLowerCase()] || 
               eventDetails[eventTitle?.toString().toLowerCase().replace(/[^a-z]/g, '')] || 
               eventDetails.features;

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

      // Stagger animate content sections
      tl.fromTo(".event-section", {
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
  }, [isOpen, eventTitle]);

  const handleClose = () => {
    if (timelineRef.current && popupRef.current) {
      timelineRef.current.reverse().then(() => {
        onClose();
      });
    }
  };

  const handleSectionHover = (index) => {
    setActiveSection(index);
    const sections = document.querySelectorAll('.event-section');
    if (sections[index]) {
      gsap.to(sections[index], {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleSectionLeave = (index) => {
    setActiveSection(-1);
    const sections = document.querySelectorAll('.event-section');
    if (sections[index]) {
      gsap.to(sections[index], {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
      <div
        ref={popupRef}
        className="relative w-full max-w-4xl mx-auto bg-black rounded-2xl border border-white/20 overflow-hidden"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 98%, 98% 100%, 0 100%)",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Background Video */}
        <video
          src={event.video}
          loop
          muted
          autoPlay
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />

        {/* Content Container */}
        <div ref={contentRef} className="relative z-10 p-6 md:p-8">
          {/* Title Section */}
          <div className="event-section mb-6">
            <h1 className="special-font text-4xl md:text-5xl font-black text-blue-100 mb-4">
              {event.title}
            </h1>
          </div>

          {/* Time and Location Section */}
          <div className="event-section mb-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-300 rounded-full" />
                <div>
                  <p className="font-circular-web text-sm text-blue-50/60 uppercase tracking-wider">Time</p>
                  <p className="font-circular-web text-base text-blue-100">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full" />
                <div>
                  <p className="font-circular-web text-sm text-blue-50/60 uppercase tracking-wider">Location</p>
                  <p className="font-circular-web text-base text-blue-100">{event.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="event-section mb-8">
            <div className="bg-blue-75/30 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <p className="font-circular-web text-base text-blue-50/90 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>

          {/* 3 Rounds Section */}
          <div className="event-section mb-8">
            <h2 className="special-font text-xl md:text-2xl font-black text-blue-100 mb-6">
              Event <b>Rounds</b>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {event.rounds.map((round, index) => (
                <div
                  key={index}
                  className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-yellow-300/30 transition-all duration-300"
                  onMouseEnter={() => handleSectionHover(index)}
                  onMouseLeave={() => handleSectionLeave(index)}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-yellow-300/20 rounded-full flex items-center justify-center">
                      <span className="text-yellow-300 font-circular-web text-xs font-bold">{index + 1}</span>
                    </div>
                    <h3 className="special-font text-base font-black text-blue-100">
                      {round.title}
                    </h3>
                  </div>
                  <p className="font-circular-web text-xs text-blue-50/80">
                    {round.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="event-section flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              id="visit-website"
              title="Visit Website"
              containerClass="bg-blue-500 hover:bg-blue-600 text-white flex-center gap-2"
            />
            <Button
              id="register-event"
              title="Register Now"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-2"
              onClick={() => window.open("https://forms.gle/YYhCjenFBC6xpquMA", "_blank")}
            />
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default TechEventDetailsPopup;
