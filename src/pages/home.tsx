import { useEffect, useRef, useState } from "react";

const NAV_LINKS = ["Home", "About", "Services", "Media", "Contact"];

const SERVICES = [
  {
    number: "01",
    title: "Campaign Strategy",
    desc: "From message architecture to voter targeting, we build the blueprint that turns aspirations into electoral victories.",
    icon: "◈",
  },
  {
    number: "02",
    title: "Ground Operations",
    desc: "Precision field deployment, volunteer coordination, and real-time analytics to maximize your ground game impact.",
    icon: "◉",
  },
  {
    number: "03",
    title: "Media Positioning",
    desc: "Earned media strategy, rapid response, and narrative control that keeps your campaign driving the conversation.",
    icon: "◎",
  },
  {
    number: "04",
    title: "Digital Outreach",
    desc: "Data-driven digital advertising, social media ecosystems, and online fundraising built for modern campaigns.",
    icon: "◈",
  },
  {
    number: "05",
    title: "Opposition Research",
    desc: "Comprehensive research and intelligence that anticipates attacks and identifies contrast opportunities.",
    icon: "◉",
  },
  {
    number: "06",
    title: "Crisis Management",
    desc: "24/7 rapid response infrastructure and communications protocols to protect your campaign when it matters most.",
    icon: "◎",
  },
];

const STATS = [
  { value: "87", suffix: "%", label: "Win Rate" },
  { value: "200", suffix: "+", label: "Campaigns Managed" },
  { value: "18", suffix: "", label: "States Active" },
  { value: "40", suffix: "M+", label: "Voters Reached" },
];

const PRINCIPLES = [
  {
    num: "I",
    title: "Intelligence Before Action",
    text: "Every strategy begins with deep research — opposition, district, voters, and media environment.",
  },
  {
    num: "II",
    title: "Structure Creates Freedom",
    text: "Strong operational frameworks let campaigns respond to events without losing strategic coherence.",
  },
  {
    num: "III",
    title: "Execution Is Everything",
    text: "The best strategy executed poorly loses. We build teams that deliver at every level.",
  },
];

