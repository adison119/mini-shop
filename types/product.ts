export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: "coin" | "skin" | "giftcard" | "other";
  description?: string;
};
