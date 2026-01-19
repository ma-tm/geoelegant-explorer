
import { GoogleGenAI, Type } from "@google/genai";
import { Location } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const searchLocations = async (query: string): Promise<{ locations: Location[]; summary: string }> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Suggest 5 interesting and diverse locations (restaurants, landmarks, museums, etc.) in or related to "${query}". 
    Provide real coordinates (lat/lng) if possible or very close approximations. 
    Return a professional summary and the list of locations.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: {
            type: Type.STRING,
            description: "A short, elegant overview of the search area.",
          },
          locations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                lat: { type: Type.NUMBER },
                lng: { type: Type.NUMBER },
                category: { 
                  type: Type.STRING, 
                  description: "One of: restaurant, landmark, park, museum, other" 
                },
                rating: { type: Type.NUMBER },
                address: { type: Type.STRING },
              },
              required: ["id", "name", "description", "lat", "lng", "category"]
            }
          }
        },
        required: ["summary", "locations"]
      }
    }
  });

  const jsonStr = response.text.trim();
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return { locations: [], summary: "Could not retrieve location data." };
  }
};
