import type { Experience } from '../types';
import experiencesMock from '../data/experiencesMock.json';

export const experienceService = {
  /**
   * Obtiene todas las experiencias de la plataforma.
   * Simula la latencia de red mediante un retardo artificial antes de retornar los datos locales del JSON.
   */
  getExperiences: async (): Promise<Experience[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Datos simulados: este cast se reemplazará por la respuesta real de la API
        resolve(experiencesMock as Experience[]);
      }, 600); // Retardo artificial de 600ms para simular latencia de red
    });
  }
};
export type { Experience };
