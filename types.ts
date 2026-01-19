
export enum Category {
  SOFTWARE = 'Logiciels',
  TEMPLATE = 'Templates UI',
  EBOOK = 'E-books',
  COURSE = 'Formations',
  AUDIO = 'Audio / Musique'
}

export interface DigitalProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  features: string[];
}

export interface CartItem extends DigitalProduct {
  quantity: number;
}

export interface SearchRecommendation {
  reason: string;
  productIds: string[];
}
