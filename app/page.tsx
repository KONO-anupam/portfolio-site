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
    year: "2023",
    category: "Invoicing & Cash Flow",
    headline: "SmartBill",
    subheadline: "Automated Payment Recovery",
    copy: "Built to stop the manual invoice chase. SmartBill generates invoices in under 60 seconds, processes payments via Razorpay, and automatically escalates overdue invoices through a multi-stage email sequence — so cash comes in without anyone lifting a finger.",
    metrics: [
      { value: "< 60s", label: "Invoice Generated" },
      { value: "3-Stage", label: "Automated Follow-Up" },
      { value: "Zero", label: "Manual Chasing Required" },
    ],
    loomId: "REPLACE_WITH_YOUR_LOOM_ID",
    siteUrl: "https://smartbill.vercel.app",
    siteLabel: "View SmartBill",
  },
  {
    index: "02",
    year: "2024",
    category: "Lead Management",
    headline: "Kavio CRM",
    subheadline: "High-Ticket Lead Tracking",
    copy: "A lightweight CRM built for small agencies that lose leads to admin chaos. Every inbound enquiry is captured via webhook, routed to the right person, and synced to Google Calendar — so no high-value lead goes cold because someone forgot to follow up.",
    metrics: [
      { value: "Instant", label: "Lead Capture via Webhook" },
      { value: "Auto", label: "Google Calendar Sync" },
      { value: "Zero", label: "Leads Lost to Admin" },
    ],
    loomId: "REPLACE_WITH_YOUR_LOOM_ID",
    siteUrl: "#",
    siteLabel: "View Kavio CRM",
  },
  {
    index: "03",
    year: "2024",
    category: "Booking & Onboarding",
    headline: "The Ground",
    subheadline: "Custom Booking Engine",
    copy: "A bespoke scheduling system built from scratch — no third-party booking tools, no double-booking, no friction. Clients book, pay, and complete intake questionnaires in one flow. The business owner sees everything in a single dashboard.",
    metrics: [
      { value: "1-Flow", label: "Book → Pay → Onboard" },
      { value: "Zero", label: "Double-Booking Risk" },
      { value: "Custom", label: "No Generic SaaS Limits" },
    ],
    loomId: "REPLACE_WITH_YOUR_LOOM_ID",
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
// LOOM EMBED
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
      <div
        style={{
          marginTop: "14px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
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
          <LoomEmbed
            loomId={study.loomId}
            siteUrl={study.siteUrl}
            siteLabel={study.siteLabel}
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
        {" "}
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
            className="fade-in fade-in-1"
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
          <div className="accent-rule fade-in fade-in-1" />

          {/* Headline */}
          <h1
            className="fade-in fade-in-2"
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
            I build the systems
            <br />
            your business runs on{" "}
            <em style={{ color: "var(--color-muted)", fontStyle: "italic" }}>
              automatically.
            </em>
          </h1>

          {/* Sub */}
          <p
            className="fade-in fade-in-3"
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
            Invoicing, lead management, booking, and onboarding. I turn the
            repetitive ops work that eats your week into software that runs
            without you.
          </p>

          {/* CTA row */}
          <div
            className="fade-in fade-in-4"
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
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-text)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-muted)")
              }
            >
              See the work ↓
            </a>
          </div>

          {/* Stack tags */}
          <div
            className="fade-in fade-in-4"
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
              "CUSTOM CRMS",
              "CLIENT ONBOARDING",
              "PAYMENT RECOVERY",
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
              Proprietary systems engineered by Kono Studio to solve the most
              common operational bottlenecks in creative agencies.
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
                Got a process that wastes your time every week?
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
                Tell me what it is. I&apos;ll reply within 24 hours with an
                honest take on whether I can automate it — and roughly what that
                would look like. No pitch, no proposal, just a straight answer.
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
              Anupam — Systems Developer
            </Micro>
          </div>
          <div style={{ textAlign: "center" }}>
            <Micro style={{ color: "var(--color-faint)" }}>
              © {new Date().getFullYear()} All Rights Reserved
            </Micro>
          </div>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "24px" }}
          >
            <a
              href="https://linkedin.com/in/YOURPROFILE"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              LinkedIn ↗
            </a>
            <a href="mailto:YOUR@EMAIL.COM" className="nav-link">
              Email ↗
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
