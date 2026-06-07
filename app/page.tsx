"use client";

import Image from "next/image";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import ContactForm from "@/components/ContactForm";
import CalendlyCTA from "@/components/CalendlyCTA";

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const caseStudies = [
  {
    index: "01",
    year: "2026",
    category: "Invoicing & Payments",
    headline: "SmartBill",
    subheadline: "Full-Stack Invoicing App",
    copy: "A full-stack invoicing app with a PostgreSQL database tracking every invoice state: draft, sent, paid, overdue. Payments go through Razorpay. When a payment clears, the database updates instantly. When it doesn't, the follow-up triggers automatically. The data flow is clean, the transactions are secure, and nothing falls through the cracks.",
    metrics: [
      { value: "< 60s", label: "Invoice Generated" },
      { value: "PostgreSQL", label: "Invoice State Tracking" },
      { value: "Razorpay", label: "Payment Gateway" },
    ],
    screenshot: "/smartbill.png",
    siteUrl: "https://smart-bill-dusky.vercel.app/",
    siteLabel: "View SmartBill",
    isLive: true,
  },
  {
    index: "02",
    year: "2026",
    category: "Lead Management",
    headline: "Kavio CRM",
    subheadline: "Database-Backed Lead Tracker",
    copy: "A relational database web app built for agencies managing high-ticket leads. Every lead is a real record with structured fields, status history, and assignee data. Queries are fast. The interface is built on top of that data, so what you see is always accurate. Webhook intake writes directly to the database. Google Calendar sync pulls from it.",
    metrics: [
      { value: "Relational", label: "Database Architecture" },
      { value: "Webhook", label: "Real-Time Lead Intake" },
      { value: "Auto", label: "Google Calendar Sync" },
    ],
    screenshot: "/kavio.png",
    siteUrl: "https://kavio-amber.vercel.app/",
    siteLabel: "View Kavio CRM",
    isLive: true,
  },
  {
    index: "03",
    year: "2026",
    category: "Booking & Onboarding",
    headline: "The Ground",
    subheadline: "Custom Booking Engine",
    copy: "A React frontend talking to a backend API. When a client picks a time slot, the API checks that slot against the database before confirming. No double-booking is possible because the check happens at the data layer, not the UI. Once booked, the Google Calendar API syncs the appointment. Payment and intake happen in the same flow.",
    metrics: [
      { value: "API-First", label: "Slot Availability Check" },
      { value: "Zero", label: "Double-Booking Risk" },
      { value: "Google Cal", label: "API Sync on Confirm" },
    ],
    screenshot: "/the-ground.png",
    siteUrl: "https://the-ground-alpha.vercel.app",
    siteLabel: "Visit The Ground",
    isLive: true,
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
// HAMBURGER ICON
// ─────────────────────────────────────────────────────────────

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="3" y1="3" x2="17" y2="17" />
          <line x1="17" y1="3" x2="3" y2="17" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="17" y2="6" />
          <line x1="3" y1="10" x2="17" y2="10" />
          <line x1="3" y1="14" x2="17" y2="14" />
        </>
      )}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// PROJECT SHOWCASE
// ─────────────────────────────────────────────────────────────

