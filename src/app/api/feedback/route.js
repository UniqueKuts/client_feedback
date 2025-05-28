import nodemailer from 'nodemailer';

export async function POST(req) {
  const { name, company, designation, contact, experience } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.TO_EMAIL,
    subject: `Feedback from ${name}`,
    html: `
      <h2>Client Feedback Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Designation:</strong> ${designation}</p>
      <p><strong>Contact:</strong> ${contact}</p>
      <p><strong>Experience:</strong><br>${experience}</p>
      <hr />
      <p style="font-size: 12px;">Submitted through Maxon Healthcare Feedback Portal</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}