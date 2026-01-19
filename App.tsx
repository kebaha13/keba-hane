
import React, { useState, useMemo } from 'react';
import { PRODUCTS } from './constants';
import { Category, DigitalProduct, CartItem, SearchRecommendation } from './types';
import { ProductCard } from './components/ProductCard';
import { CartSidebar } from './components/CartSidebar';
import { AISearch } from './components/AISearch';
import { Button } from './components/Button';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState<SearchRecommendation | null>(null);

  const categories = ['All', ...Object.values(Category)];

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;

    // Filter by AI recommendation if exists
    if (aiRecommendation && aiRecommendation.productIds.length > 0) {
      result = result.filter(p => aiRecommendation.productIds.includes(p.id));
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by text search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.description.toLowerCase().includes(lowerQuery)
      );
    }

    return result;
  }, [selectedCategory, searchQuery, aiRecommendation]);

  const addToCart = (product: DigitalProduct) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-8">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setAiRecommendation(null);
                  setSelectedCategory('All');
                }}
              >
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-indigo-200 shadow-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                  </svg>
                </div>
                <span className="text-xl font-black text-gray-900 tracking-tight">DIGISTORE<span className="text-indigo-600">AI</span></span>
              </div>

              <div className="hidden md:flex relative group">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-full py-2 px-6 w-64 text-sm transition-all focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>
              <Button variant="secondary" size="sm" className="hidden sm:inline-flex rounded-xl">
                Devenir Vendeur
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero / Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Trouvez le meilleur du <span className="text-indigo-600">numérique</span>.
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl">
              Découvrez des produits digitaux de haute qualité, sélectionnés avec soin pour accélérer votre créativité et votre carrière.
            </p>
          </div>

          {/* AI Recommender Section */}
          <AISearch 
            onRecommendationFound={(rec) => {
              setAiRecommendation(rec);
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }} 
          />

          {/* Filters & Recommendation Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat as Category | 'All');
                    setAiRecommendation(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    selectedCategory === cat && !aiRecommendation
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            {aiRecommendation && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setAiRecommendation(null)}
                className="text-xs"
              >
                Réinitialiser la recherche IA
              </Button>
            )}
          </div>

          {/* AI Reasoning Display */}
          {aiRecommendation && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 mb-10 flex gap-4 animate-in fade-in slide-in-from-top-2">
              <div className="text-indigo-600 mt-1">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-indigo-900 font-medium">Recommandation personnalisée</p>
                <p className="text-indigo-700 text-sm">{aiRecommendation.reason}</p>
              </div>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart}
                  onClick={(p) => console.log('Details for', p.name)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <div className="text-gray-400 mb-4 flex justify-center">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-lg font-medium text-gray-900">Aucun produit trouvé</p>
              <p className="text-gray-500">Essayez une autre recherche ou réinitialisez les filtres.</p>
              <Button 
                variant="outline" 
                className="mt-6" 
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setAiRecommendation(null);
                }}
              >
                Voir tous les produits
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                  </svg>
                </div>
                <span className="text-lg font-black tracking-tight">DIGISTORE AI</span>
              </div>
              <p className="text-gray-500 max-w-sm mb-6">
                La plateforme leader pour les actifs numériques. Achetez et vendez des produits digitaux avec confiance et simplicité.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Marketplace</h4>
              <ul className="text-gray-500 space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-600">Tous les produits</a></li>
                <li><a href="#" className="hover:text-indigo-600">Plus populaires</a></li>
                <li><a href="#" className="hover:text-indigo-600">Nouveautés</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Aide</h4>
              <ul className="text-gray-500 space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-600">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-indigo-600">Licences</a></li>
                <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium">
            <p>© 2024 DigiStore AI. Tous droits réservés.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-600 transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-gray-600 transition-colors">CGV</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
};

export default App;
