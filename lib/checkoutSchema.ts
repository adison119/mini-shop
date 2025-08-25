import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "กรอกชื่อ-นามสกุลอย่างน้อย 2 ตัวอักษร"),
  email: z.string().email("อีเมลไม่ถูกต้อง"),
  address: z.string().min(5, "กรอกที่อยู่ให้ละเอียดขึ้น"),
  district: z.string().min(2, "กรอกอำเภอ/เขต"),
  province: z.string().min(2, "กรอกจังหวัด"),
  postalCode: z
    .string()
    .regex(/^\d{5}$/, "รหัสไปรษณีย์ต้องมี 5 หลัก"),
  phone: z
    .string()
    .regex(/^0\d{8,9}$/, "เบอร์มือถือควรขึ้นต้น 0 และยาว 9–10 หลัก")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  notes: z.string().max(500, "หมายเหตุยาวเกิน 500 ตัวอักษร").optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
