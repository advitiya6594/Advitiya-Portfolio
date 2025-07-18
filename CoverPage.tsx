import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import emailjs from '@emailjs/browser';

type PageType = 'cover' | 'featured' | 'projects' | 'skills' | 'contact';

const CoverPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('cover');
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  
  // Refs for GSAP animations
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundWordsRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const heroNameRef = useRef<HTMLHeadingElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Background words for horizontal scrolling
  const backgroundWords = [
    'EXPRESSION', 'CREATIVE', 'DIGITAL', 'SOFTWARE', 
    'CODE', 'COUTURE', 'ENGINEER'
  ];

  // Cinematic opening animation
  useEffect(() => {
    if (isLoading && loadingRef.current && heroImageRef.current && heroNameRef.current) {
      const tl = gsap.timeline();
      
      // Set initial states
      gsap.set([heroImageRef.current, heroNameRef.current], { 
        autoAlpha: 0, 
        scale: 0.8 
      });
      
      // Animate in the hero elements
      tl.to(heroImageRef.current, {
        duration: 1.5,
        autoAlpha: 1,
        scale: 1,
        ease: "power2.out"
      })
      .to(heroNameRef.current, {
        duration: 1.2,
        autoAlpha: 1,
        scale: 1,
        ease: "power2.out"
      }, "-=0.8")
      .to({}, { 
        duration: 1.5 
      }) // Hold for a moment
      .call(() => {
        setShowContent(true);
        setTimeout(() => setIsLoading(false), 500);
      });
    }
  }, [isLoading]);

  // Reveal main content after loading
  useEffect(() => {
    if (showContent && mainContentRef.current) {
      const tl = gsap.timeline();
      
      gsap.set(mainContentRef.current, { autoAlpha: 0 });
      
      tl.to(loadingRef.current, {
        duration: 1,
        autoAlpha: 0,
        ease: "power2.inOut"
      })
      .to(mainContentRef.current, {
        duration: 1.2,
        autoAlpha: 1,
        ease: "power2.out"
      }, "-=0.5");
    }
  }, [showContent]);

  // Background scrolling animation (only after loading)
  useEffect(() => {
    if (!isLoading && backgroundWordsRef.current) {
      const container = backgroundWordsRef.current;
      
      // Create scrolling words
      backgroundWords.forEach((word, index) => {
        const wordElement = document.createElement('div');
        wordElement.textContent = word;
        wordElement.className = 'absolute text-6xl font-bold text-gray-300 opacity-30 whitespace-nowrap pointer-events-none select-none';
        wordElement.style.fontFamily = "'League Spartan', sans-serif";
        wordElement.style.top = `${index * 80}px`;
        wordElement.style.left = '-200px';
        
        container.appendChild(wordElement);

        // Create continuous left-to-right scrolling animation with staggered delay
        gsap.to(wordElement, {
          duration: 20,
          x: window.innerWidth + 400,
          repeat: -1,
          ease: "none",
          delay: (index * 3) + 2 // Add delay after loading
        });
      });
    }
  }, [isLoading]);

  // Simple page navigation without complex animations
  const navigateToPage = (page: PageType) => {
    if (page === currentPage) return;
    setCurrentPage(page);
  };

  // Cover Page Content
  const CoverContent = () => (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central Image Card */}
      <div className="relative z-10">
        <img
          src="/coverpage.jpg"
          alt="Advitiya Sharma Portrait"
          className="w-96 h-[500px] object-cover rounded-2xl shadow-2xl"
          style={{ 
            filter: 'contrast(1.1) saturate(1.05)',
            border: '3px solid rgba(0,0,0,0.1)'
          }}
        />
      </div>

      {/* Left Side Editorial Badges */}
      <div className="absolute left-12 top-1/2 transform -translate-y-1/2 z-20">
        <div 
          className="bg-white bg-opacity-90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-200"
          style={{ transform: 'rotate(-2deg)' }}
        >
          <div className="space-y-3">
            {[
              { text: 'Web Wizard', color: '#C3B1E1' },
              { text: 'Version Vault Keeper', color: '#A6B8C2' },
              { text: 'Code Poet', color: '#C17C57' }
            ].map((badge, index) => (
              <div
                key={badge.text}
                className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide text-center shadow-md"
                style={{ 
                  backgroundColor: badge.color,
                  color: badge.text === 'Code Poet' ? 'white' : '#1f2937',
                  fontFamily: "'Space Grotesk', monospace"
                }}
              >
                {badge.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side Navigation Buttons */}
      <div className="absolute right-12 top-1/2 transform -translate-y-1/2 space-y-6 z-20">
        {[
          { id: 'featured', title: 'FEATURED', subtitle: 'The Statement Piece', color: '#4A506B', page: 'featured' as PageType },
          { id: 'projects', title: 'PROJECTS', subtitle: 'Creative Works', color: '#B1A596', page: 'projects' as PageType },
          { id: 'skills', title: 'SKILLS', subtitle: 'Tech Stack', color: '#8A9B82', page: 'skills' as PageType },
          { id: 'contact', title: 'CONTACT', subtitle: 'Let\'s Connect', color: '#C17C57', page: 'contact' as PageType }
        ].map((button) => (
          <button
            key={button.id}
            onClick={() => navigateToPage(button.page)}
            className="block text-white px-8 py-6 rounded-xl shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer"
            style={{ 
              background: `linear-gradient(135deg, ${button.color}f0, ${button.color}dd)`,
              fontFamily: "'League Spartan', sans-serif"
            }}
          >
            <div className="text-sm font-bold uppercase tracking-wider mb-1">
              {button.title}
            </div>
            <div className="text-xs opacity-90 font-light tracking-wide">
              {button.subtitle}
            </div>
          </button>
        ))}
      </div>

      {/* Bottom Cards */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <div className="grid grid-cols-2 gap-8">
          {[
            { title: 'Education', subtitle: 'University of Waterloo', detail: 'Canada' },
            { title: 'Experience', subtitle: 'Computer Engineering', detail: 'Co-op Program' }
          ].map((card) => (
            <div
              key={card.title}
              className="bg-black bg-opacity-80 text-white p-6 rounded-xl shadow-xl backdrop-blur-sm border border-white border-opacity-10"
              style={{ fontFamily: "'League Spartan', sans-serif" }}
            >
              <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">{card.title}</h3>
              <p className="text-base opacity-90 mb-1">{card.subtitle}</p>
              <p className="text-sm opacity-75 tracking-wide">{card.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Featured Page Content
  const FeaturedContent = () => (
    <div className="min-h-screen bg-white relative">
      {/* Back Button */}
      <button 
        onClick={() => {
          console.log('Navigating back to cover from featured');
          navigateToPage('cover');
        }}
        className="absolute top-4 left-12 text-gray-700 hover:text-gray-900 text-lg font-medium px-6 py-3 rounded-lg bg-white bg-opacity-80 shadow-lg transition-all duration-200 hover:bg-opacity-100 cursor-pointer z-40"
        style={{ fontFamily: "'Space Grotesk', monospace" }}
      >
        ← Back to Cover
      </button>

      {/* Magazine Header */}
      <div className="pt-16 px-12 pb-16">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 
              className="text-3xl font-bold text-gray-800 mb-1"
              style={{ fontFamily: "'League Spartan', sans-serif" }}
            >
              ADVITIYA SHARMA
            </h1>
            <p 
              className="text-sm text-gray-600 uppercase tracking-widest"
              style={{ fontFamily: "'Space Grotesk', monospace" }}
            >
              PORTFOLIO
            </p>
          </div>
          <div className="text-right">
            <p 
              className="text-sm text-gray-600 uppercase tracking-wide mb-1"
              style={{ fontFamily: "'Space Grotesk', monospace" }}
            >
              Issue #01
            </p>
            <p 
              className="text-sm text-gray-600 uppercase tracking-wide"
              style={{ fontFamily: "'Space Grotesk', monospace" }}
            >
              2025 EDITION
            </p>
          </div>
        </div>

        {/* Center Headline */}
        <div className="text-center mb-16">
          <p 
            className="text-sm text-gray-500 uppercase tracking-widest mb-4"
            style={{ fontFamily: "'Space Grotesk', monospace" }}
          >
            FEATURED PROFILE
          </p>
          <h2 
            className="text-5xl font-light text-gray-800 mb-2"
            style={{ fontFamily: "'League Spartan', sans-serif" }}
          >
            About Me —
          </h2>
          <h3 
            className="text-4xl font-light text-gray-700 italic mb-6"
            style={{ fontFamily: "'League Spartan', sans-serif" }}
          >
            "Meet the Developer"
          </h3>
          <div className="w-24 h-px bg-gray-400 mx-auto mb-6"></div>
          <p 
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Space Grotesk', monospace" }}
          >
            Where engineering meets elegance: A Computer Engineering student crafting digital experiences with mindful precision
          </p>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            {/* Left - Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <img
                  src="/Featuredpage.jpg"
                  alt="Advitiya Sharma"
                  className="w-full h-auto object-cover rounded-lg shadow-xl transition-all duration-500 filter grayscale hover:grayscale-0"
                  style={{ aspectRatio: '3/4' }}
                />
              </div>
            </div>

            {/* Right - Article Content */}
            <div className="space-y-6">
              <div className="mb-8">
                <p 
                  className="text-sm text-gray-500 uppercase tracking-widest mb-1"
                  style={{ fontFamily: "'Space Grotesk', monospace" }}
                >
                  BY EDITORIAL TEAM
                </p>
                <p 
                  className="text-sm text-gray-500"
                  style={{ fontFamily: "'Space Grotesk', monospace" }}
                >
                  January 17, 2025
                </p>
              </div>

              <div 
                className="prose prose-lg text-gray-700 leading-relaxed space-y-6"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              >
                <p className="text-lg leading-relaxed">
                  <span className="text-6xl float-left mr-2 mt-1 leading-none font-serif text-gray-800">A</span>
                  dvitiya Sharma is not your typical software developer. A Computer Engineering student at the University of Waterloo, she's equally at home debugging a Node.js app as she is styling an editorial mockup or striking a perfect pose in a yoga asana.
                </p>

                <p className="leading-relaxed">
                  With a mind wired for logic and a heart tuned to aesthetic harmony, Advitiya blends fashion and tech into a seamless personal brand — one line of code and one curated design at a time.
                </p>

                <p className="leading-relaxed">
                  When she's not building full-stack applications or refining her React components, you might find her on the mat — channeling discipline, balance, and flow into everything she creates. Her portfolio, much like her personality, is a celebration of contrast: soft yet sharp, technical yet expressive, structured yet soulful.
                </p>

                <blockquote className="border-l-4 border-gray-300 pl-6 my-8 italic text-xl text-gray-600">
                  "For Advitiya, engineering isn't just about what works — it's about what feels right."
                </blockquote>

                <p className="leading-relaxed">
                  Welcome to her world, where code meets couture. This unique intersection of technical precision and creative vision defines not just her approach to software development, but her entire philosophy toward problem-solving and innovation.
                </p>

                <p className="leading-relaxed">
                  Whether she's architecting a complex backend system or perfecting the user experience of a frontend interface, Advitiya brings the same mindful attention to detail that characterizes her yoga practice — present, purposeful, and perfectly balanced.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Expertise */}
          <div className="mb-16">
            <h4 
              className="text-sm text-gray-500 uppercase tracking-widest mb-8"
              style={{ fontFamily: "'Space Grotesk', monospace" }}
            >
              TECHNICAL EXPERTISE
            </h4>
            <div className="grid grid-cols-2 gap-x-16 gap-y-4 max-w-2xl">
              <div 
                className="text-gray-700"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              >
                Full-Stack Development
              </div>
              <div 
                className="text-gray-700"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              >
                JavaScript & TypeScript
              </div>
              <div 
                className="text-gray-700"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              >
                React & Node.js
              </div>
              <div 
                className="text-gray-700"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              >
                Database Design
              </div>
              <div 
                className="text-gray-700"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              >
                UI/UX Design
              </div>
              <div 
                className="text-gray-700"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              >
                Responsive Design
              </div>
            </div>
          </div>

          {/* Connect Section */}
          <div className="border-t border-gray-200 pt-8">
            <h4 
              className="text-sm text-gray-500 uppercase tracking-widest mb-6"
              style={{ fontFamily: "'Space Grotesk', monospace" }}
            >
              CONNECT
            </h4>
            <div className="space-y-2">
              <p 
                className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              >
                advitiya6594@gmail.com
              </p>
              <p 
                className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              >
                LinkedIn: /in/advitiya-sharma-25346b277/
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Projects Page Content
  const ProjectsContent = () => (
    <div className="flex items-center justify-center h-full">
      <button 
        onClick={() => {
          console.log('Navigating back to cover from projects');
          navigateToPage('cover');
        }}
        className="absolute top-4 left-12 text-gray-700 hover:text-gray-900 text-lg font-medium px-6 py-3 rounded-lg bg-white bg-opacity-80 shadow-lg transition-all duration-200 hover:bg-opacity-100 cursor-pointer z-40"
        style={{ fontFamily: "'Space Grotesk', monospace" }}
      >
        ← Back to Cover
      </button>
      <div className="text-center">
        <h2 
          className="text-6xl md:text-8xl font-bold mb-8 text-gray-800 tracking-tight"
          style={{ fontFamily: "'League Spartan', sans-serif" }}
        >
          PROJECTS
        </h2>
        <p 
          className="text-xl text-gray-600 uppercase tracking-widest"
          style={{ fontFamily: "'Space Grotesk', monospace" }}
        >
          Creative Works - Coming Soon
        </p>
      </div>
    </div>
  );

  // Skills Page Content
  const SkillsContent = () => {
    const techStack = [
      { category: 'FRONTEND', name: 'React', tagline: 'The UI Virtuoso – Crafting digital experiences with component couture', color: 'bg-blue-100' },
      { category: 'LANGUAGE', name: 'TypeScript', tagline: 'Code Poet – Writing elegant verses in strongly-typed syntax', color: 'bg-purple-100' },
      { category: 'RUNTIME', name: 'Node.js', tagline: 'Backend Beat Maker – Orchestrating server-side symphonies', color: 'bg-green-100' },
      { category: 'LANGUAGE', name: 'Python', tagline: 'Data Whisperer – Transforming raw information into pure insight', color: 'bg-yellow-100' },
      { category: 'TOOL', name: 'Git', tagline: 'Version Virtuoso – Choreographing code changes with precision', color: 'bg-orange-100' },
      { category: 'DATABASE', name: 'PostgreSQL', tagline: 'Data Architect – Building relational masterpieces in structured harmony', color: 'bg-blue-200' },
      { category: 'DEVOPS', name: 'Docker', tagline: 'Container Couturier – Packaging applications in portable perfection', color: 'bg-cyan-100' },
      { category: 'CLOUD', name: 'AWS', tagline: 'Cloud Curator – Orchestrating scalable solutions in the digital stratosphere', color: 'bg-purple-200' },
      { category: 'FRAMEWORK', name: 'Next.js', tagline: 'Framework Fashionista – Dressing React in full-stack elegance', color: 'bg-gray-100' },
      { category: 'STYLING', name: 'Tailwind CSS', tagline: 'Style Savant – Painting interfaces with utility-class artistry', color: 'bg-teal-100' },
      { category: 'API', name: 'GraphQL', tagline: 'API Aesthete – Sculpting data queries with minimalist precision', color: 'bg-pink-100' },
      { category: 'CACHE', name: 'Redis', tagline: 'Memory Maven – Caching brilliance at the speed of thought', color: 'bg-red-100' }
    ];

    return (
      <div className="min-h-screen bg-white relative overflow-y-auto">
        {/* Back Button */}
        <button 
          onClick={() => {
            console.log('Navigating back to cover from skills');
            navigateToPage('cover');
          }}
          className="absolute top-4 left-12 text-gray-700 hover:text-gray-900 text-lg font-medium px-6 py-3 rounded-lg bg-white bg-opacity-80 shadow-lg transition-all duration-200 hover:bg-opacity-100 cursor-pointer z-40"
          style={{ fontFamily: "'Space Grotesk', monospace" }}
        >
          ← Back to Cover
        </button>

        {/* Magazine Header */}
        <div className="pt-16 px-12 pb-16">
          {/* Top Header */}
          <div className="text-center mb-16">
            <p 
              className="text-sm text-gray-500 uppercase tracking-widest mb-4"
              style={{ fontFamily: "'Space Grotesk', monospace" }}
            >
              ISSUE 01 • WINTER 2025
            </p>
            <h1 
              className="text-6xl font-bold text-gray-800 mb-6 tracking-tight"
              style={{ fontFamily: "'League Spartan', sans-serif" }}
            >
              DEVELOPER
            </h1>
            <h2 
              className="text-6xl font-light text-gray-700 mb-8 tracking-wide"
              style={{ fontFamily: "'League Spartan', sans-serif" }}
            >
              QUARTERLY
            </h2>
            <p 
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed italic"
              style={{ fontFamily: "'Space Grotesk', monospace" }}
            >
              An intimate look into the tools and technologies that shape modern digital craftsmanship
            </p>
          </div>

          {/* Featured Tools Section */}
          <div className="max-w-7xl mx-auto mb-20">
            <div className="text-center mb-12">
              <p 
                className="text-sm text-gray-500 uppercase tracking-widest mb-4"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              >
                TOOLS & TECH
              </p>
              <h3 
                className="text-4xl font-bold text-gray-800 mb-4"
                style={{ fontFamily: "'League Spartan', sans-serif" }}
              >
                FEATURED TOOLS: WHAT'S IN MY DEV BAG?
              </h3>
              <p 
                className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              >
                The essential technologies that form the backbone of modern development workflows
              </p>
              <div className="w-24 h-px bg-gray-400 mx-auto mt-8"></div>
            </div>

            {/* Tech Stack Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className={`${tech.color} p-6 rounded-xl shadow-sm hover:scale-105 transition-all duration-300 hover:shadow-lg cursor-pointer`}
                >
                  <p 
                    className="text-xs text-gray-600 uppercase tracking-widest mb-3 font-bold"
                    style={{ fontFamily: "'Space Grotesk', monospace" }}
                  >
                    {tech.category}
                  </p>
                  <h4 
                    className="text-2xl font-bold text-gray-800 mb-3"
                    style={{ fontFamily: "'League Spartan', sans-serif" }}
                  >
                    {tech.name}
                  </h4>
                  <p 
                    className="text-sm text-gray-700 leading-relaxed italic"
                    style={{ fontFamily: "'Space Grotesk', monospace" }}
                  >
                    {tech.tagline}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Deep Dive Section */}
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p 
                className="text-sm text-gray-500 uppercase tracking-widest mb-4"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              >
                DEEP DIVE
              </p>
              <h3 
                className="text-4xl font-bold text-gray-800 mb-4"
                style={{ fontFamily: "'League Spartan', sans-serif" }}
              >
                THE STACK EDIT
              </h3>
              <p 
                className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed italic"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              >
                How each technology plays its part in the greater symphony of software development
              </p>
              <div className="w-24 h-px bg-gray-400 mx-auto mt-8"></div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
              {/* Frontend Essentials */}
              <div>
                <h4 
                  className="text-2xl font-bold text-gray-800 mb-6"
                  style={{ fontFamily: "'League Spartan', sans-serif" }}
                >
                  Frontend Essentials
                </h4>
                <div 
                  className="space-y-6 text-gray-700 leading-relaxed"
                  style={{ fontFamily: "'Space Grotesk', monospace" }}
                >
                  <p>
                    The frontend stack represents the public face of any application. React serves as our foundation, providing the component-based architecture that makes complex UIs manageable. TypeScript adds the safety net of static typing, while Tailwind CSS ensures our styling remains both maintainable and performant.
                  </p>
                  <blockquote className="border-l-4 border-gray-300 pl-6 italic text-gray-600">
                    "Great frontend development is like fashion design – it's about creating something beautiful that also serves a practical purpose."
                  </blockquote>
                </div>
              </div>

              {/* Backend Architecture */}
              <div>
                <h4 
                  className="text-2xl font-bold text-gray-800 mb-6"
                  style={{ fontFamily: "'League Spartan', sans-serif" }}
                >
                  Backend Architecture
                </h4>
                <div 
                  className="space-y-6 text-gray-700 leading-relaxed"
                  style={{ fontFamily: "'Space Grotesk', monospace" }}
                >
                  <p>
                    On the server side, Node.js provides the runtime that unifies our development experience, while PostgreSQL offers the reliability and features needed for complex data relationships. Docker ensures our applications run consistently across environments, and AWS provides the scalable infrastructure to support growth.
                  </p>
                  <blockquote className="border-l-4 border-gray-300 pl-6 italic text-gray-600">
                    "Backend development is the art of creating invisible excellence – when done right, nobody notices it's there."
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center border-t border-gray-200 pt-8">
              <p 
                className="text-sm text-gray-500 uppercase tracking-widest mb-2"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              >
                DEVELOPER QUARTERLY • ISSUE 01 • WINTER 2025
              </p>
              <p 
                className="text-sm text-gray-600 italic"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              >
                Celebrating the art and science of software development through thoughtful technology curation
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Contact Page Content
  const ContactContent = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      // EmailJS configuration - replace with your actual IDs
      const serviceID = 'service_irsfsmj';
      const templateID = 'template_ub4xw6t';
      const publicKey = 'ENrU-Me_USKAg1HWe';
      
      // Send email using EmailJS
      emailjs.sendForm(serviceID, templateID, e.currentTarget, publicKey)
        .then((result) => {
          console.log('Email sent successfully:', result.text);
          alert("Thank you for your message! I'll get back to you soon.");
          
          // Reset form
          setFormData({
            name: '',
            email: '',
            message: ''
          });
        })
        .catch((error) => {
          console.error('Failed to send email:', error);
          alert("Failed to send message. Please try again or contact me directly.");
        });
    };

    return (
      <div className="min-h-screen relative" style={{ backgroundColor: '#FDF8F4' }}>
        {/* Back Button */}
        <button 
          onClick={() => {
            console.log('Navigating back to cover from contact');
            navigateToPage('cover');
          }}
          className="absolute top-4 left-12 text-gray-700 hover:text-gray-900 text-lg font-medium px-6 py-3 rounded-lg bg-white bg-opacity-80 shadow-lg transition-all duration-200 hover:bg-opacity-100 cursor-pointer z-40"
          style={{ fontFamily: "'Space Grotesk', monospace" }}
        >
          ← Back to Cover
        </button>

        {/* Main Contact Content */}
        <div className="flex items-center justify-center min-h-screen px-12 py-20">
          <div className="max-w-2xl w-full text-center">
            
            {/* Header */}
            <h1 
              className="text-5xl font-light mb-8 tracking-wide"
              style={{ 
                fontFamily: "'League Spartan', sans-serif",
                color: '#404060'
              }}
            >
              Let's Create Together
            </h1>
            
            {/* Divider */}
            <div className="w-24 h-px bg-gray-400 mx-auto mb-12"></div>
            
            {/* Subtitle */}
            <p 
              className="text-lg leading-relaxed mb-16 max-w-xl mx-auto"
              style={{ 
                fontFamily: "'Space Grotesk', monospace",
                color: '#666'
              }}
            >
              I love conversations that spark ideas. Whether you're a fellow creative, a curious coder, or a collaborator in the making — feel free to reach out. Let's build something beautiful together.
            </p>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-8 mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name Field */}
                <div className="text-left">
                  <label 
                    className="block text-sm font-medium mb-3"
                    style={{ 
                      fontFamily: "'Space Grotesk', monospace",
                      color: '#404060'
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none transition-colors"
                    style={{ 
                      fontFamily: "'Space Grotesk', monospace",
                      color: '#404060'
                    }}
                  />
                </div>

                {/* Email Field */}
                <div className="text-left">
                  <label 
                    className="block text-sm font-medium mb-3"
                    style={{ 
                      fontFamily: "'Space Grotesk', monospace",
                      color: '#404060'
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none transition-colors"
                    style={{ 
                      fontFamily: "'Space Grotesk', monospace",
                      color: '#404060'
                    }}
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="text-left">
                <label 
                  className="block text-sm font-medium mb-3"
                  style={{ 
                    fontFamily: "'Space Grotesk', monospace",
                    color: '#404060'
                  }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Share your thoughts, ideas, or just say hello..."
                  required
                  rows={5}
                  className="w-full px-4 py-4 bg-white bg-opacity-50 border border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none transition-colors resize-none"
                  style={{ 
                    fontFamily: "'Space Grotesk', monospace",
                    color: '#404060'
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ 
                  backgroundColor: '#404060',
                  fontFamily: "'Space Grotesk', monospace"
                }}
              >
                Send Message
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex justify-center space-x-6 mb-12">
              {/* GitHub */}
              <a
                href="https://github.com/advitiya6594"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white bg-opacity-60 rounded-full flex items-center justify-center hover:bg-opacity-80 transition-all duration-300 hover:scale-110"
              >
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/advitiya-sharma-25346b277/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white bg-opacity-60 rounded-full flex items-center justify-center hover:bg-opacity-80 transition-all duration-300 hover:scale-110"
              >
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* Email */}
              <a
                href="mailto:advitiya6594@gmail.com"
                className="w-12 h-12 bg-white bg-opacity-60 rounded-full flex items-center justify-center hover:bg-opacity-80 transition-all duration-300 hover:scale-110"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>

            {/* Footer */}
            <div className="text-center">
              <div className="w-24 h-px bg-gray-400 mx-auto mb-6"></div>
              <p 
                className="text-lg italic mb-2"
                style={{ 
                  fontFamily: "'League Spartan', sans-serif",
                  color: '#B8860B'
                }}
              >
                With code & couture,
              </p>
              <p 
                className="text-2xl font-light"
                style={{ 
                  fontFamily: "'League Spartan', sans-serif",
                  color: '#B8860B'
                }}
              >
                Advitiya
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full relative overflow-hidden bg-white"
      style={{ 
        fontFamily: "'League Spartan', sans-serif"
      }}
    >
      {/* Loading Screen */}
      {isLoading && (
        <div 
          ref={loadingRef}
          className="fixed inset-0 bg-white z-50 flex items-center justify-center"
        >
          <div className="text-center">
            {/* Hero Image */}
            <div className="mb-8">
              <img
                ref={heroImageRef}
                src="/coverpage.jpg"
                alt="Advitiya Sharma"
                className="w-64 h-80 object-cover rounded-2xl shadow-2xl mx-auto"
                style={{ 
                  filter: 'contrast(1.1) saturate(1.05)',
                  border: '3px solid rgba(0,0,0,0.1)'
                }}
              />
            </div>
            
            {/* Hero Name */}
            <h1 
              ref={heroNameRef}
              className="text-6xl font-bold text-black tracking-tight"
              style={{ fontFamily: "'League Spartan', sans-serif" }}
            >
              ADVITIYA SHARMA
            </h1>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div 
        ref={mainContentRef}
        className="min-h-screen w-full relative"
        style={{ opacity: showContent ? 1 : 0 }}
      >
        {/* Clean Horizontal Scrolling Background */}
        <div 
          ref={backgroundWordsRef} 
          className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-30 p-12">
        <div className="flex justify-end items-start mb-8">
          <div 
            className="bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-widest shadow-xl"
            style={{ fontFamily: "'Space Grotesk', monospace" }}
          >
            PORTFOLIO
          </div>
        </div>
        
        {/* Name and Subtitle - Only on Cover Page */}
        {currentPage === 'cover' && (
          <div className="text-center">
            <h1 
              className="text-6xl font-bold text-black tracking-tight mb-4"
              style={{ fontFamily: "'League Spartan', sans-serif" }}
            >
              ADVITIYA SHARMA
            </h1>
            <p 
              className="text-lg uppercase tracking-widest text-gray-800 font-medium"
              style={{ 
                fontFamily: "'Space Grotesk', monospace",
                letterSpacing: '0.3em'
              }}
            >
              CODE COUTURE – DIGITAL PORTFOLIO
            </p>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className={`w-full relative ${currentPage === 'cover' ? 'h-screen pt-48' : 'min-h-screen'}`}>
        {currentPage === 'cover' && <CoverContent />}
        {currentPage === 'featured' && <FeaturedContent />}
        {currentPage === 'projects' && <ProjectsContent />}
        {currentPage === 'skills' && <SkillsContent />}
        {currentPage === 'contact' && <ContactContent />}
      </div>

      {/* Footer - Only show on cover page */}
      {currentPage === 'cover' && (
        <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-4" />
        
        <div className="flex justify-between items-center px-12 pb-6 text-gray-700">
          <div 
            className="flex space-x-8 text-sm"
            style={{ fontFamily: "'Space Grotesk', monospace" }}
          >
            <span className="uppercase tracking-wide font-medium cursor-pointer hover:text-gray-900 transition-colors">
              Portfolio 2025
            </span>
            <span className="text-gray-400">|</span>
            <span className="cursor-pointer hover:text-gray-900 transition-colors">
              advitiya6594@gmail.com
            </span>
            <span className="text-gray-400">|</span>
            <a 
              href="https://www.linkedin.com/in/advitiya-sharma-25346b277/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-gray-900 transition-colors"
            >
              Connect with me
            </a>
          </div>
          
          {/* QR Code */}
          <div className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform">
            <div className="flex items-end space-x-1">
              {[3, 8, 2, 6, 4, 7, 1, 5, 3, 8, 2, 6].map((height, index) => (
                <div 
                  key={index} 
                  className="bg-gray-800 transition-all duration-200 hover:bg-black"
                  style={{ 
                    width: '2px', 
                    height: `${height * 3}px`,
                    opacity: 0.8
                  }}
                />
              ))}
            </div>
            <span 
              className="text-xs text-gray-600 ml-2"
              style={{ fontFamily: "'Space Grotesk', monospace" }}
            >
              ADV-2025
            </span>
          </div>
        </div>
      </div>
      )}
      </div>
    </div>
  );
};

export default CoverPage; 