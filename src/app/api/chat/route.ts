import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, tool } from "ai";
import { z } from "zod";

export const runtime = "edge";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? "",
});

const fetchMaterialCostTool = tool({
  description: "Fetch the cost estimate for a specific interior design material",
  parameters: z.object({
    material: z.string().describe("The name of the material (e.g., marble, hardwood)"),
    quantity: z.number().describe("The quantity in square feet"),
    quality: z.enum(["standard", "premium", "luxury"]).describe("Quality tier"),
  }),
  execute: async ({ material, quantity, quality }) => {
    const basePrices: Record<string, Record<string, number>> = {
      marble: { standard: 15, premium: 35, luxury: 80 },
      hardwood: { standard: 8, premium: 18, luxury: 45 },
      tile: { standard: 4, premium: 12, luxury: 30 },
      wallpaper: { standard: 2, premium: 6, luxury: 20 },
    };
    const price = basePrices[material.toLowerCase()]?.[quality] ?? 10;
    const total = price * quantity;
    return {
      material,
      quantity,
      quality,
      pricePerSqFt: price,
      totalCost: total,
      currency: "USD",
    };
  },
});

const calculateEstimateTool = tool({
  description: "Calculate a comprehensive interior design project estimate",
  parameters: z.object({
    roomType: z.string().describe("Type of room (living room, bedroom, kitchen, etc.)"),
    squareFootage: z.number().describe("Total square footage of the room"),
    style: z.string().describe("Design style (modern, traditional, minimalist, etc.)"),
    budget: z.enum(["basic", "mid-range", "luxury"]).describe("Budget tier"),
  }),
  execute: async ({ roomType, squareFootage, style, budget }) => {
    const multipliers: Record<string, number> = { basic: 50, "mid-range": 120, luxury: 300 };
    const styleMultipliers: Record<string, number> = {
      minimalist: 0.9,
      modern: 1.0,
      contemporary: 1.1,
      traditional: 1.2,
      luxury: 1.5,
    };
    const baseRate = multipliers[budget] ?? 120;
    const styleMultiplier = styleMultipliers[style.toLowerCase()] ?? 1.0;
    const estimate = baseRate * squareFootage * styleMultiplier;
    return {
      roomType,
      squareFootage,
      style,
      budget,
      estimatedCost: Math.round(estimate),
      breakdown: {
        design: Math.round(estimate * 0.15),
        materials: Math.round(estimate * 0.45),
        labor: Math.round(estimate * 0.30),
        contingency: Math.round(estimate * 0.10),
      },
      currency: "USD",
      timeline:
        budget === "basic"
          ? "4-6 weeks"
          : budget === "mid-range"
          ? "8-12 weeks"
          : "16-24 weeks",
    };
  },
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google("gemini-1.5-flash"),
    system: `You are an expert AI concierge for Elegant Interior Work, a luxury interior design studio. 
You help clients explore design options, understand project costs, and book consultations.
Be sophisticated, knowledgeable, and inspire confidence. Use the available tools to provide accurate cost estimates.
When users ask about materials or project costs, use the fetchMaterialCost or calculateEstimate tools.`,
    messages,
    tools: {
      fetchMaterialCost: fetchMaterialCostTool,
      calculateEstimate: calculateEstimateTool,
    },
    maxSteps: 5,
  });

  return result.toDataStreamResponse();
}
