// ============================================================================
// Bond Design Company — Email Templates
// ============================================================================
// Branded HTML email templates for Resend integration.
// Two templates:
//   1. notificationEmail  → Sent to Bond team when a new inquiry arrives
//   2. confirmationEmail  → Sent to the client as a confirmation receipt
// ============================================================================

export interface AssessmentData {
  name: string;
  phone: string;
  email: string;
  services: string[];
  startDate: string;
  endDate: string;
  location: string;
  message: string;
}

// ── Shared Styles ──────────────────────────────────────────────────────────
const colors = {
  dark: "#1A1A1A",
  charcoal: "#2A2A2A",
  stone: "#8B8178",
  stoneLt: "#B5ADA5",
  champagne: "#C9A96E",
  cream: "#F5F0EA",
  warmWhite: "#FAF8F5",
  linen: "#EDE8E1",
  white: "#FFFFFF",
};

const baseWrapper = `
  margin: 0;
  padding: 0;
  background-color: ${colors.cream};
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
`;

const container = `
  max-width: 600px;
  margin: 0 auto;
  background-color: ${colors.white};
`;

function headerBlock(subtitle: string) {
  return `
    <tr>
      <td style="background-color: ${colors.dark}; padding: 48px 40px; text-align: center;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="text-align: center; padding-bottom: 24px;">
              <span style="font-family: Georgia, 'Times New Roman', serif; font-size: 28px; font-weight: 300; color: ${colors.white}; letter-spacing: 4px; text-transform: uppercase;">
                BOND
              </span>
              <span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 8px; color: ${colors.stoneLt}; letter-spacing: 3px; text-transform: uppercase; display: block; margin-top: 4px;">
                Design Company
              </span>
            </td>
          </tr>
          <tr>
            <td style="text-align: center;">
              <div style="width: 40px; height: 1px; background-color: ${colors.champagne}; margin: 0 auto 16px;"></div>
              <span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 10px; color: ${colors.champagne}; letter-spacing: 3px; text-transform: uppercase;">
                ${subtitle}
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

function footerBlock() {
  return `
    <tr>
      <td style="background-color: ${colors.dark}; padding: 32px 40px; text-align: center;">
        <p style="font-family: Georgia, 'Times New Roman', serif; font-size: 16px; font-weight: 300; color: ${colors.white}; margin: 0 0 8px; letter-spacing: 2px;">
          BOND <span style="color: ${colors.champagne}; font-style: italic;">Design Company</span>
        </p>
        <p style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; color: ${colors.stone}; margin: 0 0 4px; letter-spacing: 1px;">
          Park City, Utah &nbsp;·&nbsp; (435) 220-4809
        </p>
        <p style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; color: ${colors.stone}; margin: 0; letter-spacing: 1px;">
          <a href="mailto:info@bonddesigncompany.com" style="color: ${colors.champagne}; text-decoration: none;">
            info@bonddesigncompany.com
          </a>
        </p>
        <div style="width: 30px; height: 1px; background-color: ${colors.stone}; margin: 20px auto 12px;"></div>
        <p style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 9px; color: ${colors.stone}; margin: 0; letter-spacing: 1px;">
          © ${new Date().getFullYear()} Bond Design Company. All rights reserved.
        </p>
      </td>
    </tr>
  `;
}

function detailRow(label: string, value: string) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid ${colors.linen}; vertical-align: top;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="140" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 10px; color: ${colors.champagne}; letter-spacing: 2px; text-transform: uppercase; font-weight: 400; padding-top: 2px; vertical-align: top;">
              ${label}
            </td>
            <td style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; color: ${colors.charcoal}; font-weight: 300; line-height: 1.6;">
              ${value}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// ============================================================================
// 1. NOTIFICATION EMAIL — Sent to Bond team
// ============================================================================
export function notificationEmail(data: AssessmentData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Assessment Request</title>
</head>
<body style="${baseWrapper}">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 24px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="${container}">
          ${headerBlock("New Assessment Request")}

          <!-- Greeting -->
          <tr>
            <td style="padding: 40px 40px 8px;">
              <p style="font-family: Georgia, 'Times New Roman', serif; font-size: 22px; font-weight: 300; color: ${colors.charcoal}; margin: 0; line-height: 1.4;">
                New inquiry from <span style="color: ${colors.champagne}; font-style: italic;">${data.name}</span>
              </p>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="padding: 24px 40px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${detailRow("Name", data.name)}
                ${detailRow("Phone", data.phone)}
                ${detailRow("Email", `<a href="mailto:${data.email}" style="color: ${colors.champagne}; text-decoration: none;">${data.email}</a>`)}
                ${detailRow("Services", data.services.length > 0 ? data.services.join(", ") : "")}
                ${detailRow("Start Date", formatDate(data.startDate))}
                ${detailRow("End Date", formatDate(data.endDate))}
                ${detailRow("Location", data.location)}
                ${detailRow("Details", data.message)}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 0 40px 40px; text-align: center;">
              <a href="mailto:${data.email}?subject=Bond Design — Your Assessment Inquiry"
                 style="display: inline-block; background-color: ${colors.champagne}; color: ${colors.white}; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 400; letter-spacing: 3px; text-transform: uppercase; text-decoration: none; padding: 16px 36px;">
                Reply to ${data.name.split(" ")[0]}
              </a>
            </td>
          </tr>

          ${footerBlock()}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// ============================================================================
// 2. CONFIRMATION EMAIL — Sent to client
// ============================================================================
export function confirmationEmail(data: AssessmentData): string {
  const firstName = data.name.split(" ")[0];

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Assessment Confirmed</title>
</head>
<body style="${baseWrapper}">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 24px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="${container}">
          ${headerBlock("Assessment Confirmation")}

          <!-- Greeting -->
          <tr>
            <td style="padding: 40px 40px 16px;">
              <p style="font-family: Georgia, 'Times New Roman', serif; font-size: 24px; font-weight: 300; color: ${colors.charcoal}; margin: 0 0 16px; line-height: 1.3;">
                Thank you, <span style="color: ${colors.champagne}; font-style: italic;">${firstName}</span>.
              </p>
              <div style="width: 40px; height: 1px; background-color: ${colors.champagne}; margin-bottom: 20px;"></div>
              <p style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; color: ${colors.stone}; font-weight: 300; line-height: 1.8; margin: 0;">
                We've received your assessment request and are excited to learn more about your project. A member of our design team will be in touch within 1–2 business days to discuss next steps.
              </p>
            </td>
          </tr>

          <!-- Summary -->
          <tr>
            <td style="padding: 24px 40px;">
              <p style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 10px; color: ${colors.champagne}; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 16px;">
                Your Submission Summary
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.warmWhite}; padding: 24px;">
                <tr><td>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${detailRow("Services", data.services.length > 0 ? data.services.join(", ") : "Not specified")}
                    ${detailRow("Timeline", [formatDate(data.startDate), formatDate(data.endDate)].filter(Boolean).join(" — ") || "Not specified")}
                    ${detailRow("Location", data.location || "Not specified")}
                  </table>
                </td></tr>
              </table>
            </td>
          </tr>

          <!-- What to expect -->
          <tr>
            <td style="padding: 16px 40px 40px;">
              <p style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 10px; color: ${colors.champagne}; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 16px;">
                What Happens Next
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 8px 0;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="28" style="font-family: Georgia, 'Times New Roman', serif; font-size: 18px; color: ${colors.linen}; vertical-align: top; padding-right: 12px;">1</td>
                        <td style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13px; color: ${colors.stone}; font-weight: 300; line-height: 1.6;">
                          <strong style="color: ${colors.charcoal}; font-weight: 400;">Review</strong> — Our team reviews your project details
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="28" style="font-family: Georgia, 'Times New Roman', serif; font-size: 18px; color: ${colors.linen}; vertical-align: top; padding-right: 12px;">2</td>
                        <td style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13px; color: ${colors.stone}; font-weight: 300; line-height: 1.6;">
                          <strong style="color: ${colors.charcoal}; font-weight: 400;">Connect</strong> — We'll schedule an introductory call
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="28" style="font-family: Georgia, 'Times New Roman', serif; font-size: 18px; color: ${colors.linen}; vertical-align: top; padding-right: 12px;">3</td>
                        <td style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13px; color: ${colors.stone}; font-weight: 300; line-height: 1.6;">
                          <strong style="color: ${colors.charcoal}; font-weight: 400;">Begin</strong> — Together, we bring your vision to life
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 0 40px 40px; text-align: center;">
              <a href="https://bonddesigncompany.com/portfolio"
                 style="display: inline-block; background-color: ${colors.charcoal}; color: ${colors.white}; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 400; letter-spacing: 3px; text-transform: uppercase; text-decoration: none; padding: 16px 36px;">
                Explore Our Portfolio
              </a>
            </td>
          </tr>

          ${footerBlock()}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
