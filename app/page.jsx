"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
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
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/*  Fonts — move this to app/layout.tsx if you want it shared site-wide   */
/* ---------------------------------------------------------------------- */
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

/* ---------------------------------------------------------------------- */
/*  Content — pulled from resume                                          */
/* ---------------------------------------------------------------------- */
const NAV_ITEMS = [
  { id: "home", num: "00", label: "hero.tsx" },
  { id: "about", num: "01", label: "about.md" },
  { id: "experience", num: "02", label: "experience.json" },
  { id: "projects", num: "03", label: "projects.tsx" },
  { id: "skills", num: "04", label: "skills.config" },
  { id: "education", num: "05", label: "education.yml" },
  { id: "contact", num: "06", label: "contact.sh" },
];

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
    items: [
      "Redux Toolkit",
      "Context API",
      "React Query",
      "Axios",
      "REST API integration",
    ],
  },
  {
    key: "ui_and_styling",
    items: ["Tailwind CSS", "Material UI", "Semantic UI", "Bootstrap", "Figma"],
  },
  {
    key: "build_and_test",
    items: [
      "Webpack",
      "Vite",
      "Jest",
      "React Testing Library",
      "Code Splitting",
    ],
  },
  {
    key: "devops_and_tools",
    items: ["Git", "GitHub", "DigitalOcean", "Apache", "Ubuntu", "Vercel"],
  },
  {
    key: "methodology",
    items: [
      "Agile / Scrum",
      "Performance Optimization",
      "SEO",
      "Responsive Design",
      "Code Review",
    ],
  },
];

const CERTIFICATIONS = [
  "React & JavaScript Development — Ebox Academy (2022)",
  "C Programming, HTML & CSS — Ebox Academy (2022)",
];

