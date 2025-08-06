import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.email("Email inválido.").trim().min(1, "O email é obrigatório."),
  password: z
    .string("Senha inválida.")
    .min(8, "Senha inválida.")
    .max(100, "A senha deve ter no máximo 100 caracteres."),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;