const MARQUEE_ITEMS = [
  "Campaign Strategy",
  "Ground Operations",
  "Media Positioning",
  "Digital Outreach",
  "Opposition Research",
  "Crisis Management",
  "Voter Targeting",
  "Message Architecture",
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Lora', Georgia, serif", background: "#faf9f7", color: "#1a1512", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&family=Caveat:wght@600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --red: #c8391a;
          --red-deep: #a82d12;
          --coral: #e05a35;
          --coral-light: #f0795a;
          --peach: #fde8e0;
          --peach-mid: #f8d4c8;
          --warm-white: #faf9f7;
          --off-white: #f3f0eb;
          --stone: #e8e2d8;
          --ink: #1a1512;
          --ink-mid: #4a3f35;
          --ink-light: #8a7a6e;
          --caveat: 'Caveat', cursive;
          --sans: 'DM Sans', sans-serif;
        }

        html { scroll-behavior: smooth; }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 22px 64px;
          transition: all 0.4s ease;
        }
        .nav.scrolled {
          background: rgba(250,249,247,0.95);
          backdrop-filter: blur(12px);
          padding: 14px 64px;
          box-shadow: 0 1px 0 rgba(200,57,26,0.12), 0 4px 24px rgba(0,0,0,0.06);
        }
        .nav-logo {
          display: flex; align-items: center; gap: 0;
          text-decoration: none; cursor: pointer;
        }
        .nav-logo-block {
          display: flex; align-items: center; gap: 0;
          position: relative; width: 48px; height: 34px;
        }
        .logo-card-back {
          width: 48px; height: 34px;
          background: var(--coral);
          position: absolute; top: -3px; left: 3px;
          transform: rotate(3deg);
          border-radius: 2px;
        }
        .logo-card-front {
          width: 48px; height: 34px;
          background: var(--red);
          position: absolute; top: 0; left: 0;
          display: flex; align-items: center; justify-content: center;
          border-radius: 2px;
        }
        .logo-mpr {
          font-family: var(--sans);
          font-size: 13px; font-weight: 700;
          color: white; letter-spacing: -0.02em;
          line-height: 1;
        }
        .logo-mpr .small-m { font-size: 9px; vertical-align: middle; }
        .logo-consulting {
          font-family: var(--caveat);
          font-size: 22px; font-weight: 600;
          color: var(--coral); margin-left: 14px;
        }
        .nav-links { display: flex; gap: 36px; list-style: none; }
        .nav-links a {
          font-family: var(--sans);
          font-size: 13px; letter-spacing: 0.04em;
          color: var(--ink-mid); text-decoration: none;
          transition: color 0.25s; cursor: pointer; font-weight: 500;
        }
        .nav-links a:hover { color: var(--red); }
        .nav-cta {
          font-family: var(--sans);
          font-size: 13px; font-weight: 600; letter-spacing: 0.04em;
          background: var(--red); border: none;
          color: white; padding: 10px 22px;
          border-radius: 2px; cursor: pointer;
          transition: all 0.25s;
        }
        .nav-cta:hover { background: var(--red-deep); transform: translateY(-1px); box-shadow: 0 4px 14px rgba(200,57,26,0.3); }

        /* HERO */
        .hero {
          position: relative; min-height: 100vh;
          display: flex; align-items: center;
          overflow: hidden;
          background: var(--warm-white);
        }
        .hero-shapes {
          position: absolute; inset: 0; pointer-events: none; overflow: hidden;
        }
        .shape-1 {
          position: absolute; width: 520px; height: 520px;
          background: var(--peach); border-radius: 4px;
          top: -80px; right: -60px;
          transform: rotate(8deg); opacity: 0.8;
        }
        .shape-2 {
          position: absolute; width: 520px; height: 520px;
          background: var(--peach-mid); border-radius: 4px;
          top: -40px; right: -20px;
          transform: rotate(3deg); opacity: 0.5;
        }
        .shape-3 {
          position: absolute; width: 440px; height: 440px;
          background: var(--red); border-radius: 4px;
          top: 20px; right: 60px; opacity: 0.07;
        }
        .hero-content {
          position: relative; z-index: 2;
          max-width: 1200px; margin: 0 auto; padding: 140px 64px 120px;
          width: 100%;
          display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
        }
        .hero-eyebrow {
          font-family: var(--sans);
          font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--red); margin-bottom: 28px;
          display: flex; align-items: center; gap: 14px; font-weight: 600;
          opacity: 0; animation: fadeUp 0.7s ease 0.2s forwards;
        }
        .hero-eyebrow::before {
          content: ''; display: block; width: 32px; height: 2px;
          background: var(--red); border-radius: 2px;
        }
        .hero-headline {
          font-size: clamp(48px, 5.5vw, 76px);
          font-weight: 600; line-height: 1.08; letter-spacing: -0.02em;
          margin-bottom: 28px; color: var(--ink);
          opacity: 0; animation: fadeUp 0.8s ease 0.35s forwards;
        }
        .hero-headline em { font-style: italic; color: var(--red); font-weight: 500; }
        .hero-sub {
          font-family: var(--sans);
          font-size: 17px; line-height: 1.75; color: var(--ink-mid);
          max-width: 420px; margin-bottom: 48px; font-weight: 400;
          opacity: 0; animation: fadeUp 0.8s ease 0.5s forwards;
        }
        .hero-actions {
          display: flex; gap: 16px; align-items: center;
          opacity: 0; animation: fadeUp 0.8s ease 0.65s forwards;
        }
        .btn-primary {
          font-family: var(--sans);
          font-size: 14px; font-weight: 600; letter-spacing: 0.03em;
          background: var(--red); color: white;
          padding: 15px 36px; border: none; border-radius: 2px; cursor: pointer;
          transition: all 0.25s; box-shadow: 0 2px 12px rgba(200,57,26,0.25);
        }
        .btn-primary:hover { background: var(--red-deep); transform: translateY(-2px); box-shadow: 0 6px 24px rgba(200,57,26,0.35); }
        .btn-outline {
          font-family: var(--sans);
          font-size: 14px; font-weight: 600; letter-spacing: 0.03em;
          background: transparent; color: var(--ink-mid);
          padding: 15px 28px; border: 1.5px solid var(--stone); border-radius: 2px; cursor: pointer;
          transition: all 0.25s; display: flex; align-items: center; gap: 10px;
        }
        .btn-outline:hover { border-color: var(--red); color: var(--red); gap: 16px; }
        .btn-outline::after { content: '→'; transition: inherit; }

        /* Hero Card */
        .hero-right { opacity: 0; animation: fadeIn 1s ease 0.8s forwards; }
        .hero-card {
          background: white; border-radius: 4px;
          box-shadow: 0 8px 60px rgba(0,0,0,0.1), 0 2px 12px rgba(0,0,0,0.06);
          overflow: hidden; transform: rotate(0.5deg);
        }
        .hero-card-header {
          background: var(--red); padding: 24px 32px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .hero-card-title {
          font-family: var(--sans);
          font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: rgba(255,255,255,0.8);
        }
        .hero-card-badge {
          font-family: var(--sans);
          font-size: 10px; font-weight: 600; letter-spacing: 0.1em;
          background: rgba(255,255,255,0.2); color: white;
          padding: 4px 10px; border-radius: 100px;
        }
        .hero-card-body { padding: 32px; }
        .hero-card-stat {
          display: flex; justify-content: space-between; align-items: center;
          padding: 18px 0; border-bottom: 1px solid var(--off-white);
        }
        .hero-card-stat:last-child { border-bottom: none; }
        .hcs-label { font-family: var(--sans); font-size: 13px; color: var(--ink-light); font-weight: 500; }
        .hcs-val {
          font-family: var(--sans); font-size: 20px; font-weight: 700; color: var(--ink);
          display: flex; align-items: center; gap: 8px;
        }
        .hcs-pill {
          font-size: 10px; font-weight: 600;
          background: var(--peach); color: var(--red);
          padding: 3px 8px; border-radius: 100px;
        }
        .hero-card-note {
          margin-top: 24px; padding: 14px 18px;
          background: var(--peach); border-radius: 3px;
          font-family: var(--sans); font-size: 12px; color: var(--red);
          font-weight: 600; text-align: center; letter-spacing: 0.04em;
        }

        /* STATS BAR */
        .stats-bar {
          background: var(--ink);
          display: grid; grid-template-columns: repeat(4, 1fr);
        }
        .stat-item {
          padding: 40px 48px;
          border-right: 1px solid rgba(255,255,255,0.07);
          position: relative;
        }
        .stat-item::before {
          content: ''; position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: transparent; transition: background 0.3s;
        }
        .stat-item:hover::before { background: var(--red); }
        .stat-item:last-child { border-right: none; }
        .stat-value {
          font-family: 'Lora', serif;
          font-size: 52px; font-weight: 700; color: white;
          line-height: 1; margin-bottom: 6px;
        }
        .stat-suffix { color: var(--coral); }
        .stat-label {
          font-family: var(--sans);
          font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.4); font-weight: 500;
        }

        /* MARQUEE */
        .marquee-section {
          overflow: hidden; padding: 18px 0;
          background: var(--peach);
          border-top: 1px solid var(--peach-mid);
          border-bottom: 1px solid var(--peach-mid);
        }
        .marquee-track {
          display: flex; gap: 0; white-space: nowrap;
          animation: marquee 28s linear infinite;
        }
        .marquee-item {
          font-family: var(--sans);
          font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--red); flex-shrink: 0; font-weight: 600;
          padding: 0 48px;
          display: flex; align-items: center; gap: 48px;
        }
        .marquee-item::after { content: '✦'; font-size: 8px; color: var(--coral-light); }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* ABOUT */
        .about-section {
          padding: 120px 64px; max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: start;
        }
        .section-label {
          font-family: var(--sans);
          font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--red); margin-bottom: 20px; font-weight: 600;
          display: flex; align-items: center; gap: 12px;
        }
        .section-label::before {
          content: ''; display: block; width: 28px; height: 2px;
          background: var(--red); border-radius: 2px;
        }
        .about-headline {
          font-size: clamp(32px, 3.5vw, 46px); font-weight: 600;
          line-height: 1.18; margin-bottom: 28px; color: var(--ink); letter-spacing: -0.01em;
        }
        .about-text {
          font-family: var(--sans);
          font-size: 16px; line-height: 1.8; color: var(--ink-mid); margin-bottom: 18px;
        }
        .about-signature {
          margin-top: 36px; font-family: var(--caveat);
          font-size: 28px; color: var(--red); font-weight: 600;
        }
        .principle {
          padding: 28px 0; border-bottom: 1px solid var(--stone);
          position: relative; padding-left: 0;
          transition: padding-left 0.3s;
        }
        .principle:first-child { padding-top: 0; }
        .principle:hover { padding-left: 12px; }
        .principle-num {
          font-family: var(--sans);
          font-size: 10px; color: var(--red); letter-spacing: 0.2em;
          text-transform: uppercase; font-weight: 700; margin-bottom: 10px;
        }
        .principle-title { font-size: 20px; font-weight: 600; margin-bottom: 8px; color: var(--ink); }
        .principle-text { font-family: var(--sans); font-size: 14px; color: var(--ink-light); line-height: 1.7; }

        /* SERVICES */
        .services-section {
          background: var(--off-white);
          border-top: 1px solid var(--stone); border-bottom: 1px solid var(--stone);
          padding: 100px 64px;
        }
        .services-inner { max-width: 1200px; margin: 0 auto; }
        .services-header {
          display: flex; justify-content: space-between;
          align-items: flex-end; margin-bottom: 64px; gap: 48px;
        }
        .services-headline {
          font-size: clamp(32px, 3.5vw, 48px); font-weight: 600;
          color: var(--ink); max-width: 380px; letter-spacing: -0.01em;
        }
        .services-desc {
          font-family: var(--sans); max-width: 360px; font-size: 15px;
          color: var(--ink-mid); line-height: 1.75;
        }
        .services-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 2px; background: var(--stone);
        }
        .service-card {
          background: white; padding: 44px 36px;
          transition: all 0.3s; cursor: default;
          position: relative; overflow: hidden;
        }
        .service-card::after {
          content: ''; position: absolute;
          bottom: 0; left: 0; right: 0; height: 3px;
          background: var(--red); transform: scaleX(0);
          transform-origin: left; transition: transform 0.4s ease;
        }
        .service-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
        .service-card:hover::after { transform: scaleX(1); }
        .service-num {
          font-family: var(--sans);
          font-size: 11px; color: var(--coral-light); letter-spacing: 0.2em;
          font-weight: 700; margin-bottom: 20px;
        }
        .service-icon { font-size: 20px; color: var(--red); margin-bottom: 16px; }
        .service-title { font-size: 22px; font-weight: 600; margin-bottom: 14px; color: var(--ink); }
        .service-desc-text { font-family: var(--sans); font-size: 14px; color: var(--ink-light); line-height: 1.75; }
        .service-link {
          margin-top: 28px; font-family: var(--sans); font-size: 12px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: transparent; transition: color 0.3s;
          display: flex; align-items: center; gap: 8px;
        }
        .service-card:hover .service-link { color: var(--red); }

        /* TESTIMONIAL */
        .testimonial-section {
          padding: 100px 64px; background: var(--warm-white);
          display: flex; align-items: center; justify-content: center;
        }
        .testimonial-inner { max-width: 720px; text-align: center; }
        .testimonial-quote-mark {
          font-family: 'Lora', serif; font-size: 100px; line-height: 0.6;
          color: var(--peach-mid); margin-bottom: 32px; display: block;
        }
        .testimonial-text {
          font-size: clamp(20px, 2.5vw, 28px); font-style: italic;
          font-weight: 500; line-height: 1.55; color: var(--ink); margin-bottom: 36px;
        }
        .testimonial-attr {
          font-family: var(--sans); font-size: 12px; letter-spacing: 0.15em;
          text-transform: uppercase; color: var(--ink-light); font-weight: 600;
        }
        .testimonial-attr span { color: var(--red); }

        /* CTA */
        .cta-section {
          background: var(--ink); padding: 120px 64px;
          position: relative; overflow: hidden;
        }
        .cta-shape-1 {
          position: absolute; width: 500px; height: 500px;
          background: var(--red); border-radius: 4px;
          right: -100px; top: -100px; transform: rotate(15deg); opacity: 0.07;
        }
        .cta-shape-2 {
          position: absolute; width: 300px; height: 300px;
          background: var(--coral); border-radius: 4px;
          right: 60px; top: -60px; transform: rotate(8deg); opacity: 0.05;
        }
        .cta-content {
          position: relative; z-index: 1; max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr auto; gap: 80px; align-items: center;
        }
        .cta-headline {
          font-size: clamp(36px, 4vw, 58px); font-weight: 600;
          color: white; line-height: 1.1; margin-bottom: 16px; letter-spacing: -0.01em;
        }
        .cta-headline em { font-style: italic; color: var(--coral-light); }
        .cta-sub {
          font-family: var(--sans); font-size: 16px;
          color: rgba(255,255,255,0.45); line-height: 1.7; max-width: 480px;
        }
        .cta-right { display: flex; flex-direction: column; gap: 16px; align-items: flex-end; }
        .btn-primary-lg {
          font-family: var(--sans); font-size: 15px; font-weight: 700; letter-spacing: 0.03em;
          background: var(--red); color: white; padding: 18px 48px; border: none;
          border-radius: 2px; cursor: pointer; transition: all 0.25s; white-space: nowrap;
          box-shadow: 0 4px 20px rgba(200,57,26,0.4);
        }
        .btn-primary-lg:hover { background: var(--coral); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(200,57,26,0.5); }
        .cta-note {
          font-family: var(--sans); font-size: 11px;
          color: rgba(255,255,255,0.25); letter-spacing: 0.08em; text-align: right;
        }

        /* FOOTER */
        .footer {
          background: #111; padding: 56px 64px;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 28px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .footer-logo-wrap { display: flex; align-items: center; }
        .footer-logo-block { position: relative; width: 36px; height: 26px; }
        .footer-card-back {
          width: 36px; height: 26px; background: var(--coral); opacity: 0.6;
          position: absolute; top: -2px; left: 2px; transform: rotate(3deg); border-radius: 2px;
        }
        .footer-card-front {
          width: 36px; height: 26px; background: var(--red);
          position: absolute; top: 0; left: 0;
          display: flex; align-items: center; justify-content: center; border-radius: 2px;
        }
        .footer-card-text { font-family: var(--sans); font-size: 9px; font-weight: 700; color: white; }
        .footer-consulting {
          font-family: var(--caveat); font-size: 18px; font-weight: 600;
          color: rgba(255,255,255,0.4); margin-left: 10px;
        }
        .footer-copy {
          font-family: var(--sans); font-size: 11px; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(255,255,255,0.2);
        }
        .footer-links { display: flex; gap: 28px; }
        .footer-links a {
          font-family: var(--sans); font-size: 11px; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(255,255,255,0.25); text-decoration: none;
          transition: color 0.3s; font-weight: 500;
        }
        .footer-links a:hover { color: var(--coral-light); }

        /* REVEAL */
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.75s ease, transform 0.75s ease; }
        .reveal.is-visible { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }
        .reveal-delay-5 { transition-delay: 0.5s; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        @media (max-width: 960px) {
          .nav { padding: 18px 24px; }
          .nav.scrolled { padding: 12px 24px; }
          .nav-links, .nav-cta { display: none; }
          .hero-content { grid-template-columns: 1fr; padding: 120px 24px 80px; gap: 48px; }
          .stats-bar { grid-template-columns: repeat(2, 1fr); }
          .about-section { grid-template-columns: 1fr; gap: 48px; padding: 80px 24px; }
          .services-section { padding: 80px 24px; }
          .services-header { flex-direction: column; align-items: flex-start; gap: 16px; }
          .services-grid { grid-template-columns: 1fr; }
          .cta-content { grid-template-columns: 1fr; }
          .cta-right { align-items: flex-start; }
          .cta-section, .testimonial-section { padding: 80px 24px; }
          .footer { padding: 40px 24px; flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => scrollTo("Home")}>
          <div className="nav-logo-block">
            <div className="logo-card-back" />
            <div className="logo-card-front">
              <span className="logo-mpr"><span className="small-m">m</span>PR</span>
            </div>
          </div>
          <span className="logo-consulting">Consulting</span>
        </div>
        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link}><a onClick={() => scrollTo(link)}>{link}</a></li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => scrollTo("Contact")}>
          Start a Campaign
        </button>
      </nav>

      {/* HERO */}
      <section id="home" className="hero" ref={heroRef}>
        <div className="hero-shapes">
          <div className="shape-1" />
          <div className="shape-2" />
          <div className="shape-3" />
        </div>
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-eyebrow">Strategic Political Consulting</div>
            <h1 className="hero-headline">
              We build campaigns<br />that <em>win.</em>
            </h1>
            <p className="hero-sub">
              Execution-driven political strategy for candidates and causes that demand more than ordinary consulting.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => scrollTo("Contact")}>
                Engage Our Team
              </button>
              <button className="btn-outline" onClick={() => scrollTo("Services")}>
                Our Services
              </button>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-card">
              <div className="hero-card-header">
                <span className="hero-card-title">Campaign Dashboard</span>
                <span className="hero-card-badge">● Live</span>
              </div>
              <div className="hero-card-body">
                {[
                  { label: "Win Probability", val: "74%", pill: "↑ +6%" },
                  { label: "Voter Contact Rate", val: "61,430", pill: "On track" },
                  { label: "Fundraising", val: "$2.4M", pill: "↑ 18%" },
                  { label: "Media Sentiment", val: "Positive", pill: "Stable" },
                ].map((row) => (
                  <div className="hero-card-stat" key={row.label}>
                    <span className="hcs-label">{row.label}</span>
                    <span className="hcs-val">
                      {row.val}
                      <span className="hcs-pill">{row.pill}</span>
                    </span>
                  </div>
                ))}
                <div className="hero-card-note">
                  MPR Intelligence Report · Updated hourly
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar">
        {STATS.map((s) => (
          <div className="stat-item" key={s.label}>
            <div className="stat-value">{s.value}<span className="stat-suffix">{s.suffix}</span></div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* MARQUEE */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) =>
            MARQUEE_ITEMS.map((item) => (
              <div className="marquee-item" key={`${i}-${item}`}>{item}</div>
            ))
          )}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" style={{ background: "var(--warm-white)" }}>
        <div className="about-section">
          <div>
            <div className="section-label reveal">About MPR</div>
            <h2 className="about-headline reveal reveal-delay-1">
              Neutral by design.<br />Relentless by nature.
            </h2>
            <p className="about-text reveal reveal-delay-2">
              MPR Consulting was founded on a single conviction: campaigns are won or lost on the quality of their execution, not their ambitions. We don't pick sides — we build structures that succeed.
            </p>
            <p className="about-text reveal reveal-delay-3">
              Our consultants have worked on federal, state, and local campaigns across the political spectrum, bringing the same rigorous, data-informed approach to every engagement.
            </p>
            <div className="about-signature reveal reveal-delay-4">MPR Consulting</div>
          </div>
          <div>
            {PRINCIPLES.map((p, i) => (
              <div className={`principle reveal reveal-delay-${i + 1}`} key={p.num}>
                <div className="principle-num">Principle {p.num}</div>
                <div className="principle-title">{p.title}</div>
                <p className="principle-text">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services-section">
        <div className="services-inner">
          <div className="services-header">
            <div>
              <div className="section-label reveal">What We Do</div>
              <h2 className="services-headline reveal reveal-delay-1">
                Full-spectrum campaign infrastructure
              </h2>
            </div>
            <p className="services-desc reveal">
              From the first poll to election night, we provide every capability a winning campaign requires.
            </p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div className={`service-card reveal reveal-delay-${(i % 3) + 1}`} key={s.number}>
                <div className="service-num">{s.number}</div>
                <div className="service-icon">{s.icon}</div>
                <div className="service-title">{s.title}</div>
                <p className="service-desc-text">{s.desc}</p>
                <div className="service-link">Learn More →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <div className="testimonial-section">
        <div className="testimonial-inner reveal">
          <span className="testimonial-quote-mark">"</span>
          <p className="testimonial-text">
            MPR didn't just advise us — they embedded with our team, built our ground operation from scratch, and delivered a 9-point swing in the final three weeks.
          </p>
          <div className="testimonial-attr">
            — Campaign Manager, <span>U.S. Senate Race · 2022</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section id="contact" className="cta-section">
        <div className="cta-shape-1" />
        <div className="cta-shape-2" />
        <div className="cta-content">
          <div>
            <div className="section-label reveal" style={{ color: "var(--coral-light)" }}>Get Started</div>
            <h2 className="cta-headline reveal reveal-delay-1">
              Your campaign deserves<br /><em>serious</em> counsel.
            </h2>
            <p className="cta-sub reveal reveal-delay-2">
              We take a limited number of engagements each cycle to ensure every client receives our full attention. Reach out early.
            </p>
          </div>
          <div className="cta-right reveal reveal-delay-2">
            <button className="btn-primary-lg">Schedule a Consultation</button>
            <p className="cta-note">Limited engagements per cycle</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo-wrap">
          <div className="footer-logo-block">
            <div className="footer-card-back" />
            <div className="footer-card-front">
              <span className="footer-card-text">mPR</span>
            </div>
          </div>
          <span className="footer-consulting">Consulting</span>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} MPR Consulting · All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
}