/* ---------------------------------------------------------------------- */

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const current = NAV_ITEMS.map((n) => n.id).find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <div
      className={`${body.className} min-h-screen bg-[#0B0C0E] text-[#F4F3EF]`}
    >
      {/* ---------------------------------------------------------------- */}
      {/* Desktop sidebar — the file explorer                              */}
      {/* ---------------------------------------------------------------- */}
      <aside className="hidden md:flex md:flex-col fixed left-0 top-0 h-screen w-60 border-r border-[#232529] bg-[#101113] z-40">
        <div className="px-5 py-6 border-b border-[#232529]">
          <p
            className={`${display.className} text-xl font-bold tracking-tight`}
          >
            KAVI<span className="text-[#E8A33D]">/</span>
          </p>
          <p className={`${mono.className} text-[11px] text-[#7A7A75] mt-1`}>
            ~/portfolio
          </p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`${mono.className} w-full flex items-center gap-2.5 text-left text-[12.5px] px-3 py-2 rounded-md border-l-2 transition-colors duration-200 ${
                  isActive
                    ? "border-[#E8A33D] bg-[#181A1D] text-[#F4F3EF]"
                    : "border-transparent text-[#7A7A75] hover:text-[#C9C8C2] hover:bg-[#15161A]"
                }`}
              >
                <span
                  className={isActive ? "text-[#E8A33D]" : "text-[#4F5054]"}
                >
                  {item.num}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-5 py-4 border-t border-[#232529] flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#4FB0A5] opacity-60 animate-ping motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4FB0A5]" />
          </span>
          <span className={`${mono.className} text-[11px] text-[#7A7A75]`}>
            open to new roles
          </span>
        </div>
      </aside>

      {/* ---------------------------------------------------------------- */}
      {/* Mobile top bar                                                    */}
      {/* ---------------------------------------------------------------- */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-[#0B0C0E]/95 backdrop-blur border-b border-[#232529]">
        <div className="flex items-center justify-between px-4 h-14">
          <p className={`${display.className} font-bold`}>
            KAVI<span className="text-[#E8A33D]">/</span>
          </p>
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="text-[#F4F3EF]"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="px-3 pb-3 space-y-0.5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`${mono.className} w-full flex items-center gap-2.5 text-left text-[13px] px-3 py-2.5 rounded-md text-[#C9C8C2] hover:bg-[#15161A]`}
              >
                <span className="text-[#E8A33D]">{item.num}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Main content                                                      */}
      {/* ---------------------------------------------------------------- */}
      <main className="md:ml-60 pt-14 md:pt-0">
        {/* HERO ---------------------------------------------------------- */}
        <section
          id="home"
          className="min-h-screen flex flex-col justify-center px-6 md:px-14 py-20"
        >
          <div className="max-w-3xl">
            <TabLabel>hero.tsx</TabLabel>

            <div className="mt-6 flex items-start gap-5">
              <div className="hidden sm:block shrink-0 rounded-lg border border-[#232529] bg-[#101113] overflow-hidden w-[88px]">
                <div className="flex items-center gap-1.5 px-2 py-1.5 border-b border-[#232529]">
                  <span className="w-2 h-2 rounded-full bg-[#4F5054]" />
                  <span className="w-2 h-2 rounded-full bg-[#4F5054]" />
                  <span className="w-2 h-2 rounded-full bg-[#E8A33D]" />
                </div>
                <Image
                  src="/profile.jpeg"
                  alt="Kaviarasu N"
                  width={88}
                  height={88}
                  className="w-full h-[88px] object-cover"
                  priority
                />
              </div>

              <div
                className={`${mono.className} text-[13px] sm:text-[14px] leading-7 text-[#7A7A75]`}
              >
                <p>
                  01&nbsp;&nbsp;<span className="italic">{"/**"}</span>
                </p>
                <p>
                  02&nbsp;&nbsp;
                  <span className="italic">
                    {" * Senior Frontend Engineer"}
                  </span>
                </p>
                <p>
                  03&nbsp;&nbsp;
                  <span className="italic">
                    {" * Next.js · React · TypeScript"}
                  </span>
                </p>
                <p>
                  04&nbsp;&nbsp;<span className="italic">{" */"}</span>
                </p>
                <p>
                  05&nbsp;&nbsp;
                  <span className="text-[#E8A33D]">const</span>{" "}
                  <span className="text-[#F4F3EF]">engineer</span> ={" "}
                  <span className="text-[#4FB0A5]">
                    &quot;Kaviarasu N&quot;
                  </span>
                </p>
                <p>
                  06&nbsp;&nbsp;
                  <span className="text-[#E8A33D]">export default</span>{" "}
                  <span className="text-[#F4F3EF]">engineer</span>
                </p>
              </div>
            </div>

            <h1
              className={`${display.className} text-4xl sm:text-5xl font-bold mt-10 leading-[1.1]`}
            >
              Building frontends that ship,
              <br />
              scale, and convert.
            </h1>

            <p className="text-[15px] sm:text-base text-[#B6B5AF] mt-5 max-w-xl leading-relaxed">
              4.5+ years turning product requirements into production Next.js
              applications — CRM platforms, CMS tools, and marketing sites with
              measurable wins on performance, cost, and team output.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="mailto:kaviarasun557@gmail.com"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#E8A33D] text-[#0B0C0E] text-sm font-semibold rounded-md hover:bg-[#f0b35c] transition-colors"
              >
                <Mail size={16} />
                Send an email
              </a>
              <a
                href="https://github.com/k16022000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 border border-[#232529] text-sm font-medium rounded-md text-[#F4F3EF] hover:border-[#4F5054] transition-colors"
              >
                <Github size={16} />
                View GitHub
              </a>
              <a
                href="https://linkedin.com/in/kaviarasu-n-856b07243"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 border border-[#232529] text-sm font-medium rounded-md text-[#F4F3EF] hover:border-[#4F5054] transition-colors"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>

            <div
              className={`${mono.className} text-[12.5px] text-[#7A7A75] mt-10`}
            >
              <p>{"> console.log(profile)"}</p>
              <div className="flex flex-wrap gap-x-8 gap-y-2 mt-2 text-[#C9C8C2]">
                <Stat label="experience" value="4.5+ yrs" />
                <Stat label="ownership" value="sole FE" />
                <Stat label="last_role_impact" value="~80%" />
                <Stat label="stack" value="Next.js / TS" />
              </div>
            </div>
          </div>

          <button
            onClick={() => scrollToSection("about")}
            className="mt-16 self-start text-[#7A7A75] hover:text-[#E8A33D] transition-colors animate-bounce motion-reduce:animate-none"
            aria-label="Scroll to about section"
          >
            <ChevronDown size={24} />
          </button>
        </section>

        {/* ABOUT ----------------------------------------------------------- */}
        <section
          id="about"
          className="px-6 md:px-14 py-20 border-t border-[#161719]"
        >
          <div className="max-w-3xl">
            <TabLabel>about.md</TabLabel>
            <h2 className={`${display.className} text-3xl font-bold mt-6 mb-6`}>
              About
            </h2>

            <p
              className={`${mono.className} text-[12.5px] text-[#7A7A75] mb-4`}
            >
              {"// who I am"}
            </p>
            <div className="space-y-4 text-[15px] text-[#B6B5AF] leading-relaxed">
              <p>
                I&apos;m a frontend engineer based in Bengaluru who specializes
                in Next.js — SSR, ISR, the App Router, and Server Components —
                paired with React, TypeScript, and React Native. Most of my work
                has involved owning a product&apos;s entire frontend, not just a
                feature inside it: at{" "}
                <span className="text-[#F4F3EF] font-medium">
                  Indian Educational Services (IES)
                </span>
                , I&apos;m the sole frontend owner for AdmitNation&apos;s CRM,
                CMS, and marketing site, and at{" "}
                <span className="text-[#F4F3EF] font-medium">ViEntityData</span>
                , I architected the shared component layer used across their
                products.
              </p>
              <p>
                I care about the parts of frontend work that show up in a
                P&amp;L, not just a Lighthouse score — productivity, hosting
                cost, adoption, conversion. That usually means getting state
                management, data-fetching, and rendering strategy right before
                reaching for anything else.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              <Highlight value="80%" label="CRM productivity gain" />
              <Highlight value="30%" label="hosting cost cut" />
              <Highlight value="20%" label="page load time cut" />
              <Highlight value="20%" label="proctoring adoption" />
            </div>
          </div>
        </section>

        {/* EXPERIENCE -------------------------------------------------- */}
        <section
          id="experience"
          className="px-6 md:px-14 py-20 border-t border-[#161719] bg-[#0D0E10]"
        >
          <div className="max-w-3xl">
            <TabLabel>experience.json</TabLabel>
            <h2
              className={`${display.className} text-3xl font-bold mt-6 mb-10`}
            >
              Experience
            </h2>

            <div className="space-y-10">
              {EXPERIENCES.map((exp) => (
                <article
                  key={exp.file}
                  className="border border-[#232529] rounded-lg bg-[#101113] overflow-hidden"
                >
                  <div className="flex items-center justify-between px-5 py-3 border-b border-[#232529]">
                    <span
                      className={`${mono.className} text-[12px] text-[#7A7A75]`}
                    >
                      {exp.file}
                    </span>
                    <span
                      className={`${mono.className} text-[12px] text-[#4FB0A5]`}
                    >
                      {exp.period}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3
                      className={`${display.className} text-xl font-semibold`}
                    >
                      {exp.title}
                    </h3>
                    <p className="text-[#9A9A95] text-sm mt-1">
                      {exp.company} · {exp.location}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {exp.achievements.map((a, i) => (
                        <li
                          key={i}
                          className="flex gap-2.5 text-[14px] text-[#B6B5AF] leading-relaxed"
                        >
                          <span className="text-[#E8A33D] mt-0.5 shrink-0">
                            ▸
                          </span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS ------------------------------------------------------ */}
        <section
          id="projects"
          className="px-6 md:px-14 py-20 border-t border-[#161719]"
        >
          <div className="max-w-5xl">
            <TabLabel>projects.tsx</TabLabel>
            <h2
              className={`${display.className} text-3xl font-bold mt-6 mb-10`}
            >
              Key projects
            </h2>

            <div className="grid sm:grid-cols-2 gap-5">
              {PROJECTS.map((p) => (
                <div
                  key={p.file}
                  className="border border-[#232529] rounded-lg bg-[#101113] p-5 hover:border-[#4F5054] transition-colors"
                >
                  <p
                    className={`${mono.className} text-[12px] text-[#7A7A75] mb-3`}
                  >
                    {`<ProjectCard file="${p.file}" />`}
                  </p>
                  <h3
                    className={`${display.className} text-lg font-semibold mb-2`}
                  >
                    {p.title}
                  </h3>
                  <p className="text-[14px] text-[#9A9A95] leading-relaxed mb-4">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className={`${mono.className} text-[11px] px-2.5 py-1 rounded border border-[#E8A33D]/30 text-[#E8A33D]`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="flex items-center gap-1.5 text-[13px] text-[#4FB0A5] font-medium">
                    <ArrowUpRight size={14} />
                    {p.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS --------------------------------------------------------- */}
        <section
          id="skills"
          className="px-6 md:px-14 py-20 border-t border-[#161719] bg-[#0D0E10]"
        >
          <div className="max-w-4xl">
            <TabLabel>skills.config</TabLabel>
            <h2
              className={`${display.className} text-3xl font-bold mt-6 mb-10`}
            >
              Technical skills
            </h2>

            <div className="border border-[#232529] rounded-lg bg-[#101113] divide-y divide-[#232529]">
              {SKILL_GROUPS.map((group) => (
                <div key={group.key} className="px-5 py-4 sm:px-6 sm:py-5">
                  <p
                    className={`${mono.className} text-[12.5px] text-[#E8A33D] mb-3`}
                  >
                    {group.key}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="text-[13px] px-3 py-1.5 rounded-md bg-[#181A1D] text-[#C9C8C2] border border-[#232529]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION ----------------------------------------------------- */}
        <section
          id="education"
          className="px-6 md:px-14 py-20 border-t border-[#161719]"
        >
          <div className="max-w-3xl">
            <TabLabel>education.yml</TabLabel>
            <h2
              className={`${display.className} text-3xl font-bold mt-6 mb-10`}
            >
              Education &amp; certifications
            </h2>

            <div className="border border-[#232529] rounded-lg bg-[#101113] p-6 mb-6">
              <h3 className={`${display.className} text-lg font-semibold`}>
                Bachelor of Engineering (B.E.)
              </h3>
              <p className="text-[#9A9A95] text-sm mt-1">
                Sudharsan College of Engineering · 2017 – 2021
              </p>
            </div>

            <div className="border border-[#232529] rounded-lg bg-[#101113] p-6 mb-6">
              <p
                className={`${mono.className} text-[12.5px] text-[#E8A33D] mb-3`}
              >
                certifications:
              </p>
              <ul className="space-y-2">
                {CERTIFICATIONS.map((c) => (
                  <li
                    key={c}
                    className="flex gap-2.5 text-[14px] text-[#B6B5AF]"
                  >
                    <span className="text-[#4FB0A5]">—</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[#232529] rounded-lg bg-[#101113] p-6">
              <p className={`${mono.className} text-[12.5px] text-[#7A7A75]`}>
                {"> tail achievements.log"}
              </p>
              <p className="text-[14px] text-[#B6B5AF] mt-3">
                Solved 130+ algorithmic problems on LeetCode and CodeChef —
                strengthening DS &amp; algorithms fundamentals.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT --------------------------------------------------------- */}
        <section
          id="contact"
          className="px-6 md:px-14 py-20 border-t border-[#161719] bg-[#0D0E10]"
        >
          <div className="max-w-3xl">
            <TabLabel>contact.sh</TabLabel>
            <h2 className={`${display.className} text-3xl font-bold mt-6 mb-3`}>
              Let&apos;s talk
            </h2>
            <p className="text-[#9A9A95] mb-8">
              Open to senior frontend and Next.js-focused roles.
            </p>

            <div className="border border-[#232529] rounded-lg bg-[#101113] p-6 font-mono">
              <p className={`${mono.className} text-[13px] text-[#7A7A75]`}>
                $ whoami
              </p>
              <p
                className={`${mono.className} text-[13px] text-[#F4F3EF] mb-4`}
              >
                Kaviarasu N — Senior Frontend Engineer
              </p>

              <p className={`${mono.className} text-[13px] text-[#7A7A75]`}>
                $ contact --email
              </p>
              <a
                href="mailto:kaviarasun557@gmail.com"
                className={`${mono.className} text-[13px] text-[#4FB0A5] hover:underline mb-4 flex items-center gap-2 w-fit`}
              >
                <Mail size={14} />
                kaviarasun557@gmail.com
              </a>

              <p className={`${mono.className} text-[13px] text-[#7A7A75]`}>
                $ contact --phone
              </p>
              <a
                href="tel:+919360896961"
                className={`${mono.className} text-[13px] text-[#4FB0A5] hover:underline mb-4 flex items-center gap-2 w-fit`}
              >
                <Phone size={14} />
                +91 93608 96961
              </a>

              <p className={`${mono.className} text-[13px] text-[#7A7A75]`}>
                $ open --profiles
              </p>
              <div className="flex gap-4 mt-2">
                <a
                  href="https://linkedin.com/in/kaviarasu-n-856b07243"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C9C8C2] hover:text-[#E8A33D] transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://github.com/k16022000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C9C8C2] hover:text-[#E8A33D] transition-colors"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="px-6 md:px-14 py-8 border-t border-[#161719]">
          <p className={`${mono.className} text-[12px] text-[#5A5A56]`}>
            {`// built with Next.js — © ${new Date().getFullYear()} Kaviarasu N`}
          </p>
        </footer>
      </main>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Small helpers                                                          */
/* ---------------------------------------------------------------------- */

function TabLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#232529] bg-[#101113]">
      <Circle size={6} className="fill-[#E8A33D] text-[#E8A33D]" />
      <span className="font-mono text-[12px] text-[#9A9A95]">{children}</span>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <span>
      <span className="text-[#7A7A75]">{label}:</span>{" "}
      <span className="text-[#4FB0A5]">&quot;{value}&quot;</span>
    </span>
  );
}

function Highlight({ value, label }) {
  return (
    <div className="border border-[#232529] rounded-lg p-4 bg-[#101113]">
      <p className="text-2xl font-bold text-[#E8A33D] font-mono">{value}</p>
      <p className="text-[12px] text-[#7A7A75] mt-1 leading-snug">{label}</p>
    </div>
  );
}
