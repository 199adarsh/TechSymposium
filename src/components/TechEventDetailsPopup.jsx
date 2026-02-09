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
    time: '10:00 AM',
    date: '6th-7th March 2026',
    location: 'CSE Dept.',
    description: '24-hour hackathon focusing on AgriTech, HealthTech, EduTech, FinTech & AI-Driven Social Impact.',
    rules: [
      'Team of 3 members, Rs. 500/- entry fee',
      'Software projects only, built during hackathon',
      'AI tools allowed, ID proof required'
    ],
    rounds: [
      { title: 'Hackathon', desc: '24-hour continuous development' }
    ],
    coordinator: {
      name: 'Prathamesh Salunkhe',
      phone: '+91 77689 60392'
    },
    video: '/videos/codekshestra.mp4'
  },

  'e3': {
    title: 'E3 EVENT',
  time: '10:00 AM',
    date: '7th March 2026',
    location: 'EL-1 & EL-2 Classrooms',
    description: 'Technical event testing analytical & logical skills.',
    rules: [
      'Individual participation',
      'No mobile phones in Round 1',
      'Time limits strictly followed'
    ],
    rounds: [
      { title: 'PDF Mania', desc: 'Technical knowledge test' },
      { title: 'Puzzle Bars', desc: 'Logic & puzzle solving' },
      { title: 'Final Round', desc: 'Final evaluation' }
    ],
    coordinator: {
      name: 'Prasad Sawant',
      phone: '+91 89560 66835'
    },
    video: '/videos/e3.mp4'
  },

  'robotantra': {
    title: 'MECH-FIT',
    time: '10:00 AM',
    date: '07 MARCH',
    location: 'MECH Dept.',
    description: 'Technical mechanical competition with MCQs & assembly.',
    rules: [
      'Team of 2 for Assembly War',
      'No mobile phones in MCQ round',
      'Fastest assembly wins'
    ],
    rounds: [
      { title: 'MCQ Test', desc: '30 questions in 20 minutes' },
      { title: 'Assembly War', desc: 'Speed assembly challenge' }
    ],
    coordinator: {
      name: 'Rohan Koli',
      phone: '+91 77988 36238'
    },
    video: '/videos/robotantra.mp4'
  },

  'ecocanvas': {
    title: 'FUN-O-MECH',
    time: '10:00 AM',
    date: '07 MARCH',
    location: 'MECH Dept.',
    description: 'Fun mechanical event with car race, quiz & hunt.',
    rules: [
      'Bring cardboard car for Round 1',
      'Dimensions shared after registration',
      'Creative thinking required'
    ],
    rounds: [
      { title: 'Balloon Car Race', desc: 'Race with self-made cars' },
      { title: 'Rapid Fire Quiz', desc: 'Automobile quiz' },
      { title: 'Treasure Hunt', desc: 'Exploration challenge' }
    ],
    coordinator: {
      name: 'Harshvardhan Chougule',
      phone: '+91 72185 85615'
    },
    video: '/videos/ecocanvas.mp4'
  },

  'mechfit': {
    title: 'CADONOVA',
    time: '10:00 AM',
    date: '07 MARCH',
    location: 'CIVIL Dept.',
    description: 'AutoCAD-based planning & design competition.',
    rules: [
      'Basic AutoCAD knowledge required',
      'Individual participation',
      'Building planning & drawing skills needed'
    ],
    rounds: [
      { title: 'Quiz', desc: 'AutoCAD & planning MCQs' },
      { title: 'Design', desc: 'Planning & drawing on AutoCAD' }
    ],
    coordinator: {
      name: 'Patil Abhishek Ramesh',
      phone: '+91 99234 96620'
    },
    video: '/videos/mechfit.mp4'
  },

  'funomech': {
    title: 'THE SURVEY SPRINT',
    time: '10:00 AM',
    date: '07 MARCH',
    location: 'CIVIL Dept.',
    description: 'Surveying team event with quiz, puzzle & hunt.',
    rules: [
      'Team of 2 members required',
      'Bring tools for puzzle round',
      'Complete within time limits'
    ],
    rounds: [
      { title: 'Survey Quiz', desc: 'Surveying MCQs' },
      { title: 'Instrument Puzzle', desc: 'Reassemble image in 20 mins' },
      { title: 'Treasure Hunt', desc: 'Survey exploration' }
    ],
    coordinator: {
      name: 'Surve Swarup Tanaji',
      phone: '+91 93259 79889'
    },
    video: '/videos/funomech.mp4'
  },

  'cadonova': {
    title: 'CODEX RIFT',
  time: '10:00 AM',
    date: '07 MARCH',
    location: 'MCA Dept.',
    description: 'Campus-based treasure hunt with technical clues.',
    rules: [
      'Team of 2-4 players',
      'All clues campus-based',
      'Time & accuracy determine results'
    ],
    rounds: [
      { title: 'The Signal', desc: 'Initial clue discovery' },
      { title: 'Code Break', desc: 'Decode puzzles' },
      { title: 'The Alliance', desc: 'Team collaboration' },
      { title: 'Unlock the Codex', desc: 'Final treasure' }
    ],
    coordinator: {
      name: 'Shriom Dayal',
      phone: '+91 93712 46736'
    },
    video: '/videos/cadonova.mp4'
  },

  'surveysprint': {
    title: 'REBUILD',
  time: '10:00 AM',
    date: '07 MARCH',
    location: 'MCA Dept.',
    description: 'Hiring simulation with coding, strategy & HR rounds.',
    rules: [
      'Team of 2-4 players',
      'Logic & teamwork evaluated',
      'No misconduct allowed'
    ],
    rounds: [
      { title: 'Aptitude', desc: 'Logical & analytical test' },
      { title: 'Coding', desc: 'Technical problem solving' },
      { title: 'Strategy Pitch', desc: 'Group presentation' },
      { title: 'HR Interview', desc: 'Final evaluation' }
    ],
    coordinator: {
      name: 'Soham Mohite',
      phone: '+91 98235 76948'
    },
    video: '/videos/surveysprint.mp4'
  },

  'codecrusaders': {
    title: 'CODEX RIFT',
    time: '10:00 AM',
    date: '07 MARCH',
    location: 'MCA Lab',
    description: 'Competitive programming challenge for MCA students.',
    rules: [
      'Individual participation',
      'Languages: C/C++, Java, Python',
      'No internet access'
    ],
    rounds: [
      { title: 'Preliminary Round', desc: 'Basic coding problems' },
      { title: 'Final Round', desc: 'Advanced algorithms' }
    ],
     coordinator: {
      name: 'Shriom Dayal',
      phone: '+91 93712 46736'
    },
    additionalCoordinators: [
      { name: 'Soham Mohite', phone: '+91 98235 76948' }
    ],
    video: '/videos/codecrusaders.mp4'
  },

  'dataduel': {
    title: 'REBUILD',
    time: '10:00 AM',
    date: '07 MARCH',
    location: 'MCA Lab',
    description: 'Data analysis and visualization competition.',
    rules: [
      'Team of 2 allowed',
      'Tools provided',
      'Dataset given on spot'
    ],
    rounds: [
      { title: 'Data Cleaning', desc: 'Preprocessing challenge' },
      { title: 'Visualization', desc: 'Create insights' }
    ],
    coordinator: {
      name: 'Priya Sharma',
      phone: '+91 87654 23456'
    },
    video: '/videos/dataduel.mp4'
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
    'mca': 'codecrusaders', // MCA department mapping
    'explore events': 'codekshestra' // Default for general explore
  };

  const normalizeEventTitle = (title) => {
    if (!title) return 'codekshestra';
    
    // Handle React element case
    if (title?.props?.children) {
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
      const mappedEvent = departmentEventMapping[textContent] || textContent;
      return mappedEvent;
    }
    
    // Handle string case (for direct event keys)
    const normalizedTitle = title.toString().toLowerCase().replace(/[^a-z]/g, '');
    const mappedEvent = departmentEventMapping[normalizedTitle] || normalizedTitle;
    return mappedEvent;
  };

  const eventKey = normalizeEventTitle(eventTitle);
  const event = eventDetails[eventKey] || eventDetails.codekshestra;

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
          src={event.video}
          loop
          muted
          autoPlay
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />

        {/* Content Container */}
        <div ref={contentRef} className="relative z-10 p-2 sm:p-3 md:p-4">
          {/* Title Section - Bold */}
          <div className="event-section mb-2 sm:mb-3">
            <h1 className="special-font text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-blue-100 text-center">
              {event.title}
            </h1>
          </div>

          {/* Time, Date and Location Section - Compact */}
          <div className="event-section mb-2 sm:mb-3">
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
              <div className="bg-black/50 backdrop-blur-sm rounded-md p-1.5 sm:p-2 border border-white/10">
                <p className="font-circular-web text-xs text-blue-50/60 uppercase tracking-wider mb-0.5">Time</p>
                <p className="font-circular-web text-xs sm:text-sm text-blue-100 font-bold">{event.time}</p>
              </div>
              <div className="bg-black/50 backdrop-blur-sm rounded-md p-1.5 sm:p-2 border border-white/10">
                <p className="font-circular-web text-xs text-blue-50/60 uppercase tracking-wider mb-0.5">Date</p>
                <p className="font-circular-web text-xs sm:text-sm text-blue-100 font-bold">{event.date}</p>
              </div>
              <div className="bg-black/50 backdrop-blur-sm rounded-md p-1.5 sm:p-2 border border-white/10">
                <p className="font-circular-web text-xs text-blue-50/60 uppercase tracking-wider mb-0.5">Location</p>
                <p className="font-circular-web text-xs sm:text-sm text-blue-100 font-bold">{event.location}</p>
              </div>
            </div>
          </div>

          {/* Short Details Section - Compact */}
          <div className="event-section mb-2 sm:mb-3">
            <div className="bg-blue-900/20 backdrop-blur-sm rounded-md p-2 sm:p-2.5 border border-white/10">
              <h2 className="special-font text-xs sm:text-sm font-black text-blue-100 mb-1">Details</h2>
              <p className="font-circular-web text-xs text-blue-50/90 leading-tight">
                {event.description}
              </p>
            </div>
          </div>

          {/* Rules Section - Compact */}
          <div className="event-section mb-2 sm:mb-3">
            <div className="bg-black/50 backdrop-blur-sm rounded-md p-2 sm:p-2.5 border border-white/10">
              <h2 className="special-font text-xs sm:text-sm font-black text-blue-100 mb-1">Rules</h2>
              <div className="flex flex-col sm:flex-row sm:items-stretch gap-1.5 sm:gap-2">
                {event.rules.map((rule, index) => (
                  <div key={index} className="font-circular-web text-xs text-blue-50/80 flex items-start gap-1.5 bg-black/30 rounded-md p-1.5 sm:p-2 border border-white/5 flex-grow sm:flex-1">
                    <span className="text-yellow-300 mt-0.5 flex-shrink-0 text-xs">•</span>
                    <span className="leading-tight">{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rounds Section - Compact */}
          <div className="event-section mb-2 sm:mb-3">
            <div className="bg-black/50 backdrop-blur-sm rounded-md p-2 sm:p-2.5 border border-white/10">
              <h2 className="special-font text-xs sm:text-sm font-black text-blue-100 mb-1.5">Rounds</h2>
              <div className="flex flex-col sm:flex-row sm:items-stretch gap-1.5 sm:gap-2">
                {event.rounds.map((round, index) => (
                  <div
                    key={index}
                    className="bg-black/30 rounded-md p-1.5 sm:p-2 border border-white/5 hover:border-yellow-300/20 transition-all duration-300 flex-grow sm:flex-1"
                  >
                    <div className="flex items-start gap-1.5">
                      <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 bg-yellow-300/20 rounded-full items-center justify-center flex mt-0.5">
                        <span className="text-yellow-300 font-circular-web text-xs font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-grow">
                        <h3 className="special-font text-xs font-black text-blue-100 mb-0.5">
                          {round.title}
                        </h3>
                        <p className="font-circular-web text-xs text-blue-50/80 leading-tight">
                          {round.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coordinator Section - Compact */}
          <div className="event-section mb-2 sm:mb-3">
            <div className="bg-black/50 backdrop-blur-sm rounded-md p-2 sm:p-2.5 border border-white/10">
              <h2 className="special-font text-xs sm:text-sm font-black text-blue-100 mb-1">Coordinator</h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-blue-50/60 text-xs">Name:</span>
                  <span className="font-circular-web text-xs text-blue-100 font-bold">{event.coordinator.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-blue-50/60 text-xs">Phone:</span>
                  <span className="font-circular-web text-xs text-blue-100 font-bold">{event.coordinator.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button - Compact */}
          <div className="event-section flex justify-center pt-1">
            <Button
              id="register-event"
              title="Register Now"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1.5 text-xs px-3 sm:px-4 py-1.5 sm:py-2"
              onClick={() => window.open("https://forms.gle/YYhCjenFBC6xpquMA", "_blank")}
            />
          </div>
        </div>

        {/* Close Button - Compact */}
        <button
          onClick={handleClose}
          className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-20 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
        >
          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
