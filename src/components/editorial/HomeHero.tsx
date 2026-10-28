'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { VolumeX, Volume2, Pause, Play } from 'lucide-react';

export const HomeHero: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative w-full h-[88vh] sm:h-screen min-h-[640px] max-h-[1050px] bg-[#001D21] overflow-hidden flex items-center justify-center">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source
          src="https://res.cloudinary.com/di9eeahdy/video/upload/v1793202211/1028_tkfdzg.webm"
          type="video/webm"
        />
      </video>

      {/* Ambient Dark Gradient Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/25 to-black/60 pointer-events-none" />

      {/* Bottom Center Hero CTA */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <Link
          href="/jewelry/necklaces-pendants"
          className="px-10 py-3 bg-[#E5E5E5]/90 hover:bg-white text-black text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md backdrop-blur-xs inline-block"
        >
          Shop Now
        </Link>
      </div>

      {/* Audio / Video Controls in bottom corners */}
      <div className="absolute bottom-6 left-8 z-20 hidden sm:block">
        <button
          onClick={toggleMute}
          className="text-white/80 hover:text-white transition-opacity p-2 cursor-pointer"
          title="Audio control"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
      <div className="absolute bottom-6 right-8 z-20 hidden sm:block">
        <button
          onClick={togglePlay}
          className="text-white/80 hover:text-white transition-opacity p-2 cursor-pointer"
          title="Video control"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>
    </section>
  );
};
