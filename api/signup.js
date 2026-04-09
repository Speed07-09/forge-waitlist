export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, position } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const firstName = name ? name.split(' ')[0] : 'there';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'FORGE <onboarding@resend.dev>',
        to: email,
        subject: `You're #${position} on the FORGE waitlist.`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          </head>
          <body style="margin:0; padding:0; background:#0a0a0a; font-family:'DM Sans',Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a; padding: 48px 24px;">
              <tr>
                <td align="center">
                  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

                    <!-- LOGO -->
                    <tr>
                      <td style="padding-bottom:40px;">
                        <p style="font-family:Arial,sans-serif; font-size:22px; font-weight:900; letter-spacing:6px; color:#f0f0f0; margin:0;">FORGE</p>
                      </td>
                    </tr>

                    <!-- HERO -->
                    <tr>
                      <td style="padding-bottom:32px; border-bottom:1px solid rgba(255,255,255,0.07);">
                        <p style="font-size:11px; letter-spacing:4px; color:#e8ff47; text-transform:uppercase; margin:0 0 16px 0;">You're in.</p>
                        <h1 style="font-size:40px; font-weight:900; color:#f0f0f0; margin:0 0 16px 0; line-height:1.1;">
                          Welcome to FORGE,<br/>${firstName}.
                        </h1>
                        <p style="font-size:16px; color:#666; line-height:1.7; margin:0;">
                          You're <strong style="color:#e8ff47;">#${position}</strong> on the waitlist. 
                          When FORGE launches publicly, you'll be one of the first to know.
                        </p>
                      </td>
                    </tr>

                    <!-- WHAT TO EXPECT -->
                    <tr>
                      <td style="padding:32px 0; border-bottom:1px solid rgba(255,255,255,0.07);">
                        <p style="font-size:11px; letter-spacing:4px; color:#666; text-transform:uppercase; margin:0 0 24px 0;">What to expect</p>
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding-bottom:20px; vertical-align:top;">
                              <table cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="padding-right:16px; vertical-align:top;">
                                    <div style="width:32px; height:32px; background:rgba(232,255,71,0.1); border-radius:8px; text-align:center; line-height:32px; font-size:14px;">⚡</div>
                                  </td>
                                  <td>
                                    <p style="font-size:14px; font-weight:600; color:#f0f0f0; margin:0 0 4px 0;">AI-Personalized 30-Day Plan</p>
                                    <p style="font-size:13px; color:#666; margin:0; line-height:1.6;">Built around your body, equipment, and goals. Not a template.</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-bottom:20px; vertical-align:top;">
                              <table cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="padding-right:16px; vertical-align:top;">
                                    <div style="width:32px; height:32px; background:rgba(232,255,71,0.1); border-radius:8px; text-align:center; line-height:32px; font-size:14px;">✅</div>
                                  </td>
                                  <td>
                                    <p style="font-size:14px; font-weight:600; color:#f0f0f0; margin:0 0 4px 0;">Daily Habit Tracker</p>
                                    <p style="font-size:13px; color:#666; margin:0; line-height:1.6;">5 daily habits, streak tracking, and accountability built in.</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="vertical-align:top;">
                              <table cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="padding-right:16px; vertical-align:top;">
                                    <div style="width:32px; height:32px; background:rgba(232,255,71,0.1); border-radius:8px; text-align:center; line-height:32px; font-size:14px;">📊</div>
                                  </td>
                                  <td>
                                    <p style="font-size:14px; font-weight:600; color:#f0f0f0; margin:0 0 4px 0;">Transformation Dashboard</p>
                                    <p style="font-size:13px; color:#666; margin:0; line-height:1.6;">Watch yourself improve in real time. Week by week.</p>
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
                      <td style="padding:32px 0; text-align:center; border-bottom:1px solid rgba(255,255,255,0.07);">
                        <p style="font-size:15px; color:#666; margin:0 0 24px 0;">Stay close. Big things coming.</p>
                        <a href="https://forge-waitlist-xi.vercel.app" 
                           style="display:inline-block; background:#e8ff47; color:#0a0a0a; font-size:14px; font-weight:700; letter-spacing:1px; padding:14px 32px; border-radius:10px; text-decoration:none;">
                          VIEW THE WAITLIST PAGE
                        </a>
                      </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                      <td style="padding-top:32px;">
                        <p style="font-size:12px; color:#333; margin:0; line-height:1.7;">
                          You're receiving this because you signed up for the FORGE waitlist.<br/>
                          No spam. Ever. You'll only hear from us when it matters.
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `
      })
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}