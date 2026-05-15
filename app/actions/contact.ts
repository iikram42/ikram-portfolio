'use server'

import nodemailer from 'nodemailer'

interface ContactForm {
  name: string
  email: string
  message: string
}

export async function sendContactEmail(form: ContactForm): Promise<{ ok: boolean; error?: string }> {
  const { name, email, message } = form

  if (!name || !email || !message) {
    return { ok: false, error: 'All fields are required.' }
  }

  const gmailUser = process.env.GMAIL_USER
  const gmailPass = process.env.GMAIL_APP_PASSWORD

  if (!gmailUser || !gmailPass) {
    return { ok: false, error: 'Email service not configured.' }
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  })

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      to: gmailUser, // sends to yourself
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 32px; border-radius: 12px; border: 1px solid rgba(0,212,255,0.2);">
          <h2 style="color: #00d4ff; margin-bottom: 24px; font-size: 20px;">
            📬 New Contact Message
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #999; width: 80px; font-size: 13px;">Name</td>
              <td style="padding: 10px 0; color: #fff; font-weight: 600; font-size: 15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #999; font-size: 13px;">Email</td>
              <td style="padding: 10px 0;">
                <a href="mailto:${email}" style="color: #00d4ff; font-size: 14px;">${email}</a>
              </td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;" />
          <p style="color: #999; font-size: 13px; margin-bottom: 8px;">Message</p>
          <p style="color: #e5e5e5; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;" />
          <p style="color: #555; font-size: 12px;">
            Sent from your portfolio at ikramkirmanii.vercel.app<br/>
            Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    })

    return { ok: true }
  } catch (err) {
    console.error('Email send failed:', err)
    return { ok: false, error: 'Failed to send. Please try again.' }
  }
}
