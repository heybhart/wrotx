import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Serve static files from Vite's built dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// API Endpoint for contact form / booking
const handleContactSubmission = async (req, res) => {
  const booking = req.body || {};
  const clientName = booking.name || 'Anonymous';
  const clientPhone = booking.phone || 'Not provided';
  const serviceNeeded = booking.service || booking.projectType || 'General Inquiry';
  const projectBrief = booking.projectDetails || booking.requirements || 'None provided.';
  const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  console.log(`[ProdServer] Received contact submission for ${clientName} (${clientPhone})...`);

  const SMTP_USER = process.env.SMTP_USER || 'wrotxai@gmail.com';
  const SMTP_PASS = (process.env.SMTP_PASS || 'wyjm blbg gptv wlep').replace(/\s+/g, '');
  const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
  const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
  const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
  const SMTP_RECEIVER = process.env.SMTP_RECEIVER || 'wrotxai@gmail.com';

  const adminHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0b0b; color: #e5e2e1; padding: 32px 24px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px;">
      <div style="border-bottom: 2px solid #D9480F; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="font-size: 22px; color: #ffffff; margin: 0; font-weight: 700;">[New Requirement] WrotX Contact Form</h2>
        <span style="font-size: 12px; color: #8e9192;">Submitted on: ${submittedAt} (IST)</span>
      </div>

      <div style="background-color: #131313; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 20px; margin: 20px 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr>
            <td style="padding: 8px 0; color: #8e9192; font-weight: 600; width: 140px; text-transform: uppercase; font-size: 11px;">Client Name</td>
            <td style="padding: 8px 0; color: #ffffff; font-weight: 600; font-size: 14px;">${clientName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8e9192; font-weight: 600; text-transform: uppercase; font-size: 11px;">Phone / WhatsApp</td>
            <td style="padding: 8px 0; color: #D9480F; font-weight: 600; font-size: 14px;">
              <a href="tel:${clientPhone}" style="color: #D9480F; text-decoration: none;">${clientPhone}</a>
              &nbsp;|&nbsp;
              <a href="https://wa.me/${clientPhone.replace(/[^0-9]/g, '')}" style="color: #25D366; text-decoration: none;">WhatsApp</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8e9192; font-weight: 600; text-transform: uppercase; font-size: 11px;">Service Needed</td>
            <td style="padding: 8px 0; color: #ffffff; font-weight: 500;">${serviceNeeded}</td>
          </tr>
        </table>

        <div style="margin-top: 16px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 16px;">
          <h4 style="margin: 0 0 8px 0; color: #8e9192; font-weight: 600; text-transform: uppercase; font-size: 11px;">Project Brief</h4>
          <p style="margin: 0; color: #e5e2e1; font-size: 13px; line-height: 1.6; white-space: pre-wrap; background: #0b0b0b; padding: 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.04);">${projectBrief}</p>
        </div>
      </div>

      <p style="font-size: 11px; color: #8e9192; margin-top: 24px; text-align: center;">Sent via WrotX Website Contact Section</p>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"WrotX Contact" <${SMTP_USER}>`,
      to: SMTP_RECEIVER,
      subject: `[New Requirement] ${clientName} - ${serviceNeeded}`,
      html: adminHtml,
    });

    return res.status(200).json({
      success: true,
      message: `Inquiry successfully emailed to ${SMTP_RECEIVER}`,
    });
  } catch (err) {
    console.error('[ProdServer] SMTP transmission failure:', err);
    return res.status(500).json({
      success: false,
      message: `Failed to dispatch notification: ${err.message || err}`,
    });
  }
};

app.post('/api/book', handleContactSubmission);
app.post('/api/contact', handleContactSubmission);

// Fallback all routes to index.html for React Router compatibility
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[WrotX Server] Server is running on port ${PORT}`);
});
