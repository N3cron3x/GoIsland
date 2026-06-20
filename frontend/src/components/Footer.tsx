import React from 'react';
import Logo from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      background: '#003D7A',
      color: '#FFFFFF',
      padding: '48px 0 24px 0',
      fontFamily: "'Poppins', sans-serif",
      width: '100%',
      marginTop: 'auto',
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '32px',
        marginBottom: '40px',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
          <Logo fontSize="1.5rem" variant="light" />
          <p style={{
            color: '#E0E8F5',
            fontSize: '0.88rem',
            lineHeight: '1.6',
            maxWidth: '260px',
            margin: 0,
          }}>
            Tu portal premium hacia las mejores aventuras, cruceros y experiencias en islas paradisíacas de todo el mundo.
          </p>
        </div>

        <div>
          <h4 style={{
            color: '#FFFFFF',
            fontSize: '1rem',
            fontWeight: 700,
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Explorar
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li><a href="/experiences" style={{ color: '#E0E8F5', fontSize: '0.9rem', transition: 'color 0.2s' }} className="footer-link">Experiencias</a></li>
            <li><a href="#" style={{ color: '#E0E8F5', fontSize: '0.9rem', transition: 'color 0.2s' }} className="footer-link">Cómo funciona</a></li>
            <li><a href="#" style={{ color: '#E0E8F5', fontSize: '0.9rem', transition: 'color 0.2s' }} className="footer-link">Preguntas frecuentes</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{
            color: '#FFFFFF',
            fontSize: '1rem',
            fontWeight: 700,
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Empresa
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li><a href="#" style={{ color: '#E0E8F5', fontSize: '0.9rem', transition: 'color 0.2s' }} className="footer-link">Sobre nosotros</a></li>
            <li><a href="#" style={{ color: '#E0E8F5', fontSize: '0.9rem', transition: 'color 0.2s' }} className="footer-link">Contacto</a></li>
            <li><a href="#" style={{ color: '#E0E8F5', fontSize: '0.9rem', transition: 'color 0.2s' }} className="footer-link">Términos y condiciones</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{
            color: '#FFFFFF',
            fontSize: '1rem',
            fontWeight: 700,
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Síguenos
          </h4>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="#" style={socialCircleStyle} className="footer-social-icon" aria-label="Instagram">
              <svg style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" style={socialCircleStyle} className="footer-social-icon" aria-label="Facebook">
              <svg style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" style={socialCircleStyle} className="footer-social-icon" aria-label="Twitter">
              <svg style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        paddingTop: '24px',
        textAlign: 'center',
      }}>
        <div className="container">
          <p style={{
            color: '#B0C4DE',
            fontSize: '0.85rem',
            margin: 0,
          }}>
            &copy; {new Date().getFullYear()} GoIsland. Todos los derechos reservados.
          </p>
        </div>
      </div>

      <style>{`
        .footer-link:hover {
          color: var(--color-gold) !important;
        }
        .footer-social-icon:hover {
          background-color: #FFFFFF !important;
          color: #003D7A !important;
          border-color: #FFFFFF !important;
        }
      `}</style>
    </footer>
  );
};

const socialCircleStyle: React.CSSProperties = {
  width: '38px',
  height: '38px',
  borderRadius: '50%',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#FFFFFF',
  transition: 'all 0.2s ease',
};

export default Footer;
