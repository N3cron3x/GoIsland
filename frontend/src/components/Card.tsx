import React, { useState } from 'react';
import { Waves, Ship, Compass, Utensils, TreePine, AlertCircle, Heart } from 'lucide-react';
import type { Experience } from '../types';
import Button from './Button';
import RatingStars from './RatingStars';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';

interface CardProps {
  experience: Experience;
  onBook?: (experienceId: number) => void;
}

export const Card: React.FC<CardProps> = ({ experience, onBook }) => {
  const { title, description, location, category, price, availableSpots, capacity } = experience;
  const [imageError, setImageError] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(experience.id);
  const { isAuthenticated } = useAuth();

  const getCategoryIcon = (cat: string) => {
    const size = 48;
    const color = '#0056B3';
    switch (cat.toLowerCase()) {
      case 'acuático':
      case 'acuatico':
        return <Waves size={size} color={color} />;
      case 'cruceros':
        return <Ship size={size} color={color} />;
      case 'aventura':
        return <Compass size={size} color={color} />;
      case 'gastronomía':
      case 'gastronomia':
        return <Utensils size={size} color={color} />;
      case 'naturaleza':
        return <TreePine size={size} color={color} />;
      default:
        return <Compass size={size} color={color} />;
    }
  };

  // URLs de imágenes de Unsplash por categoría
  const getCategoryImageUrl = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'acuático':
      case 'acuatico':
        return 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80';
      case 'cruceros':
        return 'https://images.unsplash.com/photo-1599640842229-0064c3f7396e?auto=format&fit=crop&w=600&q=80';
      case 'aventura':
        return 'https://images.unsplash.com/photo-1533240332313-0db49b439ad3?auto=format&fit=crop&w=600&q=80';
      case 'gastronomía':
      case 'gastronomia':
        return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80';
      case 'naturaleza':
        return 'https://images.unsplash.com/photo-1518467166076-74fc77529b43?auto=format&fit=crop&w=600&q=80';
      default:
        return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80';
    }
  };

  const truncateText = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  const imageUrl = getCategoryImageUrl(category);

  return (
    <div className="glass-card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      border: '1px solid var(--color-border)',
      background: 'var(--color-white)',
    }}>
      <div style={{
        height: '160px',
        background: imageError ? '#E8F1FB' : '#F0F3F6',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {!imageError ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            onError={() => setImageError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          getCategoryIcon(category)
        )}

        {availableSpots / capacity <= 0.3 && (
          <span style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: '#FEE2E2',
            border: '1px solid #FCA5A5',
            padding: '4px 8px',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#B91C1C',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: 'var(--shadow-sm)',
            zIndex: 10,
          }}>
            <AlertCircle size={12} />
            <span>{availableSpots === 0 ? 'Agotado' : `¡Solo ${availableSpots} cupos!`}</span>
          </span>
        )}

        <span style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          background: 'var(--color-white)',
          border: '1px solid var(--color-border)',
          padding: '4px 10px',
          borderRadius: '8px',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--color-primary)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          boxShadow: 'var(--shadow-sm)',
        }}>
          {category}
        </span>

        {/* Botón de favoritos: visible solo para usuarios autenticados */}
        {isAuthenticated && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              toggleFavorite(experience.id);
            }}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.85)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s ease',
              zIndex: 10,
              padding: 0,
            }}
            className="heart-btn"
            aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <Heart
              size={18}
              fill={isFav ? '#E11D48' : 'none'}
              color={isFav ? '#E11D48' : '#666666'}
              style={{ transition: 'all 0.2s ease' }}
            />
          </button>
        )}
      </div>

      <div style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.8rem',
          color: 'var(--color-primary)',
          fontWeight: 700,
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
        }}>
          <svg style={{ width: '12px', height: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </div>

        <h3 style={{
          fontSize: '1.15rem',
          lineHeight: '1.3',
          marginBottom: '4px',
          color: 'var(--color-primary)',
          fontWeight: 700,
        }}>
          {title}
        </h3>

        <RatingStars rating={experience.rating} reviewCount={experience.reviewCount} />

        <p style={{
          fontSize: '0.88rem',
          color: 'var(--color-text-muted)',
          marginTop: '8px',
          marginBottom: '16px',
        }}>
          {truncateText(description, 110)}
        </p>
      </div>

      <div style={{
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid var(--color-border)',
        marginTop: 'auto',
      }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>
            Precio por persona
          </span>
          <span style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            color: 'var(--color-gold)',
            fontFamily: "'Poppins', sans-serif",
          }}>
            ${price.toFixed(2)}
          </span>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{
            fontSize: '0.75rem',
            color: availableSpots === 0 ? '#ef4444' : availableSpots <= 3 ? '#eab308' : 'var(--color-text-muted)',
            display: 'block',
            fontWeight: 500,
            marginBottom: '8px',
          }}>
            {availableSpots === 0 
              ? 'Agotado' 
              : availableSpots === 1 
              ? '¡Último cupo!' 
              : `${availableSpots} cupos de ${capacity}`}
          </span>
          
          <Button
            variant="primary"
            size="sm"
            disabled={availableSpots === 0}
            onClick={() => onBook && onBook(experience.id)}
            style={{
              padding: '6px 12px',
              fontSize: '0.8rem',
              borderRadius: '8px',
            }}
          >
            Reservar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
