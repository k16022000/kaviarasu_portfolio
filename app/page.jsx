"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Circle,
  Moon,
  Sun,
  Terminal,
} from "lucide-react";

/* ========================================================================
   CONTENT
   ======================================================================== */

const NAV_ITEMS = [
  { id: "home", num: "00", label: "hero.tsx" },
  { id: "about", num: "01", label: "about.md" },
  { id: "experience", num: "02", label: "experience.json" },
  { id: "projects", num: "03", label: "projects.tsx" },
  { id: "skills", num: "04", label: "skills.config" },
  { id: "education", num: "05", label: "education.yml" },
  { id: "contact", num: "06", label: "contact.sh" },
];

const ROLE_STRINGS = [
  "Senior Frontend Engineer",
  "Next.js / App Router",
  "React · TypeScript",
  "Sole Frontend Owner",
];

// Drop your photo at /public/profile.jpg in your Next.js project — the
// frame below wires straight to it. Until that file exists, the frame
// automatically falls back to a monogram card, so nothing ever breaks.
const HERO_IMAGE_SRC = "/profile.jpeg";
const HERO_INITIALS = "KN";

const EXPERIENCES = [
  {
    file: "experience/01-ies.tsx",
    title: "Frontend Developer",
    company: "Indian Educational Services (IES)",
    location: "Bengaluru",
    period: "Aug 2025 – Present",
    achievements: [
      "Architected and led end-to-end frontend for AdmitNation — a full-scale SaaS CRM — using Next.js App Router, React, and TypeScript as sole frontend owner across multiple product surfaces.",
      "Built the AdmitNation CRM from scratch: onboarding, lead lifecycle, counsellor workflows, wallet, automation rules, and analytics dashboards.",
      "Designed a no-code Landing Page Builder so non-technical teams could ship campaign pages independently.",
      "Engineered a Ticketing System and Institution CMS powering the CRM ecosystem — internal productivity up ~80%.",
      "Implemented SSR / ISR / Server Components across the marketing site, lifting organic discoverability.",
    ],
  },
  {
    file: "experience/02-vientitydata.tsx",
    title: "Frontend Developer",
    company: "ViEntityData Pvt Ltd",
    location: "Bengaluru",
    period: "Oct 2024 – Jul 2025",
    achievements: [
      "Built cross-platform apps with React.js, Next.js, TypeScript, and React Native inside an Agile team shipping iterative releases.",
      "Architected a reusable component library, standardizing UI patterns and cutting duplication across products.",
      "Integrated REST APIs and optimized data-fetching, reducing average page load time by 20%.",
      "Implemented cookie-based auth and route protection, improving session security.",
      "Led the production server migration from Azure to DigitalOcean — hosting cost down ~30%, zero downtime.",
    ],
  },
  {
    file: "experience/03-hrlytics.tsx",
    title: "Frontend Developer",
    company: "HRLytics",
    location: "Bengaluru",
    period: "Dec 2022 – Sep 2024",
    achievements: [
      "Led frontend development of the HRLytics SaaS platform end-to-end on React.",
      "Built a real-time proctoring module (camera + screen monitoring) — adoption up 20%.",
      "Optimized state management with Redux and Context API — load times down ~30% on high-traffic sessions.",
      "Implemented code-splitting with React.lazy and Suspense, cutting initial bundle size.",
    ],
  },
];

const PROJECTS = [
  {
    file: "AdmitNationCRM.tsx",
    title: "AdmitNation CRM & No-Code Page Builder",
    description:
      "Full-stack frontend for a multi-module SaaS CRM built on the Next.js App Router with TypeScript and REST APIs, including a drag-and-drop no-code landing page builder.",
    tech: ["Next.js", "TypeScript", "App Router", "REST API"],
    impact: "Core platform for the entire AdmitNation business",
  },
  {
    file: "AnalyticsDashboard.tsx",
    title: "E-Commerce Performance Analytics Dashboard",
    description:
      "Internal dashboard built with React.js and Node.js to track BD KPIs and creator engagement metrics for the team.",
    tech: ["React.js", "Node.js", "Charts"],
    impact: "25% improvement in reporting efficiency",
  },
  {
    file: "DataManager.tsx",
    title: "User Data Management System",
    description:
      "React + Semantic UI application streamlining CRUD data operations with advanced filtering and real-time updates.",
    tech: ["React", "Semantic UI", "Redux"],
    impact: "20% gain in team efficiency",
  },
  {
    file: "MovieSearch.tsx",
    title: "Movie Search App",
    description:
      "Real-time movie search against the OMDB API with a debounced search box and a favorites module.",
    tech: ["React", "OMDB API", "Axios"],
    impact: "Smooth, debounced API integration",
  },
];

