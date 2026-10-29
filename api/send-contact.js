// Vercel Node.js serverless function for the portfolio contact form.
// Configure SMTP_HOST, SMTP_USER, and SMTP_PASS in Vercel project settings.
// Optional: SMTP_PORT (defaults to 587) and TO_EMAIL (defaults to nikhil82647@gmail.com).

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let data = req.body
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data || '{}')
    } catch {
      return res.status(400).json({ error: 'Invalid JSON' })
    }
  }
  if (!data || typeof data !== 'object') {
    data = {}
  }

  const { user_name, user_email, message } = data
  if (!user_name || !user_email || !message) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  const SMTP_HOST = process.env.SMTP_HOST
  const SMTP_PORT = process.env.SMTP_PORT || 587
  const SMTP_USER = process.env.SMTP_USER
  const SMTP_PASS = process.env.SMTP_PASS
  const TO_EMAIL = process.env.TO_EMAIL || 'nikhil82647@gmail.com'

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return res.status(500).json({ error: 'Mail server not configured' })
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
      subject: `Portfolio contact from ${user_name}`,
      text: `Name: ${user_name}\nEmail: ${user_email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(user_name)}</p><p><strong>Email:</strong> ${escapeHtml(user_email)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`,
      replyTo: user_email,
    }

    await transporter.sendMail(mailOptions)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('send-contact error', err)
    return res.status(500).json({ error: 'Failed to send' })
  }
}
