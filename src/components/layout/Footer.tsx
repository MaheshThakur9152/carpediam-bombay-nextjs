import React from 'react';
import Link from 'next/link';
import { CarpediamLogo } from './CarpediamLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-neutral-200 text-neutral-800 pt-16 pb-12 text-[11px] font-light">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        {/* 4 Main Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-16 border-b border-neutral-200">
          {/* Column 1: CLIENT CARE */}
          <div>
            <h4 className="font-serif text-xs uppercase tracking-widest text-neutral-900 font-semibold mb-5">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-neutral-600">
              <li><Link href="/stores" className="hover:underline">Contact Client Advisors</Link></li>
              <li><Link href="/stores" className="hover:underline">Book an In-Store Appointment</Link></li>
              <li><Link href="/stores" className="hover:underline">Book a Virtual Consultation</Link></li>
              <li><Link href="/stores" className="hover:underline">Find a Boutique</Link></li>
              <li><span className="text-neutral-400">Complimentary Shipping & Returns</span></li>
              <li><span className="text-neutral-400">Jewelry Care & Cleaning Guide</span></li>
            </ul>
          </div>

          {/* Column 2: SERVICES & ATELIERS */}
          <div>
            <h4 className="font-serif text-xs uppercase tracking-widest text-neutral-900 font-semibold mb-5">
              Services & Ateliers
            </h4>
            <ul className="space-y-2.5 text-neutral-600">
              <li><Link href="/love-engagement" className="hover:underline">Bespoke Diamond Consultations</Link></li>
              <li><Link href="/jewelry" className="hover:underline">Custom Engraving Services</Link></li>
              <li><span className="text-neutral-400">Master Craftsman Repairs</span></li>
              <li><span className="text-neutral-400">Heritage Restoration</span></li>
            </ul>
          </div>

          {/* Column 3: THE HOUSE */}
          <div>
            <h4 className="font-serif text-xs uppercase tracking-widest text-neutral-900 font-semibold mb-5">
              The House
            </h4>
            <ul className="space-y-2.5 text-neutral-600">
              <li><Link href="/love-engagement" className="hover:underline">Ethical Sourcing & Sustainability</Link></li>
              <li><Link href="/jewelry" className="hover:underline">Craftsmanship & High Artistry</Link></li>
              <li><span className="text-neutral-400">The Carpediam Foundation</span></li>
              <li><span className="text-neutral-400">Press & Editorial Inquiries</span></li>
            </ul>
          </div>

          {/* Column 4: LEGAL & POLICIES */}
          <div>
            <h4 className="font-serif text-xs uppercase tracking-widest text-neutral-900 font-semibold mb-5">
              Legal
            </h4>
            <ul className="space-y-2.5 text-neutral-600">
              <li><span className="text-neutral-400">Privacy Policy</span></li>
              <li><span className="text-neutral-400">Terms & Conditions of Sale</span></li>
              <li><span className="text-neutral-400">Supply Chain Transparency</span></li>
              <li><span className="text-neutral-400">Do Not Sell My Information</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-neutral-500 text-[10px] space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <CarpediamLogo className="h-5 w-auto text-neutral-800" />
            <span>&copy; 2026 Carpediam Bombay. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-6 uppercase tracking-widest text-[9px]">
            <span>United States / USD</span>
            <span>Site Security Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
