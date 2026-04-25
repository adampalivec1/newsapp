import { NextResponse } from "next/server";
import { updateSource, deleteSource } from "@/lib/db/queries";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body: unknown = await request.json();
    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const source = await updateSource(id, body as Parameters<typeof updateSource>[1]);
    return NextResponse.json(source);
  } catch (error) {
    console.error("PATCH /api/sources/[id]:", error);
    return NextResponse.json({ error: "Failed to update source" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    await deleteSource(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("DELETE /api/sources/[id]:", error);
    return NextResponse.json({ error: "Failed to delete source" }, { status: 500 });
  }
}
