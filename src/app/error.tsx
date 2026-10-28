'use client';

import React from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-24 text-center bg-white min-h-[50vh] flex flex-col items-center justify-center px-4">
      <h2 className="font-serif text-3xl text-neutral-900">Something went wrong</h2>
      <p className="text-xs text-neutral-500 mt-2 max-w-md">
        An unexpected error occurred while loading this boutique page.
      </p>
      {process.env.NODE_ENV !== 'production' && (
        <pre className="mt-4 p-4 bg-neutral-100 text-[11px] text-red-600 max-w-xl overflow-x-auto text-left">
          {error.message}
        </pre>
      )}
      <button
        onClick={() => reset()}
        className="mt-6 px-6 py-2.5 bg-black text-white text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
