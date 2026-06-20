import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { experienceService } from '../services/experienceService';
import type { Experience } from '../types';
import Card from '../components/Card';

const SkeletonLoader: React.FC = () => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '32px',
    }}>
      {[1, 2, 3].map((i) => (
        <div key={i} className="glass-card" style={{
          height: '380px',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid var(--color-border)',
          background: 'var(--color-white)',
          padding: '0',
          borderRadius: '8px',
          overflow: 'hidden',
        }}>
          <div className="skeleton-pulse" style={{ height: '160px', background: '#F1F5F9' }} />
          <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="skeleton-pulse" style={{ width: '40%', height: '12px', borderRadius: '4px', background: '#E2E8F0' }} />
            <div className="skeleton-pulse" style={{ width: '80%', height: '18px', borderRadius: '4px', background: '#E2E8F0' }} />
            <div className="skeleton-pulse" style={{ width: '100%', height: '12px', borderRadius: '4px', background: '#E2E8F0' }} />
            <div className="skeleton-pulse" style={{ width: '90%', height: '12px', borderRadius: '4px', background: '#E2E8F0' }} />
          </div>
          <div style={{
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--color-border)',
            marginTop: 'auto',
          }}>
            <div className="skeleton-pulse" style={{ width: '60px', height: '24px', borderRadius: '4px', background: '#E2E8F0' }} />
            <div className="skeleton-pulse" style={{ width: '80px', height: '32px', borderRadius: '8px', background: '#E2E8F0' }} />
          </div>
        </div>
      ))}
      <style>{`
        .skeleton-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export const Favorites: React.FC = () => {
  const { favorites } = useFavorites();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const data = await experienceService.getExperiences();
      const filtered = data.filter(exp => favorites.includes(exp.id));
      setExperiences(filtered);
    } catch (err) {
      console.error('Error fetching experiences for favorites page', err);
    } finally {
      setTimeout(() => setLoading(false), 400);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [favorites]);

  return (
    <div style={{ padding: '40px 0 64px 0' }} className="animate-fade-in">
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: 'var(--color-primary)',
          fontFamily: "'Poppins', sans-serif",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '8px',
        }}>
          <Heart size={36} fill="#E11D48" color="#E11D48" />
          Mis Favoritos
        </h1>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Guarda y gestiona las experiencias que más te interesan para tu próximo viaje.
        </p>
      </div>

      {loading ? (
        <SkeletonLoader />
      ) : experiences.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '64px 24px',
          background: 'var(--color-white)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#FEE2E2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
          }}>
            <Heart size={32} color="#E11D48" />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '8px' }}>
            Aún no tienes favoritos
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
            Navega por nuestras experiencias y haz clic en el corazón para guardarlas aquí.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '32px',
        }}>
          {experiences.map((exp) => (
            <div key={exp.id}>
              <Card experience={exp} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
