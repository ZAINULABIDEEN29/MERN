import {z} from "zod"

export const userSchema = z.object({
    username:z
    .string()
    .min(2,"Atleast 2 characters long")
    .max(40,"Name must be less than 40 characters long"),
    email:z
    .string()
    .email("Invalid email address"),
    password:z
    .string()
    .min(3,"Password must be at least 3 characters long")
    .max(50,"Password must be less than 50 characters long"),
    isVerified:z
    .boolean()
    .optional()
    .default(false)

})

export const loginSchema = z.object({
    email:z
    .string()
    .email("Invalid email address"),
    password:z
    .string()
    .min(3,"Password must be at least 3 characters long")
    .max(50,"Password must be less than 50 characters long")
})

export type UserInput = z.infer<typeof userSchema>
export type LoginInput = z.infer<typeof loginSchema>