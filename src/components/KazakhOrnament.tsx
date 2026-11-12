import React from 'react';

interface KazakhOrnamentProps {
  className?: string;
  size?: number;
  color?: string;
  type?: 'horns' | 'center' | 'divider' | 'border' | 'camel';
}

export const KazakhOrnament: React.FC<KazakhOrnamentProps> = ({
  className = '',
  size = 32,
  color = '#B45309', // Warm amber / bronze
  type = 'horns'
}) => {
  if (type === 'divider') {
    return (
      <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
        <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-amber-700/30 to-amber-700/60" />
        <svg
          width="48"
          height="16"
          viewBox="0 0 48 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-amber-700"
        >
          {/* Symmetrical Qoshqar Muyiz ornament center */}
          <path
            d="M24 1C22 5 18 8 13 8C8 8 5 5 5 2C5 0.5 3.5 0 2.5 1C1.5 2 1 3.5 1 5C1 9 5 13 11 13C17 13 21 9 24 6C27 9 31 13 37 13C43 13 47 9 47 5C47 3.5 46.5 2 45.5 1C44.5 0 43 0.5 43 2C43 5 40 8 35 8C30 8 26 5 24 1Z"
            fill="currentColor"
            fillOpacity="0.8"
          />
          <circle cx="24" cy="11" r="2" fill="currentColor" />
        </svg>
        <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-amber-700/30 to-amber-700/60" />
      </div>
    );
  }

  if (type === 'camel') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        {/* Stylized Nomadic Camel profile */}
        <path d="M4 19V11C4 10 5 9 6 9C7 9 7.5 9.5 8 10C8.5 7 11 6 12 7.5C12.8 6 15.5 6 16.5 8C17 8.5 17.5 9 18.5 9C19.5 9 20 8.5 20.5 7.5C21 7 21.5 7.5 21.5 8.5C21.5 10 20 11.5 18.5 12V19" />
        <path d="M4 19L5 19M8 19L9 19M14 19L15 19M18 19L19 19" />
        <circle cx="20" cy="8" r="0.5" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'border') {
    return (
      <svg
        viewBox="0 0 240 12"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-3 text-amber-700/20 ${className}`}
        preserveAspectRatio="none"
      >
        <path d="M0,6 Q15,0 30,6 T60,6 T90,6 T120,6 T150,6 T180,6 T210,6 T240,6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    );
  }

  // Classic Qoshqar Muyiz (Ram's Horn) symbol
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16 26C15 22 12 18 8 18C4 18 1.5 15.5 1.5 12C1.5 7.5 5 4 9.5 4C13.5 4 15.5 7 16 9C16.5 7 18.5 4 22.5 4C27 4 30.5 7.5 30.5 12C30.5 15.5 28 18 24 18C20 18 17 22 16 26Z"
        fill={color}
        fillOpacity="0.85"
      />
      <circle cx="9.5" cy="11.5" r="2.5" fill="#FAF7F2" />
      <circle cx="22.5" cy="11.5" r="2.5" fill="#FAF7F2" />
      <circle cx="16" cy="15" r="1.5" fill="#FAF7F2" />
    </svg>
  );
};
