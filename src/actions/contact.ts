'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContactForm(prevState: any, formData: FormData): Promise<{ success?: boolean; error?: string | null }> {
  try {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const company = formData.get('company') as string
    const message = formData.get('message') as string

    if (!name || !email || !message) {
      return { error: 'Name, email, and message are required.' }
    }

    // Attempt to send email
    const { data, error } = await resend.emails.send({
      from: 'Desire Creatives <onboarding@resend.dev>', // Use a verified domain or onboarding@resend.dev for testing 
      to: process.env.CONTACT_EMAIL || 'support@desirecreatives.com', // Replace with user's actual email or use env
      subject: `New Project Inquiry from ${name}`,
      html: `
        <h2>New Inquiry from Desire Creatives</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return { error: 'Failed to send message. Please try again later.' }
  }
}
