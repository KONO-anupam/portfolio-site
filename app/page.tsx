"use client";

import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import ContactForm from "@/components/ContactForm";

// ─────────────────────────────────────────────────────────────
// DATA — Case Studies
// Add your Loom video IDs and live site URLs below.
// ─────────────────────────────────────────────────────────────
const caseStudies = [
  {
    index: "01",
    year: "2023",
    category: "Invoicing & Cash Flow",
    headline: "SmartBill",
    subheadline: "Automated Payment Recovery",
    copy: "A secure checkout and collections system that removes friction from every payment. Automated follow-up sequences recover unpaid invoices without a single manual chase — protecting cash flow while preserving client relationships.",
    metrics: [
      { value: "< 60s", label: "AVG. Invoice Generation" },
      { value: "Instant", label: "Razorpay Webhook Settlement" },
      { value: "Automated", label: "Multi-Stage Email Escalations" },
    ],
    loomId: "REPLACE_WITH_YOUR_LOOM_ID", // ← paste just the ID, e.g. "abc123def456"
    siteUrl: "https://smartbill.vercel.app", // ← TODO: replace with live URL
    siteLabel: "View SmartBill",
  },
  {
    index: "02",
    year: "2024",
    category: "Lead Management",
    headline: "Kavio CRM",
    subheadline: "High-Ticket Lead Intelligence",
    copy: "An automated lead-tracking system built for agencies that can't afford to let high-value enquiries go cold. Every lead is captured, scored, and followed up — automatically — so no opportunity slips through due to admin overwhelm.",
    metrics: [
      { value: "100%", label: "Webhook Delivery Reliability" },
      { value: "Real-Time", label: "Google Calendar Sync" },
      { value: "Immediate", label: "Lead Ingestion & Routing" },
    ],
    loomId: "REPLACE_WITH_YOUR_LOOM_ID", // ← TODO
    siteUrl: "#", // ← internal/client tool — use "#" or a private demo link
    siteLabel: "View Kavio CRM",
  },
  {
    index: "03",
    year: "2024",
    category: "Booking & Onboarding",
    headline: "The Ground",
    subheadline: "Custom Booking Engine",
    copy: "A bespoke scheduling and capacity management system that eliminates double-bookings, automates intake questionnaires, and delivers a white-glove onboarding experience from the very first interaction.",
    metrics: [
      { value: "Absolute", label: "Concurrency Overlap Protection" },
      { value: "1-Click", label: "Frictionless Checkout Flow" },
      { value: "Bespoke", label: "End-to-End Client Portal" },
    ],
    loomId: "REPLACE_WITH_YOUR_LOOM_ID", // ← TODO
    siteUrl: "https://the-ground-alpha.vercel.app",
    siteLabel: "Visit The Ground",
  },
];

// ─────────────────────────────────────────────────────────────
// PRIMITIVES
// ─────────────────────────────────────────────────────────────

