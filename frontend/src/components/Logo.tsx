import React from 'react';

interface LogoProps {
  showUnderline?: boolean;
  fontSize?: string;
  variant?: 'primary' | 'light';
  style?: React.CSSProperties;
}

export const Logo: React.FC<LogoProps> = ({
  showUnderline = false,
  fontSize = '1.5rem',
  variant = 'primary',
  style,
}) => {
  const isLight = variant === 'light';
  const islandColor = isLight ? '#FFFFFF' : 'var(--color-primary)';
  const primaryColorValue = isLight ? '#FFFFFF' : 'var(--color-primary)';

  return (
    <div style={{
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      ...style
    }}>
      <div className="logo-text" style={{
        fontSize: fontSize,
        fontWeight: 800,
        fontFamily: "'Poppins', sans-serif",
        lineHeight: 1.2,
        letterSpacing: '-0.03em',
        display: 'flex',
      }}>
        <span style={{ color: 'var(--color-gold)' }}>Go</span>
        <span style={{ color: islandColor }}>Island</span>
      </div>

      <div className="logo-isotype" style={{
        width: '32px',
        height: '32px',
        display: 'none',
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M 50 15 C 33.4 15 20 28.4 20 45 C 20 62 40 78 50 85 C 56.5 80.5 70 70 76.5 60 M 80 45 C 80 37 76.7 30 71.3 25" fill="none" stroke={primaryColorValue} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 78 48 L 56 48" fill="none" stroke={primaryColorValue} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="50" cy="33" r="6" fill="var(--color-gold)" />
          <path d="M 50 44 L 50 60" fill="none" stroke="var(--color-gold)" strokeWidth="8" strokeLinecap="round"/>
        </svg>
      </div>
      
      {showUnderline && (
        <div className="logo-underline" style={{
          width: '40px',
          height: '4px',
          backgroundColor: 'var(--color-gold)',
          borderRadius: '2px',
          marginTop: '6px',
        }} />
      )}

      <style>{`
        @media (max-width: 479px) {
          .logo-text {
            display: none !important;
          }
          .logo-isotype {
            display: block !important;
          }
          .logo-underline {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Logo;
