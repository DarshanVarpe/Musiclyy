'use client';

import React, { FormEvent, useState } from 'react';
import { BackgroundBeams } from '@/components/ui/background-beams';
import emailjs from '@emailjs/browser';

function MusicSchoolContactUs() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const templateParams = {
        from_email: email,
        message: message,
      };

      const response = await emailjs.send(
        'service_smdvce6',      // ✅ Replace with your actual EmailJS service ID
        'template_1anllbm',     // ✅ Replace with your EmailJS template ID
        templateParams,
        '2GsMrQOHu-ohs2rbe'     // ✅ Your EmailJS public key
      );

      if (response.status === 200) {
        console.log('✅ Email sent successfully');
        setStatus('success');
        setEmail('');
        setMessage('');
      } else {
        console.error('⚠️ Email send failed with status:', response.status);
        setStatus('error');
      }
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 pt-36 relative">
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="max-w-2xl mx-auto p-4 relative z-10">
        <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-8 text-white">
          Contact Us
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center">
          We&apos;re here to help with any questions about our courses,
          programs, or events. Reach out and let us know how we can assist you
          in your musical journey.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
            rows={5}
            required
          ></textarea>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {status === 'success' && (
          <p className="mt-4 text-green-400 text-center">✅ Message sent successfully!</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-400 text-center">❌ Failed to send message. Please try again.</p>
        )}
      </div>
    </div>
  );
}

export default MusicSchoolContactUs;
