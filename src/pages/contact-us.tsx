import { useState } from "react";
import { useNavigate } from "react-router";

const CONTACT_INFO = [
  {
    icon: "✦",
    label: "New Delhi Office",
    value: "Janpath Road, Connaught Place\nNew Delhi – 110 001",
    link: null,
  },
  {
    icon: "✦",
    label: "Mumbai Office",
    value: "Nariman Point\nMumbai – 400 021",
    link: null,
  },
  {
    icon: "✦",
    label: "Email",
    value: "engage@mprconsulting.in",
    link: "mailto:engage@mprconsulting.in",
  },
  {
    icon: "✦",
    label: "Phone",
    value: "+91 99816 86545",
    link: "tel:+919981686545",
  },
];

const SERVICES_LIST = [
  "Campaign Strategy",
  "Ground Operations",
  "Media & Narrative",
  "Digital & Social Outreach",
  "Voter Research",
  "Crisis & War Room",
];

const ELECTIONS = [
  "Lok Sabha",
  "Vidhan Sabha",
  "Municipal / Local Body",
  "By-Election",
  "Other",
];

type FormState = {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  election: string;
  service: string;
  message: string;
};

export default function ContactUs() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    name: "",
    organisation: "",
    email: "",
    phone: "",
    election: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!form.name || !form.email || !form.phone) return;

  setSubmitted(true); // shows loading state immediately

  try {
    const res = await fetch("https://formspree.io/f/mreaarpj", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      setSubmitted(false);
      alert("Something went wrong. Please try again.");
    }
  } catch {
    setSubmitted(false);
    alert("Network error. Please try again.");
  }
};

  return (
    <div style={{ fontFamily: "'Lora', Georgia, serif", background: "#faf9f7", color: "#1a1512", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&family=Caveat:wght@600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --red: #c8391a; --red-deep: #a82d12;
          --coral: #e05a35; --coral-light: #f0795a;
          --peach: #fde8e0; --peach-mid: #f8d4c8;
          --warm-white: #faf9f7; --off-white: #f3f0eb; --stone: #e8e2d8;
          --ink: #1a1512; --ink-mid: #4a3f35; --ink-light: #8a7a6e;
          --sans: 'DM Sans', sans-serif; --caveat: 'Caveat', cursive;
          --saffron: #FF9933; --india-green: #138808;
        }

        /* ── TOP BAR ── */
        .cu-topbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 64px;
          background: rgba(250,249,247,0.6);
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
          border-bottom: 1px solid rgba(255,255,255,0.5);
        }
        .cu-back-btn {
          font-family: var(--sans); font-size: 13px; font-weight: 600;
          color: var(--ink-mid); background: none; border: none; cursor: pointer;
          display: flex; align-items: center; gap: 10px;
          transition: color 0.25s; letter-spacing: 0.02em;
        }
        .cu-back-btn:hover { color: var(--red); }
        .cu-back-circle {
          width: 28px; height: 28px; border-radius: 50%;
          border: 1.5px solid var(--stone);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; transition: all 0.25s;
        }
        .cu-back-btn:hover .cu-back-circle { border-color: var(--red); background: var(--peach); }

        .cu-logo {
          display: flex; align-items: center; cursor: pointer;
        }
        .cu-logo-block { position: relative; width: 44px; height: 32px; }
        .cu-logo-back {
          width: 44px; height: 32px; background: var(--coral);
          position: absolute; top: -3px; left: 3px;
          transform: rotate(3deg); border-radius: 2px;
        }
        .cu-logo-front {
          width: 44px; height: 32px; background: var(--red);
          position: absolute; top: 0; left: 0;
          display: flex; align-items: center; justify-content: center; border-radius: 2px;
        }
        .cu-logo-mpr {
          font-family: var(--sans); font-size: 12px; font-weight: 700;
          color: white; letter-spacing: -0.02em;
        }
        .cu-logo-mpr .sm { font-size: 9px; vertical-align: middle; }
        .cu-logo-text {
          font-family: var(--caveat); font-size: 20px; font-weight: 600;
          color: var(--coral); margin-left: 12px;
        }
        .cu-topbar-label {
          font-family: var(--sans); font-size: 11px; font-weight: 600;
          color: var(--ink-light); letter-spacing: 0.18em; text-transform: uppercase;
        }

        /* ── HERO ── */
        .cu-hero {
          padding: 136px 64px 72px;
          background: var(--warm-white); position: relative; overflow: hidden;
        }
        .cu-hero-tricolor {
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, var(--saffron) 33.3%, white 33.3%, white 66.6%, var(--india-green) 66.6%);
        }
        .cu-hero-s1 {
          position: absolute; width: 400px; height: 400px;
          background: var(--peach); border-radius: 4px;
          top: -60px; right: -40px; transform: rotate(8deg); opacity: 0.7; pointer-events: none;
        }
        .cu-hero-s2 {
          position: absolute; width: 400px; height: 400px;
          background: var(--peach-mid); border-radius: 4px;
          top: -20px; right: 20px; transform: rotate(3deg); opacity: 0.4; pointer-events: none;
        }
        .cu-hero-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
        .cu-eyebrow {
          font-family: var(--sans); font-size: 11px; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--red); font-weight: 600;
          display: flex; align-items: center; gap: 12px; margin-bottom: 22px;
          opacity: 0; animation: fadeUp 0.7s ease 0.1s forwards;
        }
        .cu-eyebrow::before {
          content: ''; display: block; width: 28px; height: 2px;
          background: var(--red); border-radius: 2px;
        }
        .cu-headline {
          font-size: clamp(38px, 5vw, 66px); font-weight: 600;
          line-height: 1.08; letter-spacing: -0.02em; color: var(--ink);
          margin-bottom: 18px; max-width: 680px;
          opacity: 0; animation: fadeUp 0.8s ease 0.2s forwards;
        }
        .cu-headline em { font-style: italic; color: var(--red); font-weight: 500; }
        .cu-subline {
          font-family: var(--sans); font-size: 17px; line-height: 1.7;
          color: var(--ink-mid); max-width: 500px;
          opacity: 0; animation: fadeUp 0.8s ease 0.32s forwards;
        }

        /* ── BODY ── */
        .cu-body {
          max-width: 1200px; margin: 0 auto;
          padding: 64px 64px 120px;
          display: grid; grid-template-columns: 340px 1fr; gap: 64px; align-items: start;
        }

        /* ── CONTACT CARD ── */
        .cu-card {
          position: sticky; top: 96px;
          opacity: 0; animation: fadeUp 0.8s ease 0.45s forwards;
        }
        .cu-card-inner {
          background: white; border-radius: 4px;
          border: 1px solid var(--stone); overflow: hidden;
          box-shadow: 0 4px 32px rgba(0,0,0,0.06);
        }
        .cu-card-head {
          background: var(--red); padding: 26px 28px; position: relative; overflow: hidden;
        }
        .cu-card-head-glow {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 80% at 110% 110%, rgba(255,255,255,0.1), transparent);
        }
        .cu-card-head-tag {
          font-family: var(--sans); font-size: 10px; font-weight: 700;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: rgba(255,255,255,0.6); margin-bottom: 10px; position: relative;
        }
        .cu-card-head-name {
          font-size: 24px; font-weight: 600; color: white;
          line-height: 1.25; position: relative;
        }
        .cu-card-head-name em {
          font-family: var(--caveat); font-size: 26px; font-style: italic;
          font-weight: 600; display: block; color: rgba(255,255,255,0.82);
        }
        .cu-info-row {
          display: flex; gap: 14px; align-items: flex-start;
          padding: 18px 24px; border-bottom: 1px solid var(--off-white);
          transition: background 0.22s;
        }
        .cu-info-row:last-child { border-bottom: none; }
        .cu-info-row:hover { background: var(--peach); }
        .cu-info-icon { color: var(--red); font-size: 9px; margin-top: 4px; flex-shrink: 0; }
        .cu-info-lbl {
          font-family: var(--sans); font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-light);
          margin-bottom: 3px;
        }
        .cu-info-val {
          font-family: var(--sans); font-size: 13px; font-weight: 500;
          color: var(--ink); line-height: 1.55; white-space: pre-line;
        }
        .cu-info-val a { color: var(--red); text-decoration: none; transition: color 0.2s; }
        .cu-info-val a:hover { color: var(--red-deep); text-decoration: underline; }
        .cu-availability {
          margin: 18px 24px 24px; background: #e8f5e9; border-radius: 3px;
          padding: 12px 16px; display: flex; align-items: center; gap: 10px;
        }
        .cu-avail-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--india-green); flex-shrink: 0;
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        .cu-avail-text {
          font-family: var(--sans); font-size: 11px; font-weight: 600;
          color: var(--india-green); line-height: 1.45;
        }

        /* ── FORM ── */
        .cu-form-wrap {
          opacity: 0; animation: fadeUp 0.8s ease 0.55s forwards;
        }
        .cu-form-title {
          font-size: 30px; font-weight: 600; color: var(--ink);
          margin-bottom: 8px; letter-spacing: -0.01em;
        }
        .cu-form-sub {
          font-family: var(--sans); font-size: 15px; color: var(--ink-light);
          line-height: 1.65; margin-bottom: 40px;
        }
        .cu-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .cu-field { display: flex; flex-direction: column; gap: 7px; }
        .cu-field.full { grid-column: 1 / -1; }
        .cu-label {
          font-family: var(--sans); font-size: 11px; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink-mid);
        }
        .cu-label .req { color: var(--red); margin-left: 2px; }
        .cu-input, .cu-select, .cu-textarea {
          font-family: var(--sans); font-size: 15px;
          color: var(--ink); background: white;
          border: 1.5px solid var(--stone); border-radius: 2px;
          padding: 13px 16px; outline: none; width: 100%;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .cu-input::placeholder, .cu-textarea::placeholder { color: var(--ink-light); }
        .cu-input:hover, .cu-select:hover, .cu-textarea:hover { border-color: var(--peach-mid); }
        .cu-input.on, .cu-select.on, .cu-textarea.on {
          border-color: var(--red);
          box-shadow: 0 0 0 3px rgba(200,57,26,0.08);
        }
        .cu-select {
          appearance: none; cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238a7a6e' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 14px center;
          padding-right: 36px;
        }
        .cu-textarea { resize: vertical; min-height: 120px; line-height: 1.6; }
        .cu-section-sep {
          grid-column: 1/-1; padding-top: 8px;
          display: flex; align-items: center; gap: 14px;
        }
        .cu-section-sep-label {
          font-family: var(--sans); font-size: 11px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-light);
          white-space: nowrap;
        }
        .cu-section-sep-line { flex: 1; height: 1px; background: var(--stone); }
        .cu-submit-row {
          grid-column: 1/-1; margin-top: 12px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
        }
        .cu-note {
          font-family: var(--sans); font-size: 12px; color: var(--ink-light);
          line-height: 1.55; max-width: 280px;
        }
        .cu-submit-btn {
          font-family: var(--sans); font-size: 15px; font-weight: 700;
          letter-spacing: 0.03em; background: var(--red); color: white;
          padding: 16px 44px; border: none; border-radius: 2px; cursor: pointer;
          transition: all 0.25s; box-shadow: 0 2px 12px rgba(200,57,26,0.25);
          display: flex; align-items: center; gap: 12px;
        }
        .cu-submit-btn:hover { background: var(--red-deep); transform: translateY(-2px); box-shadow: 0 6px 24px rgba(200,57,26,0.35); }
        .cu-submit-btn:disabled { background: var(--stone); color: var(--ink-light); transform: none; box-shadow: none; cursor: not-allowed; }
        .cu-arrow { transition: transform 0.25s; }
        .cu-submit-btn:not(:disabled):hover .cu-arrow { transform: translateX(5px); }

        /* ── SUCCESS ── */
        .cu-success {
          text-align: center; padding: 64px 40px;
          background: white; border-radius: 4px;
          border: 1px solid var(--stone); box-shadow: 0 4px 32px rgba(0,0,0,0.06);
          animation: fadeUp 0.6s ease forwards;
        }
        .cu-success-icon {
          width: 64px; height: 64px; border-radius: 50%;
          background: #e8f5e9; color: var(--india-green);
          font-size: 26px; font-weight: 600;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 24px;
        }
        .cu-success-title {
          font-size: 30px; font-weight: 600; color: var(--ink);
          margin-bottom: 12px; letter-spacing: -0.01em;
        }
        .cu-success-sub {
          font-family: var(--sans); font-size: 16px; color: var(--ink-mid);
          line-height: 1.7; max-width: 400px; margin: 0 auto 36px;
        }
        .cu-back-home {
          font-family: var(--sans); font-size: 14px; font-weight: 600;
          background: transparent; border: 1.5px solid var(--stone);
          color: var(--ink-mid); padding: 12px 28px; border-radius: 2px;
          cursor: pointer; transition: all 0.25s;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .cu-back-home:hover { border-color: var(--red); color: var(--red); }

        /* ── FOOTER ── */
        .cu-footer {
          background: #111; padding: 40px 64px;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 20px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .cu-ft-logo { display: flex; align-items: center; }
        .cu-ft-lb { position: relative; width: 34px; height: 25px; }
        .cu-ft-back {
          width: 34px; height: 25px; background: var(--coral); opacity: 0.6;
          position: absolute; top: -2px; left: 2px; transform: rotate(3deg); border-radius: 2px;
        }
        .cu-ft-front {
          width: 34px; height: 25px; background: var(--red);
          position: absolute; top: 0; left: 0;
          display: flex; align-items: center; justify-content: center; border-radius: 2px;
        }
        .cu-ft-txt { font-family: var(--sans); font-size: 9px; font-weight: 700; color: white; }
        .cu-ft-name {
          font-family: var(--caveat); font-size: 17px; font-weight: 600;
          color: rgba(255,255,255,0.35); margin-left: 10px;
        }
        .cu-ft-copy {
          font-family: var(--sans); font-size: 11px; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(255,255,255,0.2);
        }

        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        @media (max-width: 900px) {
          .cu-topbar { padding: 14px 24px; }
          .cu-topbar-label { display: none; }
          .cu-hero { padding: 118px 24px 56px; }
          .cu-body { grid-template-columns: 1fr; padding: 48px 24px 80px; gap: 44px; }
          .cu-card { position: static; }
          .cu-form-grid { grid-template-columns: 1fr; }
          .cu-submit-row { flex-direction: column; align-items: flex-start; }
          .cu-footer { padding: 32px 24px; flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      {/* TOP BAR */}
      <div className="cu-topbar">
        <button className="cu-back-btn" onClick={() => navigate("/")}>
          <span className="cu-back-circle">←</span>
          Back to Home
        </button>
        <div className="cu-logo" onClick={() => navigate("/")}>
          <div className="cu-logo-block">
            <div className="cu-logo-back" />
            <div className="cu-logo-front">
              <span className="cu-logo-mpr"><span className="sm">m</span>PR</span>
            </div>
          </div>
          <span className="cu-logo-text">Consulting</span>
        </div>
        <div className="cu-topbar-label">Contact Us</div>
      </div>

      {/* HERO */}
      <div className="cu-hero">
        <div className="cu-hero-tricolor" />
        <div className="cu-hero-s1" /><div className="cu-hero-s2" />
        <div className="cu-hero-inner">
          <div className="cu-eyebrow">Get in Touch</div>
          <h1 className="cu-headline">
            Let's build your<br /><em>winning</em> campaign.
          </h1>
          <p className="cu-subline">
            We take limited engagements each election cycle. Tell us about your constituency and we'll reach out within 24 hours.
          </p>
        </div>
      </div>

      {/* BODY */}
      <div className="cu-body">

        {/* LEFT — Contact Card */}
        <div className="cu-card">
          <div className="cu-card-inner">
            <div className="cu-card-head">
              <div className="cu-card-head-glow" />
              <div className="cu-card-head-tag">MPR Consulting</div>
              <div className="cu-card-head-name">
                India's Political<br />
                <em>Consultancy</em>
              </div>
            </div>
            {CONTACT_INFO.map((info) => (
              <div className="cu-info-row" key={info.label}>
                <span className="cu-info-icon">{info.icon}</span>
                <div>
                  <div className="cu-info-lbl">{info.label}</div>
                  <div className="cu-info-val">
                    {info.link
                      ? <a href={info.link}>{info.value}</a>
                      : info.value}
                  </div>
                </div>
              </div>
            ))}
            <div className="cu-availability">
              <div className="cu-avail-dot" />
              <div className="cu-avail-text">
                Currently accepting new campaign briefs<br />for 2026 election cycle
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div className="cu-form-wrap">
          {submitted ? (
            <div className="cu-success">
              <div className="cu-success-icon">✓</div>
              <div className="cu-success-title">Brief received.</div>
              <p className="cu-success-sub">
                Thank you, {form.name.split(" ")[0]}. Our team will review your brief and reach out within 24 hours to schedule a consultation.
              </p>
              <button className="cu-back-home" onClick={() => navigate("/")}>
                ← Back to Home
              </button>
            </div>
          ) : (
            <>
              <div className="cu-form-title">Campaign Brief</div>
              <p className="cu-form-sub">
                Share your details and we'll prepare a tailored consultation for your constituency.
              </p>
              <div className="cu-form-grid">

                {/* Contact Details */}
                <div className="cu-field">
                  <label className="cu-label">Full Name <span className="req">*</span></label>
                  <input className={`cu-input${focused === "name" ? " on" : ""}`}
                    type="text" name="name" placeholder="Rajesh Kumar"
                    value={form.name} onChange={handleChange}
                    onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
                </div>

                <div className="cu-field">
                  <label className="cu-label">Organisation / Party</label>
                  <input className={`cu-input${focused === "organisation" ? " on" : ""}`}
                    type="text" name="organisation" placeholder="Party or Organisation"
                    value={form.organisation} onChange={handleChange}
                    onFocus={() => setFocused("organisation")} onBlur={() => setFocused(null)} />
                </div>

                <div className="cu-field">
                  <label className="cu-label">Email Address <span className="req">*</span></label>
                  <input className={`cu-input${focused === "email" ? " on" : ""}`}
                    type="email" name="email" placeholder="you@example.com"
                    value={form.email} onChange={handleChange}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                </div>

                <div className="cu-field">
                  <label className="cu-label">Phone Number <span className="req">*</span></label>
                  <input className={`cu-input${focused === "phone" ? " on" : ""}`}
                    type="tel" name="phone" placeholder="+91 98xxx xxxxx"
                    value={form.phone} onChange={handleChange}
                    onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} />
                </div>

                {/* Section divider */}
                <div className="cu-section-sep">
                  <span className="cu-section-sep-label">Campaign Details</span>
                  <div className="cu-section-sep-line" />
                </div>

                <div className="cu-field">
                  <label className="cu-label">Election Type</label>
                  <select className={`cu-select${focused === "election" ? " on" : ""}`}
                    name="election" value={form.election} onChange={handleChange}
                    onFocus={() => setFocused("election")} onBlur={() => setFocused(null)}>
                    <option value="">Select election type</option>
                    {ELECTIONS.map((e) => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>

                <div className="cu-field">
                  <label className="cu-label">Service Needed</label>
                  <select className={`cu-select${focused === "service" ? " on" : ""}`}
                    name="service" value={form.service} onChange={handleChange}
                    onFocus={() => setFocused("service")} onBlur={() => setFocused(null)}>
                    <option value="">Select a service</option>
                    {SERVICES_LIST.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="cu-field full">
                  <label className="cu-label">Tell us about your campaign</label>
                  <textarea className={`cu-textarea${focused === "message" ? " on" : ""}`}
                    name="message"
                    placeholder="Constituency name, current standing, key challenges, timeline, anything relevant..."
                    value={form.message} onChange={handleChange}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} />
                </div>

                <div className="cu-submit-row">
                  <p className="cu-note">
                    We respond within 24 hours. All information is kept strictly confidential.
                  </p>
                  <button className="cu-submit-btn"
                    onClick={handleSubmit}
                    disabled={!form.name || !form.email || !form.phone}>
                    Submit Brief
                    <span className="cu-arrow">→</span>
                  </button>
                </div>

              </div>
            </>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="cu-footer">
        <div className="cu-ft-logo">
          <div className="cu-ft-lb">
            <div className="cu-ft-back" /><div className="cu-ft-front">
              <span className="cu-ft-txt">mPR</span>
            </div>
          </div>
          <span className="cu-ft-name">Consulting</span>
        </div>
        <p className="cu-ft-copy">© {new Date().getFullYear()} MPR Consulting · All rights reserved.</p>
      </footer>
    </div>
  );
}
