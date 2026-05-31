// app/actions.ts
"use server";

export type FormState = {
  success: boolean;
  error?: string;
};

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  // ── Basic validation ────────────────────────────────────────
  if (!name || !email || !message) {
    return { success: false, error: "All fields are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // ─────────────────────────────────────────────
  // DROP YOUR RESEND LOGIC HERE
  // Install: npm install resend
  //
  // import { Resend } from 'resend';
  // const resend = new Resend(process.env.RESEND_API_KEY); // TODO: Set RESEND_API_KEY in .env.local
  // await resend.emails.send({
  //   from: 'Portfolio Contact <contact@YOURDOMAIN.com>',  // TODO: Replace with your verified sender
  //   to: 'YOUR_EMAIL@gmail.com',                          // TODO: Replace with your email
  //   subject: `New enquiry from ${name}`,
  //   html: `
  //     <p><b>Name:</b> ${name}</p>
  //     <p><b>Email:</b> ${email}</p>
  //     <p><b>Bottleneck:</b> ${message}</p>
  //   `
  // });
  // ─────────────────────────────────────────────

  // Simulate a small async delay while Resend is not yet wired up
  await new Promise((r) => setTimeout(r, 600));

  return { success: true };
}