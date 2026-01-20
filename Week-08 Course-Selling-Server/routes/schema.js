import { z } from "zod";

const signupSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
})

const loginSchema = z.object({
    email: z.email(),
    password: z.string(),
})

const courseSchema = z.object({
    title: z.string(),
    description: z.string(),
    price: z.number(),
    content: z.array(z.string()),
})

export { signupSchema, loginSchema, courseSchema };