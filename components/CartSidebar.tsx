
import React from 'react';
import { CartItem } from '../types';
import { Button } from './Button';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove, 
  onUpdateQuantity 
}) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-2xl">
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Votre Panier</h2>
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-500"
                  onClick={onClose}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-8">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <p className="text-gray-500">Votre panier est vide</p>
                    <Button variant="outline" size="sm" className="mt-4" onClick={onClose}>
                      Continuer mes achats
                    </Button>
                  </div>
                ) : (
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-100">
                      {items.map((item) => (
                        <li key={item.id} className="py-6 flex">
                          <div className="flex-shrink-0 w-20 h-20 border border-gray-100 rounded-lg overflow-hidden">
                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                          </div>

                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between text-base font-semibold text-gray-900">
                                <h3>{item.name}</h3>
                                <p className="ml-4">{(item.price * item.quantity).toFixed(2)}€</p>
                              </div>
                              <p className="mt-1 text-xs text-gray-500 uppercase tracking-wide">{item.category}</p>
                            </div>
                            <div className="flex-1 flex items-end justify-between text-sm">
                              <div className="flex items-center border rounded-lg">
                                <button 
                                  onClick={() => onUpdateQuantity(item.id, -1)}
                                  className="px-2 py-1 hover:bg-gray-50"
                                >-</button>
                                <span className="px-3 font-medium">{item.quantity}</span>
                                <button 
                                  onClick={() => onUpdateQuantity(item.id, 1)}
                                  className="px-2 py-1 hover:bg-gray-50"
                                >+</button>
                              </div>
                              <button 
                                type="button" 
                                onClick={() => onRemove(item.id)}
                                className="font-medium text-red-600 hover:text-red-500"
                              >
                                Supprimer
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {items.length > 0 && (
              <div className="border-t border-gray-100 py-6 px-4 sm:px-6">
                <div className="flex justify-between text-base font-bold text-gray-900">
                  <p>Sous-total</p>
                  <p>{total.toFixed(2)}€</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">TVA incluse. Accès immédiat après paiement.</p>
                <div className="mt-6">
                  <Button fullWidth size="lg">
                    Passer la commande
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
