import React from 'react';

interface CarpediamLogoProps {
  className?: string;
}

export const CarpediamLogo: React.FC<CarpediamLogoProps> = ({ className = 'h-8 w-auto' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 40"
      fill="currentColor"
      className={className}
      aria-label="Carpediam Bombay Logo"
    >
      <text
        x="50%"
        y="22"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="21"
        letterSpacing="0.28em"
        fill="currentColor"
      >
        CARPE DIAM
      </text>
      <text
        x="50%"
        y="34"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="7.5"
        letterSpacing="0.65em"
        fill="currentColor"
        opacity="0.85"
      >
        BOMBAY
      </text>
    </svg>
  );
};
