import { NextResponse } from "next/server";
import { exec } from "node:child_process";


export async function POST() {
// dev only — เรียก prisma db seed ซ้ำ
await new Promise((resolve, reject) =>
exec("npm run db:seed", (err) => (err ? reject(err) : resolve(null)))
);
return NextResponse.json({ ok: true });
}