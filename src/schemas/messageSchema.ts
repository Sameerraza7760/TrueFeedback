import { z } from "zod";
export const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "content should be 10 charecters minimum " })
    .max(300, { message: "content must be no longer then 300 charecters" }),
});
