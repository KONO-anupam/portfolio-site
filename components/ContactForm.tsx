// components/ContactForm.tsx
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm, type FormState } from "@/app/actions";

const initialState: FormState = { success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary"
      style={{ opacity: pending ? 0.5 : 1, cursor: pending ? "wait" : "pointer" }}
    >
      {pending ? "Sending..." : "Send Message →"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);

  if (state.success) {
    return (
      <div style={{ paddingTop: "40px" }}>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "22px",
            fontWeight: 400,
            lineHeight: 1.5,
            color: "var(--color-text)",
          }}
          className="dark-text"
        >
          Thank you. You&apos;ll hear from{" "}
          <span style={{ color: "var(--color-accent)" }}>[Anupam]</span>{" "}
          {/* TODO: Replace [Anupam] */}
          within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate>
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            required
            autoComplete="name"
            className="form-input"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            autoComplete="email"
            className="form-input"
          />
        </div>
        <div>
          <textarea
            name="message"
            id="message"
            rows={4}
            placeholder="What is the biggest operational bottleneck in your business right now?"
            required
            className="form-input"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <SubmitButton />
          {state.error && (
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#C0392B",
                marginTop: "8px",
              }}
            >
              {state.error}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}