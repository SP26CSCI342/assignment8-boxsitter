import React, { useState } from 'react';
import toast from 'react-hot-toast';

function Subscription() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    toast.success(`Thanks! We'll send updates to ${email}.`);
    setEmail('');
  };

  return (
    <div style={{ backgroundColor: '#1e2126', padding: '2.2rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', color: '#fff', width: '100%' }}>
      <div style={{ maxWidth: '36rem', width: '100%' }}>
        <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.7rem', fontWeight: 600, marginBottom: '0.75rem', color: '#fff' }}>
          Get the Latest Eats
        </h2>
        <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: '0.95rem', fontWeight: 300, marginBottom: '2rem', color: '#ccc', lineHeight: 1.5 }}>
          Subscribe to our newsletter for fresh restaurant recommendations delivered to your inbox.
        </p>
        <form
          style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="email-address" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Subscribe</label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{
              width: '18rem',
              padding: '0.8rem 1rem',
              border: '1px solid #3a3f47',
              borderRadius: '4px',
              backgroundColor: '#fff',
              fontFamily: "'Work Sans', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 500,
              color: '#333',
            }}
            placeholder="Enter your email"
          />
          <button
            type="submit"
            style={{
              padding: '0.8rem 1.7rem',
              border: 'none',
              borderRadius: '4px',
              backgroundColor: '#cca353',
              color: '#fff',
              fontFamily: "'Work Sans', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.5s',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#a7874b'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#cca353'}
          >
            Notify me
          </button>
        </form>
      </div>
    </div>
  );
}

export default Subscription;
