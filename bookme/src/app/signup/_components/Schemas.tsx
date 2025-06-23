import { z } from "zod";

const dayScheduleSchema = z.object({
  open: z.string(),
  close: z.string(),
  closed: z.boolean(),
});

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
  experience: z.string().min(1, "Ажилласан жилээ оруулна уу"),
  clientNumbers: z.string().min(1, "Нийт үйлчлүүлэгчдийн тоог оруулна уу"),
});

export const step3Schema = z.object({
  workingHours: z.object({
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

export const step4Schema = z.object({
  logo: z.string().optional(),
});

export type Step1SchemaType = z.infer<typeof step1Schema>;
export type Step2SchemaType = z.infer<typeof step2Schema>;
export type Step3SchemaType = z.infer<typeof step3Schema>;
export type Step4SchemaType = z.infer<typeof step4Schema>;
