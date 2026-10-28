'use client';

import React, { useState } from 'react';

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section className="py-16 bg-[#FAFBFB] border-t border-neutral-100 text-center">
      <div className="max-w-md mx-auto px-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-900 tracking-tight">
          Latest from Carpediam Bombay
        </h2>

        {subscribed ? (
          <p className="mt-4 text-xs text-[#008080] font-medium">
            Thank you for subscribing to Carpediam Bombay updates.
          </p>
        ) : (
          <form
            onSubmit={e => {
              e.preventDefault();
              if (email) setSubscribed(true);
            }}
            className="mt-6 flex items-center justify-center max-w-sm mx-auto border-b border-neutral-300 pb-1"
          >
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="EMAIL"
              className="w-full py-2 bg-transparent text-xs tracking-widest placeholder-neutral-400 outline-none uppercase font-light text-neutral-900"
              aria-label="Email address for newsletter"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#EFEFEF] hover:bg-neutral-300 text-neutral-800 text-[10px] uppercase tracking-widest font-semibold transition-colors flex-shrink-0 cursor-pointer"
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
