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

// API Endpoint for booking
app.post('/api/book', async (req, res) => {
  const booking = req.body;
  console.log(`[ProdServer] Received submission for ${booking.name} (${booking.email})...`);

  const SMTP_USER = process.env.SMTP_USER || 'wrotxai@gmail.com';
  const SMTP_PASS = (process.env.SMTP_PASS || 'wyjm blbg gptv wlep').replace(/\s+/g, '');
  const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
  const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
  const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
  const SMTP_RECEIVER = process.env.SMTP_RECEIVER || 'wrotxai@gmail.com';

  const projectTypeName = booking.projectType;
  const companyLabel = booking.company || 'N/A';
  const requirementsText = booking.requirements || 'None provided.';

  // Build HTML email for Admin
  const adminHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0b0b0b; color: #e5e2e1; padding: 40px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px;">
      <h2 style="font-size: 24px; color: #ffffff; border-bottom: 2px solid #d4a843; padding-bottom: 12px; margin-bottom: 20px; font-weight: 600; tracking-tight: -0.02em;">[New Submission] WrotX Contact / Alignment Call</h2>
      <p style="font-size: 14px; color: #c4c7c8; line-height: 1.6;">A user has submitted the following details on the WrotX site:</p>
      
      <div style="background-color: #131313; border: 1px solid rgba(255,255,255,0.04); border-radius: 8px; padding: 20px; margin: 24px 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr>
            <td style="padding: 6px 0; color: #8e9192; font-weight: 500; width: 140px; text-transform: uppercase; font-size: 11px;">Client Name</td>
            <td style="padding: 6px 0; color: #ffffff; font-weight: 600;">${booking.name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #8e9192; font-weight: 500; text-transform: uppercase; font-size: 11px;">Work Email</td>
            <td style="padding: 6px 0; color: #ffffff;"><a href="mailto:${booking.email}" style="color: #d4a843; text-decoration: none;">${booking.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #8e9192; font-weight: 500; text-transform: uppercase; font-size: 11px;">Company</td>
            <td style="padding: 6px 0; color: #ffffff;">${companyLabel}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #8e9192; font-weight: 500; text-transform: uppercase; font-size: 11px;">Category / Service</td>
            <td style="padding: 6px 0; color: #ffffff;">${projectTypeName}</td>
          </tr>
          <tr style="border-top: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 12px 0 6px 0; color: #8e9192; font-weight: 500; text-transform: uppercase; font-size: 11px;">Date</td>
            <td style="padding: 12px 0 6px 0; color: #ffffff; font-weight: 600;">${booking.dateStr || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #8e9192; font-weight: 500; text-transform: uppercase; font-size: 11px;">Time Slot</td>
            <td style="padding: 6px 0; color: #d4a843; font-weight: 600;">${booking.timeSlot || 'N/A'} (UTC)</td>
          </tr>
        </table>
        
        <div style="margin-top: 16px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 16px;">
          <h4 style="margin: 0 0 8px 0; color: #8e9192; font-weight: 500; text-transform: uppercase; font-size: 11px;">Scope Brief / Requirements</h4>
          <p style="margin: 0; color: #e5e2e1; font-size: 13px; line-height: 1.6; font-style: italic; white-space: pre-wrap;">"${requirementsText}"</p>
        </div>
      </div>
      
      <p style="font-size: 11px; color: #8e9192; margin-top: 30px; text-align: center;">WrotX Systems Relay</p>
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
      from: `"WrotX Systems" <${SMTP_USER}>`,
      to: SMTP_RECEIVER,
      subject: `[New Submission] ${booking.name} - ${companyLabel}`,
      html: adminHtml,
    });

    if (booking.email && booking.email.includes('@')) {
      try {
        const clientHtml = `<div style="font-family: sans-serif; padding: 20px;"><h2>Inquiry Received</h2><p>Hi ${booking.name}, thank you for reaching out to WrotX. We will get back to you shortly.</p></div>`;
        await transporter.sendMail({
          from: `"WrotX Systems" <${SMTP_USER}>`,
          to: booking.email,
          subject: `Inquiry Received: WrotX Systems Architect`,
          html: clientHtml,
        });
      } catch (clientErr) {
        console.warn('[ProdServer] Optional client auto-reply skipped:', clientErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: `Submission successfully emailed to ${SMTP_RECEIVER}`,
    });
  } catch (err) {
    console.error('[ProdServer] SMTP transmission failure:', err);
    return res.status(500).json({
      success: false,
      message: `Failed to dispatch notification: ${err.message || err}`,
    });
  }
});

// Fallback all routes to index.html for React Router compatibility
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[WrotX Server] Server is running on port ${PORT}`);
});
