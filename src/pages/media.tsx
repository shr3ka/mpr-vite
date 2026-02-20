import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────
//  DATA  — swap src paths with your actual assets
// ─────────────────────────────────────────────
const ELECTIONS = [
  {
    id: "lok-sabha",
    title: "Lok Sabha 2024",
    scope: "National · 7 Constituencies",
    result: "3 Wins",
    color: "#c8391a",
    accent: "#e05a35",
    images: [
      { src: "/src/assets/lok-sabha/img1.jpg", caption: "Rally at Ramlila Maidan, New Delhi" },
      { src: "/src/assets/lok-sabha/img2.jpg", caption: "Voter outreach, Eastern UP" },
      { src: "/src/assets/lok-sabha/img3.jpg", caption: "Booth committee training, Bihar" },
      { src: "/src/assets/lok-sabha/img4.jpg", caption: "Ground team briefing, Punjab" },
      { src: "/src/assets/lok-sabha/img5.jpg", caption: "Victory celebration, New Delhi" },
    ],
  },
  {
    id: "maharashtra",
    title: "Maharashtra Vidhan Sabha",
    scope: "State · 52 Seats",
    result: "41 Wins",
    color: "#b05e1a",
    accent: "#d4801e",
    images: [
      { src: "/src/assets/maharashtra/img1.jpg", caption: "Door-to-door campaign, Pune" },
      { src: "/src/assets/maharashtra/img2.jpg", caption: "Karyakarta rally, Nashik" },
      { src: "/src/assets/maharashtra/img3.jpg", caption: "Media briefing, Mumbai" },
      { src: "/src/assets/maharashtra/img4.jpg", caption: "Counting day, Nagpur" },
      { src: "/src/assets/maharashtra/img5.jpg", caption: "Victory parade, Aurangabad" },
    ],
  },
  {
    id: "delhi",
    title: "Delhi Assembly 2025",
    scope: "State · 18 Seats",
    result: "Ongoing",
    color: "#8b1a1a",
    accent: "#b52020",
    images: [
      { src: "/src/assets/delhi/img1.jpg", caption: "Campaign launch, Connaught Place" },
      { src: "/src/assets/delhi/img2.jpg", caption: "Ward-level meeting, East Delhi" },
      { src: "/src/assets/delhi/img3.jpg", caption: "Social media war room" },
      { src: "/src/assets/delhi/img4.jpg", caption: "Volunteer training, North Delhi" },
    ],
  },
  {
    id: "bihar",
    title: "Bihar Vidhan Sabha",
    scope: "State · 28 Seats",
    result: "22 Wins",
    color: "#5a3a0a",
    accent: "#8b5c1a",
    images: [
      { src: "/src/assets/bihar/img1.jpg", caption: "Panchayat outreach, Patna district" },
      { src: "/src/assets/bihar/img2.jpg", caption: "Women voters event, Muzaffarpur" },
      { src: "/src/assets/bihar/img3.jpg", caption: "Booth management drill" },
      { src: "/src/assets/bihar/img4.jpg", caption: "Results night, Patna" },
      { src: "/src/assets/bihar/img5.jpg", caption: "Post-election debrief" },
    ],
  },
];

// ─────────────────────────────────────────────
//  CAROUSEL COMPONENT
// ─────────────────────────────────────────────
type CarouselProps = {
  images: { src: string; caption: string }[];
  accentColor: string;
  onImageClick: (index: number) => void;
};

