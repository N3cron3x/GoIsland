import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem('goisland_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error reading goisland_favorites from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('goisland_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Error saving goisland_favorites to localStorage', e);
    }
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    const exists = favorites.includes(id);
    if (exists) {
      toast.success('Eliminado de favoritos 💔');
      setFavorites(prev => prev.filter(item => item !== id));
    } else {
      toast.success('Agregado a favoritos 💖');
      setFavorites(prev => [...prev, id]);
    }
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
  }
  return context;
};
