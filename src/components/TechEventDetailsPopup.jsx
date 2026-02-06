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
    'codekshestra': {
      title: 'CODEKSHESTRA',
      time: '24 Hours (Tech-Symposium 2K26)',
      location: 'CSE / AI-ML / AI-DS Department',
      description: '24-hour hackathon focused on software project development with live building, innovation, and problem-solving.',
      rounds: [
        { title: 'Hackathon Phase', desc: '24-hour continuous software development challenge' }
      ],
      video: '/videos/codekshestra.mp4'
    },

    'e3': {
      title: 'E3 EVENT',
      time: 'March 07, 2026',
      location: 'EL-1 and EL-2 Classrooms, Electrical Dept.',
      description: 'One-day technical event testing analytical, logical, and problem-solving skills.',
      rounds: [
        { title: 'PDF Mania', desc: 'Technical knowledge round' },
        { title: 'Puzzle Bars', desc: 'Logic and puzzle-solving round' },
        { title: 'Final Round', desc: 'Final evaluation round' }
      ],
      video: '/videos/e3.mp4'
    },

    'robotantra': {
      title: 'ROBOTANTRA',
      time: 'March 07, 2026',
      location: 'Open space near back gate',
      description: 'Robotics competition focusing on design, screening, and final execution.',
      rounds: [
        { title: 'Screening Round', desc: 'Initial evaluation of robots' },
        { title: 'Final Round', desc: 'Final performance and judging' }
      ],
      video: '/videos/robotantra.mp4'
    },

    'ecocanvas': {
      title: 'ECO CANVAS',
      time: 'March 07, 2026',
      location: 'Microprocessor Lab, ETC Department',
      description: 'Poster presentation event focused on environmental awareness and innovation.',
      rounds: [
        { title: 'Screening Round', desc: 'Poster screening and shortlisting' },
        { title: 'Final Round', desc: 'Final poster presentation' }
      ],
      video: '/videos/ecocanvas.mp4'
    },

    'mechfit': {
      title: 'MECH-FIT',
      time: 'Tech-Symposium 2K26',
      location: 'Mechanical Engineering Department',
      description: 'Technical and practical mechanical engineering competition.',
      rounds: [
        { title: 'Technical MCQ', desc: '30 questions in 20 minutes (no mobile phones)' },
        { title: 'Assembly War', desc: 'Fastest mechanical assembly challenge (team of 2)' }
      ],
      video: '/videos/mechfit.mp4'
    },

    'funomech': {
      title: 'FUN-O-MECH',
      time: 'Tech-Symposium 2K26',
      location: 'Mechanical Engineering Department',
      description: 'Fun-filled mechanical event combining creativity, quizzes, and exploration.',
      rounds: [
        { title: 'Balloon Car Race', desc: 'Cardboard car race challenge' },
        { title: 'Rapid Fire Quiz', desc: 'Automobile-based quiz' },
        { title: 'Treasure Hunt', desc: 'On-the-spot rules exploration round' }
      ],
      video: '/videos/funomech.mp4'
    },

    'cadonova': {
      title: 'CADONOVA',
      time: 'Tech-Symposium 2K26',
      location: 'Civil Engineering Department',
      description: 'AutoCAD-based event focusing on planning, drawing, and design skills.',
      rounds: [
        { title: 'Quiz', desc: 'AutoCAD, building planning, and drawing quiz' },
        { title: 'Design Round', desc: 'Planning and drawing using AutoCAD' }
      ],
      video: '/videos/cadonova.mp4'
    },

    'surveysprint': {
      title: 'THE SURVEY SPRINT',
      time: 'Tech-Symposium 2K26',
      location: 'Civil Engineering Department',
      description: 'Survey-based team event combining quizzes, puzzles, and treasure hunting.',
      rounds: [
        { title: 'Surveying Quiz', desc: 'MCQ-based surveying knowledge test' },
        { title: 'Instrument Puzzle', desc: 'Reassemble surveying instrument image' },
        { title: 'Survey Treasure Hunt', desc: 'Final exploration challenge' }
      ],
      video: '/videos/surveysprint.mp4'
    }
  };

  // Mapping from department/category titles to specific events
  const departmentEventMapping = {
    'hackathon': 'codekshestra',
    'mechanical': 'mechfit', // Could also be 'funomech' - using mechfit as default
    'mecanical': 'mechfit', // Handle potential spelling issue
    'electrical': 'e3',
    'entc': 'robotantra', // Could also be 'ecocanvas' - using robotantra as default
    'civil': 'cadonova', // Could also be 'surveysprint' - using cadonova as default
    'explore events': 'codekshestra' // Default for general explore
  };

  const normalizeEventTitle = (title) => {
    console.log('=== NEW POPUP OPEN ===');
    console.log('Debug - Raw title:', title);
    console.log('Debug - Title type:', typeof title);
    
    if (!title) return 'codekshestra';
    
    // Handle React element case
    if (title?.props?.children) {
      console.log('Debug - React element children:', title.props.children);
      // Handle nested React elements - extract text properly
      const extractTextFromChildren = (children) => {
        if (typeof children === 'string') return children;
        if (Array.isArray(children)) {
          return children.map(child => extractTextFromChildren(child)).join('');
        }
        if (children?.props?.children) {
          return extractTextFromChildren(children.props.children);
        }
        return '';
      };
      
      const textContent = extractTextFromChildren(title.props.children).toLowerCase().replace(/[^a-z]/g, '');
      console.log('Debug - Extracted text content:', textContent);
      const mappedEvent = departmentEventMapping[textContent] || textContent;
      console.log('Debug - Mapped event:', mappedEvent);
      return mappedEvent;
    }
    
    // Handle string case
    const normalizedTitle = title.toString().toLowerCase().replace(/[^a-z]/g, '');
    console.log('Debug - Normalized string title:', normalizedTitle);
    const mappedEvent = departmentEventMapping[normalizedTitle] || normalizedTitle;
    console.log('Debug - Final mapped event:', mappedEvent);
    return mappedEvent;
  };

  const eventKey = normalizeEventTitle(eventTitle);
  console.log('Debug - Final eventKey:', eventKey);
  const event = eventDetails[eventKey] || eventDetails.codekshestra;
  console.log('Debug - Selected event:', event.title);

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
