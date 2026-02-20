import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NAV_LINKS = ["Home", "About", "Campaigns", "Services", "Contact"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Caveat:wght@600&display=swap');

        :root {
          --red: #c8391a;
          --red-deep: #a82d12;
          --coral: #e05a35;
          --coral-light: #f0795a;
          --peach: #fde8e0;
          --warm-white: #faf9f7;
          --stone: #e8e2d8;
          --ink: #1a1512;
          --ink-mid: #4a3f35;
          --ink-light: #8a7a6e;
          --sans: 'DM Sans', sans-serif;
          --caveat: 'Caveat', cursive;
        }

        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 64px;
          transition: all 0.4s ease;
          /* Frosted glass — always on */
          background: rgba(250, 249, 247, 0.55);
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.45);
        }
        .nav.scrolled {
          background: rgba(250, 249, 247, 0.82);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid rgba(200, 57, 26, 0.1);
          padding: 13px 64px;
          box-shadow: 0 4px 32px rgba(0, 0, 0, 0.08);
        }

        /* Logo */
        .nav-logo {
          display: flex; align-items: center;
          text-decoration: none; cursor: pointer; gap: 0;
          flex-shrink: 0;
        }
        .nav-logo-block {
          position: relative; width: 50px; height: 36px;
        }
        .logo-card-back {
          width: 50px; height: 36px;
          background: var(--coral);
          position: absolute; top: -3px; left: 3px;
          transform: rotate(3deg); border-radius: 2px;
        }
        .logo-card-front {
          width: 50px; height: 36px;
          background: var(--red);
          position: absolute; top: 0; left: 0;
          display: flex; align-items: center; justify-content: center;
          border-radius: 2px;
        }
        .logo-mpr {
          font-family: var(--sans);
          font-size: 14px; font-weight: 700;
          color: white; letter-spacing: -0.02em; line-height: 1;
          user-select: none;
        }
        .logo-mpr .small-m { font-size: 10px; vertical-align: middle; }
        .logo-consulting {
          font-family: var(--caveat);
          font-size: 23px; font-weight: 600;
          color: var(--coral); margin-left: 13px;
          user-select: none;
        }

        /* Desktop links */
        .nav-links {
          display: flex; gap: 36px; list-style: none;
          align-items: center;
        }
        .nav-links a {
          font-family: var(--sans);
          font-size: 13px; letter-spacing: 0.03em;
          color: var(--ink-mid); text-decoration: none;
          transition: color 0.25s; cursor: pointer; font-weight: 500;
          position: relative; padding-bottom: 2px;
        }
        .nav-links a::after {
          content: ''; position: absolute;
          bottom: -2px; left: 0; right: 0; height: 2px;
          background: var(--red); border-radius: 2px;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.25s ease;
        }
        .nav-links a:hover { color: var(--red); }
        .nav-links a:hover::after { transform: scaleX(1); }

        /* Election badge in nav */
        .nav-election-badge {
          display: flex; align-items: center; gap: 8px;
          background: var(--peach); border: 1px solid rgba(200,57,26,0.15);
          border-radius: 100px; padding: 5px 14px 5px 8px;
          font-family: var(--sans); font-size: 11px; font-weight: 600;
          color: var(--red); letter-spacing: 0.04em;
          white-space: nowrap;
          margin-bottom: 8px;
        }
        .nav-election-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--red); flex-shrink: 0;
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        /* CTA button */
        .nav-cta {
          font-family: var(--sans);
          font-size: 13px; font-weight: 600; letter-spacing: 0.04em;
          background: var(--red); border: none;
          color: white; padding: 10px 22px;
          border-radius: 2px; cursor: pointer;
          transition: all 0.25s; flex-shrink: 0;
        }
        .nav-cta:hover {
          background: var(--red-deep);
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(200,57,26,0.3);
        }

        /* Mobile hamburger */
        .nav-hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .nav-hamburger span {
          display: block; width: 22px; height: 2px;
          background: var(--ink); border-radius: 2px;
          transition: all 0.3s ease;
        }
        .nav-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nav-hamburger.open span:nth-child(2) { opacity: 0; }
        .nav-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile menu */
        .nav-mobile {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99;
          background: var(--warm-white);
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          gap: 8px;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);
        }
        .nav-mobile.open { transform: translateX(0); }
        .nav-mobile a {
          font-family: 'Lora', serif;
          font-size: 36px; font-weight: 500;
          color: var(--ink); text-decoration: none; cursor: pointer;
          padding: 10px 0; transition: color 0.25s;
          letter-spacing: -0.01em;
        }
        .nav-mobile a:hover { color: var(--red); }
        .nav-mobile-cta {
          margin-top: 32px;
          font-family: var(--sans); font-size: 14px; font-weight: 600;
          background: var(--red); color: white; border: none;
          padding: 14px 40px; border-radius: 2px; cursor: pointer;
          transition: background 0.25s;
        }
        .nav-mobile-cta:hover { background: var(--red-deep); }

        @media (max-width: 960px) {
          .nav { padding: 18px 24px; }
          .nav.scrolled { padding: 12px 24px; }
          .nav-links, .nav-cta, .nav-election-badge { display: none; }
          .nav-hamburger { display: flex; }
        }
      `}</style>

      {/* Desktop Nav */}
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
            <li key={link}>
              <a onClick={() => scrollTo(link)}>{link}</a>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button className="nav-cta" onClick={() => navigate("/contact-us")}>
            Get in Touch
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`nav-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <div className={`nav-mobile ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <a key={link} onClick={() => scrollTo(link)}>{link}</a>
        ))}
        <button className="nav-mobile-cta" onClick={() => navigate("/contact-us")}>
          Get in Touch
        </button>
      </div>
    </>
  );
}