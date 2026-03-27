import { NextResponse } from "next/server";
import { z } from "zod";
import { getPrismaClient } from "@/lib/prisma";

const contactPayloadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(30).optional(),
  service: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10).max(4000),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = contactPayloadSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid contact form payload." },
        { status: 400 }
      );
    }

    const { name, email, phone, service, message } = parsed.data;
    const prisma = getPrismaClient();

    await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        service,
        message,
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Contact submission failed", error);
    return NextResponse.json(
      { error: "Unable to submit contact request right now." },
      { status: 500 }
    );
  }
}
