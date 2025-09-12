'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = '' }: LogoProps) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  return (
    <Link href="/" className={`flex items-center group ${className}`}>
      <div className={`self-center whitespace-nowrap transition-all duration-300 font-heading tracking-wide ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
        {isMobile ? (
          // Mobile version - more compact
          <>
            <span 
              className="text-accent font-bold" 
              style={{ 
                letterSpacing: '0.03em',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              SF
            </span>
            <span 
              className="text-secondary font-bold" 
              style={{ 
                letterSpacing: '0.03em',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              GH
            </span>
          </>
        ) : (
          // Desktop version - full logo
          <>
            <span 
              className="text-accent font-bold" 
              style={{ 
                letterSpacing: '0.05em',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              Smart
            </span>
            <span 
              className="text-primary font-bold" 
              style={{ 
                letterSpacing: '0.05em',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              Farm
            </span>
            <span 
              className="text-secondary font-bold" 
              style={{ 
                letterSpacing: '0.05em',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              GH
            </span>
          </>
        )}
      </div>
    </Link>
  );
};

export default Logo;