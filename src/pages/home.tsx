import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SERVICES = [
  {
    number: "01",
    title: "Campaign Strategy",
    desc: "From constituency profiling to caste-demographic outreach, we build winning blueprints rooted in ground realities.",
    icon: "◈",
  },
  {
    number: "02",
    title: "Ground Operations",
    desc: "Booth-level management, panna pramukh coordination, and karyakarta mobilisation backed by real-time data.",
    icon: "◉",
  },
  {
    number: "03",
    title: "Media & Narrative",
    desc: "Earned media strategy, vernacular communication, and rapid response to control the news cycle across all platforms.",
    icon: "◎",
  },
  {
    number: "04",
    title: "Digital & Social",
    desc: "WhatsApp ecosystem management, targeted social ads, and content in Hindi, Marathi, Urdu, and regional languages.",
    icon: "◈",
  },
  {
    number: "05",
    title: "Voter Research",
    desc: "Hyper-local voter segmentation, issue mapping, and sentiment surveys to identify swing blocks and consolidate base.",
    icon: "◉",
  },
  {
    number: "06",
    title: "Crisis & War Room",
    desc: "24/7 war room operations, opposition intelligence, and communications protocols to hold your position under fire.",
    icon: "◎",
  },
];

const STATS = [
  { value: "83", suffix: "%", label: "Win Rate" },
  { value: "120", suffix: "+", label: "Seats Contested" },
  { value: "9", suffix: "", label: "States Active" },
  { value: "60", suffix: "M+", label: "Voters Reached" },
];

const CAMPAIGNS = [
  {
    election: "Lok Sabha 2024",
    scope: "National",
    seats: "34 Constituencies",
    result: "28 Wins",
    color: "#c8391a",
    flag: "🇮🇳",
    video: "/src/assets/lok-sabha.mp4",
  },
  {
    election: "Maharashtra Vidhan Sabha",
    scope: "State",
    seats: "52 Seats",
    result: "41 Wins",
    color: "#e05a35",
    flag: "🗳",
    video: "/src/assets/maharashtra.mp4",
  },
  {
    election: "Delhi Assembly 2025",
    scope: "State",
    seats: "70 Seats",
    result: "22 Wins",
    color: "#b8320f",
    flag: "🏛",
    video: "/src/assets/delhi.mp4",
  },
  {
    election: "Bihar Vidhan Sabha",
    scope: "State",
    seats: "28 Seats",
    result: "22 Wins",
    color: "#d04020",
    flag: "🗺",
    // Replace with your actual file: src/assets/bihar.mp4
    video: "/src/assets/bihar.mp4",
  },
];

const PRINCIPLES = [
  {
    num: "I",
    title: "Booth Is the Basic Unit",
    text: "Every strategy cascades down to the booth level. We don't win elections — we win booths, and booths win elections.",
  },
  {
    num: "II",
    title: "Data Meets Ground Reality",
    text: "EVM-era elections are won with psephology and feet on the ground. We bridge both without compromise.",
  },
  {
    num: "III",
    title: "Speed & Discipline",
    text: "In a 60-day campaign cycle, execution discipline separates contenders from winners. We move fast without breaking structure.",
  },
];

