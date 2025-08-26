import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { slugify } from "@/lib/slug";


export async function GET(_: Request, { params }: { params: { id: string } }) {
const p = await db.product.findUnique({ where: { id: params.id } });
if (!p) return NextResponse.json({ message: "not found" }, { status: 404 });
return NextResponse.json(p);
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
try {
const body = await req.json();
const patch: any = { ...body };
if (patch.slug) patch.slug = slugify(String(patch.slug));
if (patch.price !== undefined) patch.price = Number(patch.price);


const updated = await db.product.update({ where: { id: params.id }, data: patch });
return NextResponse.json(updated);
} catch (e) {
return NextResponse.json({ message: "invalid json" }, { status: 400 });
}
}


export async function DELETE(_: Request, { params }: { params: { id: string } }) {
await db.product.delete({ where: { id: params.id } });
return NextResponse.json({ ok: true });
}