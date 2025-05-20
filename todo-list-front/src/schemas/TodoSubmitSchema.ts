import { z } from "zod";

export const todoSubmitSchema = z.object({
    title: z.string().min(2, { message: "Titulo muito curto" }),
    description: z.string().optional(),
  });

export type TodoSubmitSchemaType = z.infer<typeof todoSubmitSchema>;
