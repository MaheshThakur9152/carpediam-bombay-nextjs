import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-28 text-center bg-white min-h-[60vh] flex flex-col items-center justify-center px-4">
      <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#008080] mb-2">
        Error 404
      </span>
      <h1 className="font-serif text-4xl sm:text-5xl text-neutral-900 font-normal">
        Page Not Found
      </h1>
      <p className="text-xs text-neutral-500 mt-3 max-w-sm">
        The design, collection, or boutique page you requested could not be located in our catalog.
      </p>
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="px-6 py-3 bg-black text-white text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors"
        >
          Return to Homepage
        </Link>
        <Link
          href="/jewelry"
          className="px-6 py-3 border border-black text-black text-xs uppercase tracking-widest hover:bg-neutral-50 transition-colors"
        >
          Explore Jewelry
        </Link>
      </div>
    </div>
  );
}
