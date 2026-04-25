import { NextResponse } from "next/server";
import { getSources, createSource } from "@/lib/db/queries";
import { DIGEST_CATEGORIES } from "@/lib/ai/types";
import type { DigestCategory } from "@/lib/ai/types";

interface SourceInput {
  provider: "gmail" | "outlook";
  accountEmail: string;
  senderEmail: string;
  displayName: string;
  category: string;
  fetchWindowHours?: number;
}

function isValidSourceInput(body: unknown): body is SourceInput {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    (b.provider === "gmail" || b.provider === "outlook") &&
    typeof b.accountEmail === "string" &&
    b.accountEmail.trim().length > 0 &&
    typeof b.senderEmail === "string" &&
    b.senderEmail.trim().length > 0 &&
    typeof b.displayName === "string" &&
    b.displayName.trim().length > 0 &&
    typeof b.category === "string" &&
    DIGEST_CATEGORIES.includes(b.category as DigestCategory)
  );
}

export async function GET() {
  try {
    const sources = await getSources();
    return NextResponse.json(sources);
  } catch (error) {
    console.error("GET /api/sources:", error);
    return NextResponse.json({ error: "Failed to fetch sources" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!isValidSourceInput(body)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const source = await createSource({
      provider: body.provider,
      accountEmail: body.accountEmail.trim(),
      senderEmail: body.senderEmail.trim(),
      displayName: body.displayName.trim(),
      category: body.category,
      fetchWindowHours: typeof body.fetchWindowHours === "number" ? body.fetchWindowHours : 20,
    });
    return NextResponse.json(source, { status: 201 });
  } catch (error) {
    console.error("POST /api/sources:", error);
    return NextResponse.json({ error: "Failed to create source" }, { status: 500 });
  }
}
