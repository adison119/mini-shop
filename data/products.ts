import { Product } from "@/types/product";

export const products: Product[] = [
  { id: "p1", slug: "diamond-60",  name: "Diamond 60",  price: 59,  category: "coin", description: "แพ็กเริ่มต้น" },
  { id: "p2", slug: "diamond-300", name: "Diamond 300", price: 279, category: "coin", description: "คุ้มค่ากลางๆ" },
  { id: "p3", slug: "skin-dragon", name: "Dragon Skin", price: 499, category: "skin", description: "สกินหายาก" },
  { id: "p4", slug: "gift-100",    name: "Gift Card 100", price: 100, category: "giftcard", description: "บัตรเติมเกม 100" },
  { id: "p5", slug: "gift-500",    name: "Gift Card 500", price: 500, category: "giftcard", description: "บัตรเติมเกม 500" },
  { id: "p6", slug: "starter-id",  name: "Starter Account", price: 899, category: "other", description: "ไอดีเริ่มต้นพร้อมของ" },
];
