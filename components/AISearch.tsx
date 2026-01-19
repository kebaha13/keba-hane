
import React, { useState } from 'react';
import { Button } from './Button';
import { getAIRecommendation } from '../geminiService';
import { SearchRecommendation } from '../types';

interface AISearchProps {
  onRecommendationFound: (recommendation: SearchRecommendation) => void;
}

export const AISearch: React.FC<AISearchProps> = ({ onRecommendationFound }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    const result = await getAIRecommendation(prompt);
    onRecommendationFound(result);
    setLoading(false);
  };

  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6 sm:p-10 mb-12 shadow-sm">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-4">
          ✨ Propulsé par Gemini AI
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
          Vous ne savez pas quoi choisir ?
        </h2>
        <p className="text-gray-600 mb-8">
          Décrivez-nous votre projet ou vos objectifs, et notre assistant IA vous recommandera les meilleurs produits numériques de notre catalogue.
        </p>

        <form onSubmit={handleSearch} className="relative group">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: 'Je veux lancer une application SaaS rapidement' ou 'Je suis designer débutant'..."
            className="w-full bg-white border-2 border-transparent focus:border-indigo-500 rounded-2xl py-4 pl-6 pr-32 shadow-lg focus:outline-none transition-all placeholder:text-gray-400 text-gray-700"
          />
          <div className="absolute right-2 top-2">
            <Button 
              type="submit" 
              size="md" 
              className="rounded-xl"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyse...
                </div>
              ) : "Demander"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
