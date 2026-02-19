"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = [
        "home",
        "about",
        "experience",
        "projects",
        "skills",
        "education",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const experiences = [
    {
      title: "Frontend Developer",
      company: "Indian Educational Services (IES)",
      location: "Bangalore",
      period: "August 2025 – Present",
      achievements: [
        "Led end-to-end frontend development and UX for AdmitNation using Next.js, React, and TypeScript",
        "Built Ticketing System, CMS, and full AdmitNation CRM from scratch",
        "Designed full ticketing workflows improving productivity by ~80%",
        "Architected scalable Institution CMS powering the CRM ecosystem",
        "Implemented SEO-optimized Next.js apps using SSR, ISR, server components, and API routes",
      ],
    },
    {
      title: "Frontend Developer",
      company: "ViEntityData Pvt Ltd",
      location: "Bangalore",
      period: "October 2024 – July 2025",
      achievements: [
        "Developed cross-platform web and mobile apps using React.js, Redux, React Native, Next.js, and TypeScript",
        "Built reusable UI components reducing duplication across projects",
        "Integrated REST APIs reducing load time by 20%",
        "Migrated production server from Azure to DigitalOcean cutting hosting cost by ~30%",
      ],
    },
    {
      title: "Frontend Developer",
      company: "HRLytics",
      location: "Bengaluru",
      period: "December 2022 – September 2024",
      achievements: [
        "Led frontend development of HRlytics platform using React",
        "Built proctoring feature with camera and screen monitoring increasing adoption by 20%",
        "Optimized performance using Redux and Context API reducing load times by ~30%",
        "Implemented code splitting using React.lazy and Suspense",
      ],
    },
  ];

  const projects = [
    {
      title: "AdmitNation CRM Ecosystem",
      description:
        "Comprehensive CRM solution with ticketing system, institution CMS, lead management, counsellor workflows, and analytics dashboard",
      tech: ["Next.js", "TypeScript", "React", "SSR", "ISR"],
      impact: "80% productivity improvement",
    },
    {
      title: "E-Commerce Platform",
      description:
        "Scalable React-based platform with shopping cart, checkout system, and payment integration",
      tech: ["React.js", "Redux", "REST API", "Material UI"],
      impact: "30% increase in user engagement",
    },
    {
      title: "User Data Management System",
      description:
        "Streamlined data operations system with advanced filtering and real-time updates",
      tech: ["React", "Semantic UI", "Redux"],
      impact: "20% efficiency improvement",
    },
    {
      title: "Movie Search Application",
      description:
        "Real-time movie search with favorites module and detailed information display",
      tech: ["React", "OMDB API", "Axios"],
      impact: "Seamless API integration",
    },
  ];

  const skills = {
    Frontend: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "React.js",
      "React Native",
      "Redux",
      "Next.js",
      "TypeScript",
    ],
    "APIs & Integration": [
      "REST APIs",
      "Axios",
      "Fetch API",
      "API Optimization",
    ],
    "Tools & Frameworks": [
      "Git",
      "Webpack",
      "Jest",
      "Bootstrap",
      "Material UI",
      "Semantic UI",
      "Tailwind CSS",
      "Figma",
    ],
    Methodologies: [
      "Agile",
      "Scrum",
      "Responsive Design",
      "Performance Optimization",
      "Code Review",
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Kavi
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {[
                "Home",
                "About",
                "Experience",
                "Projects",
                "Skills",
                "Contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`cursor-pointer transition-colors duration-300 ${
                    activeSection === item.toLowerCase()
                      ? "text-cyan-400"
                      : "text-gray-300 hover:text-cyan-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[
                "Home",
                "About",
                "Experience",
                "Projects",
                "Skills",
                "Contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-cyan-400 hover:bg-slate-800 rounded-md transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

        <div className="text-center z-10 max-w-4xl mx-auto">
          {/* <div className="mb-6 animate-pulse">
            <Code size={64} className="mx-auto text-cyan-400" />
          </div> */}

          <div className="mt-24 mb-6 flex justify-center">
            <Image
              src="/profile.jpeg"
              alt="My Profile"
              width={120}
              height={120}
              className="rounded-full border-4 border-cyan-400 shadow-lg"
              priority
            />
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">
            KAVIARASU N
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl text-gray-300 mb-8 animate-fade-in-delay">
            Front-End Software Developer
          </p>
          <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto animate-fade-in-delay-2">
            Crafting exceptional digital experiences with React, Next.js, and
            TypeScript
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-delay-3">
            <a
              href="mailto:beme17041@gmail.com"
              className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full transition-all transform hover:scale-105"
            >
              <Mail size={20} />
              <span>Email Me</span>
            </a>
            <a
              href="tel:+919360896961"
              className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full transition-all transform hover:scale-105"
            >
              <Phone size={20} />
              <span>Call Me</span>
            </a>
          </div>
          <div className="flex justify-center gap-6 mt-8 animate-fade-in-delay-4">
            <a
              href="https://linkedin.com/in/kaviarasu-n-856b07243"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-110"
            >
              <Linkedin size={28} />
            </a>
            <a
              href="https://github.com/k16022000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-110"
            >
              <Github size={28} />
            </a>
          </div>
          <div className="mt-16 animate-bounce">
            <ChevronDown
              size={32}
              className="mx-auto text-cyan-400 cursor-pointer"
              onClick={() => scrollToSection("about")}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      {/* <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-purple-500/20 shadow-2xl">
            <p className="text-lg text-gray-300 leading-relaxed">
              Results-driven Frontend & Mobile Developer with{" "}
              <span className="text-cyan-400 font-semibold">
                3+ years of experience
              </span>{" "}
              building responsive web and mobile applications using React.js,
              React Native, JavaScript (ES6+), Next.js, and TypeScript. Proven
              expertise in API integration, performance optimization, and
              delivering scalable front-end solutions. Adept at converting
              design prototypes into pixel-perfect UIs and implementing state
              management solutions that improve application performance by up to{" "}
              <span className="text-purple-400 font-semibold">35%</span>.
            </p>
          </div>
        </div>
      </section> */}

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-purple-500/20 shadow-2xl">
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                With over{" "}
                <span className="text-cyan-400 font-semibold">
                  3+ years of professional experience
                </span>{" "}
                in frontend development, I specialize in building
                high-performance, user-centric web and mobile applications. My
                journey in software development has been driven by a passion for
                creating seamless digital experiences that blend beautiful
                design with robust functionality.
              </p>

              <p>
                Throughout my career, I've had the privilege of working with
                leading companies like{" "}
                <span className="text-purple-400 font-semibold">
                  Indian Educational Services (IES)
                </span>
                , where I currently lead frontend development for AdmitNation,
                and{" "}
                <span className="text-purple-400 font-semibold">
                  ViEntityData
                </span>
                , where I architected cross-platform solutions. My expertise
                spans the entire modern JavaScript ecosystem, with deep
                proficiency in{" "}
                <span className="text-cyan-400">
                  React.js, Next.js, TypeScript, and React Native
                </span>
                .
              </p>

              <p>
                I take pride in my ability to transform complex requirements
                into elegant solutions. Some of my key achievements include:
              </p>

              <ul className="space-y-3 pl-6">
                <li className="flex gap-3">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>
                    Architected and built a complete CRM ecosystem from scratch,
                    improving team productivity by{" "}
                    <span className="text-cyan-400 font-semibold">80%</span>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>
                    Optimized application performance through advanced state
                    management, reducing load times by{" "}
                    <span className="text-cyan-400 font-semibold">30%</span>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>
                    Successfully migrated production infrastructure, cutting
                    hosting costs by{" "}
                    <span className="text-cyan-400 font-semibold">30%</span>{" "}
                    while improving reliability
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>
                    Developed innovative features like real-time proctoring
                    systems that increased user adoption by{" "}
                    <span className="text-cyan-400 font-semibold">20%</span>
                  </span>
                </li>
              </ul>

              <p>
                What sets me apart is my holistic approach to frontend
                development. I don't just write code—I solve business problems,
                optimize user experiences, and mentor teams. Whether it's
                implementing{" "}
                <span className="text-purple-400">
                  SEO-optimized Next.js applications with SSR and ISR
                </span>
                , building{" "}
                <span className="text-purple-400">
                  reusable component libraries
                </span>
                , or integrating complex APIs, I bring both technical excellence
                and strategic thinking to every project.
              </p>

              <p>
                I'm constantly learning and staying ahead of industry trends,
                embracing new technologies and best practices. My goal is to
                continue pushing the boundaries of what's possible in web
                development while delivering measurable business value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent flex items-center justify-center gap-3">
            <Briefcase className="text-cyan-400" />
            Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-purple-500/20 shadow-xl hover:border-cyan-500/40 transition-all transform hover:scale-102"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-400">
                      {exp.title}
                    </h3>
                    <p className="text-xl text-purple-400">{exp.company}</p>
                    <p className="text-gray-400">{exp.location}</p>
                  </div>
                  <p className="text-gray-400 mt-2 md:mt-0">{exp.period}</p>
                </div>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-300 flex gap-3">
                      <span className="text-cyan-400 mt-1.5">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent flex items-center justify-center gap-3">
            <Code className="text-cyan-400" />
            Key Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20 shadow-xl hover:border-cyan-500/40 transition-all transform hover:scale-105 group"
              >
                <h3 className="text-2xl font-bold text-cyan-400 mb-3 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm border border-purple-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-cyan-400 font-semibold flex items-center gap-2">
                  <ExternalLink size={16} />
                  {project.impact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent flex items-center justify-center gap-3">
            <Award className="text-cyan-400" />
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, items], index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20 shadow-xl"
              >
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 text-gray-300 rounded-full text-sm border border-purple-500/30 hover:border-cyan-500/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent flex items-center justify-center gap-3">
            <GraduationCap className="text-cyan-400" />
            Education & Certifications
          </h2>
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-purple-500/20 shadow-xl">
              <h3 className="text-2xl font-bold text-cyan-400">
                Bachelor of Engineering (B.E.)
              </h3>
              <p className="text-xl text-purple-400">
                Sudharsan College of Engineering
              </p>
              <p className="text-gray-400">2017 – 2021</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-purple-500/20 shadow-xl">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                Certifications
              </h3>
              <ul className="space-y-2">
                <li className="text-gray-300 flex gap-3">
                  <span className="text-cyan-400">•</span>
                  <span>C Programming, HTML & CSS – Ebox Academy (2022)</span>
                </li>
                <li className="text-gray-300 flex gap-3">
                  <span className="text-cyan-400">•</span>
                  <span>
                    React & JavaScript Development – Ebox Academy (2022)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Ready to bring your next project to life? Let's talk!
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="mailto:beme17041@gmail.com"
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              <Mail size={24} />
              <span className="text-lg">beme17041@gmail.com</span>
            </a>
            <a
              href="tel:+919360896961"
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              <Phone size={24} />
              <span className="text-lg">+91 9360896961</span>
            </a>
          </div>
          <div className="flex justify-center gap-8 mt-12">
            <a
              href="https://linkedin.com/in/kaviarasu-n-856b07243"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-125"
            >
              <Linkedin size={40} />
            </a>
            <a
              href="https://github.com/k16022000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-125"
            >
              <Github size={40} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>© {new Date().getFullYear()} Kaviarasu N. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s both;
        }

        .animate-fade-in-delay-3 {
          animation: fade-in 0.8s ease-out 0.6s both;
        }

        .animate-fade-in-delay-4 {
          animation: fade-in 0.8s ease-out 0.8s both;
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}
