import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { slugify } from "@/lib/slug";


export async function GET() {
const items = await db.product.findMany({ orderBy: { name: "asc" } });
return NextResponse.json(items);
}


export async function POST(req: Request) {
try {
const body = await req.json();
const data = {
slug: slugify(body.slug || body.name),
name: String(body.name),
price: Number(body.price),
category: body.category ?? "other",
description: body.description ?? "",
image: body.image ?? "/product.svg",
imageAlt: body.imageAlt ?? String(body.name ?? "")
} as const;


if (!data.name || Number.isNaN(data.price)) {
return NextResponse.json({ message: "name/price is required" }, { status: 400 });
}


const created = await db.product.create({ data });
return NextResponse.json(created, { status: 201 });
} catch (e) {
return NextResponse.json({ message: "invalid json" }, { status: 400 });
}
}