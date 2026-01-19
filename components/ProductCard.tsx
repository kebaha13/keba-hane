
import React from 'react';
import { DigitalProduct } from '../types';
import { Button } from './Button';

interface ProductCardProps {
  product: DigitalProduct;
  onAddToCart: (product: DigitalProduct) => void;
  onClick: (product: DigitalProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onClick }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
      <div 
        className="relative aspect-video overflow-hidden cursor-pointer"
        onClick={() => onClick(product)}
      >
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-indigo-600 shadow-sm uppercase tracking-wider">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 
            className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors cursor-pointer"
            onClick={() => onClick(product)}
          >
            {product.name}
          </h3>
          <p className="text-xl font-bold text-gray-900">{product.price.toFixed(2)}€</p>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-1 mb-6">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 fill-current ${i >= Math.floor(product.rating) ? 'text-gray-300' : ''}`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-400 font-medium">({product.reviewsCount})</span>
        </div>

        <Button 
          variant="outline" 
          fullWidth 
          onClick={() => onAddToCart(product)}
          className="mt-auto group-hover:border-indigo-600 group-hover:text-indigo-600"
        >
          Ajouter au panier
        </Button>
      </div>
    </div>
  );
};
