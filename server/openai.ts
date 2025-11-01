import OpenAI from "openai";

// This is using Replit's AI Integrations service, which provides OpenAI-compatible API access without requiring your own OpenAI API key.
// Charges are billed to your credits.
const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

const TAROT_CARDS = [
  { name: "The Moon", theme: "illusion, intuition, the subconscious" },
  { name: "The Star", theme: "hope, renewal, spiritual guidance" },
  { name: "Death", theme: "transformation, endings, new beginnings" },
  { name: "The Tower", theme: "sudden change, upheaval, revelation" },
  { name: "The Hanged Man", theme: "surrender, new perspective, letting go" },
  { name: "The Devil", theme: "temptation, bondage, materialism" },
  { name: "The High Priestess", theme: "mystery, intuition, the divine feminine" },
  { name: "The Magician", theme: "manifestation, power, skill" },
];

export async function generateFortune(): Promise<{ cardName: string; fortuneText: string; cardImage: string }> {
  // Randomly select a tarot card
  const selectedCard = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
  
  const prompt = `You are a mystical fortune teller conducting a tarot reading on Halloween night. 
The card drawn is "${selectedCard.name}", which represents ${selectedCard.theme}.

Generate a haunting, atmospheric fortune reading that:
- Is 3-4 sentences long
- Has a mysterious, slightly ominous tone fitting for Halloween
- Incorporates the card's themes in a creative way
- Feels personal and prophetic
- Uses evocative, poetic language
- Could apply to anyone's life but feels specific

Do not use generic phrases. Make it feel like the spirits are truly speaking through you.
Only return the fortune text itself, nothing else.`;

  try {
    const response = await openai.chat.completions.create({
      // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
      model: "gpt-5",
      messages: [{ role: "user", content: prompt }],
      max_completion_tokens: 300,
    });

    const fortuneText = response.choices[0]?.message?.content || "The spirits remain silent... try again.";

    // Map card names to image paths
    const cardImageMap: Record<string, string> = {
      "The Moon": "moon",
      "The Star": "star", 
      "Death": "death",
      "The Tower": "moon", // Fallback to available images
      "The Hanged Man": "star",
      "The Devil": "death",
      "The High Priestess": "moon",
      "The Magician": "star",
    };

    return {
      cardName: selectedCard.name,
      fortuneText,
      cardImage: cardImageMap[selectedCard.name] || "moon"
    };
  } catch (error) {
    console.error("Error generating fortune:", error);
    throw new Error("Failed to consult the spirits");
  }
}
