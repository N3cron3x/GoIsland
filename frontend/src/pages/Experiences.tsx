import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { experienceService } from '../services/experienceService';
import type { Experience } from '../types';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { toast } from 'react-hot-toast';

const SkeletonLoader: React.FC = () => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '32px',
    }}>
      {[1, 2, 3, 4].map((i) => (
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

export const Experiences: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [featuredExperiences, setFeaturedExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [tempCategories, setTempCategories] = useState<string[]>([]);
  
  const [activeMaxPrice, setActiveMaxPrice] = useState<number>(600);
  const [tempMaxPrice, setTempMaxPrice] = useState<number>(600);
  
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

  const categories = ['Acuático', 'Cruceros', 'Aventura', 'Gastronomía', 'Naturaleza'];

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const data = await experienceService.getExperiences();
      
      const featured = data.filter(exp => exp.featured);
      setFeaturedExperiences(featured);
      
      let filtered = [...data];
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        filtered = filtered.filter(exp => 
          exp.title.toLowerCase().includes(query) || 
          exp.description.toLowerCase().includes(query) ||
          exp.location.toLowerCase().includes(query)
        );
      }
      
      // Filtro de categorías con selección múltiple (lógica OR entre las categorías elegidas)
      if (activeCategories.length > 0) {
        filtered = filtered.filter(exp => 
          activeCategories.some(cat => cat.toLowerCase() === exp.category.toLowerCase())
        );
      }
      
      // Filtro de precio máximo (se combina con la categoría mediante lógica AND)
      filtered = filtered.filter(exp => exp.price <= activeMaxPrice);
      
      setExperiences(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setLoading(false), 400);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [searchTerm, activeCategories, activeMaxPrice]);

  const handleBook = (experienceId: number) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { message: 'Inicia sesión para reservar tu aventura.' } });
      return;
    }

    const exp = experiences.find(e => e.id === experienceId);
    if (exp) {
      toast.success("¡Reserva confirmada! Revisa tu correo para más detalles");
    }
  };

  const activeFiltersCount = activeCategories.length + (activeMaxPrice < 600 ? 1 : 0);

  return (
    <div style={{ padding: '0 0 48px 0' }} className="animate-fade-in">
      <div style={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        padding: '96px 0',
        backgroundImage: 'url("https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '0',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(20, 30, 40, 0.55)',
          zIndex: 1,
        }} />

        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          color: '#FFFFFF',
          width: '100%',
          maxWidth: '800px',
          padding: '0 24px',
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px', lineHeight: '1.2', color: '#FFFFFF' }}>
            Descubre <span style={{ color: 'var(--color-gold)' }}>Aventuras Inolvidables</span>
          </h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', color: '#F0F3F6' }}>
            Explora y reserva las mejores actividades, cruceros y experiencias en islas paradisíacas de todo el mundo.
          </p>
        </div>
      </div>



      <div className="glass-panel" style={{
        padding: '24px',
        marginBottom: '48px',
        borderRadius: '8px',
        position: 'relative',
        zIndex: 10,
        marginTop: '-48px',
        boxShadow: '0 20px 40px rgba(0, 86, 179, 0.08)',
      }}>
        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
        }}>
          <div style={{ flex: 1 }}>
            <Input
              placeholder="Buscar por destino, actividad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginBottom: 0 }}
              icon={
                <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
          </div>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                setIsPanelOpen(!isPanelOpen);
                if (!isPanelOpen) {
                  setTempCategories(activeCategories);
                  setTempMaxPrice(activeMaxPrice);
                }
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '8px',
                border: '2px solid var(--color-primary)',
                background: isPanelOpen ? '#EAF1FB' : 'var(--color-white)',
                color: 'var(--color-primary)',
                fontWeight: 600,
                fontSize: '0.95rem',
                fontFamily: "'Poppins', sans-serif",
                cursor: 'pointer',
                transition: 'all 0.2s',
                outline: 'none',
              }}
              className="filter-toggle-btn"
            >
              <Filter size={18} />
              <span>Filtros</span>
              {activeFiltersCount > 0 && (
                <span style={{
                  background: 'var(--color-gold)',
                  color: '#333333',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  marginLeft: '2px',
                }}>
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {isPanelOpen && (
          <div className="filters-dropdown" style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: '24px',
            width: '340px',
            background: 'var(--color-white)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            boxShadow: '0 10px 25px -5px rgba(0, 86, 179, 0.12)',
            padding: '24px',
            zIndex: 50,
            animation: 'fadeInUp 0.2s ease-out',
          }}>
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                marginBottom: '8px',
                fontFamily: "'Poppins', sans-serif",
              }}>
                Categorías
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {categories.map((cat) => {
                  const isChecked = tempCategories.includes(cat);
                  return (
                    <label key={cat} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '0.9rem',
                      color: 'var(--color-text)',
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) {
                            setTempCategories(tempCategories.filter(c => c !== cat));
                          } else {
                            setTempCategories([...tempCategories, cat]);
                          }
                        }}
                        style={{
                          width: '18px',
                          height: '18px',
                          accentColor: 'var(--color-primary)',
                          cursor: 'pointer',
                        }}
                      />
                      <span>{cat}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div style={{
              marginBottom: '24px',
              borderTop: '1px solid var(--color-border)',
              paddingTop: '16px',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.9rem',
                marginBottom: '8px',
              }}>
                <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Precio Máximo</span>
                <strong style={{ color: 'var(--color-gold)' }}>${tempMaxPrice} USD</strong>
              </div>
              <input
                type="range"
                min="50"
                max="600"
                step="10"
                value={tempMaxPrice}
                onChange={(e) => setTempMaxPrice(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--color-primary)',
                  background: 'var(--color-border)',
                  borderRadius: '4px',
                  height: '6px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              />
            </div>

            <div style={{
              display: 'flex',
              gap: '16px',
              borderTop: '1px solid var(--color-border)',
              paddingTop: '16px',
            }}>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => {
                  setTempCategories([]);
                  setTempMaxPrice(600);
                  setActiveCategories([]);
                  setActiveMaxPrice(600);
                  setIsPanelOpen(false);
                }}
                style={{ borderRadius: '8px' }}
              >
                Limpiar
              </Button>
              <Button
                variant="primary"
                size="sm"
                fullWidth
                onClick={() => {
                  setActiveCategories(tempCategories);
                  setActiveMaxPrice(tempMaxPrice);
                  setIsPanelOpen(false);
                }}
                style={{ borderRadius: '8px' }}
              >
                Aplicar
              </Button>
            </div>
          </div>
        )}
      </div>

      {featuredExperiences.length > 0 && (
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '1.8rem',
            color: 'var(--color-primary)',
            fontWeight: 700,
            marginBottom: '4px',
            fontFamily: "'Poppins', sans-serif",
          }}>
            Experiencias Destacadas
          </h2>
          <p style={{
            fontSize: '0.95rem',
            color: 'var(--color-text-muted)',
            marginBottom: '24px',
          }}>
            Las favoritas de nuestra comunidad
          </p>

          <div 
            className="featured-carousel"
            style={{
              display: 'flex',
              gap: '24px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              paddingBottom: '16px',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            {featuredExperiences.map((experience) => (
              <div 
                key={`featured-${experience.id}`}
                style={{
                  width: '420px',
                  minWidth: '420px',
                  flexShrink: 0,
                  scrollSnapAlign: 'start',
                }}
              >
                <Card experience={experience} onBook={handleBook} />
              </div>
            ))}
          </div>
          <style>{`
            .featured-carousel::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      )}

      {loading ? (
        <SkeletonLoader />
      ) : experiences.length === 0 ? (
        <div className="glass-panel" style={{
          textAlign: 'center',
          padding: '64px 40px',
          maxWidth: '500px',
          margin: '0 auto',
          borderRadius: '8px',
        }}>
          <svg style={{ width: '48px', height: '48px', color: 'var(--color-text-muted)', marginBottom: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 style={{ marginBottom: '8px', color: 'var(--color-primary)' }}>Sin resultados</h3>
          <p>No encontramos ninguna experiencia que coincida con tus filtros. Intenta buscar otra cosa o limpiar los campos.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setActiveCategories([]);
              setActiveMaxPrice(600);
              setTempCategories([]);
              setTempMaxPrice(600);
            }}
            style={{ marginTop: '24px', borderRadius: '8px' }}
          >
            Restablecer Filtros
          </Button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '32px',
        }}>
          {experiences.map((experience, idx) => (
            <div key={experience.id} className="animate-fade-in" style={{ animationDelay: `${idx * 40}ms`, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Card experience={experience} onBook={handleBook} />
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 480px) {
          .filters-dropdown {
            position: fixed !important;
            top: 20% !important;
            left: 5% !important;
            right: 5% !important;
            width: 90% !important;
            margin: 0 auto !important;
            z-index: 1000 !important;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
            border-radius: 8px !important;
          }
        }
      `}</style>
    </div>
  );
};
export default Experiences;
