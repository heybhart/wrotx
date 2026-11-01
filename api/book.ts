import { sendBookingEmails, type BookingDetails } from '../src/lib/email';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const booking: BookingDetails = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const result = await sendBookingEmails(booking);
    return res.status(result.success ? 200 : 500).json(result);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: `Failed to dispatch notification: ${err?.message || err}`,
    });
  }
}

