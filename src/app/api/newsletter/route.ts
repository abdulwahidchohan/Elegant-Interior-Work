import { NextResponse } from "next/server";
import { z } from "zod";
import { getPrismaClient } from "@/lib/prisma";

const newsletterPayloadSchema = z.object({
  email: z.string().trim().email().max(320),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = newsletterPayloadSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid newsletter payload." },
        { status: 400 }
      );
    }

    const { email } = parsed.data;
    const prisma = getPrismaClient();

    const existing = await prisma.contact.findFirst({
      where: {
        email,
        service: "newsletter",
      },
      select: {
        id: true,
      },
    });

    if (!existing) {
      await prisma.contact.create({
        data: {
          name: "Newsletter Subscriber",
          email,
          service: "newsletter",
          message: "Subscribed from footer newsletter form.",
        },
      });
    }

    return NextResponse.json(
      { ok: true, alreadySubscribed: Boolean(existing) },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter submission failed", error);
    return NextResponse.json(
      { error: "Unable to subscribe right now." },
      { status: 500 }
    );
  }
}
