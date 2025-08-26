import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();


const products = [
{ slug: "diamond-60", name: "Diamond 60", price: 59, category: "coin", description: "แพ็กเพชรเริ่มต้น", image: "/product.svg", imageAlt: "Diamond 60" },
{ slug: "diamond-300", name: "Diamond 300", price: 299, category: "coin", description: "แพ็กยอดนิยม", image: "/product.svg", imageAlt: "Diamond 300" },
{ slug: "skin-dragon", name: "Dragon Skin", price: 499, category: "skin", description: "สกินหายาก", image: "/product.svg", imageAlt: "Dragon Skin" },
{ slug: "gift-100", name: "Gift Card 100", price: 100, category: "giftcard", description: "บัตรเติมเกม 100", image: "/product.svg", imageAlt: "Gift Card 100" },
{ slug: "gift-500", name: "Gift Card 500", price: 500, category: "giftcard", description: "บัตรเติมเกม 500", image: "/product.svg", imageAlt: "Gift Card 500" },
{ slug: "starter-id", name: "Starter Account", price: 899, category: "other", description: "ไอดีใหม่พร้อมของ", image: "/product.svg", imageAlt: "Starter Account" },
];


async function main() {
await db.product.deleteMany();
for (const p of products) {
await db.product.create({ data: p });
}
}


main()
.then(async () => { await db.$disconnect(); })
.catch(async (e) => { console.error(e); await db.$disconnect(); process.exit(1); });