const MARQUEE_ITEMS = [
  "Lok Sabha Elections",
  "Vidhan Sabha Campaigns",
  "Booth Management",
  "Karyakarta Mobilisation",
  "Vernacular Media",
  "Voter Outreach",
  "WhatsApp Campaigns",
  "War Room Operations",
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null);
  const navigate = useNavigate();

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
          --sans: 'DM Sans', sans-serif;
          --caveat: 'Caveat', cursive;
          --saffron: #FF9933;
          --india-green: #138808;
        }

        html { scroll-behavior: smooth; }

        /* ── HERO ── */
        .hero {
          position: relative; min-height: 100vh;
          display: flex; align-items: center;
          overflow: hidden; background: var(--warm-white);
        }
        .hero-shapes { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .shape-1 {
          position: absolute; width: 540px; height: 540px;
          background: var(--peach); border-radius: 4px;
          top: -90px; right: -70px; transform: rotate(8deg); opacity: 0.85;
        }
        .shape-2 {
          position: absolute; width: 540px; height: 540px;
          background: var(--peach-mid); border-radius: 4px;
          top: -40px; right: -20px; transform: rotate(3deg); opacity: 0.5;
        }
        .shape-3 {
          position: absolute; width: 460px; height: 460px;
          background: var(--red); border-radius: 4px;
          top: 10px; right: 60px; opacity: 0.06;
        }
        /* Ashoka Chakra watermark */
        .shape-chakra {
          position: absolute; right: 110px; top: 50%;
          transform: translateY(-50%);
          width: 320px; height: 320px;
          border-radius: 50%;
          border: 2px solid rgba(200,57,26,0.08);
          display: flex; align-items: center; justify-content: center;
          font-size: 260px; line-height: 1; opacity: 0.05;
          color: var(--red); user-select: none;
        }

        .hero-content {
          position: relative; z-index: 2;
          max-width: 1200px; margin: 0 auto; padding: 140px 64px 120px;
          width: 100%;
          display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
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
          font-size: clamp(44px, 5vw, 72px);
          font-weight: 600; line-height: 1.08; letter-spacing: -0.02em;
          margin-bottom: 28px; color: var(--ink);
          opacity: 0; animation: fadeUp 0.8s ease 0.35s forwards;
        }
        .hero-headline em { font-style: italic; color: var(--red); font-weight: 500; }
        .hero-sub {
          font-family: var(--sans);
          font-size: 17px; line-height: 1.75; color: var(--ink-mid);
          max-width: 420px; margin-bottom: 16px;
          opacity: 0; animation: fadeUp 0.8s ease 0.5s forwards;
        }
        /* Election chips */
        .hero-chips {
          display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 40px;
          opacity: 0; animation: fadeUp 0.8s ease 0.6s forwards;
        }
        .hero-chip {
          font-family: var(--sans); font-size: 11px; font-weight: 600;
          letter-spacing: 0.06em; color: var(--red);
          background: var(--peach); border: 1px solid var(--peach-mid);
          border-radius: 100px; padding: 5px 13px;
        }
        .hero-actions {
          display: flex; gap: 16px; align-items: center;
          opacity: 0; animation: fadeUp 0.8s ease 0.7s forwards;
        }
        .btn-primary {
          font-family: var(--sans); font-size: 14px; font-weight: 600; letter-spacing: 0.03em;
          background: var(--red); color: white; padding: 15px 36px; border: none;
          border-radius: 2px; cursor: pointer; transition: all 0.25s;
          box-shadow: 0 2px 12px rgba(200,57,26,0.25);
        }
        .btn-primary:hover { background: var(--red-deep); transform: translateY(-2px); box-shadow: 0 6px 24px rgba(200,57,26,0.35); }
        .btn-outline {
          font-family: var(--sans); font-size: 14px; font-weight: 600; letter-spacing: 0.03em;
          background: transparent; color: var(--ink-mid);
          padding: 15px 28px; border: 1.5px solid var(--stone); border-radius: 2px; cursor: pointer;
          transition: all 0.25s; display: flex; align-items: center; gap: 10px;
        }
        .btn-outline:hover { border-color: var(--red); color: var(--red); gap: 16px; }
        .btn-outline::after { content: '→'; }

        /* Hero card */
        .hero-right { opacity: 0; animation: fadeIn 1s ease 0.8s forwards; }
        .hero-card {
          background: white; border-radius: 4px;
          box-shadow: 0 8px 60px rgba(0,0,0,0.1), 0 2px 12px rgba(0,0,0,0.06);
          overflow: hidden; transform: rotate(0.5deg);
        }
        .hero-card-header {
          background: var(--red); padding: 22px 28px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .hero-card-title {
          font-family: var(--sans); font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.8);
        }
        .hero-card-badge {
          font-family: var(--sans); font-size: 10px; font-weight: 600;
          background: rgba(255,255,255,0.2); color: white;
          padding: 4px 10px; border-radius: 100px;
        }
        .hero-card-body { padding: 28px; }
        .hero-card-stat {
          display: flex; justify-content: space-between; align-items: center;
          padding: 16px 0; border-bottom: 1px solid var(--off-white);
        }
        .hero-card-stat:last-child { border-bottom: none; }
        .hcs-label { font-family: var(--sans); font-size: 13px; color: var(--ink-light); font-weight: 500; }
        .hcs-val {
          font-family: var(--sans); font-size: 18px; font-weight: 700; color: var(--ink);
          display: flex; align-items: center; gap: 8px;
        }
        .hcs-pill {
          font-size: 10px; font-weight: 600;
          background: var(--peach); color: var(--red); padding: 3px 8px; border-radius: 100px;
        }
        .hcs-pill.green { background: #e8f5e9; color: var(--india-green); }
        .hero-card-note {
          margin-top: 20px; padding: 12px 16px; background: var(--peach); border-radius: 3px;
          font-family: var(--sans); font-size: 11px; color: var(--red);
          font-weight: 600; text-align: center; letter-spacing: 0.04em;
        }

        /* ── STATS BAR ── */
        .stats-bar { background: var(--ink); display: grid; grid-template-columns: repeat(4, 1fr); }
        .stat-item {
          padding: 40px 48px; border-right: 1px solid rgba(255,255,255,0.07);
          position: relative;
        }
        .stat-item::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: transparent; transition: background 0.3s;
        }
        .stat-item:hover::before { background: var(--red); }
        .stat-item:last-child { border-right: none; }
        .stat-value {
          font-family: 'Lora', serif; font-size: 52px; font-weight: 700;
          color: white; line-height: 1; margin-bottom: 6px;
        }
        .stat-suffix { color: var(--coral); }
        .stat-label {
          font-family: var(--sans); font-size: 11px; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(255,255,255,0.4); font-weight: 500;
        }

        /* ── MARQUEE ── */
        .marquee-section {
          overflow: hidden; padding: 16px 0;
          background: var(--peach);
          border-top: 1px solid var(--peach-mid); border-bottom: 1px solid var(--peach-mid);
        }
        .marquee-track { display: flex; white-space: nowrap; animation: marquee 32s linear infinite; }
        .marquee-item {
          font-family: var(--sans); font-size: 12px; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--red); flex-shrink: 0;
          font-weight: 600; padding: 0 48px;
          display: flex; align-items: center; gap: 48px;
        }
        .marquee-item::after { content: '✦'; font-size: 8px; color: var(--coral-light); }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* ── CAMPAIGNS SECTION ── */
        .campaigns-section { padding: 100px 64px; background: var(--warm-white); }
        .campaigns-inner { max-width: 1200px; margin: 0 auto; }
        .section-label {
          font-family: var(--sans); font-size: 11px; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--red); margin-bottom: 20px; font-weight: 600;
          display: flex; align-items: center; gap: 12px;
        }
        .section-label::before {
          content: ''; display: block; width: 28px; height: 2px;
          background: var(--red); border-radius: 2px;
        }
        .campaigns-headline {
          font-size: clamp(32px, 3.5vw, 46px); font-weight: 600;
          color: var(--ink); margin-bottom: 56px; max-width: 600px; letter-spacing: -0.01em;
        }
        .campaigns-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;
        }
        .campaign-card {
          background: white; border-radius: 3px;
          border: 1px solid var(--stone); overflow: hidden;
          transition: all 0.3s; position: relative;
        }
        .campaign-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.09); border-color: var(--peach-mid); }
        .campaign-card-top {
          padding: 28px 32px 24px; display: flex; justify-content: space-between; align-items: flex-start;
        }
        .campaign-flag { font-size: 32px; line-height: 1; }
        .campaign-result-badge {
          font-family: var(--sans); font-size: 11px; font-weight: 700;
          letter-spacing: 0.08em; padding: 5px 12px; border-radius: 100px;
          background: #e8f5e9; color: var(--india-green);
        }
        .campaign-result-badge.ongoing { background: var(--peach); color: var(--red); }
        .campaign-election {
          font-size: 22px; font-weight: 600; color: var(--ink); margin-bottom: 6px;
          padding: 0 32px;
        }
        .campaign-meta {
          display: flex; gap: 20px; padding: 12px 32px 28px;
          border-top: 1px solid var(--off-white); margin-top: 16px;
        }
        .campaign-meta-item { display: flex; flex-direction: column; gap: 3px; }
        .campaign-meta-label {
          font-family: var(--sans); font-size: 10px; letter-spacing: 0.15em;
          text-transform: uppercase; color: var(--ink-light); font-weight: 600;
        }
        .campaign-meta-val {
          font-family: var(--sans); font-size: 14px; font-weight: 600; color: var(--ink);
        }
        .campaign-bar {
          height: 3px; background: var(--peach-mid); position: absolute; bottom: 0; left: 0; right: 0;
        }
        .campaign-bar-fill { height: 100%; transition: width 1s ease; }

        /* ── VIDEO THUMBNAIL ── */
        .campaign-video-wrap {
          position: relative; width: 100%; aspect-ratio: 16/9;
          overflow: hidden; background: #111; cursor: pointer;
        }
        .campaign-video-wrap video {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.5s ease, opacity 0.3s ease;
          opacity: 0.85;
        }
        .campaign-video-wrap:hover video { transform: scale(1.04); opacity: 1; }
        .campaign-video-overlay {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(
            to top,
            rgba(26,21,18,0.7) 0%,
            rgba(26,21,18,0.1) 50%,
            transparent 100%
          );
          transition: background 0.3s;
        }
        .campaign-video-wrap:hover .campaign-video-overlay {
          background: linear-gradient(
            to top,
            rgba(26,21,18,0.5) 0%,
            rgba(26,21,18,0.05) 40%,
            transparent 100%
          );
        }
        .campaign-play-btn {
          width: 52px; height: 52px; border-radius: 50%;
          background: rgba(255,255,255,0.92);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
          transition: transform 0.25s ease, background 0.25s;
        }
        .campaign-video-wrap:hover .campaign-play-btn {
          transform: scale(1.1); background: white;
        }
        .campaign-play-icon {
          width: 0; height: 0;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-left: 17px solid var(--red);
          margin-left: 4px;
        }
        .campaign-video-label {
          position: absolute; bottom: 12px; left: 16px;
          font-family: var(--sans); font-size: 11px; font-weight: 600;
          color: rgba(255,255,255,0.8); letter-spacing: 0.1em; text-transform: uppercase;
        }

        /* ── LIGHTBOX ── */
        .lightbox-backdrop {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(10,8,6,0.92);
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(8px);
          animation: fadeIn 0.25s ease;
        }
        .lightbox-inner {
          position: relative; width: 90vw; max-width: 1000px;
          animation: scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .lightbox-inner video {
          width: 100%; border-radius: 4px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6);
          display: block;
        }
        .lightbox-close {
          position: absolute; top: -44px; right: 0;
          background: none; border: none; cursor: pointer;
          font-family: var(--sans); font-size: 13px; font-weight: 600;
          color: rgba(255,255,255,0.6); letter-spacing: 0.1em;
          display: flex; align-items: center; gap: 8px;
          transition: color 0.2s;
        }
        .lightbox-close:hover { color: white; }
        .lightbox-close-x {
          width: 28px; height: 28px; border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; line-height: 1;
        }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.93); } to { opacity: 1; transform: scale(1); } }

        /* ── ABOUT ── */
        .about-section {
          padding: 100px 64px; background: var(--off-white);
          border-top: 1px solid var(--stone); border-bottom: 1px solid var(--stone);
        }
        .about-inner {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: start;
        }
        .about-headline {
          font-size: clamp(32px, 3.5vw, 46px); font-weight: 600;
          line-height: 1.18; margin-bottom: 28px; color: var(--ink); letter-spacing: -0.01em;
        }
        .about-text {
          font-family: var(--sans); font-size: 16px; line-height: 1.8;
          color: var(--ink-mid); margin-bottom: 18px;
        }
        .about-signature {
          margin-top: 36px; font-family: var(--caveat);
          font-size: 28px; color: var(--red); font-weight: 600;
        }
        .principle {
          padding: 26px 0; border-bottom: 1px solid var(--stone);
          transition: padding-left 0.3s; cursor: default;
        }
        .principle:first-child { padding-top: 0; }
        .principle:hover { padding-left: 12px; }
        .principle-num {
          font-family: var(--sans); font-size: 10px; color: var(--red);
          letter-spacing: 0.2em; text-transform: uppercase; font-weight: 700; margin-bottom: 10px;
        }
        .principle-title { font-size: 20px; font-weight: 600; margin-bottom: 8px; color: var(--ink); }
        .principle-text { font-family: var(--sans); font-size: 14px; color: var(--ink-light); line-height: 1.7; }

        /* ── SERVICES ── */
        .services-section { padding: 100px 64px; background: var(--warm-white); }
        .services-inner { max-width: 1200px; margin: 0 auto; }
        .services-header {
          display: flex; justify-content: space-between;
          align-items: flex-end; margin-bottom: 56px; gap: 48px;
        }
        .services-headline {
          font-size: clamp(32px, 3.5vw, 46px); font-weight: 600;
          color: var(--ink); max-width: 380px; letter-spacing: -0.01em;
        }
        .services-desc {
          font-family: var(--sans); max-width: 360px; font-size: 15px;
          color: var(--ink-mid); line-height: 1.75;
        }
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: var(--stone); }
        .service-card {
          background: white; padding: 40px 32px; transition: all 0.3s; cursor: default;
          position: relative; overflow: hidden;
        }
        .service-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
          background: var(--red); transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease;
        }
        .service-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
        .service-card:hover::after { transform: scaleX(1); }
        .service-num {
          font-family: var(--sans); font-size: 11px; color: var(--coral-light);
          letter-spacing: 0.2em; font-weight: 700; margin-bottom: 18px;
        }
        .service-icon { font-size: 18px; color: var(--red); margin-bottom: 14px; }
        .service-title { font-size: 21px; font-weight: 600; margin-bottom: 12px; color: var(--ink); }
        .service-desc-text { font-family: var(--sans); font-size: 14px; color: var(--ink-light); line-height: 1.75; }
        .service-link {
          margin-top: 24px; font-family: var(--sans); font-size: 12px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: transparent; transition: color 0.3s; display: flex; align-items: center; gap: 8px;
        }
        .service-card:hover .service-link { color: var(--red); }

        /* ── TESTIMONIAL ── */
        .testimonial-section {
          padding: 100px 64px; background: var(--off-white);
          border-top: 1px solid var(--stone); border-bottom: 1px solid var(--stone);
          display: flex; align-items: center; justify-content: center;
        }
        .testimonial-inner { max-width: 720px; text-align: center; }
        .testimonial-quote-mark {
          font-family: 'Lora', serif; font-size: 90px; line-height: 0.6;
          color: var(--peach-mid); margin-bottom: 28px; display: block;
        }
        .testimonial-text {
          font-size: clamp(20px, 2.2vw, 27px); font-style: italic;
          font-weight: 500; line-height: 1.55; color: var(--ink); margin-bottom: 32px;
        }
        .testimonial-attr {
          font-family: var(--sans); font-size: 12px; letter-spacing: 0.15em;
          text-transform: uppercase; color: var(--ink-light); font-weight: 600;
        }
        .testimonial-attr span { color: var(--red); }

        /* ── CTA ── */
        .cta-section { background: var(--ink); padding: 120px 64px; position: relative; overflow: hidden; }
        .cta-shape-1 {
          position: absolute; width: 500px; height: 500px; background: var(--red); border-radius: 4px;
          right: -100px; top: -100px; transform: rotate(15deg); opacity: 0.07;
        }
        .cta-shape-2 {
          position: absolute; width: 300px; height: 300px; background: var(--coral); border-radius: 4px;
          right: 60px; top: -60px; transform: rotate(8deg); opacity: 0.05;
        }
        /* Tricolor accent line */
        .cta-tricolor {
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, var(--saffron) 33.3%, white 33.3%, white 66.6%, var(--india-green) 66.6%);
          opacity: 0.6;
        }
        .cta-content {
          position: relative; z-index: 1; max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr auto; gap: 80px; align-items: center;
        }
        .cta-headline {
          font-size: clamp(36px, 4vw, 56px); font-weight: 600;
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

        /* ── FOOTER ── */
        .footer {
          background: #111; padding: 56px 64px;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 28px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .footer-logo-wrap { display: flex; align-items: center; }
        .footer-logo-block { position: relative; width: 38px; height: 28px; }
        .footer-card-back {
          width: 38px; height: 28px; background: var(--coral); opacity: 0.6;
          position: absolute; top: -2px; left: 2px; transform: rotate(3deg); border-radius: 2px;
        }
        .footer-card-front {
          width: 38px; height: 28px; background: var(--red);
          position: absolute; top: 0; left: 0;
          display: flex; align-items: center; justify-content: center; border-radius: 2px;
        }
        .footer-card-text { font-family: var(--sans); font-size: 10px; font-weight: 700; color: white; }
        .footer-consulting {
          font-family: var(--caveat); font-size: 19px; font-weight: 600;
          color: rgba(255,255,255,0.35); margin-left: 11px;
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

        /* ── REVEAL ── */
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.75s ease, transform 0.75s ease; }
        .reveal.is-visible { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .hero-content { grid-template-columns: 1fr; padding: 120px 24px 80px; gap: 48px; }
          .stats-bar { grid-template-columns: repeat(2, 1fr); }
          .campaigns-section, .about-section, .services-section,
          .testimonial-section, .cta-section { padding: 80px 24px; }
          .campaigns-grid { grid-template-columns: 1fr; }
          .about-inner { grid-template-columns: 1fr; gap: 48px; }
          .services-header { flex-direction: column; align-items: flex-start; gap: 16px; }
          .services-grid { grid-template-columns: 1fr; }
          .cta-content { grid-template-columns: 1fr; }
          .cta-right { align-items: flex-start; }
          .footer { padding: 40px 24px; flex-direction: column; align-items: flex-start; }
        }
      `}</style>
      {/* ── HERO ── */}
      <section id="home" className="hero" ref={heroRef}>
        <div className="hero-shapes">
          <div className="shape-1" /><div className="shape-2" /><div className="shape-3" />
          <div className="shape-chakra">☸</div>
        </div>
        <div className="hero-content">
          <div>
            <div className="hero-eyebrow">India's Political Campaign Specialists</div>
            <h1 className="hero-headline">
              From booth to<br />ballot, we <em>deliver.</em>
            </h1>
            <p className="hero-sub">
              Strategic political consulting for Indian elections — from Lok Sabha to Vidhan Sabha. We don't just advise. We operate.
            </p>
            <div className="hero-chips">
              {["Lok Sabha 2024", "Maharashtra Vidhan Sabha", "Delhi 2025", "Bihar Elections"].map((c) => (
                <span className="hero-chip" key={c}>{c}</span>
              ))}
            </div>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => navigate("/contact-us")}>
                Engage Our Team
              </button>
              <button className="btn-outline" onClick={() => scrollTo("Campaigns")}>
                Our Campaigns
              </button>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-card">
              <div className="hero-card-header">
                <span className="hero-card-title">Live Campaign Tracker</span>
                <span className="hero-card-badge">● Active</span>
              </div>
              <div className="hero-card-body">
                {[
                  { label: "Delhi 2025 — Win Probability", val: "71%", pill: "↑ +8%", green: false },
                  { label: "Booths Activated", val: "3,240", pill: "On target", green: true },
                  { label: "Voter Contacts Today", val: "1.2L", pill: "↑ 22%", green: false },
                  { label: "WhatsApp Reach", val: "8.4L", pill: "Expanding", green: true },
                ].map((row) => (
                  <div className="hero-card-stat" key={row.label}>
                    <span className="hcs-label">{row.label}</span>
                    <span className="hcs-val">
                      {row.val}
                      <span className={`hcs-pill ${row.green ? "green" : ""}`}>{row.pill}</span>
                    </span>
                  </div>
                ))}
                <div className="hero-card-note">
                  MPR War Room · Delhi Assembly 2025
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="stats-bar">
        {STATS.map((s) => (
          <div className="stat-item" key={s.label}>
            <div className="stat-value">{s.value}<span className="stat-suffix">{s.suffix}</span></div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── MARQUEE ── */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) =>
            MARQUEE_ITEMS.map((item) => (
              <div className="marquee-item" key={`${i}-${item}`}>{item}</div>
            ))
          )}
        </div>
      </div>

      {/* ── CAMPAIGNS ── */}
      <section id="campaigns" className="campaigns-section">
        <div className="campaigns-inner">
          <div className="section-label reveal">Our Track Record</div>
          <h2 className="campaigns-headline reveal reveal-delay-1">
            Campaigns fought across<br />India's biggest elections
          </h2>
          <div className="campaigns-grid">
            {CAMPAIGNS.map((c, i) => {
              const winRate = c.result === "Ongoing" ? null :
                Math.round(parseInt(c.result) / parseInt(c.seats) * 100);
              return (
                <div className={`campaign-card reveal reveal-delay-${(i % 2) + 1}`} key={c.election}>

                  {/* Video thumbnail — hover to preview, click to open lightbox */}
                  <div
                    className="campaign-video-wrap"
                    onClick={() => setLightboxVideo(c.video)}
                    onMouseEnter={(e) => {
                      const vid = e.currentTarget.querySelector("video");
                      vid?.play();
                    }}
                    onMouseLeave={(e) => {
                      const vid = e.currentTarget.querySelector("video");
                      if (vid) { vid.pause(); vid.currentTime = 0; }
                    }}
                  >
                    <video
                      src={c.video}
                      muted
                      playsInline
                      loop
                      preload="metadata"
                    />
                    <div className="campaign-video-overlay">
                      <div className="campaign-play-btn">
                        <div className="campaign-play-icon" />
                      </div>
                      <span className="campaign-video-label">Watch Campaign Reel</span>
                    </div>
                  </div>

                  <div className="campaign-card-top">
                    <span className="campaign-flag">{c.flag}</span>
                    <span className={`campaign-result-badge ${c.result === "Ongoing" ? "ongoing" : ""}`}>
                      {c.result}
                    </span>
                  </div>
                  <div className="campaign-election">{c.election}</div>
                  <div className="campaign-meta">
                    <div className="campaign-meta-item">
                      <span className="campaign-meta-label">Scope</span>
                      <span className="campaign-meta-val">{c.scope}</span>
                    </div>
                    <div className="campaign-meta-item">
                      <span className="campaign-meta-label">Seats</span>
                      <span className="campaign-meta-val">{c.seats}</span>
                    </div>
                    {winRate && (
                      <div className="campaign-meta-item">
                        <span className="campaign-meta-label">Win Rate</span>
                        <span className="campaign-meta-val" style={{ color: "var(--india-green)" }}>{winRate}%</span>
                      </div>
                    )}
                  </div>
                  <div className="campaign-bar">
                    <div className="campaign-bar-fill" style={{
                      width: winRate ? `${winRate}%` : "45%",
                      background: c.result === "Ongoing" ? "var(--coral-light)" : "var(--india-green)",
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightboxVideo && (
        <div
          className="lightbox-backdrop"
          onClick={() => setLightboxVideo(null)}
        >
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxVideo(null)}>
              CLOSE <span className="lightbox-close-x">✕</span>
            </button>
            <video
              src={lightboxVideo}
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}

      {/* ── ABOUT ── */}
      <section id="about" className="about-section">
        <div className="about-inner">
          <div>
            <div className="section-label reveal">About MPR</div>
            <h2 className="about-headline reveal reveal-delay-1">
              Neutral by ideology.<br />Unrelenting in execution.
            </h2>
            <p className="about-text reveal reveal-delay-2">
              MPR Consulting was built around one conviction: Indian elections are won on the ground, at the booth, by workers who are well-led and well-resourced. We provide the strategy, systems, and leadership that turn candidates into elected representatives.
            </p>
            <p className="about-text reveal reveal-delay-3">
              We work across party lines and ideologies, bringing data-backed discipline to every engagement — whether it's a Lok Sabha constituency or a tough Vidhan Sabha seat.
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

      {/* ── SERVICES ── */}
      <section id="services" className="services-section">
        <div className="services-inner">
          <div className="services-header">
            <div>
              <div className="section-label reveal">What We Do</div>
              <h2 className="services-headline reveal reveal-delay-1">
                Full-cycle campaign capability
              </h2>
            </div>
            <p className="services-desc reveal">
              From nomination filing to counting day, we deliver every function a winning Indian campaign needs.
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

      {/* ── TESTIMONIAL ── */}
      <div className="testimonial-section">
        <div className="testimonial-inner reveal">
          <span className="testimonial-quote-mark">"</span>
          <p className="testimonial-text">
            MPR set up our booth committee structure across 480 booths in 6 weeks. On polling day, our turnout in targeted villages was 14 points above the district average.
          </p>
          <div className="testimonial-attr">
            — Campaign Coordinator, <span>Maharashtra Vidhan Sabha · 2024</span>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <section id="contact" className="cta-section">
        <div className="cta-tricolor" />
        <div className="cta-shape-1" /><div className="cta-shape-2" />
        <div className="cta-content">
          <div>
            <div className="section-label reveal" style={{ color: "var(--coral-light)" }}>Get Started</div>
            <h2 className="cta-headline reveal reveal-delay-1">
              Your constituency deserves<br /><em>serious</em> counsel.
            </h2>
            <p className="cta-sub reveal reveal-delay-2">
              We take a limited number of engagements each election cycle to ensure every client receives our full attention and resources. Early conversations are always better.
            </p>
          </div>
          <div className="cta-right reveal reveal-delay-2">
            <button className="btn-primary-lg" onClick={() => navigate("/contact-us")}>Schedule a Consultation</button>
            <p className="cta-note">Limited engagements per election cycle</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
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