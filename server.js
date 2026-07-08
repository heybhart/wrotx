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

// Helper project type name
const getProjectTypeName = (type) => {
  const types = {
    saas: 'SaaS Multi-tenant Platforms',
    web: 'Websites & Client Portals',
    mobile: 'Mobile Applications',
    ai: 'AI Automations & Voice Agents',
    custom: 'Enterprise CRM / Custom Software',
  };
  return types[type] || type;
};

// API Endpoint for booking
app.post('/api/book', async (req, res) => {
  const booking = req.body;
  console.log(`[ProdServer] Received booking request for ${booking.email}...`);

  const SMTP_USER = process.env.SMTP_USER || '';
  const SMTP_PASS = process.env.SMTP_PASS || '';
  const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
  const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
  const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
  const SMTP_RECEIVER = process.env.SMTP_RECEIVER || 'work@wrotx.in';

  const projectTypeName = booking.projectType;
  const companyLabel = booking.company || 'N/A';
  const requirementsText = booking.requirements || 'None provided.';

  // Build HTML email for Admin
  const adminHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0b0b0b; color: #e5e2e1; padding: 40px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px;">
      <h2 style="font-size: 24px; color: #ffffff; border-bottom: 2px solid #d4a843; padding-bottom: 12px; margin-bottom: 20px; font-weight: 600; tracking-tight: -0.02em;">[New Booking] Alignment Call Scheduled</h2>
      <p style="font-size: 14px; color: #c4c7c8; line-height: 1.6;">A client has scheduled an alignment call. Here are the discovery details:</p>
      
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
            <td style="padding: 6px 0; color: #8e9192; font-weight: 500; text-transform: uppercase; font-size: 11px;">Category</td>
            <td style="padding: 6px 0; color: #ffffff;">${projectTypeName}</td>
          </tr>
          <tr style="border-top: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 12px 0 6px 0; color: #8e9192; font-weight: 500; text-transform: uppercase; font-size: 11px;">Date</td>
            <td style="padding: 12px 0 6px 0; color: #ffffff; font-weight: 600;">${booking.dateStr}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #8e9192; font-weight: 500; text-transform: uppercase; font-size: 11px;">Time Slot</td>
            <td style="padding: 6px 0; color: #d4a843; font-weight: 600;">${booking.timeSlot} (UTC)</td>
          </tr>
        </table>
        
        <div style="margin-top: 16px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 16px;">
          <h4 style="margin: 0 0 8px 0; color: #8e9192; font-weight: 500; text-transform: uppercase; font-size: 11px;">Scope Brief / Requirements</h4>
          <p style="margin: 0; color: #e5e2e1; font-size: 13px; line-height: 1.6; font-style: italic; white-space: pre-wrap;">"${requirementsText}"</p>
        </div>
      </div>
      
      <p style="font-size: 11px; color: #8e9192; margin-top: 30px; text-align: center;">WrotX Systems Scheduler Relay</p>
    </div>
  `;

  // Build HTML email for Client
  const clientHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0b0b0b; color: #e5e2e1; padding: 40px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="font-size: 32px; color: #ffffff; font-weight: 700; margin: 0; letter-spacing: -0.03em;">WrotX</h1>
        <p style="font-size: 10px; color: #d4a843; text-transform: uppercase; letter-spacing: 0.25em; margin: 4px 0 0 0;">Systems Architect</p>
      </div>
      
      <h2 style="font-size: 20px; color: #ffffff; text-align: center; margin-bottom: 8px; font-weight: 600;">Alignment Call Secured</h2>
      <p style="font-size: 14px; color: #c4c7c8; line-height: 1.6; text-align: center; margin-bottom: 24px;">Hi ${booking.name}, your 1-on-1 discovery meeting with a WrotX architect has been confirmed.</p>
      
      <div style="background-color: #131313; border: 1px solid rgba(255,255,255,0.04); border-radius: 8px; padding: 24px; margin: 24px 0; text-align: left;">
        <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 12px; margin-bottom: 12px; display: flex; justify-content: space-between;">
          <span style="font-size: 11px; color: #8e9192; text-transform: uppercase;">Partner</span>
          <strong style="font-size: 13px; color: #ffffff;">WrotX Systems Architect</strong>
        </div>
        <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 12px; margin-bottom: 12px; display: flex; justify-content: space-between;">
          <span style="font-size: 11px; color: #8e9192; text-transform: uppercase;">Date</span>
          <strong style="font-size: 13px; color: #ffffff;">${booking.dateStr}</strong>
        </div>
        <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 12px; margin-bottom: 12px; display: flex; justify-content: space-between;">
          <span style="font-size: 11px; color: #8e9192; text-transform: uppercase;">Time Slot</span>
          <strong style="font-size: 13px; color: #d4a843;">${booking.timeSlot} (UTC)</strong>
        </div>
        <div style="display: flex; justify-content: space-between; padding-top: 4px;">
          <span style="font-size: 11px; color: #8e9192; text-transform: uppercase;">Meeting Venue</span>
          <a href="https://meet.google.com" target="_blank" style="font-size: 13px; color: #d4a843; text-decoration: none; font-weight: 600;">Google Meet Relay &rarr;</a>
        </div>
      </div>
      
      <p style="font-size: 13px; color: #c4c7c8; line-height: 1.6; margin-bottom: 24px;">
        During the call, we will outline your custom product roadmap, tech stack blueprints, and cost estimates. Please come prepared with any existing technical docs or system requirements you might have.
      </p>
      
      <div style="text-align: center; margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 24px;">
        <p style="font-size: 12px; color: #8e9192; margin-bottom: 12px;">Need to reschedule or cancel? Email us directly at <a href="mailto:work@wrotx.in" style="color: #d4a843; text-decoration: none;">work@wrotx.in</a></p>
        <p style="font-size: 11px; color: #5d5f5f; margin: 0;">&copy; ${new Date().getFullYear()} WrotX. All rights reserved.</p>
      </div>
    </div>
  `;

  if (!SMTP_USER || !SMTP_PASS) {
    console.warn('[ProdServer] SMTP credentials missing. Running in MOCK mode.');
    console.log('--- MOCK EMAIL DELIVERIES PRINTED TO TERMINAL ---');
    console.log('Admin Email HTML content would be:\n', adminHtml);
    console.log('Client Email HTML content would be:\n', clientHtml);
    return res.status(200).json({
      success: true,
      message: 'SMTP credentials missing. Simulated booking email successfully logged to production console.',
    });
  }

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

    // Send to Admin
    await transporter.sendMail({
      from: `"WrotX Scheduler" <${SMTP_USER}>`,
      to: SMTP_RECEIVER,
      subject: `[New Booking] Alignment Call - ${booking.name} (${companyLabel})`,
      html: adminHtml,
    });

    // Send to Client
    await transporter.sendMail({
      from: `"WrotX Systems" <${SMTP_USER}>`,
      to: booking.email,
      subject: `Appointment Confirmed: Alignment Call with WrotX`,
      html: clientHtml,
    });

    return res.status(200).json({
      success: true,
      message: 'Booking successfully scheduled and confirmed via email.',
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
