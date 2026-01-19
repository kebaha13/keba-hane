
import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from "./constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIRecommendation = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `L'utilisateur cherche un produit numérique. Voici son besoin : "${userPrompt}". 
      Voici notre catalogue de produits : ${JSON.stringify(PRODUCTS.map(p => ({id: p.id, name: p.name, desc: p.description})))}.
      Analyse le besoin et recommande un ou plusieurs produits.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reason: {
              type: Type.STRING,
              description: "Une explication courte et amicale en français sur pourquoi ces produits conviennent."
            },
            productIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Liste des IDs des produits recommandés."
            }
          },
          required: ["reason", "productIds"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Réponse vide de l'IA");
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      reason: "Désolé, je n'ai pas pu générer de recommandation personnalisée pour le moment.",
      productIds: []
    };
  }
};
