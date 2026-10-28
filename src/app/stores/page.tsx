import type { Metadata } from 'next';
import { StoreLocatorClient } from '../../components/editorial/StoreLocatorClient';

export const metadata: Metadata = {
  title: 'Boutiques & Appointments',
  description: 'Find Carpediam Bombay flagship boutiques in New York, London, Paris, and Mumbai. Book a private consultation with our master diamond specialists.',
  alternates: {
    canonical: '/stores',
  },
  openGraph: {
    title: 'Boutiques & Appointments | Carpediam Bombay',
    description: 'Find Carpediam Bombay flagship boutiques and book a private appointment.',
    url: '/stores',
  },
};

export default function StoreLocatorPage() {
  return <StoreLocatorClient />;
}
