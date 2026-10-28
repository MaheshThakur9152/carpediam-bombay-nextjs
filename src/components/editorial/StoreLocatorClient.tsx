'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Clock, CheckCircle2 } from 'lucide-react';

interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  image: string;
}

export const StoreLocatorClient: React.FC = () => {
  const stores: Store[] = [
    {
      id: 'the-landmark',
      name: 'The Landmark (NYC Flagship)',
      address: '727 Fifth Avenue, at 57th Street',
      city: 'New York, NY 10022',
      phone: '+1 212-755-8000',
      hours: 'Mon–Sat: 10am–8pm | Sun: 11am–7pm',
      image: '/images/img_26.jpg'
    },
    {
      id: 'beverly-hills',
      name: 'Carpediam Beverly Hills',
      address: '210 North Rodeo Drive',
      city: 'Beverly Hills, CA 90210',
      phone: '+1 310-273-8880',
      hours: 'Mon–Sat: 10am–7pm | Sun: 11am–6pm',
      image: '/images/img_22.webp'
    },
    {
      id: 'london-bond',
      name: 'Carpediam Old Bond Street',
      address: '25 Old Bond Street, Mayfair',
      city: 'London W1S 4QB, UK',
      phone: '+44 20 7409 2790',
      hours: 'Mon–Sat: 10am–6:30pm | Sun: 12pm–6pm',
      image: '/images/img_2.jpg'
    },
    {
      id: 'paris-vendome',
      name: 'Carpediam Place Vendôme',
      address: '6 Place Vendôme',
      city: '75001 Paris, France',
      phone: '+33 1 40 20 20 20',
      hours: 'Mon–Sat: 10:30am–7pm | Sun: Closed',
      image: '/images/img_1.jpg'
    },
    {
      id: 'mumbai-flagship',
      name: 'Carpediam Bombay Ateliers',
      address: 'Jio World Centre, Bandra Kurla Complex',
      city: 'Mumbai 400051, India',
      phone: '+91 22 6900 8000',
      hours: 'Mon–Sun: 11am–9pm',
      image: '/images/img_29.jpg'
    }
  ];

  const [activeStore, setActiveStore] = useState<Store>(stores[0]);
  const [appointmentSent, setAppointmentSent] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="pt-12 pb-8 text-center max-w-4xl mx-auto px-4">
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-neutral-900 tracking-tight">
          Find a Carpediam Boutique
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-xl mx-auto">
          Experience our jewelry in person. Client advisors are at your service for private showings, bespoke orders, and personalized care.
        </p>
      </div>

      {/* Main Grid: Stores List on Left, Active Store Details on Right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Store Selection List */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">
              Our Global Flagships ({stores.length})
            </h2>

            {stores.map(store => (
              <div
                key={store.id}
                onClick={() => {
                  setActiveStore(store);
                  setAppointmentSent(false);
                }}
                className={`p-5 border cursor-pointer transition-all ${
                  activeStore.id === store.id
                    ? 'border-black bg-[#FAFBFB] shadow-xs'
                    : 'border-neutral-200 hover:border-neutral-400 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-base font-medium text-neutral-900">{store.name}</h3>
                    <p className="text-xs text-neutral-500 mt-1">{store.address}</p>
                    <p className="text-xs text-neutral-500">{store.city}</p>
                  </div>
                  <MapPin className={`w-4 h-4 mt-1 ${activeStore.id === store.id ? 'text-[#008080]' : 'text-neutral-400'}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Active Store Display & Appointment Booking */}
          <div className="lg:col-span-7">
            <div className="border border-neutral-200 bg-white p-6 sm:p-10 space-y-6">
              <div className="aspect-16/9 w-full bg-neutral-100 overflow-hidden border border-neutral-100">
                <img
                  src={activeStore.image}
                  alt={activeStore.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#008080] font-semibold">Flagship Boutique</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-900 mt-1">{activeStore.name}</h2>
                <p className="text-sm text-neutral-600 mt-2">{activeStore.address}, {activeStore.city}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-100 text-xs text-neutral-600">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-neutral-400" />
                  <span>{activeStore.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-neutral-400" />
                  <span>{activeStore.hours}</span>
                </div>
              </div>

              {/* Private Appointment Form */}
              <div className="pt-6 border-t border-neutral-200">
                <h3 className="font-serif text-lg font-medium text-neutral-900">
                  Book a Private Showing at {activeStore.name}
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Enjoy dedicated consultation with our jewelry and gemological specialists.
                </p>

                {appointmentSent ? (
                  <div className="mt-4 p-4 bg-[#f0f9f8] border border-[#d8ecea] text-xs text-[#002a2c] flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-[#008080] flex-shrink-0" />
                    <span>Thank you, {clientName || 'valued client'}. Your appointment request for {activeStore.name} has been received. A client advisor will contact you shortly.</span>
                  </div>
                ) : (
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      setAppointmentSent(true);
                    }}
                    className="mt-4 space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={e => setClientName(e.target.value)}
                        placeholder="YOUR FULL NAME"
                        className="p-3 border border-neutral-300 text-xs outline-none bg-white uppercase text-neutral-900 font-light"
                      />
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={e => setClientEmail(e.target.value)}
                        placeholder="EMAIL ADDRESS"
                        className="p-3 border border-neutral-300 text-xs outline-none bg-white uppercase text-neutral-900 font-light"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors"
                    >
                      Request Appointment
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