function ProjectShowcase({
  screenshot,
  siteUrl,
  siteLabel = "Visit live site",
  isLive,
}: {
  screenshot: string;
  siteUrl: string;
  siteLabel?: string;
  isLive: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div>
      {/* Screenshot container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          borderRadius: "4px",
          overflow: "hidden",
          border: "1px solid var(--color-divider)",
          background: "var(--color-surface, #f0ede8)",
          cursor: isLive ? "pointer" : "default",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => isLive && window.open(siteUrl, "_blank")}
      >
        <Image
          src={screenshot}
          alt={`${siteLabel} screenshot`}
          width={1600}
          height={900}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            transition: "transform 0.6s cubic-bezier(0.4,0,0,1)",
            transform: hovered && isLive ? "scale(1.03)" : "scale(1)",
          }}
        />

        {/* Live hover overlay */}
        {isLive && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.5)",
                padding: "10px 20px",
                borderRadius: "2px",
              }}
            >
              Open Live Site ↗
            </span>
          </div>
        )}

        {/* Private badge for non-live */}
        {!isLive && (
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              right: "12px",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-faint)",
              border: "1px solid var(--color-divider)",
              padding: "4px 8px",
              borderRadius: "2px",
              background: "var(--color-overlay)",
              backdropFilter: "blur(8px)",
            }}
          >
            Private Client Build
          </div>
        )}
      </div>

      {/* Link row */}
      <div
        style={{
          marginTop: "14px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {isLive ? (
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="visit-link"
          >
            {siteLabel} ↗
          </a>
        ) : (
          <Micro style={{ color: "var(--color-faint)" }}>
            NDA · Not publicly available
          </Micro>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// METRICS STRIP
// ─────────────────────────────────────────────────────────────

function MetricsStrip({
  metrics,
}: {
  metrics: { value: string; label: string }[];
}) {
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
// CASE CARD — shared text block
// ─────────────────────────────────────────────────────────────

function CaseText({ study }: { study: (typeof caseStudies)[0] }) {
  return (
    <div>
      <Micro
        style={{
          color: "var(--color-accent)",
          display: "block",
          marginBottom: "18px",
        }}
      >
        {study.index}
      </Micro>
      <Micro
        style={{
          color: "var(--color-muted)",
          display: "block",
          marginBottom: "16px",
        }}
      >
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
  );
}

function CaseCardOdd({ study }: { study: (typeof caseStudies)[0] }) {
  return (
    <article
      className="divider-top"
      style={{ paddingTop: "56px", paddingBottom: "88px" }}
    >
      <div className="case-grid-odd">
        <div>
          <ProjectShowcase
            screenshot={study.screenshot}
            siteUrl={study.siteUrl}
            siteLabel={study.siteLabel}
            isLive={study.isLive}
          />
        </div>
        <CaseText study={study} />
      </div>
    </article>
  );
}

function CaseCardEven({ study }: { study: (typeof caseStudies)[0] }) {
  return (
    <article
      className="divider-top"
      style={{ paddingTop: "56px", paddingBottom: "88px" }}
    >
      <div className="case-grid-even">
        <CaseText study={study} />
        <div>
          <ProjectShowcase
            screenshot={study.screenshot}
            siteUrl={study.siteUrl}
            siteLabel={study.siteLabel}
            isLive={study.isLive}
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
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      {/* ══ HEADER ══════════════════════════════════════════ */}
      <header
        className="site-header"
        style={{ paddingInline: "clamp(16px, 4vw, 48px)" }}
      >
        <Micro style={{ color: "var(--color-text)", letterSpacing: "0.18em" }}>
          [kono Studio]
        </Micro>

        {/* Desktop nav */}
        <nav
          style={{ display: "flex", alignItems: "center", gap: "32px" }}
          aria-label="Primary navigation"
          className="hidden-mobile"
        >
          <a href="#work" className="nav-link">
            Work
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
          <ThemeToggle />
        </nav>

        {/* Mobile nav controls */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "16px" }}
          className="visible-mobile"
        >
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              color: "var(--color-muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              transition: "color 0.2s ease",
            }}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          aria-hidden={!menuOpen}
          style={{
            position: "fixed",
            top: "60px",
            left: 0,
            right: 0,
            background: "var(--color-overlay)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            borderBottom: "1px solid var(--color-divider)",
            padding: menuOpen ? "32px 20px" : "0 20px",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            overflow: "hidden",
            maxHeight: menuOpen ? "200px" : "0",
            transition:
              "max-height 0.36s cubic-bezier(0.4,0,0,1), padding 0.36s ease",
            zIndex: 99,
          }}
          className="visible-mobile"
        >
          <a
            href="#work"
            className="nav-link"
            onClick={closeMenu}
            style={{ fontSize: "12px", letterSpacing: "0.14em" }}
          >
            Work
          </a>
          <a
            href="#contact"
            className="nav-link"
            onClick={closeMenu}
            style={{ fontSize: "12px", letterSpacing: "0.14em" }}
          >
            Contact
          </a>
        </div>
      </header>

      <main>
        {/* ══ HERO ════════════════════════════════════════════ */}
        <section
          id="hero"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding:
              "calc(64px + clamp(36px, 8vw, 96px)) clamp(20px, 7vw, 120px) 60px",
          }}
        >
          {/* Identity row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "48px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                overflow: "hidden",
                flexShrink: 0,
                border: "1px solid var(--color-divider)",
              }}
            >
              <Image
                src="/photo.jpg"
                alt="Anupam"
                fill
                priority
                style={{ objectFit: "cover", objectPosition: "center 10%" }}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "7px" }}
            >
              <Micro
                style={{ color: "var(--color-text)", letterSpacing: "0.14em" }}
              >
                Anupam
              </Micro>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#6dbf8a",
                    flexShrink: 0,
                  }}
                />
                <Micro style={{ color: "var(--color-faint)" }}>
                  Available for new projects
                </Micro>
              </div>
            </div>
          </div>

          {/* Accent rule */}
          <div className="accent-rule" />

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(36px, 5.5vw, 78px)",
              fontWeight: 400,
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              marginBottom: "28px",
              color: "var(--color-text)",
              maxWidth: "820px",
            }}
          >
            I build custom web applications
            <br />
            and database systems that{" "}
            <em style={{ color: "var(--color-muted)", fontStyle: "italic" }}>
              run your business.
            </em>
          </h1>

          {/* Sub */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(15px, 1.8vw, 17px)",
              fontWeight: 300,
              lineHeight: 1.7,
              color: "var(--color-muted)",
              marginBottom: "48px",
              maxWidth: "520px",
              letterSpacing: "0.01em",
            }}
          >
            Client portals, booking engines, payment integrations. Fast, secure
            full-stack tools built exactly around how your business works.
          </p>

          {/* CTA row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            <CalendlyCTA />
            <a
              href="#work"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
                (e.currentTarget.style.color = "var(--color-text)")
              }
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
                (e.currentTarget.style.color = "var(--color-muted)")
              }
            >
              See the work ↓
            </a>
          </div>

          {/* Stack tags */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginTop: "56px",
              paddingTop: "28px",
              borderTop: "1px solid var(--color-divider)",
            }}
          >
            {[
              "AUTOMATED INVOICING",
              "CUSTOM DATABASES",
              "CLIENT PORTALS",
              "PAYMENT INTEGRATIONS",
              "BOOKING SYSTEMS",
            ].map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-faint)",
                  border: "1px solid var(--color-divider)",
                  padding: "5px 10px",
                  borderRadius: "2px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* ══ WORK ════════════════════════════════════════════ */}
        <section
          id="work"
          style={{ padding: `var(--section-gap) var(--page-pad)` }}
        >
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
              Things I&apos;ve Built
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "var(--color-muted)",
                maxWidth: "480px",
                letterSpacing: "0.01em",
              }}
            >
              Full-stack apps and database tools built for real businesses with
              specific problems. No templates, no off-the-shelf limits.
            </p>
          </div>

          {caseStudies.map((study, i) =>
            i % 2 === 0 ? (
              <CaseCardOdd key={study.index} study={study} />
            ) : (
              <CaseCardEven key={study.index} study={study} />
            ),
          )}
        </section>

        {/* ══ CONTACT ══════════════════════════════════════════ */}
        <section
          id="contact"
          className="divider-top"
          style={{ padding: `clamp(72px, 10vw, 140px) var(--page-pad)` }}
        >
          <div className="contact-grid">
            <div>
              <Micro
                style={{
                  color: "var(--color-muted)",
                  display: "block",
                  marginBottom: "24px",
                }}
              >
                Work With Me
              </Micro>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(22px, 2.8vw, 38px)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  marginBottom: "24px",
                  maxWidth: "380px",
                  color: "var(--color-text)",
                }}
              >
                Got something you want to build?
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
                Tell me what you need. I&apos;ll reply within 24 hours with an
                honest take on how I&apos;d build it and roughly what it would
                take. No pitch, no proposal. Just a straight answer.
              </p>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {[
                  "Free 30-min scoping call",
                  "Fixed-scope, fixed-price projects",
                  "No retainers or lock-ins",
                ].map((item) => (
                  <li key={item}>
                    <Micro style={{ color: "var(--color-muted)" }}>
                      → {item}
                    </Micro>
                  </li>
                ))}
              </ul>
            </div>
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
              Anupam — Full-Stack Developer
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
              href="https://linkedin.com/in/ananya-anupam-50176734a/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://x.com/anupamkunu"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              Twitter ↗
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}