const SKILL_GROUPS = [
  {
    key: "core_stack",
    items: [
      "Next.js (SSR / ISR / App Router / Server Components)",
      "React.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "React Native",
    ],
  },
  {
    key: "state_and_data",
    items: ["Redux Toolkit", "Context API", "React Query", "Axios", "REST API integration"],
  },
  {
    key: "ui_and_styling",
    items: ["Tailwind CSS", "Material UI", "Semantic UI", "Bootstrap", "Figma"],
  },
  {
    key: "build_and_test",
    items: ["Webpack", "Vite", "Jest", "React Testing Library", "Code Splitting"],
  },
  {
    key: "devops_and_tools",
    items: ["Git", "GitHub", "DigitalOcean", "Apache", "Ubuntu", "Vercel"],
  },
  {
    key: "methodology",
    items: ["Agile / Scrum", "Performance Optimization", "SEO", "Responsive Design", "Code Review"],
  },
];

const CERTIFICATIONS = [
  "React & JavaScript Development — Ebox Academy (2022)",
  "C Programming, HTML & CSS — Ebox Academy (2022)",
];

/* ========================================================================
   THEME TOKENS
   ======================================================================== */

const THEME_CSS = `
  [data-theme="night"] {
    --bg: #0A0B0F;
    --bg-alt: #0D0F14;
    --surface: #13151B;
    --surface-alt: #191C24;
    --border: #262A35;
    --border-soft: #1D2029;
    --text-primary: #F1F0EC;
    --text-secondary: #9294A0;
    --text-tertiary: #5D5F6B;
    --accent: #7FE7C4;
    --accent-soft: rgba(127, 231, 196, 0.12);
    --accent-2: #F2A65A;
    --accent-2-soft: rgba(242, 166, 90, 0.14);
    --shadow: 0 20px 60px -20px rgba(0,0,0,0.6);
  }
  [data-theme="day"] {
    --bg: #F6F5F0;
    --bg-alt: #EFEDE6;
    --surface: #FFFFFF;
    --surface-alt: #F1EFE8;
    --border: #DDD9CE;
    --border-soft: #E7E3D9;
    --text-primary: #14161C;
    --text-secondary: #5B5D66;
    --text-tertiary: #8B8D93;
    --accent: #0E8F6F;
    --accent-soft: rgba(14, 143, 111, 0.10);
    --accent-2: #C1731F;
    --accent-2-soft: rgba(193, 115, 31, 0.12);
    --shadow: 0 20px 60px -25px rgba(20,22,28,0.18);
  }

  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  .f-display { font-family: 'Space Grotesk', sans-serif; }
  .f-body { font-family: 'Inter', sans-serif; }
  .f-mono { font-family: 'JetBrains Mono', monospace; }

  * { transition: background-color 0.5s ease, border-color 0.5s ease, color 0.35s ease; }

  @keyframes twinkle {
    0%, 100% { opacity: 0.15; }
    50% { opacity: 0.85; }
  }
  @keyframes drift {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-14px); }
    100% { transform: translateY(0px); }
  }
  @keyframes blink-cursor {
    0%, 45% { opacity: 1; }
    50%, 95% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes fade-slide-up {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes scale-in {
    from { opacity: 0; transform: scale(0.94); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes pulse-dot {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.6); opacity: 0.4; }
  }
  @keyframes grid-pan {
    0% { background-position: 0 0; }
    100% { background-position: 48px 48px; }
  }

  .reveal { opacity: 0; }
  .reveal.in-view { animation: fade-slide-up 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .reveal-scale { opacity: 0; }
  .reveal-scale.in-view { animation: scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

  .cursor-blink { animation: blink-cursor 1.1s step-end infinite; }

  .nav-scroll::-webkit-scrollbar { display: none; }
  .nav-scroll { scrollbar-width: none; -ms-overflow-style: none; }

  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
  }
`;

