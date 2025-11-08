import {z} from "zod"

export const todoSchema = z.object({
    content: z
        .string()
        .trim()
        .min(2, "Content must be at least 2 characters long")
        .max(40, "Content must be less than 40 characters long"),
    completed: z
        .boolean()
        .optional()
        .default(false),
})

export type TodoInput = z.infer<typeof todoSchema>