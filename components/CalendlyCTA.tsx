// components/CalendlyCTA.tsx
"use client";

export default function CalendlyCTA() {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    // Scroll to contact section
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    // Also open Calendly in a new tab
    window.open(
      "https://calendly.com/YOURLINK", // TODO: Replace with your Calendly link
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