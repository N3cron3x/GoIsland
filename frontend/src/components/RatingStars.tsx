import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating?: number;
  reviewCount?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ rating = 0, reviewCount = 0 }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '0.88rem',
      fontFamily: "'Poppins', sans-serif",
      margin: '6px 0',
    }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {stars.map((index) => {
          // Calcula el porcentaje de relleno para representar la calificación proporcionalmente
          const fillPercent = Math.max(0, Math.min(100, (rating - (index - 1)) * 100));

          return (
            <div
              key={index}
              style={{
                position: 'relative',
                width: '16px',
                height: '16px',
                display: 'inline-block',
              }}
            >
              <Star
                size={16}
                color="#E0E0E0"
                fill="#E0E0E0"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: `${fillPercent}%`,
                  height: '100%',
                  overflow: 'hidden',
                }}
              >
                <Star
                  size={16}
                  color="#FFC107"
                  fill="#FFC107"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    minWidth: '16px',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {rating > 0 && (
        <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>
          {rating.toFixed(1)}
        </span>
      )}

      {reviewCount > 0 && (
        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
          ({reviewCount} reseñas)
        </span>
      )}
    </div>
  );
};

export default RatingStars;