function Micro({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <span className={`micro ${className ?? ""}`} style={style}>
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// CALENDLY CTA
// ─────────────────────────────────────────────────────────────

function CalendlyCTA() {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.open(
      "https://calendly.com/YOURLINK", // ← TODO: replace with your Calendly link
      "_blank",
      "noopener,noreferrer"
    );
  }
  return (
    <a href="#contact" className="btn-primary" onClick={handleClick}>
      Book a Discovery Call →
    </a>
  );
}

// ─────────────────────────────────────────────────────────────
// LOOM EMBED + VISIT SITE LINK
// ─────────────────────────────────────────────────────────────

function LoomEmbed({
  loomId,
  siteUrl,
  siteLabel = "Visit live site",
}: {
  loomId: string;
  siteUrl: string;
  siteLabel?: string;
}) {
  // Show a styled placeholder until a real Loom ID is added
  const isPlaceholder = !loomId || loomId.startsWith("REPLACE");

  return (
    <div>
      {isPlaceholder ? (
        <div className="video-placeholder">
          <div className="placeholder-label">
            <Micro style={{ color: "var(--color-muted)" }}>[ Loom Demo ]</Micro>
          </div>
        </div>
      ) : (
        <div className="video-wrapper">
          <iframe
            src={`https://www.loom.com/embed/${loomId}?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true`}
            title="Project walkthrough"
            allowFullScreen
            style={{ border: "none" }}
          />
        </div>
      )}

      {/* Visit site link */}
      <div style={{ marginTop: "14px", display: "flex", justifyContent: "flex-end" }}>
        <a
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="visit-link"
        >
          {siteLabel} ↗
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// METRICS STRIP
// ─────────────────────────────────────────────────────────────

function MetricsStrip({ metrics }: { metrics: { value: string; label: string }[] }) {
  return (
    <div className="metrics-strip">
      {metrics.map((m) => (
        <div key={m.label}>
          <p className="metric-num">{m.value}</p>
          <Micro
            style={{
              color: "var(--color-muted)",
              display: "block",
              marginTop: "10px",
              lineHeight: 1.5,
            }}
          >
            {m.label}
          </Micro>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CASE STUDY — ODD (video left, text right)
// ─────────────────────────────────────────────────────────────

function CaseCardOdd({ study }: { study: (typeof caseStudies)[0] }) {
  return (
    <article
      className="divider-top"
      style={{ paddingTop: "56px", paddingBottom: "88px" }}
    >
      <div className="case-grid-odd">
        {/* Video */}
        <div>
          <LoomEmbed
            loomId={study.loomId}
            siteUrl={study.siteUrl}
            siteLabel={study.siteLabel}
          />
        </div>

        {/* Text */}
        <div>
          <Micro style={{ color: "var(--color-accent)", display: "block", marginBottom: "18px" }}>
            {study.index}
          </Micro>
          <Micro style={{ color: "var(--color-muted)", display: "block", marginBottom: "16px" }}>
            {study.category}
          </Micro>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(20px, 2.2vw, 28px)",
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: "4px",
              color: "var(--color-text)",
            }}
          >
            {study.headline}
          </h3>
          <h4
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "15px",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--color-muted)",
              marginBottom: "20px",
            }}
          >
            {study.subheadline}
          </h4>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              fontWeight: 300,
              lineHeight: 1.85,
              letterSpacing: "0.01em",
              color: "var(--color-muted)",
            }}
          >
            {study.copy}
          </p>

          <MetricsStrip metrics={study.metrics} />

          <div style={{ marginTop: "22px", textAlign: "right" }}>
            <Micro style={{ color: "var(--color-faint)" }}>{study.year}</Micro>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────
// CASE STUDY — EVEN (text left, video right)
// ─────────────────────────────────────────────────────────────

function CaseCardEven({ study }: { study: (typeof caseStudies)[0] }) {
  return (
    <article
      className="divider-top"
      style={{ paddingTop: "56px", paddingBottom: "88px" }}
    >
      <div className="case-grid-even">
        {/* Text */}
        <div>
          <Micro style={{ color: "var(--color-accent)", display: "block", marginBottom: "18px" }}>
            {study.index}
          </Micro>
          <Micro style={{ color: "var(--color-muted)", display: "block", marginBottom: "16px" }}>
            {study.category}
          </Micro>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(20px, 2.2vw, 28px)",
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: "4px",
              color: "var(--color-text)",
            }}
          >
            {study.headline}
          </h3>
          <h4
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "15px",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--color-muted)",
              marginBottom: "20px",
            }}
          >
            {study.subheadline}
          </h4>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              fontWeight: 300,
              lineHeight: 1.85,
              letterSpacing: "0.01em",
              color: "var(--color-muted)",
            }}
          >
            {study.copy}
          </p>

          <MetricsStrip metrics={study.metrics} />

          <div style={{ marginTop: "22px" }}>
            <Micro style={{ color: "var(--color-faint)" }}>{study.year}</Micro>
          </div>
        </div>

        {/* Video */}
        <div>
          <LoomEmbed
            loomId={study.loomId}
            siteUrl={study.siteUrl}
            siteLabel={study.siteLabel}
          />
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      {/* ══ HEADER ══════════════════════════════════════════ */}
      <header className="site-header">
        <Micro style={{ color: "var(--color-text)", letterSpacing: "0.18em" }}>
          Kavio Studio {/* TODO: swap with your brand name if different */}
        </Micro>

        <nav
          style={{ display: "flex", alignItems: "center", gap: "32px" }}
          aria-label="Primary navigation"
        >
          <a href="#work" className="nav-link">Work</a>
          <a href="#contact" className="nav-link">Contact</a>
          <ThemeToggle />
        </nav>
      </header>

      <main>
        {/* ══ HERO ════════════════════════════════════════════
            SETUP: Copy your photo to /public/photo.jpg
            (rename WhatsApp_Image_2026-06-01_at_1_29_24_AM.jpeg)
        ════════════════════════════════════════════════════ */}
        <section id="hero" className="hero-layout">

          {/* ── Left — editorial portrait ──────────────── */}
          <div className="photo-panel">
            <div className="photo-frame">
              <Image
                src="/photo.jpg"         
                alt="Anupam — Systems Architect"
                fill
                priority
                style={{
                  objectFit: "cover",
                  objectPosition: "center 18%",
                }}
              />
              {/* Gradient fade at base of photo */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, transparent 52%, rgba(13,11,7,0.38) 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Vertical identity label — reads bottom-to-top */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: "44px",
                right: "18px",
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
              }}
            >
              <Micro
                style={{
                  color: "rgba(255,255,255,0.36)",
                  letterSpacing: "0.22em",
                  fontSize: "9px",
                }}
              >
                Anupam · Systems Architect
              </Micro>
            </div>
          </div>

          {/* ── Right — hero content ────────────────────── */}
          <div className="hero-content">
            {/* Accent rule */}
            <div className="accent-rule fade-in fade-in-1" />

            {/* Headline — deliberately short, ~3 lines at desktop */}
            <h1
              className="fade-in fade-in-2"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(38px, 4.8vw, 66px)",
                fontWeight: 400,
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                marginBottom: "24px",
                color: "var(--color-text)",
              }}
            >
              Automated<br />
              Operations<br />
              <em style={{ color: "var(--color-muted)", fontStyle: "italic" }}>
                for studios.
              </em>
            </h1>

            {/* Sub — 60% less copy than the old version */}
            <p
              className="fade-in fade-in-3"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                fontWeight: 300,
                lineHeight: 1.65,
                color: "var(--color-muted)",
                marginBottom: "44px",
                maxWidth: "290px",
                letterSpacing: "0.01em",
              }}
            >
              Fewer moving parts.<br />
              More revenue.
            </p>

            <div className="fade-in fade-in-4">
              <CalendlyCTA />
            </div>
          </div>

          {/* ── Bottom — corner metadata ─────────────────── */}
          <div className="hero-meta">
            <Micro style={{ color: "var(--color-faint)" }}>
              Available — Open to new projects
            </Micro>
            <Micro style={{ color: "var(--color-faint)" }}>
              {new Date().getFullYear()}
            </Micro>
          </div>
        </section>

        {/* ══ WORK ════════════════════════════════════════════ */}
        <section
          id="work"
          style={{ padding: `var(--section-gap) var(--page-pad)` }}
        >
          {/* Section intro */}
          <div style={{ marginBottom: "64px" }}>
            <Micro
              style={{
                color: "var(--color-muted)",
                display: "block",
                marginBottom: "20px",
              }}
            >
              Selected Work
            </Micro>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(26px, 3.2vw, 42px)",
                fontWeight: 400,
                lineHeight: 1.1,
                marginBottom: "16px",
                color: "var(--color-text)",
              }}
            >
              Systems &amp; Solutions
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "var(--color-muted)",
                maxWidth: "440px",
                letterSpacing: "0.01em",
              }}
            >
              Each system is built for one outcome: giving you back your time
              and protecting your revenue.
            </p>
          </div>

          {/* Case study cards — alternating layout */}
          {caseStudies.map((study, i) =>
            i % 2 === 0 ? (
              <CaseCardOdd key={study.index} study={study} />
            ) : (
              <CaseCardEven key={study.index} study={study} />
            )
          )}
        </section>

        {/* ══ CONTACT ══════════════════════════════════════════ */}
        <section
          id="contact"
          className="divider-top"
          style={{
            padding: `clamp(80px, 10vw, 140px) var(--page-pad)`,
          }}
        >
          <div className="contact-grid">
            {/* Left — context copy */}
            <div>
              <Micro
                style={{
                  color: "var(--color-muted)",
                  display: "block",
                  marginBottom: "24px",
                }}
              >
                Start a Project
              </Micro>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(24px, 2.8vw, 38px)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  marginBottom: "24px",
                  maxWidth: "380px",
                  color: "var(--color-text)",
                }}
              >
                Let&apos;s build something that actually works for your business.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  fontWeight: 300,
                  lineHeight: 1.85,
                  color: "var(--color-muted)",
                  maxWidth: "360px",
                  marginBottom: "40px",
                }}
              >
                Tell me about your biggest operational frustration. I&apos;ll
                respond within 24 hours with a clear outline of how I&apos;d
                approach solving it.
              </p>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {[
                  "No lengthy proposals",
                  "No retainer lock-ins",
                  "Results-first engagement",
                ].map((item) => (
                  <li key={item}>
                    <Micro style={{ color: "var(--color-muted)" }}>
                      → {item}
                    </Micro>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* ══ FOOTER ══════════════════════════════════════════ */}
      <footer
        className="divider-top"
        style={{ padding: `28px var(--page-pad)` }}
      >
        <div className="footer-grid">
          <div>
            <Micro style={{ color: "var(--color-muted)" }}>
              Kavio Studio — Digital Operations {/* TODO: swap if needed */}
            </Micro>
          </div>
          <div style={{ textAlign: "center" }}>
            <Micro style={{ color: "var(--color-faint)" }}>
              © {new Date().getFullYear()} All Rights Reserved
            </Micro>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "24px",
            }}
          >
            <a
              href="https://linkedin.com/in/YOURPROFILE" /* TODO */
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              LinkedIn ↗
            </a>
            <a
              href="mailto:YOUR@EMAIL.COM" /* TODO */
              className="nav-link"
            >
              Email ↗
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}