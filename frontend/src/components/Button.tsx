import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  style,
  ...props
}) => {
  
  const getStyles = () => {
    const styles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      fontFamily: "'Poppins', sans-serif",
      borderRadius: '8px',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
      opacity: disabled || isLoading ? 0.65 : 1,
      width: fullWidth ? '100%' : 'auto',
      border: '1px solid transparent',
      outline: 'none',
      ...style
    };

    if (size === 'sm') {
      styles.padding = '8px 16px';
      styles.fontSize = '0.85rem';
    } else if (size === 'lg') {
      styles.padding = '14px 28px';
      styles.fontSize = '1.05rem';
    } else {
      styles.padding = '11px 22px';
      styles.fontSize = '0.95rem';
    }

    return styles;
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'btn-primary';
      case 'secondary':
        return 'btn-secondary';
      case 'outline':
        return 'btn-outline';
      case 'danger':
        return 'btn-danger';
      case 'ghost':
        return 'btn-ghost';
      default:
        return 'btn-primary';
    }
  };

  return (
    <button
      disabled={disabled || isLoading}
      style={getStyles()}
      className={`btn-custom ${getVariantClass()} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg
            style={{
              animation: 'spin 1s linear infinite',
              width: '16px',
              height: '16px',
            }}
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              style={{ opacity: 0.25 }}
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              style={{ opacity: 0.75 }}
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Cargando...
        </span>
      ) : (
        children
      )}
      <style>{`
        .btn-primary {
          background-color: var(--color-primary) !important;
          color: var(--color-white) !important;
          box-shadow: 0 2px 6px rgba(0, 86, 179, 0.15) !important;
        }
        .btn-primary:hover:not(:disabled) {
          background-color: var(--color-primary-hover) !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 86, 179, 0.25) !important;
        }
        
        .btn-secondary {
          background-color: transparent !important;
          border: 1px solid var(--color-primary) !important;
          color: var(--color-primary) !important;
        }
        .btn-secondary:hover:not(:disabled) {
          background-color: #EAF1FB !important;
          transform: translateY(-1px);
        }

        .btn-outline {
          background-color: transparent !important;
          border: 1px solid var(--color-border) !important;
          color: var(--color-text) !important;
        }
        .btn-outline:hover:not(:disabled) {
          background-color: var(--color-bg) !important;
          border-color: var(--color-text-muted) !important;
        }

        .btn-danger {
          background-color: #ef4444 !important;
          color: var(--color-white) !important;
        }
        .btn-danger:hover:not(:disabled) {
          background-color: #dc2626 !important;
        }

        .btn-ghost {
          background-color: transparent !important;
          color: var(--color-text-muted) !important;
        }
        .btn-ghost:hover:not(:disabled) {
          background-color: rgba(0, 0, 0, 0.04) !important;
          color: var(--color-text) !important;
        }

        .btn-custom:active:not(:disabled) {
          transform: translateY(0) !important;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
};
export default Button;
