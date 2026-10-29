// Legacy Netlify handler retained for reference/legacy deployments.
// Vercel deployment uses api/send-contact.js.


import nodemailer from 'nodemailer'

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }

    return entities[character]
  })
}

export const handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  let data
  try {
    data = JSON.parse(event.body || '{}')
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) }
  }

  const { user_name, user_email, message } = data
  if (!user_name || !user_email || !message) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing fields' }) }
  }

// Required Netlify environment variables (set in the Netlify UI, never commit values):
// - SMTP_HOST: SMTP server hostname
// - SMTP_USER: SMTP username/authenticated sender
// - SMTP_PASS: SMTP password or app password
// Optional:
// - SMTP_PORT: SMTP port (defaults to 587; use 465 for implicit TLS)
// - TO_EMAIL: recipient address (defaults to nikhil82647@gmail.com)

  const SMTP_HOST = process.env.SMTP_HOST
  const SMTP_PORT = process.env.SMTP_PORT || 587
  const SMTP_USER = process.env.SMTP_USER
  const SMTP_PASS = process.env.SMTP_PASS
  const TO_EMAIL = process.env.TO_EMAIL || 'nikhil82647@gmail.com'

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Mail server not configured' }) }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT, 10),
      secure: SMTP_PORT == 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })

    const mailOptions = {
      from: SMTP_USER, // must be the authenticated sender for many SMTP providers
      to: TO_EMAIL,
      subject: `Portfolio contact from ${user_name}`,
      text: `Name: ${user_name}\nEmail: ${user_email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(user_name)}</p><p><strong>Email:</strong> ${escapeHtml(user_email)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`,
      replyTo: user_email,
    }

    await transporter.sendMail(mailOptions)
    return { statusCode: 200, body: JSON.stringify({ ok: true }) }
  } catch (err) {
    console.error('send-contact error', err)
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send' }) }
  }
}