/* ========================================================================
   SCROLL-REVEAL HOOK
   ======================================================================== */

function useReveal() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

function Reveal({ children, className = "", scale = false, delay = 0 }) {
  const [ref, inView] = useReveal();
  return (
    <div
      ref={ref}
      className={`${scale ? "reveal-scale" : "reveal"} ${inView ? "in-view" : ""} ${className}`}
      style={{ animationDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

/* ========================================================================
   TYPING EFFECT
   ======================================================================== */

function useTypewriter(strings, typeSpeed = 55, deleteSpeed = 30, pause = 1400) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[index % strings.length];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => i + 1);
    } else {
      timeout = setTimeout(() => {
        setText((t) =>
          deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
        );
      }, deleting ? deleteSpeed : typeSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, strings, typeSpeed, deleteSpeed, pause]);

  return text;
}

/* ========================================================================
   AMBIENT BACKGROUND
   Stars are generated client-side, after mount, so the server-rendered HTML
   and the first client render both start with zero stars — nothing random
   is ever part of the hydrated markup, which is what avoids the mismatch.
   ======================================================================== */

function AmbientBackground({ theme }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    if (theme !== "night") return;
    setStars(
      Array.from({ length: 46 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 0.6,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2.5,
      }))
    );
  }, [theme]);

  if (theme === "night") {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {stars.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              background: "var(--accent)",
              opacity: 0,
              animation: `fade-in 0.8s ease forwards, twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
              animationDelay: `0s, ${s.delay}s`,
            }}
          />
        ))}
        <div
          className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-[0.12]"
          style={{ background: "var(--accent)", animation: "drift 9s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-0 -left-24 w-[360px] h-[360px] rounded-full blur-3xl opacity-[0.10]"
          style={{ background: "var(--accent-2)", animation: "drift 11s ease-in-out infinite" }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border-soft) 1px, transparent 1px), linear-gradient(90deg, var(--border-soft) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          animation: "grid-pan 14s linear infinite",
        }}
      />
      <div
        className="absolute -top-16 right-0 w-[380px] h-[380px] rounded-full blur-3xl opacity-[0.10]"
        style={{ background: "var(--accent)", animation: "drift 10s ease-in-out infinite" }}
      />
    </div>
  );
}

/* ========================================================================
   HERO IMAGE FRAME
   Styled like a devtools element inspector rather than a plain photo —
   it fits the code-editor language the rest of the page already speaks
   (file-tab labels, mono captions) instead of a generic circular avatar.
   Falls back to a monogram card if /profile.jpg hasn't been added yet.
   ======================================================================== */

function HeroImageFrame() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="relative w-full max-w-90 mx-auto md:mx-0">
      <div
        className="rounded-lg border p-3"
        style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow)" }}
      >
        <div className="flex items-center justify-between px-1 pb-3">
          <span className="f-mono text-[11px] flex items-center gap-1.5" style={{ color: "var(--text-tertiary)" }}>
            <Circle size={5} style={{ fill: "var(--accent)", color: "var(--accent)" }} />
            profile.png
          </span>
          <span className="f-mono text-[10px]" style={{ color: "var(--text-tertiary)" }}>
            1:1
          </span>
        </div>

        <div
          className="relative aspect-square rounded-md overflow-hidden"
          style={{ background: "var(--surface-alt)" }}
        >
          {!imgFailed ? (
            <img
              src={HERO_IMAGE_SRC}
              alt="Kaviarasu N — portrait"
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="f-display text-6xl font-bold"
                style={{ color: "var(--accent)", opacity: 0.5 }}
              >
                {HERO_INITIALS}
              </span>
            </div>
          )}

          {/* inspector-style crop marks */}
          <span
            className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 pointer-events-none"
            style={{ borderColor: "var(--accent)" }}
          />
          <span
            className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 pointer-events-none"
            style={{ borderColor: "var(--accent)" }}
          />
          <span
            className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 pointer-events-none"
            style={{ borderColor: "var(--accent)" }}
          />
          <span
            className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 pointer-events-none"
            style={{ borderColor: "var(--accent)" }}
          />

          {/* dimension chip, devtools-inspector style */}
          <span
            className="absolute bottom-3 right-3 f-mono text-[10px] px-2 py-0.5 rounded"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            360 × 360
          </span>
        </div>
      </div>

      {/* floating status chip, echoes the header's availability dot */}
      <div
        className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md border f-mono text-[11px]"
        style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text-secondary)", boxShadow: "var(--shadow)" }}
      >
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full rounded-full opacity-60"
            style={{ background: "var(--accent)", animation: "pulse-dot 1.8s ease-in-out infinite" }}
          />
          <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
        </span>
        Bengaluru, IN
      </div>
    </div>
  );
}

/* ========================================================================
   MAIN

   All section inner wrappers share ONE consistent container:
   `max-w-7xl mx-auto w-full` (max-w-7xl is the widest size in Tailwind's
   default scale — max-w-8xl doesn't exist as a core utility, so it was
   silently doing nothing before). This keeps the hero, about, experience,
   projects, skills, education, and contact blocks perfectly aligned at
   every breakpoint, since they all measure against the same max width
   and the same responsive horizontal padding on the <section> (px-6 /
   md:px-10) scales the gutters together as the viewport changes.
   ======================================================================== */

const CONTAINER = "max-w-7xl mx-auto w-full";

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState("day");
  const [year, setYear] = useState(null);

  const typed = useTypewriter(ROLE_STRINGS);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const current = NAV_ITEMS.map((n) => n.id).find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 140 && rect.bottom >= 140;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "night" ? "day" : "night"));

  return (
    <div
      data-theme={theme}
      className="f-body min-h-screen relative"
      style={{ background: "var(--bg)", color: "var(--text-primary)" }}
    >
      <style>{THEME_CSS}</style>
      <AmbientBackground theme={theme} />

      {/* ---------------------------------------------------------------- */}
      {/* Top header — always visible, no side navigation                   */}
      {/* ---------------------------------------------------------------- */}
      <header
        className="fixed top-0 inset-x-0 z-40 backdrop-blur border-b"
        style={{ background: "color-mix(in srgb, var(--bg) 88%, transparent)", borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 sm:px-6 md:px-10 xl:px-0 h-16">
          <div className="flex items-center gap-2 shrink-0">
            <p className="f-display text-lg font-bold tracking-tight">
              KAVI<span style={{ color: "var(--accent)" }}>/</span>
            </p>
            <span className="f-mono text-[11px] hidden sm:inline" style={{ color: "var(--text-tertiary)" }}>
              ~/portfolio
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 nav-scroll overflow-x-auto">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="cursor-pointer f-mono whitespace-nowrap flex items-center gap-2 text-[12px] px-3 py-2 rounded-md border-b-2 transition-all duration-300"
                  style={{
                    borderColor: isActive ? "var(--accent)" : "transparent",
                    color: isActive ? "var(--text-primary)" : "var(--text-tertiary)",
                  }}
                >
                  <span style={{ color: isActive ? "var(--accent)" : "var(--text-tertiary)" }}>{item.num}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-2 pr-3 border-r" style={{ borderColor: "var(--border)" }}>
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ background: "var(--accent)", animation: "pulse-dot 1.8s ease-in-out infinite" }}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
              </span>
              <span className="f-mono text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                open to new roles
              </span>
            </div>

            <button
              onClick={toggleTheme}
              className="cursor-pointer flex items-center gap-2 px-2.5 py-1.5 rounded-md border f-mono text-[11px]"
              style={{ borderColor: "var(--border)", background: "var(--surface-alt)", color: "var(--text-secondary)" }}
              aria-label="Toggle theme"
            >
              {theme === "night" ? <Moon size={14} /> : <Sun size={14} />}
            </button>

            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="lg:hidden"
              style={{ color: "var(--text-primary)" }}
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile / tablet nav drawer */}
        {isMenuOpen && (
          <div className="lg:hidden px-3 pb-3 space-y-0.5 border-t" style={{ borderColor: "var(--border)" }}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="f-mono w-full flex items-center gap-2.5 text-left text-[13px] px-3 py-2.5 rounded-md mt-1"
                  style={{
                    color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                    background: isActive ? "var(--surface-alt)" : "transparent",
                  }}
                >
                  <span style={{ color: "var(--accent)" }}>{item.num}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* Main content — full width, padded below the fixed header          */}
      {/* All sections below share the same `px-6 md:px-10` gutter on the   */}
      {/* <section> and the same `max-w-7xl mx-auto` on the inner wrapper,   */}
      {/* so every block lines up edge-to-edge at every breakpoint.         */}
      {/* ---------------------------------------------------------------- */}
      <main className="pt-16 relative z-10">
        {/* HERO ------------------------------------------------------- */}
        <section id="home" className="min-h-screen flex flex-col justify-center px-6 md:px-10 py-5">
          <div className={CONTAINER}>
            <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
              {/* left column — copy */}
              <div className="flex flex-col md:order-1 text-center md:text-left">
                <div
                  className="inline-flex"
                  style={{ animation: "fade-slide-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards" }}
                >
                  <TabLabel>hero.tsx</TabLabel>
                </div>

                <div
                  className="mt-8 f-mono text-[13px] sm:text-[14px] leading-7 text-left inline-block"
                  style={{ color: "var(--text-tertiary)", animation: "fade-slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s forwards", opacity: 0, animationFillMode: "forwards" }}
                >
                  <p>01&nbsp;&nbsp;<span className="italic">{"/**"}</span></p>
                  <p>02&nbsp;&nbsp;<span className="italic">{" * Frontend Engineer"}</span></p>
                  <p>03&nbsp;&nbsp;<span className="italic">{" * Next.js · React · TypeScript"}</span></p>
                  <p>04&nbsp;&nbsp;<span className="italic">{" */"}</span></p>
                  <p>
                    05&nbsp;&nbsp;
                    <span style={{ color: "var(--accent-2)" }}>const</span>{" "}
                    <span style={{ color: "var(--text-primary)" }}>engineer</span> ={" "}
                    <span style={{ color: "var(--accent)" }}>&quot;Kaviarasu N&quot;</span>
                  </p>
                  <p>
                    06&nbsp;&nbsp;
                    <span style={{ color: "var(--accent-2)" }}>export default</span>{" "}
                    <span style={{ color: "var(--text-primary)" }}>engineer</span>
                  </p>
                </div>

                <h1
                  className="f-display text-4xl sm:text-6xl font-bold mt-10 leading-[1.08]"
                  style={{ animation: "fade-slide-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s forwards", opacity: 0, animationFillMode: "forwards" }}
                >
                  Building frontends that
                  <br />
                  ship, scale, and convert.
                </h1>

                <div
                  className="f-mono text-base sm:text-lg mt-6 h-7 flex items-center justify-center md:justify-start"
                  style={{ color: "var(--accent)", animation: "fade-slide-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s forwards", opacity: 0, animationFillMode: "forwards" }}
                >
                  <span>&gt;&nbsp;{typed}</span>
                  <span className="cursor-blink ml-0.5">▌</span>
                </div>

                <p
                  className="text-[15px] sm:text-base mt-5 max-w-xl mx-auto md:mx-0 leading-relaxed"
                  style={{ color: "var(--text-secondary)", animation: "fade-slide-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s forwards", opacity: 0, animationFillMode: "forwards" }}
                >
                  4.5+ years turning product requirements into production Next.js applications —
                  CRM platforms, CMS tools, and marketing sites with measurable wins on
                  performance, cost, and team output.
                </p>

                <div
                  className="flex flex-wrap gap-3 mt-8 justify-center md:justify-start"
                  style={{ animation: "fade-slide-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s forwards", opacity: 0, animationFillMode: "forwards" }}
                >
                  <a
                    href="mailto:kaviarasun557@gmail.com"
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-md transition-transform duration-300 hover:-translate-y-0.5"
                    style={{ background: "var(--accent)", color: "var(--bg)" }}
                  >
                    <Mail size={16} />
                    Send an email
                  </a>
                  <a
                    href="https://github.com/k16022000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 border text-sm font-medium rounded-md transition-transform duration-300 hover:-translate-y-0.5"
                    style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
                  >
                    <Github size={16} />
                    View GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/kaviarasu-n-856b07243"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 border text-sm font-medium rounded-md transition-transform duration-300 hover:-translate-y-0.5"
                    style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </div>

                <div
                  className="f-mono text-[12.5px] mt-10"
                  style={{ color: "var(--text-tertiary)", animation: "fade-slide-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s forwards", opacity: 0, animationFillMode: "forwards" }}
                >
                  <p>{"> console.log(profile)"}</p>
                  <div className="flex flex-wrap gap-x-8 gap-y-2 mt-2 justify-center md:justify-start" style={{ color: "var(--text-secondary)" }}>
                    <Stat label="experience" value="4.5+ yrs" />
                    <Stat label="ownership" value="sole FE" />
                    <Stat label="last_role_impact" value="~80%" />
                    <Stat label="stack" value="Next.js / TS" />
                  </div>
                </div>
              </div>

              {/* right column — portrait */}
              <div
                className="md:order-2 flex justify-center md:justify-end"
                style={{ animation: "fade-slide-up 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s forwards", opacity: 0, animationFillMode: "forwards" }}
              >
                <HeroImageFrame />
              </div>
            </div>
          </div>

          <button
            onClick={() => scrollToSection("about")}
            className="mt-16 mx-auto transition-colors"
            style={{ color: "var(--text-tertiary)", animation: "drift 2.4s ease-in-out infinite" }}
            aria-label="Scroll to about section"
          >
            <ChevronDown size={24} />
          </button>
        </section>

        {/* ABOUT -------------------------------------------------------- */}
        <section id="about" className="px-6 md:px-10 py-5 border-t" style={{ borderColor: "var(--border-soft)" }}>
          <div className={CONTAINER}>
            <Reveal><TabLabel>about.md</TabLabel></Reveal>
            <Reveal delay={80}>
              <h2 className="f-display text-3xl font-bold mt-6 mb-6">About</h2>
            </Reveal>

            <Reveal delay={140}>
              <p className="f-mono text-[12.5px] mb-4" style={{ color: "var(--text-tertiary)" }}>
                {"// who I am"}
              </p>
              <div className="space-y-4 text-[15px] leading-relaxed max-w-3xl" style={{ color: "var(--text-secondary)" }}>
                <p>
                  I&apos;m a frontend engineer based in Bengaluru who specializes in Next.js — SSR,
                  ISR, the App Router, and Server Components — paired with React, TypeScript, and
                  React Native. Most of my work has involved owning a product&apos;s entire
                  frontend, not just a feature inside it: at{" "}
                  <span className="font-medium" style={{ color: "var(--text-primary)" }}>
                    Indian Educational Services (IES)
                  </span>
                  , I&apos;m the sole frontend owner for AdmitNation&apos;s CRM, CMS, and marketing
                  site, and at{" "}
                  <span className="font-medium" style={{ color: "var(--text-primary)" }}>
                    ViEntityData
                  </span>
                  , I architected the shared component layer used across their products.
                </p>
                <p>
                  I care about the parts of frontend work that show up in a P&amp;L, not just a
                  Lighthouse score — productivity, hosting cost, adoption, conversion. That usually
                  means getting state management, data-fetching, and rendering strategy right
                  before reaching for anything else.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              <Reveal scale delay={0}><Highlight value="80%" label="CRM productivity gain" /></Reveal>
              <Reveal scale delay={80}><Highlight value="30%" label="hosting cost cut" /></Reveal>
              <Reveal scale delay={160}><Highlight value="20%" label="page load time cut" /></Reveal>
              <Reveal scale delay={240}><Highlight value="20%" label="proctoring adoption" /></Reveal>
            </div>
          </div>
        </section>

        {/* EXPERIENCE ----------------------------------------------- */}
        <section id="experience" className="px-6 md:px-10 py-5 border-t" style={{ borderColor: "var(--border-soft)", background: "var(--bg-alt)" }}>
          <div className={CONTAINER}>
            <Reveal><TabLabel>experience.json</TabLabel></Reveal>
            <Reveal delay={80}>
              <h2 className="f-display text-3xl font-bold mt-6 mb-10">Experience</h2>
            </Reveal>

            <div className="space-y-10">
              {EXPERIENCES.map((exp, idx) => (
                <Reveal key={exp.file} delay={idx * 100}>
                  <article
                    className="border rounded-lg overflow-hidden transition-shadow duration-500 hover:shadow-lg"
                    style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                  >
                    <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "var(--border)" }}>
                      <span className="f-mono text-[12px]" style={{ color: "var(--text-tertiary)" }}>{exp.file}</span>
                      <span className="f-mono text-[12px]" style={{ color: "var(--accent)" }}>{exp.period}</span>
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="f-display text-xl font-semibold">{exp.title}</h3>
                      <p className="text-sm mt-1" style={{ color: "var(--text-tertiary)" }}>
                        {exp.company} · {exp.location}
                      </p>
                      <ul className="mt-4 space-y-2.5">
                        {exp.achievements.map((a, i) => (
                          <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                            <span className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }}>▸</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS ------------------------------------------------- */}
        <section id="projects" className="px-6 md:px-10 py-5 border-t" style={{ borderColor: "var(--border-soft)" }}>
          <div className={CONTAINER}>
            <Reveal><TabLabel>projects.tsx</TabLabel></Reveal>
            <Reveal delay={80}>
              <h2 className="f-display text-3xl font-bold mt-6 mb-10">Key projects</h2>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-5">
              {PROJECTS.map((p, idx) => (
                <Reveal scale key={p.file} delay={idx * 90}>
                  <div
                    className="border rounded-lg p-5 h-full transition-all duration-400 hover:-translate-y-1"
                    style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow)")}
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                  >
                    <p className="f-mono text-[12px] mb-3" style={{ color: "var(--text-tertiary)" }}>
                      {`<ProjectCard file="${p.file}" />`}
                    </p>
                    <h3 className="f-display text-lg font-semibold mb-2">{p.title}</h3>
                    <p className="text-[14px] leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="f-mono text-[11px] px-2.5 py-1 rounded border"
                          style={{ borderColor: "var(--accent)", color: "var(--accent)", opacity: 0.9 }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="flex items-center gap-1.5 text-[13px] font-medium" style={{ color: "var(--accent-2)" }}>
                      <ArrowUpRight size={14} />
                      {p.impact}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS ------------------------------------------------------- */}
        <section id="skills" className="px-6 md:px-10 py-5 border-t" style={{ borderColor: "var(--border-soft)", background: "var(--bg-alt)" }}>
          <div className={CONTAINER}>
            <Reveal><TabLabel>skills.config</TabLabel></Reveal>
            <Reveal delay={80}>
              <h2 className="f-display text-3xl font-bold mt-6 mb-10">Technical skills</h2>
            </Reveal>

            <div className="border rounded-lg divide-y" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
              {SKILL_GROUPS.map((group, idx) => (
                <Reveal key={group.key} delay={idx * 70} className="border-b border-gray-200 last:border-b-0">
                  <div key={group.key} className="px-5 py-4 sm:px-6 sm:py-5" style={{ borderColor: "var(--border)" }}>
                    <p className="f-mono text-[12.5px] mb-3" style={{ color: "var(--accent-2)" }}>{group.key}:</p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="text-[13px] px-3 py-1.5 rounded-md border transition-transform duration-300 hover:-translate-y-0.5"
                          style={{ background: "var(--surface-alt)", color: "var(--text-secondary)", borderColor: "var(--border)" }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION -------------------------------------------------- */}
        <section id="education" className="px-6 md:px-10 py-5 border-t" style={{ borderColor: "var(--border-soft)" }}>
          <div className={CONTAINER}>
            <Reveal><TabLabel>education.yml</TabLabel></Reveal>
            <Reveal delay={80}>
              <h2 className="f-display text-3xl font-bold mt-6 mb-10">Education &amp; certifications</h2>
            </Reveal>

            <Reveal delay={140}>
              <div className="border rounded-lg p-6 mb-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <h3 className="f-display text-lg font-semibold">Bachelor of Engineering (B.E.)</h3>
                <p className="text-sm mt-1" style={{ color: "var(--text-tertiary)" }}>
                  Sudharsan College of Engineering · 2017 – 2021
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="border rounded-lg p-6 mb-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <p className="f-mono text-[12.5px] mb-3" style={{ color: "var(--accent-2)" }}>certifications:</p>
                <ul className="space-y-2">
                  {CERTIFICATIONS.map((c) => (
                    <li key={c} className="flex gap-2.5 text-[14px]" style={{ color: "var(--text-secondary)" }}>
                      <span style={{ color: "var(--accent)" }}>—</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="border rounded-lg p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <p className="f-mono text-[12.5px]" style={{ color: "var(--text-tertiary)" }}>{"> tail achievements.log"}</p>
                <p className="text-[14px] mt-3" style={{ color: "var(--text-secondary)" }}>
                  Solved 130+ algorithmic problems on LeetCode and CodeChef — strengthening DS &amp;
                  algorithms fundamentals.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CONTACT ------------------------------------------------------- */}
        <section id="contact" className="px-6 md:px-10 py-5 border-t" style={{ borderColor: "var(--border-soft)", background: "var(--bg-alt)" }}>
          <div className={CONTAINER}>
            <Reveal><TabLabel>contact.sh</TabLabel></Reveal>
            <Reveal delay={80}>
              <h2 className="f-display text-3xl font-bold mt-6 mb-3">Let&apos;s talk</h2>
              <p className="mb-8" style={{ color: "var(--text-tertiary)" }}>
                Open to senior frontend and Next.js-focused roles.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <div className="border rounded-lg p-6 f-mono relative overflow-hidden max-w-3xl" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <p className="text-[13px]" style={{ color: "var(--text-tertiary)" }}>$ whoami</p>
                <p className="text-[13px] mb-4" style={{ color: "var(--text-primary)" }}>
                  Kaviarasu N — Senior Frontend Engineer
                </p>

                <p className="text-[13px]" style={{ color: "var(--text-tertiary)" }}>$ contact --email</p>
                <a
                  href="mailto:kaviarasun557@gmail.com"
                  className="text-[13px] hover:underline mb-4 flex items-center gap-2 w-fit"
                  style={{ color: "var(--accent)" }}
                >
                  <Mail size={14} />
                  kaviarasun557@gmail.com
                </a>

                <p className="text-[13px]" style={{ color: "var(--text-tertiary)" }}>$ contact --phone</p>
                <a
                  href="tel:+919360896961"
                  className="text-[13px] hover:underline mb-4 flex items-center gap-2 w-fit"
                  style={{ color: "var(--accent)" }}
                >
                  <Phone size={14} />
                  +91 93608 96961
                </a>

                <p className="text-[13px]" style={{ color: "var(--text-tertiary)" }}>$ open --profiles</p>
                <div className="flex gap-4 mt-2">
                  <a
                    href="https://linkedin.com/in/kaviarasu-n-856b07243"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://github.com/k16022000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <Github size={20} />
                  </a>
                </div>

                <Terminal
                  size={72}
                  className="absolute -bottom-4 -right-4 opacity-[0.05] pointer-events-none"
                  style={{ color: "var(--text-primary)" }}
                />
              </div>
            </Reveal>
          </div>
        </section>

        <footer className="px-6 md:px-10 py-8 border-t" style={{ borderColor: "var(--border-soft)" }}>
          <p className={`f-mono text-[12px] ${CONTAINER}`} style={{ color: "var(--text-tertiary)" }}>
            {`// built with Next.js — © ${year ?? ""} Kaviarasu N — theme: ${theme}`}
          </p>
        </footer>
      </main>
    </div>
  );
}

/* ========================================================================
   HELPERS
   ======================================================================== */

function TabLabel({ children }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <Circle size={6} style={{ fill: "var(--accent)", color: "var(--accent)" }} />
      <span className="f-mono text-[12px]" style={{ color: "var(--text-secondary)" }}>{children}</span>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <span>
      <span style={{ color: "var(--text-tertiary)" }}>{label}:</span>{" "}
      <span style={{ color: "var(--accent)" }}>&quot;{value}&quot;</span>
    </span>
  );
}

function Highlight({ value, label }) {
  return (
    <div
      className="border rounded-lg p-4 h-full transition-transform duration-300 hover:-translate-y-1"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <p className="text-2xl font-bold f-mono" style={{ color: "var(--accent)" }}>{value}</p>
      <p className="text-[12px] mt-1 leading-snug" style={{ color: "var(--text-tertiary)" }}>{label}</p>
    </div>
  );
}