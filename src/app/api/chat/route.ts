import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, tool } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "edge";

const chatPayloadSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.string(),
        content: z.any(),
      })
    )
    .min(1),
});

const fetchMaterialCostSchema = z.object({
  material: z.string().describe("The name of the material (e.g., marble, hardwood)"),
  quantity: z.number().describe("The quantity in square feet"),
  quality: z.enum(["standard", "premium", "luxury"]).describe("Quality tier"),
});

const fetchMaterialCostTool: any = tool({
  description: "Fetch the cost estimate for a specific interior design material",
  parameters: fetchMaterialCostSchema,
  // @ts-ignore
  execute: async (params: any) => {
    const basePrices: Record<string, Record<string, number>> = {
      marble: { standard: 15, premium: 35, luxury: 80 },
      hardwood: { standard: 8, premium: 18, luxury: 45 },
      tile: { standard: 4, premium: 12, luxury: 30 },
      wallpaper: { standard: 2, premium: 6, luxury: 20 },
    };
    const price = basePrices[params.material.toLowerCase()]?.[params.quality] ?? 10;
    const total = price * params.quantity;
    return {
      material: params.material,
      quantity: params.quantity,
      quality: params.quality,
      pricePerSqFt: price,
      totalCost: total,
      currency: "USD",
    };
  },
});

const calculateEstimateSchema = z.object({
  roomType: z.string().describe("Type of room (living room, bedroom, kitchen, etc.)"),
  squareFootage: z.number().describe("Total square footage of the room"),
  style: z.string().describe("Design style (modern, traditional, minimalist, etc.)"),
  budget: z.enum(["basic", "mid-range", "luxury"]).describe("Budget tier"),
});

const calculateEstimateTool: any = tool({
  description: "Calculate a comprehensive interior design project estimate",
  parameters: calculateEstimateSchema,
  // @ts-ignore
  execute: async (params: any) => {
    const multipliers: Record<string, number> = { basic: 50, "mid-range": 120, luxury: 300 };
    const styleMultipliers: Record<string, number> = {
      minimalist: 0.9,
      modern: 1.0,
      contemporary: 1.1,
      traditional: 1.2,
      luxury: 1.5,
    };
    const baseRate = multipliers[params.budget] ?? 120;
    const styleMultiplier = styleMultipliers[params.style.toLowerCase()] ?? 1.0;
    const estimate = baseRate * params.squareFootage * styleMultiplier;
    return {
      roomType: params.roomType,
      squareFootage: params.squareFootage,
      style: params.style,
      budget: params.budget,
      estimatedCost: Math.round(estimate),
      breakdown: {
        design: Math.round(estimate * 0.15),
        materials: Math.round(estimate * 0.45),
        labor: Math.round(estimate * 0.30),
        contingency: Math.round(estimate * 0.10),
      },
      currency: "USD",
      timeline:
        params.budget === "basic"
          ? "4-6 weeks"
          : params.budget === "mid-range"
          ? "8-12 weeks"
          : "16-24 weeks",
    };
  },
});

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "GOOGLE_GENERATIVE_AI_API_KEY is missing. Add it to your environment configuration.",
        },
        { status: 500 }
      );
    }

    const payload = chatPayloadSchema.safeParse(await req.json());
    if (!payload.success) {
      return NextResponse.json(
        { error: "Invalid chat payload." },
        { status: 400 }
      );
    }

    const google = createGoogleGenerativeAI({ apiKey });

    const result = await streamText({
      model: google("gemini-2.0-flash") as any,
      system: `You are an expert AI concierge for Elegant Interior Work, a luxury interior design studio. 
You help clients explore design options, understand project costs, and book consultations.
Be sophisticated, knowledgeable, and inspire confidence. Use the available tools to provide accurate cost estimates.
When users ask about materials or project costs, use the fetchMaterialCost or calculateEstimate tools.`,
      messages: payload.data.messages,
      tools: {
        fetchMaterialCost: fetchMaterialCostTool,
        calculateEstimate: calculateEstimateTool,
      },
      maxSteps: 5,
    } as any);

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat route failed", error);
    return NextResponse.json(
      { error: "Unable to process chat request right now." },
      { status: 500 }
    );
  }
}
