'use client';

import React, { useState } from 'react';
import type { StorefrontProduct } from '../../types/commerce';
import { ProductCard } from '../product/ProductCard';
import { Calendar, Award, CheckCircle2 } from 'lucide-react';

interface LoveEngagementClientProps {
  engagementRings: StorefrontProduct[];
}

export const LoveEngagementClient: React.FC<LoveEngagementClientProps> = ({ engagementRings }) => {
  const diamondShapes = [
    { name: 'Round Brilliant', image: '/images/img_7.jpg', desc: 'The quintessential cut engineered for maximum optical fire.' },
    { name: 'Oval', image: '/images/img_8.jpg', desc: 'An elongated silhouette that gracefully flatters the hand.' },
    { name: 'Emerald', image: '/images/img_9.jpg', desc: 'Step-cut facets producing an architectural hall-of-mirrors effect.' },
    { name: 'Cushion', image: '/images/img_11.jpg', desc: 'Pillow-soft rounded corners with romantic vintage allure.' },
    { name: 'Pear', image: '/images/img_12.jpg', desc: 'A teardrop profile balancing brilliance and tapered grace.' }
  ];

  const [selectedShape, setSelectedShape] = useState(diamondShapes[0]);
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const [aptDate, setAptDate] = useState('');
  const [aptLocation, setAptLocation] = useState('New York - The Landmark');

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[60vh] max-h-[600px] bg-neutral-900 flex items-center justify-center overflow-hidden">
        <img
          src="/images/img_2.jpg"
          alt="Love and Engagement"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-2xl text-white">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-neutral-300">
            Love & Celebration
          </span>
          <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-normal tracking-wide">
            The World&apos;s Most Celebrated Rings
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-neutral-200 font-light leading-relaxed">
            Since 1886, The Carpediam® Setting has stood as the ultimate symbol of love. Discover an engagement ring as extraordinary as your commitment.
          </p>
        </div>
      </section>

      {/* Iconic Ring Highlights */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#008080] font-semibold">
            Peerless Diamond Craft
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-900 mt-1">
            Iconic Engagement Rings
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {engagementRings.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Diamond Cut & Silhouette Exploration */}
      <section className="py-20 bg-[#FAFBFB] border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-900">
              Explore Diamond Shapes
            </h2>
            <p className="text-xs text-neutral-500 mt-2">
              Select a silhouette to understand its distinct optical characteristics and craftsmanship.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {diamondShapes.map(shape => (
              <button
                key={shape.name}
                onClick={() => setSelectedShape(shape)}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-all border ${
                  selectedShape.name === shape.name
                    ? 'border-black bg-black text-white font-semibold shadow-xs'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-black'
                }`}
              >
                {shape.name}
              </button>
            ))}
          </div>

          <div className="bg-white border border-neutral-200 p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-48 sm:w-64 sm:h-64 flex-shrink-0 bg-[#FAFBFB] border border-neutral-100 overflow-hidden">
              <img
                src={selectedShape.image}
                alt={selectedShape.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="text-[10px] uppercase tracking-widest text-[#008080] font-semibold">Shape Profile</span>
              <h3 className="font-serif text-2xl font-normal text-neutral-900 mt-1">{selectedShape.name} Cut</h3>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed font-light">{selectedShape.desc}</p>
              <div className="mt-6 flex items-center justify-center md:justify-start space-x-4 text-xs text-neutral-500">
                <span className="flex items-center space-x-1.5"><Award className="w-4 h-4 text-[#008080]" /><span>Triple Excellent Cut</span></span>
                <span className="flex items-center space-x-1.5"><Award className="w-4 h-4 text-[#008080]" /><span>Sustainably Sourced</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Consultation Form */}
      <section className="py-20 max-w-2xl mx-auto px-4 text-center">
        <h2 className="font-serif text-3xl font-normal text-neutral-900">
          Book an In-Person Consultation
        </h2>
        <p className="mt-2 text-xs text-neutral-500 max-w-md mx-auto">
          Meet with a Carpediam diamond expert at one of our flagship boutiques.
        </p>

        {appointmentBooked ? (
          <div className="mt-8 p-6 bg-[#f0f9f8] border border-[#d8ecea] text-center text-xs text-[#002a2c] space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#008080] mx-auto" />
            <p className="font-semibold text-sm">Consultation Requested</p>
            <p>Your request for {aptLocation} on {aptDate || 'upcoming date'} has been recorded for our team.</p>
          </div>
        ) : (
          <form
            onSubmit={e => {
              e.preventDefault();
              setAppointmentBooked(true);
            }}
            className="mt-8 space-y-4 text-left"
          >
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-600 mb-1">
                Select Boutique Location
              </label>
              <select
                value={aptLocation}
                onChange={e => setAptLocation(e.target.value)}
                className="w-full p-3 border border-neutral-300 text-xs bg-white text-neutral-900 outline-none"
              >
                <option>New York - The Landmark (727 Fifth Ave)</option>
                <option>Beverly Hills - Rodeo Drive</option>
                <option>London - Old Bond Street</option>
                <option>Paris - Place Vendôme</option>
                <option>Mumbai - Bandra Kurla Complex</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-600 mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                required
                value={aptDate}
                onChange={e => setAptDate(e.target.value)}
                className="w-full p-3 border border-neutral-300 text-xs bg-white text-neutral-900 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-black text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Confirm Appointment Request</span>
            </button>
          </form>
        )}
      </section>
    </div>
  );
};
