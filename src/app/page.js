'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';

export default function HomePage() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    designation: '',
    contact: '',
    experience: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSubmitted(true);
      setForm({
        name: '',
        company: '',
        designation: '',
        contact: '',
        experience: '',
      });
    } else {
      alert('Submission failed.');
    }
  };

  return (
    <main className={styles.container}>
  <Image src="/maxonlogo.png" alt="Maxon Logo" width={150} height={100} className={styles.logo} />

  <h1 className={styles.heading}>Client Feedback Form</h1>

  {submitted ? (
    <div className={styles.thankYouSection}>
      <Image
        src="/thankyou.png"
        alt="Thank you for your feedback"
        width={400}
        height={300}
        className={styles.thankYouImage}
      />
      <p className={styles.success}>Thank you! Your feedback has been submitted successfully.</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input name="name" value={form.name} onChange={handleChange} required placeholder="Name of the Person" className={styles.inputField} />
      <input name="company" value={form.company} onChange={handleChange} required placeholder="Company Name" className={styles.inputField} />
      <input name="designation" value={form.designation} onChange={handleChange} required placeholder="Designation" className={styles.inputField} />
      <input name="contact" value={form.contact} onChange={handleChange} required placeholder="Contact Number" className={styles.inputField} />
      <textarea name="experience" value={form.experience} onChange={handleChange} required placeholder="Write your experience..." className={styles.textArea} />
      <button type="submit" className={styles.button}>Submit</button>
    </form>
  )}
</main>
  );
}