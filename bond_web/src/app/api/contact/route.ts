import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  notificationEmail,
  confirmationEmail,
  type AssessmentData,
} from "@/lib/email-templates";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.INQUIRY_FROM;
  const toAddress = process.env.INQUIRY_TO;

  if (!apiKey || !fromAddress || !toAddress) {
    return NextResponse.json(
      { error: "Email service not configured." },
      { status: 500 },
    );
  }

  let body: Partial<AssessmentData>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const name = (body.name ?? "").toString().trim();
  const phone = (body.phone ?? "").toString().trim();
  const email = (body.email ?? "").toString().trim();

  if (!name || !phone || !email) {
    return NextResponse.json(
      { error: "Name, phone, and email are required." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const data: AssessmentData = {
    name,
    phone,
    email,
    services: Array.isArray(body.services)
      ? body.services.filter((s): s is string => typeof s === "string")
      : [],
    startDate: (body.startDate ?? "").toString(),
    endDate: (body.endDate ?? "").toString(),
    location: (body.location ?? "").toString(),
    message: (body.message ?? "").toString(),
  };

  const resend = new Resend(apiKey);

  const [notify, confirm] = await Promise.all([
    resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: email,
      subject: `New Inquiry — ${name}`,
      html: notificationEmail(data),
    }),
    resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: "We received your inquiry — Bond Design Company",
      html: confirmationEmail(data),
    }),
  ]);

  if (notify.error || confirm.error) {
    console.error("[contact] resend error", {
      notify: notify.error,
      confirm: confirm.error,
    });
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
