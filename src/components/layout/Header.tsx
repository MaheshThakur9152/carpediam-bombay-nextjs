'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Menu, X, MapPin, User, ChevronRight } from 'lucide-react';
import { CarpediamLogo } from './CarpediamLogo';
import { useCart } from '../../features/cart/CartContext';
import { useSearch } from '../../features/search/SearchContext';

export const Header: React.FC = () => {
  const { cart, setIsCartOpen } = useCart();
  const { setIsSearchOpen } = useSearch();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const isHome = pathname === '/';
  const isTransparent = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'JEWELRY', path: '/jewelry', mega: 'jewelry' },
    { label: 'LOVE & CELEBRATION', path: '/love-engagement', mega: 'love' },
    { label: 'HIGH JEWELRY', path: '/jewelry?collection=Jean+Schlumberger', mega: null },
    { label: 'ICON COLLECTIONS', path: '/jewelry?collection=Carpediam+HardWear', mega: null },
    { label: 'STORES & APPOINTMENTS', path: '/stores', mega: null },
  ];

  return (
    <header
      className={`w-full z-40 transition-all duration-300 ${
        isTransparent
          ? 'absolute top-0 left-0 bg-transparent text-white'
          : 'sticky top-0 bg-white text-black shadow-xs border-b border-neutral-100'
      }`}
    >
      {/* Top Utility Row */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 pt-3 pb-1 flex items-center justify-between text-[11px] font-medium tracking-[0.18em] uppercase">
        {/* Left Utilities */}
        <div className="flex items-center space-x-6">
          <Link
            href="/stores"
            className="flex items-center space-x-1.5 hover:opacity-70 transition-opacity"
            title="Find a Boutique"
            aria-label="Find a Boutique"
          >
            <MapPin className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center space-x-1.5 hover:opacity-70 transition-opacity"
            aria-label="Search Catalog"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>

        {/* Center Logo */}
        <div className="text-center flex-1 mx-4 flex justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center group focus:outline-none"
            aria-label="Carpediam Bombay Home"
          >
            <CarpediamLogo
              className={`transition-all duration-300 ${
                isScrolled ? 'h-7 sm:h-8 w-auto' : 'h-8 sm:h-10 lg:h-11 w-auto'
              }`}
            />
          </Link>
        </div>

        {/* Right Utilities */}
        <div className="flex items-center space-x-5 sm:space-x-6">
          <Link
            href="/stores"
            className="hidden md:inline hover:opacity-70 transition-opacity"
          >
            Contact Us
          </Link>
          <Link
            href="/favorites"
            className="hover:opacity-70 transition-opacity"
            title="Client Wishlist"
            aria-label="Client Wishlist"
          >
            <User className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative hover:opacity-70 transition-opacity"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {cart.itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#81D8D0] text-[#002a2c] text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                {cart.itemCount}
              </span>
            )}
          </button>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-1 hover:opacity-70 transition-opacity"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop Main Navigation Bar */}
      <nav className="hidden lg:flex items-center justify-center space-x-9 py-2 text-[11px] tracking-[0.2em] font-medium border-t border-transparent">
        {navLinks.map(link => (
          <div
            key={link.label}
            className="relative py-2"
            onMouseEnter={() => link.mega && setActiveMegaMenu(link.mega)}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <Link
              href={link.path}
              className={`hover:opacity-60 transition-opacity pb-1 ${
                pathname && pathname.startsWith(link.path.split('?')[0]) && link.path !== '/' ? 'border-b border-current font-semibold' : ''
              }`}
            >
              {link.label}
            </Link>

            {/* Jewelry Mega Menu */}
            {link.mega === 'jewelry' && activeMegaMenu === 'jewelry' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[850px] bg-white text-neutral-900 shadow-xl border border-neutral-100 p-8 grid grid-cols-3 gap-8 z-50 text-left animate-in fade-in duration-200">
                <div>
                  <h4 className="font-serif text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-3">
                    Categories
                  </h4>
                  <ul className="space-y-2.5 text-xs">
                    <li><Link href="/jewelry/necklaces-pendants" className="hover:underline">Necklaces & Pendants</Link></li>
                    <li><Link href="/jewelry/bracelets" className="hover:underline">Bracelets</Link></li>
                    <li><Link href="/jewelry/rings" className="hover:underline">Rings</Link></li>
                    <li><Link href="/jewelry/earrings" className="hover:underline">Earrings</Link></li>
                    <li><Link href="/jewelry" className="hover:underline font-medium text-[#008080]">Explore All Jewelry</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-serif text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-3">
                    Iconic Collections
                  </h4>
                  <ul className="space-y-2.5 text-xs">
                    <li><Link href="/jewelry?collection=Carpediam+HardWear" className="hover:underline">Carpediam HardWear</Link></li>
                    <li><Link href="/jewelry?collection=Carpediam+T" className="hover:underline">Carpediam T</Link></li>
                    <li><Link href="/jewelry?collection=Carpediam+Knot" className="hover:underline">Carpediam Knot</Link></li>
                    <li><Link href="/jewelry?collection=Carpediam+Lock" className="hover:underline">Carpediam Lock</Link></li>
                    <li><Link href="/jewelry?collection=Jean+Schlumberger" className="hover:underline">Jean Schlumberger</Link></li>
                  </ul>
                </div>
                <div className="bg-neutral-50 p-4 border border-neutral-100 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#008080] font-semibold">Featured</span>
                    <h5 className="font-serif text-sm font-medium mt-1">Carpediam T Smile</h5>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                      Elegance curved in lustrous 18k gold. The signature smile motif represents happiness and pure connection.
                    </p>
                  </div>
                  <Link
                    href="/products/smile-pendant-gold"
                    className="text-xs font-semibold uppercase tracking-wider underline hover:text-[#008080] mt-3 inline-block"
                  >
                    Discover Design
                  </Link>
                </div>
              </div>
            )}

            {/* Love Mega Menu */}
            {link.mega === 'love' && activeMegaMenu === 'love' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] bg-white text-neutral-900 shadow-xl border border-neutral-100 p-8 grid grid-cols-2 gap-8 z-50 text-left animate-in fade-in duration-200">
                <div>
                  <h4 className="font-serif text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-3">
                    Celebration of Love
                  </h4>
                  <ul className="space-y-2.5 text-xs">
                    <li><Link href="/love-engagement" className="hover:underline">The Carpediam® Setting</Link></li>
                    <li><Link href="/love-engagement" className="hover:underline">Engagement Rings</Link></li>
                    <li><Link href="/jewelry/rings" className="hover:underline">Wedding Bands</Link></li>
                    <li><Link href="/stores" className="hover:underline">Book a Diamond Consultation</Link></li>
                  </ul>
                </div>
                <div className="bg-[#FAFBFB] p-4 border border-neutral-100">
                  <span className="text-[10px] uppercase tracking-widest text-[#008080] font-semibold">Diamond Expertise</span>
                  <h5 className="font-serif text-sm font-medium mt-1">Peerless Diamond Craft</h5>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    Every diamond is hand-selected and cut with uncompromising precision in New York ateliers.
                  </p>
                  <Link
                    href="/love-engagement"
                    className="text-xs font-semibold uppercase tracking-wider underline hover:text-[#008080] mt-3 inline-block"
                  >
                    Explore Rings
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-white text-neutral-900 h-full shadow-2xl flex flex-col z-10 p-6 overflow-y-auto animate-in slide-in-from-left duration-300">
            <div className="flex justify-between items-center pb-4 border-b border-neutral-200">
              <CarpediamLogo className="h-6 w-auto" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-neutral-500 hover:text-black"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <Link
                href="/jewelry"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm uppercase tracking-widest font-medium py-2 border-b border-neutral-100"
              >
                <span>Fine Jewelry</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </Link>
              <div className="pl-4 space-y-2 text-xs text-neutral-600">
                <Link href="/jewelry/necklaces-pendants" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-black">Necklaces & Pendants</Link>
                <Link href="/jewelry/bracelets" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-black">Bracelets</Link>
                <Link href="/jewelry/rings" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-black">Rings</Link>
                <Link href="/jewelry/earrings" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-black">Earrings</Link>
              </div>

              <Link
                href="/love-engagement"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm uppercase tracking-widest font-medium py-2 border-b border-neutral-100"
              >
                <span>Love & Celebration</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </Link>

              <Link
                href="/stores"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm uppercase tracking-widest font-medium py-2 border-b border-neutral-100"
              >
                <span>Find a Boutique</span>
                <MapPin className="w-4 h-4 text-neutral-400" />
              </Link>

              <Link
                href="/favorites"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm uppercase tracking-widest font-medium py-2 border-b border-neutral-100"
              >
                <span>Client Wishlist</span>
                <User className="w-4 h-4 text-neutral-400" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
