import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Here you'd send the data to your backend or an email service like SendGrid, AWS SES, etc.
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setSuccess('Your message has been sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        throw new Error('Failed to send message.');
      }
    } catch (error) {
      setError('There was a problem sending your message. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh] w-full px-4 py-8">
      <h1 className='text-4xl text-center tracking-tight font-bold text-slate-800 max-w-7xl sm:text-5xl md:text-6xl lg:text-8xl mb-8'>
        Contact Us
      </h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        {success && <div className="mb-4 text-green-500">{success}</div>}
        {error && <div className="mb-4 text-red-500">{error}</div>}

        <div className="mb-4">
          <label className="block text-slate-700 text-lg font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            placeholder="Your Name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-slate-700 text-lg font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            placeholder="Your Email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-slate-700 text-lg font-medium mb-2">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            placeholder="Your Message"
            rows="6"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-slate-800 text-white font-medium rounded-md hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          Send Message
        </button>
      </form>

      <div className="flex space-x-4 mt-8">
        <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:text-slate-900">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            {/* Twitter SVG Icon */}
          </svg>
        </a>
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:text-slate-900">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            {/* GitHub SVG Icon */}
          </svg>
        </a>
        {/* Add more social media links as needed */}
      </div>
    </div>
  );
}

export default Contact;
