"use client";
import { z } from "zod";

export const step1Schema = z
  .object({
    email: z.string().email("Зөв имэйл хаяг оруулна уу"),
    password: z.string().min(8, "Нууц үг дор хаяж 8 тэмдэгт байх ёстой"),
    confirmPassword: z.string(),
    companyName: z.string().min(2, "Салоны нэр дор хаяж 2 тэмдэгт байх ёстой"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Нууц үг таарахгүй байна",
    path: ["confirmPassword"],
  });

export const step2Schema = z.object({
  description: z.string().optional(),
  address: z.string().min(5, "Хаяг дор хаяж 5 тэмдэгт байх ёстой"),
  city: z.string().min(2, "Хот дор хаяж 2 тэмдэгт байх ёстой"),
  phone: z.string().min(8, "Утасны дугаар дор хаяж 8 тэмдэгт байх ёстой"),
  website: z
    .string()
    .url("Зөв URL хаяг оруулна уу")
    .optional()
    .or(z.literal("")),
  logo: z.string().min(1, "Лого оруулна уу"),
});

export const dayScheduleSchema = z.object({
  open: z.string(),
  close: z.string(),
  closed: z.boolean(),
});

export const step3Schema = z.object({
  openingHours: z.object({
    monday: dayScheduleSchema,
    tuesday: dayScheduleSchema,
    wednesday: dayScheduleSchema,
    thursday: dayScheduleSchema,
    friday: dayScheduleSchema,
    saturday: dayScheduleSchema,
    sunday: dayScheduleSchema,
  }),
  lunchBreak: z.object({
    start: z.string(),
    end: z.string(),
  }),
});

export type Step1SchemaType = z.infer<typeof step1Schema>;
export type Step2SchemaType = z.infer<typeof step2Schema>;
export type Step3SchemaType = z.infer<typeof step3Schema>;
