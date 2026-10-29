// Legacy Netlify handler retained for reference/legacy deployments.
// Vercel deployment uses api/send-contact.js.

import nodemailer from 'nodemailer'

function escapeHtml(value) {
  return String(value).replace(/[&<>"'']/g, (character) => {
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

  if (!data || typeof data !== 'object') {
    data = {}
  }

  const name = String(data.user_name ?? '').trim()
  const email = String(data.user_email ?? '').trim()
  const body = String(data.message ?? '').trim()

  if (!name || !email || !body) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing fields' }) }
  }

  if (name.length > 120 || email.length > 254 || body.length > 5000) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid field length' }) }
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid email address' }) }
  }

  const safeSubjectName = name.replace(/[\r\n]+/g, ' ')

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

  const port = Number(SMTP_PORT)
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Mail server not configured' }) }
  }

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Mail server not configured' }) }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT, 10),
      secure: SMTP_PORT == 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })

    const mailOptions = {
      from: SMTP_USER,
      to: TO_EMAIL,
      subject: `Portfolio contact from ${safeSubjectName}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${body}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong></p><p>${escapeHtml(body).replace(/\n/g, '<br/>')}</p>`,
      replyTo: email,
    }

    await transporter.sendMail(mailOptions)
    return { statusCode: 200, body: JSON.stringify({ ok: true }) }
  } catch (err) {
    console.error('send-contact error', err)
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send' }) }
  }
}