function Carousel({ images, accentColor, onImageClick }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((index + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 420);
  }, [isAnimating, images.length]);

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  // Drag / swipe
  const onDragStart = (clientX: number) => {
    setIsDragging(true);
    setDragStart(clientX);
    setDragOffset(0);
  };
  const onDragMove = (clientX: number) => {
    if (!isDragging) return;
    setDragOffset(clientX - dragStart);
  };
  const onDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -60) next();
    else if (dragOffset > 60) prev();
    setDragOffset(0);
  };

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current]);

  const visibleIndices = [
    (current - 1 + images.length) % images.length,
    current,
    (current + 1) % images.length,
  ];

  return (
    <div className="carousel-root">
      {/* Main stage */}
      <div
        className="carousel-stage"
        ref={trackRef}
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseMove={(e) => onDragMove(e.clientX)}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
        onTouchEnd={onDragEnd}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {/* Prev thumbnail */}
        {images.length > 1 && (
          <div
            className="carousel-side carousel-side-left"
            onClick={prev}
            style={{
              transform: `translateX(calc(-100% - 16px + ${isDragging ? dragOffset * 0.15 : 0}px))`,
            }}
          >
            <img src={images[visibleIndices[0]].src} alt="" draggable={false} />
            <div className="carousel-side-overlay" />
          </div>
        )}

        {/* Main image */}
        <div
          className="carousel-main"
          style={{
            transform: `translateX(${isDragging ? dragOffset * 0.3 : 0}px)`,
            transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
          onClick={() => !isDragging && onImageClick(current)}
        >
          <div className="carousel-img-wrap">
            <img
              key={current}
              src={images[current].src}
              alt={images[current].caption}
              draggable={false}
              className="carousel-img"
              style={{ animation: "carouselFadeIn 0.4s ease" }}
            />
            <div className="carousel-img-overlay" style={{ background: `linear-gradient(to top, ${accentColor}cc 0%, transparent 50%)` }} />
            <div className="carousel-zoom-hint">
              <span>⊕</span> View full
            </div>
          </div>
          <div className="carousel-caption">{images[current].caption}</div>
        </div>

        {/* Next thumbnail */}
        {images.length > 1 && (
          <div
            className="carousel-side carousel-side-right"
            onClick={next}
            style={{
              transform: `translateX(calc(100% + 16px + ${isDragging ? dragOffset * 0.15 : 0}px))`,
            }}
          >
            <img src={images[visibleIndices[2]].src} alt="" draggable={false} />
            <div className="carousel-side-overlay" />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="carousel-controls">
        <button className="carousel-arrow" onClick={prev} aria-label="Previous">
          ←
        </button>

        {/* Dot indicators */}
        <div className="carousel-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === current ? "active" : ""}`}
              onClick={() => goTo(i)}
              style={{ background: i === current ? accentColor : undefined }}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>

        <button className="carousel-arrow" onClick={next} aria-label="Next">
          →
        </button>
      </div>

      {/* Counter */}
      <div className="carousel-counter" style={{ color: accentColor }}>
        {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  LIGHTBOX COMPONENT
// ─────────────────────────────────────────────
type LightboxProps = {
  election: typeof ELECTIONS[0];
  initialIndex: number;
  onClose: () => void;
};

function Lightbox({ election, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const images = election.images;

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [index]);

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="lightbox-header">
          <div className="lightbox-election-title">{election.title}</div>
          <button className="lightbox-close" onClick={onClose}>✕</button>
        </div>

        {/* Image */}
        <div className="lightbox-img-wrap">
          <img
            key={index}
            src={images[index].src}
            alt={images[index].caption}
            className="lightbox-img"
          />
          {/* Prev / Next */}
          <button className="lightbox-nav lightbox-nav-prev" onClick={prev}>←</button>
          <button className="lightbox-nav lightbox-nav-next" onClick={next}>→</button>
        </div>

        {/* Footer */}
        <div className="lightbox-footer">
          <p className="lightbox-caption">{images[index].caption}</p>
          <span className="lightbox-count" style={{ color: election.accent }}>
            {index + 1} / {images.length}
          </span>
        </div>

        {/* Thumbnail strip */}
        <div className="lightbox-thumbs">
          {images.map((img, i) => (
            <div
              key={i}
              className={`lightbox-thumb ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
              style={{ borderColor: i === index ? election.accent : "transparent" }}
            >
              <img src={img.src} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  MAIN PAGE
// ─────────────────────────────────────────────
export default function Media() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(ELECTIONS[0].id);
  const [lightbox, setLightbox] = useState<{ electionId: string; imageIndex: number } | null>(null);

  const activeElection = ELECTIONS.find((e) => e.id === activeTab)!;

  const openLightbox = (electionId: string, imageIndex: number) => {
    setLightbox({ electionId, imageIndex });
  };

  return (
    <div style={{ fontFamily: "'Lora', Georgia, serif", background: "#faf9f7", color: "#1a1512", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=Caveat:wght@600&display=swap');

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
          --india-green: #138808;
          --sans: 'DM Sans', sans-serif;
          --caveat: 'Caveat', cursive;
        }

        html { scroll-behavior: smooth; }

        /* ── PAGE HERO ── */
        .media-hero {
          background: var(--ink); padding: 140px 64px 72px;
          position: relative; overflow: hidden;
        }
        .media-hero-tricolor {
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, #FF9933 33.3%, white 33.3%, white 66.6%, #138808 66.6%);
          opacity: 0.7;
        }
        .media-hero-bg-shapes { position: absolute; inset: 0; pointer-events: none; }
        .mhbs-1 {
          position: absolute; width: 420px; height: 420px;
          background: var(--red); border-radius: 4px;
          right: -80px; top: -80px; transform: rotate(12deg); opacity: 0.07;
        }
        .mhbs-2 {
          position: absolute; width: 260px; height: 260px;
          background: var(--coral); border-radius: 4px;
          right: 80px; top: -40px; transform: rotate(5deg); opacity: 0.05;
        }
        .media-hero-inner {
          max-width: 1200px; margin: 0 auto; position: relative; z-index: 1;
          display: flex; justify-content: space-between; align-items: flex-end; gap: 40px;
          flex-wrap: wrap;
        }
        .media-breadcrumb {
          font-family: var(--sans); font-size: 12px; letter-spacing: 0.15em;
          text-transform: uppercase; color: rgba(255,255,255,0.3);
          display: flex; align-items: center; gap: 10px; margin-bottom: 24px; font-weight: 500;
        }
        .media-breadcrumb-home { cursor: pointer; transition: color 0.2s; }
        .media-breadcrumb-home:hover { color: var(--coral-light); }
        .media-hero-label {
          font-family: var(--sans); font-size: 11px; letter-spacing: 0.25em;
          text-transform: uppercase; color: var(--coral-light); font-weight: 600;
          display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
        }
        .media-hero-label::before {
          content: ''; display: block; width: 28px; height: 2px;
          background: var(--coral-light); border-radius: 2px;
        }
        .media-hero-title {
          font-size: clamp(36px, 4.5vw, 58px); font-weight: 600;
          color: white; line-height: 1.1; letter-spacing: -0.02em;
        }
        .media-hero-title em { font-style: italic; color: var(--coral-light); }
        .media-hero-sub {
          font-family: var(--sans); font-size: 15px; color: rgba(255,255,255,0.4);
          line-height: 1.7; max-width: 360px; margin-top: 10px;
        }
        .media-hero-stats {
          display: flex; gap: 40px; flex-shrink: 0;
        }
        .mhs-item { text-align: right; }
        .mhs-val {
          font-family: 'Lora', serif; font-size: 44px; font-weight: 700;
          color: white; line-height: 1;
        }
        .mhs-val span { color: var(--coral-light); }
        .mhs-label {
          font-family: var(--sans); font-size: 10px; letter-spacing: 0.2em;
          text-transform: uppercase; color: rgba(255,255,255,0.35); font-weight: 600;
          margin-top: 4px;
        }

        /* ── ELECTION TABS ── */
        .media-tabs-bar {
          background: white; border-bottom: 1px solid var(--stone);
          position: sticky; top: 64px; z-index: 50;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .media-tabs-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 64px;
          display: flex; gap: 0; overflow-x: auto;
          scrollbar-width: none;
        }
        .media-tabs-inner::-webkit-scrollbar { display: none; }
        .media-tab {
          font-family: var(--sans); font-size: 13px; font-weight: 600;
          letter-spacing: 0.03em; color: var(--ink-light);
          padding: 20px 28px; border: none; background: none; cursor: pointer;
          white-space: nowrap; position: relative;
          transition: color 0.25s; border-bottom: 2px solid transparent;
          margin-bottom: -1px;
        }
        .media-tab:hover { color: var(--ink); }
        .media-tab.active { color: var(--red); border-bottom-color: var(--red); }
        .media-tab-result {
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
          padding: 2px 8px; border-radius: 100px; margin-left: 8px;
          background: var(--peach); color: var(--red);
        }
        .media-tab-result.ongoing { background: #fff3e0; color: #e65100; }

        /* ── CAROUSEL SECTION ── */
        .media-body {
          max-width: 1200px; margin: 0 auto; padding: 72px 64px 100px;
        }
        .media-section-header {
          display: flex; justify-content: space-between; align-items: flex-end;
          margin-bottom: 48px; gap: 24px; flex-wrap: wrap;
        }
        .media-section-title {
          font-size: clamp(28px, 3vw, 40px); font-weight: 600;
          color: var(--ink); letter-spacing: -0.01em;
        }
        .media-section-meta {
          font-family: var(--sans); font-size: 13px; color: var(--ink-light);
          margin-top: 6px; display: flex; align-items: center; gap: 16px;
        }
        .media-section-scope { }
        .media-section-result {
          font-weight: 700; color: var(--india-green);
          display: flex; align-items: center; gap: 6px;
        }
        .media-section-result.ongoing { color: var(--red); }
        .media-section-result::before { content: '✦'; font-size: 8px; }
        .media-section-count {
          font-family: var(--sans); font-size: 13px; color: var(--ink-light);
        }

        /* ── CAROUSEL STYLES ── */
        .carousel-root { position: relative; user-select: none; }

        .carousel-stage {
          position: relative; height: 520px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; border-radius: 4px;
        }

        /* Side peek images */
        .carousel-side {
          position: absolute; width: 22%; height: 80%;
          top: 10%; border-radius: 3px; overflow: hidden;
          cursor: pointer; z-index: 1;
          transition: transform 0.42s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.3s;
          opacity: 0.5;
        }
        .carousel-side:hover { opacity: 0.7; }
        .carousel-side-left { left: 0; }
        .carousel-side-right { right: 0; }
        .carousel-side img {
          width: 100%; height: 100%; object-fit: cover;
          pointer-events: none;
        }
        .carousel-side-overlay {
          position: absolute; inset: 0;
          background: rgba(250,249,247,0.5);
          transition: background 0.3s;
        }
        .carousel-side:hover .carousel-side-overlay { background: rgba(250,249,247,0.2); }

        /* Main image */
        .carousel-main {
          position: relative; width: 72%; height: 100%;
          z-index: 2; flex-shrink: 0;
          border-radius: 4px; overflow: hidden;
        }
        .carousel-img-wrap {
          width: 100%; height: calc(100% - 48px);
          position: relative; overflow: hidden; border-radius: 4px;
        }
        .carousel-img {
          width: 100%; height: 100%; object-fit: cover;
          display: block; pointer-events: none;
        }
        .carousel-img-overlay {
          position: absolute; inset: 0; pointer-events: none;
        }
        .carousel-zoom-hint {
          position: absolute; top: 16px; right: 16px;
          font-family: var(--sans); font-size: 11px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          background: rgba(255,255,255,0.9); color: var(--ink-mid);
          padding: 7px 14px; border-radius: 100px;
          opacity: 0; transition: opacity 0.25s;
          pointer-events: none;
        }
        .carousel-main:hover .carousel-zoom-hint { opacity: 1; }
        .carousel-caption {
          height: 48px; display: flex; align-items: center;
          font-family: var(--sans); font-size: 13px; color: var(--ink-light);
          padding: 0 4px; font-style: italic;
        }

        /* Controls */
        .carousel-controls {
          display: flex; align-items: center; justify-content: center;
          gap: 20px; margin-top: 24px;
        }
        .carousel-arrow {
          width: 44px; height: 44px; border-radius: 50%;
          border: 1.5px solid var(--stone); background: white;
          font-size: 18px; cursor: pointer; color: var(--ink-mid);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; flex-shrink: 0;
        }
        .carousel-arrow:hover {
          border-color: var(--red); color: var(--red);
          box-shadow: 0 4px 16px rgba(200,57,26,0.15);
          transform: translateY(-1px);
        }
        .carousel-dots {
          display: flex; gap: 8px; align-items: center;
        }
        .carousel-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--stone); border: none; cursor: pointer;
          transition: all 0.25s; padding: 0;
        }
        .carousel-dot.active { transform: scale(1.4); }
        .carousel-dot:hover:not(.active) { background: var(--ink-light) !important; }
        .carousel-counter {
          text-align: right;
          font-family: var(--sans); font-size: 12px; font-weight: 700;
          letter-spacing: 0.15em; margin-top: 12px;
        }

        /* ── ALL ELECTIONS GRID (below tabs) ── */
        .media-all-grid {
          max-width: 1200px; margin: 0 auto; padding: 0 64px 100px;
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 48px;
        }
        .media-grid-election { }
        .media-grid-election-label {
          font-family: var(--sans); font-size: 11px; letter-spacing: 0.2em;
          text-transform: uppercase; font-weight: 700; margin-bottom: 16px;
          display: flex; align-items: center; gap: 10px;
        }
        .media-grid-election-label::before {
          content: ''; display: block; width: 20px; height: 2px; border-radius: 2px;
        }
        .media-mini-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;
        }
        .media-mini-img {
          aspect-ratio: 4/3; overflow: hidden; border-radius: 2px;
          cursor: pointer; position: relative;
        }
        .media-mini-img img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.4s ease; display: block;
        }
        .media-mini-img:hover img { transform: scale(1.06); }
        .media-mini-img-overlay {
          position: absolute; inset: 0; background: transparent;
          transition: background 0.3s;
          display: flex; align-items: center; justify-content: center;
        }
        .media-mini-img:hover .media-mini-img-overlay {
          background: rgba(0,0,0,0.2);
        }
        .media-mini-img-icon {
          color: white; font-size: 22px; opacity: 0;
          transition: opacity 0.3s; text-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }
        .media-mini-img:hover .media-mini-img-icon { opacity: 1; }

        /* ── LIGHTBOX ── */
        .lightbox-backdrop {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(8,6,4,0.94);
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(10px);
          animation: fadeIn 0.2s ease;
        }
        .lightbox-inner {
          width: 90vw; max-width: 980px; display: flex; flex-direction: column;
          animation: scaleIn 0.28s cubic-bezier(0.34,1.4,0.64,1);
        }
        .lightbox-header {
          display: flex; justify-content: space-between; align-items: center;
          padding-bottom: 16px;
        }
        .lightbox-election-title {
          font-family: var(--sans); font-size: 13px; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }
        .lightbox-close {
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.7); width: 36px; height: 36px; border-radius: 50%;
          font-size: 14px; cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center;
        }
        .lightbox-close:hover { background: rgba(255,255,255,0.2); color: white; }
        .lightbox-img-wrap {
          position: relative; border-radius: 3px; overflow: hidden;
          background: #111; aspect-ratio: 16/9;
        }
        .lightbox-img {
          width: 100%; height: 100%; object-fit: contain; display: block;
          animation: carouselFadeIn 0.3s ease;
        }
        .lightbox-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 48px; height: 48px; border-radius: 50%;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
          color: white; font-size: 20px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .lightbox-nav:hover { background: rgba(255,255,255,0.2); }
        .lightbox-nav-prev { left: 16px; }
        .lightbox-nav-next { right: 16px; }
        .lightbox-footer {
          display: flex; justify-content: space-between; align-items: center;
          padding: 16px 0 12px;
        }
        .lightbox-caption {
          font-family: var(--sans); font-size: 14px; color: rgba(255,255,255,0.5);
          font-style: italic;
        }
        .lightbox-count {
          font-family: var(--sans); font-size: 13px; font-weight: 700;
          letter-spacing: 0.1em;
        }
        .lightbox-thumbs {
          display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px;
          scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.2) transparent;
        }
        .lightbox-thumb {
          width: 72px; height: 48px; flex-shrink: 0; border-radius: 2px;
          overflow: hidden; cursor: pointer; border: 2px solid transparent;
          transition: border-color 0.2s, opacity 0.2s; opacity: 0.5;
        }
        .lightbox-thumb.active { opacity: 1; }
        .lightbox-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* ── FOOTER ── */
        .media-footer {
          background: #111; padding: 40px 64px;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 20px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .mf-logo { display: flex; align-items: center; }
        .mf-logo-block { position: relative; width: 34px; height: 24px; }
        .mf-card-back {
          width: 34px; height: 24px; background: var(--coral); opacity: 0.6;
          position: absolute; top: -2px; left: 2px; transform: rotate(3deg); border-radius: 2px;
        }
        .mf-card-front {
          width: 34px; height: 24px; background: var(--red);
          position: absolute; top: 0; left: 0;
          display: flex; align-items: center; justify-content: center; border-radius: 2px;
        }
        .mf-card-text { font-family: var(--sans); font-size: 9px; font-weight: 700; color: white; }
        .mf-consulting {
          font-family: var(--caveat); font-size: 17px; font-weight: 600;
          color: rgba(255,255,255,0.35); margin-left: 10px;
        }
        .mf-copy {
          font-family: var(--sans); font-size: 11px; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(255,255,255,0.2);
        }

        /* ── UTILS ── */
        @keyframes carouselFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }

        @media (max-width: 960px) {
          .media-hero { padding: 120px 24px 56px; }
          .media-hero-stats { display: none; }
          .media-tabs-inner { padding: 0 24px; }
          .media-body { padding: 48px 24px 72px; }
          .carousel-stage { height: 320px; }
          .carousel-side { display: none; }
          .carousel-main { width: 100%; }
          .media-all-grid { grid-template-columns: 1fr; padding: 0 24px 72px; }
          .media-footer { padding: 32px 24px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <div className="media-hero">
        <div className="media-hero-tricolor" />
        <div className="media-hero-bg-shapes">
          <div className="mhbs-1" /><div className="mhbs-2" />
        </div>
        <div className="media-hero-inner">
          <div>
            <div className="media-breadcrumb">
              <span className="media-breadcrumb-home" onClick={() => navigate("/")}>Home</span>
              <span>›</span>
              <span>Media</span>
            </div>
            <div className="media-hero-label">Campaign Gallery</div>
            <h1 className="media-hero-title">
              On the ground,<br />across <em>Bharat.</em>
            </h1>
            <p className="media-hero-sub">
              A visual record of our campaigns — rallies, booth operations, war rooms, and counting day victories.
            </p>
          </div>
          <div className="media-hero-stats">
            <div className="mhs-item">
              <div className="mhs-val">120<span>+</span></div>
              <div className="mhs-label">Photos</div>
            </div>
            <div className="mhs-item">
              <div className="mhs-val">4</div>
              <div className="mhs-label">Elections</div>
            </div>
            <div className="mhs-item">
              <div className="mhs-val">83<span>%</span></div>
              <div className="mhs-label">Win Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="media-tabs-bar">
        <div className="media-tabs-inner">
          {ELECTIONS.map((e) => (
            <button
              key={e.id}
              className={`media-tab ${activeTab === e.id ? "active" : ""}`}
              onClick={() => setActiveTab(e.id)}
            >
              {e.title}
              <span className={`media-tab-result ${e.result === "Ongoing" ? "ongoing" : ""}`}>
                {e.result}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── FEATURED CAROUSEL ── */}
      <div className="media-body">
        <div className="media-section-header">
          <div>
            <h2 className="media-section-title">{activeElection.title}</h2>
            <div className="media-section-meta">
              <span className="media-section-scope">{activeElection.scope}</span>
              <span className={`media-section-result ${activeElection.result === "Ongoing" ? "ongoing" : ""}`}>
                {activeElection.result}
              </span>
            </div>
          </div>
          <span className="media-section-count">
            {activeElection.images.length} photos
          </span>
        </div>

        <Carousel
          key={activeTab}
          images={activeElection.images}
          accentColor={activeElection.accent}
          onImageClick={(index) => openLightbox(activeElection.id, index)}
        />
      </div>

      {/* ── ALL ELECTIONS MINI GRIDS ── */}
      <div className="media-all-grid">
        {ELECTIONS.map((election) => (
          <div className="media-grid-election" key={election.id}>
            <div
              className="media-grid-election-label"
              style={{ color: election.color }}
            >
              <span style={{ display: "inline-block", width: 20, height: 2, background: election.color, borderRadius: 2 }} />
              {election.title}
            </div>
            <div className="media-mini-grid">
              {election.images.slice(0, 6).map((img, i) => (
                <div
                  className="media-mini-img"
                  key={i}
                  onClick={() => openLightbox(election.id, i)}
                >
                  <img src={img.src} alt={img.caption} />
                  <div className="media-mini-img-overlay">
                    <span className="media-mini-img-icon">⊕</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (() => {
        const election = ELECTIONS.find((e) => e.id === lightbox.electionId)!;
        return (
          <Lightbox
            election={election}
            initialIndex={lightbox.imageIndex}
            onClose={() => setLightbox(null)}
          />
        );
      })()}

      {/* ── FOOTER ── */}
      <footer className="media-footer">
        <div className="mf-logo">
          <div className="mf-logo-block">
            <div className="mf-card-back" />
            <div className="mf-card-front">
              <span className="mf-card-text">mPR</span>
            </div>
          </div>
          <span className="mf-consulting">Consulting</span>
        </div>
        <p className="mf-copy">© {new Date().getFullYear()} MPR Consulting · All rights reserved.</p>
      </footer>
    </div>
  );
}