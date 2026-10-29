// Vercel Node.js serverless function for the portfolio contact form.
// Configure SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and CONTACT_TO_EMAIL in Vercel project settings.

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

  const name = String(data.user_name ?? '').trim()
  const email = String(data.user_email ?? '').trim()
  const subject = String(data.subject ?? '').trim()
  const body = String(data.message ?? '').trim()

  if (!name || !email || !subject || !body) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  if (name.length > 120 || email.length > 254 || subject.length > 150 || body.length > 5000) {
    return res.status(400).json({ error: 'Invalid field length' })
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  const safeSubjectName = name.replace(/[\r\n]+/g, ' ')
  const safeSubject = subject.replace(/[\r\n]+/g, ' ')

  const SMTP_HOST = process.env.SMTP_HOST
  const SMTP_PORT = process.env.SMTP_PORT || 587
  const SMTP_USER = process.env.SMTP_USER
  const SMTP_PASS = process.env.SMTP_PASS
  const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'nikhil82647@gmail.com'

  const port = Number(SMTP_PORT)
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    return res.status(500).json({ error: 'Mail server not configured' })
  }

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
      to: CONTACT_TO_EMAIL,
      subject: `Portfolio contact: ${safeSubject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${body}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Subject:</strong> ${escapeHtml(subject)}</p><p><strong>Message:</strong></p><p>${escapeHtml(body).replace(/\n/g, '<br/>')}</p>`,
      replyTo: email,
    }

    await transporter.sendMail(mailOptions)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('send-contact error', err)
    return res.status(500).json({ error: 'Failed to send' })
  }
}
