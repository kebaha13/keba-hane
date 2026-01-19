
import { Category, DigitalProduct } from './types';

export const PRODUCTS: DigitalProduct[] = [
  {
    id: '1',
    name: 'SaaS Starter Kit React',
    description: 'Un boilerplate complet pour lancer votre application SaaS en un week-end. Authentification, paiements Stripe et dashboard inclus.',
    price: 49.99,
    category: Category.SOFTWARE,
    imageUrl: 'https://picsum.photos/seed/saas/600/400',
    rating: 4.8,
    reviewsCount: 124,
    features: ['React 18+', 'Tailwind CSS', 'Stripe Integration', 'TypeScript']
  },
  {
    id: '2',
    name: 'Maîtriser le Marketing Digital',
    description: 'Guide ultime de 200 pages pour dominer les réseaux sociaux et le SEO en 2024.',
    price: 19.99,
    category: Category.EBOOK,
    imageUrl: 'https://picsum.photos/seed/marketing/600/400',
    rating: 4.5,
    reviewsCount: 89,
    features: ['PDF + EPUB', 'Checklists incluses', 'Accès à vie']
  },
  {
    id: '3',
    name: 'Pack d\'icônes Neo-Brutalisme',
    description: 'Plus de 500 icônes vectorielles au style unique pour vos designs web et mobiles.',
    price: 15.00,
    category: Category.TEMPLATE,
    imageUrl: 'https://picsum.photos/seed/icons/600/400',
    rating: 4.9,
    reviewsCount: 56,
    features: ['SVG / Figma', 'Mises à jour gratuites', 'Usage commercial']
  },
  {
    id: '4',
    name: 'Formation Python : Data Science',
    description: 'De zéro à expert. Apprenez Pandas, NumPy et Scikit-Learn avec des projets concrets.',
    price: 89.00,
    category: Category.COURSE,
    imageUrl: 'https://picsum.photos/seed/python/600/400',
    rating: 4.7,
    reviewsCount: 230,
    features: ['20h de vidéo', 'Code source inclus', 'Certificat de fin']
  },
  {
    id: '5',
    name: 'Ambiance Lo-Fi - Beats Pack',
    description: '10 morceaux exclusifs libres de droits pour vos streams et vidéos.',
    price: 12.99,
    category: Category.AUDIO,
    imageUrl: 'https://picsum.photos/seed/lofi/600/400',
    rating: 4.6,
    reviewsCount: 42,
    features: ['WAV haute qualité', 'Royalty Free', 'Stem files inclus']
  },
  {
    id: '6',
    name: 'Template Notion : Second Brain',
    description: 'Le système ultime pour organiser votre vie, vos projets et vos notes dans Notion.',
    price: 24.99,
    category: Category.TEMPLATE,
    imageUrl: 'https://picsum.photos/seed/notion/600/400',
    rating: 4.9,
    reviewsCount: 312,
    features: ['Dashboard avancé', 'GTD Method', 'Archive de ressources']
  }
];
