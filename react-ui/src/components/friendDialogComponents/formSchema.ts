import {z} from "zod";

export const formSchema = z.object({
    firstName: z.string().min(3).max(24),
    lastName: z.string().min(3).max(48),
    lastContactDate: z.date(),
    lastContactType: z.string(),
    desiredContactFrequency: z.number().min(1).max(7),
    categoryId: z.string().optional(),
});