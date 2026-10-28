import React from 'react';
import Link from 'next/link';
import { HomeHero } from '../components/editorial/HomeHero';
import { NewsletterSignup } from '../components/editorial/NewsletterSignup';

export default function HomePage() {
  const categories = [
    { title: 'NECKLACES & PENDANTS', image: '/images/img_26.jpg', slug: 'necklaces-pendants' },
    { title: 'BRACELETS', image: '/images/img_27.jpg', slug: 'bracelets' },
    { title: 'EARRINGS', image: '/images/img_28.jpg', slug: 'earrings' },
    { title: 'RINGS', image: '/images/img_1.jpg', slug: 'rings' }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section with Cloudinary Stream */}
      <HomeHero />

      {/* 2. Shop by Category (Clean whitespace with 4 categories) */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 sm:px-12 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-900 mb-14 tracking-tight">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {categories.map(cat => (
            <Link
              key={cat.title}
              href={`/jewelry/${cat.slug}`}
              className="cursor-pointer group flex flex-col items-center"
            >
              <div className="aspect-square w-full bg-[#FAFBFB] overflow-hidden border border-neutral-100">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-5 text-xs uppercase tracking-[0.2em] font-medium text-neutral-900 group-hover:text-[#008080] transition-colors">
                {cat.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Icon Collections */}
      <section className="py-20 bg-white border-t border-neutral-100 text-center">
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight">
            Icon Collections
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto">
            For 189 years, Carpediam&apos;s iconic collections have helped an ever-changing world speak the ever-changing language of love.
          </p>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
          {/* Knot by Carpediam */}
          <Link
            href="/jewelry/necklaces-pendants"
            className="flex flex-col items-center text-center group cursor-pointer"
          >
            <div className="aspect-4/3 w-full bg-[#FAFBFB] overflow-hidden border border-neutral-100">
              <img
                src="/images/img_29.jpg"
                alt="Knot by Carpediam"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <h3 className="mt-6 font-serif text-xl sm:text-2xl font-normal text-neutral-900">
              Knot by Carpediam
            </h3>
            <span className="mt-2 text-[11px] uppercase tracking-widest font-semibold border-b border-black pb-0.5 group-hover:text-[#008080] group-hover:border-[#008080] transition-colors">
              Shop Now
            </span>
          </Link>

          {/* T by Carpediam */}
          <Link
            href="/jewelry/bracelets"
            className="flex flex-col items-center text-center group cursor-pointer"
          >
            <div className="aspect-4/3 w-full bg-[#FAFBFB] overflow-hidden border border-neutral-100">
              <img
                src="/images/img_27.jpg"
                alt="T by Carpediam"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <h3 className="mt-6 font-serif text-xl sm:text-2xl font-normal text-neutral-900">
              T by Carpediam
            </h3>
            <span className="mt-2 text-[11px] uppercase tracking-widest font-semibold border-b border-black pb-0.5 group-hover:text-[#008080] group-hover:border-[#008080] transition-colors">
              Shop Now
            </span>
          </Link>
        </div>
      </section>

      {/* 4. Most Popular Jewelry Styles */}
      <section className="py-20 bg-[#FAFBFB] border-t border-neutral-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-900 leading-tight">
              Most Popular Jewelry Styles
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              Our most desired designs balance artistic vision with exemplary craftsmanship.
            </p>
            <Link
              href="/jewelry"
              className="mt-6 inline-block text-[11px] uppercase tracking-widest font-semibold border-b border-black pb-0.5 hover:text-[#008080] hover:border-[#008080] transition-colors"
            >
              Shop Now
            </Link>
          </div>

          <Link
            href="/jewelry"
            className="order-1 lg:order-2 aspect-4/3 overflow-hidden bg-white border border-neutral-100 cursor-pointer block"
          >
            <img
              src="/images/img_1.jpg"
              alt="Most Popular Jewelry Styles"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </Link>
        </div>
      </section>

      {/* 5. Introducing Scarves by Carpediam */}
      <section className="py-20 bg-white border-t border-neutral-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-4/3 overflow-hidden bg-neutral-100">
            <img
              src="/images/img_22.webp"
              alt="Introducing Scarves by Carpediam"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>

          <div className="max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-900 leading-tight">
              Introducing Scarves by Carpediam
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              Since 1845, Carpediam Bombay has offered exceptional scarves and textiles. Today, each silk creation is handcrafted by artisans in Italy and symbolizes the artistry, exquisite craft and rich heritage that have been synonymous with the House for nearly two centuries.
            </p>
            <Link
              href="/jewelry"
              className="mt-6 inline-block text-[11px] uppercase tracking-widest font-semibold border-b border-black pb-0.5 hover:text-[#008080] hover:border-[#008080] transition-colors"
            >
              Discover More
            </Link>
          </div>
        </div>
      </section>

      {/* 6. The Carpediam Experience (3 Service Pillars) */}
      <section className="py-24 bg-white border-t border-neutral-100 text-center">
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight">
            The Carpediam Experience
          </h2>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Pillar 1 */}
          <div className="flex flex-col items-center max-w-sm mx-auto">
            <h3 className="font-serif text-lg font-medium text-neutral-900">
              Book an Appointment
            </h3>
            <p className="mt-3 text-xs text-neutral-600 font-light leading-relaxed min-h-[48px]">
              Master the art of gifting with a one-on-one in-store or virtual appointment with a Carpediam Bombay client advisor.
            </p>
            <Link
              href="/stores"
              className="mt-4 text-[11px] uppercase tracking-widest font-semibold border-b border-black pb-0.5 hover:text-[#008080] hover:border-[#008080] transition-colors"
            >
              Book an Appointment
            </Link>
          </div>

          {/* Pillar 2 */}
          <div className="flex flex-col items-center max-w-sm mx-auto">
            <h3 className="font-serif text-lg font-medium text-neutral-900">
              Personalization
            </h3>
            <p className="mt-3 text-xs text-neutral-600 font-light leading-relaxed min-h-[48px]">
              Make a design from Carpediam Bombay even more memorable with bespoke engraving and custom settings.
            </p>
            <Link
              href="/jewelry"
              className="mt-4 text-[11px] uppercase tracking-widest font-semibold border-b border-black pb-0.5 hover:text-[#008080] hover:border-[#008080] transition-colors"
            >
              Learn More
            </Link>
          </div>

          {/* Pillar 3 */}
          <div className="flex flex-col items-center max-w-sm mx-auto">
            <h3 className="font-serif text-lg font-medium text-neutral-900">
              Contact Us
            </h3>
            <p className="mt-3 text-xs text-neutral-600 font-light leading-relaxed min-h-[48px]">
              From tailored gifting advice to providing in-store or virtual shopping appointments, we are always at your service.
            </p>
            <Link
              href="/stores"
              className="mt-4 text-[11px] uppercase tracking-widest font-semibold border-b border-black pb-0.5 hover:text-[#008080] hover:border-[#008080] transition-colors"
            >
              Contact Boutique
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Newsletter */}
      <NewsletterSignup />
    </div>
  );
}
