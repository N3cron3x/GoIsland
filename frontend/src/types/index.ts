export * from './auth';

export interface Experience {
  id: number;
  title: string;
  description: string;
  location: string;
  category: string;
  price: number;
  capacity: number;
  availableSpots: number;
  isApproved: boolean;
  createdAt: string;
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
}
